import express from 'express';
import chatController from '../controllers/chatController';

const router = express.Router();

router.get('/messages', chatController.getAllMessages);
router.post('/messages', chatController.addMessage);

export default router;