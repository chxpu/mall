<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <!--插槽，接收父组件中传入的内容-->
        <a href="/"><slot name="homeChild"></slot></a>
        <!--<span>Goods</span>-->
      </nav>
    </div>
  </div>
</template>

<script>

    export default{
        data(){
            return {
                title: 'this is NavBreadComponent',
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>
