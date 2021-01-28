<template>
  <div class="prose_three">
    <div class="prose_three_top">
      <div class="prose_three_top_left">
        <img
          src="../../assets/public/6ca5ec0d7561a3346e5b6a453c78ad7.png"
          alt=""
        />
      </div>
      <div class="prose_three_top_right">
        加强医患沟通，表达关爱友善。借助于脉诊信息，将脉诊和四诊有机融合，能够增加病人的信任程度，坚定患者治愈疾病的信心。我国目前处于“低度信任社会”时期，频发的医疗纠纷导致医患双方相互戒备，患着更加相信“朋友”、“熟人”而不是陌生的医务人员能够全心全意地帮助自己。因此，医生应站在患者角度，加强医患沟通；出于帮助病人度过难关的立场，表达自己的关爱友善；把病人视为自己的熟人、朋友，拉近双方距离，能够迅速地改善医患双方的信任程度，也为患者的诊疗服从性打下基础。
      </div>
    </div>
    <div class="prose_three_bottom">
      <div class="prose_three_bottom_left">
        <div class="prose_three_bottom_left_title border_top">
          1. 医生情绪及专注程度体现中医学的人文关怀
        </div>
        <div class="prose_three_bottom_left_main background_box">
          <p>（1）情绪稳定 （2）专心致志 全神贯注</p>
          <p>（3）医生的表情、动作、语言等细节体现中医学的人文关怀</p>
        </div>
      </div>
      <div class="prose_three_bottom_right">
        <div class="prose_three_bottom_right_title border_top">
          2. 诊室人文环境
        </div>
        <div class="prose_three_bottom_right_main background_box">
          （1）一视同仁 平等对待 （2）重视患者的心理体验
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.prose_three {
  width: 100%;
  height: 100%;
  .prose_three_top {
    width: 100%;
    height: 60%;
    display: flex;

    .prose_three_top_left {
      width: 30%;
      height: 100%;
      text-align: center;
      img {
        width: 70%;
        height: 100%;
      }
    }
    .prose_three_top_right {
      width: 70%;
      height: 100%;
      padding: 7% 5%;
      font-size: 1.15em;
      line-height: 2em;
      text-indent: 2em;
    }
  }
  .prose_three_bottom {
    margin-top: 2%;
    width: 96%;
    height: 36%;
    display: flex;
    justify-content: flex-end;
    .prose_three_bottom_left {
      width: 40%;
      height: 100%;
      margin-right: 5%;
      .prose_three_bottom_left_title {
        width: 100%;
        background: rgb(90, 160, 250);
      }
      .prose_three_bottom_left_main {
        width: 100%;
        height: 50%;
        padding: 5% 5%;
        font-size: 1.15em;
        line-height: 2em;
        text-indent: 2em;
      }
    }
    .prose_three_bottom_right {
      width: 40%;
      height: 100%;
      .prose_three_bottom_right_title {
        width: 100%;
        background: rgb(255, 121, 121);
      }
      .prose_three_bottom_right_main {
        width: 100%;
        height: 50%;
        padding: 5% 5%;
        font-size: 1.15em;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>