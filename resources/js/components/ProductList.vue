<template>
    <section class="product-list-container">
        <div class="product-list">
            <transition-group name="fade">
                <div class="product-list__item" v-for="product of filteredProducts" :key="product.external_id"
                     @click="markDone(product)"
                     v-touch:swipe="swipeLeft(product.external_id)"
                     v-touch-options="{swipeTolerance: 20, touchHoldTolerance: 200}"
                    >
                    <div class="item__visible-part" :class="{swiped: product.external_id == currentProductId}">
                        <span :style="{backgroundColor: product.product_group ? product.product_group.color : ''}"></span>
                        <p class="item__title" :class="{done: product.marked}">{{product.title}}</p>
                        <p class="item__unit">{{product.unit}}</p>
                    </div>
                    <div class="item__hide-part" :class="{swiped: product.external_id == currentProductId}">
                        <span class="edit"><img :src="'../images/edit.svg'" alt="edit"></span>
                        <span class="delete" @click="deleteProduct(product.external_id)"><img :src="'../images/delete.svg'" alt="delete"></span>
                    </div>
                </div>
            </transition-group>
        </div>

        <ul class="filters" v-show="this.products.length" >
            <li>
                <a href="#/all" class="filter__link" :class="{selected: visibility == 'all'}" @click="visibility = 'all'">Все</a>
            </li>
            <li>
                <a href="#/active" class="filter__link" :class="{selected: visibility == 'active'}"
                   @click="visibility = 'active'">Активные</a>
            </li>
            <li>
                <a href="#/completed" class="filter__link" :class="{selected: visibility == 'completed'}"
                   @click="visibility = 'completed'">Завершенные</a>
            </li>
        </ul>


    </section>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import product from "../store/product";
    let filters = {
        all: products => products,
        active: products => products.filter(el => !el.marked),
        completed: products => products.filter(el => el.marked),
    };

    export default {
        name: "ProductList.vue",
        props: ['products'],
        data: () => ({
            visibility: 'all',
            productGroups: [],
            currentProductId: null
        }),

        computed: {
            filteredProducts: function () {
                return filters[this.visibility](this.sortingProducts(this.products));
            },
        },

        async mounted() {
            this.productGroups = this.getProductGroups()
        },

        methods: {
            ...mapMutations(['setMarkedProduct']),
            ...mapGetters(['getProductGroups']),
            swipeLeft (param) {
                return (direction, event) =>{
                    if(direction == 'left') {
                        this.currentProductId = param
                    } else {
                        this.currentProductId = null
                    }
                }
            },
            sortingProducts(products) {
                return products.sort((a, b) => a.product_group_id > b.product_group_id ? 1 : -1);
            },
            markDone(product) {
                const currentProduct = this.filteredProducts.filter(el => el.external_id === product.external_id)
                if(currentProduct[0]) {
                    currentProduct[0].marked = !currentProduct[0].marked
                    this.$store.dispatch('toggleMarkedProduct', product)
                    this.setMarkedProduct(product.external_id)
                }


            },
            deleteProduct(id) {
                this.$store.dispatch('deleteProduct', id)
            }
        }
    }
</script>

<style scoped>
    .product-list-container {
        position: relative;
        height: calc(100vh - 50px);
        overflow-y: auto;
        padding-bottom: 35px;
        animation: opacity .3s;
    }
    .product-list {
        background-color: white;
        overflow-x: hidden;
    }
    .product-list__item {
        display: flex;
        position: relative;
    }

    .item__visible-part {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 15px;
        height: 70px;
        border-bottom: 1px solid #eeeeee;
        cursor: pointer;
        transform: translateX(0);
        transition: .2s;
    }
    .item__visible-part span {
        border-radius: 100%;
        width: 10px;
        height: 10px;
        margin-right: 15px;
    }
    .item__title,
    .item__unit {
        font-weight: normal;
        font-size: 14px;
        line-height: 14px;
        color: black;
        margin: 0;
    }
    .item__unit {
        margin-left: auto;
        color: #A1A1A1;
    }
    .item__hide-part {
        width: 140px;
        transform: translateX(140px);
        transition: .2s;
        position: absolute;
        right: 0;
        display: flex;
    }
    .item__visible-part.swiped {
        transform: translateX(-140px);
        transition: .2s;
    }
    .item__hide-part.swiped {
        transform: translateX(0);
        transition: .2s;
    }
    .edit, .delete {
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .edit {
        background: #D4D4D4;
    }
    .delete {
        background-color: #BABABA;
    }
    .done {
        text-decoration: line-through;
        color: #D4D4D4;
    }
    .filters {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 35px;
        list-style-type: none;
        padding: 0 14px;
        background-color: #E1E1E1;
        margin: 0;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .filters li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .filter__link {
        font-weight: normal;
        font-size: 10px;
        line-height: 12px;
        color: #A1A1A1;
        padding: 4px 14px;
        margin-right: 20px;
    }
    .filter__link.selected {
        background-color: #D4D4D4;
        border-radius: 5px;
        text-decoration: none;
    }
    .active {
        background: #EEEEEE;
    }
    /*.fade-enter-active, .fade-leave-active {*/
    /*    transition: opacity .3s;*/
    /*}*/
    /*.fade-enter, .fade-leave-to {*/
    /*    opacity: 0;*/
    /*}*/
    .fade-enter-active {
        transition: all .3s ease;
    }
    .fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(30px);
        opacity: 0;
    }
</style>
