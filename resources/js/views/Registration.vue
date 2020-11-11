<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Регистрация</div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="has_error && !success">
                    <p v-if="error === 'registration_validation_error'">Данные заполнены не правильно, проверьте сообщения под полями</p>
                    <p v-else>Ошибка, невозможно зарегистрироваться в это время. Если проблема не устранена, пожалуйста,
                        обратитесь к администратору.</p>
                </div>
                <form @submit.prevent="register" v-if="!success" method="post">
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                        <label for="name">Имя</label>
                        <input type="text" id="name" class="form-control" placeholder="" v-model="name">
                        <span class="help-block" v-if="has_error && errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="" v-model="email">
                        <span class="help-block" v-if="has_error && errors.email">{{ errors.email }}</span>
                    </div>

                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                        <label for="password">Пароль</label>
                        <input type="password" id="password" class="form-control" v-model="password">
                        <span class="help-block" v-if="has_error && errors.password">{{ errors.password }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                        <label for="password_confirmation">Подтверждение пароля</label>
                        <input type="password" id="password_confirmation" class="form-control"
                               v-model="password_confirmation">
                    </div>
                    <button type="submit" class="btn btn-default">Регистрация</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    import {v4 as uuidv4} from "uuid";
    import {mapMutations, mapGetters} from 'vuex';
    import {maxLength} from "vuelidate/lib/validators";

    export default {
        name: "Registration.vue",
        data() {
            return {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                has_error: false,
                error: '',
                errors: {},
                success: false
            }
        },
        validations: {
            title: {maxLength: maxLength(35)}
        },
        methods: {
            ...mapGetters(['getList', 'getLists', 'getProductsTypeNoAuth']),
            ...mapMutations(['setFirstList', 'setFirstProducts', 'setProducts']),
            register() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                let listId;
                if (!this.getLists().length) {
                    this.setFirstList()
                    listId = this.getList()
                    const products = [
                        {
                            external_id: uuidv4(),
                            title: 'Булочки с повидлом',
                            'list_id': listId,
                            product_group_id: 'cb2eaa85-9232-4c25-b3ba-9472317ce28a',
                            unit: '4 шт.',
                            marked: false,
                            product_group: {color: '#F70909'},
                            type: 'noAuth'
                        },
                        {
                            external_id: uuidv4(),
                            title: 'Молоко',
                            'list_id': listId,
                            product_group_id: '692b46bd-bdbc-4841-ae50-c8e85ea36f64',
                            unit: '2 л.',
                            marked: false,
                            product_group: {color: '#6633F9'},
                            type: 'noAuth'
                        },
                        {
                            external_id: uuidv4(),
                            title: 'Хлеб Бородинский',
                            'list_id': listId,
                            product_group_id: 'cb2eaa85-9232-4c25-b3ba-9472317ce28a',
                            unit: '1 шт.',
                            marked: true,
                            product_group: {color: '#F70909'},
                            type: 'noAuth'
                        },
                        {
                            external_id: uuidv4(),
                            title: 'Огурцы',
                            'list_id': listId,
                            product_group_id: '5133b9e0-f27b-4b07-964c-00d2babaafb7',
                            unit: '500 гр.',
                            marked: false,
                            product_group: {color: '#FCF554'},
                            type: 'noAuth'
                        },
                        {
                            external_id: uuidv4(),
                            title: 'Кефир',
                            'list_id': listId,
                            product_group_id: '692b46bd-bdbc-4841-ae50-c8e85ea36f64',
                            unit: '1 л.',
                            marked: true,
                            product_group: {color: '#6633F9'},
                            type: 'noAuth'
                        },
                        {
                            external_id: uuidv4(),
                            title: 'Шоколад "Аленка"',
                            'list_id': listId,
                            product_group_id: '',
                            unit: '1 шт.',
                            marked: false,
                            product_group: {color: ''},
                            type: 'noAuth'
                        }
                    ]
                    this.setFirstProducts(products)
                }
                    this.setProducts(this.getProductsTypeNoAuth())


                var app = this
                this.$auth.register({
                    data: {
                        email: app.email,
                        name: app.name,
                        password: app.password,
                        password_confirmation: app.password_confirmation,
                        state: JSON.parse(localStorage.getItem('vuex'))
                    },
                    success: function () {
                        app.success = true
                        this.$router.push({name: 'login', params: {successRegistrationRedirect: true}})
                    },
                    error: function (res) {
                        console.log(res.response.data.errors)
                        app.has_error = true
                        app.error = res.response.data.error
                        app.errors = res.response.data.errors || {}
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
