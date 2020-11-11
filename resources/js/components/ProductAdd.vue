<template>
    <form @submit.prevent="onSubmit" class="product-add-form" v-if="showForm">
<!--    <form @submit.prevent="onSubmit" class="product-add-form" :class="{form: showForm}">-->
        <ul class="groups">
            <li v-for="color in colors" :key="color.external_id" class="groups__item" :style="{backgroundColor: color.color}" @click="choiceGroup(color)">
                <img :src="'../images/check.svg'" v-show="colorId === color.external_id" alt="check">
            </li>
        </ul>
        <div class="form-block">
            <input type="text" v-model="title" class="form-control form__input" placeholder="Товар : количество" ref="inputFocus"
                   :class="{invalid: !$v.title.maxLength}">
            <small class="helper-text invalid"
                   v-if="!$v.title.maxLength"
            >Слишком длинное название</small>

            <button type="submit" class="form__btn"><img :src="'../images/enter.svg'" alt="enter"></button>
        </div>
    </form>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import { v4 as uuidv4 } from 'uuid';
    import { maxLength } from 'vuelidate/lib/validators'
    export default {
        name: "ProductAdd.vue",
        props: ['showForm'],
        data: () => ({
            title: '',
            colors: [],
            color: '',
            colorId: '',
        }),
        validations: {
            title: {maxLength: maxLength(35)}
        },
        mounted() {
            this.colors = this.getProductGroups()
        },

        updated() {
            if(this.$refs.inputFocus) {
                this.$refs.inputFocus.focus()
            }
        },

        methods: {
            ...mapGetters(['getProductGroups', 'getListsId']),
            ...mapMutations(['setProduct']),
            choiceGroup({color, external_id}) {
                if(this.color || this.external_id) {
                    this.color = ''
                    this.colorId = ''
                    return
                }
                this.color = color
                this.colorId = external_id
                this.$refs.inputFocus.focus()
            },
            onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const product = {
                    external_id: uuidv4(),
                    title: this.title,
                    unit: '',
                    marked: false,
                    color: this.color,
                    list_id: this.$route.params.id,
                    product_group_id: this.colorId,
                    product_group: {color: this.color, external_id: this.colorId},
                }

                if(this.title.trim()) {
                    if(!this.$auth.check() && this.getListsId().includes(this.$route.params.id)) {
                        // console.log(1)
                        product.type = 'noAuth'
                    }
                    this.$store.dispatch('addProduct', product)
                    this.setProduct(product)
                }
                this.title = ''
                this.color = ''
                this.colorId = ''
            },
        }
    }
</script>

<style scoped>
    .product-add-form {
        /*display: block;*/
        position: fixed;
        bottom: 35px;
        background-color: #000000;
        padding: 10px 15px;
        width: 100%;
        /*transform: translateY(140px);*/
        /*transition: .2s;*/
    }
    .form-block {
        display: flex;
        align-items: center;
    }
    .form__input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        margin-right: 15px;
    }
    .form__input::placeholder {
        font-size: 14px;
        line-height: 16px;
        color: #A1A1A1;
    }
    .form__btn {
        padding: 0;
        border: none;
        font: inherit;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
    }
    .form__btn:focus {
        outline: none;
    }
    .form {
        /*transform: translateY(0);*/
        /*transition: .2s;*/
        /*display: block;*/
    }
    .groups {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style-type: none;
        margin-bottom: 10px;
    }
    .groups__item {
        display: flex;
        align-items: center;justify-content: center;
        width: 30px;
        height: 30px;
        margin: 0 5px;
        border-radius: 100%;
    }
</style>
