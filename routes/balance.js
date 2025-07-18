import express from 'express';
import balance from '../controller/balance.js';

const router = express.Router();

router.get('/', balance);

export default router;
