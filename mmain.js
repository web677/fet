const {
    app,
    Menu,
    BrowserWindow,
    ipcMain,
    Notification
} = require('electron')

let mainWindow, noticeWindow

const template = [
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternal('https://electronjs.org') }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services', submenu: [] },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })

    // Edit menu
    template[1].submenu.push(
        { type: 'separator' },
        {
            label: 'Speech',
            submenu: [
                { role: 'startspeaking' },
                { role: 'stopspeaking' }
            ]
        }
    )

    // Window menu
    template[3].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
    ]
}

const menu = Menu.buildFromTemplate(template)

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'MTool',
        width: 800,
        height: 494,
        frame: false,
        resizable: false,
        show: false,
        opacity: 0.95,
        titleBarStyle: 'hiddenInset'
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.loadURL('file://' + __dirname + '/src/index.html')
    // mainWindow.loadURL('file://' + __dirname + '/src/sites.html')

    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    Menu.setApplicationMenu(menu)

}

app.whenReady().then(createWindow)

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

ipcMain.on('window-main-mini', function () {
    mainWindow.minimize()
})

ipcMain.on('window-main-close', function () {
    app.quit()
})


ipcMain.on('notice-mini-done', function (sender, content) {
    let _reduce = content.initSize - content.resultSize
    if (Notification.isSupported()) {
        noticeWindow = new Notification({
            title: 'TinyPng',
            body: `已处理${content.count}个文件，压缩空间${(_reduce / 1024).toFixed(2)}kb；压缩占比${Math.round((_reduce / content.initSize).toFixed(2) * 100)}%`
        })

        noticeWindow.show()

        noticeWindow.on('close', function () {
            noticeWindow = null
        })
    }
})

