<template>
<div class="wrapper">
  <div class="projects">
    <div class="project" v-for="item in items" :key="item.id">

        <h1>{{item.title}}</h1>
        <audio controls="controls" :src="item.path">
            Your browser does not support the HTML5 Audio element.
        </audio>
	<p>{{item.description}}</p>

    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProjectsList',
    data() {
    return {
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/tracks");
        this.items = response.data;
	console.log(this.items);
        return true;
      } catch (error) {
	console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.projects {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.project {
  margin: 10px;
  margin-top: 50px;
  width: 300px;
  justify-content: center;
}
.info {
  background: #F2921D;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}
.info h1 {
  font-size: 16px;
}
.info h2 {
  font-size: 14px;
}
.info p {
  margin: 0px;
  font-size: 10px;
}
.auto {
  margin-left: auto;
}
</style>
