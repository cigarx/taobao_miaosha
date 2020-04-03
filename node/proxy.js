
const axios = require('axios')

let proxyList = []

let currentProxyIndex = 0

const PROXYLENG = 3

let currRequestNum = 2000

const MAX_PROXY_REQUEST_NUM = 50

const getProxy = () => {
    return new Promise(resolve => {
        let proxy = proxyList[currentProxyIndex] ? Object.assign(proxyList[currentProxyIndex]) : null

        currRequestNum++
        if (currRequestNum > MAX_PROXY_REQUEST_NUM) {
            currRequestNum = 0
            currentProxyIndex++
            if (currentProxyIndex > proxyList.length) {
                axios.request({
                    url: `http://api.xdaili.cn/xdaili-api//greatRecharge/getGreatIp?spiderId=142e63b2c3924466853b5d35b8eb7b97&orderno=YZ20195272809qS8fyz&returnType=2&count=${PROXYLENG}`,
                    method: "GET"
                }).then(res => {
                    let { data } = res
                    if (data.ERRORCODE != '0') {
                        console.log(data)
                    } else {
                        currentProxyIndex = 0
                        proxyList = data.RESULT
                        console.log(proxyList)
                    }
                })
            }
        }
        console.log(proxy)
        if (!proxy || !proxy.ip) proxy = null
        resolve(proxy)
    })
}



module.exports = {
    getProxy
}