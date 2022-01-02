class UserInfo {
  constructor({ nameSelector, jobSelector, imageSelector, userId }) {
    this._nameElement = document.querySelector(`.${nameSelector}`);
    this._jobElement = document.querySelector(`.${jobSelector}`);
    this._imageElement = document.querySelector(`.${imageSelector}`);
    this._userId = userId;
  }

  getUserInfo() {
    // Returns an object with information about the user.
    // This method will be handy for cases when it's necessary to display the user
    // data in the open form.
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      image: this._imageElement.src,
      _id: this._userId
    };
  }

  setUserInfo({ name, aboutMe, avatar, _id }) {
    // Takes new user data and adds it on the page.
    this._nameElement.textContent = name;
    this._jobElement.textContent = aboutMe;
    this._imageElement.src = avatar;
    this._userId = _id;
  }

  setUserAvatar({ link }) {
    // Takes new user avatar and adds it on the page.
    this._imageElement.src = link;
  }
}

export default UserInfo;
