<template>
<div id="main">
    <div class="checkout-content">
        <div class="checkout-address">
            <div class="title">收货信息</div>
            <div class="address-panel">
                <ul class="items clear">
                    <li :class="{select:itemIndex==index}" v-for="(item,index) in receiveInfo" :key="index" @click="choose(index)">
                        <div class="address-wrap">
                            <p class="name">{{item.name}}</p>
                            <p class="phone">{{item.phone}}</p>
                            <p class="detail">
                                {{item.province}} {{item.city}} {{item.county}}
                                 <br/>
                                {{item.add}} 
                            </p>
                        </div>
                        <span class="address-selected" v-if="itemIndex==index">√</span>
                    </li>
                    <li class="add-address" @click="showHanler">
                        <p>使用新地址</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bill-box">
            <div class="title">发票信息</div>
            <div class="bill-content">
                <p class="bill-detail">发票类型：电子发票</p>
                <div class="bill-detail clear">
                    <p>发票抬头：</p>
                    <div class="radio-box">
                        <label>
                            <input type="radio" class="hide">
                            <span class="blue-radio" :class="{'blue-radio-on':billInfo.personal}" @click="radioChoose(true)">
                                <span></span>
                            </span>
                            个人
                        </label>
                        <label>
                            <input type="radio" class="hide">
                            <span class="blue-radio" :class="{'blue-radio-on':!billInfo.personal}" @click="radioChoose(false)">
                                <span></span>
                            </span>
                            单位
                        </label>
                    </div>
                    <input type="text" class="bill-text" placeholder="请填写公司发票抬头" v-if="!billInfo.personal" v-model="billInfo.name">
                </div>
                <p class="bill-detail">发票内容：购买商品明细</p>
                <p class="bill-info"> 电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据。电子发票打印后可以用于企业报销。 </p>
            </div>
        </div>
        <div class="detail-box">
            <div class="title">购物清单</div>
            <div class="list-wrap">
                <div class="detail-list-title">
                    <span class="name">商品名称</span>
                    <span class="subtotal">小计</span>
                    <span class="num">数量</span>
                    <span class="price">单价</span>
                </div>
                <div class="detail-list">
                    <div class="item-wrap" v-for="item in checkedData" :key="item.sku_id">
                        <a href="#" class="img"><img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"></a>
                        <div class="name">
                            <div class="cell-name">
                                <a href="#" :title="item.title+'（'+item.spec_json.show_name+'）'">{{item.title}}（{{item.spec_json.show_name}}）</a>
                            </div>
                        </div>
                        <div class="subtotal">
                            <div class="subtotal-cell">¥ {{item.price*item.count}}.00</div>
                        </div>
                        <div class="num">{{item.count}}</div>
                        <div class="price">¥ {{item.price}}.00</div>
                    </div>
                </div>
            </div>
            <div class="detail-total">
                <p>
                    商品总价：
                    <span>¥ {{checkedPrice}}.00</span>
                </p>
                <p>
                    运费： 
                    <span>+ ¥ {{freight}}.00</span>
                </p>
                <p>
                    现金券：
                    <span>- 0</span>
                </p>
            </div>
            <div class="payment-box clear">
                <a class="payment-btn" href="javascript:;" @click="submitOrder">提交订单</a>
                <p class="price">
                    应付金额：
                    <span>¥ {{checkedPrice+freight}}.00</span>
                </p>
            </div>
        </div>
    </div>
    <add-address v-if="isShow" @close="closeHandler" :receive="receiveInfo"></add-address>
</div>
</template>

