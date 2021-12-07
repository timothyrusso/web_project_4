class UserInfo {
  constructor({ userName, userJob }) {
    this._nameSelector.textContent = userName;
    this._jobSelector.textContent = userJob;
  }

  getUserInfo() {
    // Returns an object with information about the user.
    // This method will be handy for cases when it's necessary to display the user
    // data in the open form.
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent
    };
  }

  setUserInfo({userName, userJob}) {
    // Takes new user data and adds it on the page.
    this._nameSelector.textContent = userName;
    this._jobSelector.textContent = userJob;
  }
}
