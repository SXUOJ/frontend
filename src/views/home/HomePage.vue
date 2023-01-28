<template>
    <div>
        123123
    </div>
</template>

<script>
 export default {
      data() {
        return {
          tableData: [],
          team:{A:[3.8,6.4,9.2,7.2],B:[9.6,6.8,5.4,4.4],C:[9.8,5.8,5,5.6],D:[10,6.6,4,4.6],E:[9,6,8.4,7.6],F:[4.2,5.2,8.2,8.6],G:[8.8,7.8,7,6.2],H:[9.4,7.4,4.8,8]},
          bteam:{A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],}
        }
      },
      methods: {
        benefit(){
            for (var key of this.team) {
                var sum=0;
                console.log(key);
                for ( var index =0;index<4;index++) {
                    sum = sum + key[index]
                }
                // this.bteam[].push(sum);
            }
        },
        victory(){

        }
      },
      onload(){
        this.benefit()
      }
    }
</script>