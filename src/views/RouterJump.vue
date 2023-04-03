<template>
    <div>
        <div>
            <topbar></topbar>
            <router-view></router-view>
        </div>
    </div>
    
    
</template>

<script>
import topbar from '@/components/TopBar.vue'
export default{
    beforeCreate () {
        if(this.$store.state.token == ""){
            alert("请登入后在浏览")
            this.$router.replace('/');
        }
    },
    components: {
        topbar
  }
}
</script>

<style>
body {
    background:none !important;
    display:block !important;
  }
</style>