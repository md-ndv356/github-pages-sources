'use strict';

// import easyXhr from "./modules/easyXhr.js";

// Release Note: アプデ前にアーカイブを取ること (2021-07-29から)
// Release Note: terser -c -m -o main.min.js -- main.js
// Release Note: 必ずバージョンを更新すること
// Release Note:
//  eewLocalhostStreamPortを0にすること
//  manifest.json
//  ホームページ
//  Google Apps Script
//  AppVersionHistory
//  AppVersionCode
//  AppVersionView
//  SpeechVersionData

const AppVersionHistory = [
  "β0.1.0",
  "β0.1.1",
  "β0.1.2",
  "β0.1.3",
  "β0.1.4",
  "β0.1.5",
  "β0.1.6",
  "β0.2.0",
  "β0.2.1",
  "β0.2.2",
  "β0.2.3",
  "β0.2.4",
  "β0.2.5",
  "β0.2.6",
  "β0.2.7",
  "β0.2.8",
  "β0.2.9",
  "β0.3.0",
  "β0.3.1",
  "β0.3.2",
  "β0.3.3",
  "β0.3.4",
  "β0.4.0",
  "β0.4.1",
  "β0.4.2",
  "β0.5.0",
  "β0.5.1",
  "β0.5.2"
];

const AppVersionCode = "beta26";
const AppVersionView = "β0.5.2";
console.log(`%cNDV %c(Natural Disaster Viewer)%c   v.${AppVersionView}%c
β0.5.2 気象速報の表示ができなくなる問題を修正しました。 一部UIの変更を行いました。 津波情報の表示スタイルを保存するようになりました。 緊急地震速報のテスト受信に関する問題を解決しました。`,
  "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 19px; font-style: italic;",
  "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 11px; font-style: italic;",
  "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 9px; color: #888;",
  "background: #fff; font-family: sans-serif; font-weight: 300; padding: 2px; font-size: 9px; color: #333;"
);
console.log("%cThe Programs Started at: "+(new Date()).toISOString()+" (System Time)",
  "background: #55f; font-family: sans-serif; font-weight: 300; padding: 2px; font-size: 14px; color: white;"
);

const SpeechVersionData = {
  speaker21: "",
  speaker16: "",
  speaker8: "0.5.0",
};

