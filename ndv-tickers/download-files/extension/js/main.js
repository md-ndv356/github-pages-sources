'use strict';

// import easyXhr from "./modules/easyXhr.js";

// Release Note: アプデ前にアーカイブを取ること (2021-07-29から)
// Release Note: terser -c -m -o main.min.js -- main.js
// Release Note: 必ずバージョンを更新すること
// Release Note: eewLocalhostStreamPortを0にすること
//  manifest.json
//  ホームページ
//  Google Apps Script
//  _ContentVersions
//  _appVersion

const _ContentVersions = [
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
  "β0.4.0"
];

const _appVersionCode = "beta21";
const _appVersionView = "β0.4.0";
console.log(`%cNDV %c(Natural Disaster Viewer)%c   v.${_appVersionView}%c
β0.1.0 ベータ版リリース
β0.1.1 howToUse.txtの更新
β0.1.2 効果音の音量関係の更新
β0.1.3 一部表記の変更 バージョンアップ検知機能 時計の色を変更(仮) その他一部の変更・修正
β0.1.4 バージョンアップお知らせ機能追加(起動時) 設定が反映されない場合がある問題を修正 デバッグ機能を追加 その他軽微な変更・修正
β0.1.5 Mスケールが地震情報のタイトルに一部反映されない問題を修正 緊急地震速報のレベル法・PLUM法による電文を一部受信できない問題を修正 時計のデザインを刷新
β0.1.6 緊急地震速報の表示テストが可能に 一部表記を変更 緊急地震速報ログを自動送信できるように変更 自動再読み込み機能追加 その他軽微な変更・修正
β0.2.0 カラーテーマを変更可能に 設定項目の追加 地震情報リストのスタイル変更 緊急地震速報の受信ログを送信できるように変更 待機中の気象情報を確認する機能を追加 その他様々な変更・修正
β0.2.1 (重要)特別警報・河川情報関連の処理を変更 (重要)キャンセル報が反映されない問題を一時的に修正 (重要)津波情報が表示されないバグを修正 地震情報のデザインを変更
β0.2.2 (重要)河川情報が正しく表示できない問題を修正 土砂災害警戒情報のメッセージを変更 新しく2種類の効果音を追加 アメダス観測情報を追加 最大化機能を追加 その他様々な変更・修正
β0.2.3 (緊急)震度5弱以上の最大震度階級が1つ上がってしまう問題を修正
β0.2.4 (重要)東京都２３区が表示できない問題を修正 緊急地震速報のテストが行えない問題を修正 緊急地震速報の警報音を変更 その他様々な変更・修正
β0.2.5 [重要]Ｍスケールによるレイアウトが変更されない問題を修正 一部デザインの変更 標準コマンド一覧表を実装 津波情報の処理を改善 その他軽微な修正
β0.2.6 推定震源が無い場合のPLUM法を受信したときの動作を変更しました。 一部のデフォルト値を変更しました。 津波情報の音声を変更しました。 一部コマンドの変更を行いました。 アメダスのデータが正しく表示されない場合がある問題を修正しました。 その他軽微な修正が含まれます。
β0.2.7 緊急地震速報の地図の描画を変更しました。 緊急地震速報の警報を受信した場合にカスタム音源を使用できるようになりました。 OS間の字体による差を軽減しました。 (Manifest V3に移行しました。) 一部の不具合を修正しました。
β0.2.8 地震情報で震度ごとの音量・音声タイプを変更できるようになりました。 指定河川洪水予報の表示を一部変更しました。 その他不具合の修正を行いました。
β0.2.9 [重要] 指定河川洪水予報が表示されない問題を修正しました。 土砂災害警戒情報・氾濫危険情報・氾濫発生情報の効果音を変更しました。
β0.3.0 地震情報で震度観測点の地名が「undefined」にならなくなりました。 モノトーンスタイルを追加しました。 その他不具合の修正・変更を行いました。
β0.3.1 モノトーンの表示に不具合が発生することがある現象を修正しました。 気象特別警報報知の不具合を修正しました。
β0.3.2 BGM再生機能に関する不具合を修正しました。　起動時に通常画面のテキストが反映されるようになりました。　通常画面の文字が流れる速度の初期値を3.9から4に変更しました。　時刻自動調整機能(仮)が有効になりました。　その他の不具合の修正を行いました。
β0.3.3 重大なパフォーマンスの問題を改善しました。　多少のデザインの変更を行いました。　その他の不具合の修正を行いました。
β0.3.4 ウィンドウサイズに関する問題を修正しました。 津波情報のデザインを変更しました。 エラーログを出力する機能を追加しました。
β0.4.0 読み上げ機能を追加しました。 その他の詳細はリリースノートをご覧ください。`,
  "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 19px; font-style: italic;",
  "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 11px; font-style: italic;",
  "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 9px; color: #888;",
  "background: #fff; font-family: sans-serif; font-weight: 300; padding: 2px; font-size: 9px; color: #333;"
);
console.log("%cThe Programs Started at: "+(new Date()).toISOString()+" (measured by the system clock)",
  "background: #55f; font-family: sans-serif; font-weight: 300; padding: 2px; font-size: 14px; color: white;"
);

// エラー処理
const errorCollector = {
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
      additionalText = "["+currentTime+"] ("+Math.trunc(event.timeStamp)+") エラーが発生しました。isTrustedはundefinedです。\n"+event.stack;
    } else {
      additionalText = "["+currentTime+"] 不明なエラーが発生しました。isTrustedはundefinedです。\n"+event;
    }
    console.error(additionalText);
    errorCollector.log += "\n\n"+additionalText;
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

const gElByCl = (name, index=0) => document.getElementsByClassName(name)[Number(index)];
let PlatformOS = null;
let Window_FrameWidth = 0;
let Window_FrameHeight = window.outerHeight - window.innerHeight * window.outerWidth / window.innerWidth;
chrome.runtime.getPlatformInfo().then(info => {
  PlatformOS = info.os;
  Window_FrameWidth = PlatformOS === "win" ? 16 : 0;
  Window_FrameHeight = window.outerHeight - window.innerHeight * (window.outerWidth - Window_FrameWidth) / window.innerWidth;
});
document.getElementById("dbTickerVersion").textContent = "Ticker Version: "+_appVersionCode+" ("+_appVersionView+")";

context.fillStyle = "#999";
context.fillRect(0, 0, 1080, 128);
context.fillStyle = "#fff";
context.font = "bold 70px Arial";
context.fillText("Please wait for preparing...", 0, 100);

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
    viewTsunami: document.getElementById("viewTsunami"),
    dbPfDrawing: document.getElementById("dbPfDrawing"),
    tfmoni: document.getElementById("tfmoni"),
    volEEWl1: document.getElementById('volEEWl1'),
    volEEWl5: document.getElementById('volEEWl5'),
    volEEWl9: document.getElementById('volEEWl9'),
    volEEWc: document.getElementById('volEEWc'),
    volEEWp: document.getElementById('volEEWp'),
    volTnm: document.getElementById('volTnm'),
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
    /** @type {HTMLDivElement} */ speechStatusCurrent: document.getElementById("speech-status-current"),
    /** @type {HTMLInputElement} */ speechVolInput: document.getElementById("speech-vol-input"),
    /** @type {HTMLSpanElement} */ speechVolView: document.getElementById("speech-vol-view")
  },
  class: {
    tab_item: Array.from(document.getElementsByClassName("tab-item")),
    switch_button: Array.from(document.getElementsByClassName("switch-button")),
    wtWarnListMsg: Array.from(document.getElementsByClassName("wtWarnListMsg")),
    sound_quake_volume: Array.from(document.getElementsByClassName("sound_quake_volume")),
    sound_quake_type: Array.from(document.getElementsByClassName("sound_quake_type"))
  },
  name: {
    recordingwheneewreceived: [
      document.getElementsByName("recordingwheneewreceived")[0]
    ],
    unitTemp: [
      document.getElementsByName('unitTemp')[0]
    ],
    unitWinds: [
      document.getElementsByName('unitWinds')[0]
    ]
  }
};
const animations = {
  switchTabs: []
};

// system sounds_

const Assets = {
  sound: {
    start: "../sound/main-started.mp3",
    quake: {
      normal: "../sound/quake-notice.mp3",
      major: "../sound/quake-major.mp3"
    },
    warning: {
      Notice: "../sound/warn-tornado.mp3",
      GroundLoosening: "../sound/warn-ground.mp3",
      Emergency: "../sound/warn-emergency.mp3",
      HeavyRain: "../sound/warn-heavyrain.mp3",
      Flood5: "../sound/warn-flood5.mp3",
      Flood4: "../sound/warn-flood4.mp3"
    },
    tsunami: {
      Notice: "../sound/tsunami-0.mp3",
      Watch: "../sound/tsunami-1.mp3",
      Warning: "../sound/tsunami-2.mp3",
      Majorwarning: "../sound/tsunami-3.mp3"
    },
    eew: {
      plum: "../sound/eew-continue.mp3",
      first: "../sound/eew-first.mp3",
      continue: "../sound/eew-continue.mp3",
      last: "../sound/eew-last.mp3",
      custom: "../sound/eew-custom.mp3"
    }
  }
};
const sounds = Assets.sound;

// stream recorder
const recorderObject = new MediaRecorder(canvas1.captureStream(), {mineType: 'video/webm;codecs=vp9'});
recorderObject.ondataavailable = function(e){
  //var anchor = document.getElementById('downloadlink');
  const videoBlob = new Blob([e.data], {type: e.data.type});
  const blobUrl = window.URL.createObjectURL(videoBlob);
  /*anchor.download = 'movie.webm';
  anchor.href = blobUrl;
  anchor.style.display = 'block';*/
  $('#download_movie').append('<a download="movie_'+getFormattedDate(2)+'.webm" href="'+blobUrl+'" style="display: block;">Download '+getFormattedDate(3,1)+'</a>');
};
recorderObject.onstart = function(){
  isTickerRecorded = true;
};
recorderObject.onstop = function(){
  isTickerRecorded = false;
};

// initialize Web Audio API
const audioAPI = {
  init: function(){
    audioAPI.context = new AudioContext();
    audioAPI.gainNode = audioAPI.context.createGain();
    audioAPI.gainNode.gain.value = 0.1;
    audioAPI.oscillatorNode = undefined;
    audioAPI.gainNode.connect(audioAPI.context.destination);
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
      audioAPI.oscillatorNode.stop(audioAPI.context.currentTime + time);
    },
    freqB5: function(){audioAPI.oscillatorNode.frequency.value = 987.767;},
    freqE6: function(){audioAPI.oscillatorNode.frequency.value = 1318.51;},
    freqTS: function(){audioAPI.oscillatorNode.frequency.value = 1000;}
  }
};
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

// custom font settings
const customFonts = {
  main: "'Hiragino Kaku Gothic ProN', JPAexGothic, ArialMT, YuGo-Medium, sans-serif",
  list: {
    "JPAPGothic": "IPAフォント"
  },
  defaults: {}
};
chrome.fontSettings.getFontList(function(a){
  for(let i=0; i<a.length; i++){
    customFonts.list[a[i].fontId] = a[i].displayName;
  }
});
chrome.fontSettings.getFont({genericFamily:"sansserif"}, function(a){
  customFonts.defaults.sansserif = a.fontId;
  // customFonts.main = '"'+a.fontId+'"';
});
chrome.fontSettings.getFont({genericFamily:"serif"}, function(a){
  customFonts.defaults.serif = a.fontId;
});

// main text
var mainText = ["","","","","","","","","","",""];
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

var msi = -1; //「+1」の部分は、震度に「5弱以上と推定」を追加した部分。
var csi = msi;

// constant of Shindo names
const siList = ["","1","2","3","4","5弱以上","5弱","5強","6弱","6強","7"];
const nhkSiList = ["","1","2","3","4","?","5-","5+","6-","6+","7"]

// variables of weather information
var siHnum,
    siHstr,
    speed = 4,
    mode = 0,
    language = "Ja",
    timeCount = 0,
    DText = [
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
    ], /*大型で非常に強い台風19号（ハギビス）は、15時現在、八丈島の南南西約550kmにあって、北北西に25km/sで進んでいます。中心付近の気圧は925hPa、最大風速は50m/s、最大瞬間風速は70km/sとなっています。24時間後には、御前崎の南約160kmに進む見込みです。*/
    /*ｲﾙﾐﾈｰｼｮﾝCh.:ウェザーニュースのイルミネーションChでは、全国のイルミネーションの天気予報はもちろん、開催期間やスポットの写真など、情報が満載。また「キラリ写真館」では、全国のウェザーニュース会員から届いたイルミネーションの写真を記載しています。イルミネーション鑑賞に、ぜひご活用ください。*/
    /*道路交通情報:ウェザーニュースでは、みなさまからのリポート投稿や、チャットでのご参加をお待ちしております。スマートフォンアプリ「ウェザーニュース」や、Webサイト、YouTube、ニコニコ動画、AbemaTV等の動画サイトからご参加いただけます。*/
    command_shortcutsTo = {},
    Dcommand = [1,2,11,13,20],
    Dcnt = 5,
    Nnum = 0,
    lastPre = "",
    heightBeforeFull = 0;
// earthquake variables
var q_msiText = siList[msi],
    q_magnitude = "",
    q_epiName = "",
    q_depth = "",
    q_timeYY = "",
    q_timeMM = "",
    q_timeDD = "",
    q_timeH = "",
    q_timeM = "",
    q_startTime = 0,
    q_epiId = 0,
    quake_customComment = "";
var allcitydata = [],
    allcity = [],
    allprefecture = [],
    allcitykana = [],
    earthquakes_log = {};
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
// breaking news
var BNtitle = [],
    BNtext1 = [],
    BNtext2 = [];
// tsunami information
var t_Cancelled = true,
    t_lastId,
    t_page = 0,
    t_obsUpdateTime = 0;
var isTickerRecorded = false;
var systemTimeLag = 0; // ミリ秒単位

