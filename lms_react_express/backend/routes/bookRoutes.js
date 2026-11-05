import express from "express";
import Book from "../models/Book.js";

const router = express.Router();


// CREATE BOOK
router.post("/", async (req, res) => {

    try {

        const book=new Book(req.body);

        const savedBook = await book.save();

        res.status(201).json({
            message: "Book added successfully",
            book:savedBook
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to add book"
        });
    }
});


// READ ALL BOOKS
router.get("/", async (req, res) => {

    try {

        const books = await Book.find();

        res.json(books);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch books"
        });
    }
});


// READ ONE BOOK
router.get("/:id", async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
               
            });
        }

        res.json(book);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch book"
        });
    }
});


// UPDATE BOOK
router.put("/:id", async (req, res) => {

    try {

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators:true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json({
            message: "Book updated successfully",
            book
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to update book"
        });
    }
});


// DELETE BOOK
router.delete("/:id", async (req, res) => {

    try {

        const book = await Book.findByIdAndDelete(
            req.params.id
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json({
            message: "Book deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to delete book"
        });
    }
});


export default router;