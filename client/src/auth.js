class Auth {
  authenticated = false;
  sub = null;
  email = null;
  name = null;

  login(cb, user) {
    this.authenticated = true;
    //store info

    this.sub = user.getId();
    this.email = user.getEmail();
    this.name = user.getName();
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

  getName() {
    return this.name;
  }
}

export default new Auth();
