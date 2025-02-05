import { Request, Response } from 'express';
import { createBook, updateBook, deleteBook, searchBook } from '../models/bookModel';

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    published_year: string;
}

export const addBook = async (req: Request, res: Response): Promise<Book | any> => {
    const { title, author, isbn, published_year } = req.body;

  try {
    const book = await createBook(title, author, isbn, published_year);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};

export const editBook = async (req: Request, res: Response): Promise<Book | any> => {
    const { id } = req.params;
    const { title, author, isbn, published_year } = req.body;

  try {
    const bookId = parseInt(id);
    if (isNaN(bookId)) {
        return res.status(400).json({ error: "Invalid book ID" });
    }
    const book = await updateBook(bookId, title, author, isbn, published_year);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};

export const delBook = async (req: Request, res: Response): Promise<Book | any> => {
    const { id } = req.params;

  try {
    const bookId = parseInt(id);
    if (isNaN(bookId)) {
        return res.status(400).json({ error: "Invalid book ID" });
    }
    const book = await deleteBook(bookId);
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};

export const search = async (req: Request, res: Response): Promise<Book | any> => {
    const { title, author, isbn } = req.body;

  try {
    const books = await searchBook(title, author, isbn);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};
