<template>
  <div id="app">
    <router-view />
    <div class="footer"><a href="https://www.cnblogs.com/wskb/" target="blank">了解健身，从这里开始</a></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "nice 兄嘚"
    };
  }
};
</script>

<style>
#app {
  background-color:	#C0C0C0;
    height: 100%;
    background-image: url(./router/cat.jpg);
}
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.footer {
  /* position: absolute;
  
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #FF9966;
  z-index: 9999; */
  /* height: 100%;
  background-image: url(./router/cat.jpg) */
  /* height: 100px; */
  
  margin-top: 10%;
  /* background-color:	#C0C0C0; */
  /* align-content: center; */
  text-align: center
}

</style>
