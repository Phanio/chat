<template>
  <div>
    <label for="participantNameInput">What is your name ?</label>
    <input type="text" id="participantNameInput" v-model="participantName" />
    <button v-on:click="participate">PARTICIPATE</button>
  </div>
</template>

<script>
export default {
  name: "ParticipantForm",
  components: {},
  data() {
    return {
      participantName: null
    };
  },
  created() {},
  methods: {
    participate() {
      this.$emit("participantName", this.participantName);
    }
  }
};
</script>

<style scoped>
label,
input {
  display: block;
  margin-bottom: 10px;
}
</style>
