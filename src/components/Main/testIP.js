import { request } from '../../utils/request'


const testIP = () => {


    return request({
        method: "GET",
        url: "https://ip.911cha.com/"
    }, true)
}


export {
    testIP
}