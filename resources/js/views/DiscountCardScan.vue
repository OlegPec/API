<template>
    <section>
        <Header :header="getCurrentHeader()"/>
        <div class="discount-card-scan">
            <div class="scaner">
<!--                <StreamBarcodeReader-->
<!--                    @decode="onDecode"-->
<!--                    @loaded="onLoaded"-->
<!--                ></StreamBarcodeReader>-->
            </div>
            <div class="card-scan__btn">
                <button type="button" class="fill-title__btn" @click="moveToDiscountCardAdd">Ввести номер карты вручную</button>
            </div>
        </div>
    </section>
</template>

<script>
    import Header from "../components/Header";
    import {mapGetters, mapMutations} from "vuex";
    // import { StreamBarcodeReader } from "vue-barcode-reader";
    // import { ImageBarcodeReader } from "vue-barcode-reader";

    export default {
        name: "DiscountCardScan.vue",
        data: function() {
          return {
              a: false,
              barcode: ''
          }
        },
        mounted() {
            this.setCurrentHeader('Сканирование карты')

        },
        methods: {
            ...mapGetters(['getCurrentHeader', 'getDiscountCards']),
            ...mapMutations(['setCurrentHeader']),
            moveToDiscountCardAdd() {
                this.$router.push('/discountCardAdd')
            },
            onDecode (result) {
                if(result) {
                    this.barcode = result
                    this.$router.push({name: 'discountCardAdd', params: {barcode: this.barcode}})
                }

            },
            onLoaded() {

            }

        },

        components: {Header,
            // StreamBarcodeReader
        }
    }
</script>

<style scoped>
    .discount-card-scan {
        display: flex;
        flex-direction: column;
    }
    .scaner {
        width: 100%;
        height: 100%;
        margin: 0 auto 50px auto;
    }
    .card-scan__btn {
        position: fixed;
        bottom: 20px;
        padding: 0 18px;
        width: 100%;
    }
    .fill-title__btn {
        width: 100%;
        height: 40px;
        background: transparent;
        color: #ffffff;
        border-radius: 5px;
        border: 1px solid #ffffff;
    }
    video {
        height: 100vh!important;
    }
    @-webkit-keyframes scanning {
        50% {
            -webkit-transform: translateY(200px)!important;
            transform: translateY(200px)!important;
        }
    }
    @keyframes scanning {
        50% {
            -webkit-transform: translateY(200px)!important;
            transform: translateY(200px)!important;
        }
    }

</style>
