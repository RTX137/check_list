import React,{ useState,useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import {  addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { query } from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3sl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}


function App() {
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState('')
console.log(input)

//create todo
const createTodo = async (e) => {
  e.preventDefault(e)
  if( input === '') {
    alert('por favor introduzca un valor en todo')
    return
  }
  await addDoc(collection(db,'todos'),{
    text: input,
    completed: false,


  })
 setInput('')
}

//read todo from firebase
useEffect(()=>{
const q = query(collection(db,'todos'))
const unsubscribe = onSnapshot(q,(querySnapshot) => {
  let todosArr = []
  querySnapshot.forEach((doc) =>{
    todosArr.push({...doc.data(),id: doc.id})
  })
  setTodos(todosArr)
})
return () => unsubscribe()
},[])
//update todo in firebase
const toggleComplete = async (todo) => {
  await updateDoc(doc(db,'todos', todo.id), {
    completed: !todo.completed
  })
}
// deleted todo

const deleteTodo = async (id) => {
  await deleteDoc(doc(db, 'todos', id))
}




  return (
 <div className={style.bg}>
  <div className={style.container}>
    <h3 className={style.heading}>Todo app</h3>
    <form onSubmit={createTodo} className={style.form}>
      <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder='check_list'/>
      <button className={style.button}><AiOutlinePlus size={30}/></button>
    </form>
    <ul>
      {todos.map((todo,index)=>(
        <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
      ))}
    </ul>

    {todos.length < 1 ? null : <p className={style.count}>{`tienes  ${todos.length} todos`}</p>}
    
  </div>

 </div>
  )
}

export default App
