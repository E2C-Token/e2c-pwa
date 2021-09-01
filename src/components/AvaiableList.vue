<template>
  <div class="card bg-warning">
      <h3 class="ml-3 mr-3 mb-1 mt-1">Para usufruto comum</h3>
    <table class="table table-hover">     
      <tbody class="bg-white">
        <tr v-for="(o, index) in avaiable" :key="index">          
          <td>{{ o.title }}</td>          
        </tr>      
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "AvaiableList",
  computed: {
    avaiable: function() {
      return this.$store.state.avaiable;
    },
  },
};
</script>