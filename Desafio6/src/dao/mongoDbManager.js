import Message from './models/messages'; 


const mongoDbManager = {
    
  
    async getAllMessages() {
      try {
        const messages = await Message.find();
        return messages;
      } catch (error) {
        throw new Error('Error al obtener mensajes desde MongoDB');
      }
    },
  
    async addMessage(newMessage) {
      try {
        const message = new Message(newMessage);
        const savedMessage = await message.save();
        return savedMessage;
      } catch (error) {
        throw new Error('Error al agregar un nuevo mensaje en MongoDB');
      }
    },
  
    async updateMessage(messageId, updatedMessage) {
      try {
        const message = await Message.findByIdAndUpdate(
          messageId,
          { $set: updatedMessage },
          { new: true }
        );
        if (!message) {
          throw new Error('Mensaje no encontrado en MongoDB');
        }
        return message;
      } catch (error) {
        throw new Error('Error al actualizar el mensaje en MongoDB');
      }
    },
  
    async deleteMessage(messageId) {
      try {
        const deletedMessage = await Message.findByIdAndRemove(messageId);
        if (!deletedMessage) {
          throw new Error('Mensaje no encontrado en MongoDB');
        }
        return deletedMessage;
      } catch (error) {
        throw new Error('Error al eliminar el mensaje en MongoDB');
      }
    },
  };
  
  export default mongoDbManager;