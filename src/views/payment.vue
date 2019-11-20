<template>
<div id="main">
    <div class="payment-box">
        <div class="payment-order">
            <div class="header">支付订单</div>
            <div class="order-info">
                <h3>提交订单成功</h3>
                <p class="detail">请在 <span>24 小时内</span>完成支付，超时订单将自动取消。</p>
                <p class="detail">我们将在您完成支付后的 72 小时内发货</p>
            </div>
            <div class="payment-to clear">
                <a href="javascript:;" class="payment-btn" @click="payment" v-if="!orderInfo.isPay">现在支付</a>
                <span v-else class="is-pay">支付完成</span>
                <span class="price">应付金额：<em>¥ {{orderInfo.cartPrice+orderInfo.freight}}.00</em></span>
            </div>
        </div>
        <div class="confirm-info">
            <h3 class="title">订单编号</h3>
            <p class="info-detail">{{orderInfo.orderId}}</p>
        </div>
        <div class="confirm-info">
            <h3 class="title">收货信息</h3>
            <p class="info-detail">姓名：{{orderInfo.receive.name}}</p>
            <p class="info-detail">联系电话：{{orderInfo.receive.phone}}</p>
            <p class="info-detail">详细地址：{{orderInfo.receive.province}} {{orderInfo.receive.city}} {{orderInfo.receive.county}}</p>
        </div>
        <div class="confirm-info">
            <h3 class="title">发票信息</h3>
            <p class="info-detail">发票类型：电子发票</p>
            <p class="info-detail">发票抬头：{{orderInfo.billName}}</p>
            <p class="info-detail">发票内容：购买商品明细</p>
        </div>
        <div class="confirm-info-title">
            <span class="name">商品信息</span>
            <span class="subtotal fr">小计</span>
            <span class="num fr">数量</span>
            <span class="price fr">单价</span>
        </div>
        <div class="confrim-info-list">
            <div class="info-item" v-for="item in orderInfo.cartData" :key="item.sku_id">
                <div class="title fl">
                    <a href="#" :title="item.title+'（'+item.spec_json.show_name+'）'">{{item.title}}（{{item.spec_json.show_name}}）</a>
                </div>
                <div class="subtotal fr">¥ {{item.count*item.price}}.00</div>
                <div class="num fr">{{item.count}}</div>
                <div class="price fr">¥ {{item.price}}.00</div>
            </div>
        </div>
        <div class="order-count-box">
            <p>商品总价： <span>¥ {{orderInfo.cartPrice+orderInfo.freight}}.00</span></p>
            <p>运费： <span>+ ¥ {{orderInfo.freight}}.00</span></p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            orderInfo:this.$store.state.orderData[0]
        }
    },
    methods:{
        payment(){
            alert('成功付款：'+(this.orderInfo.cartPrice+this.orderInfo.freight)+'元')
            this.$router.push({name:'account'})
            this.orderInfo.isPay=true
        }
    }
}
</script>

<style scoped>
.payment-box{width: 1220px;padding-top: 25px;margin: 0 auto;padding-bottom: 25px}

.payment-order{margin-bottom: 60px;overflow: hidden;border: 1px solid #D1D1D1;border-color: rgba(0,0,0,.14);border-radius: 8px;background: #fff}

.payment-order .header{height: 60px;padding: 0 10px 0 28px;background: linear-gradient(#FFF,#F5F5F5);border-bottom: 1px solid #DCDCDC;border-radius: 10px 10px 0 0;box-shadow: 0 1px 7px rgba(0,0,0,.06);line-height: 60px;color: #646464;font-size: 18px;color: #626262;}

.payment-order .order-info{padding: 60px 0 55px;color: #333;}

.payment-order .order-info h3{padding-bottom: 14px;line-height: 36px;text-align: center;font-size: 36px;color: #212121;}

.payment-order .order-info .detail{text-align: center;line-height: 24px;font-size: 14px;color: #999}

.payment-order .order-info .detail span{font-weight: bold;color: #DE4037;}

.payment-order .payment-to{padding: 10px 10px 10px 0;background: #f9f9f9;border-top: 1px solid #e5e5e5;}

.payment-order .payment-to .payment-btn{float: right;width: 120px;height: 40px;line-height: 40px;margin-left: 10px;font-size: 16px;color: #fff;border-radius: 6px;background: linear-gradient(#6F97E5,#527ED9);text-align: center;border: 1px solid #5c81e3;transition: .3s}

.payment-order .payment-to .payment-btn:hover{box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48,77,147,.4);}

.payment-order .payment-to .price{float: right;line-height: 24px;padding: 6px 20px 6px 0;font-size: 14px;}

.payment-order .payment-to .price em{margin-left: 5px;font-size: 24px;color: #D44D44;vertical-align: middle}

.confirm-info{padding: 0 30px 25px;border-top: 1px solid #d5d5d5;}

.confirm-info .title{height: 14px;padding: 30px 0 17px;line-height: 14px;font-weight: bolder;color: #333;}

.confirm-info .info-detail{line-height: 24px;color: #666;}

.confirm-info-title{padding: 3px 0 0 30px;border-top: 1px solid #D5D5D5;line-height: 54px;font-weight: bolder;color: #000;height: 54px;}

.confirm-info-title .name{float: left;}

.confirm-info-title .subtotal, .confirm-info-title .num, .confirm-info-title .price{width: 175px;padding-right: 29px;text-align: right;}

.confrim-info-list{padding-left: 30px;border-top: 1px solid #D5D5D5;}

.confrim-info-list .info-item{height: 80px;border-top: 1px solid #D5D5D5;line-height: 80px}

.confrim-info-list .info-item:first-child{border-top: none}

.confrim-info-list .info-item .title a{color: #333}

.confrim-info-list .info-item .subtotal, .confrim-info-list .info-item .price{width: 175px;padding-right: 29px;text-align: right;}

.confrim-info-list .info-item .num{width: 28px;padding-left: 147px;text-align: center;padding-right: 29px}

.order-count-box{padding: 22px 30px 53px;border-top: 1px solid #D5D5D5;text-align: right;font-size: 12px;}

.order-count-box p{line-height: 24px}

.order-count-box p:first-child{line-height: 32px;text-align: right;font-size: 14px;font-weight: bolder;}

.is-pay{float: right;line-height: 36px;padding-right: 10px;padding-left: 50px}
</style>