<script>
import addAddress from '@/components/add-address'
export default {
    data(){
        return {
            checkedPrice:this.$store.getters.checkedPrice,
            checkedData:this.$store.getters.checkedCartData,
            itemIndex:0,
            isShow:false,
            orderData:[],
            billInfo:{
                personal:true,
                name:''
            },
            receiveInfo : [{
                "name": "王某某",
                "phone": "13811111111",
                "areaCode": "010",
                "landLine": "64627856",
                "provinceId": 110000,
                "province": "北京市",
                "cityId": 110100,
                "city": "市辖区",
                "countyId": 110106,
                "county": "海淀区",
                "add": "上地十街辉煌国际西6号楼319室",
                "default": true
                },{
                "name": "李某某",
                "phone": "13811111111",
                "areaCode": "010",
                "landLine": "64627856",
                "provinceId": 110000,
                "province": "北京市",
                "cityId": 110100,
                "city": "市辖区",
                "countyId": 110106,
                "county": "海淀区",
                "add": "上地十街辉煌国际东6号楼350室",
                "default": false
            }]
        }
    },
    computed:{
        freight(){
            var num=8;
            if(this.checkedPrice>100 || this.checkedPrice==0){
                num=0;
            }
            return num
        }
    },
    methods:{
        choose(index){
            this.itemIndex=index;
        },
        showHanler(){
            this.isShow=true;
        },
        closeHandler(){
            this.isShow=false;
            this.receiveInfo.forEach((item,index)=>{
                if(item.default){
                    this.itemIndex=index
                }
            })
        },
        radioChoose(b){
            this.billInfo.personal=b;
        },
        submitOrder(){
            if(!this.billInfo.personal && !this.billInfo.name)return
            if(this.billInfo.personal){
                this.billInfo.name='个人'
            }
            var receive=this.receiveInfo[this.itemIndex]
            var iDate=new Date();
            var year=iDate.getFullYear();
            var month=iDate.getMonth()+1;
            var day=iDate.getDate();

            if(month >= 1 && month <=9){
                month='0'+month
            }
            if(day >= 1 && day <=9){
                day='0'+day
            }
            var data={
                orderId:iDate.getTime(),
                cartData:this.checkedData,
                cartPrice:this.checkedPrice,
                freight:this.freight,
                billName:this.billInfo.name,
                nowDate:year + '-' + month + '-' + day,
                receive,
                isPay:false
            }
            this.$store.commit('submitOrderData',data);
            this.$router.push({name:'payment',query:{orderId:data.orderId}})
        }
    },
    components:{
        addAddress
    }
}
</script>
<style scoped>
.checkout-content{width: 1220px;margin: 0 auto;padding: 40px 0 25px 0}

