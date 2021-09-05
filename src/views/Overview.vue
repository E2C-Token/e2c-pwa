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
                  <AllEmissions />
                </div>
              </div>
            </div>
          </div>
          <div class="accordion mb-3" id="intentions">
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    Aguardando Liquidação
                  </button>
                </h5>
              </div>
              <div
                id="collapseTwo"
                class="collapse show"
                aria-labelledby="headingTwo"
                data-parent="#intentions"
              >
                <div class="card-body">
                  <WaitingToLiquidate />
                </div>
              </div>
            </div>
          </div>      
          <div class="accordion mb-5" id="liquidat">
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#liquidate"
                    aria-expanded="true"
                    aria-controls="liquidat"
                  >
                    Liquidados
                  </button>
                </h5>
              </div>
              <div
                id="liquidate"
                class="collapse show"
                aria-labelledby="headingTwo"
                data-parent="#liquidat"
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
import AllEmissions from "../components/AllEmissions";
import Logistic from "../components/Logistic";
import WaitingToLiquidate from "../components/WaitingToLiquidate";
import WishesList from "../components/WishesList";
import AvaiableList from "../components/AvaiableList";
import Liquidated from "../components/Liquidated";
export default {
  name: "Overview",
  components: { AllEmissions, Logistic, WaitingToLiquidate, WishesList, AvaiableList, Liquidated },
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
