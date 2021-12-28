class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.token = config.token;
    this.groupId = config.groupId;
  }

  getProfileInfo() {
    return fetch(`${this.baseUrl}/${this.groupId}/users/me/`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          console.log(`Data load correctly, code status: ${res.status}`);
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  saveProfileInfo({ name, about }) {
    return fetch(`${this.baseUrl}/${this.groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          console.log(
            `Code status: ${res.status},
data saved correctly.`
          );
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  saveProfileImage({ avatar }) {
    return fetch(`${this.baseUrl}/${this.groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          console.log(
            `Code status: ${res.status},
image saved correctly.`
          );
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getCards() {
    return fetch(`${this.baseUrl}/${this.groupId}/cards/`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          console.log(`Data load correctly, code status: ${res.status}`);
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  saveCards({ name, link }) {
    return fetch(`${this.baseUrl}/${this.groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          console.log(
            `Code status: ${res.status},
card saved correctly.`
          );
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteCards({ cardId }) {
    return fetch(`${this.baseUrl}/${this.groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          console.log(
            `Code status: ${res.status},
card deleted correctly.`
          );
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  likeCards({ cardId }) {
    return fetch(`${this.baseUrl}/${this.groupId}/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          console.log(
            `Code status: ${res.status},
card liked correctly.`
          );
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  dislikeCards({ cardId }) {
    return fetch(`${this.baseUrl}/${this.groupId}/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          console.log(
            `Code status: ${res.status},
card disliked correctly.`
          );
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export default Api;
