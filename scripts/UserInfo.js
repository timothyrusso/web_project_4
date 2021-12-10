class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(`.${nameSelector}`);
    this._jobElement = document.querySelector(`.${jobSelector}`);
  }

  getUserInfo() {
    // Returns an object with information about the user.
    // This method will be handy for cases when it's necessary to display the user
    // data in the open form.
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }

  setUserInfo({ userName, userJob }) {
    // Takes new user data and adds it on the page.
    this._nameElement.textContent = userName;
    this._jobElement.textContent = userJob;
  }
}

export default UserInfo;
