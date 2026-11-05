import express from "express";
import mongoose from "mongoose";
import Book from "../models/Book.js";

const router = express.Router();

//add new book
router.post("/",async(req,res)=>{
   try{
    const book=new Book(req.body);
    const savedBook=await book.save();
    res.status(201).json({
        message:"Book added successfully",
        book:savedBook
    })
   } catch(error){
    res.status(400).json({
        message:"error adding book",
        error:error.message
    })
   }
})

//Read books by id
router.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid book ID"
            })
        }
        const book=await Book.findById(id);
        if(!book){
            return res.status(404).json({
                message:"Book not found"
            })
        }
        res.status(200).json(book);
    }
    catch(error){
        res.status(500).json({
            message:"error fetching book",
            error:error.message
        })
    }
})

//read all books
router.get("/",async(req,res)=>{
    try{
        const books=await Book.find();
        res.status(200).json(books);

    }catch(error){
        res.status(500).json({
            message:"error fetching book",
            error:error.message
        })
    }
})

//update by id
router.put("/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid book ID"
            })
        }
        const updatedBook=await Book.findByIdAndUpdate(
            id,req.body,{
                new:true,
                runValidators:true
            }
        );
        if(!updatedBook){
            return res.status(404).json({
                message:"Book not found"
            })
        }
        res.status(200).json({
            message:"Book updated successfully",
            book:updatedBook
        })
    }catch(error)
    {
        res.status(400).json({
            message:"Error updating book",
            error:error.message
        })
    }
})
// delete
router.delete("/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid book ID"
            })
        }
        const deletedBook=await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).json({
                message:"Book not found"
            })
        }
        res.status(200).json({
            message:"Book deleted successfully",
            book:deletedBook
        })
    }catch(error)
    {
        res.status(500).json({
            message:"Error deleting book",
            error:error.message
        })
    }
})

export default router;