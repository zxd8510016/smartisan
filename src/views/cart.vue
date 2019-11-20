<template>
<div id="main">
    <div class="cart-list-box">
        <div class="cart-header">购物清单</div>
        <div class="cart-content">
            <div class="cart-empty" v-if="count<=0">
                <h3>您的购物车中还没有商品</h3>
                <router-link to="/">现在选购</router-link>
            </div>
            <div class="cart-list" v-else>
                <div class="cart-title">
                    <span class="name">商品信息</span>
                    <span class="operation">操作</span>
                    <span class="subtotal">小计</span>
                    <span class="num">数量</span>
                    <span class="price">单价</span>
                </div>
                <div class="cart-item clear" v-for="item in shopCartData" :key="item.sku_id">
                    <div class="blue-checkbox">
                        <span @click="isCheckedOn(item.sku_id)" :class="{'checked-on':item.checked}"></span>
                    </div>
                    <div class="item-img">
                        <a href="#"><img src="../assets/img/goods/s1.jpg"></a>
                    </div>
                    <div class="item-name">
                        <div class="name">
                            <a href="#">{{item.title}}</a>
                            <p>{{item.spec_json.show_name}}</p>
                        </div>
                    </div>
                    <div class="del-btn">
                        <a href="javascript:;" @click="delCartData(item.sku_id)"></a>
                    </div>
                    <div class="item-subtotal">¥ {{item.price*item.count}}</div>
                    <div class="item-num-btns">
                        <div class="wrap">
                            <span class="down" :class="{disabled:item.count<=1}" @click="removeCount(item.sku_id)"></span>
                            <span class="num">{{item.count}}</span>
                            <span class="up" @click="addCount(item.sku_id)" :class="{disabled:item.count>=item.limit_num}"></span>
                        </div>
                    </div>
                    <div class="item-price">¥ {{item.price}}</div>
                </div>
            </div>
        </div>
        <div class="cart-footer" v-if="count>0">
            <div class="cart-operation">
                <div class="choose-all"><span :class="{'checked-on':allChecked}" @click="checkAll(allChecked)"></span> 全选</div>
                <div class="del" @click="delCheckedData">删除选中的商品</div>
            </div>
            <div class="shopping-go">
                <div class="shopping-box clear">
                    <div class="shopping-num">
                        <h4>已选择 <i>{{checkedCount}}</i> 件商品</h4>
                        <h5>共计 <i>{{count}}</i> 件商品</h5>
                    </div>
                    <div class="shopping-price">
                        <h4>应付总额：¥ <i>{{checkedPrice}}</i></h4>
                        <h5 v-if="checkedPrice>100">应付总额不含运费</h5>
                        <h5 v-else>运费：¥ 8.00</h5>
                    </div>
                </div>
                <router-link href="#" class="shopping-btn" :class="{'disabled-btn':checkedCount<=0}" to="/checkout">现在结算</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            shopCartData:this.$store.state.shopData
        }
    },
    methods:{
        delCartData(id){
            this.$store.commit('delShopData',id)
        },
        addCount(id){
            this.shopCartData.forEach(item=>{
                if(item.sku_id==id){
                    if(item.count>=item.limit_num)return;
                    item.count++;
                }
            })
        },
        removeCount(id){
            this.shopCartData.forEach(item=>{
                if(item.sku_id==id){
                    if(item.count<=1)return;
                    item.count--;
                }
            })
        },
        isCheckedOn(id){
            this.shopCartData.forEach(item=>{
                if(item.sku_id==id){
                    item.checked=!item.checked;
                }
            })
        },
        checkAll(allChecked){
            this.shopCartData.forEach(item=>{
                item.checked=!allChecked;
            })
        },
        delCheckedData(){
            var i=this.shopCartData.length;
            while(i--){
                if(this.shopCartData[i].checked){
                    this.shopCartData.splice(i,1);
                }
            }
        }
    },
    computed:{
        count(){
            return this.$store.getters.totalCount
        },
        allChecked(){
            var allChecked=this.shopCartData.every(item=>{
                return item.checked
            })
            return allChecked
        },
        checkedCount(){
            return this.$store.getters.checkedCount
        },
        checkedPrice(){
            return this.$store.getters.checkedPrice
        }
    }
}

