import express from 'express';
import { add, deleteTransaction, get, getAll, put } from '../controller/transaction.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', get);
router.post('/', add);
router.put('/:id', put);
router.delete('/:id', deleteTransaction);

export default router;
