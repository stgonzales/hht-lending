 const { app, BrowserWindow, Menu, ipcMain} = require('electron')
const fs = require('fs')
const docPath = app.getPath("documents")

process.env.NODE_ENV = 'development'

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1080,
    height: 920,
    webPreferences: {
      nodeIntegration: true
    },
    enableRemoteModule: true
  })

  //Build menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //Insert menu
  Menu.setApplicationMenu(mainMenu)

  process.env.NODE_ENV == 'production' ? win.menuBarVisible = false : win.menuBarVisible = true

  win.fullScreenable = true

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  { 
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  }
];

////////////////////////////////////////////////////////////////////////

//Format the data to be stored
function dataGen(obj){
  
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  const movimentData = '\r\n' + y + m + d + h + min + ',' + obj.hht+ ',' + obj.user + ',' + obj.moviment

  return movimentData
}

//Generate header for the new file(if not exist)
function fileHeader(){
  return 'Date,HHT,User,Moviment'
}

//Read data file

function dataFileObj (){
  
  const data = fs.readFileSync(docPath + '\\data.csv', 'utf-8')
  const table = data.split('\r\n').slice(1)

  let dataArray = []
  
  table.forEach(row=>{
      let tempObj = {}
      const columns = row.split(',')
      tempObj.date = columns[0]
      tempObj.hht = columns[1]
      tempObj.user = columns[2]
      tempObj.moviment = columns[3]
      
      dataArray.push(tempObj)
  })  
  
  //console.log(dataArray);
  
  return dataArray
}

//EVENT LISTENERS

//Catch moviment:add
ipcMain.on('moviment:add', function(e, inputObj){
    if (!fs.existsSync(docPath + '\\data.csv')){
      fs.appendFile(docPath + '\\data.csv', fileHeader(), (err)=>{
        if(err) throw err;
      })
    } 
    fs.appendFile(docPath + '\\data.csv', dataGen(inputObj), (err)=>{
      if(err) throw err;
    })
    e.returnValue = true
})

//Send onLoad
ipcMain.on('load', (e,args)=>{
    e.returnValue = JSON.stringify(dataFileObj())
  })