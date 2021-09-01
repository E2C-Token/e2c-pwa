<template>
  <div>     
    <div>
      <h3>Desejos de acesso</h3>
      <WishesTable />
    </div>    
  </div>
</template>
<script>
import WishesTable from "../components/WishesTable";

export default {
  name: "WishAccess",
  components: { WishesTable },
};
</script>
