<template>
  <div class="message_forum">
    <discuss :dele="dele" :privateTopic="privateTopic"></discuss>
  </div>
</template>

<script>
import discuss from "../../components/discuss";

export default {
  name: "message-my",
  data() {
    return {
      dele: true,
      privateTopic: true,
    };
  },
  components: {
    discuss,
  },
};
</script>