// child2

import parent from "./class.js";

export default class extends parent {
  constructor (test){
    super ();
    this.test = test;
  }
  test2 (){
    console.log(this.test);
  }
}