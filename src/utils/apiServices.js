export default function emmitTokens(payload) {
    this.$store.dispatch("emmitTransaction", payload);
}