<template>
<div class="user-list">
    <form class="user-list-form">
        <input placeholder="Введите имя, почту пользователя" v-model="keywords" class="searchUser" :disabled="!$auth.check()">
        <p class="auth-desc" v-if="!$auth.check()">
            Прикрепление пользователей к списку доступно только авторизованным пользователям
        </p>
        <p v-if="searchError">Пользователь не найден</p>
        <ul v-if="results.length > 0" class="user-searched-list">
            <li v-for="result in results" :key="result.id" class="user-searched__item"
                @click="selectUser(result.id)">
               <span class="user__img">
                <img :src="'../images/default-foto.svg'" alt="default">
            </span>

            <div class="user-title-block">
                <p class="user__title">{{result.name}}</p>
                <p class="user__email">{{'@' + result.email}}</p>
            </div>
            </li>
        </ul>
    </form>
    <section class="cap" v-if="results.length > 0" @click="closeSearchedList"></section>

    <ul>
        <li v-for="user in users" :key="user.id" class="user__item">
            <span class="user__img">
                <img :src="'../images/default-foto.svg'" alt="default">
            </span>

            <div class="user-title-block">
                <p class="user__title">{{user.name}}</p>
                <p class="user__email">{{'@' + user.email}}</p>
            </div>
            <span class="user__btn" @click="deleteUser(user.id)"><img :src="'../images/close.svg'" alt="close"></span>
        </li>
    </ul>


</div>
</template>

<script>
    //todo: Lazy on input
    import {mapGetters, mapActions} from 'vuex'
    import http from '../http'
    export default {
        name: "UsersList.vue",
        data() {
            return {
                keywords: null,
                results: [],
                searchError: false,
                // usersInList: []
            }
        },
        watch: {
            keywords(after, before) {
                // console.log(after)
                if(!!after) {
                    this.fetch();
                } else {
                    this.searchError = false
                    this.results = 0
                }
            }
        },
        computed: {
            users() {
                return this.getUsers()
            }
        },
        methods: {
            ...mapGetters(['getUsers', 'getCurrentList', 'getLists']),
            ...mapActions(['fetchLists']),
            deleteUser(id) {
                http.delete('api/user/collaboration', {data: {
                        list_id: this.getCurrentList(),
                        user_id: id
                    }})
                    .then(response => {
                        this.fetchLists()
                    })
                    // .then(response => {
                    //     this.usersInList = this.getLists()
                    // })
            },
            fetch() {
                http.get('api/user/search', { params: {
                    query: this.keywords,
                    list_id: this.getCurrentList(),
                    } })
                    .then(response => {
                        this.searchError = false
                        this.results = response.data.data
                    })
                    .catch(res => {
                        this.searchError = true
                        this.results = 0
                    });
            },
            selectUser(userId) {
                this.keywords = ''
                this.results = 0
                http.put('api/user/collaboration', {
                    list_id: this.getCurrentList(),
                    user_id: userId
                })
                .then(response => {
                    this.fetchLists()
                })
                // .then(response => {
                //     this.usersInList = this.getLists()
                // })
                .catch(error => console.log(error));

            },
            closeSearchedList() {
                this.results = 0
            }
        }
    }
</script>

<style scoped>
    .cap {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0);
        z-index: 100;
    }
    .user-list-form {
        position: relative;
        padding: 15px 18px;
        border-bottom: 1px solid #eeeeee;
        border-top: 1px solid #eeeeee;
        z-index: 200;
    }
    .user-list-form input {
        width: 100%;
        border: 1px solid #A1A1A1;
        box-sizing: border-box;
        border-radius: 5px;
        height: 40px;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        padding-left: 10px;
    }
    .user-list-form input::placeholder{
        font-size: 12px;
        line-height: 14px;
        color: #A1A1A1;
        padding-left: 8px;
    }
    .user-searched-list {
        width: calc(100% - 36px);
        border: 1px solid #A1A1A1;
        box-sizing: border-box;
        border-radius: 5px;
        height: 250px;
        overflow-y: auto;
        list-style-type: none;
        margin-top: 5px;
        position: absolute;
        background-color: white;
    }
    .user-searched__item {
        padding: 10px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
    }
    .user__item {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        height: 50px;
    }
    .user__img {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        width: 30px;
        height: 30px;
        background-color: #D4D4D4;
        border-radius: 100%;
    }
    .user__img img {
        width: 20px;
        height: 20px;
    }
    .user__title {
        font-size: 12px;
        line-height: 14px;
        color: #000000;
        margin-bottom: 3px;
    }
    .user__email {
        font-size: 10px;
        line-height: 12px;
        color: #A1A1A1;
        margin: 0;
    }
    .user__btn {
        margin-left: auto;
        cursor: pointer;
    }
    .auth-desc {
        text-align: center;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #A1A1A1;
        margin: 12px 0 14px 0;
    }
</style>
