<template>
    <div>
        {{ balance }}
    </div>
</template>
<script>
export default {
    name: "MyBalance",
    data() {
        return {
            tokens: [],
            userProfile: [],
            myTokens: []
        }
    },
    async mounted() {
       this.tokens = await this.$store.state.tokens;
       this.userProfile = await this.$store.state.userProfile;
    //    this.setMyTokens();
    },
    computed: {
        balance: function() {
            return this.tokens.amount;
        }
    }
    

}
</script>