import { useState } from 'react'
import './App.css'

function App() {
  const [notes,setNotes]=useState('')
  const [name,setName]=useState('')

  const [data,setData]=useState([])

  

  return(
    <>
      <div className='contanier'>
      <div className='sub-contanier'>

      </div>
      <div className='sub-contanier'>

      </div>
      </div>
    </>
  )
}

export default App
