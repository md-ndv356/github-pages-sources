'use strict';

// Release Note: 必ずバージョンを更新すること
//  manifest.jsonも共に
//  ホームページも共に
//  Google Apps Scriptも共に
const _ContentVersions = [
  "β0.1.0",
  "β0.1.1",
  "β0.1.2",
  "β0.1.3",
  "β0.1.4",
  "β0.1.5",
  "β0.1.6",
  "β0.1.7"
];
const _appVersion = "β0.1.7";
console.log(`%cNDV %c(Natural Disaster Viewer)%c   v.${_appVersion}%c
β0.1.0 ベータ版リリース
β0.1.1 howToUse.txtの更新
β0.1.2 効果音の音量関係の更新
β0.1.3 一部表記の変更 バージョンアップ検知機能 時計の色を変更(仮) その他一部の変更・修正
β0.1.4 バージョンアップお知らせ機能追加(起動時) 設定が反映されない場合がある問題を修正 デバッグ機能を追加 その他軽微な変更・修正
β0.1.5 Mスケールが地震情報のタイトルに一部反映されない問題を修正 緊急地震速報のレベル法・PLUM法による電文を一部受信できない問題を修正 時計のデザインを刷新
β0.1.6 緊急地震速報の表示テストが可能に 一部表記を変更 緊急地震速報ログを自動送信できるように変更 自動再読み込み機能追加 その他軽微な変更・修正
β0.1.7 カラーテーマを変更可能に 設定の追加 緊急地震速報の受信ログを送信できるように変更 その他軽微な変更・修正
お知らせ ライトモード／ダークモードの切り替えは今後のアップデートで追加します。`,
 "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 19px; font-style: italic;",
 "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 11px; font-style: italic;",
 "background: #9f9; font-family: sans-serif; font-weight: 700; padding: 2px; font-size: 9px; color: #888;",
 "background: #fff; font-family: sans-serif; font-weight: 300; padding: 2px; font-size: 9px; color: #333;"
);
console.log("%cProgram Started at: "+(new Date()).toISOString(),
 "background: #55f; font-family: sans-serif; font-weight: 300; padding: 2px; font-size: 14px; color: white;"
);
console.log("%c* clientInformation","font-size: 18px;");
console.log("The language of this browser UI: " + clientInformation.language);
for (var i = 0; i < clientInformation.languages.length; i++) {
  console.log("languages["+i+"] = " + clientInformation.languages[i]);
}
console.log("appCodeName = " + clientInformation.appCodeName);
console.log("appName = " + clientInformation.appName);
console.log("appVersion = " + clientInformation.appVersion);
console.log("platform = " + clientInformation.platform);
console.log(`This device has at least ${clientInformation.deviceMemory}GiB of RAM.`);
console.log(`This device has ${clientInformation.hardwareConcurrency} logical processors available to run threads on this computer.`);
console.log("userAgentData.brands[0] = { brand: " + clientInformation.userAgentData.brands[0].brand + ", version: " + clientInformation.userAgentData.brands[0].version + " }");
if(clientInformation.onLine){
  console.log("Online!");
} else {
  console.log("%c現在%cオフライン%cです。",
   "font-size: 16px; color: #fff; background-color: #000; padding-bottom: 3px; padding-top: 8px;",
   "font-size: 25px; color: #f00; background-color: #000;",
   "font-size: 16px; color: #fff; background-color: #000; padding-bottom: 3px; padding-top: 8px;"
  );
  console.log("%cインターネットに接続しないと、この拡張機能は使えないよ(´・ω・｀)", "font-family: sans-serif;");
}

const _U = undefined;
const _N = null;
const _T = true;
const _F = false;
const gElByCl = (name, index=0) => document.getElementsByClassName(name)[Number(index)];

// 用途不明
var aaaa
// main canvas
const canvas1 = document.getElementById('sample1');
const context = canvas1.getContext('2d');
// time canvas
const canvas2 = document.getElementById('sample2');
const time = canvas2.getContext('2d');
// named: siH
document.siH = document.getElementsByName("siH")[0];
// system sounds_
const sounds = {
  'quake' : {
    'main' : document.getElementById('EI'),
    'warning' : document.getElementById('EI5H')
  },
  'warning' : {
    'Notice' : document.getElementById('nt'),
    'GroundLoosening' : document.getElementById('GL'),
    'Emergency' : document.getElementById('SEW')
  },
  'tsunami' : {
    'Notice': document.getElementById('TW'),
    'Watch' : document.getElementById('TW'),
    'Warning' : document.getElementById('TW'),
    'Majorwarning' : document.getElementById('TW')
  },
  'eew' : {
    'first' : document.getElementById('EEW_First'),
    'continue' : document.getElementById('EEW_Continue'),
    'last' : document.getElementById('EEW_End')
  }
}
// stream recorder
var stream = canvas1.captureStream();
var recorder = new MediaRecorder(stream, {mineType: 'video/webm;codecs=vp9'});
recorder.ondataavailable = function(e){
  //var anchor = document.getElementById('downloadlink');
  var videoBlob = new Blob([e.data], {type:e.data.type});
  var blobUrl = window.URL.createObjectURL(videoBlob);
  /*anchor.download = 'movie.webm';
  anchor.href = blobUrl;
  anchor.style.display = 'block';*/
  var downloadTime = new Date();
  $('#download_movie').append('<a download="movie_'+getFormattedDate(2)+'.webm" href="'+blobUrl+'" style="display: block;">Download '+getFormattedDate(3,1)+'</a>');
}
recorder.onstart = function(){
  recording = true;
}
recorder.onstop = function(){
  recording = false;
}

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
      audioAPI.oscillatorNode.frequency.value = 1000; //987.767 - 1318.510
      audioAPI.oscillatorNode.type = "square";
      audioAPI.oscillatorNode.addEventListener("ended", function(){
        var freq = audioAPI.oscillatorNode.frequency.value;
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
}
audioAPI.init();
audioAPI.fun.setOscillator();

// volume list(seismic intensity)
const earthquakeReceiveVolumeList = [0.3,0.5,0.7,0.8,0.9,1,1,1,1];
// Mscale(Weathernews) color
const colorScheme = [
  [
    ["#5a94f2","#d1d900","#ff3d3d"],
    ["#4169e1","#edde0c","#ff1212"],
    ["#71f043","#c852ff","#ffffff"],
    ["#f0ff4a","#1b9ae3","#f0ff4a"],
    ["#999","#fff"],
    ["#fff","#333","#f00",["#fff","#333","#fff"]],
    ["#370921","#fff","#fd942a","#393939"] // time
  ], // light mode
  [
    ["#302ad1","#d1c12c","#a81b1b"],
    ["#0700d0","#b8a601","#b8211e"], // done
    ["#71f043","#c852ff","#fff"],
    ["#fff","#fff","#fff"], // done
    ["#999","#bbb"], // done
    ["#333","#fff","#e6e85d",["#fff","#333","#fff"]], // done
    ["#000","#00edf5","#ff503c","#000"] // done
  ], // dark mode
  [
    ["#2d4b7a","#747800","#962424"],
    ["#030069","#5c5301","#5c100f"],
    ["#397822","#642980","#808080"],
    ["#808080","#808080","#808080"],
    ["#4d4d4d","#5c5c5c"],
    ["#1a1a1a","#808080","#e6e85d",["#808080","#1a1a1a","#808080"]], // done
    ["#000","#00edf5","#ff503c","#000"]
  ]  // extremely dark mode
];
var colorThemeMode = 0;
// Mscale
var mscale = 0;
// ??
var aiueo = 0;
// Earthquake Information offset(latest=0)
var aa = 0;
// text location
var tx = 1200;

// main text
var Text = ["","","","","","","","","","",""];
// epicenter list of JMA
const shindo_name_ = ["石狩地方北部","石狩地方中部","石狩地方南部","後志地方北部","後志地方東部","後志地方西部","空知地方北部","空知地方中部","空知地方南部","渡島地方北部","渡島地方東部","渡島地方西部","檜山地方","北海道奥尻島","胆振地方西部","胆振地方中東部","日高地方西部","日高地方中部","日高地方東部","上川地方北部","上川地方中部","上川地方南部","留萌地方中北部","留萌地方南部","宗谷地方北部","宗谷地方南部","北海道利尻礼文","網走地方","北見地方","紋別地方","十勝地方北部","十勝地方中部","十勝地方南部","釧路地方北部","釧路地方中南部","根室地方北部","根室地方中部","根室地方南部","青森県津軽北部","青森県津軽南部","青森県三八上北","青森県下北","岩手県沿岸北部","岩手県沿岸南部","岩手県内陸北部","岩手県内陸南部","宮城県北部","宮城県中部","宮城県南部","秋田県沿岸北部","秋田県沿岸南部","秋田県内陸北部","秋田県内陸南部","山形県庄内","山形県最上","山形県村山","山形県置賜","福島県中通り","福島県浜通り","福島県会津","茨城県北部","茨城県南部","栃木県北部","栃木県南部","群馬県北部","群馬県南部","埼玉県北部","埼玉県南部","埼玉県秩父","千葉県北東部","千葉県北西部","千葉県南部","東京都２３区","東京都多摩東部","東京都多摩西部","伊豆大島","新島","神津島","三宅島","八丈島","小笠原","神奈川県東部","神奈川県西部","新潟県上越","新潟県中越","新潟県下越","新潟県佐渡","富山県東部","富山県西部","石川県能登","石川県加賀","福井県嶺北","福井県嶺南","山梨県東部・富士五湖","山梨県中・西部","長野県北部","長野県中部","長野県南部","岐阜県飛騨","岐阜県美濃東部","岐阜県美濃中西部","伊豆地方","静岡県東部","静岡県中部","静岡県西部","愛知県東部","愛知県西部","三重県北部","三重県中部","三重県南部","滋賀県北部","滋賀県南部","京都府北部","京都府南部","大阪府北部","大阪府南部","兵庫県北部","兵庫県南東部","兵庫県南西部","兵庫県淡路島","奈良県","和歌山県北部","和歌山県南部","鳥取県東部","鳥取県中部","鳥取県西部","島根県東部","島根県西部","島根県隠岐","岡山県北部","岡山県南部","広島県北部","広島県南東部","広島県南西部","山口県北部","山口県東部","山口県中部","山口県西部","徳島県北部","徳島県南部","香川県東部","香川県西部","愛媛県東予","愛媛県中予","愛媛県南予","高知県東部","高知県中部","高知県西部","福岡県福岡","福岡県北九州","福岡県筑豊","福岡県筑後","佐賀県北部","佐賀県南部","長崎県北部","長崎県南西部","長崎県島原半島","長崎県対馬","長崎県壱岐","長崎県五島","熊本県阿蘇","熊本県熊本","熊本県球磨","熊本県天草・芦北","大分県北部","大分県中部","大分県南部","大分県西部","宮崎県北部平野部","宮崎県北部山沿い","宮崎県南部平野部","宮崎県南部山沿い","鹿児島県薩摩","鹿児島県大隅","鹿児島県十島村","鹿児島県甑島","鹿児島県種子島","鹿児島県屋久島","鹿児島県奄美北部","鹿児島県奄美南部","沖縄県本島北部","沖縄県本島中南部","縄県久米島","沖縄県大東島","沖縄県宮古島","沖縄県石垣島","沖縄県与那国島","沖縄県西表島"];
// epicenter list of NHK
const shindo_name = ["石狩北部","石狩中部","石狩南部","後志北部","後志東部","後志西部","空知北部","空知中部","空知南部","渡島北部","渡島東部","渡島西部","檜山地方","北海道奥尻島","胆振西部","胆振中東部","日高西部","日高中部","日高東部","上川地方北部","上川地方中部","上川地方南部","留萌中北部","留萌南部","宗谷北部","宗谷南部","北海道利尻礼文","網走地方","北見地方","紋別地方","十勝北部","十勝中部","十勝南部","釧路北部","釧路中南部","根室北部","根室中部","根室南部","津軽北部","津軽南部","青森三八上北","青森下北","岩手沿岸北部","岩手沿岸南部","岩手内陸北部","岩手内陸南部","宮城北部","宮城中部","宮城南部","秋田沿岸北部","秋田沿岸南部","秋田内陸北部","秋田内陸南部","山形庄内地方","山形最上地方","山形村山地方","山形置賜地方","福島中通り","福島浜通り","会津","茨城北部","茨城南部","栃木北部","栃木南部","群馬北部","群馬南部","埼玉北部","埼玉南部","秩父地方","千葉北東部","千葉北西部","千葉南部","東京２３区","東京多摩東部","東京多摩西部","伊豆大島","新島地方","神津島","三宅島","八丈島","小笠原","神奈川東部","神奈川西部","新潟上越地方","新潟中越地方","新潟下越地方","佐渡地方","富山東部","富山西部","能登地方","加賀地方","福井嶺北地方","福井嶺南地方","山梨東部・富士五湖","山梨中・西部","長野北部","長野中部","長野南部","飛騨地方","美濃東部","美濃中西部","伊豆地方","静岡東部","静岡中部","静岡西部","愛知東部","愛知西部","三重北部","三重中部","三重南部","滋賀北部","滋賀南部","京都北部","京都南部","大阪北部","大阪南部","兵庫北部","兵庫南東部","兵庫南西部","淡路島","奈良県","和歌山北部","和歌山南部","鳥取東部","鳥取中部","鳥取西部","島根東部","島根西部","隠岐","岡山北部","岡山南部","広島北部","広島南東部","広島南西部","山口北部","山口東部","山口中部","山口西部","徳島北部","徳島南部","香川東部","香川西部","愛媛東予地方","愛媛中予地方","愛媛南予地方","高知東部","高知中部","高知西部","福岡地方","北九州地方","筑豊地方","筑後地方","佐賀北部","佐賀南部","長崎北部","長崎南西部","島原半島","対馬地方","壱岐地方","五島地方","阿蘇地方","熊本地方","球磨地方","天草・芦北","大分北部","大分中部","大分南部","大分西部","宮崎北部平野部","宮崎北部山沿い","宮崎南部平野部","宮崎南部山沿い","薩摩地方","大隅地方","十島村","甑島","種子島地方","屋久島地方","奄美北部","奄美南部","沖縄本島北部","沖縄本島中南部","久米島地方","大東島地方","宮古島地方","石垣島地方","与那国島地方","西表島地方"];
// epicenter code list
const epiCode = [100,101,102,105,106,107,110,115,116,117,120,121,122,125,126,127,130,131,135,136,140,141,142,145,146,150,151,152,155,156,157,160,161,165,166,167,180,181,182,183,184,186,187,188,189,190,191,192,193,194,195,196,197,200,201,202,203,210,211,212,213,220,221,222,230,231,232,233,240,241,242,243,250,251,252,280,281,282,283,284,285,286,287,288,289,300,301,309,310,311,320,321,330,331,332,340,341,342,349,350,351,352,360,361,370,371,372,378,379,380,381,390,391,400,401,411,412,420,421,422,430,431,432,440,441,442,443,450,451,460,461,462,469,471,472,473,475,476,477,478,480,481,482,483,485,486,487,489,490,492,493,494,495,497,498,499,500,501,510,511,520,521,530,531,532,540,550,551,560,562,563,570,571,580,581,590,591,592,600,601,610,611,620,621,622,630,631,632,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,700,702,703,704,710,711,712,713,720,721,730,731,732,740,741,742,743,750,751,752,753,760,761,762,763,770,771,783,784,785,786,787,790,791,793,795,796,797,798,799,820,821,822,823,850,851,852,853,854,855,856,857,858,859,860,900,901,902,903,904,905,906,907,908,909,911,912,913,914,915,916,917,918,919,920,921,922,930,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,999];
// epicenter list
var epiList = new Array(2);
epiList[0] = ["石狩地方北部","石狩地方中部","石狩地方南部","渡島地方北部","渡島地方東部","渡島地方西部","檜山地方","後志地方北部","後志地方東部","後志地方西部","空知地方北部","空知地方中部","空知地方南部","上川地方北部","上川地方中部","上川地方南部","留萌地方中北部","留萌地方南部","宗谷地方北部","宗谷地方南部","網走地方","北見地方","紋別地方","胆振地方西部","胆振地方中東部","日高地方西部","日高地方中部","日高地方東部","十勝地方北部","十勝地方中部","十勝地方南部","釧路地方北部","釧路地方中南部","根室地方北部","根室地方中部","根室地方南部","北海道南西沖","北海道西方沖","石狩湾","北海道北西沖","宗谷海峡","国後島付近","択捉島付近","北海道東方沖","根室半島南東沖","釧路沖","十勝沖","浦河沖","苫小牧沖","内浦湾","宗谷東方沖","網走沖","択捉島南東沖","青森県津軽北部","青森県津軽南部","青森県三八上北地方","青森県下北地方","岩手県沿岸北部","岩手県沿岸南部","岩手県内陸北部","岩手県内陸南部","宮城県北部","宮城県南部","宮城県中部","秋田県沿岸北部","秋田県沿岸南部","秋田県内陸北部","秋田県内陸南部","山形県庄内地方","山形県最上地方","山形県村山地方","山形県置賜地方","福島県中通り","福島県浜通り","福島県会津","津軽海峡","山形県沖","秋田県沖","青森県西方沖","陸奥湾","青森県東方沖","岩手県沖","宮城県沖","三陸沖","福島県沖","茨城県北部","茨城県南部","千葉県南東沖","栃木県北部","栃木県南部","群馬県北部","群馬県南部","埼玉県北部","埼玉県南部","埼玉県秩父地方","千葉県北東部","千葉県北西部","千葉県南部","房総半島南方沖","東京都23区","東京都多摩東部","東京都多摩西部","神奈川県東部","神奈川県西部","新潟県上越地方","新潟県中越地方","新潟県下越地方","新潟県下越沖","新潟県上中越沖","富山県東部","富山県西部","石川県能登地方","石川県加賀地方","福井県嶺北","福井県嶺南","山梨県中・西部","山梨県東部・富士五湖","長野県北部","長野県中部","長野県南部","岐阜県飛騨地方","岐阜県美濃東部","岐阜県美濃中西部","静岡県伊豆地方","静岡県東部","静岡県中部","静岡県西部","愛知県東部","愛知県西部","三重県北部","三重県中部","三重県南部","三重県南東沖","茨城県沖","関東東方沖","千葉県東方沖","八丈島東方沖","八丈島近海","東京湾","相模湾","伊豆大島近海","伊豆半島東方沖","三宅島近海","新島・神津島近海","駿河湾","駿河湾南方沖","遠州灘","三河湾","伊勢湾","若狭湾","福井県沖","石川県西方沖","能登半島沖","富山湾","佐渡付近","東海道南方沖","滋賀県北部","滋賀県南部","京都府北部","京都府南部","大阪府北部","大阪府南部","兵庫県北部","兵庫県南東部","兵庫県南西部","奈良県","和歌山県北部","和歌山県南部","鳥取県東部","鳥取県中部","鳥取県西部","島根県東部","島根県西部","岡山県北部","岡山県南部","広島県北部","広島県南東部","広島県南西部","徳島県北部","徳島県南部","香川県東部","香川県西部","愛媛県東予","愛媛県中予","愛媛県南予","高知県東部","高知県中部","高知県西部","土佐湾","紀伊水道","大阪湾","播磨灘","瀬戸内海中部","安芸灘","周防灘","伊予灘","豊後水道","山口県北西沖","島根県沖","鳥取県沖","隠岐島近海","兵庫県北方沖","京都府沖","淡路島付近","和歌山県南方沖","山口県北部","山口県西部","山口県東部","山口県中部","福岡県福岡地方","福岡県北九州地方","福岡県筑豊地方","福岡県筑後地方","佐賀県北部","佐賀県南部","長崎県北部","長崎県南西部","長崎県島原半島","熊本県阿蘇地方","熊本県熊本地方","熊本県球磨地方","熊本県天草・芦北地方","大分県北部","大分県中部","大分県南部","大分県西部","宮崎県北部平野部","宮崎県北部山沿い","宮崎県南部平野部","宮崎県南部山沿い","鹿児島県薩摩地方","鹿児島県大隅地方","五島列島近海","天草灘","有明海","橘湾","鹿児島湾","種子島近海","日向灘","奄美大島近海","壱岐・対馬近海","福岡県北西沖","薩摩半島西方沖","トカラ列島近海","奄美大島北西沖","大隅半島東方沖","九州地方南東沖","種子島南東沖","奄美大島北東沖","沖縄本島近海","南大東島近海","沖縄本島南方沖","宮古島近海","石垣島近海","石垣島南方沖","西表島付近","与那国島近海","沖縄本島北西沖","宮古島北西沖","石垣島北西沖","台湾付近","東シナ海","四国沖","鳥島近海","鳥島東方沖","オホーツク海南部","サハリン西方沖","日本海北部","日本海中部","日本海西部","父島近海","千島列島","千島列島南東沖","北海道南東沖","東北地方東方沖","小笠原諸島西方沖","硫黄島近海","小笠原諸島東方沖","南海道南方沖","薩南諸島東方沖","本州南方沖","サハリン南部付近","北西太平洋","マリアナ諸島","黄海","朝鮮半島南部","朝鮮半島北部","中国東北部","ウラジオストク付近","シベリア南部","サハリン近海","アリューシャン列島","カムチャツカ半島付近","北米西部","北米中部","北米東部","中米","南米西部","南米中部","南米東部","北東太平洋","南太平洋","インドシナ半島付近","フィリピン付近","インドネシア付近","グアム付近","ニューギニア付近","ニュージーランド付近","オーストラリア付近","シベリア付近","ロシア西部","ロシア中部","ロシア東部","中央アジア","中国西部","中国中部","中国東部","インド付近","インド洋","中東","ヨーロッパ西部","ヨーロッパ中部","ヨーロッパ東部","地中海","アフリカ西部","アフリカ中部","アフリカ東部","北大西洋","南大西洋","北極付近","南極付近","遠地"];
// AreaForecastLocalM
const AreaForecastLocalM = {
  warn: {
    '011000': '北海道宗谷地方',
    '012010': '北海道上川地方',
    '012020': '北海道留萌地方',
    '013010': '北海道網走地方',
    '013020': '北海道北見地方',
    '013030': '北海道紋別地方',
    '014010': '北海道根室地方',
    '014020': '北海道釧路地方',
    '014030': '北海道十勝地方',
    '015010': '北海道胆振地方',
    '015020': '北海道日高地方',
    '016010': '北海道石狩地方',
    '016020': '北海道空知地方',
    '016030': '北海道後志地方',
    '017010': '北海道渡島地方',
    '017020': '北海道檜山地方',
    '020010': '青森県津軽地方',
    '020020': '青森県下北地方',
    '020030': '青森県三八上北地方',
    '030010': '岩手県内陸',
    '030020': '岩手県沿岸北部',
    '030030': '岩手県沿岸南部',
    '040010': '宮城県東部',
    '040020': '宮城県西部',
    '050010': '秋田県沿岸',
    '050020': '秋田県内陸',
    '060010': '山形県村山',
    '060020': '山形県置賜',
    '060030': '山形県庄内',
    '060040': '山形県最上',
    '070010': '福島県中通り',
    '070020': '福島県浜通り',
    '070030': '福島県会津',
    '080010': '茨城県北部',
    '080020': '茨城県南部',
    '090010': '栃木県南部',
    '090020': '栃木県北部',
    '100010': '群馬県南部',
    '100020': '群馬県北部',
    '110010': '埼玉県南部',
    '110020': '埼玉県北部',
    '110030': '埼玉県秩父地方',
    '120010': '千葉県北西部',
    '120020': '千葉県北東部',
    '120030': '千葉県南部',
    '130010': '東京地方',
    '130020': '伊豆諸島北部',
    '130030': '伊豆諸島南部',
    '130040': '小笠原諸島',//aaaaaaaaa(?)
    '140010': '神奈川県東部',
    '140020': '神奈川県西部',
    '150010': '新潟県下越',
    '150020': '新潟県中越',
    '150030': '新潟県上越',
    '150040': '新潟県佐渡',
    '160010': '富山県東部',
    '160020': '富山県西部',
    '170010': '石川県加賀',
    '170020': '石川県能登',
    '180010': '福井県嶺北',
    '180020': '福井県嶺南',
    '190010': '山梨県中・西部',
    '190020': '山梨県東部・富士五湖',
    '200010': '長野県北部',
    '200020': '長野県中部',
    '200030': '長野県南部',
    '210010': '岐阜県美濃地方',
    '210020': '岐阜県飛騨地方',
    '220010': '静岡県中部',
    '220020': '静岡県伊豆',
    '220030': '静岡県東部',
    '220040': '静岡県西部',
    '230010': '愛知県西部',
    '230020': '愛知県東部',
    '240010': '三重県北中部',
    '240020': '三重県南部',
    '250010': '滋賀県東部',
    '250020': '滋賀県北部',
    '260010': '京都府南部',
    '260020': '京都府北部',
    '270000': '大阪府',
    '280010': '兵庫県南部',
    '280020': '兵庫県北部',
    '290010': '奈良県北部',
    '290020': '奈良県南部',
    '300010': '和歌山県北部',
    '300020': '和歌山県南部',
    '310010': '鳥取県東部',
    '310020': '鳥取県中・西部',
    '320010': '島根県東部',
    '320020': '島根県西部',
    '320030': '島根県隠岐',
    '330010': '岡山県南部',
    '330020': '岡山県北部',
    '340010': '広島県南部',
    '340020': '広島県北部',
    '350010': '山口県西部',
    '350020': '山口県中部',
    '350030': '山口県東部',
    '350040': '山口県北部',
    '360010': '徳島県北部',
    '360020': '徳島県南部',
    '370000': '香川県',
    '380010': '愛媛県中予',
    '380020': '愛媛県東予',
    '380030': '愛媛県南予',
    '390010': '高知県中部',
    '390020': '高知県東部',
    '390030': '高知県西部',
    '400010': '福岡県福岡地方',
    '400020': '福岡県北九州地方',
    '400030': '福岡県筑豊地方',
    '400040': '福岡県筑後地方',
    '410010': '佐賀県南部',
    '410020': '佐賀県北部',
    '420010': '長崎県南部',
    '420020': '長崎県北部',
    '420030': '長崎県壱岐・対馬',
    '420040': '長崎県五島',
    '430010': '熊本県熊本地方',
    '430020': '熊本県阿蘇地方',
    '430030': '熊本県天草・芦北地方',
    '430040': '熊本県球磨地方',
    '440010': '大分県中部',
    '440020': '大分県北部',
    '440030': '大分県西部',
    '440040': '大分県南部',
    '450010': '宮崎県南部平野部',
    '450020': '宮崎県北部平野部',
    '450030': '宮崎県南部山沿い',
    '450040': '宮崎県北部山沿い',
    '460010': '鹿児島県薩摩地方',
    '460020': '鹿児島県大隈地方',
    '460030': '種子島・屋久島地方',
    '460040': '奄美地方',
    '471010': '沖縄本島中南部',
    '471020': '沖縄本島北部',
    '471030': '久米島',
    '472000': '大東島地方',
    '473000': '宮古島地方',
    '474010': '石垣島地方',
    '474020': '与那国島地方'
  },
  tornado: {
    '011000': '北海道宗谷地方',
    '012010': '北海道上川地方',
    '012020': '北海道留萌地方',
    '013010': '北海道網走地方',
    '013020': '北海道北見地方',
    '013030': '北海道紋別地方',
    '014010': '北海道根室地方',
    '014020': '北海道釧路地方',
    '014030': '北海道十勝地方',
    '015010': '北海道胆振地方',
    '015020': '北海道日高地方',
    '016010': '北海道石狩地方',
    '016020': '北海道空知地方',
    '016030': '北海道後志地方',
    '017010': '北海道渡島地方',
    '017020': '北海道檜山地方',
    '020010': '青森県津軽地方',
    '020020': '青森県下北地方',
    '020030': '青森県三八上北地方',
    '030010': '岩手県内陸',
    '030020': '岩手県沿岸北部',
    '030030': '岩手県沿岸南部',
    '040010': '宮城県東部',
    '040020': '宮城県西部',
    '050010': '秋田県沿岸',
    '050020': '秋田県内陸',
    '060010': '山形県村山',
    '060020': '山形県置賜',
    '060030': '山形県庄内',
    '060040': '山形県最上',
    '070010': '福島県中通り',
    '070020': '福島県浜通り',
    '070030': '福島県会津',
    '080010': '茨城県北部',
    '080020': '茨城県南部',
    '090010': '栃木県南部',
    '090020': '栃木県北部',
    '100010': '群馬県南部',
    '100020': '群馬県北部',
    '110010': '埼玉県南部',
    '110020': '埼玉県北部',
    '110030': '埼玉県秩父地方',
    '120010': '千葉県北西部',
    '120020': '千葉県北東部',
    '120030': '千葉県南部',
    '130010': '東京地方',
    '130020': '伊豆諸島北部',
    '130030': '伊豆諸島南部',
    '140010': '神奈川県東部',
    '140020': '神奈川県西部',
    '150010': '新潟県下越',
    '150020': '新潟県中越',
    '150030': '新潟県上越',
    '150040': '新潟県佐渡',
    '160010': '富山県東部',
    '160020': '富山県西部',
    '170010': '石川県加賀',
    '170020': '石川県能登',
    '180010': '福井県嶺北',
    '180020': '福井県嶺南',
    '190010': '山梨県中・西部',
    '190020': '山梨県東部・富士五湖',
    '200010': '長野県北部',
    '200020': '長野県中部',
    '200030': '長野県南部',
    '210010': '岐阜県美濃地方',
    '210020': '岐阜県飛騨地方',
    '220010': '静岡県中部',
    '220020': '静岡県伊豆',
    '220030': '静岡県東部',
    '220040': '静岡県西部',
    '230010': '愛知県西部',
    '230020': '愛知県東部',
    '240010': '三重県北中部',
    '240020': '三重県南部',
    '250010': '滋賀県東部',
    '250020': '滋賀県北部',
    '260010': '京都府南部',
    '260020': '京都府北部',
    '270000': '大阪府',
    '280010': '兵庫県南部',
    '280020': '兵庫県北部',
    '290010': '奈良県北部',
    '290020': '奈良県南部',
    '300010': '和歌山県北部',
    '300020': '和歌山県南部',
    '310010': '鳥取県東部',
    '310020': '鳥取県中・西部',
    '320010': '島根県東部',
    '320020': '島根県西部',
    '320030': '島根県隠岐',
    '330010': '岡山県南部',
    '330020': '岡山県北部',
    '340010': '広島県南部',
    '340020': '広島県北部',
    '350010': '山口県西部',
    '350020': '山口県中部',
    '350030': '山口県東部',
    '350040': '山口県北部',
    '360010': '徳島県北部',
    '360020': '徳島県南部',
    '370000': '香川県',
    '380010': '愛媛県中予',
    '380020': '愛媛県東予',
    '380030': '愛媛県南予',
    '390010': '高知県中部',
    '390020': '高知県東部',
    '390030': '高知県西部',
    '400010': '福岡県福岡地方',
    '400020': '福岡県北九州地方',
    '400030': '福岡県筑豊地方',
    '400040': '福岡県筑後地方',
    '410010': '佐賀県南部',
    '410020': '佐賀県北部',
    '420010': '長崎県南部',
    '420020': '長崎県北部',
    '420030': '長崎県壱岐・対馬',
    '420040': '長崎県五島',
    '430010': '熊本県熊本地方',
    '430020': '熊本県阿蘇地方',
    '430030': '熊本県天草・芦北地方',
    '430040': '熊本県球磨地方',
    '440010': '大分県中部',
    '440020': '大分県北部',
    '440030': '大分県西部',
    '440040': '大分県南部',
    '450010': '宮崎県南部平野部',
    '450020': '宮崎県北部平野部',
    '450030': '宮崎県南部山沿い',
    '450040': '宮崎県北部山沿い',
    '460010': '鹿児島県薩摩地方',
    '460020': '鹿児島県大隈地方',
    '460030': '種子島・屋久島地方',
    '460040': '奄美地方',
    '471010': '沖縄本島中南部',
    '471020': '沖縄本島北部',
    '471030': '久米島',
    '472000': '大東島地方',
    '473000': '宮古島地方',
    '474010': '石垣島地方',
    '474020': '与那国島地方'
  }
};
const JMAWarnTypeList = {
  33: {
    name1: "大雨",
    name2: "特別警報",
    elem: "rain",
    level: 50
  },
  "03": {
    name1: "大雨",
    name2: "警報",
    elem: "rain",
    level: 30
  },
  10: {
    name1: "大雨",
    name2: "注意報",
    elem: "rain",
    level: 20
  },
  "04": {
    name1: "洪水",
    name2: "警報",
    elem: "flood",
    level: 30
  },
  18: {
    name1: "洪水",
    name2: "注意報",
    elem: "flood",
    level: 20
  },
  35: {
    name1: "暴風",
    name2: "特別警報",
    elem: "wind",
    level: 40
  },
  "05": {
    name1: "暴風",
    name2: "警報",
    elem: "wind",
    level: 30
  },
  15: {
    name1: "強風",
    name2: "注意報",
    elem: "wind",
    level: 20
  },
  32: {
    name1: "暴風雪",
    name2: "特別警報",
    elem: "wind_snow",
    level: 40
  },
  "02": {
    name1: "暴風雪",
    name2: "警報",
    elem: "wind_snow",
    level: 30
  },
  13: {
    name1: "風雪",
    name2: "注意報",
    elem: "wind_snow",
    level: 20
  },
  36: {
    name1: "大雪",
    name2: "特別警報",
    elem: "snow",
    level: 40
  },
  "06": {
    name1: "大雪",
    name2: "警報",
    elem: "snow",
    level: 30
  },
  12: {
    name1: "大雪",
    name2: "注意報",
    elem: "snow",
    level: 20
  },
  37: {
    name1: "波浪",
    name2: "特別警報",
    elem: "wave",
    level: 40
  },
  "07": {
    name1: "波浪",
    name2: "警報",
    elem: "wave",
    level: 30
  },
  16: {
    name1: "波浪",
    name2: "注意報",
    elem: "wave",
    level: 20
  },
  38: {
    name1: "高潮",
    name2: "特別警報",
    elem: "tide",
    level: 40
  },
  "08": {
    name1: "高潮",
    name2: "警報",
    elem: "tide",
    level: 40
  },
  19: {
    name1: "高潮",
    name2: "注意報",
    elem: "tide",
    level: 20
  },
  "19+": {
    name1: "高潮",
    name2: "注意報",
    elem: "tide",
    level: 30
  },
  14: {
    name1: "雷",
    name2: "注意報",
    elem: "thunder",
    level: 20
  },
  17: {
    name1: "融雪",
    name2: "注意報",
    elem: "snow_melting",
    level: 20
  },
  20: {
    name1: "濃霧",
    name2: "注意報",
    elem: "fog",
    level: 20
  },
  21: {
    name1: "乾燥",
    name2: "注意報",
    elem: "dry",
    level: 20
  },
  22: {
    name1: "なだれ",
    name2: "注意報",
    elem: "avalanche",
    level: 20
  },
  23: {
    name1: "低温",
    name2: "注意報",
    elem: "cold",
    level: 20
  },
  24: {
    name1: "霜",
    name2: "注意報",
    elem: "frost",
    level: 20
  },
  25: {
    name1: "着氷",
    name2: "注意報",
    elem: "ice_accretion",
    level: 20
  },
  26: {
    name1: "着雪",
    name2: "注意報",
    elem: "snow_accretion",
    level: 20
  }
};
const MapData1 = {
  TELOPS: {
    100: ["100.svg", "500.svg", "100", "晴", "CLEAR"],
    101: ["101.svg", "501.svg", "100", "晴時々曇", "PARTLY CLOUDY"],
    102: ["102.svg", "502.svg", "300", "晴一時雨", "CLEAR, OCCASIONAL SCATTERED SHOWERS"],
    103: ["102.svg", "502.svg", "300", "晴時々雨", "CLEAR, FREQUENT SCATTERED SHOWERS"],
    104: ["104.svg", "504.svg", "400", "晴一時雪", "CLEAR, SNOW FLURRIES"],
    105: ["104.svg", "504.svg", "400", "晴時々雪", "CLEAR, FREQUENT SNOW FLURRIES"],
    106: ["102.svg", "502.svg", "300", "晴一時雨か雪", "CLEAR, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES"],
    107: ["102.svg", "502.svg", "300", "晴時々雨か雪", "CLEAR, FREQUENT SCATTERED SHOWERS OR SNOW FLURRIES"],
    108: ["102.svg", "502.svg", "300", "晴一時雨か雷雨", "CLEAR, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER"],
    110: ["110.svg", "510.svg", "100", "晴後時々曇", "CLEAR, PARTLY CLOUDY LATER"],
    111: ["110.svg", "510.svg", "100", "晴後曇", "CLEAR, CLOUDY LATER"],
    112: ["112.svg", "512.svg", "300", "晴後一時雨", "CLEAR, OCCASIONAL SCATTERED SHOWERS LATER"],
    113: ["112.svg", "512.svg", "300", "晴後時々雨", "CLEAR, FREQUENT SCATTERED SHOWERS LATER"],
    114: ["112.svg", "512.svg", "300", "晴後雨", "CLEAR,RAIN LATER"],
    115: ["115.svg", "515.svg", "400", "晴後一時雪", "CLEAR, OCCASIONAL SNOW FLURRIES LATER"],
    116: ["115.svg", "515.svg", "400", "晴後時々雪", "CLEAR, FREQUENT SNOW FLURRIES LATER"],
    117: ["115.svg", "515.svg", "400", "晴後雪", "CLEAR,SNOW LATER"],
    118: ["112.svg", "512.svg", "300", "晴後雨か雪", "CLEAR, RAIN OR SNOW LATER"],
    119: ["112.svg", "512.svg", "300", "晴後雨か雷雨", "CLEAR, RAIN AND/OR THUNDER LATER"],
    120: ["102.svg", "502.svg", "300", "晴朝夕一時雨", "OCCASIONAL SCATTERED SHOWERS IN THE MORNING AND EVENING, CLEAR DURING THE DAY"],
    121: ["102.svg", "502.svg", "300", "晴朝の内一時雨", "OCCASIONAL SCATTERED SHOWERS IN THE MORNING, CLEAR DURING THE DAY"],
    122: ["112.svg", "512.svg", "300", "晴夕方一時雨", "CLEAR, OCCASIONAL SCATTERED SHOWERS IN THE EVENING"],
    123: ["100.svg", "500.svg", "100", "晴山沿い雷雨", "CLEAR IN THE PLAINS, RAIN AND THUNDER NEAR MOUTAINOUS AREAS"],
    124: ["100.svg", "500.svg", "100", "晴山沿い雪", "CLEAR IN THE PLAINS, SNOW NEAR MOUTAINOUS AREAS"],
    125: ["112.svg", "512.svg", "300", "晴午後は雷雨", "CLEAR, RAIN AND THUNDER IN THE AFTERNOON"],
    126: ["112.svg", "512.svg", "300", "晴昼頃から雨", "CLEAR, RAIN IN THE AFTERNOON"],
    127: ["112.svg", "512.svg", "300", "晴夕方から雨", "CLEAR, RAIN IN THE EVENING"],
    128: ["112.svg", "512.svg", "300", "晴夜は雨", "CLEAR, RAIN IN THE NIGHT"],
    130: ["100.svg", "500.svg", "100", "朝の内霧後晴", "FOG IN THE MORNING, CLEAR LATER"],
    131: ["100.svg", "500.svg", "100", "晴明け方霧", "FOG AROUND DAWN, CLEAR LATER"],
    132: ["101.svg", "501.svg", "100", "晴朝夕曇", "CLOUDY IN THE MORNING AND EVENING, CLEAR DURING THE DAY"],
    140: ["102.svg", "502.svg", "300", "晴時々雨で雷を伴う", "CLEAR, FREQUENT SCATTERED SHOWERS AND THUNDER"],
    160: ["104.svg", "504.svg", "400", "晴一時雪か雨", "CLEAR, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS"],
    170: ["104.svg", "504.svg", "400", "晴時々雪か雨", "CLEAR, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS"],
    181: ["115.svg", "515.svg", "400", "晴後雪か雨", "CLEAR, SNOW OR RAIN LATER"],
    200: ["200.svg", "200.svg", "200", "曇", "CLOUDY"],
    201: ["201.svg", "601.svg", "200", "曇時々晴", "MOSTLY CLOUDY"],
    202: ["202.svg", "202.svg", "300", "曇一時雨", "CLOUDY, OCCASIONAL SCATTERED SHOWERS"],
    203: ["202.svg", "202.svg", "300", "曇時々雨", "CLOUDY, FREQUENT SCATTERED SHOWERS"],
    204: ["204.svg", "204.svg", "400", "曇一時雪", "CLOUDY, OCCASIONAL SNOW FLURRIES"],
    205: ["204.svg", "204.svg", "400", "曇時々雪", "CLOUDY FREQUENT SNOW FLURRIES"],
    206: ["202.svg", "202.svg", "300", "曇一時雨か雪", "CLOUDY, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES"],
    207: ["202.svg", "202.svg", "300", "曇時々雨か雪", "CLOUDY, FREQUENT SCCATERED SHOWERS OR SNOW FLURRIES"],
    208: ["202.svg", "202.svg", "300", "曇一時雨か雷雨", "CLOUDY, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER"],
    209: ["200.svg", "200.svg", "200", "霧", "FOG"],
    210: ["210.svg", "610.svg", "200", "曇後時々晴", "CLOUDY, PARTLY CLOUDY LATER"],
    211: ["210.svg", "610.svg", "200", "曇後晴", "CLOUDY, CLEAR LATER"],
    212: ["212.svg", "212.svg", "300", "曇後一時雨", "CLOUDY, OCCASIONAL SCATTERED SHOWERS LATER"],
    213: ["212.svg", "212.svg", "300", "曇後時々雨", "CLOUDY, FREQUENT SCATTERED SHOWERS LATER"],
    214: ["212.svg", "212.svg", "300", "曇後雨", "CLOUDY, RAIN LATER"],
    215: ["215.svg", "215.svg", "400", "曇後一時雪", "CLOUDY, SNOW FLURRIES LATER"],
    216: ["215.svg", "215.svg", "400", "曇後時々雪", "CLOUDY, FREQUENT SNOW FLURRIES LATER"],
    217: ["215.svg", "215.svg", "400", "曇後雪", "CLOUDY, SNOW LATER"],
    218: ["212.svg", "212.svg", "300", "曇後雨か雪", "CLOUDY, RAIN OR SNOW LATER"],
    219: ["212.svg", "212.svg", "300", "曇後雨か雷雨", "CLOUDY, RAIN AND/OR THUNDER LATER"],
    220: ["202.svg", "202.svg", "300", "曇朝夕一時雨", "OCCASIONAL SCCATERED SHOWERS IN THE MORNING AND EVENING, CLOUDY DURING THE DAY"],
    221: ["202.svg", "202.svg", "300", "曇朝の内一時雨", "CLOUDY OCCASIONAL SCCATERED SHOWERS IN THE MORNING"],
    222: ["212.svg", "212.svg", "300", "曇夕方一時雨", "CLOUDY, OCCASIONAL SCCATERED SHOWERS IN THE EVENING"],
    223: ["201.svg", "601.svg", "200", "曇日中時々晴", "CLOUDY IN THE MORNING AND EVENING, PARTLY CLOUDY DURING THE DAY,"],
    224: ["212.svg", "212.svg", "300", "曇昼頃から雨", "CLOUDY, RAIN IN THE AFTERNOON"],
    225: ["212.svg", "212.svg", "300", "曇夕方から雨", "CLOUDY, RAIN IN THE EVENING"],
    226: ["212.svg", "212.svg", "300", "曇夜は雨", "CLOUDY, RAIN IN THE NIGHT"],
    228: ["215.svg", "215.svg", "400", "曇昼頃から雪", "CLOUDY, SNOW IN THE AFTERNOON"],
    229: ["215.svg", "215.svg", "400", "曇夕方から雪", "CLOUDY, SNOW IN THE EVENING"],
    230: ["215.svg", "215.svg", "400", "曇夜は雪", "CLOUDY, SNOW IN THE NIGHT"],
    231: ["200.svg", "200.svg", "200", "曇海上海岸は霧か霧雨", "CLOUDY, FOG OR DRIZZLING ON THE SEA AND NEAR SEASHORE"],
    240: ["202.svg", "202.svg", "300", "曇時々雨で雷を伴う", "CLOUDY, FREQUENT SCCATERED SHOWERS AND THUNDER"],
    250: ["204.svg", "204.svg", "400", "曇時々雪で雷を伴う", "CLOUDY, FREQUENT SNOW AND THUNDER"],
    260: ["204.svg", "204.svg", "400", "曇一時雪か雨", "CLOUDY, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS"],
    270: ["204.svg", "204.svg", "400", "曇時々雪か雨", "CLOUDY, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS"],
    281: ["215.svg", "215.svg", "400", "曇後雪か雨", "CLOUDY, SNOW OR RAIN LATER"],
    300: ["300.svg", "300.svg", "300", "雨", "RAIN"],
    301: ["301.svg", "701.svg", "300", "雨時々晴", "RAIN, PARTLY CLOUDY"],
    302: ["302.svg", "302.svg", "300", "雨時々止む", "SHOWERS THROUGHOUT THE DAY"],
    303: ["303.svg", "303.svg", "400", "雨時々雪", "RAIN,FREQUENT SNOW FLURRIES"],
    304: ["300.svg", "300.svg", "300", "雨か雪", "RAINORSNOW"],
    306: ["300.svg", "300.svg", "300", "大雨", "HEAVYRAIN"],
    308: ["308.svg", "308.svg", "300", "雨で暴風を伴う", "RAINSTORM"],
    309: ["303.svg", "303.svg", "400", "雨一時雪", "RAIN,OCCASIONAL SNOW"],
    311: ["311.svg", "711.svg", "300", "雨後晴", "RAIN,CLEAR LATER"],
    313: ["313.svg", "313.svg", "300", "雨後曇", "RAIN,CLOUDY LATER"],
    314: ["314.svg", "314.svg", "400", "雨後時々雪", "RAIN, FREQUENT SNOW FLURRIES LATER"],
    315: ["314.svg", "314.svg", "400", "雨後雪", "RAIN,SNOW LATER"],
    316: ["311.svg", "711.svg", "300", "雨か雪後晴", "RAIN OR SNOW, CLEAR LATER"],
    317: ["313.svg", "313.svg", "300", "雨か雪後曇", "RAIN OR SNOW, CLOUDY LATER"],
    320: ["311.svg", "711.svg", "300", "朝の内雨後晴", "RAIN IN THE MORNING, CLEAR LATER"],
    321: ["313.svg", "313.svg", "300", "朝の内雨後曇", "RAIN IN THE MORNING, CLOUDY LATER"],
    322: ["303.svg", "303.svg", "400", "雨朝晩一時雪", "OCCASIONAL SNOW IN THE MORNING AND EVENING, RAIN DURING THE DAY"],
    323: ["311.svg", "711.svg", "300", "雨昼頃から晴", "RAIN, CLEAR IN THE AFTERNOON"],
    324: ["311.svg", "711.svg", "300", "雨夕方から晴", "RAIN, CLEAR IN THE EVENING"],
    325: ["311.svg", "711.svg", "300", "雨夜は晴", "RAIN, CLEAR IN THE NIGHT"],
    326: ["314.svg", "314.svg", "400", "雨夕方から雪", "RAIN, SNOW IN THE EVENING"],
    327: ["314.svg", "314.svg", "400", "雨夜は雪", "RAIN,SNOW IN THE NIGHT"],
    328: ["300.svg", "300.svg", "300", "雨一時強く降る", "RAIN, EXPECT OCCASIONAL HEAVY RAINFALL"],
    329: ["300.svg", "300.svg", "300", "雨一時みぞれ", "RAIN, OCCASIONAL SLEET"],
    340: ["400.svg", "400.svg", "400", "雪か雨", "SNOWORRAIN"],
    350: ["300.svg", "300.svg", "300", "雨で雷を伴う", "RAIN AND THUNDER"],
    361: ["411.svg", "811.svg", "400", "雪か雨後晴", "SNOW OR RAIN, CLEAR LATER"],
    371: ["413.svg", "413.svg", "400", "雪か雨後曇", "SNOW OR RAIN, CLOUDY LATER"],
    400: ["400.svg", "400.svg", "400", "雪", "SNOW"],
    401: ["401.svg", "801.svg", "400", "雪時々晴", "SNOW, FREQUENT CLEAR"],
    402: ["402.svg", "402.svg", "400", "雪時々止む", "SNOWTHROUGHOUT THE DAY"],
    403: ["403.svg", "403.svg", "400", "雪時々雨", "SNOW,FREQUENT SCCATERED SHOWERS"],
    405: ["400.svg", "400.svg", "400", "大雪", "HEAVYSNOW"],
    406: ["406.svg", "406.svg", "400", "風雪強い", "SNOWSTORM"],
    407: ["406.svg", "406.svg", "400", "暴風雪", "HEAVYSNOWSTORM"],
    409: ["403.svg", "403.svg", "400", "雪一時雨", "SNOW, OCCASIONAL SCCATERED SHOWERS"],
    411: ["411.svg", "811.svg", "400", "雪後晴", "SNOW,CLEAR LATER"],
    413: ["413.svg", "413.svg", "400", "雪後曇", "SNOW,CLOUDY LATER"],
    414: ["414.svg", "414.svg", "400", "雪後雨", "SNOW,RAIN LATER"],
    420: ["411.svg", "811.svg", "400", "朝の内雪後晴", "SNOW IN THE MORNING, CLEAR LATER"],
    421: ["413.svg", "413.svg", "400", "朝の内雪後曇", "SNOW IN THE MORNING, CLOUDY LATER"],
    422: ["414.svg", "414.svg", "400", "雪昼頃から雨", "SNOW, RAIN IN THE AFTERNOON"],
    423: ["414.svg", "414.svg", "400", "雪夕方から雨", "SNOW, RAIN IN THE EVENING"],
    425: ["400.svg", "400.svg", "400", "雪一時強く降る", "SNOW, EXPECT OCCASIONAL HEAVY SNOWFALL"],
    426: ["400.svg", "400.svg", "400", "雪後みぞれ", "SNOW, SLEET LATER"],
    427: ["400.svg", "400.svg", "400", "雪一時みぞれ", "SNOW, OCCASIONAL SLEET"],
    450: ["400.svg", "400.svg", "400", "雪で雷を伴う", "SNOW AND THUNDER"]
  },
  AREA_FUKEN: [{
    center: "016000",
    offices: ["016000", "011000", "013000", "014030", "014100", "015000", "012000", "017000"]
  }, {
    center: "040000",
    offices: ["040000", "060000", "070000", "020000", "050000", "030000"]
  }, {
    center: "130000",
    offices: ["130000", "120000", "140000", "190000", "090000", "100000", "110000", "080000", "200000"]
  }, {
    center: "150000",
    offices: ["150000", "170000", "180000", "160000"]
  }, {
    center: "230000",
    offices: ["230000", "240000", "220000", "210000"]
  }, {
    center: "270000",
    offices: ["270000", "300000", "260000", "250000", "280000", "290000"]
  }, {
    center: "340000",
    offices: ["340000", "310000", "330000", "320000"]
  }, {
    center: "370000",
    offices: ["370000", "380000", "360000", "390000"]
  }, {
    center: "400000",
    offices: ["400000", "440000", "410000", "430000", "420000", "350000"]
  }, {
    center: "460100",
    offices: ["460100", "450000", "460040"]
  }, {
    center: "471000",
    offices: ["471000", "473000", "474000", "472000"]
  }],
  WEEK_AREAS: {
    "011000": "Soya Region",
    "012000": "Kamikawa Rumoi Region",
    "013000": "Abashiri Kitami Mombetsu Region",
    "014000": "Kushiro Nemuro Tokachi Region",
    "014030": "Tokachi Region",
    "014100": "Kushiro Nemuro Region",
    "015000": "Iburi Hidaka Region",
    "016000": "Ishikari Sorachi Shiribeshi Region",
    "017000": "Oshima Hiyama Region",
    "020000": "Aomori Prefecture",
    "020010": "Tsugaru",
    "020030": "Sanpachi Kamikita",
    "020100": "Tsugaru Shimokita",
    "020200": "Shimokita Sanpachi Kamikita",
    "030000": "Iwate Prefecture",
    "030010": "Inland",
    "030100": "Coast",
    "040000": "Miyagi Prefecture",
    "040010": "Eastern Region",
    "040020": "Western Region",
    "050000": "Akita Prefecture",
    "060000": "Yamagata Prefecture",
    "070000": "Fukushima Prefecture",
    "070030": "Aizu",
    "070100": "Nakadori Hamadori",
    "080000": "Ibaraki Prefecture",
    "090000": "Tochigi Prefecture",
    1e5: "Gunma Prefecture",
    100010: "Southern Region",
    100020: "Northern Region",
    11e4: "Saitama Prefecture",
    12e4: "Chiba Prefecture",
    130010: "Tokyo Region",
    130020: "Northern Izu Islands",
    130030: "Southern Izu Islands",
    130040: "Ogasawara Islands",
    130100: "Izu Islands",
    14e4: "Kanagawa Prefecture",
    15e4: "Niigata Prefecture",
    16e4: "Toyama Prefecture",
    17e4: "Ishikawa Prefecture",
    18e4: "Fukui Prefecture",
    19e4: "Yamanashi Prefecture",
    2e5: "Nagano Prefecture",
    200010: "Northern Region",
    200100: "Central Region Southern Region",
    21e4: "Gifu Prefecture",
    210010: "Mino Region",
    210020: "Hida Region",
    22e4: "Shizuoka Prefecture",
    23e4: "Aichi Prefecture",
    24e4: "Mie Prefecture",
    25e4: "Shiga Prefecture",
    250010: "Southern Region",
    250020: "Northern Region",
    26e4: "Kyoto Prefecture",
    260010: "Southern Region",
    260020: "Northern Region",
    27e4: "Osaka Prefecture",
    28e4: "Hyogo Prefecture",
    280010: "Southern Region",
    280020: "Northern Region",
    29e4: "Nara Prefecture",
    3e5: "Wakayama Prefecture",
    31e4: "Tottori Prefecture",
    32e4: "Shimane Prefecture",
    33e4: "Okayama Prefecture",
    330010: "Southern Region",
    330020: "Northern Region",
    34e4: "Hiroshima Prefecture",
    340010: "Southern Region",
    340020: "Northern Region",
    35e4: "Yamaguchi Prefecture",
    36e4: "Tokushima Prefecture",
    37e4: "Kagawa Prefecture",
    38e4: "Ehime Prefecture",
    39e4: "Kochi Prefecture",
    4e5: "Fukuoka Prefecture",
    41e4: "Saga Prefecture",
    42e4: "Nagasaki Prefecture",
    420030: "Iki Tsushima",
    420100: "Southern Region<br>Northern Region<br>Goto",
    43e4: "Kumamoto Prefecture",
    44e4: "Oita Prefecture",
    45e4: "Miyazaki Prefecture",
    460040: "Amami Region",
    460100: "Kagoshima Prefecture",
    471e3: "Okinawa Main Island Region",
    472e3: "Daitojima Region",
    473e3: "Miyakojima Region",
    474e3: "Yaeyama Region"
  }
};
const TyphoonTranslate = {
  "現在台風情報は発表されていません": "Currently, there is no tropical cyclone of Tropical Storm(TS) intensity or higher",
  "現在暴風域に入る確率は発表していません": "Currently, there is no 50kt Wind Probability.",
  "日時表示": "Date time",
  "中心線": "Lines that link centers of forecast circles",
  "進路予想図": "Track and Intensity Forecast",
  "諸元表": "specifications",
  "台風経路図": "Typhoon route",
  "全ての台風": "All Tropical Cyclones",
  "暴風域に入る確率": "50kt Wind Probability",
  "全般台風情報": "Analysis Archive",
  "大型": "Large",
  "超大型": "Very large",
  "熱帯低気圧": "Tropical Cyclone",
  "実況": "Analisys",
  "予報": "Forecast",
  "種別": "Category",
  "大きさ": "Scale",
  "強さ": "Intensity",
  "存在地域": "location",
  "１時間後の推定値": "Estimate for 1 hour ahead",
  "強い": "Strong",
  "非常に強い": "Very Strong",
  "猛烈な": "Violent",
  "移動速度": "Speed of movement",
  "中心気圧": "Central pressure",
  "ゆっくり": "Slowly",
  "ほとんど停滞": "Almost Stationary",
  "予報円": "Probability circle",
  "最大風速": "Maximum wind speed",
  "最大瞬間風速": "Maximum wind gust speed",
  "中心付近": "Near center",
  "中心位置": "Center Position",
  "予報円の中心": "Center of probability circle",
  "予報円の半径": "Radius of probability circle",
  "暴風域": "Area of 50kt winds or more",
  "強風域": "Area of 30kt winds or more",
  "暴風警戒域": "Storm warning area",
  "風速": "Wind speed",
  "風速50ノット以上": "50kt winds or more",
  "風速25メートル以上": "25m/s winds or more",
  "温帯低気圧": "Extratropical cyclone",
  "25m/s以上の暴風域": "50-kt wind area",
  "15m/s以上の強風域": "30-kt wind area",
  "進行方向と速さ": "Direction and speed of movement",
  "方位": "Direction",
  "北北東": "NNE",
  "北東": "NE",
  "東北東": "ENE",
  "東": "E",
  "東南東": "ESE",
  "南東": "SE",
  "南南東": "SSE",
  "南": "S",
  "南南西": "SSW",
  "南西": "SW",
  "西南西": "WSW",
  "西": "W",
  "西北西": "WNW",
  "北西": "NW",
  "北北西": "NNW",
  "北": "N",
  "全域": "WIDE"
};
//var shindo_name = ["石狩地方北部","石狩地方中部","石狩地方南部","後志地方北部","後志東部","後志西部","空知地方北部","空知中部","空知南部","渡島北部","渡島東部","渡島西部","檜山地方","北海道奥尻島","胆振西部","胆振中東部","日高西部","日高中部","日高東部","上川地方北部","上川地方中部","上川地方南部","留萌地方中北部","留萌地方南部","北海道利尻礼文","網走地方","北見地方","紋別地方","十勝北部","十勝中部","十勝南部","釧路北部","釧路中南部","根室地方北部","根室地方中部","根室地方南部","青森県津軽北部","青森県津軽南部","青森三八上北","青森県下北","岩手沿岸北部","岩手沿岸南部","岩手内陸北部","岩手内陸南部","宮城北部","宮城中部","宮城南部","秋田沿岸北部","秋田沿岸南部","秋田内陸北部","秋田内陸南部","山形庄内地方","山形最上地方","山形村山地方","山形置賜地方","福島中通り","福島浜通り","会津","茨城北部","茨城南部","栃木北部","栃木南部","群馬北部","群馬南部","埼玉北部","埼玉南部","秩父地方","千葉北東部","千葉北西部","千葉南部","東京２３区","東京多摩東部","東京多摩西部","伊豆大島","新島地方","神津島","三宅島","八丈島","小笠原","神奈川東部","神奈川西部","新潟県上越","新潟中越地方","新潟下越地方","新潟県佐渡","富山県東部","富山県西部","石川県能登","加賀地方","福井嶺北地方","福井嶺南地方","山梨東部・富士五湖","山梨中・西部","長野北部","長野中部","長野南部","飛騨地方","美濃東部","美濃中西部","伊豆地方","静岡東部","静岡中部","静岡西部","愛知東部","愛知西部","三重北部","三重中部","三重南部","滋賀北部","滋賀南部","京都北部","京都南部","大阪北部","大阪南部","兵庫北部","兵庫南東部","兵庫南西部","淡路島","奈良県","和歌山県北部","和歌山県南部","鳥取東部","鳥取中部","鳥取西部","島根東部","島根西部","隠岐","岡山北部","岡山南部","広島北部","広島南東部","広島南西部","山口北部","山口東部","山口中部","山口西部","徳島県北部","徳島県南部","香川東部","香川西部","愛媛東予地方","愛媛県中予","愛媛県南予","高知東部","高知中部","高知西部","福岡地方","北九州地方","筑豊地方","筑後地方","佐賀北部","佐賀南部","長崎北部","長崎南西部","島原半島","長崎県対馬","長崎県壱岐","長崎県五島","阿蘇地方","熊本地方","球磨地方","天草・芦北","大分北部","大分中部","大分南部","大分西部","宮崎北部平野部","宮崎北部山沿い","宮崎南部平野部","宮崎南部山沿い","薩摩地方","大隅地方","鹿児島県十島村","甑島","鹿児島県種子島","鹿児島県屋久島","鹿児島県奄美北部","鹿児島県奄美南部","沖縄県本島北部","沖縄県本島中南部","沖縄県久米島","沖縄県大東島","沖縄県宮古島","沖縄県石垣島","沖縄県与那国島","沖縄県西表島"]
var setParam = '';
var msi = -1; //「+1」の部分は、震度に「5弱以上と推定」を追加した部分。
var si = msi;

// constant of Shindo names
const siList = ["","1","2","3","4","5弱以上","5弱","5強","6弱","6強","7"];
const nhkSiList = ["","1","2","3","4","?","5-","5+","6-","6+","7"]

// variables of weather information
var siHnum,
    siHstr,
    speed = 3.9,
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
    Dmode = [1,2,4,5,6],
    Dcnt = 5,
    Nnum = 0,
    lst = 0,
    lastPre = "";
// earthquake variables
var seismic_intensity = siList[msi],
    magnitude = "",
    epicenter = "",
    depth = "",
    timeYY = "",
    timeMM = "",
    timeDD = "",
    timeH = "",
    timeM = "",
    lastTimestamp = "",
    nowTimestamp = "",
    startTime = 0,
    epicenter_id = 0;
var earthquake_url = [],
    earthquake_area = [],
    earthquake_area_CityPrefecture = [],
    earthquake_intensity = '',
    earthquake_epicenter = '',
    earthquake_magnitude = '',
    earthquake_depth = '',
    earthquake_time = '',
    earthquake_intensity_list = [],
    i_earthquake_intensity = '',
    city = [],
    allcitydata = [],
    allcity = [],
    allprefecture = [],
    allcitykana = [],
    earthquakes_log = {};
// variables of Earthquake Early Warning
var eewEpicenter = '',
    eewOriginTime = undefined,
    eewCalcintensity = '',
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
    eewAboutHypocenter = "",
    eewClassCode = null;
// int
var i = 0,
    i2 = 0;
// breaking news
var BNtitle = [],
    BNtext1 = [],
    BNtext2 = [];
// tsunami information
var nowTsunamiID,
    cancelled,
    created_at,
    issue_time,
    tGrade,
    tImmediate,
    tName,
    lastTsunamiID,
    updateFlg = false,
    tPage = 0;
var EEWsendingAllowed = false;
var recording = false;
var lastGet = {
  iedred7584EEW: "---",
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
  wniliveTimeTable: "---",
  tepcoTeiden: "---"
};

// initialize Background Music
var backMsc = [];

var images = {
  eew: {
    fc: new Image(),
    pub: new Image(),
    cancel: new Image()
  },
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
    ]
  }
};
var qr_img = new Image();
qr_img.src = "../img/sorabtn.png";
images.eew.fc.src = "../img/eew1234.png";
images.eew.pub.src = "../img/eew567.png";
images.eew.cancel.src = "../img/eewCancelled.png";
for (let i=0; i<3; i++) {
  for (let j=0; j<3; j++) images.quake.title[i][j].src = "../img/theme"+i+"quakeTop"+j+".png";
}

