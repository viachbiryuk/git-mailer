const thumb = require('node-thumbnail').thumb;
const CONF = require('../../conf');

module.exports = (fileGroup, errorMessage) =>  {
  return (req, res, next) => {
    errorMessage = errorMessage || 'Image is not provided.';

    if (!req.file) {
      return next(errorMessage);
    }

    thumb({
      source: req.file.path,
      destination: `${CONF.staticDir + fileGroup}`,
      concurrency: 4,
      width: 100
    }, (files, err, stdout, stderr) => {
      if (err) {
        return next(err);
      }
      req.file.thumbPath = files[0].dstPath;
      next();
    });}
};

