import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import {isDev, pathFrontend, validateEnventFrame} from './utils.js'

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            contextIsolation: true,
            preload: path.join(app.getAppPath(),"/src/electron/preload.js")
        }
    })
    if(isDev()){
        mainWindow.loadURL('http://localhost:5123')
        // mainWindow.webContents.openDevTools()
    }
    else{
        mainWindow.loadFile(pathFrontend())
    }
    mainWindow.webContents.send('statistics', 'Message from backend statistics')
    mainWindow.webContents.send('statisticsArr', {
        z : 1,
        y : 2,
        x : 'statisticsArr'
    })
    // receive text from the frontend by ipcRenderer.send in preload js and execute to the backend in main js
    ipcMain.on('urlSend', (event, argUrl) => {
        console.log(event.senderFrame.url)
        validateEnventFrame(event.senderFrame)
        console.log(argUrl)
        const secondWindow = new BrowserWindow({
            width: 1200,
            height: 600,
        })
        secondWindow.loadURL(argUrl)
    })
    // receive a oder from the frontend by ipcRenderer.invoke in preload js and execute to the backend in main js and return the response to the frontend
    ipcMain.handle('open-file', async (event, arg) => {
        console.log(event.senderFrame.url)
        validateEnventFrame(event.senderFrame)
        // dialog.showOpenDialog open file browser
        const {canceled, filePaths} = await dialog.showOpenDialog();
        if (!canceled) {
            return filePaths[0]
        }
    })
    // Exemple to create a listener for 'urlSend' and stop it after 10 seconds
    // Définir une fonction listener
    function handleUrlSend(event, argUrl) {
        console.log(event.senderFrame.url);
        validateEnventFrame(event.senderFrame);
        console.log(argUrl);
        const secondWindow = new BrowserWindow({
            width: 1200,
            height: 600,
        });
        secondWindow.loadURL(argUrl);
    }

    // Ajouter le listener pour 'urlSend'
    ipcMain.on('urlSend2', handleUrlSend);

    // Condition pour arrêter le listener (par exemple, après un certain délai)
    setTimeout(() => {
        ipcMain.off('urlSend2', handleUrlSend); // Retire le listener
        console.log('Listener pour "urlSend" a stopper.');
    }, 10000); // Supprime le listener après 10 secondes
})
