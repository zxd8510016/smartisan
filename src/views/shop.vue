<template>
<div id="main">
    <div class="content">
        <ul class="sort-opt clear">
            <li class="active"><a href="#">综合排序</a></li>
            <li><a href="#">销量排序</a></li>
            <li><a href="#">价格低到高</a></li>
            <li><a href="#">价格高到低</a></li>   
        </ul>
        <div class="shop-list clear">
            <shop-item :item="item" v-for="item in goodsData" :key="item.id"></shop-item>
        </div>
    </div>
    <prompt></prompt>
</div>
</template>

<script>
import goodsData from '@/lib/goodsData'
import shopItem from '@/components/shopItem'
import prompt from '@/components/prompt'

export default {
    data(){
        return {
            goodsData
        }
    },
    components:{
        shopItem,
        prompt
    }
}
</script>

<style>
.content{width: 1220px;margin: 0 auto;padding-bottom: 25px}

.content .sort-opt{height: 60px;line-height: 60px;border-top: 1px solid #D8D8D8;color: #999;font-size: 12px}

.content .sort-opt li{float: left;padding-left: 42px;position: relative;}

.content .sort-opt li::before{content: '';display: block;position: absolute;left: 20px;top: 50%;width: 2px;height: 2px;margin-top: -1px;background: #C7C7C7;}

.content .sort-opt li a{color: #999}

.content .sort-opt li.active a, .content .sort-opt li a:hover{color: #5683EA}

.content .sort-opt li:first-child{padding-left: 9px}

.shop-list{border-radius: 8px;border: 1px solid #dcdcdc;overflow: hidden;background: #fff}

.shop-list .item{float: left;width: 25%;height: 429px;background: #fff;border-right: 1px solid #efefef;box-sizing: border-box;position: relative;}

.shop-list .item div>img{margin: 50px auto 10px;}

.shop-list .item h6{margin: 0 auto;font-size: 16px;line-height: 19px;color: #424242}

.shop-list .item p{line-height: 1.2;color: #d0d0d0;margin: 8px auto 14px;font-size: 12px}

.shop-list .item h6, .shop-list .item p{text-align: center;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}

.shop-color{margin-top: 23px;text-align: center}

.shop-color ul{display: inline-block}

.shop-color ul li{float: left;width: 8px;height: 8px;padding: 2px;border: 1px solid #e5e5e5;border-radius: 50%;cursor: pointer;margin: 0 5px}

.shop-color ul li img{display: block;border-radius: 50%;width: 8px;height: 8px;}

.shop-color ul li.active{box-shadow: inset 0 0 0 1px #b2b2b2;border-color: #b2b2b2;}

.shop-list .item-price{color: #c30a18;margin-top: 24px;text-align: center;font-family: Arial}

.shop-list .item-price i{font-size: 16px}

.shop-list .item-price span{font-size: 18px;}

.shop-list .item-btns{text-align: center;position: absolute;bottom: 29px;width: 100%;opacity: 0;}

.shop-list .item-btns .gray-btn, .shop-list .item-btns .blue-btn{width: 100px;height: 28px;    font-size: 12px;line-height: 28px;border-radius: 4px;cursor: pointer;transition: .1s;text-align: center;display: inline-block}

.shop-list .item-btns .gray-btn{border: 1px solid #d5d5d5;color: #646464;}

.shop-list .item-btns .gray-btn:hover{background: linear-gradient(#f6f6f6,#ededed);}

.shop-list .item-btns .gray-btn a{display: block;color: #a1a1a1}

.shop-list .item-btns .blue-btn{background: linear-gradient(#779ae9,#5078df);border: 1px solid #5c81e3;color: #fff;margin-left: 10px;}

.shop-list .item-btns .blue-btn:hover{background: linear-gradient(#6e8ed5,#4769c2);}

.shop-list .item:hover{box-shadow: 0 0 38px rgba(0,0,0,.08) inset;transition: .2s}

.shop-list .item:hover .item-btns{opacity: 1;transition: .2s}

.shop-list .item:hover .item-price{opacity: 0;transition: .2s}
</style>



