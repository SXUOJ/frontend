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
import { mapMutations } from 'vuex';
export default{
    methods:{
      ...mapMutations(['changeUserGroup']),
    },
    beforeCreate () {
        if(this.$store.state.token == ""){
            alert("请登入后在浏览")
            this.$router.replace('/');
        }
        var _this = this;
        this.$axios({
                method: 'get',
                url: '/api/user/get_user_info',
            }).then(res => {
                console.log(res);
                var usergroup = res.data.info.usergroup;
                // 将用户组保存到vuex中
                _this.changeUserGroup({ usergroup: usergroup });
            }).catch(error => {
                alert('获取用户信息失败');
                console.log(error);
            });
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