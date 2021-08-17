<template>   
    <div class="container">     
      <div class="row">        
       <WaitingToLiquidate />
      </div>      
    </div>
 
</template>
<script>
import WaitingToLiquidate from "../components/WaitingToLiquidate"
export default {
    name: "Liquidate",
    components: {WaitingToLiquidate}
}
</script>
<style scoped>
</style>