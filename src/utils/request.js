import { sendMessage } from './message'
// const fs  = window.require('fs')
import { getCookiesById, getCookieValueByName, setCookieById, getToken } from './cookie'
import { getSign } from './enc'
import qs from 'qs'
const appKey = '12574478'

const request = (obj, proxyFlag = false) => new Promise((resolve, reject) => {
    let time = new Date().getTime()
    obj = {
        headers: {
            'Cookie': getCookiesById(),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36',
            'Accept-Encoding': 'deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            ...obj.headers
        },
        data: obj.data,
        url: obj.url,
        method: obj.method,
        responseEncoding: obj.responseEncoding || 'utf8',
        responseType: obj.responseType || 'json',
        proxyFlag: proxyFlag
    }

    sendMessage(obj, 'request')
        .then(res => {
            let newTime = new Date().getTime()
            console.log('网络请求：用时' + (newTime - time) + 'ms')

            if (res.response.err) {
                console.error('请求失败，node Axios：' + JSON.stringify(res.response))
            }
            try {
                resolve(res.response.data)
            } catch (e) {
                reject({
                    err: true,
                    msg: '请求成功，解析失败' + e
                })
            }
        })
        .catch(e => {
            reject({ err: true })
        })

})

/**不一定成功，可能返回令牌
 * 令牌过期需要再次请求
 */
const _tryBulidOrder = obj => {

    let {
        itemId, skuId, quantity, userId, divisionCode
    } = obj

    //合成data
    let data = {
        "enc": "?",
        "itemId": itemId,
        "exParams": "{\"etm\":\"\",\"tradeProtocolFeatures\":\"5\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1\",\"buyFrom\":\"tmall_h5_detail\"}",
        "skuId": skuId,
        "quantity": quantity,
        "divisionCode": divisionCode,
        "userId": userId,
        "buyNow": true,
        "_input_charset": "utf-8",
        "areaId": divisionCode,
        "x-itemid": itemId + '',
        "x-uid": userId,
        "serviceId": null
    }
    let time = new Date().getTime()
    let sign = getSign(getToken(), time, appKey, JSON.stringify(data))
    return request(
        {
            method: "POST",
            data: qs.stringify({ data: JSON.stringify(data) }),
            url: `https://h5api.m.tmall.com/h5/mtop.trade.order.build.h5/4.0/?jsv=2.5.7&appKey=${appKey}&t=${time}&sign=${sign}&api=mtop.trade.order.build.h5&v=4.0&type=originaljson&ttid=%23b%23ip%23%23_h5&isSec=1&ecode=1&AntiFlood=true&AntiCreep=true&H5Request=true&dataType=jsonp`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Referer': `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%3F&itemId=${itemId}&exParams=%7B%22etm%22%3A%22%22%7D&skuId=${skuId}&quantity=${quantity}&divisionCode=${divisionCode}&userId=${userId}&buyNow=true&_input_charset=utf-8&areaId=${divisionCode}&x-itemid=${itemId}&x-uid=${userId}`
            }
        }
    )
}

// const _tryGetUserSimple = () => {


//     let itemId = '557747333645'

//     //合成data
//     let data = {}
//     let time = new Date().getTime()
//     let sign = getSign(getToken(), time, appKey, JSON.stringify(data))

//     return request(
//         {
//             method: "GET",
//             url: `https://h5api.m.tmall.com/h5/mtop.user.getusersimple/1.0/?jsv=2.5.7&appKey=${appKey}&t=${time}&sign=${sign}&api=mtop.user.getUserSimple&v=1.0&ecode=1&sessionOption=AutoLoginOnly&jsonpIncPrefix=liblogin&type=jsonp&dataType=jsonp&callback=mtopjsonpliblogin1&data=%7B%7D`,
//             headers: {
//                 'Referer': `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&itemId=${itemId}&exParams=%7B%22etm%22%3A%22%22%7D&skuId=${skuId}&quantity=${quantity}&divisionCode=${divisionCode}&userId=${userId}&buyNow=true&_input_charset=utf-8&areaId=${divisionCode}&x-itemid=${itemId}&x-uid=${userId}`
//             }
//         }
//     )
// }

async function bulidOrder(obj, time = 0) {
    if (time++ > 1) {
        console.log('重试次数超过5此')
        return { err: true, msg: '重试次数超过5次' }
    }

    let res = await _tryBulidOrder(obj)
    // console.log(res)
    //" mtopjsonpliblogin1({"api":"mtop.user.getUserSimple","v":"1.0","ret":["FAIL_SYS_TOKEN_EXOIRED::令牌过期"],"data":{}})"
    if (/FAIL_SYS_TOKEN_EXOIRED/g.test(typeof res.data == 'string' ? res.data : res.data.ret[0])) {
        //令牌过期
        let cookies = res.headers['set-cookie']
        for (let i = 0; i < cookies.length; ++i) {
            let temps = cookies[i].split(';')[0].split('=')
            if (temps.length < 2) {
                return bulidOrder(obj, time)
            }
            setCookieById(0, ...temps)
        }
        return bulidOrder(obj, time)
    } else if (/SUCCESS/g.test(typeof res.data == 'string' ? res.data : res.data.ret[0])) {
        return {
            err: false,
            data: res.data.data
        }
    } else {
        console.log(res.data)
        return {
            err: true,
            msg: typeof res.data == 'string' ? res.data : res.data.ret[0]
        }
    }
}


const _trySubmitOrder = (data, orderInfo) => {
    let time = new Date().getTime()
    let {
        itemId, skuId, quantity, userId, divisionCode
    } = orderInfo
    let submitref = data.global.secretValue
    // data = data.data
    data = {
        params: JSON.stringify({
            data: JSON.stringify(data.data),
            endpoint: JSON.stringify(data.endpoint),
            hierarchy: JSON.stringify(data.hierarchy),
            linkage: JSON.stringify(data.linkage)
        })
    }

    let sign = getSign(getToken(), time, appKey, JSON.stringify(data))

    let url = `https://h5api.m.tmall.com/h5/mtop.trade.order.create.h5/4.0/?jsv=2.5.7&appKey=${appKey}&t=${time}&sign=${sign}&v=4.0&post=1&type=originaljson&timeout=15000&dataType=json&isSec=1&ecode=1&api=mtop.trade.order.create.h5&ttid=%23b%23ip%23%23_h5&H5Request=true&submitref=${submitref}`

    return request({//fa75fc79dc933716c554457764a5b7e8
        url,
        method: "POST",
        data: `data=${encodeURIComponent(JSON.stringify(data))}`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&itemId=${itemId}&exParams=%7B%22etm%22%3A%22%22%7D&skuId=${skuId}&quantity=${quantity}&divisionCode=${divisionCode}&userId=${userId}&buyNow=true&_input_charset=utf-8&areaId=${divisionCode}&x-itemid=${itemId}&x-uid=${userId}`,
            'Host': 'h5api.m.tmall.com'
        }
    })
}

async function submitOrder(data, orderInfo) {
    let res = await _trySubmitOrder(data, orderInfo)
    return res
}

export {
    bulidOrder,
    submitOrder,
    request,
    appKey
}


