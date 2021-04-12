<template>
  <div>
    <div>      
      <AddWish />
    </div> 
    <div>
      <h3>Desejos de acesso</h3>
      <WishesTable />
    </div>    
  </div>
</template>
<script>
import WishesTable from "../components/WishesTable";
import AddWish from "../components/AddWish";

export default {
  name: "WishAccess",
  components: { WishesTable, AddWish },
};
</script>
