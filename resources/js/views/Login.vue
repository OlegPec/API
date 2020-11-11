<template>
    <section>
        <Header />

        <div class="login-container">
            <div class="logo">
                <img :src="'../images/logo.jpeg'" alt="logo">
            </div>

            <form @submit.prevent="login" method="post" novalidate>
                <div class="form-group">
                    <input type="text" id="email" class="form-control" placeholder="E-mail" v-model="email" required
                           :class="{invalid: ($v.email.$dirty && !$v.email.required) || mismatchData}">
                    <small class="helper-text invalid" v-if="($v.email.$dirty && !$v.email.required)">Данное поле обязательно</small>
                </div>
                <div class="form-group">
                    <input type="password" id="password" class="form-control" placeholder="Пароль" v-model="password" required
                           :class="{invalid: ($v.email.$dirty && !$v.password.required) || mismatchData}">
                    <small class="helper-text invalid" v-if="($v.password.$dirty && !$v.password.required)">Данное поле обязательно</small>
                    <small class="helper-text invalid" v-if="mismatchData">Email или пароль не верны</small>
                </div>

                <div class="login-buttons">
                    <button type="submit" class="btn login-btn">Войти</button>
                </div>

            </form>

            <button type="button" class="btn register-btn" @click="register">Создать аккаунт</button>

            <div class="login-social">
                <span class="login-social__title lb-15">Войти с помощью социальных сетей:</span>
                <div id="uLogin" class="ulogin-group">
                    <div class="ulogin-item">
                        <a @click="AuthProvider('facebook')">
                            <img src="images/social/fb.png" alt="">
                        </a>
<!--                            <button @click="AuthProvider('facebook')">auth Facebook</button>-->
                    </div>
                    <div class="ulogin-item">
                        <a @click="AuthProvider('vkontakte')">
                            <img src="images/social/vk.png" alt="">
                        </a>
<!--                        <button @click="AuthProvider('vkontakte')">auth Vkontakte</button>-->
                    </div>
                    <div class="ulogin-item">
                        <a @click="AuthProvider('google')">
                            <img src="images/social/gl.png" alt="">
                        </a>
<!--                        <button @click="AuthProvider('google')">auth Google</button>-->
                    </div>
                    <div class="ulogin-item">
                        <a @click="AuthProvider('mailru')">
                            <img src="images/social/mr.png" alt="">
                        </a>
<!--                        <button @click="AuthProvider('mailru')">auth Mail Ru</button>-->
                    </div>
                    <div class="ulogin-item">
                        <a @click="AuthProvider('yandex')">
                            <img src="images/social/ydx.png" alt="">
                        </a>
<!--                        <button @click="AuthProvider('yandex')">auth Yandex</button>-->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Header from "../components/Header";
    import {mapMutations} from "vuex";
    import axios from "axios";
    import {required} from "vuelidate/lib/validators";
    export default {
        name: "Login.vue",
        data() {
            return {
                email: null,
                password: null,
                has_error: false,
                mismatchData: false,
            }
        },
        validations: {
            email: {required},
            password: {required},
        },
        mounted() {
            window.addEventListener('message', this.onMessage, false)
            this.toggleComeBackBtn(true)
        },
        beforeDestroy () {
            window.removeEventListener('message', this.onMessage)
        },
        methods: {
            ...mapMutations(['toggleComeBackBtn']),
            login() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                // get the redirect object
                let redirect = this.$auth.redirect()
                let app = this
                app.mismatchData = false

                this.$auth.login({
                    params: {
                        email: app.email,
                        password: app.password
                    },
                    success: function() {
                        // handle redirection
                        // const redirectTo = redirect ? redirect.from.name : this.$auth.user().role === 2 ? 'admin.dashboard' : 'dashboard'
                        app.$router.push('/')
                    },
                    error: function(error) {
                        if(error.response.status === 401) {
                            app.mismatchData = true
                        }
                        app.has_error = true
                    },
                    rememberMe: true,
                    fetchUser: true
                })
            },
            register() {
                this.$router.push('/registration')
            },
            AuthProvider(provider) {
                const newWindow = openWindow('', 'message')
                var self = this;
                axios.defaults.baseURL = `${process.env.MIX_APP_URL}`;
                this.$http.post('/login/'+provider, {state: JSON.parse(localStorage.getItem('vuex'))}, {withCredentials: true}).then(response => {
                    // console.log(response.data)
                    // window.location = response.data
                    axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`;
                    newWindow.location.href = response.data
                }).catch(err => {
                    axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`;
                    console.log({err:err})
                });
            },
            onMessage (e) {
                if (e.origin !== window.origin || !e.data.token) {
                    // sessionStorage.removeItem('laravel-vue-spa');
                    return
                }
                // localStorage.setItem('user',e.data.name)
                localStorage.setItem('laravel-vue-spa', e.data.token);
                localStorage.setItem('auth_stay_signed_in', 'true');
                // sessionStorage.removeItem('laravel-vue-spa');
                this.$router.push('/')
            }
        },
        components: {Header}
    }

    function openWindow (url, title, options = {}) {
        if (typeof url === 'object') {
            options = url
            url = ''
        }
        options = { url, title, width: 600, height: 720, ...options }
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
        const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
        const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
        options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
        options.top = ((height / 2) - (options.height / 2)) + dualScreenTop
        const optionsStr = Object.keys(options).reduce((acc, key) => {
            acc.push(`${key}=${options[key]}`)
            return acc
        }, []).join(',')
        const newWindow = window.open(url, title, optionsStr)
        if (window.focus) {
            newWindow.focus()
        }
        return newWindow
    }
</script>

<style scoped>
    .login-container {
        padding: 0 18px;
    }
    .logo {
        width: 90px;
        height: 90px;
        margin: 30px auto 45px auto;
        background-color: #EEEEEE;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logo img {
         width: 70%;
     }
    .form-control {
        border: 1px solid #A1A1A1;
        height: 40px;
        width: 100%;
        padding: 0 18px;
        margin-bottom: 30px;
    }
    .form-control::placeholder {
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #A1A1A1;
    }
    .login-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .btn {
        height: 40px;
        width: 100%;
        border-radius: 5px;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
    .login-btn {
        background-color: #000000;
        margin-bottom: 20px;
    }
    .register-btn {
        background-color: #D4D4D4;
    }
    .login-social {
        margin-top: 20px;
        text-align: center;
    }
    .ulogin-group {
        margin: 15px 0;
    }
    .ulogin-item {
        display: inline-block;
        margin: 0 7px;
    }
    .ulogin-item img {
        height: 35px;
    }
</style>
