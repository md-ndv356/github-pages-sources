import parent from "./class2.js";

export default class extends parent {
  constructor (test){
    super ();
    this.test = test;
  }
  test1 (){
    console.log(this.test);
  }
}