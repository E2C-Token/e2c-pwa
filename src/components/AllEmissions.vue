<template>
    <div>
        <p v-for="(i,index) in allEmissions" :key="index">{{ i.fromName }} >>> {{ i.name }}</p>
    </div>
</template>
<script>
export default {
    name: "AllEmissions",
    computed: {
        allEmissions() {
            return this.$store.state.tokens;
        } 
    }
}
</script>