<template>
<div id="adress-wrap">
    <div class="adress-mask"></div>
    <div class="adress-dialog">
        <div class="header">
            <h4 class="title">管理收货地址</h4>
            <span class="close" @click="close">x</span>
        </div>
        <div class="adress-box">
            <div class="adress-item">
                <div class="adress-name">
                    <input type="text" v-model="receiveInfo.name" placeholder="收货人姓名">
                </div>
            </div>
            <div class="adress-item">
                <div class="adress-mobile" :class="{'invalid':!receiveInfo.phoneError}">
                    <input type="text" v-model="receiveInfo.phone" placeholder="手机号" @input="judgePhone">
                </div>
            </div>
            <div class="adress-item clear">
                <div class="adress-area area-item1">
                    <input type="text" v-model="receiveInfo.areaCode" placeholder="区号（可选）">
                </div>
                <div class="adress-phone area-item2">
                    <input type="text" v-model="receiveInfo.landLine" placeholder="固定电话（可选）">
                </div>
            </div>
            <div class="adress-item">
                <select class="adress-province" v-model="receiveInfo.provinceId">
                    <option value="0">请选择省份</option>
                    <option v-for="province in addList" :key="province.area_id" :value="province.area_id">{{province.area_name}}</option>
                </select>
            </div>
            <div class="adress-item clear">
                <select class="adress-city city fl" v-model="receiveInfo.cityId">
                    <option value="0">请选择城市</option>
                    <option :value="city.area_id" v-for="city in cityList" :key="city.area_id">{{city.area_name}}</option>
                </select>
                <select class="adress-county county fr" v-model="receiveInfo.countyId">
                    <option value="0">请选择区县</option>
                    <option :value="county.area_id" v-for="county in countyList" :key="county.area_id">{{county.area_name}}</option>
                </select>
            </div>
            <div class="adress-item">
                <div class="adress-detail">
                    <input type="text" v-model="receiveInfo.add" placeholder="详细地址，如街道名称，楼层，门牌号码等">
                </div>
            </div>
            <div class="adress-item">
                <span class="checkbox" @click="isChecked" :class="{'checkbox-on':receiveInfo.default}"></span>设为默认
            </div>
        </div>
        <a class="adress-save-btn" :class="{disabled:!isRight}" @click="submitReceiveInfo">保存</a>
    </div>
</div>
</template>

<script>
import addList from '@/lib/addList'
export default {
    props:['receive'],
    data(){
        return {
            addList,
            receiveInfo:{
                "name": "",
                "phone": "",
                "areaCode": "",
                "landLine": "",
                "provinceId": 0,
                "province": "",
                "cityId": 0,
                "city": "",
                "countyId": 0,
                "county": "",
                "add": "",
                "default": false,
                "phoneError": false
            },
            isRight:false
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        judgePhone(){
            if(this.receiveInfo.phone.length==11){
                this.receiveInfo.phoneError=true;
            }else{
                this.receiveInfo.phoneError=false;
            }
        },
        isChecked(){
            this.receiveInfo.default=!this.receiveInfo.default;
        },
        testReceiveInfo(){
            if(this.receiveInfo.name && this.receiveInfo.phoneError && this.receiveInfo.province && this.receiveInfo.city && this.receiveInfo.county && this.receiveInfo.add){
                this.isRight=true;
            }else{
                this.isRight=false;
            }
        },
        submitReceiveInfo(){
            if(this.isRight){
                this.receive.push(this.receiveInfo)
                this.$emit('close')
            }
        }
    },
    watch:{
        'receiveInfo.provinceId'(){
            this.receiveInfo.cityId=0;
            this.receiveInfo.countyId=0;
        },
        'receiveInfo.cityId'(){
            this.receiveInfo.countyId=0;
        },
        'receiveInfo.countyId'(){
            this.countyList.forEach(county=>{
                if(county.area_id==this.receiveInfo.countyId){
                    this.receiveInfo.county=county.area_name
                }
            })
        },
        receiveInfo:{
            deep:true,
            handler(){
                this.testReceiveInfo()
            }
        }
    },
    computed:{
        cityList(){
            var cityList=[];
            this.addList.forEach(province=>{
                if(province.area_id==this.receiveInfo.provinceId){
                    cityList=province.city_list
                    this.receiveInfo.province=province.area_name
                }
            })
            return cityList
        },
        countyList(){
            var countyList=[];
            this.cityList.forEach(city=>{
                if(city.area_id==this.receiveInfo.cityId){
                    countyList=city.county_list;
                    this.receiveInfo.city=city.area_name
                }
            })
            return countyList
        }
    }
}

</script>
<style scoped>
#adress-wrap{position: fixed;left: 0;top: 0;width: 100%;height: 100%;}

.adress-mask{background-color: #000;opacity: .6;width: 100%;height: 100%;}

.adress-dialog{width: 450px;height: 592px;border-radius: 10px;background: #FFF;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);overflow: hidden;}

.adress-dialog .header{height: 60px;padding: 0 15px;line-height: 60px;background: linear-gradient(#FFF,#F5F5F5);border-bottom: 1px solid #DCDCDC;box-shadow: 2px 0 5px rgba(0,0,0,.1);position: relative;}

.adress-dialog .header .title{height: 60px;line-height: 60px;text-align: center;font-size: 18px;color: #666}

.adress-dialog .header .close{width: 30px;height: 30px;line-height: 30px;font-size: 30px;color: #000;opacity: .2;position: absolute;right: 10px;top: 15px;cursor: pointer;transition: .3s}

.adress-dialog .header .close:hover{opacity: .3;}

.adress-box{padding: 20px 40px 0}

.adress-item{margin-bottom: 15px}

.adress-name, .adress-mobile, .adress-area, .adress-phone, .adress-detail{height: 46px;background: #FFF;border: 1px solid #CCC;border-radius: 6px;box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset;line-height: 46px;font-size: 18px;opacity: .618;position: relative;}

.adress-name input, .adress-mobile input, .adress-area input, .adress-phone input, .adress-detail input{padding: 0 15px;font-size: 16px;}

.adress-name input, .adress-mobile input, .adress-detail input{width: 338px}

.adress-area input{width: 88px}

.adress-phone input{width: 208px}

.adress-mobile.invalid:after{content:'手机号格式错误';height: 26px;padding: 0 10px;margin-top: -13px;background: #D16D62;border-radius: 4px;line-height: 26px;font-size: 12px;color: #FFF;position: absolute;right: 13px;top: 50%;border: 1px solid #D16D62;transition: .3s}

.area-item1{width: 118px;float: left;}

.area-item2{width: 238px;float: right;}

.adress-province, .adress-city, .adress-county{height: 48px;padding: 0 15px;background: linear-gradient(#FAFAFA,#F5F5F5);border: 1px solid #CCC;width: 100%;-webkit-appearance: none;font-size: 16px;color: #333;border-radius: 6px;}

.adress-city.city, .adress-county.county{width: 180px;}

.adress-item .checkbox{width: 20px;height: 20px;background: url(../assets/img/checkbox-bg.png) no-repeat;cursor: pointer;display: inline-block;vertical-align: middle;margin-right: 5px;margin-top: -2px}

.adress-item .checkbox.checkbox-on{background: url(../assets/img/checkbox-bg.png) 0 -20px no-repeat;}

.adress-save-btn{width: 368px;height: 46px;background:linear-gradient(#6F97E5,#527ED9);border-radius: 5px;color: #fff;display: block;margin: 0 auto;line-height: 46px;font-size: 18px;text-align: center}

.adress-save-btn.disabled{opacity: .4;cursor: not-allowed}
</style>