import dao from '../dao/dao';

const chatController = {
  async getAllMessages(req, res) {
    try {
      const messages = await dao.mongoDbManager.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener mensajes' });
    }
  },

  async addMessage(req, res) {
    const { user, message } = req.body;

    try {
      const newMessage = await dao.mongoDbManager.addMessage({ user, message });
      res.json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar mensaje' });
    }
  },
};

export default chatController;