// main variables
var soraopen_moving = 1081;
var soraopen_move = null;//
var intervalArray = new Array();
var soraopen_color = 0;
var soraopen_intervaltime = 0;//
var intervalTime = 0;
var intervalTime1 = 0;
var soraopen_interval1 = null;//
var earthquake_telop_times = 0;
var earthquake_telop_remaining = 1500;
var t=0;
var cnv_anim1 = new Variable_Animation(440, "sliding", []);
var anim_soraview = new Variable_Animation(250, "sliding_3", [1081, 1]);
var anim_soraview_color = new Variable_Animation(250, "Normal", [0, 255]);
var anim_soraopen = new Variable_Animation(2100, "sliding", [0, 210]);
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
}

function confirmSendingEEWdatasAutomatically(){
  return EEWsendingAllowed = confirm("品質向上のため緊急地震速報の受信データを製作者に送信することができます。送信するデータの内容は、使用中のバージョン・受信日時・受信内容の3つです。許可する場合は「OK」、許可しない場合は「キャンセル」を押してください。");
}

// chrome storage
chrome.storage.sync.get(['mode0', 'mode3', 'settings', 'app'], function(c){
  let isSaving = false;
  // Release note: 必ず追加すること
  if(!c.app){
    isSaving = true;
  } else {
    if(c.app.lastVer !== _appVersion) isSaving = true;
    if(_ContentVersions.indexOf(c.app.lastVer) < 3){
      // β0.1.2以前
      if(c.settings.volume.eewH == 100){
        alert("（ "+c.app.lastVer+" からのバージョンアップを検知しました）\n緊急地震速報(警報)時の音量を再確認し、必ず保存してください。");
      }
    }
    if(_ContentVersions.indexOf(c.app.lastVer) < 7 || c.app.newUser || !c.settings.sendEEW){
      // β0.1.6以前 または 初回起動時
      isSaving = true;
      confirmSendingEEWdatasAutomatically();
    } else {
      EEWsendingAllowed = c.settings.sendEEW;
    }
  }
  document.getElementById("sendingEEWdatasAutomaticallyAllowed").innerText = EEWsendingAllowed ? "有効" : "無効";

  if(c.app.newUser) isSaving = true;
  console.log(c);
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
  document.getElementById('volEEWl').value = c.settings.volume.eewL;
  document.getElementById('volEEWh').value = c.settings.volume.eewH;
  document.getElementById('volGL').value = c.settings.volume.gl;
  document.getElementById('volNtc').value = c.settings.volume.ntc;
  document.getElementById('volSpW').value = c.settings.volume.spW;
  document.getElementById('volTnm').value = c.settings.volume.tnm;
  if(isSaving) savedata();
  audioAPI.gainNode.gain.value = c.settings.volume.eewH / 100;
  isSoraview = c.settings.soraview;
});
function savedata(){
  var data = {
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
        nhkQuake: document.getElementById("setIntervalNHKquake").valueAsNumber,
        jmaDevFeed: document.getElementById("setIntervalJmaWt").valueAsNumber,
        tenkiJPtsunami: document.getElementById("setIntervalTenkiJpTsu").valueAsNumber,
        wniMScale: document.getElementById("setIntervalWNImscale").valueAsNumber,
        wniSorabtn: document.getElementById("setIntervalWNIsorabtn").valueAsNumber,
        wniRiver: document.getElementById("setIntervalWNIriver").valueAsNumber,
        wniliveTimeTable: document.getElementById("setIntervalWNItm").valueAsNumber,
        tepcoTeiden: document.getElementById("setIntervalTpcBlackOut").valueAsNumber
      },
      volume: {
        eewL: document.getElementById("volEEWl").valueAsNumber,
        eewH: document.getElementById("volEEWh").valueAsNumber,
        gl: document.getElementById("volGL").valueAsNumber,
        ntc: document.getElementById("volNtc").valueAsNumber,
        spW: document.getElementById("volSpW").valueAsNumber,
        tnm: document.getElementById("volTnm").valueAsNumber
      },
      sendEEW: EEWsendingAllowed,
      style: 0
    },
    app:{
      lastVer: _appVersion,
      newUser: false
    }
  }
  chrome.storage.sync.set(data, function(){/* console.log("Data recorded.", data)*/});
}
// var saveinttime = setInterval(savedata, 60000);

// onload
document.addEventListener("DOMContentLoaded", function(){
  document.getElementsByName("goMessage")[0].addEventListener('click', function(){
    goMessage();
    mode = 0;
    tx = 1200;
    language = "Ja";
    timeCount = 217;
  });
  document.getElementsByName("skipMessage")[0].addEventListener('click', function(){tx = -9007199254740000;});
  document.getElementsByName("tmpSH-btn")[0].addEventListener('click', function(){$('.tmp-box').toggle();});
  document.getElementsByName("tmp-btn")[0].addEventListener('click', function(){tempRef(1);});
  document.getElementsByName("tmp-btn")[1].addEventListener('click', function(){tempRef(2);});
  document.getElementsByName("tmp-btn")[2].addEventListener('click', function(){tempRef(3);});
  document.getElementsByName("tmp-btn")[3].addEventListener('click', function(){tempRef(4);});
  document.getElementsByName("tmp-btn")[4].addEventListener('click', function(){tempRef(5);});
  document.getElementsByName("tmp-btn")[5].addEventListener('click', function(){tempRef(6);});
  document.getElementsByName("tmp-btn")[6].addEventListener('click', function(){tempRef(7);});
  document.getElementsByName("tmp-btn")[7].addEventListener('click', function(){tempRef(8);});
  document.getElementsByName("tmp-btn")[8].addEventListener('click', function(){tempRef(9);});
  document.getElementsByName("speedChanger")[0].addEventListener('input', function(){document.getElementById("speedResult").value = document.getElementById("speedVal").value; speed = document.getElementById("speedVal").value;});
  document.getElementById("volumeChanger").addEventListener( 'input', function(){document.getElementById("videovolume").value = document.getElementById("videovolrange").value; document.getElementById('v').volume = document.getElementById("videovolrange").value});
  document.getElementById("ref").addEventListener('click', function(){reflect(1)});
  document.getElementsByName("BreakingNewsView")[0].addEventListener('click', function(){BNref()});
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
    eewGetURL = "https://api.iedred7584.com/eew/Samples/Normal.json";
  });
  document.getElementById("startEEWwarnTest").addEventListener('click', function(){
    testNow = true;
    eewGetURL = "https://api.iedred7584.com/eew/Samples/Warn.json";
  });
  document.getElementById("startEEWcancelTest").addEventListener('click', function(){
    testNow = true;
    eewGetURL = "https://api.iedred7584.com/eew/Samples/Cancel.json";
  });
  document.getElementById("stopEEWtest").addEventListener('click', function(){
    testNow = false;
    eewGetURL = "https://api.iedred7584.com/eew/json/";
  });
  background_send("ZoomInformation["+Math.round(window.outerWidth/window.innerWidth*100)/100+"]");
  document.getElementById("ChangeToEq").addEventListener('click', function(){mode = 2; tx = 1200; language = "Ja"; timeCount = 217;});
  document.getElementById("dataSaver").addEventListener('click', function(){savedata()});
  document.getElementById("unitsReflect").addEventListener('click', function(){rain_windData(1)});
  document.getElementById("setSendingEEWdatasAutomatically").addEventListener('click', function(){confirmSendingEEWdatasAutomatically()});
  document.getElementsByName("themeColors")[0].addEventListener('change', function(){colorThemeMode = Number(document.getElementsByName("themeColors")[0].value)});
  document.getElementById('setIntervalIedred').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});
  document.getElementById('setIntervalNHKquake').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});
  document.getElementById('setIntervalJmaWt').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});
  document.getElementById('setIntervalTenkiJpTsu').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});
  document.getElementById('setIntervalWNImscale').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});
  document.getElementById('setIntervalWNIsorabtn').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});
  document.getElementById('setIntervalWNIriver').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});
  document.getElementById('setIntervalWNItm').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});
  document.getElementById('setIntervalTpcBlackOut').addEventListener("input", function(){let tg = event.target;if(Number(tg.min) > tg.valueAsNumber && tg.min){tg.value = tg.min;}if(Number(tg.max) < tg.valueAsNumber && tg.max){tg.value = tg.max;}});

  document.getElementById('volEEWh').addEventListener("input", function(){audioAPI.gainNode.gain.value = event.target.valueAsNumber/100;});
  document.getElementById('voltestEEWl').addEventListener("click", function(){play(sounds.eew[["first","continue","last"][Math.floor(Math.random()*3)]], document.getElementById('volEEWl').valueAsNumber/100)});
  document.getElementById('voltestEEWh').addEventListener("click", function(){audioAPI.fun.startOscillator();audioAPI.fun.stopOscillator(3);});
  document.getElementById('voltestGL').addEventListener("click", function(){play(sounds.warning.GroundLoosening, document.getElementById('volGL').valueAsNumber/100)});
  document.getElementById('voltestNtc').addEventListener("click", function(){play(sounds.warning.Notice, document.getElementById('volNtc').valueAsNumber/100)});
  document.getElementById('voltestSpW').addEventListener("click", function(){play(sounds.warning.Emergency, document.getElementById('volSpW').valueAsNumber/100)});
  document.getElementById('voltestTnm').addEventListener("click", function(){play(sounds.tsunami[["Watch","Warning","Notice","Majorwarning"][Math.floor(Math.random()*4)]], document.getElementById('volTnm').valueAsNumber/100)});

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
  // document.getElementById('exportQuakes').addEventListener("click", function(){
  //   let blob = new Blob([JSON.stringify(earthquakes_log)], {type: "application/json"});
  //   let url = URL.createObjectURL(blob);
  //   let link = document.createElement("a");
  //   link.href = url;
  //   link.download = "quake_logs.json";
  //   link.click();
  //   URL.revokeObjectURL(url);
  // });

  $('.BGMinput').on('change', function(e){
      if(e.target.files.length){
        backMsc = [];
        let text = "";
        for(let i=0; i<e.target.files.length; i++){
          text += `<div class="rel a">
<div class="abs b">
<div class="background">
<div class="abs bg"style="background-color:#0000008c;"></div>
<div class="abs bg"style="background-color:#fff2;"></div>
</div>
</div>
<div style="width:72px;">
<button class="abs c musicpause musichide"data-index="${i}"style="left:45px;">
<svg viewBox="0 0 16 16"data-index="${i}"><path d="M0,0 L0,16 L5.5,16 L5.5,0 M10.5,0 L10.5,16 L16,16 L16,0" fill="white"data-index="${i}"></path></svg>
</button>
<button class="abs c musicstart musicactive"data-index="${i}"style="left:45px;">
<svg viewBox="0 0 16 16"data-index="${i}"><path d="M0,0 L0,16 L16,8" fill="white"data-index="${i}"></path></svg>
</button>
</div>
<div class="abs d">
<div class="musicCurrentTime abs e"role="text">--:--</div>
<div class="musicDurationOrLeft abs"data-type="duration"role="text">--:--</div>
<div class="rel f">
<div class="abs g">
<div class="musicLoaded abs i j"style="left:0;width:100%;"></div>
<div class="musicPlayed abs i k"style="left:0;width:21.5px;"></div>
<div class="musicNoLoad abs i l"style="right:0%;left:21.5px;"></div>
<div class="abs h"></div>
</div>
<input class="musicrange m"data-index="${i}"type="range"min="0"max="1"step="0.001">
</div>
</div>
<div class="musicButtomContainer rel">
<div class="abs">
<div class="musicRepeat">
<input class="abs BGMrepeatingStart"min="0"data-index="${i}"type="number">
<text class="abs n">秒〜</text>
<input class="abs BGMrepeatingStop"data-index="${i}"type="number">
<text class="abs o">秒を</text>
<select class="abs BGMrepeats"data-index="${i}">
<option value=0>何もない</option>
<option value=1>繰り返す</option>
</select>
</div>
<input class="abs musicVol"data-index="${i}"type="range"min="0"max="200"step="1"value="100">
<text class="abs BGMvolOutput">100%</text>
</div>
</div>
<div class="abs musicInfos"style="top:0;left:585px;">
<text>ファイル名：</text><br>
<text class="musicFileName"></text></div>
</div>`;
        }
        document.getElementById("audiolist").innerHTML = text;
      }
      for(let i=0; i<e.target.files.length; i++){
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
            backMsc[index].bufferSource.buffer = buffer;
            backMsc[index].bufferSource.playbackRate.value = 1;
            backMsc[index].bufferSource.connect(backMsc[index].gainNode).connect(backMsc[index].context.destination);
            backMsc[index].startedAt = 0;
            backMsc[index].pausedAt = 0;
            backMsc[index].lastUpdate = 0;
            backMsc[index].playing = false;
            backMsc[index].play = function(start = 0){
              this.bufferSource.start(0, this.pausedAt);
              this.startedAt = this.context.currentTime - this.pausedAt - start;
              this.pausedAt = 0;
              this.playing = true;
              if(this.onStateChange)this.onStateChange(true, this.context.mIndex);
            };
            backMsc[index].bufferEnd = function(){
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
              if(parent.onStateChange)parent.onStateChange(false, musicIndex);
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
            document.querySelectorAll(".musicstart")[index].addEventListener("click", function(){
              let index = Number(event.target.getAttribute("data-index"));
              console.log(event, index);
              backMsc[index].play();
            });
            document.querySelectorAll(".musicpause")[index].addEventListener("click", function(){
              let index = Number(event.target.getAttribute("data-index"));
              backMsc[index].bufferSource.stop();
            });
            document.querySelectorAll(".BGMrepeats")[index].addEventListener("change", function(){
              let index = Number(event.target.getAttribute("data-index"));
              backMsc[index].bufferSource.loop = event.target.value == "1";
            });
            document.querySelectorAll(".BGMrepeatingStart")[index].addEventListener("change", function(){
              let index = Number(event.target.getAttribute("data-index"));
              backMsc[index].bufferSource.loopStart = event.target.valueAsNumber;
            });
            document.querySelectorAll(".BGMrepeatingStop")[index].addEventListener("change", function(){
              let index = Number(event.target.getAttribute("data-index"));
              backMsc[index].bufferSource.loopEnd = event.target.valueAsNumber;
            });
            document.querySelectorAll(".musicVol")[index].addEventListener("input", function(){
              let index = Number(event.target.getAttribute("data-index"));
              backMsc[index].gainNode.gain.value = event.target.value / 100;
              document.querySelectorAll(".BGMvolOutput")[index].textContent = event.target.value + "%";
            });
            document.querySelectorAll(".musicLoaded")[index].addEventListener("input", function(){
              let index = Number(event.target.getAttribute("data-index"));
              backMsc[index].gainNode.gain.value = event.target.value;
              document.querySelectorAll(".BGMvolOutput")[index].textContent = backMsc[index].gainNode.gain.value;
            });
          });
        });
        reader.readAsArrayBuffer(e.target.files[i]);
      }
  });
  document.getElementsByName("recordingstart")[0].addEventListener('click', function(){recorder.start()});
  document.getElementsByName("recordingstop")[0].addEventListener('click', function(){recorder.stop()});
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
  var endt = "";
  array.forEach(function(int){
      if(int.indexOf("m)") != -1)endt += int + "　　　";
  });
  if(endt == ""){
    endt = "現在、警戒が必要な河川はありません。";
  }
  return endt;
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
history.pushState(null, null, '');
if(getParam('speed') != null)speed = Number(getParam('speed')),document.getElementById('speedform').innerHTML = '<form oninput="result.value=b.value; speed=b.value;"><text class="speed-tx">Speed:</text><input type="range" name="b" value="' + speed + '" min="0.5" max="15" step="0.1" style="width:700px" /><output name="result">' + speed + '</output></form>';

