/**
 * 文字列の行数をカウントします。
 * @this {String} 対象の文字列です。
 * @return {Number} 対象の行数です。
 */
String.prototype.lineCount = function(){
  let str = this;
  if(str){
    return str.split("\n").length;
  } else {
    return 0;
  }
};

/**
 * CanvasRenderingContext2Dにおいて、円のパスを作成します。
 * @this {CanvasRenderingContext2D} 対象の2Dレンダリングコンテキストです。
 * @param {Number} 中心のx座標
 * @param {Number} 中心のy座標
 * @param {Number} 円の半径(px)
 * @return {Undefined}
 */
CanvasRenderingContext2D.prototype.circle = function(x, y, r){this.arc(x, y, r, 0, 6.283185307179586, false);}

/**
 * 1pxのドットを描きます。
 * @this {CanvasRenderingContext2D} 対象の2Dレンダリングコンテキストです。
 * @param {Array} [
 *  @type {Array} [
 *   @type {Number} 対象のx座標
 *   @type {Number} 対象のy座標
 *  ]
 * ]
 * @return {Undefined}
 */
CanvasRenderingContext2D.prototype.markDots = function(xys){for(let i=0; xys.length>i; i++){let xy = xys[i];this.fillRect(xy[0],xy[1],1,1);}}

HTMLCollection.prototype.forEach = function(f){
  let array = Array.from(this);
  return array.forEach(f);
};
HTMLAllCollection.prototype.forEach = function(f){
  let array = Array.from(this);
  return array.forEach(f);
};

Element.prototype.removeChildren = function (){
  const elm = this;
  while (elm.firstChild) elm.removeChild(elm.firstChild);
};

Math.units = {
  /*----  長さ  ----*/
  km2m: i => i*1000,
  m2cm: i => i*100,
  cm2mm: i => i*10,
  km2cm: i => i*100000,
  m2mm: i => i*1000,
  km2mm: i => i*1000000,
  m2km: i => i/1000,
  cm2m: i => i/100,
  mm2cm: i => i/10,
  cm2km: i => i/100000,
  mm2m: i => i/1000,
  mm2km: i => i/1000000,
  m2mi: i => i/1609.344,
  mi2m: i => i*1609.344,
  m2yd: i => i*1.0936132983,
  yd2m: i => i/1.0936132983,
  seami2m: i => i*1852,
  m2seami: i => i/1852,
  inch2cm: i => i*2.54,
  cm2inch: i => i/2.54,
  feet2inch: i => i*12,
  inch2feet: i => i/12,
  feet2yd: i => i/3,
  yd2feet: i => i*3,
  feet2cm: i => i*30.48,
  cm2feet: i => i/30.48,
  /*----  質量  ----*/
  t2kg: i => i*1e3,
  kg2g: i => i*1e3,
  g2mg: i => i*1e3,
  mg2mcg: i => i*1e3,
  t2g: i => i*1e6,
  kg2mg: i => i*1e6,
  g2mcg: i => i*1e6,
  t2mg: i => i*1e9,
  kg2mcg: i => i*1e9,
  t2mcg: i => i*1e12
};
