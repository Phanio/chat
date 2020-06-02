<template>
  <div>
    <h2>Chat Messages</h2>
    <div v-for="message in messages" v-bind:key="message.id" style="margin-bottom:15px">
      <div v-if="message.author.id === user.id" style="width:75%;text-align:right">   
        <span class="chat-msg" >{{message.value}}</span>
      </div>
      <div v-else>    
        <span style="margin-right:10px" ><b>{{ message.author.name }}</b>  </span>
        <span class="chat-msg" >{{message.value}}</span>
      </div>
    </div>
    <div >
      <input style="width:60%" type="text" v-model="newmessage" />
      <button v-on:click="sendMessageToServer">SEND</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  components: {},
  data() {
    return {
      newmessage: "",
      messages:[],
      typing: false,
      online: [], 
      ready: false,
      info: [],
      connectionCount: 0,
      user: {},
    };
  },
  props: {
    participantName: String,
  },

  beforeDestroy() {
    this.$socket.emit("leaved", this.participantName);
  },

  created() {
    if (this.participantName) {
      this.$socket.emit("joined", this.participantName);
    }
 
  /*   this.$socket.on("noOfConnections", (count) => {
      this.connectionCount = count;
      console.log("account==", count);
    }); */

 /*    this.$socket.on("chat-message", (data) => {
      this.messages.push({ message: data.message, type: 1, by: data.user });
      this.typing = false;
    }); */

    this.$socket.on("typing", (data) => {
      console.log(data);
      this.typing = data;
    });
    this.$socket.on("stoptyping", () => {
      this.typing = false;
    });

 /*    this.$socket.on("leaved", (name) => {
      this.online.splice(this.online.indexOf(name));
      this.info.push({ name: name, type: "Leaved" });
      setTimeout(() => {
        this.info = [];
      }, 5000);
    }); */

    /*  this.$socket.on("joined", (clients) => {
      console.log(clients);

     // console.log("client==", this.online);
       this.$emit("clients", [...clients]);
    }); */
  },
  sockets: {
    joined: function(clients) {
      this.online = [...clients];
      const data = clients.filter((c) => c.name !== this.participantName);
      const user = clients.filter((c) => c.name === this.participantName);
      this.user = { ...user[0] };

      this.$emit("clients", [...data]);
    },
    chatmessage: function(message) {
      this.messages.push({ id:message.id, value: message.msg, author: {...message.author} });
      this.newmessage = "";
    },
    leaved: function(clients){
      this.online = [...clients];
      const data = clients.filter((c) => c.name !== this.participantName);
      const user = clients.filter((c) => c.name === this.participantName);
      this.user = { ...user[0] }; 
      this.$emit("clients", [...data]);
    },
    disconnect: function(clients){
      this.online = [...clients];
      const data = clients.filter((c) => c.name !== this.participantName);
      const user = clients.filter((c) => c.name === this.participantName);
      this.user = { ...user[0] }; 
      this.$emit("clients", [...data]);
    }
  },
  methods: {
    sendMessageToServer() {
      this.$socket.emit("chatmessage", {
        msg: this.newmessage,
        author: { ...this.user },
      });
    },
    isTyping() {
      this.$socket.emit("typing", this.participantName);
    },
    setName() {
      this.$socket.emit("joined", this.participantName);
      this.ready = true;
    },
  },
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
.chat-msg{
    border: 1px solid blue;
    border-radius: 10px;
    padding: 5PX;
}

</style>
