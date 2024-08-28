var aaaa
var canvas1 = document.getElementById('sample1');
var context = canvas1.getContext('2d');
var canvas2 = document.getElementById('sample2');
var time = canvas2.getContext('2d');
var earthquakeReceiveSound = {
  'main' : document.getElementById('EI'),
  'warning' : document.getElementById('EI5H'),
  'tsunami' : {
    'Notice': document.getElementById('TW'),
    'Watch' : document.getElementById('TW'),
    'Warning' : document.getElementById('TW'),
    'Majorwarning' : document.getElementById('TW')
  }
}
var earthquakeReceiveVolumeList = [0.1,0.3,0.6,0.8,0.6,0.6,0.7,0.85,1];
var mscaleColor = [
  ["#5a94f2","#d1d900","#ff3d3d"],
  ["#4169e1","#edde0c","#ff1212"],
  ["#71f043","#d184f5","#71f043"],
  ["#f0ff4a","#1b9ae3","#f0ff4a"]
];
var mscale = 1;

var aa = 0;

var tx = 1200;

var Text = ["","","","","","","","","","",""];
var shindo_name_ = ["石狩地方北部","石狩地方中部","石狩地方南部","後志地方北部","後志地方東部","後志地方西部","空知地方北部","空知地方中部","空知地方南部","渡島地方北部","渡島地方東部","渡島地方西部","檜山地方","北海道奥尻島","胆振地方西部","胆振地方中東部","日高地方西部","日高地方中部","日高地方東部","上川地方北部","上川地方中部","上川地方南部","留萌地方中北部","留萌地方南部","宗谷地方北部","宗谷地方南部","北海道利尻礼文","網走地方","北見地方","紋別地方","十勝地方北部","十勝地方中部","十勝地方南部","釧路地方北部","釧路地方中南部","根室地方北部","根室地方中部","根室地方南部","青森県津軽北部","青森県津軽南部","青森県三八上北","青森県下北","岩手県沿岸北部","岩手県沿岸南部","岩手県内陸北部","岩手県内陸南部","宮城県北部","宮城県中部","宮城県南部","秋田県沿岸北部","秋田県沿岸南部","秋田県内陸北部","秋田県内陸南部","山形県庄内","山形県最上","山形県村山","山形県置賜","福島県中通り","福島県浜通り","福島県会津","茨城県北部","茨城県南部","栃木県北部","栃木県南部","群馬県北部","群馬県南部","埼玉県北部","埼玉県南部","埼玉県秩父","千葉県北東部","千葉県北西部","千葉県南部","東京都２３区","東京都多摩東部","東京都多摩西部","伊豆大島","新島","神津島","三宅島","八丈島","小笠原","神奈川県東部","神奈川県西部","新潟県上越","新潟県中越","新潟県下越","新潟県佐渡","富山県東部","富山県西部","石川県能登","石川県加賀","福井県嶺北","福井県嶺南","山梨県東部・富士五湖","山梨県中・西部","長野県北部","長野県中部","長野県南部","岐阜県飛騨","岐阜県美濃東部","岐阜県美濃中西部","伊豆地方","静岡県東部","静岡県中部","静岡県西部","愛知県東部","愛知県西部","三重県北部","三重県中部","三重県南部","滋賀県北部","滋賀県南部","京都府北部","京都府南部","大阪府北部","大阪府南部","兵庫県北部","兵庫県南東部","兵庫県南西部","兵庫県淡路島","奈良県","和歌山県北部","和歌山県南部","鳥取県東部","鳥取県中部","鳥取県西部","島根県東部","島根県西部","島根県隠岐","岡山県北部","岡山県南部","広島県北部","広島県南東部","広島県南西部","山口県北部","山口県東部","山口県中部","山口県西部","徳島県北部","徳島県南部","香川県東部","香川県西部","愛媛県東予","愛媛県中予","愛媛県南予","高知県東部","高知県中部","高知県西部","福岡県福岡","福岡県北九州","福岡県筑豊","福岡県筑後","佐賀県北部","佐賀県南部","長崎県北部","長崎県南西部","長崎県島原半島","長崎県対馬","長崎県壱岐","長崎県五島","熊本県阿蘇","熊本県熊本","熊本県球磨","熊本県天草・芦北","大分県北部","大分県中部","大分県南部","大分県西部","宮崎県北部平野部","宮崎県北部山沿い","宮崎県南部平野部","宮崎県南部山沿い","鹿児島県薩摩","鹿児島県大隅","鹿児島県十島村","鹿児島県甑島","鹿児島県種子島","鹿児島県屋久島","鹿児島県奄美北部","鹿児島県奄美南部","沖縄県本島北部","沖縄県本島中南部","縄県久米島","沖縄県大東島","沖縄県宮古島","沖縄県石垣島","沖縄県与那国島","沖縄県西表島"]
var shindo_name = ["石狩北部","石狩中部","石狩南部","後志北部","後志東部","後志西部","空知北部","空知中部","空知南部","渡島北部","渡島東部","渡島西部","檜山地方","北海道奥尻島","胆振西部","胆振中東部","日高西部","日高中部","日高東部","上川地方北部","上川地方中部","上川地方南部","留萌中北部","留萌南部","宗谷北部","宗谷南部","北海道利尻礼文","網走地方","北見地方","紋別地方","十勝北部","十勝中部","十勝南部","釧路北部","釧路中南部","根室北部","根室中部","根室南部","津軽北部","津軽南部","青森三八上北","青森下北","岩手沿岸北部","岩手沿岸南部","岩手内陸北部","岩手内陸南部","宮城北部","宮城中部","宮城南部","秋田沿岸北部","秋田沿岸南部","秋田内陸北部","秋田内陸南部","山形庄内地方","山形最上地方","山形村山地方","山形置賜地方","福島中通り","福島浜通り","会津","茨城北部","茨城南部","栃木北部","栃木南部","群馬北部","群馬南部","埼玉北部","埼玉南部","秩父地方","千葉北東部","千葉北西部","千葉南部","東京２３区","東京多摩東部","東京多摩西部","伊豆大島","新島地方","神津島","三宅島","八丈島","小笠原","神奈川東部","神奈川西部","新潟上越地方","新潟中越地方","新潟下越地方","佐渡地方","富山東部","富山西部","能登地方","加賀地方","福井嶺北地方","福井嶺南地方","山梨東部・富士五湖","山梨中・西部","長野北部","長野中部","長野南部","飛騨地方","美濃東部","美濃中西部","伊豆地方","静岡東部","静岡中部","静岡西部","愛知東部","愛知西部","三重北部","三重中部","三重南部","滋賀北部","滋賀南部","京都北部","京都南部","大阪北部","大阪南部","兵庫北部","兵庫南東部","兵庫南西部","淡路島","奈良県","和歌山北部","和歌山南部","鳥取東部","鳥取中部","鳥取西部","島根東部","島根西部","隠岐","岡山北部","岡山南部","広島北部","広島南東部","広島南西部","山口北部","山口東部","山口中部","山口西部","徳島北部","徳島南部","香川東部","香川西部","愛媛東予地方","愛媛中予地方","愛媛南予地方","高知東部","高知中部","高知西部","福岡地方","北九州地方","筑豊地方","筑後地方","佐賀北部","佐賀南部","長崎北部","長崎南西部","島原半島","対馬地方","壱岐地方","五島地方","阿蘇地方","熊本地方","球磨地方","天草・芦北","大分北部","大分中部","大分南部","大分西部","宮崎北部平野部","宮崎北部山沿い","宮崎南部平野部","宮崎南部山沿い","薩摩地方","大隅地方","十島村","甑島","種子島地方","屋久島地方","奄美北部","奄美南部","沖縄本島北部","沖縄本島中南部","久米島","大東島","宮古島","石垣島","与那国島","西表島"]
var epiCode = [100,101,102,105,106,107,110,115,116,117,120,121,122,125,126,127,130,131,135,136,140,141,142,145,146,150,151,152,155,156,157,160,161,165,166,167,180,181,182,183,184,186,187,188,189,190,191,192,193,194,195,196,197,200,201,202,203,210,211,212,213,220,221,222,230,231,232,233,240,241,242,243,250,251,252,280,281,282,283,284,285,286,287,288,289,300,301,309,310,311,320,321,330,331,332,340,341,342,349,350,351,352,360,361,370,371,372,378,379,380,381,390,391,400,401,411,412,420,421,422,430,431,432,440,441,442,443,450,451,460,461,462,469,471,472,473,475,476,477,478,480,481,482,483,485,486,487,489,490,492,493,494,495,497,498,499,500,501,510,511,520,521,530,531,532,540,550,551,560,562,563,570,571,580,581,590,591,592,600,601,610,611,620,621,622,630,631,632,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,700,702,703,704,710,711,712,713,720,721,730,731,732,740,741,742,743,750,751,752,753,760,761,762,763,770,771,783,784,785,786,787,790,791,793,795,796,797,798,799,820,821,822,823,850,851,852,853,854,855,856,857,858,859,860,900,901,902,903,904,905,906,907,908,909,911,912,913,914,915,916,917,918,919,920,921,922,930,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,999];
var epiList = new Array(2);
epiList[0] = ["石狩地方北部","石狩地方中部","石狩地方南部","渡島地方北部","渡島地方東部","渡島地方西部","檜山地方","後志地方北部","後志地方東部","後志地方西部","空知地方北部","空知地方中部","空知地方南部","上川地方北部","上川地方中部","上川地方南部","留萌地方中北部","留萌地方南部","宗谷地方北部","宗谷地方南部","網走地方","北見地方","紋別地方","胆振地方西部","胆振地方中東部","日高地方西部","日高地方中部","日高地方東部","十勝地方北部","十勝地方中部","十勝地方南部","釧路地方北部","釧路地方中南部","根室地方北部","根室地方中部","根室地方南部","北海道南西沖","北海道西方沖","石狩湾","北海道北西沖","宗谷海峡","国後島付近","択捉島付近","北海道東方沖","根室半島南東沖","釧路沖","十勝沖","浦河沖","苫小牧沖","内浦湾","宗谷東方沖","網走沖","択捉島南東沖","青森県津軽北部","青森県津軽南部","青森県三八上北地方","青森県下北地方","岩手県沿岸北部","岩手県沿岸南部","岩手県内陸北部","岩手県内陸南部","宮城県北部","宮城県南部","宮城県中部","秋田県沿岸北部","秋田県沿岸南部","秋田県内陸北部","秋田県内陸南部","山形県庄内地方","山形県最上地方","山形県村山地方","山形県置賜地方","福島県中通り","福島県浜通り","福島県会津","津軽海峡","山形県沖","秋田県沖","青森県西方沖","陸奥湾","青森県東方沖","岩手県沖","宮城県沖","三陸沖","福島県沖","茨城県北部","茨城県南部","千葉県南東沖","栃木県北部","栃木県南部","群馬県北部","群馬県南部","埼玉県北部","埼玉県南部","埼玉県秩父地方","千葉県北東部","千葉県北西部","千葉県南部","房総半島南方沖","東京都23区","東京都多摩東部","東京都多摩西部","神奈川県東部","神奈川県西部","新潟県上越地方","新潟県中越地方","新潟県下越地方","新潟県下越沖","新潟県上中越沖","富山県東部","富山県西部","石川県能登地方","石川県加賀地方","福井県嶺北","福井県嶺南","山梨県中・西部","山梨県東部・富士五湖","長野県北部","長野県中部","長野県南部","岐阜県飛騨地方","岐阜県美濃東部","岐阜県美濃中西部","静岡県伊豆地方","静岡県東部","静岡県中部","静岡県西部","愛知県東部","愛知県西部","三重県北部","三重県中部","三重県南部","三重県南東沖","茨城県沖","関東東方沖","千葉県東方沖","八丈島東方沖","八丈島近海","東京湾","相模湾","伊豆大島近海","伊豆半島東方沖","三宅島近海","新島・神津島近海","駿河湾","駿河湾南方沖","遠州灘","三河湾","伊勢湾","若狭湾","福井県沖","石川県西方沖","能登半島沖","富山湾","佐渡付近","東海道南方沖","滋賀県北部","滋賀県南部","京都府北部","京都府南部","大阪府北部","大阪府南部","兵庫県北部","兵庫県南東部","兵庫県南西部","奈良県","和歌山県北部","和歌山県南部","鳥取県東部","鳥取県中部","鳥取県西部","島根県東部","島根県西部","岡山県北部","岡山県南部","広島県北部","広島県南東部","広島県南西部","徳島県北部","徳島県南部","香川県東部","香川県西部","愛媛県東予","愛媛県中予","愛媛県南予","高知県東部","高知県中部","高知県西部","土佐湾","紀伊水道","大阪湾","播磨灘","瀬戸内海中部","安芸灘","周防灘","伊予灘","豊後水道","山口県北西沖","島根県沖","鳥取県沖","隠岐島近海","兵庫県北方沖","京都府沖","淡路島付近","和歌山県南方沖","山口県北部","山口県西部","山口県東部","山口県中部","福岡県福岡地方","福岡県北九州地方","福岡県筑豊地方","福岡県筑後地方","佐賀県北部","佐賀県南部","長崎県北部","長崎県南西部","長崎県島原半島","熊本県阿蘇地方","熊本県熊本地方","熊本県球磨地方","熊本県天草・芦北地方","大分県北部","大分県中部","大分県南部","大分県西部","宮崎県北部平野部","宮崎県北部山沿い","宮崎県南部平野部","宮崎県南部山沿い","鹿児島県薩摩地方","鹿児島県大隅地方","五島列島近海","天草灘","有明海","橘湾","鹿児島湾","種子島近海","日向灘","奄美大島近海","壱岐・対馬近海","福岡県北西沖","薩摩半島西方沖","トカラ列島近海","奄美大島北西沖","大隅半島東方沖","九州地方南東沖","種子島南東沖","奄美大島北東沖","沖縄本島近海","南大東島近海","沖縄本島南方沖","宮古島近海","石垣島近海","石垣島南方沖","西表島付近","与那国島近海","沖縄本島北西沖","宮古島北西沖","石垣島北西沖","台湾付近","東シナ海","四国沖","鳥島近海","鳥島東方沖","オホーツク海南部","サハリン西方沖","日本海北部","日本海中部","日本海西部","父島近海","千島列島","千島列島南東沖","北海道南東沖","東北地方東方沖","小笠原諸島西方沖","硫黄島近海","小笠原諸島東方沖","南海道南方沖","薩南諸島東方沖","本州南方沖","サハリン南部付近","北西太平洋","マリアナ諸島","黄海","朝鮮半島南部","朝鮮半島北部","中国東北部","ウラジオストク付近","シベリア南部","サハリン近海","アリューシャン列島","カムチャツカ半島付近","北米西部","北米中部","北米東部","中米","南米西部","南米中部","南米東部","北東太平洋","南太平洋","インドシナ半島付近","フィリピン付近","インドネシア付近","グアム付近","ニューギニア付近","ニュージーランド付近","オーストラリア付近","シベリア付近","ロシア西部","ロシア中部","ロシア東部","中央アジア","中国西部","中国中部","中国東部","インド付近","インド洋","中東","ヨーロッパ西部","ヨーロッパ中部","ヨーロッパ東部","地中海","アフリカ西部","アフリカ中部","アフリカ東部","北大西洋","南大西洋","北極付近","南極付近","遠地"];
//var shindo_name = ["石狩地方北部","石狩地方中部","石狩地方南部","後志地方北部","後志東部","後志西部","空知地方北部","空知中部","空知南部","渡島北部","渡島東部","渡島西部","檜山地方","北海道奥尻島","胆振西部","胆振中東部","日高西部","日高中部","日高東部","上川地方北部","上川地方中部","上川地方南部","留萌地方中北部","留萌地方南部","北海道利尻礼文","網走地方","北見地方","紋別地方","十勝北部","十勝中部","十勝南部","釧路北部","釧路中南部","根室地方北部","根室地方中部","根室地方南部","青森県津軽北部","青森県津軽南部","青森三八上北","青森県下北","岩手沿岸北部","岩手沿岸南部","岩手内陸北部","岩手内陸南部","宮城北部","宮城中部","宮城南部","秋田沿岸北部","秋田沿岸南部","秋田内陸北部","秋田内陸南部","山形庄内地方","山形最上地方","山形村山地方","山形置賜地方","福島中通り","福島浜通り","会津","茨城北部","茨城南部","栃木北部","栃木南部","群馬北部","群馬南部","埼玉北部","埼玉南部","秩父地方","千葉北東部","千葉北西部","千葉南部","東京２３区","東京多摩東部","東京多摩西部","伊豆大島","新島地方","神津島","三宅島","八丈島","小笠原","神奈川東部","神奈川西部","新潟県上越","新潟中越地方","新潟下越地方","新潟県佐渡","富山県東部","富山県西部","石川県能登","加賀地方","福井嶺北地方","福井嶺南地方","山梨東部・富士五湖","山梨中・西部","長野北部","長野中部","長野南部","飛騨地方","美濃東部","美濃中西部","伊豆地方","静岡東部","静岡中部","静岡西部","愛知東部","愛知西部","三重北部","三重中部","三重南部","滋賀北部","滋賀南部","京都北部","京都南部","大阪北部","大阪南部","兵庫北部","兵庫南東部","兵庫南西部","淡路島","奈良県","和歌山県北部","和歌山県南部","鳥取東部","鳥取中部","鳥取西部","島根東部","島根西部","隠岐","岡山北部","岡山南部","広島北部","広島南東部","広島南西部","山口北部","山口東部","山口中部","山口西部","徳島県北部","徳島県南部","香川東部","香川西部","愛媛東予地方","愛媛県中予","愛媛県南予","高知東部","高知中部","高知西部","福岡地方","北九州地方","筑豊地方","筑後地方","佐賀北部","佐賀南部","長崎北部","長崎南西部","島原半島","長崎県対馬","長崎県壱岐","長崎県五島","阿蘇地方","熊本地方","球磨地方","天草・芦北","大分北部","大分中部","大分南部","大分西部","宮崎北部平野部","宮崎北部山沿い","宮崎南部平野部","宮崎南部山沿い","薩摩地方","大隅地方","鹿児島県十島村","甑島","鹿児島県種子島","鹿児島県屋久島","鹿児島県奄美北部","鹿児島県奄美南部","沖縄県本島北部","沖縄県本島中南部","沖縄県久米島","沖縄県大東島","沖縄県宮古島","沖縄県石垣島","沖縄県与那国島","沖縄県西表島"]
var setParam = '';
var msi = -1; //「+1」の部分は、震度に「5弱以上と推定」を追加した部分。
var si = msi;
var siList = ["情報","1","2","3","4","5弱以上","5弱","5強","6弱","6強","7"];
//var nhkSiList = ["","1","2","3","4","?","5-","5+","6-","6+","7"]
var seismic_intensity = siList[msi];
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
var siHnum,
    siHstr,
    speed = 3.9,
    mode = 0,
    language = "Ja",
    timeCount = 0,
    DText = [
      '<weather/wind>',
      '<weather/rain>',
      '<weather/river>',
      '大雨特別警報が岐阜県・長野県に大雨特別警報が発表されました。これまでに経験したことのないような大雨となっています。何らかの災害がもう既に発生している可能性が高く、警戒レベル5(最も高い)に相当する状況です。命を守るために最善を尽くさなければいけない状況となっています。',
      '',
      '風速情報(m/s)',
      '降水情報',
      '河川情報',
      '大雨特別警報',
      ''
    ], /*大型で非常に強い台風19号（ハギビス）は、15時現在、八丈島の南南西約550kmにあって、北北西に25km/sで進んでいます。中心付近の気圧は925hPa、最大風速は50m/s、最大瞬間風速は70km/sとなっています。24時間後には、御前崎の南約160kmに進む見込みです。*/
    /*ｲﾙﾐﾈｰｼｮﾝCh.:ウェザーニュースのイルミネーションChでは、全国のイルミネーションの天気予報はもちろん、開催期間やスポットの写真など、情報が満載。また「キラリ写真館」では、全国のウェザーニュース会員から届いたイルミネーションの写真を記載しています。イルミネーション鑑賞に、ぜひご活用ください。*/
    /*道路交通情報:ウェザーニュースでは、みなさまからのリポート投稿や、チャットでのご参加をお待ちしております。スマートフォンアプリ「ウェザーニュース」や、Webサイト、YouTube、ニコニコ動画、AbemaTV等の動画サイトからご参加いただけます。*/
    Dmode = [2,1,3,0,0];
    Dcnt = 5,
    Nnum = 0,
    lst = 0,
    lastPre = "";
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
    allcitykana = [];
