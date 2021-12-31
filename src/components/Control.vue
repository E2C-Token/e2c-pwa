<template>
    <div>
        <h2>Admin</h2>
        <p>Aqui voce deve ter controle total sobre a aplicação</p>
        <button class="btn btn-primary mb-3 mr-3" @click="addEmission()">
          Reconhecer
        </button>
        <button class="btn btn-primary mb-3" @click="liquidate()">
          Liquidar
        </button>
    </div>
</template>
<script>
import EmmitTokens from "./EmmitTokens";
export default {
    name: "Admin",
    components: {
        EmmitTokens
    },
    data() {
        return {
            token: null,
            amount: null,
            descricao: null,
            quemRecebe: null,
            email: null
        };
    },
    methods: {
        addEmission() {
            this.$store.dispatch("addEmission", {
                amount: this.amount,
                descricao: this.descricao
            });
            this.amount = null;
            this.descricao = null;
        },
        liquidate() {
            this.$store.dispatch("liquidate");
        }
    },
    
};
</script>