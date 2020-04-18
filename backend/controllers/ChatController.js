const Chat = require('../models/Chat_model');

class ChatController {
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async postChat (req, res) {
  // créer l'objet module et l'envoyer
    const userId = 1;// req.session.userId;
    const result = await Chat.create(req.body, userId);
    res.json(result);
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async getChats (req, res) {
    const userId = 1;// req.session.userId;
    const result = await Chat.getByUserId(userId);
    console.log(result);
    res.send(result);
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async deleteChat (req, res) {
    const userId = 1;// req.session.userId;
    console.log(req.params);
    const result = await Chat.remove(req.params.id, userId);
    console.log('del==', result);
    if (result) {
      res.sendStatus(200);
      return;
    }
    res.sendStatus(401);
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async updateChat (req, res) {
    const userId = 1;// req.session.userId
    const result = await Chat.update(req.params.id, req.body, userId);
    console.log('up == ', result);
    if (result) {
      res.sendStatus(200);
      return;
    }
    res.sendStatus(401);
  }
}
module.exports = ChatController;
