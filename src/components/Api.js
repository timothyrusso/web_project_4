class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  saveProfileInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          console.log('Data saved correctly.')
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  saveProfileImage({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          console.log('Image saved correctly.')
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export default Api;
