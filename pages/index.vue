<template>
  <div>Honeybadger sourcemaps example with nuxt .v2</div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    this.errorExample()
  },
  methods: {
    errorExample() {
      try {
        throw new Error('Honeybadger sourcemaps example with nuxt .v2')
      } catch (error) {
        this.$honeybadger.notify(error)
      }
    }
  }
}
</script>

<style>
html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  background: black;
  color:aliceblue;
  font-weight: bold;
  line-height: 120%;
}
</style>
