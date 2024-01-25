class Authentication {
  constructor() {

    if (!this.instance) {
      this.instance = this;
    }

    return this.instance;
  }

  login(callback) {
    this.authenticated = true;
    callback && callback();
  }

  logout(callback) {
    this.authenticated = false;
    callback && callback();
  }

  isAuthenticated() {
    return this.authenticated;
  }

}

export default new Authentication();
