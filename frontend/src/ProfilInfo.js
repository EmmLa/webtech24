var UserProfile = (function () {
  var user_email = "";

  var getMail = function () {
    return user_email;
  };

  var setMail = function (mail) {
    user_email = mail;
  };

  return {
    getMail: getMail,
    setMail: setMail,
  };
})();

export default UserProfile;

// export class UserToken {
//   constructor() {
//     // Initialise les variables d'état
//     this.USER_AUTHENTIFIED = null;
//     this.USER_Email = null;
//     this.USER_Password = null;
//   }

//   // Méthode pour obtenir si l'utilisateur est authentifié
//   getUserAuthenticated() {
//     return this.USER_AUTHENTIFIED;
//   }

//   // Méthode pour obtenir l'email de l'utilisateur
//   getUserEmail() {
//     return this.USER_Email;
//   }

//   // Méthode pour définir l'email de l'utilisateur
//   setUserEmail(email) {
//     this.USER_Email = email;
//   }

//   // Méthode pour définir le mot de passe de l'utilisateur
//   setUserPassword(password) {
//     this.USER_Password = password;
//   }

//   // Méthode pour définir si l'utilisateur est authentifié
//   setUserAuthenticated(authenticated) {
//     this.USER_AUTHENTIFIED = authenticated;
//   }
// }
