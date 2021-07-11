<template>
  <div>
      <h3>Disponível para usufruto comum</h3>
    <table class="table table">
      <thead>
        <tr>          
          <th scope="col">Nome</th>
          <th scope="col">Disponibilizou</th>          
          <th scope="col">Descrição</th>          
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(o, index) in avaiable" :key="index">          
          <td>{{ o.fromName }}</td>
          <td>{{ o.title }}</td>
          <td>{{ o.description }} </td>          
        </tr>      
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "AvaiableTable",
  computed: {
    avaiable: function() {
      return this.$store.state.avaiable;
    },
  },
};
</script>