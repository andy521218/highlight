<template>
  <div class="case_look">
    <div class="main_mask" v-show="mask"></div>
    <case-option
      :option="option"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <case-complexion
      :option="option"
      v-if="complexion"
      @editcaseData="editcaseData"
    ></case-complexion>
   <look-option
      v-if="checkboxShow"
      @editcaseData="editcaseData"
      :option="option"
    ></look-option>
    <div class="case_layout teacher_case_look">
      <div class="case_left">
        <case-header></case-header>
        <main>
          <ul class="main_tab">
            <li
              v-for="(item, index) in tab"
              :key="index"
              class="item_title"
              @click="container(index)"
            >
              {{ item }}
              <div :class="{ active: typeId == index }"></div>
            </li>
            <i class="tips" @click="opneTips"></i>
          </ul>
          <div class="content scrollbar">
            <div class="content_scrollbar">
              <ul>
                <li><p>点击右侧空白处选择一个设置为正确选项:</p></li>
                <li
                  class="item_cont_border"
                  v-for="(item, index) in watchData"
                  :key="index"
                >
                  <div class="item_cont" @click="openOption(item)">
                    <p class="item_cont_title">{{ item.name }}</p>
                    <p class="item_cont_option">
                      {{ item.answer }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <div class="case_right">
        <div class="case_right_title">
          <span>添加图片</span>
        </div>
        <div class="case_right_cont">
          <div
            class="main_mask"
            :style="{ 'background-image': 'url(' + imgurl + ')' }"
          >
            <!-- <img :src="imgurl" accept="image/*" alt="" class="userlogo" /> -->
          </div>
          <div class="case_right_cont_upload">
            <div class="case_right_cont_upload_img">
              <img src="../../../assets/public/uploadImg1.png" alt="" />
              <span>请选择图片</span>
              <input type="file" ref="imgs" @change="importimg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import caseOption from "../edit/caseOption";
import caseHeader from "../edit/caseHeader";
import caseComplexion from "../edit/caseComplexion";
import LookOption from '../../usercore/case/LookOption'

export default {
  name: "edit-look",
  components: {
    caseOption,
    caseHeader,
    caseComplexion,
    LookOption
  },
  data() {
    return {
      tab: ["望神色形态", "望局部", "望舌"],
      caseId: "",
      imgs: "",
      typeId: "0",
      route: "",
      optionShow: false,
      option: "",
      watchData: "",
      imgurl: "",
      mask: false,
      complexion: false,
      checkboxShow:false
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getwatchdata();
    this.radioData = this.option.answer;
  },
  methods: {
    container(i) {
      this.typeId = i;
      this.getwatchdata();
    },

    opneTips() {
      this.tips = true;
    },
    openOption(e) {
      if (e.name == "望面色") {
        this.complexion = true;
        this.option = e;
        this.mask = true;
        return;
      }
       if (e.name == "望舌色"||e.name == "望舌形"||e.name == "望苔色"||e.name == "望苔质") {
        this.checkboxShow = true;
         this.option = e;
        this.mask = true;
        return
      }
      this.option = e;
      this.optionShow = true;
      this.mask = true;
    },
    importimg() {
      this.imgs = this.$refs.imgs.files[0];

      let fileExample = new FileReader();
      fileExample.readAsDataURL(this.imgs);
      fileExample.onload = (ev) => {
        this.imgurl = ev.target.result;
      };

      let imgsData = new window.FormData();
      imgsData.append("file", this.imgs);

      this.upload.post("/upload", imgsData).then((res) => {
        let url = res.data;
        this.axios
          .put(
            `/case/manage/${this.caseId}/watch/${
              this.typeId
            }/pic?${this.qs.stringify({ url: url })}`
          )
          .then((res) => {
            if (res.code == "000000") {
              this.$Message.warning("操作成功!");
            } else {
              alert("添加失败,请刷新查看结果!");
            }
          });
      });
    },
    editcaseData() {
      this.axios
        .put(
          `/case/manage/${this.caseId}/watch/${this.typeId}/${
            this.option.id
          }?${this.qs.stringify({
            answer: this.$children[1].radioData,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("编辑成功!");
            this.optionShow = false;
            this.complexion = false;
             this.checkboxShow = false;
            this.mask = false;
            this.getwatchdata();
          }
        });
    },
    getwatchdata() {
      this.axios
        .get(`/case/manage/${this.caseId}/watch/${this.typeId}`)
        .then((res) => {
          this.watchData = res.data.list;
          if (/localhost/.test(res.data.url)) {
            this.imgurl = res.data.url.replace(/localhost/, "101.132.150.87");
          } else {
            this.imgurl = this.$url + res.data.url;
          }
        });
    },
  },
};
</script>

<style lang="scss">
.teacher_case_look {
  .case_right {
    .case_right_cont {
      height: 85%;
      width: 90%;
      position: relative;
      z-index: 98;
      .main_mask {
        background: no-repeat center;
        background-size: contain;
        .userlogo {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .case_right_cont_upload {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .case_right_cont_upload_img {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          flex-direction: column;
          position: relative;
          z-index: 99999;
          // color: rgb(255, 255, 255);
          img {
            width: 48px;
            height: 40px;
          }
          input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>
