// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    this.currentID++
    let userID = this.currentID
    this.users[userID] = {"id" : userID, "name": name};
    this.follows[userID] = new Set();
    return userID;

  }

  getUser(userID) {
    // Your code here
    if (!this.users[userID]) return null;
    return this.users[userID]
  }

  follow(userID1, userID2) {
    // Your code here
    if (!this.users[userID1] || !this.users[userID2]) return false;
    else {
      this.follows[userID1].add(userID2)
      return true;
    }

  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID]
  }

  getFollowers(userID) {
    // Your code here
    let followers = new Set()

    for (let users in this.follows) {
      if (this.follows[users].has(userID)) {
        followers.add(parseInt(users))
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let res = new Set();
    let queue = [[userID]];
    let visited = new Set();
    visited.add(userID);

    while (queue.length > 0) {
      let currPath = queue.shift();
      let curr = currPath[currPath.length - 1];

      if (currPath.length > degrees + 2) break;
      if (currPath.length > 2) res.add(curr);

      for (let f of this.follows[curr]) {
        if (!visited.has(f)) {
          visited.add(f);
          queue.push([...currPath, f]);
        }
      }
    }
    return Array.from(res)
  }
}

module.exports = SocialNetwork;
