export class UserInfo {
  constructor(profileSelectors) {
    this._profileName = document.querySelector(profileSelectors.name);
    this._profileAbout = document.querySelector(profileSelectors.about);
    this._profileAvatar = document.querySelector(profileSelectors.avatar);
  }

  getUserInfo() {
    this._profileData = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
    return this._profileData;
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileAbout.textContent = userData.about;
  }

  setUserAvatar(userAvatar) {
    this._profileAvatar.src = userAvatar;
  }
}
