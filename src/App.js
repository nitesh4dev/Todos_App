import React, { useEffect, useState } from "react"
import "./App.css"
import { MdDelete , MdModeEdit , MdAdd} from "react-icons/md";

const App = () => {

  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [icon , setIcon] = useState(false);
  const [editId , setEditId] = useState(null);
  console.log(items)

  const getArray = () => {
    if (!input) {
    }
    else if(icon && input){
         const edited = items.map((val) => {
            if(val.id == editId){
              return {...val , name:input};
            }
             return val;
         })
         setItems(edited);
         setInput("");
         setIcon(false);
    }
    else {
      const itemsArray = {id : new Date().getTime().toString() , name: input };
      setItems([...items, itemsArray]);
      setInput("");
    }
  }

  const deleteItem = (ind) => {
    const updatedItem = items.filter((value) => {
      return value.id !== ind;
    });
    setItems(updatedItem);
  }

  const editItem = (id) =>{
    setIcon(true);
    const editable = items.find((value)=>{ return value.id == id})
    setInput(editable.name);
    setEditId(id);
  }
  
  return (
    <>
      <div className="main">
        <div className="card">
          <div className="input">
            <h1>ToDo's App</h1>
            <input value={input} type="text" placeholder="Enter the Do's" onChange={(e) => { setInput(e.target.value) }} />
            <span className="add" onClick={getArray}>{icon? <MdModeEdit/>: <MdAdd/>}</span>
          </div>
          <div className="list">
            <ul>
              {items.map((value) => {
                return <li  key={value.id} > <span onClick={()=>editItem(value.id)}><MdModeEdit/></span> {value.name}  <span onClick={() => deleteItem(value.id)}><MdDelete /></span></li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default App;
