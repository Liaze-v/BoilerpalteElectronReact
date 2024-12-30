import { pathToFileURL } from 'url'
import { app } from 'electron'
import path from 'path'

export function isDev(){
    return process.env.NODE_ENV === 'development'
}

export function pathFrontend(){
   return path.join(app.getAppPath(), 'dist-react/index.html')
}

export function validateEnventFrame(frame){
    if(isDev() && new URL(frame.url).host === 'localhost:5123'){
        return;
    }
    if(frame.url !== pathToFileURL(pathFrontend()).toString()){
        throw new Error('not allowed')
    }
}