<template>
  <div class="overview">
    <div class="container">
      <div>
        <AllEmissions />
      </div>
      <!-- <div class="row">        
       <WaitingToLiquidate />
      </div> -->
      
    </div>
  </div>
</template>
<script>
import AllEmissions from "../components/AllEmissions"
export default {
  name: "Overview",  
  components: { AllEmissions },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
    intention() {
      return this.$store.state.intentionLiquidation;
    }
  }
  // data() {
  //   return {
  //     user: {},
  //     intention: {}
  //   }
  // },
  // mounted() {
  //   this.user = this.state.userProfile;
  //   console.log(this.user);
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
