<template>
  <div class="message_forum">
    <discuss :dele="dele"> </discuss>
  </div>
</template>

<script>
import discuss from "../../components/discuss";

export default {
  name: "message-forum",
  data() {
    return {
      dele: false,
    };
  },
  components: {
    discuss,
  },
};
</script>
