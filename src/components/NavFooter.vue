<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__secondary">
        <div class="footer__inner">
          <div class="footer__region">
            <span>Language</span>
            <select class="footer__region__select">
              <option value="en-US">ENGLISH</option>
              <option value="zh-CN">Chinese</option>
            </select>
          </div>
          <div class="footer__secondary__nav">
            <span>Copyright © 2017-11 chxPu All Rights Reserved.</span>
            <a href="javascript:;">
              About Us
            </a>
            <a href="javascript:;">
              Terms &amp; Conditions
            </a>
            <a href="javascript:;">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return {
                title: 'this is footer',
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>
