
const { ipcMain } = require('electron')
const axios = require('axios')
const { getProxy } = require('./proxy')


ipcMain.on('request', request)

async function request(event, arg) {
    try {

        let requestOptions = arg.message;
        let proxy = null
        if (requestOptions.proxyFlag == true)
            proxy = await getProxy()
        if (proxy) {
            proxy = {
                host: proxy.ip,
                port: +proxy.port
            }
            requestOptions.proxy = proxy
        }
        let res = await axios.request(requestOptions)
        event.reply('request', { id: arg.id, response: { err: false, data: res } })
    } catch (e) {
        event.reply('request', { id: arg.id, response: { err: true, msg: e } })
    }

}








// let cookie = 'hng=CN%7Czh-CN%7CCNY%7C156; lid=%E5%97%AF%E5%97%AF%E5%97%AF65146032; cna=8Z/bFuNnxmUCAS1PZ23grmj4; tfstk=cvlFBP_DHBdeGI9MhSPzRu0STKqda6ruc1z4Kxlnws3wZHwQ0sbV2PGGDPzzDC2h.; OUTFOX_SEARCH_USER_ID_NCOO=1303669569.007351; tk_trace=1; tkmb=e=S8Fo6B12Ex8_8EDVupizTQZbKz-JYcCZgQrqGJG6OYV16swD0fiATMmooU3QgwdyZCUFr3cG8yV3vK14SfzrRoFjwlf8Pkr6G1lTqx_BTJ0wXq80bilCU_Q9VJGxUaTPkcBmx0PnIy1mIMu_PEOir-ANcqNqGrbU4lXhCO7aXsm-S8BATx87sRPjdpqVNg7bkzHlLd7laxf138EuirnuvC3B2ZpjOPhzWD8KF3ky5GCBbQgXL46fQlVaePl1AVP2bx2JvdzcRhZwxgCOA1dQBsMb_U3mGXM2&iv=0&et=1585716759&tk_cps_param=26632258&tkFlag=1&tk_cps_ut=2; t=49f686fd3d2215deb43ab2e686c97b0a; _tb_token_=fe54b3e3ba535; cookie2=522ce93aaf96e8593b00bf69a0835bfe; dnk=a2359634711; tracknick=a2359634711; lgc=a2359634711; l=dBSCy5V4QuWHwmPTBOCiqDQoJgQOSIRYSuldE_UWi_5aq6LshR_Oo_BM7Fp6VjWftlYB4dG4psJ9-etuw7Hmnd3whIWAHxDc.; _m_h5_tk=8243b1108d0281b205633fe4c179ee2d_1585735729409; _m_h5_tk_enc=b63ace27b405e53454b462066a06da44; isg=BCAgnkXdaucLHtY8pl0y1bV18S7yKQTzEfJu_5ox7jvOlcO_Qjlrgg6kKTsVIbzL; uc1=existShop=false&cookie21=W5iHLLyFeYZ1WM9hVLhR&cookie14=UoTUP2WB4ya%2FVw%3D%3D&cookie15=Vq8l%2BKCLz3%2F65A%3D%3D; uc3=id2=UUGk1ixs7uguEw%3D%3D&nk2=AiPJ61g8K5Wp8XA%3D&vt3=F8dBxdAR%2BemaPEx3iCs%3D&lg2=URm48syIIVrSKA%3D%3D; _l_g_=Ug%3D%3D; uc4=nk4=0%40AMiGAlZzSI7sVRFRHexqYjmNX2X%2F2Q%3D%3D&id4=0%40U2OT5nkUp6EnyCuXdr2COAg9%2B6S9; unb=2968865372; cookie1=BxE1vPnwd70q0lgctQvKB5TbFLOdy65%2FRDTC1B5WgBM%3D; login=true; cookie17=UUGk1ixs7uguEw%3D%3D; _nk_=a2359634711; sgcookie=EHzn%2BnZptxS%2FPNCLU9f6h; sg=12c; csg=e5da15f0; enc=aODJAXqUkRIzl0QYCqeLAQJZg5kn9Sf7T5z9TtW73qqEoPp%2F%2FglHr2M1Tk1vo%2Bt6B68KT15hT5%2Fy8WEzNLYGwA%3D%3D'


// const request = (obj) => axios.request({
//     headers: {
//         'Cookie': cookie,
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36',
//         'Accept-Encoding': 'deflate, br',
//         'Accept-Language': 'zh-CN,zh;q=0.9',
//         ...obj.headers
//     },
//     url: obj.url,
//     method: obj.method
// })


// const bulidOrder = () => {
//     return new Promise(resolve => {
//         request({
//             headers: {
//                 'Host': 'h5api.m.tmall.com',
//                 'Referer': 'https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&itemId=557747333645&exParams=%7B%22etm%22%3A%22%22%7D&skuId=3461414993751&quantity=1&divisionCode=140802&userId=2968865372&buyNow=true&_input_charset=utf-8&areaId=140802&x-itemid=557747333645&x-uid=2968865372'
//             },
//             url: 'https://h5api.m.tmall.com/h5/mtop.user.getusersimple/1.0/?jsv=2.5.7&appKey=12574478&t=1585725284270&sign=08d86899e9e691ed4888f3b88d51b843&api=mtop.user.getUserSimple&v=1.0&ecode=1&sessionOption=AutoLoginOnly&jsonpIncPrefix=liblogin&type=jsonp&dataType=jsonp&callback=mtopjsonpliblogin1&data=%7B%7D'
//         }).then((res) => {
//             console.log(res.body)
//             console.log(res.headers)
//         }).catch(e => {
//             console.log(e)
//         })
//     })
// }

// const bulidOrder = () => {
//     console.log(1234)
//     axios.request({
//         url: "https://www.webpackjs.com/configuration/devtool/",
//         method: "GET"
//     }).then(res => {
//         console.log(res)
//     }).catch(e => {
//         console.log(e)
//     })
// }