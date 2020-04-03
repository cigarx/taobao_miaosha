import { request, appKey } from '../../utils/request'
import { getUnicode } from '../../utils/unicode'
import { getSign } from '../../utils/enc'
import { getToken, getCookiesById, getCookieValueByName } from '../../utils/cookie'

async function parseUrl(url) {
    try {
        let sm, ut_sk, id, sourceType, price, origin_price, suid, un, spm, sp_tk, short_name, share_crt_v


        sm = url.split('sm=')[1]
        console.log(sm)
        let res = await request({
            url,
            method: "GET"
        })
        let data = res.data
        let execs = /var url = '(.*?)';/.exec(data)
        if (execs.length < 2) {
            return {
                err: true,
                msg: "地址解析错误"
            }
        }
        //https://item.taobao.com/item.htm?ut_sk=1.XaLUkbogAOYDAMtu6vVkZ8gE_21380790_1585759296038.TaoPassword-QQ.1&id=557747333645&sourceType=item&price=86-89&origin_price=288&suid=F21B8DC0-4CFD-4B4D-9D3D-B466802B2AE6&un=d2013dc27ccfce3e7415b581aeef1d0d&share_crt_v=1&spm=a2159r.13376460.0.0&sp_tk=4oKkSHl5eDE4RHNlUEnigqQ=&cpp=1&shareurl=true&short_name=h.VTnQGbP

        url = execs[1]

        console.log(url)

        let exParams = {
            ut_sk,
            id,
            sourceType,
            price,
            origin_price,
            suid,
            un,
            share_crt_v,
            spm,
            sp_tk,
            cpp: 1,
            shareurl: true,
            short_name,
            sm
        }
        let paras = url.split('?')[1].split('&').map(i => i.split('='))
        for (let i = 0; i < paras.length; ++i) {
            exParams[paras[i][0]] = paras[i][1]
        }
        if (!exParams.id && /i(\d*)./.exec(url).length > 1) {
            exParams.id = /i(\d*)./.exec(url)[1]
        }

        exParams.app = "macos_safari"

        data = {
            ...exParams,
            itemNumId: exParams.id,
            itemId: exParams.id,
            exParams: JSON.stringify(exParams),
            "detail_v": "8.0.0",
            "utdid": "1"
        }

        // console.log(exParams, JSON.stringify(data))

        console.log(data)


        let ans = {
            itemId: data.id,
            skuId: "",
            quantity: 1,
            userId: getCookieValueByName('unb', getCookiesById()),
        }

        res = await getData({
            data
        })
        data = res.data.slice(0, res.data.length - 1)

        let datas = data.split(/mtopjsonp(\d+)\(/)
        data = datas[2]
        data = JSON.parse(data)
        if (/SUCCESS/g.test(data.ret)) {

            data = data.data
            let apiStack = JSON.parse(data.apiStack[0].value)
            console.log(apiStack)
            // ans.systemTime = apiStack.otherInfo.systemTime
            let divisionCode = apiStack.trade.buyParam.areaId
            ans.divisionCode = divisionCode
            ans.skus = data.skuBase.skus
            ans.skuProps = data.skuBase.props
            return ans


        } else {
            throw ('json请求失败' + data.ret)
        }



        return
    } catch (e) {
        console.log(e)
        return {
            err: true,
            msg: "地址解析错误"
        }
    }
    res = await request({
        url,
        method: "GET",
        headers: {
            'Referer': 'https://m.tb.cn/h.VTnQGbP?sm=35d6d1'

        },
        responseType: 'arraybuffer'
    })

    data = getUnicode(res.data)

    execs = /<title>(.*?)<title>/.exec(data)
    let title, img

    if (execs.length > 1) {
        title = execs[1]
    }

    return {
        title,
        img
    }

}


const getData = (obj) => {
    let { data } = obj
    //2017
    data = JSON.stringify({ itemNumId: data.itemNumId })
    let time = new Date().getTime()
    let sign = getSign(getToken(), time, appKey, data)
    console.log(time, sign, `&appKey=${appKey}`, data)
    //2017
    return request({
        url: `https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.4.8&` +
            `appKey=${appKey}&t=${time}&sign=${sign}&api=mtop.taobao.detail.getdetail&v=6.0&dataType=jsonp&ttid=2017%40taobao_h5_6.6.0&AntiCreep=true&type=jsonp&callback=mtopjsonp1&` +
            `data=${encodeURIComponent(data)}`,
        method: "GET"
    })
    //2018
    // return request({
    //     url: `https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.5.7&appKey=${appKey}&t=1585811486367&sign=1cd43d0fa24b277b0385a5e72f11046e&api=mtop.taobao.detail.getdetail&v=6.0&isSec=0&ecode=0&AntiFlood=true&AntiCreep=true&H5Request=true&ttid=2018%40taobao_h5_9.9.9&type=jsonp&dataType=jsonp&callback=mtopjsonp1&data=${data}` +
    //         `appKey=${appKey}&t=${time}&sign=${sign}&api=mtop.taobao.detail.getdetail&v=6.0&dataType=jsonp&ttid=2017%40taobao_h5_6.6.0&AntiCreep=true&type=jsonp&callback=mtopjsonp1&` +
    //         `data=${encodeURIComponent(data)}`,
    //     method: "GET"
    // })
}


export {
    parseUrl
}

