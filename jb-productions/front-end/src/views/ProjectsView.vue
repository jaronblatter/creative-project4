<template>
  <div>
    <h1>This is a list of current and past projects</h1>
    <ProjectsList :projects="projects"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectsList from '@/components/ProjectsList.vue'
export default {
  name: 'ProjectsView',
  components: {
    ProjectsList
  },
  computed: {
      projects() {
        return this.$root.$data.projects;
      }
    },
}
</script>
