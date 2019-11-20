<template>
<div id="main">
    <div class="account-box clear">
        <div class="account-asider">
            <img src="http://static.smartisanos.cn/account/asset/img/default-user-avatar.png">
            <div class="inner">
                <ul>
                    <router-link exact :to="{name:'account'}" tag="li" activeClass="on">我的订单</router-link>
                    <router-link :to="{name:'address'}" tag="li" activeClass="on">收货地址</router-link>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    
}

</script>
<style scoped>
.account-box{width: 1220px;min-height: 600px;padding: 0 0 25px;margin: 0 auto;position: relative;}

.account-asider{width: 210px;border: 1px solid #D1D1D1;border-color: rgba(0,0,0,.14);box-sizing: border-box;padding-top: 20px;border-radius: 10px;text-align: center;overflow: hidden;background: #fff;position: absolute;left: 0;top: 0;}

.account-asider img{display: inline-block}

.account-box .inner{padding-top: 15px}

.account-box .inner li{height: 48px;border-top: 1px solid #EBEBEB;line-height: 48px;text-align: center;cursor: pointer;}

.account-box .inner li:first-child{border-top: none}

.account-box .inner li.on{height: 50px;background-color: #98AFEE;line-height: 50px;color: #FFF;}

.account-box .inner li:hover{background-color: #98AFEE;color: #fff}
</style>