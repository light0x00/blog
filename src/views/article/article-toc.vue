<template>
  <div class="markdown-toc"></div>
</template>

<script>
// import * as toc from 'markdown-toc'

export default {

  props:{rawText:{type:String}},

  created(){
    // let a =toc(this.rawText).json;
    // console.log(a)
  }

};
</script>

<style>
.markdown-toc {
  position: fixed;
  right: 10px;
  width: 300px;
  background-color: antiquewhite
}
</style>
