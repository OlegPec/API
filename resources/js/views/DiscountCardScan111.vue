<template>
    <section>
        <Header />
        <div class="discount-card-scan">
                <StreamBarcodeReader
                    @decode="onDecode"
                    @loaded="onLoaded"
                ></StreamBarcodeReader>
            <div class="card-scan__btn">
                <button type="button" class="fill-title__btn" @click="moveToDiscountCardAdd">Ввести номер карты вручную</button>
            </div>
        </div>
    </section>
</template>

<script>
    import Header from "../components/Header";
    import {mapGetters} from "vuex";
    import StreamBarcodeReader from '../components/StreamBarcodeReader'

    export default {
        name: "stream-barcode-reader",
        data: function() {
          return {
              barcode: '',
          }
        },

        methods: {
            ...mapGetters(['getDiscountCards']),
            moveToDiscountCardAdd() {
                this.$router.push('/discountCardAdd')
            },
            onDecode (result) {
                if(result) {
                    this.barcode = result
                    this.$router.push({name: 'discountCardAdd', params: {barcode: this.barcode}})
                }
            },
            onLoaded() {}
        },

        components: {Header, StreamBarcodeReader}
    }
</script>

<style scoped>
    .discount-card-scan {
        display: flex;
        flex-direction: column;
        height: 100vh;
        /*background: rgba(0, 0, 0, 0.5);*/
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
        z-index: 10;
    }
</style>
