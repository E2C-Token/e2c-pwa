<template>
  <div class="overview">
    <div class="row">
      <div class="col-9">        
          <div class="accordion mb-3" id="emissions">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Reconhecimentos
                  </button>
                </h5>
              </div>
              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#emissions"
              >
                <div class="card-body">
                  <Emissions />
                </div>
              </div>
            </div>
          </div>              
          <div class="accordion mb-5" id="liquidated">
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#liquidated"
                    aria-expanded="true"
                    aria-controls="liquidated"
                  >
                    Liquidados
                  </button>
                </h5>
              </div>
              <div
                id="liquidate"
                class="collapse show"
                aria-labelledby="headingTwo"
                data-parent="#liquidated"
              >
                <div class="card-body">
                  <Liquidated />
                </div>
              </div>
            </div>
          </div>      
      </div>      
      <div class="col-3">
        <div class="mb-5">
          <Logistic />
        </div>
        <div class="mb-5">
          <AvaiableList />
        </div>
        <div class="mb-5">
          <WishesList />
        </div>

      </div>      
    </div>
  </div>
</template>
<script>
import Emissions from "../components/Emissions";
import Logistic from "../components/Logistic";
import WaitingToLiquidate from "../components/WaitingToLiquidate";
import WishesList from "../components/WishesList";
import AvaiableList from "../components/AvaiableList";
import Liquidated from "../components/Liquidated";
export default {
  name: "Overview",
  components: { Emissions, Logistic, WaitingToLiquidate, WishesList, AvaiableList, Liquidated },
  computed: {
    userProfile() {
      return this.$store.state.userProfile.uid;
    },
    intention() {
      return this.$store.state.intentionLiquidation;
    },
    liquidated() {
      return this.$store.state.liquidations;
    }
  },
};
</script>
<style scoped lang="scss"></style>
