import { booksModel } from "../../database/models/books.model.js"
import {logsModel} from "../../database/models/logs.model.js"

export const insertDocument = async (documentData) => {
    const newDocument = await booksModel.insertOne(documentData);
    return newDocument;
};

export const insertMultiDocument = async (documentsData) => {
    const newDocuments = await booksModel.insertMany(documentsData);
    return newDocuments;
};
export const updateBook = async (title, updatedData) => {
    const result = await booksModel.updateOne(
        { title: title },      
        { $set: updatedData }   
    );
    return result;
};

export const search = async (title)=> {
    const book = await booksModel.findOne({title});
    return book;
}

export const searchBooks = async (startYear , endYear)=>{
    const books = await booksModel.find({year :{$gt:startYear , $lt: endYear}}).toArray()
    return books
}

export const searchGenres = async (genreData)=>{
    const books = await booksModel.find({genres: {$in:[genreData]}}).toArray()
    return books;
}

export const skipdocs = async(skipRange,limit)=>{
    const books = await booksModel.find().sort({year: -1}).skip(skipRange).limit(limit).toArray()
    return books
}

export const searchYearInteger = async()=>{
    const books = await booksModel.find( { year: {$type:"int" } } ).toArray();
    return books
}

export const searchNotInGenres = async (genresData)=>{
   const genresArray = Array.isArray(genresData) ? genresData : [genresData];


    const books = await booksModel.find({genres: {$nin:genresArray}}).toArray()
    return books;
}

export const beforeYear = async (year)=>{
    const books = await booksModel.deleteMany( {year:{$lt:year}} )
    return books
}

export const aggregate = async (year)=>{
    const books = await booksModel.aggregate([{$match: {year: {$gt:year}} } , {$sort:{year:-1}}]).toArray()
    return books
}

export const secondAggregate = async (year)=>{
    const books = await booksModel.aggregate([{$match: {year: {$gt:year}}} , { $project: { title: 1, author: 1, year: 1 } }]).toArray()
    return books
}

export const thirdAggregate = async ()=>{
    const books = await booksModel.aggregate([{$unwind:"$genres"}]).toArray()
    return books
}

export const fourthAggregate = async () => {
    const result = await logsModel.aggregate([
        {
            $addFields: {
                book_id: { $toObjectId: "$book_id" }
            }
        },
        {
            $lookup: {
                from: "books",        
                localField: "book_id",
                foreignField: "_id", 
                as: "book_details"   
            }
        },
        {
            $project: {
                _id: 0,
                action: 1,            
                "book_details.title": 1, 
                "book_details.author": 1,
                "book_details.year": 1
            }
        }
    ]).toArray(); 

    return result;
}
