const { ipcRenderer } = window.require('electron')

const sendMessageSync = (message, type = 'request') => {
    let id = Math.floor(Math.random() * 10e10);

    return ipcRenderer.sendSync(type, { id, message })
}
const sendMessage = (message, type = 'request') => new Promise((resolve, reject) => {
    let id = Math.floor(Math.random() * 10e10);
    setTimeout(reject, 20e3)
    ipcRenderer.send(type, { id, message })
    ipcRenderer.on(type, (event, arg) => {
        if (arg.id == id)
            resolve(arg)
    })
})

export {
    sendMessageSync,
    sendMessage
}