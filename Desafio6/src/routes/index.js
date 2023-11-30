import express from 'express';
import chatRoutes from './chatRoutes';

const router = express.Router();

router.use('/chat', chatRoutes);

export default router;