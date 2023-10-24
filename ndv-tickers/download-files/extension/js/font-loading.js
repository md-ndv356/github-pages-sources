(function(){
  /*
    JPA Font - The IPA Font Derived Program
      https://jpafonts.osdn.jp
      - Licensed under the IPA Font License Agreement v1.0
      - https://ipafont.ipa.go.jp/ipa_font_license_v1.html
  */
  /*
    About 7barSP
    Created by とろ庵
    Contact to http://www.trojanbear.net
  */

  let loadedFontsCount = 0;
  const OnLoadFonts = (target) => {
    loadedFontsCount++;
    let familyName = target.family;
    console.info("フォントを読み込みました。", familyName);
    if(familyName === "JPAPGothic") window.Routines.md0title();
    if(loadedFontsCount === 8) console.info("フォントの読み込みが正常に完了しました。");
  };
  const OnLoadError = (target) => {
    console.error("フォントの読み込みに失敗しました。", target.family);
  };
  const JPAGothic = new FontFace("JPAGothic", "url(./css/jpag.woff2)");
  const JPAPGothic = new FontFace("JPAPGothic", "url(./css/jpagp.woff2)");
  const JPAexGothic = new FontFace("JPAexGothic", "url(./css/jpaexg.woff2)");
  const JPAMincho = new FontFace("JPAMincho", "url(./css/jpam.woff2)");
  const JPAPMincho = new FontFace("JPAPMincho", "url(./css/jpamp.woff2)");
  const JPAexMincho = new FontFace("JPAexMincho", "url(./css/jpaexm.woff2)");
  const SevenBarSP = new FontFace("7barSP", "url(./css/7barSP.woff2)");
  const NotoSansJP400 = new FontFace("NotoSansJP-400", "url(./css/noto-sans-jp-v42-latin_japanese-regular.woff2)");
  JPAGothic.load().then(OnLoadFonts).catch(OnLoadError);
  JPAPGothic.load().then(OnLoadFonts).catch(OnLoadError);
  JPAexGothic.load().then(OnLoadFonts).catch(OnLoadError);
  JPAMincho.load().then(OnLoadFonts).catch(OnLoadError);
  JPAPMincho.load().then(OnLoadFonts).catch(OnLoadError);
  JPAexMincho.load().then(OnLoadFonts).catch(OnLoadError);
  SevenBarSP.load().then(OnLoadFonts).catch(OnLoadError);
  NotoSansJP400.load().then(OnLoadFonts).catch(OnLoadError);
})();
