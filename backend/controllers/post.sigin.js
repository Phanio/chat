const User = require('../models/user_model');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function postSigin (req, res) {
  if (req.session.userId) {
    res.status(200).send('Already authenticated');
    return;
  }
  // on vérifie l'username et le mot de passe de l'utilisateur
  let user = await User.getByUsername(req.body.username, ['id', 'username']);

  // si on a trouvé un utilisateur correspondant, alors on sauvegarde son ID
  // dans l'objet req.session
  if (user) {
    res.status(201).json('user already exites!');
    return;
  }

  user = new User();
  user.password = req.body.password;
  user.username = req.body.username;
  user = await User.create(user);
  if (user && user.id) {
    res.status(200).json('The account is created successfully!');
    return;
  }
  res.status(401).json({ msg: 'System error' });
}

module.exports = postSigin;
