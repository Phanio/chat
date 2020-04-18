<template>
  <div>
    <ul v-for="p in participants" v-bind:key="p.id">
      <li>
        <div class="triangle"></div>
        {{ p.username }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ParticipantList",
  props: {},
  data() {
    return {
      participates: []
    };
  },
  created() {},
   sockets: {
    event: function(data) {
      let user = {id:'',author:''};
     user ={...data}; 
      this.participates = this.participates.filter(p => p.id!==user.id);
        this.participates=[ {...user},...this.participates];
    }
  },
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