// エラー処理
const errorCollector = {
  displayError: true,
  log: "["+(new Date().toISOString())+"] 読み込み終了。",
  true_or_false: arg => (arg ? "true" : "false"),
  collect: function (event){
    let additionalText = "";
    const currentTime = new Date().toISOString();
    if (event instanceof PromiseRejectionEvent){
      additionalText = "["+currentTime+"] ("+Math.trunc(event.timeStamp)+") PromiseRejectionEventが発生しました。isTrustedは"+errorCollector.true_or_false(event.isTrusted)+"です。\n"+event.reason.stack;
    } else if (Object(event) instanceof String){
      additionalText = "["+currentTime+"] "+event;
    } else if (event instanceof ErrorEvent){
      additionalText = "["+currentTime+"] ("+Math.trunc(event.timeStamp)+") ErrorEventが発生しました。isTrustedは"+errorCollector.true_or_false(event.isTrusted)+"です。\n"+event.error.stack;
    } else if (event instanceof Error){
      additionalText = "["+currentTime+"] エラーが発生しました。\n"+event;
    } else {
      additionalText = "["+currentTime+"] 不明なエラーが発生しました。\n"+event;
    }
    console.error(additionalText);
    errorCollector.log += "\n\n"+additionalText;
    if (this.displayError) showInitStatus(event + "");
  },
  output: function (){
    errorCollector.log += "\n\n["+(new Date().toISOString())+"] ログを出力します。";
    const url = URL.createObjectURL(new Blob([errorCollector.log], {type: "text/plain"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = "traceback.txt";
    link.click();
    URL.revokeObjectURL(url);
  }
};
window.addEventListener("error", errorCollector.collect);
window.addEventListener("unhandledrejection", errorCollector.collect);
document.getElementById("exportErrors").addEventListener("click", errorCollector.output);

const showInitStatus = text => {
  context.fillStyle = "#111";
  context.fillRect(0, 0, 1080, 128);
  context.fillStyle = "#fff";
  context.font = "30px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Yu Gothic', sans-serif";
  context.fillText("NDV Ticker / Extension " + AppVersionView, 10, 35, 1070);
  context.fillText(text, 10, 115, 1070);
};
showInitStatus("Getting ready, just a moment...");

let PlatformOS = null;
let Window_FrameWidth = 0;
let Window_FrameHeight = window.outerHeight - window.innerHeight * window.outerWidth / window.innerWidth;
chrome.runtime.getPlatformInfo().then(info => {
  PlatformOS = info.os;
  Window_FrameWidth = PlatformOS === "win" ? 16 : 0;
  Window_FrameHeight = window.outerHeight - window.innerHeight * (window.outerWidth - Window_FrameWidth) / window.innerWidth;
});
document.getElementById("dbTickerVersion").textContent = "Ticker Version: "+AppVersionCode+" ("+AppVersionView+")";

// named: siH
document.siH = document.getElementsByName("siH")[0];

// main interval
const elements = {
  id: {
    setIntervalNHKquake: document.getElementById("setIntervalNHKquake"),
    setIntervalWNImscale: document.getElementById("setIntervalWNImscale"),
    setIntervalWNIsorabtn: document.getElementById("setIntervalWNIsorabtn"),
    setIntervalWNIriver: document.getElementById("setIntervalWNIriver"),
    setIntervalJMAfcst: document.getElementById("setIntervalJMAfcst"),
    setIntervalJmaWt: document.getElementById("setIntervalJmaWt"),
    setIntervalWNItm: document.getElementById("setIntervalWNItm"),
    setIntervalTpcBlackOut: document.getElementById("setIntervalTpcBlackOut"),
    setIntervalIedred: document.getElementById("setIntervalIedred"),
    setIntervalTenkiJpTsu: document.getElementById("setIntervalTenkiJpTsu"),
    setIntervalWarn: document.getElementById("setIntervalWarn"),
    setIntervalTyphCom: document.getElementById("setIntervalTyphCom"),
    viewTsunamiType: document.getElementById("viewTsunamiType"),
    dbPfDrawing: document.getElementById("dbPfDrawing"),
    tfMonitorBase: document.getElementById("tfMonitorBase"),
    masterGainRange: document.getElementById("master-gain-range"),
    masterGainOutput: document.getElementById("master-gain-output"),
    gainTimer: document.getElementById("settings-gain-timer"),
    gainTimers: [],
    scheduleAdd: document.getElementById("schedule-add"),
    volEEWl1: document.getElementById('volEEWl1'),
    volEEWl5: document.getElementById('volEEWl5'),
    volEEWl9: document.getElementById('volEEWl9'),
    volEEWh: document.getElementById('volEEWh'),
    volEEWc: document.getElementById('volEEWc'),
    volEEWp: document.getElementById('volEEWp'),
    volGL: document.getElementById('volGL'),
    volNtc: document.getElementById('volNtc'),
    volSpW: document.getElementById('volSpW'),
    volTnm: document.getElementById('volTnm'),
    volHvRa: document.getElementById('volHvRa'),
    volFldOc4: document.getElementById('volFldOc4'),
    volFldOc5: document.getElementById('volFldOc5'),
    setClipEEW: document.getElementById('setClipEEW'),
    v: document.getElementById('v'),
    wtWarnTableBody: document.getElementById('wtWarnTableBody'),
    movietime: document.getElementById('movietime'),
    setParticallyReadingAme: document.getElementById("setParticallyReadingAme"),
    dbMemoryAvCap: document.getElementById('dbMemoryAvCap'),
    dbMemoryWhCap: document.getElementById('dbMemoryWhCap'),
    dbCpuUsages: document.getElementById('dbCpuUsages'),
    dbTickerVersion: document.getElementById("dbTickerVersion"),
    tsunamiList: document.getElementById("tsunamiList"),
    dataSaverBox: document.getElementById("dataSaverBox"),
    eewTime: document.getElementById("eewTime"),
    /** @type {HTMLDivElement} */ speechStatusCurrent: document.getElementById("speech-status-current"),
    /** @type {HTMLInputElement} */ speechVolInput: document.getElementById("speech-vol-input"),
    /** @type {HTMLSpanElement} */ speechVolView: document.getElementById("speech-vol-view"),
    /** @type {HTMLInputElement} */ speechCheckboxEEW: document.getElementById("speech-checkbox-eew"),
    /** @type {HTMLInputElement} */ speechCheckboxQuake: document.getElementById("speech-checkbox-quake"),
    /** @type {HTMLInputElement} */ speechCheckboxVPOA50: document.getElementById("speech-checkbox-vpoa50"),
    /** @type {HTMLInputElement} */ speechCheckboxGround: document.getElementById("speech-checkbox-ground"),
    /** @type {HTMLInputElement} */ speechCheckboxSPwarn: document.getElementById("speech-checkbox-specialwarn"),
  },
  class: {
    tab_item: Array.from(document.getElementsByClassName("tab-item")),
    switch_button: Array.from(document.getElementsByClassName("switch-button")),
    wtWarnListMsg: Array.from(document.getElementsByClassName("wtWarnListMsg")),
    sound_quake_volume: Array.from(document.getElementsByClassName("sound_quake_volume")),
    sound_quake_type: Array.from(document.getElementsByClassName("sound_quake_type"))
  },
  name: {
    unitTemp: [
      document.getElementsByName('unitTemp')[0]
    ],
    unitWinds: [
      document.getElementsByName('unitWinds')[0]
    ]
  },
};
const animations = {
  switchTabs: []
};

// system sounds_

const Assets = {
  sound: {
    start: { _src: "../sound/main-started.mp3" },
    quake: {
      normal: { _src: "../sound/quake-notice.mp3" },
      major: { _src: "../sound/quake-major.mp3" },
    },
    warning: {
      Notice: { _src: "../sound/warn-tornado.mp3" },
      GroundLoosening: { _src: "../sound/warn-ground.mp3" },
      Emergency: { _src: "../sound/warn-emergency.mp3" },
      HeavyRain: { _src: "../sound/warn-heavyrain.mp3" },
      Flood5: { _src: "../sound/warn-flood5.mp3" },
      Flood4: { _src: "../sound/warn-flood4.mp3" },
    },
    tsunami: {
      notice: { _src: "../sound/tsunami-0.mp3" },
      watch: { _src: "../sound/tsunami-1.mp3" },
      warning: { _src: "../sound/tsunami-2.mp3" },
      majorwarning: { _src: "../sound/tsunami-3.mp3" },
      obs: { _src: "../sound/tsunami-obs.mp3" },
    },
    eew: {
      plum: { _src: "../sound/eew-plum.mp3" },
      first: { _src: "../sound/eew-first.mp3" },
      continue: { _src: "../sound/eew-continue.mp3" },
      last: { _src: "../sound/eew-last.mp3" },
      custom: { _src: "../sound/eew-custom.mp3" },
    }
  }
};
const sounds = Assets.sound;

// Stream Recorder （2024/07/19 削除）

// initialize Web Audio API
const audioAPI = {
  context: new AudioContext(),
  /** @type {GainNode} */
  masterGain: null,
  /** @type {GainNode} */
  gainNode: null,
  /** @type {OscillatorNode} */
  oscillatorNode: null,
  init: function(){
    // マスター音量
    audioAPI.masterGain = audioAPI.context.createGain();
    audioAPI.masterGain.gain.value = 1;
    audioAPI.masterGain.connect(audioAPI.context.destination);
    // Oscillatorのための準備
    audioAPI.gainNode = audioAPI.context.createGain();
    audioAPI.gainNode.gain.value = 0.1;
    audioAPI.oscillatorNode = undefined;
    audioAPI.gainNode.connect(audioAPI.masterGain);
  },
  fun: {
    setOscillator: function(){
      audioAPI.oscillatorNode = audioAPI.context.createOscillator();
      audioAPI.oscillatorNode.connect(audioAPI.gainNode);
      audioAPI.oscillatorNode.frequency.value = 1000; // 987.767 - 1318.510
      audioAPI.oscillatorNode.type = "sine";
      audioAPI.oscillatorNode.addEventListener("ended", function(){
        const freq = audioAPI.oscillatorNode.frequency.value;
        audioAPI.oscillatorNode.disconnect(audioAPI.gainNode);
        audioAPI.fun.setOscillator();
        audioAPI.oscillatorNode.frequency.value = freq;
      });
      audioAPI.oscillatorNode.starting = false;
    },
    startOscillator: function(){
      audioAPI.oscillatorNode.starting = true;
      audioAPI.oscillatorNode.start();
    },
    stopOscillator: function(time = 0){
      audioAPI.oscillatorNode.starting = false;
      try { audioAPI.oscillatorNode.stop(audioAPI.context.currentTime + time); } catch {}
    },
    freqB5: function(){audioAPI.oscillatorNode.frequency.value = 987.767;},
    freqE6: function(){audioAPI.oscillatorNode.frequency.value = 1318.51;},
    freqTS: function(){audioAPI.oscillatorNode.frequency.value = 1000;}
  },
  gainTimer: [],
  getGainTimer (){
    this.gainTimer = [];
    for (const item of elements.id.gainTimers){
      const time = item.time.valueAsDate;
      if (!time) continue;
      this.gainTimer.push({
        effective: item.effective.checked,
        target: item.target.value,
        time: { h: time.getUTCHours(), m: time.getUTCMinutes() },
        gain: item.gain.valueAsNumber
      });
    }
  },
  setGainTimer (programs){
    for (const item of programs){
      this.addGainTimer(item.effective, (("0" + item.time.h).slice(-2) + ":" + ("0" + item.time.m).slice(-2)), item.gain, item.target);
    }
    this.getGainTimer();
  },
  addGainTimer (valEffective = false, valTime = "", valGain = "", valTarget = "master"){
    if (typeof valEffective !== "boolean") valEffective = false;
    const child = document.createElement("div");
    const label = document.createElement("label");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");
    const effective = document.createElement("input");
    const time = document.createElement("input");
    const gain = document.createElement("input");
    const target = document.createElement("select");
    target.add(new Option("マスター音量", "master", true));
    target.add(new Option("読み上げ音量", "speech"));
    const button = document.createElement("button");
    const removeImg = document.createElement("img");
    removeImg.src = "/img/remove.svg";
    span1.textContent = " - ";
    span2.textContent = "に";
    span3.textContent = "を";
    span4.textContent = "%へ設定";
    effective.type = "checkbox";
    effective.checked = valEffective;
    time.type = "time";
    time.value = valTime;
    gain.type = "number";
    gain.value = 100;
    gain.min = 0;
    gain.max = 100;
    gain.value = valGain;
    target.value = valTarget;
    button.classList.add("timer-remove-icon");
    label.append(effective, span1, time, span2, target, span3, gain, span4);
    button.appendChild(removeImg);
    child.append(label, button);
    elements.id.gainTimer.appendChild(child);
    removeImg.index = elements.id.gainTimers.length;
    elements.id.gainTimers.push({ target, effective, time, gain, child });
    removeImg.addEventListener("click", event => {
      const target = elements.id.gainTimers[event.target.index];
      if (!confirm("この時刻指定を削除しますか？")) return;
      elements.id.gainTimers.splice(event.target.index, 1);
      target.child.remove();
      audioAPI.getGainTimer();
    });
    for (const item of elements.id.gainTimers){
      item.target.addEventListener("input", audioAPI.getGainTimer.bind(audioAPI));
      item.effective.addEventListener("input", audioAPI.getGainTimer.bind(audioAPI));
      item.time.addEventListener("input", audioAPI.getGainTimer.bind(audioAPI));
      item.gain.addEventListener("input", audioAPI.getGainTimer.bind(audioAPI));
    }
    return elements.id.gainTimers[removeImg.index];
  },
  get masterGainValue (){
    return audioAPI.masterGain.gain.value;
  },
  set masterGainValue (value){
    elements.id.masterGainOutput.textContent = Math.floor((audioAPI.masterGain.gain.value = value) * 100) + "%"
  }
};
elements.id.scheduleAdd.addEventListener("click", audioAPI.addGainTimer.bind(audioAPI));
audioAPI.init();
audioAPI.fun.setOscillator();

// volume list(seismic intensity)
// const earthquakeReceiveVolumeList = [0.3,0.5,0.7,0.8,0.9,1,1,1,1];
// Mscale
var mscale = 0;
// Earthquake Information offset(latest=0)
var quakeinfo_offset_cnt = 0;
// text location
var textOffsetX = 1200;

var quakeText = ["","","","","","","","","","",""];
// epicenter list of JMA
const EpiNameList_JMA = ["石狩地方北部","石狩地方中部","石狩地方南部","後志地方北部","後志地方東部","後志地方西部","空知地方北部","空知地方中部","空知地方南部","渡島地方北部","渡島地方東部","渡島地方西部","檜山地方","北海道奥尻島","胆振地方西部","胆振地方中東部","日高地方西部","日高地方中部","日高地方東部","上川地方北部","上川地方中部","上川地方南部","留萌地方中北部","留萌地方南部","宗谷地方北部","宗谷地方南部","北海道利尻礼文","網走地方","北見地方","紋別地方","十勝地方北部","十勝地方中部","十勝地方南部","釧路地方北部","釧路地方中南部","根室地方北部","根室地方中部","根室地方南部","青森県津軽北部","青森県津軽南部","青森県三八上北","青森県下北","岩手県沿岸北部","岩手県沿岸南部","岩手県内陸北部","岩手県内陸南部","宮城県北部","宮城県中部","宮城県南部","秋田県沿岸北部","秋田県沿岸南部","秋田県内陸北部","秋田県内陸南部","山形県庄内","山形県最上","山形県村山","山形県置賜","福島県中通り","福島県浜通り","福島県会津","茨城県北部","茨城県南部","栃木県北部","栃木県南部","群馬県北部","群馬県南部","埼玉県北部","埼玉県南部","埼玉県秩父","千葉県北東部","千葉県北西部","千葉県南部","東京都２３区","東京都多摩東部","東京都多摩西部","伊豆大島","新島","神津島","三宅島","八丈島","小笠原","神奈川県東部","神奈川県西部","新潟県上越","新潟県中越","新潟県下越","新潟県佐渡","富山県東部","富山県西部","石川県能登","石川県加賀","福井県嶺北","福井県嶺南","山梨県東部・富士五湖","山梨県中・西部","長野県北部","長野県中部","長野県南部","岐阜県飛騨","岐阜県美濃東部","岐阜県美濃中西部","伊豆地方","静岡県東部","静岡県中部","静岡県西部","愛知県東部","愛知県西部","三重県北部","三重県中部","三重県南部","滋賀県北部","滋賀県南部","京都府北部","京都府南部","大阪府北部","大阪府南部","兵庫県北部","兵庫県南東部","兵庫県南西部","兵庫県淡路島","奈良県","和歌山県北部","和歌山県南部","鳥取県東部","鳥取県中部","鳥取県西部","島根県東部","島根県西部","島根県隠岐","岡山県北部","岡山県南部","広島県北部","広島県南東部","広島県南西部","山口県北部","山口県東部","山口県中部","山口県西部","徳島県北部","徳島県南部","香川県東部","香川県西部","愛媛県東予","愛媛県中予","愛媛県南予","高知県東部","高知県中部","高知県西部","福岡県福岡","福岡県北九州","福岡県筑豊","福岡県筑後","佐賀県北部","佐賀県南部","長崎県北部","長崎県南西部","長崎県島原半島","長崎県対馬","長崎県壱岐","長崎県五島","熊本県阿蘇","熊本県熊本","熊本県球磨","熊本県天草・芦北","大分県北部","大分県中部","大分県南部","大分県西部","宮崎県北部平野部","宮崎県北部山沿い","宮崎県南部平野部","宮崎県南部山沿い","鹿児島県薩摩","鹿児島県大隅","鹿児島県十島村","鹿児島県甑島","鹿児島県種子島","鹿児島県屋久島","鹿児島県奄美北部","鹿児島県奄美南部","沖縄県本島北部","沖縄県本島中南部","沖縄県久米島","沖縄県大東島","沖縄県宮古島","沖縄県石垣島","沖縄県与那国島","沖縄県西表島"];
// epicenter list of NHK
const EpiNameList_NHK = ["石狩北部","石狩中部","石狩南部","後志北部","後志東部","後志西部","空知北部","空知中部","空知南部","渡島北部","渡島東部","渡島西部","檜山地方","北海道奥尻島","胆振西部","胆振中東部","日高西部","日高中部","日高東部","上川地方北部","上川地方中部","上川地方南部","留萌中北部","留萌南部","宗谷北部","宗谷南部","北海道利尻礼文","網走地方","北見地方","紋別地方","十勝北部","十勝中部","十勝南部","釧路北部","釧路中南部","根室北部","根室中部","根室南部","津軽北部","津軽南部","青森三八上北","青森下北","岩手沿岸北部","岩手沿岸南部","岩手内陸北部","岩手内陸南部","宮城北部","宮城中部","宮城南部","秋田沿岸北部","秋田沿岸南部","秋田内陸北部","秋田内陸南部","山形庄内地方","山形最上地方","山形村山地方","山形置賜地方","福島中通り","福島浜通り","会津","茨城北部","茨城南部","栃木北部","栃木南部","群馬北部","群馬南部","埼玉北部","埼玉南部","秩父地方","千葉北東部","千葉北西部","千葉南部","東京２３区","東京多摩東部","東京多摩西部","伊豆大島","新島地方","神津島","三宅島","八丈島","小笠原","神奈川東部","神奈川西部","新潟上越地方","新潟中越地方","新潟下越地方","佐渡地方","富山東部","富山西部","能登地方","加賀地方","福井嶺北地方","福井嶺南地方","山梨東部・富士五湖","山梨中・西部","長野北部","長野中部","長野南部","飛騨地方","美濃東部","美濃中西部","伊豆地方","静岡東部","静岡中部","静岡西部","愛知東部","愛知西部","三重北部","三重中部","三重南部","滋賀北部","滋賀南部","京都北部","京都南部","大阪北部","大阪南部","兵庫北部","兵庫南東部","兵庫南西部","淡路島","奈良県","和歌山北部","和歌山南部","鳥取東部","鳥取中部","鳥取西部","島根東部","島根西部","隠岐","岡山北部","岡山南部","広島北部","広島南東部","広島南西部","山口北部","山口東部","山口中部","山口西部","徳島北部","徳島南部","香川東部","香川西部","愛媛東予地方","愛媛中予地方","愛媛南予地方","高知東部","高知中部","高知西部","福岡地方","北九州地方","筑豊地方","筑後地方","佐賀北部","佐賀南部","長崎北部","長崎南西部","島原半島","対馬地方","壱岐地方","五島地方","阿蘇地方","熊本地方","球磨地方","天草・芦北","大分北部","大分中部","大分南部","大分西部","宮崎北部平野部","宮崎北部山沿い","宮崎南部平野部","宮崎南部山沿い","薩摩地方","大隅地方","十島村","甑島","種子島地方","屋久島地方","奄美北部","奄美南部","沖縄本島北部","沖縄本島中南部","久米島","大東島","宮古島","石垣島","与那国島","西表島"];
// 緊急地震速報の文
const eewWarnTextList = [];
for (let i = 33; i < 56; i++){
  eewWarnTextList.push({
    ja: multilingual[0][i].split("\r\n"),
    en: multilingual[1][i].split("\r\n")
  });
}

var q_maxShindo = -1; //「+1」の部分は、震度に「5弱以上と推定」を追加した部分。
var q_currentShindo = q_maxShindo;

// constants for Shindo names
const shindoListJP = ["","1","2","3","4","5弱以上","5弱","5強","6弱","6強","7"];
const shindoListNHK = ["","1","2","3","4","?","5-","5+","6-","6+","7"]

// variables for weather informations
var siHnum,
    siHstr,
    textSpeed = 5,
    viewMode = 0,
    language = "Ja",
    timeCount = 0,
    directTexts = [
      '<weather/temperature/high>',
      '<weather/temperature/low>',
      '<weather/rain/1h>',
      '<weather/rain/24h>',
      '<weather/wind>',
      '最高気温(℃)',
      '最低気温(℃)',
      '時降水量(mm/h)',
      '日降水量(mm/d)',
      '最大風速(m/s)'
    ],
    commandShortcuts = {},
    textCmdIds = [1,2,11,13,20],
    textCount = 5,
    viewingTextIndex = 0,
    heightBeforeFull = 0;
// earthquake variables
var q_msiText = shindoListJP[q_maxShindo],
    q_magnitude = "",
    q_epiName = "",
    q_depth = "",
    q_timeYY = "",
    q_timeMM = "",
    q_timeDD = "",
    q_timeH = "",
    q_timeM = "",
    q_timeAll = "",
    q_startTime = 0,
    q_epiId = 0,
    quake_customComment = "";
var earthquakes_log = {};
// variables of Earthquake Early Warning
var eewEpicenter = '',
    eewOriginTime = new Date("2000/01/01 00:00:00"),
    eewCalcintensity = '',
    eewCalcIntensityIndex = '',
    eewDepth = '',
    eewAlertFlgText = '',
    eewCancelText = '',
    eewMagnitude = '',
    eewReportNumber = '',
    eewReportID = '',
    eewIsFinal = true,
    eewIsTraning = false,
    eewIsCancel = false,
    eewIsAlert = false,
    eewAt = new Date("2000/01/01 00:00:00"),
    eewEpicenterID = "",
    eewIsSea = false,
    eewIsAssumption = false,
    eewWarnForecast = "",
    // eewAboutHypocenter = "",
    eewClassCode = null,
    eewRequestType = "";
// int
var i = 0,
    i2 = 0;
const NewsOperator = {
  standby: [],
  endTime: 0,
  middleWidth: -1,
  viewDuration: 18000,
  DEFAULT_DURATION: 18000,
  viewing: {
    title: "",
    description: "",
    detail: ""
  },
  clearAll: function (){
    this.standby = [];
    this.endTime = 0;
    this.middleWidth = -1;
  },
  next: function (){
    this.middleWidth = -1;
    this.endTime = 0;
    if (this.standby.length && viewMode !== 1){
      this.viewing.title = this.standby[0].title ?? "";
      this.viewing.description = this.standby[0].description ?? "";
      this.viewing.detail = this.standby[0].detail ?? "";
      this.viewDuration = this.standby[0].duration ?? this.DEFAULT_DURATION;
      this.standby.shift();
      this.endTime = Date.now() + this.viewDuration;
      SetMode(3);
    }
    return !!this.endTime;
  },
  add: function (title, description, detail, {repeat = 1, duration = 18000} = {}){
    for (let i=0; i<repeat; i++) this.standby.push({title, description, detail, duration});
    if (!this.endTime) this.next();
  },
  /**
   * @return {Number} 1→0に
   */
  get progress (){
    return (this.endTime - Date.now()) / this.viewDuration;
  }
};
// tsunami information
var t_Cancelled = true,
    t_lastId,
    t_page = 0,
    t_obsUpdateTime = 0,
    t_viewType = 2;
var systemTimeLag = 0; // ミリ秒単位

var riverlevel = new Array(7);
var rivertext = ["","","","","","",""];
rivertext[0] = "wfi";
var riveralltext = "";
var timetableStr = "";
// 情報の読み込みを管理するオブジェクトです。
const XHRs = {
  diderr: function (event){
    errorCollector.collect("("+event.timeStamp+") XMLHttpRequestでエラーが発生しました。isTrustedは"+errorCollector.true_or_false(event.isTrusted)+"です。\nRequest Type: "+event.target.parent.tracker.viewName+" / Timeout: "+event.target.parent.timeout+"(ms)");
  },
  didtimeout: function (event){ console.warn("タイムアウトです。\n"+this.timeout+"ミリ秒が経過したため、読み込みは中断されました。")},
  mscale: {
    body: new XMLHttpRequest(),
    load: function(){
      this.body.timeout = this.timeout;
      this.body.open("GET", RequestURL.wni_mscale+'?_='+new Date().getTime());
      this.body.send();
    },
    timeout: 8500,
    tracker: new TrafficTracker("WNI / Mスケール")
  },
  getJMAforecast: {
    body: new XMLHttpRequest(),
    load: function(){
      // this.body.timeout = this.timeout;
      // this.body.open("GET", 'https://www.jma.go.jp/bosai/forecast/data/forecast/map.json?'+new Date().getTime());
      // this.body.send();
    },
    timeout: 61000,
    tracker: new TrafficTracker("JMA / 天気予報")
  },
  river: {
    body: new XMLHttpRequest(),
    load: function(){
      this.body.timeout = this.timeout;
      this.body.open("GET", RequestURL.wni_river+'?'+new Date().getTime());
      this.body.send();
    },
    timeout: 350000,
    tracker: new TrafficTracker("WNI / 河川情報")
  },
  wnlTimetable: {
    body: new XMLHttpRequest(),
    load: function(){
      this.body.timeout = this.timeout;
      this.body.open("GET", RequestURL.wniliveTimeTable+'?_='+new Date().getTime());
      this.body.send();
    },
    timeout: 5000,
    tracker: new TrafficTracker("WNL / 番組表")
  }
};
XHRs.mscale.body.parent = XHRs.mscale;
XHRs.mscale.body.addEventListener("load", function(){
  let json = JSON.parse(this.response);
  this.parent.tracker.update();
  if(mscale !== json.mscale-1) SetMscale(json.mscale-1);
});
XHRs.mscale.body.addEventListener("error", XHRs.diderr);
XHRs.mscale.body.addEventListener("timeout", XHRs.didtimeout);
XHRs.getJMAforecast.body.parent = XHRs.getJMAforecast;
XHRs.getJMAforecast.body.addEventListener("load", function(){});
XHRs.getJMAforecast.body.addEventListener("error", XHRs.diderr);
XHRs.getJMAforecast.body.addEventListener("timeout", XHRs.didtimeout);
XHRs.river.body.parent = XHRs.river;
XHRs.river.body.addEventListener("load", function(){
  let riverWarnDatas = [];
  this.parent.tracker.update();
  let text = this.response;
  let lines = text.split(/[\r\n]/);
  let headers = [];
  {
    let w = lines[0].split(/,/);
    for(let i=0, l=w.length; i<l; i++){
      headers.push(w[i]);
    }
  }
  for(let i=2, l=lines.length; i<l; i++){
    let w = lines[i].split(/,/);
    let point = {};
    for(let i2=0, l2=w.length; i2<l2; i2++){
      point[headers[i2]] = w[i2];
    }
    let id = point.id;
    if(riverPoints.hasOwnProperty(id)){
      let volume = point.volume-0;
      let diff = volume-point.pre_volume;
      let announced_time = new Date(point.announced_time*1000);
      let river_name = riverPoints[id].river_name;
      let point_name = riverPoints[id].point_name;
      riverWarnDatas.push({
        id, volume, diff, announced_time, rank: point.rank,
        point_name: point_name + ((river_name && point_name != river_name && river_name != 'その他') ? " (" + river_name + ")" : "")
      });
    }
  }
  // riverlevel[0] = data.filter(function(arr){ return arr['properties']['LEVEL'] == -1 });
  riverlevel[1] = riverWarnDatas.filter(function(arr){ return arr.rank == "0" });
  riverlevel[2] = riverWarnDatas.filter(function(arr){ return arr.rank == "1" });
  riverlevel[3] = riverWarnDatas.filter(function(arr){ return arr.rank == "2" });
  riverlevel[4] = riverWarnDatas.filter(function(arr){ return arr.rank == "3" });
  riverlevel[5] = riverWarnDatas.filter(function(arr){ return arr.rank == "4" });
  riverlevel[6] = riverWarnDatas.filter(function(arr){ return arr.rank == "5" });
  for(var i=1; i<7; i++){
    if(riverlevel[i].length) rivertext[i] = "　　【河川水位情報 "+["平常","水防団待機水位","氾濫注意水位","出動水位","避難判断水位","氾濫危険水位","計画高水位"][i]+"】　"; else rivertext[i] = "";
    rivertext[i] += riverlevel[i].map((a)=>{return a.point_name}).join("　/　");
  }
  rivertext[0] = "";
  riveralltext = arrayCombining(rivertext);
});
XHRs.river.body.addEventListener("error", XHRs.diderr);
XHRs.river.body.addEventListener("timeout", XHRs.didtimeout);
XHRs.wnlTimetable.body.parent = XHRs.wnlTimetable;
XHRs.wnlTimetable.body.addEventListener("load", function(){
  let data = JSON.parse(this.response);
  this.parent.tracker.update();
  timetableStr = "";
  data.forEach(function(value){
    timetableStr += value.hour+" → "+value.title+"　　";
  });
});
XHRs.wnlTimetable.body.addEventListener("error", XHRs.diderr);
XHRs.wnlTimetable.body.addEventListener("timeout", XHRs.didtimeout);


// initialize Background Music
var backMsc = [];

const images = {
  eew: {
    fc: new Image(),
    pub: new Image(),
    cancel: new Image()
  },
  fullview: new Image(),
  quake: {
    title: [
      [
        new Image(),
        new Image(),
        new Image()
      ],
      [
        new Image(),
        new Image(),
        new Image()
      ],
      [
        new Image(),
        new Image(),
        new Image()
      ]
    ],
    texts: {
      maxInt: [],
      magni: new Image(),
      magni2: new Image(),
      depth: {
        ja: new Image(),
        en: new Image(),
        ja2: new Image(),
        en2: new Image()
      },
      depth_km: new Image(),
      depth_km2: new Image(),
      intensity: { "#ffffff":[], "#333333":[] }
    }
  },
  texture_cv: {
    // "Microsoft Sans Serif": {
    //   40: {
    //     style_bold: {base:"Microsoft-Sans-Serif",px:40,weight:"bold",color:"fff"}
    //   }
    // }
  },
  texture: {
    "AdobeGothicStd-Bold": {
      none: {
        46: {}
      }
    },
    "AdobeHeitiStd-Regular": {
      bold: {
        46: {}
      }
    },
    "Microsoft-Sans-Serif": {
      bold: {
        40: {}
      }
    },
    "HelveticaNeue-CondensedBold": {
      bold: {
        50: {}
      }
    },
    "EEW_epicenter_JP_350": {
      image: new Image()
    },
    "EEW_epicenter_JP_328": {
      image: new Image()
    },
    "EEW_intensity": new Image()
  }
};
(function(textures){
  for (let s of textures){
    console.info(`images.texture["${s.base}"]["${s.weight?s.weight:"none"}"][${s.px}]`);
    let target = images.texture[s.base][s.weight?s.weight:"none"][s.px];
    let baseurl = "../img/texture/"+s.base+"_"+s.px+"px"+(s.weight?"_"+s.weight:"");
    if(!target.data){
      target.data = {};
      const xhr = new XMLHttpRequest();
      xhr.original = s;
      xhr.addEventListener("load", function(){
        console.log("Loaded: " + this.responseURL);
        let json = JSON.parse(this.response);
        let output = {};
        let texts = json.text;
        output.letters = {};
        for (let i=0, l=texts.length; i<l; i++){
          output.letters[texts[i]] = json.datas[i];
        }
        target.data = output;
        if(!images.texture_cv.hasOwnProperty(json.name)) images.texture_cv[json.name] = {};
        if(!images.texture_cv[json.name].hasOwnProperty(json.size)) images.texture_cv[json.name][json.size] = {};
        images.texture_cv[json.name][json.size]["style"+(json.bold?"_bold":"")+(json.italic?"_italic":"")] = this.original;
      });
      xhr.open("GET", baseurl+".json");
      xhr.send();
    }
    target[s.color] = new Image();
    target[s.color].src = baseurl+"_"+s.color+".png";
  }
})([
  { px: 46, color: "000000", weight: "", base: "AdobeGothicStd-Bold" },
  { px: 46, color: "000000", weight:  "bold", base: "AdobeHeitiStd-Regular" },
  { px: 40, color: "ffffff", weight:  "bold", base: "Microsoft-Sans-Serif" },
  { px: 50, color: "333333", weight:  "bold", base: "HelveticaNeue-CondensedBold" },
  { px: 50, color: "ffffff", weight:  "bold", base: "HelveticaNeue-CondensedBold" }
]);
// https://i.stack.imgur.com/6yhO4.png
const DrawTextureText = (text, x, y, option, maxWidth) => {
  text = text+"";
  if(!option.color) option.color = context.fillStyle.slice(1);
  let target = images.texture[option.base][option.weight?option.weight:"none"][option.px];
  let letters = target.data.letters;
  let z = 0;
  let wholeWidth = 0;
  let ratio = 1;
  let letterSpacing = option.letterSpacing ?? 2;
  if (maxWidth){
    for (let i=0, l=text.length; i<l; i++){
      wholeWidth += letters[text[i]].font.width + letterSpacing;
    }
    ratio = Math.min(1, maxWidth / wholeWidth);
  }
  for (let i=0, l=text.length; i<l; i++){;
    const data = letters[text[i]];
    const img = target[option.color];
    if (!("imgBmp" in target[option.color])){
      createImageBitmap(img).then((function(bmp){this.imgBmp = bmp;}).bind(target[option.color]));
    }
    const bmp = target[option.color].imgBmp;
    const measure = data.font;
    const fx = data.position.x;
    const fy = data.position.y;
    const whole_x = Math.ceil(measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight)+2;
    const whole_y = Math.ceil(measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent);
    if (bmp) context.drawImage(
      img,
      fx,
      Math.floor(fy-measure.actualBoundingBoxAscent)-1,
      whole_x,
      whole_y + 2,
      x-measure.actualBoundingBoxLeft+z,
      Math.floor(y-measure.actualBoundingBoxAscent)-1,
      whole_x*ratio,
      whole_y + 2
    );
    z += (measure.width + letterSpacing) * ratio;
    // debugger;
  }
};
HTMLImageElement.prototype.toImageData = function (){
  const canvas = this.toImageData.canvas;
  const ct = this.toImageData.ct;
  canvas.width = this.width;
  canvas.height = this.height;
  ct.clearRect(0, 0, this.width, this.height);
  ct.drawImage(this, 0, 0);
  return ct.getImageData(0, 0, this.width, this.height);
};
HTMLImageElement.prototype.toImageData.canvas = document.createElement("canvas");
HTMLImageElement.prototype.toImageData.ct = HTMLImageElement.prototype.toImageData.canvas.getContext("2d", { willReadFrequently: true });

images.texture.EEW_epicenter_JP_350.image.src = "img/texture/eew_epicenter_JP_limit350.png";
fetch("img/texture/eew_epicenter_JP_limit350.json").then(response => response.json()).then(json => {
  images.texture.EEW_epicenter_JP_350.data = json;
});
images.texture.EEW_epicenter_JP_328.image.src = "img/texture/eew_epicenter_JP_limit328.png";
fetch("img/texture/eew_epicenter_JP_limit350.json").then(response => response.json()).then(json => {
  images.texture.EEW_epicenter_JP_328.data = json;
});
images.texture.EEW_intensity.src = "img/texture/eew_intensity.png";
CanvasRenderingContext2D.prototype.drawTextureImage = {};
CanvasRenderingContext2D.prototype.drawTextureImage.EEW_epicenter = (type, x, y, option) => {
  if (!images.texture.EEW_epicenter_JP_350.hasOwnProperty("data")) return false;
  if (!images.texture.EEW_epicenter_JP_328.hasOwnProperty("data")) return false;
  switch (type){
    case "JP_350":
    case "JP_328":
      if (!option.id) return;
      const parent = images.texture["EEW_epicenter_"+type];
      const data = parent.data.datas;
      if (!("imgBmp" in parent)){
        parent.imgBmp = null;
        createImageBitmap(parent.image).then((function(bmp){this.imgBmp = bmp;}).bind(parent));
      }
      const imgBmp = parent.imgBmp;
      const position = data[data.findIndex(item => item.id === option.id)].position;
      if (position === -1) return false;
      if (imgBmp) context.drawImage(imgBmp, position.x, position.y-55, 352, 68, x, y, 352, 68);
      break;
  }
  return true;
};
CanvasRenderingContext2D.prototype.drawTextureImage.EEW_intensity = (x, y, index) => {
  const target = images.texture.EEW_intensity;
  if (!("imgBmp" in target)){
    target.imgBmp = null;
    createImageBitmap(target).then((function(bmp){this.imgBmp = bmp;}).bind(target));
  }
  if (target.imgBmp) context.drawImage(target.imgBmp, 0, index*68, 100, 68, x, y, 100, 68);
};
const sorabtn_qr_img = new Image();
{
  const onImageLoaded = function (){
    const target = this;
    createImageBitmap(target).then((function(bmp){this.imgBmp = bmp;}).bind(target));
  }
  sorabtn_qr_img.onload = onImageLoaded; sorabtn_qr_img.src = "../img/sorabtn.png";
  images.eew.fc.onload = onImageLoaded; images.eew.fc.src = "../img/eew1234.png";
  images.eew.pub.onload = onImageLoaded; images.eew.pub.src = "../img/eew567.png";
  images.eew.cancel.onload = onImageLoaded; images.eew.cancel.src = "../img/eewCancelled.png";
  for (let i=0; i<3; i++) for (let j=0; j<3; j++) {
    const img = images.quake.title[i][j];
    img.onload = onImageLoaded;
    img.src = "../img/theme"+i+"quakeTop"+j+".png";
  }
  for (let i=0; i<3; i++) {
    images.quake.texts.maxInt.push({ ja:[], en:[] });
    for (let j=0; j<9; j++) {
      images.quake.texts.maxInt[i].ja[j] = new Image();
      images.quake.texts.maxInt[i].en[j] = new Image();
      images.quake.texts.maxInt[i].ja[j].src = `../img/texts/maxint/mscale${i}/ja/${j}.png`;
      images.quake.texts.maxInt[i].en[j].src = `../img/texts/maxint/mscale${i}/en/${j}.png`;
    }
  }
  images.quake.texts.magni.src = "../img/texts/magnitude.png";
  images.quake.texts.magni2.src = "../img/texts/M2-magnitude.png";
  images.quake.texts.depth.ja.src = "../img/texts/depth-ja.png";
  images.quake.texts.depth.ja2.src = "../img/texts/M2-depth-ja.png";
  images.quake.texts.depth.en.src = "../img/texts/depth-en.png";
  images.quake.texts.depth.en2.src = "../img/texts/M2-depth-en.png";
  images.quake.texts.depth_km.src = "../img/texts/depth-km.png";
  images.quake.texts.depth_km2.src = "../img/texts/M2-depth-km.png";
  images.fullview.src = "../img/fullview-message.png";
  for (let i=0; i<11; i++) {
    const zero = images.quake.texts.intensity["#ffffff"];
    const one = images.quake.texts.intensity["#333333"];
    zero[i] = new Image();
    zero[i].src = "../img/texts/intensity/ffffff/"+i+".png";
    one[i] = new Image();
    one[i].src = "../img/texts/intensity/333333/"+i+".png";
  }
};

function getAdjustedDate(){
  const targetTime = new Date();
  if (Math.abs(systemTimeLag) >= 60000) targetTime.setMilliseconds(targetTime.getMilliseconds()+systemTimeLag);
  return targetTime;
}

// main variables
var soraopen_moving = 1081;
var soraopen_move = null;
var intervalArray = [];
var soraopen_color = 0;
var soraopen_intervaltime = 0;
var intervalTime = 0;
var intervalTime1 = 0;
var soraopen_interval1 = null;
var earthquake_telop_times = 0;
var earthquake_telop_remaining = 1500;
var t=0;
var cnv_anim1 = new Variable_Animation(440, "sliding", []);
var anim_soraview = new Variable_Animation(250, "sliding_3", [1081, 1]);
var anim_soraview_color = new Variable_Animation(250, "Normal", [0, 255]);
var anim_soraopen = new Variable_Animation(2100, "sliding", [0, 210]);
var anim_fullscreen = new Variable_Animation(3000, "Normal", [5, 0]);
var summary = false;
var testNow = false;
var lastSaveTime = Date.now();

// intensity list
const intensity_list = {
  "-1": undefined,
  "10": "1",
  "20": "2",
  "30": "3",
  "40": "4",
  "45": "5弱",
  "46": "不明",
  "50": "5強",
  "55": "6弱",
  "60": "6強",
  "65": "7"
};

function savedata(){
  const data = {
    mode0: {
      title: [
        document.getElementById('title1').value,
        document.getElementById('title2').value,
        document.getElementById('title3').value,
        document.getElementById('title4').value,
        document.getElementById('title5').value
      ],
      main: [
        document.getElementById('message1').value,
        document.getElementById('message2').value,
        document.getElementById('message3').value,
        document.getElementById('message4').value,
        document.getElementById('message5').value
      ]
    },
    mode3: [
      document.getElementById('BNtitle').value,
      document.getElementById('BNtext1').value,
      document.getElementById('BNtext2').value
    ],
    settings: {
      tickerSpeed: document.getElementById("speedVal").valueAsNumber,
      // fixitem: [
      //   document.getElementsByName('scrollfix')[0].checked,
      //   document.getElementsByName('scrollfix')[1].checked,
      //   document.getElementsByName('scrollfix')[2].checked,
      //   document.getElementsByName('scrollfix')[3].checked,
      //   document.getElementsByName('scrollfix')[4].checked
      // ],
      viewTsunamiType: elements.id.viewTsunamiType.value,
      soraview: document.getElementById('isSoraview').checked,
      details: {
        earthquake: {
          intensity: document.getElementsByName('minint')[0].value,
          magnitude: document.getElementsByName('minmag')[0].value,
          depth: document.getElementsByName('depmin')[0].value
        },
        eew: {
          intensity: document.getElementsByName('eewminint')[0].value,
          unknown: document.getElementsByName('eewintunknown')[0].value,
          magnitude: document.getElementsByName('eewminmag')[0].value,
          depth: document.getElementsByName('eewdepmin')[0].value
        }
      },
      clipboard: {
        eew: document.getElementById("setClipEEW").checked,
        quake: document.getElementById("setClipQuake").checked
      },
      interval: {
        iedred7584EEW: document.getElementById("setIntervalIedred").valueAsNumber,
        nhkQuake: elements.id.setIntervalNHKquake.valueAsNumber,
        jmaDevFeed: elements.id.setIntervalJmaWt.valueAsNumber,
        warnInfo: elements.id.setIntervalWarn.valueAsNumber,
        tenkiJPtsunami: elements.id.setIntervalTenkiJpTsu.valueAsNumber,
        typhComment: elements.id.setIntervalTyphCom.valueAsNumber,
        wniMScale: elements.id.setIntervalWNImscale.valueAsNumber,
        wniSorabtn: elements.id.setIntervalWNIsorabtn.valueAsNumber,
        wniRiver: elements.id.setIntervalWNIriver.valueAsNumber,
        wniliveTimeTable: elements.id.setIntervalWNItm.valueAsNumber,
      },
      volume: {
        eewL: [
          document.getElementById("volEEWl1").valueAsNumber,
          document.getElementById("volEEWl5").valueAsNumber,
          document.getElementById("volEEWl9").valueAsNumber
        ],
        eewH: document.getElementById("volEEWh").valueAsNumber,
        eewC: document.getElementById("volEEWc").valueAsNumber,
        eewP: document.getElementById("volEEWp").valueAsNumber,
        gl: document.getElementById("volGL").valueAsNumber,
        ntc: document.getElementById("volNtc").valueAsNumber,
        spW: document.getElementById("volSpW").valueAsNumber,
        tnm: document.getElementById("volTnm").valueAsNumber,
        hvra: document.getElementById('volHvRa').valueAsNumber,
        fldoc5: document.getElementById('volFldOc5').valueAsNumber,
        fldoc4: document.getElementById('volFldOc4').valueAsNumber,
        quake: []
      },
      gainPrograms: audioAPI.gainTimer,
      speech: {
        volume: document.getElementById("speech-vol-input").valueAsNumber,
        options: {
          EEW: elements.id.speechCheckboxEEW.checked,
          Quake: elements.id.speechCheckboxQuake.checked,
          VPOA50: elements.id.speechCheckboxVPOA50.checked,
          Ground: elements.id.speechCheckboxGround.checked,
          SPwarn: elements.id.speechCheckboxSPwarn.checked,
        }
      },
      theme: {
        color: document.getElementsByName("themeColors")[0].value
      },
      style: 0
    },
    app: {
      lastVer: AppVersionView,
      newUser: false,
      textSpeed
    }
  };
  elements.class.sound_quake_volume.forEach((volume, i) => {
    const type = elements.class.sound_quake_type[i];
    data.settings.volume.quake.push({
      volume: volume.value-0,
      type: type.getAttribute("data-type")
    });
  });
  lastSaveTime = Date.now();
  chrome.storage.sync.set(data, function(){/* console.log("Data recorded.", data)*/});
}

function bit(number, bitL){
  return number & (2 ** bitL) && 1;
}
function toRad(deg){
  return deg*(Math.PI/180);
}
function arrayCombining(array){
  if(rivertext[0] === "wfi"){
    return "情報の取得を待っています...";
  } else {
    let isNothing = true;
    let text = "";
    for(let i=0, l=array.length; i<l; i++){
      if(array[i]){
        if(isNothing) isNothing = false;
        text += array[i];
      }
    }
    if(isNothing){
      return "現在、警戒が必要な河川はありません。";
    } else {
      return text;
    }
  }
}

const speechBase = new AudioSpeechController();

// if (window.Notification){
//   if (Notification.permission === "denied"){
//     Notification.requestPermission(result => {
//       console.log("Notification.requestPermission(): " + result);
//     });
//   }
// }

fetch("https://script.google.com/macros/s/AKfycbyiKW-RWvZyeQC59RvDpBidR151sohEnzwESP2UewGk0BgDhcwh1M2Jw52chC8NJh-Y/exec?type=updChk&usVer="+AppVersionView).then(res => res.json()).then(json => {
  eewRequestType = json.eewRequestType;
  systemTimeLag = json.currentTime - Date.now();
  const verlist = [];
  for (const ver of json.beta.list) {
    verlist.push(ver.name);
  }
  const current = verlist.indexOf(AppVersionView);
  if (current > 0){
    chrome.windows.create({
      url: "updateNotice.html?txt="+encodeURIComponent(json.beta.list[0].string)+"&app="+encodeURIComponent(AppVersionView)+"&new="+encodeURIComponent(json.beta.list[0].name)+"&url="+encodeURIComponent(json.beta.list[0].jumpto),
      type: "popup",
      height: 325,
      width: 492
    });
  }
  if (current !== -1 && json.stopcode[json.beta.list[current].stopcode]){
    alert(json.stopcode[json.beta.list[current].stopcode]);
    background_send("mainclose");
  }
  if (eewLocalhostStreamPort !== 0){
    (async function(){
      try {
        /** @type {WebSocket} */
        const ws_client = await ws_establishConnection();
      } catch {}
    })();
  }
});
function ws_establishConnection(){
  return new Promise((resolve, reject) => {
    const ws_client = new WebSocket("ws://localhost:" + eewLocalhostStreamPort + "/ws");
    ws_client.addEventListener("open", () => {
      eewRequestType = "localhost:ws";
      ws_client.intervalId = setInterval(() => {
        if (ws_client.readyState === 3){
          clearInterval(ws_client.intervalId);
          ws_establishConnection();
        }
        ws_client.send("ping");
        console.info("WebSocket: ぴん…");
      }, 1000 * 60 * 5);
      ws_client.send("ping");
      ws_client.addEventListener("message", event => {
        if (event.data.charAt(0) === "{"){
          handleEewEventFromSocket(JSON.parse(event.data));
        }
        console.info("WebSocket: ぽん!");
      });
      resolve(ws_client);
    });
    ws_client.addEventListener("error", () => { reject(new Error("No servers available.")); });
    ws_client.addEventListener("close", () => { setTimeout(() => { ws_establishConnection(); console.info("User WebSocket: Closed."); }, 10000); });
  });
}

var riverPoints = null;
{
  let loadRiverPoints = new XMLHttpRequest();
  loadRiverPoints.addEventListener("load", function(){
    let text = this.response;
    if(text){
      riverPoints = {};
      let lines = text.split(/[\r\n]/);
      for(let i=0, l=lines.length; i<l; i++){
        if(lines[i]){
          let w = lines[i].split(/[\t,]/);
          let lid = w[0];
          riverPoints[lid] = { "lid": w[0], "point_name": w[3], "river_name": w[4], "parent_river": w[5], "address": w[6], "lat": w[1]*1, "lon": w[2]*1};
        }
      }
    }
  });
  loadRiverPoints.open("GET", "https://weathernews.jp/river/FRICS_LWTRLV.csv?"+Math.floor(new Date().getTime()/600000), false);
  loadRiverPoints.send();
}

var amedasStationTable = null;
{
  const ConvertDate = obj => `${obj.getUTCFullYear()}${((obj.getUTCMonth()+1)+"").padStart(2,"0")}${(obj.getUTCDate()+"").padStart(2,"0")}${(obj.getUTCHours()+"").padStart(2,"0")}${(obj.getUTCMinutes()+"").padStart(2,"0")}`;
  const loadAmedasStations = new XMLHttpRequest();
  loadAmedasStations.addEventListener("load", function(){
    const json = JSON.parse(this.response);
    for (const id in json){
      const target = json[id];
      const elems = target.elems;
      target.validTemp = elems[0] !== "0";
      target.validPrec = elems[1] !== "0";
      target.validWind = elems[2] !== "0";
      target.validSun = elems[3] !== "0";
      target.isSunEstimamtion = elems[3] === "2";
      target.validSnow = elems[4] !== "0";
      target.validHumidity = elems[5] !== "0";
      target.validPressure = elems[6] !== "0";
    }
    amedasStationTable = json;
  });
  loadAmedasStations.addEventListener("error", function(){
    console.error("アメダス地点情報を読み込むことが出来ませんでした。");
  });
  loadAmedasStations.open("GET", "https://www.jma.go.jp/bosai/amedas/const/amedastable.json?__time__="+ConvertDate(new Date()), false);
  loadAmedasStations.send();
}

function reflectNormalMsg(){
  document.getElementsByClassName("normal-text")[viewingTextIndex].style.background = "#fff";
  viewingTextIndex = 0;
  document.getElementsByClassName("normal-text")[0].style.background = "#ff0";
  textOffsetX = 1200;
  SetMode(0);
  directTexts[5] = document.getElementById('title1').value;
  directTexts[6] = document.getElementById('title2').value;
  directTexts[7] = document.getElementById('title3').value;
  directTexts[8] = document.getElementById('title4').value;
  directTexts[9] = document.getElementById('title5').value;
  directTexts[0] = document.getElementById('message1').value;
  directTexts[1] = document.getElementById('message2').value;
  directTexts[2] = document.getElementById('message3').value;
  directTexts[3] = document.getElementById('message4').value;
  directTexts[4] = document.getElementById('message5').value;
  textCount = 0;
  for (let i = 0; i < 5; i++){
    if (directTexts[i] !== "") textCount++;
  }
  for (let i = 0; i < 5; i++){
    textCmdIds[i] = 0;
    if (directTexts[i] == "<weather/temperature/high>") textCmdIds[i] = 1;
    if (directTexts[i] == "<weather/temperature/low>") textCmdIds[i] = 2;
    if (directTexts[i] == "<weather/temperature/current>") textCmdIds[i] = 3;
    if (directTexts[i] == "<weather/rain_rank/1h>") textCmdIds[i] = 4;
    if (directTexts[i] == "<weather/rain_rank/1d>") textCmdIds[i] = 5;
    if (directTexts[i] == "<weather/wind_rank>") textCmdIds[i] = 6;
    if (directTexts[i] == "<weather/rain/10m>") textCmdIds[i] = 10;
    if (directTexts[i] == "<weather/rain/1h>") textCmdIds[i] = 11;
    if (directTexts[i] == "<weather/rain/3h>") textCmdIds[i] = 12;
    if (directTexts[i] == "<weather/rain/24h>") textCmdIds[i] = 13;
    if (directTexts[i] == "<weather/humidity>") textCmdIds[i] = 17;
    if (directTexts[i] == "<weather/wind>") textCmdIds[i] = 20;
    // if (DText[i] == "<weather/dust>") Dcommand[i] = 21; // 最大瞬間風速
    if (directTexts[i] == "<weather/sun1h>") textCmdIds[i] = 28; // 日照時間
    if (directTexts[i] == "<weather/snow/height>") textCmdIds[i] = 30; // 積雪
    if (directTexts[i] == "<weather/snow/1h>") textCmdIds[i] = 35; // 降雪量
    if (directTexts[i] == "<weather/snow/6h>") textCmdIds[i] = 36; // 降雪量
    if (directTexts[i] == "<weather/snow/12h>") textCmdIds[i] = 37; // 降雪量
    if (directTexts[i] == "<weather/snow/24h>") textCmdIds[i] = 38; // 降雪量
    if (directTexts[i] == "<weather/pressure>") textCmdIds[i] = 40; // 降雪量
    if (directTexts[i] == "<weather/warn>") textCmdIds[i] = 60; // 台風コメント全部
    if (directTexts[i] == "<weather/typh/comments>") textCmdIds[i] = 55; // 台風コメント全部
    if (directTexts[i] == "<weather/river>") textCmdIds[i] = 100;
    if (directTexts[i] == "<bousai/evacuation>") textCmdIds[i] = 300;
    if (directTexts[i] == "<bousai/evacuation/emergency>") textCmdIds[i] = 302;
    if (directTexts[i] == "<weathernews/live/timetable>") textCmdIds[i] = 999;
    if (directTexts[i] == "<tsunami>") textCmdIds[i] = 1000; // 廃止？
  }
  if (!textCount) textCount = 1;
}

elements.class.tab_item[0].classList.remove("opt-hide");
for (const idx in elements.class.switch_button){
  const item = elements.class.switch_button[idx];
  animations.switchTabs.push(elements.class.tab_item[idx].animate([
    { opacity: "0" },
    { opacity: "1" }
  ], {
    duration: 300,
    iterations: 1
  }));
  item.data_index = idx-0;
  item.addEventListener("click", event => {
    for (const item of elements.class.tab_item) item.classList.add("opt-hide");
    elements.class.tab_item[event.target.data_index].classList.remove("opt-hide");
    animations.switchTabs[event.target.data_index].play();
  });
}

$('#menu .quakeList').hide();
$('#menu .tsunamiList').hide();
$('#menu .dataList').hide();
$('.settings-box button').eq(0).on('click', function(){
  $('#menu .quakeList').toggle(200);
  $('#menu .tsunamiList').hide(200);
  $('#menu .dataList').hide(200);
  // document.getElementById("eiTitle").innerText = "[地震情報](" + q_timeYY + "/" + q_timeMM + "/" + q_timeDD + " " + q_timeH + ":" + q_timeM + "頃発生) 震源地:" + q_epiName + " 最大震度:" + shindoListJP[q_maxShindo] + " M" + q_magnitude + " 深さ:" + ((q_depth == "ごく浅い")?q_depth:"約"+q_depth+"km");
  // document.getElementById("eiwind").innerText = "";
  // if (q_maxShindo == -1){
  //   document.getElementById("eiTitle").innerText = "まだ情報は入っていません。";
  //   document.getElementById("eiwind").innerText = "";
  // } else {
  //   for(var i=10; i>0; i--){
  //     if(quakeText[i] != ""){
  //       document.getElementById("eiwind").innerText += "［震度" + toFull(shindoListJP[i]) + "］\n　" + ( q_magnitude!='--' ? (quakeText[i].replace(/　 </g, '\n　').slice(1)) : (quakeText[i].replace(/　 </g, '\n　')) ).replace(/> /g, '：') + "\n";
  //     }
  //   }
  // }
});
$('.settings-box button').eq(1).on('click', function(){
  $('#menu .quakeList').hide(200);
  $('#menu .tsunamiList').toggle(200);
  $('#menu .dataList').hide(200);
});
$('.settings-box button').eq(2).on('click', function(){
  $('#menu .quakeList').hide(200);
  $('#menu .tsunamiList').hide(200);
  $('#menu .dataList').toggle(200);
});

function drawRect(x, y, width, height, color){
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}
function ExRandom(min, max){
  return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}
function BNref(){
  NewsOperator.clearAll();
  NewsOperator.add(
    document.getElementById('BNtitle').value,
    document.getElementById('BNtext1').value,
    document.getElementById('BNtext2').value
  );
  textOffsetX = 0;
}

var keyWord = "";
var quake = {reportId:"",year:"",month:"",date:"",hour:"",minute:"",second:"",longitude:"",latitude:"",depth:"",magnitude:"",isAlert:false,epicenter:""};
document.onkeydown = keydown;
var videoInterval;
function keydown(event){
  if (document.body.classList.contains("fullview") && (event.code === "KeyQ" || event.code === "Escape")){
    document.getElementsByClassName("canvas-container")[0].classList.remove("fullview");
    document.body.classList.remove("fullview");
    chrome.tabs.getCurrent(cb => {
      chrome.windows.update(cb.windowId, {
        width: Math.floor(1240 * window.outerWidth / window.innerWidth),
        height: heightBeforeFull
      });
    });
  }
}

// initialize event listener
elements.class.sound_quake_type.forEach(element => {
  element.addEventListener("click", event => {
    event.preventDefault();
    let element = event.target;
    let attr = element.getAttribute("data-type");
    if(attr === "major"){
      element.setAttribute("data-type", "normal");
    } else {
      element.setAttribute("data-type", "major");
    }
  });
});


function viewWeatherWarningList(){
  elements.id.wtWarnTableBody.innerHTML = "";
  if (NewsOperator.standby.length){
    elements.class.wtWarnListMsg[0].textContent = NewsOperator.standby.length + "個の表示待機中の気象情報があります";
    for (let i=0; i<NewsOperator.standby.length; i++){
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      const div4 = document.createElement("div");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      const tr = document.createElement("tr");
      div1.textContent = NewsOperator.standby[i].title;
      div2.textContent = NewsOperator.standby[i].description;
      div3.textContent = NewsOperator.standby[i].detail;
      div4.textContent = NewsOperator.standby[i].duration + "ms";
      td1.className = "title";
      td2.className = "subtitle";
      td3.className = "maintext";
      td4.className = "newsDuration";
      td1.style.minWidth = "100px";
      td2.style.minWidth = "100px";
      td3.style.minWidth = "100px";
      td1.appendChild(div1);
      td2.appendChild(div2);
      td3.appendChild(div3);
      td4.appendChild(div4);
      tr.append(td1, td2, td3, td4);
      elements.id.wtWarnTableBody.appendChild(tr);
    }
  } else {
    elements.class.wtWarnListMsg[0].textContent = "表示待機中の気象情報はありません";
  }
}

const SetMode = int => {
  const lastInt = viewMode;
  viewMode = int;
  if (lastInt === 1 && viewMode !== 1){
    NewsOperator.next();
  }
  if (int !== 1){
    if (audioAPI.oscillatorNode.starting) audioAPI.fun.stopOscillator();
    speechBase.userSpace.isEewMode = false;
  }
  if (int === 0){
    Routines.isDrawNormalTitle = true;
    quakeinfo_offset_cnt = 0;
    // NewsOperator.clearAll(); // 予期せぬタイミングで消えるのを防ぐためコメントアウト
  }
  if (int === 3){
    Routines.md3title();
  }
};
const SetMscale = (int, lastInt) => {
  mscale = int;
  if(viewMode === 0){ Routines.md0title(); }
};

Object.defineProperty(Number.prototype, "byteToString", {
  writable: false,
  value: function(){
    const byte = BigInt(this);
    const table = [
      [1n, 1n, "B"],
      [1024n, 1024n, "KiB"],
      [1048576n, 1024n, "MiB"],
      [1073741824n, 1024n, "GiB"],
      [1099511627776n, 1024n, "TiB"],
      [1125899906842624n, 1024n, "PiB"],
      [1152921504606846976n, 1024n, "EiB"],
      [1180591620717411303424n, 1024n, "ZiB"],
      [1208925819614629174706176n, 1024n, "YiB"],
      [1237940039285380274899124224, 0n]
    ];
    let out = "";
    for (const item of table){
      if (byte >= item[0]){
        out = (Number(byte*1000n/item[0])/1000).toFixed(3)+" "+item[2];
      } else {
        break;
      }
    }
    return out;
  }
});
BigInt.prototype.byteToString = Number.prototype.byteToString;

const Routines = {
  memory: {
    lastTime: ""
  },
  previousCPU: undefined,
  isDrawNormalTitle: true,
  isClockFontLoaded: false,
  judgeIsClockFontLoaded: function (){
    if (Routines.isClockFontLoaded) return true;
    time.font = "bold 50px '7barSP'";
    return Routines.isClockFontLoaded = (time.measureText("0123456789").width === 250);
  },
  subCanvasTime: function drawClock(targetTime){
    const timeString1=(" "+targetTime.getHours()+":"+("0" + targetTime.getMinutes()).slice(-2)).slice(-5);
    const timeString2=("0"+(targetTime.getFullYear()-2000)).slice(-2)+"-"+("0"+(targetTime.getMonth()+1)).slice(-2)+"-"+("0" + targetTime.getDate()).slice(-2);
    time.fillStyle = colorScheme[colorThemeMode][6][0];
    time.fillRect(0, 0, 128, 128);
    time.font = "bold 20px 'Inter'";
    time.textAlign = "center";
    time.fillStyle = colorScheme[colorThemeMode][6][1];
    time.fillText("Date", 64, 29);
    time.font = "bold 50px '7barSP'";
    time.textAlign = "start";
    time.fillStyle = colorScheme[colorThemeMode][6][3];
    time.fillText("88:88", 10, 110, 108);
    time.fillStyle = colorScheme[colorThemeMode][6][2];
    time.fillText(timeString1, 10, 110, 108);
    time.font = "bold 29px '7barSP'";
    time.fillStyle = colorScheme[colorThemeMode][6][3];
    time.fillText("88-88-88", 10, 62, 108);
    time.fillStyle = colorScheme[colorThemeMode][6][2];
    time.fillText(timeString2, 10, 62, 108);
  },
  md0title: function mode0titie(){
    context.fillStyle = colorScheme[colorThemeMode][1][mscale];
    context.fillRect(0, 0, 1080, 60);
    context.save();
    context.beginPath();
    context.rect(0, 0, 1080, 60);
    context.clip();
    context.fillStyle = colorScheme[colorThemeMode][1][mscale];
    context.fillRect(0, 0, 1080, 60);
    if (!(t_viewType === 2 && !t_Cancelled)){
      context.font = "28px " + FontFamilies.sans;
      switch (textCount){
        case 5:
          context.fillStyle = mscale===1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
          context.fillText(directTexts[5 + (viewingTextIndex+4)%textCount], 895, 50, 185);
        case 4:
          context.fillStyle = mscale===1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
          context.fillText(directTexts[5 + (viewingTextIndex+3)%textCount], 685, 50, 185);
        case 3:
          context.fillStyle = mscale===1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
          context.fillText(directTexts[5 + (viewingTextIndex+2)%textCount], 475, 50, 185);
        case 2:
          context.fillStyle = mscale===1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
          context.fillText(directTexts[5 + (viewingTextIndex+1)%textCount], 265, 50, 185);
          break;
      }
    }
    context.fillStyle = colorScheme[colorThemeMode][3][mscale];
    context.font = "45px " + FontFamilies.sans;
    if (t_viewType === 2 && !t_Cancelled){
      context.fillText("津波情報", 450, 47, 250);
    } else {
      context.fillText(directTexts[5 + viewingTextIndex], 10, 47, 250);
    }
    context.restore();
  },
  md3title: function breakingNewsTitle(){
    context.fillStyle = colorScheme[colorThemeMode][1][mscale];
    context.fillRect(0, 0, 1080, 60);
    context.font = "42px " + FontFamilies.sans;
    context.fillStyle = colorScheme[colorThemeMode][5][3][mscale];
    context.fillText(NewsOperator.viewing.title, 35, 45, 1010);
  },
  viewMemoryCapacity: function memoryCheck(){
    chrome.system.memory.getInfo(a=>{
      elements.id.dbMemoryAvCap.textContent = "　　メモリ全体領域: "+a.capacity.byteToString();
      elements.id.dbMemoryWhCap.textContent = "メモリ空き容量領域: "+a.availableCapacity.byteToString();
    });
  },
  updateCpuUsage: function cpuCheck(){
    chrome.system.cpu.getInfo(a=>{
      let container = elements.id.dbCpuUsages;
      container.innerHTML = "";
      let i = 0;
      let oldData = Routines.previousCPU;
      let total = 0;
      for(let processor of a.processors){
        i++;
        let item = document.createElement("p");
        let cpu = 0;
        if(Routines.previousCPU){
          cpu = (processor.usage.kernel + processor.usage.user - oldData[i-1].usage.kernel - oldData[i-1].usage.user) / (processor.usage.total - oldData[i-1].usage.total)*100;
        } else {
          cpu = (processor.usage.kernel+processor.usage.user)/processor.usage.total*100;
        }
        item.textContent = "CPU使用率（"+i+"）： "+cpu.toFixed(3) + "%";
        total += cpu;
        item.style.margin = "2px";
        container.appendChild(item);
      }
      let item = document.createElement("p");
      item.textContent = "CPU使用率（全体）： "+(total/a.numOfProcessors).toFixed(3)+"%";
      container.appendChild(item);
      item.style.margin = "2px";
      Routines.previousCPU = a.processors;
    });
  },
  main: function mainRoutines(){
    //let gr; //canvas gradient color
    //背景(White)
    // const currentTime = Date.now();

    if (viewMode !== 1) drawRect(0, 60, 1080, 68, colorScheme[colorThemeMode][5][0]);
    context.font = '300 40px ' + FontFamilies.sans;
    //context.font = '40px Arial, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
    //context.font = '40px "游ゴシック Medium","Yu Gothic Medium","游ゴシック体",YuGothic,sans-serif';
    //context.font = '40px "Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
    // let performDrawStartAt = performance.now() * 1000;
    let TextWidth;
    switch (viewMode) {
      case 0:
        TextWidth = -(strWidth(directTexts[viewingTextIndex])) - 200;
        break;
      default:
        TextWidth = strWidth(quakeText[q_currentShindo]) * -1;
        break;
    }

    const targetTime = getAdjustedDate();
    const targetTimeInt = targetTime - 0;
    // 津波予報の失効時刻になったら・・・
    if (DataOperator.tsunami.isIssued && DataOperator.tsunami.expire <= targetTime){
      DataOperator.tsunami.isIssued = false;
      DataOperator.tsunami.onUpdate(); // isIssued = false なので引数なくてもok
    }

    if (viewMode !== 3) textOffsetX -= textSpeed;
    if (elements.id.setIntervalNHKquake.valueAsNumber < targetTimeInt - load_quake_list_v2.lastCall) load_quake_list_v2();
    if ((q_startTime % Math.floor(elements.id.setIntervalTenkiJpTsu.valueAsNumber/20)) === 1) DataOperator.tsunami.load();
    if ((q_startTime % Math.floor(elements.id.setIntervalTyphCom.valueAsNumber/20)) === 1) DataOperator.typh_comment.load();
    if ((q_startTime % Math.floor(elements.id.setIntervalWarn.valueAsNumber/20)) === 1) DataOperator.warn_current.load();
    if ((q_startTime % Math.floor(elements.id.setIntervalWNImscale.valueAsNumber/20)) === 1) XHRs.mscale.load();
    if ((q_startTime % Math.floor(elements.id.setIntervalWNIsorabtn.valueAsNumber/20)) === 1) sorabtn();
    if ((q_startTime % Math.floor(elements.id.setIntervalWNIriver.valueAsNumber/20)) === 1) XHRs.river.load();
    if ((q_startTime % Math.floor(elements.id.setIntervalJMAfcst.valueAsNumber/20)) === 1) XHRs.getJMAforecast.load();
    if (q_startTime==4 || ((getFormattedDate(1).minute % 10)==0&&getFormattedDate(1).second==30&&t==0)) rain_windData((q_startTime===4)||(getFormattedDate(1).minute==0)),t=1;
    if (getFormattedDate(1).second === 50) t=0;
    if ((q_startTime % Math.floor(elements.id.setIntervalJmaWt.valueAsNumber/20)) === 1) weatherInfo();
    if ((q_startTime % Math.floor(elements.id.setIntervalWNItm.valueAsNumber/20)) === 1) XHRs.wnlTimetable.load();
    if ((q_startTime % Math.floor(200)) == 1) humanReadable();
    if ((q_startTime % 9000) === 1) getAmedasData();
    if ((q_startTime % 3000) === 1) getEvacuationData();
    if ((q_startTime % 225) === 1){
      t_page++;
      if(tsunamiTexts.length <= t_page){
        t_page = -5;
        Routines.isDrawNormalTitle = true;
      }
    }
    const isMscale2 = mscale === 1 && colorThemeMode != 2;
    //if((startTime%50) == 1)jma_earthquake();
    //if((startTime%500) == 1){
      //if(document.getElementById("isNormalMes").checked)loadDText();
    //
    if((q_startTime % Math.floor(elements.id.setIntervalIedred.valueAsNumber/20)) === 1){
      if (eewRequestType){
        // eewChecking_c1();
        if (eewRequestType === "c1"){
          eewChecking_c1();
        }/*  else if (eewRequestType === "v1"){
          eewChecking_v1();
        }*/
      }
    }
    timeCount++;
    q_startTime++;
    p2p_elapsedTime++;
    switch (textCmdIds[viewingTextIndex]) {
      case 1:
        directTexts[viewingTextIndex] = weather_mxtemsadextstr;
        // DText[Nnum+5] = "最高気温ランキング";
        break;
      case 2:
        directTexts[viewingTextIndex] = weather_mntemsadextstr;
        // DText[Nnum+5] = "最低気温ランキング";
        break;
      case 4:
        directTexts[viewingTextIndex] = weather1hourrainstr;
        // DText[Nnum+5] = "1時間降水量";
        break;
      case 5:
        directTexts[viewingTextIndex] = weather24hoursrainstr;
        // DText[Nnum+5] = "24時間降水量";
        break;
      case 6:
        directTexts[viewingTextIndex] = weatherMaximumWindSpeedstr;
        // DText[Nnum+5] = "風速ランキング";
        break;
      case 100:
        directTexts[viewingTextIndex] = riveralltext;
        // DText[Nnum+5] = "河川情報";
        break;
      case 999:
        directTexts[viewingTextIndex] = timetableStr;
        // DText[Nnum+5] = "ウェザーニュースLiVE番組表";
        break;
    }
    if (commandShortcuts.hasOwnProperty(textCmdIds[viewingTextIndex])) directTexts[viewingTextIndex] = commandShortcuts[textCmdIds[viewingTextIndex]];
    if (t_viewType === 2 && !t_Cancelled){
      directTexts[viewingTextIndex] = DataOperator.tsunami.text.whole;
    }
    if ((timeCount%275) === 0){
      if (language == "Ja"){
        language = "En";
      } else {
        language = "Ja";
      }
    }
    //CB to if((timeCount%))
    if (TextWidth > textOffsetX){
      textOffsetX = 1200;
      q_currentShindo--;
      Routines.isDrawNormalTitle = true;
      document.getElementsByClassName("normal-text")[viewingTextIndex].style.background = "#ffffff";
      /* if (!document.getElementsByName("scrollfix")[viewingTextIndex].checked) */ viewingTextIndex++;
      if (viewingTextIndex == 5) viewingTextIndex = 0;
      for (let i=q_currentShindo; i>-1; i--){
        if (quakeText[i] != ""){ q_currentShindo = i; break; }
      }
      document.getElementsByClassName("normal-text")[viewingTextIndex].style.background = "#ffff60";
    }
    if (q_currentShindo < 0){
      q_currentShindo = q_maxShindo;
      if (viewMode === 2) earthquake_telop_times++;
    }
    if(viewingTextIndex >= textCount) viewingTextIndex = 0;

    if (viewMode === 0){
      context.fillStyle = colorScheme[colorThemeMode][5][1];
      context.fillText(directTexts[viewingTextIndex], textOffsetX, 110);
    } else if (viewMode === 2){
      context.fillStyle = colorScheme[colorThemeMode][5][2];
      context.fillText(quakeText[q_currentShindo], textOffsetX, 110);
    }
    //背景(Blue)
    context.fillStyle = colorScheme[colorThemeMode][1][mscale];
    if (viewMode === 2) context.fillRect(0, 0, 1080, 60);

    switch (viewMode) {
      case 0:
        if (Routines.isDrawNormalTitle) Routines.md0title();
        Routines.isDrawNormalTitle = false;

        //三角(内容 タイトル)
        context.fillStyle = colorThemeMode != 2 ? "#d1d90099" : "#ffffff99";
        context.beginPath();
        context.moveTo( 0, 127);
        context.lineTo(30,  94);
        context.lineTo( 0,  60);
        context.fill();
        context.strokeStyle = "#fff";
        context.beginPath();
        context.moveTo( 0, 123);
        context.lineTo(26,  94);
        context.lineTo( 0,  64);
        context.stroke();
        context.beginPath();
        context.moveTo(0,  64);
        context.lineTo(4,  64);
        context.stroke();
        context.beginPath();
        context.moveTo(0, 123);
        context.lineTo(4, 123);
        context.stroke();

        //三角 右
        context.fillStyle = colorThemeMode != 2 ? "#ff3d3d99" : "#ffffff99";
        context.beginPath();
        context.moveTo(1080, 127);
        context.lineTo(1050,  94);
        context.lineTo(1080,  60);
        context.fill();
        context.strokeStyle = "#fff";
        context.beginPath();
        context.moveTo(1080, 123);
        context.lineTo(1054,  94);
        context.lineTo(1080,  64);
        context.stroke();
        context.beginPath();
        context.moveTo(1080,  64);
        context.lineTo(1076,  64);
        context.stroke();
        context.beginPath();
        context.moveTo(1080, 123);
        context.lineTo(1076, 123);
        context.stroke();
        // Notes: (unused) view p2p
        break;

      case 1:
        context.drawImage(eewMapBmp, 905, 0);
        context.fillStyle = eewIsAlert ? "#b8240d" : "#2b4aad";
        context.fillRect(0, 60, 900, 68);
        context.fillStyle = eewIsAlert ? "#c42810" : "#233d91";
        context.fillRect(0, 0, 900, 60);
        context.drawImage(images.eew[eewIsAlert ? "pub" : "fc"].imgBmp, 0, 0, 320, 60);
        context.fillStyle = eewIsAlert ? "#f22" : "#000";
        context.fillRect(320, 4, 10, 54);
        context.fillStyle = "#fff";
        if (eewIsAssumption){
          context.font = "500 28px " + FontFamilies.sans;
          context.fillText("震度", 80, 115, 45);
          context.fillText("地域", 318, 115, 45);
          context.drawTextureImage.EEW_intensity(135, 60, eewCalcIntensityIndex);
          context.drawTextureImage.EEW_epicenter("JP_350", 380, 60, {id: eewEpicenterID});
        } else if (eewClassCode != 35){
          context.font = "500 25px " + FontFamilies.sans;
          context.fillText("最大", 8, 92, 45);
          context.fillText("震度", 8, 121, 45);
          context.fillText("震", 318, 90, 23);
          context.fillText("源", 318, 119, 23);
          context.drawTextureImage.EEW_intensity(50, 60, eewCalcIntensityIndex);
          context.drawTextureImage.EEW_epicenter("JP_350", 348, 60, {id: eewEpicenterID});
          context.fillText("深さ", 725, 88, 45);
          context.font = "500 36px " + FontFamilies.sans;
          context.fillText("M", 170, 118, 35);
          DrawTextureText(eewDepth+"km", 750, 123, {base: "Microsoft-Sans-Serif", px: 40, weight: "bold", color: "ffffff", letterSpacing: 1}, 100);
        } else {
          context.font = "500 55px " + FontFamilies.sans;
          context.fillText("5弱", 95, 115, 85);
          context.font = "500 30px " + FontFamilies.sans;
          context.fillText("程度", 185, 115, 60);
          context.font = "500 35px " + FontFamilies.sans;
          context.fillText("以上", 245, 115, 70);
          context.drawTextureImage.EEW_epicenter("JP_350", 424, 60, {id: eewEpicenterID});
        }
        if((!eewIsAssumption) && eewClassCode != 35){
          context.font = "500 58px " + FontFamilies.sans;
          context.fillText((eewMagnitude-0).toFixed(1), 205, 115, 80);
        }
        context.fillStyle = "#777";
        context.fillRect(900, 0, 5, 128);

        // Notes: (unused) 津波が発生する可能性があります。

        if (eewWarnForecast){
          context.font = "500 25px " + FontFamilies.sans;
          context.fillStyle = "yellow";
          context.fillText("以下の地域では強い揺れに警戒。", 337, 26, 553);
          context.fillStyle = "#fff";
          context.fillText(eewWarnForecast, 337, 53, 553);
        } else {
          context.fillStyle = "#ffea00";
          context.font = "500 25px " + FontFamilies.sans;
          const topWarnText = eewWarnTextList[Math.floor((q_startTime / 300) % 23)];
          context.fillText(topWarnText.ja[Math.floor(((q_startTime % 300) / 300) * topWarnText.ja.length)], 337, 26, 553);
          context.fillText(topWarnText.en[Math.floor(((q_startTime % 300) / 300) * topWarnText.en.length)], 337, 53, 553);
        }

        if (eewOriginTime.getTime() < (new Date())-480000){
          if(!testNow) SetMode(0);
        }

        if ((!eewIsAssumption) && eewClassCode != 35){
          context.fillStyle = "#d00";
          context.strokeStyle = "#fff";
          context.lineWidth = 2;
          context.globalAlpha = 1 - (q_startTime % 60) / 78;
          context.beginPath();
          context.moveTo(eewEpiPos[0]- 6, eewEpiPos[1]-10);
          context.lineTo(eewEpiPos[0]-10, eewEpiPos[1]- 6);
          context.lineTo(eewEpiPos[0]- 4, eewEpiPos[1]   );
          context.lineTo(eewEpiPos[0]-10, eewEpiPos[1]+ 6);
          context.lineTo(eewEpiPos[0]- 6, eewEpiPos[1]+10);
          context.lineTo(eewEpiPos[0]   , eewEpiPos[1]+ 4);
          context.lineTo(eewEpiPos[0]+ 6, eewEpiPos[1]+10);
          context.lineTo(eewEpiPos[0]+10, eewEpiPos[1]+ 6);
          context.lineTo(eewEpiPos[0]+ 4, eewEpiPos[1]   );
          context.lineTo(eewEpiPos[0]+10, eewEpiPos[1]- 6);
          context.lineTo(eewEpiPos[0]+ 6, eewEpiPos[1]-10);
          context.lineTo(eewEpiPos[0]   , eewEpiPos[1]- 4);
          context.closePath();
          context.fill();
          context.stroke();
          context.lineWidth = 1;
          context.globalAlpha = 1;
        } else {
          context.fillStyle = "#d00";
          const t1 = (q_startTime % 60) / 68;
          const t2 = ((q_startTime + 15) % 60) / 68;
          const t3 = ((q_startTime + 30) % 60) / 68;
          const t4 = ((q_startTime + 45) % 60) / 68;
          context.globalAlpha = 0.5 - t1/2;
          context.beginPath();
          context.arc(eewEpiPos[0], eewEpiPos[1], t1*28.284271, 0, 2*Math.PI);
          context.fill();
          context.globalAlpha = 0.5 - t2/2;
          context.beginPath();
          context.arc(eewEpiPos[0], eewEpiPos[1], t2*28.284271, 0, 2*Math.PI);
          context.fill();
          context.globalAlpha = 0.5 - t3/2;
          context.beginPath();
          context.arc(eewEpiPos[0], eewEpiPos[1], t3*28.284271, 0, 2*Math.PI);
          context.fill();
          context.globalAlpha = 0.5 - t4/2;
          context.beginPath();
          context.arc(eewEpiPos[0], eewEpiPos[1], t4*28.284271, 0, 2*Math.PI);
          context.fill();
          context.globalAlpha = 1;
        }

        if(eewIsCancel) context.drawImage(images.eew.cancel.imgBmp, 0, 0);

        //context.fillText(multilingual[Math.floor((startTime%300)/150)][Math.floor((startTime%3000)/300+34)], 425, 50, 650);
        //context.fillText("最大震度不明 M6.4 震源:あいうえおかきくけこ 深さ:590km (第89報)" ,10 ,115, 1060)
        break;

      case 2:
        var sum = (shindoListJP[q_currentShindo] != "");
        if (sum != summary){
          if (sum){
            cnv_anim1.start_n = -200;
            cnv_anim1.end_n = 0;
            cnv_anim1.start();
          } else {
            cnv_anim1.start_n = 0;
            cnv_anim1.end_n = -200;
            cnv_anim1.start();
          }
        }
        summary = sum;
        const dif = cnv_anim1.current();
        context.drawImage(images.quake.title[colorThemeMode][mscale].imgBmp, 0, 0);
        //地震情報 文字
        // context.font = "400 30px 'ヒラギノ角ゴシック'";
        // context.fillStyle = "#222";
        // context.fillText("地震情報", 10, 30);
        // context.font = "bold 21px Helvetica-Neue";
        // context.fillText("Earthquake Information", 10, 53, 206);
        context.fillStyle = colorScheme[colorThemeMode][0][mscale];
        context.fillRect(dif, 60, 200, 68);
        // 最大震度
        if (q_maxShindo > 0) context.drawImage(images.quake.texts.maxInt[colorThemeMode == 2 ? 2 : mscale][language.toLocaleLowerCase()][q_maxShindo<5?q_maxShindo-1:q_maxShindo-2], 240, 0);
        // 深さ（ラベル）
        if (q_depth){
          if (language === "Ja") context.drawImage(isMscale2 ? images.quake.texts.depth.ja2 : images.quake.texts.depth.ja, 917, 0);
          if (language === "En") context.drawImage(isMscale2 ? images.quake.texts.depth.en2 : images.quake.texts.depth.en, 917, 3);
        }
        // 深さ（km）
        if (q_depth!="ごく浅い" && q_depth!="ごく浅く" && q_depth) context.drawImage(isMscale2 ? images.quake.texts.depth_km2 : images.quake.texts.depth_km, 1042, 28);
        // マグニチュード（ラベル）
        // context.drawImage(isMscale2 ? images.quake.texts.magni2 : images.quake.texts.magni, 406, 0);
        context.drawImage(isMscale2 ? images.quake.texts.magni2 : images.quake.texts.magni, 420, 25);
        context.font = "500 50px " + FontFamilies.sans;
        context.fillStyle = isMscale2 ? "#333" : "#fff";
        // マグニチュード
        DrawTextureText(q_magnitude, 462, 45, {base:"HelveticaNeue-CondensedBold",px:50,weight:"bold",letterSpacing:0});
        // 深さ
        if (q_depth == "ごく浅い"){
          context.font = "500 30px Inter, " + FontFamilies.sans;
          if (language === "Ja") context.fillText("ごく浅い", 950, 53, 90);
          if (language === "En") context.fillText("shallow", 975, 53, 90)
        } else {
          DrawTextureText(q_depth, 978, 48, {base:"HelveticaNeue-CondensedBold",px:50,weight:"bold",letterSpacing:0}, 60);
        }
        context.font = "500 30px " + FontFamilies.sans;
        // 震源
        if (language === "Ja") context.fillText(q_epiId === -2 ? q_epiName : epicenter_list[0][q_epiId], 586, 53, 300);
        if (language === "En") context.fillText(q_epiId === -2 ? q_epiName : epicenter_list[1][q_epiId], 566, 53, 350);
        // 震度
        context.drawImage(images.quake.texts.intensity[context.fillStyle][q_currentShindo], 10+dif, 60);
        // 時間
        context.font = "23px '7barSP'";
        context.fillText(q_timeAll, 595, 23);
        // 水色
        context.fillStyle = (((timeCount%12)<5) && timeCount<216 && (timeCount%72)<60) ? "#e02222" : (q_magnitude == "--") ? "#f2f241" : "#2229";
        context.fillRect(224, 1, 10, 58);
        // 矢印(内容 タイトル)
        context.fillStyle = colorScheme[colorThemeMode][0][mscale]+"99";
        context.beginPath();
        context.moveTo(200+dif, 127);
        context.lineTo(230+dif,  94);
        context.lineTo(200+dif,  60);
        context.closePath();
        context.fill();
        context.strokeStyle = "#ffffff";
        context.beginPath();
        context.moveTo(200+dif, 123);
        context.lineTo(226+dif,  94);
        context.lineTo(200+dif,  64);
        context.stroke();
        context.beginPath();
        context.moveTo(200+dif,  64);
        context.lineTo(  4+dif,  64);
        context.stroke();
        context.beginPath();
        context.moveTo(200+dif, 123);
        context.lineTo(  4+dif, 123);
        context.stroke();
        //アニメーション
        if (timeCount < 13){
          context.fillStyle = "#fff5";
          context.beginPath();
          context.moveTo((-(timeCount)*95)+1240, 0);
          context.lineTo((-(timeCount)*95)+1270, 0);
          context.lineTo((-(timeCount)*95)+1210, 127);
          context.lineTo((-(timeCount)*95)+1180, 127);
          context.fill();
        }
        if(earthquake_telop_times > 1){
          earthquake_telop_remaining--;
          if(earthquake_telop_remaining === 0){
            SetMode(0);
            earthquake_telop_remaining = 1500;
            earthquake_telop_times = 0;
          }
          context.shadowColor = colorScheme[colorThemeMode][5][4];
          context.shadowBlur = 5;
          context.fillStyle = colorScheme[colorThemeMode][5][4];
          context.beginPath();
          context.moveTo(1080, 127);
          context.lineTo(1080, 94);
          context.lineTo(806, 94);
          context.lineTo(773, 127);
          context.fill();
          context.shadowBlur = 0;
          context.fillStyle = "#fff";
          context.font = "30px " + FontFamilies.sans;
          context.fillText(Math.ceil(earthquake_telop_remaining/50)+"秒後に通常画面に復帰します", 812, 124, 265);
        }
        break;

      case 3:
        {
          const newsProgress = NewsOperator.progress;
          if (newsProgress <= 0){
            if (NewsOperator.next()){
              NewsOperator.middleWidth = -1;
              Routines.md3title();
            } else SetMode(0);
          }
          if (NewsOperator.viewing){
            context.font = (NewsOperator.viewing.description ? 31 : 40) + "px " + FontFamilies.sans;
            context.fillStyle = colorScheme[colorThemeMode][5][2];
            context.fillText(NewsOperator.viewing.detail, 17, NewsOperator.viewing.description ? 122 : 110, 1046);
            context.fillStyle = colorScheme[colorThemeMode][5][2];
            context.font = "500 23px " + FontFamilies.sans;
            if (NewsOperator.middleWidth === -1) NewsOperator.middleWidth = strWidth(NewsOperator.viewing.description);
            if (NewsOperator.middleWidth * 0.8 < 1044){
              context.fillText(NewsOperator.viewing.description, 17, 88, NewsOperator.middleWidth * 0.8);
            } else {
              context.fillText(NewsOperator.viewing.description, newsProgress > 0.88888888 ? 17 : newsProgress < 0.22222222 ? 1063-NewsOperator.middleWidth*0.8+17 : (1063-NewsOperator.middleWidth*0.8)*(800-newsProgress*900)/601+17, 88, NewsOperator.middleWidth*0.8);
            }
          }
        }
        break;

      // case 4:
      //   context.fillStyle = "#fff";
      //   context.fillRect(0, 0, 1080, 128);
      //   if (video?.videoWidth) context.drawImage(video, (1080-video.videoWidth/video.videoHeight*128)/2, 0, video.videoWidth/video.videoHeight*128, 128);
      //   break;
    }
    if (!t_Cancelled && viewMode !== 1 && t_viewType === 1){
      if (t_page < 0 || viewMode === 3){
        const colorAlpha = ((viewMode !== 2) ? "ff" : ("0"+Math.min(255,Math.abs(Math.trunc((160-timeCount%320)*2))).toString(16)).slice(-2));
        context.fillStyle = "#b33122" + colorAlpha;
        context.fillRect(815, 0, 265, 43);
        context.font = "500 30px " + FontFamilies.sans;
        context.fillStyle = "#ffffff" + colorAlpha;
        context.textAlign = "end";
        context.fillText("津波情報を発表中", 1065, 33);
        context.textAlign = "start";
      } else {
        context.fillStyle = "#b33122";
        context.fillRect(265, 0, 815, 60);
        context.font = "500 30px " + FontFamilies.sans;
        context.fillStyle = "#fff";
        context.fillText("津波情報", 275, 33, 800);
        context.strokeStyle = "#fff";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(385, 55);
        context.lineTo(435, 5);
        context.stroke();
        context.fillText(tsunamiTexts[t_page], 420, 53, 610);
        context.font = "bold 20px 'Helvetica-Bold', 'HelveticaNeue', " + FontFamilies.sans;
        context.textAlign = "center";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(1045, 25);
        context.lineTo(1075, 25);
        context.stroke();
        context.fillText((t_page+1)+"", 1060, 21);
        context.fillText(tsunamiTexts.length, 1060, 43);
        context.textAlign = "start";
      }
    }

    context.lineWidth = 1;
    if (!isClose && viewMode==0 && isSoraview){
      context.fillStyle = "#0fa823";
      context.beginPath();
      context.moveTo(1080, 127);
      context.lineTo(1080, 94);
      context.lineTo(806, 94);
      context.lineTo(773, 127);
      context.fill();
      context.fillStyle = "#0fa8235d";
      context.beginPath();
      context.moveTo(1080, 127);
      context.lineTo(1080, 90);
      context.lineTo(802, 90);
      context.lineTo(765, 127);
      context.fill();
      context.fillStyle = "#fff";
      context.font = "27px "+FontFamilies.sans;
      context.fillText("ｳｪｻﾞｰﾆｭｰｽｱﾝｹｰﾄ実施中!", 810, 122, 265);
    }
    soraopen_moving = anim_soraview.current();
    soraopen_color = anim_soraview_color.current();
    if(bit(soraopen, 0)){
      context.fillStyle = "#e3e3e3" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      context.font = "30px "+FontFamilies.sans;
      context.fillRect(32-soraopen_moving, 0, 1016, 128);
      context.fillRect(1-soraopen_moving, 31, 1080, 64);
      context.beginPath();
      context.arc(32-soraopen_moving, 31, 31, 0, 2*Math.PI, 0);
      context.fill();
      context.beginPath();
      context.arc(32-soraopen_moving, 96, 31, 0, 2*Math.PI, 0);
      context.fill();
      context.beginPath();
      context.arc(1049-soraopen_moving, 31, 31, 0, 2*Math.PI, 0);
      context.fill();
      context.beginPath();
      context.arc(1049-soraopen_moving, 96, 31, 0, 2*Math.PI, 0);
      context.fill();
      context.fillStyle = "#000000" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      context.fillText("Q. "+question , 21-soraopen_moving, 33);
      context.font = "25px "+FontFamilies.sans;
      context.fillStyle = "#2a25c6" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if (intervalTime<40 || intervalTime1==1)context.fillText("青: " + choice1, 30-soraopen_moving, 69, 213);
      context.fillStyle = "#cf3231" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if (intervalTime<40 || intervalTime1==1)context.fillText("赤: " + choice2, 30-soraopen_moving, 104, 213);
      context.fillStyle = "#22c02d" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if (intervalTime<40 || intervalTime1==1)context.fillText("緑: " + choice3, 256-soraopen_moving, 69, 213);
      context.fillStyle = "#b8ac10" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if (intervalTime<40 || intervalTime1==1)context.fillText("黄: " + choice4, 256-soraopen_moving, 104, 213);
      if (bit(soraopen, 1)){
        if (bit(soraopen, 1) && soraopen_interval1 === null && intervalTime1 == 0){
          intervalArray.push(soraopen_interval1 = setInterval(
            function(){
              intervalTime++;
              if(intervalTime >= 210)intervalReset();
            }, 10
          ));
        }
        context.fillStyle = "#e3e3e3" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
        if (intervalTime1 == 0){
          //アニメーション／選択肢隠し
          context.fillRect(242-(intervalTime>40?188:188/40*intervalTime), 38, (intervalTime>40?188:188/40*intervalTime), 69);
          context.fillRect(468-(intervalTime>40?188:188/40*intervalTime), 38, (intervalTime>40?188:188/40*intervalTime), 69);
          if(120>=intervalTime && intervalTime>40){
            context.fillStyle = "#2a25c6";
            context.fillText("青　", 29+6.5125*(intervalTime-40), 69-0.475*(intervalTime-40));
            context.fillStyle = "#cf3231";
            context.fillText("赤　", 29+6.5125*(intervalTime-40), 104-0.5625*(intervalTime-40));
            context.fillStyle = "#22c00d";
            context.fillText("緑　", 255+3.6875*(intervalTime-40), 69+0.225*(intervalTime-40));
            context.fillStyle = "#b8ac10";
            context.fillText("黄　", 255+3.6875*(intervalTime-40), 104+0.1125*(intervalTime-40));
          }
        }
        context.fillStyle = "#2a25c6";
        if(intervalTime1==1 || intervalTime>120)context.fillText("青　"+ans1, 550, 31);
        context.fillRect(675, 10, intervalTime>120?ans1/maxans*385*(intervalTime1==1?1:(intervalTime-120)/90):0, 24);
        context.fillStyle = "#cf3231";
        if(intervalTime1==1 || intervalTime>120)context.fillText("赤　"+ans2, 550, 59);
        context.fillRect(675, 38, intervalTime>120?ans2/maxans*385*(intervalTime1==1?1:(intervalTime-120)/90):0, 24);
        context.fillStyle = "#22c00d";
        if(intervalTime1==1 || intervalTime>120)context.fillText("緑　"+ans3, 550, 87);
        context.fillRect(675, 66, intervalTime>120?ans3/maxans*385*(intervalTime1==1?1:(intervalTime-120)/90):0, 24);
        context.fillStyle = "#b8ac10";
        if(intervalTime1==1 || intervalTime>120)context.fillText("黄　"+ans4, 550, 115);
        context.fillRect(675, 94, intervalTime>120?ans4/maxans*385*(intervalTime1==1?1:(intervalTime-120)/90):0, 24);
        if(intervalTime1==0){
          context.fillStyle = "#e3e3e3"+('0'+Math.round(soraopen_color).toString(16)).slice(-2);
          context.fillRect(590, 5, 80, 115);
        }
      }
    }
    if(soraopen_moving == 1 && soraopen == 1){
      context.fillStyle = "black";
      context.font = "25px "+FontFamilies.sans;
      context.fillText("アンケートの参加はこちら", 585, 50);
      context.fillStyle = "#3569c0";
      context.strokeStyle = '#3569c0';
      context.beginPath();
      context.moveTo(601,78);
      context.lineTo(846,78);
      context.stroke();
      context.font = "italic 25px 'Microsoft Sans Serif', Arial, sans-serif";
      context.fillText("http://wni.my/?sorabtn", 600, 78);
      context.drawImage(sorabtn_qr_img.imgBmp, 900, -3);
    }

    // 分更新動作
    const currentTimeDate = Math.floor(targetTime / 60000);
    if (Routines.judgeIsClockFontLoaded()){
      if (currentTimeDate != Routines.memory.lastTime){
        Routines.subCanvasTime(targetTime);
      }
    } else {
      time.fillStyle = "#111";
      time.fillRect(0, 0, 128, 128);
      time.font = '20px "Hiragino Kaku Gothic ProN", BlinkMacSystemFont, "Noto Sans JP", "游ゴシック", "YuGothic", "Noto Sans CJK", "Meiryo", "Helvetica Neue", "Helvetica", "Arial", sans-serif';
      time.fillStyle = "#fff";
      time.textAlign = "end";
      time.fillText("読み込み中", 120, 117, 120);
      time.textAlign = "start";
    }
    if (currentTimeDate != Routines.memory.lastTime){
      for (const task of audioAPI.gainTimer){
        if (!task.effective) continue;
        if (!(task.time.h === targetTime.getHours() && task.time.m === targetTime.getMinutes())) continue;
        if (task.target === "master"){
          audioAPI.masterGainValue = elements.id.masterGainRange.value = task.gain / 100;
        } else if(task.target === "speech"){
          speechBase.volume = task.gain / 100;
        }
      }
    }
    Routines.memory.lastTime = currentTimeDate;

    // Auto Save
    if (lastSaveTime + 30000 <= Date.now()) savedata();
    if (q_startTime % 10 === 0){
      const ratio = 100 - ((lastSaveTime - Date.now() + 30000) / 300);
      elements.id.dataSaverBox.style.background = "linear-gradient(90deg, #c5f6f9 " + ratio + "%, #ffffff " + ratio + "%)";
    }

    // AudioAPI alarm adjustment
    if (q_startTime % 8 === 0){
      audioAPI.fun["freq"+(q_startTime%16>7?"B5":"E6")]();
    }

    //audio repeatition control
    const bgmElements = document.getElementsByClassName('BGM');
    const bgmRepeatingStartMin = document.getElementsByClassName('BGMrepeatingStartMin');
    const bgmRepeatingStopMin = document.getElementsByClassName('BGMrepeatingStopMin');
    const bgmRepeatingStartSec = document.getElementsByClassName('BGMrepeatingStartSec');
    const bgmRepeatingStopSec = document.getElementsByClassName('BGMrepeatingStopSec');
    for (let i=0; i<bgmElements.length; i++){
      if (Number(bgmRepeatingStopMin[i].value) * 60 + Number(bgmRepeatingStopSec[i].value) < bgmElements[i].currentTime && bgmElements[i].checked){
        bgmElements[i].currentTime = Number(bgmRepeatingStartMin[i].value) * 60 + Number(bgmRepeatingStartSec[i].value);
      }
      bgmRepeatingStartMin[i].max = Math.floor(bgmElements[i].duration/60);
      bgmRepeatingStopMin[i].max = Math.floor(bgmElements[i].duration/60);
      bgmRepeatingStartSec[i].max = bgmElements[i].duration<60 ? Math.floor(bgmElements[i].duration) : 60;
      bgmRepeatingStopSec[i].max = bgmElements[i].duration<60 ? Math.floor(bgmElements[i].duration) : 60;
    }

    {
      const current = anim_fullscreen.current();
      if (current){
        context.globalAlpha = Math.min(1, current);
        context.drawImage(images.fullview, 0, 0, 1080, 128);
        context.globalAlpha = 1;
      }
    }

    if (testNow){
      context.fillStyle = "#fff";
      context.strokeStyle = "#333";
      context.strokeText("デバッグモードが有効", 5, 123, 1070);
      context.fillText("デバッグモードが有効", 5, 123, 1070);
    }

    // Show audio informations (10 fps)
    if((q_startTime % 5) === 1) {
      for (let i = 0; i < backMsc.length; i++){
        const intCurTm = Math.floor(backMsc[i]?.currentTime - 0);
        const intDurTm = Math.floor(backMsc[i]?.bufferSource?.buffer?.duration);
        const musicRangePos = Math.max(0, Math.min(410, Math.round((backMsc[i]?.currentTime-0) / backMsc[i]?.bufferSource?.buffer?.duration * 820) / 2));
        const text_currentTime = Math.floor(intCurTm/60)+":"+("0"+(intCurTm%60)).slice(-2);
        const text_duration = Math.floor(intDurTm/60)+":"+("0"+(intDurTm%60)).slice(-2);
        if (!("storage" in backMsc[i])) continue;
        backMsc[i].storage.musicCurrentTime.time = text_currentTime;
        if (backMsc[i].storage.musicCurrentTime.string !== text_currentTime) backMsc[i].storage.musicCurrentTime.string = text_currentTime, backMsc[i].storage.musicCurrentTime.element.textContent = text_currentTime;
        if (backMsc[i].storage.musicDurationOrLeft.string !== text_duration) backMsc[i].storage.musicDurationOrLeft.string = text_duration, backMsc[i].storage.musicDurationOrLeft.element.textContent = text_duration;
        if (backMsc[i].storage.progressbar.number !== musicRangePos){
          backMsc[i].storage.progressbar.number = musicRangePos;
          backMsc[i].storage.progressbar.playedElement.style.width = musicRangePos + "px";
          backMsc[i].storage.progressbar.loadedElement.style.left = musicRangePos + "px";
          backMsc[i].storage.progressbar.curposElement.style.left = (musicRangePos * 400 / 410) + "px";
        }
        // if(intCurTm >= intDurTm && backMsc[0]?.playing){
        //   backMsc[0].bufferSource.stop();
        //   backMsc[0].pausedAt = backMsc[0].bufferSource.buffer.duration;
        // }
        if (backMsc[i].playing && backMsc[i].bufferSource.loop && backMsc[i].currentTime >= backMsc[i].bufferSource.loopEnd && backMsc[i].bufferSource.loopEnd !== backMsc[i].bufferSource.loopStart){
          backMsc[i].startedAt += backMsc[i].bufferSource.loopEnd - backMsc[i].bufferSource.loopStart;
        }
      }
    }
    if((q_startTime%50) === 1) Routines.updateCpuUsage();
    if((q_startTime%250) === 1) Routines.viewMemoryCapacity();
  }
};

function audiodebug_interval(index = 0){
  setTimeout(audiodebug_interval, 1000, index);
  try {
    const target = backMsc[index];
    console.log(`AudioDebug: Index ${index}: (${target.context.currentTime.toFixed(2).padStart(7)}) currentTime[${target.currentTime.toFixed(2).padStart(6)}] / startedAt[${target.startedAt.toFixed(2).padStart(7)}] / playing[${target.playing-0}] / pausedAt[${target.pausedAt.toFixed(2).padStart(6)}] / loop[${target.bufferSource.loop-0}, ${target.bufferSource.loopStart.toFixed(2).padStart(6)} ${target.bufferSource.loopEnd.toFixed(2).padStart(6)}]`);
  } catch(err) {
    console.log(`AudioDebug: Index ${index}: Error ${err}`);
    "AudioDebug: Index 0: currentTime[  0.53] / startedAt[117.06] / playing[  0.00] / pausedAt[ 24.43] / loop[true,  51.12~ 76.74]";
  }
}
var timer;

// check the Earthquake Early Warning
var isEEW = false,
    lastnum = 0,
    lastID = "",
    lastAt = new Date("2000/01/01 00:00:00"),
    lastOriginalText = "",
    eewDatas = {
      version: AppVersionView,
      logs: []
    },
    eewAssumptionsLog = {};
//var eewLoadingLateTime = [0,0,0,0,0,-1];
async function handleEewEventFromSocket(data){
  if(!testNow){ eewDatas.logs.push({ raw: data, time: (new Date())/1000, timeISO: (new Date()).toISOString(), timelag: systemTimeLag }) }
  eewClassCode = data.Title.Code;
  let eewIntensityCode = data.OriginalText.match(/.. .. .. ............ C.. ............ ND.............. NCN... JD.............. JN... ... .... ..... ... .. (..) RK..... RT..... RC...../)[1];
  if(data.Title.Code == 35){
    eewReportNumber = data.Serial;
    eewReportID = data.EventID;
    eewOriginTime = new Date(data.OriginTime.String);
    eewIsCancel = false;
    eewIsTraning = false;
    eewCalcintensity = "5弱程度以上";
    eewCalcIntensityIndex = -1;
    eewEpicenter = data.Hypocenter.Name;
    eewEpicenterID = ("00"+data.Hypocenter.Code).slice(-3);
    SFXController.play(sounds.eew.first);
    const isForcedTime = eewOriginTime.getTime()+90000 > getFormattedDate(2);
    if (isForcedTime || testNow){
      SetMode(1);
      eewSpeech(eewReportID, eewCalcIntensityIndex, eewEpicenterID, eewMagnitude, eewDepth, false, false);
    }
  } else if(data.Title.Code == 39){
    eewIsCancel = true;
    eewIsFinal = true;
    eewIsTraning = false;
    if(audioAPI.oscillatorNode.starting) audioAPI.fun.stopOscillator();
  } else {
    eewReportNumber = data.Serial;
    eewReportID = data.EventID;
    eewOriginTime = new Date(data.OriginTime.String);
    eewIsCancel = false;
    eewIsTraning = false;
    eewIsFinal = (data.Type.Code>7) ? true : false;
    eewCalcintensity = data.MaxIntensity.String;
    eewCalcIntensityIndex = ["//", "01", "02", "03", "04", "5-", "5+", "6-", "6+", "07"].indexOf(eewIntensityCode);
    eewIsAlert = data.Warn;
    eewIsAssumption = data.Hypocenter.isAssumption;
    eewEpicenter = data.Hypocenter.Name;
    eewEpicenterID = ("00"+data.Hypocenter.Code).slice(-3);
    let viewCondition = true; // Number(document.getElementsByName("eewminint")[0].value)-1<["1","2","3","4","5弱","5強","6弱","6強","7"].indexOf(eewCalcintensity);
    if (eewIsAssumption){
      if (lastID != eewReportID) eewMagnitude = -1;
      SFXController.play(sounds.eew.plum);
      if (!(eewReportID in eewAssumptionsLog)){
        eewAssumptionsLog[eewReportID] = {}
      }
      eewAssumptionsLog[eewReportID][data.Hypocenter.Location.Long+"_"+data.Hypocenter.Location.Lat] = {
        longitude: data.Hypocenter.Location.Long,
        latitude: data.Hypocenter.Location.Lat,
        intensity: eewCalcintensity,
        epicenter: data.Hypocenter.Name
      }
    } else {
      eewMagnitude = data.Hypocenter.Magnitude?.Float;
      eewDepth = data.Hypocenter.Location.Depth.Int;
      eewAlertFlgText = "//";
      if ((lastnum!=eewReportNumber || lastID!=eewReportID) && viewCondition){
        if (eewReportNumber == "1"){
          SFXController.play(sounds.eew.first);
        } else if (eewIsFinal){
          SFXController.play(sounds.eew.last);
        } else {
          SFXController.play(sounds.eew.continue);
        }
      }
    }
    eewWarnForecast = "";
    if (viewCondition){
      const isForcedTime = eewOriginTime.getTime()+90000 > getFormattedDate(2);
      if ((isForcedTime || eewReportNumber < 13) || testNow) SetMode(1);
      if ((isForcedTime || testNow) && viewMode === 1) eewSpeech(eewReportID, eewCalcIntensityIndex, eewEpicenterID, eewMagnitude, eewDepth, true, !eewIsAssumption);
      if (viewMode==1 && (lastnum!=eewReportNumber || lastID!=eewReportID) && (eewOriginTime.getTime()+90000 > getFormattedDate(2) || eewReportNumber == 1 || testNow)) eewMapDraw(data.Hypocenter.Location.Long, data.Hypocenter.Location.Lat, data.Forecast ? data.Forecast : []);
      if (eewIsAlert){
        eewWarnForecast = data.WarnForecast.LocalAreas.join(" ");
        if (eewWarnForecast.length > 49){
          eewWarnForecast = data.WarnForecast.District.join(" ");
        }
        // eewAboutHypocenter = data.WarnForecast.Hypocenter.Name;
        SFXController.play(sounds.eew.custom);
        if (!audioAPI.oscillatorNode.starting) audioAPI.fun.startOscillator();
      } else {
        if (audioAPI.oscillatorNode.starting) audioAPI.fun.stopOscillator();
      }
      if (elements.id.setClipEEW.checked) copyText("／／　緊急地震速報（"+(eewIsAlert?"警報":"予報")+"）　"+(eewIsFinal?"最終":(eewReportNumber==1?"初報":"継続"))+"第"+eewReportNumber+"報　＼＼\n最大震度　　　："+eewCalcintensity+"\n震源　　　　　："+eewEpicenter+"\nマグニチュード："+eewMagnitude.toFixed(1)+"\n深さ　　　　　："+eewDepth+"㎞\n\n緊急地震速報が発表されました。\n落ち着いてください。\n上から落ちてくるものに気をつけてください。\nむりに火を消そうとしないでください。");
    }
  }
}

let eewOffset = NaN;
async function eewCalcOffset_c1(){
  if (isNaN(eewOffset)){
    return await fetch("https://smi.lmoniexp.bosai.go.jp/webservice/server/pros/latest.json?_="+(new Date()-0)).then(res => res.json()).then(data => {
      return eewOffset = new Date(data.latest_time) - new Date(data.request_time);
    });
  } else return eewOffset;
}
function eewChecking_c1(){
  eewCalcOffset_c1().then(offsetTime => {
    const eewTime = new Date();
    eewTime.setMilliseconds(eewTime.getMilliseconds() + offsetTime);
    elements.id.eewTime.textContent = ("0" + eewTime.getHours()).slice(-2) + ":" + ("0" + eewTime.getMinutes()).slice(-2) + ":" + ("0" + eewTime.getSeconds()).slice(-2);
    const eewStr = getFormattedDate(0, true, eewTime);
    return fetch(RequestURL.lmoni_eew.replace("{yyyyMMddHHmmss}", eewStr));
  }).then(res => res.json()).then(data => {

    eewChecking_c1.tracker.update();
    if (data.report_num !== ""){
      eewClassCode = 37;
      eewReportNumber = data.report_num;
      eewEpicenter = data.region_name;
      eewEpicenterID = AreaEpicenter2Code[eewEpicenter] ?? "";
      eewIsCancel = data.is_cancel;
      eewIsFinal = data.is_final;
      eewIsTraning = data.is_traning;
      eewCalcIntensityIndex = ["不明", "1", "2", "3", "4", "5弱", "5強", "6弱", "6強", "7"].indexOf(data.calcintensity);
      eewCalcintensity = data.calcintensity;
      eewMagnitude = data.magunitude - 0;
      eewDepth = data.depth.slice(0, -2);
      if (eewReportID !== data.report_id) eewIsAlert = false;
      eewReportID = data.report_id;
      eewAlertFlgText = data.alertflg;
      let eewIsAlert_changed = (!eewIsAlert) && (data.alertflg === "警報");
      eewIsAlert = data.alertflg === "警報" ? true : false;
      eewOriginTime = new Date(data.origin_time.slice(0,4)+"/"+data.origin_time.slice(4,6)+"/"+data.origin_time.slice(6,8)+" "+data.origin_time.slice(8,10)+":"+data.origin_time.slice(10,12)+":"+data.origin_time.slice(12,14));
      if (lastnum != data.report_num || lastID != data.report_id){
        if (eewReportNumber == "1"){
          SFXController.play(sounds.eew.first);
        } else if (eewIsFinal){
          SFXController.play(sounds.eew.last);
        } else {
          SFXController.play(sounds.eew.continue);
        }
        if (eewIsAlert_changed){
          if (!audioAPI.oscillatorNode.starting) audioAPI.fun.startOscillator();
        }
        if (!eewIsAlert){
          if (audioAPI.oscillatorNode.starting) audioAPI.fun.stopOscillator();
        }
        const isForcedTime = eewOriginTime.getTime()+90000 > getFormattedDate(2);
        if (isForcedTime || eewReportNumber < 13){
          SetMode(1);
        }
        eewMapDraw(data.longitude-0, data.latitude-0);
        if ((isForcedTime || testNow) && viewMode === 1) eewSpeech(data.report_id, eewCalcIntensityIndex, eewEpicenterID, eewMagnitude, eewDepth);
        if (elements.id.setClipEEW.checked) copyText("／／　緊急地震速報（"+(eewIsAlert?"警報":"予報")+"）　"+(eewIsFinal?"最終":(eewReportNumber==1?"初報":"継続"))+"第"+eewReportNumber+"報　＼＼\n最大震度　　　："+eewCalcintensity+"\n震源　　　　　："+eewEpicenter+"\nマグニチュード："+eewMagnitude.toFixed(1)+"\n深さ　　　　　："+eewDepth+"㎞\n\n緊急地震速報が発表されました。\n落ち着いてください。\n上から落ちてくるものに気をつけてください。\nむりに火を消そうとしないでください。");
      }
      eewWarnForecast = "";
    }
    lastnum = data.report_num;
    lastID = data.report_id;
  });
}
eewChecking_c1.tracker = new TrafficTracker("lmoni EEW");

/**
 *
 * @param {String} quakeId 地震ID
 * @param {Number} maxShindo 最大震度
 * @param {String} epicenterId 震源ID
 * @param {Number|String} magnitude マグニチュード
 * @param {String} depth 深さだけどそんな使ってない
 * @param {Boolean} speechShindo 震度を読み上げるか
 * @param {Boolean} speechMag マグニチュードを読み上げるか
 */
function eewSpeech(quakeId, maxShindo, epicenterId, magnitude, depth, speechShindo = true, speechMag = true){
  // console.log(Array.from(arguments));
  if (!speechBase.userSpace.isEewMode) speechBase.allCancel();
  speechBase.userSpace.isEewMode = true;
  speechBase.setId("eew.epicenter_long", { type: "path", speakerId: speechBase.userSpace.speakerId, path: "eew.epicenter.long." + epicenterId });
  if (speechShindo) speechBase.setId("eew.max_shindo", { type: "path", speakerId: speechBase.userSpace.speakerId, path: "common.intensity." + maxShindo });
  if (speechMag) speechBase.setId("eew.magnitude_val", { type: "path", speakerId: speechBase.userSpace.speakerId, path: "common.magnitude." + ("0" + (magnitude * 10).toFixed()).slice(-2) });
  if (speechBase.userSpace.eew.quakeId !== quakeId){
    speechBase.userSpace.eew.quakeId = "";
    speechBase.userSpace.eew.intensity = "";
    speechBase.userSpace.eew.epicenterId = "";
    speechBase.userSpace.eew.magnitude = "";
    speechBase.userSpace.eew.depth = "";
  }
  if (speechBase.paused && (speechBase.userSpace.eew.epicenterId !== epicenterId || speechBase.userSpace.eew.intensity !== maxShindo || speechBase.userSpace.eew.magnitude !== magnitude)){
    if (elements.id.speechCheckboxEEW.checked) speechBase.start([
      ...(speechBase.userSpace.eew.epicenterId !== epicenterId ? [{ type: "id", id: "eew.epicenter_long" }] : []),
      ...(speechShindo ? [{ type: "path", speakerId: speechBase.userSpace.speakerId, path: "eew.ungrouped.3" },
      { type: "id", id: "eew.max_shindo" }] : []),
      ...(speechMag ? [{ type: "path", speakerId: speechBase.userSpace.speakerId, path: "eew.ungrouped.4" },
      { type: "id", id: "eew.magnitude_val" }] : [])
    ]);
    speechBase.userSpace.eew.quakeId = quakeId;
    speechBase.userSpace.eew.intensity = maxShindo;
    speechBase.userSpace.eew.epicenterId = epicenterId;
    speechBase.userSpace.eew.magnitude = magnitude;
    speechBase.userSpace.eew.depth = depth;
  };
}

// Earthquake Early Warning
var eewMapBmp = null;
createImageBitmap(context.createImageData(175, 128)).then(bmp => eewMapBmp = bmp);
var eewEpiPos = [992,63];
/**
 *  @param {float} longitude
 *  @param {float} latitude
 *  @param {iedred7584EEW.Data.Forecast} warnAreas
 */
async function eewMapDraw(longitude, latitude, warnAreas=[]){
  try {
    let areaCodes = [];
    for (const area of warnAreas){
      const code = AreaForecastLocalE[area.Intensity.Code + ""].parent;
      if(!areaCodes.includes(code)) areaCodes.push(code);
    }
    warnAreas = areaCodes;
  } catch (error) {
    warnAreas = [];
    console.error(error);
  }

  eewEpiPos = [992, 63]; // Initialize
  let lineWidth = 1;

  if (latitude<33) eewEpiPos[1] += (33-latitude)*3;
  if (latitude>45) eewEpiPos[1] += (45-latitude)*3;
  if (latitude>36){
    if (longitude<137) eewEpiPos[0] += (longitude-137)*3;
  } else {
    if (longitude<128) eewEpiPos[0] += (longitude-128)*3;
  }
  if (longitude>146) eewEpiPos[0] += (longitude-146)*3;
  let magnification = await window.connect2sandbox("quakemap_calc_magnification", { warn: warnAreas, lon: longitude, lat: latitude });
  lineWidth = 2.5/Math.max(magnification, 2.5);
  // console.log("magnification = "+magnification+"\n    lineWidth = "+lineWidth);

  magnification = (magnification < 1) ? 70 : 70 / magnification;
  context.fillStyle = colorThemeMode != 2 ? "#89abd1" : "#111";
  context.fillRect(905, 0, 175, 128);
  context.strokeStyle = colorThemeMode != 2 ? "#333" : "#aaa";
  context.lineWidth = lineWidth;
  Japan_geojson.features.forEach(function(int){
    if (warnAreas.includes(int.properties.code)) context.fillStyle = colorThemeMode != 2 ? "#fdab29" : "#ffed4a"; else context.fillStyle = colorThemeMode != 2 ? "#32a852" : "#666";
    switch (int.geometry.type) {
      case "MultiPolygon":
        int.geometry.coordinates.forEach(function(points){
          context.beginPath();
          for (let i=0; i<points[0].length; i++) {
            const point = points[0][i];
            if(i === 0){
              context.moveTo((point[0]-(longitude-eewEpiPos[0]/magnification))*magnification,(-point[1]+(latitude+eewEpiPos[1]/magnification))*magnification);
            } else {
              context.lineTo((point[0]-(longitude-eewEpiPos[0]/magnification))*magnification,(-point[1]+(latitude+eewEpiPos[1]/magnification))*magnification);
            }
          }
          context.fill();
          context.stroke();
        });
        break;
      case "Polygon":
        int.geometry.coordinates.forEach(function(points){
          context.beginPath();
          for (let i=0; i<points.length; i++) {
            let point = points[i];
            if(i === 0){
              context.moveTo((point[0]-(longitude-eewEpiPos[0]/magnification))*magnification,(-point[1]+(latitude+eewEpiPos[1]/magnification))*magnification);
            } else {
              context.lineTo((point[0]-(longitude-eewEpiPos[0]/magnification))*magnification,(-point[1]+(latitude+eewEpiPos[1]/magnification))*magnification);
            }
          }
          context.fill();
          context.stroke();
        });
        break;
    }
  });
  context.lineWidth = 1;
  eewMapBmp = null;
  createImageBitmap(canvas1, 905, 0, 175, 128).then(bmp => eewMapBmp = bmp);
  /*
    * 中心992px,63px
    * × 989-4px,60-4px to 995+4px,66+4px
    * × 989-4px,66+4px to 995+4px,60-4px
    * ×             ↓
    * × 989-4px,58-4px 987-4px,60-4px 995+4px,68+4px 997+4px,66+4px
    * × 989-4px,68+4px 987-4px,66+4px 995+4px,58-4px 997+4px,60-4px
  */
}

function intervalReset() {
  intervalTime1 = 1;
  clearInterval(intervalArray.shift());
  soraopen_interval1 = null;
}

function strWidth(str) {
  return context.measureText(str).width;
}

function soraopen_stop() {
  clearInterval(intervalArray.shift());
  soraopen_move = null;
}

var qid = "",
    question = "",
    choice1 = "",
    choice2 = "",
    choice3 = "",
    choice4 = "",
    closeTime = "",
    ans1 = 0,
    ans2 = 0,
    ans3 = 0,
    ans4 = 0,
    maxans = 0,
    isClose = true,
    soraopen = 0,
    isSoraview = false;
async function sorabtn(){
  const data = await fetch(RequestURL.wni_sorabtn).then(res => res.json());
  sorabtn.tracker.update();

  qid = data['data']['qid'];
  question = data['data'][0]['question'];
  closeTime = data['data'][0]['closeTime'];
  ans1 = data['data'][0]['ans1'] - 0;
  ans2 = data['data'][0]['ans2'] - 0;
  ans3 = data['data'][0]['ans3'] - 0;
  ans4 = data['data'][0]['ans4'] - 0;
  closeTime != "" ? isClose = true : isClose = false;
  maxans = [ans1, ans2, ans3, ans4].sort(function(a, b) { return b - a; })[0];
}
sorabtn.tracker = new TrafficTracker("ソラボタン");

function sorabtn_view(){
  soraopen_moving = 1080;
  soraopen_intervaltime = 0;
  intervalTime = 0;
  intervalTime1 = 0;
  $.ajax({
    type: 'GET',
    url: RequestURL.wni_sorabtn,
    dataType: 'json',
    timeOut: 4500,
    cache: false,
    success: function(data){
      sorabtn.tracker.update();

      soraopen = 1;
      anim_soraview.start();
      anim_soraview_color.start();
      qid = data['data']['qid'];
      question = data['data'][0]['question'];
      choice1 = data['data'][0]['choice1'];
      choice2 = data['data'][0]['choice2'];
      choice3 = data['data'][0]['choice3'];
      choice4 = data['data'][0]['choice4'];
      closeTime = data['data'][0]['closeTime'];
      ans1 = data['data'][0]['ans1'] - 0;
      ans2 = data['data'][0]['ans2'] - 0;
      ans3 = data['data'][0]['ans3'] - 0;
      ans4 = data['data'][0]['ans4'] - 0;
      closeTime != "" ? isClose=true : isClose=false;
      maxans = [ans1,ans2,ans3,ans4].sort(function(a, b) { return b - a; })[0];
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      console.log("Loading Error (sorabtn-view)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
    }
  });
}
function sorabtn_open(){
  soraopen_intervaltime = 0;
  $.ajax({
    type: 'GET',
    url: RequestURL.wni_sorabtn,
    dataType: 'json',
    timeOut: 4500,
    cache: false,
    success: function(data){
      sorabtn.tracker.update();

      soraopen = 3;
      if(anim_soraview.startTime == -1){
        anim_soraview.start();
      }
      if(anim_soraview_color.startTime == -1){
        anim_soraview_color.start();
      }
      qid = data['data']['qid'];
      question = data['data'][0]['question'];
      choice1 = data['data'][0]['choice1'];
      choice2 = data['data'][0]['choice2'];
      choice3 = data['data'][0]['choice3'];
      choice4 = data['data'][0]['choice4'];
      closeTime = data['data'][0]['closeTime'];
      ans1 = data['data'][0]['ans1'] - 0;
      ans2 = data['data'][0]['ans2'] - 0;
      ans3 = data['data'][0]['ans3'] - 0;
      ans4 = data['data'][0]['ans4'] - 0;
      closeTime != "" ? isClose=true : isClose=false;
      maxans = [ans1,ans2,ans3,ans4].sort(function(a, b) { return b - a; })[0];
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      console.log("Loading Error (sorabtn-open)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
    }
  });
}
function sorabtn_close(){
  soraopen = 0;
  intervalTime = 0;
  intervalTime1 = 0;
  soraopen_moving = 1081;
  soraopen_interval1 = null;
  anim_soraview.reset();
  anim_soraview_color.reset();
  Routines.md0title();
}

var weather1hourrain = [];
var weather24hourrain = [];
var weatherMaximumWindSpeed = [];
var weather_mxtemsadext = [];
var weather_mntemsadext = [];
var weather1hourrainstr = "",
    weather24hoursrainstr = "",
    weatherMaximumWindSpeedstr = "",
    weather_mxtemsadextstr = "",
    weather_mntemsadextstr = "";
var weather_prelist = [[],[],[],[],[]];
function rain_windData(isFull){
  weather_prelist = [[],[],[],[],[]];
  $.ajax({
    beforeSend: function(xhr){
      xhr.overrideMimeType('text/plain; charset=shift_jis');
    },
    type: 'GET',
    url: RequestURL.jmaTableCsvPre1h00_rct,
    dataType: 'text',
    timeOut: 50000,
    cache: false,
    success: function(data){
      rain_windData.pre1h00_rct.update();
      weather1hourrain = [];
      var weatherDataListCSV = [];
      var tmp = data.split("\n");
      for (let i=0; i<tmp.length-1; i++) {
        weatherDataListCSV[i] = tmp[i].split(',');
      }
      let obsTime = weatherDataListCSV[518][6]+"日"+weatherDataListCSV[518][7]+"時"+weatherDataListCSV[518][8]+"分現在";
      let i;
      for (i=1; i<weatherDataListCSV.length; i++) {
        let obj = {pref:"", name:"", value: 0};
        obj.pref=weatherDataListCSV[i][1];
        obj.name=weatherDataListCSV[i][2];
        obj.value=Number(weatherDataListCSV[i][9]);
        if(obj.value!=0 && weatherDataListCSV[i][10]=="8")weather1hourrain.push(obj);
        if(weather_prelist[0].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[0].push(weatherDataListCSV[i][1]);
      }
      let s=""; i=0; // ←←←←←←←←←←←
      // var spdl = document.getElementsByClassName('wpl0'); //SetPrefectureDataList
      // for(let variable of weather_prelist[0]){
      //   if(spdl[i]===undefined){
      //     s += "<input type='checkbox' class='wpl0' value='"+variable+"' checked>";
      //     s += variable;
      //     s += "<br>";
      //   } else {
      //     s += "<input type='checkbox' class='wpl0' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
      //     s += variable;
      //     s += "<br>";
      //   }
      //   i++;
      // }
      // document.getElementById('main1').innerHTML = s;
      // var cn = document.getElementsByClassName('wpl0');
      // var wpll = [];
      // for(let i=0; i<cn.length; i++){
      //   if(cn[i].checked){
      //     wpll.push(cn[i].value);
      //   }
      // }
      // weather1hourrain = weather1hourrain.filter(function(a){return wpll.indexOf(a.pref)!=-1});
      weather1hourrain.sort(function(a,b){return b.value-a.value});
      weather1hourrainstr = "[Maximum hourly precipitation]　("+obsTime+")　　　";
      var rank = 0;
      for(let i=0; i<weather1hourrain.length; i++){
        if(rank!=0)if(weather1hourrain[i].value != weather1hourrain[i-1].value)rank=i+1; else; else rank++;
        if(i>20){
          if(weather1hourrain[i].value!=weather1hourrain[i-1].value)break;
        }
        weather1hourrainstr += rank+")"+weather1hourrain[i].pref+" "+weather1hourrain[i].name.replace(/（.{1,}）/, "")+" "+weather1hourrain[i].value+"mm/h　　 ";
      }
      if(weather1hourrainstr==""){
        weather1hourrainstr = (wpll.join('、')+"では過去1時間以内に雨が降ったところはないようです。").replace(/ /g, "");
        if(cn.length == wpll.length){
          weather1hourrainstr = "日本で過去1時間以内に雨が降ったところはないようです。";
        }
      }
    }
  });
  $.ajax({
    beforeSend: function(xhr){
      xhr.overrideMimeType('text/plain; charset=shift_jis');
    },
    type: 'GET',
    url: RequestURL.jmaTableCsvPre24h00_rct,
    dataType: 'text',
    timeOut: 50000,
    cache: false,
    success: function(data){
      rain_windData.pre24h00_rct.update();
      weather24hourrain = [];
      var weatherDataListCSV = [];
      var tmp = data.split("\n");
      for (var i=0; i<tmp.length-1; i++) {
        weatherDataListCSV[i] = tmp[i].split(',');
      }
      let obsTime = weatherDataListCSV[518][6]+"日"+weatherDataListCSV[518][7]+"時"+weatherDataListCSV[518][8]+"分現在";
      var i;
      for (i=1; i<weatherDataListCSV.length; i++) {
        var obj = {pref:"", name:"", value: 0};
        obj.pref=weatherDataListCSV[i][1];
        obj.name=weatherDataListCSV[i][2];
        obj.value=Number(weatherDataListCSV[i][9]);
        if(obj.value!=0 && weatherDataListCSV[i][10]=="8")weather24hourrain.push(obj);
        if(weather_prelist[1].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[1].push(weatherDataListCSV[i][1]);
      }
      var s="";i=0;
      // var spdl = document.getElementsByClassName('wpl1'); //SetPrefectureDataList
      // for(let variable of weather_prelist[1]){
      //   if(spdl[i]===undefined){
      //     s += "<input type='checkbox' class='wpl1' value='"+variable+"' checked>";
      //     s += variable;
      //     s += "<br>";
      //   } else {
      //     s += "<input type='checkbox' class='wpl1' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
      //     s += variable;
      //     s += "<br>";
      //   }
      //   i++;
      // }
      // document.getElementById('main2').innerHTML = s;
      // var cn = document.getElementsByClassName('wpl1');
      // var wpll = [];
      // for(let i=0; i<cn.length; i++){
      //   if(cn[i].checked){
      //     wpll.push(cn[i].value);
      //   }
      // }
      // weather24hourrain = weather24hourrain.filter(function(a){return wpll.indexOf(a.pref)!=-1});
      weather24hourrain.sort(function(a,b){return b.value-a.value});
      weather24hoursrainstr = "[Maximum 24-hour precipitation]　("+obsTime+")　　　";
      var rank = 0;
      for (let i=0; i<weather24hourrain.length; i++){
        if (rank!=0) if(weather24hourrain[i].value != weather24hourrain[i-1].value)rank=i+1; else; else rank++;
        if (i>20){
          if (weather24hourrain[i].value!=weather24hourrain[i-1].value) break;
        }
        weather24hoursrainstr += rank+")"+weather24hourrain[i].pref+" "+weather24hourrain[i].name.replace(/（.{1,}）/, "")+" "+weather24hourrain[i].value+"mm/d　　 ";
      }
      if (weather24hoursrainstr == ""){
        weather24hoursrainstr = (wpll.join('、')+"では過去1時間以内に雨が降ったところはないようです。").replace(/ /g, "");
      }
    }
  });
  if (isFull){
    $.ajax({
      beforeSend: function(xhr){
        xhr.overrideMimeType('text/plain; charset=shift_jis');
      },
      type: 'GET',
      url: RequestURL.jmaTableCsvMxwsp00_rct,
      dataType: 'text',
      timeOut: 50000,
      cache: false,
      success: function(data){
        rain_windData.mxwsp00_rct.update();
        weatherMaximumWindSpeed = [];
        var weatherDataListCSV = [];
        var tmp = data.split("\n");
        for (var i=0; i<tmp.length-1; i++) {
          weatherDataListCSV[i] = tmp[i].split(',');
        }
        let obsTime = weatherDataListCSV[388][6]+"日"+weatherDataListCSV[388][7]+"時"+weatherDataListCSV[388][8]+"分現在";
        var i;
        for (i=1; i<weatherDataListCSV.length; i++) {
          var obj = {pref:"", name:"", value: 0};
          obj.pref = weatherDataListCSV[i][1];
          obj.name = weatherDataListCSV[i][2];
          obj.value = Number(weatherDataListCSV[i][9]);
          if(Number(weatherDataListCSV[i][10])>3)weatherMaximumWindSpeed.push(obj);
          if(weather_prelist[2].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[2].push(weatherDataListCSV[i][1]);
        }
        var s=""; i=0;
        // var spdl = document.getElementsByClassName('wpl2'); //SetPrefectureDataList
        // for(var variable of weather_prelist[2]){
        //   if(spdl[i]===undefined){
        //     s += "<input type='checkbox' class='wpl2' value='"+variable+"' checked>";
        //     s += variable;
        //     s += "<br>";
        //   } else {
        //     s += "<input type='checkbox' class='wpl2' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
        //     s += variable;
        //     s += "<br>";
        //   }
        //   i++;
        // }
        // document.getElementById('main3').innerHTML = s;
        // var cn = document.getElementsByClassName('wpl2');
        // var wpll = [];
        // for(var i=0; i<cn.length; i++){
        //   if(cn[i].checked){
        //     wpll.push(cn[i].value);
        //   }
        // }
        // weatherMaximumWindSpeed = weatherMaximumWindSpeed.filter(function(a){return wpll.indexOf(a.pref)!=-1});
        weatherMaximumWindSpeed.sort(function(a,b){return b.value-a.value});
        weatherMaximumWindSpeedstr = "[Maximum wind speed]　("+obsTime+")　　　";
        var rank = 0;
        let unit = document.getElementsByName('unitWinds')[0].value;
        switch (unit) {
          case "km/h":
            for(let i=0; i<weatherMaximumWindSpeed.length; i++){
              weatherMaximumWindSpeed[i].value *= 3.6;
              weatherMaximumWindSpeed[i].value = Math.round(weatherMaximumWindSpeed[i].value);
            }
            break;
          case "mph":
            for(let i=0; i<weatherMaximumWindSpeed.length; i++){
              weatherMaximumWindSpeed[i].value *= 2.2369;
              weatherMaximumWindSpeed[i].value = Math.round(weatherMaximumWindSpeed[i].value);
            }
            break;
          case "kt":
            for(let i=0; i<weatherMaximumWindSpeed.length; i++){
              weatherMaximumWindSpeed[i].value *= 1.9438;
              weatherMaximumWindSpeed[i].value = Math.round(weatherMaximumWindSpeed[i].value);
            }
            break;
          case "ft/s":
            for(let i=0; i<weatherMaximumWindSpeed.length; i++){
              weatherMaximumWindSpeed[i].value *= 3.2808;
              weatherMaximumWindSpeed[i].value = Math.round(weatherMaximumWindSpeed[i].value);
            }
            break;
        }
        for(var i=0; i<weatherMaximumWindSpeed.length; i++){
          if(rank != 0) if(weatherMaximumWindSpeed[i].value != weatherMaximumWindSpeed[i-1].value)rank=i+1; else; else rank++;
          if(i>20){
            if(weatherMaximumWindSpeed[i].value!=weatherMaximumWindSpeed[i-1].value)break;
          }
          weatherMaximumWindSpeedstr += rank+")"+weatherMaximumWindSpeed[i].pref+" "+weatherMaximumWindSpeed[i].name.replace(/（.{1,}）/, "")+" "+weatherMaximumWindSpeed[i].value+""+unit+"　　 ";
        }
      }
    });
    $.ajax({
      beforeSend: function(xhr){
        xhr.overrideMimeType('text/plain; charset=shift_jis');
      },
      type: 'GET',
      url: RequestURL.jmaTableCsvMxtemsadext00_rct,
      dataType: 'text',
      timeOut: 50000,
      cache: false,
      success: function(data){
        rain_windData.mxtemsadext00_rct.update();
        weather_mxtemsadext = [];
        var weatherDataListCSV = [];
        var tmp = data.split("\n");
        for (var i=0; i<tmp.length-1; i++) {
          weatherDataListCSV[i] = tmp[i].split(',');
        }
        let obsTime = weatherDataListCSV[388][6]+"日"+weatherDataListCSV[388][7]+"時"+weatherDataListCSV[388][8]+"分現在";
        var i;
        for (i=1; i<weatherDataListCSV.length; i++) {
          var obj = {pref:"", name:"", value: 0};
          obj.pref = weatherDataListCSV[i][1];
          obj.name = weatherDataListCSV[i][2];
          obj.value = Number(weatherDataListCSV[i][9]);
          if(Number(weatherDataListCSV[i][10])>3)weather_mxtemsadext.push(obj);
          if(weather_prelist[3].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[3].push(weatherDataListCSV[i][1]);
        }
        var s="";i=0;
        // var spdl = document.getElementsByClassName('wpl3'); //SetPrefectureDataList
        // for(var variable of weather_prelist[3]){
        //   if(spdl[i]===undefined){
        //     s += "<input type='checkbox' class='wpl3' value='"+variable+"' checked>";
        //     s += variable;
        //     s += "<br>";
        //   } else {
        //     s += "<input type='checkbox' class='wpl3' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
        //     s += variable;
        //     s += "<br>";
        //   }
        //   i++;
        // }
        // document.getElementById('main4').innerHTML = s;
        // var cn = document.getElementsByClassName('wpl3');
        // var wpll = [];
        // for(var i=0; i<cn.length; i++){
        //   if(cn[i].checked){
        //     wpll.push(cn[i].value);
        //   }
        // }
        // weather_mxtemsadext = weather_mxtemsadext.filter(function(a){return wpll.indexOf(a.pref)!=-1});
        weather_mxtemsadext.sort(function(a,b){return b.value-a.value});
        weather_mxtemsadextstr = "[Maximum temperature]　("+obsTime+")　　　";
        var rank = 0;
        let unit = document.getElementsByName('unitTemp')[0].value;
        switch (unit) {
          case "K":
            for(let i=0; i<weather_mxtemsadext.length; i++){
              weather_mxtemsadext[i].value += 273.15;
            }
            break;
          case "℉":
            for(let i=0; i<weather_mxtemsadext.length; i++){
              weather_mxtemsadext[i].value = weather_mxtemsadext[i].value * 1.8 + 32;
              weather_mxtemsadext[i].value = Math.round(weather_mxtemsadext[i].value);
            }
            break;
        }
        for(var i=0; i<weather_mxtemsadext.length; i++){
          if(rank!=0)if(weather_mxtemsadext[i].value != weather_mxtemsadext[i-1].value)rank=i+1; else; else rank++;
          if(i>20){
            if(weather_mxtemsadext[i].value!=weather_mxtemsadext[i-1].value)break;
          }
          weather_mxtemsadextstr += rank+")"+weather_mxtemsadext[i].pref+" "+weather_mxtemsadext[i].name.replace(/（.{1,}）/, "")+" "+weather_mxtemsadext[i].value+""+unit+"　　 ";
        }
      }
    });
    $.ajax({
      beforeSend: function(xhr){
        xhr.overrideMimeType('text/plain; charset=shift_jis');
      },
      type: 'GET',
      url: RequestURL.jmaTableCsvMntemsadext00_rct,
      dataType: 'text',
      timeOut: 50000,
      cache: false,
      success: function(data){
        rain_windData.mntemsadext00_rct.update();
        weather_mntemsadext = [];
        var weatherDataListCSV = [];
        var tmp = data.split("\n");
        for (var i=0; i<tmp.length-1; i++) {
          weatherDataListCSV[i] = tmp[i].split(',');
        }
        let obsTime = weatherDataListCSV[388][6]+"日"+weatherDataListCSV[388][7]+"時"+weatherDataListCSV[388][8]+"分現在";
        var i;
        for (i=1; i<weatherDataListCSV.length; i++) {
          var obj = {pref:"", name:"", value: 0};
          obj.pref = weatherDataListCSV[i][1];
          obj.name = weatherDataListCSV[i][2];
          obj.value = Number(weatherDataListCSV[i][9]);
          if(Number(weatherDataListCSV[i][10])>3)weather_mntemsadext.push(obj);
          if(weather_prelist[4].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[4].push(weatherDataListCSV[i][1]);
        }
        var s="";i=0;
        // var spdl = document.getElementsByClassName('wpl4'); //SetPrefectureDataList
        // for(var variable of weather_prelist[4]){
        //   if(spdl[i]===undefined){
        //     s += "<input type='checkbox' class='wpl4' value='"+variable+"' checked>";
        //     s += variable;
        //     s += "<br>";
        //   } else {
        //     s += "<input type='checkbox' class='wpl4' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
        //     s += variable;
        //     s += "<br>";
        //   }
        //   i++;
        // }
        // document.getElementById('main5').innerHTML = s;
        // var cn = document.getElementsByClassName('wpl4');
        // var wpll = [];
        // for(var i=0; i<cn.length; i++){
        //   if(cn[i].checked){
        //     wpll.push(cn[i].value);
        //   }
        // }
        // weather_mntemsadext = weather_mntemsadext.filter(function(a){return wpll.indexOf(a.pref)!=-1});
        weather_mntemsadext.sort(function(a,b){return a.value-b.value});
        weather_mntemsadextstr = "[Minimum temperature]　("+obsTime+")　　　";
        var rank = 0;
        let unit = document.getElementsByName('unitTemp')[0].value;
        switch (unit) {
          case "K":
            for(let i=0; i<weather_mntemsadext.length; i++){
              weather_mntemsadext[i].value += 273.15;
            }
            break;
          case "℉":
            for(let i=0; i<weather_mntemsadext.length; i++){
              weather_mntemsadext[i].value = weather_mntemsadext[i].value * 1.8 + 32;
              weather_mntemsadext[i].value = Math.round(weather_mntemsadext[i].value);
            }
            break;
        }
        for(var i=0; i<weather_mntemsadext.length; i++){
          if(rank!=0)if(weather_mntemsadext[i].value != weather_mntemsadext[i-1].value)rank=i+1; else; else rank++;
          if(i>20){
            if(weather_mntemsadext[i].value!=weather_mntemsadext[i-1].value)break;
          }
          weather_mntemsadextstr += rank+")"+weather_mntemsadext[i].pref+" "+weather_mntemsadext[i].name.replace(/（.{1,}）/, "")+" "+weather_mntemsadext[i].value+""+unit+"　　 ";
        }
      }
    });
  }
}
rain_windData.pre1h00_rct = new TrafficTracker("JMA / 1時間降水量 最新");
rain_windData.pre24h00_rct = new TrafficTracker("JMA / 24時間降水量 最新");
rain_windData.mxwsp00_rct = new TrafficTracker("JMA / 最大風速 最新");
rain_windData.mxtemsadext00_rct = new TrafficTracker("JMA / 最高気温 最新");
rain_windData.mntemsadext00_rct = new TrafficTracker("JMA / 最低気温 最新");

function forEach2(int,callbackfn){
  var i = 0;
  var u;
  var re = [];
  for(i=0; i<int.length; i++){
      u = callbackfn(int[i],i);
      if(u!==void(0))re.push(u);
  }
  if(re.length == 0) return i; else return re;
}

function notification(type, title, msg, id, priority){
  switch (type) {
    case "create":
      chrome.notifications.create(id, {
          iconUrl: 'img/icon128.png',
          type: 'basic',
          title: title,
          message: msg,
          priority: priority
      });
      break;
      //b:title, c:message, d:notificationid, e:priority
    case "update":
      chrome.notifications.update(id, {
          iconUrl: 'img/icon128.png',
          type: 'basic',
          title: title,
          message: msg,
          priority: priority
      });
      break;
      //b:title, c:message, d:notificationid, e:priority
    case "clear":
      chrome.notifications.clear(title)
      break;
      //b:notificationid
    default:
      console.error("Error: An Unknown Notification Type");
      break;
  }
}
function background_send(message){
  chrome.runtime.sendMessage(message, function(response){});
}
chrome.notifications.onClicked.addListener(function(c){
    console.log(background_send("open"));
});

const getAmedasData = function(){
  const ConvertDate = getAmedasData.ConvertDate;
  let currentDate = new Date();
  let cacheDate = ConvertDate(currentDate);
  // let xhrTimeBase = new XMLHttpRequest();
  fetch(RequestURL.jmaAmedasLatest+"?__time__"+cacheDate)
  .then(response => response.text())
  .then(text => {
    let latest_date = new Date(text);
    getAmedasData.time.min10 = latest_date.toLocaleString("JP");
    let min10time = ConvertDate(latest_date);
    latest_date.setMinutes(0);
    getAmedasData.time.min60 = latest_date.toLocaleString("JP");
    let min60time = ConvertDate(latest_date);
    Promise.all([
      fetch("https://www.jma.go.jp/bosai/amedas/data/map/"+min10time+"00.json"),
      fetch("https://www.jma.go.jp/bosai/amedas/data/map/"+min60time+"00.json")
    ])
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(datas => {
      getAmedasData.tracker.update();
      let min10 = datas[0];
      let min60 = datas[1];
      let outputTempText = "";
      let output10precText = "";
      let output60precText = "";
      let output180precText = "";
      let output1440precText = "";
      let outputHumidityText = "";
      let outputWindText = "";
      // let outputDustText = "";
      let outputSun1h = "";
      let outputSnowHeightText = "";
      let output1snowText = "";
      let output6snowText = "";
      let output12snowText = "";
      let output24snowText = "";
      let outputPressureText = "";
      for(let id in amedasStationTable){
        let target1 = amedasStationTable[id];
        let target10 = min10[id];
        let target60 = min60[id];
        let kjname = "　　"+target1.kjName+" ";
        let s = (target1.type === "A" || target1.type === "B") || !elements.id.setParticallyReadingAme.checked;
        if(target1.validTemp && target10.temp && target10.temp[1]===0 && s){
          outputTempText += kjname+target10.temp[0]+"℃";
        }
        if(target1.validPrec && target10.precipitation10m && target10.precipitation10m[1]===0 && s && target10.precipitation10m[0]){
          output10precText += kjname+target10.precipitation10m[0]+"mm/10min.";
        }
        if(target1.validPrec && target10.precipitation1h && target10.precipitation1h[1]===0 && s && target10.precipitation1h[0]){
          output60precText += kjname+target10.precipitation1h[0]+"mm/h";
        }
        if(target1.validPrec && target10.precipitation3h && target10.precipitation3h[1]===0 && s && target10.precipitation3h[0]){
          output180precText += kjname+target10.precipitation3h[0]+"mm/3h";
        }
        if(target1.validPrec && target10.precipitation24h && target10.precipitation24h[1]===0 && s && target10.precipitation24h[0]){
          output1440precText += kjname+target10.precipitation24h[0]+"mm/d";
        }
        if(target1.validHumid && target10.humidity && target10.humidity[1]===0 && s){
          outputHumidityText += kjname+target10.humidity[0]+"％";
        }
        if(target1.validWind && target10.wind && target10.wind[1]===0 && s && target10.wind[0]){
          outputWindText += kjname+target10.wind[0]+"m/s";
        }
        if(target1.validSun && target10.sun1h && target10.sun1h[1]===0 && s){
          outputSun1h += kjname+target10.sun1h[0]+"時間";
          if(target1.isSunEstimamtion) outputWindText += "(推定)";
        }
        if(target1.validSnow && target60.snow && target60.snow[1]===0 && s && target60.snow[0]){
          outputSnowHeightText += kjname+target60.snow[0]+"cm";
        }
        if(target1.validSnow && target60.snow1h && target60.snow1h[1]===0 && s && target60.snow1h[0]){
          output1snowText += kjname+target60.snow1h[0]+"cm";
        }
        if(target1.validSnow && target60.snow6h && target60.snow6h[1]===0 && s && target60.snow6h[0]){
          output6snowText += kjname+target60.snow6h[0]+"cm";
        }
        if(target1.validSnow && target60.snow12h && target60.snow12h[1]===0 && s && target60.snow12h[0]){
          output12snowText += kjname+target60.snow12h[0]+"cm";
        }
        if(target1.validSnow && target60.snow24h && target60.snow24h[1]===0 && s && target60.snow24h[0]){
          output24snowText += kjname+target60.snow24h[0]+"cm";
        }
        if(target1.validPressure && target10.pressure && target10.pressure[1]===0 && s){
          outputPressureText += kjname+target10.pressure[0]+"hPa";
        }
      }

      outputTempText = "("+getAmedasData.time.min10+" 現在)  現在の気温"+outputTempText;
      outputHumidityText = "("+getAmedasData.time.min10+" 現在)  現在の湿度"+outputHumidityText;
      outputSun1h = "("+getAmedasData.time.min10+" 現在)  前1時間の日照時間"+outputSun1h;
      outputPressureText = "("+getAmedasData.time.min10+" 現在)  現在の現地気圧"+outputPressureText;
      if(output10precText) output10precText = "("+getAmedasData.time.min10+" 現在)  10分間降水量"+output10precText;
      if(output60precText) output60precText = "("+getAmedasData.time.min10+" 現在)  1時間降水量"+output60precText;
      if(output180precText) output180precText = "("+getAmedasData.time.min10+" 現在)  3時間降水量"+output180precText;
      if(output1440precText) output1440precText = "("+getAmedasData.time.min10+" 現在)  24時間降水量"+output1440precText;
      if(outputWindText) outputWindText = "("+getAmedasData.time.min10+" 現在)  現在の風速"+outputWindText;
      // if(outputDustText) outputDustText = "("+getAmedasData.time.min10+" 現在)  現在の瞬間風速"+outputDustText;
      if(outputSnowHeightText) outputSnowHeightText = "("+getAmedasData.time.min60+" 現在)  現在の積雪深"+outputSnowHeightText;
      if(output1snowText) output1snowText = "("+getAmedasData.time.min60+" 現在)  1時間降雪量"+output1snowText;
      if(output6snowText) output6snowText = "("+getAmedasData.time.min60+" 現在)  6時間降雪量"+output6snowText;
      if(output12snowText) output12snowText = "("+getAmedasData.time.min60+" 現在)  12時間降雪量"+output12snowText;
      if(output24snowText) output24snowText = "("+getAmedasData.time.min60+" 現在)  24時間降雪量"+output24snowText;

      if(!output10precText) output10precText = "現在、前10分以内に雨が降った場所は無いようです。";
      if(!output60precText) output60precText = "現在、前1時間以内に雨が降った場所は無いようです。";
      if(!output180precText) output180precText = "現在、前3時間以内に雨が降った場所は無いようです。";
      if(!output1440precText) output1440precText = "現在、前24時間以内に雨が降った場所は無いようです。";
      if(!outputWindText) outputWindText = "現在、風が吹いている場所は無いようです。";
      // if(!outputDustText) outputDustText = "現在、風が吹いている場所は無いようです。";
      if(!outputSnowHeightText) outputSnowHeightText = "現在、雪が積もっている場所は無いようです。";
      if(!output1snowText) output1snowText = "現在、前1時間以内に雪が降った場所は無いようです。";
      if(!output6snowText) output6snowText = "現在、前6時間以内に雪が降った場所は無いようです。";
      if(!output12snowText) output12snowText = "現在、前12時間以内に雪が降った場所は無いようです。";
      if(!output24snowText) output24snowText = "現在、前24時間以内に雪が降った場所は無いようです。";

      commandShortcuts[3] = outputTempText;
      commandShortcuts[10] = output10precText;
      commandShortcuts[11] = output60precText;
      commandShortcuts[12] = output180precText;
      commandShortcuts[13] = output1440precText;
      commandShortcuts[17] = outputHumidityText;
      commandShortcuts[20] = outputWindText;
      // command_shortcutsTo[21] = outputDustText;
      commandShortcuts[28] = outputSun1h;
      commandShortcuts[30] = outputSnowHeightText;
      commandShortcuts[35] = output1snowText;
      commandShortcuts[36] = output6snowText;
      commandShortcuts[37] = output12snowText;
      commandShortcuts[38] = output24snowText;
      commandShortcuts[40] = outputPressureText;
    });
  });
};
getAmedasData.tracker = new TrafficTracker("JMA / アメダス");
getAmedasData.ConvertDate = obj => `${obj.getFullYear()}${((obj.getMonth()+1)+"").padStart(2,"0")}${(obj.getDate()+"").padStart(2,"0")}${(obj.getHours()+"").padStart(2,"0")}${(obj.getMinutes()+"").padStart(2,"0")}`;
getAmedasData.time = { min10: "?", min60: "?" };

// warning: remove
const getEvacuationData = function(){
  const xhrEvacuation = new XMLHttpRequest();
  xhrEvacuation.addEventListener("load", function(){
    const data = JSON.parse(this.response);
    const warnAreaTexts = [];
    const warnAreaTextsOnlyEmg = [];
    for (const key in data.city){
      const target = data.city[key];
      const severities = Object.keys(target.data.issue ?? {});
      for(let i=0, l=severities.length; i<l; i++){
        const prefecture = target.pref;
        const area = target.area;
        const additionalText = "【"+severities[i]+"】"+prefecture+area;
        warnAreaTexts.push(additionalText);
        if(severities[i] === "緊急安全確保") warnAreaTextsOnlyEmg.push(additionalText);
      }
    }
    commandShortcuts[300] = warnAreaTexts.join("　") || "該当地域なし";
    commandShortcuts[302] = warnAreaTextsOnlyEmg.join("　") || "該当地域なし";
  });
  xhrEvacuation.open("GET", "https://site.weathernews.jp/site/lalert/json/evac.json");
  xhrEvacuation.send();
};

var weatherlink = [];
//“台風(TY)”、“台風(STS)”、“台風(TS)”、“熱帯低気圧(TD)”、“ハリケーン(Hurricane)”、“発達した熱帯低気圧(Tropical Storm)”、“温帯低気圧(LOW)”
// const JMA_logCheck = () => {}
Element.prototype.fun1 = function(name, i=0){ return this.getElementsByTagName(name).item(i); };
Element.prototype.fun2 = function(name, i=0){ return this.querySelectorAll(name).item(i) };
NodeList.prototype.toArray = function(){ return Array.from(this) };
function convertFullWidthToHalfWidth(str) {
  return str.replace(/[０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

function parseRainfallData(text){
  const lines = text.trim().split('\n');
  let currentData = { datetime: '', prefecture: '', locations: [] };
  let results = [];

  for (let line of lines){
    line = zen2han(line);
    // 時間と地方
    const timeMatch = line.match(/(\d{1,2})時(\d{1,2}分)?(.+)で記録的短時間大雨/);
    if (timeMatch){
      if (currentData.datetime){
        results.push({...currentData});
        currentData.locations = [];
      }
      currentData.datetime = `${timeMatch[1].padStart(2, '0')}:${(timeMatch[2] || '00').replace('分', '').padStart(2, '0')}`;
      currentData.prefecture = timeMatch[3];
    }
    // 地点と降水量
    const locationMatch = line.match(/(.+)で(約)?(\d+)ミリ(以上)?/);
    if (locationMatch){
      currentData.locations.push({
        name: locationMatch[1],
        rainfall: parseInt(locationMatch[3], 10),
        isApproximate: !!locationMatch[2],
        isOrMore: locationMatch[4] === '以上'
      });
    }
  }

  if (currentData.datetime) results.push(currentData);
  return results;
}

function weatherInfo(){
  $.ajax({
    type: 'GET',
    url: "https://www.data.jma.go.jp/developer/xml/feed/extra.xml",
    dataType: 'xml',
    cache: false,
    success: data => {
      weatherInfo.tracker.update();
      const performWeatherStartAt = performance.now() * 1000;
      if (viewMode === 2 || viewMode === 1) return;
      const arr = [];
      let isChange = true;
      $(data).find('entry').each(function (){
        const linkAttrHref = this.fun1("link").getAttribute('href');
        const titleTextCotent = this.fun1('title').textContent;
        if (weatherlink.indexOf(linkAttrHref) !== -1) isChange = false;
        arr.push(linkAttrHref);
        if (isChange && titleTextCotent !== "早期天候情報" && titleTextCotent !== "気象警報・注意報" && titleTextCotent !== "気象特別警報・警報・注意報"){
          if (titleTextCotent == "土砂災害警戒情報" && q_startTime <= 300) isChange = false;
          if (titleTextCotent == "指定河川洪水予報" && q_startTime <= 300) isChange = false;
        }
        const performWeatherLoadStartAt = performance.now() * 1000;
        if (isChange){
          if (titleTextCotent === "台風解析・予報情報（５日予報）（Ｈ３０）");
          // GitHubの履歴にこれ書いてたやつあると思うからそこから引っ張ってきて（2023/08/15らへん）
        }
        if (q_startTime > 300 && isChange){
          if (titleTextCotent === "気象警報・注意報（Ｈ２７）"){
            $.ajax({
              type: 'GET',
              url: linkAttrHref,
              dataType: 'xml',
              cache: true,
              success: function(xmlRoot){
                const title = "気象警報・注意報 " + xmlRoot.querySelector('Body > Warning[type="気象警報・注意報（府県予報区等）"] > Item > Area > Name').textContent;
                // const text = xmlRoot.querySelector('Report > Head > Headline > Text').textContent;
                for (const item1 of Array.from(xmlRoot.querySelector('Warning[type="気象警報・注意報（一次細分区域等）"]').getElementsByTagName("Item"))){
                  const alertPlace = AreaForecastLocalM.warn[item1.querySelector("Area > Code").textContent];
                  for (const item2 of Array.from(item1.getElementsByTagName("Kind"))){
                    const alertStatus = item2.getElementsByTagName("Status")[0].textContent;
                    const lastAlertType = item2.querySelector("LastKind > Name")?.textContent;
                    const alertType = item2.getElementsByTagName('Name')?.[0]?.textContent ?? "";
                    if (alertStatus === "発表"){
                      const mainText = "【 " + alertPlace + " 】 発表：" + alertType;
                      const nextKinds = [];
                      for (const item3 of Array.from(item2.getElementsByTagName("NextKind"))){
                        nextKinds.push(item3.getElementsByTagName("Sentence")[0].textContent);
                      }
                      if (!nextKinds.length) nextKinds.push("");
                      for (const item3 of nextKinds) NewsOperator.add(title, item3, mainText);
                      //t += AreaForecastLocalM.warn[$(int).find('Area Code').text()] + "に" + $($(int2).find('Name')[0]).text() + "発表　";
                    } else if (alertStatus === "特別警報から警報" || alertStatus === "特別警報から注意報"){
                      NewsOperator.add(title, "", "【 " + alertPlace + " 】 " + lastAlertType + " から " + alertType + " へ切り替え");
                    } else if (alertStatus === "警報から注意報"){
                      NewsOperator.add(title, "", "【 " + alertPlace + " 】 解除：" + lastAlertType);
                    } else if (alertStatus === "解除"){
                      NewsOperator.add(title, "", "【 " + alertPlace + " 】 解除：" + alertType);
                    }
                  }
                }
              }
            });
          } else if (titleTextCotent === "竜巻注意情報"){
            $.ajax({
              type: 'GET',
              url: linkAttrHref,
              dataType: 'xml',
              cache: true,
              success: function(c){
                const performWeatherLoadEndAt = performance.now() * 1000;
                for (const item of c.querySelectorAll('Body > Warning[type="竜巻注意情報（一次細分区域等）"] > Item')){
                  if (item.querySelector('Kind > Code').textContent - 0){
                    const area = AreaForecastLocalM.tornado[item.querySelector('Area > Code').textContent];
                    const title = c.querySelector('Head > Title').textContent + (c.querySelector('Serial').textContent === "1" ? "　発表中" : "　継続中" );
                    const description = c.querySelector('Head > Headline > Text').textContent;
                    NewsOperator.add(title, description, area + "に竜巻注意情報が発表されています。");
                  }
                  SFXController.play(sounds.warning.Notice);
                }
                document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                // BNtitle.push("Hazardous wind watch is in effect.");
                // 【竜巻注意情報（第3報）】山梨県中・西部、東部・富士五湖：06日19時50分まで有効
                // Head > Serial : 第○報
                // ValidDateTime : 有効期限
              }
            });
          } else if (titleTextCotent.search("記録的短時間大雨情報") !== -1){
            $.ajax({
              type: 'GET',
              url: linkAttrHref,
              dataType: 'xml',
              cache: true,
              success: function(c){
                const performWeatherLoadEndAt = performance.now() * 1000;
                if (c.querySelector('Headline > Information > Item > Kind > Condition').textContent !== "取消"){
                  try {
                    const data = parseRainfallData(c.querySelector("Headline > Text").textContent);
                    const areaen = AreaForecastLocalM.warning[c.querySelector("Headline Area > Code").textContent].en_US;
                    if (!data.length) throw new Error("Error occurred while parsing text.");
                    for (const current of data){
                      const time = current.datetime;
                      const areajp = current.prefecture;
                      for (const event of current.locations){
                        NewsOperator.add('【記録的短時間大雨情報】 ' + areajp + ' (' + time + ')', "", "　" + event.name + " " + event.rainfall + "mm/h" + (event.isOrMore ? " 以上" : "") + " （" + ((event.isApproximate || event.isOrMore) ? "解析結果" : "観測値") + "）　");
                        NewsOperator.add('* Heavy Rain Observed * ' + areaen + ' (' + time + ')', "", "　" + (event.isOrMore ? "Over " : "") + event.rainfall + "mm/h (" + ((event.isApproximate || event.isOrMore) ? "Analysis" : "Observation") + ") at " + event.name + "　");
                      }
                    }
                  } catch (e){
                    console.error(e);
                    NewsOperator.add('記録的短時間大雨情報', c.querySelector('Report > Head > Title').textContent, c.querySelector('Headline > Text').textContent)
                    NewsOperator.add('Heavy Rain Information', c.querySelector('Report > Head > Title').textContent, c.querySelector('Headline > Text').textContent)
                  }
                  if (elements.id.speechCheckboxVPOA50.checked) speechBase.start([
                    { type: "wait", time: 1000 },
                    { type: "path", speakerId: "speaker8", path: "VPOA50_issued" }
                  ]);
                  SFXController.play(sounds.warning.HeavyRain);
                }
                document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
              }
            });
          } else if (titleTextCotent === "土砂災害警戒情報"){
            $.ajax({
              type: 'GET',
              url: linkAttrHref,
              dataType: 'xml',
              cache: true,
              success: function(c){
                const performWeatherLoadEndAt = performance.now() * 1000;
                if ($(c).find('Headline > Information > Item > Kind > Condition').text() === "解除"){
                  NewsOperator.add('土砂災害警戒情報　解除', c.querySelector("Headline > Text").textContent, "<土砂災害警戒情報 解除>　対象地域：" + c.querySelector('TargetArea > Name').textContent);
                  if (elements.id.speechCheckboxGround.checked) speechBase.start([
                    { type: "path", speakerId: "speaker8", path: "ground.area."+$(c).find('TargetArea > Code').text() },
                    { type: "path", speakerId: "speaker8", path: "ground.clear" }
                  ]);
                } else {
                  const headline = Array.from(c.querySelectorAll("Headline Item"));
                  for (const item of headline){
                    const areatexts = [];
                    let tekisutoooaaaaa = "";
                    for (const area of item.querySelectorAll("Area > Name").toArray()){
                      tekisutoooaaaaa += " "+area.textContent;
                      if (tekisutoooaaaaa.length > 45) areatexts.push(tekisutoooaaaaa), tekisutoooaaaaa = "";
                    }
                    if (tekisutoooaaaaa) areatexts.push(tekisutoooaaaaa);
                    const infoType = item.fun2("Kind > Condition").textContent;
                    for (const area of areatexts) NewsOperator.add('土砂災害警戒情報　' + c.querySelector('TargetArea > Name').textContent, c.querySelector('Headline > Text').textContent, "［"+infoType+"］"+area);
                    if (infoType === "発表" && elements.id.speechCheckboxGround.checked) speechBase.start([
                      { type: "wait", time: 500 },
                      { type: "path", speakerId: "speaker8", path: "ground.area."+$(c).find('TargetArea > Code').text() },
                      { type: "path", speakerId: "speaker8", path: "ground.issue" }
                    ]);
                  }
                  SFXController.play(sounds.warning.GroundLoosening);
                }
                document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
              }
            });
          } else if (titleTextCotent === "気象特別警報報知") {
            $.ajax({
              type: 'GET',
              url: linkAttrHref,
              dataType: 'xml',
              cache: true,
              success: function(c){
                const performWeatherLoadEndAt = performance.now() * 1000;
                if (c.querySelector('Head > Headline > Information[type="気象特別警報報知（府県予報区等）"] > Item > Kind > Name').textContent !== "解除"){
                  NewsOperator.add('特別警報を発表中', '', '発表中の地域では、重大な危険が差し迫った異常な状況');
                  NewsOperator.add('Emergency weather warnings are in effect.', '', 'This is an extraordinary situation with serious potential for disaster conditions.');
                  const prefInfo = c.querySelector('Head > Headline > Information[type="気象特別警報報知（府県予報区等）"] > Item > Areas > Area');
                  for (const e2 of c.querySelectorAll('Head > Headline > Information[type="気象特別警報報知（市町村等）"] > Item')){
                    NewsOperator.add(
                      "【" + Array.from(e2.querySelectorAll('Kind > Name')).map(item => item.textContent).join("・") + "】",
                      "", "［発表中］" + OfficeID2PrefName[prefInfo.querySelector('Code').textContent] + e2.querySelector('Areas > Area > Name').textContent
                    );
                  }
                  if (elements.id.speechCheckboxSPwarn.checked) speechBase.start([
                    { type: "wait", time: 3500 },
                    { type: "path", speakerId: "speaker8", path: "warning.prefecture." + prefInfo.querySelector('Code').textContent },
                    { type: "path", speakerId: "speaker8", path: "warning.special_warn" }
                  ]);
                  SFXController.play(sounds.warning.Emergency);
                } else {
                  NewsOperator.add('特別警報は警報へ', '発表されていた特別警報は警報へ切り替えられましたが、引き続き最新情報にご注意ください。', '警報に切り替え：' + c.querySelector('Head > Headline > Information[type="気象特別警報報知（府県予報区等）"] > Item > Areas > Area > Name').textContent);
                }
                document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
              }
            });
          } else if (titleTextCotent === "指定河川洪水予報"){
            $.ajax({
              type: 'GET',
              url: linkAttrHref,
              dataType: 'xml',
              cache: true,
              success: function(c){
                const performWeatherLoadEndAt = performance.now() * 1000;
                const level = Number($(c).find('Headline > Information[type="指定河川洪水予報（河川）"] Kind > Code').text());
                if (ifrange(level, 50, 51)){
                  SFXController.play(sounds.warning.Flood5);
                  const riverAreaName = c.querySelector('Headline > Information[type="指定河川洪水予報（予報区域）"] > Item > Areas > Area > Name').textContent;
                  const riverTitle = "【 " + c.querySelector("Head > Title").textContent + " / 警戒レベル５相当 】";
                  NewsOperator.add(riverTitle, c.querySelector('Head > Headline > Text').textContent, riverAreaName + "では、氾濫が発生した模様。");
                  for (const c2 of c.querySelectorAll('Body > Warning[type="指定河川洪水予報"] > Item')){
                    const type = c2.querySelector("Property > Type").textContent;
                    switch (type){
                    case "主文":
                      if (c2.getElementsByTagName("Areas").length){
                        NewsOperator.add(riverTitle, c2.querySelector("Kind > Property > Text").textContent, "対象の水位観測所： "+c2.querySelector("Areas > Area > Name").textContent+" "+c2.querySelector("Stations > Station > Name").textContent+"水位観測所 （"+c2.querySelector("Stations > Station > Location").textContent+"）");
                      } else {
                        NewsOperator.add(riverTitle, c2.querySelector("Kind > Property > Text").textContent, riverAreaName + "で氾濫発生。すぐに安全の確保をしてください。");
                      }
                      break;
                    case "浸水想定地区":
                      for (const e2 of c2.querySelectorAll("Areas > Area")){
                        const areaName = e2.getElementsByTagName("City")[0].textContent + e2.getElementsByTagName("Name")[0].textContent;
                        NewsOperator.add(riverTitle, "", "［氾濫による浸水に注意］ " + areaName, { duration: 4500 });
                      }
                      break;
                    }
                  }
                } else if(ifrange(level, 40, 41)){
                  SFXController.play(sounds.warning.Flood4);
                  const riverAreaName = c.querySelector('Headline > Information[type="指定河川洪水予報（予報区域）"] > Item > Areas > Area > Name').textContent;
                  const riverTitle = "【 " + c.querySelector('Head > Title').textContent + " / 警戒レベル４相当 】";
                  NewsOperator.add(riverTitle, c.querySelector('Headline > Text').textContent, "対象河川： " + riverAreaName);
                  for (const e of c.querySelectorAll('Body > Warning[type="指定河川洪水予報"] > Item')){
                    const type = e.querySelector("Property > Type").textContent;
                    switch (type){
                    case "主文":
                      NewsOperator.add(riverTitle, e.querySelector("Property > Text").textContent, "対象の水位観測所： " + e.querySelector("Areas > Area > Name").textContent + " " + e.querySelector("Stations > Station > Name").textContent + "水位観測所 （" + e.querySelector("Stations > Station > Location").textContent + "）");
                      break;
                    case "浸水想定地区":
                      for (const e2 of e.querySelectorAll("Areas > Area")){
                        const areaName = e2.getElementsByTagName("City")[0].textContent + e2.getElementsByTagName("Name")[0].textContent;
                        NewsOperator.add(riverTitle, "", "［氾濫による浸水に注意］ " + areaName, { duration: 4500 });
                      }
                      break;
                    }
                  }
                }
                elements.id.dbPfDrawing.innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
              }
            });
          } else if (titleTextCotent === "全般台風情報"){
            $.ajax({
              type: 'GET',
              url: linkAttrHref,
              dataType: 'xml',
              cache: true,
              success: function(c){
                const texts = c.getElementsByTagName("Text");
                const headcomment = texts[0].textContent.replaceAll(/(\s){1,}/g,"　").trim().split("。").slice(0, -1).map(line => line + "。");
                let bodycomment = texts[1].textContent.split("\n\n").map(text => text.replaceAll(/(\s){1,}/g,"　"));
                if (bodycomment[0] === "なし") bodycomment = [""];
                const title = c.querySelector("Head > Title").textContent;
                for (const line of headcomment){
                  NewsOperator.add(title, "全般台風情報　ヘッドライン", line);
                }
                for (const key in bodycomment) {
                  const item = bodycomment[key];
                  NewsOperator.add(title, item, "", {duration: item.length * 150});
                }
              }
            });
          }
        }
      });
      weatherlink = arr;
    },
    error: (XMLHttpRequest, textStatus, errorThrown) => {
      if (textStatus === "timeout") console.warn("接続がタイムアウトしました。("+XMLHttpRequest.status+")"); else errorCollector.collect("XMLHttpRequestでエラーが発生しました。isTrustedはundefinedです。\nRequest Type: WeatherInformation / Timeout: 0(ms)");
    }
  });
}
weatherInfo.tracker = new TrafficTracker("JMA / 気象情報 一覧");

function ifrange(n, e1, e2, cd=[0,0]){
  let r1, r2;
  if(cd[0]===0)r1=(e1<=n);else r1=(e1<n);
  if(cd[1]===0)r2=(n<=e2);else r2=(n<e2);
  return r1&&r2;
}
function toFull(str){
  return str.replace(/[A-Za-z0-9]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)
  }).replace(/</g, "［").replace(/>/g, "］");
}

function viewQuake(){
  timeCount = 1;
  earthquake_telop_times = q_magnitude!="--" ? 0 : -1027;
  earthquake_telop_remaining = 1500;
  // 20231105 削除 カスタム地震情報
  const magnitude_r_jp = {"-901": "不明", "-902": "8を超える巨大地震"};
  const magnitude_r_en = {"-901": "unknown", "-902": "above 8"};
  if (q_magnitude !== "--"){
    quakeText[0] = q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+shindoListJP[q_maxShindo]+"を観測する地震が発生しました。震源は"+q_epiName+"、地震の規模を示すマグニチュードは"+(magnitude_r_jp[q_magnitude] || q_magnitude);
    if (q_depth == "ごく浅い") quakeText[0] += "、震源は"+q_depth+"です。"; else quakeText[0] += "、震源の深さは"+q_depth+"kmです。";
    quakeText[0] += quake_customComment;
  } else {
    quakeText[0] = "［震度速報］ "+q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+shindoListJP[q_maxShindo]+"を観測する地震が発生しました。"+multilingual[0][63];
    quakeText[0] += "震源が沖の場合、津波が発生する恐れがあります。海岸から離れるようにしてください。";
  }
  const ampm = (q_timeH-0) > 11 ? "PM" : "AM";
  if (q_magnitude !== "--"){
    quakeText[0] += "　　　　　　　" + ampm + " " + (q_timeH % 12) + ":" + q_timeM + " JST - A "+(magnitude_r_en[q_magnitude] || q_magnitude)+" magnitude earthquake with a maximum intensity of "+shindoListNHK[q_maxShindo]+" occurred. The epicenter was located in " + epicenter_list[1][q_epiId] + ", with a depth of ";
    if(q_depth === "ごく浅い") quakeText[0] += "very shallow."; else quakeText[0] += q_depth+"km.";
  } else {
    quakeText[0] += "　　　　　　　" + ampm + " " + (q_timeH % 12) + ":" + q_timeM + " JST - An earthquake with a maximum seismic intensity of "+shindoListNHK[q_maxShindo]+" occurred. Please pay attention to further information!";
    if(q_maxShindo > 5){
      //mainText[0] = "震源が海底ですと、津波が発生する恐れがあります。海岸から離れるようにしてください。"
    }
  }
  SetMode(2);
  language = "Ja";
  textOffsetX = 1200;
  let titletext = "", windtext = "";
  if (q_magnitude != "--") titletext = "[地震情報](" + q_timeH + ":" + q_timeM + "頃発生) 震源地:" + q_epiName + " 最大震度:" + shindoListJP[q_maxShindo] + " M" + (magnitude_r_jp[q_magnitude] || q_magnitude) + " 深さ:" + ((q_depth == "ごく浅い")?q_depth:"約"+q_depth+"km"); else titletext = "＜震度速報＞　" + q_timeH + "時" + q_timeM + "分頃発生　最大震度" + shindoListJP[q_maxShindo];
  document.getElementById("eiTitle").innerText = titletext;
  document.getElementById("eiTitle").scrollLeft = 365;
  document.getElementById("eiwind").innerText = "";
  if (q_maxShindo == -1){
    document.getElementById("eiTitle").innerText = "まだ情報は入っていません。";
    document.getElementById("eiwind").innerText = "There is no information avilable.";
  } else {
    for (let i=10; i>0; i--){
      if (quakeText[i] != ""){
        windtext += "［震度" + toFull(shindoListJP[i]) + "］\n　" + ( (!isSokuho) ? (quakeText[i].replace(/　 </g, '\n　').slice(1)) : (quakeText[i].replace(/　 </g, '\n　')) ).replace(/> /g, '：') + "\n";
      }
    }
    document.getElementById("eiwind").innerText = windtext;
    if (document.getElementById("setClipQuake").checked) copyText(titletext + "\n\n" + windtext.replaceAll("<br>","\n"));
  }
}

var isSokuho = false;
var lasteqlist = "";
var num = 0;
var l = [];
/** 地震リストを取得 */
function load_quake_list_v2(){
  load_quake_list_v2.lastCall = NaN;
  fetch(RequestURL.nhkQuake1+"&_="+Date.now()).then(res => res.json()).then(data => {
    load_quake_list_v2.tracker.update();
    load_quake_list_v2.lastCall = load_quake_list_v2.tracker.lastTime;
    const eqlist = JSON.stringify(data.quake) + quakeinfo_offset_cnt;
    // const magnitude_not_a_number = {"M不明": 1, "M8を超える巨大地震": 2, "Ｍ不明": 1, "Ｍ８を超える巨大地震": 2};
    const earthquake_intensity_list_all = { "S1": '1', "S2": '2', "S3": '3', "S4": '4', "S5-": '5弱', "S5+": '5強', "S6-": '6弱', "S6+": '6強', "S7": '7', "LS5-": '5弱(推定)', "LS5+": '5強(推定)', "LS6-": '6弱(推定)', "LS6+": '6強(推定)', "LS7": '7(推定)' };
    const earthquake_intensity_color_all = { "S1": '#f2f2ff', "S2": '#68c8fd', "S3": '#869ffd', "S4": '#fae696', "S5-": '#faf500', "S5+": '#febb6f', "S6-": '#ff2800', "S6+": '#a50021', "S7": '#b40068', "LS5-": '#faf500', "LS5+": '#febb6f', "LS6-": '#ff2800', "LS6+": '#a50021', "LS7": '#b40068' };
    let quakeinfo_list_html = "";
    if(lasteqlist !== eqlist){
      data.quake.forEach((c2, num) => {
        const event_date = new Date(c2.event_date);
        quakeinfo_list_html += '<button type="button" data-e=' + num;
        quakeinfo_list_html += ' name="elo' + num + '" id="el' + c2.event_id;
        quakeinfo_list_html += '" style="background-color:';
        quakeinfo_list_html += earthquake_intensity_color_all[c2.max_shindo] || "#ffffff";
        quakeinfo_list_html += '; color:';
        quakeinfo_list_html += /* (c2.max_shindo=="S3" || Number(c2.max_shindo.slice(1,2))>6) ? "#fff" : */"#000";
        quakeinfo_list_html += '; ';
        if (num === quakeinfo_offset_cnt) quakeinfo_list_html += 'animation: 2s animation_current_quake_view 0s infinite;';
        quakeinfo_list_html += '" class="eiList-button">';
        if (c2.hypocenter.name === "") quakeinfo_list_html += '<span style="color:#fff; background-color:#000 padding:2px;">　';
        quakeinfo_list_html += c2.hypocenter.name === "" ? "震源未確定" : c2.hypocenter.name;
        quakeinfo_list_html += '　最大震度' + earthquake_intensity_list_all[c2.max_shindo];
        quakeinfo_list_html += '　' + event_date.getDate() + "日" + event_date.getHours() + "時" + event_date.getMinutes() + "分頃発生";
        if (c2.hypocenter.name === "") quakeinfo_list_html += "　</span>";
        quakeinfo_list_html += '</button>';
      });
      document.getElementById("eiList").innerHTML = quakeinfo_list_html;
      forEach2(document.getElementsByClassName("eiList-button"), function(c, i){
        c.addEventListener("click", function(e){
          const itemOffset = e.currentTarget.getAttribute("data-e") - 0;
          if (itemOffset !== quakeinfo_offset_cnt){
            quakeinfo_offset_cnt = itemOffset;
            quakesContainer.view();
          }
          console.log(
            e.currentTarget.getAttribute("id"),
            e.currentTarget.getAttribute("name").slice(3) - 0,
            earthquakes_log.hasOwnProperty(e.currentTarget.getAttribute("id").slice(2))
          );
          load_quake_list_v2();
        });
      });
    }
    lasteqlist = eqlist;
    load_quake_event_v2(data.quake[quakeinfo_offset_cnt].event_id);
  }).catch(() => {
    // 通信エラーでNaNのままになるのを阻止する
    // 単純に代入するだけだと、無限にリクエストする
    load_quake_list_v2.lastCall = Date.now();
  });
}
load_quake_list_v2.tracker = new TrafficTracker("NHK / 地震情報一覧");
load_quake_list_v2.lastCall = 0;

var earthquake_latest_identifier = "";
// var earthquake_event_isloading = false;
/**
 * 地震のイベントを取得
 * @param {String} event_id イベントID
 */
function load_quake_event_v2(event_id){
  fetch(RequestURL.nhkQuake2.replace("{event_id}", event_id)+"?_="+Date.now()).then(res => {
    load_quake_event_v2.tracker.update();
    const identifier = event_id + res.headers.get("last-modified");
    if (earthquake_latest_identifier !== identifier){
      earthquake_latest_identifier = identifier;
      return res.json();
    } else {
      return new Promise(() => {
        return false;
      });
    }
  }).then(data => {
    if (data){
      const magnitude_not_a_number = {"M不明": "-901", "M8を超える巨大地震": "-902", "Ｍ不明": "-901", "Ｍ８を超える巨大地震": "-902"};
      const earthquake_intensity_list_all = { "S1": 1, "S2": 2, "S3": 3, "S4": 4, "S5-": 6, "S5+": 7, "S6-": 8, "S6+": 9, "S7": 10 };
      const event_date = new Date(data.event_date);
      const last_magnitude = q_magnitude;
      q_timeYY = event_date.getFullYear();
      q_timeMM = ("0" + (event_date.getMonth() + 1)).slice(-2);
      q_timeDD = ("0" + event_date.getDate()).slice(-2);
      q_timeH = ("0" + event_date.getHours()).slice(-2);
      q_timeM = ("0" + event_date.getMinutes()).slice(-2);
      q_timeAll = q_timeYY + "-" + q_timeMM + "-" + q_timeDD + " " + q_timeH + ":" + q_timeM;

      q_maxShindo = earthquake_intensity_list_all[data.max_shindo];
      q_currentShindo = q_maxShindo;
      q_msiText = shindoListJP[q_maxShindo];
      isSokuho = data.sokuho === "1";

      if (data.hypocenter.code){
        q_epiId = epicenter_list[12].indexOf(data.hypocenter.code);
        q_magnitude = magnitude_not_a_number[data.magnitude] || data.magnitude;
        q_depth = data.depth;
        if(q_depth === "0") q_depth = "ごく浅い";
        q_epiName = data.hypocenter.name;
        $('#menu .eiwind').removeClass('SI');
      } else {
        q_magnitude = "--";
        q_epiName = "-------------";
        q_depth = "--";
        q_epiId = 343;
        $('#menu .eiwind').addClass('SI');
      }

      quakeText = ["","","","","","","","","","",""];
      for (let key in earthquake_intensity_list_all){
        if(data.hasOwnProperty(key)){
          quakeText[earthquake_intensity_list_all[key]] = data[key].pref.map(pref => {
            return (isSokuho ? "" : "<"+pref.name+"> ") + pref.uid_list.map(city => city.name).join(" ");
          }).join("　 ");
        }
      }
      quake_customComment = data.forecast_comment;

      // 初回起動時判定
      if (last_magnitude){
        viewQuake(0);
        // if(Number(document.getElementsByName("minint")[0].value)<=q_maxShindo && ((Number(document.getElementsByName("minmag")[0].value)<=Number(q_magnitude) && Number(document.getElementsByName("depmin")[0].value)>=Number(q_depth=="ごく浅い"?0:q_depth))||q_magnitude=="--")){
          SFXController.volume(sounds.quake[elements.class.sound_quake_type[q_maxShindo - 1].getAttribute("data-type")], elements.class.sound_quake_volume[q_maxShindo - 1].value / 100);
          SFXController.play(sounds.quake[elements.class.sound_quake_type[q_maxShindo - 1].getAttribute("data-type")]);
        // }
      }
      quakesContainer.hide();
      earthquakes_log[event_id] = {
        epicenter: q_epiName,
        magnitude: q_magnitude,
        msi: q_maxShindo,
        isSokuho: isSokuho,
        seismic_intensity: q_msiText,
        depth: q_depth,
        timeDD: q_timeDD,
        timeH: q_timeH,
        timeM: q_timeM,
        epicenter_id: q_epiId,
        text: quakeText
      };
    }
  });
}
load_quake_event_v2.tracker = new TrafficTracker("NHK / 地震情報イベント");

const SFXController = {
  play: soundData => {
    if (!soundData) return;
    if (!soundData.canPlay) soundData.audioEndedEvent();
    soundData.buffer.start(0);
    soundData.canPlay = false;
  },
  volume: (soundData, volume) => {
    if (!soundData) return;
    soundData.gain.gain.value = volume - 0;
  }
};

var lastp2p = "";
var p2p_elapsedTime = 2405;
var datakey="",datacount=0;
function humanReadable(){}

var tsunamiTexts = [];
var tsunamiLastReport = "";
DataOperator.tsunami.onUpdate = (data, vtse41, vtse51) => {
  if (DataOperator.tsunami.isIssued){
    tsunamiTexts = data.text.head;
    elements.id.tsunamiList.style.color = "#ffff33";
    elements.id.tsunamiList.innerText = DataOperator.tsunami.text.forecast_jp.split("　　").join("\n");
    t_Cancelled = false;
    if (vtse41){
      SFXController.play(sounds.tsunami[["", "watch", "notice", "warning", "majorwarning"][DataOperator.tsunami.warnLevel]]);
      const warnLevelStr = ["", "津波予報", "津波注意報", "津波警報", "大津波警報"][DataOperator.tsunami.warnLevel];
      NewsOperator.add(warnLevelStr, "", "津波の予想が更新されました。");
      for (const text of DataOperator.tsunami.text.forecast_news) NewsOperator.add(warnLevelStr, "", text);
    }
    if (vtse51){
      SFXController.play(sounds.tsunami.obs);
      NewsOperator.add("津波観測", "", "津波の観測値が更新されました。");
      for (const text of DataOperator.tsunami.text.obs_news) NewsOperator.add("津波観測", "", text);
    }
  } else {
    tsunamiTexts = [];
    elements.id.tsunamiList.style.color = "#ffffff";
    elements.id.tsunamiList.innerText = "津波の情報はまだ入っていません。\nThere is no information available.";
    t_Cancelled = true;
    Routines.md0title();
  }
};
DataOperator.typh_comment.onUpdate = data => {
  commandShortcuts[55] = "";
  for (const item of Object.values(data.data)){
    if (item.number){
      commandShortcuts[55] += "【台風" + item.number + "号】  " + item.comment;
    }
  }
};
DataOperator.warn_current.onUpdate = data => {
  commandShortcuts[60] = data;
};

function quakeTemplateView(viewId){
  //siHtem = Number(document.getElementById("template").options[document.getElementById("template").selectedIndex].value);
  textOffsetX = 1200;
  if(viewId == 1){
    q_maxShindo = 8+1;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "6.8";
    q_epiName = "山形県沖";
    q_epiId = 87;
    q_depth = "10";
    q_timeYY = "2019";
    q_timeMM = "6";
    q_timeDD = "18";
    q_timeH = "22";
    q_timeM = "22";
    quakeText[1] = "<北海道>	函館市 帯広市 渡島松前町 福島町 七飯町 檜山江差町　 <青森県>	平内町 横浜町 六ヶ所村 風間浦村　 <岩手県>	岩泉町 田野畑村 軽米町 九戸村 岩手洋野町　 <福島県>	鮫川村　 <茨城県>	龍ケ崎市 牛久市 茨城鹿嶋市 坂東市 美浦村 利根町　 <栃木県>	足利市 佐野市 上三川町 益子町 茂木町 塩谷町　 <群馬県>	館林市 富岡市 みどり市 神流町 甘楽町 長野原町 草津町 玉村町 板倉町　 <埼玉県>	さいたま西区 さいたま北区 さいたま見沼区 さいたま桜区 さいたま浦和区 さいたま南区 川越市 川口市 秩父市 本庄市 東松山市 狭山市 羽生市 深谷市 上尾市 草加市 越谷市 蕨市 戸田市 入間市 朝霞市 志木市 和光市 新座市 桶川市 北本市 蓮田市 坂戸市 鶴ヶ島市 ふじみ野市 伊奈町 埼玉三芳町 滑川町 吉見町 鳩山町 長瀞町　埼玉美里町 埼玉神川町 上里町　 <千葉県>	千葉中央区 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 千葉美浜区 木更津市 東金市 市原市 鎌ケ谷市 山武市 多古町 長南町　 <東京都>	東京千代田区 東京中央区 東京新宿区 東京文京区 東京台東区 東京墨田区 東京江東区 東京品川区 東京大田区 東京世田谷区 東京渋谷区 東京中野区 東京杉並区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京足立区 東京葛飾区 武蔵野市 町田市 小平市 日野市 国分寺市 東大和市 清瀬市 武蔵村山市　 <神奈川県> 横浜中区 川崎川崎区 川崎幸区 川崎中原区 川崎高津区 川崎多摩区 川崎宮前区 茅ヶ崎市　 <富山県>	富山市 高岡市 魚津市 滑川市 黒部市 砺波市 小矢部市 南砺市 舟橋村 上市町 立山町 入善町 富山朝日町　 <石川県>	金沢市 七尾市 羽咋市 かほく市 津幡町 志賀町　 <福井県>	福井坂井市　 <山梨県>	山梨北杜市 甲斐市　 <長野県>	松本市 飯田市 須坂市 小諸市 大町市 茅野市 佐久市 千曲市 東御市 安曇野市 長野南牧村 佐久穂町 御代田町 立科町 青木村 下諏訪町 木曽町 麻績村 生坂村 筑北村 長野池田町 白馬村 小谷村 小布施町　 <静岡県>	静岡清水区 沼津市 富士市 御殿場市 伊豆の国市 静岡清水町";
    quakeText[2] = "<北海道>	渡島北斗市 知内町 木古内町 上ノ国町　 <青森県>	弘前市 八戸市 十和田市 三沢市 むつ市 今別町 蓬田村 外ヶ浜町 鰺ヶ沢町 西目屋村 大鰐町 田舎館村 鶴田町 中泊町 野辺地町 七戸町 六戸町 東北町 おいらせ町 大間町 東通村 三戸町 五戸町 田子町 青森南部町 階上町 新郷村　 <岩手県>	宮古市 大船渡市 久慈市 陸前高田市 釜石市 二戸市 葛巻町 岩手町 住田町 大槌町 山田町 一戸町　 <宮城県>	多賀城市 女川町　 <秋田県>	小坂町 八峰町　 <福島県>	檜枝岐村 西郷村 棚倉町 矢祭町 塙町 石川町 玉川村 平田村 浅川町 古殿町 三春町 小野町 葛尾村　 <茨城県>	水戸市 日立市 土浦市 茨城古河市 石岡市 結城市 下妻市 常総市 高萩市 笠間市 取手市 つくば市 ひたちなか市 潮来市 守谷市 常陸大宮市 那珂市 筑西市 稲敷市 かすみがうら市 桜川市 神栖市 鉾田市 つくばみらい市 小美玉市 茨城町 城里町 東海村 大子町 阿見町 河内町 八千代町 五霞町 境町　 <栃木県>	宇都宮市 栃木市 鹿沼市 日光市 小山市 真岡市 大田原市 矢板市 栃木さくら市 那須烏山市 下野市 市貝町 芳賀町 壬生町 野木町 高根沢町 栃木那珂川町　 <群馬県>	前橋市 高崎市 桐生市 伊勢崎市 太田市 安中市 榛東村 吉岡町 中之条町 群馬高山村 東吾妻町 川場村 群馬昭和村 みなかみ町 群馬明和町 千代田町 邑楽町　 <埼玉県>	さいたま大宮区 さいたま中央区 さいたま緑区 熊谷市 行田市 春日部市 鴻巣市 久喜市 八潮市 富士見市 三郷市 幸手市 吉川市 白岡市 川島町 宮代町 松伏町　 <千葉県>	船橋市 松戸市 野田市 流山市 浦安市 印西市 香取市　 <新潟県>	糸魚川市 妙高市 湯沢町　 <富山県>	氷見市 射水市　 <石川県>	輪島市 中能登町　 <山梨県>	忍野村　 <長野県>	長野市 上田市 諏訪市 飯山市 軽井沢町 坂城町 長野高山村 山ノ内町 木島平村 野沢温泉村 信濃町 小川村 飯綱町";
    quakeText[3] = "<青森県>	青森市 黒石市 五所川原市 つがる市 平川市 深浦町 藤崎町 板柳町　 <岩手県>	盛岡市 花巻市 北上市 遠野市 一関市 八幡平市 奥州市 滝沢市 雫石町 紫波町 西和賀町 金ケ崎町 平泉町 普代村　 <宮城県>	仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 塩竈市 気仙沼市 白石市 角田市 東松島市 富谷市 七ヶ宿町 柴田町 亘理町 山元町 七ヶ浜町 大和町 大郷町 大衡村 南三陸町　 <秋田県>	能代市 大館市 鹿角市 上小阿仁村 藤里町 五城目町 八郎潟町 大潟村 秋田美郷町　 <山形県>	山形市 寒河江市 天童市 東根市 山形朝日町 大石田町 山形金山町 高畠町 白鷹町　 <福島県>	会津若松市 郡山市 白河市 須賀川市 相馬市 二本松市 田村市 福島伊達市 本宮市 川俣町 大玉村 鏡石町 天栄村 下郷町 只見町 南会津町 北塩原村 磐梯町 三島町 福島金山町 福島昭和村 泉崎村 中島村 矢吹町 楢葉町 富岡町 川内村 大熊町 浪江町 新地町 飯舘村　 <茨城県>	常陸太田市 北茨城市　 <栃木県>	那須塩原市 那須町　 <群馬県>	沼田市 渋川市 片品村　 <埼玉県>	加須市　 <新潟県>	小千谷市 上越市 南魚沼市 田上町 津南町　 <石川県>	珠洲市 能登町　 <長野県>	中野市 栄村";
    quakeText[4] = "<岩手県> 矢巾町　 <宮城県> 仙台青葉区 石巻市 名取市 岩沼市 登米市 栗原市 大崎市 蔵王町 大河原町 村田町 宮城川崎町 丸森町 松島町 利府町 色麻町 宮城加美町 涌谷町 宮城美里町　 <秋田県>	秋田市 横手市 男鹿市 湯沢市 潟上市 大仙市 北秋田市 にかほ市 仙北市 三種町 井川町 羽後町 東成瀬村　 <山形県>	米沢市 新庄市 上山市 村山市 長井市 尾花沢市 南陽市 山辺町 中山町 河北町 西川町 大江町 最上町 舟形町 真室川町 鮭川村 戸沢村 山形川西町 山形小国町 飯豊町 庄内町 遊佐町　 <福島県>	福島市 いわき市 喜多方市 南相馬市 桑折町 国見町 西会津町 猪苗代町 会津坂下町 湯川村 柳津町 会津美里町 福島広野町 双葉町　 <新潟県> 新潟北区 新潟東区 新潟中央区 新潟江南区 新潟秋葉区 新潟南区 新潟西区 新潟西蒲区 三条市 新発田市 加茂市 十日町市 見附市 燕市 五泉市 阿賀野市 佐渡市 魚沼市 胎内市 聖籠町 弥彦村 出雲崎町 刈羽村 関川村 粟島浦村";
    quakeText[5] = "";
    quakeText[6] = "<新潟県> 長岡市 柏崎市 阿賀町　 <山形県> 酒田市 大蔵村 三川町　 <秋田県> 由利本荘市";
    quakeText[7] = "";
    quakeText[8] = "<山形県> 鶴岡市";
    quakeText[9] = "<新潟県> 村上市";
    quakeText[10] = "";
  }
  if(viewId == 2){
    q_maxShindo = 9+1;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "6.7";
    q_epiName = "胆振地方中東部";
    q_epiId = 35;
    q_depth = "40";
    q_timeYY = "2018";
    q_timeMM = "9";
    q_timeDD = "6";
    q_timeH = "3";
    q_timeM = "08";
    quakeText[1] = "<北海道> 網走市 音威子府村 中頓別町 佐呂間町 滝上町 西興部村 羅臼町　 <岩手県> 陸前高田市 雫石町 西和賀町 大槌町 岩泉町 田野畑村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 名取市 富谷市 蔵王町 村田町 亘理町 山元町 利府町 大郷町 大衡村 色麻町 宮城加美町　 <秋田県> 秋田市 横手市 男鹿市 湯沢市 由利本荘市 にかほ市 仙北市 小坂町 上小阿仁村 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 米沢市 鶴岡市 新庄市 寒河江市 上山市 天童市 山辺町 河北町 最上町 舟形町 大蔵村 鮭川村 三川町 庄内町　 <福島県> 福島市 郡山市 いわき市 須賀川市 相馬市 田村市 天栄村 玉川村 福島広野町 大熊町 浪江町　 <茨城県> 日立市 土浦市 石岡市 笠間市 常陸大宮市 筑西市　 <埼玉県> 春日部市　 <新潟県> 村上市";
    quakeText[2] = "<北海道> 稚内市 紋別市 渡島松前町 福島町 奥尻町 寿都町 泊村 上川地方上川町 下川町 美深町 上川中川町 初山別村 遠別町 天塩町 浜頓別町 宗谷枝幸町 豊富町 利尻富士町 幌延町 美幌町 津別町 斜里町 清里町 小清水町 訓子府町 置戸町 遠軽町 湧別町 雄武町 えりも町 陸別町 厚岸町 浜中町 弟子屈町 中標津町　 <青森県> 弘前市 黒石市 鰺ヶ沢町 深浦町 西目屋村 大鰐町 中泊町 田子町 新郷村　 <岩手県> 大船渡市 花巻市 北上市 遠野市 一関市 釜石市 八幡平市 奥州市 滝沢市 葛巻町 岩手町 紫波町 金ケ崎町 平泉町 住田町 山田町 九戸村 岩手洋野町 一戸町　 <宮城県> 気仙沼市 角田市 岩沼市 登米市 栗原市 東松島市 大崎市 大河原町 宮城川崎町 丸森町 松島町 宮城美里町 南三陸町　 <秋田県> 能代市 大館市 鹿角市 潟上市 大仙市 北秋田市 藤里町 三種町 八峰町 井川町　 <山形県> 酒田市 村山市 中山町 遊佐町　 <福島県> 南相馬市 双葉町";
    quakeText[3] = "<北海道> 札幌南区 北見市 赤平市 士別市 名寄市 根室市 歌志内市 渡島北斗市 知内町 木古内町 八雲町 檜山江差町 厚沢部町 今金町 島牧村 黒松内町 蘭越町 京極町 共和町 岩内町 神恵内村 積丹町 古平町 仁木町 上砂川町 東神楽町 比布町 愛別町 東川町 美瑛町 上富良野町 和寒町 幌加内町 小平町 苫前町 羽幌町 猿払村 興部町 大空町 豊浦町 士幌町 上士幌町 中札内村 更別村 広尾町 豊頃町 本別町 足寄町 釧路町 標茶町 鶴居村 白糠町 別海町 標津町　 <青森県> 青森市 八戸市 五所川原市 十和田市 三沢市 つがる市 平川市 平内町 今別町 蓬田村 外ヶ浜町 藤崎町 田舎館村 板柳町 鶴田町 野辺地町 七戸町 六戸町 横浜町 東北町 六ヶ所村 おいらせ町 風間浦村 佐井村 三戸町 五戸町 青森南部町　 <岩手県> 盛岡市 宮古市 久慈市 二戸市 矢巾町 普代村 軽米町 野田村　 <宮城県> 石巻市 涌谷町";
    quakeText[4] = "<北海道> 札幌中央区 小樽市 旭川市 釧路市 帯広市 夕張市 留萌市 美唄市 芦別市 滝川市 砂川市 深川市 富良野市 当別町 七飯町 鹿部町 渡島森町 長万部町 上ノ国町 乙部町 せたな町 ニセコ町 真狩村 留寿都村 喜茂別町 倶知安町 余市町 赤井川村 奈井江町 月形町 浦臼町 新十津川町 妹背牛町 秩父別町 北竜町 沼田町 鷹栖町 当麻町 中富良野町 南富良野町 占冠村 剣淵町 増毛町 壮瞥町 洞爺湖町 浦河町 音更町 鹿追町 新得町 十勝清水町 芽室町 十勝大樹町 幕別町 十勝池田町 浦幌町　 <青森県> むつ市 大間町 東通村 階上町";
    quakeText[5] = "";
    quakeText[6] = "<北海道> 函館市 室蘭市 岩見沢市 登別市 胆振伊達市 北広島市 石狩市 新篠津村 南幌町 由仁町 栗山町 白老町";
    quakeText[7] = "<北海道> 札幌北区 苫小牧市 江別市 三笠市 恵庭市 長沼町 新冠町 新ひだか町";
    quakeText[8] = "<北海道> 千歳市 日高地方日高町 平取町";
    quakeText[9] = "<北海道> 安平町 むかわ町";
    quakeText[10] = "<北海道> 厚真町";
  }
  if(viewId == 3){
    q_maxShindo = 7+1;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "5.9";
    q_epiName = "大阪府北部";
    q_epiId = 171;
    q_depth = "10";
    q_timeYY = "2018";
    q_timeMM = "6";
    q_timeDD = "18";
    q_timeH = "7";
    q_timeM = "58";
    quakeText[1] = "<茨城県> 筑西市　 <埼玉県> さいたま中央区 さいたま緑区 熊谷市 加須市 春日部市 鴻巣市 志木市 久喜市 富士見市 川島町 宮代町　 <東京都> 東京北区 東京板橋区　 <神奈川県> 川崎川崎区 川崎中原区 川崎宮前区 藤沢市 湯河原町　 <新潟県> 糸魚川市 上越市　 <富山県> 富山市 魚津市 砺波市 上市町 立山町 富山朝日町　 <石川県> 七尾市 珠洲市 羽咋市 穴水町　 <山梨県> 甲州市 山梨南部町 富士河口湖町　 <長野県> 長野市 松本市 上田市 岡谷市 伊那市 塩尻市 佐久市 東御市 安曇野市 軽井沢町 御代田町 立科町 富士見町 原村 辰野町 南箕輪村 中川村 宮田村 阿南町 下條村 売木村 天龍村 大鹿村 木祖村 大桑村 山形村 坂城町　 <岐阜県> 七宗町 白川町 東白川村 白川村　 <静岡県> 静岡葵区 静岡駿河区 沼津市 三島市 富士宮市 島田市 焼津市 御殿場市 伊豆市 御前崎市 河津町 西伊豆町 静岡清水町 長泉町 吉田町 川根本町 静岡森町　 <愛知県> 設楽町 東栄町 豊根村　 <三重県> 南伊勢町　 <和歌山県> 和歌山印南町 すさみ町　 <鳥取県> 岩美町 三朝町 大山町 日南町 鳥取日野町 江府町　 <島根県> 益田市 安来市 江津市 奥出雲町 川本町 島根美郷町 邑南町　 <岡山県> 井原市 高梁市 新見市 新庄村 久米南町 吉備中央町　 <広島県> 広島中区 広島南区 広島西区 広島安佐北区 広島安芸区 広島府中市 広島三次市 庄原市 大竹市 東広島市 廿日市市 海田町 世羅町 神石高原町　 <山口県> 下関市 宇部市 山口市 岩国市 周防大島町 平生町　 <徳島県> 徳島三好市 勝浦町 上勝町 佐那河内村 神山町 つるぎ町 東みよし町　 <愛媛県> 宇和島市 八幡浜市 新居浜市 西条市 四国中央市 東温市 伊方町　 <高知県> 室戸市 南国市 高知香南市 香美市 東洋町 安田町 北川村 馬路村 大豊町 黒潮町　 <福岡県> 中間市　 <佐賀県> 神埼市 白石町";
    quakeText[2] = "<富山県> 高岡市 氷見市 滑川市 小矢部市 南砺市 射水市 舟橋村　 <石川県> 金沢市 小松市 輪島市 かほく市 白山市 能美市 川北町 津幡町 志賀町 宝達志水町 中能登町 能登町　 <福井県> 大野市 勝山市 永平寺町 南越前町 福井美浜町　 <山梨県> 甲府市 南アルプス市 山梨北杜市 中央市 市川三郷町 富士川町 忍野村 山中湖村　 <長野県> 諏訪市 駒ヶ根市 茅野市 長野南牧村 下諏訪町 箕輪町 飯島町 松川町 長野高森町 阿智村 平谷村 根羽村 泰阜村 喬木村 豊丘村 上松町 南木曽町 王滝村 木曽町　 <岐阜県> 高山市 中津川市 恵那市 各務原市 可児市 飛騨市 郡上市 下呂市 坂祝町 富加町 川辺町 八百津町 御嵩町　 <静岡県> 静岡清水区 浜松中区 浜松東区 浜松西区 浜松南区 浜松北区 浜松天竜区 富士市 磐田市 掛川市 藤枝市 湖西市 伊豆の国市 牧之原市　 <愛知県> 名古屋千種区 名古屋東区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋守山区 名古屋緑区 名古屋名東区 名古屋天白区 豊橋市 岡崎市 瀬戸市 春日井市 豊川市 碧南市 犬山市 愛知江南市 小牧市 新城市 知立市 岩倉市 日進市 田原市 北名古屋市 大口町 扶桑町 大治町 東浦町 南知多町 幸田町　 <三重県> 伊勢市 桑名市 熊野市 いなべ市 志摩市 木曽岬町 東員町 菰野町 多気町 三重明和町 大台町 玉城町 三重大紀町 三重御浜町 紀宝町　 <京都府> 綾部市　 <兵庫県> 市川町 佐用町 新温泉町　 <奈良県> 野迫川村 十津川村 下北山村 上北山村　 <和歌山県> 和歌山市 御坊市 紀美野町 九度山町 湯浅町 有田川町 和歌山美浜町 和歌山日高町 由良町 みなべ町 日高川町 白浜町 上富田町 那智勝浦町 太地町 古座川町 北山村 串本町　 <鳥取県> 米子市 倉吉市 境港市 鳥取若桜町 智頭町 八頭町 琴浦町 日吉津村 鳥取南部町 伯耆町　 <島根県> 松江市 浜田市 出雲市 大田市 雲南市 海士町　 <岡山県> 笠岡市 総社市 浅口市 早島町 矢掛町 鏡野町 勝央町 奈義町 西粟倉村 岡山美咲町　 <広島県> 広島安佐南区 呉市 竹原市 三原市 尾道市 福山市 安芸高田市 江田島市 坂町 大崎上島町　 <山口県> 萩市 柳井市　 <徳島県> 阿南市 吉野川市 阿波市 美馬市 石井町 那賀町 牟岐町 美波町 海陽町 北島町 藍住町 板野町 上板町　 <香川県>	坂出市 観音寺市 東かがわ市 三木町 直島町 宇多津町 綾川町 琴平町 多度津町 まんのう町　 <愛媛県> 松山市　 <高知県> 高知市 安芸市 奈半利町 田野町 芸西村";
    quakeText[3] = "<石川県> 加賀市　 <福井県> 福井市 敦賀市 小浜市 鯖江市 あわら市 越前市 福井坂井市 福井池田町 越前町 福井おおい町 福井若狭町　 <長野県> 飯田市　 <岐阜県> 大垣市 多治見市 関市 美濃市 瑞浪市 羽島市 美濃加茂市 土岐市 岐阜山県市 瑞穂市 本巣市 海津市 岐南町 笠松町 垂井町 関ケ原町 神戸町 輪之内町 揖斐川町 大野町 岐阜池田町 北方町　 <静岡県> 袋井市 菊川市　 <愛知県> 名古屋北区 名古屋西区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 一宮市 半田市 愛知津島市 刈谷市 豊田市 安城市 西尾市 蒲郡市 常滑市 稲沢市 東海市 大府市 知多市 尾張旭市 高浜市 豊明市 愛西市 清須市 弥富市 愛知みよし市 あま市 長久手市 東郷町 蟹江町 飛島村 阿久比町 愛知美浜町 武豊町　 <三重県> 津市 松阪市 鈴鹿市 名張市 尾鷲市 亀山市 伊賀市 三重朝日町 川越町 三重紀北町　 <滋賀県> 守山市 高島市 滋賀日野町 愛荘町 豊郷町 甲良町 多賀町　 <京都府> 福知山市 舞鶴市 宮津市 和束町 伊根町 与謝野町　 <大阪府> 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 大阪堺市美原区 貝塚市 泉佐野市 河内長野市 高石市 泉南市 大阪狭山市 阪南市 忠岡町 田尻町 大阪岬町　 <兵庫県> 神戸須磨区 相生市 加古川市 赤穂市 西脇市 高砂市 小野市 加西市 養父市 丹波市 南あわじ市 朝来市 宍粟市 加東市 たつの市 多可町 兵庫稲美町 播磨町 福崎町 兵庫神河町 兵庫太子町 上郡町 兵庫香美町　<奈良県> 五條市 山添村 曽爾村 明日香村 下市町 黒滝村 天川村 奈良川上村 東吉野村　 <和歌山県> 海南市 橋本市 有田市 田辺市 新宮市 紀の川市 岩出市 かつらぎ町 高野町 和歌山広川町　 <鳥取県> 鳥取市 湯梨浜町 北栄町　 <島根県> 隠岐の島町　 <岡山県> 岡山北区 岡山中区 岡山東区 岡山南区 倉敷市 津山市 玉野市 備前市 瀬戸内市 赤磐市 真庭市 美作市 和気町 里庄町　 <広島県> 府中町　 <徳島県> 徳島市 鳴門市 小松島市 松茂町　 <香川県> 高松市 丸亀市 さぬき市 三豊市 土庄町　 <愛媛県> 今治市 上島町";
    quakeText[4] = "<福井県> 高浜町　 <岐阜県> 岐阜市 養老町 安八町　 <愛知県> 名古屋南区　 <三重県> 四日市市　 <滋賀県> 彦根市 長浜市 近江八幡市 草津市 栗東市 甲賀市 野洲市 湖南市 東近江市 米原市 竜王町　 <京都府> 京都北区 京都上京区 京都左京区 京都東山区 京都下京区 京都南区 京都右京区 京都山科区 京丹後市 木津川市 宇治田原町 笠置町 南山城村 京丹波町　 <大阪府> 大阪西区 大阪大正区 大阪天王寺区 大阪浪速区 大阪東成区 大阪城東区 大阪阿倍野区 大阪住吉区 大阪東住吉区 大阪西成区 大阪鶴見区 大阪住之江区 大阪平野区 大阪中央区 大阪堺市堺区 岸和田市 泉大津市 八尾市 富田林市 松原市 大阪和泉市 柏原市 羽曳野市 門真市 藤井寺市 東大阪市 大阪太子町 河南町 千早赤阪村　 <兵庫県> 神戸東灘区 神戸灘区 神戸兵庫区 神戸長田区 神戸垂水区 神戸北区 神戸中央区 神戸西区 姫路市 明石市 洲本市 芦屋市 豊岡市 宝塚市 三木市 三田市 篠山市 淡路市 猪名川町　 <奈良県> 奈良市 大和高田市 天理市 橿原市 桜井市 生駒市 香芝市 葛城市 宇陀市 平群町 三郷町 斑鳩町 安堵町 奈良川西町 田原本町 御杖村 上牧町 王寺町 河合町 吉野町 大淀町　 <香川県> 小豆島町";
    quakeText[5] = "";
    quakeText[6] = "<滋賀県> 大津市　 <京都府> 宇治市 城陽市 向日市 京田辺市 南丹市 井手町 精華町　 <大阪府> 大阪福島区 大阪此花区 大阪港区 大阪西淀川区 大阪生野区 池田市 守口市 大東市 四條畷市 豊能町 能勢町　 <兵庫県> 尼崎市 西宮市 伊丹市 川西市　 <奈良県> 大和郡山市 御所市 高取町 広陵町";
    quakeText[7] = "<京都府> 京都中京区 京都伏見区 京都西京区 亀岡市 長岡京市 八幡市 大山崎町 久御山町　 <大阪府> 大阪都島区 大阪東淀川区 大阪旭区 大阪淀川区 豊中市 吹田市 寝屋川市 摂津市 交野市 島本町";
    quakeText[8] = "<大阪府> 大阪北区 高槻市 枚方市 茨木市 箕面市";
    quakeText[9] = "";
    quakeText[10] = "";
  }
  if(viewId == 4){
    q_maxShindo = 7+1;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "6.6";
    q_epiName = "鳥取県中部";
    q_epiId = 180;
    q_depth = "10";
    q_timeYY = "2016";
    q_timeMM = "10";
    q_timeDD = "21";
    q_timeH = "14";
    q_timeM = "07";
    quakeText[1] = "<茨城県> 茨城鹿嶋市 筑西市 坂東市　 <群馬県> 群馬明和町 邑楽町　 <埼玉県> さいたま西区 さいたま北区 さいたま大宮区 さいたま桜区 さいたま浦和区 さいたま緑区 さいたま岩槻区 川越市 熊谷市 川口市 加須市 草加市 蕨市 戸田市 入間市 志木市 和光市 新座市 久喜市 八潮市 蓮田市 鶴ヶ島市 伊奈町 川島町 宮代町 杉戸町　 <千葉県> 千葉中央区 千葉花見川区 千葉若葉区 木更津市 浦安市 長柄町　 <東京都> 東京千代田区 東京中央区 東京文京区 東京墨田区 東京江東区 東京大田区 東京世田谷区 東京渋谷区 東京中野区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京足立区 東京葛飾区 東京江戸川区 八王子市 東京府中市 昭島市 調布市 小平市 日野市 国分寺市 狛江市 武蔵村山市 多摩市　 <神奈川県> 横浜中区 川崎川崎区 川崎中原区 相模原中央区 茅ヶ崎市 湯河原町　 <富山県> 富山市 高岡市 滑川市 小矢部市 南砺市 射水市 舟橋村　 <石川県> 金沢市 七尾市 珠洲市 羽咋市 かほく市 白山市 津幡町 穴水町 能登町　 <福井県> 勝山市 永平寺町 福井池田町　 <山梨県> 甲斐市 甲州市 富士河口湖町　 <長野県> 松本市 岡谷市 塩尻市 佐久市 長野南牧村 御代田町 下諏訪町 富士見町 原村 辰野町 箕輪町 南箕輪村 中川村 阿南町 阿智村 根羽村 下條村 売木村 天龍村 泰阜村 喬木村 豊丘村 大鹿村 上松町 南木曽町 木祖村 王滝村 大桑村 木曽町　 <岐阜県> 高山市 関市 美濃市 可児市 郡上市 下呂市 坂祝町 富加町 川辺町 七宗町 八百津町 白川町 東白川村 御嵩町　 <静岡県> 静岡葵区 静岡清水区 浜松中区 浜松東区 浜松南区 浜松浜北区 浜松天竜区 沼津市 富士宮市 島田市 焼津市 掛川市 藤枝市 御殿場市 御前崎市 西伊豆町 静岡清水町 小山町 吉田町 川根本町 静岡森町　 <愛知県> 岡崎市 蒲郡市 南知多町 幸田町 設楽町　 <三重県> 伊勢市 松阪市 熊野市 東員町 菰野町 三重紀北町　 <奈良県> 五條市 山添村 平群町 曽爾村 御杖村 明日香村 吉野町 大淀町 天川村 奈良川上村　 <和歌山県> 新宮市 紀美野町 高野町 湯浅町 有田川町 日高川町 白浜町 すさみ町 那智勝浦町 太地町 古座川町　 <山口県> 美祢市　 <愛媛県> 砥部町 松野町 愛南町　 <高知県> 宿毛市 土佐清水市 四万十市 梼原町 高知津野町 四万十町　 <福岡県> 北九州門司区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡西区 飯塚市 田川市 八女市 筑後市 豊前市 筑紫野市 大野城市 福岡古賀市 宮若市 糸島市 宇美町 篠栗町 志免町 須恵町 粕屋町 岡垣町 小竹町 鞍手町 東峰村 大木町 香春町 福岡川崎町 大任町 苅田町 上毛町 築上町　 <佐賀県> 唐津市 多久市 武雄市 嬉野市 吉野ヶ里町 基山町 有田町 大町町　 <長崎県> 佐世保市 島原市 諫早市 松浦市 壱岐市 雲仙市 南島原市 川棚町 佐々町　 <熊本県> 八代市 人吉市 山鹿市 宇土市 益城町 多良木町　 <大分県> 日田市 玖珠町　 <宮崎県> 高千穂町";
    quakeText[2] = "<富山県> 氷見市　 <石川県> 小松市 輪島市 加賀市 中能登町　 <福井県> 福井市 大野市 鯖江市 あわら市 越前市 福井坂井市 南越前町 福井美浜町 福井若狭町　 <山梨県> 甲府市 南アルプス市 山梨北杜市 笛吹市 中央市 昭和町 忍野村 山中湖村　 <長野県> 飯田市 諏訪市 伊那市 駒ヶ根市 茅野市 飯島町 宮田村 松川町 長野高森町 平谷村　 <岐阜県> 岐阜市 大垣市 多治見市 中津川市 瑞浪市 羽島市 恵那市 美濃加茂市 土岐市 各務原市 岐阜山県市 本巣市 岐南町 笠松町 垂井町 関ケ原町 神戸町 安八町 揖斐川町 大野町 岐阜池田町 北方町　 <静岡県> 浜松西区 浜松北区 富士市 磐田市 袋井市 湖西市 菊川市 伊豆の国市 牧之原市　 <愛知県> 名古屋千種区 名古屋東区 名古屋北区 名古屋西区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 名古屋南区 名古屋守山区 名古屋緑区 名古屋名東区 名古屋天白区 豊橋市 一宮市 瀬戸市 半田市 春日井市 豊川市 愛知津島市 碧南市 刈谷市 豊田市 安城市 西尾市 犬山市 常滑市 愛知江南市 小牧市 稲沢市 新城市 東海市 大府市 知多市 知立市 尾張旭市 高浜市 岩倉市 豊明市 日進市 田原市 清須市 北名古屋市 愛知みよし市 あま市 東郷町 豊山町 大口町 扶桑町 大治町 飛島村 阿久比町 東浦町 愛知美浜町 武豊町　 <三重県> 津市 四日市市 桑名市 鈴鹿市 亀山市 いなべ市 伊賀市 木曽岬町 三重朝日町 川越町　 <滋賀県> 守山市 栗東市 甲賀市 東近江市 滋賀日野町 愛荘町 豊郷町 甲良町 多賀町　 <京都府> 京都北区 京都上京区 京都左京区 京都東山区 京都下京区 京都山科区 舞鶴市 綾部市 宇治市 京田辺市 木津川市 笠置町 和束町 精華町 南山城村 京丹波町　 <大阪府> 大阪西区 大阪大正区 大阪天王寺区 大阪生野区 大阪阿倍野区 大阪住吉区 大阪鶴見区 大阪平野区 大阪中央区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 大阪堺市美原区 岸和田市 貝塚市 富田林市 河内長野市 松原市 大阪和泉市 柏原市 羽曳野市 高石市 藤井寺市 泉南市 大阪狭山市 阪南市 豊能町 忠岡町 田尻町 大阪太子町 河南町 千早赤阪村　 <兵庫県> 神戸須磨区 洲本市 西脇市 猪名川町　 <奈良県> 奈良市 大和高田市 大和郡山市 天理市 橿原市 桜井市 御所市 生駒市 香芝市 葛城市 宇陀市 三郷町 斑鳩町 安堵町 奈良川西町 三宅町 田原本町 高取町 上牧町 王寺町 河合町　 <和歌山県> 和歌山市 海南市 橋本市 有田市 御坊市 田辺市 紀の川市 岩出市 かつらぎ町 和歌山広川町 和歌山日高町 由良町 みなべ町 上富田町　 <島根県> 江津市 津和野町 吉賀町 知夫村　 <山口県> 下関市 宇部市 防府市 下松市 光市 長門市 周南市 山陽小野田市 上関町 田布施町 阿武町　 <徳島県> 勝浦町 上勝町 佐那河内村 神山町 那賀町 美波町　 <愛媛県> 宇和島市 八幡浜市 新居浜市 大洲市 伊予市 西予市 東温市 久万高原町 愛媛松前町 内子町　 <高知県> 室戸市 土佐市 須崎市 香美市 東洋町 奈半利町 田野町 安田町 本山町 大豊町 土佐町 大川村 いの町 仁淀川町 中土佐町 佐川町 越知町 黒潮町　 <福岡県> 北九州若松区 北九州戸畑区 北九州小倉北区 福岡中央区 福岡早良区 久留米市 直方市 柳川市 大川市 行橋市 小郡市 宗像市 福津市 うきは市 嘉麻市 朝倉市 みやま市 新宮町 久山町 芦屋町 桂川町 筑前町 大刀洗町 添田町 福智町 みやこ町　 <佐賀県> 佐賀市 鳥栖市 小城市 上峰町 みやき町 江北町　 <長崎県> 平戸市　 <熊本県> 熊本南区 玉名市 菊池市 宇城市 阿蘇市 長洲町　 <大分県> 大分市 別府市 中津市 佐伯市 臼杵市 津久見市 竹田市 豊後高田市 杵築市 宇佐市 豊後大野市 由布市 国東市 日出町";
    quakeText[3] = "<福井県> 敦賀市 小浜市 越前町 高浜町 福井おおい町　 <岐阜県> 瑞穂市 海津市 養老町 輪之内町　 <愛知県> 愛西市 弥富市 蟹江町　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 草津市 野洲市 湖南市 高島市 米原市 竜王町　 <京都府> 京都中京区 京都南区 京都右京区 京都伏見区 京都西京区 福知山市 宮津市 亀岡市 城陽市 向日市 長岡京市 八幡市 京丹後市 南丹市 大山崎町 久御山町 井手町 宇治田原町 伊根町　 <大阪府> 大阪都島区 大阪福島区 大阪此花区 大阪港区 大阪西淀川区 大阪東淀川区 大阪東成区 大阪旭区 大阪城東区 大阪東住吉区 大阪西成区 大阪淀川区 大阪住之江区 大阪北区 大阪堺市堺区 豊中市 池田市 吹田市 泉大津市 高槻市 守口市 枚方市 茨木市 八尾市 泉佐野市 寝屋川市 大東市 箕面市 門真市 摂津市 東大阪市 交野市 島本町 熊取町 大阪岬町　 <兵庫県> 神戸東灘区 神戸灘区 神戸兵庫区 神戸長田区 神戸垂水区 神戸北区 神戸中央区 神戸西区 尼崎市 明石市 西宮市 芦屋市 伊丹市 相生市 加古川市 赤穂市 宝塚市 三木市 高砂市 川西市 小野市 三田市 加西市 篠山市 養父市 丹波市 朝来市 淡路市 宍粟市 加東市 多可町 兵庫稲美町 播磨町 市川町 福崎町 兵庫神河町 兵庫太子町 佐用町 兵庫香美町 新温泉町　 <奈良県> 広陵町　 <和歌山県> 和歌山美浜町 和歌山印南町　 <鳥取県> 岩美町 鳥取若桜町　 <島根県> 浜田市 益田市 雲南市 奥出雲町 飯南町 川本町 島根美郷町 邑南町 西ノ島町　 <岡山県> 岡山中区 岡山東区 井原市 総社市 高梁市 新見市 瀬戸内市 美作市 浅口市 早島町 里庄町 矢掛町 西粟倉村 久米南町 吉備中央町　 <広島県> 広島東区 広島西区 広島安佐南区 広島佐伯区 三原市 福山市 広島府中市 広島三次市 大竹市 東広島市 熊野町 安芸太田町 北広島町 世羅町　 <山口県> 山口市 萩市 周防大島町 和木町 平生町　 <徳島県> 徳島市 鳴門市 小松島市 阿南市 吉野川市 阿波市 美馬市 徳島三好市 石井町 牟岐町 海陽町 松茂町 北島町 藍住町 板野町 上板町 つるぎ町 東みよし町　 <香川県> 丸亀市 坂出市 善通寺市 三木町 直島町 琴平町 多度津町 まんのう町　 <愛媛県> 松山市 西条市 四国中央市 上島町 伊方町　 <高知県> 高知市 安芸市 南国市 高知香南市 芸西村 日高村　 <福岡県> 中間市 水巻町 遠賀町　 <佐賀県> 神埼市 白石町　 <大分県> 姫島村";
    quakeText[4] = "<京都府> 与謝野町　 <大阪府> 四條畷市 能勢町　 <兵庫県> 姫路市 豊岡市 南あわじ市 たつの市 上郡町　 <鳥取県> 米子市 境港市 智頭町 八頭町 大山町 鳥取南部町 伯耆町 日南町 鳥取日野町 江府町　 <島根県> 松江市 出雲市 大田市 安来市 海士町　 <岡山県> 岡山北区 岡山南区 倉敷市 津山市 玉野市 笠岡市 備前市 赤磐市 和気町 新庄村 奈義町 岡山美咲町　 <広島県> 広島中区 広島南区 広島安佐北区 広島安芸区 呉市 竹原市 尾道市 庄原市 廿日市市 安芸高田市 江田島市 府中町 海田町 坂町 大崎上島町 神石高原町　 <山口県> 岩国市 柳井市　 <香川県> 高松市 観音寺市 さぬき市 東かがわ市 三豊市 土庄町 小豆島町 綾川町　 <愛媛県> 今治市";
    quakeText[5] = "";
    quakeText[6] = "<鳥取県> 琴浦町 日吉津村　 <島根県> 隠岐の島町";
    quakeText[7] = "<鳥取県> 鳥取市 三朝町　 <岡山県> 真庭市 鏡野町";
    quakeText[8] = "<鳥取県> 倉吉市 湯梨浜町 北栄町";
    quakeText[9] = "";
    quakeText[10] = "";
  }
  if(viewId == 5){
    q_maxShindo = 9+1;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "7.3";
    q_epiName = "熊本県熊本地方";
    q_epiId = 230;
    q_depth = "10";
    q_timeYY = "2016";
    q_timeMM = "4";
    q_timeDD = "16";
    q_timeH = "1";
    q_timeM = "25";
    quakeText[1] = "<山形県> 中山町　 <茨城県> 土浦市 つくば市 茨城鹿嶋市 潮来市 筑西市 坂東市 稲敷市 鉾田市 東海村 五霞町 境町　 <群馬県> 前橋市 高崎市 伊勢崎市 太田市 館林市 渋川市 富岡市 榛東村 玉村町 板倉町 群馬明和町 千代田町 邑楽町　 <埼玉県> さいたま北区 さいたま大宮区 さいたま見沼区 さいたま桜区 さいたま浦和区 さいたま緑区 さいたま岩槻区 川越市 熊谷市 春日部市 羽生市 鴻巣市 越谷市 蕨市 入間市 朝霞市 和光市 久喜市 三郷市 蓮田市 坂戸市 幸手市 鶴ヶ島市 吉川市 白岡市 伊奈町 鳩山町 宮代町 杉戸町 松伏町　 <千葉県> 千葉中央区 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 市川市 船橋市 木更津市 松戸市 野田市 茂原市 東金市 習志野市 鎌ケ谷市 浦安市 四街道市 多古町 一宮町 睦沢町 長生村 白子町　 <東京都> 東京千代田区 東京江東区 東京大田区 東京世田谷区 東京渋谷区 東京杉並区 東京板橋区 東京葛飾区 小平市 国分寺市 清瀬市　 <神奈川県> 横浜中区 川崎川崎区 川崎幸区 川崎高津区 川崎多摩区 川崎宮前区 川崎麻生区 茅ヶ崎市　 <新潟県> 新潟西蒲区 長岡市 三条市 上越市 刈羽村　 <富山県> 富山市 高岡市 魚津市 滑川市 砺波市 小矢部市 南砺市 射水市 舟橋村 上市町 立山町　 <石川県> 金沢市 かほく市 津幡町 能登町　 <福井県> 大野市 勝山市 鯖江市 越前市 福井美浜町 高浜町 福井若狭町　 <山梨県> 甲斐市　 <長野県> 長野市 松本市 上田市 岡谷市 伊那市 中野市 大町市 茅野市 塩尻市 佐久市 千曲市 東御市 安曇野市 軽井沢町 御代田町 立科町 下諏訪町 富士見町 原村 辰野町 箕輪町 飯島町 南箕輪村 宮田村 松川町 長野高森町 阿南町 阿智村 平谷村 根羽村 下條村 泰阜村 喬木村 豊丘村 木曽町 麻績村 生坂村 山形村 筑北村 長野池田町 松川村 木島平村 飯綱町　 <岐阜県> 中津川市 本巣市 郡上市 笠松町 垂井町 神戸町 揖斐川町 大野町　 <静岡県> 静岡葵区 静岡清水区 浜松中区 浜松東区 浜松北区 沼津市 三島市 富士宮市 島田市 焼津市 掛川市 藤枝市 御殿場市 御前崎市 伊豆の国市 牧之原市 静岡清水町　 長泉町 静岡森町　 <愛知県> 名古屋北区 名古屋西区 名古屋天白区 豊川市 豊田市 西尾市 新城市 尾張旭市 日進市 北名古屋市 南知多町　 <三重県> 松阪市 亀山市 志摩市 伊賀市 木曽岬町 三重紀北町　 <滋賀県> 甲賀市　 <京都府> 京都上京区 京都中京区 福知山市 舞鶴市 宇治市 井手町　 <兵庫県> 篠山市 朝来市 宍粟市 佐用町 新温泉町　 <奈良県> 桜井市 五條市 御所市 宇陀市 斑鳩町 上牧町 王寺町 吉野町 大淀町 下市町 黒滝村 天川村 奈良川上村 東吉野村　 <和歌山県> 御坊市 田辺市 新宮市 白浜町 上富田町 太地町 古座川町 北山村 串本町　 <鳥取県> 岩美町 鳥取若桜町 智頭町 八頭町 鳥取日野町 江府町　 <島根県> 西ノ島町　 <岡山県> 岡山中区 総社市 備前市 和気町 鏡野町 西粟倉村　 <鹿児島県> 南種子町";
    quakeText[2] = "<茨城県> 茨城古河市　 <埼玉県> 加須市　 <東京都> 東京足立区　 <神奈川県> 川崎中原区　 <富山県> 氷見市　 <石川県> 小松市 珠洲市 加賀市 羽咋市　 <福井県> 福井市 敦賀市 あわら市 福井坂井市　 <山梨県> 甲府市 南アルプス市 山梨北杜市 笛吹市 中央市 富士川町 昭和町 忍野村 山中湖村 富士河口湖町　 <長野県> 飯田市 諏訪市　 <岐阜県> 岐阜市 大垣市 羽島市 瑞穂市 海津市 養老町 輪之内町 安八町　 <静岡県> 浜松西区 浜松南区 富士市 磐田市 袋井市 湖西市 菊川市　 <愛知県> 名古屋千種区 名古屋東区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 名古屋南区 名古屋守山区 名古屋緑区 名古屋名東区 豊橋市 一宮市 半田市 愛知津島市 碧南市 刈谷市 安城市 常滑市 稲沢市 東海市 大府市 知多市 知立市 高浜市 豊明市 田原市 愛西市 清須市 弥富市 愛知みよし市 あま市 東郷町 大治町 蟹江町 阿久比町 東浦町 武豊町　 <三重県> 津市 四日市市 鈴鹿市　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 草津市 守山市 栗東市 野洲市 高島市 東近江市 滋賀日野町 竜王町 愛荘町　 <京都府> 京都下京区 京都南区 京都伏見区 亀岡市 城陽市 向日市 長岡京市 八幡市 京丹後市 南丹市 大山崎町 久御山町 精華町 与謝野町　 <大阪府> 大阪都島区 大阪此花区 大阪西区 大阪天王寺区 大阪東淀川区 大阪東成区 大阪旭区 大阪城東区 大阪阿倍野区 大阪東住吉区 大阪西成区 大阪淀川区 大阪鶴見区 大阪住之江区 大阪平野区 大阪北区 大阪中央区 大阪堺市堺区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市美原区 岸和田市 池田市 吹田市 泉大津市 高槻市 貝塚市 守口市 枚方市 茨木市 八尾市 泉佐野市 富田林市 寝屋川市 河内長野市 大阪和泉市 箕面市 柏原市 羽曳野市 門真市 摂津市 高石市 藤井寺市 東大阪市 泉南市 四條畷市 交野市 大阪狭山市 阪南市 忠岡町 熊取町 大阪岬町 大阪太子町　 <兵庫県> 神戸東灘区 神戸兵庫区 神戸長田区 神戸中央区 神戸西区 姫路市 明石市 西宮市 洲本市 芦屋市 伊丹市 相生市 加古川市 赤穂市 宝塚市 三木市 高砂市 川西市 三田市 加東市 たつの市 兵庫稲美町 播磨町 上郡町 兵庫香美町　 <奈良県> 奈良市 大和高田市 大和郡山市 天理市 香芝市 葛城市 安堵町 奈良川西町 三宅町 田原本町 広陵町 河合町　 <和歌山県> 和歌山市 海南市 橋本市 有田市 紀の川市 岩出市 かつらぎ町 九度山町 高野町 湯浅町 和歌山広川町 有田川町 和歌山美浜町 和歌山日高町 和歌山印南町 みなべ町 日高川町　 <鳥取県> 倉吉市 三朝町 日吉津村 鳥取南部町 伯耆町 日南町　 <島根県> 安来市 江津市 雲南市 奥出雲町 飯南町 川本町 島根美郷町 邑南町 知夫村 隠岐の島町　 <岡山県> 岡山北区 岡山東区 津山市 笠岡市 井原市 高梁市 新見市 瀬戸内市 赤磐市 美作市 浅口市 早島町 矢掛町　 <広島県> 広島西区 広島安芸区 福山市 広島府中市 広島三次市 庄原市 安芸高田市 北広島町 世羅町 神石高原町　 <山口県> 光市 和木町 上関町 田布施町　 <徳島県> 鳴門市 美馬市 徳島三好市 勝浦町 上勝町 佐那河内村 神山町 那賀町 牟岐町 美波町 海陽町 つるぎ町 東みよし町　 <香川県>	丸亀市 善通寺市 さぬき市 土庄町 三木町 直島町 宇多津町 綾川町　 <愛媛県> 新居浜市　 <高知県> 室戸市 須崎市 東洋町 安田町 北川村 馬路村 本山町 大豊町 大川村 いの町 仁淀川町 中土佐町 佐川町 四万十町 大月町　 <長崎県>	五島市 新上五島町　 <鹿児島県> 志布志市 三島村 錦江町 南大隅町 屋久島町";
    quakeText[3] = "<愛知県> 飛島村　 <大阪府> 大阪福島区 大阪港区 大阪大正区 大阪西淀川区 大阪生野区 大阪住吉区 大阪堺市北区 豊中市 松原市 大東市 田尻町　 <兵庫県> 尼崎市 豊岡市 南あわじ市 淡路市　 <鳥取県> 鳥取市 米子市 湯梨浜町 琴浦町 北栄町 大山町　 <島根県> 松江市 浜田市 津和野町 吉賀町　 <岡山県> 岡山南区 倉敷市 玉野市 真庭市 里庄町　 <広島県> 広島中区 広島南区 広島安佐南区 広島安佐北区 広島佐伯区 呉市 竹原市 三原市 尾道市 大竹市 東広島市 廿日市市 府中町 海田町 坂町 安芸太田町 大崎上島町　 <山口県> 下松市 岩国市 長門市 美祢市 周南市 平生町 阿武町　 <徳島県> 徳島市 小松島市 阿南市 吉野川市 阿波市 石井町 松茂町 北島町 藍住町 板野町 上板町　 <香川県> 高松市 坂出市 観音寺市 東かがわ市 三豊市 小豆島町 琴平町 多度津町 まんのう町　 <愛媛県> 西条市 大洲市 伊予市 四国中央市 東温市 上島町 久万高原町 愛媛松前町 砥部町 内子町 松野町 愛媛鬼北町 愛南町　 <高知県> 高知市 安芸市 南国市 土佐市 土佐清水市 四万十市 高知香南市 香美市 奈半利町 田野町 芸西村 土佐町 越知町 梼原町 日高村 高知津野町　 <福岡県> 北九州戸畑区 福岡東区 岡垣町 香春町 吉富町　 <佐賀県> 伊万里市 玄海町 有田町 大町町　 <長崎県> 佐世保市宇久島 長崎対馬市 壱岐市 西海市 長与町 波佐見町 小値賀町 佐々町　 <宮崎県> 串間市 三股町 西米良村　 <鹿児島県> 鹿屋市 枕崎市 指宿市 垂水市 日置市 曽於市 南九州市 大崎町 東串良町 肝付町";
    quakeText[4] = "<鳥取県> 境港市　 <島根県> 出雲市 益田市 大田市　 <広島県> 江田島市　 <山口県> 下関市 宇部市 山口市 萩市 防府市 柳井市 山陽小野田市 周防大島町　 <愛媛県> 松山市 今治市 宇和島市 西予市 伊方町　 <高知県> 宿毛市 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州小倉北区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡中央区 福岡西区 福岡城南区 福岡早良区 大牟田市 直方市 飯塚市 田川市 行橋市 豊前市 中間市 筑紫野市 春日市 大野城市 宗像市 太宰府市 福岡古賀市 福津市 うきは市 宮若市 嘉麻市 朝倉市 糸島市 福岡那珂川町 宇美町 篠栗町 志免町 須恵町 新宮町 久山町 粕屋町 芦屋町 水巻町 小竹町 鞍手町 桂川町 東峰村 大刀洗町 添田町 糸田町 福岡川崎町 大任町 赤村 福智町 苅田町 みやこ町 上毛町 築上町　 <佐賀県> 唐津市 鳥栖市 多久市 武雄市 佐賀鹿島市 嬉野市 吉野ヶ里町 基山町 江北町 太良町　 <長崎県> 長崎市 佐世保市 大村市 平戸市 松浦市 時津町 東彼杵町 川棚町　 <熊本県> 錦町 多良木町 湯前町 水上村 相良村 五木村 球磨村 苓北町　 <大分県> 中津市 豊後高田市 杵築市 宇佐市 国東市 姫島村 日出町　 <宮崎県> 宮崎市 都城市 日南市 小林市 日向市 西都市 えびの市 高原町 国富町 綾町 高鍋町 新富町 木城町 川南町 宮崎都農町 門川町 諸塚村 日之影町 五ヶ瀬町　 <鹿児島県> 鹿児島市 阿久根市 鹿児島出水市 薩摩川内市 薩摩川内市甑島 霧島市 いちき串木野市 南さつま市 伊佐市 姶良市 さつま町 湧水町";
    quakeText[5] = "";
    quakeText[6] = "<愛媛県> 八幡浜市　 <福岡県> 福岡南区 八女市 筑後市 小郡市 遠賀町 筑前町 大木町 福岡広川町　 <佐賀県> 小城市 みやき町 白石町　 <長崎県> 島原市 諫早市 雲仙市　 <熊本県> 人吉市 荒尾市 水俣市 南関町 津奈木町 山江村 あさぎり町　 <大分県> 大分市 佐伯市 臼杵市 津久見市 玖珠町　 <宮崎県> 延岡市　 <鹿児島県> 長島町";
    quakeText[7] = "<福岡県> 久留米市 柳川市 大川市 みやま市　 <佐賀県> 佐賀市 神埼市 上峰町　 <長崎県> 南島原市　 <熊本県> 山鹿市 玉東町 長洲町 南小国町 熊本小国町 産山村 熊本高森町 甲佐町 芦北町　 <大分県> 日田市 竹田市 豊後大野市 九重町　 <宮崎県> 椎葉村 宮崎美郷町 高千穂町";
    quakeText[8] = "<熊本県> 熊本南区 熊本北区 八代市 玉名市 上天草市 阿蘇市 天草市 熊本美里町 和水町 菊陽町 御船町 山都町 氷川町　 <大分県> 別府市 由布市";
    quakeText[9] = "<熊本県> 熊本中央区 熊本東区 熊本西区 菊池市 宇土市 宇城市 合志市 大津町 南阿蘇村 嘉島町";
    quakeText[10] = "<熊本県> 西原村 益城町";
  }
  if(viewId == 6){
    q_maxShindo = 9+1;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "6.4";
    q_epiName = "熊本県熊本地方";
    q_epiId = 230;
    q_depth = "10";
    q_timeYY = "2016";
    q_timeMM = "4";
    q_timeDD = "14";
    q_timeH = "21";
    q_timeM = "26";
    quakeText[1] = "<長野県> 諏訪市　 <岐阜県> 海津市　 <大阪府> 岸和田市 泉佐野市 大東市　 <兵庫県> 豊岡市　 <和歌山県> 紀の川市 和歌山美浜町　 <鳥取県> 琴浦町 北栄町 日吉津村 大山町　 <島根県> 松江市 安来市 江津市 雲南市 川本町 島根美郷町 邑南町 津和野町　 <岡山県> 岡山南区 倉敷市 笠岡市 瀬戸内市 赤磐市 浅口市 早島町 里庄町 矢掛町　 <広島県> 広島西区 広島安佐南区 広島安佐北区 広島安芸区 広島佐伯区 三原市 福山市 広島三次市 安芸高田市 海田町 熊野町 安芸太田町 北広島町　 <山口県> 下松市 光市 和木町 上関町 田布施町　 <徳島県> 吉野川市 美馬市 徳島三好市　 <香川県> 高松市 丸亀市 東かがわ市 土庄町 小豆島町 多度津町　 <愛媛県> 西条市 四国中央市 久万高原町 砥部町 内子町　 <高知県> 室戸市 南国市 須崎市 高知香南市 香美市 奈半利町 田野町 芸西村 いの町 仁淀川町 中土佐町 佐川町 越知町 梼原町 高知津野町 四万十町 大月町　 <鹿児島県> 錦江町  屋久島町";
    quakeText[2] = "<鳥取県> 鳥取市 米子市 境港市 湯梨浜町　 <島根県> 浜田市 出雲市 益田市 大田市 吉賀町　 <岡山県> 玉野市 真庭市　 <広島県> 広島中区 広島南区 呉市 竹原市 尾道市 大竹市 東広島市 廿日市市 江田島市 府中町 坂町 大崎上島町　 <山口県> 萩市 岩国市 長門市 美祢市 周南市 周防大島町 平生町 阿武町　 <徳島県> 徳島市 北島町　 <香川県> 坂出市 観音寺市 三豊市　 <愛媛県> 松山市 大洲市 伊予市 東温市 上島町 愛媛松前町 松野町 愛媛鬼北町 愛南町　 <高知県> 高知市 安芸市 土佐清水市 四万十市 日高村　 <福岡県> 岡垣町 香春町 吉富町　 <佐賀県> 玄海町 有田町　 <長崎県> 佐世保市宇久島 長崎対馬市 壱岐市 五島市 長与町 波佐見町 小値賀町 新上五島町　 <大分県> 別府市 豊後高田市 杵築市 国東市 日出町　 <宮崎県> 日南市 串間市　 <鹿児島県> 鹿屋市 枕崎市 指宿市 垂水市 日置市 志布志市 南九州市 東串良町 南大隅町";
    quakeText[3] = "<山口県> 宇部市 山口市 防府市 柳井市 山陽小野田市　 <愛媛県> 今治市 宇和島市 八幡浜市 西予市 伊方町　 <高知県> 宿毛市 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州戸畑区 北九州小倉北区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡東区 福岡中央区 福岡南区 福岡西区 福岡城南区 福岡早良区 直方市 飯塚市 田川市 行橋市 豊前市 中間市 筑紫野市 春日市 太宰府市 福津市 うきは市 宮若市 嘉麻市 糸島市 福岡那珂川町 宇美町 篠栗町 志免町 須恵町 久山町 芦屋町 水巻町 遠賀町 小竹町 鞍手町 桂川町 東峰村 大刀洗町 添田町 糸田町 大任町 赤村 福智町 苅田町 上毛町 築上町　 <佐賀県> 鳥栖市 多久市 伊万里市 武雄市 佐賀鹿島市 基山町 大町町 太良町　 <長崎県> 長崎市 佐世保市 大村市 平戸市 松浦市 西海市 時津町 東彼杵町 川棚町 佐々町　 <熊本県> 南小国町 熊本小国町 錦町 湯前町 水上村 相良村 五木村 球磨村　 <大分県> 大分市 中津市 宇佐市 由布市 姫島村 玖珠町　 <宮崎県> 宮崎市 都城市 日向市 えびの市 三股町 高原町 国富町 綾町 高鍋町 新富町 西米良村 木城町 宮崎都農町 門川町 諸塚村 宮崎美郷町 五ヶ瀬町　 <鹿児島県> 鹿児島市 鹿児島出水市 薩摩川内市甑島 曽於市 いちき串木野市 南さつま市 姶良市 大崎町 肝付町";
    quakeText[4] = "<山口県> 下関市　 <福岡県> 福岡博多区 大牟田市 久留米市 柳川市 八女市 筑後市 大川市 小郡市 大野城市 宗像市 福岡古賀市 朝倉市 みやま市 新宮町 粕屋町 筑前町 大木町 福岡広川町 みやこ町　 <佐賀県> 佐賀市 唐津市 小城市 嬉野市 神埼市 吉野ヶ里町 上峰町 みやき町 江北町 白石町　 <長崎県> 島原市 諫早市 雲仙市 南島原市　 <熊本県> 人吉市 荒尾市 水俣市 山鹿市 玉東町 南関町 産山村 芦北町 津奈木町 多良木町 山江村 あさぎり町 苓北町　 <大分県> 日田市 佐伯市 臼杵市 津久見市 竹田市 豊後大野市 九重町　 <宮崎県> 延岡市 小林市 西都市 川南町 高千穂町 日之影町　 <鹿児島県> 阿久根市 薩摩川内市 霧島市 伊佐市 さつま町 長島町 湧水町";
    quakeText[5] = "";
    quakeText[6] = "<熊本県> 八代市 上天草市 阿蘇市 天草市 長洲町 和水町 熊本高森町 南阿蘇村 甲佐町　 <宮崎県> 椎葉村";
    quakeText[7] = "<熊本県> 熊本中央区 熊本北区 菊池市 宇土市 合志市 熊本美里町 大津町 菊陽町 御船町 山都町 氷川町";
    quakeText[8] = "<熊本県> 熊本東区 熊本西区 熊本南区 玉名市 宇城市 西原村";
    quakeText[9] = "";
    quakeText[10] = "<熊本県> 益城町";
  }
  if(viewId == 7){
    q_maxShindo = 6+1;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "8.5";
    q_epiName = "小笠原諸島西方沖";
    q_epiId = 286;
    q_depth = "590";
    q_timeYY = "2015";
    q_timeMM = "5";
    q_timeDD = "30";
    q_timeH = "20";
    q_timeM = "24";
    quakeText[1] = "<北海道> 札幌中央区 札幌白石区 札幌豊平区 札幌南区 札幌西区 札幌厚別区 札幌清田区 小樽市 釧路市 帯広市 苫小牧市 千歳市 恵庭市 胆振伊達市 当別町 福島町 七飯町 渡島森町 檜山江差町 厚沢部町 岩内町 余市町 斜里町 興部町 厚真町 安平町 浦河町 様似町 新ひだか町 士幌町 厚岸町 標茶町 白糠町 別海町 標津町 羅臼町　 <青森県> 弘前市 黒石市 五所川原市 十和田市 三沢市 つがる市 平川市 今別町 蓬田村 外ヶ浜町 深浦町 西目屋村 藤崎町 田舎館村 板柳町 鶴田町 中泊町 野辺地町 横浜町 六ヶ所村 東通村 風間浦村 佐井村 五戸町 田子町 青森南部町 新郷村　 <岩手県> 宮古市 大船渡市 遠野市 釜石市 雫石町 西和賀町 住田町 山田町　 <宮城県> 気仙沼市 多賀城市 柴田町 七ヶ浜町 女川町　 <秋田県> 能代市 大館市 男鹿市 北秋田市 仙北市 上小阿仁村 藤里町 八峰町 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 山形市 山形金山町 真室川町 大蔵村 鮭川村　 <群馬県> 長野原町　 <新潟県> 津南町 関川村 粟島浦村　 <富山県> 高岡市 魚津市 小矢部市 南砺市 舟橋村 上市町 立山町 入善町 富山朝日町　 <石川県> 小松市 加賀市 かほく市 津幡町 穴水町 能登町　 <福井県> 敦賀市 小浜市 鯖江市 あわら市 越前市 永平寺町 越前町 福井美浜町 高浜町 福井おおい町 福井若狭町　 <山梨県> 山梨南部町　 <長野県> 須坂市 駒ヶ根市 青木村 中川村 宮田村 松川町 阿南町 阿智村 平谷村 根羽村 下條村 売木村 天龍村 泰阜村 喬木村 豊丘村 上松町 南木曽町 木祖村 麻績村 生坂村 朝日村 筑北村 長野池田町 松川村 白馬村 小布施町 長野高山村 山ノ内町 野沢温泉村 栄村　 <岐阜県> 岐阜市 大垣市 瑞浪市 羽島市 恵那市 瑞穂市 郡上市 笠松町 大野町　 <静岡県> 静岡葵区 浜松中区 浜松東区 浜松西区 浜松北区 浜松浜北区 浜松天竜区 島田市 掛川市 藤枝市 湖西市 御前崎市 南伊豆町 吉田町 静岡森町　 <愛知県> 名古屋中区 名古屋緑区 豊橋市 一宮市 半田市 春日井市 豊川市 刈谷市 安城市 西尾市 常滑市 新城市 東海市 大府市 知立市 尾張旭市 高浜市 豊明市 日進市 北名古屋市 東郷町 大治町 阿久比町 東浦町 南知多町 武豊町　 <三重県> 四日市市 鈴鹿市 伊賀市　 <滋賀県> 甲賀市 野洲市 東近江市　 <京都府> 京都上京区 京都中京区 京都下京区 福知山市 舞鶴市 宇治市 宮津市 亀岡市 南丹市 木津川市 井手町 宇治田原町 精華町 与謝野町　 <大阪府> 大阪都島区 大阪福島区 大阪浪速区 大阪東淀川区 大阪生野区 大阪旭区 大阪阿倍野区 大阪東住吉区 大阪西成区 大阪北区 大阪中央区 大阪堺市美原区 池田市 吹田市 泉大津市 貝塚市 八尾市 富田林市 松原市 大阪和泉市 柏原市 羽曳野市 藤井寺市 東大阪市 四條畷市 大阪狭山市 島本町 田尻町 大阪太子町　 <兵庫県> 神戸中央区 加古川市 三木市 丹波市 南あわじ市 朝来市 淡路市 兵庫香美町　 <奈良県> 大和高田市 大和郡山市 天理市 安堵町 奈良川西町 三宅町 田原本町 広陵町 河合町　 <和歌山県> 御坊市 紀の川市 みなべ町 白浜町 那智勝浦町　 <鳥取県>	米子市 倉吉市 鳥取若桜町 智頭町 八頭町 琴浦町　北栄町 大山町 日南町　 <島根県> 松江市 雲南市 島根美郷町 吉賀町 海士町 隠岐の島町　 <岡山県> 岡山東区 岡山南区 倉敷市 津山市 玉野市 新見市 赤磐市 浅口市 里庄町 矢掛町 鏡野町 勝央町　 <広島県>	広島中区 広島南区 広島西区 広島安佐南区 広島安佐北区 竹原市 三原市 尾道市 広島三次市 大竹市 東広島市 安芸高田市 坂町 北広島町 大崎上島町　 <山口県>	宇部市 防府市 岩国市 長門市 山陽小野田市 周防大島町 和木町 平生町 阿武町　 <徳島県> 徳島市 阿南市 吉野川市 美馬市 徳島三好市 つるぎ町　 <香川県>	高松市 観音寺市 東かがわ市 土庄町 小豆島町 多度津町　 <愛媛県> 宇和島市 伊予市　 <高知県> 高知市 室戸市 安芸市 南国市 香美市 奈半利町 大豊町 大川村 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州戸畑区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡西区 福岡早良区 大牟田市 久留米市 直方市 飯塚市 田川市 八女市 筑後市 行橋市 豊前市 宗像市 うきは市 宮若市 嘉麻市 朝倉市 新宮町 小竹町 鞍手町 筑前町 大刀洗町 大木町 香春町 添田町 大任町 福智町　 <佐賀県> 唐津市 多久市 武雄市 嬉野市 吉野ヶ里町 みやき町 大町町　 <長崎県> 長崎市 佐世保市 島原市 諫早市 平戸市 松浦市 壱岐市 五島市 雲仙市 川棚町 波佐見町　 <熊本県> 熊本西区 人吉市 水俣市 玉名市 山鹿市 上天草市 産山村 南阿蘇村　 <大分県> 別府市 佐伯市 杵築市 国東市 姫島村　 <宮崎県> 宮崎市 日南市 小林市 新富町 椎葉村 高千穂町　 <鹿児島県> 鹿児島市 鹿屋市 阿久根市 指宿市 薩摩川内市 薩摩川内市甑島 霧島市 いちき串木野市 奄美市 姶良市 鹿児島十島村 さつま町 錦江町 喜界町　<沖縄県> 那覇市 石垣市 名護市 うるま市 宮古島市 南城市 渡嘉敷村 粟国村 渡名喜村 久米島町";
    quakeText[2] = "<北海道> 札幌北区 札幌東区 札幌手稲区 函館市 石狩市 新篠津村 上ノ国町 ニセコ町 倶知安町 赤井川村 白老町 釧路町　 <青森県> 青森市 八戸市 むつ市 平内町 七戸町 六戸町 東北町 おいらせ町 大間町 階上町　 <岩手県> 盛岡市 花巻市 北上市 久慈市 一関市 八幡平市 奥州市 矢巾町 金ケ崎町 平泉町 普代村 野田村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 塩竈市 白石市 名取市 栗原市 東松島市 七ヶ宿町 村田町 亘理町 山元町 利府町 大和町 大郷町 富谷町 大衡村 色麻町 宮城加美町 南三陸町　 <秋田県> 秋田市 横手市 湯沢市 由利本荘市 潟上市 大仙市 にかほ市 三種町 井川町　 <山形県> 米沢市 鶴岡市 酒田市 新庄市 寒河江市 上山市 村山市 天童市 東根市 尾花沢市 南陽市 山辺町 河北町 西川町 山形朝日町 大江町 大石田町 最上町 舟形町 高畠町 山形川西町 山形小国町 白鷹町 飯豊町 三川町 庄内町 遊佐町　 <福島県> 会津若松市 喜多方市　二本松市 本宮市 川俣町 大玉村 天栄村 下郷町 只見町 南会津町 北塩原村 西会津町 磐梯町 柳津町 福島金山町 福島昭和村 棚倉町 矢祭町 塙町 鮫川村 石川町 平田村 三春町 小野町 福島広野町 富岡町 川内村 葛尾村 飯舘村　 <茨城県> 大洗町 大子町　 <栃木県> 那須烏山市　 <群馬県> 榛東村 群馬上野村 神流町 下仁田町 群馬南牧村 中之条町 嬬恋村 草津町 群馬高山村 東吾妻町 川場村 群馬昭和村 みなかみ町　 <埼玉県> 越生町 小川町 横瀬町 皆野町 長瀞町 東秩父村 寄居町　 <東京都> 青梅市 日の出町 檜原村 奥多摩町 神津島村　 <神奈川県> 葉山町 山北町 箱根町 愛川町　 <新潟県> 新潟北区 新潟東区 新潟中央区 新潟江南区 新潟秋葉区 新潟南区 新潟西区 新潟西蒲区 長岡市 柏崎市 新発田市 小千谷市 十日町市 村上市 燕市 糸魚川市 妙高市 五泉市 上越市 阿賀野市 佐渡市 魚沼市 胎内市 聖籠町 弥彦村 田上町 阿賀町 出雲崎町 湯沢町　 <富山県> 富山市 氷見市 滑川市 射水市　 <石川県> 金沢市 七尾市 輪島市 珠洲市 羽咋市 志賀町 中能登町　 <福井県> 福井坂井市　 <山梨県> 都留市 山梨市 大月市 韮崎市 南アルプス市 甲斐市 上野原市 市川三郷町 身延町 富士川町 昭和町 道志村 西桂町 鳴沢村 小菅村 丹波山村　 <長野県> 長野市 松本市 岡谷市 飯田市 伊那市 中野市 大町市 飯山市 茅野市 塩尻市 千曲市 東御市 安曇野市 小海町 長野川上村 南相木村 北相木村 佐久穂町 長和町 下諏訪町 富士見町 原村 辰野町 箕輪町 飯島町 南箕輪村 長野高森町 木曽町 山形村 小谷村 坂城町 木島平村 信濃町 小川村 飯綱町　 <岐阜県> 中津川市 下呂市 海津市 輪之内町 安八町　 <静岡県> 静岡清水区 浜松南区 熱海市 富士宮市 伊東市 磐田市 焼津市 袋井市 下田市 裾野市 菊川市 牧之原市 東伊豆町 河津町 松崎町 西伊豆町 函南　 長泉町 小山町　 <愛知県> 名古屋千種区 名古屋中川区 名古屋港区 愛知津島市 稲沢市 田原市 愛西市 清須市 弥富市 愛知みよし市 あま市 蟹江町 飛島村　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 高島市 米原市　 <京都府> 京都伏見区 城陽市 向日市 長岡京市 八幡市 京丹後市 大山崎町 久御山町　 <大阪府>	大阪此花区 大阪西区 大阪港区 大阪大正区 大阪天王寺区 大阪西淀川区 大阪東成区 大阪城東区 大阪住吉区 大阪淀川区 大阪鶴見区 大阪住之江区 大阪平野区 大阪堺市堺区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 岸和田市 豊中市 高槻市 守口市 枚方市 茨木市 泉佐野市 寝屋川市 大東市 箕面市 門真市 摂津市 高石市 交野市 忠岡町　 <兵庫県> 西宮市 豊岡市　 <奈良県> 奈良市　 <鳥取県> 鳥取市 境港市 湯梨浜町　 <島根県> 浜田市 出雲市 益田市 大田市　 <岡山県> 真庭市　 <広島県> 呉市 江田島市 府中町　 <山口県> 下関市 山口市 萩市 柳井市　 <愛媛県> 今治市 八幡浜市 伊方町　 <福岡県> 大川市 中間市 みやま市 水巻町 遠賀町　 <佐賀県> 佐賀市 小城市 神埼市 上峰町 江北町 白石町　 <長崎県> 南島原市　 <熊本県> 八代市 宇城市 阿蘇市 天草市 熊本美里町 長洲町 芦北町 津奈木町　 <大分県>	大分市 臼杵市 竹田市 豊後大野市 由布市　 <鹿児島県> 南さつま市 伊佐市 長島町　 <沖縄県> 座間味村";
    quakeText[3] = "<宮城県> 石巻市 角田市 岩沼市 登米市 大崎市 蔵王町 大河原町 宮城川崎町 丸森町 松島町 涌谷町 宮城美里町　 <山形県> 中山町　 <福島県> 福島市 郡山市 いわき市 白河市 須賀川市 相馬市 田村市 南相馬市 福島伊達市 桑折町 国見町 鏡石町 猪苗代町 会津坂下町 湯川村 会津美里町 西郷村 泉崎村 中島村 矢吹町 玉川村 浅川町 古殿町 楢葉町 大熊町 浪江町 新地町　 <茨城県> 水戸市 日立市 土浦市 結城市 龍ケ崎市 下妻市 高萩市 北茨城市 牛久市 つくば市 ひたちなか市 茨城鹿嶋市 潮来市 守谷市 常陸大宮市 那珂市 かすみがうら市 桜川市 神栖市 行方市 鉾田市 小美玉市 城里町 東海村 美浦村 阿見町 八千代町 五霞町 利根町　 <栃木県> 宇都宮市 足利市 鹿沼市 日光市 小山市 真岡市 大田原市 矢板市 那須塩原市 栃木さくら市 下野市 上三川町 益子町 茂木町 市貝町 芳賀町 壬生町 塩谷町 那須町 栃木那珂川町　 <群馬県> 前橋市 高崎市 桐生市 伊勢崎市 太田市 沼田市 渋川市 藤岡市 富岡市 安中市 みどり市 吉岡町 甘楽町 片品村 玉村町 板倉町 千代田町　 <埼玉県> さいたま西区 さいたま北区 さいたま浦和区 さいたま岩槻区 川越市 秩父市 所沢市 飯能市 本庄市 東松山市 狭山市 羽生市 深谷市 上尾市 越谷市 入間市 朝霞市 和光市 新座市 桶川市 北本市 坂戸市 日高市 ふじみ野市 毛呂山町 滑川町 嵐山町 鳩山町 ときがわ町 小鹿野町 埼玉美里町 埼玉神川町 上里町　 <千葉県> 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 銚子市 松戸市 茂原市 成田市 千葉佐倉市 東金市 旭市 習志野市 勝浦市 八千代市 我孫子市 鎌ケ谷市 富津市 四街道市 袖ケ浦市 八街市 印西市 白井市 富里市 匝瑳市 香取市 山武市 大網白里市 酒々井町 栄町 神崎町 多古町 東庄町 九十九里町 芝山町 横芝光町 一宮町 睦沢町 長南町 大多喜町 御宿町　 <東京都> 東京新宿区 東京台東区 東京目黒区 東京世田谷区 東京中野区 東京杉並区 八王子市 立川市 武蔵野市 三鷹市 東京府中市 昭島市 調布市 町田市 小金井市 小平市 日野市 東村山市 国分寺市 国立市 福生市 狛江市 東大和市 清瀬市 東久留米市 武蔵村山市 多摩市 稲城市 羽村市 あきる野市 西東京市 瑞穂町 伊豆大島町 東京利島村 新島村 三宅村 御蔵島村 八丈町　 <神奈川県> 横浜鶴見区 横浜神奈川区 横浜南区 横浜磯子区 横浜金沢区 横浜港南区 横浜旭区 横浜緑区 横浜瀬谷区 横浜栄区 横浜青葉区 横浜都筑区 川崎中原区 川崎高津区 川崎多摩区 川崎宮前区 川崎麻生区 相模原緑区 相模原中央区 相模原南区 横須賀市 鎌倉市 逗子市 三浦市 秦野市 大和市 伊勢原市 座間市 南足柄市 大磯町 中井町 松田町 開成町 真鶴町 湯河原町 清川村　 <新潟県> 三条市 加茂市 見附市 南魚沼市 刈羽村　 <福井県> 福井市　 <山梨県> 甲府市 富士吉田市 山梨北杜市 笛吹市 甲州市 中央市 山中湖村 富士河口湖町　 <長野県> 上田市 諏訪市 小諸市 長野南牧村 軽井沢町 御代田町 立科町　 <静岡県> 沼津市 三島市 富士市 御殿場市 伊豆市 静岡清水町　 <福岡県> 柳川市";
    quakeText[4] = "<茨城県> 茨城古河市 石岡市 常総市 常陸太田市 笠間市 取手市 筑西市 坂東市 稲敷市 つくばみらい市 茨城町 河内町 境町　 <栃木県> 栃木市 佐野市 野木町 高根沢町　 <群馬県> 館林市 群馬明和町 大泉町 邑楽町　 <埼玉県> さいたま大宮区 さいたま見沼区 さいたま中央区 さいたま桜区 さいたま南区 さいたま緑区 熊谷市 川口市 行田市 加須市 草加市 蕨市 戸田市 志木市 久喜市 八潮市 富士見市 三郷市 蓮田市 幸手市 鶴ヶ島市 吉川市 白岡市 伊奈町 埼玉三芳町 川島町 吉見町 杉戸町 松伏町　 <千葉県> 千葉中央区 千葉美浜区 市川市 船橋市 館山市 木更津市 野田市 柏市 市原市 流山市 鴨川市 君津市 浦安市 南房総市 いすみ市 長生村 白子町 長柄町 鋸南町　 <東京都> 東京千代田区 東京中央区 東京港区 東京文京区 東京墨田区 東京江東区 東京品川区 東京大田区 東京渋谷区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京練馬区 東京足立区 東京葛飾区 東京江戸川区 青ヶ島村　 <神奈川県> 横浜西区 横浜中区 横浜保土ケ谷区 横浜港北区 横浜戸塚区 横浜泉区 川崎川崎区 平塚市 藤沢市 小田原市 茅ヶ崎市 厚木市 海老名市 綾瀬市 寒川町 神奈川大井町　 <山梨県> 忍野村　 <長野県> 佐久市　 <静岡県> 伊豆の国市";
    quakeText[5] = "";
    quakeText[6] = "<埼玉県> 春日部市 鴻巣市 宮代町";
    quakeText[7] = "<東京都> 小笠原村　 <神奈川県> 二宮町";
    quakeText[8] = "";
    quakeText[9] = "";
    quakeText[10] = "";
  }
  if(viewId == 8){
    q_maxShindo = 3;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "8.2";
    q_epiName = "サハリン近海";
    q_epiId = 301;
    q_depth = "590";
    q_timeYY = "2013";
    q_timeMM = "5";
    q_timeDD = "24";
    q_timeH = "5";
    q_timeM = "45";
    quakeText[1] = "<北海道> 札幌中央区 札幌北区 札幌東区 札幌白石区 札幌西区 札幌厚別区 札幌手稲区 札幌清田区 小樽市 帯広市 苫小牧市 江別市 千歳市 胆振伊達市 石狩市 当別町 檜山江差町 乙部町 倶知安町 岩内町 赤井川村 長沼町 美深町 上川中川町 遠別町 中頓別町 礼文町 斜里町 白老町 厚真町 安平町 浦河町 様似町 新ひだか町 十勝清水町 十勝大樹町 広尾町 本別町 厚岸町 弟子屈町　 <青森県> 弘前市 黒石市 平内町 鰺ヶ沢町 深浦町 西目屋村 六ヶ所村 風間浦村 三戸町 田子町 青森南部町 新郷村　 <岩手県> 北上市 遠野市 一関市 二戸市 雫石町 西和賀町 普代村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 白石市 名取市 角田市 東松島市 蔵王町 宮城川崎町 亘理町 山元町 七ヶ浜町 大郷町 富谷町 大衡村 色麻町 宮城加美町　 <秋田県> 男鹿市 湯沢市 鹿角市 潟上市 北秋田市 仙北市 小坂町 上小阿仁村 藤里町 八峰町 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 米沢市 新庄市 寒河江市 上山市 天童市 尾花沢市 南陽市 山辺町 西川町 大江町 大石田町 山形金山町 舟形町 真室川町 大蔵村 鮭川村 戸沢村 高畠町 山形川西町 山形小国町　 <福島県> 福島市 郡山市 西会津町 猪苗代町 浪江町　 <茨城県> 筑西市　 <埼玉県> さいたま岩槻区 加須市 春日部市 戸田市 久喜市 宮代町　 <東京都> 東京大田区 東京足立区 町田市 青ヶ島村　 <神奈川県> 横浜中区 湯河原町　 <新潟県> 新潟東区 新潟中央区 新潟秋葉区 新潟西区 新潟西蒲区 長岡市 三条市 新発田市 加茂市 見附市 五泉市 上越市 阿賀野市 佐渡市 南魚沼市 胎内市 阿賀町 刈羽村　 <石川県> 輪島市 珠洲市 穴水町 能登町　 <長野県> 諏訪市 長野南牧村 御代田町　 <岐阜県> 中津川市　 <静岡県> 静岡清水区 沼津市 富士市 御殿場市 伊豆市 伊豆の国市 静岡清水町　 <滋賀県> 近江八幡市　 <兵庫県> 豊岡市　 <鳥取県> 鳥取市　 <島根県> 出雲市　 <広島県> 呉市 東広島市 江田島市 府中市　 <徳島県> 吉野川市 石井町　 <佐賀県> 佐賀市 神崎市 みやき町 白石町　 <大分県> 大分市 佐伯市　 <鹿児島県> 錦江町";
    quakeText[2] = "<北海道> 函館市 釧路市 岩見沢市 稚内市 根室市 渡島北斗市 新篠津村 上ノ国町 天塩町 浜頓別町 豊富町 利尻富士町 幌延町 新冠町 浦幌町 釧路町 浜中町 標茶町 白糠町 別海町 標津町　 <青森県> 青森市 八戸市 五所川原市 十和田市 三沢市 むつ市 つがる市 平川市 今別町 蓬田村 外ヶ浜町 藤崎町 田舎館村 板柳町 青森鶴田町 中泊町 野辺地町 七戸町 六戸町 横浜町 東北町 おいらせ町 大間町 東通村 五戸町 階上町　 <岩手県> 盛岡市 花巻市 久慈市 八幡平市 奥州市 矢巾町 金ケ崎町 野田村　 <宮城県> 石巻市 岩沼市 登米市 栗原市 大崎市 大河原町 丸森町 松島町 利府町 涌谷町 宮城美里町　 <秋田県> 能代市 横手市 大館市 由利本荘市 大仙市 にかほ市 三種町 井川町　 <山形県> 鶴岡市 酒田市 村山市 中山町 河北町 最上町 白鷹町 三川町 庄内町 遊佐町　 <福島県> 会津坂下町　 <新潟県> 村上市";
    quakeText[3] = "<北海道> 猿払村　 <秋田県> 秋田市";
    quakeText[4] = "";
    quakeText[5] = "";
    quakeText[6] = "";
    quakeText[7] = "";
    quakeText[8] = "";
    quakeText[9] = "";
    quakeText[10] = "";
  }
  if(viewId == 9){
    q_maxShindo = 9+1;
    q_currentShindo = q_maxShindo;
    q_msiText = shindoListJP[q_maxShindo];
    q_magnitude = "--";
    q_epiName = "-------------";
    q_epiId = 343;
    q_depth = "--";
    q_timeYY = "2011";
    q_timeMM = "3";
    q_timeDD = "11";
    q_timeH = "14";
    q_timeM = "46";
    quakeText[1] = "<東京都> 小笠原　 <兵庫県> 兵庫県南西部　 <島根県> 島根県隠岐　 <広島県> 広島県北部 広島県南東部 広島県南西部　 <山口県> 山口県西部 山口県中部　 <徳島県> 徳島県南部　 <香川県> 香川県東部 香川県西部　 <愛媛県> 愛媛県東予 愛媛県中予 愛媛県南予　 <高知県> 高知県中部 高知県西部　 <福岡県> 福岡県福岡 福岡県北九州 福岡県筑豊 福岡県筑後　 <長崎県> 長崎県島原半島 長崎県壱岐　 <熊本県> 熊本県熊本 熊本県球磨　 <大分県> 大分県中部　 <鹿児島県> 鹿児島県薩摩";
    quakeText[2] = "<北海道> 後志地方西部 留萌地方中北部 宗谷地方南部 北海道利尻礼文　 <三重県> 三重県南部　 <京都府> 京都府北部　 <兵庫県> 兵庫県淡路島　 <和歌山県> 和歌山県北部 和歌山県南部　 <鳥取県> 鳥取県東部 鳥取県中部 鳥取県西部　 <島根県> 島根県東部 島根県西部　 <岡山県> 岡山県北部 岡山県南部　 <徳島県> 徳島県北部　 <高知県> 高知県東部　 <佐賀県> 佐賀県南部　 <熊本県> 熊本県阿蘇";
    quakeText[3] = "<北海道> 石狩地方中部 渡島地方北部 後志地方北部 後志地方東部 北海道奥尻島 空知地方北部 空知地方中部 上川地方北部 上川地方中部 留萌地方南部 宗谷地方北部 網走地方 北見地方 紋別地方 胆振地方西部 釧路地方北部 根室地方北部 根室地方中部 根室地方南部　 <東京都> 伊豆大島 三宅島 八丈島　 <富山県> 富山県東部 富山県西部　 <石川県> 石川県能登 石川県加賀　 <福井県> 福井県嶺北 福井県嶺南　 <岐阜県> 岐阜県飛騨 岐阜県美濃東部　 <愛知県> 愛知県東部　 <三重県> 三重県北部 三重県中部　 <滋賀県> 滋賀県北部 滋賀県南部　 <京都府> 京都府南部　 <大阪府> 大阪府北部 大阪府南部　 <兵庫県> 兵庫県北部 兵庫県南東部　 <奈良県> 奈良県";
    quakeText[4] = "<北海道> 石狩地方北部 石狩地方南部 渡島地方東部 渡島地方西部 檜山地方 空知地方南部 上川地方南部 胆振地方中東部 日高地方西部 日高地方中部 日高地方東部 十勝地方北部 十勝地方中部 十勝地方南部 釧路地方中南部　 <青森県> 青森県津軽北部 青森県津軽南部　 <秋田県> 秋田県内陸北部　 <東京都> 東京都多摩西部 神津島　 <新潟県> 新潟県上越 新潟県下越 新潟県佐渡　 <長野県> 長野県北部 長野県南部　 <岐阜県> 岐阜県美濃中西部　 <静岡県> 静岡県伊豆 静岡県中部 静岡県西部　 <愛知県> 愛知県西部";
    quakeText[5] = "";
    quakeText[6] = "<秋田県> 秋田県沿岸北部　 <山形県> 山形県庄内 山形県最上　 <埼玉県> 埼玉県秩父　 <新潟県> 新潟県中越　 <長野県> 長野県中部　 <静岡県> 静岡県東部";
    quakeText[7] = "<青森県> 青森県三八上北 青森県下北　 <岩手県> 岩手県沿岸北部　 <秋田県> 秋田県沿岸南部 秋田県内陸南部　 <山形県> 山形県村山 山形県置賜　 <群馬県> 群馬県北部　 <埼玉県> 埼玉県北部　 <千葉県> 千葉県北東部 千葉県南部　 <東京都> 東京都２３区 東京都多摩東部 新島　 <神奈川県> 神奈川県東部 神奈川県西部　 <山梨県> 山梨県中・西部 山梨県東部・富士五湖";
    quakeText[8] = "<岩手県> 岩手県沿岸南部 岩手県内陸北部 岩手県内陸南部　 <福島県> 福島県会津　 <群馬県> 群馬県南部　 <埼玉県> 埼玉県南部　 <千葉県> 千葉県北西部";
    quakeText[9] = "<宮城県> 宮城県南部 宮城県中部　 <福島県> 福島県中通り 福島県浜通り　 <茨城県> 茨城県北部 茨城県南部　 <栃木県> 栃木県北部 栃木県南部";
    quakeText[10] = "<宮城県> 宮城県北部";
  }
  if(q_magnitude!="--"){
    quakeText[0] = q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+shindoListJP[q_maxShindo]+"を観測する地震が発生しました。　震源は"+q_epiName+"、地震の規模を示すマグニチュードは"+q_magnitude;
    if(q_depth == "ごく浅い"){
      quakeText[0] += "、震源は"+q_depth+"です。";
    } else {
      quakeText[0] += "、震源の深さは"+q_depth+"kmです。";
    }
  } else {
    quakeText[0] = "<<震度速報>> "+q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+shindoListJP[q_maxShindo]+"を観測する地震が発生しました。 今後の情報にご注意ください！";
  }
  q_timeAll = q_timeYY + "-" + q_timeMM + "-" + q_timeDD + " " + q_timeH + ":" + q_timeM;
}

var quakesContainer;
!function(e){
  quakesContainer = e();
}(function(){
  let em = document.querySelector("div.eiListCover");
  let r = {
    view: function(){
      em.style.visibility = "visible";
    },
    hide: function(){
      em.style.visibility = "hidden";
    }
  };
  r.hide();
  return r;
});

function modeChange(num){
  console.log(num);
  switch (num) {
    case 0:
      TextWidth = -(strWidth(directTexts));
      SetMode(0);
      break;

    case 2:
      TextWidth = strWidth(quakeText[q_currentShindo]) * -1;
      SetMode(2);
      mi = 0;
      break;

    default:
      console.log('error...');
      break;
  }
  textOffsetX = 1200;
}

function zen2han(str) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

/**
 * @param {number} p type
 * @param {boolean} f format
 * @param {Date} d Date object
 * @param {Array[number]} a offset
 * @returns
 */
function getFormattedDate(p, f, d, a){
  if(!d) d = new Date();
  if(!f) f = 0;
  if(!p) p = 0;
  if(a){
    if(a.length == 6 && (a instanceof Array)){
      d.setFullYear(d.getFullYear() + a[0]);
      d.setMonth(d.getMonth() + a[1]);
      d.setDate(d.getDate() + a[2]);
      d.setHours(d.getHours() + a[3]);
      d.setMinutes(d.getMinutes() + a[4]);
      d.setSeconds(d.getSeconds() + a[5]);
    }
  }
  var year  = d.getFullYear();
  var month = f ? ('0' + (d.getMonth()+1)).slice(-2) : d.getMonth() + 1;
  var date  = f ? ('0' + d.getDate()).slice(-2) : d.getDate();
  var hour  = f ? ('0' + d.getHours()).slice(-2) : d.getHours();
  var min   = f ? ('0' + d.getMinutes()).slice(-2) : d.getMinutes();
  var sec   = f ? ('0' + d.getSeconds()).slice(-2) : d.getSeconds();
  var misec = ('000' + d.getMilliseconds()).slice(-3);
  switch (p) {
    case 0:
      return '' + year + month + date + hour + min + sec;
    case 1:
      return {year, month, date, hour, minute: min, second: sec, msec: misec};
    case 2:
      return d.getTime();
    case 3:
      return year+'/'+month+'/'+date+' '+Number(hour)+':'+min+':'+sec;
  }
}
function copyText(text) {
  navigator.clipboard.writeText(text);
}

chrome.system.memory.getInfo(a => {
  const byteToString = byte => {
    byte = BigInt(byte);
    let table = [
      [1n, 1n, "B"],
      [1024n, 1024n, "KiB"],
      [1048576n, 1024n, "MiB"],
      [1073741824n, 1024n, "GiB"],
      [1099511627776n, 1024n, "TiB"],
      [1125899906842624n, 1024n, "PiB"],
      [1152921504606846976n, 1024n, "EiB"],
      [1180591620717411303424n, 1024n, "ZiB"],
      [1208925819614629174706176n, 1024n, "YiB"],
      [1237940039285380274899124224n, 0n]
    ];
    let out = "";
    for (let item of table){
      if (byte >= item[0]){
        out = (Number(byte*1000n/item[0])/1000).toFixed(3)+" "+item[2];
      } else {
        break;
      }
    }
    return out;
  };
  console.log("　　メモリ全体領域: "+byteToString(a.capacity));
  console.log("メモリ空き容量領域: "+byteToString(a.availableCapacity));
});

(async () => {

  // Chromeストレージ（設定）
  await new Promise(resolve => {
    chrome.storage.sync.get(['mode0', 'mode3', 'settings', 'app'], data => {
      let isSaveForced = false;
      let currentVerID = AppVersionHistory.indexOf(data.app.lastVer);
      // Release note: 必ず追加すること
      // console.log(JSON.stringify(c));
      if ((!data.app) || data.app.newUser){
        isSaveForced = true;
      } else {
        if (currentVerID === -1) alert(data.app.lastVer+" ってどのバージョンですか？？？？？？");
        if (data.app.lastVer !== AppVersionView) /* アップデート後初回起動 */ isSaveForced = true;
        if (currentVerID <  3){ /* β0.1.2以前 */ if(data.settings.volume.eewH == 100){ alert("（ "+data.app.lastVer+" からのバージョンアップを検知しました）\n緊急地震速報(警報)時の音量を再確認し、必ず保存してください。"); }}
        if (currentVerID < 13){ /* β0.2.5以前 */ data.settings.interval.wniRiver = Math.max(data.settings.interval.wniRiver, 120000); }
        if (currentVerID < 15){ /* β0.2.7以前 */ data.settings.volume.eewC = 100;}
        if (currentVerID < 16){ /* β0.2.8以前 */ data.settings.volume.fldoc5 = data.settings.volume?.fldoc ?? 100; data.settings.volume.fldoc4 = 100; data.settings.volume.gl = 100; isSaveForced = true; }
        if (currentVerID < 22){ /* β0.3.4以前 */ data.settings.volume.eewL = [ data.settings.volume.eewL, data.settings.volume.eewL, data.settings.volume.eewL ] }
        if (currentVerID < 23){ /* β0.4.0以前 */ alert(data.app.lastVer+" からのバージョンアップを検知しました。\nカスタム音声の場所が、 EEW_Warning.（以下省略） → 「eew-custom.mp3」のみに変更されています。\nカスタム音声を使用している場合、手動で名前を変更するようにお願いします。"); }
      }

      data.settings.volume.eewP ??= 100
      data.settings.volume.hvra ??= 100
      data.settings.volume.fldoc5 ??= 100
      data.settings.volume.fldoc4 ??= 100
      document.getElementById('message1').value = data.mode0.main[0];
      document.getElementById('message2').value = data.mode0.main[1];
      document.getElementById('message3').value = data.mode0.main[2];
      document.getElementById('message4').value = data.mode0.main[3];
      document.getElementById('message5').value = data.mode0.main[4];
      document.getElementById('title1').value = data.mode0.title[0];
      document.getElementById('title2').value = data.mode0.title[1];
      document.getElementById('title3').value = data.mode0.title[2];
      document.getElementById('title4').value = data.mode0.title[3];
      document.getElementById('title5').value = data.mode0.title[4];
      document.getElementById('BNtitle').value = data.mode3[0];
      document.getElementById('BNtext1').value = data.mode3[1];
      document.getElementById('BNtext2').value = data.mode3[2];
      changeTextSpeed(data.settings?.tickerSpeed ?? 5);
      document.getElementById('isSoraview').checked = data.settings.soraview;
      document.getElementById('setClipEEW').checked = data.settings.clipboard.eew;
      document.getElementById('setClipQuake').checked = data.settings.clipboard.quake;
      document.getElementById('setIntervalIedred').value = data.settings.interval.iedred7584EEW;
      document.getElementById('setIntervalNHKquake').value = data.settings.interval.nhkQuake;
      document.getElementById('setIntervalJmaWt').value = data.settings.interval.jmaDevFeed;
      document.getElementById('setIntervalTenkiJpTsu').value = data.settings.interval.tenkiJPtsunami;
      document.getElementById('setIntervalTyphCom').value = data.settings.interval?.typhComment ?? 30000;
      document.getElementById('setIntervalWarn').value = data.settings.interval?.warnInfo ?? 15000;
      document.getElementById('setIntervalWNImscale').value = data.settings.interval.wniMScale;
      document.getElementById('setIntervalWNIsorabtn').value = data.settings.interval.wniSorabtn;
      document.getElementById('setIntervalWNIriver').value = data.settings.interval.wniRiver;
      document.getElementById('setIntervalWNItm').value = data.settings.interval.wniliveTimeTable;
      document.getElementById('volEEWl1').value = data.settings.volume.eewL[0];
      document.getElementById('volEEWl5').value = data.settings.volume.eewL[1];
      document.getElementById('volEEWl9').value = data.settings.volume.eewL[2];
      document.getElementById('volEEWh').value = data.settings.volume.eewH;
      document.getElementById('volEEWc').value = data.settings.volume.eewC;
      document.getElementById('volEEWp').value = data.settings.volume.eewP;
      document.getElementById('volGL').value = data.settings.volume.gl;
      document.getElementById('volNtc').value = data.settings.volume.ntc;
      document.getElementById('volSpW').value = data.settings.volume.spW;
      document.getElementById('volTnm').value = data.settings.volume.tnm;
      document.getElementById('volHvRa').value = data.settings.volume.hvra;
      document.getElementById('volFldOc5').value = data.settings.volume.fldoc5;
      document.getElementById('volFldOc4').value = data.settings.volume.fldoc4;

      document.getElementById("speech-vol-input").value = data.settings?.speech?.volume ?? 1;
      document.getElementById("speech-checkbox-eew").checked = data.settings?.speech?.options?.EEW ?? true;
      document.getElementById("speech-checkbox-quake").checked = data.settings?.speech?.options?.Quake ?? true;
      document.getElementById("speech-checkbox-vpoa50").checked = data.settings?.speech?.options?.VPOA50 ?? true;
      document.getElementById("speech-checkbox-ground").checked = data.settings?.speech?.options?.Ground ?? true;
      document.getElementById("speech-checkbox-specialwarn").checked = data.settings?.speech?.options?.SPwarn ?? true;

      t_viewType = (document.getElementById("viewTsunamiType").value = data.settings.viewTsunamiType || "1") - 0;

      elements.id.speechVolView.textContent = (data.settings?.speech?.volume ?? 1) * 100 + "%";
      document.getElementsByName("themeColors")[0].value = data.settings?.theme?.color ?? 0;
      if (data.settings.volume.quake){
        data.settings.volume.quake.forEach((item, i) => {
          document.getElementsByClassName("sound_quake_volume")[i].value = item.volume;
          document.getElementsByClassName("sound_quake_type")[i].setAttribute("data-type", item.type);
        });
      }
      colorThemeMode = data.settings?.theme?.color ?? 0;
      audioAPI.setGainTimer(data.settings?.gainPrograms ?? []);

      if(isSaveForced) savedata();
      isSoraview = data.settings.soraview;
      audioAPI.gainNode.gain.value = data.settings.volume.eewH / 100;
      document.addEventListener("DOMContentLoaded", () => {
        // console.log("DOMContentLoaded");
        reflectNormalMsg();
      });
      resolve();
    });
  });

  const audioEndedEvent = function (){
    console.log(this.buffer);
    this.buffer.disconnect(this.gain);
    const bufferSource = audioAPI.context.createBufferSource();
    bufferSource.buffer = this.audioData;
    bufferSource.loop = false;
    bufferSource.connect(this.gain);
    bufferSource.uuid = crypto.randomUUID();
    (this).canPlay = true;
    (this).buffer = bufferSource;
  };
  const propLoop = async (parent, propName) => {
    const target = parent[propName];
    if (!Object.hasOwn(target, "_src")){
      for (const item of Object.keys(target)) propLoop(target, item);
    } else {
      try {
        const bufferData = await fetch(target._src).then(res => res.arrayBuffer());
        const decodedAudio = await audioAPI.context.decodeAudioData(bufferData);
        const bufferSource = audioAPI.context.createBufferSource();
        const gainNode = audioAPI.context.createGain();
        bufferSource.buffer = decodedAudio;
        bufferSource.loop = false;
        bufferSource.connect(gainNode);
        bufferSource.uuid = crypto.randomUUID();
        gainNode.gain.value = target._defaultGain ?? 1;
        gainNode.connect(audioAPI.masterGain);
        parent[propName] = {audioData: decodedAudio, buffer: bufferSource, gain: gainNode, audioEndedEvent, canPlay: true };
      } catch (e) {
        console.dir(e);
        delete parent[propName];
      }
    }
  };
  sounds.eew.first._defaultGain = elements.id.volEEWl1.valueAsNumber / 100;
  sounds.eew.continue._defaultGain = elements.id.volEEWl5.valueAsNumber / 100;
  sounds.eew.last._defaultGain = elements.id.volEEWl9.valueAsNumber / 100;
  sounds.eew.plum._defaultGain = elements.id.volEEWp.valueAsNumber / 100;
  sounds.eew.custom._defaultGain = elements.id.volEEWc.valueAsNumber / 100;
  sounds.warning.GroundLoosening._defaultGain = elements.id.volGL.valueAsNumber / 100;
  sounds.warning.Notice._defaultGain = elements.id.volNtc.valueAsNumber / 100;
  sounds.warning.Emergency._defaultGain = elements.id.volSpW.valueAsNumber / 100;
  sounds.tsunami.watch._defaultGain = elements.id.volTnm.valueAsNumber / 100;
  sounds.tsunami.notice._defaultGain = elements.id.volTnm.valueAsNumber / 100;
  sounds.tsunami.warning._defaultGain = elements.id.volTnm.valueAsNumber / 100;
  sounds.tsunami.majorwarning._defaultGain = elements.id.volTnm.valueAsNumber / 100;
  sounds.warning.HeavyRain._defaultGain = elements.id.volHvRa.valueAsNumber / 100;
  sounds.warning.Flood4._defaultGain = elements.id.volFldOc4.valueAsNumber / 100;
  sounds.warning.Flood5._defaultGain = elements.id.volFldOc5.valueAsNumber / 100;
  for (const item of Object.keys(sounds)) propLoop(sounds, item);

  setInterval(Routines.main, 20);
  errorCollector.displayError = false;

  speechBase.addSpeaker(new AudioSpeaker("speaker21", "剣崎雌雄", "male", SpeechVersionData["speaker21"], false));
  speechBase.addSpeaker(new AudioSpeaker("speaker16", "九州そら", "female", SpeechVersionData["speaker16"], false));
  speechBase.addSpeaker(new AudioSpeaker("speaker8", "春日部つむぎ", "female", SpeechVersionData["speaker8"]));
  /** EEWモードかの判別 */
  speechBase.userSpace.isEewMode = false;
  speechBase.userSpace.speakerId = "speaker8";
  speechBase.userSpace.eew = {
    quakeId: "",
    intensity: "",
    magnitude: "",
    depth: "",
    epicenterId: ""
  };
  speechBase.addEventListener("speechStatus", event => {
    const code = event.detail.code;
    switch (code) {
      case speechBase.speechStatus.START_INIT:
        elements.id.speechStatusCurrent.textContent = "初期化開始";
        break;
      case speechBase.speechStatus.LOAD_FILE_PROGRESS:
        elements.id.speechStatusCurrent.textContent = "音声データを読み込み中： " + event.detail.data;
        break;
      case speechBase.speechStatus.START_DECODING:
        elements.id.speechStatusCurrent.textContent = "音声をデコード中";
        break;
      case speechBase.speechStatus.END_INIT:
        speechBase.volume = elements.id.speechVolInput.valueAsNumber;
        elements.id.speechStatusCurrent.textContent = "準備完了！";
        break;
      case speechBase.speechStatus.INIT_FAILED:
        elements.id.speechStatusCurrent.innerText = "初期化中にエラーが発生しました。\n" + event.detail.data.message;
        break;
    }
  });
  speechBase.addEventListener("volumeInput", event => {
    elements.id.speechVolView.textContent = (100 * event.detail.value).toFixed() + "%";
  });
  await speechBase.init(audioAPI.context, audioAPI.masterGain);
})();

function changeTextSpeed (value){
  const output = document.getElementById("speedResult");
  const slider = document.getElementById("speedVal");
  if (value !== undefined){
    slider.value = value;
  } else {
    value = slider.value;
  }
  textSpeed = value - 0;
  output.value = textSpeed.toFixed(1);
  const ratio = (value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(90deg, #377494 ${ratio}%, #dddddd ${ratio}%)`;
}

// イベント類
document.getElementsByName("goMessage")[0].addEventListener('click', function(){
  reflectNormalMsg();
  SetMode(0);
  textOffsetX = 1200;
  language = "Ja";
  timeCount = 217;
});
document.getElementById("into-fullscreen").addEventListener('click', function(){
  let ratio = (window.outerWidth-Window_FrameWidth)/window.innerWidth;
  document.getElementsByClassName("canvas-container")[0].classList.add("fullview");
  document.body.classList.add("fullview");
  heightBeforeFull = window.outerHeight;
  chrome.tabs.getCurrent((cb)=>{
    console.log("Window ID:", cb);
    chrome.windows.update(cb.windowId, {
      width: Math.floor(1212*ratio+Window_FrameWidth),
      height: Math.floor(128*ratio+Window_FrameHeight)
    });
    anim_fullscreen.start();
  });
});
document.getElementsByName("skipMessage")[0].addEventListener('click', function(){textOffsetX = -9007199254740000;});
document.getElementsByName("tmpSH-btn")[0].addEventListener('click', function(){$('.template-box').toggle();});
document.getElementsByName("tmpl-button")[0].addEventListener('click', function(){quakeTemplateView(1); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementsByName("tmpl-button")[1].addEventListener('click', function(){quakeTemplateView(2); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementsByName("tmpl-button")[2].addEventListener('click', function(){quakeTemplateView(3); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementsByName("tmpl-button")[3].addEventListener('click', function(){quakeTemplateView(4); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementsByName("tmpl-button")[4].addEventListener('click', function(){quakeTemplateView(5); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementsByName("tmpl-button")[5].addEventListener('click', function(){quakeTemplateView(6); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementsByName("tmpl-button")[6].addEventListener('click', function(){quakeTemplateView(7); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementsByName("tmpl-button")[7].addEventListener('click', function(){quakeTemplateView(8); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementsByName("tmpl-button")[8].addEventListener('click', function(){quakeTemplateView(9); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
document.getElementById("speedVal").addEventListener('input', function (){
  changeTextSpeed();
});
document.getElementsByName("BreakingNewsView")[0].addEventListener('click', function(){BNref()});
document.getElementsByName("wtWarnListView")[0].addEventListener('click', function(){viewWeatherWarningList();});
document.getElementsByName("sorabtn")[0].addEventListener('click', function(){sorabtn_view()});
document.getElementsByName("sorabtn")[1].addEventListener('click', function(){sorabtn_open()});
document.getElementsByName("sorabtn")[2].addEventListener('click', function(){sorabtn_close()});
document.getElementById("isSoraview").addEventListener('click', function(){isSoraview = document.getElementById('isSoraview').checked});
document.getElementById("stopWarnAudio").addEventListener('click', function(){audioAPI.fun.stopOscillator()});
document.getElementById("startEEWfcstTest").addEventListener('click', function(){
  testNow = true;
  RequestURL.iedred7584_eew = "../data/sample/normal.json";
  RequestURL.lmoni_eew = "../data/sample/l-normal.json";
  // eewOffset = 1661471326000 - getAdjustedDate();
});
document.getElementById("startEEWwarnTest").addEventListener('click', function(){
  testNow = true;
  RequestURL.iedred7584_eew = "../data/sample/warning.json";
  RequestURL.lmoni_eew = "../data/sample/l-warning.json";
  // eewOffset = 1642781328000 - getAdjustedDate();
});
document.getElementById("startEEWcancelTest").addEventListener('click', function(){
  testNow = true;
  RequestURL.iedred7584_eew = "../data/sample/cancel.json";
});
document.getElementById("stopEEWtest").addEventListener('click', function(){
  testNow = false; SetMode(0);
  RequestURL.iedred7584_eew = "https://api.iedred7584.com/eew/json/";
  RequestURL.lmoni_eew = "https://www.lmoni.bosai.go.jp/monitor/webservice/hypo/eew/{yyyyMMddHHmmss}.json";
  eewOffset = NaN;
});
chrome.tabs.getCurrent((cb)=>{
  chrome.windows.update(cb.windowId, {
    width: Math.floor(1240*window.outerWidth/window.innerWidth)
  });
});
// background_send("ZoomInformation["+Math.round(window.outerWidth/window.innerWidth*100)/100+"]");
document.getElementById("ChangeToEq").addEventListener('click', function (){SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});

document.getElementById("speech-vol-input").addEventListener("input", function (event){
  speechBase.volume = event.target.valueAsNumber;
});
document.getElementById("speech-test1").addEventListener("click", function (){
  speechBase.start([
    { type: "path", speakerId: "speaker8", path: "eew.epicenter.long.011" },
    { type: "path", speakerId: "speaker8", path: "eew.ungrouped.4" },
    { type: "path", speakerId: "speaker8", path: "common.magnitude.1" },
    { type: "wait", time: 0.2 },
    { type: "path", speakerId: "speaker8", path: "quake.start" },
    { type: "path", speakerId: "speaker8", path: "quake.epicenter.120" },
    { type: "path", speakerId: "speaker8", path: "quake.epi" },
    { type: "path", speakerId: "speaker8", path: "common.intensity.3", gain: 0.65 },
    { type: "path", speakerId: "speaker8", path: "quake.int" },
    { type: "path", speakerId: "speaker8", path: "quake.magnitude.2" },
    { type: "path", speakerId: "speaker8", path: "quake.mag" },
    { type: "path", speakerId: "speaker8", path: "quake.depth.0" },
    { type: "path", speakerId: "speaker8", path: "quake.dep" },
    { type: "path", speakerId: "speaker8", path: "quake.district.550" },
    { type: "path", speakerId: "speaker8", path: "quake.district.551" },
    { type: "path", speakerId: "speaker8", path: "quake.int_dist" },
    { type: "path", speakerId: "speaker8", path: "common.intensity.3", gain: 0.65 },
    { type: "path", speakerId: "speaker8", path: "quake.end" },
    { type: "wait", time: 0.2 },
    { type: "path", speakerId: "speaker8", path: "VPOA50_issued" },
    { type: "wait", time: 0.2 },
    { type: "path", speakerId: "speaker8", path: "ground.area.110000" },
    { type: "path", speakerId: "speaker8", path: "ground.issue" },
  ])
});

document.getElementById("dataSaver").addEventListener('click', function (){ savedata(); });
document.getElementById("unitsReflect").addEventListener('click', function (){rain_windData(1)});
document.getElementsByName("themeColors")[0].addEventListener('change', function (){ colorThemeMode = Number(document.getElementsByName("themeColors")[0].value); if(viewMode === 0){ Routines.md0title(); }; Routines.subCanvasTime(getAdjustedDate()); });
document.getElementById('setIntervalIedred').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalNHKquake').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalJmaWt').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalWarn').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalTenkiJpTsu').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalTyphCom').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalWNImscale').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalWNIsorabtn').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalWNIriver').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalWNItm').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
document.getElementById('setIntervalTpcBlackOut').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});

document.getElementById('volEEWl1').addEventListener("input", function (event){ SFXController.volume(sounds.eew.first, event.target.value / 100); });
document.getElementById('volEEWl5').addEventListener("input", function (event){ SFXController.volume(sounds.eew.continue, event.target.value / 100); });
document.getElementById('volEEWl9').addEventListener("input", function (event){ SFXController.volume(sounds.eew.last, event.target.value / 100); });
document.getElementById('volEEWh').addEventListener("input", function (event){ audioAPI.gainNode.gain.value = event.target.value / 100; });
document.getElementById('volEEWp').addEventListener("input", function (event){ SFXController.volume(sounds.eew.plum, event.target.value / 100) });
document.getElementById('volEEWc').addEventListener("input", function (event){ SFXController.volume(sounds.eew.custom, event.target.value / 100) });
document.getElementById('volGL').addEventListener("input", function (event){ SFXController.volume(sounds.warning.GroundLoosening, event.target.value / 100); });
document.getElementById('volNtc').addEventListener("input", function (event){ SFXController.volume(sounds.warning.Notice, event.target.value / 100); });
document.getElementById('volSpW').addEventListener("input", function (event){ SFXController.volume(sounds.warning.Emergency, event.target.value / 100); });
document.getElementById('volTnm').addEventListener("input", function (event){
  const volume = event.target.value / 100;
  SFXController.volume(sounds.tsunami.watch, volume);
  SFXController.volume(sounds.tsunami.notice, volume);
  SFXController.volume(sounds.tsunami.warning, volume);
  SFXController.volume(sounds.tsunami.majorwarning, volume);
});
document.getElementById('volHvRa').addEventListener("input", function (event){ SFXController.volume(sounds.warning.HeavyRain, event.target.value / 100); });
document.getElementById('volFldOc5').addEventListener("input", function (event){ SFXController.volume(sounds.warning.Flood5, event.target.value / 100); });
document.getElementById('volFldOc4').addEventListener("input", function (event){ SFXController.volume(sounds.warning.Flood4, event.target.value / 100); });

document.getElementById('voltestEEWl1').addEventListener("click", function(){ SFXController.play(sounds.eew.first); });
document.getElementById('voltestEEWl5').addEventListener("click", function(){ SFXController.play(sounds.eew.continue); });
document.getElementById('voltestEEWl9').addEventListener("click", function(){ SFXController.play(sounds.eew.last); });
document.getElementById('voltestEEWh').addEventListener("click", function(){ audioAPI.fun.startOscillator(); audioAPI.fun.stopOscillator(3);});
document.getElementById('voltestEEWp').addEventListener("click", function(){ SFXController.play(sounds.eew.plum); });
document.getElementById('voltestEEWcustom').addEventListener("click", function(){ SFXController.play(sounds.eew.custom); });
document.getElementById('voltestGL').addEventListener("click", function(){ SFXController.play(sounds.warning.GroundLoosening); });
document.getElementById('voltestNtc').addEventListener("click", function(){ SFXController.play(sounds.warning.Notice); });
document.getElementById('voltestSpW').addEventListener("click", function(){ SFXController.play(sounds.warning.Emergency); });
document.getElementById('voltestTnm').addEventListener("click", function(){ SFXController.play(sounds.tsunami[["watch","warning","notice","majorwarning"][Math.floor(Math.random()*4)]]); });
document.getElementById('voltestHvRa').addEventListener("click", function(){ SFXController.play(sounds.warning.HeavyRain); });
document.getElementById('voltestFldOc5').addEventListener("click", function(){ SFXController.play(sounds.warning.Flood5); });
document.getElementById('voltestFldOc4').addEventListener("click", function(){ SFXController.play(sounds.warning.Flood4); });

elements.id.masterGainRange.addEventListener("input", event => audioAPI.masterGainValue = event.target.valueAsNumber);

document.getElementById('viewTsunamiType').addEventListener("change", function(){
  t_viewType = elements.id.viewTsunamiType.value - 0;
  if (viewMode === 0) Routines.md0title();
});

document.getElementById('exportEEWs').addEventListener("click", function(){
  eewDatas.savedTime = (new Date())/1000;
  let blob = new Blob([JSON.stringify(eewDatas)], {type: "application/json"});
  let url = URL.createObjectURL(blob);
  let link = document.createElement("a");
  link.href = url;
  link.download = "eew_logs.json";
  link.click();
  URL.revokeObjectURL(url);
});

document.getElementsByClassName('BGMinput')[0].addEventListener('change', function(e){
  if (e.target.files.length){
    for (const item of backMsc){
      const bufferSource = item.bufferSource;
      const gainNode = item.gainNode;
      const context = item.context;
      gainNode.gain.value = 0;
      gainNode.disconnect();
      try {
        context.close();
        bufferSource.stop();
      } catch {}
      bufferSource.disconnect();
    }
    backMsc = [];
    document.getElementById("audiolist").innerHTML = "";
  }
  for (let i=0; i<e.target.files.length; i++){
    const index = backMsc.push({}) - 1;
    const reader = new FileReader();
    console.log(e.target.files[i]);
    reader.fileName = e.target.files[i].name;
    reader.index = index;
    document.getElementById("audiolist").insertAdjacentHTML("beforeend", `<div style="margin: 10px 0;">
<span class="musicFileName">${reader.fileName.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#039;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span>
<div style="position: relative; width: 580px; height: 65px; color: #fff; font-size: 13px;">
<div style="position: absolute; z-index: 1; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px; background-color: #0000008c;"></div>
<div style="position: absolute; z-index: 2; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px; background-color: #fff2;"></div>
<div style="position: absolute; z-index: 3; top: 3px; display: flex; align-items: center; justify-content: center; height: 26px; width: 100%; gap: 8px;">
  <div style="position: relative; width: 16px; height: 16px; cursor: pointer;">
    <button style="position: absolute; top: 0; left: 0; appearance: none; padding: 0; border: 0; background: none; cursor: pointer;" class="musicpause musichide" data-index="${index}">
      <svg style="display: block;" height="16" width="16" viewBox="0 0 16 16" data-index="${index}" fill="#fff"><path d="M0,0 L0,16 L5.5,16 L5.5,0 M10.5,0 L10.5,16 L16,16 L16,0" data-index="${index}"></path></svg>
    </button>
    <button style="position: absolute; top: 0; left: 0; appearance: none; padding: 0; border: 0; background: none; cursor: pointer;" class="musicstart musicactive" data-index="${index}">
      <svg style="display: block;" height="16" width="16" viewBox="0 0 16 16" data-index="${index}" fill="#fff"><path d="M0,0 L0,16 L16,8" data-index="${index}"></path></svg>
    </button>
  </div>
  <div style="width: 48px; text-align: end;" class="musicCurrentTime" role="text">--:--</div>
  <div style="position: relative; width: 410px; height: 16px;">
    <div style="position: absolute; top: 5.5px; height: 5px; border-radius: 3px; background-color: rgba(255, 255, 255, 0.1); left: 0; width: 100%;" class="musicNoLoad"></div>
    <div style="position: absolute; top: 5.5px; height: 5px; border-radius: 3px; background-color: rgba(255, 255, 255, 0.45); left: 0;" class="musicPlayed"></div>
    <div style="position: absolute; top: 5.5px; height: 5px; border-radius: 3px; background-color: rgba(255, 255, 255, 0.05); right: 0;" class="musicLoaded"></div>
    <div style="position: absolute; top: 3px; width: 100%; width: 10px; height: 10px; border-radius: 50%; background: #fff;" class="musicCurPos"></div>
    <input style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: none; appearance: none; outline: none; margin: 0; padding: 0; border: 0; cursor: pointer;" class="musicRangeInput" data-index="${index}" type="range" min="0" max="1" step="0.0001">
  </div>
  <div style="width: 48px; text-align: start;" class="musicDurationOrLeft" data-type="duration" role="text">--:--</div>
</div>
<div style="position: absolute; z-index: 4; top: 29px; display: flex; align-items: center; justify-content: center; height: 31px; width: 100%; gap: 4px;" class="musicButtomContainer">
  <span style="font-size: 12px; width: 25px; text-align: end;" class="musicRepeatStatus">OFF</span>
  <div style="margin-right: 6px; cursor: pointer; fill: #ddd;" class="musicRepeatInput" data-index="${index}">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" style="display: block;">
      <path d="M280-73.782 113.782-240 280-406.218 342.218-342l-58.044 57.478h391.304v-160h89.044v249.044H284.174L342.218-138 280-73.782Zm-84.522-441.696v-249.044h480.348L617.782-822 680-886.218 846.218-720 680-553.782 617.782-618l58.044-57.478H284.522v160h-89.044Z"></path>
    </svg>
  </div>
  <input style="display: block; width: 65px; height: 16px;" class="BGMrepeatingStart" min="0" data-index="${index}" type="number">
  <span style="font-size: 14px;">秒〜</span>
  <input style="display: block; width: 65px; height: 16px;" class="BGMrepeatingStop" data-index="${index}" type="number">
  <span style="font-size: 14px;">秒</span>
  <span style="font-size: 15px; margin-left: 16px; width: 45px; text-align: end;" class="BGMvolOutput">100%</span>
  <input style="display: block; width: 140px;" class="musicVol" data-index="${index}" type="range" min="0" max="200" step="1" value="100">
</div>
</div>
</div>`);
    reader.addEventListener("load", function(){
      const index = reader.index;
      const here = (backMsc[index] = {});
      here.context = new AudioContext();
      here.gainNode = here.context.createGain();
      here.bufferSource = here.context.createBufferSource();
      here.context.mIndex = index;
      here.gainNode.mIndex = index;
      here.bufferSource.mIndex = index;
      here.bufferSource.createdAt = new Date();
      here.context.decodeAudioData(this.result, function(buffer){
        // debugger;
        here.bufferSource.buffer = buffer;
        here.bufferSource.playbackRate.value = 1;
        here.bufferSource.connect(backMsc[index].gainNode).connect(backMsc[index].context.destination);
        here.startedAt = 0;
        here.pausedAt = 0;
        here.lastUpdate = 0;
        here.playing = false;
        here.playAfterReset = null;
        here.play = function(start){
          let startTime = start ?? this.pausedAt;
          if (startTime >= this.bufferSource.buffer.duration - 0.05) startTime = 0;
          this.bufferSource.start(0, startTime);
          this.startedAt = this.context.currentTime - startTime;
          this.pausedAt = 0;
          this.playing = true;
          if (this.onStateChange) this.onStateChange(true, this.context.mIndex);
        };
        here.bufferEnd = function(event){
          const musicIndex = event.target.context.mIndex;
          const here = backMsc[musicIndex];
          const bufferSource = here.bufferSource;
          const gainNode = here.gainNode;
          const context = here.context;
          const buffer = bufferSource.buffer;
          const detune = bufferSource.detune.value;
          const playbackRate = bufferSource.playbackRate.value;
          here.pausedAt = here.currentTime;
          bufferSource.disconnect();
          try { bufferSource.stop(); } catch {}
          here.playing = false;
          {
            here.bufferSource = context.createBufferSource();
            const bufferSource = here.bufferSource;
            bufferSource.connect(gainNode);
            bufferSource.buffer = buffer;
            bufferSource.detune.value = detune;
            bufferSource.playbackRate.value = playbackRate;
            bufferSource.mIndex = musicIndex;
            bufferSource.createdAt = new Date();
            bufferSource.onended = here.bufferEnd;
            if(here.onStateChange) here.onStateChange(false, musicIndex);
          }
          if (here.playAfterReset !== null){
            here.play(here.playAfterReset);
            here.playAfterReset = null;
          }
        };
        here.storage = {
          loop: {
            effective: false,
            start: 0,
            end: 0,
            inputElement: document.getElementsByClassName("musicRepeatInput")[index],
            statusElement: document.getElementsByClassName("musicRepeatStatus")[index]
          },
          musicDurationOrLeft: {
            string: "",
            element: document.getElementsByClassName("musicDurationOrLeft")[index]
          },
          musicCurrentTime: {
            string: "",
            element: document.getElementsByClassName("musicCurrentTime")[index]
          },
          progressbar: {
            number: 999,
            playedElement: document.getElementsByClassName("musicPlayed")[index],
            loadedElement: document.getElementsByClassName("musicLoaded")[index],
            curposElement: document.getElementsByClassName("musicCurPos")[index],
            inputElement: document.getElementsByClassName("musicRangeInput")[index]
          },
          operation: {
            play: document.getElementsByClassName("musicstart")[index],
            pause: document.getElementsByClassName("musicpause")[index],
            repeatStart: document.getElementsByClassName("BGMrepeatingStart")[index],
            repeatEnd: document.getElementsByClassName("BGMrepeatingStop")[index],
            volume: document.getElementsByClassName("musicVol")[index],
          }
        };
        here.bufferSource.onended = here.bufferEnd;
        Object.defineProperty(here, "currentTime", { get: function(){
          if (this.playing){
            const elapsed = this.context.currentTime - this.startedAt;
            return elapsed % this.bufferSource.buffer.duration;
          } else {
            return this.pausedAt;
          }
        }, set: function(seconds){
          if (here.playing){
            here.playAfterReset = seconds;
            this.bufferSource.stop();
          } else {
            this.pausedAt = seconds;
          }
        }});
        here.onStateChange = function(state, index){
          document.querySelectorAll(".musicstart")[index].classList.remove("musichide");
          document.querySelectorAll(".musicpause")[index].classList.remove("musichide");
          document.querySelectorAll(".musicstart")[index].classList.remove("musicactive");
          document.querySelectorAll(".musicpause")[index].classList.remove("musicactive");
          if(state){
            document.querySelectorAll(".musicstart")[index].classList.add("musichide");
            document.querySelectorAll(".musicpause")[index].classList.add("musicactive");
          } else {
            document.querySelectorAll(".musicstart")[index].classList.add("musicactive");
            document.querySelectorAll(".musicpause")[index].classList.add("musichide");
          }
        };
        here.storage.operation.play.addEventListener("click", function(event){
          const index = event.target.getAttribute("data-index") - 0;
          backMsc[index].bufferSource.loop = backMsc[index].storage.loop.effective;
          backMsc[index].bufferSource.loopStart = backMsc[index].storage.loop.start;
          backMsc[index].bufferSource.loopEnd = backMsc[index].storage.loop.end;
          backMsc[index].play();
        });
        here.storage.operation.pause.addEventListener("click", function(event){
          const index = event.target.getAttribute("data-index") - 0;
          backMsc[index].bufferSource.stop();
        });
        here.storage.loop.inputElement.addEventListener("click", function(event){
          const index = event.currentTarget.getAttribute("data-index") - 0;
          const here = backMsc[index];
          if (here.storage.loop.effective = here.bufferSource.loop = !here.storage.loop.effective){
            here.storage.loop.inputElement.style.fill = "#9bff7a";
            here.storage.loop.statusElement.textContent = "ON";
          } else {
            here.storage.loop.inputElement.style.fill = "#ddd";
            here.storage.loop.statusElement.textContent = "OFF";
          }
        });
        here.storage.operation.repeatStart.addEventListener("change", function(event){
          const index = event.target.getAttribute("data-index") - 0;
          backMsc[index].storage.loop.start = backMsc[index].bufferSource.loopStart = event.target.value ? event.target.value - 0 : 0;
        });
        here.storage.operation.repeatEnd.addEventListener("change", function(event){
          const index = event.target.getAttribute("data-index") - 0;
          const here = backMsc[index];
          backMsc[index].storage.loop.end = backMsc[index].bufferSource.loopEnd = event.target.value ? event.target.value - 0 : here.bufferSource.buffer.duration;
        });
        here.storage.operation.volume.addEventListener("input", function(event){
          const index = event.target.getAttribute("data-index") - 0;
          backMsc[index].gainNode.gain.value = event.target.value / 100;
          document.getElementsByClassName("BGMvolOutput")[index].textContent = event.target.value + "%";
        });
        here.storage.progressbar.inputElement.addEventListener("click", function(event){
          const index = event.target.getAttribute("data-index") - 0;
          const here = backMsc[index];
          here.currentTime = event.currentTarget.value * here.bufferSource.buffer.duration;
        });
      });
    });
    reader.readAsArrayBuffer(e.target.files[i]);
  }
});


// JSON[Symbol.toStringTag] -> "JSON"

//   https://www3.nhk.or.jp/weather/amds/amds_data.xml
//   https://www3.nhk.or.jp/weather/cld_pic/cld_pic_data.xml
//   https://www3.nhk.or.jp/sokuho/tsunami/data/publish.xml
//   https://www3.nhk.or.jp/news/json16/realtime_saigai.json
