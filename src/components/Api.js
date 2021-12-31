/**
 * Class for handling API calls
 * @param Object Containing the configuration info for the API call
 */
class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.token = config.token;
    this.groupId = config.groupId;
  }

  /**
   * Function that return the information object of the user, necessary for creating the profile
   * @returns {Object} Promise object containing all the information of the user
   */
  getProfileInfo() {
    return fetch(`${this.baseUrl}/${this.groupId}/users/me/`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          console.log(`Profile data load correctly, code status: ${res.status}`);
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
  }

  /**
   * Function that save the new name and new job informations of the user on the API
   * @param Object Containing the name and the job of the user
   * @returns {Object} Promise object containing all the new information of the user
   */
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
  }

  /**
   * Function that save the new profile image of the user on the API
   * @param Object Containing the new image of the user
   * @returns {Object} Promise object containing all the new information of the user
   */
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
  }

  /**
   * Function that return an object with all the cards stored on the API
   * @returns {Object} Promise object containing all the cards
   */
  getCards() {
    return fetch(`${this.baseUrl}/${this.groupId}/cards/`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          console.log(`Cards data load correctly, code status: ${res.status}`);
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
  }

  /**
   * Function that save the new card on the API
   * @param Object Containing the name and the link image necessary for the creation of the card
   * @returns {Object} Promise object containing all the information of the new card
   */
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
  }

  /**
   * Function that delete the card from the API
   * @param Object Containing the cardId necessary for the cancellation of the card
   * @returns {Object} Promise object containing the confirmation message of the cancellation
   */
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
  }

  /**
   * Function that put a new like object on the API
   * @param Object Containing the cardId necessary for the identification of the card
   * @returns {Object} Promise object containing all the information of the liked card
   */
  likeCards({ cardId }) {
    return fetch(`${this.baseUrl}/${this.groupId}/cards/likes/${cardId}`, {
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
  }

  /**
   * Function that delete the like object from the API
   * @param Object Containing the cardId necessary for the identification of the card
   * @returns {Object} Promise object containing all the information of the disliked card
   */
  dislikeCards({ cardId }) {
    return fetch(`${this.baseUrl}/${this.groupId}/cards/likes/${cardId}`, {
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
  }
}

export default Api;