var teidentext = "";
var riverlevel = new Array(7);
var rivertext = ["","","","","","",""];
rivertext[0] = "wfi";
var riveralltext = "";
var timetableStr = "";
// 情報の読み込みを管理するオブジェクトです。
const XHRs = {
  diderr: function (event){
    errorCollector.collect("("+event.timeStamp+") XMLHttpRequestでエラーが発生しました。isTrustedは"+errorCollector.true_or_false(event.isTrusted)+"です。\nRequest Type: "+event.target.parent.does+" / Timeout: "+event.target.parent.timeout+"(ms)");
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
    does: "WNI MScale"
  },
  teideninfo: {
    body: new XMLHttpRequest(),
    load: function(){
      // this.body.timeout = this.timeout;
      // this.body.open("GET", RequestURL.tepcoTeiden+'?'+new Date().getTime());
      // this.body.send();
    },
    timeout: 28000,
    does: "東京電力の停電情報"
  },
  getJMAforecast: {
    body: new XMLHttpRequest(),
    load: function(){
      // this.body.timeout = this.timeout;
      // this.body.open("GET", 'https://www.jma.go.jp/bosai/forecast/data/forecast/map.json?'+new Date().getTime());
      // this.body.send();
    },
    timeout: 61000,
    does: "気象庁天気予報"
  },
  river: {
    body: new XMLHttpRequest(),
    load: function(){
      this.body.timeout = this.timeout;
      this.body.open("GET", RequestURL.wni_river+'?'+new Date().getTime());
      this.body.send();
    },
    timeout: 350000,
    does: "気象庁天気予報"
  },
  wnlTimetable: {
    body: new XMLHttpRequest(),
    load: function(){
      this.body.timeout = this.timeout;
      this.body.open("GET", RequestURL.wniliveTimeTable+'?_='+new Date().getTime());
      this.body.send();
    },
    timeout: 5000,
    does: "ウェザーニュースLiVEの番組表"
  }
};
XHRs.mscale.body.parent = XHRs.mscale;
XHRs.mscale.body.addEventListener("load", function(){
  let json = JSON.parse(this.response);
  lastGet.wniMScale = getCTime();
  updateLoadedTime();
  if(mscale !== json.mscale-1) SetMscale(json.mscale-1);
});
XHRs.mscale.body.addEventListener("error", XHRs.diderr);
XHRs.mscale.body.addEventListener("timeout", XHRs.didtimeout);
XHRs.teideninfo.body.parent = XHRs.teideninfo;
XHRs.teideninfo.body.addEventListener("load", function(){
  let c = this.responseXML;
  lastGet.tepcoTeiden = getCTime();
  updateLoadedTime();
  teidentext = $(c).find('東京電力停電情報 > お知らせ').text() + "　";
  let teidenkensu_zentai = Number($(c).find('東京電力停電情報 > 停電軒数').text());
  let teidenkensu_kenbetsu = [];
  let teidenkensu_areas = Array.from(c.getElementsByTagName('エリア'));
  for(let c2 of teidenkensu_areas){
    if($(c2).find('停電軒数').text()){
      teidenkensu_kenbetsu.push({
        code: $(c2).attr('コード'),
        name: $(c2).find('名前').text(),
        value: Number($(c2).find('停電軒数').text())
      });
    }
  }
  teidenkensu_kenbetsu.forEach(function(c2){
      teidentext += "　" + c2.name + "：約" + c2.value + "軒";
  });
  teidentext += "　(総数：" + teidenkensu_zentai + "軒)";
  if (!teidenkensu_zentai) {
    teidentext = "現在、停電情報はございません。";
  }
});
XHRs.teideninfo.body.addEventListener("error", XHRs.diderr);
XHRs.teideninfo.body.addEventListener("timeout", XHRs.didtimeout);
XHRs.getJMAforecast.body.parent = XHRs.getJMAforecast;
XHRs.getJMAforecast.body.addEventListener("load", function(){});
XHRs.getJMAforecast.body.addEventListener("error", XHRs.diderr);
XHRs.getJMAforecast.body.addEventListener("timeout", XHRs.didtimeout);
XHRs.river.body.parent = XHRs.river;
XHRs.river.body.addEventListener("load", function(){
  let riverWarnDatas = [];
  lastGet.wniRiver = getCTime();
  updateLoadedTime();
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
  lastGet.wniliveTimeTable = getCTime();
  updateLoadedTime();
  timetableStr = "";
  data.forEach(function(value){
    timetableStr += value.hour+" → "+value.title+"　　";
  });
});
XHRs.wnlTimetable.body.addEventListener("error", XHRs.diderr);
XHRs.wnlTimetable.body.addEventListener("timeout", XHRs.didtimeout);
var lastGet = {
  iedred7584EEW: "---",
  lmoni_eew: "---",
  nhkQuake1: "---",
  nhkQuake2: "---",
  tenkiJPtsunami: "---",
  wniMScale: "---",
  wniSorabtn: "---",
  wniRiver: "---",
  jmaTableCsvPre1h00_rct: "---",
  jmaTableCsvPre24h00_rct: "---",
  jmaTableCsvMxwsp00_rct: "---",
  jmaTableCsvMxtemsadext00_rct: "---",
  jmaTableCsvMntemsadext00_rct: "---",
  jmaDevFeedExtra: "---",
  jmaAmedasLatest: "---",
  wniliveTimeTable: "---",
  tepcoTeiden: "---"
};

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
      center: {
        ja: new Image(),
        en: new Image(),
        ja2: new Image(),
        en2: new Image()
      },
      depth: {
        ja: new Image(),
        en: new Image(),
        ja2: new Image(),
        en2: new Image()
      },
      depth_km: new Image(),
      depth_km2: new Image(),
      ocTime: {
        ja: new Image(),
        en: new Image(),
        ja2: new Image(),
        en2: new Image()
      },
      jst: new Image(),
      jst2: new Image(),
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
  if(!images.texture.EEW_epicenter_JP_350.hasOwnProperty("data")) return false;
  if(!images.texture.EEW_epicenter_JP_328.hasOwnProperty("data")) return false;
  switch(type){
    case "JP_350":
    case "JP_328":
      if(!option.id) return;
      const parent = images.texture["EEW_epicenter_"+type];
      const data = parent.data.datas;
      if (!("imgBmp" in parent)){
        parent.imgBmp = null;
        createImageBitmap(parent.image).then((function(bmp){this.imgBmp = bmp;}).bind(parent));
      }
      const imgBmp = parent.imgBmp;
      const position = data[data.findIndex(item => item.id === option.id)].position;
      if(position === -1) return false;
      if(imgBmp) context.drawImage(imgBmp, position.x, position.y-55, 352, 68, x, y, 352, 68);
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
  const onImageLoaded = function(){
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
  images.quake.texts.center.ja.src = "../img/texts/epicenter-ja.png";
  images.quake.texts.center.en.src = "../img/texts/epicenter-en.png";
  images.quake.texts.depth.ja.src = "../img/texts/depth-ja.png";
  images.quake.texts.depth.en.src = "../img/texts/depth-en.png";
  images.quake.texts.depth_km.src = "../img/texts/depth-km.png";
  images.quake.texts.ocTime.ja.src = "../img/texts/octime-ja.png";
  images.quake.texts.ocTime.en.src = "../img/texts/octime-en.png";
  images.quake.texts.jst.src = "../img/texts/quake-jst.png";
  images.quake.texts.magni2.src = "../img/texts/M2-magnitude.png";
  images.quake.texts.center.ja2.src = "../img/texts/M2-epicenter-ja.png";
  images.quake.texts.center.en2.src = "../img/texts/M2-epicenter-en.png";
  images.quake.texts.depth.ja2.src = "../img/texts/M2-depth-ja.png";
  images.quake.texts.depth.en2.src = "../img/texts/M2-depth-en.png";
  images.quake.texts.depth_km2.src = "../img/texts/M2-depth-km.png";
  images.quake.texts.ocTime.ja2.src = "../img/texts/M2-octime-ja.png";
  images.quake.texts.ocTime.en2.src = "../img/texts/M2-octime-en.png";
  images.quake.texts.jst2.src = "../img/texts/M2-quake-jst.png";
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

// chrome storage
chrome.storage.sync.get(['mode0', 'mode3', 'settings', 'app'], function(c){
  let isSaveForced = false;
  let currentVerID = _ContentVersions.indexOf(c.app.lastVer);
  // Release note: 必ず追加すること
  // console.log(JSON.stringify(c));
  if (!c.app){
    isSaveForced = true;
  } else {
    if(c.app.lastVer !== _appVersionView) isSaveForced = true;
    if(currentVerID < 3){ /* β0.1.2以前 */ if(c.settings.volume.eewH == 100){ alert("（ "+c.app.lastVer+" からのバージョンアップを検知しました）\n緊急地震速報(警報)時の音量を再確認し、必ず保存してください。"); }}
    if(currentVerID < 13){ /* β0.2.5以前 */ c.settings.interval.wniRiver = Math.max(c.settings.interval.wniRiver, 120000); }
    if(currentVerID < 15){ /* β0.2.7以前 */ c.settings.volume.eewC = 100;}
    if(currentVerID < 16){ /* β0.2.8以前 */ c.settings.volume.fldoc5 = c.settings.volume?.fldoc ?? 100; c.settings.volume.fldoc4 = 100; c.settings.volume.gl = 100; isSaveForced = true; }
    if(currentVerID < 22){ /* β0.3.4以前 */ c.settings.volume.eewL = [ c.settings.volume.eewL, c.settings.volume.eewL, c.settings.volume.eewL ] }
  }

  if(c.app.newUser) isSaveForced = true;
  document.getElementById('message1').value = c.mode0.main[0];
  document.getElementById('message2').value = c.mode0.main[1];
  document.getElementById('message3').value = c.mode0.main[2];
  document.getElementById('message4').value = c.mode0.main[3];
  document.getElementById('message5').value = c.mode0.main[4];
  document.getElementById('title1').value = c.mode0.title[0];
  document.getElementById('title2').value = c.mode0.title[1];
  document.getElementById('title3').value = c.mode0.title[2];
  document.getElementById('title4').value = c.mode0.title[3];
  document.getElementById('title5').value = c.mode0.title[4];
  document.getElementById('BNtitle').value = c.mode3[0];
  document.getElementById('BNtext1').value = c.mode3[1];
  document.getElementById('BNtext2').value = c.mode3[2];
  document.getElementsByName('recordingwheneewreceived')[0].checked = c.settings.autorecord;
  document.getElementById('isSoraview').checked = c.settings.soraview;
  document.getElementById('setClipEEW').checked = c.settings.clipboard.eew;
  document.getElementById('setClipQuake').checked = c.settings.clipboard.quake;
  document.getElementById('setIntervalIedred').value = c.settings.interval.iedred7584EEW;
  document.getElementById('setIntervalNHKquake').value = c.settings.interval.nhkQuake;
  document.getElementById('setIntervalJmaWt').value = c.settings.interval.jmaDevFeed;
  document.getElementById('setIntervalTenkiJpTsu').value = c.settings.interval.tenkiJPtsunami;
  document.getElementById('setIntervalWNImscale').value = c.settings.interval.wniMScale;
  document.getElementById('setIntervalWNIsorabtn').value = c.settings.interval.wniSorabtn;
  document.getElementById('setIntervalWNIriver').value = c.settings.interval.wniRiver;
  document.getElementById('setIntervalWNItm').value = c.settings.interval.wniliveTimeTable;
  document.getElementById('setIntervalTpcBlackOut').value = c.settings.interval.tepcoTeiden;
  document.getElementById('volEEWl1').value = c.settings.volume.eewL[0];
  document.getElementById('volEEWl5').value = c.settings.volume.eewL[1];
  document.getElementById('volEEWl9').value = c.settings.volume.eewL[2];
  document.getElementById('volEEWh').value = c.settings.volume.eewH;
  document.getElementById('volEEWc').value = c.settings.volume.eewC;
  document.getElementById('volEEWp').value = c.settings.volume?.eewP ?? 100;
  document.getElementById('volGL').value = c.settings.volume.gl;
  document.getElementById('volNtc').value = c.settings.volume.ntc;
  document.getElementById('volSpW').value = c.settings.volume.spW;
  document.getElementById('volTnm').value = c.settings.volume.tnm;
  document.getElementById('volHvRa').value = c.settings.volume?.hvra ?? 100;
  document.getElementById('volFldOc5').value = c.settings.volume?.fldoc5 ?? 100;
  document.getElementById('volFldOc4').value = c.settings.volume?.fldoc4 ?? 100;
  document.getElementsByName("themeColors")[0].value = c.settings?.theme?.color ?? 0;
  if(c.settings.volume.quake){
    c.settings.volume.quake.forEach((item, i) => {
      document.getElementsByClassName("sound_quake_volume")[i].value = item.volume;
      document.getElementsByClassName("sound_quake_type")[i].setAttribute("data-type", item.type);
    });
  }
  colorThemeMode = c.settings?.theme?.color ?? 0;
  if(isSaveForced) savedata();
  audioAPI.gainNode.gain.value = c.settings.volume.eewH / 100;
  isSoraview = c.settings.soraview;
  document.addEventListener("DOMContentLoaded", () => {
    // console.log("DOMContentLoaded");
    goMessage();
  });
});
function savedata(){
  let data = {
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
      autorecord: document.getElementsByName('recordingwheneewreceived')[0].checked,
      fixitem: [
        document.getElementsByName('scrollfix')[0].checked,
        document.getElementsByName('scrollfix')[1].checked,
        document.getElementsByName('scrollfix')[2].checked,
        document.getElementsByName('scrollfix')[3].checked,
        document.getElementsByName('scrollfix')[4].checked
      ],
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
        tenkiJPtsunami: document.getElementById("setIntervalTenkiJpTsu").valueAsNumber,
        wniMScale: elements.id.setIntervalWNImscale.valueAsNumber,
        wniSorabtn: elements.id.setIntervalWNIsorabtn.valueAsNumber,
        wniRiver: elements.id.setIntervalWNIriver.valueAsNumber,
        wniliveTimeTable: elements.id.setIntervalWNItm.valueAsNumber,
        tepcoTeiden: elements.id.setIntervalTpcBlackOut.valueAsNumber
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
      theme: {
        color: document.getElementsByName("themeColors")[0].value
      },
      style: 0
    },
    app:{
      lastVer: _appVersionView,
      newUser: false
    }
  };
  elements.class.sound_quake_volume.forEach((volume, i) => {
    const type = elements.class.sound_quake_type[i];
    data.settings.volume.quake.push({
      volume: volume.value-0,
      type: type.getAttribute("data-type")
    });
  });
  chrome.storage.sync.set(data, function(){/* console.log("Data recorded.", data)*/});
}
var saveinttime = setInterval(savedata, 60000);

// onload
document.addEventListener("DOMContentLoaded", function(){
  document.getElementsByName("goMessage")[0].addEventListener('click', function(){
    goMessage();
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
  document.getElementsByName("tmp-btn")[0].addEventListener('click', function(){quakeTemplateView(1); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementsByName("tmp-btn")[1].addEventListener('click', function(){quakeTemplateView(2); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementsByName("tmp-btn")[2].addEventListener('click', function(){quakeTemplateView(3); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementsByName("tmp-btn")[3].addEventListener('click', function(){quakeTemplateView(4); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementsByName("tmp-btn")[4].addEventListener('click', function(){quakeTemplateView(5); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementsByName("tmp-btn")[5].addEventListener('click', function(){quakeTemplateView(6); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementsByName("tmp-btn")[6].addEventListener('click', function(){quakeTemplateView(7); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementsByName("tmp-btn")[7].addEventListener('click', function(){quakeTemplateView(8); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementsByName("tmp-btn")[8].addEventListener('click', function(){quakeTemplateView(9); SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});
  document.getElementById("speedVal").addEventListener('input', function(){document.getElementById("speedResult").value = (speed = document.getElementById("speedVal").value-0).toFixed(1);});
  document.getElementById("volumeChanger").addEventListener( 'input', function(){document.getElementById("videovolume").value = document.getElementById("videovolrange").value; document.getElementById('v').volume = document.getElementById("videovolrange").value});
  document.getElementsByName("BreakingNewsView")[0].addEventListener('click', function(){BNref()});
  document.getElementsByName("wtWarnListView")[0].addEventListener('click', function(){viewWeatherWarningList();});
  document.getElementsByName("sorabtn")[0].addEventListener('click', function(){sorabtn_view()});
  document.getElementsByName("sorabtn")[1].addEventListener('click', function(){sorabtn_open()});
  document.getElementsByName("sorabtn")[2].addEventListener('click', function(){sorabtn_close()});
  document.getElementById("isSoraview").addEventListener('click', function(){isSoraview = document.getElementById('isSoraview').checked});
  document.getElementsByName("videoChange")[0].addEventListener('click', function(){movieChange()});
  document.getElementsByName("videostart")[0].addEventListener('click', function(){movie(0)});
  document.getElementsByName("videostop")[0].addEventListener('click', function(){movie(1)});
  document.getElementsByName("videoreset")[0].addEventListener('click', function(){movie(2)});
  document.getElementsByName("videoview")[0].addEventListener('click', function(){mode=4});
  document.getElementsByName("videomuteChange")[0].addEventListener('click', function(){document.getElementById('v').volume!=0?document.getElementById('v').volume=0:document.getElementById('v').volume=1;});
  document.getElementById("stopWarnAudio").addEventListener('click', function(){audioAPI.fun.stopOscillator()});
  document.getElementById("startEEWfcstTest").addEventListener('click', function(){
    testNow = true;
    RequestURL.iedred7584_eew = "../data/sample/normal.json";
    eewOffset = 1661471326 - Math.floor(getAdjustedDate() / 1000);
  });
  document.getElementById("startEEWwarnTest").addEventListener('click', function(){
    testNow = true;
    RequestURL.iedred7584_eew = "../data/sample/warning.json";
    eewOffset = 1642781328 - Math.floor(getAdjustedDate() / 1000);
  });
  document.getElementById("startEEWcancelTest").addEventListener('click', function(){
    testNow = true;
    RequestURL.iedred7584_eew = "../data/sample/cancel.json";
  });
  document.getElementById("stopEEWtest").addEventListener('click', function(){
    testNow = false; SetMode(0);
    RequestURL.iedred7584_eew = "https://api.iedred7584.com/eew/json/";
    eewOffset = NaN;
  });
  chrome.tabs.getCurrent((cb)=>{
    chrome.windows.update(cb.windowId, {
      width: Math.floor(1240*window.outerWidth/window.innerWidth)
    });
  });
  // background_send("ZoomInformation["+Math.round(window.outerWidth/window.innerWidth*100)/100+"]");
  document.getElementById("ChangeToEq").addEventListener('click', function (){SetMode(2); textOffsetX = 1200; language = "Ja"; timeCount = 217;});

  document.getElementById("speech-vol-input").addEventListener("input", function (event){ elements.id.speechVolView.textContent = (100 * (speechBase.volume = event.target.valueAsNumber)).toFixed() + "%"; });
  document.getElementById("speech-test1").addEventListener("click", function (){ speechBase.start([{ type: "path", speakerId: "speaker8", path: "eew.epicenter.long.011" }, { type: "path", speakerId: "speaker8", path: "eew.ungrouped.4" }, { type: "path", speakerId: "speaker8", path: "common.magnitude.1" }]); });

  document.getElementById("dataSaver").addEventListener('click', function (){savedata()});
  document.getElementById("unitsReflect").addEventListener('click', function (){rain_windData(1)});
  document.getElementsByName("themeColors")[0].addEventListener('change', function (){ colorThemeMode = Number(document.getElementsByName("themeColors")[0].value); if(mode === 0){ Routines.md0title(); }; Routines.subCanvasTime(getAdjustedDate()); });
  document.getElementById('setIntervalIedred').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
  document.getElementById('setIntervalNHKquake').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
  document.getElementById('setIntervalJmaWt').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
  document.getElementById('setIntervalTenkiJpTsu').addEventListener("input", function (event){let tg = event.target; if ((tg.min-0) > tg.valueAsNumber && tg.min){ tg.value = tg.min; } if ((tg.max-0) < tg.valueAsNumber && tg.max){ tg.value = tg.max; }});
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
    SFXController.volume(sounds.tsunami.Watch, volume);
    SFXController.volume(sounds.tsunami.Notice, volume);
    SFXController.volume(sounds.tsunami.Warning, volume);
    SFXController.volume(sounds.tsunami.Majorwarning, volume);
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
  document.getElementById('voltestTnm').addEventListener("click", function(){SFXController.play(sounds.tsunami[["Watch","Warning","Notice","Majorwarning"][Math.floor(Math.random()*4)]]); });
  document.getElementById('voltestHvRa').addEventListener("click", function(){ SFXController.play(sounds.warning.HeavyRain); });
  document.getElementById('voltestFldOc5').addEventListener("click", function(){ SFXController.play(sounds.warning.Flood5); });
  document.getElementById('voltestFldOc4').addEventListener("click", function(){ SFXController.play(sounds.warning.Flood4); });

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
      for (let item of backMsc){
        let bufferSource = item.bufferSource;
        let gainNode = item.gainNode;
        let context = item.context;
        gainNode.gain.value = 0;
        gainNode.disconnect();
        context.close();
        bufferSource.stop();
        bufferSource.disconnect();
      }
      backMsc = [];
      let text = "";
      for(let i=0; i<e.target.files.length; i++){
        text += `<div class="rel a"><div class="abs b"><div class="background"><div class="abs bg"style="background-color:#0000008c;"></div><div class="abs bg"style="background-color:#fff2;"></div></div></div><div style="width:72px;"><button class="abs c musicpause musichide"data-index="${i}"style="left:45px;"><svg viewBox="0 0 16 16"data-index="${i}"><path d="M0,0 L0,16 L5.5,16 L5.5,0 M10.5,0 L10.5,16 L16,16 L16,0" fill="white"data-index="${i}"></path></svg></button><button class="abs c musicstart musicactive"data-index="${i}"style="left:45px;"><svg viewBox="0 0 16 16"data-index="${i}"><path d="M0,0 L0,16 L16,8" fill="white"data-index="${i}"></path></svg></button></div><div class="abs d"><div class="musicCurrentTime abs e"role="text">--:--</div><div class="musicDurationOrLeft abs"data-type="duration"role="text">--:--</div><div class="rel f"><div class="abs g"><div class="musicLoaded abs i j"style="left:0;width:100%;"></div><div class="musicPlayed abs i k"style="left:0;width:21.5px;"></div><div class="musicNoLoad abs i l"style="right:0%;left:21.5px;"></div><div class="musicCurPos abs h"></div></div><input class="musicrange m"data-index="${i}"type="range"min="0"max="1"step="0.001"></div></div><div class="musicButtomContainer rel"><div class="abs"><div class="musicRepeat"><input class="abs BGMrepeatingStart"min="0"data-index="${i}"type="number"><text class="abs n">秒〜</text><input class="abs BGMrepeatingStop"data-index="${i}"type="number"><text class="abs o">秒が</text><select class="abs BGMrepeats"data-index="${i}"><option value=0>何もない</option><option value=1>繰り返す</option></select></div><input class="abs musicVol"data-index="${i}"type="range"min="0"max="200"step="1"value="100"><text class="abs BGMvolOutput">100%</text></div></div><div class="abs musicInfos"style="top:0;left:585px;"><text>ファイル名：</text><br><text class="musicFileName"></text></div></div>`;
      }
      document.getElementById("audiolist").innerHTML = text;
    }
    for (let i=0; i<e.target.files.length; i++){
      let reader = new FileReader();
      console.log(e.target.files[i]);
      reader.fileName = e.target.files[i].name;
      reader.addEventListener("load", function(){
        console.log(this.fileName);
        let index = backMsc.push({}) - 1;
        document.querySelectorAll(".musicFileName")[index].innerText = this.fileName;
        backMsc[index] = {};
        backMsc[index].context = new AudioContext();
        backMsc[index].gainNode = backMsc[index].context.createGain();
        backMsc[index].bufferSource = backMsc[index].context.createBufferSource();
        backMsc[index].context.mIndex = index;
        backMsc[index].gainNode.mIndex = index;
        backMsc[index].bufferSource.mIndex = index;
        backMsc[index].bufferSource.createdAt = new Date();
        backMsc[index].context.decodeAudioData(this.result, function(buffer){
          // debugger;
          backMsc[index].bufferSource.buffer = buffer;
          backMsc[index].bufferSource.playbackRate.value = 1;
          backMsc[index].bufferSource.connect(backMsc[index].gainNode).connect(backMsc[index].context.destination);
          backMsc[index].startedAt = 0;
          backMsc[index].pausedAt = 0;
          backMsc[index].lastUpdate = 0;
          backMsc[index].playing = false;
          backMsc[index].play = function(start = 0){
            if(this.pausedAt >= this.bufferSource.buffer.duration) this.pausedAt = 0;
            this.bufferSource.start(0, this.pausedAt);
            this.startedAt = this.context.currentTime - this.pausedAt - start;
            this.pausedAt = 0;
            this.playing = true;
            if(this.onStateChange) this.onStateChange(true, this.context.mIndex);
          };
          backMsc[index].bufferEnd = function(event){
            let musicIndex = event.target.context.mIndex;
            let parent = backMsc[musicIndex];
            let bufferSource = parent.bufferSource;
            let gainNode = parent.gainNode;
            let context = parent.context;
            let buffer = bufferSource.buffer;
            let detune = bufferSource.detune.value;
            let playbackRate = bufferSource.playbackRate.value;
            parent.pausedAt = context.currentTime - parent.startedAt;
            bufferSource.disconnect();
            bufferSource.stop();
            parent.playing = false;
            parent.bufferSource = context.createBufferSource();
            bufferSource = parent.bufferSource;
            bufferSource.connect(gainNode);
            bufferSource.buffer = buffer;
            bufferSource.detune.value = detune;
            bufferSource.playbackRate.value = playbackRate;
            bufferSource.mIndex = musicIndex;
            bufferSource.createdAt = new Date();
            bufferSource.onended = parent.bufferEnd;
            if(parent.onStateChange) parent.onStateChange(false, musicIndex);
          };
          //aaaaaa
          backMsc[index].storage = {
            loop: {
              effective: false,
              start: 0,
              end: 0
            },
            musicDurationOrLeft: {
              string: "",
              element: document.getElementsByClassName("musicDurationOrLeft")[index]
            },
            musicCurrentTime: {
              string: "",
              element: document.getElementsByClassName("musicCurrentTime")[index]
            },
            musicLoadedWidth: {
              number: 21.5,
              playedElement: document.getElementsByClassName("musicPlayed")[index],
              noloadElement: document.getElementsByClassName("musicNoLoad")[index],
              curposElement: document.getElementsByClassName("musicCurPos")[index]
            }
          };
          backMsc[index].bufferSource.onended = backMsc[index].bufferEnd;
          Object.defineProperty(backMsc[index], "currentTime", { get: function(){
            if(this.playing){
              return this.context.currentTime - this.startedAt;
            } else {
              return this.pausedAt;
            }
          }, set: function(seconds){
            if(backMsc[index].playing){
              this.bufferSource.stop();
              this.play(seconds);
            } else {
              this.pausedAt = seconds;
            }
          }});
          backMsc[index].onStateChange = function(state, index){
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
          document.querySelectorAll(".musicstart")[index].addEventListener("click", function(event){
            let index = Number(event.target.getAttribute("data-index"));
            console.log(event, index);
            backMsc[index].bufferSource.loop = backMsc[index].storage.loop.effective;
            backMsc[index].bufferSource.loopStart = backMsc[index].storage.loop.start;
            backMsc[index].bufferSource.loopEnd = backMsc[index].storage.loop.end;
            backMsc[index].play();
          });
          document.querySelectorAll(".musicpause")[index].addEventListener("click", function(event){
            let index = Number(event.target.getAttribute("data-index"));
            backMsc[index].bufferSource.stop();
          });
          document.querySelectorAll(".BGMrepeats")[index].addEventListener("change", function(event){
            let index = Number(event.target.getAttribute("data-index"));
            backMsc[index].storage.loop.effective = backMsc[index].bufferSource.loop = event.target.value == "1";
          });
          document.querySelectorAll(".BGMrepeatingStart")[index].addEventListener("change", function(event){
            let index = Number(event.target.getAttribute("data-index"));
            backMsc[index].storage.loop.start = backMsc[index].bufferSource.loopStart = event.target.valueAsNumber;
          });
          document.querySelectorAll(".BGMrepeatingStop")[index].addEventListener("change", function(event){
            let index = Number(event.target.getAttribute("data-index"));
            backMsc[index].storage.loop.end = backMsc[index].bufferSource.loopEnd = event.target.valueAsNumber;
          });
          document.querySelectorAll(".musicVol")[index].addEventListener("input", function(event){
            let index = Number(event.target.getAttribute("data-index"));
            backMsc[index].gainNode.gain.value = event.target.value / 100;
            document.querySelectorAll(".BGMvolOutput")[index].textContent = event.target.value + "%";
          });
          document.querySelectorAll(".musicLoaded")[index].addEventListener("input", function(event){
            let index = Number(event.target.getAttribute("data-index"));
            backMsc[index].gainNode.gain.value = event.target.value;
            document.querySelectorAll(".BGMvolOutput")[index].textContent = backMsc[index].gainNode.gain.value;
          });
        });
      });
      reader.readAsArrayBuffer(e.target.files[i]);
    }
  });
  document.getElementsByName("recordingstart")[0].addEventListener('click', function(){recorderObject.start()});
  document.getElementsByName("recordingstop")[0].addEventListener('click', function(){recorderObject.stop()});
  document.getElementsByName("recordingreset")[0].addEventListener('click', function(){$('#download_movie').html('')});
}, false);

// speech
var isSpeechSynthesis = ('speechSynthesis' in window) ? true : false,
    speech,
    speakInterval;

function bit(number, bitL){
  return number&(2**bitL)&&1;
}
function toRad(deg){
  return deg*(Math.PI/180);
}
function stringRepeat(times, string) {
  var resultText = "";
  for(var i=0; i<times; i++){
    resultText += string;
  }
  return resultText;
}

// speech
function speak(text, voice, rate, pitch, volume, type){
  if(isSpeechSynthesis){
    if(type){
      speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.voice = speechSynthesis.getVoices()[voice];
      speech.rate = rate;
      speech.pitch = pitch;
      speech.volume = volume;
      speechSynthesis.speak(speech);
    } else {
      speechSynthesis.cancel();
    }
  }
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

//document.getElementById('navigator').innerHTML = 'navigator.language = '+navigator.language+'<br>navigator.playform = '+navigator.platform+'<br>navigator.product = '+navigator.product+'<br>navigator.productSub = '+navigator.productSub+'<br>navigator.vendor = '+navigator.vendor+'<br>navigator.userAgent = '+navigator.userAgent;

context.fillStyle = "#999";
context.fillRect(0, 0, 1080, 128);
context.fillStyle = "#fff";
context.font = "bold 70px Arial";
context.fillText("Loading earthquake information stations...", 5, 100, 1070);

// position list
$.ajax({
    type: 'GET',
    url: '../data/stations_20210309.min.json',
    dataType: 'json',
    async: false,
    cache: true,
    success: function(data){
      allcitydata = data;
      for(i = 0; i < allcitydata['items']['quake'].length; i++){
        allcity.push(allcitydata['items']['quake'][i]['city']['name']);
        allprefecture.push(allcitydata['items']['quake'][i]['prefecture']['name']);
        allcitykana.push(allcitydata['items']['quake'][i]['city']['kana']);
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      if(XMLHttpRequest.status === 0){

      }
    }
});

if(q_magnitude !== "--"){
  mainText[0] = q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。　震源は"+q_epiName+"、地震の規模を示すマグニチュードは"+q_magnitude;
  if(q_depth == "ごく浅い"){
    mainText[0] += "、震源は"+q_depth+"です。";
  } else {
    mainText[0] += "、震源の深さは"+q_depth+"kmです。";
  }
} else {
  mainText[0] = "<<震度速報>> "+q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 "+multilingual[0][63]+"　　　　　　　The earthquake has occurred at "+q_timeH+":"+q_timeM+".  This earthquake resulted in "+nhkSiList[msi]+" of the maximum seismic intensity recorded.  "+multilingual[1][63];
}

/*if(window.Notification){
  if(Notification.permission === "denied"){
    Notification.requestPermission(function(result){
      console.log("Notification.requestPermission(): "+result);
    });
  }
}*/

context.fillStyle = "#999";
context.fillRect(0, 0, 1080, 128);
context.fillStyle = "#fff";
context.font = "bold 70px Arial";
context.fillText("Loading updating logs...", 5, 100, 1070);

var tOffset = 0;
$(function(){
  $.ajax({
    type: 'GET',
    url: 'https://api.p2pquake.net/v2/jma/tsunami?limit=1&offset=' + tOffset,
    dataType: 'json',
    timeout: 3000,
    async: false,
    cache: false,
    success: function(data){
      t_lastId = data[0]['id'];
      t_Cancelled = data[0]['cancelled'];
    }
  });
});

fetch("https://script.google.com/macros/s/AKfycbyiKW-RWvZyeQC59RvDpBidR151sohEnzwESP2UewGk0BgDhcwh1M2Jw52chC8NJh-Y/exec?type=updChk&usVer="+_appVersionView).then(res => res.json()).then(json => {
  eewRequestType = json.eewRequestType;
  systemTimeLag = json.currentTime - Date.now();
  const verlist = [];
  for (const ver of json.beta.list) {
    verlist.push(ver.name);
  }
  const current = verlist.indexOf(_appVersionView);
  if (current > 0){
    chrome.windows.create({
      url: "updateNotice.html?txt="+encodeURIComponent(json.beta.list[0].string)+"&app="+encodeURIComponent(_appVersionView)+"&new="+encodeURIComponent(json.beta.list[0].name)+"&url="+encodeURIComponent(json.beta.list[0].jumpto),
      type: "popup",
      height: 300,
      width: 400
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
    ws_client.addEventListener("error", () => { reject(new Error("No servers reachable.")); });
    ws_client.addEventListener("close", () => { setTimeout(() => { ws_establishConnection(); console.info("User WebSocket: Closed."); }, 10000); });
  });
}

context.fillStyle = "#999";
context.fillRect(0, 0, 1080, 128);
context.fillStyle = "#fff";
context.font = "bold 70px Arial";
context.fillText("Loading river observation points...", 5, 100, 1070);
console.info("Loading river observation points...");

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

context.fillStyle = "#999";
context.fillRect(0, 0, 1080, 128);
context.fillStyle = "#fff";
context.font = "bold 70px Arial";
context.fillText("Loading AMeDAS observation points...", 5, 100, 1070);
console.info("Loading AMeDAS observation points...");

var amedasStationTable = null;
{
  const ConvertDate = obj => `${obj.getUTCFullYear()}${((obj.getUTCMonth()+1)+"").padStart(2,"0")}${(obj.getUTCDate()+"").padStart(2,"0")}${(obj.getUTCHours()+"").padStart(2,"0")}${(obj.getUTCMinutes()+"").padStart(2,"0")}`;
  let loadAmedasStations = new XMLHttpRequest();
  loadAmedasStations.addEventListener("load", function(){
    let json = JSON.parse(this.response);
    for(let id in json){
      let target = json[id];
      let elems = target.elems;
      target.validTemp = elems[0]!=="0";
      target.validPrec = elems[1]!=="0";
      target.validWind = elems[2]!=="0";
      target.validSun = elems[3]!=="0";
      target.isSunEstimamtion = elems[3]==="2";
      target.validSnow = elems[4]!=="0";
      target.validHumidity = elems[5]!=="0";
      target.validPressure = elems[6]!=="0";
    }
    amedasStationTable = json;
  });
  loadAmedasStations.addEventListener("error", function(){
    console.error("アメダス地点情報を読み込むことが出来ませんでした。");
  });
  loadAmedasStations.open("GET", "https://www.jma.go.jp/bosai/amedas/const/amedastable.json?__time__="+ConvertDate(new Date()), false);
  loadAmedasStations.send();
}

context.fillStyle = "#999";
context.fillRect(0, 0, 1080, 128);
context.fillStyle = "#fff";
context.font = "bold 70px Arial";
context.fillText("Loading AMeDAS observation points...", 5, 100, 1070);
console.info("Please wait for preparing...");

function goMessage(){
  document.getElementsByClassName("Ntext")[Nnum].style.background = "white";
  Nnum = 0;
  document.getElementsByClassName("Ntext")[0].style.background = "yellow";
  textOffsetX = 1200;
  SetMode(0);
  DText[5] = document.getElementById('title1').value;
  DText[6] = document.getElementById('title2').value;
  DText[7] = document.getElementById('title3').value;
  DText[8] = document.getElementById('title4').value;
  DText[9] = document.getElementById('title5').value;
  DText[0] = document.getElementById('message1').value;
  DText[1] = document.getElementById('message2').value;
  DText[2] = document.getElementById('message3').value;
  DText[3] = document.getElementById('message4').value;
  DText[4] = document.getElementById('message5').value;
  Dcnt = 0;
  for (let i = 0; i < 5; i++) {
    if(DText[i] !== ""){
      Dcnt++;
    }
  }
  for (let i = 0; i < 5; i++) {
    Dcommand[i] = 0;
    if(DText[i] == "<weather/temperature/high>") Dcommand[i] = 1;
    if(DText[i] == "<weather/temperature/low>") Dcommand[i] = 2;
    if(DText[i] == "<weather/temperature/current>") Dcommand[i] = 3;
    if(DText[i] == "<weather/rain_rank/1h>") Dcommand[i] = 4;
    if(DText[i] == "<weather/rain_rank/1d>") Dcommand[i] = 5;
    if(DText[i] == "<weather/wind_rank>") Dcommand[i] = 6;
    if(DText[i] == "<weather/rain/10m>") Dcommand[i] = 10;
    if(DText[i] == "<weather/rain/1h>") Dcommand[i] = 11;
    if(DText[i] == "<weather/rain/3h>") Dcommand[i] = 12;
    if(DText[i] == "<weather/rain/24h>") Dcommand[i] = 13;
    if(DText[i] == "<weather/humidity>") Dcommand[i] = 17;
    if(DText[i] == "<weather/wind>") Dcommand[i] = 20;
    // if(DText[i] == "<weather/dust>") Dcommand[i] = 21; // 最大瞬間風速
    if(DText[i] == "<weather/sun1h>") Dcommand[i] = 28; // 日照時間
    if(DText[i] == "<weather/snow/height>") Dcommand[i] = 30; // 積雪
    if(DText[i] == "<weather/snow/1h>") Dcommand[i] = 35; // 降雪量
    if(DText[i] == "<weather/snow/6h>") Dcommand[i] = 36; // 降雪量
    if(DText[i] == "<weather/snow/12h>") Dcommand[i] = 37; // 降雪量
    if(DText[i] == "<weather/snow/24h>") Dcommand[i] = 38; // 降雪量
    if(DText[i] == "<weather/pressure>") Dcommand[i] = 40; // 降雪量
    if(DText[i] == "<weather/river>") Dcommand[i] = 100;
    if(DText[i] == "<bousai/evacuation>") Dcommand[i] = 300;
    if(DText[i] == "<bousai/evacuation/emergency>") Dcommand[i] = 302;
    if(DText[i] == "<weathernews/live/timetable>") Dcommand[i] = 999;
    if(DText[i] == "<tsunami>") Dcommand[i] = 1000; // 廃止？
    if(DText[i] == "<teiden::東京電力>") Dcommand[i] = 2000;
  }
  if(!Dcnt){
    Dcnt = 1;
  }
  // if(breakingtime == -2){
    BNtitle.shift();
    BNtext1.shift();
    BNtext2.shift();
    breakingtime = 0;
  // }
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
$('#menu .icon').on('click', function(){
  $('#menu .box').toggleClass('activeSettings');
});
$('#menu .eiList').hide();
$('#menu .eiwind').hide();
$('#menu .eiTitle').hide();
$('#menu .tsunamiList').hide();
$('#menu .dataList').hide();
$('#menu .setMenu').hide();
$('.box button').eq(0).on('click', function(){
  $('#menu .eiList').animate({height:'toggle'}, 120);
  $('#menu .eiwind').toggle(200);
  $('#menu .eiTitle').toggle(200);
  $('#menu .tsunamiList').hide(200);
  $('#menu .dataList').hide(200);
  $('#menu .setMenu').hide(200);
  document.getElementById("eiTitle").innerText = "[地震情報](" + q_timeYY + "/" + q_timeMM + "/" + q_timeDD + " " + q_timeH + ":" + q_timeM + "頃発生) 震源地:" + q_epiName + " 最大震度:" + siList[msi] + " M" + q_magnitude + " 深さ:" + ((q_depth == "ごく浅い")?q_depth:"約"+q_depth+"km");
  document.getElementById("eiwind").innerText = "";
  if(msi==-1){
    document.getElementById("eiTitle").innerText = "まだ情報は入っていません。";
    document.getElementById("eiwind").innerText = "";
  } else {
    for(var i=10; i>0; i--){
      if(mainText[i] != ""){
        document.getElementById("eiwind").innerText += "［震度" + toFull(siList[i]) + "］\n　" + ( q_magnitude!='--' ? (mainText[i].replace(/　 </g, '\n　').slice(1)) : (mainText[i].replace(/　 </g, '\n　')) ).replace(/> /g, '：') + "\n";
      }
    }
  }
});
$('.box button').eq(1).on('click', function(){
  $('#menu .eiList').animate({height:'hide'}, 200);
  $('#menu .eiwind').hide(200);
  $('#menu .eiTitle').hide(200);
  $('#menu .tsunamiList').toggle(200);
  $('#menu .dataList').hide(200);
  $('#menu .setMenu').hide(200);
  if(t_Cancelled === true){
    document.getElementById("tsunamiList").innerText = "津波の情報はまだ入っていません。\nThere is no information yet.";
  }
});
$('.box button').eq(2).on('click', function(){
  $('#menu .eiList').animate({height:'hide'}, 200);
  $('#menu .eiwind').hide(200);
  $('#menu .eiTitle').hide(200);
  $('#menu .tsunamiList').hide(200);
  $('#menu .dataList').toggle(200);
  $('#menu .setMenu').hide(200);
});
$('.box button').eq(3).on('click', function(){
  $('#menu .eiList').animate({height:'hide'}, 200);
  $('#menu .eiwind').hide(200);
  $('#menu .eiTitle').hide(200);
  $('#menu .tsunamiList').hide(200);
  $('#menu .dataList').hide(200);
  $('#menu .setMenu').toggle(200);
});
//$('#menu .setMenu #stab').on('click', function(){$('#menu .setMenu #smain .menu').hide()});
$('#menu .setMenu #stab .stab').eq(0).on('click', function(){$('#menu .setMenu #smain .menu').hide();$('#menu .setMenu #smain .menu').eq(0).show()});
$('#menu .setMenu #stab .stab').eq(1).on('click', function(){$('#menu .setMenu #smain .menu').hide();$('#menu .setMenu #smain .menu').eq(1).show()});
$('#menu .setMenu #stab .stab').eq(2).on('click', function(){$('#menu .setMenu #smain .menu').hide();$('#menu .setMenu #smain .menu').eq(2).show()});
$('#menu .setMenu #stab .stab').eq(3).on('click', function(){$('#menu .setMenu #smain .menu').hide();$('#menu .setMenu #smain .menu').eq(3).show()});
$('#menu .setMenu #stab .stab').eq(4).on('click', function(){$('#menu .setMenu #smain .menu').hide();$('#menu .setMenu #smain .menu').eq(4).show()});
$('#tabop-p').on('click', function(){for(var i=0; i<5; i++){forEach2(document.getElementsByClassName('wpl'+i), function(a){a.checked = true})}});
$('#tabop-m').on('click', function(){for(var i=0; i<5; i++){forEach2(document.getElementsByClassName('wpl'+i), function(a){a.checked = false})}});
/*$('.eiwind').funcResizeBox({
    minWidth: 210,
    maxWidth: 400,
    isWidthResize: true,
    isHeightResize: false,
    mouseRange: 5
});
$('.eiTitle').funcResizeBox({
    minWidth: 210,
    maxWidth: 400,
    isWidthResize: true,
    isHeightResize: false,
    mouseRange: 5
});*/

//datagetting();
function drawRect(x, y, width, height, color){
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}
function ExRandom(min, max){
  return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}
function BNref(){
  BNtitle = [];
  BNtext1 = [];
  BNtext2 = [];
  BNtitle[0] = document.getElementById('BNtitle').value;
  BNtext1[0] = document.getElementById('BNtext1').value;
  BNtext2[0] = document.getElementById('BNtext2').value;
  SetMode(3);
  textOffsetX = 0;
  breakingtime = -2;
}

var keyWord = "";
var quake = {reportId:"",year:"",month:"",date:"",hour:"",minute:"",second:"",longitude:"",latitude:"",depth:"",magnitude:"",isAlert:false,epicenter:""};
document.onkeydown = keydown;
var aieuo = 0; // 謎変数
var videoInterval;
function keydown(){
  if(document.body.classList.contains("fullview") && (event.code === "KeyQ" || event.code === "Escape")){
    document.getElementsByClassName("canvas-container")[0].classList.remove("fullview");
    document.body.classList.remove("fullview");
    chrome.tabs.getCurrent((cb)=>{
      chrome.windows.update(cb.windowId, {
        width: Math.floor(1240*window.outerWidth/window.innerWidth),
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
  if(BNtitle.length){
    elements.class.wtWarnListMsg[0].textContent = BNtitle.length+"個の表示待機中の気象情報があります（残り"+breakingtime+"フレームで終了）";
    for(let i=0; i<BNtitle.length; i++){
      let div1 = document.createElement("div");
      div1.textContent = BNtitle[i];
      let td1 = document.createElement("td");
      td1.appendChild(div1);
      td1.className = "title";
      let div2 = document.createElement("div");
      div2.textContent = BNtext1[i];
      let td2 = document.createElement("td");
      td2.appendChild(div2);
      td2.className = "subtitle";
      let div3 = document.createElement("div");
      div3.textContent = BNtext2[i];
      let td3 = document.createElement("td");
      td3.appendChild(div3);
      td3.className = "maintext";
      let tr = document.createElement("tr");
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      elements.id.wtWarnTableBody.appendChild(tr);
    }
  } else {
    elements.class.wtWarnListMsg[0].textContent = "表示待機中の気象情報はありません";
  }
}

const SetMode = (int, lastInt) => {
  mode = int;
  if(int !== 1){
    if(audioAPI.oscillatorNode.starting) audioAPI.fun.stopOscillator();
    speechBase.userSpace.isEewMode = false;
  }
  if(int === 0){ Routines.isDrawNormalTitle = true; BNtitle.shift(); BNtext1.shift(); BNtext2.shift(); breakingtime = 0; }
  if(int === 3){ Routines.md3title(); }
};
const SetMscale = (int, lastInt) => {
  mscale = int;
  if(mode === 0){ Routines.md0title(); }
};


Object.defineProperty(Number.prototype, "byteToString", {
  writable: false,
  value: function(){
    let byte = BigInt(this);
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
      [1237940039285380274899124224, 0n]
    ];
    let out = "";
    for(let item of table){
      if(byte >= item[0]){
        out = (Number(byte*1000n/item[0])/1000).toFixed(3)+" "+item[2];
      } else {
        break;
      }
    }
    return out;
  }
});
BigInt.prototype.byteToString = Number.prototype.byteToString;

var Routines = {
  memory: {
    lastTime: ""
  },
  previousCPU: undefined,
  isDrawNormalTitle: true,
  isClockFontLoaded: false,
  judgeIsClockFontLoaded: function (){
    if(window.Routines.isClockFontLoaded) return true;
    time.font = "bold 50px '7barSP'";
    return time.measureText("0123456789").width === 250;
  },
  subCanvasTime: function drawClock(targetTime){
    let timeString1=(" "+targetTime.getHours()+":"+("0" + targetTime.getMinutes()).slice(-2)).slice(-5);
    let timeString2=("0"+(targetTime.getFullYear()-2000)).slice(-2)+"-"+("0"+(targetTime.getMonth()+1)).slice(-2)+"-"+("0" + targetTime.getDate()).slice(-2);
    time.fillStyle = colorScheme[colorThemeMode][6][0];
    time.fillRect(0, 0, 128, 128);
    time.font = "bold 25px 'Tahoma'";
    time.fillStyle = colorScheme[colorThemeMode][6][1];
    time.fillText("Date", 5, 31);
    time.font = "bold 50px '7barSP'";
    time.fillStyle = colorScheme[colorThemeMode][6][2];
    time.fillStyle = colorScheme[colorThemeMode][6][3];
    time.fillText("88:88", 10, 108, 108);
    time.fillStyle = colorScheme[colorThemeMode][6][2];
    time.fillText(timeString1, 10, 108, 108);
    time.font = "bold 29px '7barSP'";
    time.fillStyle = colorScheme[colorThemeMode][6][3];
    time.fillText("88-88-88", 10, 63, 108);
    time.fillStyle = colorScheme[colorThemeMode][6][2];
    time.fillText(timeString2, 10, 63, 108);
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
    context.font = "bold 28px 'Microsoft Sans Serif', JPAPGothic";
    switch (Dcnt){
      case 5:
        context.fillStyle = mscale===1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
        context.fillText(DText[5 + (Nnum+4)%Dcnt], 895, 50, 185);
      case 4:
        context.fillStyle = mscale===1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
        context.fillText(DText[5 + (Nnum+3)%Dcnt], 685, 50, 185);
      case 3:
        context.fillStyle = mscale===1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
        context.fillText(DText[5 + (Nnum+2)%Dcnt], 475, 50, 185);
      case 2:
        context.fillStyle = mscale===1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
        context.fillText(DText[5 + (Nnum+1)%Dcnt], 265, 50, 185);
        break;
    }
    context.fillStyle = colorScheme[colorThemeMode][3][mscale];
    context.font = "bold 45px 'Microsoft Sans Serif', JPAPGothic";
    context.fillText(DText[5+Nnum], 10, 47, 250);
    context.restore();
  },
  md3title: function breakingNewsTitle(){
    context.fillStyle = colorScheme[colorThemeMode][1][mscale];
    context.fillRect(0, 0, 1080, 60);
    context.font = "bold 42px JPAPGothic, 'ヒラギノ角ゴ ProN', sans-serif";
    context.fillStyle = colorScheme[colorThemeMode][5][3][mscale];
    context.fillText(BNtitle[0], 35, 45, 1010);
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
    if(!mode && breakingtime>0) SetMode(3);
    if(mode !== 1) drawRect(0, 60, 1080, 68, colorScheme[colorThemeMode][5][0]);
    context.font = '40px '+customFonts.main;
    //context.font = '40px Arial, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
    //context.font = '40px "游ゴシック Medium","Yu Gothic Medium","游ゴシック体",YuGothic,sans-serif';
    //context.font = '40px "Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
    // let performDrawStartAt = performance.now() * 1000;
    let TextWidth;
    switch (mode) {
      case 0:
        TextWidth = -(strWidth(DText[Nnum])) - 200;
        break;
      default:
        TextWidth = strWidth(mainText[csi]) * -1;
        break;
    }
    let targetTime = getAdjustedDate();
    textOffsetX -= speed;
    if((q_startTime % Math.floor(elements.id.setIntervalNHKquake.valueAsNumber/20)) === 1) load_quake_list_v2();
    if((q_startTime % Math.floor(document.getElementById("setIntervalTenkiJpTsu").valueAsNumber/20)) === 1) loadTsunami();
    if((q_startTime % Math.floor(elements.id.setIntervalWNImscale.valueAsNumber/20)) === 1) XHRs.mscale.load();
    if((q_startTime % Math.floor(elements.id.setIntervalWNIsorabtn.valueAsNumber/20)) === 1) sorabtn();
    if((q_startTime % Math.floor(elements.id.setIntervalWNIriver.valueAsNumber/20)) === 1) XHRs.river.load();
    if((q_startTime % Math.floor(elements.id.setIntervalJMAfcst.valueAsNumber/20)) === 1) XHRs.getJMAforecast.load();
    if(q_startTime==4 || ((getFormattedDate(1).minute % 10)==0&&getFormattedDate(1).second==30&&t==0)) rain_windData((q_startTime===4)||(getFormattedDate(1).minute==0)),t=1;
    if(getFormattedDate(1).second === 50) t=0;
    if((q_startTime % Math.floor(elements.id.setIntervalJmaWt.valueAsNumber/20)) === 1) weatherInfo();
    if((q_startTime % Math.floor(elements.id.setIntervalWNItm.valueAsNumber/20)) === 1) XHRs.wnlTimetable.load();
    if((q_startTime % Math.floor(200)) == 1) humanReadable();
    if((q_startTime % Math.floor(elements.id.setIntervalTpcBlackOut.valueAsNumber/20)) === 1) XHRs.teideninfo.load();
    if((q_startTime % 9000) === 1) getAmedasData();
    if((q_startTime % 3000) === 1) getEvacuationData();
    if((q_startTime % 225) === 1){
      t_page++;
      if(tsunamiTexts.length <= t_page){
        t_page = -5;
        this.Routines.isDrawNormalTitle = true;
      }
    }
    let isMscale2 = mscale === 1 && colorThemeMode != 2;
    //if((startTime%50) == 1)jma_earthquake();
    //if((startTime%500) == 1){
      //if(document.getElementById("isNormalMes").checked)loadDText();
    //
    if((q_startTime % Math.floor(elements.id.setIntervalIedred.valueAsNumber/20)) === 1){
      if (eewRequestType){
        // eewChecking_c1();
        if (eewRequestType === "c1"){
          eewChecking_c1();
        } else if (eewRequestType === "v1"){
          eewChecking_v1();
        }
      }
    }
    timeCount++;
    q_startTime++;
    p2p_elapsedTime++;
    switch (Dcommand[Nnum]) {
      case 1:
        DText[Nnum] = weather_mxtemsadextstr;
        // DText[Nnum+5] = "最高気温ランキング";
        break;
      case 2:
        DText[Nnum] = weather_mntemsadextstr;
        // DText[Nnum+5] = "最低気温ランキング";
        break;
      // case 3:
        // DText[Nnum+5] = "現在の気温";
        // break;
      case 4:
        DText[Nnum] = weather1hourrainstr;
        // DText[Nnum+5] = "1時間降水量";
        break;
      case 5:
        DText[Nnum] = weather24hoursrainstr;
        // DText[Nnum+5] = "24時間降水量";
        break;
      case 6:
        DText[Nnum] = weatherMaximumWindSpeedstr;
        // DText[Nnum+5] = "風速ランキング";
        break;
      // case 10:
        // DText[Nnum+5] = "前10分降水量";
        // break;
      // case 11:
        // DText[Nnum+5] = "前1時間降水量";
        // break;
      // case 12:
        // DText[Nnum+5] = "前3時間降水量";
        // break;
      // case 13:
        // DText[Nnum+5] = "前24時間降水量";
        // break;
      // case 17:
        // DText[Nnum+5] = "現在の湿度";
        // break;
      // case 20:
        // DText[Nnum+5] = "現在の風速"; // elements.name.unitWinds[0].value
        // break;
      // case 22:
        // DText[Nnum+5] = "最大風速"; // elements.name.unitWinds[0].value
        // break;
      // case 28:
        // DText[Nnum+5] = "現在の日照時間"; // elements.name.unitWinds[0].value
        // break;
      // case 30:
        // DText[Nnum+5] = "現在の積雪量"; // elements.name.unitWinds[0].value
        // break;
      // case 35:
        // DText[Nnum+5] = "前1時間降雪量"; // elements.name.unitWinds[0].value
        // break;
      // case 36:
        // DText[Nnum+5] = "前6時間降雪量"; // elements.name.unitWinds[0].value
        // break;
      // case 37:
        // DText[Nnum+5] = "前12時間降雪量"; // elements.name.unitWinds[0].value
        // break;
      // case 38:
        // DText[Nnum+5] = "前24時間降雪量"; // elements.name.unitWinds[0].value
        // break;
      // case 40:
        // DText[Nnum+5] = "現在の気圧"; // elements.name.unitWinds[0].value
        // break;
      case 100:
        DText[Nnum] = riveralltext;
        // DText[Nnum+5] = "河川情報";
        break;
      // case 300:
        // DText[Nnum+5] = "避難情報";
        // break;
      // case 302:
        // DText[Nnum+5] = "緊急安全確保発令地域";
        // break;
      case 999:
        DText[Nnum] = timetableStr;
        // DText[Nnum+5] = "ウェザーニュースLiVE番組表";
        break;
      case 2000:
        DText[Nnum] = teidentext;
        // DText[Nnum+5] = "東京電力 停電情報";
        break;
    }
    if(command_shortcutsTo.hasOwnProperty(Dcommand[Nnum])) DText[Nnum] = command_shortcutsTo[Dcommand[Nnum]];
    if((timeCount%275) == 0){
      if(language == "Ja"){
        language = "En";
      } else {
        language = "Ja";
      }
    }
    //CB to if((timeCount%))
    if(TextWidth > textOffsetX){
      textOffsetX = 1200;
      csi--;
      this.Routines.isDrawNormalTitle = true;
      document.getElementsByClassName("Ntext")[Nnum].style.background = "white";
      if(!document.getElementsByName("scrollfix")[Nnum].checked) Nnum++;
      if(Nnum == 5) Nnum = 0;
      for(var i=csi; i>-1; i--)if(mainText[i] != "")break;
      // lst++;
      csi = i;
      document.getElementsByClassName("Ntext")[Nnum].style.background = "yellow";
    }
    if(csi < 0){
      csi = msi;
      if(mode == 2){
        earthquake_telop_times++;
        if(elements.name.recordingwheneewreceived[0].checked && isTickerRecorded && q_magnitude!="--" && !isSokuho) recorderObject.stop();
      }
    }
    if(Nnum >= Dcnt) Nnum = 0;

  //  console.log((TextWidth+150)+","+tx)
    switch (mode){
      case 0:
        context.fillStyle = colorScheme[colorThemeMode][5][1];
        context.fillText(DText[Nnum], textOffsetX, 110);
        break;
      case 2:
        //文字(Red)
        context.fillStyle = colorScheme[colorThemeMode][5][2];
        context.fillText(mainText[csi], textOffsetX, 110);
        break;
    }
    //背景(Blue)
    context.fillStyle = colorScheme[colorThemeMode][1][mscale];
    if(mode === 2) context.fillRect(0, 0, 1080, 60);

    let video = elements.id.v;
    switch (mode) {
      case 0:
        if(this.Routines.isDrawNormalTitle) this.Routines.md0title();
        this.Routines.isDrawNormalTitle = false;

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
        if(!eewIsAlert){
          context.fillStyle = "#2b4aad";
          context.fillRect(0, 60, 900, 68);
          context.fillStyle = "#233d91";
          context.fillRect(0, 0, 900, 60);
          context.drawImage(images.eew.fc.imgBmp, 0, 0, 320, 60);
          context.fillStyle = "#000";
          context.fillRect(320,4,10,54);
          context.fillStyle = "#fff";
          context.font = "bold 28px "+customFonts.main;
          if(eewIsAssumption){
            context.fillText("予測", 80, 88, 45);
            context.fillText("震度", 80, 121, 45);
            context.fillText("観測", 318, 88, 45);
            context.fillText("地域", 318, 121, 45);
          } else {
            context.fillText("最大", 3, 88, 45);
            context.fillText("震度", 3, 121, 45);
            context.fillText("震", 318, 90, 23);
            context.fillText("源", 318, 119, 23);
          }
          if((!eewIsAssumption) && eewClassCode != 35){
            context.fillText("深さ", 725, 88, 45);
            context.font = "bold 40px 'Microsoft Sans Serif', JPAPGothic";
            context.fillText("M", 170, 118, 35);
            DrawTextureText(eewDepth+"km", 750, 123, {base:"Microsoft-Sans-Serif",px:40,weight:"bold",color:"ffffff",letterSpacing:1}, 100);
          }
          context.font = "bold 55px 'ヒラギノ角ゴ ProN', JPAPGothic";
          if(eewIsAssumption){
            context.drawTextureImage.EEW_intensity(135, 60, eewCalcIntensityIndex);
          } else if(eewClassCode != 35){
            context.drawTextureImage.EEW_intensity(50, 60, eewCalcIntensityIndex);
          } else {
            context.fillText("５弱程度以上", 50, 115, 235);
          }
          context.font = "bold 55px "+customFonts.main;
          if(eewIsAssumption) context.drawTextureImage.EEW_epicenter("JP_328", 366, 60, {id:eewEpicenterID}); else context.drawTextureImage.EEW_epicenter("JP_350", 344, 60, {id:eewEpicenterID});
          if((!eewIsAssumption) && eewClassCode != 35){
            context.font = "bold 58px 'Microsoft Sans Serif', JPAPGothic";
            // context.font = "63px 'Helvetica-Bold'";
            context.fillText((eewMagnitude-0).toFixed(1), 205, 115, 100);
          }
          context.fillStyle = "#777";
          context.fillRect(900, 0, 5, 128);
        } else {
          context.fillStyle = "#b8240d";
          context.fillRect(0, 60, 900, 68);
          context.fillStyle = "#c42810";
          context.fillRect(0, 0, 900, 60);
          context.drawImage(images.eew.pub.imgBmp, 0, 0, 320, 60);
          context.fillStyle = "#f22";
          context.fillRect(320, 4, 10, 54);
          context.fillStyle = "#fff";
          context.font = "bold 28px "+customFonts.main;
          if(eewIsAssumption){
            context.fillText("予測", 80, 88, 45);
            context.fillText("震度", 80, 121, 45);
            context.fillText("観測", 318, 88, 45);
            context.fillText("地域", 318, 121, 45);
          } else {
            context.fillText("最大", 3, 88, 45);
            context.fillText("震度", 3, 121, 45);
            context.fillText("震", 318, 90, 23);
            context.fillText("源", 318, 119, 23);
          }
          if((!eewIsAssumption) && eewClassCode != 35){
            context.fillText("深さ", 725, 88, 45);
            context.font = "bold 40px 'Microsoft Sans Serif', JPAPGothic";
            context.fillText("M", 170, 118, 35);
            DrawTextureText(eewDepth+"km", 750, 123, {base:"Microsoft-Sans-Serif",px:40,weight:"bold",color:"ffffff",letterSpacing:1}, 100);
          }
          context.font = "bold 55px 'ヒラギノ角ゴ ProN', JPAPGothic";
          if(eewIsAssumption){
            context.drawTextureImage.EEW_intensity(135, 60, eewCalcIntensityIndex);
          } else if(eewClassCode != 35){
            context.drawTextureImage.EEW_intensity(50, 60, eewCalcIntensityIndex);
          } else {
            context.fillText("５弱程度以上", 50, 115, 235);
          }
          context.font = "bold 55px "+customFonts.main;
          if(eewIsAssumption) context.drawTextureImage.EEW_epicenter("JP_328", 366, 60, {id:eewEpicenterID}); else context.drawTextureImage.EEW_epicenter("JP_350", 344, 60, {id:eewEpicenterID});
          if((!eewIsAssumption) && eewClassCode != 35){
            context.font = "bold 58px 'Microsoft Sans Serif', JPAPGothic";
            context.fillText((eewMagnitude-0).toFixed(1), 205, 115, 100);
          }
          context.fillStyle = "#777";
          context.fillRect(900, 0, 5, 128);
        }

        // Notes: (unused) 津波が発生する可能性があります。

        if(eewWarnForecast){
          context.font = "bold 25px "+customFonts.main;
          context.fillStyle = "yellow";
          context.fillText("以下の地域では強い揺れに警戒。", 337, 26, 553);
          context.fillStyle = "#fff";
          context.fillText(eewWarnForecast, 337, 53, 553);
        } else {
          context.fillStyle = "#ffea00";
          context.font = "bold 25px Arial, 'Microsoft Sans Serif', 'ヒラギノ角ゴ ProN', JPAPGothic";
          const topWarnText = eewWarnTextList[Math.floor((q_startTime / 300) % 23)];
          context.fillText(topWarnText.ja[Math.floor(((q_startTime % 300) / 300) * topWarnText.ja.length)], 337, 26, 553);
          context.fillText(topWarnText.en[Math.floor(((q_startTime % 300) / 300) * topWarnText.en.length)], 337, 53, 553);
        }

        if(eewOriginTime.getTime() < (new Date())-480000){
          if(isTickerRecorded) recorderObject.stop();
          if(!testNow) SetMode(0);
        }

        if((!eewIsAssumption) && eewClassCode != 35){
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
          let t1 = (q_startTime % 60) / 68;
          let t2 = ((q_startTime + 15) % 60) / 68;
          let t3 = ((q_startTime + 30) % 60) / 68;
          let t4 = ((q_startTime + 45) % 60) / 68;
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
        var sum = (siList[csi] != "");
        if(sum != summary){
          if(sum){
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
        var dif = cnv_anim1.current();
        context.drawImage(images.quake.title[colorThemeMode][mscale].imgBmp, 0, 0);
        //地震情報 文字
        // context.font = "400 30px 'ヒラギノ角ゴシック'";
        // context.fillStyle = "#222";
        // context.fillText("地震情報", 10, 30);
        // context.font = "bold 21px Helvetica-Neue";
        // context.fillText("Earthquake Information", 10, 53, 206);
        if(language == "Ja"){
          context.fillStyle = colorScheme[colorThemeMode][0][mscale];
          context.fillRect(dif, 60, 200, 68);
          //文字
          if(msi > 0) context.drawImage(images.quake.texts.maxInt[colorThemeMode == 2 ? 2 : mscale][language.toLocaleLowerCase()][msi<5?msi-1:msi-2], 240, 0);
          context.drawImage(isMscale2 ? images.quake.texts.center.ja2 : images.quake.texts.center.ja, 536, 0);
          if(q_depth) context.drawImage(isMscale2 ? images.quake.texts.depth.ja2 : images.quake.texts.depth.ja, 817, 0);
          if(q_depth!="ごく浅い" && q_depth!="ごく浅く" && q_depth) context.drawImage(isMscale2 ? images.quake.texts.depth_km2 : images.quake.texts.depth_km, 925, 25);
          context.drawImage(isMscale2 ? images.quake.texts.ocTime.ja2 : images.quake.texts.ocTime.ja, 960, 0);
          context.drawImage(isMscale2 ? images.quake.texts.magni2 : images.quake.texts.magni, 406, 0);
          //白 Data
          context.font = "bold 50px HelveticaNeue-CondensedBold, 'arial unicode ms', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
          context.fillStyle = isMscale2 ? "#333" : "#fff";
          // if(seismic_intensity !== undefined) context.fillText(seismic_intensity, 312, 45);
          DrawTextureText(q_magnitude, 432, 45, {base:"HelveticaNeue-CondensedBold",px:50,weight:"bold",letterSpacing:0});
          // context.fillText(magnitude, 432, 45, 88);
          if(q_depth == "ごく浅い"){
            context.font = "bold 30px sans-serif";
            context.fillText(q_depth, 850, 53, 90);
          } else {
            DrawTextureText(q_depth, 866, 45, {base:"HelveticaNeue-CondensedBold",px:50,weight:"bold",letterSpacing:0}, 60);
          }
          context.font = "bold 30px Arial, JPAPGothic, sans-serif";
          if(q_msiText) context.fillText(q_epiId==-2?q_epiName:epicenter_list[0][q_epiId], 526, 53, 300);
          context.font = "50px "+customFonts.main;
          if(q_msiText) context.drawImage(images.quake.texts.intensity[context.fillStyle][csi], 10+dif, 60);
        }

        if(language == "En"){
          context.fillStyle = colorScheme[colorThemeMode][0][mscale];
          context.fillRect(0+dif, 60,  200, 68);
          //地震情報 文字
          // context.font = "bold 30px 'ヒラギノ角ゴ ProN'";
          // context.fillStyle = "#71f043";
          // context.fillText("地震情報", 10, 30);
          // context.font = "bold 20px JPAPGothic";
          // context.fillText("Earthquake Information", 10, 52, 202);
          //文字
          if(msi > 0) context.drawImage(images.quake.texts.maxInt[colorThemeMode == 2 ? 2 : mscale][language.toLocaleLowerCase()][msi<5?msi-1:msi-2], 240, 0);
          context.drawImage(isMscale2 ? images.quake.texts.magni2 : images.quake.texts.magni, 406, 0);
          context.drawImage(isMscale2 ? images.quake.texts.center.en2 : images.quake.texts.center.en, 536, 0);
          if(q_depth) context.drawImage(isMscale2 ? images.quake.texts.depth.en2 : images.quake.texts.depth.en, 815, 0);
          if(q_depth != "ごく浅い" && q_depth) context.drawImage(isMscale2 ? images.quake.texts.depth_km2 : images.quake.texts.depth_km, 925, 25);
          context.drawImage(isMscale2 ? images.quake.texts.ocTime.en2 : images.quake.texts.ocTime.en, 960, 0);
          //白 Data
          context.font = "bold 46px Arial, 'arial unicode ms', sans-serif";
          context.fillStyle = isMscale2 ? "#333" : "#fff";
          // if(seismic_intensity !== undefined) context.fillText(seismic_intensity, 312, 45);
          DrawTextureText(q_magnitude, 432, 45, {base:"HelveticaNeue-CondensedBold",px:50,weight:"bold",letterSpacing:0});
          if(q_depth === "ごく浅い"){
            context.font = "bold 36px Arial";
            context.fillText("shallow", 860, 53, 70);
          } else {
            DrawTextureText(q_depth, 866, 45, {base:"HelveticaNeue-CondensedBold",px:50,weight:"bold",letterSpacing:0}, 60);
          }
          context.font = "bold 30px Arial, 'arial unicode ms', sans-serif";
          if(q_msiText) context.fillText(q_epiId==-2?q_epiName:epicenter_list[1][q_epiId], 516, 53, q_epiId==-2?300:285 + epicenter_list[1][q_epiId].length);
          context.font = "50px "+customFonts.main;
          if(q_msiText)  context.drawImage(images.quake.texts.intensity[context.fillStyle][csi], 10+dif, 60);
          context.drawImage(isMscale2 ? images.quake.texts.jst2 : images.quake.texts.jst, 1041, 32);
        }
        if(q_msiText){
          context.font = "bold 30px '7barSP'";
          context.textAlign = "right";
          context.fillText(q_timeH+":"+q_timeM, 1035, 54, 66);
          context.textAlign = "left";
        }
        //水色
        context.fillStyle = (((timeCount%12)<5) && timeCount<216 && (timeCount%72)<60) ? "#e02222" : (q_magnitude == "--") ? "#f2f241" : "#2229";
        context.fillRect(224, 1, 10, 58);
        //矢印(内容 タイトル)
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
          context.font = "30px JPAPGothic, sans-serif";
          context.fillText(Math.ceil(earthquake_telop_remaining/50)+"秒後に通常画面に復帰します", 812, 124, 265);
        }
        break;

      case 3:
        if(breakingtime%900 === 0) this.Routines.md3title();
        if(breakingtime >= 0) breakingtime--;
        context.font = "31px JPAPGothic, 'ヒラギノ角ゴ ProN', sans-serif";
        context.fillStyle = colorScheme[colorThemeMode][5][2];
        context.fillText(BNtext2[0], 17, 122, 1046);
        context.fillStyle = colorScheme[colorThemeMode][5][2];
        context.font = "23px JPAPGothic, 'ヒラギノ角ゴ ProN', sans-serif";
        if(strWidth(BNtext1[0])*0.8 < 1044) context.fillText(BNtext1[0], 17, 88, strWidth(BNtext1[0])*0.8); else {
          if(breakingtime != -2) context.fillText(BNtext1[0], (breakingtime%900)>800 ? 17 : (breakingtime%900)<200 ? 1063-strWidth(BNtext1[0])*0.8+17 : (1063-strWidth(BNtext1[0])*0.8)*(800-(breakingtime%900))/601+17 , 88, strWidth(BNtext1[0])*0.8); else context.fillText(BNtext1[0], 17 , 88, strWidth(BNtext1[0])*0.8);
        }
        //if(breakingtime == -1)breakingtime = BNtitle.length*900-1;
        if(!breakingtime || breakingtime === -1) SetMode(0),BNtitle=[],BNtext1=[],BNtext2=[],BNtextarray=[];
        if(breakingtime%900 === 0) BNtitle.shift(),BNtext1.shift(),BNtext2.shift();
        if(!BNtitle[0]) breakingtime = 0;
        break;

      case 4:
        context.fillStyle = "#fff";
        context.fillRect(0, 0, 1080, 128);
        if (video?.videoWidth) context.drawImage(video, (1080-video.videoWidth/video.videoHeight*128)/2, 0, video.videoWidth/video.videoHeight*128, 128);
        break;
    }
    if (!t_Cancelled && mode !== 1 && elements.id.viewTsunami.checked){
      if (t_page < 0 || mode === 3){
        const colorAlpha = ((mode !== 2) ? "ff" : ("0"+Math.min(255,Math.abs(Math.trunc((160-timeCount%320)*2))).toString(16)).slice(-2));
        context.fillStyle = "#b33122" + colorAlpha;
        context.fillRect(815, 0, 265, 43);
        context.font = "bold 30px JPAPGothic, 'Microsoft Sans Serif', 'Times-Roman', sans-serif";
        context.fillStyle = "#ffffff" + colorAlpha;
        context.textAlign = "end";
        context.fillText("津波情報を発表中", 1065, 33);
        context.textAlign = "start";
      } else {
        context.fillStyle = "#b33122";
        context.fillRect(265, 0, 815, 60);
        context.font = "bold 30px JPAPGothic, 'Microsoft Sans Serif', 'Times-Roman', sans-serif";
        context.fillStyle = "#fff";
        context.fillText("津波情報", 275, 33, 800);
        context.strokeStyle = "#fff";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(385, 55);
        context.lineTo(435, 5);
        context.stroke();
        context.fillText(tsunamiTexts[t_page], 420, 53, 610);
        context.font = "bold 20px 'Helvetica-Bold', 'HelveticaNeue', 'Arial', sans-serif";
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
    if(video?.videoWidth) elements.id.movietime.innerText = "動画再生\n"+Math.floor(video.currentTime/60) + ":" + ("00"+strIns((Math.floor((video.currentTime*100)%6000)).toString(), (Math.floor((video.currentTime*100)%6000)).toString().length-2, (Math.floor((video.currentTime*100)%6000)).toString().length==1?".0":".")).slice(-5) + " --- " + Math.floor(video.duration/60) + ":" + ("00"+strIns((Math.floor((video.duration*100)%6000)).toString(), (Math.floor((video.duration*100)%6000)).toString().length-2, ".")).slice(-5);

    // if((getFormattedDate(1).month + getFormattedDate(1).day + getFormattedDate(1).hour + getFormattedDate(1).minute == 125) && false){
    //   context.fillStyle = colorScheme[colorThemeMode][1][2];
    //   context.font = "120px 'Microsoft Sans Serif', JPAPGothic, sans-serif";
    //   context.fillRect(0, 0, 1080, 128);
    //   context.fillStyle = "#fff";
    //   context.fillText("年越しまで: " + (60-getFormattedDate(1).second) + "秒", 100, 115);
    // }
    // if((getFormattedDate(1).month + getFormattedDate(1).day + getFormattedDate(1).hour + getFormattedDate(1).minute == 2) && false){
    //   context.fillStyle = colorScheme[colorThemeMode][1][0];
    //   context.font = "120px 'Microsoft Sans Serif', JPAPGothic, sans-serif";
    //   context.fillRect(0, 0, 1080, 128);
    //   context.fillStyle = "#fff";
    //   context.fillText( getFormattedDate(1).year + "年おめでとううううう！！", 2, 115, 1300);
    // }

    context.lineWidth = 1;
    if (!isClose && mode==0 && isSoraview){
      context.fillStyle = "#20cf37";
      context.beginPath();
      context.moveTo(1080, 127);
      context.lineTo(1080, 94);
      context.lineTo(806, 94);
      context.lineTo(773, 127);
      context.fill();
      context.fillStyle = "#20cf375d";
      context.beginPath();
      context.moveTo(1080, 127);
      context.lineTo(1080, 90);
      context.lineTo(802, 90);
      context.lineTo(765, 127);
      context.fill();
      context.fillStyle = "#fff";
      context.font = "30px "+customFonts.main;
      context.fillText("ｳｪｻﾞｰﾆｭｰｽｱﾝｹｰﾄ実施中!" ,810, 124, 265);
    }
    soraopen_moving = anim_soraview.current();
    soraopen_color = anim_soraview_color.current();
    if(bit(soraopen, 0)){
      context.fillStyle = "#e3e3e3" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      context.font = "30px "+customFonts.main;
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
      context.font = "25px "+customFonts.main;
      context.fillStyle = "#2a25c6" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if(intervalTime<40 || intervalTime1==1)context.fillText("青: " + choice1, 30-soraopen_moving, 69, 213);
      context.fillStyle = "#cf3231" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if(intervalTime<40 || intervalTime1==1)context.fillText("赤: " + choice2, 30-soraopen_moving, 104, 213);
      context.fillStyle = "#22c02d" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if(intervalTime<40 || intervalTime1==1)context.fillText("緑: " + choice3, 256-soraopen_moving, 69, 213);
      context.fillStyle = "#b8ac10" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if(intervalTime<40 || intervalTime1==1)context.fillText("黄: " + choice4, 256-soraopen_moving, 104, 213);
      if(bit(soraopen, 1)){
        if(bit(soraopen, 1) && soraopen_interval1===null && intervalTime1==0){
          intervalArray.push(soraopen_interval1 = setInterval(
            function(){
              intervalTime++;
              if(intervalTime >= 210)intervalReset();
            }, 10
          ));
        }
        context.fillStyle = "#e3e3e3" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
        if(intervalTime1==0){
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
      context.font = "25px "+customFonts.main;
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

    // Canvas時間表示
    if(this.Routines.judgeIsClockFontLoaded()){
      let currentTimeDate = Math.floor(targetTime.getTime()/1000/60);
      if(currentTimeDate != this.Routines.memory.lastTime) this.Routines.subCanvasTime(targetTime);
      this.Routines.memory.lastTime = currentTimeDate;
    } else {
      time.fillText("Loading...", 4, 120, 120);
    }

    // AudioAPI alarm adjustment
    if(q_startTime%8==0){
      audioAPI.fun["freq"+(q_startTime%16>7?"B5":"E6")]();
    }

    //audio repeatition control
    let bgmElements = document.getElementsByClassName('BGM');
    let bgmRepeatingStartMin = document.getElementsByClassName('BGMrepeatingStartMin');
    let bgmRepeatingStopMin = document.getElementsByClassName('BGMrepeatingStopMin');
    let bgmRepeatingStartSec = document.getElementsByClassName('BGMrepeatingStartSec');
    let bgmRepeatingStopSec = document.getElementsByClassName('BGMrepeatingStopSec');
    for(let i=0; i<bgmElements.length; i++){
      if(Number(bgmRepeatingStopMin[i].value) * 60 + Number(bgmRepeatingStopSec[i].value) < bgmElements[i].currentTime && bgmElements[i].checked){
        bgmElements[i].currentTime = Number(bgmRepeatingStartMin[i].value) * 60 + Number(bgmRepeatingStartSec[i].value);
      }
      bgmRepeatingStartMin[i].max = Math.floor(bgmElements[i].duration/60);
      bgmRepeatingStopMin[i].max = Math.floor(bgmElements[i].duration/60);
      bgmRepeatingStartSec[i].max = bgmElements[i].duration<60 ? Math.floor(bgmElements[i].duration) : 60;
      bgmRepeatingStopSec[i].max = bgmElements[i].duration<60 ? Math.floor(bgmElements[i].duration) : 60;
    }

    {
      let current = anim_fullscreen.current();
      if(current){
        context.globalAlpha = Math.min(1, current);
        context.drawImage(images.fullview, 0, 0, 1080, 128);
        context.globalAlpha = 1;
      }
    }

    if(testNow){
      context.fillStyle = "#fff";
      context.strokeStyle = "#333";
      context.strokeText("デバッグモードが有効", 5, 123, 1070);
      context.fillText("デバッグモードが有効", 5, 123, 1070);
    }

    // Audio showing controls
    for (let i = 0; i < backMsc.length; i++){
      let intCurTm = Math.floor(Number(backMsc[i]?.currentTime));
      let intDurTm = Math.floor(backMsc[i]?.bufferSource?.buffer?.duration);
      const musicRangePos = Math.max(0, Math.min(405, Math.round((backMsc[i]?.currentTime-0) / backMsc[i]?.bufferSource?.buffer?.duration * 405)));
      const text_currentTime = Math.floor(intCurTm/60)+":"+("0"+(intCurTm%60)).slice(-2);
      const text_duration = Math.floor(intDurTm/60)+":"+("0"+(intDurTm%60)).slice(-2);
      if (!("storage" in backMsc[i])) continue;
      backMsc[i].storage.musicCurrentTime.time = text_currentTime;
      if (backMsc[i].storage.musicCurrentTime.string !== text_currentTime) backMsc[i].storage.musicCurrentTime.string = text_currentTime, backMsc[i].storage.musicCurrentTime.element.textContent = text_currentTime;
      if (backMsc[i].storage.musicDurationOrLeft.string !== text_duration) backMsc[i].storage.musicDurationOrLeft.string = text_duration, backMsc[i].storage.musicDurationOrLeft.element.textContent = text_duration;
      if (backMsc[i].storage.musicLoadedWidth.number !== musicRangePos){
        backMsc[i].storage.musicLoadedWidth.number = musicRangePos;
        backMsc[i].storage.musicLoadedWidth.playedElement.style.width = musicRangePos+"px";
        backMsc[i].storage.musicLoadedWidth.noloadElement.style.left = musicRangePos+"px";
        backMsc[i].storage.musicLoadedWidth.curposElement.style.left = musicRangePos+"px";
      }
      // if(intCurTm >= intDurTm && backMsc[0]?.playing){
      //   backMsc[0].bufferSource.stop();
      //   backMsc[0].pausedAt = backMsc[0].bufferSource.buffer.duration;
      // }
      if (backMsc[i].playing && backMsc[i].bufferSource.loop && backMsc[i].currentTime >= backMsc[i].bufferSource.loopEnd && backMsc[i].bufferSource.loopEnd !== backMsc[i].bufferSource.loopStart){
        backMsc[i].startedAt += backMsc[i].currentTime - backMsc[i].bufferSource.loopStart;
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
elements.id.viewTsunami.addEventListener("click", Routines.md0title);

function updateLoadedTime(){
  let tfCt = "";
  tfCt = "\n"+RequestURL.iedred7584_eew+"\n　"+lastGet.iedred7584EEW;
  tfCt += "\n"+RequestURL.lmoni_eew+"\n　"+lastGet.lmoni_eew;
  tfCt += "\n"+RequestURL.nhkQuake1+"\n　"+lastGet.nhkQuake1;
  tfCt += "\n"+RequestURL.nhkQuake2+"\n　"+lastGet.nhkQuake2;
  tfCt += "\n"+RequestURL.jmaDevFeedExtra+"\n　"+lastGet.jmaDevFeedExtra;
  tfCt += "\n"+RequestURL.tenkiJPtsunami+"\n　"+lastGet.tenkiJPtsunami;
  tfCt += "\n"+RequestURL.wni_mscale+"\n　"+lastGet.wniMScale;
  tfCt += "\n"+RequestURL.wni_sorabtn+"\n　"+lastGet.wniSorabtn;
  tfCt += "\n"+RequestURL.wni_river+"\n　"+lastGet.wniRiver;
  tfCt += "\n"+RequestURL.jmaTableCsvPre1h00_rct+"\n　"+lastGet.jmaTableCsvPre1h00_rct;
  tfCt += "\n"+RequestURL.jmaTableCsvPre24h00_rct+"\n　"+lastGet.jmaTableCsvPre24h00_rct;
  tfCt += "\n"+RequestURL.jmaTableCsvMxwsp00_rct+"\n　"+lastGet.jmaTableCsvMxwsp00_rct;
  tfCt += "\n"+RequestURL.jmaTableCsvMxtemsadext00_rct+"\n　"+lastGet.jmaTableCsvMxtemsadext00_rct;
  tfCt += "\n"+RequestURL.jmaTableCsvMntemsadext00_rct+"\n　"+lastGet.jmaTableCsvMntemsadext00_rct;
  tfCt += "\n"+RequestURL.jmaAmedasLatest+"\n　"+lastGet.jmaAmedasLatest;
  tfCt += "\n"+RequestURL.wniliveTimeTable+"\n　"+lastGet.wniliveTimeTable;
  tfCt += "\n"+RequestURL.tepcoTeiden+"\n　"+lastGet.tepcoTeiden;
  elements.id.tfmoni.innerText = tfCt;
}
const getCTime = function(isAdjusted){
  let t = isAdjusted ? new Date() : getAdjustedDate();
  return ("0"+(t.getMonth()+1)).slice(-2)+"月"+("0"+t.getDate()).slice(-2)+"日"+("0"+t.getHours()).slice(-2)+"時"+("0"+t.getMinutes()).slice(-2)+"分"+("0"+t.getSeconds()).slice(-2)+"秒"+("000"+t.getMilliseconds()).slice(-3);
};

// check the Earthquake Early Warning
var isEEW = false,
    lastnum = 0,
    lastID = "",
    lastAt = new Date("2000/01/01 00:00:00"),
    lastOriginalText = "",
    eewDatas = {
      version: _appVersionView,
      logs: []
    },
    eewAssumptionsLog = {};
//var eewLoadingLateTime = [0,0,0,0,0,-1];
async function eewChecking_v1(timeout = 3000){
  const abort = new AbortController();
  setTimeout(() => abort.abort(), timeout);
  const data = await fetch(RequestURL.iedred7584_eew+"?_="+(new Date()-0), {
    signal: abort.signal
  }).then(res => res.json());

  lastGet.iedred7584EEW = getCTime();
  updateLoadedTime();
  if(lastOriginalText && lastOriginalText !== data.OriginalText){
    await handleEewEventFromSocket(data);
  }
  lastOriginalText = data.OriginalText;
  lastnum = data.Serial;
  lastAt = new Date(data.AnnouncedTime.String);
  lastID = data.EventID;
  //  else if((data.EventID != lastID || data.Serial != lastnum)){
  //   eewIsTraning = true;
  //   console.log("緊急地震速報の訓練報を受信しました。内容は以下の通りです。");
  //   console.log(data);
  // }
}
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
      if ((isForcedTime || testNow) && mode === 1) eewSpeech(eewReportID, eewCalcIntensityIndex, eewEpicenterID, eewMagnitude, eewDepth, true, !eewIsAssumption);
      if (mode==1 && (lastnum!=eewReportNumber || lastID!=eewReportID) && (eewOriginTime.getTime()+90000 > getFormattedDate(2) || eewReportNumber == 1 || testNow)) eewMapDraw(data.Hypocenter.Location.Long, data.Hypocenter.Location.Lat, data.Forecast ? data.Forecast : []);
      if (elements.name.recordingwheneewreceived[0].checked && !isTickerRecorded){recorderObject.start();}
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
      if (elements.id.setClipEEW.checked) copy("／／　緊急地震速報（"+(eewIsAlert?"警報":"予報")+"）　"+(eewIsFinal?"最終":(eewReportNumber==1?"初報":"継続"))+"第"+eewReportNumber+"報　＼＼\n最大震度　　　："+eewCalcintensity+"\n震源　　　　　："+eewEpicenter+"\nマグニチュード："+eewMagnitude.toFixed(1)+"\n深さ　　　　　："+eewDepth+"㎞\n\n緊急地震速報が発表されました。\n落ち着いてください。\n上から落ちてくるものに気をつけてください。\nむりに火を消そうとしないでください。");
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
  eewCalcOffset_c1().then(offsetTime => fetch(RequestURL.lmoni_eew.replace("{yyyyMMddHHmmss}", getFormattedDate(0, true, null, [0, 0, 0, 0, 0, offsetTime])))).then(res => res.json()).then(data => {
    lastGet.lmoni_eew = getCTime();
    updateLoadedTime();
    if(data.report_num !== ""){
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
      let eewIsAlert_changed = (!eewIsAlert) && (data.alertflg=="警報");
      eewIsAlert = data.alertflg=="警報" ? true : false;
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
        if ((isForcedTime || testNow) && mode === 1) eewSpeech(data.report_id, eewCalcIntensityIndex, eewEpicenterID, eewMagnitude, eewDepth);
        if (document.getElementsByName("recordingwheneewreceived")[0].checked && !isTickerRecorded){ recorderObject.start(); }
        if (elements.id.setClipEEW.checked) copy("／／　緊急地震速報（"+(eewIsAlert?"警報":"予報")+"）　"+(eewIsFinal?"最終":(eewReportNumber==1?"初報":"継続"))+"第"+eewReportNumber+"報　＼＼\n最大震度　　　："+eewCalcintensity+"\n震源　　　　　："+eewEpicenter+"\nマグニチュード："+eewMagnitude.toFixed(1)+"\n深さ　　　　　："+eewDepth+"㎞\n\n緊急地震速報が発表されました。\n落ち着いてください。\n上から落ちてくるものに気をつけてください。\nむりに火を消そうとしないでください。");
      }
      eewWarnForecast = "";
    }
    lastnum = data.report_num;
    lastID = data.report_id;
  });
}

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
  console.log(Array.from(arguments));
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
    speechBase.start([
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
    if(warnAreas.includes(int.properties.code)) context.fillStyle = colorThemeMode != 2 ? "#fdab29" : "#ffed4a"; else context.fillStyle = colorThemeMode != 2 ? "#32a852" : "#666";
    switch (int.geometry.type) {
      case "MultiPolygon":
        int.geometry.coordinates.forEach(function(points){
          context.beginPath();
          for (let i=0; i<points[0].length; i++) {
            let point = points[0][i];
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
  // 二次方程式を初めて現実的に使った瞬間
  /* 初期の地図表示プログラム
   *   context.moveTo((lastpoint[0]-(longitude-eewEpiPos[0]/magnification))*magnification,(-lastpoint[1]+(latitude+eewEpiPos[1]/magnification))*magnification);
   *   context.lineTo((point[0]-(longitude-eewEpiPos[0]/magnification))*magnification,(-point[1]+(latitude+eewEpiPos[1]/magnification))*magnification);
   *     初期も何も公開前
  */
}

// function loadDText() { /* $.getJSON("default_message.json") */ }

function movie(playMode){
  var video = document.getElementById('v');
  switch (playMode) {
    case 0:
      video.play();
      break;
    case 1:
      video.pause();
      break;
    case 2:
      video.currentTime = 0;
      break;
  }
}
function movieChange(){
  document.getElementById('v').innerHTML = '<source src="' + document.getElementById('movieSrc').value + '" />'
  document.getElementById('v').load();
}

function strIns(str, idx, val){
  return str.slice(0, idx) + val + str.slice(idx);
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

function ajaxTester(URL, timeoutMilliseconds){
  var j;
  $(function(){
      $.ajax({
        type: 'GET',
        url: URL,
        timeout: timeoutMilliseconds,
        success: function(data){
          console.log(data);
        },
        error: function(e) {
          console.log(e)
        }
      })
  });
  console.log(j);
  return j;
};



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
function sorabtn(){
  $.ajax({
    type: 'GET',
    url: RequestURL.wni_sorabtn,
    dataType: 'json',
    timeOut: 15000,
    cache: false,
    success: function(data){
      lastGet.wniSorabtn = getCTime();
      updateLoadedTime();
      qid = data['data']['qid'];
      question = data['data'][0]['question'];
      closeTime = data['data'][0]['closeTime'];
      ans1 = Number(data['data'][0]['ans1']);
      ans2 = Number(data['data'][0]['ans2']);
      ans3 = Number(data['data'][0]['ans3']);
      ans4 = Number(data['data'][0]['ans4']);
      closeTime != "" ? isClose=true : isClose=false;
      maxans = [ans1,ans2,ans3,ans4].sort(function(a, b) { return b - a; })[0];
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      errorCollector.collect("XMLHttpRequestでエラーが発生しました。isTrustedはundefinedです。\nRequest Type: sorabtn / Timeout: 0(ms)");
    }
  });
}
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
      lastGet.wniSorabtn = getCTime();
      updateLoadedTime();
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
      ans1 = Number(data['data'][0]['ans1']);
      ans2 = Number(data['data'][0]['ans2']);
      ans3 = Number(data['data'][0]['ans3']);
      ans4 = Number(data['data'][0]['ans4']);
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
      lastGet.wniSorabtn = getCTime();
      updateLoadedTime();
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
      ans1 = Number(data['data'][0]['ans1']);
      ans2 = Number(data['data'][0]['ans2']);
      ans3 = Number(data['data'][0]['ans3']);
      ans4 = Number(data['data'][0]['ans4']);
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

var rainStr = "";
var windStr = "";
var weatherDataListCSV = [];
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
var weather_prelist = [[],[],[],[],[]],
    ajaxload = [0,0,0,0,0];
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
      lastGet.jmaTableCsvPre1h00_rct = getCTime();
      updateLoadedTime();
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
      lastGet.jmaTableCsvPre24h00_rct = getCTime();
      updateLoadedTime();
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
      for(let i=0; i<weather24hourrain.length; i++){
        if(rank!=0) if(weather24hourrain[i].value != weather24hourrain[i-1].value)rank=i+1; else; else rank++;
        if(i>20){
          if(weather24hourrain[i].value!=weather24hourrain[i-1].value)break;
        }
        weather24hoursrainstr += rank+")"+weather24hourrain[i].pref+" "+weather24hourrain[i].name.replace(/（.{1,}）/, "")+" "+weather24hourrain[i].value+"mm/d　　 ";
      }
      if(weather24hoursrainstr==""){
        weather24hoursrainstr = (wpll.join('、')+"では過去1時間以内に雨が降ったところはないようです。").replace(/ /g, "");
      }
    }
  });
  if(isFull){
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
        lastGet.jmaTableCsvMxwsp00_rct = getCTime();
        updateLoadedTime();
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
        lastGet.jmaTableCsvMxtemsadext00_rct = getCTime();
        updateLoadedTime();
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
        lastGet.jmaTableCsvMntemsadext00_rct = getCTime();
        updateLoadedTime();
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

function forEach2(int,callbackfn){
  var i = 0;
  var u;
  var re = [];
  for(i=0; i<int.length; i++){
      u = callbackfn(int[i],i);
      if(u!==void(0))re.push(u);
  }
  if(re.length == 0)return i;else return re;
}
function forEach3(int,callbackfn){
  var i = 0;
  var u;
  var re = [];
  if(re.length == 0)return i;else return re;
  for(var keyname in int){
    u = callbackfn(keyname,int[keyname],i);
    i++;
    if(u!==void(0))re.push(u);
  }
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
    lastGet.jmaAmedasLatest = getCTime();
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

      command_shortcutsTo[3] = outputTempText;
      command_shortcutsTo[10] = output10precText;
      command_shortcutsTo[11] = output60precText;
      command_shortcutsTo[12] = output180precText;
      command_shortcutsTo[13] = output1440precText;
      command_shortcutsTo[17] = outputHumidityText;
      command_shortcutsTo[20] = outputWindText;
      // command_shortcutsTo[21] = outputDustText;
      command_shortcutsTo[28] = outputSun1h;
      command_shortcutsTo[30] = outputSnowHeightText;
      command_shortcutsTo[35] = output1snowText;
      command_shortcutsTo[36] = output6snowText;
      command_shortcutsTo[37] = output12snowText;
      command_shortcutsTo[38] = output24snowText;
      command_shortcutsTo[40] = outputPressureText;
    });
  });
};
getAmedasData.ConvertDate = obj => `${obj.getFullYear()}${((obj.getMonth()+1)+"").padStart(2,"0")}${(obj.getDate()+"").padStart(2,"0")}${(obj.getHours()+"").padStart(2,"0")}${(obj.getMinutes()+"").padStart(2,"0")}`;
getAmedasData.time = { min10: "?", min60: "?" };

// warning: remove
const getEvacuationData = function(){
  let xhrEvacuation = new XMLHttpRequest();
  xhrEvacuation.addEventListener("load", function(){
    let json = JSON.parse(this.response);
    let warnAreaTexts = [];
    let warnAreaTextsOnlyEmg = [];
    for(let key in json.city){
      let target = json.city[key];
      let severities = Object.keys(target.data.issue ?? {});
      for(let i=0, l=severities.length; i<l; i++){
        let prefecture = target.pref;
        let area = target.area;
        let additionText = "【"+severities[i]+"】"+prefecture+area;
        warnAreaTexts.push(additionText);
        if(severities[i] === "緊急安全確保") warnAreaTextsOnlyEmg.push(additionText);
      }
    }
    command_shortcutsTo[300] = warnAreaTexts.join("　") || "該当地域なし";
    command_shortcutsTo[302] = warnAreaTextsOnlyEmg.join("　") || "該当地域なし";
  });
  xhrEvacuation.open("GET", "https://site.weathernews.jp/site/lalert/json/evac.json");
  xhrEvacuation.send();
};

var weatherTitle = [],
    weatherContent = [],
    weatherTime = [],
    weatherlink = [],
    breakingtime = -1,
    // dosyasaigaikeikaijouhou = 0,
    BNtextarray = [];
//“台風(TY)”、“台風(STS)”、“台風(TS)”、“熱帯低気圧(TD)”、“ハリケーン(Hurricane)”、“発達した熱帯低気圧(Tropical Storm)”、“温帯低気圧(LOW)”
const JMA_logCheck = () => {
  console.log("breakingtime:",breakingtime);
  console.log("BNtitle",BNtitle);
  console.log("BNtext1",BNtext1);
  console.log("BNtext2",BNtext2);
}
var typhoon = {
  // list: [
    // "TC2114",
    // "TC2115",
    // "TC2116"
  // ],
  // main: [
  TC2002: {
    number: '2001',
    name: {
      kana: 'ヴォンフォン',
      eng: 'VONGFONG'
    },
    information: [
      {
        time: '0',
        dateobj: new Date('2000/01/01 00:00:00'),
        coordinate: [12.2, 127.7],
        direction: '西',
        intensity: '強い',
        class: '熱帯低気圧(TD)',//???
        speed: {
          knot: 9,
          kmh: 15
        },
        pressure: 965,
        wind: {
          speed: {
            knot: [80, 115],
            ms: [40, 60]
          },
          warningArea: {
            alert: {
              axis: [
                {
                  direction: 'all',
                  radius: {
                    sea_mile: 40,
                    km: 75
                  }
                }
              ]
            },
            caution: {
              axis: [
                {
                  direction: '北東',
                  radius: {
                    sea_mile: 90,
                    km: 165
                  }
                },
                {
                  direction: '南東',
                  radius: {
                    sea_mile: 60,
                    km: 110
                  }
                }
              ]
            }
          }
        }
      },
      {
        time: '24',
        dateobj: new Date('2000/01/02 00:00:00'),
        coordinate: [12.6, 124.3],
        direction: '西',
        class: '台風(TY)',
        intensity: '非常に強い',
        speed: {
          knot: 7,
          kmh: 15
        },
        pressure: 950,
        wind: {
          speed: {
            knot: [90, 130],
            ms: [45, 65]
          },
          warningArea: {
            alert: {
              axis: [
                {
                  direction: 'all',
                  radius: {
                    sea_mile: 105,
                    km: 190
                  }
                }
              ]
            },
            forecast: {
              axis: [
                {
                  direction: 'all',
                  radius: {
                    sea_mile: 50,
                    km: 95
                  }
                }
              ]
            }
          }
        }
      },
      {
        time: '48',
        dateobj: new Date('2000/01/03 00:00:00'),
        coordinate: [12.6, 124.3],
        direction: '北西',
        class: '台風(TY)',
        intensity: '強い',
        speed: {
          knot: 9,
          kmh: 15
        },
        pressure: 960,
        wind: {
          speed: {
            knot: [80, 115],
            ms: [45, 65]
          },
          warningArea: {
            alert: {
              axis: [
                {
                  direction: 'all',
                  radius: {
                    sea_mile: 135,
                    km: 250
                  }
                }
              ]
            },
            forecast: {
              axis: [
                {
                  direction: 'all',
                  radius: {
                    sea_mile: 90,
                    km: 165
                  }
                }
              ]
            }
          }
        }
      },
      {
        time: '72',
        dateobj: new Date('2000/01/04 00:00:00'),
        coordinate: [18.1, 121.0],
        direction: '北',
        class: '台風(STS)',
        intensity: '',
        speed: {
          knot: 8,
          kmh: 15
        },
        pressure: 985,
        wind: {
          speed: {
            knot: [60, 85],
            ms: [30, 45]
          },
          warningArea: {
            alert: {
              axis: [
                {
                  direction: 'all',
                  radius: {
                    sea_mile: 165,
                    km: 310
                  }
                }
              ]
            },
            forecast: {
              axis: [
                {
                  direction: 'all',
                  radius: {
                    sea_mile: 140,
                    km: 260
                  }
                }
              ]
            }
          }
        }
      }
    ],
    kind: '熱帯低気圧',//??
    coordinate: {
      condition: "正確/不正確",
      lat: 90,
      lon: 180,
      name: "中心位置の日本語名"
    }
  }
// ]
};
var mem = [],
    testweather = ["",""];
Element.prototype.fun1 = function(name, i=0){ return this.getElementsByTagName(name).item(i); };
Element.prototype.fun2 = function(name, i=0){ return this.querySelectorAll(name).item(i) };
NodeList.prototype.toArray = function(){ return Array.from(this) };
function weatherInfo(){
  $(function(){
      $.ajax({
          type: 'GET',
          url: "https://www.data.jma.go.jp/developer/xml/feed/extra.xml",
          dataType: 'xml',
          cache: false,
          success: function(data){
            let performWeatherStartAt = performance.now() * 1000;
            lastGet.jmaDevFeedExtra = getCTime();
            updateLoadedTime();
            weatherTitle = [];
            weatherContent = [];
            weatherTime = [];
            if(mode!=2 && mode!=1){
              var arr = [];
              var isChange = true;
              $(data).find('entry').each(function(){ // gbcされない？
                  let linkAttrHref = this.fun1("link").getAttribute('href');
                  let titleTextCotent = this.fun1('title').textContent;
                  let contentTextContent = this.fun1('content').textContent;
                  let updTextContent = this.fun1('updated').textContent;
                  if (weatherlink.indexOf(linkAttrHref)!=-1) isChange = false;
                  weatherTitle.push(titleTextCotent);
                  weatherContent.push(contentTextContent);
                  var now = new Date(updTextContent);
                  var fortime = getFormattedDate(1, true, now);
                  weatherTime.push(fortime.year+"/"+fortime.month+"/"+fortime.date+" "+fortime.hour+":"+fortime.minute+":"+fortime.second);
                  arr.push(linkAttrHref);
                  if(isChange && titleTextCotent!="早期天候情報" && titleTextCotent!="気象警報・注意報" && titleTextCotent!="気象特別警報・警報・注意報"){
                    //BNtitle = $(this).find('title').text().replace("（Ｈ２７）", "");
                    //BNtext1 = ($(this).find('content').text()).split("】")[0]+"】";
                    //BNtext2 = ($(this).find('content').text()).split("】")[1];
                    // dosyasaigaikeikaijouhou = 0;
                    if(titleTextCotent == "土砂災害警戒情報" && q_startTime <= 300){
                      //BNtext2.push(($(this).find('content').text()).split("】")[2]);
                      //dosyasaigaikeikaijouhou = ($(this).find('content').text()).split("】").length-1;
                      //breakingtime = dosyasaigaikeikaijouhou*300;
                      //BNtextarray = (($(this).find('content').text()).split("】")[2]);//.split("＜");
                      //play(sounds.warning.GroundLoosening, document.getElementById('volGL').valueAsNumber/100);
                      isChange = false;
                    }
                    if(titleTextCotent == "指定河川洪水予報" && q_startTime <= 300){
                      //if(($(this).find('content').text()).split("】").length==3)BNtext2 += "】"+($(this).find('content').text()).split("】")[2];
                      isChange = false;
                    }
                  }
                  let performWeatherLoadStartAt = performance.now() * 1000;
                  if(isChange){
                    if(titleTextCotent === "台風解析・予報情報（５日予報）（Ｈ３０）"){
                      return "挫折";
                      // $.ajax({
                      //   type: 'GET',
                      //   url: linkAttrHref,
                      //   dataType: 'xml',
                      //   cache: true,
                      //   success: function(c){
                      //     let performWeatherLoadEndAt = performance.now() * 1000;
                      //     let typhoonEventID = c.getElementsByTagName("EventID").item(0).textContent;
                      //     typhoon[typhoonEventID] = {};
                      //     let target = typhoon[typhoonEventID];
                      //     target.targetTime = new Date(c.getElementsByTagName('TargetDateTime').item(0).textContent);
                      //     target.number = c.querySelector('TyphoonNamePart > Number').textContent;
                      //     target.kind = c.querySelector('TyphoonNamePart > Remark').textContent;
                      //     let typhoon_infos = Array.from(c.getElementsByTagName('MeteorologicalInfo'));
                      //     target.name = {};
                      //     target.name.kana = c.querySelector('TyphoonNamePart > NameKana').textContent;
                      //     target.name.eng = c.querySelector('TyphoonNamePart > Name').textContent;
                      //     target.information = [];
                      //     mem.push(typhoon_infos);
                      //     typhoon_infos.forEach(function(c, i){
                      //         let additions = {
                      //           time: c.getElementsByTagName('DateTime').item(0).getAttribute('type')=="実況" ? 0 : Number(zenkakuToHankaku(c.getElementsByTagName('DateTime').item(0).getAttribute('type')).slice(3,-3)),
                      //           dateobj: new Date(c.getElementsByTagName('DateTime').item(0).textContent),
                      //           speed: {},
                      //           typhoon: {
                      //             class: "",
                      //             area: "",
                      //             intensity: ""
                      //           },
                      //           center: {
                      //             coord: [ {}, {} ],
                      //             location: "",
                      //             direction: "",
                      //             speed: {
                      //               knot: 0,
                      //               kmh: 0
                      //             },
                      //             pressure: 1000
                      //           },
                      //           wind: {
                      //             part: {
                      //               wind: {
                      //                 knot: 40,
                      //                 ms: 20
                      //               },
                      //               gust: {
                      //                 knot: 60,
                      //                 ms: 30
                      //               }
                      //             },
                      //             warn: {
                      //               measureSpeed: {
                      //                 knot: 50,
                      //                 ms: 25
                      //               },
                      //               circle: {
                      //                 axesaxis: [
                      //                   {
                      //                     direction: "",
                      //                     radius: {
                      //                       nm: 0,
                      //                       km: 0
                      //                     }
                      //                   }
                      //                 ]
                      //               }
                      //             },
                      //             gale: {
                      //               measureSpeed: {
                      //                 knot: 30,
                      //                 ms: 15
                      //               },
                      //               circle: {
                      //                 axesaxis: [
                      //                   {
                      //                     direction: "北",
                      //                     radius: {
                      //                       nm: 120,
                      //                       km: 220
                      //                     }
                      //                   },
                      //                   {
                      //                     direction: "南",
                      //                     radius: {
                      //                       nm: 240,
                      //                       km: 440
                      //                     }
                      //                   }
                      //                 ]
                      //               }
                      //             }
                      //           }
                      //         };
                      //         let classPart = c.getElementsByTagName("ClassPart").item(0);
                      //         let centerPart = c.getElementsByTagName("CenterPart").item(0);
                      //         let windPart = c.getElementsByTagName("WindPart").item(0);
                      //         let warningAreaPart50 = c.querySelector('WarningAreaPart[type="暴風域"]');
                      //         let warningAreaPart30 = c.querySelector('WarningAreaPart[type="強風域"]');
                      //         additions.typhoon.typhoon = classPart.getElementsByTagName("jmx_eb:TyphoonClass").item(0).textContent;
                      //         additions.typhoon.area = classPart.getElementsByTagName("jmx_eb:AreaClass").item(0)?.textContent;
                      //         additions.typhoon.intensity = classPart.getElementsByTagName("jmx_eb:IntensityClass").item(0).textContent;
                      //         let coord1 = centerPart.fun1("jmx_eb:Coordinate",0).textContent;
                      //         let coord2 = centerPart.fun1("jmx_eb:Coordinate",1).textContent;
                      //         coord1 = /([+-]\d+(\.\d)?)([+-]\d+(\.\d)?)?/.exec(coord1);
                      //         coord2 = /([+-]\d+(\.\d)?)([+-]\d+(\.\d)?)?/.exec(coord2);
                      //         additions.center.coord[0][0] = Number(coord1[1]);
                      //         additions.center.coord[0][1] = Number(coord1[3]);
                      //         additions.center.coord[1][0] = Number(coord2[1]);
                      //         additions.center.coord[1][1] = Number(coord2[3]);
                      //         additions.center.coord[0].text = centerPart.fun1("jmx_eb:Coordinate",0).getAttribute("description");
                      //         additions.center.coord[1].text = centerPart.fun1("jmx_eb:Coordinate",1).getAttribute("description");
                      //         Array.from(c.getElementsByTagName("Kind")).forEach(function(c2){
                      //             switch ($(c2).find('Property > Type')) {
                      //               // $(c2).find('Property > ClassPart').children()
                      //               case '階級':
                      //                 additions.typhoon.class = c2.fun1("jmx_eb:TyphoonClass").textContent;
                      //                 additions.typhoon.area = c2.fun1("jmx_eb:AreaClass").textContent;
                      //                 additions.typhoon.intensity = c2.fun1("jmx_eb:IntensityClass").textContent;
                      //                 break;
                      //               case '中心':
                      //                 additions.center.location = c2.fun1("Location").textContent;
                      //                 additions.center.direction = c2.fun1("jmx_eb:Direction").textContent;
                      //                 additions.center.speed.knot = Number(c2.fun1("jmx_eb:Speed",0).textContent);
                      //                 additions.center.speed.kmh = Number(c2.fun1("jmx_eb:Speed",1).textContent);
                      //                 additions.center.pressure = Number(c2.fun1("jmx_eb:Pressure").textContent);
                      //                 break;
                      //               case '風':
                      //                 let windpart = c2.fun1("WindPart");
                      //                 let windareapart = {
                      //                   w: c2.fun1("WarningAreaPart",0),
                      //                   g: c2.fun1("WarningAreaPart",1)
                      //                 };
                      //                 additions.wind.part.wind.knot = Number(windpart.fun1("jmx_eb:WindSoeed",0).textContent);
                      //                 additions.wind.part.wind.ms = Number(windpart.fun1("jmx_eb:WindSoeed",1).textContent);
                      //                 additions.wind.part.gust.knot = Number(windpart.fun1("jmx_eb:WindSoeed",2).textContent);
                      //                 additions.wind.part.gust.ms = Number(windpart.fun1("jmx_eb:WindSoeed",3).textContent);
                      //                 additions.wind.warn.measureSpeed.knot = Number(windareapart.w.fun1("jmx_eb:WindSoeed",0).textContent);
                      //                 additions.wind.warn.measureSpeed.ms = Number(windareapart.w.fun1("jmx_eb:WindSoeed",1).textContent);
                      //                 (Array.from(windareapart.w.getElementsByTagName("jmx_eb:Axis"))).forEach((e)=>{
                      //                   additions.wind.warn.circle.axesaxis.push({
                      //                     direction: e.fun1("jmx_eb:Direction").textContent,
                      //                     radius: {
                      //                       nm: Number(e.fun1("jmx_eb:Radius",0).textContent),
                      //                       km: Number(e.fun1("jmx_eb:Radius",1).textContent)
                      //                     }
                      //                   });
                      //                 });
                      //                 additions.wind.gale.measureSpeed.knot = Number(windareapart.g.fun1("jmx_eb:WindSoeed",0).textContent);
                      //                 additions.wind.gale.measureSpeed.ms = Number(windareapart.g.fun1("jmx_eb:WindSoeed",1).textContent);
                      //                 (Array.from(windareapart.g.getElementsByTagName("jmx_eb:Axis"))).forEach((e)=>{
                      //                   additions.wind.gale.circle.axesaxis.push({
                      //                     direction: e.fun1("jmx_eb:Direction").textContent,
                      //                     radius: {
                      //                       nm: Number(e.fun1("jmx_eb:Radius",0).textContent),
                      //                       km: Number(e.fun1("jmx_eb:Radius",1).textContent)
                      //                     }
                      //                   });
                      //                 });
                      //                 break;
                      //             }
                      //         });
                      //         target.information.push(additions);
                      //     });
                      //     document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                      //   }
                      // })
                    }
                  }
                  if (q_startTime > 300 && isChange){
                    if (titleTextCotent === "気象警報・注意報（Ｈ２７）"){
                      $.ajax({
                        type: 'GET',
                        url: linkAttrHref,
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          var t = "";
                          var announcement = {}, clear = {}, changeToNormalAlart = [];
                          // console.log("");
                          forEach2(c.getElementsByTagName("Warning")[1].getElementsByTagName("Item"), function(int){
                            // console.log(int);
                            forEach2($(int).find('Kind'), function(int2){
                              let alartStatus = $(int2).find('Status').text();
                              let lastAlartType = $(int2).find('LastKind > Name').text();
                              let alartType = $($(int2).find('Name')[0]).text();
                              let alartPlace = AreaForecastLocalM.warn[$(int).find('Area Code').text()]
                              if(alartStatus != "発表警報・注意報はなし"){
                                if(alartStatus == "発表"){
                                  /*if($($(c).find('Body Warning')[0]).find('Item').length == 1 && $($(c).find('Body Warning')[0]).find('Item Area Name').text()!="網走・北見・紋別地方"){
                                    t += $($(c).find('Body Warning')[0]).find('Item Area Code').text();
                                  }*/
                                  if(announcement[alartType] === undefined) announcement[alartType] = [];
                                  announcement[alartType].push(alartPlace);
                                  //t += AreaForecastLocalM.warn[$(int).find('Area Code').text()] + "に" + $($(int2).find('Name')[0]).text() + "発表　";
                                } else if(alartStatus == "特別警報から警報"){
                                  changeToNormalAlart.push(alartPlace);
                                } else if(alartStatus == "警報から注意報"){
                                  if(clear[lastAlartType] === undefined) clear[lastAlartType] = [];
                                  clear[lastAlartType].push(alartPlace);
                                } else if(alartStatus != "継続"){
                                  //t += AreaForecastLocalM.warn[$(int).find('Area Code').text()] + "の" + $($(int2).find('Name')[0]).text() + "は解除　";
                                  if(clear[alartType] === undefined) clear[alartType] = [];
                                  clear[alartType].push(alartPlace);
                                }
                              }
                            });
                          });
                          let title = "【" + $(c).find('Report > Head > Title').text() + "】";
                          let text = $(c).find('Report > Head > Headline > Text').text();
                          let addNews = (title, subtext, text)=>{
                            breakingtime += 900;
                            BNtitle.push(title);
                            BNtext1.push(subtext);
                            BNtext2.push(text);
                            SetMode(3);
                          }
                          for(let area of changeToNormalAlart){
                            addNews(title, text, area + "の特別警報は警報に切り替え");
                          }
                          for(var key in clear){
                            t += clear[key].join("・") + "の" + key + "は解除　";
                            if(t.length > 65) addNews(title, text, t), t = "";
                          }
                          for(var key in announcement){
                            t += announcement[key].join("・") + "に" + key + "発表　";
                            if(t.length > 65) addNews(title, text, t), t = "";
                          }
                          // console.log(t);
                          if(t) addNews(title, text, t);
                        }
                      });
                    } else if(titleTextCotent === "竜巻注意情報"){
                      $.ajax({
                        type: 'GET',
                        url: linkAttrHref,
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let performWeatherLoadEndAt = performance.now() * 1000;
                          let announcement = {},
                              clear = {};
                          let all_clear = true;
                          forEach2($(c).find('Body > Warning[type="竜巻注意情報（一次細分区域等）"] > Item'), function(int, r){
                              breakingtime += 900;
                              let t = "";
                              if(Number($(int).find('Kind > Code').text())){
                                t += AreaForecastLocalM.tornado[$(int).find('Area > Code').text()];
                                BNtitle.push($(c).find('Head > Title').text()+"　第"+$(c).find('Serial').text()+"報");
                                BNtext1.push($(c).find('Head > Headline > Text').text());
                                BNtext2.push(t+"に竜巻注意情報が発表されています。");
                                SetMode(3);
                                // BNtitle.push("Hazardous wind watch is in effect.");
                                // BNtext1.push($(c).find('Head > Headline > Text').text());
                                // BNtext2.push(t+"に竜巻注意情報が発表されています。");
                              }
                              SFXController.play(sounds.warning.Notice);
                          });
                          document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                          // if(t != ""){
                          // }
                          // 【竜巻注意情報（第3報）】山梨県中・西部、東部・富士五湖：06日19時50分まで有効
                          // Head > Serial : 第○報
                          // ValidDateTime : 有効期限
                        }
                      });
                    } else if(titleTextCotent.search("記録的短時間大雨情報") !== -1){
                      $.ajax({
                        type: 'GET',
                        url: linkAttrHref,
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let performWeatherLoadEndAt = performance.now() * 1000;
                          if($(c).find('HeadLine > Information > Item > Kind > Code').text() == "1"){
                            breakingtime += 900;
                            BNtitle.push('記録的短時間大雨情報');
                            BNtext1.push($(c).find('Report > Head > Title').text());
                            BNtext2.push($(c).find('Headline > Text').text());
                            BNtitle.push('Heavy Rain Information');
                            BNtext1.push($(c).find('Report > Head > Title').text());
                            BNtext2.push($(c).find('Headline > Text').text());
                            SetMode(3);
                            SFXController.play(sounds.warning.HeavyRain);
                          }
                          document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                        }
                      });
                    } else if(titleTextCotent === "土砂災害警戒情報"){
                      $.ajax({
                        type: 'GET',
                        url: linkAttrHref,
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          const performWeatherLoadEndAt = performance.now() * 1000;
                          if ($(c).find('Headline > Information > Item > Kind > Condition').text() === "解除"){
                            breakingtime += 900;
                            BNtitle.push('土砂災害警戒情報 解除');
                            BNtext1.push($(c).find('Headline > Text').text());
                            BNtext2.push("<土砂災害警戒情報 解除>　対象地域："+$(c).find('TargetArea > Name').text());
                            SetMode(3);
                            speechBase.start([{ type: "path", speakerId: "speaker8", path: "ground.area."+$(c).find('TargetArea > Code').text() }, { type: "path", speakerId: "speaker8", path: "ground.clear" }]);
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
                              for (const area of areatexts){
                                breakingtime += 900;
                                BNtitle.push('土砂災害警戒情報　' + $(c).find('TargetArea > Name').text());
                                BNtext1.push($(c).find('Headline > Text').text());
                                BNtext2.push("［"+infoType+"］"+area);
                              }
                              if (infoType === "発表") speechBase.start([
                                { type: "wait", time: 500 },
                                { type: "path", speakerId: "speaker8", path: "ground.area."+$(c).find('TargetArea > Code').text() },
                                { type: "path", speakerId: "speaker8", path: "ground.issue" }
                              ]);
                              SetMode(3);
                            }
                            SFXController.play(sounds.warning.GroundLoosening);
                          }
                          document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                        }
                      });
                    } else if(titleTextCotent === "気象特別警報報知") {
                      $.ajax({
                        type: 'GET',
                        url: $(this).find('link').attr('href'),
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let performWeatherLoadEndAt = performance.now() * 1000;
                          if($(c).find('Head > Headline > Information[type="気象特別警報報知（府県予報区等）"] > Item > Kind > Name').text() != "解除"){
                            BNtitle.push('【気象特別警報報知】');
                            BNtext1.push('何らかの災害が既に発生している可能性が高く、警戒レベル5(最大)に相当する状況です。');
                            BNtext2.push('気象特別警報が発表中');
                            BNtitle.push('【気象特別警報報知】');
                            BNtext1.push('Rainfall is reaching a locally unprecedented level of intensity. This is an extraordinary situation with serious potential for disaster conditions.');
                            BNtext2.push('An heavy rain emergency warning is in effect.');
                            breakingtime += 1800;
                            Array.from(c.querySelectorAll('Head > Headline > Information[type="気象特別警報報知（市町村等）"] > Item')).forEach(function(e2){
                              BNtitle.push("【 "+Array.from(e2.querySelectorAll('Kind > Name')).map(item=>item.textContent).join("・")+"　発表中 】");
                              BNtext2.push("対象地域："+c.querySelector('Head > Headline > Information[type="気象特別警報報知（府県予報区等）"] > Item > Areas > Area > Name').textContent + e2.querySelector('Areas > Area > Name').textContent);
                              BNtext1.push("次の地域に" + Array.from(e2.querySelectorAll('Kind > Name')).map(item=>item.textContent).join("・") + "が発表されています。最大級の警戒をしてください。");
                              breakingtime += 900;
                            });
                            SFXController.play(sounds.warning.Emergency);
                          } else {
                            BNtitle.push('【気象特別警報報知】');
                            BNtext1.push('発表されていた特別警報は警報へ切り替えられましたが、引き続き最新情報にご注意ください。');
                            BNtext2.push('警報に切り替え：'+c.querySelector('Head > Headline > Information[type="気象特別警報報知（府県予報区等）"] > Item > Areas > Area > Name').textContent);
                            breakingtime += 900;
                          }
                          document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                        }
                      });
                    } else if(titleTextCotent === "指定河川洪水予報"){
                      $.ajax({
                        type: 'GET',
                        url: $(this).find('link').attr('href'),
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let performWeatherLoadEndAt = performance.now() * 1000;
                          let level = Number($(c).find('Headline > Information[type="指定河川洪水予報（河川）"] Kind > Code').text());
                          let t1="",t2="",t="";
                          if(ifrange(level, 50, 51)){
                            SFXController.play(sounds.warning.Flood5);
                            let riverAreaName = $(c).find('Headline > Information[type="指定河川洪水予報（予報区域）"] > Item > Areas > Area > Name').text();
                            let riverTitle = "【 "+c.querySelector("Head > Title").textContent+" / 警戒レベル５相当 】";
                            BNtitle.push(riverTitle);
                            BNtext1.push(c.querySelector('Head > Headline > Text').textContent);
                            BNtext2.push(riverAreaName + "では、氾濫が発生した模様。");
                            breakingtime += 900;
                            c.querySelectorAll('Body > Warning[type="指定河川洪水予報"] > Item').forEach(c2 => {
                              let type = c2.querySelector("Property > Type").textContent;
                              switch (type){
                              case "主文":
                                BNtitle.push(riverTitle);
                                BNtext1.push($(c2).find('Kind > Property > Text').text());
                                if (c2.getElementsByTagName("Areas").length){
                                  BNtext2.push("対象の水位観測所： "+c2.querySelector("Areas > Area > Name").textContent+" "+c2.querySelector("Stations > Station > Name").textContent+"水位観測所 （"+c2.querySelector("Stations > Station > Location").textContent+"）");
                                } else {
                                  BNtext2.push(riverAreaName + "で氾濫発生。すぐに安全の確保をしてください。");
                                }
                                breakingtime += 900;
                                break;
                              case "浸水想定地区":
                                let warningAreas = "";
                                c2.querySelectorAll("Areas > Area").forEach(function(e2){
                                  warningAreas += " "+e2.getElementsByTagName("City")[0].textContent+e2.getElementsByTagName("Name")[0].textContent;
                                  if (warningAreas.length > 40){
                                    BNtitle.push(riverTitle);
                                    BNtext1.push("対象河川："+riverAreaName);
                                    BNtext2.push("氾濫による浸水に注意："+warningAreas);
                                    breakingtime += 900;
                                    warningAreas = "";
                                  }
                                });
                                if (warningAreas){
                                  BNtitle.push(riverTitle);
                                  BNtext1.push("対象河川："+riverAreaName);
                                  BNtext2.push("氾濫による浸水に注意："+warningAreas);
                                  breakingtime += 900;
                                }
                                break;
                              }
                            });
                            SetMode(3);
                          } else if(ifrange(level, 40, 41)){
                            SFXController.play(sounds.warning.Flood4);
                            let riverAreaName = $(c).find('Headline > Information[type="指定河川洪水予報（予報区域）"] > Item > Areas > Area > Name').text();
                            let riverHeader = "【 " + $(c).find('Head > Title').text() + " / 警戒レベル４相当 】";
                            BNtitle.push(riverHeader);
                            BNtext1.push($(c).find('Headline > Text').text());
                            BNtext2.push("対象河川： "+riverAreaName);
                            breakingtime += 900;
                            c.querySelectorAll('Body > Warning[type="指定河川洪水予報"] > Item').forEach(function(e){
                              let type = e.querySelector("Property > Type").textContent;
                              switch (type){
                                case "主文":
                                  BNtitle.push(riverHeader);
                                  BNtext1.push($(e).find('Property > Text').text());
                                  BNtext2.push("対象の水位観測所： "+e.querySelector("Areas > Area > Name").textContent+" "+e.querySelector("Stations > Station > Name").textContent+"水位観測所 （"+e.querySelector("Stations > Station > Location").textContent+"）");
                                  breakingtime += 900;
                                  break;
                                case "浸水想定地区":
                                  let warningAreas = "";
                                  e.querySelectorAll("Areas > Area").forEach(function(e2){
                                    warningAreas += " "+e2.getElementsByTagName("City")[0].textContent+e2.getElementsByTagName("Name")[0].textContent;
                                    if (warningAreas.length > 40){
                                      BNtitle.push(riverHeader);
                                      BNtext1.push("対象河川："+riverAreaName);
                                      BNtext2.push("氾濫による浸水に注意："+warningAreas);
                                      breakingtime += 900;
                                      warningAreas = "";
                                    }
                                  });
                                  if (warningAreas){
                                    BNtitle.push(riverHeader);
                                    BNtext1.push("対象河川："+riverAreaName);
                                    BNtext2.push("氾濫による浸水に注意："+warningAreas);
                                    breakingtime += 900;
                                  }
                                  break;
                              }
                            });
                          }
                          SetMode(3);
                          elements.id.dbPfDrawing.innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                        }
                      });
                    } else if(titleTextCotent === "全般台風情報"){
                      $.ajax({
                        type: 'GET',
                        url: $(this).find('link').attr('href'),
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let texts = c.getElementsByTagName("Text");
                          let headcomment = texts[0].textContent.replaceAll(/(\s){1,}/g,"　");
                          let bodycomment = texts[1].textContent.split("\n\n").map(text => text.replaceAll(/(\s){1,}/g,"　"));
                          if (bodycomment === "なし") bodycomment = "";
                          const linelist = headcomment.split("。").map(item => item+"。");
                          const headcmtlist = [""];
                          for (const line of linelist){
                            headcmtlist[headcmtlist.length - 1] += line;
                            if (headcmtlist[headcmtlist.length - 1].length > 80) headcmtlist.push("");
                          }
                          headcmtlist.splice(-1, 1);
                          for (const key in bodycomment) {
                            const item = bodycomment[key];
                            breakingtime += 900;
                            BNtitle.push("【全般台風情報】");
                            BNtext1.push(item);
                            BNtext2.push(headcmtlist[0] ?? "");
                            headcmtlist.splice(0, 1);
                          }
                          for (const item of headcmtlist){
                            breakingtime += 900;
                            BNtitle.push("【全般台風情報】");
                            BNtext1.push("");
                            BNtext2.push(item);
                          }
                        }
                      });
                    }
                  }
              });
              weatherlink = arr;
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            if (textStatus=="timeout") console.warn("接続がタイムアウトしました。("+XMLHttpRequest.status+")"); else errorCollector.collect("XMLHttpRequestでエラーが発生しました。isTrustedはundefinedです。\nRequest Type: WeatherInformation / Timeout: 0(ms)");
          }
      })
  });
}

function ifrange(n, e1, e2, cd=[0,0]){
  let r1, r2;
  if(cd[0]==0)r1=(e1<=n);else r1=(e1<n);
  if(cd[1]==0)r2=(n<=e2);else r2=(n<e2);
  return r1&&r2;
}
function toFull(str){
  return str.replace(/[A-Za-z0-9]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)
  }).replace(/</g, "［").replace(/>/g, "］");
}

function reflect(md){
  timeCount = 1;
  earthquake_telop_times = q_magnitude!="--" ? 0 : -1027;
  earthquake_telop_remaining = 1500;
  if(md == 1){
    if(msi > 4)msi++;
    siHnum = document.siHform.siH.selectedIndex;
    siHstr = document.siHform.siH.options[siHnum].value;
    msi = Number(siHstr);
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = document.getElementById("mag").value;
    q_epiName = document.getElementById("epi").value;
    q_epiId = epicenter_list[0].indexOf(q_epiName);
    if (q_epiId == -1) q_epiId--;
    q_depth = document.getElementById("dep").value;
    q_timeYY = document.getElementById("year").value;
    q_timeMM = document.getElementById("month").value;
    q_timeDD = document.getElementById("day").value;
    q_timeH = document.getElementById("hour").value;
    q_timeM = document.getElementById("minute").value;
    mainText[1] = document.getElementById("1").value;
    mainText[2] = document.getElementById("2").value;
    mainText[3] = document.getElementById("3").value;
    mainText[4] = document.getElementById("4").value;
    mainText[5] = document.getElementById("5弱以上と推定").value;
    mainText[6] = document.getElementById("5弱").value;
    mainText[7] = document.getElementById("5強").value;
    mainText[8] = document.getElementById("6弱").value;
    mainText[9] = document.getElementById("6強").value;
    mainText[10] = document.getElementById("7").value;
  }
  const magnitude_r = {"-901": "不明", "-902": "8を超える巨大地震"};
  if(q_magnitude !== "--"){
    mainText[0] = q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。震源は"+q_epiName+"、地震の規模を示すマグニチュードは"+(magnitude_r[q_magnitude] || q_magnitude);
    if(q_depth == "ごく浅い") mainText[0] += "、震源は"+q_depth+"です。"; else mainText[0] += "、震源の深さは"+q_depth+"kmです。";
    mainText[0] += quake_customComment;
  } else {
    mainText[0] = "<<震度速報>> "+q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。"+multilingual[0][63];
    mainText[0] += "震源が沖の場合、津波が発生する恐れがあります。海岸から離れるようにしてください。";
  }
  if(q_magnitude !== "--"){
    mainText[0] += "　　　　　　　An earthquake has occurred at around "+q_timeH+":"+q_timeM+" (JST). The region name was " + epicenter_list[1][q_epiId] + ". The magnitude of earthquake was estimated at "+(magnitude_r[q_magnitude] || q_magnitude)+". This earthquake resulted in " + nhkSiList[msi]+" of the maximum seismic intensity recorded.";
    if(q_depth == "ごく浅い") mainText[0] += " The depth was very shallow."; else mainText[0] += " The depth was "+q_depth+"km.";
  } else {
    mainText[0] += "　　　　　　　The earthquake has just occurred.  This earthquake resulted in "+nhkSiList[msi]+" of the maximum seismic intensity recorded.  "+multilingual[1][63];
    if(msi > 5){ // NOTE: AM PM表記の方がいいよね
      //mainText[0] = "震源が海底ですと、津波が発生する恐れがあります。海岸から離れるようにしてください。"
    }
  }
  // NOTE: (時間)頃、地震が発生しました。この地震により、最大震度5+を観測しています。
  // NOTE: (time)頃、(area)の深さ(depth)kmの場所で、マグニチュード(M)の地震が発生しました。この地震により観測された最大震度は(intensity)です。
  //  英語版は気象庁震度はあまり重要視しない方が良いかも？
  // An earthquake has just occurred.
  // 一応気象庁の多言語辞書に従っておきます。
  SetMode(2);
  language = "Ja";
  textOffsetX = 1200;
  let titletext = "", windtext = "";
  if (q_magnitude != "--") titletext = "[地震情報](" + q_timeH + ":" + q_timeM + "頃発生) 震源地:" + q_epiName + " 最大震度:" + siList[msi] + " M" + (magnitude_r[q_magnitude] || q_magnitude) + " 深さ:" + ((q_depth == "ごく浅い")?q_depth:"約"+q_depth+"km"); else titletext = "＜震度速報＞　" + q_timeH + "時" + q_timeM + "分頃発生　最大震度" + siList[msi];
  document.getElementById("eiTitle").innerText = titletext;
  document.getElementById("eiTitle").scrollLeft = 365;
  document.getElementById("eiwind").innerText = "";
  if (msi==-1){
    document.getElementById("eiTitle").innerText = "まだ情報は入っていません。";
    document.getElementById("eiwind").innerText = "There is no information yet.";
  } else {
    for(var i=10; i>0; i--){
      if(mainText[i] != ""){
        windtext += "［震度" + toFull(siList[i]) + "］\n　" + ( (!isSokuho) ? (mainText[i].replace(/　 </g, '\n　').slice(1)) : (mainText[i].replace(/　 </g, '\n　')) ).replace(/> /g, '：') + "\n";
      }
    }
    document.getElementById("eiwind").innerText = windtext;
    if (document.getElementById("setClipQuake").checked) copy(titletext + "\n\n" + windtext.replaceAll("<br>","\n"));
  }
  /*var speakText = "先ほど、最大震度" + siList[msi] + "を観測する地震が発生しました";
  for(var i=10; i>0; i--){
    if(mainText[i] != ""){
      speakText += "。震度" + siList[i] + "を観測した地域は、次の通りです。" + mainText[i].replace(/> /g, '').replace(/ /g, '。');
    }
  }
  speakText += "。以上、地震の情報をお伝えしました。";
  console.log(speakText);
  if(speakText.search('undefined') != -1)speakText="地名情報が正しく読み込めていません。開発者に報告してください。";
  speechSynthesis.cancel();
  speakInterval = setInterval(function(){
      if(sounds.main.currentTime > 3.9689795918 || sounds.warning.currentTime > 3.0040816326){
        speak(speakText, 37, 1, 1, 1, true);
        clearInterval(speakInterval);
      }
  }, 200)*/
}

var isSokuho = false;
var lasteqlist = "";
var num = 0;
var l = [];
function load_quake_list_v2(){
  fetch(RequestURL.nhkQuake1+"&_="+Date.now()).then(res => res.json()).then(data => {
    lastGet.nhkQuake1 = getCTime();
    updateLoadedTime();
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
        if(num === quakeinfo_offset_cnt) quakeinfo_list_html += 'animation: 2s animation_current_quake_view 0s infinite;';
        quakeinfo_list_html += '" class="eiList-button">';
        if(c2.hypocenter.name === "") quakeinfo_list_html += '<span style="color:#fff; background-color:#000 padding:2px;">　';
        quakeinfo_list_html += c2.hypocenter.name === "" ? "震源未確定" : c2.hypocenter.name;
        quakeinfo_list_html += '　最大震度' + earthquake_intensity_list_all[c2.max_shindo];
        quakeinfo_list_html += '　' + event_date.getDate() + "日" + event_date.getHours() + "時" + event_date.getMinutes() + "分頃発生";
        if(c2.hypocenter.name === "") quakeinfo_list_html += "　</span>";
        quakeinfo_list_html += '</button>';
      });
      document.getElementById("eiList").innerHTML = quakeinfo_list_html;
      forEach2(document.getElementsByClassName("eiList-button"), function(c, i){
        c.addEventListener("click", function(e){
          let itemOffset = Number(e.target.getAttribute("data-e"));
          if(itemOffset !== quakeinfo_offset_cnt){
            quakeinfo_offset_cnt = itemOffset;
            quakesContainer.view();
          }
          console.log(
            e.target.getAttribute("id"),
            Number(e.target.getAttribute("name").slice(3)),
            earthquakes_log.hasOwnProperty(e.target.getAttribute("id").slice(2))
          );
        });
      });
    }
    lasteqlist = eqlist;
    load_quake_event_v2(data.quake[quakeinfo_offset_cnt].event_id);
  });
}

var earthquake_latest_identifier = "";
// var earthquake_event_isloading = false;
function load_quake_event_v2(event_id){
  fetch(RequestURL.nhkQuake2.replace("{event_id}", event_id)+"?_="+Date.now()).then(res => {
    lastGet.nhkQuake2 = getCTime();
    updateLoadedTime();
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
      msi = earthquake_intensity_list_all[data.max_shindo];
      csi = msi;
      q_msiText = siList[msi];
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

      mainText = ["","","","","","","","","","",""];
      for (let key in earthquake_intensity_list_all){
        if(data.hasOwnProperty(key)){
          mainText[earthquake_intensity_list_all[key]] = data[key].pref.map(pref => {
            return (isSokuho ? "" : "<"+pref.name+"> ") + pref.uid_list.map(city => city.name).join(" ");
          }).join("　 ");
        }
      }
      quake_customComment = data.forecast_comment;

      // 初回起動時判定
      if (last_magnitude){
        reflect(0);
        if(Number(document.getElementsByName("minint")[0].value)<=msi && ((Number(document.getElementsByName("minmag")[0].value)<=Number(q_magnitude) && Number(document.getElementsByName("depmin")[0].value)>=Number(q_depth=="ごく浅い"?0:q_depth))||q_magnitude=="--")){
          SFXController.volume(sounds.quake[elements.class.sound_quake_type[msi - 1].getAttribute("data-type")], elements.class.sound_quake_volume[msi - 1].value / 100);
          SFXController.play(sounds.quake[elements.class.sound_quake_type[msi - 1].getAttribute("data-type")]);
        }
      }
      quakesContainer.hide();
      earthquakes_log[event_id] = {
        epicenter: q_epiName,
        magnitude: q_magnitude,
        msi: msi,
        isSokuho: isSokuho,
        seismic_intensity: q_msiText,
        depth: q_depth,
        timeDD: q_timeDD,
        timeH: q_timeH,
        timeM: q_timeM,
        epicenter_id: q_epiId,
        text: mainText
      };
    }
  });
}

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
function loadTsunami(){
  fetch(RequestURL.tenkiJPtsunami, {
    method: "GET",
    cache: "reload",
    redirect: "error"
  }).then(response=>{
    lastGet.tenkiJPtsunami = getCTime();
    if(!response.ok){ throw "Tsunami Datas were't loaded."; }
    return response.text();
  }).then(texts=>{
    let datas = [
      [...texts.matchAll(/<td class="area">(.*)<\/td>/g)].map(u=>u[1]),
      [...texts.matchAll(/<td class="datetime">(.*)/g)].map(u=>u[1]),
      [...texts.matchAll(/<td class="height">(.*)<\/td>/g)].map(u=>u[1])
    ];
    let reportTime = texts.split("\n")[0].match(/tsunami_report_datetime:(....-..-.. ..:..:..)/)?.[1];
    let list = [];
    for(let i=0,l=datas[0].length; i<l; i++){
      let isValidHeight = true;
      let time = datas[1][i];
      if(time.includes("<span class")) time = time.match(/<span class=".*">(.*)<\/span>/)[1];
      time = time.replace("</td>","").trim().replace("津波到達中","到達中");
      let height = datas[2][i];
      if(height.includes("<span class")) height = height.match(/<span class=".*">(.*)<\/span>/)[1];
      if(height === "---") height = "  (若干の海面変動)", isValidHeight = false;
      if(isValidHeight) list.push({name: datas[0][i], time: time, height: height});
    }
    if(list.length){
      tsunamiTexts = list.map(c=>c.time==="---" ? c.name+" "+c.height+"　 " : c.name+" "+c.height+" ("+c.time+")　 ");
      if(reportTime !== tsunamiLastReport) SFXController.play(sounds.tsunami.Notice);
      t_Cancelled = false;
    } else {
      tsunamiTexts = [];
      t_Cancelled = true;
    };
    tsunamiLastReport = reportTime;
    if(t_Cancelled){
      elements.id.tsunamiList.innerText = "津波の情報はまだ入っていません。\nThere is no information yet.";
    } else {
      let ms = "";
      list.forEach(function(c){
          let mh = Number(c.height.replace(/[^0-9.]/g, ""));
          ms += "<span style='color:";
          ms += (mh==0.2
            ? c.height.slice(3,5)=="未満"
              ? "lightgreen"
              : "yellow"
            : mh<=1
              ? "yellow"
              : mh<=3
                ? "orange"
                : mh>3
                  ? "#f66"
                  : "white")
            +  "'>";　
          ms += c.name;
          ms += "　"+c.height;
          ms += "</span>";
          if(c.time!="---")ms += "　" + c.time;
          ms += "<br>";
      });
      elements.id.tsunamiList.innerHTML = ms;
    }
  });
}

function quakeTemplateView(viewId){
  //siHtem = Number(document.getElementById("template").options[document.getElementById("template").selectedIndex].value);
  textOffsetX = 1200;
  if(viewId == 1){
    msi = 8+1;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "6.8";
    q_epiName = "山形県沖";
    q_epiId = 87;
    q_depth = "10";
    q_timeYY = "2019";
    q_timeMM = "6";
    q_timeDD = "18";
    q_timeH = "22";
    q_timeM = "22";
    mainText[1] = "<北海道>	函館市 帯広市 渡島松前町 福島町 七飯町 檜山江差町　 <青森県>	平内町 横浜町 六ヶ所村 風間浦村　 <岩手県>	岩泉町 田野畑村 軽米町 九戸村 岩手洋野町　 <福島県>	鮫川村　 <茨城県>	龍ケ崎市 牛久市 茨城鹿嶋市 坂東市 美浦村 利根町　 <栃木県>	足利市 佐野市 上三川町 益子町 茂木町 塩谷町　 <群馬県>	館林市 富岡市 みどり市 神流町 甘楽町 長野原町 草津町 玉村町 板倉町　 <埼玉県>	さいたま西区 さいたま北区 さいたま見沼区 さいたま桜区 さいたま浦和区 さいたま南区 川越市 川口市 秩父市 本庄市 東松山市 狭山市 羽生市 深谷市 上尾市 草加市 越谷市 蕨市 戸田市 入間市 朝霞市 志木市 和光市 新座市 桶川市 北本市 蓮田市 坂戸市 鶴ヶ島市 ふじみ野市 伊奈町 埼玉三芳町 滑川町 吉見町 鳩山町 長瀞町　埼玉美里町 埼玉神川町 上里町　 <千葉県>	千葉中央区 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 千葉美浜区 木更津市 東金市 市原市 鎌ケ谷市 山武市 多古町 長南町　 <東京都>	東京千代田区 東京中央区 東京新宿区 東京文京区 東京台東区 東京墨田区 東京江東区 東京品川区 東京大田区 東京世田谷区 東京渋谷区 東京中野区 東京杉並区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京足立区 東京葛飾区 武蔵野市 町田市 小平市 日野市 国分寺市 東大和市 清瀬市 武蔵村山市　 <神奈川県> 横浜中区 川崎川崎区 川崎幸区 川崎中原区 川崎高津区 川崎多摩区 川崎宮前区 茅ヶ崎市　 <富山県>	富山市 高岡市 魚津市 滑川市 黒部市 砺波市 小矢部市 南砺市 舟橋村 上市町 立山町 入善町 富山朝日町　 <石川県>	金沢市 七尾市 羽咋市 かほく市 津幡町 志賀町　 <福井県>	福井坂井市　 <山梨県>	山梨北杜市 甲斐市　 <長野県>	松本市 飯田市 須坂市 小諸市 大町市 茅野市 佐久市 千曲市 東御市 安曇野市 長野南牧村 佐久穂町 御代田町 立科町 青木村 下諏訪町 木曽町 麻績村 生坂村 筑北村 長野池田町 白馬村 小谷村 小布施町　 <静岡県>	静岡清水区 沼津市 富士市 御殿場市 伊豆の国市 静岡清水町";
    mainText[2] = "<北海道>	渡島北斗市 知内町 木古内町 上ノ国町　 <青森県>	弘前市 八戸市 十和田市 三沢市 むつ市 今別町 蓬田村 外ヶ浜町 鰺ヶ沢町 西目屋村 大鰐町 田舎館村 鶴田町 中泊町 野辺地町 七戸町 六戸町 東北町 おいらせ町 大間町 東通村 三戸町 五戸町 田子町 青森南部町 階上町 新郷村　 <岩手県>	宮古市 大船渡市 久慈市 陸前高田市 釜石市 二戸市 葛巻町 岩手町 住田町 大槌町 山田町 一戸町　 <宮城県>	多賀城市 女川町　 <秋田県>	小坂町 八峰町　 <福島県>	檜枝岐村 西郷村 棚倉町 矢祭町 塙町 石川町 玉川村 平田村 浅川町 古殿町 三春町 小野町 葛尾村　 <茨城県>	水戸市 日立市 土浦市 茨城古河市 石岡市 結城市 下妻市 常総市 高萩市 笠間市 取手市 つくば市 ひたちなか市 潮来市 守谷市 常陸大宮市 那珂市 筑西市 稲敷市 かすみがうら市 桜川市 神栖市 鉾田市 つくばみらい市 小美玉市 茨城町 城里町 東海村 大子町 阿見町 河内町 八千代町 五霞町 境町　 <栃木県>	宇都宮市 栃木市 鹿沼市 日光市 小山市 真岡市 大田原市 矢板市 栃木さくら市 那須烏山市 下野市 市貝町 芳賀町 壬生町 野木町 高根沢町 栃木那珂川町　 <群馬県>	前橋市 高崎市 桐生市 伊勢崎市 太田市 安中市 榛東村 吉岡町 中之条町 群馬高山村 東吾妻町 川場村 群馬昭和村 みなかみ町 群馬明和町 千代田町 邑楽町　 <埼玉県>	さいたま大宮区 さいたま中央区 さいたま緑区 熊谷市 行田市 春日部市 鴻巣市 久喜市 八潮市 富士見市 三郷市 幸手市 吉川市 白岡市 川島町 宮代町 松伏町　 <千葉県>	船橋市 松戸市 野田市 流山市 浦安市 印西市 香取市　 <新潟県>	糸魚川市 妙高市 湯沢町　 <富山県>	氷見市 射水市　 <石川県>	輪島市 中能登町　 <山梨県>	忍野村　 <長野県>	長野市 上田市 諏訪市 飯山市 軽井沢町 坂城町 長野高山村 山ノ内町 木島平村 野沢温泉村 信濃町 小川村 飯綱町";
    mainText[3] = "<青森県>	青森市 黒石市 五所川原市 つがる市 平川市 深浦町 藤崎町 板柳町　 <岩手県>	盛岡市 花巻市 北上市 遠野市 一関市 八幡平市 奥州市 滝沢市 雫石町 紫波町 西和賀町 金ケ崎町 平泉町 普代村　 <宮城県>	仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 塩竈市 気仙沼市 白石市 角田市 東松島市 富谷市 七ヶ宿町 柴田町 亘理町 山元町 七ヶ浜町 大和町 大郷町 大衡村 南三陸町　 <秋田県>	能代市 大館市 鹿角市 上小阿仁村 藤里町 五城目町 八郎潟町 大潟村 秋田美郷町　 <山形県>	山形市 寒河江市 天童市 東根市 山形朝日町 大石田町 山形金山町 高畠町 白鷹町　 <福島県>	会津若松市 郡山市 白河市 須賀川市 相馬市 二本松市 田村市 福島伊達市 本宮市 川俣町 大玉村 鏡石町 天栄村 下郷町 只見町 南会津町 北塩原村 磐梯町 三島町 福島金山町 福島昭和村 泉崎村 中島村 矢吹町 楢葉町 富岡町 川内村 大熊町 浪江町 新地町 飯舘村　 <茨城県>	常陸太田市 北茨城市　 <栃木県>	那須塩原市 那須町　 <群馬県>	沼田市 渋川市 片品村　 <埼玉県>	加須市　 <新潟県>	小千谷市 上越市 南魚沼市 田上町 津南町　 <石川県>	珠洲市 能登町　 <長野県>	中野市 栄村";
    mainText[4] = "<岩手県> 矢巾町　 <宮城県> 仙台青葉区 石巻市 名取市 岩沼市 登米市 栗原市 大崎市 蔵王町 大河原町 村田町 宮城川崎町 丸森町 松島町 利府町 色麻町 宮城加美町 涌谷町 宮城美里町　 <秋田県>	秋田市 横手市 男鹿市 湯沢市 潟上市 大仙市 北秋田市 にかほ市 仙北市 三種町 井川町 羽後町 東成瀬村　 <山形県>	米沢市 新庄市 上山市 村山市 長井市 尾花沢市 南陽市 山辺町 中山町 河北町 西川町 大江町 最上町 舟形町 真室川町 鮭川村 戸沢村 山形川西町 山形小国町 飯豊町 庄内町 遊佐町　 <福島県>	福島市 いわき市 喜多方市 南相馬市 桑折町 国見町 西会津町 猪苗代町 会津坂下町 湯川村 柳津町 会津美里町 福島広野町 双葉町　 <新潟県> 新潟北区 新潟東区 新潟中央区 新潟江南区 新潟秋葉区 新潟南区 新潟西区 新潟西蒲区 三条市 新発田市 加茂市 十日町市 見附市 燕市 五泉市 阿賀野市 佐渡市 魚沼市 胎内市 聖籠町 弥彦村 出雲崎町 刈羽村 関川村 粟島浦村";
    mainText[5] = "";
    mainText[6] = "<新潟県> 長岡市 柏崎市 阿賀町　 <山形県> 酒田市 大蔵村 三川町　 <秋田県> 由利本荘市";
    mainText[7] = "";
    mainText[8] = "<山形県> 鶴岡市";
    mainText[9] = "<新潟県> 村上市";
    mainText[10] = "";
  }
  if(viewId == 2){
    msi = 9+1;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "6.7";
    q_epiName = "胆振地方中東部";
    q_epiId = 35;
    q_depth = "40";
    q_timeYY = "2018";
    q_timeMM = "9";
    q_timeDD = "6";
    q_timeH = "3";
    q_timeM = "08";
    mainText[1] = "<北海道> 網走市 音威子府村 中頓別町 佐呂間町 滝上町 西興部村 羅臼町　 <岩手県> 陸前高田市 雫石町 西和賀町 大槌町 岩泉町 田野畑村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 名取市 富谷市 蔵王町 村田町 亘理町 山元町 利府町 大郷町 大衡村 色麻町 宮城加美町　 <秋田県> 秋田市 横手市 男鹿市 湯沢市 由利本荘市 にかほ市 仙北市 小坂町 上小阿仁村 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 米沢市 鶴岡市 新庄市 寒河江市 上山市 天童市 山辺町 河北町 最上町 舟形町 大蔵村 鮭川村 三川町 庄内町　 <福島県> 福島市 郡山市 いわき市 須賀川市 相馬市 田村市 天栄村 玉川村 福島広野町 大熊町 浪江町　 <茨城県> 日立市 土浦市 石岡市 笠間市 常陸大宮市 筑西市　 <埼玉県> 春日部市　 <新潟県> 村上市";
    mainText[2] = "<北海道> 稚内市 紋別市 渡島松前町 福島町 奥尻町 寿都町 泊村 上川地方上川町 下川町 美深町 上川中川町 初山別村 遠別町 天塩町 浜頓別町 宗谷枝幸町 豊富町 利尻富士町 幌延町 美幌町 津別町 斜里町 清里町 小清水町 訓子府町 置戸町 遠軽町 湧別町 雄武町 えりも町 陸別町 厚岸町 浜中町 弟子屈町 中標津町　 <青森県> 弘前市 黒石市 鰺ヶ沢町 深浦町 西目屋村 大鰐町 中泊町 田子町 新郷村　 <岩手県> 大船渡市 花巻市 北上市 遠野市 一関市 釜石市 八幡平市 奥州市 滝沢市 葛巻町 岩手町 紫波町 金ケ崎町 平泉町 住田町 山田町 九戸村 岩手洋野町 一戸町　 <宮城県> 気仙沼市 角田市 岩沼市 登米市 栗原市 東松島市 大崎市 大河原町 宮城川崎町 丸森町 松島町 宮城美里町 南三陸町　 <秋田県> 能代市 大館市 鹿角市 潟上市 大仙市 北秋田市 藤里町 三種町 八峰町 井川町　 <山形県> 酒田市 村山市 中山町 遊佐町　 <福島県> 南相馬市 双葉町";
    mainText[3] = "<北海道> 札幌南区 北見市 赤平市 士別市 名寄市 根室市 歌志内市 渡島北斗市 知内町 木古内町 八雲町 檜山江差町 厚沢部町 今金町 島牧村 黒松内町 蘭越町 京極町 共和町 岩内町 神恵内村 積丹町 古平町 仁木町 上砂川町 東神楽町 比布町 愛別町 東川町 美瑛町 上富良野町 和寒町 幌加内町 小平町 苫前町 羽幌町 猿払村 興部町 大空町 豊浦町 士幌町 上士幌町 中札内村 更別村 広尾町 豊頃町 本別町 足寄町 釧路町 標茶町 鶴居村 白糠町 別海町 標津町　 <青森県> 青森市 八戸市 五所川原市 十和田市 三沢市 つがる市 平川市 平内町 今別町 蓬田村 外ヶ浜町 藤崎町 田舎館村 板柳町 鶴田町 野辺地町 七戸町 六戸町 横浜町 東北町 六ヶ所村 おいらせ町 風間浦村 佐井村 三戸町 五戸町 青森南部町　 <岩手県> 盛岡市 宮古市 久慈市 二戸市 矢巾町 普代村 軽米町 野田村　 <宮城県> 石巻市 涌谷町";
    mainText[4] = "<北海道> 札幌中央区 小樽市 旭川市 釧路市 帯広市 夕張市 留萌市 美唄市 芦別市 滝川市 砂川市 深川市 富良野市 当別町 七飯町 鹿部町 渡島森町 長万部町 上ノ国町 乙部町 せたな町 ニセコ町 真狩村 留寿都村 喜茂別町 倶知安町 余市町 赤井川村 奈井江町 月形町 浦臼町 新十津川町 妹背牛町 秩父別町 北竜町 沼田町 鷹栖町 当麻町 中富良野町 南富良野町 占冠村 剣淵町 増毛町 壮瞥町 洞爺湖町 浦河町 音更町 鹿追町 新得町 十勝清水町 芽室町 十勝大樹町 幕別町 十勝池田町 浦幌町　 <青森県> むつ市 大間町 東通村 階上町";
    mainText[5] = "";
    mainText[6] = "<北海道> 函館市 室蘭市 岩見沢市 登別市 胆振伊達市 北広島市 石狩市 新篠津村 南幌町 由仁町 栗山町 白老町";
    mainText[7] = "<北海道> 札幌北区 苫小牧市 江別市 三笠市 恵庭市 長沼町 新冠町 新ひだか町";
    mainText[8] = "<北海道> 千歳市 日高地方日高町 平取町";
    mainText[9] = "<北海道> 安平町 むかわ町";
    mainText[10] = "<北海道> 厚真町";
  }
  if(viewId == 3){
    msi = 7+1;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "5.9";
    q_epiName = "大阪府北部";
    q_epiId = 171;
    q_depth = "10";
    q_timeYY = "2018";
    q_timeMM = "6";
    q_timeDD = "18";
    q_timeH = "7";
    q_timeM = "58";
    mainText[1] = "<茨城県> 筑西市　 <埼玉県> さいたま中央区 さいたま緑区 熊谷市 加須市 春日部市 鴻巣市 志木市 久喜市 富士見市 川島町 宮代町　 <東京都> 東京北区 東京板橋区　 <神奈川県> 川崎川崎区 川崎中原区 川崎宮前区 藤沢市 湯河原町　 <新潟県> 糸魚川市 上越市　 <富山県> 富山市 魚津市 砺波市 上市町 立山町 富山朝日町　 <石川県> 七尾市 珠洲市 羽咋市 穴水町　 <山梨県> 甲州市 山梨南部町 富士河口湖町　 <長野県> 長野市 松本市 上田市 岡谷市 伊那市 塩尻市 佐久市 東御市 安曇野市 軽井沢町 御代田町 立科町 富士見町 原村 辰野町 南箕輪村 中川村 宮田村 阿南町 下條村 売木村 天龍村 大鹿村 木祖村 大桑村 山形村 坂城町　 <岐阜県> 七宗町 白川町 東白川村 白川村　 <静岡県> 静岡葵区 静岡駿河区 沼津市 三島市 富士宮市 島田市 焼津市 御殿場市 伊豆市 御前崎市 河津町 西伊豆町 静岡清水町 長泉町 吉田町 川根本町 静岡森町　 <愛知県> 設楽町 東栄町 豊根村　 <三重県> 南伊勢町　 <和歌山県> 和歌山印南町 すさみ町　 <鳥取県> 岩美町 三朝町 大山町 日南町 鳥取日野町 江府町　 <島根県> 益田市 安来市 江津市 奥出雲町 川本町 島根美郷町 邑南町　 <岡山県> 井原市 高梁市 新見市 新庄村 久米南町 吉備中央町　 <広島県> 広島中区 広島南区 広島西区 広島安佐北区 広島安芸区 広島府中市 広島三次市 庄原市 大竹市 東広島市 廿日市市 海田町 世羅町 神石高原町　 <山口県> 下関市 宇部市 山口市 岩国市 周防大島町 平生町　 <徳島県> 徳島三好市 勝浦町 上勝町 佐那河内村 神山町 つるぎ町 東みよし町　 <愛媛県> 宇和島市 八幡浜市 新居浜市 西条市 四国中央市 東温市 伊方町　 <高知県> 室戸市 南国市 高知香南市 香美市 東洋町 安田町 北川村 馬路村 大豊町 黒潮町　 <福岡県> 中間市　 <佐賀県> 神埼市 白石町";
    mainText[2] = "<富山県> 高岡市 氷見市 滑川市 小矢部市 南砺市 射水市 舟橋村　 <石川県> 金沢市 小松市 輪島市 かほく市 白山市 能美市 川北町 津幡町 志賀町 宝達志水町 中能登町 能登町　 <福井県> 大野市 勝山市 永平寺町 南越前町 福井美浜町　 <山梨県> 甲府市 南アルプス市 山梨北杜市 中央市 市川三郷町 富士川町 忍野村 山中湖村　 <長野県> 諏訪市 駒ヶ根市 茅野市 長野南牧村 下諏訪町 箕輪町 飯島町 松川町 長野高森町 阿智村 平谷村 根羽村 泰阜村 喬木村 豊丘村 上松町 南木曽町 王滝村 木曽町　 <岐阜県> 高山市 中津川市 恵那市 各務原市 可児市 飛騨市 郡上市 下呂市 坂祝町 富加町 川辺町 八百津町 御嵩町　 <静岡県> 静岡清水区 浜松中区 浜松東区 浜松西区 浜松南区 浜松北区 浜松天竜区 富士市 磐田市 掛川市 藤枝市 湖西市 伊豆の国市 牧之原市　 <愛知県> 名古屋千種区 名古屋東区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋守山区 名古屋緑区 名古屋名東区 名古屋天白区 豊橋市 岡崎市 瀬戸市 春日井市 豊川市 碧南市 犬山市 愛知江南市 小牧市 新城市 知立市 岩倉市 日進市 田原市 北名古屋市 大口町 扶桑町 大治町 東浦町 南知多町 幸田町　 <三重県> 伊勢市 桑名市 熊野市 いなべ市 志摩市 木曽岬町 東員町 菰野町 多気町 三重明和町 大台町 玉城町 三重大紀町 三重御浜町 紀宝町　 <京都府> 綾部市　 <兵庫県> 市川町 佐用町 新温泉町　 <奈良県> 野迫川村 十津川村 下北山村 上北山村　 <和歌山県> 和歌山市 御坊市 紀美野町 九度山町 湯浅町 有田川町 和歌山美浜町 和歌山日高町 由良町 みなべ町 日高川町 白浜町 上富田町 那智勝浦町 太地町 古座川町 北山村 串本町　 <鳥取県> 米子市 倉吉市 境港市 鳥取若桜町 智頭町 八頭町 琴浦町 日吉津村 鳥取南部町 伯耆町　 <島根県> 松江市 浜田市 出雲市 大田市 雲南市 海士町　 <岡山県> 笠岡市 総社市 浅口市 早島町 矢掛町 鏡野町 勝央町 奈義町 西粟倉村 岡山美咲町　 <広島県> 広島安佐南区 呉市 竹原市 三原市 尾道市 福山市 安芸高田市 江田島市 坂町 大崎上島町　 <山口県> 萩市 柳井市　 <徳島県> 阿南市 吉野川市 阿波市 美馬市 石井町 那賀町 牟岐町 美波町 海陽町 北島町 藍住町 板野町 上板町　 <香川県>	坂出市 観音寺市 東かがわ市 三木町 直島町 宇多津町 綾川町 琴平町 多度津町 まんのう町　 <愛媛県> 松山市　 <高知県> 高知市 安芸市 奈半利町 田野町 芸西村";
    mainText[3] = "<石川県> 加賀市　 <福井県> 福井市 敦賀市 小浜市 鯖江市 あわら市 越前市 福井坂井市 福井池田町 越前町 福井おおい町 福井若狭町　 <長野県> 飯田市　 <岐阜県> 大垣市 多治見市 関市 美濃市 瑞浪市 羽島市 美濃加茂市 土岐市 岐阜山県市 瑞穂市 本巣市 海津市 岐南町 笠松町 垂井町 関ケ原町 神戸町 輪之内町 揖斐川町 大野町 岐阜池田町 北方町　 <静岡県> 袋井市 菊川市　 <愛知県> 名古屋北区 名古屋西区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 一宮市 半田市 愛知津島市 刈谷市 豊田市 安城市 西尾市 蒲郡市 常滑市 稲沢市 東海市 大府市 知多市 尾張旭市 高浜市 豊明市 愛西市 清須市 弥富市 愛知みよし市 あま市 長久手市 東郷町 蟹江町 飛島村 阿久比町 愛知美浜町 武豊町　 <三重県> 津市 松阪市 鈴鹿市 名張市 尾鷲市 亀山市 伊賀市 三重朝日町 川越町 三重紀北町　 <滋賀県> 守山市 高島市 滋賀日野町 愛荘町 豊郷町 甲良町 多賀町　 <京都府> 福知山市 舞鶴市 宮津市 和束町 伊根町 与謝野町　 <大阪府> 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 大阪堺市美原区 貝塚市 泉佐野市 河内長野市 高石市 泉南市 大阪狭山市 阪南市 忠岡町 田尻町 大阪岬町　 <兵庫県> 神戸須磨区 相生市 加古川市 赤穂市 西脇市 高砂市 小野市 加西市 養父市 丹波市 南あわじ市 朝来市 宍粟市 加東市 たつの市 多可町 兵庫稲美町 播磨町 福崎町 兵庫神河町 兵庫太子町 上郡町 兵庫香美町　<奈良県> 五條市 山添村 曽爾村 明日香村 下市町 黒滝村 天川村 奈良川上村 東吉野村　 <和歌山県> 海南市 橋本市 有田市 田辺市 新宮市 紀の川市 岩出市 かつらぎ町 高野町 和歌山広川町　 <鳥取県> 鳥取市 湯梨浜町 北栄町　 <島根県> 隠岐の島町　 <岡山県> 岡山北区 岡山中区 岡山東区 岡山南区 倉敷市 津山市 玉野市 備前市 瀬戸内市 赤磐市 真庭市 美作市 和気町 里庄町　 <広島県> 府中町　 <徳島県> 徳島市 鳴門市 小松島市 松茂町　 <香川県> 高松市 丸亀市 さぬき市 三豊市 土庄町　 <愛媛県> 今治市 上島町";
    mainText[4] = "<福井県> 高浜町　 <岐阜県> 岐阜市 養老町 安八町　 <愛知県> 名古屋南区　 <三重県> 四日市市　 <滋賀県> 彦根市 長浜市 近江八幡市 草津市 栗東市 甲賀市 野洲市 湖南市 東近江市 米原市 竜王町　 <京都府> 京都北区 京都上京区 京都左京区 京都東山区 京都下京区 京都南区 京都右京区 京都山科区 京丹後市 木津川市 宇治田原町 笠置町 南山城村 京丹波町　 <大阪府> 大阪西区 大阪大正区 大阪天王寺区 大阪浪速区 大阪東成区 大阪城東区 大阪阿倍野区 大阪住吉区 大阪東住吉区 大阪西成区 大阪鶴見区 大阪住之江区 大阪平野区 大阪中央区 大阪堺市堺区 岸和田市 泉大津市 八尾市 富田林市 松原市 大阪和泉市 柏原市 羽曳野市 門真市 藤井寺市 東大阪市 大阪太子町 河南町 千早赤阪村　 <兵庫県> 神戸東灘区 神戸灘区 神戸兵庫区 神戸長田区 神戸垂水区 神戸北区 神戸中央区 神戸西区 姫路市 明石市 洲本市 芦屋市 豊岡市 宝塚市 三木市 三田市 篠山市 淡路市 猪名川町　 <奈良県> 奈良市 大和高田市 天理市 橿原市 桜井市 生駒市 香芝市 葛城市 宇陀市 平群町 三郷町 斑鳩町 安堵町 奈良川西町 田原本町 御杖村 上牧町 王寺町 河合町 吉野町 大淀町　 <香川県> 小豆島町";
    mainText[5] = "";
    mainText[6] = "<滋賀県> 大津市　 <京都府> 宇治市 城陽市 向日市 京田辺市 南丹市 井手町 精華町　 <大阪府> 大阪福島区 大阪此花区 大阪港区 大阪西淀川区 大阪生野区 池田市 守口市 大東市 四條畷市 豊能町 能勢町　 <兵庫県> 尼崎市 西宮市 伊丹市 川西市　 <奈良県> 大和郡山市 御所市 高取町 広陵町";
    mainText[7] = "<京都府> 京都中京区 京都伏見区 京都西京区 亀岡市 長岡京市 八幡市 大山崎町 久御山町　 <大阪府> 大阪都島区 大阪東淀川区 大阪旭区 大阪淀川区 豊中市 吹田市 寝屋川市 摂津市 交野市 島本町";
    mainText[8] = "<大阪府> 大阪北区 高槻市 枚方市 茨木市 箕面市";
    mainText[9] = "";
    mainText[10] = "";
  }
  if(viewId == 4){
    msi = 7+1;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "6.6";
    q_epiName = "鳥取県中部";
    q_epiId = 180;
    q_depth = "10";
    q_timeYY = "2016";
    q_timeMM = "10";
    q_timeDD = "21";
    q_timeH = "14";
    q_timeM = "07";
    mainText[1] = "<茨城県> 茨城鹿嶋市 筑西市 坂東市　 <群馬県> 群馬明和町 邑楽町　 <埼玉県> さいたま西区 さいたま北区 さいたま大宮区 さいたま桜区 さいたま浦和区 さいたま緑区 さいたま岩槻区 川越市 熊谷市 川口市 加須市 草加市 蕨市 戸田市 入間市 志木市 和光市 新座市 久喜市 八潮市 蓮田市 鶴ヶ島市 伊奈町 川島町 宮代町 杉戸町　 <千葉県> 千葉中央区 千葉花見川区 千葉若葉区 木更津市 浦安市 長柄町　 <東京都> 東京千代田区 東京中央区 東京文京区 東京墨田区 東京江東区 東京大田区 東京世田谷区 東京渋谷区 東京中野区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京足立区 東京葛飾区 東京江戸川区 八王子市 東京府中市 昭島市 調布市 小平市 日野市 国分寺市 狛江市 武蔵村山市 多摩市　 <神奈川県> 横浜中区 川崎川崎区 川崎中原区 相模原中央区 茅ヶ崎市 湯河原町　 <富山県> 富山市 高岡市 滑川市 小矢部市 南砺市 射水市 舟橋村　 <石川県> 金沢市 七尾市 珠洲市 羽咋市 かほく市 白山市 津幡町 穴水町 能登町　 <福井県> 勝山市 永平寺町 福井池田町　 <山梨県> 甲斐市 甲州市 富士河口湖町　 <長野県> 松本市 岡谷市 塩尻市 佐久市 長野南牧村 御代田町 下諏訪町 富士見町 原村 辰野町 箕輪町 南箕輪村 中川村 阿南町 阿智村 根羽村 下條村 売木村 天龍村 泰阜村 喬木村 豊丘村 大鹿村 上松町 南木曽町 木祖村 王滝村 大桑村 木曽町　 <岐阜県> 高山市 関市 美濃市 可児市 郡上市 下呂市 坂祝町 富加町 川辺町 七宗町 八百津町 白川町 東白川村 御嵩町　 <静岡県> 静岡葵区 静岡清水区 浜松中区 浜松東区 浜松南区 浜松浜北区 浜松天竜区 沼津市 富士宮市 島田市 焼津市 掛川市 藤枝市 御殿場市 御前崎市 西伊豆町 静岡清水町 小山町 吉田町 川根本町 静岡森町　 <愛知県> 岡崎市 蒲郡市 南知多町 幸田町 設楽町　 <三重県> 伊勢市 松阪市 熊野市 東員町 菰野町 三重紀北町　 <奈良県> 五條市 山添村 平群町 曽爾村 御杖村 明日香村 吉野町 大淀町 天川村 奈良川上村　 <和歌山県> 新宮市 紀美野町 高野町 湯浅町 有田川町 日高川町 白浜町 すさみ町 那智勝浦町 太地町 古座川町　 <山口県> 美祢市　 <愛媛県> 砥部町 松野町 愛南町　 <高知県> 宿毛市 土佐清水市 四万十市 梼原町 高知津野町 四万十町　 <福岡県> 北九州門司区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡西区 飯塚市 田川市 八女市 筑後市 豊前市 筑紫野市 大野城市 福岡古賀市 宮若市 糸島市 宇美町 篠栗町 志免町 須恵町 粕屋町 岡垣町 小竹町 鞍手町 東峰村 大木町 香春町 福岡川崎町 大任町 苅田町 上毛町 築上町　 <佐賀県> 唐津市 多久市 武雄市 嬉野市 吉野ヶ里町 基山町 有田町 大町町　 <長崎県> 佐世保市 島原市 諫早市 松浦市 壱岐市 雲仙市 南島原市 川棚町 佐々町　 <熊本県> 八代市 人吉市 山鹿市 宇土市 益城町 多良木町　 <大分県> 日田市 玖珠町　 <宮崎県> 高千穂町";
    mainText[2] = "<富山県> 氷見市　 <石川県> 小松市 輪島市 加賀市 中能登町　 <福井県> 福井市 大野市 鯖江市 あわら市 越前市 福井坂井市 南越前町 福井美浜町 福井若狭町　 <山梨県> 甲府市 南アルプス市 山梨北杜市 笛吹市 中央市 昭和町 忍野村 山中湖村　 <長野県> 飯田市 諏訪市 伊那市 駒ヶ根市 茅野市 飯島町 宮田村 松川町 長野高森町 平谷村　 <岐阜県> 岐阜市 大垣市 多治見市 中津川市 瑞浪市 羽島市 恵那市 美濃加茂市 土岐市 各務原市 岐阜山県市 本巣市 岐南町 笠松町 垂井町 関ケ原町 神戸町 安八町 揖斐川町 大野町 岐阜池田町 北方町　 <静岡県> 浜松西区 浜松北区 富士市 磐田市 袋井市 湖西市 菊川市 伊豆の国市 牧之原市　 <愛知県> 名古屋千種区 名古屋東区 名古屋北区 名古屋西区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 名古屋南区 名古屋守山区 名古屋緑区 名古屋名東区 名古屋天白区 豊橋市 一宮市 瀬戸市 半田市 春日井市 豊川市 愛知津島市 碧南市 刈谷市 豊田市 安城市 西尾市 犬山市 常滑市 愛知江南市 小牧市 稲沢市 新城市 東海市 大府市 知多市 知立市 尾張旭市 高浜市 岩倉市 豊明市 日進市 田原市 清須市 北名古屋市 愛知みよし市 あま市 東郷町 豊山町 大口町 扶桑町 大治町 飛島村 阿久比町 東浦町 愛知美浜町 武豊町　 <三重県> 津市 四日市市 桑名市 鈴鹿市 亀山市 いなべ市 伊賀市 木曽岬町 三重朝日町 川越町　 <滋賀県> 守山市 栗東市 甲賀市 東近江市 滋賀日野町 愛荘町 豊郷町 甲良町 多賀町　 <京都府> 京都北区 京都上京区 京都左京区 京都東山区 京都下京区 京都山科区 舞鶴市 綾部市 宇治市 京田辺市 木津川市 笠置町 和束町 精華町 南山城村 京丹波町　 <大阪府> 大阪西区 大阪大正区 大阪天王寺区 大阪生野区 大阪阿倍野区 大阪住吉区 大阪鶴見区 大阪平野区 大阪中央区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 大阪堺市美原区 岸和田市 貝塚市 富田林市 河内長野市 松原市 大阪和泉市 柏原市 羽曳野市 高石市 藤井寺市 泉南市 大阪狭山市 阪南市 豊能町 忠岡町 田尻町 大阪太子町 河南町 千早赤阪村　 <兵庫県> 神戸須磨区 洲本市 西脇市 猪名川町　 <奈良県> 奈良市 大和高田市 大和郡山市 天理市 橿原市 桜井市 御所市 生駒市 香芝市 葛城市 宇陀市 三郷町 斑鳩町 安堵町 奈良川西町 三宅町 田原本町 高取町 上牧町 王寺町 河合町　 <和歌山県> 和歌山市 海南市 橋本市 有田市 御坊市 田辺市 紀の川市 岩出市 かつらぎ町 和歌山広川町 和歌山日高町 由良町 みなべ町 上富田町　 <島根県> 江津市 津和野町 吉賀町 知夫村　 <山口県> 下関市 宇部市 防府市 下松市 光市 長門市 周南市 山陽小野田市 上関町 田布施町 阿武町　 <徳島県> 勝浦町 上勝町 佐那河内村 神山町 那賀町 美波町　 <愛媛県> 宇和島市 八幡浜市 新居浜市 大洲市 伊予市 西予市 東温市 久万高原町 愛媛松前町 内子町　 <高知県> 室戸市 土佐市 須崎市 香美市 東洋町 奈半利町 田野町 安田町 本山町 大豊町 土佐町 大川村 いの町 仁淀川町 中土佐町 佐川町 越知町 黒潮町　 <福岡県> 北九州若松区 北九州戸畑区 北九州小倉北区 福岡中央区 福岡早良区 久留米市 直方市 柳川市 大川市 行橋市 小郡市 宗像市 福津市 うきは市 嘉麻市 朝倉市 みやま市 新宮町 久山町 芦屋町 桂川町 筑前町 大刀洗町 添田町 福智町 みやこ町　 <佐賀県> 佐賀市 鳥栖市 小城市 上峰町 みやき町 江北町　 <長崎県> 平戸市　 <熊本県> 熊本南区 玉名市 菊池市 宇城市 阿蘇市 長洲町　 <大分県> 大分市 別府市 中津市 佐伯市 臼杵市 津久見市 竹田市 豊後高田市 杵築市 宇佐市 豊後大野市 由布市 国東市 日出町";
    mainText[3] = "<福井県> 敦賀市 小浜市 越前町 高浜町 福井おおい町　 <岐阜県> 瑞穂市 海津市 養老町 輪之内町　 <愛知県> 愛西市 弥富市 蟹江町　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 草津市 野洲市 湖南市 高島市 米原市 竜王町　 <京都府> 京都中京区 京都南区 京都右京区 京都伏見区 京都西京区 福知山市 宮津市 亀岡市 城陽市 向日市 長岡京市 八幡市 京丹後市 南丹市 大山崎町 久御山町 井手町 宇治田原町 伊根町　 <大阪府> 大阪都島区 大阪福島区 大阪此花区 大阪港区 大阪西淀川区 大阪東淀川区 大阪東成区 大阪旭区 大阪城東区 大阪東住吉区 大阪西成区 大阪淀川区 大阪住之江区 大阪北区 大阪堺市堺区 豊中市 池田市 吹田市 泉大津市 高槻市 守口市 枚方市 茨木市 八尾市 泉佐野市 寝屋川市 大東市 箕面市 門真市 摂津市 東大阪市 交野市 島本町 熊取町 大阪岬町　 <兵庫県> 神戸東灘区 神戸灘区 神戸兵庫区 神戸長田区 神戸垂水区 神戸北区 神戸中央区 神戸西区 尼崎市 明石市 西宮市 芦屋市 伊丹市 相生市 加古川市 赤穂市 宝塚市 三木市 高砂市 川西市 小野市 三田市 加西市 篠山市 養父市 丹波市 朝来市 淡路市 宍粟市 加東市 多可町 兵庫稲美町 播磨町 市川町 福崎町 兵庫神河町 兵庫太子町 佐用町 兵庫香美町 新温泉町　 <奈良県> 広陵町　 <和歌山県> 和歌山美浜町 和歌山印南町　 <鳥取県> 岩美町 鳥取若桜町　 <島根県> 浜田市 益田市 雲南市 奥出雲町 飯南町 川本町 島根美郷町 邑南町 西ノ島町　 <岡山県> 岡山中区 岡山東区 井原市 総社市 高梁市 新見市 瀬戸内市 美作市 浅口市 早島町 里庄町 矢掛町 西粟倉村 久米南町 吉備中央町　 <広島県> 広島東区 広島西区 広島安佐南区 広島佐伯区 三原市 福山市 広島府中市 広島三次市 大竹市 東広島市 熊野町 安芸太田町 北広島町 世羅町　 <山口県> 山口市 萩市 周防大島町 和木町 平生町　 <徳島県> 徳島市 鳴門市 小松島市 阿南市 吉野川市 阿波市 美馬市 徳島三好市 石井町 牟岐町 海陽町 松茂町 北島町 藍住町 板野町 上板町 つるぎ町 東みよし町　 <香川県> 丸亀市 坂出市 善通寺市 三木町 直島町 琴平町 多度津町 まんのう町　 <愛媛県> 松山市 西条市 四国中央市 上島町 伊方町　 <高知県> 高知市 安芸市 南国市 高知香南市 芸西村 日高村　 <福岡県> 中間市 水巻町 遠賀町　 <佐賀県> 神埼市 白石町　 <大分県> 姫島村";
    mainText[4] = "<京都府> 与謝野町　 <大阪府> 四條畷市 能勢町　 <兵庫県> 姫路市 豊岡市 南あわじ市 たつの市 上郡町　 <鳥取県> 米子市 境港市 智頭町 八頭町 大山町 鳥取南部町 伯耆町 日南町 鳥取日野町 江府町　 <島根県> 松江市 出雲市 大田市 安来市 海士町　 <岡山県> 岡山北区 岡山南区 倉敷市 津山市 玉野市 笠岡市 備前市 赤磐市 和気町 新庄村 奈義町 岡山美咲町　 <広島県> 広島中区 広島南区 広島安佐北区 広島安芸区 呉市 竹原市 尾道市 庄原市 廿日市市 安芸高田市 江田島市 府中町 海田町 坂町 大崎上島町 神石高原町　 <山口県> 岩国市 柳井市　 <香川県> 高松市 観音寺市 さぬき市 東かがわ市 三豊市 土庄町 小豆島町 綾川町　 <愛媛県> 今治市";
    mainText[5] = "";
    mainText[6] = "<鳥取県> 琴浦町 日吉津村　 <島根県> 隠岐の島町";
    mainText[7] = "<鳥取県> 鳥取市 三朝町　 <岡山県> 真庭市 鏡野町";
    mainText[8] = "<鳥取県> 倉吉市 湯梨浜町 北栄町";
    mainText[9] = "";
    mainText[10] = "";
  }
  if(viewId == 5){
    msi = 9+1;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "7.3";
    q_epiName = "熊本県熊本地方";
    q_epiId = 230;
    q_depth = "10";
    q_timeYY = "2016";
    q_timeMM = "4";
    q_timeDD = "16";
    q_timeH = "1";
    q_timeM = "25";
    mainText[1] = "<山形県> 中山町　 <茨城県> 土浦市 つくば市 茨城鹿嶋市 潮来市 筑西市 坂東市 稲敷市 鉾田市 東海村 五霞町 境町　 <群馬県> 前橋市 高崎市 伊勢崎市 太田市 館林市 渋川市 富岡市 榛東村 玉村町 板倉町 群馬明和町 千代田町 邑楽町　 <埼玉県> さいたま北区 さいたま大宮区 さいたま見沼区 さいたま桜区 さいたま浦和区 さいたま緑区 さいたま岩槻区 川越市 熊谷市 春日部市 羽生市 鴻巣市 越谷市 蕨市 入間市 朝霞市 和光市 久喜市 三郷市 蓮田市 坂戸市 幸手市 鶴ヶ島市 吉川市 白岡市 伊奈町 鳩山町 宮代町 杉戸町 松伏町　 <千葉県> 千葉中央区 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 市川市 船橋市 木更津市 松戸市 野田市 茂原市 東金市 習志野市 鎌ケ谷市 浦安市 四街道市 多古町 一宮町 睦沢町 長生村 白子町　 <東京都> 東京千代田区 東京江東区 東京大田区 東京世田谷区 東京渋谷区 東京杉並区 東京板橋区 東京葛飾区 小平市 国分寺市 清瀬市　 <神奈川県> 横浜中区 川崎川崎区 川崎幸区 川崎高津区 川崎多摩区 川崎宮前区 川崎麻生区 茅ヶ崎市　 <新潟県> 新潟西蒲区 長岡市 三条市 上越市 刈羽村　 <富山県> 富山市 高岡市 魚津市 滑川市 砺波市 小矢部市 南砺市 射水市 舟橋村 上市町 立山町　 <石川県> 金沢市 かほく市 津幡町 能登町　 <福井県> 大野市 勝山市 鯖江市 越前市 福井美浜町 高浜町 福井若狭町　 <山梨県> 甲斐市　 <長野県> 長野市 松本市 上田市 岡谷市 伊那市 中野市 大町市 茅野市 塩尻市 佐久市 千曲市 東御市 安曇野市 軽井沢町 御代田町 立科町 下諏訪町 富士見町 原村 辰野町 箕輪町 飯島町 南箕輪村 宮田村 松川町 長野高森町 阿南町 阿智村 平谷村 根羽村 下條村 泰阜村 喬木村 豊丘村 木曽町 麻績村 生坂村 山形村 筑北村 長野池田町 松川村 木島平村 飯綱町　 <岐阜県> 中津川市 本巣市 郡上市 笠松町 垂井町 神戸町 揖斐川町 大野町　 <静岡県> 静岡葵区 静岡清水区 浜松中区 浜松東区 浜松北区 沼津市 三島市 富士宮市 島田市 焼津市 掛川市 藤枝市 御殿場市 御前崎市 伊豆の国市 牧之原市 静岡清水町　 長泉町 静岡森町　 <愛知県> 名古屋北区 名古屋西区 名古屋天白区 豊川市 豊田市 西尾市 新城市 尾張旭市 日進市 北名古屋市 南知多町　 <三重県> 松阪市 亀山市 志摩市 伊賀市 木曽岬町 三重紀北町　 <滋賀県> 甲賀市　 <京都府> 京都上京区 京都中京区 福知山市 舞鶴市 宇治市 井手町　 <兵庫県> 篠山市 朝来市 宍粟市 佐用町 新温泉町　 <奈良県> 桜井市 五條市 御所市 宇陀市 斑鳩町 上牧町 王寺町 吉野町 大淀町 下市町 黒滝村 天川村 奈良川上村 東吉野村　 <和歌山県> 御坊市 田辺市 新宮市 白浜町 上富田町 太地町 古座川町 北山村 串本町　 <鳥取県> 岩美町 鳥取若桜町 智頭町 八頭町 鳥取日野町 江府町　 <島根県> 西ノ島町　 <岡山県> 岡山中区 総社市 備前市 和気町 鏡野町 西粟倉村　 <鹿児島県> 南種子町";
    mainText[2] = "<茨城県> 茨城古河市　 <埼玉県> 加須市　 <東京都> 東京足立区　 <神奈川県> 川崎中原区　 <富山県> 氷見市　 <石川県> 小松市 珠洲市 加賀市 羽咋市　 <福井県> 福井市 敦賀市 あわら市 福井坂井市　 <山梨県> 甲府市 南アルプス市 山梨北杜市 笛吹市 中央市 富士川町 昭和町 忍野村 山中湖村 富士河口湖町　 <長野県> 飯田市 諏訪市　 <岐阜県> 岐阜市 大垣市 羽島市 瑞穂市 海津市 養老町 輪之内町 安八町　 <静岡県> 浜松西区 浜松南区 富士市 磐田市 袋井市 湖西市 菊川市　 <愛知県> 名古屋千種区 名古屋東区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 名古屋南区 名古屋守山区 名古屋緑区 名古屋名東区 豊橋市 一宮市 半田市 愛知津島市 碧南市 刈谷市 安城市 常滑市 稲沢市 東海市 大府市 知多市 知立市 高浜市 豊明市 田原市 愛西市 清須市 弥富市 愛知みよし市 あま市 東郷町 大治町 蟹江町 阿久比町 東浦町 武豊町　 <三重県> 津市 四日市市 鈴鹿市　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 草津市 守山市 栗東市 野洲市 高島市 東近江市 滋賀日野町 竜王町 愛荘町　 <京都府> 京都下京区 京都南区 京都伏見区 亀岡市 城陽市 向日市 長岡京市 八幡市 京丹後市 南丹市 大山崎町 久御山町 精華町 与謝野町　 <大阪府> 大阪都島区 大阪此花区 大阪西区 大阪天王寺区 大阪東淀川区 大阪東成区 大阪旭区 大阪城東区 大阪阿倍野区 大阪東住吉区 大阪西成区 大阪淀川区 大阪鶴見区 大阪住之江区 大阪平野区 大阪北区 大阪中央区 大阪堺市堺区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市美原区 岸和田市 池田市 吹田市 泉大津市 高槻市 貝塚市 守口市 枚方市 茨木市 八尾市 泉佐野市 富田林市 寝屋川市 河内長野市 大阪和泉市 箕面市 柏原市 羽曳野市 門真市 摂津市 高石市 藤井寺市 東大阪市 泉南市 四條畷市 交野市 大阪狭山市 阪南市 忠岡町 熊取町 大阪岬町 大阪太子町　 <兵庫県> 神戸東灘区 神戸兵庫区 神戸長田区 神戸中央区 神戸西区 姫路市 明石市 西宮市 洲本市 芦屋市 伊丹市 相生市 加古川市 赤穂市 宝塚市 三木市 高砂市 川西市 三田市 加東市 たつの市 兵庫稲美町 播磨町 上郡町 兵庫香美町　 <奈良県> 奈良市 大和高田市 大和郡山市 天理市 香芝市 葛城市 安堵町 奈良川西町 三宅町 田原本町 広陵町 河合町　 <和歌山県> 和歌山市 海南市 橋本市 有田市 紀の川市 岩出市 かつらぎ町 九度山町 高野町 湯浅町 和歌山広川町 有田川町 和歌山美浜町 和歌山日高町 和歌山印南町 みなべ町 日高川町　 <鳥取県> 倉吉市 三朝町 日吉津村 鳥取南部町 伯耆町 日南町　 <島根県> 安来市 江津市 雲南市 奥出雲町 飯南町 川本町 島根美郷町 邑南町 知夫村 隠岐の島町　 <岡山県> 岡山北区 岡山東区 津山市 笠岡市 井原市 高梁市 新見市 瀬戸内市 赤磐市 美作市 浅口市 早島町 矢掛町　 <広島県> 広島西区 広島安芸区 福山市 広島府中市 広島三次市 庄原市 安芸高田市 北広島町 世羅町 神石高原町　 <山口県> 光市 和木町 上関町 田布施町　 <徳島県> 鳴門市 美馬市 徳島三好市 勝浦町 上勝町 佐那河内村 神山町 那賀町 牟岐町 美波町 海陽町 つるぎ町 東みよし町　 <香川県>	丸亀市 善通寺市 さぬき市 土庄町 三木町 直島町 宇多津町 綾川町　 <愛媛県> 新居浜市　 <高知県> 室戸市 須崎市 東洋町 安田町 北川村 馬路村 本山町 大豊町 大川村 いの町 仁淀川町 中土佐町 佐川町 四万十町 大月町　 <長崎県>	五島市 新上五島町　 <鹿児島県> 志布志市 三島村 錦江町 南大隅町 屋久島町";
    mainText[3] = "<愛知県> 飛島村　 <大阪府> 大阪福島区 大阪港区 大阪大正区 大阪西淀川区 大阪生野区 大阪住吉区 大阪堺市北区 豊中市 松原市 大東市 田尻町　 <兵庫県> 尼崎市 豊岡市 南あわじ市 淡路市　 <鳥取県> 鳥取市 米子市 湯梨浜町 琴浦町 北栄町 大山町　 <島根県> 松江市 浜田市 津和野町 吉賀町　 <岡山県> 岡山南区 倉敷市 玉野市 真庭市 里庄町　 <広島県> 広島中区 広島南区 広島安佐南区 広島安佐北区 広島佐伯区 呉市 竹原市 三原市 尾道市 大竹市 東広島市 廿日市市 府中町 海田町 坂町 安芸太田町 大崎上島町　 <山口県> 下松市 岩国市 長門市 美祢市 周南市 平生町 阿武町　 <徳島県> 徳島市 小松島市 阿南市 吉野川市 阿波市 石井町 松茂町 北島町 藍住町 板野町 上板町　 <香川県> 高松市 坂出市 観音寺市 東かがわ市 三豊市 小豆島町 琴平町 多度津町 まんのう町　 <愛媛県> 西条市 大洲市 伊予市 四国中央市 東温市 上島町 久万高原町 愛媛松前町 砥部町 内子町 松野町 愛媛鬼北町 愛南町　 <高知県> 高知市 安芸市 南国市 土佐市 土佐清水市 四万十市 高知香南市 香美市 奈半利町 田野町 芸西村 土佐町 越知町 梼原町 日高村 高知津野町　 <福岡県> 北九州戸畑区 福岡東区 岡垣町 香春町 吉富町　 <佐賀県> 伊万里市 玄海町 有田町 大町町　 <長崎県> 佐世保市宇久島 長崎対馬市 壱岐市 西海市 長与町 波佐見町 小値賀町 佐々町　 <宮崎県> 串間市 三股町 西米良村　 <鹿児島県> 鹿屋市 枕崎市 指宿市 垂水市 日置市 曽於市 南九州市 大崎町 東串良町 肝付町";
    mainText[4] = "<鳥取県> 境港市　 <島根県> 出雲市 益田市 大田市　 <広島県> 江田島市　 <山口県> 下関市 宇部市 山口市 萩市 防府市 柳井市 山陽小野田市 周防大島町　 <愛媛県> 松山市 今治市 宇和島市 西予市 伊方町　 <高知県> 宿毛市 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州小倉北区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡中央区 福岡西区 福岡城南区 福岡早良区 大牟田市 直方市 飯塚市 田川市 行橋市 豊前市 中間市 筑紫野市 春日市 大野城市 宗像市 太宰府市 福岡古賀市 福津市 うきは市 宮若市 嘉麻市 朝倉市 糸島市 福岡那珂川町 宇美町 篠栗町 志免町 須恵町 新宮町 久山町 粕屋町 芦屋町 水巻町 小竹町 鞍手町 桂川町 東峰村 大刀洗町 添田町 糸田町 福岡川崎町 大任町 赤村 福智町 苅田町 みやこ町 上毛町 築上町　 <佐賀県> 唐津市 鳥栖市 多久市 武雄市 佐賀鹿島市 嬉野市 吉野ヶ里町 基山町 江北町 太良町　 <長崎県> 長崎市 佐世保市 大村市 平戸市 松浦市 時津町 東彼杵町 川棚町　 <熊本県> 錦町 多良木町 湯前町 水上村 相良村 五木村 球磨村 苓北町　 <大分県> 中津市 豊後高田市 杵築市 宇佐市 国東市 姫島村 日出町　 <宮崎県> 宮崎市 都城市 日南市 小林市 日向市 西都市 えびの市 高原町 国富町 綾町 高鍋町 新富町 木城町 川南町 宮崎都農町 門川町 諸塚村 日之影町 五ヶ瀬町　 <鹿児島県> 鹿児島市 阿久根市 鹿児島出水市 薩摩川内市 薩摩川内市甑島 霧島市 いちき串木野市 南さつま市 伊佐市 姶良市 さつま町 湧水町";
    mainText[5] = "";
    mainText[6] = "<愛媛県> 八幡浜市　 <福岡県> 福岡南区 八女市 筑後市 小郡市 遠賀町 筑前町 大木町 福岡広川町　 <佐賀県> 小城市 みやき町 白石町　 <長崎県> 島原市 諫早市 雲仙市　 <熊本県> 人吉市 荒尾市 水俣市 南関町 津奈木町 山江村 あさぎり町　 <大分県> 大分市 佐伯市 臼杵市 津久見市 玖珠町　 <宮崎県> 延岡市　 <鹿児島県> 長島町";
    mainText[7] = "<福岡県> 久留米市 柳川市 大川市 みやま市　 <佐賀県> 佐賀市 神埼市 上峰町　 <長崎県> 南島原市　 <熊本県> 山鹿市 玉東町 長洲町 南小国町 熊本小国町 産山村 熊本高森町 甲佐町 芦北町　 <大分県> 日田市 竹田市 豊後大野市 九重町　 <宮崎県> 椎葉村 宮崎美郷町 高千穂町";
    mainText[8] = "<熊本県> 熊本南区 熊本北区 八代市 玉名市 上天草市 阿蘇市 天草市 熊本美里町 和水町 菊陽町 御船町 山都町 氷川町　 <大分県> 別府市 由布市";
    mainText[9] = "<熊本県> 熊本中央区 熊本東区 熊本西区 菊池市 宇土市 宇城市 合志市 大津町 南阿蘇村 嘉島町";
    mainText[10] = "<熊本県> 西原村 益城町";
  }
  if(viewId == 6){
    msi = 9+1;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "6.4";
    q_epiName = "熊本県熊本地方";
    q_epiId = 230;
    q_depth = "10";
    q_timeYY = "2016";
    q_timeMM = "4";
    q_timeDD = "14";
    q_timeH = "21";
    q_timeM = "26";
    mainText[1] = "<長野県> 諏訪市　 <岐阜県> 海津市　 <大阪府> 岸和田市 泉佐野市 大東市　 <兵庫県> 豊岡市　 <和歌山県> 紀の川市 和歌山美浜町　 <鳥取県> 琴浦町 北栄町 日吉津村 大山町　 <島根県> 松江市 安来市 江津市 雲南市 川本町 島根美郷町 邑南町 津和野町　 <岡山県> 岡山南区 倉敷市 笠岡市 瀬戸内市 赤磐市 浅口市 早島町 里庄町 矢掛町　 <広島県> 広島西区 広島安佐南区 広島安佐北区 広島安芸区 広島佐伯区 三原市 福山市 広島三次市 安芸高田市 海田町 熊野町 安芸太田町 北広島町　 <山口県> 下松市 光市 和木町 上関町 田布施町　 <徳島県> 吉野川市 美馬市 徳島三好市　 <香川県> 高松市 丸亀市 東かがわ市 土庄町 小豆島町 多度津町　 <愛媛県> 西条市 四国中央市 久万高原町 砥部町 内子町　 <高知県> 室戸市 南国市 須崎市 高知香南市 香美市 奈半利町 田野町 芸西村 いの町 仁淀川町 中土佐町 佐川町 越知町 梼原町 高知津野町 四万十町 大月町　 <鹿児島県> 錦江町  屋久島町";
    mainText[2] = "<鳥取県> 鳥取市 米子市 境港市 湯梨浜町　 <島根県> 浜田市 出雲市 益田市 大田市 吉賀町　 <岡山県> 玉野市 真庭市　 <広島県> 広島中区 広島南区 呉市 竹原市 尾道市 大竹市 東広島市 廿日市市 江田島市 府中町 坂町 大崎上島町　 <山口県> 萩市 岩国市 長門市 美祢市 周南市 周防大島町 平生町 阿武町　 <徳島県> 徳島市 北島町　 <香川県> 坂出市 観音寺市 三豊市　 <愛媛県> 松山市 大洲市 伊予市 東温市 上島町 愛媛松前町 松野町 愛媛鬼北町 愛南町　 <高知県> 高知市 安芸市 土佐清水市 四万十市 日高村　 <福岡県> 岡垣町 香春町 吉富町　 <佐賀県> 玄海町 有田町　 <長崎県> 佐世保市宇久島 長崎対馬市 壱岐市 五島市 長与町 波佐見町 小値賀町 新上五島町　 <大分県> 別府市 豊後高田市 杵築市 国東市 日出町　 <宮崎県> 日南市 串間市　 <鹿児島県> 鹿屋市 枕崎市 指宿市 垂水市 日置市 志布志市 南九州市 東串良町 南大隅町";
    mainText[3] = "<山口県> 宇部市 山口市 防府市 柳井市 山陽小野田市　 <愛媛県> 今治市 宇和島市 八幡浜市 西予市 伊方町　 <高知県> 宿毛市 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州戸畑区 北九州小倉北区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡東区 福岡中央区 福岡南区 福岡西区 福岡城南区 福岡早良区 直方市 飯塚市 田川市 行橋市 豊前市 中間市 筑紫野市 春日市 太宰府市 福津市 うきは市 宮若市 嘉麻市 糸島市 福岡那珂川町 宇美町 篠栗町 志免町 須恵町 久山町 芦屋町 水巻町 遠賀町 小竹町 鞍手町 桂川町 東峰村 大刀洗町 添田町 糸田町 大任町 赤村 福智町 苅田町 上毛町 築上町　 <佐賀県> 鳥栖市 多久市 伊万里市 武雄市 佐賀鹿島市 基山町 大町町 太良町　 <長崎県> 長崎市 佐世保市 大村市 平戸市 松浦市 西海市 時津町 東彼杵町 川棚町 佐々町　 <熊本県> 南小国町 熊本小国町 錦町 湯前町 水上村 相良村 五木村 球磨村　 <大分県> 大分市 中津市 宇佐市 由布市 姫島村 玖珠町　 <宮崎県> 宮崎市 都城市 日向市 えびの市 三股町 高原町 国富町 綾町 高鍋町 新富町 西米良村 木城町 宮崎都農町 門川町 諸塚村 宮崎美郷町 五ヶ瀬町　 <鹿児島県> 鹿児島市 鹿児島出水市 薩摩川内市甑島 曽於市 いちき串木野市 南さつま市 姶良市 大崎町 肝付町";
    mainText[4] = "<山口県> 下関市　 <福岡県> 福岡博多区 大牟田市 久留米市 柳川市 八女市 筑後市 大川市 小郡市 大野城市 宗像市 福岡古賀市 朝倉市 みやま市 新宮町 粕屋町 筑前町 大木町 福岡広川町 みやこ町　 <佐賀県> 佐賀市 唐津市 小城市 嬉野市 神埼市 吉野ヶ里町 上峰町 みやき町 江北町 白石町　 <長崎県> 島原市 諫早市 雲仙市 南島原市　 <熊本県> 人吉市 荒尾市 水俣市 山鹿市 玉東町 南関町 産山村 芦北町 津奈木町 多良木町 山江村 あさぎり町 苓北町　 <大分県> 日田市 佐伯市 臼杵市 津久見市 竹田市 豊後大野市 九重町　 <宮崎県> 延岡市 小林市 西都市 川南町 高千穂町 日之影町　 <鹿児島県> 阿久根市 薩摩川内市 霧島市 伊佐市 さつま町 長島町 湧水町";
    mainText[5] = "";
    mainText[6] = "<熊本県> 八代市 上天草市 阿蘇市 天草市 長洲町 和水町 熊本高森町 南阿蘇村 甲佐町　 <宮崎県> 椎葉村";
    mainText[7] = "<熊本県> 熊本中央区 熊本北区 菊池市 宇土市 合志市 熊本美里町 大津町 菊陽町 御船町 山都町 氷川町";
    mainText[8] = "<熊本県> 熊本東区 熊本西区 熊本南区 玉名市 宇城市 西原村";
    mainText[9] = "";
    mainText[10] = "<熊本県> 益城町";
  }
  if(viewId == 7){
    msi = 6+1;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "8.5";
    q_epiName = "小笠原諸島西方沖";
    q_epiId = 286;
    q_depth = "590";
    q_timeYY = "2015";
    q_timeMM = "5";
    q_timeDD = "30";
    q_timeH = "20";
    q_timeM = "24";
    mainText[1] = "<北海道> 札幌中央区 札幌白石区 札幌豊平区 札幌南区 札幌西区 札幌厚別区 札幌清田区 小樽市 釧路市 帯広市 苫小牧市 千歳市 恵庭市 胆振伊達市 当別町 福島町 七飯町 渡島森町 檜山江差町 厚沢部町 岩内町 余市町 斜里町 興部町 厚真町 安平町 浦河町 様似町 新ひだか町 士幌町 厚岸町 標茶町 白糠町 別海町 標津町 羅臼町　 <青森県> 弘前市 黒石市 五所川原市 十和田市 三沢市 つがる市 平川市 今別町 蓬田村 外ヶ浜町 深浦町 西目屋村 藤崎町 田舎館村 板柳町 鶴田町 中泊町 野辺地町 横浜町 六ヶ所村 東通村 風間浦村 佐井村 五戸町 田子町 青森南部町 新郷村　 <岩手県> 宮古市 大船渡市 遠野市 釜石市 雫石町 西和賀町 住田町 山田町　 <宮城県> 気仙沼市 多賀城市 柴田町 七ヶ浜町 女川町　 <秋田県> 能代市 大館市 男鹿市 北秋田市 仙北市 上小阿仁村 藤里町 八峰町 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 山形市 山形金山町 真室川町 大蔵村 鮭川村　 <群馬県> 長野原町　 <新潟県> 津南町 関川村 粟島浦村　 <富山県> 高岡市 魚津市 小矢部市 南砺市 舟橋村 上市町 立山町 入善町 富山朝日町　 <石川県> 小松市 加賀市 かほく市 津幡町 穴水町 能登町　 <福井県> 敦賀市 小浜市 鯖江市 あわら市 越前市 永平寺町 越前町 福井美浜町 高浜町 福井おおい町 福井若狭町　 <山梨県> 山梨南部町　 <長野県> 須坂市 駒ヶ根市 青木村 中川村 宮田村 松川町 阿南町 阿智村 平谷村 根羽村 下條村 売木村 天龍村 泰阜村 喬木村 豊丘村 上松町 南木曽町 木祖村 麻績村 生坂村 朝日村 筑北村 長野池田町 松川村 白馬村 小布施町 長野高山村 山ノ内町 野沢温泉村 栄村　 <岐阜県> 岐阜市 大垣市 瑞浪市 羽島市 恵那市 瑞穂市 郡上市 笠松町 大野町　 <静岡県> 静岡葵区 浜松中区 浜松東区 浜松西区 浜松北区 浜松浜北区 浜松天竜区 島田市 掛川市 藤枝市 湖西市 御前崎市 南伊豆町 吉田町 静岡森町　 <愛知県> 名古屋中区 名古屋緑区 豊橋市 一宮市 半田市 春日井市 豊川市 刈谷市 安城市 西尾市 常滑市 新城市 東海市 大府市 知立市 尾張旭市 高浜市 豊明市 日進市 北名古屋市 東郷町 大治町 阿久比町 東浦町 南知多町 武豊町　 <三重県> 四日市市 鈴鹿市 伊賀市　 <滋賀県> 甲賀市 野洲市 東近江市　 <京都府> 京都上京区 京都中京区 京都下京区 福知山市 舞鶴市 宇治市 宮津市 亀岡市 南丹市 木津川市 井手町 宇治田原町 精華町 与謝野町　 <大阪府> 大阪都島区 大阪福島区 大阪浪速区 大阪東淀川区 大阪生野区 大阪旭区 大阪阿倍野区 大阪東住吉区 大阪西成区 大阪北区 大阪中央区 大阪堺市美原区 池田市 吹田市 泉大津市 貝塚市 八尾市 富田林市 松原市 大阪和泉市 柏原市 羽曳野市 藤井寺市 東大阪市 四條畷市 大阪狭山市 島本町 田尻町 大阪太子町　 <兵庫県> 神戸中央区 加古川市 三木市 丹波市 南あわじ市 朝来市 淡路市 兵庫香美町　 <奈良県> 大和高田市 大和郡山市 天理市 安堵町 奈良川西町 三宅町 田原本町 広陵町 河合町　 <和歌山県> 御坊市 紀の川市 みなべ町 白浜町 那智勝浦町　 <鳥取県>	米子市 倉吉市 鳥取若桜町 智頭町 八頭町 琴浦町　北栄町 大山町 日南町　 <島根県> 松江市 雲南市 島根美郷町 吉賀町 海士町 隠岐の島町　 <岡山県> 岡山東区 岡山南区 倉敷市 津山市 玉野市 新見市 赤磐市 浅口市 里庄町 矢掛町 鏡野町 勝央町　 <広島県>	広島中区 広島南区 広島西区 広島安佐南区 広島安佐北区 竹原市 三原市 尾道市 広島三次市 大竹市 東広島市 安芸高田市 坂町 北広島町 大崎上島町　 <山口県>	宇部市 防府市 岩国市 長門市 山陽小野田市 周防大島町 和木町 平生町 阿武町　 <徳島県> 徳島市 阿南市 吉野川市 美馬市 徳島三好市 つるぎ町　 <香川県>	高松市 観音寺市 東かがわ市 土庄町 小豆島町 多度津町　 <愛媛県> 宇和島市 伊予市　 <高知県> 高知市 室戸市 安芸市 南国市 香美市 奈半利町 大豊町 大川村 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州戸畑区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡西区 福岡早良区 大牟田市 久留米市 直方市 飯塚市 田川市 八女市 筑後市 行橋市 豊前市 宗像市 うきは市 宮若市 嘉麻市 朝倉市 新宮町 小竹町 鞍手町 筑前町 大刀洗町 大木町 香春町 添田町 大任町 福智町　 <佐賀県> 唐津市 多久市 武雄市 嬉野市 吉野ヶ里町 みやき町 大町町　 <長崎県> 長崎市 佐世保市 島原市 諫早市 平戸市 松浦市 壱岐市 五島市 雲仙市 川棚町 波佐見町　 <熊本県> 熊本西区 人吉市 水俣市 玉名市 山鹿市 上天草市 産山村 南阿蘇村　 <大分県> 別府市 佐伯市 杵築市 国東市 姫島村　 <宮崎県> 宮崎市 日南市 小林市 新富町 椎葉村 高千穂町　 <鹿児島県> 鹿児島市 鹿屋市 阿久根市 指宿市 薩摩川内市 薩摩川内市甑島 霧島市 いちき串木野市 奄美市 姶良市 鹿児島十島村 さつま町 錦江町 喜界町　<沖縄県> 那覇市 石垣市 名護市 うるま市 宮古島市 南城市 渡嘉敷村 粟国村 渡名喜村 久米島町";
    mainText[2] = "<北海道> 札幌北区 札幌東区 札幌手稲区 函館市 石狩市 新篠津村 上ノ国町 ニセコ町 倶知安町 赤井川村 白老町 釧路町　 <青森県> 青森市 八戸市 むつ市 平内町 七戸町 六戸町 東北町 おいらせ町 大間町 階上町　 <岩手県> 盛岡市 花巻市 北上市 久慈市 一関市 八幡平市 奥州市 矢巾町 金ケ崎町 平泉町 普代村 野田村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 塩竈市 白石市 名取市 栗原市 東松島市 七ヶ宿町 村田町 亘理町 山元町 利府町 大和町 大郷町 富谷町 大衡村 色麻町 宮城加美町 南三陸町　 <秋田県> 秋田市 横手市 湯沢市 由利本荘市 潟上市 大仙市 にかほ市 三種町 井川町　 <山形県> 米沢市 鶴岡市 酒田市 新庄市 寒河江市 上山市 村山市 天童市 東根市 尾花沢市 南陽市 山辺町 河北町 西川町 山形朝日町 大江町 大石田町 最上町 舟形町 高畠町 山形川西町 山形小国町 白鷹町 飯豊町 三川町 庄内町 遊佐町　 <福島県> 会津若松市 喜多方市　二本松市 本宮市 川俣町 大玉村 天栄村 下郷町 只見町 南会津町 北塩原村 西会津町 磐梯町 柳津町 福島金山町 福島昭和村 棚倉町 矢祭町 塙町 鮫川村 石川町 平田村 三春町 小野町 福島広野町 富岡町 川内村 葛尾村 飯舘村　 <茨城県> 大洗町 大子町　 <栃木県> 那須烏山市　 <群馬県> 榛東村 群馬上野村 神流町 下仁田町 群馬南牧村 中之条町 嬬恋村 草津町 群馬高山村 東吾妻町 川場村 群馬昭和村 みなかみ町　 <埼玉県> 越生町 小川町 横瀬町 皆野町 長瀞町 東秩父村 寄居町　 <東京都> 青梅市 日の出町 檜原村 奥多摩町 神津島村　 <神奈川県> 葉山町 山北町 箱根町 愛川町　 <新潟県> 新潟北区 新潟東区 新潟中央区 新潟江南区 新潟秋葉区 新潟南区 新潟西区 新潟西蒲区 長岡市 柏崎市 新発田市 小千谷市 十日町市 村上市 燕市 糸魚川市 妙高市 五泉市 上越市 阿賀野市 佐渡市 魚沼市 胎内市 聖籠町 弥彦村 田上町 阿賀町 出雲崎町 湯沢町　 <富山県> 富山市 氷見市 滑川市 射水市　 <石川県> 金沢市 七尾市 輪島市 珠洲市 羽咋市 志賀町 中能登町　 <福井県> 福井坂井市　 <山梨県> 都留市 山梨市 大月市 韮崎市 南アルプス市 甲斐市 上野原市 市川三郷町 身延町 富士川町 昭和町 道志村 西桂町 鳴沢村 小菅村 丹波山村　 <長野県> 長野市 松本市 岡谷市 飯田市 伊那市 中野市 大町市 飯山市 茅野市 塩尻市 千曲市 東御市 安曇野市 小海町 長野川上村 南相木村 北相木村 佐久穂町 長和町 下諏訪町 富士見町 原村 辰野町 箕輪町 飯島町 南箕輪村 長野高森町 木曽町 山形村 小谷村 坂城町 木島平村 信濃町 小川村 飯綱町　 <岐阜県> 中津川市 下呂市 海津市 輪之内町 安八町　 <静岡県> 静岡清水区 浜松南区 熱海市 富士宮市 伊東市 磐田市 焼津市 袋井市 下田市 裾野市 菊川市 牧之原市 東伊豆町 河津町 松崎町 西伊豆町 函南　 長泉町 小山町　 <愛知県> 名古屋千種区 名古屋中川区 名古屋港区 愛知津島市 稲沢市 田原市 愛西市 清須市 弥富市 愛知みよし市 あま市 蟹江町 飛島村　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 高島市 米原市　 <京都府> 京都伏見区 城陽市 向日市 長岡京市 八幡市 京丹後市 大山崎町 久御山町　 <大阪府>	大阪此花区 大阪西区 大阪港区 大阪大正区 大阪天王寺区 大阪西淀川区 大阪東成区 大阪城東区 大阪住吉区 大阪淀川区 大阪鶴見区 大阪住之江区 大阪平野区 大阪堺市堺区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 岸和田市 豊中市 高槻市 守口市 枚方市 茨木市 泉佐野市 寝屋川市 大東市 箕面市 門真市 摂津市 高石市 交野市 忠岡町　 <兵庫県> 西宮市 豊岡市　 <奈良県> 奈良市　 <鳥取県> 鳥取市 境港市 湯梨浜町　 <島根県> 浜田市 出雲市 益田市 大田市　 <岡山県> 真庭市　 <広島県> 呉市 江田島市 府中町　 <山口県> 下関市 山口市 萩市 柳井市　 <愛媛県> 今治市 八幡浜市 伊方町　 <福岡県> 大川市 中間市 みやま市 水巻町 遠賀町　 <佐賀県> 佐賀市 小城市 神埼市 上峰町 江北町 白石町　 <長崎県> 南島原市　 <熊本県> 八代市 宇城市 阿蘇市 天草市 熊本美里町 長洲町 芦北町 津奈木町　 <大分県>	大分市 臼杵市 竹田市 豊後大野市 由布市　 <鹿児島県> 南さつま市 伊佐市 長島町　 <沖縄県> 座間味村";
    mainText[3] = "<宮城県> 石巻市 角田市 岩沼市 登米市 大崎市 蔵王町 大河原町 宮城川崎町 丸森町 松島町 涌谷町 宮城美里町　 <山形県> 中山町　 <福島県> 福島市 郡山市 いわき市 白河市 須賀川市 相馬市 田村市 南相馬市 福島伊達市 桑折町 国見町 鏡石町 猪苗代町 会津坂下町 湯川村 会津美里町 西郷村 泉崎村 中島村 矢吹町 玉川村 浅川町 古殿町 楢葉町 大熊町 浪江町 新地町　 <茨城県> 水戸市 日立市 土浦市 結城市 龍ケ崎市 下妻市 高萩市 北茨城市 牛久市 つくば市 ひたちなか市 茨城鹿嶋市 潮来市 守谷市 常陸大宮市 那珂市 かすみがうら市 桜川市 神栖市 行方市 鉾田市 小美玉市 城里町 東海村 美浦村 阿見町 八千代町 五霞町 利根町　 <栃木県> 宇都宮市 足利市 鹿沼市 日光市 小山市 真岡市 大田原市 矢板市 那須塩原市 栃木さくら市 下野市 上三川町 益子町 茂木町 市貝町 芳賀町 壬生町 塩谷町 那須町 栃木那珂川町　 <群馬県> 前橋市 高崎市 桐生市 伊勢崎市 太田市 沼田市 渋川市 藤岡市 富岡市 安中市 みどり市 吉岡町 甘楽町 片品村 玉村町 板倉町 千代田町　 <埼玉県> さいたま西区 さいたま北区 さいたま浦和区 さいたま岩槻区 川越市 秩父市 所沢市 飯能市 本庄市 東松山市 狭山市 羽生市 深谷市 上尾市 越谷市 入間市 朝霞市 和光市 新座市 桶川市 北本市 坂戸市 日高市 ふじみ野市 毛呂山町 滑川町 嵐山町 鳩山町 ときがわ町 小鹿野町 埼玉美里町 埼玉神川町 上里町　 <千葉県> 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 銚子市 松戸市 茂原市 成田市 千葉佐倉市 東金市 旭市 習志野市 勝浦市 八千代市 我孫子市 鎌ケ谷市 富津市 四街道市 袖ケ浦市 八街市 印西市 白井市 富里市 匝瑳市 香取市 山武市 大網白里市 酒々井町 栄町 神崎町 多古町 東庄町 九十九里町 芝山町 横芝光町 一宮町 睦沢町 長南町 大多喜町 御宿町　 <東京都> 東京新宿区 東京台東区 東京目黒区 東京世田谷区 東京中野区 東京杉並区 八王子市 立川市 武蔵野市 三鷹市 東京府中市 昭島市 調布市 町田市 小金井市 小平市 日野市 東村山市 国分寺市 国立市 福生市 狛江市 東大和市 清瀬市 東久留米市 武蔵村山市 多摩市 稲城市 羽村市 あきる野市 西東京市 瑞穂町 伊豆大島町 東京利島村 新島村 三宅村 御蔵島村 八丈町　 <神奈川県> 横浜鶴見区 横浜神奈川区 横浜南区 横浜磯子区 横浜金沢区 横浜港南区 横浜旭区 横浜緑区 横浜瀬谷区 横浜栄区 横浜青葉区 横浜都筑区 川崎中原区 川崎高津区 川崎多摩区 川崎宮前区 川崎麻生区 相模原緑区 相模原中央区 相模原南区 横須賀市 鎌倉市 逗子市 三浦市 秦野市 大和市 伊勢原市 座間市 南足柄市 大磯町 中井町 松田町 開成町 真鶴町 湯河原町 清川村　 <新潟県> 三条市 加茂市 見附市 南魚沼市 刈羽村　 <福井県> 福井市　 <山梨県> 甲府市 富士吉田市 山梨北杜市 笛吹市 甲州市 中央市 山中湖村 富士河口湖町　 <長野県> 上田市 諏訪市 小諸市 長野南牧村 軽井沢町 御代田町 立科町　 <静岡県> 沼津市 三島市 富士市 御殿場市 伊豆市 静岡清水町　 <福岡県> 柳川市";
    mainText[4] = "<茨城県> 茨城古河市 石岡市 常総市 常陸太田市 笠間市 取手市 筑西市 坂東市 稲敷市 つくばみらい市 茨城町 河内町 境町　 <栃木県> 栃木市 佐野市 野木町 高根沢町　 <群馬県> 館林市 群馬明和町 大泉町 邑楽町　 <埼玉県> さいたま大宮区 さいたま見沼区 さいたま中央区 さいたま桜区 さいたま南区 さいたま緑区 熊谷市 川口市 行田市 加須市 草加市 蕨市 戸田市 志木市 久喜市 八潮市 富士見市 三郷市 蓮田市 幸手市 鶴ヶ島市 吉川市 白岡市 伊奈町 埼玉三芳町 川島町 吉見町 杉戸町 松伏町　 <千葉県> 千葉中央区 千葉美浜区 市川市 船橋市 館山市 木更津市 野田市 柏市 市原市 流山市 鴨川市 君津市 浦安市 南房総市 いすみ市 長生村 白子町 長柄町 鋸南町　 <東京都> 東京千代田区 東京中央区 東京港区 東京文京区 東京墨田区 東京江東区 東京品川区 東京大田区 東京渋谷区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京練馬区 東京足立区 東京葛飾区 東京江戸川区 青ヶ島村　 <神奈川県> 横浜西区 横浜中区 横浜保土ケ谷区 横浜港北区 横浜戸塚区 横浜泉区 川崎川崎区 平塚市 藤沢市 小田原市 茅ヶ崎市 厚木市 海老名市 綾瀬市 寒川町 神奈川大井町　 <山梨県> 忍野村　 <長野県> 佐久市　 <静岡県> 伊豆の国市";
    mainText[5] = "";
    mainText[6] = "<埼玉県> 春日部市 鴻巣市 宮代町";
    mainText[7] = "<東京都> 小笠原村　 <神奈川県> 二宮町";
    mainText[8] = "";
    mainText[9] = "";
    mainText[10] = "";
  }
  if(viewId == 8){
    msi = 3;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "8.2";
    q_epiName = "サハリン近海";
    q_epiId = 301;
    q_depth = "590";
    q_timeYY = "2013";
    q_timeMM = "5";
    q_timeDD = "24";
    q_timeH = "5";
    q_timeM = "45";
    mainText[1] = "<北海道> 札幌中央区 札幌北区 札幌東区 札幌白石区 札幌西区 札幌厚別区 札幌手稲区 札幌清田区 小樽市 帯広市 苫小牧市 江別市 千歳市 胆振伊達市 石狩市 当別町 檜山江差町 乙部町 倶知安町 岩内町 赤井川村 長沼町 美深町 上川中川町 遠別町 中頓別町 礼文町 斜里町 白老町 厚真町 安平町 浦河町 様似町 新ひだか町 十勝清水町 十勝大樹町 広尾町 本別町 厚岸町 弟子屈町　 <青森県> 弘前市 黒石市 平内町 鰺ヶ沢町 深浦町 西目屋村 六ヶ所村 風間浦村 三戸町 田子町 青森南部町 新郷村　 <岩手県> 北上市 遠野市 一関市 二戸市 雫石町 西和賀町 普代村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 白石市 名取市 角田市 東松島市 蔵王町 宮城川崎町 亘理町 山元町 七ヶ浜町 大郷町 富谷町 大衡村 色麻町 宮城加美町　 <秋田県> 男鹿市 湯沢市 鹿角市 潟上市 北秋田市 仙北市 小坂町 上小阿仁村 藤里町 八峰町 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 米沢市 新庄市 寒河江市 上山市 天童市 尾花沢市 南陽市 山辺町 西川町 大江町 大石田町 山形金山町 舟形町 真室川町 大蔵村 鮭川村 戸沢村 高畠町 山形川西町 山形小国町　 <福島県> 福島市 郡山市 西会津町 猪苗代町 浪江町　 <茨城県> 筑西市　 <埼玉県> さいたま岩槻区 加須市 春日部市 戸田市 久喜市 宮代町　 <東京都> 東京大田区 東京足立区 町田市 青ヶ島村　 <神奈川県> 横浜中区 湯河原町　 <新潟県> 新潟東区 新潟中央区 新潟秋葉区 新潟西区 新潟西蒲区 長岡市 三条市 新発田市 加茂市 見附市 五泉市 上越市 阿賀野市 佐渡市 南魚沼市 胎内市 阿賀町 刈羽村　 <石川県> 輪島市 珠洲市 穴水町 能登町　 <長野県> 諏訪市 長野南牧村 御代田町　 <岐阜県> 中津川市　 <静岡県> 静岡清水区 沼津市 富士市 御殿場市 伊豆市 伊豆の国市 静岡清水町　 <滋賀県> 近江八幡市　 <兵庫県> 豊岡市　 <鳥取県> 鳥取市　 <島根県> 出雲市　 <広島県> 呉市 東広島市 江田島市 府中市　 <徳島県> 吉野川市 石井町　 <佐賀県> 佐賀市 神崎市 みやき町 白石町　 <大分県> 大分市 佐伯市　 <鹿児島県> 錦江町";
    mainText[2] = "<北海道> 函館市 釧路市 岩見沢市 稚内市 根室市 渡島北斗市 新篠津村 上ノ国町 天塩町 浜頓別町 豊富町 利尻富士町 幌延町 新冠町 浦幌町 釧路町 浜中町 標茶町 白糠町 別海町 標津町　 <青森県> 青森市 八戸市 五所川原市 十和田市 三沢市 むつ市 つがる市 平川市 今別町 蓬田村 外ヶ浜町 藤崎町 田舎館村 板柳町 青森鶴田町 中泊町 野辺地町 七戸町 六戸町 横浜町 東北町 おいらせ町 大間町 東通村 五戸町 階上町　 <岩手県> 盛岡市 花巻市 久慈市 八幡平市 奥州市 矢巾町 金ケ崎町 野田村　 <宮城県> 石巻市 岩沼市 登米市 栗原市 大崎市 大河原町 丸森町 松島町 利府町 涌谷町 宮城美里町　 <秋田県> 能代市 横手市 大館市 由利本荘市 大仙市 にかほ市 三種町 井川町　 <山形県> 鶴岡市 酒田市 村山市 中山町 河北町 最上町 白鷹町 三川町 庄内町 遊佐町　 <福島県> 会津坂下町　 <新潟県> 村上市";
    mainText[3] = "<北海道> 猿払村　 <秋田県> 秋田市";
    mainText[4] = "";
    mainText[5] = "";
    mainText[6] = "";
    mainText[7] = "";
    mainText[8] = "";
    mainText[9] = "";
    mainText[10] = "";
  }
  if(viewId == 9){
    msi = 9+1;
    csi = msi;
    q_msiText = siList[msi];
    q_magnitude = "--";
    q_epiName = "-------------";
    q_epiId = 343;
    q_depth = "--";
    q_timeYY = "2011";
    q_timeMM = "3";
    q_timeDD = "11";
    q_timeH = "14";
    q_timeM = "46";
    mainText[1] = "<東京都> 小笠原　 <兵庫県> 兵庫県南西部　 <島根県> 島根県隠岐　 <広島県> 広島県北部 広島県南東部 広島県南西部　 <山口県> 山口県西部 山口県中部　 <徳島県> 徳島県南部　 <香川県> 香川県東部 香川県西部　 <愛媛県> 愛媛県東予 愛媛県中予 愛媛県南予　 <高知県> 高知県中部 高知県西部　 <福岡県> 福岡県福岡 福岡県北九州 福岡県筑豊 福岡県筑後　 <長崎県> 長崎県島原半島 長崎県壱岐　 <熊本県> 熊本県熊本 熊本県球磨　 <大分県> 大分県中部　 <鹿児島県> 鹿児島県薩摩";
    mainText[2] = "<北海道> 後志地方西部 留萌地方中北部 宗谷地方南部 北海道利尻礼文　 <三重県> 三重県南部　 <京都府> 京都府北部　 <兵庫県> 兵庫県淡路島　 <和歌山県> 和歌山県北部 和歌山県南部　 <鳥取県> 鳥取県東部 鳥取県中部 鳥取県西部　 <島根県> 島根県東部 島根県西部　 <岡山県> 岡山県北部 岡山県南部　 <徳島県> 徳島県北部　 <高知県> 高知県東部　 <佐賀県> 佐賀県南部　 <熊本県> 熊本県阿蘇";
    mainText[3] = "<北海道> 石狩地方中部 渡島地方北部 後志地方北部 後志地方東部 北海道奥尻島 空知地方北部 空知地方中部 上川地方北部 上川地方中部 留萌地方南部 宗谷地方北部 網走地方 北見地方 紋別地方 胆振地方西部 釧路地方北部 根室地方北部 根室地方中部 根室地方南部　 <東京都> 伊豆大島 三宅島 八丈島　 <富山県> 富山県東部 富山県西部　 <石川県> 石川県能登 石川県加賀　 <福井県> 福井県嶺北 福井県嶺南　 <岐阜県> 岐阜県飛騨 岐阜県美濃東部　 <愛知県> 愛知県東部　 <三重県> 三重県北部 三重県中部　 <滋賀県> 滋賀県北部 滋賀県南部　 <京都府> 京都府南部　 <大阪府> 大阪府北部 大阪府南部　 <兵庫県> 兵庫県北部 兵庫県南東部　 <奈良県> 奈良県";
    mainText[4] = "<北海道> 石狩地方北部 石狩地方南部 渡島地方東部 渡島地方西部 檜山地方 空知地方南部 上川地方南部 胆振地方中東部 日高地方西部 日高地方中部 日高地方東部 十勝地方北部 十勝地方中部 十勝地方南部 釧路地方中南部　 <青森県> 青森県津軽北部 青森県津軽南部　 <秋田県> 秋田県内陸北部　 <東京都> 東京都多摩西部 神津島　 <新潟県> 新潟県上越 新潟県下越 新潟県佐渡　 <長野県> 長野県北部 長野県南部　 <岐阜県> 岐阜県美濃中西部　 <静岡県> 静岡県伊豆 静岡県中部 静岡県西部　 <愛知県> 愛知県西部";
    mainText[5] = "";
    mainText[6] = "<秋田県> 秋田県沿岸北部　 <山形県> 山形県庄内 山形県最上　 <埼玉県> 埼玉県秩父　 <新潟県> 新潟県中越　 <長野県> 長野県中部　 <静岡県> 静岡県東部";
    mainText[7] = "<青森県> 青森県三八上北 青森県下北　 <岩手県> 岩手県沿岸北部　 <秋田県> 秋田県沿岸南部 秋田県内陸南部　 <山形県> 山形県村山 山形県置賜　 <群馬県> 群馬県北部　 <埼玉県> 埼玉県北部　 <千葉県> 千葉県北東部 千葉県南部　 <東京都> 東京都２３区 東京都多摩東部 新島　 <神奈川県> 神奈川県東部 神奈川県西部　 <山梨県> 山梨県中・西部 山梨県東部・富士五湖";
    mainText[8] = "<岩手県> 岩手県沿岸南部 岩手県内陸北部 岩手県内陸南部　 <福島県> 福島県会津　 <群馬県> 群馬県南部　 <埼玉県> 埼玉県南部　 <千葉県> 千葉県北西部";
    mainText[9] = "<宮城県> 宮城県南部 宮城県中部　 <福島県> 福島県中通り 福島県浜通り　 <茨城県> 茨城県北部 茨城県南部　 <栃木県> 栃木県北部 栃木県南部";
    mainText[10] = "<宮城県> 宮城県北部";
  }
  if(q_magnitude!="--"){
    mainText[0] = q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。　震源は"+q_epiName+"、地震の規模を示すマグニチュードは"+q_magnitude;
    if(q_depth == "ごく浅い"){
      mainText[0] += "、震源は"+q_depth+"です。";
    } else {
      mainText[0] += "、震源の深さは"+q_depth+"kmです。";
    }
  } else {
    mainText[0] = "<<震度速報>> "+q_timeDD+"日"+q_timeH+"時"+q_timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 今後の情報にご注意ください！";
  }
}

var quakesContainer;
!function(e){
  quakesContainer = e();
}(function(){
  let em = document.querySelector("div.eiListHider");
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
      TextWidth = -(strWidth(DText));
      SetMode(0);
      break;

    case 2:
      TextWidth = strWidth(mainText[csi]) * -1;
      SetMode(2);
      mi = 0;
      break;

    default:
      console.log('error...');
      break;
  }
  textOffsetX = 1200;
}

function zenkakuToHankaku(str) {
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
      return {year:year,month:month,date:date,hour:hour,minute:min,second:sec,msec:misec}
    case 2:
      return d.getTime();
    case 3:
      return year+'/'+month+'/'+date+' '+Number(hour)+':'+min+':'+sec;
  }
}
function copy(text) {
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
    for(let item of table){
      if(byte >= item[0]){
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
    if (target instanceof Object){
      for (const item of Object.keys(target)){
        propLoop(target, item);
      }
    } else {
      try {
        const bufferData = await fetch(target).then(res => res.arrayBuffer());
        const decodedAudio = await audioAPI.context.decodeAudioData(bufferData);
        const bufferSource = audioAPI.context.createBufferSource();
        const gainNode = await audioAPI.context.createGain();
        bufferSource.buffer = decodedAudio;
        bufferSource.loop = false;
        bufferSource.connect(gainNode);
        bufferSource.uuid = crypto.randomUUID();
        gainNode.gain.value = 1;
        gainNode.connect(audioAPI.context.destination);
        parent[propName] = {audioData: decodedAudio, buffer: bufferSource, gain: gainNode, audioEndedEvent, canPlay: true };
      } catch (e) {
        console.dir(e);
        delete parent[propName];
      }
    }
  };
  for (const item of Object.keys(sounds)) propLoop(sounds, item);
  setInterval(Routines.main, 20);

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
      case speechBase.speechStatus.LOAD_SPEECH:
        elements.id.speechStatusCurrent.textContent = "音声ロード中：" + event.detail.data;
        break;
      case speechBase.speechStatus.END_INIT:
        speechBase.volume = elements.id.speechVolInput.valueAsNumber;

        elements.id.speechStatusCurrent.textContent = "初期化完了";
        break;
    }
  });
  await speechBase.init(audioAPI.context);

})();

// JSON[Symbol.toStringTag] -> "JSON"

//   https://www3.nhk.or.jp/weather/amds/amds_data.xml
//   https://www3.nhk.or.jp/weather/cld_pic/cld_pic_data.xml
//   https://www3.nhk.or.jp/sokuho/tsunami/data/publish.xml
//   https://www3.nhk.or.jp/news/json16/realtime_saigai.json
