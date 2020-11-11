<template>
    <div class="discount-card-data">
        <Header />
        <div
             :style="{background: this.discountCard.brand
                ? `url(../images/discount_card/${this.discountCard.brand.key}.png)`
                : this.discountCard.color}"
             class="discount-card"
        >
            <p class="discount-card__title" v-if="!this.discountCard.brand">{{discountCard.title}}</p>
        </div>
        <div class="barcode-container">
            <svg id="barcode" class="barcode"></svg>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import {mapGetters} from "vuex";
    import JsBarcode from 'jsbarcode'

    export default {
        name: "DiscountCardData.vue",
        data: function() {
            return {
                discountCard: {}
            }
        },
        async mounted() {
            this.discountCard = await this.getDiscountCards().find(el => el.id == this.$route.params.id)
            await JsBarcode("#barcode", this.discountCard.barcode, {
                // format: "ean13",
                lineColor: "#000",
                width:4,
                height:100,
                displayValue: false,
                background: "transparent"
            });
        },
        methods: {
            ...mapGetters([ 'getDiscountCards']),
        },
        components: {Header},
    }
</script>

<style scoped>
    .discount-card {
        width: 315px;
        height: 195px;
        background: #334422;
        border-radius: 20px;
        margin: 50px auto 30px auto;
        background-size: cover!important;
    }
    .discount-card__title {
        font-weight: normal;
        font-size: 19px;
        line-height: 22px;
        padding: 24px;
        color: #FFFFFF;
    }
    .barcode-container {
        display: flex;
        justify-content: center;
    }
    .barcode {
        width: 200px;
        height: 45px;
    }
</style>