var eewRegionName = '',
    eewOriginTime = '',
    eewCalcintensity = '',
    eewDepth = '',
    eewAlertFlgText = '',
    eewCancelText = '',
    eewMagnitude = '',
    eewReportNumber = '';
var i = 0,
    i2 = 0;
var BNtitle = "",
    BNtext1 = "",
    BNtext2 = "";
var nowTsunamiID,
    cancelled,
    created_at,
    issue_time,
    tGrade,
    tImmediate,
    tName,
    lastTsunamiID,
    updateFlg = false;
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

$(function(){
    $.ajax({
        type: 'GET',
        url: 'https://data.svir.jp/intens-st/api/v3/position?alldata',
        dataType: 'json',
        async: false,
        cache: true,
        success: function(data){
          allcitydata = data;
          for(i = 0; i < allcitydata['items'].length; i++){
            allcity.push(allcitydata['items'][i]['city']['name']);
            allprefecture.push(allcitydata['items'][i]['prefecture']['name']);
            allcitykana.push(allcitydata['items'][i]['city']['kana']);
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
  Text[0] = "<<地震速報>> "+timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 "+multilingual[0][63]+"　　　　　　　The earthquake has occurred at "+timeH+":"+timeM+".  This earthquake resulted in "+siList[msi]+" of the maximum seismic intensity recorded.  "+multilingual[1][63];
}

/*if(window.Notification){
  if(Notification.permission === "denied"){
    Notification.requestPermission(function(result){
      console.log("Notification.requestPermission(): "+result);
    });
  }
}*/
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

function goMessage(){
  Nnum = 0;
  tx = 1200;
  mode = 0;
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
  for (var i = 0; i < 5; i++) {
    if(DText[i] !== ""){
      Dcnt += 1;
    }
  }
  for (var i = 0; i < 5; i++) {
    Dmode[i] = 0;
    if(DText[i] == "<weather/rain>")Dmode[i] = 1;
    if(DText[i] == "<weather/wind>")Dmode[i] = 2;
    if(DText[i] == "<weather/river>")Dmode[i] = 3;
    if(DText[i] == "<weathernews/live/timetable>")Dmode[i] = 11;
  }
  if(!Dcnt){
    Dcnt = 1;
  }
}

function titleChange(){
  switch (mode) {
    case 0:
      document.title="eqVi - 通常";
      break;
    case 1:
      document.title="eqVi - 緊急地震速報";
      break;
    case 3:
      document.title="eqVi - 気象警報";
      break;
    case 2:
      document.title="eqVi - 地震情報";
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
            switch (index) {
              case 0:
              case 2:
                mode = index;
                tx = 1200;
                language = "Ja";
                timeCount = 217;
                break;
            }
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
    $('.box button').eq(0).on('click', function(){
        $('#menu .eiList').animate({height:'toggle'}, 120);
        $('#menu .eiwind').toggle(200);
        $('#menu .eiTitle').toggle(200);
        $('#menu .tsunamiList').hide(200);
        $('#menu .dataList').hide(200);
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
    });
    $('.box button').eq(3).on('click', function(){
        $('#menu .eiList').animate({height:'hide'}, 200);
        $('#menu .eiwind').hide(200);
        $('#menu .eiTitle').hide(200);
        $('#menu .tsunamiList').hide(200);
        $('#menu .dataList').hide(200);
    });
    $('.box button').eq(4).on('click', function(){
        if(confirm("This is a button that opens another window.\n- Do you really want to open it?")){
          window.open('https://twitter.com/Zisin_YT_LiVe');
        } else {
          alert('Cancelled.');
        };
    });
});
$(function(){
    $('.jQueryUI-resizable').resizable({
        minWidth: 400,
        maxWidth: 1000,
        ghost: true,
        handles: 'w',
        minHeight: 120,
        maxHeight: 120
    })
});

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
  BNtitle = document.getElementById('BNtitle').value;
  BNtext1 = document.getElementById('BNtext1').value;
  BNtext2 = document.getElementById('BNtext2').value;
  mode = 3;
  tx = 0;
  titleChange();
  breakingtime = -2;
}

var key = new Array(230);
for(fn = 0; fn < 230; fn++){
  key[fn] = false;
}
var keyWord = "";
var quake = {reportId:"",year:"",month:"",date:"",hour:"",minute:"",second:"",longitude:"",latitude:"",depth:"",magnitude:"",isAlert:false,epicenter:""};
document.onkeydown = keydown;
document.onkeyup = keyup;
var keyList = ["",/*0*/"",/*1*/"",/*2*/"",/*3*/"",/*4*/"",/*5*/"",/*6*/"",/*7*/"",/*8:backspace*/"tab",/*9*/"",/*10*/"","","","",""," ","ctrl","alt","pausebreak","capslock",/*20*/"","","","","","","esc","","","",/*30*/""," ","pageup","pagedown","end","home","left","up","right","down",/*40*/"","","","","insert","delete","","0","1","2",/*50*/"3","4","5","6","7","8","9",":",";","",/*60*/"","","","","a","b","c","d","e","f",/*70*/"g","h","i","j","k","l","m","n","o","p",/*80*/"q","r","s","t","u","v","w","x","y","z",/*90*/"","","","","","0","1","2","3","4",/*100*/"5","6","7","8","9","*","+","-",".","/",/*110*/"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","^",",","",".","/","","","","","","","","","","","","","","","","","","","","","","","","","","","","[","","]","","",
];
var aieuo = 0;
var videoInterval;
function keydown(){
  key[event.keyCode] = true;
  keyWord += keyList[event.keyCode];
  if(event.keyCode == 13){
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
    quake.epicenter = epiCode.indexOf(Number(keyWord.slice(35, 38)));
    keyWord = "";
  }
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

var soraopen_moving = 1081;
var soraopen_move = null;
var intervalArray = new Array();
var soraopen_color = 0;
var soraopen_intervaltime = 0;
var intervalTime = 0;
var intervalTime1 = 0;
var soraopen_interval1 = null;
var earthquake_telop_times = 0;
var earthquake_telop_remaining = 1500;
var timer = setInterval(function(){
  //背景(White)
  drawRect(0, 0, 1080, 128, "#FFFFFF");
  context.font = '40px "游ゴシック Medium","Yu Gothic Medium","游ゴシック体",YuGothic,sans-serif';
  var TextWidth;
  switch (mode) {
    case 0:
      TextWidth = -(strWidth(DText[Nnum])) - 200;
      break;

    default:
      TextWidth = strWidth(Text[si]) * -1;
      break;
  }

  var nowDate = new Date();

  tx -= speed;
  if((timeCount%150) == 1){
    downloadData();
  }
  if((startTime%1500) == 1){
    loadTsunami();
  }
  if((startTime%30) == 1){
    loadMScale();
  }
  if((startTime%1000) == 1){
    sorabtn();
  }
  if((startTime%1500) == 1){
    riverData();
  }
  if((startTime%6000) == 1){
    rain_windData();
  }
  if((startTime%250) == 1){
    weatherInfo();
  }
  if((startTime%12000) == 1){
    timetable();
  } else {
    aiueo = 0;
  }
  if((startTime%200) == 1){
    humanReadable();
  }
  //if((startTime%500) == 1){
    //if(document.getElementById("isNormalMes").checked)loadDText();
  //}
  //if((timeCount%48) == 1){
    //eewChacking();
  //}
  timeCount += 1;
  startTime += 1;
  p2p_elapsedTime += 1;
  switch (Dmode[Nnum]) {
    case 1:
      DText[Nnum] = rainStr;
      break;
    case 2:
      DText[Nnum] = windStr;
      break;
    case 3:
      DText[Nnum] = arrayCombining(rivertext);
      break;
    case 11:
      DText[Nnum] = timetableStr;
      break;
  }
  if((timeCount%275) == 0){
    if(language == "Ja"){
      language = "En";
    } else {
      language = "Ja";
    }
  }
  if( TextWidth > tx){
    tx = 1200;
    si--;
    Nnum += 1;
    if(Nnum == 5){
      Nnum = 0;
    }
    for(var i=si; i>-1; i--){
      if(Text[i] != ""){
        break;
      }
    }
    lst += 1;
    si = i;
    titleChange();
  }
  if(si < 0){
    si = msi;
    if(mode == 2)earthquake_telop_times++;
  }
  if(Nnum >= Dcnt){
    Nnum = 0;
  }

//  console.log((TextWidth+150)+","+tx)
  switch (mode){
    case 0:
      context.fillStyle = "#000000";
      context.fillText(DText[Nnum], tx, 110);
      break;

    case 2:
      //文字(Red)
      context.fillStyle = "#FF0000";
      context.fillText(Text[si], tx, 110);
      break;
  }
  //背景(Blue)
  context.fillStyle = mscaleColor[1][mscale];
  if(mode!=4)context.fillRect(0,  0, 1080, 60);

  var video = document.getElementById('v');
  switch (mode){
    case 0:
      context.font = "bold 28px 'Microsoft Sans Serif'";
      switch (Dcnt) {
        case 5:
          context.fillStyle = (cancelled === false && Nnum == 1) ? "orange" : mscale==1 ? "#444" : "#FFF";
          context.fillText(DText[5 + (Nnum+4)%Dcnt], 895, 55, 185);
        case 4:
          context.fillStyle = (cancelled === false && Nnum == 2) ? "orange" : mscale==1 ? "#444" : "#FFF";
          context.fillText(DText[5 + (Nnum+3)%Dcnt], 685, 55, 185);
        case 3:
          context.fillStyle = (cancelled === false && Nnum == 3) ? "orange" : mscale==1 ? "#444" : "#FFF";
          context.fillText(DText[5 + (Nnum+2)%Dcnt], 475, 55, 185);
        case 2:
          context.fillStyle = (cancelled === false && Nnum == 4) ? "orange" : mscale==1 ? "#444" : "#FFF";
          context.fillText(DText[5 + (Nnum+1)%Dcnt], 265, 55, 185);
          break;
      }
      context.fillStyle = (cancelled === false && Nnum == 0) ? "orange" : mscaleColor[3][mscale];
      context.font = "bold 45px 'Microsoft Sans Serif'";
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
        context.font = 'bold 38px "游ゴシック Medium","Yu Gothic Medium","游ゴシック体",YuGothic,sans-serif';
        context.fillText(datakey+"で地震発生の可能性", 780, 41, 290);
      }
      break;

    case 2:
      if(language == "Ja"){
        context.fillStyle = mscaleColor[0][mscale];
        context.fillRect(0, 60,  200, 68);
        //地震情報 文字
        context.font = "30px 'Microsoft Sans Serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillStyle = mscaleColor[2][mscale];
        context.fillText("地震情報", 10, 30);
        context.font = "20px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillText("Earthquake Information", 10, 52);
        //文字
        context.fillStyle = mscaleColor[3][mscale];
        context.font = "25px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillText("最大震度", 240, 25, 70);
        context.fillText("震源", 536, 25);
        context.fillText("深さ", 832, 25, 36);
        if(depth!="ごく浅い" && depth!="ごく浅く")context.fillText("㎞", 925, 50);
        context.fillText("発生時刻", 960, 25);
        context.font = "bold 25px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillText("M", 406, 25);
        //白 Data
        context.font = "bold 46px 'arial unicode ms', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillStyle = mscale==1 ? "#444" : "#FFF";
        if(seismic_intensity !== undefined)context.fillText(seismic_intensity, 312, 45);
        context.fillText(magnitude, 429, 45, 88);
        if(depth == "ごく浅い"){
          context.font = "30px 'arial unicode ms', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
          context.fillText(depth, 850, 53, 90);
        } else {
          context.fillText(depth, 866, 45, 60);
        }
        context.font = "bold 30px 'arial unicode ms', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        if(seismic_intensity !== undefined)context.fillText(epicenter_id==-2?epicenter:epicenter_list[0][epicenter_id], 526, 53, 300);
        if(seismic_intensity !== undefined)context.fillText(timeH+"時"+timeM+"分", 960, 53, 115);
        context.font = "50px sans-serif";
        if(seismic_intensity !== undefined)context.fillText("震度"+siList[si], 10, 110, 180);
      }

      if(language == "En"){
        context.fillStyle = mscaleColor[0][mscale];
        context.fillRect(0, 60,  200, 68);
        //地震情報 文字
        context.font = "30px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillStyle = mscaleColor[2][mscale];
        context.fillText("地震情報", 10, 30);
        context.font = "20px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillText("Earthquake Information", 10, 52);
        //文字
        context.fillStyle = mscaleColor[3][mscale];
        context.font = "bold 18px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillText("Maximum", 240, 18, 70);
        context.fillText("Seismic", 240, 36, 70);
        context.fillText("Intensity", 240, 54, 70);
        context.font = "bold 25px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillText("M", 406, 25);
        context.fillText("Epicenter", 536, 25);
        context.fillText("Depth", 817, 25, 51);
        if(depth != "ごく浅い"){
          context.fillText("㎞", 925, 50);
        }
        context.fillText("Occurred Time", 960, 25, 113);
        //白 Data
        context.font = "bold 46px 'arial unicode ms', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillStyle = mscale==1 ? "#444" : "#FFF";
        if(seismic_intensity !== undefined)context.fillText(seismic_intensity, 312, 45);
        context.fillText(magnitude, 429, 45, 88);
        if(depth == "ごく浅い"){
          context.fillText("shallow", 860, 53, 70);
        } else {
          context.fillText(depth, 866, 45, 60);
        }
        context.font = "bold 30px 'arial unicode ms', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        if(seismic_intensity !== undefined)context.fillText(epicenter_id==-2?epicenter:epicenter_list[1][epicenter_id], 516, 53, epicenter_id==-2?300:285 + epicenter_list[1][epicenter_id].length);
        if(seismic_intensity !== undefined)context.fillText(timeH+":"+timeM+"", 960, 53, 115);
        context.font = "50px sans-serif";
        if(seismic_intensity !== undefined)context.fillText("震度"+siList[si], 10, 110, 180);
      }
      //水色
      context.fillStyle = (((timeCount%12)<5) && timeCount<216 && (timeCount%72)<60) ? "#e02222" : (magnitude == "--") ? "#f2f241" : "#49e5fc";
      context.fillRect(224, 1, 10, 58);
      //矢印(内容 タイトル)
      context.fillStyle = mscaleColor[0][mscale]+"99";
      context.beginPath();
      context.moveTo(200, 127);
      context.lineTo(230,  94);
      context.lineTo(200,  60);
      context.closePath();
      context.fill();
      context.strokeStyle = "#ffffff"
      context.beginPath();
      context.moveTo(200, 123);
      context.lineTo(226,  94);
      context.lineTo(200,  64);
      context.stroke();
      context.beginPath();
      context.moveTo(200,  64);
      context.lineTo(  4,  64);
      context.stroke();
      context.beginPath();
      context.moveTo(200, 123);
      context.lineTo(  4, 123);
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
        context.font = "30px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        context.fillText(Math.ceil(earthquake_telop_remaining/50)+"秒後に通常画面に復帰します" ,810, 124, 265);

      }
      break;

    case 3:
      context.font = "bold 42px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      context.fillStyle = "#000";
      context.fillText(BNtitle, 35,  45, 1080);
      context.font = "50px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      context.fillStyle = "#f00";
      //context.fillText( BNtext, 17, 117, 1046);
      context.font = "23px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      context.fillText(BNtext1, 17, 88, strWidth(BNtext1)*0.8);//"【長崎県気象警報・注意報】"
      context.font = "31px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      if(dosyasaigaikeikaijouhou==0)context.fillText(BNtext2, 17, 122, 1046);//"北部、壱岐・対馬では、強風に注意してください。北部、壱岐・対馬、五島では、高波に注意してください。長崎県では、落雷に注意してください。"
      if(dosyasaigaikeikaijouhou!=0)context.fillText("＜" + BNtextarray[Math.floor(breakingtime/200)+1], 17, 88, 250);
      if(breakingtime == -1)mode = 0;
      break;

    case 4:
      if(video.videoWidth!=0)context.drawImage(video, (1080-video.videoWidth/video.videoHeight*128)/2, 0, video.videoWidth/video.videoHeight*128, 128);
      break;
  }
  document.getElementById('movietime').innerHTML = "movieCurrentTime --　　"+Math.floor(video.currentTime/60) + ":" + ("00"+strIns((Math.floor((video.currentTime*100)%6000)).toString(), (Math.floor((video.currentTime*100)%6000)).toString().length-2, (Math.floor((video.currentTime*100)%6000)).toString().length==1?".0":".")).slice(-5) + "<br>movieDuration --　　" + Math.floor(video.duration/60) + ":" + ("00"+strIns((Math.floor((video.duration*100)%6000)).toString(), (Math.floor((video.duration*100)%6000)).toString().length-2, ".")).slice(-5);
  if(breakingtime >= 0){
    breakingtime--;
  }

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
      context.font = "50px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      context.fillStyle = "#fff";
      context.fillText("津波情報が更新されました。", 20, 52);
      context.fillText("最新の情報を確認してください。", 80, 120);
      context.font = "40px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      context.fillText("Tsunami warning!", 740, 58, 230);
    }
  }
  if(getFormattedDate(1).month + getFormattedDate(1).day + getFormattedDate(1).hour + getFormattedDate(1).minute == 125){
    context.fillStyle = mscaleColor[1][2];
    context.font = "120px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    context.fillRect(0, 0, 1080, 128);
    context.fillStyle = "#FFF";
    context.fillText("残り: " + (60-getFormattedDate(1).second) + "秒", 270, 115);
  }
  if(getFormattedDate(1).month + getFormattedDate(1).day + getFormattedDate(1).hour + getFormattedDate(1).minute == 2){
    context.fillStyle = mscaleColor[1][0];
    context.font = "120px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    context.fillRect(0, 0, 1080, 128);
    context.fillStyle = "#FFF";
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
    context.font = "30px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    context.fillText("アンケート開催中!是非参加を!" ,810, 124, 265);
  }
  if(bit(soraopen, 0) && soraopen_move===null && soraopen_moving!=1){
    intervalArray.push(soraopen_move = setInterval(function(){soraopen_color=Math.sin((90/80*soraopen_intervaltime)*Math.PI/180)*256-1;soraopen_intervaltime++;soraopen_moving-=(soraopen_moving/12);if(soraopen_moving <= 1){soraopen_color = 255;soraopen_moving = 1;soraopen_stop();} }, 1));
  }
  if(bit(soraopen, 0)){
    context.fillStyle = "#e3e3e3" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
    context.font = "30px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
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
    context.font = "25px 'Microsoft Sans serif', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
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
            if(intervalTime >= 210){
              intervalReset()
            }
          }, 10
        ));
      }
      context.fillStyle = "#e3e3e3" + ('0'+Math.round(soraopen_color).toString(16)).slice(-2);
      if(intervalTime1==0){
        context.fillRect(242-(intervalTime>40?188:188/40*intervalTime), 38, (intervalTime>40?188:188/40*intervalTime), 69);
        context.fillRect(468-(intervalTime>40?188:188/40*intervalTime), 38, (intervalTime>40?188:188/40*intervalTime), 69);
        context.fillStyle = "#2a25c6";
        if(120>=intervalTime && intervalTime>40){
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
        context.fillStyle = "#e3e3e3";
        context.fillRect(590, 5, 80, 115);
      }
    }
  }

  //canvas時間表示
  time.fillStyle = "#649cf5";
  time.fillRect(0, 0, 128, 128);
  time.fillStyle = "#ffffff";
  time.font = "25px 'Microsoft Sans Serif'";
  time.fillStyle = "#f0ff4a";
  time.fillText("Date/Time", 5, 31);
  time.font = "bold 50px 'Tahoma'";
  time.fillStyle = "#ffa385";
  var timeString1=nowDate.getHours()+":"+('0' + nowDate.getMinutes()).slice(-2);
  var timeString2=('0' + (nowDate.getMonth()+1)).slice(-2)+"/"+('0' + nowDate.getDate()).slice(-2);
  time.fillText(timeString1, 10, 108, 108);
  time.font = "bold 29px 'Tahoma'";
  time.fillText(timeString2, 10, 63, 108);
}, 20);

