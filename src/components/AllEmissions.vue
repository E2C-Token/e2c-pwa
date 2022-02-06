<template>
  <div>
    <h4>Todos os Reconhecimentos</h4>
    <table class="table table-hover">
      <thead>        
        <tr>
          <th scope="col">Quem reconheceu</th>
          <th scope="col">Quem recebeu</th>
          <th scope="col">Descrição</th>          
          <th scope="col">Quantidade</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(i,index) in allEmissions" :key="index"       
        >
          <td>{{ i.fromName }}</td>
          <td>{{ i.toName }}</td>
          <td>{{ i.description }}</td>          
          <td>{{ i.initialAmount }}</td>
        </tr>
      </tbody>
    </table>
    <div class="chart">
      <canvas id="chart"></canvas>
    </div>   
  </div>
</template>
<script>
import { Chart, LinearScale } from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";

Chart.register(LinearScale, SankeyController, Flow);

export default {
  name: "AllEmissions",
  mounted: function() {
    var ctx = document.getElementById("chart").getContext("2d");

    var colors = {
      Emissions: "blue",
      Liquidations: "orange",  
    };

    function getColor(name) {
      return colors[name] || "green";
    }

    new Chart(ctx, {
      type: "sankey",
      data: {
        datasets: [
          {
            data: [
              { from: 'Emissions', to: 'Liquidations', flow: 15 }  
            ],
            colorFrom: c => getColor(c.dataset.data[c.dataIndex].from),
            colorTo: c => getColor(c.dataset.data[c.dataIndex].to)
          }
        ]
      }
    });
  },
  computed: {
    allEmissions() {
      return this.$store.state.tokens;
    },
    allLiquidations() {
      return this.$store.state.liquidations;
    }
  },
};
</script>