//document.getElementById('navigator').innerHTML = 'navigator.language = '+navigator.language+'<br>navigator.playform = '+navigator.platform+'<br>navigator.product = '+navigator.product+'<br>navigator.productSub = '+navigator.productSub+'<br>navigator.vendor = '+navigator.vendor+'<br>navigator.userAgent = '+navigator.userAgent;

// position list
$(function(){
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
    })
});

if(magnitude!="--"){
  Text[0] = timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。　震源は"+epicenter+"、地震の規模を示すマグニチュードは"+magnitude;
  if(depth == "ごく浅い"){
    Text[0] += "、震源は"+depth+"です。";
  } else {
    Text[0] += "、震源の深さは"+depth+"kmです。";
  }
} else {
  Text[0] = "<<震度速報>> "+timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 "+multilingual[0][63]+"　　　　　　　The earthquake has occurred at "+timeH+":"+timeM+".  This earthquake resulted in "+nhkSiList[msi]+" of the maximum seismic intensity recorded.  "+multilingual[1][63];
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
context.fillText("Please wait for preparing...", 0, 100);

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
          lastTsunamiID = data[0]['id'];
          cancelled = data[0]['cancelled'];
        }
    });
});

$.getJSON("https://script.google.com/macros/s/AKfycbyiKW-RWvZyeQC59RvDpBidR151sohEnzwESP2UewGk0BgDhcwh1M2Jw52chC8NJh-Y/exec?type=updChk&usVer="+_appVersion).done(function(json){
  let verlist = [];
  for(let ver of json.beta.list) {
    verlist.push(ver.name);
  }
  let current = verlist.indexOf(_appVersion);
  if(current > 0){
    chrome.windows.create({
      url: "updateNotice.html?txt="+encodeURIComponent(json.beta.list[0].string)+"&app="+encodeURIComponent(_appVersion)+"&new="+encodeURIComponent(json.beta.list[0].name)+"&url="+encodeURIComponent(json.beta.list[0].jumpto),
      type: "popup",
      height: 300,
      width: 400
    });
  }
  if(current !== -1 && json.stopcode[json.beta.list[current].stopcode]){
    alert(json.stopcode[json.beta.list[current].stopcode]);
    background_send("mainclose");
  }
});

function goMessage(){
  document.getElementsByClassName("Ntext")[Nnum].style.background = "white";
  Nnum = 0;
  document.getElementsByClassName("Ntext")[0].style.background = "yellow";
  tx = 1200;
  mode = 0;
  if(cancelled) DText[5] = document.getElementById('title1').value;
  DText[6] = document.getElementById('title2').value;
  DText[7] = document.getElementById('title3').value;
  DText[8] = document.getElementById('title4').value;
  DText[9] = document.getElementById('title5').value;
  if(cancelled) DText[0] = document.getElementById('message1').value;
  DText[1] = document.getElementById('message2').value;
  DText[2] = document.getElementById('message3').value;
  DText[3] = document.getElementById('message4').value;
  DText[4] = document.getElementById('message5').value;
  Dcnt = 0;
  for (var i = 0; i < 5; i++) {
    if(DText[i] !== ""){
      Dcnt += 1;
    }
  }
  for (var i = 0; i < 5; i++) {
    Dmode[i] = 0;
    if(DText[i] == "<weather/temperature/high>")Dmode[i] = 1;
    if(DText[i] == "<weather/temperature/low>")Dmode[i] = 2;
    if(DText[i] == "<weather/river>")Dmode[i] = 3;
    if(DText[i] == "<weather/rain/1h>")Dmode[i] = 4;
    if(DText[i] == "<weather/rain/24h>")Dmode[i] = 5;
    if(DText[i] == "<weather/wind>")Dmode[i] = 6;
    if(DText[i] == "<weather/temperature/all>")Dmode = 9;
    if(DText[i] == "<weathernews/live/timetable>")Dmode[i] = 11;
    if(DText[i] == "<tsunami>")Dmode[i] = 20;
    if(DText[i] == "<teiden>::東京電力")Dmode[i] = 30;
  }
  if(!Dcnt){
    Dcnt = 1;
  }
  if(breakingtime == -2){
    BNtitle.shift();
    BNtext1.shift();
    BNtext2.shift();
    breakingtime = 0;
  }
}

// change the title
function titleChange(){
  switch (mode) {
    case 0:
      document.title="Natural Disaster Viewer - 通常";
      break;
    case 1:
      document.title="Natural Disaster Viewer - 緊急地震速報";
      break;
    case 3:
      document.title="Natural Disaster Viewer - 気象警報";
      break;
    case 2:
      document.title="Natural Disaster Viewer - 地震情報";
      break;
  }
}

$(function(){
    $('.tab').hide();
    $('.tab').eq(0).show();
    $('.tab').eq(0).addClass('is-active');
    $('.switch-button').each(function(){
        $(this).on('click', function(){
            var index = $('.switch-button').index(this);
            $('.shitch-button').removeClass('is-active');
            $(this).addClass('is-active');
            $('.tab').hide();
            $('.tab').eq(index).show(400);
            titleChange();
    })});
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
        document.getElementById("eiTitle").innerHTML = "[地震情報](" + timeYY + "/" + timeMM + "/" + timeDD + " " + timeH + ":" + timeM + "頃発生) 震源地:" + epicenter + " 最大震度:" + siList[msi] + " M" + magnitude + " 深さ:" + ((depth == "ごく浅い")?depth:"約"+depth+"km");
        document.getElementById("eiwind").innerHTML = "";
        if(msi==-1){
          document.getElementById("eiTitle").innerHTML = "まだ情報は入っていません。";
          document.getElementById("eiwind").innerHTML = "";
        } else {
          for(var i=10; i>0; i--){
            if(Text[i] != ""){
              document.getElementById("eiwind").innerHTML += "［震度" + toFull(siList[i]) + "］<br>　" + ( magnitude!='--' ? (Text[i].replace(/　 </g, '<br>　').slice(1)) : (Text[i].replace(/　 </g, '<br>　')) ).replace(/> /g, '：') + "<br>"
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
        if(cancelled === true){
          document.getElementById("tsunamiList").innerHTML = "津波の情報はまだ入っていません。<br>There is no information yet.";
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
    /*.each(function(){
        $(this).hide();
        $(this).on('click', function(){
            $('#menu .setMenu #smain .menu').hide();
            $(this).show();
        });
    });*//*
    $('.eiwind').funcResizeBox({
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
});
/*$(function(){
    $('.jQueryUI-resizable').resizable({
        minWidth: 400,
        maxWidth: 1000,
        ghost: true,
        handles: 'w',
        minHeight: 120,
        maxHeight: 120
    })
});*/

/*
canvas1.addEventListener('click', onClick, false);
function onClick(e){
  var x = e.clientX - canvas1.offsetLeft;
  var y = e.clientY - canvas1.offsetTop;

  var colorRED = ExRandom(0, 255).toString(16);
  var colorBLUE = ExRandom(0, 255).toString(16);
  var colorGREEN = ExRandom(0, 255).toString(16);
  var canvasColor = "#" + colorRED + colorBLUE + colorGREEN + '82';
  drawRect(x, y, 10, 10, canvasColor);
}
*/
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
  mode = 3;
  tx = 0;
  titleChange();
  breakingtime = -2;
}

var key = new Array(230);
for(var fn = 0; fn < 230; fn++){
  key[fn] = false;
}
var keyWord = "";
var quake = {reportId:"",year:"",month:"",date:"",hour:"",minute:"",second:"",longitude:"",latitude:"",depth:"",magnitude:"",isAlert:false,epicenter:""};
document.onkeydown = keydown;
document.onkeyup = keyup;
var keyList = ["",/*0*/"",/*1*/"",/*2*/"",/*3*/"",/*4*/"",/*5*/"",/*6*/"",/*7*/"",/*8:backspace*/"",/*9*/"",/*10*/"","","","",""," ","","","","",/*20*/"","","","","","","","","","",/*30*/""," ","","","","","","","","",/*40*/"","","","","","delete","","0","1","2",/*50*/"3","4","5","6","7","8","9",":",";","",/*60*/"","","","","a","b","c","d","e","f",/*70*/"g","h","i","j","k","l","m","n","o","p",/*80*/"q","r","s","t","u","v","w","x","y","z",/*90*/"","","","","","0","1","2","3","4",/*100*/"5","6","7","8","9","*","+","-",".","/",/*110*/"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","^",",","",".","/","","","","","","","","","","","","","","","","","","","","","","","","","","","","[","","]","","",
];
var aieuo = 0;
var videoInterval;
function keydown(){
  key[event.keyCode] = true;
  keyWord += keyList[event.keyCode];
  if(event.keyCode == 13 && keyWord.length==38){
    quake.reportId = keyWord.slice(0, 2);
    quake.year = keyWord.slice(2, 6);
    quake.month = keyWord.slice(6, 8);
    quake.date = keyWord.slice(8, 10);
    quake.hour = keyWord.slice(10, 12);
    quake.minute = keyWord.slice(12, 14);
    quake.second = keyWord.slice(14, 16);
    quake.int = keyWord.slice(16, 18)=="10" ? "１" : keyWord.slice(16, 18)=="20" ? "２" : keyWord.slice(16, 18)=="30" ? "３" : keyWord.slice(16, 18)=="40" ? "４" : keyWord.slice(16, 18)=="50" ? "５弱" : keyWord.slice(16, 18)=="55" ? "５強" : keyWord.slice(16, 18)=="60" ? "６弱" : keyWord.slice(16, 18)=="65" ? "６強" : keyWord.slice(16, 18)=="70" ? "７" : "不明";
    quake.longitude = keyWord.slice(18, 23);
    quake.latitude = keyWord.slice(23, 27);
    quake.depth = keyWord.slice(27, 30);
    quake.magnitude = keyWord.slice(30, 34);
    quake.isAlert = (keyWord.slice(34, 35) == "1") ? true : false;
    quake.epicenter = epiList[0][epiCode.indexOf(Number(keyWord.slice(35, 38)))];
    keyWord = "";

    mode = 1;
    eewReportNumber = quake.reportId;
    eewCalcintensity = quake.int;
    eewDepth = Number(quake.depth)==0 ? "ごく浅い" : Number(quake.depth)+"km";
    eewMagnitude = Number(quake.magnitude).toString();
    eewEpicenter = quake.epicenter;
  }
  if(event.keyCode==13)keyWord = "";
  if(event.keyCode == 8 && keyWord != ""){
    keyWord = keyWord.slice(0,keyWord.length-1);
  }
  if(keyList[event.keyCode] === undefined){
    keyWord = keyWord.slice(0,keyWord.length-9);
    keyWord += event.keyCode;
  }
  document.getElementById('eew-input').innerHTML = keyWord;
}
function keyup(){
  key[event.keyCode] = false;
}

// main interval
// var timer = setInterval(main, 20);
function main(){
  //let gr; //canvas gradient color
  //背景(White)
  if(mode!=1)drawRect(0, 0, 1080, 128, colorScheme[colorThemeMode][5][0]);
  context.font = '40px HiraKakuProN-W3, JPAexGothic, ArialMT, YuGo-Medium, sans-serif';
  //context.font = '40px Arial, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
  //context.font = '40px "游ゴシック Medium","Yu Gothic Medium","游ゴシック体",YuGothic,sans-serif';
  //context.font = '40px "Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
  let performDrawStartAt = performance.now() * 1000;
  let TextWidth;
  switch (mode) {
    case 0:
      TextWidth = -(strWidth(DText[Nnum])) - 200;
      break;
    default:
      TextWidth = strWidth(Text[si]) * -1;
      break;
  }
  let nowDate = new Date();
  tx -= speed;
  if((timeCount%Math.floor(document.getElementById("setIntervalNHKquake").valueAsNumber/20)) == 1)downloadData();
  if((startTime%Math.floor(document.getElementById("setIntervalTenkiJpTsu").valueAsNumber/20)) == 1)loadTsunami();
  if((startTime%Math.floor(document.getElementById("setIntervalWNImscale").valueAsNumber/20)) == 1)loadMScale();
  if((startTime%Math.floor(document.getElementById("setIntervalWNIsorabtn").valueAsNumber/20)) == 1)sorabtn();
  if((startTime%Math.floor(document.getElementById("setIntervalWNIriver").valueAsNumber/20)) == 1)riverData();
  if((startTime%Math.floor(document.getElementById("setIntervalJMAfcst").valueAsNumber/20)) == 1)getJMAforecast();
  if(startTime==4 || ((getFormattedDate(1).minute%10)==0&&getFormattedDate(1).second==30&&t==0))rain_windData((startTime==4)||(getFormattedDate(1).minute==0)),t=1;
  if(getFormattedDate(1).second==50)t=0;
  if((startTime%Math.floor(document.getElementById("setIntervalJmaWt").valueAsNumber/20)) == 1)weatherInfo();
  if((startTime%Math.floor(document.getElementById("setIntervalWNItm").valueAsNumber/20)) == 1)timetable(); else aiueo = 0;
  if((startTime%Math.floor(200)) == 1)humanReadable();
  if((startTime%Math.floor(document.getElementById("setIntervalTpcBlackOut").valueAsNumber/20)) == 1)teideninfo();
  if((startTime%225) == 1){
    tPage++;
    if(tPage == tsunamiTexts.length) tPage = 0;
  }
  //if((startTime%50) == 1)jma_earthquake();
  //if((startTime%500) == 1){
    //if(document.getElementById("isNormalMes").checked)loadDText();
  //
  if((timeCount%Math.floor(document.getElementById("setIntervalIedred").valueAsNumber/20)) == 1){
    eewChecking();
  }//NIED:30
  timeCount += 1;
  startTime += 1;
  p2p_elapsedTime += 1;
  switch (Dmode[Nnum]) {
    case 1:
      DText[Nnum] = weather_mxtemsadextstr;
      DText[Nnum+5] = "最高気温(" + document.getElementsByName('unitTemp')[0].value + ")";
      break;
    case 2:
      DText[Nnum] = weather_mntemsadextstr;
      DText[Nnum+5] = "最低気温(" + document.getElementsByName('unitTemp')[0].value + ")";
      break;
    case 3:
      DText[Nnum] = arrayCombining(rivertext);
      DText[Nnum+5] = "河川情報";
      break;
    case 4:
      DText[Nnum] = weather1hourrainstr;
      DText[Nnum+5] = "時降水量(mm/h)";
      break;
    case 5:
      DText[Nnum] = weather24hoursrainstr;
      DText[Nnum+5] = "日降水量(mm/d)";
      break;
    case 6:
      DText[Nnum] = weatherMaximumWindSpeedstr;
      DText[Nnum+5] = "最大風速(" + document.getElementsByName('unitWinds')[0].value + ")";
      break;
    case 9:
      //DText[Nnum] = ;
      break;
    case 11:
      DText[Nnum] = timetableStr;
      DText[Nnum+5] = "ウェザーニュースLiVE番組表";
      break;
    case 30:
      DText[Nnum] = teidentext;
      DText[Nnum+5] = "東京電力 停電情報";
      break;
  }
  if((timeCount%275) == 0){
    if(language == "Ja"){
      language = "En";
    } else {
      language = "Ja";
    }
  }
  //CB to if((timeCount%))
  if(TextWidth > tx){
    tx = 1200;
    si--;
    document.getElementsByClassName("Ntext")[Nnum].style.background = "white";
    if(!document.getElementsByName("scrollfix")[Nnum].checked)Nnum++;
    if(Nnum == 5)Nnum = 0;
    for(var i=si; i>-1; i--)if(Text[i] != "")break;
    lst += 1;
    si = i;
    titleChange();
    document.getElementsByClassName("Ntext")[Nnum].style.background = "yellow";
  }
  if(si < 0){
    si = msi;
    if(mode == 2){
      earthquake_telop_times++;
      if(document.getElementsByName("recordingwheneewreceived")[0].checked && recording && magnitude!="--" && !isSokuho)recorder.stop();
    }
  }
  if(Nnum >= Dcnt)Nnum = 0;

//  console.log((TextWidth+150)+","+tx)
  switch (mode){
    case 0:
      context.fillStyle = colorScheme[colorThemeMode][5][1];
      context.fillText(DText[Nnum], tx, 110);
      break;
    case 2:
      //文字(Red)
      context.fillStyle = colorScheme[colorThemeMode][5][2];
      context.fillText(Text[si], tx, 110);
      break;
  }
  //背景(Blue)
  context.fillStyle = colorScheme[colorThemeMode][1][mscale];
  if(mode%3!=1)context.fillRect(0, 0, 1080, 60);

  let video = document.getElementById('v');
  switch (mode){
    case 0:
      context.font = "bold 28px 'Microsoft Sans Serif', JPAPGothic";
      switch (Dcnt){
        case 5:
          // context.fillStyle = (cancelled === false && Nnum == 1) ? "orange" : mscale==1 ? "#444" : "#FFF";
          context.fillStyle = mscale==1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
          context.fillText(DText[5 + (Nnum+4)%Dcnt], 895, 55, 185);
        case 4:
          // context.fillStyle = (cancelled === false && Nnum == 2) ? "orange" : mscale==1 ? "#444" : "#FFF";
          context.fillStyle = mscale==1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
          context.fillText(DText[5 + (Nnum+3)%Dcnt], 685, 55, 185);
        case 3:
          // context.fillStyle = (cancelled === false && Nnum == 3) ? "orange" : mscale==1 ? "#444" : "#FFF";
          context.fillStyle = mscale==1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
          context.fillText(DText[5 + (Nnum+2)%Dcnt], 475, 55, 185);
        case 2:
          // context.fillStyle = (cancelled === false && Nnum == 4) ? "orange" : mscale==1 ? "#444" : "#FFF";
          context.fillStyle = mscale==1 ? colorScheme[colorThemeMode][4][0] : colorScheme[colorThemeMode][4][1];
          context.fillText(DText[5 + (Nnum+1)%Dcnt], 265, 55, 185);
          break;
      }
      context.fillStyle = colorScheme[colorThemeMode][3][mscale];
      context.font = "bold 45px 'Microsoft Sans Serif', JPAPGothic";
      context.fillText(DText[5+Nnum], 10, 47, 250);

      //三角(内容 タイトル)
      context.fillStyle = "#d1d90099";
      context.beginPath();
      context.moveTo(0, 127);
      context.lineTo(30,  94);
      context.lineTo(0,  60);
      context.fill();
      context.strokeStyle = "#ffffff"
      context.beginPath();
      context.moveTo(0, 123);
      context.lineTo(26,  94);
      context.lineTo(0,  64);
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
      context.fillStyle = "#ff3d3d99";
      context.beginPath();
      context.moveTo(1080, 127);
      context.lineTo(1050,  94);
      context.lineTo(1080,  60);
      context.fill();
      context.strokeStyle = "#ffffff";
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

      if(p2p_elapsedTime < 1200){
        context.fillStyle = "#f00";
        context.moveTo(760, 0);
        context.lineTo(775, 48);
        context.lineTo(1279, 48);
        context.lineTo(1279, 0);
        context.fill();
        context.fillStyle = "#fff";
        context.font = 'bold 38px ArialMT,YuGo-Medium,"游ゴシック Medium","Yu Gothic Medium",sans-serif';
        context.fillText(datakey+"で地震発生の可能性", 780, 41, 290);
      }
      break;

    case 1:
      context.putImageData(eewMapImage, 905, 0);
      if(!eewIsAlert){
        context.fillStyle = "#2b4aad";
        context.fillRect(0, 60, 900, 68);
        context.fillStyle = "#233d91";
        context.fillRect(0, 0, 900, 60);
        context.drawImage(images.eew.fc, 0, 0, 320, 60);
        context.fillStyle = "#000";
        context.fillRect(320,4,10,54);
        context.fillStyle="#fff";
        context.font = "bold 28px 'ヒラギノ角ゴ ProN', 'Microsoft Sans Serif', JPAPGothic";
        context.fillText("最大", 3, 90, 45);
        context.fillText("震度", 3, 119, 45);
        context.fillText("震", 318, 90, 23);
        context.fillText("源", 318, 119, 23);
        if((!eewIsAssumption) && eewClassCode != 35){
          context.fillText("深さ", 725, 88, 45);
          context.font = "bold 40px 'Microsoft Sans Serif', JPAPGothic";
          context.fillText("M", 170, 118, 35);
          context.fillText(eewDepth+"km", 750, 123, 100);
        }
        context.font = "bold 55px 'Microsoft Sans Serif', 'ヒラギノ角ゴ ProN', JPAPGothic";
        if(eewClassCode != 35)context.fillText(eewCalcintensity, 50, 115, 95); else context.fillText(eewCalcintensity, 50, 115, 235);
        context.font = "bold 55px 'ヒラギノ角ゴ ProN', JPAPGothic";
        context.fillText(eewEpicenter, 344, 115, 350);
        if((!eewIsAssumption) && eewClassCode != 35){
         context.font = "bold 58px 'Microsoft Sans Serif', JPAPGothic";
          context.fillText(eewMagnitude, 205, 115, 100);
        }
        context.fillStyle = "#777";
        context.fillRect(900, 0, 5, 128);
      } else {
        context.fillStyle = "#b8240d";
        context.fillRect(0, 60, 900, 68);
        context.fillStyle = "#c42810";
        context.fillRect(0, 0, 900, 60);
        context.drawImage(images.eew.pub, 0, 0, 320, 60);
        context.fillStyle = "#f22";
        context.fillRect(320, 4, 10, 54);
        context.fillStyle="#fff";
        context.font = "bold 28px 'ヒラギノ角ゴ ProN', 'Microsoft Sans Serif', JPAPGothic";
        context.fillText("最大", 3, 90, 45);
        context.fillText("震度", 3, 119, 45);
        context.fillText("震", 318, 90, 23);
        context.fillText("源", 318, 119, 23);
        if((!eewIsAssumption) && eewClassCode != 35){
         context.fillText("深さ", 725, 88, 45);
         context.font = "bold 40px 'Microsoft Sans Serif', JPAPGothic";
         context.fillText("M", 170, 118, 35);
         context.fillText(eewDepth+"km", 750, 123, 100);
        }
        context.font = "bold 55px 'Microsoft Sans Serif', JPAPGothic";
        context.fillText(eewCalcintensity, 50, 115, 95);
        context.font = "bold 55px 'ヒラギノ角ゴ ProN', JPAPGothic";
        context.fillText(eewEpicenter, 344, 115, 350);
        if((!eewIsAssumption) && eewClassCode != 35){
         context.font = "bold 58px 'Microsoft Sans Serif', JPAPGothic";
         context.fillText(eewMagnitude, 205, 115, 100);
        }
        context.fillStyle = "#777";
        context.fillRect(900, 0, 5, 128);
      }

      /*if(Number(eewMagnitude) >= 6 && eewIsSea && (startTime%600)>=300){
        context.fillStyle="yellow";
        context.fillRect(337,2,553,55);
        context.fillStyle="black";
        context.font = "bold 35px 'Microsoft Sans Serif', JPAPGothic";
        context.fillText("津波が発生する可能性があります。", 348, 45, 534)
      }*/
      if(eewWarnForecast){
        context.font = "bold 25px 'ヒラギノ角ゴ ProN', 'Microsoft Sans Serif', JPAPGothic";
        context.fillStyle = "yellow";
        context.fillText(eewAboutHypocenter + "で地震。以下の地域では強い揺れに警戒。", 337, 26, 553);
        context.fillStyle = "#fff";
        context.fillText(eewWarnForecast, 337, 53, 553);
      } else {
        context.fillStyle = "#ffea00";
        context.font = "bold 25px Arial, 'Microsoft Sans Serif', 'ヒラギノ角ゴ ProN', JPAPGothic";
        context.fillText(multilingual[0][Math.floor((startTime%(300*24))/300+33)].split("\r\n")[Math.floor((startTime%300)/(300/multilingual[0][Math.floor((startTime%(300*24))/300+33)].split("\r\n").length))], 337, 26, 553);
        context.fillText(multilingual[1][Math.floor((startTime%(300*24))/300+33)].split("\r\n")[Math.floor((startTime%300)/(300/multilingual[1][Math.floor((startTime%(300*24))/300+33)].split("\r\n").length))], 337, 53, 553);
      }

      if(eewOriginTime.getTime() < (new Date())-480000){
        if(recording)recorder.stop();
        if(!testNow)mode = 0;
      }

      if((!eewIsAssumption) && eewClassCode != 35){
        context.fillStyle = "#d00";
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
        context.globalAlpha = 1 - (startTime % 50) / 65;
        context.beginPath();
        context.moveTo(ep[0]-6,ep[1]-10);
        context.lineTo(ep[0]-10,ep[1]-6);
        context.lineTo(ep[0]-4,ep[1]);
        context.lineTo(ep[0]-10,ep[1]+6);
        context.lineTo(ep[0]-6,ep[1]+10);
        context.lineTo(ep[0],ep[1]+4);
        context.lineTo(ep[0]+6,ep[1]+10);
        context.lineTo(ep[0]+10,ep[1]+6);
        context.lineTo(ep[0]+4,ep[1]);
        context.lineTo(ep[0]+10,ep[1]-6);
        context.lineTo(ep[0]+6,ep[1]-10);
        context.lineTo(ep[0],ep[1]-4);
        context.closePath();
        context.fill();
        context.stroke();
        context.lineWidth = 1;
        context.globalAlpha = 1;
      } else {
        context.fillStyle = "#d00";
        let t1 = (startTime % 68) / 68;
        let t2 = ((startTime + 17) % 68) / 68;
        let t3 = ((startTime + 34) % 68) / 68;
        let t4 = ((startTime + 51) % 68) / 68;
        context.globalAlpha = 0.5 - t1/2;
        context.beginPath();
        context.arc(ep[0], ep[1], t1*28.284271, 0, 2*Math.PI);
        context.fill();
        context.globalAlpha = 0.5 - t2/2;
        context.beginPath();
        context.arc(ep[0], ep[1], t2*28.284271, 0, 2*Math.PI);
        context.fill();
        context.globalAlpha = 0.5 - t3/2;
        context.beginPath();
        context.arc(ep[0], ep[1], t3*28.284271, 0, 2*Math.PI);
        context.fill();
        context.globalAlpha = 0.5 - t4/2;
        context.beginPath();
        context.arc(ep[0], ep[1], t4*28.284271, 0, 2*Math.PI);
        context.fill();
        context.globalAlpha = 1;
      }

      if(eewIsCancel){
        // context.save();
        // let gr = context.createLinearGradient(0,24,0,104);
        // gr.addColorStop(0, "#7be31e");
        // gr.addColorStop(1, "#269400");
        // context.fillStyle = "#000a";
        // context.strokeStyle = "#fff";
        // context.lineWidth = 2;
        // context.fillRect(0,0,1080,128);
        // context.fillStyle = gr;
        // context.translate(220,0);
        // context.beginPath();
        // context.moveTo(470,30);
        // context.lineTo(470,98);
        // context.quadraticCurveTo(470,100.45,468.2,102.2);
        // context.quadraticCurveTo(466.45,104,464,104);
        // context.lineTo(176,104);
        // context.quadraticCurveTo(173.55,104,171.75,102.2);
        // context.quadraticCurveTo(170,100.45,170,98);
        // context.lineTo(170,30);
        // context.quadraticCurveTo(170,27.55,171.75,25.75);
        // context.quadraticCurveTo(173.55,24,176,24);
        // context.lineTo(464,24);
        // context.quadraticCurveTo(466.45,24,468.2,25.75);
        // context.quadraticCurveTo(470,27.55,470,30);
        // context.fill();
        // context.stroke();
        // context.font = "bold 25px 'ヒラギノ角ゴ ProN', JPAPGothic";
        // context.fillStyle = "#fff";
        // context.textAlign = "center";
        // context.fillText("緊急地震速報は",320,60);
        // context.fillText("取り消されました",320,90);
        // context.restore();
        context.drawImage(images.eew.cancel, 0, 0);
      }

      //context.fillText(multilingual[Math.floor((startTime%300)/150)][Math.floor((startTime%3000)/300+34)], 425, 50, 650);
      //context.fillText("最大震度不明 M6.4 震源:あいうえおかきくけこ 深さ:590km (第89報)" ,10 ,115, 1060)
      break;

    case 2:
      var sum = (siList[si] != "");
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
      context.drawImage(images.quake.title[colorThemeMode][mscale], 0, 0);
      if(language == "Ja"){
        context.fillStyle = colorScheme[colorThemeMode][0][mscale];
        context.fillRect(dif, 60, 200, 68);
        //地震情報 文字
        // context.font = "bold 30px 'ヒラギノ角ゴ ProN'";
        // context.fillStyle = "#71f043";
        // context.fillText("地震情報", 10, 30);
        // context.font = "bold 20px JPAPGothic";
        // context.fillText("Earthquake Information", 10, 52, 202);
        //文字
        context.fillStyle = colorScheme[colorThemeMode][3][mscale];
        context.font = "bold 25px JPAPGothic, sans-serif";
        context.fillText("最大震度", 240, 25, 70);
        context.fillText("震源", 536, 25);
        if(depth!="")context.fillText("深さ", 832, 25, 36);
        if(depth!="ごく浅い" && depth!="ごく浅く" && depth!="")context.fillText("㎞", 925, 50);
        context.fillText("発生時刻", 960, 25);
        context.font = "bold 25px Arial, JPAPGothic, sans-serif";
        context.fillText("M", 406, 25);
        //白 Data
        context.font = "bold 46px Arial, 'arial unicode ms', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillStyle = mscale==1 ? "#444" : "#FFF";
        if(seismic_intensity !== undefined)context.fillText(seismic_intensity, 312, 45);
        context.fillText(magnitude, 429, 45, 88);
        if(depth == "ごく浅い"){
          context.font = "30px Arial, JPAPGothic, sans-serif";
          context.fillText(depth, 850, 53, 90);
        } else {
          context.fillText(depth, 866, 45, 60);
        }
        context.font = "bold 30px Arial, JPAPGothic, sans-serif";
        if(seismic_intensity !== undefined)context.fillText(epicenter_id==-2?epicenter:epicenter_list[0][epicenter_id], 526, 53, 300);
        if(seismic_intensity !== undefined)context.fillText(timeH+"時"+timeM+"分", 960, 53, 115);
        context.font = "50px 'ヒラギノ角ゴ ProN', sans-serif";
        if(seismic_intensity !== undefined)context.fillText("震度"+siList[si], 10+dif, 110, 180);
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
        context.fillStyle = colorScheme[colorThemeMode][3][mscale];
        context.font = "bold 18px Arial, 'Microsoft Sans Serif', sans-serif";
        context.fillText("Maximum", 240, 18, 70);
        context.fillText("Seismic", 240, 36, 70);
        context.fillText("Intensity", 240, 54, 70);
        context.font = "bold 25px Arial, 'Microsoft Sans Serif', sans-serif";
        context.fillText("M", 406, 25);
        context.fillText("Epicenter", 536, 25);
        if(depth!="")context.fillText("Depth", 817, 25, 51);
        if(depth != "ごく浅い" && depth!=""){
          context.fillText("㎞", 925, 50);
        }
        context.fillText("Occurrence at", 960, 25, 113);
        //白 Data
        context.font = "bold 46px Arial, 'arial unicode ms', sans-serif";
        context.fillStyle = mscale==1 ? "#444" : "#FFF";
        if(seismic_intensity !== undefined)context.fillText(seismic_intensity, 312, 45);
        context.fillText(magnitude, 429, 45, 88);
        if(depth == "ごく浅い"){
          context.fillText("shallow", 860, 53, 70);
        } else {
          context.fillText(depth, 866, 45, 60);
        }
        context.font = "bold 30px Arial, 'arial unicode ms', sans-serif";
        if(seismic_intensity !== undefined)context.fillText(epicenter_id==-2?epicenter:epicenter_list[1][epicenter_id], 516, 53, epicenter_id==-2?300:285 + epicenter_list[1][epicenter_id].length);
        if(seismic_intensity !== undefined)context.fillText(timeH+":"+timeM+" (JST)", 960, 53, 115);
        context.font = "50px 'ヒラギノ角ゴ ProN', sans-serif";
        if(seismic_intensity !== undefined && siList[si]!="")context.fillText("震度"+siList[si], 10+dif, 110, 180);
      }
      //水色
      context.fillStyle = (((timeCount%12)<5) && timeCount<216 && (timeCount%72)<60) ? "#e02222" : (magnitude == "--") ? "#f2f241" : "#49e5fc";
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
      if(timeCount < 13){
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
        if(earthquake_telop_remaining == 0){
          mode = 0;
          earthquake_telop_remaining = 1500;
          earthquake_telop_times = 0;
        }
        context.fillStyle = "#1144ed";
        context.beginPath();
        context.moveTo(1080, 127);
        context.lineTo(1080, 94);
        context.lineTo(806, 94);
        context.lineTo(773, 127);
        context.fill();
        context.fillStyle = "#1144ed5d";
        context.beginPath();
        context.moveTo(1080, 127);
        context.lineTo(1080, 90);
        context.lineTo(802, 90);
        context.lineTo(765, 127);
        context.fill();
        context.fillStyle = "#fff";
        context.font = "30px JPAPGothic, sans-serif";
        context.fillText(Math.ceil(earthquake_telop_remaining/50)+"秒後に通常画面に復帰します" ,810, 124, 265);
      }
      break;

    case 3:
      if(breakingtime >= 0){
        breakingtime--;
      }
      context.font = "bold 42px JPAPGothic, 'ヒラギノ角ゴ ProN', sans-serif";
      context.fillStyle = colorScheme[colorThemeMode][5][3][mscale];
      context.fillText(BNtitle[0], 35, 45, 1080);
      context.font = "50px JPAPGothic, 'ヒラギノ角ゴ ProN', sans-serif";
      context.fillStyle = colorScheme[colorThemeMode][5][2];
      //context.fillText( BNtext, 17, 117, 1046);
      context.font = "23px JPAPGothic, 'ヒラギノ角ゴ ProN', sans-serif";
      if(strWidth(BNtext1[0])*0.8 < 1044) context.fillText(BNtext1[0], 17, 88, strWidth(BNtext1[0])*0.8); else {
        if(breakingtime != -2) context.fillText(BNtext1[0], (breakingtime%900)>800 ? 17 : (breakingtime%900)<200 ? 1063-strWidth(BNtext1[0])*0.8+17 : (1063-strWidth(BNtext1[0])*0.8)*(800-(breakingtime%900))/601+17 , 88, strWidth(BNtext1[0])*0.8); else context.fillText(BNtext1[0], 17 , 88, strWidth(BNtext1[0])*0.8);
      }
      context.font = "31px JPAPGothic, 'ヒラギノ角ゴ ProN', sans-serif";
      if(dosyasaigaikeikaijouhou == 0) context.fillText(BNtext2[0], 17, 122, 1046);//"北部、壱岐・対馬では、強風に注意してください。北部、壱岐・対馬、五島では、高波に注意してください。長崎県では、落雷に注意してください。"
      if(dosyasaigaikeikaijouhou != 0) context.fillText("＜" + BNtextarray[Math.floor(breakingtime/200)+1], 17, 88, 250);
      //if(breakingtime == -1)breakingtime = BNtitle.length*900-1;
      if(breakingtime == 0) mode = 0,BNtitle=[],BNtext1=[],BNtext2=[],BNtextarray=[];
      if(breakingtime%900 == 0) BNtitle.shift(),BNtext1.shift(),BNtext2.shift();
      if(BNtitle[0] === undefined) breakingtime = 0;
      break;

    case 4:
      if(video.videoWidth!=0 || video!==null)context.drawImage(video, (1080-video.videoWidth/video.videoHeight*128)/2, 0, video.videoWidth/video.videoHeight*128, 128);
      break;
  }
  if(!cancelled && mode!==1 && document.getElementById("viewTsunami").checked){
    context.fillStyle = "#fc3b25";
    let gr = context.createLinearGradient(265,55,270,55);
    gr.addColorStop(0,"#b3312200");
    gr.addColorStop(1,"#b33122ff");
    context.fillStyle = gr;
    context.fillRect(265,25,815,35);
    gr = context.createLinearGradient(270,20,270,25);
    gr.addColorStop(0,"#b3312200");
    gr.addColorStop(1,"#b33122ff");
    context.fillStyle = gr;
    context.fillRect(270,20,810,5);
    gr = context.createRadialGradient(270,25,5,270,25,0);
    gr.addColorStop(0,"#b3312200");
    gr.addColorStop(1,"#b33122ff");
    context.fillStyle = gr;
    context.beginPath();
    context.arc(270,25,5,1*Math.PI,1.5*Math.PI,false);
    context.lineTo(270,25);
    context.fill();
    context.font = "bold 30px 'KozGoPro-Medium', JPAPGothic, 'Microsoft Sans Serif', 'Times-Roman', sans-serif";
    context.fillStyle = "#fff";
    context.fillText(tsunamiTexts[tPage],275,53,800);
  }
  if(video!==null)document.getElementById('movietime').innerHTML = "movieCurrentTime --　　"+Math.floor(video.currentTime/60) + ":" + ("00"+strIns((Math.floor((video.currentTime*100)%6000)).toString(), (Math.floor((video.currentTime*100)%6000)).toString().length-2, (Math.floor((video.currentTime*100)%6000)).toString().length==1?".0":".")).slice(-5) + "<br>movieDuration --　　" + Math.floor(video.duration/60) + ":" + ("00"+strIns((Math.floor((video.duration*100)%6000)).toString(), (Math.floor((video.duration*100)%6000)).toString().length-2, ".")).slice(-5);

  context.fillStyle = "#F00";
  if(tx>1200){
    context.beginPath();
    context.moveTo(-200, 0);
    context.lineTo(-200, 127);
    if(tx<1400){
      context.lineTo((tx-1400)*6.75+1350, 127);
      context.lineTo((tx-1400)*6.75+1150, 0);
    } else {
      context.lineTo(1079, 127);
      context.lineTo(1079, 0);
    }
    context.fill();
    if(tx>1390){
      context.font = "50px 'Microsoft Sans Serif', JPAPGothic, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      context.fillStyle = "#fff";
      context.fillText("津波情報が更新されました。", 20, 52);
      context.fillText("最新の情報を確認してください。", 80, 120);
      context.font = "40px 'Microsoft Sans Serif', JPAPGothic, system-ui, sans-serif";
      context.fillText("Tsunami warning!", 740, 58, 230);
    }
  }
  if((getFormattedDate(1).month + getFormattedDate(1).day + getFormattedDate(1).hour + getFormattedDate(1).minute == 125) && false){
    context.fillStyle = colorScheme[colorThemeMode][1][2];
    context.font = "120px 'Microsoft Sans Serif', JPAPGothic, sans-serif";
    context.fillRect(0, 0, 1080, 128);
    context.fillStyle = "#fff";
    context.fillText("年越しまで: " + (60-getFormattedDate(1).second) + "秒", 100, 115);
  }
  if((getFormattedDate(1).month + getFormattedDate(1).day + getFormattedDate(1).hour + getFormattedDate(1).minute == 2) && false){
    context.fillStyle = colorScheme[colorThemeMode][1][0];
    context.font = "120px 'Microsoft Sans Serif', JPAPGothic, sans-serif";
    context.fillRect(0, 0, 1080, 128);
    context.fillStyle = "#fff";
    context.fillText( getFormattedDate(1).year + "年おめでとううううう！！", 2, 115, 1300);
  }

  if(!isClose && mode==0 && isSoraview){
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
    context.font = "30px 'ヒラギノ角ゴ ProN', JPAPGothic, 'Microsoft Sans Serif', sans-serif";
    context.fillText("ｳｪｻﾞｰﾆｭｰｽｱﾝｹｰﾄ実施中!" ,810, 124, 265);
  }
  soraopen_moving = anim_soraview.current();
  soraopen_color = anim_soraview_color.current();
  if(bit(soraopen, 0)){
    context.fillStyle = "#e3e3e3" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
    context.font = "30px 'ヒラギノ角ゴ ProN', JPAPGothic, 'Microsoft Sans Serif', sans-serif";
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
    context.font = "25px 'ヒラギノ角ゴ ProN', JPAPGothic, 'Microsoft Sans Serif', sans-serif";
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
    context.font = "25px 'ヒラギノ角ゴ ProN', JPAPGothic, 'Microsoft Sans Serif', sans-serif";
    context.fillText("アンケートの参加はこちら", 585, 50);
    context.fillStyle = "#3569c0";
    context.strokeStyle = '#3569c0';
    context.beginPath();
    context.moveTo(601,78);
    context.lineTo(846,78);
    context.stroke();
    context.font = "italic 25px 'Microsoft Sans Serif', Arial, sans-serif";
    context.fillText("http://wni.my/?sorabtn", 600, 78);
    context.drawImage(qr_img, 900, -3);
  }

  //canvas時間表示
  time.fillStyle = colorScheme[colorThemeMode][6][0];
  time.fillRect(0, 0, 128, 128);
  time.font = "bold 25px 'Tahoma'";
  time.fillStyle = colorScheme[colorThemeMode][6][1];
  time.fillText("Date", 5, 31);
  time.font = "bold 50px '7barSP'";
  time.fillStyle = colorScheme[colorThemeMode][6][2];
  var timeString1=(" "+nowDate.getHours()+":"+("0" + nowDate.getMinutes()).slice(-2)).slice(-5);
  var timeString2=("0"+(nowDate.getFullYear()-2000)).slice(-2)+"-"+("0"+(nowDate.getMonth()+1)).slice(-2)+"-"+("0" + nowDate.getDate()).slice(-2);
  time.fillStyle = colorScheme[colorThemeMode][6][3];
  time.fillText("88:88", 10, 108, 108);
  time.fillStyle = colorScheme[colorThemeMode][6][2];
  time.fillText(timeString1, 10, 108, 108);
  time.font = "bold 29px '7barSP'";
  time.fillStyle = colorScheme[colorThemeMode][6][3];
  time.fillText("88-88-88", 10, 63, 108);
  time.fillStyle = colorScheme[colorThemeMode][6][2];
  time.fillText(timeString2, 10, 63, 108);

  document.getElementById("dbPfDrawing").innerText = "描画処理セクション：" + ("000000"+Math.round(window.performance.now()*1000-performDrawStartAt)).slice(-7)+ "μs";

  // AudioAPI alarm adjustment
  if(startTime%8==0){
    audioAPI.fun["freq"+(startTime%16>7?"B5":"E6")]();
  }

  //audio repeatition control
  for(var i=0; i<$('.BGM').length; i++){
    if(Number($('.BGMrepeatingStopMin')[i].value) * 60 + Number($('.BGMrepeatingStopSec')[i].value) < $('.BGM')[i].currentTime && $('.BGMrepeat')[i].checked){
      $('.BGM')[i].currentTime = Number($('.BGMrepeatingStartMin')[i].value) * 60 + Number($('.BGMrepeatingStartSec')[i].value);
    }
    $('.BGMrepeatingStartMin')[i].max = Math.floor($('.BGM')[i].duration/60);
    $('.BGMrepeatingStopMin')[i].max = Math.floor($('.BGM')[i].duration/60);
    $('.BGMrepeatingStartSec')[i].max = $('.BGM')[i].duration<60 ? Math.floor($('.BGM')[i].duration) : 60;
    $('.BGMrepeatingStopSec')[i].max = $('.BGM')[i].duration<60 ? Math.floor($('.BGM')[i].duration) : 60;
  }

  // Audio showing controls
  for(let i = 0; i < backMsc.length; i++){
    let intCurTm = Math.floor(Number(backMsc[i]?.currentTime));
    let intDurTm = Math.floor(backMsc[i]?.bufferSource?.buffer?.duration);
    document.getElementsByClassName("musicCurrentTime")[i].textContent = Math.floor(intCurTm/60)+":"+("0"+(intCurTm%60)).slice(-2);
    document.getElementsByClassName("musicDurationOrLeft")[i].textContent = Math.floor(intDurTm/60)+":"+("0"+(intDurTm%60)).slice(-2);
    // if(intCurTm >= intDurTm && backMsc[0]?.playing){
    //   backMsc[0].bufferSource.stop();
    //   backMsc[0].pausedAt = backMsc[0].bufferSource.buffer.duration;
    // }
    if(backMsc[i].playing && backMsc[i].bufferSource.loop && backMsc[i].currentTime >= backMsc[i].bufferSource.loopEnd){
      backMsc[i].startedAt += backMsc[i].currentTime - backMsc[i].bufferSource.loopStart;
    }
  }
}
//
// setInterval(function(){
//   let tfCt = "";
//   tfCt = "\n"+eewGetURL+"\n　"+lastGet.iedred7584EEW;
//   tfCt += "\nhttps://www3.nhk.or.jp/sokuho/jishin/data/JishinReport.xml\n　"+lastGet.nhkQuake1;
//   tfCt += "\nhttps://www.nhk.or.jp/weather-data/v1/wx/quake/info/?akey=18cce8ec1fb2982a4e11dd6b1b3efa36\n　"+lastGet.nhkQuake2;
//   tfCt += "\nhttp://www.data.jma.go.jp/developer/xml/feed/extra.xml\n　"+lastGet.jmaDevFeedExtra;
//   tfCt += "\nhttps://earthquake.tenki.jp/bousai/tsunami/index.html\n　"+lastGet.tenkiJPtsunami;
//   tfCt += "\nhttp://weathernews.jp/mscale/json/scale.json\n　"+lastGet.wniMScale;
//   tfCt += "\nhttps://weathernews.jp/v/sorawolive/data/json/solive_sorabtn.json\n　"+lastGet.wniSorabtn;
//   tfCt += "\nhttps://weathernews.jp/river/json/river.json\n　"+lastGet.wniRiver;
//   tfCt += "\nhttps://www.data.jma.go.jp/obd/stats/data/mdrr/pre_rct/alltable/pre1h00_rct.csv\n　"+lastGet.jmaTableCsvPre1h00_rct;
//   tfCt += "\nhttps://www.data.jma.go.jp/obd/stats/data/mdrr/pre_rct/alltable/pre24h00_rct.csv\n　"+lastGet.jmaTableCsvPre24h00_rct;
//   tfCt += "\nhttps://www.data.jma.go.jp/obd/stats/data/mdrr/wind_rct/alltable/mxwsp00_rct.csv\n　"+lastGet.jmaTableCsvMxwsp00_rct;
//   tfCt += "\nhttps://www.data.jma.go.jp/obd/stats/data/mdrr/tem_rct/alltable/mxtemsadext00_rct.csv\n　"+lastGet.jmaTableCsvMxtemsadext00_rct;
//   tfCt += "\nhttps://www.data.jma.go.jp/obd/stats/data/mdrr/tem_rct/alltable/mntemsadext00_rct.csv\n　"+lastGet.jmaTableCsvMntemsadext00_rct;
//   tfCt += "\nhttps://smtgvs.weathernews.jp/a/solive_timetable/timetable.json\n　"+lastGet.wniliveTimeTable;
//   tfCt += "\nhttps://teideninfo.tepco.co.jp/flash/xml/00000000000.xml\n　"+lastGet.tepcoTeiden;
//   document.getElementById("tfmoni").innerText = tfCt;
// },100);
const getCTime = function(){
  let t = new Date();
  return ("0"+(t.getMonth()+1)).slice(-2)+"月"+("0"+t.getDate()).slice(-2)+"日"+("0"+t.getHours()).slice(-2)+"時"+("0"+t.getMinutes()).slice(-2)+"分"+("0"+t.getSeconds()).slice(-2)+"秒"+("000"+t.getMilliseconds()).slice(-3);
}

// check the Earthquake Early Warning
var isEEW = false,
    lastnum = 0,
    lastID = "",
    lastAt = new Date("2000/01/01 00:00:00"),
    eewGetURL = "https://api.iedred7584.com/eew/json/",
    eewDatas = {
      version: _appVersion,
      logs: []
    },
    eewAssumptionsLog = {};
//var eewLoadingLateTime = [0,0,0,0,0,-1];
function eewChecking(){
  $(function(){
      $.ajax({
          type: 'GET',
          url: eewGetURL,//"http://www.kmoni.bosai.go.jp/webservice/hypo/eew/" + getFormattedDate(0,true,undefined,eewLoadingLateTime) + ".json",
          dataType: 'json',
          timeOut: 2000,
          cache: false,
          success: function(data){
            lastGet.iedred7584EEW = getCTime();
            /*if(data.report_num != ""){
              isEEW = true;
              eewReportNumber = data.report_num;
              eewEpicenter = data.region_name;
              eewIsCancel = data.is_cancel;
              eewIsFinal = data.is_final;
              eewIsTraning = data.is_traning;
              eewCalcintensity = data.calcintensity;
              eewMagnitude = data.magunitude;
              eewDepth = data.depth;
              eewReportID = data.report_id;
              eewAlertFlgText = data.alertflg;
              eewIsAlert = data.alertflg=="警報" ? true : false;
              eewOriginTime = new Date(data.origin_time.slice(0,4)+"/"+data.origin_time.slice(4,6)+"/"+data.origin_time.slice(6,8)+" "+data.origin_time.slice(8,10)+":"+data.origin_time.slice(10,12)+":"+data.origin_time.slice(12,14));
              if(lastnum!=data.report_num || lastID!=data.report_id){
                if(eewReportNumber == "1"){
                  sounds.eew.first.currentTime = 0;
                  sounds.eew.first.play();
                } else if(eewIsFinal){
                  sounds.eew.last.currentTime = 0;
                  sounds.eew.last.play();
                } else {
                  sounds.eew.continue.currentTime = 0;
                  sounds.eew.continue.play();
                }
              }
              if(eewOriginTime.getTime()+90000 > getFormattedDate(2) || eewReportNumber == 1)mode = 1;
              if(mode==1 && (lastnum!=data.report_num || lastID!=data.report_id))eewMapDraw(Number(data.longitude), Number(data.latitude), [992,63]);
              if(document.getElementsByName("recordingwheneewreceived")[0].checked && !recording){recorder.start();}
            }
            lastnum = data.report_num;
            lastID = data.report_id;*/
            if((data.EventID != lastID || data.Serial != lastnum) && lastID !== "" && lastnum !== 0){
              eewDatas.logs.push({
                raw: data,
                time: (new Date())/1000,
                timeISO: (new Date()).toISOString()
              });
              eewClassCode = data.Title.Code;
              if(data.Title.Code == 35){
                eewReportNumber = data.Serial;
                eewReportID = data.EventID;
                eewOriginTime = new Date(data.OriginTime.String);
                eewIsCancel = false;
                eewIsTraning = false;
                eewCalcintensity = "5弱程度以上";
                eewEpicenter = data.Hypocenter.Name;
                eewEpicenterID = data.Hypocenter.Code;
                if(EEWsendingAllowed) eewLogsSending();
                play(sounds.eew.first, document.getElementById('volEEWl').valueAsNumber/100);
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
                eewIsAlert = data.Warn;
                eewIsAssumption = data.Hypocenter.isAssumption;
                eewEpicenter = data.Hypocenter.Name;
                eewEpicenterID = data.Hypocenter.Code;
                let viewCondition = true; // Number(document.getElementsByName("eewminint")[0].value)-1<["1","2","3","4","5弱","5強","6弱","6強","7"].indexOf(eewCalcintensity);
                if(eewIsAssumption){
                  if(lastID != eewReportID) eewMagnitude = -1;
                  if(!(eewReportID in eewAssumptionsLog)){
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
                  if(lastnum!=eewReportNumber || lastID!=eewReportID && viewCondition){
                    if(eewReportNumber == "1"){
                      play(sounds.eew.first, document.getElementById('volEEWl').valueAsNumber/100);
                    } else if(eewIsFinal){
                      play(sounds.eew.last, document.getElementById('volEEWl').valueAsNumber/100);
                      if(EEWsendingAllowed) eewLogsSending();
                    } else {
                      play(sounds.eew.continue, document.getElementById('volEEWl').valueAsNumber/100);
                    }
                  }
                }
                eewWarnForecast = "";
                if(viewCondition){
                  if((eewOriginTime.getTime()+90000 > getFormattedDate(2) || eewReportNumber == 1) || testNow)mode = 1;
                  if(mode==1 && (lastnum!=eewReportNumber || lastID!=eewReportID) && (eewOriginTime.getTime()+90000 > getFormattedDate(2) || eewReportNumber == 1 || testNow))eewMapDraw(data.Hypocenter.Location.Long, data.Hypocenter.Location.Lat, (data.WarnForecast?data.WarnForecast.LocalAreas:undefined));
                  if(document.getElementsByName("recordingwheneewreceived")[0].checked && !recording){recorder.start();}
                  if(eewIsAlert){
                    eewWarnForecast = data.WarnForecast.Regions.join(" ");
                    if(eewWarnForecast.length > 40){
                      eewWarnForecast = data.WarnForecast.LocalAreas.join(" ");
                      if(eewWarnForecast.length > 49){
                        eewWarnForecast = data.WarnForecast.District.join(" ");
                      }
                    }
                    eewAboutHypocenter = data.WarnForecast.Hypocenter.Name;
                    if(!audioAPI.oscillatorNode.starting) audioAPI.fun.startOscillator();
                  } else {
                    if(audioAPI.oscillatorNode.starting) audioAPI.fun.stopOscillator();
                  }
                  if(document.getElementById('setClipEEW').checked) copy("／／　緊急地震速報（"+(eewIsAlert?"警報":"予報")+"）　"+(eewIsFinal?"最終":(eewReportNumber==1?"初報":"継続"))+"第"+eewReportNumber+"報　＼＼\n最大震度　　　："+eewCalcintensity+"\n震源　　　　　："+eewEpicenter+"\nマグニチュード："+eewMagnitude.toFixed(1)+"\n深さ　　　　　："+eewDepth+"㎞\n\n緊急地震速報が発表されました。\n落ち着いてください。\n上から落ちてくるものに気をつけてください。\nむりに火を消そうとしないでください。");
                }
              }
            }/* else if((data.EventID != lastID || data.Serial != lastnum)){
              eewIsTraning = true;
              console.log("緊急地震速報の訓練報を受信しました。内容は以下の通りです。");
              console.log(data);
            }*/
            lastnum = data.Serial;
            lastAt = new Date(data.AnnouncedTime.String);
            lastID = data.EventID;
          }
      })
  });
}
// Earthquake Early Warning
var eewMapImage = context.createImageData(175, 128);
var ep = [992,63];
function eewMapDraw(longitude, latitude, warnAreas=[]){
  ep = [992,63];
  var magnification = 999;
  if(latitude<33)ep[1] += (33-latitude)*3;
  if(latitude>45)ep[1] += (45-latitude)*3;
  if(latitude>36){
    if(longitude<137)ep[0] += (longitude-137)*3;
  } else {
    if(longitude<128)ep[0] += (longitude-128)*3;
  }
  if(longitude>146)ep[0] += (longitude-146)*3;
  Japan_geojson.features.forEach(function(c){
      switch (c.geometry.type){
        case "MultiPolygon":
          c.geometry.coordinates.forEach(function(c2){
              if(c2[0].length > 70){
                c2[0].forEach(function(c3){
                    var cldis = Math.sqrt(Math.pow(c3[0]-longitude,2)+Math.pow(c3[1]-latitude,2));
                    if(magnification > cldis)magnification = cldis;
                });
              }
          });
        case "Polygon":
          c.geometry.coordinates[0].forEach(function(c3){
              var cldis = Math.sqrt(Math.pow(c3[0]-longitude,2)+Math.pow(c3[1]-latitude,2));
              if(magnification > cldis)magnification = cldis;
          });
      }
  });
  magnification = (magnification < 0.8) ? 50 : 40/magnification;
  context.fillStyle = "#89abd1";
  context.fillRect(905,0,175,128);
  context.strokeStyle = "black";
  Japan_geojson.features.forEach(function(int){
    context.fillStyle = "#32a852";
    // warnAreas.forEach(function(area){
    //   if(int.properties.nam_ja.indexOf(area)!=-1)context.fillStyle = "#fdab29";
    // });
    switch (int.geometry.type) {
      case "MultiPolygon":
        int.geometry.coordinates.forEach(function(points){
          context.beginPath();
          //console.log(points[0].length);
          for (let i=0; i<points[0].length; i++) {
            let point = points[0][i];
            if(i==0){
              context.moveTo((point[0]-(longitude-ep[0]/magnification))*magnification,(-point[1]+(latitude+ep[1]/magnification))*magnification);
              //console.log(int.properties.nam_ja,i,longitude,latitude,ep[0],ep[1],(point[0]-(longitude-ep[0]/magnification))*magnification,(-point[1]+(latitude+ep[1]/magnification))*magnification);
            } else {
              context.lineTo((point[0]-(longitude-ep[0]/magnification))*magnification,(-point[1]+(latitude+ep[1]/magnification))*magnification);
              //if(int.properties.nam_ja=="京都府")console.log(int.properties.nam_ja,i,longitude,latitude,ep[0],ep[1],(point[0]-(longitude-ep[0]/magnification))*magnification,(-point[1]+(latitude+ep[1]/magnification))*magnification);
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
            if(i==0){
              context.moveTo((point[0]-(longitude-ep[0]/magnification))*magnification,(-point[1]+(latitude+ep[1]/magnification))*magnification);
            } else {
              context.lineTo((point[0]-(longitude-ep[0]/magnification))*magnification,(-point[1]+(latitude+ep[1]/magnification))*magnification);
            }
          }
          context.fill();
          context.stroke();
        });
        break;
    }
  });
  eewMapImage = context.getImageData(905, 0, 175, 128);
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
   *   context.moveTo((lastpoint[0]-(longitude-ep[0]/magnification))*magnification,(-lastpoint[1]+(latitude+ep[1]/magnification))*magnification);
   *   context.lineTo((point[0]-(longitude-ep[0]/magnification))*magnification,(-point[1]+(latitude+ep[1]/magnification))*magnification);
   *     初期も何も公開前
  */
}
function eewLogsSending(){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function(){
    let response = JSON.parse(this.response);
    if(response.status === "OK"){
      console.log("EEW Logs was sended.");
    } else if(response.status === "Error") {
      console.warn("EEW Logs wasn't sended: An server error occurred.");
    }
  });
  xhr.open("POST", "https://script.google.com/macros/s/AKfycbyiKW-RWvZyeQC59RvDpBidR151sohEnzwESP2UewGk0BgDhcwh1M2Jw52chC8NJh-Y/exec");
  xhr.send(JSON.stringify({type:"EEWlog", version:_appVersion, data:eewDatas}));
}

function loadDText() {
  /*$(function(){
      $.getJSON("default_message.json", function(data){
          for(i=0; i<data.title.length; i++){
            DText[i+5] = data.title[i];
            document.getElementById("title"+(i+1)).value = data.title[i];
          }
          for(i=0; i<data.main.length; i++){
            DText[i] = data.main[i];
            document.getElementById("message"+(i+1)).value = data.main[i];
          }
      })
  })*/
}

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
  var res = str.slice(0, idx) + val + str.slice(idx);
  return res;
}

function intervalReset() {
  intervalTime1 = 1;
  clearInterval(intervalArray.shift());
  soraopen_interval1 = null;
}

function strWidth(str) {
  if (canvas1.getContext) {
    var metrics = context.measureText(str);
    return metrics.width;
  }
  return -1;
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
    isClose = true;

var riverlevel = new Array(7);
var rivertext = ["","","","","","",""];
function riverData() {
  $(function(){
      $.ajax({
          type: 'GET',
          url: 'https://weathernews.jp/river/json/river.json',
          dataType: 'json',
          timeOut: 29000,
          cache: false,
          success: function(data){
            lastGet.wniRiver = getCTime();
            riverlevel[0] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == -1 });
            riverlevel[1] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 0 });
            riverlevel[2] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 1 });
            riverlevel[3] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 2 });
            riverlevel[4] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 3 });
            riverlevel[5] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 4 });
            riverlevel[6] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 5 });
            for(var i=1; i<7; i++){
              rivertext[i] = "河川水位情報 "+["平常(ﾚﾍﾞﾙ0/6)","水防団待機水位(ﾚﾍﾞﾙ1/6)","氾濫注意水位(ﾚﾍﾞﾙ2/6)","出動水位(ﾚﾍﾞﾙ3/6)","避難判断水位(ﾚﾍﾞﾙ4/6)","氾濫危険水位(ﾚﾍﾞﾙ5/6)","計画高水位(ﾚﾍﾞﾙ6/6)"][i]+"　　";
              riverlevel[i].forEach(function(val){
                  rivertext[i] += val.properties.name+"("+val.properties.VOL+"m)　";
              })
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Loading Error (river)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
      })
  })
}

