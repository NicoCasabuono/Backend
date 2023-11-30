import fs from 'fs';
import path from 'path';

const dataFolderPath = path.join(__dirname, 'data');

const fileSystemManager = {
    // Implementa las operaciones CRUD con FileSystem
    // Agrega las operaciones según sea necesario
  
    getAllMessages() {
      try {
        const messagesFilePath = path.join(dataFolderPath, 'messages.json');
        const messagesData = fs.readFileSync(messagesFilePath, 'utf-8');
        const messages = JSON.parse(messagesData);
        return messages;
      } catch (error) {
        throw new Error('Error al obtener mensajes desde FileSystem');
      }
    },
  
    addMessage(newMessage) {
      try {
        const messagesFilePath = path.join(dataFolderPath, 'messages.json');
        const messagesData = fs.readFileSync(messagesFilePath, 'utf-8');
        const messages = JSON.parse(messagesData);
  
        messages.push(newMessage);
  
        fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
  
        return newMessage;
      } catch (error) {
        throw new Error('Error al agregar un nuevo mensaje en FileSystem');
      }
    },
};
export default fileSystemManager;