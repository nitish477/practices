import './Card.css'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
function Card({name,notes,_id,remove,edit}) {
    return (
        <>
            <div className='card-contanier'>
               <b className='card-name'>{name}</b>
               <p className='card-notes'>{notes}</p>
              <p className='delete-icon' onClick={()=>remove(_id)}> <MdDelete /></p>
              <p className='edit-icon' onClick={()=>edit(_id)}><FaEdit /></p>
            </div>
        </>
    )
}

export default Card