var forecasttext = "";
function getJMAforecast(){
  // $.getJSON
}

var teidentext = "";
function teideninfo(){
  $.ajax({
    type: 'GET',
    url: "https://teideninfo.tepco.co.jp/flash/xml/00000000000.xml",
    dataType: 'xml',
    cache: false,
    success: function(c){
      lastGet.tepcoTeiden = getCTime();
      teidentext = $(c).find('東京電力停電情報 > お知らせ').text() + "　";
      var teidenkensuu_zentai = Number($(c).find('東京電力停電情報 > 停電軒数').text());
      var teidenkensuu_kenbetsu = [];
      forEach2($(c).find('エリア'),function(c2){
        if($(c2).find('停電軒数').text() != ""){
          teidenkensuu_kenbetsu.push({
            code: $(c2).attr('コード'),
            name: $(c2).find('名前').text(),
            value: Number($(c2).find('停電軒数').text()),
            color: $(c2).find('表示色').text()
          });
        }
      });
      teidenkensuu_kenbetsu.forEach(function(c2){
          teidentext += "　" + c2.name + "：約" + c2.value + "軒";
      });
      teidentext += "　(総数：" + teidenkensuu_zentai + "軒)";
      if (!teidenkensuu_zentai) {
        teidentext = "現在、停電情報はございません。";
      }
    }
  })
}

