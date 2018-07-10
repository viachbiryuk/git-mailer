const CONF = require('../../conf');
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const path = require('path');


module.exports = (fieldName, fileGroup, supportedExtArray) => {

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${CONF.staticDir + fileGroup}`)
    },
    filename: (req, file, cb) => {
      crypto.pseudoRandomBytes(16, (err, raw) => {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
      });
    }
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      supportedExtArray = supportedExtArray || ['jpeg', 'jpg', 'png'];
      const filetypes = new RegExp(supportedExtArray.join('|'), 'i');
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
        return cb(null, true);
      }
      cb('File upload only supports the following filetypes: ' + supportedExtArray.join(', '));
    }
  });
  return upload.single(fieldName)
};
