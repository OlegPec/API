<template>
    <div class="list">
        <Header :header="getCurrentHeader()"/>
        <Loader v-show="loader"/>
        <ProductList v-show="!loader" :products="getProductsByListId(listId)"/>

        <section class="cap" v-show="ShowAddProductForm" @click="closeForm"></section>
        <section class="cap-settings" v-show="getSettings" @click="toggleSettings(false)"></section>

        <ProductAdd :showForm="ShowAddProductForm"/>

        <div class="discount-cards__btn" :class="{display: ShowAddProductForm}" @click="$router.push('/discountCards')"><img :src="'../images/card.svg'" alt="card"></div>

        <div class="show-form__btn" :class="{display: ShowAddProductForm}" @click="showAddForm"><img :src="'../images/plus-add.svg'" alt="plus"></div>
    </div>
</template>

<script>

    import {mapMutations, mapGetters} from 'vuex'
    import ProductList from "../components/ProductList";
    import ProductAdd from "../components/ProductAdd";
    import Header from "../components/Header";
    import Loader from "../components/Loader";

    export default {
        name: "List.vue",
        props: ['header'],
        data: function () {
            return {
                showForm: false,
                listId: this.$route.params.id,
                loader: false
            }
        },
        computed: {
            ...mapGetters(['getSettings', 'getProductsByListId']),
            ShowAddProductForm() {
                return this.getAddProductForm()
            }
        },
        async mounted() {
            if(!this.$auth.check()) {
                this.setCurrentUserFalse()
            }
            this.loader = true
            this.setCurrentList(this.$route.params.id)
            let lists = this.getLists().filter(el => el.external_id === this.$route.params.id)

            if(!this.$auth.check() && lists.length) {
                this.loader = false
                this.toggleComeBackBtn(false)
            } else {
                await this.$store.dispatch('getProductByList', this.listId)
                this.loader = false
                this.toggleComeBackBtn(false)
                this.t = setInterval(() => {
                    this.$store.dispatch('getProductByList', this.listId)
                }, 10000)
            }

            this.setCurrentHeader(lists[0].title)
        },
        destroyed() {
            clearInterval(this.t)
        },
        methods: {
            ...mapMutations(['toggleComeBackBtn', 'toggleAddProductForm', 'toggleSettings',
                'setCurrentList', 'setCurrentUserFalse', 'setCurrentHeader']),
            ...mapGetters(['getAddProductForm', 'getCurrentHeader', 'getList', 'getLists']),

            showAddForm() {
                this.toggleAddProductForm(true)
                this.toggleComeBackBtn(true)
            },
            closeForm() {
                this.toggleAddProductForm(false)
                this.toggleComeBackBtn(false)
            }
        },
        components: {Loader, ProductList, ProductAdd, Header}
    }
</script>

<style scoped>
    .list {
        height: 100vh;
        position: relative;
    }
    .show-form__btn {
        width: 60px;
        height: 60px;
        background-color: black;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 10px;
        bottom: 50px;
    }
    .discount-cards__btn {
        width: 40px;
        height: 40px;
        background-color: black;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 20px;
        bottom: 130px;
    }
    .display {
        display: none;
    }
    .cap,
    .cap-settings {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .cap {
        background: rgba(0, 0, 0, 0.4);
        left: 0;
    }
    .cap-settings {
        background: rgba(0, 0, 0, 0);
        left: 50px;
    }
</style>
