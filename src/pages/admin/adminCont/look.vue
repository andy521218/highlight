<template>
  <div class="look diagnosis">
    <look-box :title="title.one"></look-box>
    <look-box :title="title.two"></look-box>
    <look-box :title="title.three"></look-box>
  </div>
</template>

<script>
import lookBox from "../../../components/lookBox";
export default {
  name: "look-diagnosis",
  components: {
    lookBox,
  },
  data() {
    return {
      title: {
        one: "望神色",
        two: "望局部",
        three: "望舌",
      },
      editShow: false,
    };
  },
};
</script>
