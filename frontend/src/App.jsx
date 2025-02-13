import { useThemeStore } from "./store/useThemeStore"

function App() {

  const { theme } = useThemeStore()

  return (
    <div data-theme={theme}>

    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </div>
  )
}

export default App
