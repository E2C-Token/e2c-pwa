<template>
    <div>
        {{ balance }} E2C
    </div>
</template>
<script>
export default {
    name: "MyBalance",
    data() {
        return {
            tokens: [],
            userProfile: [],
            myTokens: [],
            myBallance: 0
        }
    },
    async mounted() {
       this.userProfile = await this.$store.state.userProfile.name;
       this.tokens = await this.$store.state.tokens.filter(token => token.toName === this.userProfile);   
    },
    computed: {
        balance: function() {
            return this.tokens.reduce((a, b) => {
            return a + b.currentAmount;      
            }, 0);
        }
    }
    

}
</script>