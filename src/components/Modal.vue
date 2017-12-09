<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <!--信息插槽-->
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <!--按钮插槽-->
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>
<style>

</style>
<script>
  export default{
//      来自父组件的值
    props:["mdShow"],
    data(){
      return{
        msg:'hello vue,This is Modal.Vue'
      }
    },
    methods:{
      closeModal(){
        this.$emit("close");
      }
    }
  }
</script>
