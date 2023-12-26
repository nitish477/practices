import { useEffect, useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Card from './assets/Card/Card';

function App() {
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
   const[isEdit,setIsEdit]=useState(false)
   const [id,setId]=useState(0)
  const [data, setData] = useState([])

  const AddNotes = async () => {
    if (name === '' || notes === '') {
      alert('Enter All fields')
      return
    }
    try {

      const res = await axios.post('/api/v1/create/notes', {
        name: name,
        notes: notes
      })



      if (res?.data?.success) {
        alert(res?.data?.message)
        window.location.reload()
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const loadData = async () => {
    try {
      const res = await axios.get('/api/v1/fetch/notes')
      setData(res.data.data)
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])


  const remove = async(_id)=>{
       try{
        const res = await axios.delete(`/api/v1/delete/notes/${_id}`)
        if(res.data.success){
          alert(res?.data?.message)
         loadData()
        }
       }catch(err){
        alert("Error in deleting the data")
       }
  }


  const edit=async(_id)=>{
    console.log(_id)
      try{
        const res = await axios.get(`/api/v1/edit/notes/${_id}`)
        const data= res?.data?.data
        if(res?.data?.success){
          setName(data?.name)
          setNotes(data?.notes)
          setIsEdit(true)
          setId(data._id)
        }
         
      }catch(err){
        console.log(err.message)
      }
  }

  const Update = async()=>{
    try{
           const res= await axios.put(`/api/v1/update/notes/${id}`,{
            name:name,
            notes:notes
           })
           if(res?.data?.success===true){
              setIsEdit(false)
            
            alert(res?.data?.message)

            loadData()
            window.location.reload()
           }
    }catch(Err){
      console.log(Err.message)
    }
  }



  return (
    <>
      <div className='contanier'>
        <div className='sub-contanier'>
        <p className='title'>Show Notes</p>
          {
            data?.map((obj, i) => {
              const { name, notes, _id } = obj
              return <Card
                name={name}
                notes={notes}
                key={i}
                _id={_id}
                remove={remove}
                edit={edit}
              />
            })
          }
        </div>
        <div className='sub-contanier'>
        {isEdit?<p className='title'>Update Notes</p>:<p className='title'>Add Notes</p>}
          <div className='input-contanier mt'>
            <TextField
              id="outlined-password-input"
              label="Enter Name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
          </div>
          <div className='input-contanier'>
            <TextField
              id="outlined-password-input"
              label="Enter Some Notes"
              type="text"
              value={notes}
              onChange={(e) => { setNotes(e.target.value) }}
            />
          </div>
          {isEdit?<><div className='btn-contanier'>
            <Button variant="contained" endIcon={<SendIcon />} onClick={Update}>
              Update Notes
            </Button>
          </div></>:<><div className='btn-contanier'>
            <Button variant="contained" endIcon={<SendIcon />} onClick={AddNotes}>
              Add Notes
            </Button>
          </div></>}
        </div>
      </div>
    </>
  )
}

export default App
