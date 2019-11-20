<template>
<div class="account-order">
    <div class="header">
        <h2>我的订单</h2>
        <div class="sort-state fr">
            <span>全部状态<i class="arrow"></i></span>
        </div>
        <div class="sort-time fr">
            <span>最近三个月<i class="arrow"></i></span>
        </div>
    </div>
    <div class="order-list-wrap">
        <div class="order-title">
            <span class="date fl">{{orderData.nowDate}}</span>
            <span class="order-id fl">
                订单号：
                <a href="javascript:;">{{orderData.orderId}}</a>
            </span>
            <span class="order-detail fr">
                <router-link :to="{name:'payment',query:{orderId:orderData.orderId}}">查看详情></router-link>
            </span>
            <span class="order-total fr">应付总额</span>
            <span class="num fr">数量</span>
            <span class="price fr">单价</span>
        </div>
        <div class="order-list">
            <div class="list-item clear" v-for="item in orderData.cartData" :key="item.sku_id">
                <div class="item-img">
                    <a href="javascript:;"><img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"></a>
                </div>
                <div class="item-title">
                    <div class="center-wrap">
                        <a href="javascript:;" :title="item.title+'（'+item.spec_json.show_name+'）'">{{item.title}}（{{item.spec_json.show_name}}）</a>
                    </div>
                </div>
                <div class="num fr">{{item.count}}</div>
                <div class="price fr">¥ {{item.price}}.00</div>
            </div>
        </div>
        <div class="order-payment">
            <div class="total">¥ {{orderData.cartPrice+orderData.freight}}.00</div>
            <div class="state">
                <router-link :to="{name:'payment',query:{orderId:orderData.orderId}}" v-if="!orderData.isPay">现在付款</router-link>
                <span v-else>支付完成</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            orderData:this.$store.state.orderData[0]
        }
    }
}

</script>

<style scoped>
.account-order{overflow: hidden;border: 1px solid #D1D1D1;border-color: rgba(0,0,0,.14);border-radius: 8px;margin-left: 230px;background: #fff}

.account-order .header{height: 60px;padding: 0 10px 0 28px;background: linear-gradient(#FFF,#F5F5F5);border-bottom: 1px solid #DCDCDC;line-height: 60px}

.account-order .header h2{float: left;color: #626262;font-size: 18px}

.account-order .header div{margin: 10px 0 0 10px;height: 36px;background: linear-gradient(#FFF,#F5F5F5);border: 1px solid #DBDDE2;border-radius: 4px;line-height: 36px;cursor: pointer;}

.account-order .header div span{display: block;padding: 0 13px 0 16px;text-align: left;color: #666;}

.account-order .sort-state{width: 112px}

.account-order .sort-time{width: 118px}

.account-order .header div span i{float: right;width: 10px;height: 7px;margin: 16px 0 0 6px;background: url(../../assets/img/btn-icon-new.png) -15px -571px no-repeat;}

.order-title{height: 38px;padding: 0 24px;background: #EEE;border-bottom: 1px solid #DBDBDB;line-height: 38px;font-size: 12px;color: #666;}

.order-title .date{width: 108px;padding-left: 6px;}

.order-title .order-id a{color: #6989E0}

.order-title .order-detail{width: 82px;padding-left: 24px;text-align: center;}

.order-title .order-detail a{color: #6989E0}

.order-title .order-total{width: 102px;padding-right: 18px;border-left: 1px solid #DBDBDB;text-align: right;}

.order-title .num{width: 70px;text-align: center}

.order-title .price{width: 85px;padding-right: 27px;text-align: right;}

.order-list{float: left;width: 737px;border-right: 1px solid #EBEBEB;}

.order-list .list-item{position: relative;padding: 15px 0 15px 111px;border-top: 1px solid #EFEFEF;}

.order-list .list-item:first-child{border-top: none}

.order-list .list-item .item-img{position: absolute;left: 30px;top: 15px;width: 78px;height: 78px;border: 1px solid #EBEBEB;border-radius: 3px;}

.order-list .list-item .item-img img{width: 78px;height: 78px;}

.order-list .list-item .item-title{float: left;height: 50px;padding: 15px 0;margin-left: 29px;}

.order-list .list-item .item-title .center-wrap{width: 220px;height: 50px;line-height: 50px;   text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}

.order-list .list-item .num{line-height: 80px;text-align: center;width: 70px}

.order-list .list-item .price{width: 85px;padding-right: 27px;text-align: right;line-height: 80px}

.order-payment{float: right;display: table;height: 110px;}

.order-payment .total{display: table-cell;padding-right: 18px;line-height: 14px;text-align: right;vertical-align: middle;}

.order-payment .state{display: table-cell;width: 80px;padding: 0 24px;text-align: center;vertical-align: middle;}

.order-payment .state a{display: inline-block;height: 30px;padding: 0 13px;border-radius: 4px;line-height: 30px;font-size: 12px;background: linear-gradient(#7EA3F5,#5A82F0);color: #fff}
</style>