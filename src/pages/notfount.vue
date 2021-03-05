<template>
  <div class="notfound">
    <div class="notfound_left">
      <img src="../assets/public/404.png" alt="" @click="$router.push('/')" />
    </div>
    <div class="notfound_right">
      <h2 class="title">OOPS!</h2>
      <p class="text">
        The webmaster said that you can not enter this page...
      </p>
      <p class="text_desc">
        Please check that the URL you entered is correct, or click the button
        below to return to the homepage
      </p>
      <button @click="$router.push('/')">返回首页</button>
    </div>
  </div>
</template>

<style lang="scss">
.notfound {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(196, 196, 196, 0.2);
  .notfound_left {
    height: 50%;
    flex: 1;
    text-align: right;
    img {
      max-width: 62%;
    }
  }
  .notfound_right {
    height: 50%;
    flex: 1;
    .title {
      font-size: 2rem;
      color: #1482f0;
    }
    .text {
      margin-top: 2rem;
      width: 30%;
      font-size: 1.2rem;
      line-height: 24px;
      color: #222;
      font-weight: bold;
    }
    .text_desc {
      margin-top: 2rem;
      width: 30%;
      font-size: 1rem;
      color: grey;
    }
    button {
      margin-top: 3rem;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      border: none;
      cursor: pointer;
      outline: none;
    }
  }
}
</style>
