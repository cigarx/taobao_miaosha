import { sendMessageSync } from '../../utils/message'
import { setCookiesById, getCookieList, setCookieList } from '../../utils/cookie'

const fs = window.require('fs')


const loginTaobao = () => {
    let res = sendMessageSync({}, 'login')
    console.log(res)
    setCookiesById(0, res.cookies);
}


const saveLoginUsers = () => {
    console.log(__dirname)
    fs.writeFile('./cookie/cookies.config', JSON.stringify(getCookieList()), (e) => {
        console.log(e)
    })
}
const readLoginUsers = () => {
    fs.readFile('./cookie/cookies.config', ((e, data) => {
        if (e) return
        console.log(data.toString())
        setCookieList(JSON.parse(data))
    }))
}



export {
    loginTaobao,
    saveLoginUsers,
    readLoginUsers
}