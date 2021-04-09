<template>
  <div>
    <div>
      <h3>Ações sofridas</h3>
      <ReceivedActionsTable />
    </div>
    <div>
      <h3>Notificações de Intenção de Liquidação</h3>
      <WaitingToLiquidate />
    </div>
  </div>
</template>
<script>
import ReceivedActionsTable from "../components/ReceivedActionsTable";
import WaitingToLiquidate from "../components/WaitingToLiquidate"
export default {
  name: "Transactions",
  components: { ReceivedActionsTable, WaitingToLiquidate },
};
</script>
