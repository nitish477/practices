import Note from "../model/Notes.js";

const createNotes = async (req, res) => {
    const { name, notes } = req.body
    const note = new Note({
        name: name,
        notes: notes
    })


    try {
        const saveNotes = await note.save()
        res.status(201).json({
            success: true,
            data: saveNotes,
            message: 'Note Create successFully'
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Fail to Save'
        })
    }

}

const fetchData = async (req, res) => {
   
    try {
        const getdata = await Note.find()
        
        if (!getdata) {
            return res.status(404).json({
                success: false,
                message: "No Data Found"
            });
        }

        res.status(200).json({
            success: true,
            data: getdata,
            message: 'Data Fetch Successfully'
        })

    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const deleteNote = async (req, res) => {
    const { _id } = req.params;
   try{
    const remove = await Note.deleteOne({ _id })
    if (!remove) {
        return res.status(404).json({
            success: false,
            message: "Id Not found!"
        })
    }
    res.status(200).json({
        success:true,
        message: 'data delete successfully'
    })
   }catch(err){
       res.status(400).json({
        success:false,
        message: err.message
       })
   }
}

const updateNote= async(req,res)=>{
    const {_id}=req.params
   
    try{
        const {name,notes}=req.body
         await Note.updateOne({_id:_id},{$set:{name:name,notes:notes}})
         const updateData =  await Note.findById(_id)
         res.status(201).json({
            success:true,
            data:updateData,
            message:"Update Success"
         })
    }catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}


export {createNotes,updateNote,deleteNote,fetchData}