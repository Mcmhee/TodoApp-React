
import './App.css';

import React, {useState} from 'react';

  //global values
  let todoId = 0
  let editingData = {}

function App() {



  //state
  const [todoText, setTodoText ] = useState('')
  const [listOfTodos, setTodoList] = useState([])
  //

  //function

  function addTodo(event){
    event.preventDefault()

    if(Object.keys(editingData).length === 0){

      if(todoText === ''){
        return
      }

      setTodoList(() => {
        const newArray = [...listOfTodos, { todo : todoText, id : todoId++}]
        console.log(newArray)
        setTodoText('')
       return newArray
      })
      
    } else {
      const array = listOfTodos.map((item) => {
        if (item.id === editingData.id){
          return {...item, todo: todoText};
        }
        return item
       })

      setTodoList(array)
      setTodoText('')
      editingData = {}
    }
    
   
  }

  function deleteTodo(id){
    setTodoList(() => {
    return listOfTodos.filter((item)=>{
        return item.id !== id
     }) 
    })
  }

  function editTodo(data){
   let newArray = listOfTodos.find((item)=> item.id === data.id) 
   setTodoText(newArray.todo)
   editingData = data
  }
  

  
  return (
    <div className="App">
      <header className="App-header">

        <div className='header'>
          <p> TODO <span>APP</span></p>
          <form onSubmit={addTodo} className="textBtnContainer">
            <input type="text" placeholder="Enter your task" value={todoText} onChange={(event)=>{
             return setTodoText(event.target.value)
            }} /> 
            <button type='submit'> ADD </button>
          </form>
        </div>

        
        <div className='todosOverall'>
          <ul>
            {
            listOfTodos.map((item)=>{
              return <div className='todosItem'> 
                   <li> {item.todo}</li> 


                   <div className='todosItemBtn'>
                   <button onClick={()=>deleteTodo(item.id)} className="delete"> Delete </button>
                   <button onClick={()=>editTodo(item)} className="edit"> Edit </button>
                   </div>
                  
                </div> 
            })}
          </ul>
        </div>
      
      </header>
    </div>
  );
}

export default App;
