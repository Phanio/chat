<template>
  <div id="app">
    <div class="banner">
      <h1>Chat Application</h1>
      <h3>Connected as : {{participantName}}</h3>
    </div>
    <ParticipantForm v-if="!showChatRoom" v-on:participantName="updateParticipantName" />
    <div v-else>
      <div id="salon-p">
         <Chat :participantName="participantName" v-on:clients='onlineClient'  />
      </div>
      <div id="list-p">
        <ParticipantList :clientOnline='clientOnline' />
      </div>
    </div>
  </div>
</template>

<script>
import ParticipantForm from "./components/ParticipantForm";
import ParticipantList from "./components/ParticipantList";
import Chat from "./components/Chat";
export default {
  name: "App",
  components: {
    ParticipantForm,
    ParticipantList,
    Chat
  },
  data() {
    return {
      participantName: null,
      showChatRoom: false,
      clientOnline:[]
    };
  },
  created() {},
  methods: {
    updateParticipantName(participantName) {
      this.participantName = participantName;
      this.showChatRoom = true;
    },
    onlineClient(client){
      this.clientOnline = [...client];
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
