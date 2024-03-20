import express from 'express';
import { Book } from '../Models Books/products';

const router = express.Router();


router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/books/:id', getBook, (req, res) => {
    res.json(res.book);
});


router.post('/books', async (req, res) => {
    const book = new Book({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        author: req.body.author
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/books/:id', getBook, async (req, res) => {
    if (req.body.name != null) {
        res.book.name = req.body.name;
    }
    if (req.body.price != null) {
        res.book.price = req.body.price;
    }
    if (req.body.description != null) {
        res.book.description = req.body.description;
    }
    if (req.body.image != null) {
        res.book.image = req.body.image;
    }
    if (req.body.author != null) {
        res.book.author = req.body.author;
    }

    try {
        const updatedBook = await res.book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/books/:id', getBook, async (req, res) => {
    try {
        await res.book.remove();
        res.json({ message: 'Đã xóa thành công cuốn sách' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Không thể tìm thấy sách này' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.book = book;
    next();
}

export default router;
