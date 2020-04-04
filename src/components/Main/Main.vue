<template>
  <div class="mainBox">
    <div class="options">
      <div>cookie</div>proxy
      <input v-model="proxyFlag" type="checkbox" />
      是否拨号
      <input v-model="adslFlag" type="checkbox" />
      代理IP:{{proxy.host}}:{{proxy.port}}
      <button @click="getProxy">获取代理ip</button>

      <button @click="testIP">测试ip</button>
      <button @click="saveCookie">保存cookies</button>
      <button @click="readCookie">读取cookies</button>
      <input type="text" v-model="cookie" />
      <button @click="setCookie">设置cookie</button>
      <button @click="loginTaobao">登录淘宝</button>
      <!-- <button @click="loadGood()">加载商品</button> -->
      <button @click="getSystemTime">获取淘宝时间差</button>
      <button @click="startTimer">开始计时</button>
      <button @click="stopTimer">停止计时</button>
      <div>天</div>
      <input type="number" v-model="day" />
      <div>时</div>
      <input type="number" v-model="hours" />
      <div>分</div>
      <input type="number" v-model="minutes" />
      <div>秒</div>
      <input type="number" v-model="seconds" />
      <button @click="setTargetTime">设置目标时间</button>
      <div>系统时间-本地时间</div>
      <div>{{systemTimeFastThenLocal}}</div>
      <div>本地时间</div>
      <div>{{localTime}}</div>
      <div>{{new Date(localTime)}}</div>
      <div>目标时间</div>
      <div>{{targetTime}}</div>
      <div>{{new Date(targetTime)}}</div>
    </div>

    <div class="goodInfo">
      <div>商品地址</div>
      <input type="text" v-model="url" />
      <button @click="parseUrl()">解析地址</button>

      <div class="skuBox">
        <div v-for="(item, key) in skuProps" :key="key">
          pid:{{item.pid}} {{item.name}}
          <select
            @change="selectSku(item, 'select' + key, key)"
            :ref="'select' + key"
          >
            <option value="default">请选择</option>
            <option v-for="(i, k) in item.values" :key="k" :value="i.vid">{{i.name}}</option>
          </select>
          <!-- <div v-for="(i, k) in item.values" :key="k">{{i.name}}</div> -->
        </div>

        <div>{{currentSkuId}}</div>
        <button @click="bulidOrder">创建订单</button>
        <button @click="submitOrder">提交订单</button>
        <div>
          <div class="options">
            <div>
              <div>itemId</div>
              <input v-model="orderData.itemId" type="text" />
            </div>
            <div>
              <div>skuId</div>
              <input v-model="orderData.skuId" type="text" />
            </div>
            <div>
              <div>quantity</div>
              <input v-model="orderData.quantity" type="text" />
            </div>
            <div>
              <div>userId</div>
              <input v-model="orderData.userId" type="text" />
            </div>
            <div>
              <div>divisionCode</div>
              <input v-model="orderData.divisionCode" type="text" />
            </div>

            <!-- <button @click="loadGood()">加载商品</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { adslDel } from "./adsl";
