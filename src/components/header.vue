<template>
<div id="header">
    <div class="header-nav">
        <div class="wrap">
            <h1 class="logo"><a href="#"></a></h1>
            <ul class="nav-aside fr">
                <li class="nav-user">
                    <a href="#" class="ico"></a>
                    <div class="nav-user-box">
                        <div class="nav-user-list">
                            <div class="person">
                                <img src="../assets/img/user-avatar.png">
                                <p>+86 138****9453</p>
                            </div>
                            <ul>
                                <li>
                                    <router-link :to="{name:'account'}">我的订单</router-link>
                                </li>
                                <li>
                                    <a href="javascript:;">售后服务</a>
                                </li>
                                <li>
                                    <a href="javascript:;">我的优惠</a>
                                </li>
                                <li>
                                    <a href="javascript:;">账户资料</a>
                                </li>
                                <li>
                                    <router-link :to="{name:'address'}">收货地址</router-link>
                                </li>
                                <li>
                                    <a href="javascript:;">退出</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <shop-cart></shop-cart>
            </ul>
            <ul class="nav-list">
                <li><a href="#">在线商城</a></li>
                <li><a href="#">坚果 Pro</a></li>
                <li><a href="#">Smartisan M1 / M1L</a></li>
                <li><a href="#">Smartisan OS</a></li>
                <li><a href="#">欢喜云</a></li>
                <li><a href="#">应用下载</a></li>
                <li><a href="#">官方论坛</a></li>
            </ul>
        </div>
    </div>
    <div class="nav-links">
        <div class="wrap">
            <ul class="clear">
                <li>
                    <a href="#">首页</a>
                </li>
                <li>
                    <a href="#">手机</a>
                </li>
                <li>
                    <a href="#">“足迹系列”手感膜</a>
                </li>
                <li class="active">
                    <router-link to="/">官方配件</router-link>
                </li>
                <li>
                    <a href="#">周边产品</a>
                </li>
                <li>
                    <a href="#">第三方产品</a>
                </li>
                <li>
                    <a href="#">全部商品</a>
                </li>
                <li>
                    <a href="#">服务</a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import shopCart from '@/components/shopCart'
export default {
    components:{
        shopCart
    }
}
</script>


