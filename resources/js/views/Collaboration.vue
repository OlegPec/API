<template>
<section class="collaboration">
    <Header />

    <ShareForm />
    <UsersList />
</section>
</template>

<script>
    import ShareForm from '../components/ShareForm'
    import UsersList from "../components/UsersList";
    import Header from "../components/Header"
    export default {
        name: "Collaboration.vue",
        components: {ShareForm, UsersList, Header},
    }
</script>

<style scoped>
    .collaboration {
        background-color: #ffffff;
    }
</style>
