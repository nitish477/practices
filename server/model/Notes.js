import { Schema,model } from "mongoose";

const notesSchema=new Schema({
    name:{
        type:String,
        required:[true,'Enter Your name']
    },
    notes:{
        type:String,
        required:[true,'Please Enter some Note']
    }
},
{
    timestamps:true
})
const Note =model('Note',notesSchema)
export default Note