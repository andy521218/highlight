<template>
  <div class="edit module">
    <div class="edit_title">
      <span class="title">提示</span>
      <span class="edit_switch" @click="$parent.module_show = false"></span>
    </div>
    <div class="module_box">
      <p class="module_desc">
        问诊按照主诉、现病史、既往史、个人史、月经史、婚育史、家族史顺序进行.
      </p>
    </div>

    <div class="module_box">
      <p class="module_desc">
        其中现病史按照发病情况【<i style="background: rgb(255, 167, 39)">22</i
        >】、 主症特点【<i style="background: rgb(254, 236, 74)">22</i>】、
        伴随症状及鉴别诊断症状【<i style="background: rgb(115, 213, 114)">22</i
        >】、 诊疗过程【<i style="background: rgb(36, 169, 245)">22</i>】、
        既往发作情况【<i style="background: rgb(150, 117, 206)">22</i>】、
        刻下症【<i style="background: rgb(0, 230, 255)">22</i>】、
        六个模块逐步问诊
      </p>
    </div>
  </div>
</template>



<style lang="scss">
.module_box {
  width: 80%;
  margin: 2em auto;

  .module_desc {
    text-indent: 2em;
    i {
      color: transparent;
    }
  }
}
</style>