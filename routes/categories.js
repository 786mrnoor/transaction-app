import express from 'express';
import { add, deleteCategory, getAll, update } from '../controller/categories.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', deleteCategory);

export default router;
