<template>
  <div>
    <h3>Ações sofridas</h3>
    <ReceivedActionsTable />
  </div>
</template>
<script>
//import TransactionsTable from "../components/TransactionsTable";
import ReceivedActionsTable from "../components/ReceivedActionsTable";
export default {
  name: "Transactions",
  components: { ReceivedActionsTable }
};
</script>
