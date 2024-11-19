(function(){
  /*
    JPA Font - The IPA Font Derived Program
    https://jpafonts.osdn.jp
    - Licensed under the IPA Font License Agreement v1.0
    - https://ipafont.ipa.go.jp/ipa_font_license_v1.html
  */
  /*
    Noto Sans Japanese (OpenType, TrueType, WOFF)
    https://github.com/r-40021/noto-sans-jp
    - Licensed under SIL OPEN FONT LICENSE Version 1.1
  */
  /*
    Inter - Copyright (c) 2016-2020 The Inter Project Authors.
    "Inter" is trademark of Rasmus Andersson.
    https://github.com/rsms/inter

    This font software is licensed under the SIL Open Font License, version 1.1.
    The full license is described in /font/LICENSE-Inter.txt, and is also available with a FAQ at:
    http://scripts.sil.org/OFL
  */
  /*
    About 7barSP
    Created by とろ庵
    Contact to http://www.trojanbear.net
  */

  const fonts = [
    { name: "JPAMincho", src: 'url(./css/jpam.woff2) format("woff2")' },
    { name: "JPAPMincho", src: 'url(./css/jpamp.woff2) format("woff2")' },
    { name: "JPAexMincho", src: 'url(./css/jpaexm.woff2) format("woff2")' },
    { name: "7barSP", src: 'url(./css/7barSP.woff2) format("woff2")' },
    { name: "Inter", src: 'url(./font/Inter-Regular.woff2) format("woff2"), url(./font/Inter-Regular.woff) format("woff")', weight: 400, style: "normal" },
    { name: "Inter", src: 'url(./font/Inter-Italic.woff2) format("woff2"), url(./font/Inter-Italic.woff) format("woff")', weight: 400, style: "italic" },
    { name: "Inter", src: 'url(./font/Inter-SemiBold.woff2) format("woff2"), url(./font/Inter-SemiBold.woff) format("woff")', weight: 600, style: "normal" },
    { name: "Inter", src: 'url(./font/Inter-SemiBoldItalic.woff2) format("woff2"), url(./font/Inter-SemiBoldItalic.woff) format("woff")', weight: 600, style: "italic" },
    { name: "Noto Sans JP", src: "url(./font/NotoSansJP-Regular.woff) format('woff')", weight: 400 },
    { name: "Noto Sans JP", src: "url(./font/NotoSansJP-Bold.woff) format('woff')", weight: 600 },
  ];
  let loadedFontsCount = 0;
  const OnLoadFonts = target => {
    document.fonts.add(target);
    loadedFontsCount++;
    const familyName = target.family;
    console.info("フォントを読み込みました。", familyName);
    if (loadedFontsCount === fonts.length){
      console.info("フォントの読み込みが正常に完了しました。");
      if (viewMode === 0) Routines.md0title();
      if (viewMode === 3) Routines.md3title();
      Routines.memory.lastTime = 0;
    }
  };
  const OnLoadError = target => {
    console.error("フォントの読み込みに失敗しました。", target.family);
    console.error(target);
  };
  for (const item of fonts){
    (new FontFace(item.name, item.src, {
      weight: item.weight,
      style: item.style,
      display: "swap"
    })).load().then(OnLoadFonts).catch(OnLoadError);
  }
})();
