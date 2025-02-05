import { Router } from 'express';
import { addBook, editBook, delBook, search } from '../controllers/bookController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/books', protect, addBook);
router.put('/books/:id', protect, editBook);
router.delete('/books/:id', protect, delBook);
router.get('/books/search', protect, search);


export default router;