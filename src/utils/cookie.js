let cookieList = [{
    id: 0,
    name: '张丽丽',
    cookie: ''
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

const setCookiesById = (id = 0, cookies) => {
    let ans
    cookieList = cookieList.map(item => {
        if (item.id == id) {
            item.cookie = cookies
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

const setCookieList = (list) => cookieList = list

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


const delCookies = id => cookieList = cookieList.filter(item => item.id != id)

const getToken = () => getCookieValueByName('_m_h5_tk', getCookiesById()).split('_')[0]

export {
    addCookies,
    delCookies,
    getCookiesById,
    getCookieValueByName,
    setCookieById,
    getToken,
    setCookiesById,
    getCookieList,
    setCookieList
}
