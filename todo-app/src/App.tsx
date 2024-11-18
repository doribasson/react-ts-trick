//npm create vite@latest --template
import { useState, useEffect } from 'react'
import Todo from "./components/Todo"
import Input from "./components/Input"

const todosData = [{ id: 1, text: "dori1", completed: false }, { id: 2, text: "dori2", completed: false }, { id: 3, text: "dori3", completed: true }]

interface Iworker{
  name:string
  age:string
  company:string
}

const myObj:Iworker={
  name:"dori",
  age:"36",
  company:"orshar"
}
export interface Itodo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Itodo[]>([])
  const [name, setName] = useState<string | "">("")
  const [flag,setflag] = useState<boolean>(false)

  const styles = {
    color: 'yellow',
    fontSize: '1.3rem',
    backgroundColor: 'lightblue',
  };


  useEffect(() => {
    if (todosData.length > 0) setTodos(todosData)
    //console.log(todos)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const newValue = e.target.value;
    const { value } = e.target
    setName(value)
  }


 const renderObj = () =>{
  return(
    <>
    <div>hiiiiiiiiiiiiiiiii</div>
    {Object.keys(myObj).map((k,i)=>{
      return(
        <li key={`i+${k}`}>{k}</li>
      )
    })}
    </>
  )
 }


 const myFn = () =>{
   if(flag){
    
  }else
  setName("trueeeeee");
 }
  
  return (
    <>
      <div className='app_container'>
        <h1>todos</h1>
        <ul>
          {todos.length > 0 ? todos?.map(todo => <li key={todo.id}><Todo name={name} todo={todo} /></li>) : null}
        </ul>
        {/* <input type="text" placeholder='enter str' value={name} onChange={(e) => handleChange(e)} /> */}
        <Input
          type="text"
          placeholder='enter str'
          value={name}
          style={styles}
          onChange={handleChange} />
        <h1>iam val: {name}</h1>
        <div>
          {Object.keys(myObj).map(key =>{
            return(
              <li key={key}>{key}</li>
            )
          } )}
        </div>
        <div>
        {name==="" && renderObj()}
        </div>
        <button onClick={myFn}>render obj</button>
      </div>
    </>
  )
}

export default App
