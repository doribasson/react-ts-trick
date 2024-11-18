import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Child name="dori" />
    </>
  )
  type props = {
    name:string
  }
  function Child({name}:props){
  return(
    <h1>{name}</h1>
  )
 } 
}

export default App
