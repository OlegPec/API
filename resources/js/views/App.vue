<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script>
    import MainLayout from "../layouts/MainLayout";
    import AuthLayout from "../layouts/AuthLayout";
  export default {
    name: "App.vue",
    computed: {
      layout() {
          return (this.$route.meta.layout || 'auth') + '-layout'
      }
    },
      components: {MainLayout, AuthLayout}
  }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    @keyframes opacity {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    .invalid {
        border-color: #F44336!important;
    }
    .form-control:focus.invalid {
        box-shadow: none;
        border-color: #F44336!important;
    }
</style>
