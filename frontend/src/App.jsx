
import "./App.css"
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
const App = () => {
  return (
    <div>
      <h1>My App</h1>

       <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </div>
  )
}

export default App