.checkout-address{margin-bottom: 30px;background: #fff;border: 1px solid rgba(0,0,0,.14);border-radius: 8px;box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);overflow: hidden;}

.checkout-address .title{padding-left: 28px;height: 60px;line-height: 60px;border-bottom: 1px solid #d4d4d4;box-shadow: rgba(0,0,0,.06) 0 1px 7px;background: linear-gradient(#FFF,#F5F5F5);font-size: 18px;color:#646464}

.address-panel .items{padding: 30px 13px 0}

.address-panel .items li{float: left;width: 276px;height: 158px;margin: 0 0 30px 16px;    border: 1px solid #E5E5E5;border-radius: 3px;color: #626262;cursor: pointer;background: #FAFAFA;position: relative;}

.address-panel .items li:hover{background: #F2F2F2;}

.address-panel .items li.select{background: #FFF;border-color: #6A8FE5;}

.address-panel .items li.select:hover{background: #F2F2F2;}

.address-panel .address-wrap{padding: 19px 14px 0 19px}

.address-panel .address-wrap .name{height: 16px;line-height: 16px;font-size: 16px;color: #666;}

.address-panel .address-wrap .phone{height: 14px;padding-top: 17px;line-height: 14px;color: #999;}

.address-panel .address-wrap .detail{padding-top: 6px;line-height: 24px;color: #999;}

.address-panel .address-selected{display: block;position: absolute;right: 17px;top: 10px;font-size: 24px;color: #6A8FE5;}

.add-address p{height: 14px;padding-top: 85px;line-height: 14px;text-align: center;color: #999;}

.add-address p::before{content: '+';display: block;position: absolute;left: 50%;top: 54px;height: 24px;margin-left: -8px;line-height: 24px;text-align: center;font-size: 24px;color: #626262;}

.bill-box, .detail-box{margin-bottom: 30px;background: #fff;border: 1px solid rgba(0,0,0,.14);border-radius: 8px;overflow: hidden;}

.bill-box .title, .detail-box .title{height: 60px;padding-left: 28px;background: linear-gradient(#FFF,#F5F5F5);border-bottom: 1px solid #DCDCDC;box-shadow: 0 1px 7px rgba(0,0,0,.06);line-height: 60px;color: #646464;font-size: 18px;}

.bill-content{padding: 22px 29px 29px 28px}

.bill-content .bill-detail{height: 36px;line-height: 36px;color: #666}

.bill-detail p, .radio-box, .bill-text{float: left;}

.radio-box{margin-left: -5px}

.radio-box .blue-radio{width: 10px;height: 10px;padding: 4px;background: linear-gradient(#F5F6F6,#FDFDFD);border-radius: 10px;box-shadow: 0 2px 4px rgba(0,0,0,.05) inset;cursor: pointer;display: inline-block;border: 1px solid #E6E6E6;margin: 0 3px 0 6px;position: relative;top: 4px}

.radio-box .blue-radio.blue-radio-on span{width: 8px;height: 8px;background: #6C94F3;border: 1px solid #5D81D9;border-radius: 10px;box-shadow: 0 1px 2px rgba(0,0,0,.2);display: block}

.bill-text{width: 314px;height: 34px;line-height: 34px;box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset;border: 1px solid #CCC;border-radius: 4px;font-size: 14px;padding: 0 13px 0 11px;margin-left: 20px}

.bill-text::placeholder{color: #bebebe}

.bill-info{padding-top: 25px;margin-top: 11px;border-top: 1px solid #E5E5E5;line-height: 12px;text-indent: 10px;font-size: 12px;color: #999;}

.detail-list-title{height: 38px;background: #eee;border-bottom: 1px solid #DBDBDB;line-height: 38px;color: #666;padding-left: 28px;font-size: 12px}

.detail-list-title .name{float: left;}

.detail-list-title .subtotal, .detail-list-title .num, .detail-list-title .price{float: right;padding-right: 29px;width: 130px;text-align: right}

.detail-list .item-wrap{height: 110px;padding-left: 29px;color: #666;border-top:1px solid #EBEBEB}

.detail-list .item-wrap:first-child{border-top: none}

.detail-list .item-wrap .img{width: 78px;height: 78px;border-radius: 4px;margin-top: 15px;border: 1px solid #EBEBEB;float: left;}

.detail-list .item-wrap .img img{width: 78px;height: 78px;border-radius: 4px}

.detail-list .item-wrap .name{float: left;width: 420px;height: 100%;margin-left: 30px;line-height: 24px;display: table}

.detail-list .item-wrap .name .cell-name{display: table-cell;vertical-align: middle}

.detail-list .item-wrap .subtotal{float: right;padding-right: 29px;display: table;width: 129px;
height: 100%;text-align: right;color: #333}

.detail-list .item-wrap .subtotal-cell{display: table-cell;vertical-align: middle}

.detail-list .item-wrap .num{width: 64px;height:100%;padding: 0 9px 0 90px;text-align: center;float: right;line-height: 110px}

.detail-list .item-wrap .price{padding-right: 29px;line-height: 110px;text-align: right;color: #333;float: right}

.detail-total{padding: 21px 30px;border-top: 1px solid #EBEBEB;line-height: 30px;text-align: right;}

.detail-total span{width: 157px;float: right}

.payment-box{padding: 22px 29px 19px 30px;background: linear-gradient(#FCFCFC,#F5F5F5);border-top: 1px solid #DADADA;}

.payment-box .payment-btn{width: 136px;height: 46px;font-size: 16px;float: right;background: linear-gradient(#6F97E5,#527ED9);border-radius: 6px;text-align: center;border: 1px solid #4262AF;text-align: center;line-height: 46px;color: #fff;}

.payment-box .payment-btn:hover{background: linear-gradient(#6383C6,#4262AF);transition: 2s}

.payment-box .price{float: right;height: 50px;line-height: 50px;padding: 0 40px;font-size: 14px}

.payment-box .price span{font-size: 24px;color: #D44D44;position: relative;top: 3px}
</style>