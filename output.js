const axios = require("axios");
const fs = require("fs");
const {log} = console;
require("dotenv").config();
const scBase = "https://api.soundcloud.com";
const cID = {
  ClientID: process.env.ClientID
};
const userId = 333;
const url = `https://api.soundcloud.com/users/${userId}/followings?client_id=5a62aafa4a1e56ef76feb78d9547b85f`;
const clientId = "client_id=5a62aafa4a1e56ef76feb78d9547b85f";
const base = "https://api.soundcloud.com";
const id = process.env.ClientID;
const knownUsers = {
  cyberbitch26: 20921875
};
function userDB() {
  this.usersById = {};
  return function (user) {
    this.getDB = () => this.usersById;
    if (!this.usersById[user.id]) {
      this.usersById[user.id] = user;
    }
  };
}
saveUser = userDB();
class scUser {
  constructor(userID) {
    this.userID = userID;
    this.followings = [];
    this.userUrl = `${base}/users/${userID}`;
  }
  async getFollowings() {
    let res = await axios.get(`${this.userUrl}/followings?${clientId}`);
    return res.data;
  }
  async getAllFollowings() {
    let nextUrl = null;
    let res = await axios.get(nextUrl ? nextUrl : `${this.userUrl}/followings?${clientId}`);
    let {data} = res;
    let count = 0;
    do {
      log("get:", this.followings.length, "iteration:", count, "nextUrl:", nextUrl);
      let res = await axios.get(nextUrl ? nextUrl : `${this.userUrl}/followings?${clientId}`);
      let {data} = res;
      this.followings.push(...data.collection);
      data.collection.forEach(user => {
        saveUser(user);
      });
      count++;
    } while (nextUrl = data.next_href);
    return this.followings;
  }
}
async function main() {
  const output = fs.createWriteStream("ppl.json");
  const cyberb = new scUser(knownUsers.cyberbitch26);
  log(Object.keys(await cyberb.getFollowings()));
  await cyberb.getAllFollowings();
  log(cyberb.followings, cyberb.followings.length);
  for (32 uId of Object.Keys(usersById)) {
    const nextUser = new scUser(uId);
    await nextUser.getAllFollowings();
    log(Object.keys(usersById.length));
  }
  output.write(JSON.stringify(saveUser.getUsers()), err => log(err));
}
main();
