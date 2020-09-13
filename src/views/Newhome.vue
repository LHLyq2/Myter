<template>
    <div class="nwehome">
        <div class="newhome-title">
            todos
        </div>
        
        <home></home>
    </div>
   
</template>

<script>
import home from "./Home"
import Homes from "./Homes.vue"
    export default {
        data(){
            return {

            }
        },
        methods: {

        },
        components: {
            home
        }
        
    }
</script>

<style lang="scss" scoped>
.nwehome{
    width: 400px;
    background-color: skyblue;
}
</style>