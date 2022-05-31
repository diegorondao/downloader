const { app, BrowserWindow, nativeImage } = require("electron")
const isDev = require('electron-is-dev')
const Path = require('path')
// const _ = require('lodash')

let mainWindow

const isFirstInstance = app.requestSingleInstanceLock()

if (!isFirstInstance) {
  app.quit()
}

const icon = nativeImage.createFromPath(Path.resolve('./resources/media/logo.png'))

function createWindow() {
  mainWindow = new BrowserWindow({
    icon,
    width: 1366,
    height: 768,
    minWidth: 330,
    minHeight: 450,
    title: "Area Projetista | Autodoc",
    // titleBarStyle: "hidden",
    // title: 'asdad',
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  // mainWindow.setMenu(null)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${Path.join(__dirname, '../build/index.html')}`)

  // Menu.setApplicationMenu(new Menu())

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.platform === 'darwin') {
    app.dock.setIcon(icon)
  }

  if (process.platform === 'win32') {
    mainWindow.flashFrame(true)
    mainWindow.once('focus', () => mainWindow.flashFrame(false))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', function () {
  createWindow()
})

// ipcMain.on("download-item", async (event, file) => {

//   const { id, documento } = file

//   try {
//     const url = documento.url
//     const path = Path.resolve(app.getPath('downloads'), 'area-projetista', file.documento.path.replace(/['\\]+/g, '/'))
//     const filePath = Path.resolve(path, `${documento.nome}.zip`)

//     console.log('path', path)

//     // check folder
//     if (!Fs.existsSync(path)) {
//       Fs.mkdirSync(path, { recursive: true })
//     } else if (Fs.existsSync(filePath)) {
//       Fs.unlinkSync(filePath)
//     }

//     return Axios({
//       method: 'get',
//       url,
//       responseType: 'stream'
//     }).then(response => {
//       response.data.pipe(Fs.createWriteStream(filePath))
//       // const totalSize = response.headers['content-length']
//       // let downloaded = 0

//       // // response.data.on('data', _.throttle(data => {
//       //   downloaded += Buffer.byteLength(data)
//       //   const completion = (totalSize > 0 && downloaded > 0) ? Math.ceil(downloaded / (totalSize / 100)) : 0

//       //   event.sender.send('download-progress', {
//       //     id,
//       //     completion: (completion > 100) ? 100 : completion,
//       //     documento
//       //   })
//       // }), 1000)

//       response.data.on('end', () => {
//         // event.sender.send('download-finalizado', { id, documento })
//       })

//     }).catch(error => {
//       console.log(" Axios error", error)
//       event.sender.send('download-error', { id, documento })
//     })

//   } catch (error) {
//     console.log("Download error", error)
//     event.sender.send('download-error', { id, documento })
//   }
// })

