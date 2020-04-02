import { request } from '../../utils/request'

const getSystemTime = () => {
    return request({
        url: "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
        method: 'GET'
    })
}



export {
    getSystemTime
}