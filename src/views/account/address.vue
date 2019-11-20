<template>
<div class="account-address">
    <div class="header">
        <h2>收货信息</h2>
    </div>
    <div class="add-address-list clear">
        <div class="name fl">{{orderData.receive.name}}</div>
        <div class="detail fl">{{orderData.receive.province}} {{orderData.receive.city}} {{orderData.receive.county}} {{orderData.receive.add}}</div>
        <div class="default fr">（默认地址）</div>
        <!-- <div class="telephone fr">{{orderData.receive.phone}}</div> -->
    </div>
</div>
</template>

<script>
import addAddress from '@/components/add-address'
export default {
    data(){
        return {
            orderData:this.$store.state.orderData[0],
            isShow:false
        }
    }
}

</script>

<style scoped>
.account-address{overflow: hidden;border: 1px solid #D1D1D1;border-color: rgba(0,0,0,.14);border-radius: 8px;margin-left: 230px;}

.account-address .header{height: 60px;padding: 0 10px 0 28px;background: linear-gradient(#FFF,#F5F5F5);border-bottom: 1px solid #DCDCDC;border-radius: 10px 10px 0 0;box-shadow: 0 1px 7px rgba(0,0,0,.06);line-height: 60px;color: #646464;}

.account-address .header h2{float: left;}

.account-address .header .add-address{overflow: hidden;float: right;margin-top: 11px;background: #A2A2A2;border-radius: 8px;line-height: 38px;font-size: 14px;}

.account-address .header .add-address a{padding: 0 13px 0 38px;background: url(../../assets/img/btn-icon-new.png) 0 -6px no-repeat;display: block;height: 38px;line-height: 38px;color: #FFF;}

.account-address .header .add-address:hover{background: #7595e4;}

.add-address-list{height: 75px;padding: 20px 0;background: #fff;border-bottom: 1px solid #CFCFCF;}

.add-address-list:last-child{border-bottom: none}

.add-address-list .name{width: 106px;height: 100%;padding: 0 20px 0 24px;line-height: 75px}

.add-address-list .detail{width: 440px;height: 100%;text-align: left;line-height: 75px}

.add-address-list .operation{width: 135px;padding: 24px 0;text-align: center;}

.add-address-list .operation a{display: inline-block;width: 26px;height: 26px;border-radius: 5px;vertical-align: middle}

.add-address-list .operation a.edit-btn{background: url(../../assets/img/btn-icon-new.png) -9px -112px no-repeat #A2A2A2;}

.add-address-list .operation a.del-btn{background: url(../../assets/img/btn-icon-new.png) -9px -262px no-repeat #d84747;opacity: .6;}

.add-address-list .default{width: 80px;line-height: 75px;text-align: center;font-size: 12px;margin-right: 30px}

.add-address-list .telephone{width: 160px;height: 100%;line-height: 75px;text-align: center;}
</style>