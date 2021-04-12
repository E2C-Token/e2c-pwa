<template>
  <div>
    <div>
      <AddAvaiable />
    </div>
    <br />
    <br />
    <br />
    <div>
      <AvaiableTable />
    </div>
  </div>
</template>
<script>
import AddAvaiable from "../components/AddAvaiable";
import AvaiableTable from "../components/AvaiableTable";
export default {
  name: "Avaiable",
  components: { AddAvaiable, AvaiableTable },
};
</script>