function loadDText() {
  $(function(){
      $.getJSON("default_message.json", function(data){
          console.log(data)
          for(i=0; i<data.title.length; i++){
            DText[i+5] = data.title[i];
            document.getElementById("title"+(i+1)).value = data.title[i];
          }
          for(i=0; i<data.main.length; i++){
            DText[i] = data.main[i];
            document.getElementById("message"+(i+1)).value = data.main[i];
          }
      })
  })
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
  $(function(){
      $.ajax({
        type: 'GET',
        url: URL,
        timeout: timeoutMilliseconds,
        success: function(data){
          console.log(data)
        },
        error: function(e) {
          console.log(e)
        }
      })
  })
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
            riverlevel[0] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == -1 });
            riverlevel[1] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 0 });
            riverlevel[2] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 1 });
            riverlevel[3] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 2 });
            riverlevel[4] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 3 });
            riverlevel[5] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 4 });
            riverlevel[6] = data['features'].filter(function(arr){ return arr['properties']['LEVEL'] == 5 });
            for(var i=1; i<7; i++){
              rivertext[i] = "河川水位情報 "+["平常(Level0/6)","水防団待機水位(Level1/6)","氾濫注意水位(Level2/6)","出動水位(Level3/6)","避難判断水位(Level4/6)","氾濫危険水位(Level5/6)","計画高水位(Level6/6)"][i]+"　　";
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

function sorabtn(){
  $(function(){
      $.ajax({
          type: 'GET',
          url: 'https://weathernews.jp/v/sorawolive/data/json/solive_sorabtn.json',
          dataType: 'json',
          timeOut: 15000,
          cache: false,
          success: function(data){
            qid = data['data']['qid'];
            question = data['data'][0]['question'];
            closeTime = data['data'][0]['closeTime'];
            ans1 = Number(data['data'][0]['ans1']);
            ans2 = Number(data['data'][0]['ans2']);
            ans3 = Number(data['data'][0]['ans3']);
            ans4 = Number(data['data'][0]['ans4']);
            closeTime != "" ? isClose=true : isClose=false,
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
            soraopen = 1;
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
            closeTime != "" ? isClose=true : isClose=false,
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
            soraopen = 3;
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
}

var rainStr = "";
var windStr = "";
function rain_windData(){
  $(function(){
      $.ajax({
          type: 'GET',
          url: "https://weathernews.jp/s/obs/json/amedas_top10.json",
          dataType: 'json',
          timeOut: 5000,
          cache: false,
          success: function(data){
            rainStr = "1時間降水量　　　　";
            for (var i = 0; i < data.prec.length; i++) {
              rainStr += (i+1) + '.' + data.prec[i].name + '(' + data.prec[i].pref + ') ' + data.prec[i].val + 'mm/h　　';
            }
            rainStr += "　　　　　　　　　　　24時間降水量　　　　"
            for (var i = 0; i < data.prec24h.length; i++) {
              rainStr += (i+1) + '.' + data.prec24h[i].name + '(' + data.prec24h[i].pref + ') ' + data.prec24h[i].val + 'mm/d　　';
            }
            windStr = "";
            for (var i = 0; i < data.wind.length; i++) {
              windStr += (i+1) + '.' + data.wind[i].name + '(' + data.wind[i].pref + ') ' + data.wind[i].val + 'm/s　　';
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Loading Error (rain&wind)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
      })
  })
}

var timetableStr = "";
function timetable() {
  $(function(){
      $.ajax({
          type: 'GET',
          url: "https://smtgvs.weathernews.jp/a/solive_timetable/timetable.json",
          dataType: 'json',
          cache: false,
          success: function(data){
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
function weatherInfo(){
  $(function(){
      $.ajax({
          type: 'GET',
          url: "http://www.data.jma.go.jp/developer/xml/feed/extra.xml",
          dataType: 'xml',
          cache: false,
          success: function(data){
            weatherTitle = [];
            weatherContent = [];
            weatherTime = [];
            if(mode!=2){
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
                  if(isChange && $(this).find('title').text()!="早期天候情報" && $(this).find('title').text()!="気象警報・注意報（Ｈ２７）" && $(this).find('title').text()!="気象特別警報・警報・注意報" ){
                    mode = 3;
                    BNtitle = $(this).find('title').text();
                    BNtext1 = ($(this).find('content').text()).split("】")[0]+"】";
                    BNtext2 = ($(this).find('content').text()).split("】")[1];
                    breakingtime = 900;
                    dosyasaigaikeikaijouhou = 0;
                    if($(this).find('title').text() == "土砂災害警戒情報"){
                      BNtext2 += "】"+($(this).find('context').text()).split("】")[2];
                      dosyasaigaikeikaijouhou = ($(this).find('content').text()).split("】").length-1;
                      breakingtime = dosyasaigaikeikaijouhou*300;
                      BNtextarray = BNtext2.split("＜");
                      earthquakeReceiveSound.warning.play();
                      isChange = false;
                    }
                    if($(this).find('title').text() == "指定河川洪水予報"){
                      if(($(this).find('context').text()).split("】")[2]!==void(0))BNtext2 += "】"+($(this).find('context').text()).split("】")[2];
                      isChange = false;
                    }
                  }
              });
              weatherlink = arr;
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Loading Error (WeatherInformation)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
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
  language = "Ja";
  tx = 1200;
  timeCount = 1;
  earthquake_telop_times = 0;
  earthquake_telop_remaining = 1500;
  if(md == 1){
    if(msi > 4){
      msi++;
    }
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
    if(depth == "ごく浅い"){
      Text[0] += "、震源は"+depth+"です。";
    } else {
      Text[0] += "、震源の深さは"+depth+"kmです。";
    }
    if(md == 0){Text[0] += document.getElementById("ps").value;}
  } else {
    Text[0] = "<<地震速報>> "+timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 "+multilingual[0][63];
    if(epicenter.substr(-1) == "沖" || epicenter.substr(-1) == "湾" || epicenter.substr(-1) == "海"){
      if(msi < 5){
        Text[0] += "震源が海底ですと、津波が発生する恐れがあります。海岸から離れるようにしてください。"
      }
    }
  }
  if(magnitude!="--"){
    Text[0] += "　　　　　　　　　An earthquake has just occurred. The hypocenter is " + epicenter_list[1][epicenter_id] + ". This earthquake resulted in " + siList[msi]+" of the maximum seismic intensity recorded. The magnitude of earthquake is estimated at "+magnitude+".";
    if(depth == "ごく浅い"){
      Text[0] += " The depth is very shallow.";
    } else {
      Text[0] += " The depth is "+depth+"km.";
    }
    if(md == 0){Text[0] += document.getElementById("ps").value;}
  } else {
    Text[0] += "　　　　　　　The earthquake has occurred at "+timeH+":"+timeM+".  This earthquake resulted in "+siList[msi]+" of the maximum seismic intensity recorded.  "+multilingual[1][63];
    if(msi > 5){
      //Text[0] = "震源が海底だと、津波が発生する恐れがあります。海岸から離れるようにしてください。"
    }
  }
  document.title="eqVi - 地震情報";
  mode = 2;
  document.getElementById("eiTitle").innerHTML = "[地震情報](" + timeYY + "/" + timeMM + "/" + timeDD + " " + timeH + ":" + timeM + "頃発生) 震源地:" + epicenter + " 最大震度:" + siList[msi] + " M" + magnitude + " 深さ:" + ((depth == "ごく浅い")?depth:"約"+depth+"km");
  document.getElementById("eiTitle").scrollLeft = 365;
  document.getElementById("eiwind").innerHTML = "";
  if(msi==-1){
    document.getElementById("eiTitle").innerHTML = "まだ情報は入っていません。";
    document.getElementById("eiwind").innerHTML = "There is no information yet."
  } else {
    for(var i=10; i>0; i--){
      if(Text[i] != ""){
        document.getElementById("eiwind").innerHTML += "［震度" + toFull(siList[i]) + "］<br>　" + ( (!isSokuho) ? (Text[i].replace(/　 </g, '<br>　').slice(1)) : (Text[i].replace(/　 </g, '<br>　')) ).replace(/> /g, '：') + "<br>"
      }
    }
  }
  console.log(epiCode[epiList[0].indexOf(epicenter)]);
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
      if(earthquakeReceiveSound.main.currentTime > 3.9689795918 || earthquakeReceiveSound.warning.currentTime > 3.0040816326){
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
  "与那国島": "与那国町"
}
//var akakaka = "https://www3.nhk.or.jp/sokuho/jishin/data/JSA0191122180517_20191122180912.xml";
var akakaka = "";
var isSokuho = false;
var testflg = false;
function downloadData(){
  $(function() {
      $.ajax({
          type: 'GET',
          url: "https://www3.nhk.or.jp/sokuho/jishin/data/JishinReport.xml",
          dataType: 'xml',
          timeout: 1500,
          cache: false,
          success: function(data) {
            //console.log(data);
            //console.log($(data).find('item'));
            earthquake_url = [];
            earthquake_area = [];
            document.getElementById("eiList").innerHTML = '';
            var itemCount = 0;
            $(data).find('item').each(function(){
                earthquake_url.push($(this).attr('url'));
                document.getElementById("eiList").innerHTML += '&lt;button type=&quot;button&quot; onclick=&quot;aa=';
                document.getElementById("eiList").innerHTML += itemCount;
                document.getElementById("eiList").innerHTML += '" id="eiList_button" style="background-color:';
                document.getElementById("eiList").innerHTML += $(this).attr('shindo')=="1" ? "#f2f2ff" : $(this).attr('shindo')=="2" ? "#00aaff" : $(this).attr('shindo')=="3" ? "#1441ff" : $(this).attr('shindo')=="4" ? "#fae696" : $(this).attr('shindo')=="5-" ? "#faf500" : $(this).attr('shindo')=="5+" ? "#ff9900" : $(this).attr('shindo')=="6-" ? "#ff2800" : $(this).attr('shindo')=="6+" ? "#a50021" : $(this).attr('shindo')=="7" ? "#b40068" : "#ffffff";
                document.getElementById("eiList").innerHTML += '; color:';
                document.getElementById("eiList").innerHTML += ($(this).attr('shindo')=="3" || Number($(this).attr('shindo').slice(0,1))>5) ? "#fff" : "#000";
                document.getElementById("eiList").innerHTML += '" class="eiList-button"&gt;';
                if($(this).text()=="")document.getElementById("eiList").innerHTML += '&lt;span style="color:white; background-color:#ff2020"&gt;';
                document.getElementById("eiList").innerHTML += $(this).text()==""?"　震源未確定":$(this).text();
                document.getElementById("eiList").innerHTML += ' 最大震度' + $(this).attr('shindo');
                document.getElementById("eiList").innerHTML += ' ';
                document.getElementById("eiList").innerHTML += $(this).attr('time');
                document.getElementById("eiList").innerHTML += '発生';
                if($(this).text()=="")document.getElementById("eiList").innerHTML += "　";
                document.getElementById("eiList").innerHTML += '&lt;/span&gt;&lt;/button&gt;';
                itemCount++;
            });
            document.getElementById("eiList").innerHTML = document.getElementById("eiList").innerText;
            //console.log(earthquake_url)
            $(function(){
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
                      for (var variable in change) {
                        if(earthquake_area.indexOf(variable) != -1){
                          earthquake_area.splice(earthquake_area.indexOf(variable), 1, change[variable]);
                        }
                        //console.log(variable+"  "+change[variable]);
                      }
                      nowTimestamp = earthquake_url[aa];

                      var cc = [],
                          pp = [];

                      //console.log(earthquake_area);
                      //console.log(earthquake_area);
                      if(nowTimestamp != lastTimestamp && lastTimestamp != ""){
                        if($(earthquake_ajax2_data).find('Local').text() != ""){
                          console.log(earthquake_url[aa])
                          console.log(earthquake_ajax2_data);

                          for (var i = 0; i < earthquake_area.length; i++) {
                            cc.push(allcity[allcity.indexOf(earthquake_area[i])]);
                            pp.push(allprefecture[allcity.indexOf(earthquake_area[i])]);
                          }
                          console.log(cc)
                          console.log(pp);
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
                                    console.log(earthquake_area);
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
                                    console.log(earthquake_intensity_list);
                                    console.log("$(earthquake_ajax2_data).find('Group').length : " + i)
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
                                    console.log(earthquake_area_CityPrefecture);
                                    console.log(earthquake_intensity_list);


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
                                    console.log(earthquake_place_City);
                                    console.log(earthquake_place_Prefecture);
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
                                    for (var i = 1; i <= 10; i++){
                                      Text[i] = Text[i].slice(2);
                                    }

                                    magnitude = earthquake_magnitude;
                                    if(earthquake_depth == "ごく浅い"){
                                      depth = earthquake_depth;
                                    } else {
                                      depth = earthquake_depth.slice(0,-2);
                                    }
                                    earthquake_intensity = earthquake_intensity.replace('-', '弱');
                                    earthquake_intensity = earthquake_intensity.replace('+', '強');
                                    for(msi=10; earthquake_intensity!=siList[msi]; msi--){if(msi<0){break;}}
                                    var sm = msi;
                                    si = msi;
                                    seismic_intensity = siList[msi];
                                    isSokuho = false;

                                    reflect(0);
                                    $('#menu .eiwind').removeClass('SI');

                                    if(msi < 7)/*最大震度6弱*/{
                                      if(earthquakeReceiveSound.main.currentTime < 5.96){
                                        earthquakeReceiveSound.main.pause();
                                        earthquakeReceiveSound.main.currentTime = 0;
                                      }
                                      earthquakeReceiveSound.main.volume = earthquakeReceiveVolumeList[sm-1];
                                      earthquakeReceiveSound.main.play();
                                    } else {
                                      if(earthquakeReceiveSound.warning.currentTime < 4){
                                        earthquakeReceiveSound.warning.pause();
                                        earthquakeReceiveSound.warning.currentTime = 0;
                                      }
                                      earthquakeReceiveSound.warning.volume = earthquakeReceiveVolumeList[sm-1];
                                      earthquakeReceiveSound.warning.play();
                                    }
                                  //}
                              //})
                          //})
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
                          for (var i = 3; i <= 10; i++){
                            Text[i] = Text[i].slice(1);
                          }

                          if(epicenter_list.indexOf(earthquake_epicenter.slice(3)) == -1){
                            earthquake_epicenter = earthquake_epicenter.slice(3);
                          }
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
                          if(earthquake_depth == "ごく浅い"){
                            depth = earthquake_depth;
                          } else {
                            depth = earthquake_depth.slice(0,-2);
                          }
                          earthquake_epicenter = earthquake_epicenter.replace('北海道', '');
                          epicenter = earthquake_epicenter;
                          earthquake_intensity = earthquake_intensity.replace('-', '弱');
                          earthquake_intensity = earthquake_intensity.replace('+', '強');
                          for(msi=10; earthquake_intensity!=siList[msi]; msi--){if(msi<0){break;}}
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

                          //console.log(sm);

                          if(msi < 7){
                            if(earthquakeReceiveSound.main.currentTime < 5.96){
                              earthquakeReceiveSound.main.pause();
                              earthquakeReceiveSound.main.currentTime = 0;
                            }
                            earthquakeReceiveSound.main.volume = earthquakeReceiveVolumeList[sm-1];
                            earthquakeReceiveSound.main.play();
                          } else {
                            if(earthquakeReceiveSound.warning.currentTime < 4){
                              earthquakeReceiveSound.warning.pause();
                              earthquakeReceiveSound.warning.currentTime = 0;
                            }
                            earthquakeReceiveSound.warning.volume = earthquakeReceiveVolumeList[sm-1];
                            earthquakeReceiveSound.warning.play();
                          }
                        }
                      }
                    }, error:function(XMLHttpRequest, textStatus, errorThrown) {
                      console.log("Loading Error (2)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
                    }
                })
            })
            lastTimestamp = nowTimestamp;
          }, error:function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Loading Error (1)\nXMLHttpRequest.readyState:" + XMLHttpRequest.readyState + "\nXMLHttpRequest.status: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
            //textStatus: timeout, error
          }
      })
  })
}

var lastp2p = "";
var p2p_elapsedTime = 2405;
  var datakey="",datacount=0;
function humanReadable(){
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
                if(key == "関東"){
                  data[0].regions[key] = data[0].regions[key]/3;
                }
                if(datacount < data[0].regions[key]){
                  datakey = key;
                  datacount = data[0].regions[key];
                }
              }
              p2p_elapsedTime = 0;
            }
            lastp2p = JSON.stringify(data);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Loading Error (HumanReadable)\nXMLHttpRequest: " + XMLHttpRequest.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown.message);
          }
      })
  })
}

function loadTsunami(){
  $(function(){
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
              console.log(data[0]['cancelled']);
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
              DText[5] = "津波情報";
              var temp = "";
              if(cancelled === true){
                DText[0] = "<津波情報は解除されました>";
              } else {
                DText[0] = "<津波情報>　";
                for (var i = 0; i < tsunami_areas.length; i++) {
                  DText[0] += "　　　"
                  DText[0] += tsunami_areas[i]['name'];
                  DText[0] += " ";
                  DText[0] += (tsunami_areas[i]['grade'] == "Watch") ? "津波注意報" : (tsunami_areas[i]['grade'] == "Warning") ? "津波警報" : (tsunami_areas[i]['grade'] == "Unknown") ? "不明" : "大津波警報";
                  DText[0] += tsunami_areas[i]['immediate'] ? " すぐ来る" : "";
                  temp += (tsunami_areas[i]['grade'] == "Watch") ? "津波注意報　" : (tsunami_areas[i]['grade'] == "Warning") ? "津波警報　　" : (tsunami_areas[i]['grade'] == "Unknown") ? "不明　　　　" : "大津波警報　";
                  temp += tsunami_areas[i]['immediate'] ? "<span style='color:yellow;'>" : "";
                  temp += tsunami_areas[i]['name'];
                  temp += tsunami_areas[i]['immediate'] ? "</span>" : "";
                  temp += "<br>";
                }
                document.getElementById("tsunamiList").innerHTML = temp;
                if(earthquakeReceiveSound.tsunami[tsunami_areas[0]['grade']].currentTime < 5.96){
                  earthquakeReceiveSound.tsunami[tsunami_areas[0]['grade']].pause();
                  earthquakeReceiveSound.tsunami[tsunami_areas[0]['grade']].currentTime = 0;
                }
                earthquakeReceiveSound.tsunami[tsunami_areas[0]['grade']].volume = 1;
                earthquakeReceiveSound.tsunami[tsunami_areas[0]['grade']].play();
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
    Text[0] = "<<地震速報>> "+timeDD+"日"+timeH+"時"+timeM+"分頃、最大震度"+siList[msi]+"を観測する地震が発生しました。 今後の情報にご注意ください！";
  }
  document.title = "eqVi - 地震情報";
}

function l(message){console.log(message)}

function modeChange(num){
  l(num);
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


function getFormattedDate(p, f, d, a){
  if(!d) d = new Date();
  if(!f) f = 0;
  if(!p) p = 0;
  if(a){
    if(a.length == 6 && (a instanceof Array)){console.error('getFormattedDate(a): error');return 0;}
    d.setFullYear(d.getFullYear() + a[0]);
    d.setMonth(d.getMonth() + a[1]);
    d.setDate(d.getDate() + a[2]);
    d.setHours(d.getHours() + a[3]);
    d.setMinutes(d.getMinutes() + a[4]);
    d.setSeconds(d.getSeconds() + a[5]);
  }
  var year  = d.getFullYear();
  var month = d.getMonth() + 1;
  var date  = d.getDate();
  var hour  = d.getHours();
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
    default:
      return '' + year + month + date + hour + min + sec;
      break;
  }
}


//簡略化はしたくないです...

// NHK様のページから取れたURL:
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

// 便利なjavasctiptの書式: 条件(三項)演算子
