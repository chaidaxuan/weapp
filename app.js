//app.js
const api = require('./utils/api.js')
const util = require('./utils/util.js')

App({
    onLaunch: function(options) {
        // init Util
        util.initUtil(this)
        // 最低版本1.9.90
        this.api = api
        const z = this

        let {
            path
        } = options

        if (!Object.values) {
            Object.values = function(obj) {
                let values = []
                for (let key in obj) {
                    values.push(obj[key])
                }
                return values
            }
        }

        if (!Object.keys) {
            Object.keys = function(obj) {
                let keys = []
                for (let key in obj) {
                    keys.push(key)
                }
                return keys
            }
        }

        wx.getSystemInfo({
            success: (res) => {
                let model = res.model
                if (model.includes('iPhone X') || model.includes('iPhone 10')) {
                    z.globalData.isPX = 'isPX'
                }
                console.log(res.model)
                if (model.includes('iPhone')) {
                    z.globalData.isios = 1
                } else {
                    z.globalData.isios = 0
                }

                // z.globalData.SDKVersion = res.SDKVersion
                // console.log(res.SDKVersion)
                // if (res.SDKVersion < '1.7.0') {
                //     util.showModal('提示', '当前微信版本过低，无法使用某些功能，请升级到最新微信版本后重试。')
                // }

                z.globalData.statusBarHeight = res.statusBarHeight
                z.globalData.screenHeight = res.screenHeight
                z.globalData.screenWidth = res.screenWidth
                z.globalData.rate = 750.0 / +res.windowWidth

                z.globalData.navBarHeight = 44 + res.statusBarHeight

                this.globalData.systemInfo = res
                console.log('rate', z.globalData.rate)
            }
        })
    },
    globalData: {
        isPX:''
    }
})