function sorabtn(){
  $(function(){
      $.ajax({
          type: 'GET',
          url: 'https://weathernews.jp/v/sorawolive/data/json/solive_sorabtn.json',
          dataType: 'json',
          timeOut: 15000,
          cache: false,
          success: function(data){
            lastGet.wniSorabtn = getCTime();
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
            console.log("Loading Error (sorabtn)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
      })
  })
}
var soraopen = 0,
    isSoraview = true;
function sorabtn_view(){
  soraopen_moving = 1080;
  soraopen_intervaltime = 0;
  intervalTime = 0;
  intervalTime1 = 0;
  $(function(){
      $.ajax({
          type: 'GET',
          url: 'https://weathernews.jp/v/sorawolive/data/json/solive_sorabtn.json',
          dataType: 'json',
          timeOut: 4500,
          cache: false,
          success: function(data){
            lastGet.wniSorabtn = getCTime();
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
      })
  })
}
function sorabtn_open(){
  soraopen_intervaltime = 0;
  $(function(){
      $.ajax({
          type: 'GET',
          url: 'https://weathernews.jp/v/sorawolive/data/json/solive_sorabtn.json',
          dataType: 'json',
          timeOut: 4500,
          cache: false,
          success: function(data){
            lastGet.wniSorabtn = getCTime();
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
      })
  })
}
function sorabtn_close(){
  soraopen = 0;
  intervalTime = 0;
  intervalTime1 = 0;
  soraopen_moving = 1081;
  soraopen_interval1 = null;
  anim_soraview.reset();
  anim_soraview_color.reset();
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
  $(function(){
      $.ajax({
          beforeSend: function(xhr){
            xhr.overrideMimeType('text/plain; charset=shift_jis');
          },
          type: 'GET',
          url: "https://www.data.jma.go.jp/obd/stats/data/mdrr/pre_rct/alltable/pre1h00_rct.csv",
          dataType: 'text',
          timeOut: 50000,
          cache: false,
          success: function(data){
            lastGet.jmaTableCsvPre1h00_rct = getCTime();
            weather1hourrain = [];
            var weatherDataListCSV = [];
            var tmp = data.split("\n");
            for (var i=0; i<tmp.length-1; i++) {
              weatherDataListCSV[i] = tmp[i].split(',');
            }
            var i
            for (i=1; i<weatherDataListCSV.length; i++) {
              var obj = {pref:"", name:"", value: 0};
              obj.pref=weatherDataListCSV[i][1];
              obj.name=weatherDataListCSV[i][2];
              obj.value=Number(weatherDataListCSV[i][9]);
              if(obj.value!=0 && weatherDataListCSV[i][10]=="8")weather1hourrain.push(obj);
              if(weather_prelist[0].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[0].push(weatherDataListCSV[i][1]);
            }
            var s="";i=0;
            var spdl = document.getElementsByClassName('wpl0'); //SetPrefectureDataList
            for(var variable of weather_prelist[0]){
              if(spdl[i]===undefined){
                s += "<input type='checkbox' class='wpl0' value='"+variable+"' checked>";
                s += variable;
                s += "<br>";
              } else {
                s += "<input type='checkbox' class='wpl0' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
                s += variable;
                s += "<br>";
              }
              i++;
            }
            document.getElementById('main1').innerHTML = s;
            var cn = document.getElementsByClassName('wpl0');
            var wpll = [];
            for(var i=0; i<cn.length; i++){
              if(cn[i].checked){
                wpll.push(cn[i].value);
              }
            }
            weather1hourrain = weather1hourrain.filter(function(a){return wpll.indexOf(a.pref)!=-1});
            weather1hourrain.sort(function(a,b){return b.value-a.value});
            weather1hourrainstr = "[Maximum hourly precipitation]　　　";
            var rank = 0;
            for(var i=0; i<weather1hourrain.length; i++){
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
          url: "https://www.data.jma.go.jp/obd/stats/data/mdrr/pre_rct/alltable/pre24h00_rct.csv",
          dataType: 'text',
          timeOut: 50000,
          cache: false,
          success: function(data){
            lastGet.jmaTableCsvPre24h00_rct = getCTime();
            weather24hourrain = [];
            var weatherDataListCSV = [];
            var tmp = data.split("\n");
            for (var i=0; i<tmp.length-1; i++) {
              weatherDataListCSV[i] = tmp[i].split(',');
            }
            var i
            for (i=1; i<weatherDataListCSV.length; i++) {
              var obj = {pref:"", name:"", value: 0};
              obj.pref=weatherDataListCSV[i][1];
              obj.name=weatherDataListCSV[i][2];
              obj.value=Number(weatherDataListCSV[i][9]);
              if(obj.value!=0 && weatherDataListCSV[i][10]=="8")weather24hourrain.push(obj);
              if(weather_prelist[1].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[1].push(weatherDataListCSV[i][1]);
            }
            var s="";i=0;
            var spdl = document.getElementsByClassName('wpl1'); //SetPrefectureDataList
            for(var variable of weather_prelist[1]){
              if(spdl[i]===undefined){
                s += "<input type='checkbox' class='wpl1' value='"+variable+"' checked>";
                s += variable;
                s += "<br>";
              } else {
                s += "<input type='checkbox' class='wpl1' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
                s += variable;
                s += "<br>";
              }
              i++;
            }
            document.getElementById('main2').innerHTML = s;
            var cn = document.getElementsByClassName('wpl1');
            var wpll = [];
            for(var i=0; i<cn.length; i++){
              if(cn[i].checked){
                wpll.push(cn[i].value);
              }
            }
            weather24hourrain = weather24hourrain.filter(function(a){return wpll.indexOf(a.pref)!=-1});
            weather24hourrain.sort(function(a,b){return b.value-a.value});
            weather24hoursrainstr = "[Maximum 24-hour precipitation]　　　";
            var rank = 0;
            for(var i=0; i<weather24hourrain.length; i++){
              if(rank!=0)if(weather24hourrain[i].value != weather24hourrain[i-1].value)rank=i+1; else; else rank++;
              if(i>20){
                if(weather24hourrain[i].value!=weather24hourrain[i-1].value)break;
              }
              weather24hoursrainstr += rank+")"+weather24hourrain[i].pref+" "+weather24hourrain[i].name.replace(/（.{1,}）/, "")+" "+weather24hourrain[i].value+"mm/d　　 ";
            }
            if(weather24hoursrainstr==""){
              weather24hoursrainstr = (wpll.join('、')+"では過去1時間以内に雨が降ったところはないようです。").replace(/ /g, "");
            }
          }
      })
  });
  if(isFull){
    $(function(){
        $.ajax({
            beforeSend: function(xhr){
              xhr.overrideMimeType('text/plain; charset=shift_jis');
            },
            type: 'GET',
            url: "https://www.data.jma.go.jp/obd/stats/data/mdrr/wind_rct/alltable/mxwsp00_rct.csv",
            dataType: 'text',
            timeOut: 50000,
            cache: false,
            success: function(data){
              lastGet.jmaTableCsvMxwsp00_rct = getCTime();
              weatherMaximumWindSpeed = [];
              var weatherDataListCSV = [];
              var tmp = data.split("\n");
              for (var i=0; i<tmp.length-1; i++) {
                weatherDataListCSV[i] = tmp[i].split(',');
              }
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
              var spdl = document.getElementsByClassName('wpl2'); //SetPrefectureDataList
              for(var variable of weather_prelist[2]){
                if(spdl[i]===undefined){
                  s += "<input type='checkbox' class='wpl2' value='"+variable+"' checked>";
                  s += variable;
                  s += "<br>";
                } else {
                  s += "<input type='checkbox' class='wpl2' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
                  s += variable;
                  s += "<br>";
                }
                i++;
              }
              document.getElementById('main3').innerHTML = s;
              var cn = document.getElementsByClassName('wpl2');
              var wpll = [];
              for(var i=0; i<cn.length; i++){
                if(cn[i].checked){
                  wpll.push(cn[i].value);
                }
              }
              weatherMaximumWindSpeed = weatherMaximumWindSpeed.filter(function(a){return wpll.indexOf(a.pref)!=-1});
              weatherMaximumWindSpeed.sort(function(a,b){return b.value-a.value});
              weatherMaximumWindSpeedstr = "[Maximum wind speed]　　　";
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
            url: "https://www.data.jma.go.jp/obd/stats/data/mdrr/tem_rct/alltable/mxtemsadext00_rct.csv",
            dataType: 'text',
            timeOut: 50000,
            cache: false,
            success: function(data){
              lastGet.jmaTableCsvMxtemsadext00_rct = getCTime();
              weather_mxtemsadext = [];
              var weatherDataListCSV = [];
              var tmp = data.split("\n");
              for (var i=0; i<tmp.length-1; i++) {
                weatherDataListCSV[i] = tmp[i].split(',');
              }
              var i
              for (i=1; i<weatherDataListCSV.length; i++) {
                var obj = {pref:"", name:"", value: 0};
                obj.pref = weatherDataListCSV[i][1];
                obj.name = weatherDataListCSV[i][2];
                obj.value = Number(weatherDataListCSV[i][9]);
                if(Number(weatherDataListCSV[i][10])>3)weather_mxtemsadext.push(obj);
                if(weather_prelist[3].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[3].push(weatherDataListCSV[i][1]);
              }
              var s="";i=0;
              var spdl = document.getElementsByClassName('wpl3'); //SetPrefectureDataList
              for(var variable of weather_prelist[3]){
                if(spdl[i]===undefined){
                  s += "<input type='checkbox' class='wpl3' value='"+variable+"' checked>";
                  s += variable;
                  s += "<br>";
                } else {
                  s += "<input type='checkbox' class='wpl3' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
                  s += variable;
                  s += "<br>";
                }
                i++;
              }
              document.getElementById('main4').innerHTML = s;
              var cn = document.getElementsByClassName('wpl3');
              var wpll = [];
              for(var i=0; i<cn.length; i++){
                if(cn[i].checked){
                  wpll.push(cn[i].value);
                }
              }
              weather_mxtemsadext = weather_mxtemsadext.filter(function(a){return wpll.indexOf(a.pref)!=-1});
              weather_mxtemsadext.sort(function(a,b){return b.value-a.value});
              weather_mxtemsadextstr = "[Maximum temperature]　　　";
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
        })
        $.ajax({
            beforeSend: function(xhr){
              xhr.overrideMimeType('text/plain; charset=shift_jis');
            },
            type: 'GET',
            url: "https://www.data.jma.go.jp/obd/stats/data/mdrr/tem_rct/alltable/mntemsadext00_rct.csv",
            dataType: 'text',
            timeOut: 50000,
            cache: false,
            success: function(data){
              lastGet.jmaTableCsvMntemsadext00_rct = getCTime();
              weather_mntemsadext = [];
              var weatherDataListCSV = [];
              var tmp = data.split("\n");
              for (var i=0; i<tmp.length-1; i++) {
                weatherDataListCSV[i] = tmp[i].split(',');
              }
              var i
              for (i=1; i<weatherDataListCSV.length; i++) {
                var obj = {pref:"", name:"", value: 0};
                obj.pref = weatherDataListCSV[i][1];
                obj.name = weatherDataListCSV[i][2];
                obj.value = Number(weatherDataListCSV[i][9]);
                if(Number(weatherDataListCSV[i][10])>3)weather_mntemsadext.push(obj);
                if(weather_prelist[4].indexOf(weatherDataListCSV[i][1])==-1)weather_prelist[4].push(weatherDataListCSV[i][1]);
              }
              var s="";i=0;
              var spdl = document.getElementsByClassName('wpl4'); //SetPrefectureDataList
              for(var variable of weather_prelist[4]){
                if(spdl[i]===undefined){
                  s += "<input type='checkbox' class='wpl4' value='"+variable+"' checked>";
                  s += variable;
                  s += "<br>";
                } else {
                  s += "<input type='checkbox' class='wpl4' value='"+variable+"'" + (spdl[i].checked ? " checked" : "") + ">";
                  s += variable;
                  s += "<br>";
                }
                i++;
              }
              document.getElementById('main5').innerHTML = s;
              var cn = document.getElementsByClassName('wpl4');
              var wpll = [];
              for(var i=0; i<cn.length; i++){
                if(cn[i].checked){
                  wpll.push(cn[i].value);
                }
              }
              weather_mntemsadext = weather_mntemsadext.filter(function(a){return wpll.indexOf(a.pref)!=-1});
              weather_mntemsadext.sort(function(a,b){return a.value-b.value});
              weather_mntemsadextstr = "[Minimum temperature]　　　";
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
        })
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

function notification(a, b, c, d, e){
  switch (a) {
    case "create":
      chrome.notifications.create(d, {
          iconUrl: 'img/icon128.png',
          type: 'basic',
          title: b,
          message: c,
          priority: e
      });
      break;
      //b:title, c:message, d:notificationid, e:priority
    case "update":
      chrome.notifications.update(d, {
          iconUrl: 'img/icon128.png',
          type: 'basic',
          title: b,
          message: c,
          priority: e
      });
      break;
      //b:title, c:message, d:notificationid, e:priority
    case "clear":
      chrome.notifications.clear(b)
      break;
      //b:notificationid
    default:
      console.error("Error: Notification type error");
      break;
  }
}
function background_send(message){
  chrome.runtime.sendMessage(message, function(response){});
}
chrome.notifications.onClicked.addListener(function(c){
    console.log(background_send("open"));
});

var timetableStr = "";
function timetable() {
  $(function(){
      $.ajax({
          type: 'GET',
          url: "https://smtgvs.weathernews.jp/a/solive_timetable/timetable.json",
          dataType: 'json',
          cache: false,
          success: function(data){
            lastGet.wniliveTimeTable = getCTime();
            timetableStr = "";
            data.forEach(function(value){
              timetableStr += value.hour+" → "+value.title+"　　";
            })
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Loading Error (WeathernewsTimetable)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
      })
  })
}

var weatherTitle = [],
    weatherContent = [],
    weatherTime = [],
    weatherlink = [],
    breakingtime = -1,
    dosyasaigaikeikaijouhou = 0,
    BNtextarray = [];
//“台風(TY)”、“台風(STS)”、“台風(TS)”、“熱帯低気圧(TD)”、“ハリケーン(Hurricane)”、“発達した熱帯低気圧(Tropical Storm)”、“温帯低気圧(LOW)”
var typhoon = {
  number: '2001',
  name: {
    kana: 'ヴォンフォン',
    eng: 'VONGFONG'
  },
  information: [
    {
      time: '0',
      timed: new Date('2000/01/01 00:00:00'),
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
      timed: new Date('2000/01/02 00:00:00'),
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
      timed: new Date('2000/01/03 00:00:00'),
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
      timed: new Date('2000/01/04 00:00:00'),
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
};
var mem = [],
    testweather = ["",""];
function weatherInfo(){
  $(function(){
      $.ajax({
          type: 'GET',
          url: "http://www.data.jma.go.jp/developer/xml/feed/extra.xml",
          dataType: 'xml',
          cache: false,
          success: function(data){
            let performWeatherStartAt = performance.now() * 1000;
            lastGet.jmaDevFeedExtra = getCTime();
            weatherTitle = [];
            weatherContent = [];
            weatherTime = [];
            if(mode!=2 && mode!=1){
              var arr = [];
              var isChange = true;
              $(data).find('entry').each(function(){
                  if(weatherlink.indexOf($(this).find('link').attr('href'))!=-1){
                    isChange = false;
                  }
                  weatherTitle.push($(this).find('title').text());
                  weatherContent.push($(this).find('content').text());
                  var now = new Date($(this).find('updated').text());
                  var fortime = getFormattedDate(1, true, now);
                  weatherTime.push(fortime.year+"/"+fortime.month+"/"+fortime.date+" "+fortime.hour+":"+fortime.minute+":"+fortime.second);
                  arr.push($(this).find('link').attr('href'));
                  if(isChange && $(this).find('title').text()!="早期天候情報" && $(this).find('title').text()!="気象警報・注意報" && $(this).find('title').text()!="気象特別警報・警報・注意報"){
                    //BNtitle = $(this).find('title').text().replace("（Ｈ２７）", "");
                    //BNtext1 = ($(this).find('content').text()).split("】")[0]+"】";
                    //BNtext2 = ($(this).find('content').text()).split("】")[1];
                    dosyasaigaikeikaijouhou = 0;
                    if($(this).find('title').text() == "土砂災害警戒情報" && startTime <= 300){
                      //BNtext2.push(($(this).find('content').text()).split("】")[2]);
                      //dosyasaigaikeikaijouhou = ($(this).find('content').text()).split("】").length-1;
                      //breakingtime = dosyasaigaikeikaijouhou*300;
                      //BNtextarray = (($(this).find('content').text()).split("】")[2]);//.split("＜");
                      //play(sounds.warning.GroundLoosening, document.getElementById('volGL').valueAsNumber/100);
                      isChange = false;
                    }
                    if($(this).find('title').text() == "指定河川洪水予報"){
                      //if(($(this).find('content').text()).split("】").length==3)BNtext2 += "】"+($(this).find('content').text()).split("】")[2];
                      console.log($(this).find('content').text())
                      isChange = false;
                    }
                  }
                  if(startTime > 300 && isChange && $(this).find('title').text()=="気象警報・注意報（Ｈ２７）"){
                    $.ajax({
                        type: 'GET',
                        url: $(this).find('link').attr('href'),
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          var t = "";
                          var announcement = {}, clear = {};
                          // console.log("");
                          forEach2($($(c).find('Body Warning')[1]).find('Item'), function(int){
                              // console.log(int);
                              forEach2($(int).find('Kind'), function(int2){
                                  if($(int2).find('Status').text() != "発表警報・注意報はなし"){
                                    if($(int2).find('Status').text() == "発表"){
                                      /*if($($(c).find('Body Warning')[0]).find('Item').length == 1 && $($(c).find('Body Warning')[0]).find('Item Area Name').text()!="網走・北見・紋別地方"){
                                        t += $($(c).find('Body Warning')[0]).find('Item Area Code').text();
                                      }*/
                                      if(announcement[$($(int2).find('Name')[0]).text()] === undefined)announcement[$($(int2).find('Name')[0]).text()] = [];
                                      announcement[$($(int2).find('Name')[0]).text()].push(AreaForecastLocalM.warn[$(int).find('Area Code').text()]);
                                      //t += AreaForecastLocalM.warn[$(int).find('Area Code').text()] + "に" + $($(int2).find('Name')[0]).text() + "発表　";
                                    } else if($(int2).find('Status').text() != "継続") {
                                      //t += AreaForecastLocalM.warn[$(int).find('Area Code').text()] + "の" + $($(int2).find('Name')[0]).text() + "は解除　";
                                      if(clear[$($(int2).find('Name')[0]).text()] === undefined)clear[$($(int2).find('Name')[0]).text()] = [];
                                      clear[$($(int2).find('Name')[0]).text()].push(AreaForecastLocalM.warn[$(int).find('Area Code').text()]);
                                    }
                                  }
                              });
                          });
                          for(var key in announcement){
                            t += announcement[key].join("・") + "に" + key + "発表　";
                          }
                          for(var key in clear){
                            t += clear[key].join("・") + "の" + key + "は解除　";
                          }
                          // console.log(t);
                          if(t != ""){
                            mode = 3;
                            breakingtime += 900;
                            BNtitle.push("【" + $(c).find('Report > Head > Title').text() + "】");
                            BNtext1.push($(c).find('Report > Head > Headline > Text').text());
                            BNtext2.push(t);
                          }
                          //document.getElementById('tsunamiList').innerText += t;
                        }
                    })
                  }
                  let performWeatherLoadStartAt = performance.now() * 1000;
                  if(startTime > 300 && isChange){
                    if($(this).find('title').text()=="竜巻注意情報"){
                      $.ajax({
                          type: 'GET',
                          url: $(this).find('link').attr('href'),
                          dataType: 'xml',
                          cache: true,
                          success: function(c){
                            let performWeatherLoadEndAt = performance.now() * 1000;
                            var announcement = {},
                                clear = {};
                            var all_clear = true;
                            forEach2($(c).find('Body > Warning[type="竜巻注意情報（一次細分区域等）"] > Item'), function(int, r){
                                mode = 3;
                                breakingtime += 900;
                                var t = "";
                                if(Number($(c).find('Code').text())){
                                  t += AreaForecastLocalM.tornado[$(int).find('Area > Code').text()];
                                  BNtitle.push($(c).find('Head > Title').text()+"　第"+$(c).find('Serial').text()+"報");
                                  BNtext1.push($(c).find('Head > Headline > Text').text());
                                  BNtext2.push(t+"に竜巻注意情報が発表されています。");
                                  // BNtitle.push("Hazardous wind watch is in effect.");
                                  // BNtext1.push($(c).find('Head > Headline > Text').text());
                                  // BNtext2.push(t+"に竜巻注意情報が発表されています。");
                                }
                                play(sounds.warning.Notice, document.getElementById('volNtc').valueAsNumber/100);
                            });
                            document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                            // if(t != ""){
                            // }
                            // 【竜巻注意情報（第3報）】山梨県中・西部、東部・富士五湖：06日19時50分まで有効
                            // Head > Serial : 第○報
                            // ValidDateTime : 有効期限
                          }
                      });
                    } else if(($(this).find('title').text()).search("記録的短時間大雨情報")!=-1){
                      $.ajax({
                          type: 'GET',
                          url: $(this).find('link').attr('href'),
                          dataType: 'xml',
                          cache: true,
                          success: function(c){
                            let performWeatherLoadEndAt = performance.now() * 1000;
                            if($(c).find('HeadLine > Information > Item > Kind > Code').text() == "1"){
                              mode = 3;
                              breakingtime += 900;
                              BNtitle.push('記録的短時間大雨情報');
                              BNtext1.push($(c).find('Report > Head > Title').text());
                              BNtext2.push($(c).find('Headline > Text').text());
                              BNtitle.push('Heavy rain information');
                              BNtext1.push($(c).find('Report > Head > Title').text());
                              BNtext2.push($(c).find('Headline > Text').text());
                              play(sounds.warning.Notice, document.getElementById('volNtc').valueAsNumber/100);
                            }
                            document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                          }
                      });
                    } else if($(this).find('title').text()=="土砂災害警戒情報"){
                      $.ajax({
                        type: 'GET',
                        url: $(this).find('link').attr('href'),
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let performWeatherLoadEndAt = performance.now() * 1000;
                          if($(c).find('Headline > Information > Item > Kind > Condition').text()=="解除"){
                            mode = 3;
                            breakingtime += 900;
                            BNtitle.push('土砂災害警戒情報 解除');
                            BNtext1.push($(c).find('Headline > Text').text());
                            BNtext2.push("<土砂災害警戒情報　解除>　対象地域："+$(c).find('TargetArea > Name').text());
                          } else {
                            mode = 3;
                            breakingtime += 900;
                            BNtitle.push('土砂災害警戒情報 発表 / 警戒レベル４');
                            BNtext1.push($(c).find('Headline > Text').text());
                            BNtext2.push("<土砂災害警戒情報　発表>　対象地域："+$(c).find('TargetArea > Name').text());
                            play(sounds.warning.GroundLoosening, document.getElementById('volGL').valueAsNumber/100);
                          }
                          document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                        }
                      })
                    } else if($(this).find('title').text()=="台風解析・予報情報（３日予報）"){
                      $.ajax({
                        type: 'GET',
                        url: $(this).find('link').attr('href'),
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let performWeatherLoadEndAt = performance.now() * 1000;
                          typhoon = {};
                          typhoon.targetTime = new Date($(c).find('Report > Head > TargetDateTime').text());
                          typhoon.number = ($(c).find('Report > Head > EventID').text()).slice(2);
                          typhoon.kind = $(c).find('Report > Body > MeteorologicalInfos > MeteorologicalInfo > Item > Kind > Property > TyphoonNamePart > Remark').text();
                          var typhoon_infos = $(c).find('Report > Body > MeteorologicalInfos > MeteorologicalInfo');
                          typhoon.name = {};
                          typhoon.name.kana = $(typhoon_infos[0]).find('Item > Kind > Property > TyphoonNamePart > NameKana').text();
                          typhoon.name.eng = $(typhoon_infos[0]).find('Item > Kind > Property > TyphoonNamePart > Name').text();
                          typhoon.information = [];
                          mem.push(typhoon_infos);
                          forEach2(typhoon_infos, function(c, i){
                              typhoon.information.push({
                                  time: $(c).find('DateTime').attr('type')=="実況" ? 0 : Number(zenkakuToHankaku(($(c).find('DateTime').attr('type')).slice(3,-3))),
                                  timed: new Date($(c).find('DateTime').text()),
                                  speed: {},
                                  wind: {
                                    speed: {
                                      knot: [],
                                      ms: []
                                    },
                                    warningArea: {
                                      alert: {
                                        axis: []
                                      },
                                      caution: {
                                        axis: []
                                      }
                                    }
                                  }
                              });
                              var mt = 0;
                              forEach2($(c).find('Item > Kind'), function(c2){
                                  switch ($(c2).find('Property > Type')) {
                                    // $(c2).find('Property > ClassPart').children()
                                    case '階級':
                                      forEach2($(c2).find('Property > ClassPart').children(), function(c3){
                                        switch (c3.localName) {
                                          case "TyphoonClass":
                                            typhoon.information[mt].class = $(c3).text();
                                            break;
                                          case "AreaClass":
                                            break;
                                          case "IntensityClass":
                                            typhoon.information[mt].intensity = $(c3).text();
                                            break;
                                        }
                                      });
                                      break;
                                    case '中心':
                                      forEach2($(c2).find('Property > CenterPart').children(), function(c3){
                                        switch (c3.localName) {
                                          case "Coordinate":
                                            //typhoon.information[mt].class = $(c3).text();
                                            break;
                                          case "Direction":
                                            typhoon.coordinate.name = $(c3).text();
                                            break;
                                          case "Speed":
                                            switch (c3.attributes.unit.value) {
                                              case "ノット":
                                                typhoon.information[mt].speed.knot = Number($(c3).text());
                                                break;
                                              case "km/h":
                                                typhoon.information[mt].speed.kmh = Number($(c3).text());
                                                break;
                                            }
                                            break;
                                          case "Pressure":
                                            typhoon.information[mt].pressure = Number($(c3).text());
                                            break;
                                          case "Direction":
                                            typhoon.information[mt].direction = $(c3).text();
                                            break;
                                        }
                                      });
                                      typhoon.information[mt].location = $(c2).find('Property > CenterPart > Location').text();
                                      // typhoon.information[mt].speed.knot = Number($(c2).find('Property > CenterPart > jmx_eb:Speed[unit="ノット"]').text());
                                      // typhoon.information[mt].speed.kmh = Number($(c2).find('Property > CenterPart > jmx_eb:Speed[unit="km/h"]').text());
                                      // typhoon.information[mt].pressure = Number($(c2).find('Property > CenterPart > jmx_eb:Pressure').text());
                                      break;
                                    case '風':
                                      forEach2($(c2).find('Property > WindPart').children(), function(c3){
                                        switch (c3.attributes.type) {
                                          case "最大風速":
                                            switch (c3.attributes.unit) {
                                              case "ノット":
                                                typhoon.information[mt].wind.speed.knot[0] = Number($(c3).text());
                                                break;
                                              case "m/s":
                                                typhoon.information[mt].wind.speed.ms[0] = Number($(c3).text());
                                                break;
                                            }
                                            break;
                                          case "最大瞬間風速":
                                            switch (c3.attributes.unit) {
                                              case "ノット":
                                                typhoon.information[mt].wind.speed.knot[1] = Number($(c3).text());
                                                break;
                                              case "m/s":
                                                typhoon.information[mt].wind.speed.ms[1] = Number($(c3).text());
                                                break;
                                            }
                                            break;
                                        }
                                      });
                                      // typhoon.information[mt].wind.speed.knot[0] = Number($(c2).find('Property > WindPart > jmx_eb:WindSpeed[type="最大風速"][unit="ノット"]').text());
                                      // typhoon.information[mt].wind.speed.ms[0] = Number($(c2).find('Property > WindPart > jmx_eb:WindSpeed[type="最大風速"][unit="m/s"]').text());
                                      // typhoon.information[mt].wind.speed.knot[1] = Number($(c2).find('Property > WindPart > jmx_eb:WindSpeed[type="最大瞬間風速"][unit="ノット"]').text());
                                      // typhoon.information[mt].wind.speed.ms[1] = Number($(c2).find('Property > WindPart > jmx_eb:WindSpeed[type="最大瞬間風速"][unit="m/s"]').text());
                                      forEach2($(c2).find('Property > WarningAreaPart[type="暴風域"] > jmx_eb:Circle > jmx_eb:Axes'), function(c3){
                                          typhoon.information[mt].wind.warningArea.alert.axis.push({
                                            direction: $(c3).find('jmx_eb:Direction[type="方向"]').text()=="" ? 'all' : $(c3).find('jmx_eb:Direction[type="方向"]').text(),
                                            radius: {
                                              sea_mile: Number($(c3).find('jmx_eb:Radius[unit="海里"]').text()),
                                              km: Number($(c3).find('jmx_eb:Radius[unit="km"]').text())
                                            }
                                          });
                                      });
                                      forEach2($(c2).find('Property > WarningAreaPart[type="強風域"] > jmx_eb:Circle > jmx_eb:Axes'), function(c3){
                                          typhoon.information[mt].wind.warningArea.caution.axis.push({
                                            direction: $(c3).find('jmx_eb:Direction[type="方向"]').text()=="" ? 'all' : $(c3).find('jmx_eb:Direction[type="方向"]').text(),
                                            radius: {
                                              sea_mile: Number($(c3).find('jmx_eb:Radius[unit="海里"]').text()),
                                              km: Number($(c3).find('jmx_eb:Radius[unit="km"]').text())
                                            }
                                          });
                                      });
                                      break;
                                  }
                                  mt++;
                              });
                          });
                          document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                        }
                      })
                    } else if($(this).find('title').text()=="気象特別警報報知") {
                      $.ajax({
                        type: 'GET',
                        url: $(this).find('link').attr('href'),
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let performWeatherLoadEndAt = performance.now() * 1000;
                          if($(c).find('Head > Headline > Information[type="気象特別警報報知（市町村等）"] > Item > Kind > Name') != "解除"){
                            BNtitle.push('【特別警報発表中】');
                            BNtext1.push('特別警報が発表されています。何らかの災害が既に発生している可能性が高く、警戒レベル最大(5)に相当する状況です。');
                            BNtext2.push('警戒レベル５相当');
                            breakingtime += 900;
                            forEach2($(c).find('Head > Headline > Information[type="気象特別警報報知（市町村等）"] > Item'), function(e2){
                              BNtitle.push("【 "+$(e2).find('Kind > Name').text()+"発表 】");
                              BNtext2.push($(c).find('Head > Headline > Information[type="気象特別警報報知（府県予報区等）"] > Item > Areas > Area > Name').text() + $(e2).find('Areas > Area > Name').text());
                              BNtext1.push("次の地域に" + $(e2).find('Kind > Name').text() + "が発表されています。最大級の警戒をしてください。");
                              breakingtime += 900;
                            });
                            play(sounds.warning.Emergency, document.getElementById('volSpW').valueAsNumber/100);
                          }
                          document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                        }
                      });
                    } else if($(this).find('title').text() == "指定河川洪水予報"){
                      $.ajax({
                        type: 'GET',
                        url: $(this).find('link').attr('href'),
                        dataType: 'xml',
                        cache: true,
                        success: function(c){
                          let performWeatherLoadEndAt = performance.now() * 1000;
                          var level = Number($(c).find('Headline > Information[type="指定河川洪水予報（河川）"]').text());
                          var t1="",t2="",t="";
                          if(ifrange(level, 50, 51)){
                            play(sounds.warning.Emergency, document.getElementById('volSpW').valueAsNumber/100);
                            for(var i=0; i<5; i++){
                              BNtitle.push("【 氾濫発生情報 / 警戒レベル５ 】");
                              BNtext1.push($(c).find('Body > Warning:first > Item > Kind > Property > Text').text());
                              BNtext2.push($(c).find('Headline > Information[type="指定河川洪水予報（予報区域）"] > Item > Areas > Area > Name').text() + "では、" + $(c).find('Body > Warning > Item > Stations > Station > Location').text() + "付近において氾濫が発生。");
                              breakingtime += 900;
                            }
                          } else if(ifrange(level, 40, 41)){
                            BNtitle.push("【 氾濫危険情報 / 警戒レベル４ 】");
                            BNtext1.push($(c).find(''));
                            BNtext2.push($(c).find(''));
                            breakingtime += 900;
                          }
                        }
                      });
                      document.getElementById("dbPfWeather").innerText = "気象情報処理セクション：" + (window.performance.now()*1000-performWeatherStartAt) + "ms (Load: " + (performWeatherLoadEndAt-performWeatherLoadStartAt) + "μs)";
                    }
                  }
              });
              weatherlink = arr;
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            if(textStatus=="timeout")console.warn("接続がタイムアウトしました。("+XMLHttpRequest.status+")"); else console.log("Loading Error (WeatherInformation)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus /*+ "\nerrorThrown: " + errorThrown.message*/);
          }
      })
  });
}
//  latest update: 2020/06/13
/**
 *  不足分:
 *  早期天候情報
 *  府県気象情報　|ほぼ文章
 *  地方気象情報　|ほぼ文章
 *  全般気象情報
 *  指定河川洪水予報
 *  台風解析・予報情報（３日予報）
 */
function rogukakunin(){
  console.log("breakingtime:",breakingtime);
  console.log("BNtitle",BNtitle);
  console.log("BNtext1",BNtext1);
  console.log("BNtext2",BNtext2);
}
function ifrange(n, e1, e2, cd=[0,0]){
  let r1, r2, r0;
  if(cd[0]==0)r1=(e1<=n);else r1=(e1<n);
  if(cd[1]==0)r2=(n<=e2);else r2=(n<e2);
  r0=r1&&r2;
  return r0;
}

function jma_earthquake(){
  $(function(){
      $.ajax({
        type: 'GET',
        url: "http://www.data.jma.go.jp/developer/xml/feed/eqvol.xml",
        dataType: 'xml',
        cache: false,
        success: function(c){
          forEach2($(c).find('entry'), function(c){
              if($(c).find('title').text() == "震源・震度に関する情報" && ($(c).find('content').text()).slice(1,5) == "遠地地震"){

              }
          });
        }
      })
  })
}

function toFull(str){
  return str.replace(/[A-Za-z0-9]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)
  }).replace(/</g, "［").replace(/>/g, "］");
}

function reflect(md){
  timeCount = 1;
  earthquake_telop_times = magnitude!="--" ? 0 : -1027;
  earthquake_telop_remaining = 1500;
  if(md == 1){
    if(msi > 4)msi++;
    siHnum = document.siHform.siH.selectedIndex;
    siHstr = document.siHform.siH.options[siHnum].value;
    msi = Number(siHstr);
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = document.getElementById("mag").value;
    epicenter = document.getElementById("epi").value;
    epicenter_id = epicenter_list[0].indexOf(epicenter);
    if(epicenter_id==-1)epicenter_id--;
    depth = document.getElementById("dep").value;
    timeYY = document.getElementById("year").value;
    timeMM = document.getElementById("month").value;
    timeDD = document.getElementById("day").value;
    timeH = document.getElementById("hour").value;
    timeM = document.getElementById("minute").value;
    Text[1] = document.getElementById("1").value;
    Text[2] = document.getElementById("2").value;
    Text[3] = document.getElementById("3").value;
    Text[4] = document.getElementById("4").value;
    Text[5] = document.getElementById("5弱以上と推定").value;
    Text[6] = document.getElementById("5弱").value;
    Text[7] = document.getElementById("5強").value;
    Text[8] = document.getElementById("6弱").value;
    Text[9] = document.getElementById("6強").value;
    Text[10] = document.getElementById("7").value;
  }
  if(magnitude!="--"){
    Text[0] = timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。　震源は"+epicenter+"、地震の規模を示すマグニチュードは"+magnitude;
    if(depth == "ごく浅い")Text[0] += "、震源は"+depth+"です。"; else Text[0] += "、震源の深さは"+depth+"kmです。";
    if(md == 0)Text[0] += document.getElementById("ps").value;
  } else {
    Text[0] = "<<震度速報>> "+timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 "+multilingual[0][63];
    if(epicenter.substr(-1) == "沖" || epicenter.substr(-1) == "湾" || epicenter.substr(-1) == "海"){
      if(msi < 5)Text[0] += "震源が沖の場合、津波が発生する恐れがあります。海岸から離れるようにしてください。";
    }
  }
  if(magnitude!="--"){
    Text[0] += "　　　　　　　　　An earthquake had occurred at around "+timeH+":"+timeM+" (JST). The region name was " + epicenter_list[1][epicenter_id] + ". The magnitude of earthquake was estimated at "+magnitude+". This earthquake resulted in " + nhkSiList[msi]+" of the maximum seismic intensity recorded.";
    if(depth == "ごく浅い")Text[0] += " The depth was very shallow."; else Text[0] += " The depth was "+depth+"km.";
    if(md == 0)Text[0] += document.getElementById("ps").value;
  } else {
    Text[0] += "　　　　　　　The earthquake has just occurred.  This earthquake resulted in "+nhkSiList[msi]+" of the maximum seismic intensity recorded.  "+multilingual[1][63];
    if(msi > 5){ // NOTE: AM PM表記の方がいいよね
      //Text[0] = "震源が海底ですと、津波が発生する恐れがあります。海岸から離れるようにしてください。"
    }
  }
  // NOTE: (時間)頃、地震が発生しました。この地震により、最大震度5+を観測しています。
  // NOTE: (time)頃、(area)の深さ(depth)kmの場所で、マグニチュード(M)の地震が発生しました。この地震により観測された最大震度は(intensity)です。
  //  英語版は気象庁震度はあまり重要視しない方が良いかも？
  // An earthquake has just occurred.
  // 一応気象庁の多言語辞書に従っておきます。
  if(Number(document.getElementsByName("minint")[0].value)<=msi && ((Number(document.getElementsByName("minmag")[0].value)<=Number(magnitude) && Number(document.getElementsByName("depmin")[0].value)>=Number(depth=="ごく浅い"?0:depth))||magnitude=="--")){
    document.title="NaturalDisasterViewer(NDV) / eqVi - 地震情報";//document.title="eqVi - 地震情報";
    mode = 2;
    language = "Ja";
    tx = 1200;
  } //IVit//TicInfo//InfiniTicker//InformationCenter
  var titletext = "", windtext = "";
  if(magnitude!="--")titletext = "[地震情報](" + timeH + ":" + timeM + "頃発生) 震源地:" + epicenter + " 最大震度:" + siList[msi] + " M" + magnitude + " 深さ:" + ((depth == "ごく浅い")?depth:"約"+depth+"km"); else titletext = "＜震度速報＞　" + timeH + "時" + timeM + "分頃発生　最大震度" + siList[msi];
  document.getElementById("eiTitle").innerHTML = titletext;
  document.getElementById("eiTitle").scrollLeft = 365;
  document.getElementById("eiwind").innerHTML = "";
  if(msi==-1){
    document.getElementById("eiTitle").innerHTML = "まだ情報は入っていません。";
    document.getElementById("eiwind").innerHTML = "There is no information yet."
  } else {
    for(var i=10; i>0; i--){
      if(Text[i] != ""){
        windtext += "［震度" + toFull(siList[i]) + "］<br>　" + ( (!isSokuho) ? (Text[i].replace(/　 </g, '<br>　').slice(1)) : (Text[i].replace(/　 </g, '<br>　')) ).replace(/> /g, '：') + "<br>";
      }
    }
    document.getElementById("eiwind").innerHTML = windtext;
    if(document.getElementById("setClipQuake").checked)copy(titletext + "\n\n" + windtext.replaceAll("<br>","\n"));
  }
  /*var speakText = "先ほど、最大震度" + siList[msi] + "を観測する地震が発生しました";
  for(var i=10; i>0; i--){
    if(Text[i] != ""){
      speakText += "。震度" + siList[i] + "を観測した地域は、次の通りです。" + Text[i].replace(/> /g, '').replace(/ /g, '。');
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

function loadMScale() {
  $(function(){
      $.ajax({
          type: 'GET',
          url: 'http://weathernews.jp/mscale/json/scale.json',
          dataType: 'json',
          timeout: 1200,
          success: function(data){
            lastGet.wniMScale = getCTime();
            mscale = data['mscale']-1;
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Loading Error (MScale)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
      })
  })
}

var change = {
  "みよし市": "愛知みよし市",
  "加美町": "宮城加美町",
  "塩釜市": "塩竈市",
  "広野町": "福島広野町",
  "さくら市": "栃木さくら市",
  "鹿嶋市": "茨城鹿嶋市",
  "下蒲刈島": "呉市",
  "姫路市家島": "姫路市",
  "今治市大島": "今治市",
  "大三島": "今治市",
  "諏訪之瀬島": "鹿児島十島村",
  "大樹町": "十勝大樹町",
  "北海道清水町": "十勝清水町",
  "北海道池田町": "十勝池田町",
  "酒田市飛島": "酒田市",
  "古河市": "茨城古河市",
  "小笠原母島": "小笠原村",
  "悪石島": "鹿児島十島村",
  "喜界島": "喜界町",
  "伊豆大島": "伊豆大島町",
  "新島": "新島村",
  "式根島": "新島村",
  "神津島": "神津島村",
  "三宅島": "三宅村",
  "北杜市": "山梨北杜市",
  "竹富町西表島": "竹富町",
  "松山市中島": "松山市",
  "都農町": "宮崎都農町",
  "生口島": "尾道市",
  "中川町": "上川中川町",
  "多良間島": "多良間村",
  "八丈島": "八丈町",
  "枝幸町": "宗谷枝幸町",
  "請島": "瀬戸内町",
  "加計呂麻島": "瀬戸内町",
  "伊平屋島": "伊平屋村",
  "伊是名島": "伊是名村",
  "利島": "東京利島村",
  "北海道伊達市": "胆振伊達市",
  "北海道森町": "渡島森町",
  "北海道日高町": "日高地方日高町",
  "洋野町": "岩手洋野町",
  "北海道伊達市": "胆振伊達市",
  "北斗市": "渡島北斗市",
  "北海道松前町": "渡島松前町",
  "大井町": "神奈川大井町",
  "川崎区": "川崎川崎区",
  "三島村竹島": "三島村",
  "江差町": "檜山江差町",
  "出水市": "鹿児島出水市",
  "竹富町黒島": "竹富町",
  "竹富町波照間島": "竹富町",
  "石垣島": "石垣市",
  "小笠原父島": "小笠原村",
  "中之島": "鹿児島十島村",
  "山県市": "岐阜山県市",
  "佐倉市": "千葉佐倉市",
  "三芳町": "埼玉三芳町",
  "粟国島": "粟国村",
  "神川町": "埼玉神川町",
  "伊江島": "伊江村",
  "久米島": "久米島町",
  "渡名喜島": "渡名喜村",
  "与那国島": "与那国町",
  "御蔵島": "御蔵島村",
  "おおい町": "福井おおい町",
  "古河市": "茨城古河市",
  "岬町": "大阪岬町",
  "鬼北町": "鬼北町",
  "輪島市舳倉島": "輪島市",
  "坂井市": "福井坂井市",
  "若狭町": "福井若狭町",
  "津島市": "愛知津島市",
  "呉市豊島": "呉市",
  "大崎下島": "呉市",
  "尾道市向島": "尾道市",
  "三次市": "広島三次市",
  "鬼北町": "愛媛鬼北町",
  "倉橋島": "呉市",
  "上蒲刈島": "呉市",
  "因島": "尾道市",
  "生口島": "尾道市",
  "香南市": "高知香南市",
  "津野町": "高知津野町",
  "上野村": "群馬上野村",
  "与路島": "瀬戸内町",
  "伯方島": "今治市",
  "三島村硫黄島": "三島村",
  "印南町": "和歌山印南町",
  "上川町": "上川地方上川町",
  "御蔵島": "御蔵島村",
  "青ヶ島": "青ヶ島村",
  "平島": "鹿児島十島村",
  "堺中区": "大阪堺市中区",
  "堺南区": "大阪堺市南区",
  "堺美原区": "大阪堺市美原区",
  "和泉市": "大阪和泉市",
  "南大東島": "南大東村",
  "北大東島": "北大東村",
  "小宝島": "鹿児島十島村",
  "宝島": "鹿児島十島村"
};

//var akakaka = "https://www3.nhk.or.jp/sokuho/jishin/data/JSA0191122180517_20191122180912.xml";
var akakaka = "";
var isSokuho = false;
var testflg = false;
var lasteqlist = "";
// function pastEarthquakeChecking(id){
//   if(earthquakes_log[id] === undefined){
//     return false;
//   } else {
//     mode = 2;
//     epicenter = earthquakes_log[id].epicenter;
//     magnitude = earthquakes_log[id].magnitude;
//     depth = earthquakes_log[id].depth;
//     timeDD = earthquakes_log[id].timeDD;
//     timeH = earthquakes_log[id].timeH;
//     timeM = earthquakes_log[id].timeM;
//     msi = earthquakes_log[id].msi;
//     seismic_intensity = earthquakes_log[id].seismic_intensity;
//     epicenter_id = earthquakes_log[id].epicenter_id;
//     isSokuho = earthquakes_log[id].isSokuho;
//     Text = earthquakes_log[id].text;
//     language = "Ja";
//     tx = 1200;
//     timeCount = 1;
//     earthquake_telop_times = magnitude!="--" ? 0 : -1027;
//     earthquake_telop_remaining = 1500;
//     if(magnitude!="--"){
//       Text[0] = timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。　震源は"+epicenter+"、地震の規模を示すマグニチュードは"+magnitude;
//       if(depth == "ごく浅い")Text[0] += "、震源は"+depth+"です。"; else Text[0] += "、震源の深さは"+depth+"kmです。";
//     } else {
//       Text[0] = "<<震度速報>> "+timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 "+multilingual[0][63];
//       if(epicenter.substr(-1) == "沖" || epicenter.substr(-1) == "湾" || epicenter.substr(-1) == "海"){
//         if(msi < 5)Text[0] += "震源が沖の場合、津波が発生する恐れがあります。海岸から離れるようにしてください。";
//       }
//     }
//     if(magnitude!="--"){
//       Text[0] += "　　　　　　　　　An earthquake has just occurred. The hypocenter is " + epicenter_list[1][epicenter_id] + ". This earthquake resulted in " + nhkSiList[msi]+" of the maximum seismic intensity recorded. The magnitude of earthquake is estimated at "+magnitude+".";
//       if(depth == "ごく浅い")Text[0] += " The depth is very shallow."; else Text[0] += " The depth is "+depth+"km.";
//     } else {
//       Text[0] += "　　　　　　　The earthquake has occurred at "+timeH+":"+timeM+".  This earthquake resulted in "+nhkSiList[msi]+" of the maximum seismic intensity recorded.  "+multilingual[1][63];
//       if(msi > 5){
//         //Text[0] = "震源域が海底ですと、津波が発生する恐れがあります。海岸から離れるようにしてください。"
//       }
//     }
//   }
// }
var num = 0;
var l = [];
// function fl(n){
//   l = [];
//   for (var i = 0; i < n; i++) {
//     l.push(new Function('pastEarthquakeChecking(document.getElementsByName("elo"+'+i+')[0].id);'));
//   }
// }
function earthquakeinformationlist(){
  $(function(){
      $.ajax({
          type: 'GET',
          url: "https://www.nhk.or.jp/weather-data/v1/wx/quake/info/?akey=18cce8ec1fb2982a4e11dd6b1b3efa36",
          dataType: 'json',
          timeout: 1500,
          cache: false,
          success: function(c){
            lastGet.nhkQuake2 = getCTime();
            var eqlist = JSON.stringify(c.quake);
            var q = {
              "S1": '1',
              "S2": '2',
              "S3": '3',
              "S4": '4',
              "S5-": '5弱',
              "S5+": '5強',
              "S6-": '6弱',
              "S6+": '6強',
              "S7": '7',
              "LS5-": '5弱(推定)',
              "LS5+": '5強(推定)',
              "LS6-": '6弱(推定)',
              "LS6+": '6強(推定)',
              "LS7": '7(推定)'
            }
            var eiListHTML = "";
            if(lasteqlist != eqlist){
              c.quake.forEach(function(c2, num){
                var dt = new Date(c2.event_date);
                eiListHTML += '<button type="button" data-e=';
                eiListHTML += num;
                eiListHTML += ' name="elo'+num+'" id="el';
                eiListHTML += c2.event_id;
                eiListHTML += '" style="background-color:';
                eiListHTML += c2.max_shindo=="S1" ? "#f2f2ff" : c2.max_shindo=="S2" ? "#68c8fd" : c2.max_shindo=="S3" ? "#869ffd" : c2.max_shindo=="S4" ? "#fae696" : c2.max_shindo=="S5-" ? "#faf500" : c2.max_shindo=="S5+" ? "#febb6f" : c2.max_shindo=="S6-" ? "#ff2800" : c2.max_shindo=="S6+" ? "#a50021" : c2.max_shindo=="S7" ? "#b40068" : "#ffffff";
                eiListHTML += '; color:';
                eiListHTML += (c2.max_shindo=="S3" || Number(c2.max_shindo.slice(1,2))>6) ? "#fff" : "#000";
                eiListHTML += '" class="eiList-button">';
                if(c2.hypocenter.name=="")eiListHTML += '<span style="color:#fff; background-color:#000 padding:2px;">　';
                eiListHTML += c2.hypocenter.name=="" ? "震源未確定" : c2.hypocenter.name;
                eiListHTML += '　最大震度' + q[c2.max_shindo];
                eiListHTML += '　';
                eiListHTML += dt.getDate() + "日" + dt.getHours() + "時" + dt.getMinutes() + "分頃発生";
                if(c2.hypocenter.name=="")eiListHTML += "　</span>";
                eiListHTML += '</button>';
              });
              document.getElementById("eiList").innerHTML = eiListHTML;
              forEach2(document.getElementsByClassName("eiList-button"), function(c, i){
                c.addEventListener("click", function(e){
                  aa = Number(event.target.getAttribute("data-e"));
                  quakesContainer.view();
                  console.log(
                    e.target.getAttribute("id"),
                    Number(e.target.getAttribute("name").slice(3)),
                    earthquakes_log.hasOwnProperty(e.target.getAttribute("id").slice(2))
                  );
                });
              });
            }
            lasteqlist = JSON.stringify(c.quake);
          }
      });
  });
}
function downloadData(){
  $.ajax({
    type: 'GET',
    url: "https://www3.nhk.or.jp/sokuho/jishin/data/JishinReport.xml",
    dataType: 'xml',
    timeout: 10000,
    cache: false,
    success: function(data) {
      lastGet.nhkQuake1 = getCTime();
      earthquakeinformationlist();
      //console.log(data);
      //console.log($(data).find('item'));
      earthquake_url = [];
      earthquake_area = [];
      var itemCount = 0;
      $(data).find('item').each(function(){
          earthquake_url.push($(this).attr('url'));
          itemCount++;
      });
      /*$(data).find('item').each(function(){
          earthquake_url.push($(this).attr('url'));
          document.getElementById("eiList").innerHTML += '&lt;button type=&quot;button&quot; name="eiList_button" style="background-color:';
          document.getElementById("eiList").innerHTML += $(this).attr('shindo')=="1" ? "#f2f2ff" : $(this).attr('shindo')=="2" ? "#00aaff" : $(this).attr('shindo')=="3" ? "#1441ff" : $(this).attr('shindo')=="4" ? "#fae696" : $(this).attr('shindo')=="5-" ? "#faf500" : $(this).attr('shindo')=="5+" ? "#ff9900" : $(this).attr('shindo')=="6-" ? "#ff2800" : $(this).attr('shindo')=="6+" ? "#a50021" : $(this).attr('shindo')=="7" ? "#b40068" : "#ffffff";
          document.getElementById("eiList").innerHTML += '; color:';
          document.getElementById("eiList").innerHTML += ($(this).attr('shindo')=="3" || Number($(this).attr('shindo').slice(0,1))>5) ? "#fff" : "#000";
          document.getElementById("eiList").innerHTML += '" class="eiList-button"&gt;';
          if($(this).text()=="")document.getElementById("eiList").innerHTML += '&lt;span style="color:white; background-color:#ff2020"&gt;';
          document.getElementById("eiList").innerHTML += $(this).text()=="" ? "震源未確定" : $(this).text();
          document.getElementById("eiList").innerHTML += ' 最大震度' + $(this).attr('shindo');
          document.getElementById("eiList").innerHTML += ' ';
          document.getElementById("eiList").innerHTML += $(this).attr('time');
          document.getElementById("eiList").innerHTML += '発生';
          if($(this).text()=="")document.getElementById("eiList").innerHTML += "　";
          document.getElementById("eiList").innerHTML += '&lt;/span&gt;&lt;/button&gt;';
          itemCount++;
      });

      document.getElementById("eiList").innerHTML = document.getElementById("eiList").innerText;*/
      //console.log(earthquake_url)
      nowTimestamp = earthquake_url[aa];
      if(nowTimestamp != lastTimestamp && lastTimestamp != ""){
        $.ajax({
          type: 'GET',
          url: akakaka!=="" ? akakaka : earthquake_url[aa],
          dataType: 'xml',
          timeout: 1500,
          cache: false,
          success: function(earthquake_ajax2_data){
            $(earthquake_ajax2_data).find('Area').each(function(){
                earthquake_area.push($(this).attr('Name'));
            });

            var cc = [],
                pp = [];

            //console.log(earthquake_area);
            //console.log(earthquake_area);
            if($(earthquake_ajax2_data).find('Local').text() != ""){

              for (var variable in change) {
                if(earthquake_area.indexOf(variable) != -1){
                  earthquake_area.splice(earthquake_area.indexOf(variable), 1, change[variable]);
                }
                //console.log(variable+"  "+change[variable]);
              }

              for (var i = 0; i < earthquake_area.length; i++) {
                cc.push(allcity[allcity.indexOf(earthquake_area[i])]);
                pp.push(allprefecture[allcity.indexOf(earthquake_area[i])]);
              }
              mode = 2;
              earthquake_area = [];
              earthquake_intensity_list = [];
              var earthquake_arealist = [];
              $(earthquake_ajax2_data).find('Group').each(function(){
                  earthquake_area.push('震度' + $(this).attr('Intensity'));
                  $(this).find('Area').each(function(){
                      earthquake_area.push($(this).attr('Name'));
                      earthquake_arealist.push($(this).attr('Name'));
                  })
              });
              for (var variable in change) {
                if(earthquake_area.indexOf(variable) != -1){
                  earthquake_area.splice(earthquake_area.indexOf(variable), 1, change[variable]);
                }
              }
              for (i = 0; i < earthquake_area.length; i++) {
                if(earthquake_area[i].substr(0,2) == "震度"){
                  earthquake_intensity_list.push(earthquake_area[i]);
                  i_earthquake_intensity = earthquake_area[i];
                  earthquake_area.splice(i, 1);
                } else {
                  if(i == 0 && earthquake_area[i].substr(0,2) != '震度'){
                    console.log('Error occurred! \n Please check the data!')
                    console.log('Err data:\n');
                    console.log(earthquake_area);
                  }
                  earthquake_intensity_list.push(i_earthquake_intensity);
                }
              }
              earthquake_area_CityPrefecture = [];
              for (i = 0; i < earthquake_area.length; i++){
                earthquake_area_CityPrefecture.push(cc[i]);
                earthquake_area_CityPrefecture.push(pp[i]);
              }
              earthquake_intensity = $(earthquake_ajax2_data).find('Earthquake').attr('Intensity');
              earthquake_epicenter = $(earthquake_ajax2_data).find('Earthquake').attr('Epicenter');
              earthquake_magnitude = $(earthquake_ajax2_data).find('Earthquake').attr('Magnitude');
              earthquake_depth = $(earthquake_ajax2_data).find('Earthquake').attr('Depth');
              earthquake_time = $(earthquake_ajax2_data).find('Earthquake').attr('Time');
              epicenter_id = epicenter_list[0].indexOf(earthquake_epicenter.replace('北海道', ''));
              if(epicenter_id == -1){
                epicenter_id = epicenter_list[0].indexOf(earthquake_epicenter);
              } else {
                earthquake_epicenter = earthquake_epicenter.replace('北海道', '');
              }
              epicenter = earthquake_epicenter;
              timeYY = earthquake_time.slice(0,4);
              timeMM = earthquake_time.slice(5,7);
              timeDD = earthquake_time.slice(8,10);
              timeH = earthquake_time.slice(11,13);
              timeM = earthquake_time.slice(14,16);


              var earthquake_place_Prefecture = [],
                  earthquake_place_City = [];
              for (var i = 0; i < earthquake_area_CityPrefecture.length; i+=2) {
                earthquake_place_City.push(earthquake_area_CityPrefecture[i]);
              }
              for (var i = 1; i < earthquake_area_CityPrefecture.length; i+=2) {
                earthquake_place_Prefecture.push(earthquake_area_CityPrefecture[i]);
              }
              var earthquake_arealist = [];
              var _a = 0;
              for (var i = 0; i < earthquake_place_City.length; i++) {
                if(earthquake_arealist.indexOf(earthquake_place_City[i]) == -1){
                  earthquake_arealist.push(earthquake_place_City[i]);
                } else {
                  earthquake_place_Prefecture.splice(i-_a, 1);
                  earthquake_intensity_list.splice(i-_a, 1);
                  _a += 1;
                }
              }
              earthquake_place_City = earthquake_arealist;
              var lastInt = 10;
              var nowInt = 9;
              var lastPla = "";
              var lastPre = "";
              var nowPre = "";
              for(var i=1; i<11; i++)Text[i]="";

              var tempList = [];
              earthquake_intensity_list.forEach(function(int){
                int = int.replace('-', '弱');
                int = int.replace('+', '強');
                tempList.push(int);
              });
              earthquake_intensity_list = tempList;
              for (var i = 0; i < earthquake_place_Prefecture.length; i++){
                for(nowInt = 10; earthquake_intensity_list[i]!=("震度"+siList[nowInt]); nowInt--){if(nowInt < 0){break;}}
                if((lastPre != earthquake_place_Prefecture[i]) || (lastInt!=nowInt)){
                  nowPre = earthquake_place_Prefecture[i];
                  Text[nowInt] += ("　 <"+nowPre+">");
                }
                //console.log(Text[nowInt])
                if(lastInt!=nowInt){
                  lastInt = nowInt;
                }
                Text[nowInt] += (" "+earthquake_place_City[i]);
                lastPre = earthquake_place_Prefecture[i];
              }
              for (var i = 1; i <= 10; i++)Text[i] = Text[i].slice(2);

              magnitude = earthquake_magnitude;
              if(earthquake_depth == "ごく浅い")depth = earthquake_depth; else depth = earthquake_depth.slice(0,-2);
              earthquake_intensity = earthquake_intensity.replace('-', '弱');
              earthquake_intensity = earthquake_intensity.replace('+', '強');
              for(msi=10; earthquake_intensity!=siList[msi]; msi--)if(msi<0)break;
              var sm = msi;
              si = msi;
              seismic_intensity = siList[msi];
              isSokuho = false;

              reflect(0);
              quakesContainer.hide();
              earthquakes_log["2"+earthquake_url[aa].slice(45,58)] = {
                epicenter: epicenter,
                magnitude: magnitude,
                msi: msi,
                isSokuho: false,
                seismic_intensity: seismic_intensity,
                depth: depth,
                timeDD: timeDD,
                timeH: timeH,
                timeM: timeM,
                epicenter_id: epicenter_id,
                text: Text
              };
              $('#menu .eiwind').removeClass('SI');

              if(Number(document.getElementsByName("minint")[0].value)<=msi && Number(document.getElementsByName("minmag")[0].value)<=Number(magnitude) && Number(document.getElementsByName("depmin")[0].value)>=Number(depth=="ごく浅い"?0:depth)){
                if(msi < 7)play(sounds.quake.main, earthquakeReceiveVolumeList[sm-1]); else play(sounds.quake.main, earthquakeReceiveVolumeList[sm-1]);
              }
              // End
            } else {
              var earthquake_area2 = earthquake_area;
              earthquake_intensity_list = [];
              earthquake_area = [];
              var tempList = [];
              //console.log(earthquake_ajax2_data);
              $(earthquake_ajax2_data).find('Group').each(function(){
                  earthquake_area.push('震度' + $(this).attr('Intensity'));
                  $(this).find('Area').each(function(){
                      earthquake_area.push($(this).attr('Name'));
                  })
                  //console.log(earthquake_area);
              });
              for (i = 0; i < earthquake_area.length; i++) {
                if(earthquake_area[i].substr(0,2) == "震度"){
                  earthquake_intensity_list.push(earthquake_area[i]);
                  i_earthquake_intensity = earthquake_area[i];
                  earthquake_area.splice(i, 1);
                } else {
                  if(i == 0 && earthquake_area[i].substr(0,2) != '震度'){
                    console.log('Error occurred! \n Please check the data!')
                    console.log('Err data:\n');
                    console.log(earthquake_area);
                  }
                  earthquake_intensity_list.push(i_earthquake_intensity);
                }
              }
              //console.log(earthquake_intensity_list);
              //console.log(earthquake_area2);
              earthquake_intensity_list.forEach(function(int){
                int = int.replace('-', '弱');
                int = int.replace('+', '強');
                tempList.push(int);
              });
              earthquake_intensity_list = tempList;


              var lastInt = 10;
              var nowInt = 10;
              var lastPla = "";
              var lastPre = "";
              var nowPre = "";
              for(var i=1; i<11; i++)Text[i]="";

              for (var i = 0; i < earthquake_area2.length; i++){
                for(nowInt = 10; earthquake_intensity_list[i]!=("震度"+siList[nowInt]); nowInt--){if(nowInt < 0){break;}}
                //console.log(Text[nowInt])
                Text[nowInt] += (" "+shindo_name_[shindo_name.indexOf(earthquake_area2[i])]);
              }
              for (var i = 3; i <= 10; i++)Text[i] = Text[i].slice(1);

              if(epicenter_list.indexOf(earthquake_epicenter.slice(3)) == -1)earthquake_epicenter = earthquake_epicenter.slice(3);
              earthquake_intensity = $(earthquake_ajax2_data).find('Earthquake').attr('Intensity');
              earthquake_epicenter = $(earthquake_ajax2_data).find('Earthquake').attr('Epicenter');
              earthquake_magnitude = $(earthquake_ajax2_data).find('Earthquake').attr('Magnitude');
              earthquake_depth = $(earthquake_ajax2_data).find('Earthquake').attr('Depth');
              earthquake_time = $(earthquake_ajax2_data).find('Earthquake').attr('Time');
              timeYY = earthquake_time.slice(0,4);
              timeMM = earthquake_time.slice(5,7);
              timeDD = earthquake_time.slice(8,10);
              timeH = earthquake_time.slice(11,13);
              timeM = earthquake_time.slice(14,16);

              magnitude = earthquake_magnitude;
              if(earthquake_depth == "ごく浅い")depth = earthquake_depth; else depth = earthquake_depth.slice(0,-2);
              earthquake_epicenter = earthquake_epicenter.replace('北海道', '');
              epicenter = earthquake_epicenter;
              earthquake_intensity = earthquake_intensity.replace('-', '弱');
              earthquake_intensity = earthquake_intensity.replace('+', '強');
              for(msi=10; earthquake_intensity!=siList[msi]; msi--)if(msi<0)break;
              var sm = msi;
              si = msi;
              seismic_intensity = siList[msi];

              if(magnitude == ""){
                magnitude = "--";
                epicenter = "-------------";
                depth = "--";
                epicenter_id = 343;
                $('#menu .eiwind').addClass('SI');
              } else {
                epicenter_id = epicenter_list[0].indexOf(epicenter.replace('北海道', ''));
                $('#menu .eiwind').removeClass('SI');
              }
              isSokuho = true;

              reflect(0);
              earthquakes_log["2"+earthquake_url[aa].slice(45,58)] = {
                epicenter: epicenter,
                magnitude: magnitude,
                msi: msi,
                isSokuho: true,
                seismic_intensity: seismic_intensity,
                depth: depth,
                timeDD: timeDD,
                timeH: timeH,
                timeM: timeM,
                epicenter_id: epicenter_id,
                text: Text
              };

              //console.log(sm);

              if(Number(document.getElementsByName("minint")[0].value)<=msi && ((Number(document.getElementsByName("minmag")[0].value)<=Number(magnitude) && Number(document.getElementsByName("depmin")[0].value)>=Number(depth=="ごく浅い"?0:depth))||magnitude=="--")){
                if(msi < 7)play(sounds.quake.main, earthquakeReceiveVolumeList[sm-1]); else play(sounds.quake.warning, earthquakeReceiveVolumeList[sm-1]);
              }
              // End
            }
          }, error:function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Loading Error (2)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
        })
      }
      lastTimestamp = nowTimestamp;
    }, error:function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("Loading Error (1)\nXMLHttpRequest.readyState:" + XMLHttpRequest.readyState + "\nXMLHttpRequest.status: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
      //textStatus: timeout, error
    }
  })
}

function play(sound, volume=1){
  if(sound.currentTime != 0)sound.currentTime = 0;
  if(volume > 1)volume = 1;
  sound.volume = volume;
  sound.play();
}

var lastp2p = "";
var p2p_elapsedTime = 2405;
  var datakey="",datacount=0;
function humanReadable(){/*
  $(function(){
      $.ajax({
          type: 'GET',
          url: 'https://api.p2pquake.net/v1/human-readable?limit=1',
          dataType: 'json',
          timeout: 10000,
          cache: false,
          success: function(data){
            if(JSON.stringify(data)!=lastp2p && lastp2p!="" && data[0].count>14 && data[0].code==5610){
              datakey="";
              datacount=0;
              for (var key in data[0].regions) {
                if(key == "関東") data[0].regions[key] = data[0].regions[key]/3;
                if(datacount < data[0].regions[key]) datakey = key, datacount = data[0].regions[key];
              }
              p2p_elapsedTime = 0;
            }
            lastp2p = JSON.stringify(data);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Loading Error (HumanReadable)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
      })
  })*/
}

var tsunamiTexts = [];
function loadTsunami(){
/*  $(function(){
      $.ajax({
          type: 'GET',
          url: 'https://api.p2pquake.net/v2/jma/tsunami?limit=1&offset=' + tOffset,
          dataType: 'json',
          timeout: 3000,
          cache: false,
          success: function(data){
            nowTsunamiID = data[0]['id'];
            if(nowTsunamiID != lastTsunamiID){
              tGrade = [];
              tImmediate = [];
              tName = [];
              cancelled = data[0]['cancelled'];
              created_at = data[0]['created_at'];
              var tsunami_areas = data[0]['areas'];
              issue_time = data[0]['issue']['time'];
              for (var i = 0; i < tsunami_areas.length; i++) {
                tGrade.push(tsunami_areas[i]['grade']);
                tImmediate.push(tsunami_areas[i]['immediate']);
                tName.push(tsunami_areas[i]['name']);
              }
              updateFlg = true;
              mode = 0;
              var temp = "";
              if(cancelled !== true){
                for (var i = 0; i < tsunami_areas.length; i++) {
                  temp += (tsunami_areas[i]['grade'] == "Watch") ? "津波注意報　" : (tsunami_areas[i]['grade'] == "Warning") ? "津波警報　　" : (tsunami_areas[i]['grade'] == "Unknown") ? "不明　　　　" : "大津波警報　";
                  temp += tsunami_areas[i]['immediate'] ? "<span style='color:yellow;'>" : "";
                  temp += tsunami_areas[i]['name'];
                  temp += tsunami_areas[i]['immediate'] ? "</span>" : "";
                  temp += "<br>";
                }
                document.getElementById("tsunamiList").innerHTML = temp;
                if(sounds.tsunami[tsunami_areas[0]['grade']].currentTime < 5.96){
                  sounds.tsunami[tsunami_areas[0]['grade']].pause();
                  sounds.tsunami[tsunami_areas[0]['grade']].currentTime = 0;
                }
                sounds.tsunami[tsunami_areas[0]['grade']].volume = 1;
                sounds.tsunami[tsunami_areas[0]['grade']].play();
              }
              tx = 3200;
              Nnum = 0;
            } else {
              updateFlg = false;
            }
            lastTsunamiID = nowTsunamiID;

            if(cancelled === true){
              document.getElementById("tsunamiList").innerHTML = "津波の情報はまだ入っていません。<br>There is no information yet.";
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Loading Error (Tsunami)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
      })
  })*/
  $(function(){
    $.ajax({
      type: 'GET',
      url: "https://earthquake.tenki.jp/bousai/tsunami/index.html",
      success: function(data){
        lastGet.tenkiJPtsunami = getCTime();
        var area = forEach2($(data).find('.tsunami-info-entries td.area'), function(c, i){
            return $(c).text();
        });
        var datetime = forEach2($(data).find('.tsunami-info-entries td.datetime'), function(c, i){
            if($(c).find('span').length === 1) c = $(c).find('span');
            return ($(c).text()).replaceAll(" ","").replaceAll("\n","");
        });
        var height = forEach2($(data).find('.tsunami-info-entries td.height'), function(c, i){
            return $(c).text();
        });
        // console.log(area,datetime,height);
        var list = [];
        forEach2(area, function(c, i){
            list.push({name: area[i], time: datetime[i], height: height[i]});
        });
        tsunamiTexts = [];
        if($(data).find('.tsunami-info-entries td.height').length){
          list.forEach(function(c){
            if(c.time=="---")tsunamiTexts.push("   津波情報 | "+c.name+" "+c.height+"　 "); else tsunamiTexts.push("   津波情報 | "+c.name+" "+c.height+"("+c.time+")　 ");
          });
          cancelled = false;
        } else {
          cancelled = true;
        };
        if(cancelled === true){
          document.getElementById("tsunamiList").innerHTML = "津波の情報はまだ入っていません。<br>There is no information yet.";
        } else {
          var ms = "";
          list.forEach(function(c){
              var mh = Number(c.height.replace(/[^0-9.]/g, ""));
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
          document.getElementById('tsunamiList').innerHTML = ms;
        }
      }
    })
  })
}

function tempRef(siHtem){
  //siHtem = Number(document.getElementById("template").options[document.getElementById("template").selectedIndex].value);
  tx = 1200;
  if(siHtem == 1){
    msi = 8+1;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "6.8";
    epicenter = "山形県沖";
    epicenter_id = 87;
    depth = "10";
    timeYY = "2019";
    timeMM = "6";
    timeDD = "18";
    timeH = "22";
    timeM = "22";
    Text[1] = "<北海道>	函館市 帯広市 渡島松前町 福島町 七飯町 檜山江差町　 <青森県>	平内町 横浜町 六ヶ所村 風間浦村　 <岩手県>	岩泉町 田野畑村 軽米町 九戸村 岩手洋野町　 <福島県>	鮫川村　 <茨城県>	龍ケ崎市 牛久市 茨城鹿嶋市 坂東市 美浦村 利根町　 <栃木県>	足利市 佐野市 上三川町 益子町 茂木町 塩谷町　 <群馬県>	館林市 富岡市 みどり市 神流町 甘楽町 長野原町 草津町 玉村町 板倉町　 <埼玉県>	さいたま西区 さいたま北区 さいたま見沼区 さいたま桜区 さいたま浦和区 さいたま南区 川越市 川口市 秩父市 本庄市 東松山市 狭山市 羽生市 深谷市 上尾市 草加市 越谷市 蕨市 戸田市 入間市 朝霞市 志木市 和光市 新座市 桶川市 北本市 蓮田市 坂戸市 鶴ヶ島市 ふじみ野市 伊奈町 埼玉三芳町 滑川町 吉見町 鳩山町 長瀞町　埼玉美里町 埼玉神川町 上里町　 <千葉県>	千葉中央区 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 千葉美浜区 木更津市 東金市 市原市 鎌ケ谷市 山武市 多古町 長南町　 <東京都>	東京千代田区 東京中央区 東京新宿区 東京文京区 東京台東区 東京墨田区 東京江東区 東京品川区 東京大田区 東京世田谷区 東京渋谷区 東京中野区 東京杉並区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京足立区 東京葛飾区 武蔵野市 町田市 小平市 日野市 国分寺市 東大和市 清瀬市 武蔵村山市　 <神奈川県> 横浜中区 川崎川崎区 川崎幸区 川崎中原区 川崎高津区 川崎多摩区 川崎宮前区 茅ヶ崎市　 <富山県>	富山市 高岡市 魚津市 滑川市 黒部市 砺波市 小矢部市 南砺市 舟橋村 上市町 立山町 入善町 富山朝日町　 <石川県>	金沢市 七尾市 羽咋市 かほく市 津幡町 志賀町　 <福井県>	福井坂井市　 <山梨県>	山梨北杜市 甲斐市　 <長野県>	松本市 飯田市 須坂市 小諸市 大町市 茅野市 佐久市 千曲市 東御市 安曇野市 長野南牧村 佐久穂町 御代田町 立科町 青木村 下諏訪町 木曽町 麻績村 生坂村 筑北村 長野池田町 白馬村 小谷村 小布施町　 <静岡県>	静岡清水区 沼津市 富士市 御殿場市 伊豆の国市 静岡清水町";
    Text[2] = "<北海道>	渡島北斗市 知内町 木古内町 上ノ国町　 <青森県>	弘前市 八戸市 十和田市 三沢市 むつ市 今別町 蓬田村 外ヶ浜町 鰺ヶ沢町 西目屋村 大鰐町 田舎館村 鶴田町 中泊町 野辺地町 七戸町 六戸町 東北町 おいらせ町 大間町 東通村 三戸町 五戸町 田子町 青森南部町 階上町 新郷村　 <岩手県>	宮古市 大船渡市 久慈市 陸前高田市 釜石市 二戸市 葛巻町 岩手町 住田町 大槌町 山田町 一戸町　 <宮城県>	多賀城市 女川町　 <秋田県>	小坂町 八峰町　 <福島県>	檜枝岐村 西郷村 棚倉町 矢祭町 塙町 石川町 玉川村 平田村 浅川町 古殿町 三春町 小野町 葛尾村　 <茨城県>	水戸市 日立市 土浦市 茨城古河市 石岡市 結城市 下妻市 常総市 高萩市 笠間市 取手市 つくば市 ひたちなか市 潮来市 守谷市 常陸大宮市 那珂市 筑西市 稲敷市 かすみがうら市 桜川市 神栖市 鉾田市 つくばみらい市 小美玉市 茨城町 城里町 東海村 大子町 阿見町 河内町 八千代町 五霞町 境町　 <栃木県>	宇都宮市 栃木市 鹿沼市 日光市 小山市 真岡市 大田原市 矢板市 栃木さくら市 那須烏山市 下野市 市貝町 芳賀町 壬生町 野木町 高根沢町 栃木那珂川町　 <群馬県>	前橋市 高崎市 桐生市 伊勢崎市 太田市 安中市 榛東村 吉岡町 中之条町 群馬高山村 東吾妻町 川場村 群馬昭和村 みなかみ町 群馬明和町 千代田町 邑楽町　 <埼玉県>	さいたま大宮区 さいたま中央区 さいたま緑区 熊谷市 行田市 春日部市 鴻巣市 久喜市 八潮市 富士見市 三郷市 幸手市 吉川市 白岡市 川島町 宮代町 松伏町　 <千葉県>	船橋市 松戸市 野田市 流山市 浦安市 印西市 香取市　 <新潟県>	糸魚川市 妙高市 湯沢町　 <富山県>	氷見市 射水市　 <石川県>	輪島市 中能登町　 <山梨県>	忍野村　 <長野県>	長野市 上田市 諏訪市 飯山市 軽井沢町 坂城町 長野高山村 山ノ内町 木島平村 野沢温泉村 信濃町 小川村 飯綱町";
    Text[3] = "<青森県>	青森市 黒石市 五所川原市 つがる市 平川市 深浦町 藤崎町 板柳町　 <岩手県>	盛岡市 花巻市 北上市 遠野市 一関市 八幡平市 奥州市 滝沢市 雫石町 紫波町 西和賀町 金ケ崎町 平泉町 普代村　 <宮城県>	仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 塩竈市 気仙沼市 白石市 角田市 東松島市 富谷市 七ヶ宿町 柴田町 亘理町 山元町 七ヶ浜町 大和町 大郷町 大衡村 南三陸町　 <秋田県>	能代市 大館市 鹿角市 上小阿仁村 藤里町 五城目町 八郎潟町 大潟村 秋田美郷町　 <山形県>	山形市 寒河江市 天童市 東根市 山形朝日町 大石田町 山形金山町 高畠町 白鷹町　 <福島県>	会津若松市 郡山市 白河市 須賀川市 相馬市 二本松市 田村市 福島伊達市 本宮市 川俣町 大玉村 鏡石町 天栄村 下郷町 只見町 南会津町 北塩原村 磐梯町 三島町 福島金山町 福島昭和村 泉崎村 中島村 矢吹町 楢葉町 富岡町 川内村 大熊町 浪江町 新地町 飯舘村　 <茨城県>	常陸太田市 北茨城市　 <栃木県>	那須塩原市 那須町　 <群馬県>	沼田市 渋川市 片品村　 <埼玉県>	加須市　 <新潟県>	小千谷市 上越市 南魚沼市 田上町 津南町　 <石川県>	珠洲市 能登町　 <長野県>	中野市 栄村";
    Text[4] = "<岩手県> 矢巾町　 <宮城県> 仙台青葉区 石巻市 名取市 岩沼市 登米市 栗原市 大崎市 蔵王町 大河原町 村田町 宮城川崎町 丸森町 松島町 利府町 色麻町 宮城加美町 涌谷町 宮城美里町　 <秋田県>	秋田市 横手市 男鹿市 湯沢市 潟上市 大仙市 北秋田市 にかほ市 仙北市 三種町 井川町 羽後町 東成瀬村　 <山形県>	米沢市 新庄市 上山市 村山市 長井市 尾花沢市 南陽市 山辺町 中山町 河北町 西川町 大江町 最上町 舟形町 真室川町 鮭川村 戸沢村 山形川西町 山形小国町 飯豊町 庄内町 遊佐町　 <福島県>	福島市 いわき市 喜多方市 南相馬市 桑折町 国見町 西会津町 猪苗代町 会津坂下町 湯川村 柳津町 会津美里町 福島広野町 双葉町　 <新潟県> 新潟北区 新潟東区 新潟中央区 新潟江南区 新潟秋葉区 新潟南区 新潟西区 新潟西蒲区 三条市 新発田市 加茂市 十日町市 見附市 燕市 五泉市 阿賀野市 佐渡市 魚沼市 胎内市 聖籠町 弥彦村 出雲崎町 刈羽村 関川村 粟島浦村";
    Text[5] = "";
    Text[6] = "<新潟県> 長岡市 柏崎市 阿賀町　 <山形県> 酒田市 大蔵村 三川町　 <秋田県> 由利本荘市";
    Text[7] = "";
    Text[8] = "<山形県> 鶴岡市";
    Text[9] = "<新潟県> 村上市";
    Text[10] = "";
  }
  if(siHtem == 2){
    msi = 9+1;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "6.7";
    epicenter = "胆振地方中東部";
    epicenter_id = 35;
    depth = "40";
    timeYY = "2018";
    timeMM = "9";
    timeDD = "6";
    timeH = "3";
    timeM = "08";
    Text[1] = "<北海道> 網走市 音威子府村 中頓別町 佐呂間町 滝上町 西興部村 羅臼町　 <岩手県> 陸前高田市 雫石町 西和賀町 大槌町 岩泉町 田野畑村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 名取市 富谷市 蔵王町 村田町 亘理町 山元町 利府町 大郷町 大衡村 色麻町 宮城加美町　 <秋田県> 秋田市 横手市 男鹿市 湯沢市 由利本荘市 にかほ市 仙北市 小坂町 上小阿仁村 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 米沢市 鶴岡市 新庄市 寒河江市 上山市 天童市 山辺町 河北町 最上町 舟形町 大蔵村 鮭川村 三川町 庄内町　 <福島県> 福島市 郡山市 いわき市 須賀川市 相馬市 田村市 天栄村 玉川村 福島広野町 大熊町 浪江町　 <茨城県> 日立市 土浦市 石岡市 笠間市 常陸大宮市 筑西市　 <埼玉県> 春日部市　 <新潟県> 村上市";
    Text[2] = "<北海道> 稚内市 紋別市 渡島松前町 福島町 奥尻町 寿都町 泊村 上川地方上川町 下川町 美深町 上川中川町 初山別村 遠別町 天塩町 浜頓別町 宗谷枝幸町 豊富町 利尻富士町 幌延町 美幌町 津別町 斜里町 清里町 小清水町 訓子府町 置戸町 遠軽町 湧別町 雄武町 えりも町 陸別町 厚岸町 浜中町 弟子屈町 中標津町　 <青森県> 弘前市 黒石市 鰺ヶ沢町 深浦町 西目屋村 大鰐町 中泊町 田子町 新郷村　 <岩手県> 大船渡市 花巻市 北上市 遠野市 一関市 釜石市 八幡平市 奥州市 滝沢市 葛巻町 岩手町 紫波町 金ケ崎町 平泉町 住田町 山田町 九戸村 岩手洋野町 一戸町　 <宮城県> 気仙沼市 角田市 岩沼市 登米市 栗原市 東松島市 大崎市 大河原町 宮城川崎町 丸森町 松島町 宮城美里町 南三陸町　 <秋田県> 能代市 大館市 鹿角市 潟上市 大仙市 北秋田市 藤里町 三種町 八峰町 井川町　 <山形県> 酒田市 村山市 中山町 遊佐町　 <福島県> 南相馬市 双葉町";
    Text[3] = "<北海道> 札幌南区 北見市 赤平市 士別市 名寄市 根室市 歌志内市 渡島北斗市 知内町 木古内町 八雲町 檜山江差町 厚沢部町 今金町 島牧村 黒松内町 蘭越町 京極町 共和町 岩内町 神恵内村 積丹町 古平町 仁木町 上砂川町 東神楽町 比布町 愛別町 東川町 美瑛町 上富良野町 和寒町 幌加内町 小平町 苫前町 羽幌町 猿払村 興部町 大空町 豊浦町 士幌町 上士幌町 中札内村 更別村 広尾町 豊頃町 本別町 足寄町 釧路町 標茶町 鶴居村 白糠町 別海町 標津町　 <青森県> 青森市 八戸市 五所川原市 十和田市 三沢市 つがる市 平川市 平内町 今別町 蓬田村 外ヶ浜町 藤崎町 田舎館村 板柳町 鶴田町 野辺地町 七戸町 六戸町 横浜町 東北町 六ヶ所村 おいらせ町 風間浦村 佐井村 三戸町 五戸町 青森南部町　 <岩手県> 盛岡市 宮古市 久慈市 二戸市 矢巾町 普代村 軽米町 野田村　 <宮城県> 石巻市 涌谷町";
    Text[4] = "<北海道> 札幌中央区 小樽市 旭川市 釧路市 帯広市 夕張市 留萌市 美唄市 芦別市 滝川市 砂川市 深川市 富良野市 当別町 七飯町 鹿部町 渡島森町 長万部町 上ノ国町 乙部町 せたな町 ニセコ町 真狩村 留寿都村 喜茂別町 倶知安町 余市町 赤井川村 奈井江町 月形町 浦臼町 新十津川町 妹背牛町 秩父別町 北竜町 沼田町 鷹栖町 当麻町 中富良野町 南富良野町 占冠村 剣淵町 増毛町 壮瞥町 洞爺湖町 浦河町 音更町 鹿追町 新得町 十勝清水町 芽室町 十勝大樹町 幕別町 十勝池田町 浦幌町　 <青森県> むつ市 大間町 東通村 階上町";
    Text[5] = "";
    Text[6] = "<北海道> 函館市 室蘭市 岩見沢市 登別市 胆振伊達市 北広島市 石狩市 新篠津村 南幌町 由仁町 栗山町 白老町";
    Text[7] = "<北海道> 札幌北区 苫小牧市 江別市 三笠市 恵庭市 長沼町 新冠町 新ひだか町";
    Text[8] = "<北海道> 千歳市 日高地方日高町 平取町";
    Text[9] = "<北海道> 安平町 むかわ町";
    Text[10] = "<北海道> 厚真町";
  }
  if(siHtem == 3){
    msi = 7+1;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "5.9";
    epicenter = "大阪府北部";
    epicenter_id = 171;
    depth = "10";
    timeYY = "2018";
    timeMM = "6";
    timeDD = "18";
    timeH = "7";
    timeM = "58";
    Text[1] = "<茨城県> 筑西市　 <埼玉県> さいたま中央区 さいたま緑区 熊谷市 加須市 春日部市 鴻巣市 志木市 久喜市 富士見市 川島町 宮代町　 <東京都> 東京北区 東京板橋区　 <神奈川県> 川崎川崎区 川崎中原区 川崎宮前区 藤沢市 湯河原町　 <新潟県> 糸魚川市 上越市　 <富山県> 富山市 魚津市 砺波市 上市町 立山町 富山朝日町　 <石川県> 七尾市 珠洲市 羽咋市 穴水町　 <山梨県> 甲州市 山梨南部町 富士河口湖町　 <長野県> 長野市 松本市 上田市 岡谷市 伊那市 塩尻市 佐久市 東御市 安曇野市 軽井沢町 御代田町 立科町 富士見町 原村 辰野町 南箕輪村 中川村 宮田村 阿南町 下條村 売木村 天龍村 大鹿村 木祖村 大桑村 山形村 坂城町　 <岐阜県> 七宗町 白川町 東白川村 白川村　 <静岡県> 静岡葵区 静岡駿河区 沼津市 三島市 富士宮市 島田市 焼津市 御殿場市 伊豆市 御前崎市 河津町 西伊豆町 静岡清水町 長泉町 吉田町 川根本町 静岡森町　 <愛知県> 設楽町 東栄町 豊根村　 <三重県> 南伊勢町　 <和歌山県> 和歌山印南町 すさみ町　 <鳥取県> 岩美町 三朝町 大山町 日南町 鳥取日野町 江府町　 <島根県> 益田市 安来市 江津市 奥出雲町 川本町 島根美郷町 邑南町　 <岡山県> 井原市 高梁市 新見市 新庄村 久米南町 吉備中央町　 <広島県> 広島中区 広島南区 広島西区 広島安佐北区 広島安芸区 広島府中市 広島三次市 庄原市 大竹市 東広島市 廿日市市 海田町 世羅町 神石高原町　 <山口県> 下関市 宇部市 山口市 岩国市 周防大島町 平生町　 <徳島県> 徳島三好市 勝浦町 上勝町 佐那河内村 神山町 つるぎ町 東みよし町　 <愛媛県> 宇和島市 八幡浜市 新居浜市 西条市 四国中央市 東温市 伊方町　 <高知県> 室戸市 南国市 高知香南市 香美市 東洋町 安田町 北川村 馬路村 大豊町 黒潮町　 <福岡県> 中間市　 <佐賀県> 神埼市 白石町";
    Text[2] = "<富山県> 高岡市 氷見市 滑川市 小矢部市 南砺市 射水市 舟橋村　 <石川県> 金沢市 小松市 輪島市 かほく市 白山市 能美市 川北町 津幡町 志賀町 宝達志水町 中能登町 能登町　 <福井県> 大野市 勝山市 永平寺町 南越前町 福井美浜町　 <山梨県> 甲府市 南アルプス市 山梨北杜市 中央市 市川三郷町 富士川町 忍野村 山中湖村　 <長野県> 諏訪市 駒ヶ根市 茅野市 長野南牧村 下諏訪町 箕輪町 飯島町 松川町 長野高森町 阿智村 平谷村 根羽村 泰阜村 喬木村 豊丘村 上松町 南木曽町 王滝村 木曽町　 <岐阜県> 高山市 中津川市 恵那市 各務原市 可児市 飛騨市 郡上市 下呂市 坂祝町 富加町 川辺町 八百津町 御嵩町　 <静岡県> 静岡清水区 浜松中区 浜松東区 浜松西区 浜松南区 浜松北区 浜松天竜区 富士市 磐田市 掛川市 藤枝市 湖西市 伊豆の国市 牧之原市　 <愛知県> 名古屋千種区 名古屋東区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋守山区 名古屋緑区 名古屋名東区 名古屋天白区 豊橋市 岡崎市 瀬戸市 春日井市 豊川市 碧南市 犬山市 愛知江南市 小牧市 新城市 知立市 岩倉市 日進市 田原市 北名古屋市 大口町 扶桑町 大治町 東浦町 南知多町 幸田町　 <三重県> 伊勢市 桑名市 熊野市 いなべ市 志摩市 木曽岬町 東員町 菰野町 多気町 三重明和町 大台町 玉城町 三重大紀町 三重御浜町 紀宝町　 <京都府> 綾部市　 <兵庫県> 市川町 佐用町 新温泉町　 <奈良県> 野迫川村 十津川村 下北山村 上北山村　 <和歌山県> 和歌山市 御坊市 紀美野町 九度山町 湯浅町 有田川町 和歌山美浜町 和歌山日高町 由良町 みなべ町 日高川町 白浜町 上富田町 那智勝浦町 太地町 古座川町 北山村 串本町　 <鳥取県> 米子市 倉吉市 境港市 鳥取若桜町 智頭町 八頭町 琴浦町 日吉津村 鳥取南部町 伯耆町　 <島根県> 松江市 浜田市 出雲市 大田市 雲南市 海士町　 <岡山県> 笠岡市 総社市 浅口市 早島町 矢掛町 鏡野町 勝央町 奈義町 西粟倉村 岡山美咲町　 <広島県> 広島安佐南区 呉市 竹原市 三原市 尾道市 福山市 安芸高田市 江田島市 坂町 大崎上島町　 <山口県> 萩市 柳井市　 <徳島県> 阿南市 吉野川市 阿波市 美馬市 石井町 那賀町 牟岐町 美波町 海陽町 北島町 藍住町 板野町 上板町　 <香川県>	坂出市 観音寺市 東かがわ市 三木町 直島町 宇多津町 綾川町 琴平町 多度津町 まんのう町　 <愛媛県> 松山市　 <高知県> 高知市 安芸市 奈半利町 田野町 芸西村";
    Text[3] = "<石川県> 加賀市　 <福井県> 福井市 敦賀市 小浜市 鯖江市 あわら市 越前市 福井坂井市 福井池田町 越前町 福井おおい町 福井若狭町　 <長野県> 飯田市　 <岐阜県> 大垣市 多治見市 関市 美濃市 瑞浪市 羽島市 美濃加茂市 土岐市 岐阜山県市 瑞穂市 本巣市 海津市 岐南町 笠松町 垂井町 関ケ原町 神戸町 輪之内町 揖斐川町 大野町 岐阜池田町 北方町　 <静岡県> 袋井市 菊川市　 <愛知県> 名古屋北区 名古屋西区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 一宮市 半田市 愛知津島市 刈谷市 豊田市 安城市 西尾市 蒲郡市 常滑市 稲沢市 東海市 大府市 知多市 尾張旭市 高浜市 豊明市 愛西市 清須市 弥富市 愛知みよし市 あま市 長久手市 東郷町 蟹江町 飛島村 阿久比町 愛知美浜町 武豊町　 <三重県> 津市 松阪市 鈴鹿市 名張市 尾鷲市 亀山市 伊賀市 三重朝日町 川越町 三重紀北町　 <滋賀県> 守山市 高島市 滋賀日野町 愛荘町 豊郷町 甲良町 多賀町　 <京都府> 福知山市 舞鶴市 宮津市 和束町 伊根町 与謝野町　 <大阪府> 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 大阪堺市美原区 貝塚市 泉佐野市 河内長野市 高石市 泉南市 大阪狭山市 阪南市 忠岡町 田尻町 大阪岬町　 <兵庫県> 神戸須磨区 相生市 加古川市 赤穂市 西脇市 高砂市 小野市 加西市 養父市 丹波市 南あわじ市 朝来市 宍粟市 加東市 たつの市 多可町 兵庫稲美町 播磨町 福崎町 兵庫神河町 兵庫太子町 上郡町 兵庫香美町　<奈良県> 五條市 山添村 曽爾村 明日香村 下市町 黒滝村 天川村 奈良川上村 東吉野村　 <和歌山県> 海南市 橋本市 有田市 田辺市 新宮市 紀の川市 岩出市 かつらぎ町 高野町 和歌山広川町　 <鳥取県> 鳥取市 湯梨浜町 北栄町　 <島根県> 隠岐の島町　 <岡山県> 岡山北区 岡山中区 岡山東区 岡山南区 倉敷市 津山市 玉野市 備前市 瀬戸内市 赤磐市 真庭市 美作市 和気町 里庄町　 <広島県> 府中町　 <徳島県> 徳島市 鳴門市 小松島市 松茂町　 <香川県> 高松市 丸亀市 さぬき市 三豊市 土庄町　 <愛媛県> 今治市 上島町";
    Text[4] = "<福井県> 高浜町　 <岐阜県> 岐阜市 養老町 安八町　 <愛知県> 名古屋南区　 <三重県> 四日市市　 <滋賀県> 彦根市 長浜市 近江八幡市 草津市 栗東市 甲賀市 野洲市 湖南市 東近江市 米原市 竜王町　 <京都府> 京都北区 京都上京区 京都左京区 京都東山区 京都下京区 京都南区 京都右京区 京都山科区 京丹後市 木津川市 宇治田原町 笠置町 南山城村 京丹波町　 <大阪府> 大阪西区 大阪大正区 大阪天王寺区 大阪浪速区 大阪東成区 大阪城東区 大阪阿倍野区 大阪住吉区 大阪東住吉区 大阪西成区 大阪鶴見区 大阪住之江区 大阪平野区 大阪中央区 大阪堺市堺区 岸和田市 泉大津市 八尾市 富田林市 松原市 大阪和泉市 柏原市 羽曳野市 門真市 藤井寺市 東大阪市 大阪太子町 河南町 千早赤阪村　 <兵庫県> 神戸東灘区 神戸灘区 神戸兵庫区 神戸長田区 神戸垂水区 神戸北区 神戸中央区 神戸西区 姫路市 明石市 洲本市 芦屋市 豊岡市 宝塚市 三木市 三田市 篠山市 淡路市 猪名川町　 <奈良県> 奈良市 大和高田市 天理市 橿原市 桜井市 生駒市 香芝市 葛城市 宇陀市 平群町 三郷町 斑鳩町 安堵町 奈良川西町 田原本町 御杖村 上牧町 王寺町 河合町 吉野町 大淀町　 <香川県> 小豆島町";
    Text[5] = "";
    Text[6] = "<滋賀県> 大津市　 <京都府> 宇治市 城陽市 向日市 京田辺市 南丹市 井手町 精華町　 <大阪府> 大阪福島区 大阪此花区 大阪港区 大阪西淀川区 大阪生野区 池田市 守口市 大東市 四條畷市 豊能町 能勢町　 <兵庫県> 尼崎市 西宮市 伊丹市 川西市　 <奈良県> 大和郡山市 御所市 高取町 広陵町";
    Text[7] = "<京都府> 京都中京区 京都伏見区 京都西京区 亀岡市 長岡京市 八幡市 大山崎町 久御山町　 <大阪府> 大阪都島区 大阪東淀川区 大阪旭区 大阪淀川区 豊中市 吹田市 寝屋川市 摂津市 交野市 島本町";
    Text[8] = "<大阪府> 大阪北区 高槻市 枚方市 茨木市 箕面市";
    Text[9] = "";
    Text[10] = "";
  }
  if(siHtem == 4){
    msi = 7+1;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "6.6";
    epicenter = "鳥取県中部";
    epicenter_id = 180;
    depth = "10";
    timeYY = "2016";
    timeMM = "10";
    timeDD = "21";
    timeH = "14";
    timeM = "07";
    Text[1] = "<茨城県> 茨城鹿嶋市 筑西市 坂東市　 <群馬県> 群馬明和町 邑楽町　 <埼玉県> さいたま西区 さいたま北区 さいたま大宮区 さいたま桜区 さいたま浦和区 さいたま緑区 さいたま岩槻区 川越市 熊谷市 川口市 加須市 草加市 蕨市 戸田市 入間市 志木市 和光市 新座市 久喜市 八潮市 蓮田市 鶴ヶ島市 伊奈町 川島町 宮代町 杉戸町　 <千葉県> 千葉中央区 千葉花見川区 千葉若葉区 木更津市 浦安市 長柄町　 <東京都> 東京千代田区 東京中央区 東京文京区 東京墨田区 東京江東区 東京大田区 東京世田谷区 東京渋谷区 東京中野区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京足立区 東京葛飾区 東京江戸川区 八王子市 東京府中市 昭島市 調布市 小平市 日野市 国分寺市 狛江市 武蔵村山市 多摩市　 <神奈川県> 横浜中区 川崎川崎区 川崎中原区 相模原中央区 茅ヶ崎市 湯河原町　 <富山県> 富山市 高岡市 滑川市 小矢部市 南砺市 射水市 舟橋村　 <石川県> 金沢市 七尾市 珠洲市 羽咋市 かほく市 白山市 津幡町 穴水町 能登町　 <福井県> 勝山市 永平寺町 福井池田町　 <山梨県> 甲斐市 甲州市 富士河口湖町　 <長野県> 松本市 岡谷市 塩尻市 佐久市 長野南牧村 御代田町 下諏訪町 富士見町 原村 辰野町 箕輪町 南箕輪村 中川村 阿南町 阿智村 根羽村 下條村 売木村 天龍村 泰阜村 喬木村 豊丘村 大鹿村 上松町 南木曽町 木祖村 王滝村 大桑村 木曽町　 <岐阜県> 高山市 関市 美濃市 可児市 郡上市 下呂市 坂祝町 富加町 川辺町 七宗町 八百津町 白川町 東白川村 御嵩町　 <静岡県> 静岡葵区 静岡清水区 浜松中区 浜松東区 浜松南区 浜松浜北区 浜松天竜区 沼津市 富士宮市 島田市 焼津市 掛川市 藤枝市 御殿場市 御前崎市 西伊豆町 静岡清水町 小山町 吉田町 川根本町 静岡森町　 <愛知県> 岡崎市 蒲郡市 南知多町 幸田町 設楽町　 <三重県> 伊勢市 松阪市 熊野市 東員町 菰野町 三重紀北町　 <奈良県> 五條市 山添村 平群町 曽爾村 御杖村 明日香村 吉野町 大淀町 天川村 奈良川上村　 <和歌山県> 新宮市 紀美野町 高野町 湯浅町 有田川町 日高川町 白浜町 すさみ町 那智勝浦町 太地町 古座川町　 <山口県> 美祢市　 <愛媛県> 砥部町 松野町 愛南町　 <高知県> 宿毛市 土佐清水市 四万十市 梼原町 高知津野町 四万十町　 <福岡県> 北九州門司区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡西区 飯塚市 田川市 八女市 筑後市 豊前市 筑紫野市 大野城市 福岡古賀市 宮若市 糸島市 宇美町 篠栗町 志免町 須恵町 粕屋町 岡垣町 小竹町 鞍手町 東峰村 大木町 香春町 福岡川崎町 大任町 苅田町 上毛町 築上町　 <佐賀県> 唐津市 多久市 武雄市 嬉野市 吉野ヶ里町 基山町 有田町 大町町　 <長崎県> 佐世保市 島原市 諫早市 松浦市 壱岐市 雲仙市 南島原市 川棚町 佐々町　 <熊本県> 八代市 人吉市 山鹿市 宇土市 益城町 多良木町　 <大分県> 日田市 玖珠町　 <宮崎県> 高千穂町";
    Text[2] = "<富山県> 氷見市　 <石川県> 小松市 輪島市 加賀市 中能登町　 <福井県> 福井市 大野市 鯖江市 あわら市 越前市 福井坂井市 南越前町 福井美浜町 福井若狭町　 <山梨県> 甲府市 南アルプス市 山梨北杜市 笛吹市 中央市 昭和町 忍野村 山中湖村　 <長野県> 飯田市 諏訪市 伊那市 駒ヶ根市 茅野市 飯島町 宮田村 松川町 長野高森町 平谷村　 <岐阜県> 岐阜市 大垣市 多治見市 中津川市 瑞浪市 羽島市 恵那市 美濃加茂市 土岐市 各務原市 岐阜山県市 本巣市 岐南町 笠松町 垂井町 関ケ原町 神戸町 安八町 揖斐川町 大野町 岐阜池田町 北方町　 <静岡県> 浜松西区 浜松北区 富士市 磐田市 袋井市 湖西市 菊川市 伊豆の国市 牧之原市　 <愛知県> 名古屋千種区 名古屋東区 名古屋北区 名古屋西区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 名古屋南区 名古屋守山区 名古屋緑区 名古屋名東区 名古屋天白区 豊橋市 一宮市 瀬戸市 半田市 春日井市 豊川市 愛知津島市 碧南市 刈谷市 豊田市 安城市 西尾市 犬山市 常滑市 愛知江南市 小牧市 稲沢市 新城市 東海市 大府市 知多市 知立市 尾張旭市 高浜市 岩倉市 豊明市 日進市 田原市 清須市 北名古屋市 愛知みよし市 あま市 東郷町 豊山町 大口町 扶桑町 大治町 飛島村 阿久比町 東浦町 愛知美浜町 武豊町　 <三重県> 津市 四日市市 桑名市 鈴鹿市 亀山市 いなべ市 伊賀市 木曽岬町 三重朝日町 川越町　 <滋賀県> 守山市 栗東市 甲賀市 東近江市 滋賀日野町 愛荘町 豊郷町 甲良町 多賀町　 <京都府> 京都北区 京都上京区 京都左京区 京都東山区 京都下京区 京都山科区 舞鶴市 綾部市 宇治市 京田辺市 木津川市 笠置町 和束町 精華町 南山城村 京丹波町　 <大阪府> 大阪西区 大阪大正区 大阪天王寺区 大阪生野区 大阪阿倍野区 大阪住吉区 大阪鶴見区 大阪平野区 大阪中央区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 大阪堺市美原区 岸和田市 貝塚市 富田林市 河内長野市 松原市 大阪和泉市 柏原市 羽曳野市 高石市 藤井寺市 泉南市 大阪狭山市 阪南市 豊能町 忠岡町 田尻町 大阪太子町 河南町 千早赤阪村　 <兵庫県> 神戸須磨区 洲本市 西脇市 猪名川町　 <奈良県> 奈良市 大和高田市 大和郡山市 天理市 橿原市 桜井市 御所市 生駒市 香芝市 葛城市 宇陀市 三郷町 斑鳩町 安堵町 奈良川西町 三宅町 田原本町 高取町 上牧町 王寺町 河合町　 <和歌山県> 和歌山市 海南市 橋本市 有田市 御坊市 田辺市 紀の川市 岩出市 かつらぎ町 和歌山広川町 和歌山日高町 由良町 みなべ町 上富田町　 <島根県> 江津市 津和野町 吉賀町 知夫村　 <山口県> 下関市 宇部市 防府市 下松市 光市 長門市 周南市 山陽小野田市 上関町 田布施町 阿武町　 <徳島県> 勝浦町 上勝町 佐那河内村 神山町 那賀町 美波町　 <愛媛県> 宇和島市 八幡浜市 新居浜市 大洲市 伊予市 西予市 東温市 久万高原町 愛媛松前町 内子町　 <高知県> 室戸市 土佐市 須崎市 香美市 東洋町 奈半利町 田野町 安田町 本山町 大豊町 土佐町 大川村 いの町 仁淀川町 中土佐町 佐川町 越知町 黒潮町　 <福岡県> 北九州若松区 北九州戸畑区 北九州小倉北区 福岡中央区 福岡早良区 久留米市 直方市 柳川市 大川市 行橋市 小郡市 宗像市 福津市 うきは市 嘉麻市 朝倉市 みやま市 新宮町 久山町 芦屋町 桂川町 筑前町 大刀洗町 添田町 福智町 みやこ町　 <佐賀県> 佐賀市 鳥栖市 小城市 上峰町 みやき町 江北町　 <長崎県> 平戸市　 <熊本県> 熊本南区 玉名市 菊池市 宇城市 阿蘇市 長洲町　 <大分県> 大分市 別府市 中津市 佐伯市 臼杵市 津久見市 竹田市 豊後高田市 杵築市 宇佐市 豊後大野市 由布市 国東市 日出町";
    Text[3] = "<福井県> 敦賀市 小浜市 越前町 高浜町 福井おおい町　 <岐阜県> 瑞穂市 海津市 養老町 輪之内町　 <愛知県> 愛西市 弥富市 蟹江町　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 草津市 野洲市 湖南市 高島市 米原市 竜王町　 <京都府> 京都中京区 京都南区 京都右京区 京都伏見区 京都西京区 福知山市 宮津市 亀岡市 城陽市 向日市 長岡京市 八幡市 京丹後市 南丹市 大山崎町 久御山町 井手町 宇治田原町 伊根町　 <大阪府> 大阪都島区 大阪福島区 大阪此花区 大阪港区 大阪西淀川区 大阪東淀川区 大阪東成区 大阪旭区 大阪城東区 大阪東住吉区 大阪西成区 大阪淀川区 大阪住之江区 大阪北区 大阪堺市堺区 豊中市 池田市 吹田市 泉大津市 高槻市 守口市 枚方市 茨木市 八尾市 泉佐野市 寝屋川市 大東市 箕面市 門真市 摂津市 東大阪市 交野市 島本町 熊取町 大阪岬町　 <兵庫県> 神戸東灘区 神戸灘区 神戸兵庫区 神戸長田区 神戸垂水区 神戸北区 神戸中央区 神戸西区 尼崎市 明石市 西宮市 芦屋市 伊丹市 相生市 加古川市 赤穂市 宝塚市 三木市 高砂市 川西市 小野市 三田市 加西市 篠山市 養父市 丹波市 朝来市 淡路市 宍粟市 加東市 多可町 兵庫稲美町 播磨町 市川町 福崎町 兵庫神河町 兵庫太子町 佐用町 兵庫香美町 新温泉町　 <奈良県> 広陵町　 <和歌山県> 和歌山美浜町 和歌山印南町　 <鳥取県> 岩美町 鳥取若桜町　 <島根県> 浜田市 益田市 雲南市 奥出雲町 飯南町 川本町 島根美郷町 邑南町 西ノ島町　 <岡山県> 岡山中区 岡山東区 井原市 総社市 高梁市 新見市 瀬戸内市 美作市 浅口市 早島町 里庄町 矢掛町 西粟倉村 久米南町 吉備中央町　 <広島県> 広島東区 広島西区 広島安佐南区 広島佐伯区 三原市 福山市 広島府中市 広島三次市 大竹市 東広島市 熊野町 安芸太田町 北広島町 世羅町　 <山口県> 山口市 萩市 周防大島町 和木町 平生町　 <徳島県> 徳島市 鳴門市 小松島市 阿南市 吉野川市 阿波市 美馬市 徳島三好市 石井町 牟岐町 海陽町 松茂町 北島町 藍住町 板野町 上板町 つるぎ町 東みよし町　 <香川県> 丸亀市 坂出市 善通寺市 三木町 直島町 琴平町 多度津町 まんのう町　 <愛媛県> 松山市 西条市 四国中央市 上島町 伊方町　 <高知県> 高知市 安芸市 南国市 高知香南市 芸西村 日高村　 <福岡県> 中間市 水巻町 遠賀町　 <佐賀県> 神埼市 白石町　 <大分県> 姫島村";
    Text[4] = "<京都府> 与謝野町　 <大阪府> 四條畷市 能勢町　 <兵庫県> 姫路市 豊岡市 南あわじ市 たつの市 上郡町　 <鳥取県> 米子市 境港市 智頭町 八頭町 大山町 鳥取南部町 伯耆町 日南町 鳥取日野町 江府町　 <島根県> 松江市 出雲市 大田市 安来市 海士町　 <岡山県> 岡山北区 岡山南区 倉敷市 津山市 玉野市 笠岡市 備前市 赤磐市 和気町 新庄村 奈義町 岡山美咲町　 <広島県> 広島中区 広島南区 広島安佐北区 広島安芸区 呉市 竹原市 尾道市 庄原市 廿日市市 安芸高田市 江田島市 府中町 海田町 坂町 大崎上島町 神石高原町　 <山口県> 岩国市 柳井市　 <香川県> 高松市 観音寺市 さぬき市 東かがわ市 三豊市 土庄町 小豆島町 綾川町　 <愛媛県> 今治市";
    Text[5] = "";
    Text[6] = "<鳥取県> 琴浦町 日吉津村　 <島根県> 隠岐の島町";
    Text[7] = "<鳥取県> 鳥取市 三朝町　 <岡山県> 真庭市 鏡野町";
    Text[8] = "<鳥取県> 倉吉市 湯梨浜町 北栄町";
    Text[9] = "";
    Text[10] = "";
  }
  if(siHtem == 5){
    msi = 9+1;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "7.3";
    epicenter = "熊本県熊本地方";
    epicenter_id = 230;
    depth = "10";
    timeYY = "2016";
    timeMM = "4";
    timeDD = "16";
    timeH = "1";
    timeM = "25";
    Text[1] = "<山形県> 中山町　 <茨城県> 土浦市 つくば市 茨城鹿嶋市 潮来市 筑西市 坂東市 稲敷市 鉾田市 東海村 五霞町 境町　 <群馬県> 前橋市 高崎市 伊勢崎市 太田市 館林市 渋川市 富岡市 榛東村 玉村町 板倉町 群馬明和町 千代田町 邑楽町　 <埼玉県> さいたま北区 さいたま大宮区 さいたま見沼区 さいたま桜区 さいたま浦和区 さいたま緑区 さいたま岩槻区 川越市 熊谷市 春日部市 羽生市 鴻巣市 越谷市 蕨市 入間市 朝霞市 和光市 久喜市 三郷市 蓮田市 坂戸市 幸手市 鶴ヶ島市 吉川市 白岡市 伊奈町 鳩山町 宮代町 杉戸町 松伏町　 <千葉県> 千葉中央区 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 市川市 船橋市 木更津市 松戸市 野田市 茂原市 東金市 習志野市 鎌ケ谷市 浦安市 四街道市 多古町 一宮町 睦沢町 長生村 白子町　 <東京都> 東京千代田区 東京江東区 東京大田区 東京世田谷区 東京渋谷区 東京杉並区 東京板橋区 東京葛飾区 小平市 国分寺市 清瀬市　 <神奈川県> 横浜中区 川崎川崎区 川崎幸区 川崎高津区 川崎多摩区 川崎宮前区 川崎麻生区 茅ヶ崎市　 <新潟県> 新潟西蒲区 長岡市 三条市 上越市 刈羽村　 <富山県> 富山市 高岡市 魚津市 滑川市 砺波市 小矢部市 南砺市 射水市 舟橋村 上市町 立山町　 <石川県> 金沢市 かほく市 津幡町 能登町　 <福井県> 大野市 勝山市 鯖江市 越前市 福井美浜町 高浜町 福井若狭町　 <山梨県> 甲斐市　 <長野県> 長野市 松本市 上田市 岡谷市 伊那市 中野市 大町市 茅野市 塩尻市 佐久市 千曲市 東御市 安曇野市 軽井沢町 御代田町 立科町 下諏訪町 富士見町 原村 辰野町 箕輪町 飯島町 南箕輪村 宮田村 松川町 長野高森町 阿南町 阿智村 平谷村 根羽村 下條村 泰阜村 喬木村 豊丘村 木曽町 麻績村 生坂村 山形村 筑北村 長野池田町 松川村 木島平村 飯綱町　 <岐阜県> 中津川市 本巣市 郡上市 笠松町 垂井町 神戸町 揖斐川町 大野町　 <静岡県> 静岡葵区 静岡清水区 浜松中区 浜松東区 浜松北区 沼津市 三島市 富士宮市 島田市 焼津市 掛川市 藤枝市 御殿場市 御前崎市 伊豆の国市 牧之原市 静岡清水町　 長泉町 静岡森町　 <愛知県> 名古屋北区 名古屋西区 名古屋天白区 豊川市 豊田市 西尾市 新城市 尾張旭市 日進市 北名古屋市 南知多町　 <三重県> 松阪市 亀山市 志摩市 伊賀市 木曽岬町 三重紀北町　 <滋賀県> 甲賀市　 <京都府> 京都上京区 京都中京区 福知山市 舞鶴市 宇治市 井手町　 <兵庫県> 篠山市 朝来市 宍粟市 佐用町 新温泉町　 <奈良県> 桜井市 五條市 御所市 宇陀市 斑鳩町 上牧町 王寺町 吉野町 大淀町 下市町 黒滝村 天川村 奈良川上村 東吉野村　 <和歌山県> 御坊市 田辺市 新宮市 白浜町 上富田町 太地町 古座川町 北山村 串本町　 <鳥取県> 岩美町 鳥取若桜町 智頭町 八頭町 鳥取日野町 江府町　 <島根県> 西ノ島町　 <岡山県> 岡山中区 総社市 備前市 和気町 鏡野町 西粟倉村　 <鹿児島県> 南種子町";
    Text[2] = "<茨城県> 茨城古河市　 <埼玉県> 加須市　 <東京都> 東京足立区　 <神奈川県> 川崎中原区　 <富山県> 氷見市　 <石川県> 小松市 珠洲市 加賀市 羽咋市　 <福井県> 福井市 敦賀市 あわら市 福井坂井市　 <山梨県> 甲府市 南アルプス市 山梨北杜市 笛吹市 中央市 富士川町 昭和町 忍野村 山中湖村 富士河口湖町　 <長野県> 飯田市 諏訪市　 <岐阜県> 岐阜市 大垣市 羽島市 瑞穂市 海津市 養老町 輪之内町 安八町　 <静岡県> 浜松西区 浜松南区 富士市 磐田市 袋井市 湖西市 菊川市　 <愛知県> 名古屋千種区 名古屋東区 名古屋中村区 名古屋中区 名古屋昭和区 名古屋瑞穂区 名古屋熱田区 名古屋中川区 名古屋港区 名古屋南区 名古屋守山区 名古屋緑区 名古屋名東区 豊橋市 一宮市 半田市 愛知津島市 碧南市 刈谷市 安城市 常滑市 稲沢市 東海市 大府市 知多市 知立市 高浜市 豊明市 田原市 愛西市 清須市 弥富市 愛知みよし市 あま市 東郷町 大治町 蟹江町 阿久比町 東浦町 武豊町　 <三重県> 津市 四日市市 鈴鹿市　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 草津市 守山市 栗東市 野洲市 高島市 東近江市 滋賀日野町 竜王町 愛荘町　 <京都府> 京都下京区 京都南区 京都伏見区 亀岡市 城陽市 向日市 長岡京市 八幡市 京丹後市 南丹市 大山崎町 久御山町 精華町 与謝野町　 <大阪府> 大阪都島区 大阪此花区 大阪西区 大阪天王寺区 大阪東淀川区 大阪東成区 大阪旭区 大阪城東区 大阪阿倍野区 大阪東住吉区 大阪西成区 大阪淀川区 大阪鶴見区 大阪住之江区 大阪平野区 大阪北区 大阪中央区 大阪堺市堺区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市美原区 岸和田市 池田市 吹田市 泉大津市 高槻市 貝塚市 守口市 枚方市 茨木市 八尾市 泉佐野市 富田林市 寝屋川市 河内長野市 大阪和泉市 箕面市 柏原市 羽曳野市 門真市 摂津市 高石市 藤井寺市 東大阪市 泉南市 四條畷市 交野市 大阪狭山市 阪南市 忠岡町 熊取町 大阪岬町 大阪太子町　 <兵庫県> 神戸東灘区 神戸兵庫区 神戸長田区 神戸中央区 神戸西区 姫路市 明石市 西宮市 洲本市 芦屋市 伊丹市 相生市 加古川市 赤穂市 宝塚市 三木市 高砂市 川西市 三田市 加東市 たつの市 兵庫稲美町 播磨町 上郡町 兵庫香美町　 <奈良県> 奈良市 大和高田市 大和郡山市 天理市 香芝市 葛城市 安堵町 奈良川西町 三宅町 田原本町 広陵町 河合町　 <和歌山県> 和歌山市 海南市 橋本市 有田市 紀の川市 岩出市 かつらぎ町 九度山町 高野町 湯浅町 和歌山広川町 有田川町 和歌山美浜町 和歌山日高町 和歌山印南町 みなべ町 日高川町　 <鳥取県> 倉吉市 三朝町 日吉津村 鳥取南部町 伯耆町 日南町　 <島根県> 安来市 江津市 雲南市 奥出雲町 飯南町 川本町 島根美郷町 邑南町 知夫村 隠岐の島町　 <岡山県> 岡山北区 岡山東区 津山市 笠岡市 井原市 高梁市 新見市 瀬戸内市 赤磐市 美作市 浅口市 早島町 矢掛町　 <広島県> 広島西区 広島安芸区 福山市 広島府中市 広島三次市 庄原市 安芸高田市 北広島町 世羅町 神石高原町　 <山口県> 光市 和木町 上関町 田布施町　 <徳島県> 鳴門市 美馬市 徳島三好市 勝浦町 上勝町 佐那河内村 神山町 那賀町 牟岐町 美波町 海陽町 つるぎ町 東みよし町　 <香川県>	丸亀市 善通寺市 さぬき市 土庄町 三木町 直島町 宇多津町 綾川町　 <愛媛県> 新居浜市　 <高知県> 室戸市 須崎市 東洋町 安田町 北川村 馬路村 本山町 大豊町 大川村 いの町 仁淀川町 中土佐町 佐川町 四万十町 大月町　 <長崎県>	五島市 新上五島町　 <鹿児島県> 志布志市 三島村 錦江町 南大隅町 屋久島町";
    Text[3] = "<愛知県> 飛島村　 <大阪府> 大阪福島区 大阪港区 大阪大正区 大阪西淀川区 大阪生野区 大阪住吉区 大阪堺市北区 豊中市 松原市 大東市 田尻町　 <兵庫県> 尼崎市 豊岡市 南あわじ市 淡路市　 <鳥取県> 鳥取市 米子市 湯梨浜町 琴浦町 北栄町 大山町　 <島根県> 松江市 浜田市 津和野町 吉賀町　 <岡山県> 岡山南区 倉敷市 玉野市 真庭市 里庄町　 <広島県> 広島中区 広島南区 広島安佐南区 広島安佐北区 広島佐伯区 呉市 竹原市 三原市 尾道市 大竹市 東広島市 廿日市市 府中町 海田町 坂町 安芸太田町 大崎上島町　 <山口県> 下松市 岩国市 長門市 美祢市 周南市 平生町 阿武町　 <徳島県> 徳島市 小松島市 阿南市 吉野川市 阿波市 石井町 松茂町 北島町 藍住町 板野町 上板町　 <香川県> 高松市 坂出市 観音寺市 東かがわ市 三豊市 小豆島町 琴平町 多度津町 まんのう町　 <愛媛県> 西条市 大洲市 伊予市 四国中央市 東温市 上島町 久万高原町 愛媛松前町 砥部町 内子町 松野町 愛媛鬼北町 愛南町　 <高知県> 高知市 安芸市 南国市 土佐市 土佐清水市 四万十市 高知香南市 香美市 奈半利町 田野町 芸西村 土佐町 越知町 梼原町 日高村 高知津野町　 <福岡県> 北九州戸畑区 福岡東区 岡垣町 香春町 吉富町　 <佐賀県> 伊万里市 玄海町 有田町 大町町　 <長崎県> 佐世保市宇久島 長崎対馬市 壱岐市 西海市 長与町 波佐見町 小値賀町 佐々町　 <宮崎県> 串間市 三股町 西米良村　 <鹿児島県> 鹿屋市 枕崎市 指宿市 垂水市 日置市 曽於市 南九州市 大崎町 東串良町 肝付町";
    Text[4] = "<鳥取県> 境港市　 <島根県> 出雲市 益田市 大田市　 <広島県> 江田島市　 <山口県> 下関市 宇部市 山口市 萩市 防府市 柳井市 山陽小野田市 周防大島町　 <愛媛県> 松山市 今治市 宇和島市 西予市 伊方町　 <高知県> 宿毛市 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州小倉北区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡中央区 福岡西区 福岡城南区 福岡早良区 大牟田市 直方市 飯塚市 田川市 行橋市 豊前市 中間市 筑紫野市 春日市 大野城市 宗像市 太宰府市 福岡古賀市 福津市 うきは市 宮若市 嘉麻市 朝倉市 糸島市 福岡那珂川町 宇美町 篠栗町 志免町 須恵町 新宮町 久山町 粕屋町 芦屋町 水巻町 小竹町 鞍手町 桂川町 東峰村 大刀洗町 添田町 糸田町 福岡川崎町 大任町 赤村 福智町 苅田町 みやこ町 上毛町 築上町　 <佐賀県> 唐津市 鳥栖市 多久市 武雄市 佐賀鹿島市 嬉野市 吉野ヶ里町 基山町 江北町 太良町　 <長崎県> 長崎市 佐世保市 大村市 平戸市 松浦市 時津町 東彼杵町 川棚町　 <熊本県> 錦町 多良木町 湯前町 水上村 相良村 五木村 球磨村 苓北町　 <大分県> 中津市 豊後高田市 杵築市 宇佐市 国東市 姫島村 日出町　 <宮崎県> 宮崎市 都城市 日南市 小林市 日向市 西都市 えびの市 高原町 国富町 綾町 高鍋町 新富町 木城町 川南町 宮崎都農町 門川町 諸塚村 日之影町 五ヶ瀬町　 <鹿児島県> 鹿児島市 阿久根市 鹿児島出水市 薩摩川内市 薩摩川内市甑島 霧島市 いちき串木野市 南さつま市 伊佐市 姶良市 さつま町 湧水町";
    Text[5] = "";
    Text[6] = "<愛媛県> 八幡浜市　 <福岡県> 福岡南区 八女市 筑後市 小郡市 遠賀町 筑前町 大木町 福岡広川町　 <佐賀県> 小城市 みやき町 白石町　 <長崎県> 島原市 諫早市 雲仙市　 <熊本県> 人吉市 荒尾市 水俣市 南関町 津奈木町 山江村 あさぎり町　 <大分県> 大分市 佐伯市 臼杵市 津久見市 玖珠町　 <宮崎県> 延岡市　 <鹿児島県> 長島町";
    Text[7] = "<福岡県> 久留米市 柳川市 大川市 みやま市　 <佐賀県> 佐賀市 神埼市 上峰町　 <長崎県> 南島原市　 <熊本県> 山鹿市 玉東町 長洲町 南小国町 熊本小国町 産山村 熊本高森町 甲佐町 芦北町　 <大分県> 日田市 竹田市 豊後大野市 九重町　 <宮崎県> 椎葉村 宮崎美郷町 高千穂町";
    Text[8] = "<熊本県> 熊本南区 熊本北区 八代市 玉名市 上天草市 阿蘇市 天草市 熊本美里町 和水町 菊陽町 御船町 山都町 氷川町　 <大分県> 別府市 由布市";
    Text[9] = "<熊本県> 熊本中央区 熊本東区 熊本西区 菊池市 宇土市 宇城市 合志市 大津町 南阿蘇村 嘉島町";
    Text[10] = "<熊本県> 西原村 益城町";
  }
  if(siHtem == 6){
    msi = 9+1;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "6.4";
    epicenter = "熊本県熊本地方";
    epicenter_id = 230;
    depth = "10";
    timeYY = "2016";
    timeMM = "4";
    timeDD = "14";
    timeH = "21";
    timeM = "26";
    Text[1] = "<長野県> 諏訪市　 <岐阜県> 海津市　 <大阪府> 岸和田市 泉佐野市 大東市　 <兵庫県> 豊岡市　 <和歌山県> 紀の川市 和歌山美浜町　 <鳥取県> 琴浦町 北栄町 日吉津村 大山町　 <島根県> 松江市 安来市 江津市 雲南市 川本町 島根美郷町 邑南町 津和野町　 <岡山県> 岡山南区 倉敷市 笠岡市 瀬戸内市 赤磐市 浅口市 早島町 里庄町 矢掛町　 <広島県> 広島西区 広島安佐南区 広島安佐北区 広島安芸区 広島佐伯区 三原市 福山市 広島三次市 安芸高田市 海田町 熊野町 安芸太田町 北広島町　 <山口県> 下松市 光市 和木町 上関町 田布施町　 <徳島県> 吉野川市 美馬市 徳島三好市　 <香川県> 高松市 丸亀市 東かがわ市 土庄町 小豆島町 多度津町　 <愛媛県> 西条市 四国中央市 久万高原町 砥部町 内子町　 <高知県> 室戸市 南国市 須崎市 高知香南市 香美市 奈半利町 田野町 芸西村 いの町 仁淀川町 中土佐町 佐川町 越知町 梼原町 高知津野町 四万十町 大月町　 <鹿児島県> 錦江町  屋久島町";
    Text[2] = "<鳥取県> 鳥取市 米子市 境港市 湯梨浜町　 <島根県> 浜田市 出雲市 益田市 大田市 吉賀町　 <岡山県> 玉野市 真庭市　 <広島県> 広島中区 広島南区 呉市 竹原市 尾道市 大竹市 東広島市 廿日市市 江田島市 府中町 坂町 大崎上島町　 <山口県> 萩市 岩国市 長門市 美祢市 周南市 周防大島町 平生町 阿武町　 <徳島県> 徳島市 北島町　 <香川県> 坂出市 観音寺市 三豊市　 <愛媛県> 松山市 大洲市 伊予市 東温市 上島町 愛媛松前町 松野町 愛媛鬼北町 愛南町　 <高知県> 高知市 安芸市 土佐清水市 四万十市 日高村　 <福岡県> 岡垣町 香春町 吉富町　 <佐賀県> 玄海町 有田町　 <長崎県> 佐世保市宇久島 長崎対馬市 壱岐市 五島市 長与町 波佐見町 小値賀町 新上五島町　 <大分県> 別府市 豊後高田市 杵築市 国東市 日出町　 <宮崎県> 日南市 串間市　 <鹿児島県> 鹿屋市 枕崎市 指宿市 垂水市 日置市 志布志市 南九州市 東串良町 南大隅町";
    Text[3] = "<山口県> 宇部市 山口市 防府市 柳井市 山陽小野田市　 <愛媛県> 今治市 宇和島市 八幡浜市 西予市 伊方町　 <高知県> 宿毛市 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州戸畑区 北九州小倉北区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡東区 福岡中央区 福岡南区 福岡西区 福岡城南区 福岡早良区 直方市 飯塚市 田川市 行橋市 豊前市 中間市 筑紫野市 春日市 太宰府市 福津市 うきは市 宮若市 嘉麻市 糸島市 福岡那珂川町 宇美町 篠栗町 志免町 須恵町 久山町 芦屋町 水巻町 遠賀町 小竹町 鞍手町 桂川町 東峰村 大刀洗町 添田町 糸田町 大任町 赤村 福智町 苅田町 上毛町 築上町　 <佐賀県> 鳥栖市 多久市 伊万里市 武雄市 佐賀鹿島市 基山町 大町町 太良町　 <長崎県> 長崎市 佐世保市 大村市 平戸市 松浦市 西海市 時津町 東彼杵町 川棚町 佐々町　 <熊本県> 南小国町 熊本小国町 錦町 湯前町 水上村 相良村 五木村 球磨村　 <大分県> 大分市 中津市 宇佐市 由布市 姫島村 玖珠町　 <宮崎県> 宮崎市 都城市 日向市 えびの市 三股町 高原町 国富町 綾町 高鍋町 新富町 西米良村 木城町 宮崎都農町 門川町 諸塚村 宮崎美郷町 五ヶ瀬町　 <鹿児島県> 鹿児島市 鹿児島出水市 薩摩川内市甑島 曽於市 いちき串木野市 南さつま市 姶良市 大崎町 肝付町";
    Text[4] = "<山口県> 下関市　 <福岡県> 福岡博多区 大牟田市 久留米市 柳川市 八女市 筑後市 大川市 小郡市 大野城市 宗像市 福岡古賀市 朝倉市 みやま市 新宮町 粕屋町 筑前町 大木町 福岡広川町 みやこ町　 <佐賀県> 佐賀市 唐津市 小城市 嬉野市 神埼市 吉野ヶ里町 上峰町 みやき町 江北町 白石町　 <長崎県> 島原市 諫早市 雲仙市 南島原市　 <熊本県> 人吉市 荒尾市 水俣市 山鹿市 玉東町 南関町 産山村 芦北町 津奈木町 多良木町 山江村 あさぎり町 苓北町　 <大分県> 日田市 佐伯市 臼杵市 津久見市 竹田市 豊後大野市 九重町　 <宮崎県> 延岡市 小林市 西都市 川南町 高千穂町 日之影町　 <鹿児島県> 阿久根市 薩摩川内市 霧島市 伊佐市 さつま町 長島町 湧水町";
    Text[5] = "";
    Text[6] = "<熊本県> 八代市 上天草市 阿蘇市 天草市 長洲町 和水町 熊本高森町 南阿蘇村 甲佐町　 <宮崎県> 椎葉村";
    Text[7] = "<熊本県> 熊本中央区 熊本北区 菊池市 宇土市 合志市 熊本美里町 大津町 菊陽町 御船町 山都町 氷川町";
    Text[8] = "<熊本県> 熊本東区 熊本西区 熊本南区 玉名市 宇城市 西原村";
    Text[9] = "";
    Text[10] = "<熊本県> 益城町";
  }
  if(siHtem == 7){
    msi = 6+1;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "8.5";
    epicenter = "小笠原諸島西方沖";
    epicenter_id = 286;
    depth = "590";
    timeYY = "2015";
    timeMM = "5";
    timeDD = "30";
    timeH = "20";
    timeM = "24";
    Text[1] = "<北海道> 札幌中央区 札幌白石区 札幌豊平区 札幌南区 札幌西区 札幌厚別区 札幌清田区 小樽市 釧路市 帯広市 苫小牧市 千歳市 恵庭市 胆振伊達市 当別町 福島町 七飯町 渡島森町 檜山江差町 厚沢部町 岩内町 余市町 斜里町 興部町 厚真町 安平町 浦河町 様似町 新ひだか町 士幌町 厚岸町 標茶町 白糠町 別海町 標津町 羅臼町　 <青森県> 弘前市 黒石市 五所川原市 十和田市 三沢市 つがる市 平川市 今別町 蓬田村 外ヶ浜町 深浦町 西目屋村 藤崎町 田舎館村 板柳町 鶴田町 中泊町 野辺地町 横浜町 六ヶ所村 東通村 風間浦村 佐井村 五戸町 田子町 青森南部町 新郷村　 <岩手県> 宮古市 大船渡市 遠野市 釜石市 雫石町 西和賀町 住田町 山田町　 <宮城県> 気仙沼市 多賀城市 柴田町 七ヶ浜町 女川町　 <秋田県> 能代市 大館市 男鹿市 北秋田市 仙北市 上小阿仁村 藤里町 八峰町 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 山形市 山形金山町 真室川町 大蔵村 鮭川村　 <群馬県> 長野原町　 <新潟県> 津南町 関川村 粟島浦村　 <富山県> 高岡市 魚津市 小矢部市 南砺市 舟橋村 上市町 立山町 入善町 富山朝日町　 <石川県> 小松市 加賀市 かほく市 津幡町 穴水町 能登町　 <福井県> 敦賀市 小浜市 鯖江市 あわら市 越前市 永平寺町 越前町 福井美浜町 高浜町 福井おおい町 福井若狭町　 <山梨県> 山梨南部町　 <長野県> 須坂市 駒ヶ根市 青木村 中川村 宮田村 松川町 阿南町 阿智村 平谷村 根羽村 下條村 売木村 天龍村 泰阜村 喬木村 豊丘村 上松町 南木曽町 木祖村 麻績村 生坂村 朝日村 筑北村 長野池田町 松川村 白馬村 小布施町 長野高山村 山ノ内町 野沢温泉村 栄村　 <岐阜県> 岐阜市 大垣市 瑞浪市 羽島市 恵那市 瑞穂市 郡上市 笠松町 大野町　 <静岡県> 静岡葵区 浜松中区 浜松東区 浜松西区 浜松北区 浜松浜北区 浜松天竜区 島田市 掛川市 藤枝市 湖西市 御前崎市 南伊豆町 吉田町 静岡森町　 <愛知県> 名古屋中区 名古屋緑区 豊橋市 一宮市 半田市 春日井市 豊川市 刈谷市 安城市 西尾市 常滑市 新城市 東海市 大府市 知立市 尾張旭市 高浜市 豊明市 日進市 北名古屋市 東郷町 大治町 阿久比町 東浦町 南知多町 武豊町　 <三重県> 四日市市 鈴鹿市 伊賀市　 <滋賀県> 甲賀市 野洲市 東近江市　 <京都府> 京都上京区 京都中京区 京都下京区 福知山市 舞鶴市 宇治市 宮津市 亀岡市 南丹市 木津川市 井手町 宇治田原町 精華町 与謝野町　 <大阪府> 大阪都島区 大阪福島区 大阪浪速区 大阪東淀川区 大阪生野区 大阪旭区 大阪阿倍野区 大阪東住吉区 大阪西成区 大阪北区 大阪中央区 大阪堺市美原区 池田市 吹田市 泉大津市 貝塚市 八尾市 富田林市 松原市 大阪和泉市 柏原市 羽曳野市 藤井寺市 東大阪市 四條畷市 大阪狭山市 島本町 田尻町 大阪太子町　 <兵庫県> 神戸中央区 加古川市 三木市 丹波市 南あわじ市 朝来市 淡路市 兵庫香美町　 <奈良県> 大和高田市 大和郡山市 天理市 安堵町 奈良川西町 三宅町 田原本町 広陵町 河合町　 <和歌山県> 御坊市 紀の川市 みなべ町 白浜町 那智勝浦町　 <鳥取県>	米子市 倉吉市 鳥取若桜町 智頭町 八頭町 琴浦町　北栄町 大山町 日南町　 <島根県> 松江市 雲南市 島根美郷町 吉賀町 海士町 隠岐の島町　 <岡山県> 岡山東区 岡山南区 倉敷市 津山市 玉野市 新見市 赤磐市 浅口市 里庄町 矢掛町 鏡野町 勝央町　 <広島県>	広島中区 広島南区 広島西区 広島安佐南区 広島安佐北区 竹原市 三原市 尾道市 広島三次市 大竹市 東広島市 安芸高田市 坂町 北広島町 大崎上島町　 <山口県>	宇部市 防府市 岩国市 長門市 山陽小野田市 周防大島町 和木町 平生町 阿武町　 <徳島県> 徳島市 阿南市 吉野川市 美馬市 徳島三好市 つるぎ町　 <香川県>	高松市 観音寺市 東かがわ市 土庄町 小豆島町 多度津町　 <愛媛県> 宇和島市 伊予市　 <高知県> 高知市 室戸市 安芸市 南国市 香美市 奈半利町 大豊町 大川村 黒潮町　 <福岡県> 北九州門司区 北九州若松区 北九州戸畑区 北九州小倉南区 北九州八幡東区 北九州八幡西区 福岡博多区 福岡西区 福岡早良区 大牟田市 久留米市 直方市 飯塚市 田川市 八女市 筑後市 行橋市 豊前市 宗像市 うきは市 宮若市 嘉麻市 朝倉市 新宮町 小竹町 鞍手町 筑前町 大刀洗町 大木町 香春町 添田町 大任町 福智町　 <佐賀県> 唐津市 多久市 武雄市 嬉野市 吉野ヶ里町 みやき町 大町町　 <長崎県> 長崎市 佐世保市 島原市 諫早市 平戸市 松浦市 壱岐市 五島市 雲仙市 川棚町 波佐見町　 <熊本県> 熊本西区 人吉市 水俣市 玉名市 山鹿市 上天草市 産山村 南阿蘇村　 <大分県> 別府市 佐伯市 杵築市 国東市 姫島村　 <宮崎県> 宮崎市 日南市 小林市 新富町 椎葉村 高千穂町　 <鹿児島県> 鹿児島市 鹿屋市 阿久根市 指宿市 薩摩川内市 薩摩川内市甑島 霧島市 いちき串木野市 奄美市 姶良市 鹿児島十島村 さつま町 錦江町 喜界町　<沖縄県> 那覇市 石垣市 名護市 うるま市 宮古島市 南城市 渡嘉敷村 粟国村 渡名喜村 久米島町";
    Text[2] = "<北海道> 札幌北区 札幌東区 札幌手稲区 函館市 石狩市 新篠津村 上ノ国町 ニセコ町 倶知安町 赤井川村 白老町 釧路町　 <青森県> 青森市 八戸市 むつ市 平内町 七戸町 六戸町 東北町 おいらせ町 大間町 階上町　 <岩手県> 盛岡市 花巻市 北上市 久慈市 一関市 八幡平市 奥州市 矢巾町 金ケ崎町 平泉町 普代村 野田村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 塩竈市 白石市 名取市 栗原市 東松島市 七ヶ宿町 村田町 亘理町 山元町 利府町 大和町 大郷町 富谷町 大衡村 色麻町 宮城加美町 南三陸町　 <秋田県> 秋田市 横手市 湯沢市 由利本荘市 潟上市 大仙市 にかほ市 三種町 井川町　 <山形県> 米沢市 鶴岡市 酒田市 新庄市 寒河江市 上山市 村山市 天童市 東根市 尾花沢市 南陽市 山辺町 河北町 西川町 山形朝日町 大江町 大石田町 最上町 舟形町 高畠町 山形川西町 山形小国町 白鷹町 飯豊町 三川町 庄内町 遊佐町　 <福島県> 会津若松市 喜多方市　二本松市 本宮市 川俣町 大玉村 天栄村 下郷町 只見町 南会津町 北塩原村 西会津町 磐梯町 柳津町 福島金山町 福島昭和村 棚倉町 矢祭町 塙町 鮫川村 石川町 平田村 三春町 小野町 福島広野町 富岡町 川内村 葛尾村 飯舘村　 <茨城県> 大洗町 大子町　 <栃木県> 那須烏山市　 <群馬県> 榛東村 群馬上野村 神流町 下仁田町 群馬南牧村 中之条町 嬬恋村 草津町 群馬高山村 東吾妻町 川場村 群馬昭和村 みなかみ町　 <埼玉県> 越生町 小川町 横瀬町 皆野町 長瀞町 東秩父村 寄居町　 <東京都> 青梅市 日の出町 檜原村 奥多摩町 神津島村　 <神奈川県> 葉山町 山北町 箱根町 愛川町　 <新潟県> 新潟北区 新潟東区 新潟中央区 新潟江南区 新潟秋葉区 新潟南区 新潟西区 新潟西蒲区 長岡市 柏崎市 新発田市 小千谷市 十日町市 村上市 燕市 糸魚川市 妙高市 五泉市 上越市 阿賀野市 佐渡市 魚沼市 胎内市 聖籠町 弥彦村 田上町 阿賀町 出雲崎町 湯沢町　 <富山県> 富山市 氷見市 滑川市 射水市　 <石川県> 金沢市 七尾市 輪島市 珠洲市 羽咋市 志賀町 中能登町　 <福井県> 福井坂井市　 <山梨県> 都留市 山梨市 大月市 韮崎市 南アルプス市 甲斐市 上野原市 市川三郷町 身延町 富士川町 昭和町 道志村 西桂町 鳴沢村 小菅村 丹波山村　 <長野県> 長野市 松本市 岡谷市 飯田市 伊那市 中野市 大町市 飯山市 茅野市 塩尻市 千曲市 東御市 安曇野市 小海町 長野川上村 南相木村 北相木村 佐久穂町 長和町 下諏訪町 富士見町 原村 辰野町 箕輪町 飯島町 南箕輪村 長野高森町 木曽町 山形村 小谷村 坂城町 木島平村 信濃町 小川村 飯綱町　 <岐阜県> 中津川市 下呂市 海津市 輪之内町 安八町　 <静岡県> 静岡清水区 浜松南区 熱海市 富士宮市 伊東市 磐田市 焼津市 袋井市 下田市 裾野市 菊川市 牧之原市 東伊豆町 河津町 松崎町 西伊豆町 函南　 長泉町 小山町　 <愛知県> 名古屋千種区 名古屋中川区 名古屋港区 愛知津島市 稲沢市 田原市 愛西市 清須市 弥富市 愛知みよし市 あま市 蟹江町 飛島村　 <滋賀県> 大津市 彦根市 長浜市 近江八幡市 高島市 米原市　 <京都府> 京都伏見区 城陽市 向日市 長岡京市 八幡市 京丹後市 大山崎町 久御山町　 <大阪府>	大阪此花区 大阪西区 大阪港区 大阪大正区 大阪天王寺区 大阪西淀川区 大阪東成区 大阪城東区 大阪住吉区 大阪淀川区 大阪鶴見区 大阪住之江区 大阪平野区 大阪堺市堺区 大阪堺市中区 大阪堺市東区 大阪堺市西区 大阪堺市南区 大阪堺市北区 岸和田市 豊中市 高槻市 守口市 枚方市 茨木市 泉佐野市 寝屋川市 大東市 箕面市 門真市 摂津市 高石市 交野市 忠岡町　 <兵庫県> 西宮市 豊岡市　 <奈良県> 奈良市　 <鳥取県> 鳥取市 境港市 湯梨浜町　 <島根県> 浜田市 出雲市 益田市 大田市　 <岡山県> 真庭市　 <広島県> 呉市 江田島市 府中町　 <山口県> 下関市 山口市 萩市 柳井市　 <愛媛県> 今治市 八幡浜市 伊方町　 <福岡県> 大川市 中間市 みやま市 水巻町 遠賀町　 <佐賀県> 佐賀市 小城市 神埼市 上峰町 江北町 白石町　 <長崎県> 南島原市　 <熊本県> 八代市 宇城市 阿蘇市 天草市 熊本美里町 長洲町 芦北町 津奈木町　 <大分県>	大分市 臼杵市 竹田市 豊後大野市 由布市　 <鹿児島県> 南さつま市 伊佐市 長島町　 <沖縄県> 座間味村";
    Text[3] = "<宮城県> 石巻市 角田市 岩沼市 登米市 大崎市 蔵王町 大河原町 宮城川崎町 丸森町 松島町 涌谷町 宮城美里町　 <山形県> 中山町　 <福島県> 福島市 郡山市 いわき市 白河市 須賀川市 相馬市 田村市 南相馬市 福島伊達市 桑折町 国見町 鏡石町 猪苗代町 会津坂下町 湯川村 会津美里町 西郷村 泉崎村 中島村 矢吹町 玉川村 浅川町 古殿町 楢葉町 大熊町 浪江町 新地町　 <茨城県> 水戸市 日立市 土浦市 結城市 龍ケ崎市 下妻市 高萩市 北茨城市 牛久市 つくば市 ひたちなか市 茨城鹿嶋市 潮来市 守谷市 常陸大宮市 那珂市 かすみがうら市 桜川市 神栖市 行方市 鉾田市 小美玉市 城里町 東海村 美浦村 阿見町 八千代町 五霞町 利根町　 <栃木県> 宇都宮市 足利市 鹿沼市 日光市 小山市 真岡市 大田原市 矢板市 那須塩原市 栃木さくら市 下野市 上三川町 益子町 茂木町 市貝町 芳賀町 壬生町 塩谷町 那須町 栃木那珂川町　 <群馬県> 前橋市 高崎市 桐生市 伊勢崎市 太田市 沼田市 渋川市 藤岡市 富岡市 安中市 みどり市 吉岡町 甘楽町 片品村 玉村町 板倉町 千代田町　 <埼玉県> さいたま西区 さいたま北区 さいたま浦和区 さいたま岩槻区 川越市 秩父市 所沢市 飯能市 本庄市 東松山市 狭山市 羽生市 深谷市 上尾市 越谷市 入間市 朝霞市 和光市 新座市 桶川市 北本市 坂戸市 日高市 ふじみ野市 毛呂山町 滑川町 嵐山町 鳩山町 ときがわ町 小鹿野町 埼玉美里町 埼玉神川町 上里町　 <千葉県> 千葉花見川区 千葉稲毛区 千葉若葉区 千葉緑区 銚子市 松戸市 茂原市 成田市 千葉佐倉市 東金市 旭市 習志野市 勝浦市 八千代市 我孫子市 鎌ケ谷市 富津市 四街道市 袖ケ浦市 八街市 印西市 白井市 富里市 匝瑳市 香取市 山武市 大網白里市 酒々井町 栄町 神崎町 多古町 東庄町 九十九里町 芝山町 横芝光町 一宮町 睦沢町 長南町 大多喜町 御宿町　 <東京都> 東京新宿区 東京台東区 東京目黒区 東京世田谷区 東京中野区 東京杉並区 八王子市 立川市 武蔵野市 三鷹市 東京府中市 昭島市 調布市 町田市 小金井市 小平市 日野市 東村山市 国分寺市 国立市 福生市 狛江市 東大和市 清瀬市 東久留米市 武蔵村山市 多摩市 稲城市 羽村市 あきる野市 西東京市 瑞穂町 伊豆大島町 東京利島村 新島村 三宅村 御蔵島村 八丈町　 <神奈川県> 横浜鶴見区 横浜神奈川区 横浜南区 横浜磯子区 横浜金沢区 横浜港南区 横浜旭区 横浜緑区 横浜瀬谷区 横浜栄区 横浜青葉区 横浜都筑区 川崎中原区 川崎高津区 川崎多摩区 川崎宮前区 川崎麻生区 相模原緑区 相模原中央区 相模原南区 横須賀市 鎌倉市 逗子市 三浦市 秦野市 大和市 伊勢原市 座間市 南足柄市 大磯町 中井町 松田町 開成町 真鶴町 湯河原町 清川村　 <新潟県> 三条市 加茂市 見附市 南魚沼市 刈羽村　 <福井県> 福井市　 <山梨県> 甲府市 富士吉田市 山梨北杜市 笛吹市 甲州市 中央市 山中湖村 富士河口湖町　 <長野県> 上田市 諏訪市 小諸市 長野南牧村 軽井沢町 御代田町 立科町　 <静岡県> 沼津市 三島市 富士市 御殿場市 伊豆市 静岡清水町　 <福岡県> 柳川市";
    Text[4] = "<茨城県> 茨城古河市 石岡市 常総市 常陸太田市 笠間市 取手市 筑西市 坂東市 稲敷市 つくばみらい市 茨城町 河内町 境町　 <栃木県> 栃木市 佐野市 野木町 高根沢町　 <群馬県> 館林市 群馬明和町 大泉町 邑楽町　 <埼玉県> さいたま大宮区 さいたま見沼区 さいたま中央区 さいたま桜区 さいたま南区 さいたま緑区 熊谷市 川口市 行田市 加須市 草加市 蕨市 戸田市 志木市 久喜市 八潮市 富士見市 三郷市 蓮田市 幸手市 鶴ヶ島市 吉川市 白岡市 伊奈町 埼玉三芳町 川島町 吉見町 杉戸町 松伏町　 <千葉県> 千葉中央区 千葉美浜区 市川市 船橋市 館山市 木更津市 野田市 柏市 市原市 流山市 鴨川市 君津市 浦安市 南房総市 いすみ市 長生村 白子町 長柄町 鋸南町　 <東京都> 東京千代田区 東京中央区 東京港区 東京文京区 東京墨田区 東京江東区 東京品川区 東京大田区 東京渋谷区 東京豊島区 東京北区 東京荒川区 東京板橋区 東京練馬区 東京足立区 東京葛飾区 東京江戸川区 青ヶ島村　 <神奈川県> 横浜西区 横浜中区 横浜保土ケ谷区 横浜港北区 横浜戸塚区 横浜泉区 川崎川崎区 平塚市 藤沢市 小田原市 茅ヶ崎市 厚木市 海老名市 綾瀬市 寒川町 神奈川大井町　 <山梨県> 忍野村　 <長野県> 佐久市　 <静岡県> 伊豆の国市";
    Text[5] = "";
    Text[6] = "<埼玉県> 春日部市 鴻巣市 宮代町";
    Text[7] = "<東京都> 小笠原村　 <神奈川県> 二宮町";
    Text[8] = "";
    Text[9] = "";
    Text[10] = "";
  }
  if(siHtem == 8){
    msi = 3;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "8.2";
    epicenter = "サハリン近海";
    epicenter_id = 301;
    depth = "590";
    timeYY = "2013";
    timeMM = "5";
    timeDD = "24";
    timeH = "5";
    timeM = "45";
    Text[1] = "<北海道> 札幌中央区 札幌北区 札幌東区 札幌白石区 札幌西区 札幌厚別区 札幌手稲区 札幌清田区 小樽市 帯広市 苫小牧市 江別市 千歳市 胆振伊達市 石狩市 当別町 檜山江差町 乙部町 倶知安町 岩内町 赤井川村 長沼町 美深町 上川中川町 遠別町 中頓別町 礼文町 斜里町 白老町 厚真町 安平町 浦河町 様似町 新ひだか町 十勝清水町 十勝大樹町 広尾町 本別町 厚岸町 弟子屈町　 <青森県> 弘前市 黒石市 平内町 鰺ヶ沢町 深浦町 西目屋村 六ヶ所村 風間浦村 三戸町 田子町 青森南部町 新郷村　 <岩手県> 北上市 遠野市 一関市 二戸市 雫石町 西和賀町 普代村　 <宮城県> 仙台青葉区 仙台宮城野区 仙台若林区 仙台太白区 仙台泉区 白石市 名取市 角田市 東松島市 蔵王町 宮城川崎町 亘理町 山元町 七ヶ浜町 大郷町 富谷町 大衡村 色麻町 宮城加美町　 <秋田県> 男鹿市 湯沢市 鹿角市 潟上市 北秋田市 仙北市 小坂町 上小阿仁村 藤里町 八峰町 五城目町 八郎潟町 大潟村 秋田美郷町 羽後町 東成瀬村　 <山形県> 米沢市 新庄市 寒河江市 上山市 天童市 尾花沢市 南陽市 山辺町 西川町 大江町 大石田町 山形金山町 舟形町 真室川町 大蔵村 鮭川村 戸沢村 高畠町 山形川西町 山形小国町　 <福島県> 福島市 郡山市 西会津町 猪苗代町 浪江町　 <茨城県> 筑西市　 <埼玉県> さいたま岩槻区 加須市 春日部市 戸田市 久喜市 宮代町　 <東京都> 東京大田区 東京足立区 町田市 青ヶ島村　 <神奈川県> 横浜中区 湯河原町　 <新潟県> 新潟東区 新潟中央区 新潟秋葉区 新潟西区 新潟西蒲区 長岡市 三条市 新発田市 加茂市 見附市 五泉市 上越市 阿賀野市 佐渡市 南魚沼市 胎内市 阿賀町 刈羽村　 <石川県> 輪島市 珠洲市 穴水町 能登町　 <長野県> 諏訪市 長野南牧村 御代田町　 <岐阜県> 中津川市　 <静岡県> 静岡清水区 沼津市 富士市 御殿場市 伊豆市 伊豆の国市 静岡清水町　 <滋賀県> 近江八幡市　 <兵庫県> 豊岡市　 <鳥取県> 鳥取市　 <島根県> 出雲市　 <広島県> 呉市 東広島市 江田島市 府中市　 <徳島県> 吉野川市 石井町　 <佐賀県> 佐賀市 神崎市 みやき町 白石町　 <大分県> 大分市 佐伯市　 <鹿児島県> 錦江町";
    Text[2] = "<北海道> 函館市 釧路市 岩見沢市 稚内市 根室市 渡島北斗市 新篠津村 上ノ国町 天塩町 浜頓別町 豊富町 利尻富士町 幌延町 新冠町 浦幌町 釧路町 浜中町 標茶町 白糠町 別海町 標津町　 <青森県> 青森市 八戸市 五所川原市 十和田市 三沢市 むつ市 つがる市 平川市 今別町 蓬田村 外ヶ浜町 藤崎町 田舎館村 板柳町 青森鶴田町 中泊町 野辺地町 七戸町 六戸町 横浜町 東北町 おいらせ町 大間町 東通村 五戸町 階上町　 <岩手県> 盛岡市 花巻市 久慈市 八幡平市 奥州市 矢巾町 金ケ崎町 野田村　 <宮城県> 石巻市 岩沼市 登米市 栗原市 大崎市 大河原町 丸森町 松島町 利府町 涌谷町 宮城美里町　 <秋田県> 能代市 横手市 大館市 由利本荘市 大仙市 にかほ市 三種町 井川町　 <山形県> 鶴岡市 酒田市 村山市 中山町 河北町 最上町 白鷹町 三川町 庄内町 遊佐町　 <福島県> 会津坂下町　 <新潟県> 村上市";
    Text[3] = "<北海道> 猿払村　 <秋田県> 秋田市";
    Text[4] = "";
    Text[5] = "";
    Text[6] = "";
    Text[7] = "";
    Text[8] = "";
    Text[9] = "";
    Text[10] = "";
  }
  if(siHtem == 9){
    msi = 9+1;
    si = msi;
    seismic_intensity = siList[msi];
    magnitude = "--";
    epicenter = "-------------";
    epicenter_id = 343;
    depth = "--";
    timeYY = "2011";
    timeMM = "3";
    timeDD = "11";
    timeH = "14";
    timeM = "46";
    Text[1] = "<東京都> 小笠原　 <兵庫県> 兵庫県南西部　 <島根県> 島根県隠岐　 <広島県> 広島県北部 広島県南東部 広島県南西部　 <山口県> 山口県西部 山口県中部　 <徳島県> 徳島県南部　 <香川県> 香川県東部 香川県西部　 <愛媛県> 愛媛県東予 愛媛県中予 愛媛県南予　 <高知県> 高知県中部 高知県西部　 <福岡県> 福岡県福岡 福岡県北九州 福岡県筑豊 福岡県筑後　 <長崎県> 長崎県島原半島 長崎県壱岐　 <熊本県> 熊本県熊本 熊本県球磨　 <大分県> 大分県中部　 <鹿児島県> 鹿児島県薩摩";
    Text[2] = "<北海道> 後志地方西部 留萌地方中北部 宗谷地方南部 北海道利尻礼文　 <三重県> 三重県南部　 <京都府> 京都府北部　 <兵庫県> 兵庫県淡路島　 <和歌山県> 和歌山県北部 和歌山県南部　 <鳥取県> 鳥取県東部 鳥取県中部 鳥取県西部　 <島根県> 島根県東部 島根県西部　 <岡山県> 岡山県北部 岡山県南部　 <徳島県> 徳島県北部　 <高知県> 高知県東部　 <佐賀県> 佐賀県南部　 <熊本県> 熊本県阿蘇";
    Text[3] = "<北海道> 石狩地方中部 渡島地方北部 後志地方北部 後志地方東部 北海道奥尻島 空知地方北部 空知地方中部 上川地方北部 上川地方中部 留萌地方南部 宗谷地方北部 網走地方 北見地方 紋別地方 胆振地方西部 釧路地方北部 根室地方北部 根室地方中部 根室地方南部　 <東京都> 伊豆大島 三宅島 八丈島　 <富山県> 富山県東部 富山県西部　 <石川県> 石川県能登 石川県加賀　 <福井県> 福井県嶺北 福井県嶺南　 <岐阜県> 岐阜県飛騨 岐阜県美濃東部　 <愛知県> 愛知県東部　 <三重県> 三重県北部 三重県中部　 <滋賀県> 滋賀県北部 滋賀県南部　 <京都府> 京都府南部　 <大阪府> 大阪府北部 大阪府南部　 <兵庫県> 兵庫県北部 兵庫県南東部　 <奈良県> 奈良県";
    Text[4] = "<北海道> 石狩地方北部 石狩地方南部 渡島地方東部 渡島地方西部 檜山地方 空知地方南部 上川地方南部 胆振地方中東部 日高地方西部 日高地方中部 日高地方東部 十勝地方北部 十勝地方中部 十勝地方南部 釧路地方中南部　 <青森県> 青森県津軽北部 青森県津軽南部　 <秋田県> 秋田県内陸北部　 <東京都> 東京都多摩西部 神津島　 <新潟県> 新潟県上越 新潟県下越 新潟県佐渡　 <長野県> 長野県北部 長野県南部　 <岐阜県> 岐阜県美濃中西部　 <静岡県> 静岡県伊豆 静岡県中部 静岡県西部　 <愛知県> 愛知県西部";
    Text[5] = "";
    Text[6] = "<秋田県> 秋田県沿岸北部　 <山形県> 山形県庄内 山形県最上　 <埼玉県> 埼玉県秩父　 <新潟県> 新潟県中越　 <長野県> 長野県中部　 <静岡県> 静岡県東部";
    Text[7] = "<青森県> 青森県三八上北 青森県下北　 <岩手県> 岩手県沿岸北部　 <秋田県> 秋田県沿岸南部 秋田県内陸南部　 <山形県> 山形県村山 山形県置賜　 <群馬県> 群馬県北部　 <埼玉県> 埼玉県北部　 <千葉県> 千葉県北東部 千葉県南部　 <東京都> 東京都２３区 東京都多摩東部 新島　 <神奈川県> 神奈川県東部 神奈川県西部　 <山梨県> 山梨県中・西部 山梨県東部・富士五湖";
    Text[8] = "<岩手県> 岩手県沿岸南部 岩手県内陸北部 岩手県内陸南部　 <福島県> 福島県会津　 <群馬県> 群馬県南部　 <埼玉県> 埼玉県南部　 <千葉県> 千葉県北西部";
    Text[9] = "<宮城県> 宮城県南部 宮城県中部　 <福島県> 福島県中通り 福島県浜通り　 <茨城県> 茨城県北部 茨城県南部　 <栃木県> 栃木県北部 栃木県南部";
    Text[10] = "<宮城県> 宮城県北部";
  }
  if(magnitude!="--"){
    Text[0] = timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。　震源は"+epicenter+"、地震の規模を示すマグニチュードは"+magnitude;
    if(depth == "ごく浅い"){
      Text[0] += "、震源は"+depth+"です。";
    } else {
      Text[0] += "、震源の深さは"+depth+"kmです。";
    }
  } else {
    Text[0] = "<<震度速報>> "+timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 今後の情報にご注意ください！";
  }
  document.title = "eqVi - 地震情報";
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
      mode = 0;
      lst = 0;
      break;

    case 2:
      TextWidth = strWidth(Text[si]) * -1;
      mode = 2;
      mi = 0;
      break;

    default:
      console.log('error...');
      break;
  }
  tx = 1200;
}

function zenkakuToHankaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}
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
      break;
    case 1:
      return {year:year,month:month,date:date,hour:hour,minute:min,second:sec}
      break;
    case 2:
      return d.getTime();
      break;
    case 3:
      return year+'/'+month+'/'+date+' '+Number(hour)+':'+min+':'+sec;
      break;
    default:
      return '' + year + month + date + hour + min + sec;
      break;
  }
}
function copy(text) {
  var listener = function(e){
      e.clipboardData.setData("text/plain" , text);
      e.preventDefault();
      document.removeEventListener("copy", listener);
  }
  document.addEventListener("copy" , listener);
  document.execCommand("copy");
}

clientInformation;
clientInformation.getBattery().then(function(battery){
  console.log("%c : BatteryManager","font-size: 14px;");
  console.log(battery.charging ? "充電中" : "放電中");
  if(battery.charging){
    console.log(`充電完了までの時間: ${Math.floor(battery.chargingTime/60)}minutes`);
  } else {
    console.log(`バッテリー電源の予測使用可能時間: ${Math.floor(battery.dischargingTime/60)}minutes`);
  }
  console.log(`現在のバッテリー充電量: ${battery.level}`);
});

// NHK様のホームページから取得できたURL:
//   https://www3.nhk.or.jp/weather/amds/amds_data.xml
//   https://www3.nhk.or.jp/weather/cld_pic/cld_pic_data.xml
//   https://www3.nhk.or.jp/sokuho/tsunami/data/publish.xml
//   https://www3.nhk.or.jp/news/json16/realtime_saigai.json

/*

if (canvas1.getContext) {

  var context = canvas1.getContext('2d');


  //左から20上から40の位置に、幅50高さ100の四角形を描く
  context.fillRect(20,40,50,100);

  //色を指定する
  context.strokeStyle = 'rgb(00,00,255)'; //枠線の色は青
  context.fillStyle = 'rgb(255,00,00)'; //塗りつぶしの色は赤

  //左から200上から80の位置に、幅100高さ50の四角の枠線を描く
  context.strokeRect(200,80,100,50);

  //左から150上から75の位置に、半径60の半円を反時計回り（左回り）で描く
  context.arc(150,75,60,Math.PI*1,Math.PI*2,true);
  context.fill();
}


Mac Safari 13.0.5
navigator.language = ja-JP
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15

Mac Chrome
navigator.language = ja
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Google Inc.
navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36

iPhone LINE browser
navigator.language = ja-JP
navigator.playform = iPhone
navigator.product = Geoko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozila/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Geoko) Mobile/15E148 Safari Line/10.1.1

iPad Safari
navigator.language = ja-JP
navigator.playform = MacIntel
navigator.product = Geoko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozila/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Geoko) Version/13.0.5 Safari/605.1.15

iPhone あんしん(フィルタリング有)
navigator.language = ja-JP
navigator.playform = iPhone
navigator.product = Geoko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozila/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Geoko) Version/13.0 Mobile/15E148 Safari/605.1.15 i-filter/sbm-safety/1.00.08.0004

Mac Firefox
navigator.language = ja
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20100101
navigator.vendor =
navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0

Mac Opera
navigator.language = ja
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Google Inc.
navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72

iPhone Safari 12.1.3 (in Mac Safari)
navigator.language = ja-JP
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1

iPod touch 12.1.3 (in Mac Safari)
navigator.language = ja-JP
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozilla/5.0 (iPod; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1

iPad 12.1.3 (in Mac Safari)
navigator.language = ja-JP
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozilla/5.0 (iPad; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1

Microsoft Edge (in Mac Safari)
navigator.language = ja-JP
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.navigator.userAgent = Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299

Windows Google Chrome (in Mac Safari)
navigator.language = ja-JP
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36

Windows Firefox (in Mac Safari)
navigator.language = ja-JP
navigator.playform = MacIntel
navigator.product = Gecko
navigator.productSub = 20030107
navigator.vendor = Apple Computer, Inc.
navigator.userAgent = Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0

*/
/** 実装したい機能
 * 地震情報の市町村指定(無理)
 * 緊急地震速報の下限震度指定(需要...)
 * 予想震度が不明だった際の下限マグニチュードを指定(？)
 * 緊急地震速報の地図表示(完成！)
 */

// 便利なjavasctiptの書式: 条件(三項)演算子
 /*


   context.fillStyle = "#2b4aad";
   context.fillRect(0, 60, 900, 68);
   context.fillStyle = "#233d91";
   context.fillRect(0, 0, 900, 60);
   context.fillStyle ="#ffea00";
   context.font = "bold 53px 'Microsoft Sans Serif', JPAPGothic";
   context.fillText("緊急地震速報", 3, 50, 250);
   context.font = "bold 39px 'Microsoft Sans Serif', JPAPGothic";
   context.fillText("EEW", 255, 55, 60);
   context.fillStyle = "#000";
   context.fillRect(320,4,10,54);
   context.fillStyle="#fff";
   context.font = "bold 28px 'Microsoft Sans Serif', JPAPGothic";
   context.fillText("最大", 3, 90, 45);
   context.fillText("震度", 3, 119, 45);
   context.fillText("震", 318, 90, 23);
   context.fillText("源", 318, 119, 23);
   if(!eewIsAssumption){
     context.fillText("深さ", 725, 88, 45);
     context.font = "bold 40px 'Microsoft Sans Serif', JPAPGothic";
     context.fillText("M", 170, 118, 35);
     context.fillText(eewDepth+"km", 750, 123, 100);
   }
   context.font = "bold 55px 'Microsoft Sans Serif', JPAPGothic";
   context.fillText(eewCalcintensity, 50, 115, 95);
   context.fillText(eewEpicenter, 344, 115, 350);
   if(!eewIsAssumption){
     context.font = "bold 58px 'Microsoft Sans Serif', JPAPGothic";
     context.fillText(eewMagnitude, 205, 115, 100);
   }
   context.fillStyle = "#777";
   context.fillRect(900, 0, 5, 128);


       context.fillStyle = "#b8240d";
       context.fillRect(0, 60, 900, 68);
       context.fillStyle = "#c42810";
       context.fillRect(0, 0, 900, 60);
       context.fillStyle ="#ffea00";
       context.font = "bold 53px 'Microsoft Sans Serif', JPAPGothic";
       context.fillText("緊急地震速報", 3, 50, 250);
       context.font = "bold 39px 'Microsoft Sans Serif', JPAPGothic";
       context.fillText("EEW", 255, 55, 60);
       context.fillStyle = "#f22";
       context.fillRect(320,4,10,54);
       context.fillStyle="#fff";
       context.font = "bold 28px 'Microsoft Sans Serif', JPAPGothic";
       context.fillText("最大", 3, 90, 45);
       context.fillText("震度", 3, 119, 45);
       context.fillText("震", 318, 90, 23);
       context.fillText("源", 318, 119, 23);
       if(!eewIsAssumption){
         context.fillText("深さ", 725, 88, 45);
         context.font = "bold 40px 'Microsoft Sans Serif', JPAPGothic";
         context.fillText("M", 170, 118, 35);
         context.fillText(eewDepth+"km", 750, 123, 100);
       }
       context.font = "bold 55px 'Microsoft Sans Serif', JPAPGothic";
       context.fillText(eewCalcintensity, 50, 115, 95);
       context.fillText(eewEpicenter, 344, 115, 350);
       if(!eewIsAssumption){
         context.font = "bold 58px 'Microsoft Sans Serif', JPAPGothic";
         context.fillText(eewMagnitude, 205, 115, 100);
       }
       context.fillStyle = "#777";
       context.fillRect(900, 0, 5, 128);

 */
