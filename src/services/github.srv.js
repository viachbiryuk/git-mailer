const github = require('octonode');
const CONF = require('../../conf');
const Promise = require('bluebird');


class GithubService {

  constructor () {
    this.client = github.client(CONF.githubAPI);
  }

  async findUser (username) {
    return new Promise((resolve, reject) => {
      return this.client.get(`/users/${username}`, {}, (err, status, body, headers) => {
        return err ? reject(err) : resolve(body);
      });
    })
  }


}


module.exports = new GithubService();
