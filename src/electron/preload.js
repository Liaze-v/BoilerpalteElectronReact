// Bridge between frontend and backend
const electron = require('electron')

electron.contextBridge.exposeInMainWorld('electron', {
    test: () => {
        console.log('ceci est un test')
    },
    //execxecute in backend and return object to the frontend 
    // Main process (backend main.js) to renderer process (frontend app.jsx)
    getVersions: () => {
        return {
            node: process.versions.node,
            chrome: process.versions.chrome,
            electron: process.versions.electron
        }
    },
    
})
// renderer process (frontend app.jsx) to Main process (backend main.js) 
electron.contextBridge.exposeInMainWorld('urlFrontendtoBackend', {
    // Send text from the frontend to the backend and get with ipcMain.on in main js
    openUrl: (url)=> {
        electron.ipcRenderer.send('urlSend', url)
    }
})

// renderer process (frontend app.jsx) await response (ipcRenderer.invoke) from Main process (backend main.js) 
electron.contextBridge.exposeInMainWorld('getPathFile', {
    // Ask something from the frontend to the backend and wait for the response with ipcMain.handle in main js
    openFile: ()=> {
       return electron.ipcRenderer.invoke('open-file')
    }
})