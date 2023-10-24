// 2つ同時に鳴らせるようにするのも考えたけど、よく考えたら2つ同時に鳴らす意味なかった
class AudioSpeechController extends EventTarget {
  /**
   * @typedef {({ type: "direct", data: AudioBuffer } | { type: "path", path: String, speakerId: String } | { type: "id", id: String } | { type: "skip" } | { type: "wait", time: Number })} AudioSpeechQueueParam
   * @typedef {({ type: "direct", data: AudioBuffer } | { type: "id", id: String } | { type: "skip" } | { type: "wait", time: Number })} AudioSpeechQueueItem
   */

  static displayName = "AudioSpeechController";
  constructor (){
    super();
  }
  isInitialized = false;
  #audioContext = null;
  #bufferSource = null;
  #gainNode = null;
  #canPlay = null;
  #paused = true;
  #speakers = [
    new AudioSpeaker("speaker21", "剣崎雌雄", "male", false),
    new AudioSpeaker("speaker8", "春日部つむぎ", "female"),
    new AudioSpeaker("speaker16", "九州そら", "female", false),
  ];
  #sources = {
    common: {
      depth: (new Array(71)).fill(0).map((_item, i) => "/common/depth/" + (i * 10) + ".wav"),
      intensity: ["0", "1", "2", "3", "4", "5l", "5h", "6l", "6h", "7"].map(item => "/common/intensity/" + item + ".wav"),
      magnitude: Object.fromEntries((new Array(99)).fill(0).map((_item, i) => [i+1, "/common/magnitude/" + ("0" + (i+1)).slice(-2) + ".wav"])),
    },
    eew: {
      epicenter: {
        long: Object.fromEntries(Object.keys(AreaCode2Epicenter).map(item => [item, "/eew/epicenter-long/" + item + ".wav"])),
      },
      ungrouped: {
        "2": "/eew/ungrouped/2.wav", // 緊急地震速報
        "3": "/eew/ungrouped/3.wav", // 最大震度
        "4": "/eew/ungrouped/4.wav", // マグニチュード
      },
    },
    quake: {
      de: [] // Object.fromEntries(Object.keys(AreaCode2Epicenter).map(item => [item, "/eew/quake/epicenter-de/" + item + ".wav"])),
    },
    ground: {
      area: Object.fromEntries(Object.keys(AreaForecastLocalM.ground).map(item => [item, "/ground/area/" + item + ".wav"])),
      clear: "/ground/clear.wav",
      issue: "/ground/issue.wav"
    }
  };
  #speechData = {
    fromId: {},
    queue: []
  };
  speechStatus = {
    START_INIT: 1,
    LOAD_SPEECH: 2,
    END_INIT: 3,
    // START_SPEECH: 10,
    // END_SPEECH: 11
  };
  /** 煮たり焼いたりしていいオブジェクト */
  userSpace = {};

  /**
   * @param {Object} parent 親オブジェクト
   * @param {String} key キー文字列
   * @returns {*}
   */
  #key2item (parent, key){
    if (parent == null) throw TypeError("Cannot read properties of " + parent);
    const slicePos = key.indexOf(".");
    if (slicePos === -1){
      return parent[key];
    } else {
      const partialKey = key.substring(0, slicePos);
      const remaining = key.substring(slicePos+1);
      if (Object.hasOwn(parent, partialKey)){
        return this.#key2item(parent[partialKey], remaining);
      } else {
        return undefined;
      }
    }
  }

  /**
   * @param {BaseAudioContext} audioContext
   * constで上手い感じにできたらconstructorに移動させようかな
   */
  async init (audioContext){
    if (this.isInitialized) return; // 多重防止
    this.#checkArgumentNumber(1, arguments.length, "init");
    this.#argumentValidation(audioContext, AudioContext, "init");
    this.#speechStatusEvent(this.speechStatus.START_INIT);
    this.#audioContext = audioContext;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1;
    gainNode.connect(audioContext.destination);
    this.#gainNode = gainNode;
    // 全スピーカーの音声データ初期化
    await this.#initSpeaker(audioContext);
    // AudioBufferSourceNodeを初期化
    const bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = null;
    bufferSource.loop = false;
    bufferSource.connect(gainNode);
    this.#bufferSource = bufferSource;
    this.isInitialized = true;
    this.#speechStatusEvent(this.speechStatus.END_INIT);
    console.log("Initialization Completed.");
  }

  /**
   * 読み上げ全体の音量を取得／設定します。
   * @param {Number} changeTo 規定値: 1
   */
  set volume (changeTo){
    if (this.#gainNode) this.#gainNode.gain.value = changeTo - 0;
  }
  get volume (){
    return this.#gainNode?.gain?.value;
  }

  /**
   * ミリ秒待ちます
   * @param {Number} waitTime
   */
  #wait (waitTime = 0){
    return new Promise(resolve => {
      setTimeout(() => resolve(), waitTime);
    });
  }

  /**
   * AudioSpeechQueueParamからAudioSpeechQueueItemに変換する
   * @param {AudioSpeechQueueParam} param
   * @returns {AudioSpeechQueueItem}
   */
  #qParam2qItem (param){
    switch (param.type){
      case "direct":
        return { type: "direct", data: param.data };
      case "path":
        return { type: "direct", data: this.#key2item(this.#sources, param.path).audioData[param.speakerId] };
      case "id":
        return { type: "id", id: param.id };
      case "wait":
        return { type: "wait", time: param.time - 0 };
    }
  }

  /**
   * キューに登録し、読み上げを開始する
   * @param {AudioSpeechQueueParam[]} speechData 読み上げデータ
   */
  async start (speechData = []){
    if (!this.isInitialized) return;
    this.#argumentValidation(speechData, Array, "start");
    for (let i=0; i<speechData.length; i++){
      const item = speechData[i];
      this.#argumentValidation(item, Object, "start");
      this.#speechData.queue.push(this.#qParam2qItem(item));
    }
    if (this.#paused){
      while (this.#speechData.queue.length){
        this.#paused = false;
        // addQueueがループの機能を担う
        // console.log("Exec");
        await this.#startNextSync();
      }
      this.#paused = true;
    }
  }

  /**
   * IDを設定する
   * @param {String} id ID
   * @param {AudioSpeechQueueParam} speechData 読み上げデータ
   */
  setId (id, speechData){
    if (!this.isInitialized) return;
    id += "";
    this.#speechData.fromId[id] = this.#qParam2qItem(speechData);
  }

  /**
   * 全ての読み上げをキャンセルする
   */
  allCancel (){
    this.#speechData.queue = [];
    try { this.#bufferSource.stop(); } catch {};
  }

  get paused (){
    return this.#paused;
  }

  get queueCount (){
    return this.#speechData.queue.length;
  }

  /**
   * speechStatusイベントを配信する
   * @param {Number} code ステータスコード
   * @param {any} data データ
   */
  #speechStatusEvent (code, data){
    this.dispatchEvent(new CustomEvent("speechStatus", {
      detail: { code, data }
    }));
  }

  /**
   * IDからAudioBufferを取得する
   * @param {String} id ID
   * @param {String[]} loopDetect ループを検知するID
   */
  #getSourceFromId (id, loopDetect = []){
    if (!Object.hasOwn(this.#speechData.fromId, id)) return;
    /** @type {AudioSpeechQueueItem} */
    const target = this.#speechData.fromId[id];
    switch (target.type){
      case "direct":
        return target.data;
      case "id":
        if (loopDetect.includes(target.id)) throw RangeError('Infinite loop detected at "' + target.id + '".');
        loopDetect.push(target.id);
        return this.#getSourceFromId(target.id, loopDetect);
      case "skip":
        return;
    }
  }

  /** 次に再生する音声を取得して再生する */
  async #startNextSync (){
    /** @type {AudioSpeechQueueItem} */
    const speechItem = this.#speechData.queue.shift();
    // console.log(this.#speechData.queue.length, speechItem);
    if (speechItem){
      switch (speechItem.type){
        case "direct":
          await this.#startBufferSync(speechItem.data);
          break;
        case "id":
          await this.#startBufferSync(this.#getSourceFromId(speechItem.id));
          break;
        case "wait":
          await this.#wait(speechItem.time);
          break;
      }
    }
  }

  /**
   * 与えられたAudioBufferを再生
   * @param {AudioBuffer} audioData 音声データ
   * @returns {Promise}
   */
  #startBufferSync (audioData){
    // console.log(audioData);
    return new Promise(resolve => {
      if (!audioData) resolve();
      this.#argumentValidation(audioData, AudioBuffer, "#startBufferSync");
      const bufferSource = this.#initABSNode(this.#gainNode, audioData);
      bufferSource.addEventListener("ended", resolve);
      bufferSource.start();
      this.#paused = false;
    });
  }

  /**
   * AudioBufferSourceNodeを初期化
   * @param {AudioNode} destination AudioBufferSourceNodeの接続先
   * @param {AudioBuffer} audioData 音声データ
   * @returns {AudioBufferSourceNode}
   */
  #initABSNode (destination, audioData){
    // const items = this.#hiddenItems;
    // console.log(items.buffer);
    if (this.#bufferSource){
      try { this.#bufferSource.disconnect(destination); } catch {}
    }
    const bufferSource = this.#audioContext.createBufferSource();
    bufferSource.buffer = audioData;
    bufferSource.loop = false;
    bufferSource.connect(destination);
    this.#bufferSource = bufferSource;
    return bufferSource;
  }

  /**
   * 特定のスピーカーの音声を全て初期化
   * @param {AudioContext} audioContext
   */
  async #initSpeaker (audioContext){
    // const zipDatas = [];
    // for (const speakerData of this.#speakers){
    //   if (speakerData.isAvaliable){
    //     zipDatas[speakerData.id] = await fetch("https://md-ndv356.github.io/ndv-tickers/synthesized-speech/" + speakerData.id).then(res => res.arrayBuffer()).then(ab => JSZip.loadAsync(ab));
    //   }
    // }

    const propLoop = async (parent, propName) => {
      const target = parent[propName];
      if (target instanceof Object){
        for (const item of Object.keys(target)){
          await propLoop(target, item);
        }
      } else {
        const audioDataAll = {};
        for (const speakerData of this.#speakers){
          if (speakerData.isAvaliable){
            const requestURL = "https://md-ndv356.github.io/ndv-tickers/synthesized-speech/" + speakerData.id + target;
            // console.log(parent, propName, target);
            this.#speechStatusEvent(this.speechStatus.LOAD_SPEECH, target + " (" + speakerData.id + ")");
            const bufferData = await fetch(requestURL).then(res => res.arrayBuffer()).catch();
            const decodedAudio = await audioContext.decodeAudioData(bufferData);
            audioDataAll[speakerData.id] = decodedAudio;
          }
        }
        parent[propName] = { url: target, audioData: audioDataAll };
      }
    };
    for (const item of Object.keys(this.#sources)) await propLoop(this.#sources, item);
  }

  /**
   * 引数が足りているかを確認する
   * @param {Number} required 必要数
   * @param {Number} presented 入力数
   * @param {String} functionName 関数名
   */
  #checkArgumentNumber (required, presented, functionName = ""){
    if (presented < required){
      if (functionName) functionName = " '" + functionName + "' on 'AudioSpeechController'";
      throw new TypeError("Failed to execute" + functionName + ": " + required + " argument required, but only " + presented + " present.");
    }
  }

  /**
   * 与えられた引数が指定されたタイプか確認する
   * @param {*} input 入力
   * @param {*} type タイプ
   * @param {String} functionName 関数名
   */
  #argumentValidation (input, type, functionName = ""){
    if (!(input instanceof type)){
      if (functionName) functionName = " '" + functionName + "' on 'AudioSpeechController'";
      throw new TypeError("Failed to execute" + functionName + ": " + "The provided value is not of type '" + type.name + "'.");
    }
  }
}

class AudioSpeaker {
  static displayName = "AudioSpeaker";
  #speakerData = {};
  #speakerId = "";
  /**
   *
   * @param {String} id
   * @param {String} name
   * @param {"male" | "female" | null} gender
   * @param {?Boolean} isAvaliable
   */
  constructor (id, name, gender, isAvaliable){
    if (arguments.length < 2) throw new TypeError("Failed to construct 'AudioSpeaker': 2 argument required, but only " + arguments.length + " present.")
    if (id.includes("/") || id.includes("\\") || id.includes("?") || id.includes("#")) throw TypeError("Invalid characters are included in the ID.");
    this.#speakerId = id + "";
    this.#speakerData = {
      isAvaliable: !!(isAvaliable ?? true),
      name: name + "",
      gender: gender + ""
    };
  }
  get isAvaliable (){
    return this.#speakerData.isAvaliable;
  }
  set isAvaliable (bool){
    return this.#speakerData.isAvaliable = !!bool;
  }
  get id (){
    return this.#speakerId;
  }
  get name (){
    return this.#speakerData.name;
  }
  get gender (){
    return this.#speakerData.gender;
  }
}
