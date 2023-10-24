// Mscale(Weathernews) color
let colorScheme = [
  [
    ["#5a94f2","#d1d900","#ff3d3d"],
    [   null  ,   null  ,   null  ], // background colors
    ["#71f043","#c852ff","#ffffff"],
    ["#fcfefa","#7e3287","#f0ff4a"], // main text colors
    ["#777","#ddd4bf"], // waiting text colors being changed by Mscale (M2 or not)
    ["#fff","#333","#d6231d",["#fff","#333","#fff"],"#1144ed"],
    ["#370921","#fff","#fd942a","#393939"] // clock colors
  ], // light mode
  [
    ["#302ad1","#d1c12c","#a81b1b"],
    [   null  ,   null  ,   null  ], // done
    ["#71f043","#c852ff","#fff"],
    ["#fff","#fff","#fff"], // done
    ["#666","#bbb"], // done
    ["#333","#fff","#e6e85d",["#fff","#333","#fff"],"#1144ed"], // done
    ["#000","#fff","#ff503c","#000"] // done
  ], // dark mode
  [
    ["#555555","#555555","#555555"],
    ["#444",null,null],
    [null,null,null],
    ["#fff","#fff","#fff"],
    ["#ddd","#ddd"],
    ["#333","#fff","#ffb",["#fff","#fff","#fff"],"#555"], // done
    ["#333","#ddd","#fff","#333"]
  ]  // mono style
];
{
  let gradient = context.createLinearGradient(0, 0, 1080, 0);
  gradient.addColorStop(0, "#105396");
  gradient.addColorStop(1, "#428edd"); // gradient.addColorStop(1, "#377fcd");
  colorScheme[0][1][0] = gradient;
  gradient = context.createLinearGradient(0, 0, 1080, 0);
  gradient.addColorStop(0, "#ffef35");
  gradient.addColorStop(1, "#fedb85");
  colorScheme[0][1][1] = gradient;
  gradient = context.createLinearGradient(0, 0, 1080, 0);
  gradient.addColorStop(0, "#df261d");
  gradient.addColorStop(1, "#b21418");
  colorScheme[0][1][2] = gradient;
  gradient = context.createLinearGradient(0, 0, 0, 60);
  gradient.addColorStop(0, "#3a37bd");
  gradient.addColorStop(1, "#151299");
  colorScheme[1][1][0] = gradient;
  gradient = context.createLinearGradient(0, 0, 0, 60);
  gradient.addColorStop(0, "#b3a425");
  gradient.addColorStop(1, "#c7b830");
  colorScheme[1][1][1] = gradient;
  gradient = context.createLinearGradient(0, 0, 0, 60);
  gradient.addColorStop(0, "#d91c18");
  gradient.addColorStop(1, "#b01815");
  colorScheme[1][1][2] = gradient;
  gradient = context.createLinearGradient(0, 20, 0, 60);
  gradient.addColorStop(0.75, "#444");
  gradient.addColorStop(1.00, "#882");
  colorScheme[2][1][1] = gradient;
  gradient = context.createLinearGradient(0, 20, 0, 60);
  gradient.addColorStop(0.00, "#444");
  gradient.addColorStop(0.75, "#723");
  gradient.addColorStop(1.00, "#a12");
  colorScheme[2][1][2] = gradient;
}
// color theme code
var colorThemeMode = 0;
