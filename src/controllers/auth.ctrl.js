const db = require('../db');
const Transform = require('../helpers/transform');
const Files = require('../helpers/files');


class AuthCtrl {

  async signIn (req, res, next) {

    const found = await db.$user.findOneByEmail(req.body.email);

    if (found.doc === null) {
      return next(`User with email ${ req.body.email } does not exists in DB`);
    }

    const passwordIsCorrect = await db.$user.verifyPassword(req.body.email, req.body.password);
    if (passwordIsCorrect === false) {
      return next(`Wrong password`);
    }

    const updatedToken = db.$user.genToken(found.doc.email);
    await db.$user.updateUserToken(found.doc.email, updatedToken);

    const transformed = new Transform(found.doc)
      .exclude(['password', 'v']).out();

    transformed.token = updatedToken;

    res.status(200).json(transformed);

  }

  async signUp (req, res, next) {

    const found = await db.$user.findOneByEmail(req.body.email);

    if (found.doc !== null) {
      await Files.remove(req.file.path);
      await Files.remove(req.file.thumbPath);
      return next(`User with email ${ found.doc.email } already exists in DB`);
    }

    const created = await db.$user.create({
      email: req.body.email,
      password: req.body.password,
      avatar: req.file.path,
      thumb: req.file.thumbPath,
    });

    const transformed = new Transform(created.doc)
      .exclude(['id', 'email', 'password', 'v']).out();

    res.status(200).json(transformed);

  }

}



module.exports = new AuthCtrl();
