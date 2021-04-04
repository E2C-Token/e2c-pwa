<template>
  <div class="overview">     
      
      <EmmitTokens />      
    
  </div>
</template>

<script>
import EmmitTokens from "../components/EmmitTokens";
export default {
  
  name: "Overview",
  props: {
    msg: String
  },
  components: {
    EmmitTokens
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
