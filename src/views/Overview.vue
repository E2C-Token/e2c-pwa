<template>
  <div class="overview">
    <div class="container">
      <div>
        <AllEmissions />
      </div>
      <div class="row">
        <div class="col-sm">
          <EmmitTokens />
        </div>
        <!-- <div class="col-sm">
          <IntentionLiquidate />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import EmmitTokens from "../components/EmmitTokens";
// import IntentionLiquidate from "../components/IntentionLiquidate";
import AllEmissions from "../components/AllEmissions"
export default {
  name: "Overview",
  props: {
    msg: String,
  },
  components: {
    EmmitTokens,
    // IntentionLiquidate,
    AllEmissions
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
