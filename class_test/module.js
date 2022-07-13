let mod1, mod2;
import("./class3.js").then(p => {
  mod2 = p.default;
  console.log(mod2);
});