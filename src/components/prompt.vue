<template>
    <div id="prompt" v-if="isShow">
        <div class="dialog-mask"></div>
        <div class="dialog-box">
            <div class="header">
                <h3>提示</h3>
                <span @click="close"></span>
            </div>
            <div class="confrim-msg">商品已达到最大可购买数量，无法继续添加</div>
            <div class="dialog-btn-wrap">
                <div class="blue-main-btn">
                    <a href="javascript:;" @click="close">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        isShow(){
            return this.$store.state.maxoff
        }
    },
    methods:{
        close(){
            this.$store.state.maxoff=false
        }
    }
}

</script>
<style>
#prompt{position: fixed;left: 0;top: 0;width: 100%;height: 100%}

.dialog-mask{width: 100%;height: 100%;background: #000;opacity: 0.8;}

.dialog-box{width: 436px;background: #fff;border: 1px solid #dcdcdc;box-shadow: 0 10px 30px rgba(0,0,0,1);border-radius: 8px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);overflow: hidden;}

.dialog-box .header{height: 60px;line-height: 60px;padding: 0 15px;background: linear-gradient(#fbfbfb,#ececec);border-bottom: 1px solid #d4d4d4}

.dialog-box .header h3{font-size: 18px;padding-left: 15px;color: #333;float: left;}

.dialog-box .header span{float: right;padding: 4px 5px;background: url(../assets/img/ui.png) no-repeat -16px -16px;width: 16px;height: 17px;opacity: .7;transition: .3s;margin-top: 18px;cursor: pointer;}

.dialog-box .header span:hover{opacity: 1;}

.confrim-msg{height: 50px;padding: 60px 63px;text-align: center;font-size: 16px;line-height: 24px}

.blue-main-btn{float: right;width: 100px;background: linear-gradient(#5598c9,#2a6da2);border-radius: 9px;padding: 1px}

.dialog-btn-wrap{height:51px;padding: 18px 10px 0;line-height: 51px;background: url(../assets/img/account-bottom-bar-bg.png) 0 0 repeat-x}

.dialog-btn-wrap a{width: 100px;height: 34px;line-height: 34px;padding: 2px 0;background: linear-gradient(#739fe1,#5f7ed7);box-shadow: inset 0 1px 3px #92b6ec, inset 0 0 2px #627dca, inset 0 -2px 3px #4c69b8;color: #fff;border-radius: 9px;text-align: center;transition: .3s;display: block}

.dialog-btn-wrap a:hover{box-shadow: inset 0 1px 3px #83a9e1, inset 0 0 2px #627dca, inset 0 -2px 3px #5a77c7, inset 0 0 100px rgba(48,77,147,.4);}
</style>
