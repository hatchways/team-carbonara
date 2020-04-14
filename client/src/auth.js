class Auth {
  authenticated = false;
  sub = null;
  email = null;

  login(cb, user) {
    this.authenticated = true;
    //store info
    this.sub = user.getBasicProfile().getId();
    this.email = user.getBasicProfile().getEmail();
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getSub() {
    return this.sub;
  }

  getEmail() {
    return this.email;
  }
}

export default new Auth();
