import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv'
import { createNotes, deleteNote, fetchData, updateNote } from "./controler/notes.js";
dotenv.config()

const app =express()
app.use(express.json())

const PORT = process.env.PORT || 5000

const connectDB= async()=>{
    try{
        const connect = mongoose.connect(process.env.MONGODB_URI)
        if(connect){
            console.log("MongoDB Connected...")
        }
    }catch(err){
        console.log(err.message)
    }
}

app.get('/healths',(req,res)=>{
    res.status(200).send('API is running')
})

app.post('/api/v1/create/notes',createNotes)
app.get('/api/v1/fetch/notes',fetchData)
app.put('/api/v1/update/notes/:_id',updateNote)
app.delete('/api/v1/delete/notes/:_id',deleteNote)

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
    connectDB()
})