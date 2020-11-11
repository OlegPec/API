<template>
<div class="share-form">
    <form class="share__link">
        <input class="share__link-input" ref="link" :value="url" :disabled="!$auth.check()">
        <span class="share__update"><img :src="'../images/update.svg'" alt="update"></span>
        <span class="share__copy" @click="copyLink"><img :src="'../images/copy.svg'" alt="copy"></span>
    </form>
    <p class="socials-title">Отправить ссылку</p>
    <div class="socials">
        <a :href="'https://vk.com/share.php?url=' + url" target="_blank" :class="{isDisabled: !$auth.check()}">
            <span class="socials-btn vk"><img :src="'../images/vk.svg'" alt="vk"></span>
        </a>
        <a :href="'viber://forward?text=' + url" target="_blank" :class="{isDisabled: !$auth.check()}">
            <span class="socials-btn viber"><img :src="'../images/viber.svg'" alt="viber"></span>
        </a>
        <a :href="'https://telegram.me/share/url?url=' + url" target="_blank" :class="{isDisabled: !$auth.check()}">
            <span class="socials-btn telegram"><img :src="'../images/telegram.svg'" alt="telegram"></span>
        </a>
        <a :href="'https://wa.me/?text=' + url" target="_blank" :class="{isDisabled: !$auth.check()}">
            <span class="socials-btn watsapp"><img :src="'../images/watsapp.svg'" alt="watsapp"></span>
        </a>
    </div>
<!--    <div class="add-card">-->
<!--        <label></label>-->
<!--        <input type="checkbox">-->
<!--        <selector>-->

<!--        </selector>-->
<!--    </div>-->
</div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "ShareForm.vue",
        data: function () {
            return {
                // url: `http://списокпокупок.рф/list/${this.$props.listId}`,
                url: 'https://списокпокупок.рф/list/' + this.getCurrentList(),
            }
        },
        methods:{
            ...mapGetters(['getCurrentList']),
            copyLink() {
                let a = this.$refs.link;
                a.select()
                document.execCommand("copy");
                // console.log(this.$refs.link.value)
            }
        }

    }
</script>

<style scoped>
    input {
        outline: none;
    }
    input:focus {
        outline: none;
    }
    .share-form {
        padding: 15px 18px 20px 18px;
    }
    .share__link {
        position: relative;
    }
    .share__link-input {
        width: 100%;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid #A1A1A1;
        height: 40px;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
        text-overflow: ellipsis;
        padding-left: 10px;
    }
    .share__link-input:focus {
        /*outline: 1px;*/
    }
    .share__update,
    .share__copy {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 38px;
        position: absolute;
        top: 1px;
    }
    .share__update {
        right: 41px;
        background-color: #ffffff;
    }
    .share__copy {
        background-color: #EEEEEE;
        border-radius: 0 5px 5px 0;
        right: 1px;
        cursor: pointer;
    }
    .share__copy:active {
        background-color: #e0e0e0;
    }
    .socials-title {
        text-align: center;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #A1A1A1;
        margin: 12px 0 14px 0;
    }
    .socials {
        padding: 0 37px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .socials-btn {
        width: 50px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }
    .vk {
        background-color: #4D7198;
    }
    .viber {
        background-color: #7360F2;
    }
    .telegram {
        background-color: #0088CC;
    }
    .watsapp {
        background-color: #25D366;
    }
    .isDisabled {
        pointer-events: none;
    }
</style>
