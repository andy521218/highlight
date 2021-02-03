<template>
  <div class="home">
    <header class="home_header">
      <logo :index="index"></logo>
      <user></user>
    </header>
    <ul class="case_type">
      <li
        :class="{ active: active_index == index }"
        v-for="(item, index) in list"
        :key="index"
        @click="getCaseData('1', item.id, index)"
      >
        <span :class="{ border_none: active_index + 1 == index }">{{
          item.name
        }}</span>
      </li>
    </ul>
    <div class="case_user_main">
      <ul>
        <li
          class="case_user_item"
          v-for="(item, index) in caseData"
          :key="index"
        >
          <div class="case_user_item_box" @click="examStart(item)">
            <img :src="$url + item.picUrl" alt="" class="caseimg_logo" />
            <div class="case_current">
              <span>姓名:{{ item.name }}</span>
              <span style="text-align: right"
                >性别:{{ item.gender ? "男" : "女" }}</span
              >
              <span>年龄:{{ item.age }}</span>
            </div>
            <div class="case_active">
              <button class="train_btn">进入训练</button>
              <span class="totlal_second">累计学习:{{ item.count }}次</span>
            </div>
          </div>
        </li>
      </ul>
      <main-itps v-show="main_show" style="margin-top: 0"></main-itps>
      <turn-page
        v-show="total > size"
        :totaltotal="Number(total)"
        :size="Number(size)"
        @getData="getCaseData"
      ></turn-page>
    </div>
  </div>
</template>

<script>
import mainItps from "../../../components/mainItps";
import user from "../../../components/user";
import turnPage from "../../../components/turnPage";
import logo from "../../../components/logo";
export default {
  name: "case-home",
  components: {
    user,
    turnPage,
    mainItps,
    logo,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "心系病",
        },
        {
          id: 2,
          name: "肝系病",
        },
        {
          id: 3,
          name: "脾胃病",
        },
        {
          id: 4,
          name: "肺系病",
        },
        {
          id: 5,
          name: "肾系病",
        },
      ],
      total: "10",
      size: "10",
      page: "1",
      caseData: {},
      main_show: false,
      index: false,
      active_index: "-1",
    };
  },
  mounted() {
    this.getCaseData();
    localStorage.removeItem("caseMenuId");
    localStorage.removeItem("askedArr");
    localStorage.removeItem("pressItemData");
  },
  methods: {
    getCaseData(page = "1", id = "", index) {
      this.axios
        .get("/case", {
          params: {
            diseaseType: id,
            size: this.size,
            page: page,
          },
        })
        .then((res) => {
          if (!res.data.rows) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
          this.active_index = index;
          this.caseData = res.data.rows;
          this.total = res.data.total;
        });
    },
    examStart(e) {
      localStorage.setItem("caseId", e.caseId);
      this.axios.post(`/train/${e.caseId}`).then((res) => {
        if (res.code == "000000") {
          localStorage.setItem("examNo", res.data.examNo);
          this.$router.push("userask");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.case_type {
  height: 10%;
  width: 36%;
  margin-left: 5%;
  border: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  color: rgb(111, 147, 251);
  font-size: 1.2em;
  font-weight: bold;
  li {
    height: 57%;
    flex: 1;
    background: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span {
      text-align: center;
      width: 95%;
      border-left: rgb(111, 147, 251) 2px solid;
    }
    &:hover {
      background: rgb(111, 147, 251);
      color: rgb(255, 255, 255);
      span {
        border-color: rgb(111, 147, 251);
      }
    }
  }
  .active {
    background: rgb(111, 147, 251);
    color: rgb(255, 255, 255);
  }
  .border_none {
    border-color: rgb(255, 255, 255);
  }
  li:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    span {
      border: none;
    }
  }
  li:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
}
</style>