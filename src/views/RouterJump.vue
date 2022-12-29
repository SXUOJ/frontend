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
  },
    methods:{
        tiao(){
            this.$router.replace({
            path:'/NavigationPage'
            })
            // window.location.href('NavigationPage.vue')
        }
    }
}
</script>