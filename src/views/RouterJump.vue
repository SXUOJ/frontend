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
    components: {
        topbar
  }
}
</script>

<style>
body {
    background:none !important;
    display:block !important
  }
</style>