<template>
  <div id="app">
    
  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app{
  width:1200px;
  margin:0 auto;
}
  @media screen and (max-width:1200px){
    body{
      height:auto;
    }
  #app{
    width:auto;
    margin:0 auto;
    padding: 0 10px;
  }
}
</style>
