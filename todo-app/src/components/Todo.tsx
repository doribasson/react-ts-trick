import { Itodo } from "../App"

interface Iprops {
    todo: Itodo
    name: string
}

//function MyComponent({ prop1, prop2 }: { prop1: string; prop2: number }) {

//function MyComponent({ todo, name }: { todo: Itodo; name: string }) {
// const Todo:React.FC<Iprops> = ({ todo,name }) => {
const Todo = ({ todo,name }: Iprops) => {

    console.log(todo, "todo")
    return (
        <div className="todo_container">
            <span>name:{todo.text}</span>
            <span>{`completed: ${todo.completed ? "true" : "false"}}`}</span>
            <span>ffffff{name}</span>
        </div>
    )
}

export default Todo