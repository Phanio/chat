<template>
  <div>
    <h2 style="font-size:20px">Online</h2>
    <ul v-for="c in clientOnline" v-bind:key="c.idBd">
      <li class="lip">
        <div class="moncercle"></div>
        {{ c.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ParticipantList",
  props: {clientOnline: Array},
  data() {
    return {
      participates: []
    };
  },
  created() {},
  
  methods: {
    
  }
};
</script>

<style scoped>
label,
input {
  display: block;
  margin-bottom: 10px;
}
.moncercle{
  background:#bfd70e;
  border-radius:50%;
  width:10px;
  height:10px;
  border:2px solid #679403; 
  margin-right: 10 px;
}
.lip{
  display: flex;
}
</style>
