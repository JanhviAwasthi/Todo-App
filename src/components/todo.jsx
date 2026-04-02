import React,{useEffect, useState} from 'react'
const Todo = () => {
    const [todo,setTodo] = useState("");
    const [todos,setTodos] = useState(()=>{
        const savedTodos=localStorage.getItem("todos") || [];
        return savedTodos?JSON.parse(savedTodos):[];
    });
    useEffect(()=>{
        const savedTodos=JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(savedTodos);
        console.log(todos);
    },[]);
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos));
    },[todos]);
    const handleAdd=(e)=>{
        e.preventDefault();
        if(todo.trim()===""){
            alert("Task required");
            return;
        }
        const newTodo = {
            id:Date.now(),
            text:todo,
        };
        setTodos([...todos,newTodo]);
        setTodo("");
    }
    const handleDelete=(id)=>{
        setTodos(todos.filter((t)=>t.id!==id));
    }

  return (
    <div style={{maxWidth:'400px',margin:"2rem auto ",
        textAlign:'center'
    }}>
        <h1>My To-Do List</h1>
        <form onSubmit={handleAdd}>
            <input type="text" placeholder='Enter a task' value={todo} onChange={(e)=>setTodo(e.target.value)} />
            <button style={{padding:"0.5rem 1rem" , marginLeft:"0.5rem"}}type='submit' >Add</button>
        </form>
        <ul>
            {todos.map((todoItem)=>{
                return(
                <div key={todoItem.id}>
                    <li onClick={()=>handleDelete(todo.id)} style={{backgroundColor:"#f5f5f5", padding:"10px", marginBottom:"10px",
                        display:"flex"
                    }}>{todoItem.text}</li>
                    <button style={{marginLeft:"1rem"}} onClick={()=>{
                        setTodos(todos.filter((t)=>t.id!==todoItem.id));
                    }}>Delete</button>
                </div>
                );})}
        </ul>
       </div>
  )
}
export default Todo