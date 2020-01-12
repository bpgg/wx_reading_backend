class User{
  constructor(){

  }
  a(hh) {
    console.log(hh);
  }
  async b(){
    var _this = this
    console.log(_this)
    _this.a('2')
  }
}

new User().b()