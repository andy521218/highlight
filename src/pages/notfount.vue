<template>
    <div class="notfound">
        <img src="../assets/public/404.jpg" alt="" @click="$router.push('/')">
    </div>
</template>

<style lang="scss">
.notfound{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(196,196,196,0.2);
  img{
      max-width: 30%;
  }
}
</style>