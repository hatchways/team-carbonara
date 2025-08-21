class Auth {
  authenticated = false;
  sub = null;
  email = null;
  name = null;

  login(cb, user) {
    if (user) {
      // localStorage.setItem('user', JSON.stringify(user));
      this.sub = user.sub;
      this.email = user.email;
      this.name = user.given_name || user.name;
    }
    this.authenticated = true;
    //store info

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
