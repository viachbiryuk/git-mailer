const fs = require('fs');
const Promise = require('bluebird');

class Files {

  static async remove (filePath) {
    const unlink = Promise.promisify(fs.unlink);
    return unlink(filePath);
  }




}


module.exports = Files;
