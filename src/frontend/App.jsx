import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [url, setUrl] = useState(" ")
  const [path, setpath] = useState(" ")
  const versionsFrontend = window.electron.getVersions()
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Version Node {versionsFrontend.node}</h2>
      <h2>Version Chrome {versionsFrontend.chrome}</h2>
      <h2>Version Electron {versionsFrontend.electron}</h2>
      <div className="card">
        <h3>Enter the url</h3>
        <input
          type="string"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        />
        <p>
          the url is {url}
          <button onClick={() => window.urlFrontendtoBackend.openUrl(url)}>
            openUrl
          </button>
        </p>
      </div>
      <div className="card">
        <h3>Show file path</h3>
        <button onClick={async() => {
          const openPath = await window.getPathFile.openFile()
          console.log(openPath)
          setpath(openPath)
        }}>
            Open file
        </button>
        <p>
          the path is {path}
        </p>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
