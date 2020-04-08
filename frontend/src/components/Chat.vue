<template>
  <div>
    <h2>Chat Messages</h2>
    <div>
      <input type="text" v-model="messageToSent" />
      <button v-on:click="sendMessageToServer">SEND</button>
    </div>
    <div v-for="message in messages" v-bind:key="message.id">
      <h3>{{ message.author }}</h3>
      <p>{{ message.value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  components: {},
  data() {
    return {
      messages: [],
      messageToSent: null
    };
  },
  props: {
    participantName: String
  },
  created() {},
  sockets: {
    event: function(data) {
      this.messages = [...this.messages, { ...data }];
    }
  },
  methods: {
    sendMessageToServer() {
      this.$socket.emit("event", {
        author: this.participantName,
        value: this.messageToSent
      });
    }
  }
};
</script>

<style scoped>
h3 {
  color: blue;
  margin-bottom: 0;
}
p {
  margin-top: 5px;
}
button {
  margin-left: 10px;
}
</style>
