<template>
  <div>   
    <div>      
      <WaitingToLiquidate />
    </div>
    <br />
    <br />
    <div>      
      <EmmitTokens />
    </div>
  </div>
</template>
<script>
import WaitingToLiquidate from "../components/WaitingToLiquidate"
import EmmitTokens from "../components/EmmitTokens"
export default {
  name: "Transactions",
  components: { WaitingToLiquidate, EmmitTokens }
};
</script>
