<template>
    <nav class="header">
        <div class="nav-wrapper">
            <span class="header__title">{{header}}</span>

            <ul id="nav-mobile" class="header-navbar">
                <li class="burger" v-if="listRoute"><a href="#" @click.prevent="toggleNavigation"><img :src="'../images/menu.svg'" alt="menu"></a></li>
                <li class="burger" v-else-if="discountCardRoute"><a href="#" @click.prevent="toggleNavigation"><img :src="'../images/menu.svg'" alt="menu"></a></li>
                <li class="comeback" v-else><a href="#" @click.prevent="comeBack"><img :src="'../images/comeback.svg'" alt="comeback"></a></li>

                <li class="collaboration" v-show="listRoute"><a href="#" @click.prevent="goToCollaboration" class="user-group__btn"><img :src="'../images/share.svg'" alt="share"></a></li>
                <li class="sets" v-show="listRoute"><a class="settings__btn" @click.prevent="toggleSettingsBlock"><img :src="'../images/dots.svg'" alt="dots"></a></li>
                <li class="plus" v-show="discountCardRoute"><a class="settings__btn" @click.prevent="$router.push('/discountCardScan')"><img :src="'../images/plus-w.svg'" alt="dots"></a></li>

                <ul class="settings-dropdown" :class="{settings: getSettings}">
                    <li class="dropdown__item"><a href="#" @click.prevent="renameList">Переименовать</a></li>
                    <li class="dropdown__item" v-if="getLists.length > 1"><a href="#" @click.prevent="deleteList">Удалить список</a></li>
                    <li class="dropdown__item"><a href="#" @click.prevent="clearBought">Очистить купленное</a></li>
                </ul>
            </ul>
        </div>
    </nav>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    export default {

        name: "Header.vue",
        data: () => ({
        }),
        props: ['header'],
        computed: {
            ...mapGetters(['getComeBackBtn', 'getSettings', 'getLists']),
            listRoute() {
                return this.$route.path == `/list/${this.$route.params.id}`
            },
            discountCardRoute() {
                return this.$route.path == `/discountCards` && this.$auth.check()
            }
        },

        methods: {
            ...mapMutations(['toggleComeBackBtn', 'toggleAddProductForm', 'toddleNavigation', 'toggleSettings',
            'setCurrentHeader', 'setClearMarkedProductFromList']),
            ...mapActions(['removeList', 'updateList', 'clearMarkedProductFromList']),
            async toggleNavigation() {
                this.toddleNavigation(true)
                this.toggleSettings(false)
                if(this.$auth.check()) {
                    await this.$store.dispatch('fetchLists')
                }
            },
            toggleSettingsBlock() {
                this.getSettings ? this.toggleSettings(false) : this.toggleSettings(true)
            },
            comeBack() {
                if(this.$route.path === '/') {
                    this.toggleAddProductForm(false)
                }
                this.$router.back()
                this.toggleComeBackBtn(false)
            },
            goToCollaboration() {
                this.$router.push({name: 'collaboration', params: {listId: this.$route.params.id}})
                this.toggleComeBackBtn(true)
            },
            renameList() {
                this.updateList(this.$route.params.id)
                this.$router.back()
            },
            deleteList() {
                if(this.$auth.check()) {
                    this.$store.dispatch('removeList', this.$route.params.id)
                }
                this.removeList(this.$route.params.id)
                this.setCurrentHeader('Список покупок')
                this.$router.push('/')
            },
            clearBought() {
                if(this.$auth.check()) {
                    this.clearMarkedProductFromList(this.$route.params.id)
                } else {
                    this.setClearMarkedProductFromList(this.$route.params.id)
                }
                this.toggleSettings(false)
            }
        },
        mounted() {
            this.toddleNavigation(false)
            this.toggleSettings(false)
        },
    }
</script>

<style scoped>
    nav {
        background-color: white;
        box-shadow: none;
    }
    nav ul a {
        color: #1976d2;
    }
    .nav-wrapper {
        position: relative;
        width: 100%;
        height: 32px;
    }
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50px;
        width: 100%;
        background-color: #000000;
        padding: 9px;
    }
    .header-navbar {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        top: 0;
        left: 0;
        list-style-type: none;
        margin-bottom: 0;
        width: 100%;
        height: 100%;
    }
    .header__title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
        height: 100%;
        /*margin: 0 auto;*/
    }
    .burger,
    .user-group__btn,
    .settings__btn {
        cursor: pointer;
    }
    .collaboration,
    .plus {
        margin-left: auto;
    }
    .user-group__btn {
        margin-right: 5px;
    }
    .settings-dropdown {
        display: none;
        position: absolute;
        right: 10px;
        top: 30px;
        padding: 12px 15px;
        border-radius: 5px;
        background: white;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        z-index: 500;
        list-style-type: none;
    }
    .dropdown__item a {
        font-size: 12px;
        line-height: 14px;
        margin-bottom: 12px;
        font-weight: normal;
        color: black;
    }
    .settings {
        display: block;
    }
</style>
