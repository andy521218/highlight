<template>
  <div class="prose_two">
    <div class="prose_two_left">
      <div class="prose_two_left_top">
        <div class="prose_two_left_top_title border_top">1.诊室自然环境</div>
        <div class="prose_two_left_top_main background_box">
          室内温度适宜，通风、采光良好。环境干净、整洁，无明显污迹，背景清新典雅。物品分类摆放，井然有序，各归其位。如果诊室卫生状况堪忧，物品摆放凌乱，会引发患者对医生的卫生专业资质和医疗思维是否存在混乱的疑忌。
        </div>
      </div>
      <div class="prose_two_left_bottom">
        <div class="prose_two_left_bottom_title border_top">1.诊室人文环境</div>
        <div class="prose_two_left_bottom_main background_box">
          诊疗环境设置要求私密性强，避免环境漏洞造成患者隐私泄露。在当前大陆中医诊室，一人就诊、多人围观的开放式诊疗环境非常普遍。开放式诊疗环境导致医患双方无法交流与病情相关的患者隐私，导致疾病漏诊误诊而影响疗效；有时患者之间因隐私保护问题发生纠纷；部分患者因隐私得不到保障而不予就医。为加强隐私保护，中医门诊就诊制度可参考CT、MRI等大型医疗仪器检查科室的工作流程，有条件的医疗机构可设立专门的医生助理或护士维持诊疗秩序，做到一人就诊，众人按秩序候诊，从而最大限度保护患者隐私。医务人员应平心静气、彬彬有礼地与非当前应诊患者沟通，说明尊重和保护患者隐私的重要性，敬请非应诊患者于诊室门外候诊，杜绝无关人等围观，形成中医门诊的规范性就诊流程。
        </div>
      </div>
    </div>
    <div class="prose_two_right"></div>
  </div>
</template>

<style lang="scss">
.prose_two {
  width: 100%;
  height: 100%;
  display: flex;
  .prose_two_left {
    width: 55%;
    height: 100%;
    .prose_two_left_top {
      width: 100%;
      height: 35%;
      .prose_two_left_top_title {
        width: 12.5em;
        background: rgb(90, 160, 250);
      }
      .prose_two_left_top_main {
        width: 100%;
        height: 79%;
        padding: 5% 5%;
        font-size: 1.15em;
        line-height: 2em;
        text-indent: 2em;
      }
    }
    .prose_two_left_bottom {
      margin-top: 3%;
      width: 100%;
      height: 50%;
      .prose_two_left_bottom_title {
        width: 12.5em;
        background: rgb(255, 121, 121);
      }
      .prose_two_left_bottom_main {
        width: 100%;
        height: 85%;
        padding: 3% 5% 3% 5%;
        font-size: 1.15em;
        line-height: 2em;
        text-indent: 2em;
      }
    }
  }
  .prose_two_right {
    background: url("../../assets/public/79a5362b245c1013ffb277acd2f8734.png")
      no-repeat center;
    background-size: 100% 100%;
    width: 44%;
    height: 70%;
    margin-left: 1%;
    margin-top: 5%;
  }
}
</style>