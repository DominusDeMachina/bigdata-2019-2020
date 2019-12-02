const fs = require("fs");

const isUserExist = function(idUser) {
  let userList = fs.readdirSync("./users");
  return userList.includes(idUser);
};

const getUserWallets = function(idUser){

}


module.exports = { isUserExist, getUserWallets };
