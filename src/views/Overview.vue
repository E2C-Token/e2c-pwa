<template>
  <div class="overview">
    <div class="container">
      <div>
        <AllEmissions />
      </div>     
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
};
</script>
<style scoped lang="scss"></style>
