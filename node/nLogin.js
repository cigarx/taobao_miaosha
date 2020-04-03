const { ipcMain, BrowserWindow } = require('electron')

const createLoginWindow = () => new Promise(resolve => {

    let win = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadURL('https://login.m.taobao.com/login.htm')
    // win.loadURL('https://login.taobao.com/member/login.jhtml')

    let cookies
    let cookieInstance = win.webContents.session.cookies
    cookieInstance.on('changed', () => {
        cookieInstance.get({})
            .then(res => {
                cookies = ''
                for (let i = 0; i < res.length; ++i) {
                    cookies += `${res[i].name}=${res[i].value};`
                }
            })
    });

    win.on('closed', () => {
        win = null
        resolve({ err: false, cookies })
    })
})


ipcMain.on('login', (e, message) => {
    console.log(message)
    createLoginWindow()
        .then(res => {
            e.returnValue = res
        })
})




