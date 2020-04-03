import { request } from '../../utils/request'


const testIP = (proxy) => {
    console.log(proxy)

    return request({
        method: "GET",
        url: "https://ip.911cha.com/",
        proxy
    })
}


export {
    testIP
}