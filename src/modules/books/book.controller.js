import { Router } from "express";
import { insertDocument , insertMultiDocument , updateBook , search , searchBooks ,searchGenres , skipdocs , searchYearInteger , searchNotInGenres , beforeYear , aggregate , secondAggregate , thirdAggregate , fourthAggregate} from "./book.service.js";

const router = Router();

router.post("/add-book", async (req, res) => {
  try {
    const book = req.body;
    let newBook = await insertDocument(book);
    res.json({ message: "document inserted successfully", data: newBook });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/add-books",async(req,res)=>{
    try{
       const books = req.body
       let newBooks = await insertMultiDocument(books)
       res.json({message:"books inserted successfully",data: newBooks}) 
    } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }

})

router.patch("/update-book/:title",async (req,res)=>{
    try{
    const {title} = req.params
    const updatedBook = await updateBook(title,req.body)
    res.json({message:"Book updated successfully" , data: updatedBook})
    } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
})

router.get('/search',async (req,res)=>{
  try {
  const {title} = req.query
  const foundBook = await search(title);
  if(foundBook){
   res.json({message:"found the book" , data :foundBook})
  }
  else {
    res.json({message:"can not found the book"})
  } 
 } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }

})

router.get('/search-books',async (req,res)=>{
  try {
  const {startYear , endYear} = req.query
  const foundBooks = await searchBooks(parseInt(startYear), parseInt(endYear));
  if(foundBooks){
   res.json({message:"found books" ,data: foundBooks})
  }
  else {
    res.json({message:"can not found books between this range of time"})
  } 
 } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }

})

router.get('/search-genres',async (req,res)=>{
  try {
  const {genresData} = req.query
  const foundBooks = await searchGenres(genresData)
  if(foundBooks){
   res.json({message:"found books" ,data: foundBooks})
  }
  else {
    res.json({message:"can not found books "})
  } 
 } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }

})

router.get('/skip-docs',async (req,res)=>{
  try {
  const {skiprange,limit} = req.query
  const Books = await skipdocs(Number(skiprange),Number(limit))
  if(Books){
   res.json({message:"books are : " ,data: Books})
  }
  else {
    res.json({message:"no data "})
  } 
 } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }

})

router.get('/search-year-int',async (req,res)=>{
  try {
  const foundBooks = await searchYearInteger();
  if(foundBooks){
   res.json({message:"found books" ,data: foundBooks})
  }
  else {
    res.json({message:"can not found books where year is int"})
  } 
 } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }

})

router.get('/search-nin-genres',async (req,res)=>{
  try {
  const {genresData} = req.query
  const Books = await searchNotInGenres(genresData)
  if(Books.length > 0){
   res.json({message:"books are " ,data: Books})
  }
  else {
    res.json({message:"can not found books "})
  } 
 } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }

})

router.delete('/before-year',async(req,res)=>{
  try {
  const {year} = req.query
  const deleteBooks = await beforeYear(Number(year))
  if(deleteBooks.deletedCount > 0){
   res.json({message:"books deleted successfully " ,data: deleteBooks})
  }
  else {
    res.json({message:"can not delete books "})
  }
}catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
  
})

router.get('/aggregate1' , async (req,res)=>{
  try {  
  const {year} = req.query
    const Books = await aggregate(Number(year))
    if(Books.length > 0){
   res.json({message:"books are " ,data: Books})
  }
  else {
    res.json({message:"can not found books "})
  }

  } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
})

router.get('/aggregate2' , async (req,res)=>{
  try {  
  const {year} = req.query
    const Books = await secondAggregate(Number(year))
    if(Books.length > 0){
   res.json({message:"books are " ,data: Books})
  }
  else {
    res.json({message:"can not found books "})
  }

  } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
})

router.get('/aggregate3' , async (req,res)=>{
  try {  
  
    const Books = await thirdAggregate()
    if(Books.length > 0){
   res.json({message:"books are " ,data: Books})
  }
  else {
    res.json({message:"can not found books "})
  }

  } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
})

router.get('/aggregate4' , async (req,res)=>{
  try {  
  
    const Books = await fourthAggregate()
    if(Books.length > 0){
   res.json({message:"books are " ,data: Books})
  }
  else {
    res.json({message:"can not found books "})
  }

  } catch(error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
})





export default router;
