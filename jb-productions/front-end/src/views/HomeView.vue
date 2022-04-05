<template>
  <div class="home">
    <img alt="Bodily Logo" src="../assets/bodily.png">
    <HelloWorld msg="Welcome to my project website"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

