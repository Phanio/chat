<template>
  <div id="app">
    <h1>Chat Application</h1>
    <Chat :participantName="participantName" v-if="showChatRoom" />
    <ParticipantForm v-else v-on:participantName="updateParticipantName" />
  </div>
</template>

<script>
import ParticipantForm from "./components/ParticipantForm";
import Chat from "./components/Chat";
export default {
  name: "App",
  components: {
    ParticipantForm,
    Chat
  },
  data() {
    return {
      participantName: null,
      showChatRoom: false
    };
  },
  created() {},
  methods: {
    updateParticipantName(participantName) {
      this.participantName = participantName;
      this.showChatRoom = true;
    }
  }
};
</script>

<style>
#app {
  width: 800px;
  margin: auto;
}
</style>