</script>
<style scoped>
.cart-list-box{width: 1220px;margin: 40px auto 0;border-radius: 8px;border: 1px solid #dcdcdc;box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);background: #fff;overflow: hidden;margin-bottom: 60px}

.cart-header{padding-left: 30px;height: 60px;line-height: 60px;background: linear-gradient(#fbfbfb,#ececec);font-size: 18px;color: #333;border-bottom: 1px solid #d4d4d4;box-shadow: rgba(0,0,0,.06) 0 1px 7px;}

.cart-title{padding-left: 30px;height: 38px;line-height: 38px;font-size: 12px;background: #eee;
border-bottom: 1px solid #dbdbdb;}

.cart-title .name{float: left;}

.cart-title .operation, .cart-title .subtotal, .cart-title .num, .cart-title .price{float: right;width: 137px;text-align: center}

.cart-title .subtotal{text-align: right}

.cart-item{height: 140px;margin-left: 74px;position: relative;border-bottom: 1px dashed #eee}

.cart-item:last-child{border-bottom: none}

.cart-item .blue-checkbox{width: 74px;height: 20px;padding: 60px 0 0 31px;position: absolute;left: -74px;top: 0;}

.cart-item .blue-checkbox span{width: 20px;height: 20px;background: url(../assets/img/checkbox-new.png) no-repeat 0 -20px;display: block}

.cart-item .blue-checkbox span.checked-on{background: url(../assets/img/checkbox-new.png) no-repeat 0 0}

.cart-item .item-img{width: 80px;height: 80px;margin-top: 30px;float: left;border: 1px solid #f0f0f0;border-radius: 3px;}

.cart-item .item-img a{display: block}

.cart-item .item-name{float: left;margin-left: 20px;color: #323232;display: table;height: 100%;}

.cart-item .item-name .name{vertical-align: middle;display: table-cell}

.cart-item .item-name .name a{font-size: 16px;color: #333}

.cart-item .item-name .name p{font-size: 12px;color: #999;padding-top: 4px}

.cart-item .del-btn{float: right;padding-top: 58px;width: 137px}

.cart-item .del-btn a{display: block;width: 24px;height: 24px;margin: 0 auto;background: url(../assets/img/delete-btn-icon.jpg)}

.cart-item .del-btn a:hover{background-position: 0 -36px;}

.cart-item .item-subtotal{float: right;width: 137px;text-align: right;line-height: 140px;font-weight: bold}

.item-num-btns{float: right;width: 137px;padding-top: 50px}

.item-num-btns .wrap{width: 112px;height: 40px;padding-top: 4px;margin: 0 auto}

.item-num-btns .wrap .down, .item-num-btns .wrap .up{width: 34px;height: 37px;float: left;cursor: pointer;}

.item-num-btns .wrap .down{background: url(../assets/img/cart-updown.jpg) 0 -60px;}

.item-num-btns .wrap .down.disabled{background-position: 0 -300px;cursor: not-allowed}

.item-num-btns .wrap .num{width: 36px;height: 18px;line-height: 18px;margin-top:7px;text-align: center;float: left;}

.item-num-btns .wrap .up{background: url(../assets/img/cart-updown.jpg)}

.item-num-btns .wrap .up.disabled{ background-position: 0 -240px;cursor: not-allowed}

.item-price{float: right;width: 137px;line-height: 140px;text-align: center;color: #666}

.cart-footer{height: 90px;background: linear-gradient(#fdfdfd,#f9f9f9);border-top: 1px solid #e9e9e9;box-shadow: 0 -3px 8px rgba(0,0,0,.04)}

.cart-operation{padding: 35px 26px;float: left;font-size: 12px}

.cart-operation .choose-all{float: left;height: 20px;line-height: 20px;}

.cart-operation .choose-all span{width: 20px;height: 20px;display: inline-block;background: url(../assets/img/checkbox-new.png) 0 -20px;vertical-align: middle}

.cart-operation .choose-all span.checked-on{background: url(../assets/img/checkbox-new.png) no-repeat 0 0}

.cart-operation .del{float: left;height: 20px;line-height: 20px;cursor: pointer;margin-left: 21px;color: #bbb}

.shopping-go{float: right;padding: 20px 30px}

.shopping-go .shopping-box{padding-top: 1px;margin-right: 10px;float: left;}

.shopping-box .shopping-num{padding: 0 20px;text-align: right;float: left;}

.shopping-box .shopping-price{padding-left: 20px;border-left: 1px solid #e1e1e1;float: left;width: 155px}

.shopping-num h4, .shopping-price h4{color: #323232;font-weight: normal}

.shopping-num h4 i{width: 28px;font-size: 18px;text-align: center;font-weight: bold;display: inline-block}

.shopping-price h4 i{font-size: 18px;font-weight: bold}

.shopping-price h5{color: #959595}

.shopping-num h5{color: #959595;}

.shopping-num h5 i{width: 28px;text-align: center;display: inline-block}

.shopping-btn{float: left;height: 44px;line-height: 44px;text-align: center;padding: 2px 32px;font-size: 16px;background: linear-gradient(#688fe8,#5079e1);border-radius: 9px;display: block;color: #fff;}

.shopping-btn.disabled-btn{background: linear-gradient(#BFBFBF,#999);cursor: not-allowed}

.cart-empty{padding-top: 385px;background: url(../assets/img/cart-box-empty.png) no-repeat center 50px;text-align: center;padding-bottom: 60px}

.cart-empty h3{font-size: 14px;line-height: 1.5;color: #8d8d8d;margin-bottom: 17px;}

.cart-empty a{width: 151px;line-height: 38px;height: 38px;border: 1px solid #e5e5e5;border-radius: 4px;display: inline-block;color: #999;font-size: 12px;background: linear-gradient(#fff,#f0f0f0)}
</style>