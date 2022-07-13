/**
 * 地震情報を管理します。
 */
class Earthquake_share {
  constructor () {
    this.#data = [];
  }

  /**
   * 地震情報のデータをまとめて登録します。（初回起動時に推奨）
   * @param  {...Object} dataList - 地震情報のデータ
   */
  initialize (...dataList){

  }

  /**
   * 地震速報のデータを処理します。
   * @param {String} source - データの取得元IDで、大文字・小文字の区別は行いません。
   * @param {Object} quakedata - 処理前の地震速報データ
   * @returns {Object} - 処理後の地震速報データ（インスタンス内にも保存されます）
   */
  handle_sokuho (source, quakedata){

  }

  /**
   * 震源情報のデータを処理します。
   * @param {String} source - データの取得元IDで、大文字・小文字の区別は行いません。
   * @param {Object} quakedata - 処理前の震源情報データ
   * @returns {Object} - 処理後の震源情報データ（インスタンス内にも保存されます）
   */
  handle_epicenter (source, quakedata){

  }

  /**
   * 各地の震度に関する情報のデータを処理します。
   * @param {String} source - データの取得元IDで、大文字・小文字の区別は行いません。
   * @param {Object} quakedata - 処理前の地震情報データ
   * @returns {Object} - 処理後の地震情報データ（インスタンス内にも保存されます）
   */
  handle_quake (source, quakedata){

  }

  /**
   * 遠地地震情報のデータを処理します。
   * @param {String} source - データの取得元IDで、大文字・小文字の区別は行いません。
   * @param {Object} quakedata - 処理前の遠地地震情報データ
   * @returns {Object} - 処理後の遠地地震情報データ（インスタンス内にも保存されます）
   */
  handle_distant (source, quakedata){

  }

  /**
   * インスタンス内に保存されたデータから、イベントIDに一致する地震情報のデータを返します。
   * @param {String} targetId - 検索対象のイベントID
   * @param {Bool} isIncludesAllInfo - trueの場合、返り値のオブジェクトに"reportList"キーが追加され、過去に保存された全てのリポートを出力することができます。
   */
  output_fromEventID (targetId, isIncludesAllInfo){

  }

  /**
   * インスタンス内に保存された全ての地震の情報を返します。
   * @returns {Object} - 地震情報データ
   */
  get currentEvents (){
    return {
      quake: {
        "20210213230800": {}
      },
      eventid_list: [ "20210213230800" ]
    };
  }

  /**
   * インスタンス内に保存された、過去に保存された全ての地震情報のデータを返します。
   * @returns {Object} - 地震情報データ
   */
  get allReports (){
    return {
      reports: {
        "20210213230800": [ {type: "sokuho"}, {type: "epicenter"} ]
      },
      eventid_list: [ "20210213230800" ]
    };
  }

  /**
   * (Warning!) データ消去専用
   * @param {Number} - 1の場合、完全に全てのデータをインスタンス内から消去します。
   */
  erase_allReports (eraseID){

  }
}