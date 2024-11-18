import "./App.css";
import { Count } from "./components/Count";
import { GithubUserDetails } from "./components/GithubUserDetails"

function App() {

  return (
    <>
      <header className="App-header">
        <Count />
        <GithubUserDetails />
      </header>

    </>
  )
}

export default App
