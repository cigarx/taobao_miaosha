let cookieList = [{
    id: 0,
    name: '张丽丽',
    cookie: "hng=CN%7Czh-CN%7CCNY%7C156; lid=%E5%97%AF%E5%97%AF%E5%97%AF65146032; cna=8Z/bFuNnxmUCAS1PZ23grmj4; tfstk=cvlFBP_DHBdeGI9MhSPzRu0STKqda6ruc1z4Kxlnws3wZHwQ0sbV2PGGDPzzDC2h.; OUTFOX_SEARCH_USER_ID_NCOO=1303669569.007351; tk_trace=1; tkmb=e=S8Fo6B12Ex8_8EDVupizTQZbKz-JYcCZgQrqGJG6OYV16swD0fiATMmooU3QgwdyZCUFr3cG8yV3vK14SfzrRoFjwlf8Pkr6G1lTqx_BTJ0wXq80bilCU_Q9VJGxUaTPkcBmx0PnIy1mIMu_PEOir-ANcqNqGrbU4lXhCO7aXsm-S8BATx87sRPjdpqVNg7bkzHlLd7laxf138EuirnuvC3B2ZpjOPhzWD8KF3ky5GCBbQgXL46fQlVaePl1AVP2bx2JvdzcRhZwxgCOA1dQBsMb_U3mGXM2&iv=0&et=1585716759&tk_cps_param=26632258&tkFlag=1&tk_cps_ut=2; t=49f686fd3d2215deb43ab2e686c97b0a; _tb_token_=fe54b3e3ba535; cookie2=522ce93aaf96e8593b00bf69a0835bfe; dnk=a2359634711; tracknick=a2359634711; lgc=a2359634711; enc=aODJAXqUkRIzl0QYCqeLAQJZg5kn9Sf7T5z9TtW73qqEoPp%2F%2FglHr2M1Tk1vo%2Bt6B68KT15hT5%2Fy8WEzNLYGwA%3D%3D; login=true; l=dBSCy5V4QuWHwGeYBOCZdy5D_mbtpIRYmuyUDiaei_5Ic68S_o7Oo_FVlFJ6cjWftvYB4dG4psJ9-etuw7HmndCP97RwKxDc.; _m_h5_tk=6ccfe9644b262e76a56d280cd8c63250_1585820049904; _m_h5_tk_enc=460e55d8911d21dde672284c9f1fc084; uc1=cookie15=V32FPkk%2Fw0dUvg%3D%3D&cookie21=W5iHLLyFeYZ1WM9hVLhR&existShop=false&cookie14=UoTUP2oUgB4Z%2FQ%3D%3D; uc3=id2=UUGk1ixs7uguEw%3D%3D&vt3=F8dBxdAW4kCc2REyRhA%3D&lg2=W5iHLLyFOGW7aA%3D%3D&nk2=AiPJ61g8K5Wp8XA%3D; _l_g_=Ug%3D%3D; uc4=id4=0%40U2OT5nkUp6EnyCuXdr2CN%2Bu9E4Sv&nk4=0%40AMiGAlZzSI7sVRFRHexqYjY7%2BL7CJQ%3D%3D; unb=2968865372; cookie1=BxE1vPnwd70q0lgctQvKB5TbFLOdy65%2FRDTC1B5WgBM%3D; cookie17=UUGk1ixs7uguEw%3D%3D; _nk_=a2359634711; sgcookie=ECJSP31tBafqO1%2BhXcU0t; sg=12c; csg=3016a12d; isg=BL-_Q9Z33XODZNmxrcDlYG5gTpNJpBNGmgchMlGMW261YN_iWXSjlj12pjaeA-u-"
}]
let id = 0
const addCookies = (name, value) => {
    cookieList.push({
        id: id++,
        name,
        cookie: value,
        token: getCookieValueByName('_m_h5_tk', value).split('_')[0]
    })
}

const setCookieById = (id = 0, cookieName, cookieValue) => {
    let ans
    cookieList = cookieList.map(item => {
        if (item.id == id) {
            item.cookie = item.cookie.replace(new RegExp(`${cookieName}=(.*?);`, 'g'), `${cookieName}=${cookieValue};`)
            ans = item.cookie
        }
        return item
    })
    return ans
}

const getCookiesById = (id = 0) => {
    for (let i = 0; i < cookieList.length; ++i) {
        if (id == cookieList[i].id) {
            return cookieList[i].cookie
        }
    }
}

const getCookieList = () => cookieList

const getCookieValueByName = (name, cookie) => {
    let tempList = cookie.split(';')
    for (let i = 0; i < tempList.length; ++i) {
        let ts = tempList[i].trim().split('=')
        if (ts.length < 2) {
            continue
        }
        let key = ts[0]
        if (key == name) {
            return ts[1]
        }
    }
}

const get = cookie => {

}

const delCookies = id => cookieList = cookieList.filter(item => item.id != id)

const getToken = () => getCookieValueByName('_m_h5_tk', getCookiesById()).split('_')[0]

export {
    addCookies,
    delCookies,
    getCookiesById,
    getCookieValueByName,
    setCookieById,
    getToken
}
