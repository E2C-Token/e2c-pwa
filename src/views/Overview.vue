<template>
  <div class="overview">
    <div class="container">
      <div>
        <AllEmissions />
      </div>
      <div>      
        <ReceivedActionsTable />
      </div>
      <div>
        <EmissionsToLiquidate />
      </div>      
    </div>
  </div>
</template>
<script>
import AllEmissions from "../components/AllEmissions"
import ReceivedActionsTable from "../components/ReceivedActionsTable"
import EmissionsToLiquidate from "../components/EmissionsToLiquidate"
export default {
  name: "Overview",
  props: {
    msg: String,
  },
  components: { 
    AllEmissions,
    ReceivedActionsTable,
    EmissionsToLiquidate
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
