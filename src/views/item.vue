<template>
<div id="main">
    <div class="shop-content">
        <div class="item-box">
            <div class="shop-show clear">
                <div class="list">
                    <ul>
                        <li v-for="(imgs,index) in itemInfo.ali_images" :key="index" :class="{on:index==imgIndex}" @click="tabImage(index)">
                            <img :src="imgs+'?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'">
                        </li>
                    </ul>
                </div>
                <div class="img">
                    <img :src="itemInfo.ali_images[imgIndex]+'?x-oss-process=image/resize,w_440/quality,Q_90/format,webp'">
                </div>
            </div>
            <div class="shop-des-box">
                <div class="shop-title">
                    <div class="info">
                        <h3>{{itemInfo.title}}</h3>
                        <p>{{itemInfo.sub_title}}</p>
                    </div>
                    <div class="price">
                        <em>¥</em><i>{{itemInfo.price}}</i>
                    </div>
                </div>
                <div class="shop-des-panel">
                    <div class="shop-panel-item clear">
                        <span class="title">颜色</span>
                        <ul class="colors">
                            <router-link 
                                v-for="(colors,index) in itemInfo.sku_list" 
                                :key="index" 
                                :title="colors.color" 
                                :class="{cur:colors.id==itemId}"
                                tag="li"
                                :to="{name:'item',query:{itemId:colors.id}}"
                            >
                                <img :src="'http://img01.smartisanos.cn/'+colors.image+'20X20.jpg'">
                            </router-link>
                        </ul>
                    </div>
                    <div class="shop-panel-item clear">
                        <span class="title">数量</span>
                        <div class="shop-panel-btns clear">
                            <span class="down" :class="{'down-disabled':count<=1}" @click="removeCount"></span>
                            <span class="num">{{count}}</span>
                            <span class="up" :class="{'up-disabled':count>=itemInfo.limit_num}" @click="addCount"></span>
                        </div>
                    </div>
                </div>
                <div class="shop-cart-btns clear">
                    <a class="blue-btn" href="javascript:;" @click="addShopCart">加入购物车</a>
                    <router-link class="gray-btn" :to="{name:'checkout'}">现在购买</router-link>
                </div>
            </div>
        </div>
    </div>
    <prompt></prompt>
</div>
</template>

<script>
import itemData from '@/lib/newItemsData'
import prompt from '@/components/prompt'
export default {
    data(){
        return {
            itemId:this.$route.query.itemId,
            itemData,
            imgIndex:0,
            count:1
        }
    },
    components:{
        prompt
    },
    computed:{
        itemInfo(){
            return this.itemData.filter(item=>{
                return item.sku_id==this.itemId;
            })[0]
        }
    },
    watch:{
        '$route.query.itemId'(){
            this.itemId=this.$route.query.itemId;
            this.imgIndex=0;
        }
    },
    methods:{
        tabImage(index){
            this.imgIndex=index;
        },
        addShopCart(){
            var itemData={info:this.itemInfo,count:this.count}
            this.$store.commit('addShopData',itemData)
        },
        addCount(){
            this.count++;
            if(this.count>this.itemInfo.limit_num){
                this.count=this.itemInfo.limit_num;
            }
        },
        removeCount(){
            this.count--;
            this.count=this.count<1 ? 1 :this.count;
        }
    }
}

</script>
<style scoped>
.shop-content{width: 1220px;height: 600px;padding-bottom: 25px;margin: 0 auto}

.shop-content .item-box{padding: 60px;background: #fff;border-radius: 8px;border: 1px solid #dcdcdc;display: table}

.shop-content .item-box .shop-show{width: 648px;display: table-cell}

.shop-content .shop-show .list{float: left;}

.shop-content .shop-show .list li{width: 54px;height: 54px;padding: 12px;border: 1px solid rgba(0,0,0,.06);border-radius: 5px;cursor: pointer;margin-top: 10px}

.shop-content .shop-show .list li:first-child{margin: 0}

.shop-content .shop-show .list .on{padding: 10px;border: 3px solid rgba(0,0,0,.2)}

.shop-content .shop-show .img{float: left;margin-left: 20px}

.shop-des-box{width: 450px;vertical-align: middle;display: table-cell}

.shop-des-box .shop-title{padding: 8px 8px 18px 10px;position: relative;}

.shop-des-box .shop-title .info{width: 360px}

.shop-des-box .shop-title h3{margin-bottom: 13px;line-height: 30px;font-size: 24px;color: #000}

.shop-des-box .shop-title p{font-size: 14px;line-height: 21px;color: #bdbdbd}

.shop-des-box .shop-title .price{position: absolute;right: 8px;bottom: 21px;height: 20px;line-height: 20px;color: #de4037;font-weight: bold;font-size: 16px;line-height: 20px}

.shop-des-box .shop-title .price i{font-size: 24px;padding-left: 2px}

.shop-des-panel{padding: 29px 0 8px 10px;border-top: 1px solid #ebebeb}

.shop-des-panel .shop-panel-item{margin-bottom: 19px}

.shop-des-panel .title{float: left;padding-right: 20px;font-size: 14px;color: #8d8d8d;line-height: 36px}

.shop-des-panel .colors{float: left;}

.shop-des-panel .colors li{width: 26px;height: 26px;border: 2px solid #E5E5E5;padding: 3px;float: left;border-radius: 50%;cursor: pointer;margin-left: 10px}

.shop-des-panel .colors li:first-child{margin-left: 0}

.shop-des-panel .colors li img{display: block;width: 100%;border-radius: 50%}

.shop-des-panel .colors .cur{border-color: #B2B2B2;box-shadow:inset 0 0 0 1px #B2B2B2}

.shop-panel-btns{float: left;margin-left: -5px}

.shop-panel-btns span{float: left;}

.shop-panel-btns .down{width: 44px;height: 45px;background: url(../assets/img/cart-updown-item.png) no-repeat 0 -60px;}

.shop-panel-btns .num{width: 38px;height: 18px;margin-top: 7px;line-height: 18px;text-align: center;}

.shop-panel-btns .up{width: 44px;height: 45px;background: url(../assets/img/cart-updown-item.png) no-repeat}

.shop-panel-btns .down-disabled{cursor: not-allowed;background-position: 0 -300px}

.shop-panel-btns .up-disabled{cursor: not-allowed;background-position: 0 -240px}

.shop-cart-btns{padding: 30px 0 0 10px;border-top: 1px solid #ebebeb}

.shop-cart-btns a{width: 143px;height: 48px;line-height: 48px;text-align: center;border-radius: 7px;float: left;}

.shop-cart-btns .blue-btn{background: linear-gradient(#779ae9,#5078df);color: #fff;border: 1px solid #5c81e3;}

.shop-cart-btns .blue-btn:hover{transition: all .15s ease-out;box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48,77,147,.4);}

.shop-cart-btns .gray-btn:hover{transition: all .15s ease-out;background: linear-gradient(#f6f6f6,#ededed);}

.shop-cart-btns .gray-btn{background: linear-gradient(#fff,#fafafa);border: 1px solid #e0e0e0;margin-left: 20px}
</style>