import { getSystemTime } from "./time";
import { bulidOrder, submitOrder, setProxy } from "../../utils/request";
import { parseUrl } from "./goodInfo";
import { setCookieById, addCookies } from "../../utils/cookie";
import { loginTaobao, readLoginUsers, saveLoginUsers } from "./login";
import { testIP } from "./testIP";
import { getProxy } from "../../utils/proxy";
export default {
  data() {
    return {
      submitref: "",
      itemId: 557747333645,
      skuId: 3461414993751,
      quantity: 1,
      cookie: "",
      userId: "2968865372",
      divisionCode: "140802",
      url: "https://m.tb.cn/h.VgsmffJ?sm=e8a7ad",
      skus: [],
      skuProps: [],
      proxy: {
        host: "",
        port: ""
      },
      currentSku: [],
      currentSkuStr: "",
      currentSkuId: "",
      proxyFlag: false,
      orderData: {
        itemId: "",
        skuId: 0,
        quantity: 1,
        userId: "",
        divisionCode: ""
      },
      orderInfo: {
        //buildOrder返回的order
      },
      systemTimeFastThenLocal: 0,
      targetTime: 0,
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      localTime: 0,
      timeLast: 0, //为0 提交
      timer: 0,
      timerGetSystem: 0,
      proxychangeFlag: false, //提交前10s换代理
      adslFlag: true
    };
  },
  mounted() {
    this.readCookie();
    this.getSystemTime();
    this.timerGetSystem = setInterval(this.getSystemTime, 18e4);
  },
  watch: {
    adslFlag(newValue) {
      if (newValue) {
        this.proxyFlag = false;
        setProxy(false);
      }
    },
    proxyFlag(newValue, oldValue) {
      console.log(newValue);
      if (this.adslFlag) return false;
      setProxy(newValue);
    },
    currentSku: {
      handler(newValue, oldValue) {
        this.currentSkuStr = newValue.join(";");
        for (let i = 0; i < this.skus.length; ++i) {
          if (this.skus[i].propPath == this.currentSkuStr) {
            this.currentSkuId = this.skus[i].skuId;
            this.orderData = Object.assign(this.orderData, {
              skuId: this.skus[i].skuId
            });
            return;
          }
        }
      },
      deep: true
    }
  },
  methods: {
    getProxy() {
      getProxy().then(res => {
        if (!res.err) {
          console.log(res.proxy);
          this.proxy = res.proxy;
        } else {
          console.log(res);
        }
      });
    },
    testIP() {
      testIP(this.proxy).then(res => {
        console.log(res.data);
      });
    },
    readCookie() {
      readLoginUsers();
    },
    saveCookie() {
      saveLoginUsers();
    },
    loginTaobao() {
      loginTaobao();
    },
    getSystemTime() {
      getSystemTime().then(res => {
        this.systemTimeFastThenLocal = +res.data.data.t - new Date().getTime();
      });
    },
    setTargetTime() {
      let { day, hours, minutes, seconds } = this;

      let date = new Date();
      date.setDate(day);
      date.setHours(hours, minutes, seconds, 0);

      this.targetTime = date.getTime();
    },
    startTimer() {
      this.proxychangeFlag = false;
      this.timer = setInterval(this.loop, 10);
    },
    loop() {
      this.localTime = new Date().getTime();
      this.timeLast =
        this.targetTime - this.systemTimeFastThenLocal - this.localTime;
      if (this.timeLast <= 6e4) {
        if (!this.proxychangeFlag) {
          if (this.adslFlag) {
            adslDel().then(res => {
              this.bulidOrder(); //尝试创建订单
            });
          } else if (this.proxyFlag) {
            this.getProxy();
            this.bulidOrder(); //尝试创建订单
          } else {
            this.bulidOrder(); //尝试创建订单
          }
          this.proxychangeFlag = true;
        }
      }
      if (this.timeLast <= 0) {
        let time = new Date().getTime();
        this.bulidOrder().then(() => {
          setTimeout(this.submitOrder, 2e2);
        });
        this.stopTimer();
      }
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    test() {
      let currentSku = this.currentSku;
      currentSku[0] = "asd";
      this.currentSku = currentSku.slice();
    },
    selectSku(item, ref, key) {
      let root = this.$refs[ref][0];
      let value = root.value;
      let currentSku = this.currentSku;
      currentSku[key] = item.pid + ":" + value;
      this.currentSku = currentSku.slice();
    },
    setCookie() {
      addCookies(this.cookie);
    },
    parseUrl() {
      parseUrl(this.url).then(ans => {
        console.log(ans);
        this.orderData = Object.assign(this.orderData, {
          itemId: ans.itemId,
          userId: ans.userId,
          divisionCode: ans.divisionCode
        });
        this.orderData = Object.assign(this.orderData, { skuId: 0 });
        this.skus = ans.skus;
        this.skuProps = ans.skuProps;
      });
    },
    bulidOrder() {
      return new Promise(resolve => {
        bulidOrder({
          ...this.orderData,
          proxy: this.proxy
        }).then(res => {
          console.log(res);
          this.submitref = res.data.global.secretValue;
          this.orderInfo = res.data;
          resolve(res.data);
        });
      });
    },
    submitOrder(time = 0) {
      if (time > 3) {
        return;
      }
      submitOrder(this.orderInfo, {
        ...this.orderData,
        proxy: this.proxy
      }).then(res => {
        console.log(res);
        if (
          res.data &&
          res.data.ret.length > 1 &&
          /哎呦喂/.text(res.data.ret[0])
        ) {
          setTimeout(() => this.submitOrder(time + 1), 2e2);
        }
      });
    }
  }
};
</script>

<style scoped>
.mainBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
label {
  width: 100px;
}
.options {
  border: 1px solid #ccc;
  overflow: hidden;
  width: 200px;
}
.goodInfo {
  border: 1px solid #ccc;
  margin-left: 20px;
  flex-grow: 1;
  height: 500px;
}
</style>