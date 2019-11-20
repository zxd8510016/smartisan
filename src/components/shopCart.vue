<template>
    <li class="nav-cart" @mouseenter="show" @mouseleave="hide">
        <a href="#">
            <span class="cart-empty-num" :class="{'cart-num':count>0}">{{count}}</span>
        </a>
        <div class="nav-cart-list" v-show="isShow">
            <div class="empty" v-if="count<=0">
                <h3>购物车为空</h3>
                <p>您还没有选购任何商品，现在前往商城选购吧!</p>
            </div>
            <div class="full" v-else>
                <div class="nav-cart-items" v-for="item in shopCartData" :key="item.sku_id">
                    <div class="cart-item">
                        <div class="cart-img">
                            <img :src="item.ali_image">
                        </div>
                        <div class="item-desc">
                            <h3><a href="#">{{item.title}}</a></h3>
                            <p>{{item.spec_json.show_name}}</p>
                            <span class="price-wrap">
                                <span>¥</span><span>{{item.price}}</span><span>x {{item.count}}</span>
                            </span>
                        </div>
                        <div class="del" @click="del(item.sku_id)"></div>
                    </div>
                </div>
                <div class="nav-cart-total">
                    <p>共 {{count}} 件商品</p>
                    <div>
                        合计：
                        <span class="price-ico">¥</span>
                        <span class="price-num">{{total}}</span>
                    </div>
                    <div class="nav-cart-btn">
                        <router-link :to="{name:'cart'}">去购物车</router-link>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    data(){
        return {
            timer:null
        }
    },
    computed:{
        shopCartData(){
            return this.$store.state.shopData
        },
        count(){
            return this.$store.getters.totalCount
        },
        total(){
            return this.$store.getters.totalPrice
        },
        isShow(){
            return this.$store.state.cartShow
        }
    },
    methods:{
        del(id){
            this.$store.commit('delShopData',id)
        },
        show(){
            clearTimeout(this.timer)
            this.$store.state.cartShow=true
        },
        hide(){
            this.timer=setTimeout(()=>{
                this.$store.state.cartShow=false
            },500) 
        }
    }
}

</script>

<style>
</style>