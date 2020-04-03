import { request } from './request'
let proxy = {}
const getProxy = () => {
    return new Promise(resolve => {
        request({
            url: "http://api.xdaili.cn/xdaili-api//greatRecharge/getGreatIp?spiderId=142e63b2c3924466853b5d35b8eb7b97&orderno=YZ20195272809qS8fyz&returnType=2&count=1",
            method: "GET"
        }).then(res => {
            let { data } = res
            if (data.ERRORCODE != '0') {
                console.log(data)
                resolve({ err: true, msg: '获取代理失败', data })
            } else {
                let proxyT = data.RESULT[0]
                if (proxyT && proxyT.ip) {
                    proxy = {
                        host: proxyT.ip,
                        port: +proxyT.port
                    }
                    resolve({
                        err: false,
                        proxy: Object.assign(proxy)
                    })
                } else {
                    resolve({ err: true, msg: '获取代理失败', data })
                }
            }
        })
    })
}
const getGlobalProxy = () => proxy


export {
    getProxy,
    getGlobalProxy
}