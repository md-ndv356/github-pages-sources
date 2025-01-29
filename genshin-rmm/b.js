const fs = require("fs");
const countries = {
  "Mondstadt": {
    "zh_cn": "蒙德",
    "zh_tw": "蒙德",
    "en_us": "Mondstadt",
    "ko_kr": "몬드",
    "ja_jp": "モンド",
    "es_es": "Mondstadt",
    "fr_fr": "Mondstadt",
    "ru_ru": "Мондштадт",
    "th_th": "Mondstadt",
    "vi_vn": "Mondstadt",
    "de_de": "Mondstadt",
    "id_id": "Mondstadt",
    "pt_pt": "Mondstadt"
  },
  "Liyue": {
    "zh_cn": "璃月",
    "zh_tw": "璃月",
    "en_us": "Liyue",
    "ko_kr": "리월‍",
    "ja_jp": "璃月",
    "es_es": "Liyue",
    "fr_fr": "Liyue",
    "ru_ru": "Ли Юэ",
    "th_th": "Liyue",
    "vi_vn": "Liyue",
    "de_de": "Liyue",
    "id_id": "Liyue",
    "pt_pt": "Liyue"
  },
  "Inazuma": {
    "zh_cn": "稻妻",
    "zh_tw": "稻妻",
    "en_us": "Inazuma",
    "ko_kr": "이나즈마",
    "ja_jp": "稲妻",
    "es_es": "Inazuma",
    "fr_fr": "Inazuma",
    "ru_ru": "Инадзума",
    "th_th": "Inazuma",
    "vi_vn": "Inazuma",
    "de_de": "Inazuma",
    "id_id": "Inazuma",
    "pt_pt": "Inazuma"
  },
  "Sumeru": {
    "zh_cn": "须弥",
    "zh_tw": "須彌",
    "en_us": "Sumeru",
    "ko_kr": "수메르",
    "ja_jp": "スメール",
    "es_es": "Sumeru",
    "fr_fr": "Sumeru",
    "ru_ru": "Сумеру",
    "th_th": "Sumeru",
    "vi_vn": "Sumeru",
    "de_de": "Sumeru",
    "id_id": "Sumeru",
    "pt_pt": "Sumeru"
  },
  "Fontaine": {
    "zh_cn": "枫丹",
    "zh_tw": "楓丹",
    "en_us": "Fontaine",
    "ko_kr": "폰타인",
    "ja_jp": "フォンテーヌ",
    "es_es": "Fontaine",
    "fr_fr": "Fontaine",
    "ru_ru": "Фонтейн",
    "th_th": "Fontaine",
    "vi_vn": "Fontaine",
    "de_de": "Fontaine",
    "id_id": "Fontaine",
    "pt_pt": "Fontaine"
  }
};

const files = fs.readdirSync("./music/", "utf-8");
for (const file of files){
  const data = fs.readFileSync("./music/" + file, "utf-8");
  data.country = countries[data.country.en_us];
  fs.writeFileSync("./music/" + file, JSON.stringify(data));
}

