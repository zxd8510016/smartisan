import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        shopData: [],
        maxoff: false,
        cartShow: false,
        orderData: []
    },
    getters: {
        totalCount(state) {
            var n = 0;
            state.shopData.forEach(item => {
                n += item.count;
            })
            return n;
        },
        totalPrice(state) {
            var price = 0;
            state.shopData.forEach(item => {
                price += item.count * item.price;
            })
            return price;
        },
        checkedCartData(state) {
            var checkedData = [];
            state.shopData.forEach(item => {
                if (item.checked) {
                    checkedData.push(item);
                }
            })
            return checkedData
        },
        checkedCount(state) {
            var count = 0;
            state.shopData.forEach(item => {
                if (item.checked) {
                    count += item.count;
                }
            })
            return count;
        },
        checkedPrice(state) {
            var price = 0;
            state.shopData.forEach(item => {
                if (item.checked) {
                    price += item.count * item.price;
                }
            })
            return price
        }
    },
    mutations: {
        addShopData(state, data) {
            var bBtn = true;
            state.shopData.forEach(item => {
                if (item.sku_id == data.info.sku_id) {
                    item.count+=data.count;
                    state.cartShow = true;
                    bBtn = false;
                }
                if (item.count > item.limit_num) {
                    item.count-=data.count;
                    state.maxoff = true;
                }
            })
            if (bBtn) {
                Vue.set(data.info, 'count', data.count);
                Vue.set(data.info, 'checked', true);
                state.shopData.push(data.info);
                state.cartShow = true;
            }
        },
        delShopData(state,id) {
            state.shopData.forEach((item,index) => {
                if (item.sku_id == id) {
                    state.shopData.splice(index, 1);
                }
            })
        },
        submitOrderData(state,data) {
            state.orderData.unshift(data);
            var i = state.shopData.length;
            while (i--) {
                if (state.shopData[i].checked) {
                    state.shopData.splice(i, 1);
                }
            }
        }
    }
})

export default store