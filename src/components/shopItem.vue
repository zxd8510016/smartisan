<template>
    <div class="item">
        <div>
            <img :src="item.sku_info[itemIndex].ali_image+'?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'" :alt="item.name">
        </div>
        <h6>{{item.name}}</h6>
        <p>{{item.name_title}}</p>
        <div class="shop-color">
            <ul>
                <li 
                    v-for="(opt,index) in item.sku_info" 
                    :key="opt.sku_id" 
                    :title="opt.spec_json.show_name" 
                    @click="tab(index)"
                    :class="{active:index==itemIndex}"
                >
                    <img :src="'http://img01.smartisanos.cn/'+opt.spec_json.image+'20X20.jpg'">
                </li>
            </ul>
        </div>
        <div class="item-price">
            <i>¥</i>
            <span>{{item.price}}</span>
        </div>
        <div class="item-btns">
            <div class="gray-btn">
                <router-link :to="{name:'item',query:{itemId:item.sku_info[itemIndex].sku_id}}">查看详情</router-link>
            </div>
            <div class="blue-btn" @click="addCartHandler(item.sku_info[itemIndex])">加入购物车</div>
        </div>
    </div>
</template>
<script>
export default {
    props:['item'],
    data(){
        return {
            itemIndex:0
        }
    },
    methods:{
        tab(index){
            this.itemIndex=index;
        },
        addCartHandler(data){
            var itemData={info:data,count:1}
            this.$store.commit('addShopData',itemData);
        }
    }
}
</script>
<style scoped>

</style>

