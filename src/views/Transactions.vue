<template>
  <div>    
    <div>      
      <ReceivedActionsTable />
    </div>
    <div>      
      <WaitingToLiquidate />
    </div>
  </div>
</template>
<script>
import ReceivedActionsTable from "../components/ReceivedActionsTable"
import WaitingToLiquidate from "../components/WaitingToLiquidate"

export default {
  name: "Transactions",
  components: { ReceivedActionsTable, WaitingToLiquidate },
};
</script>
