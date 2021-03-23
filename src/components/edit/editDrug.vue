<template>
  <div class="edit_drug">
    <div class="edit">
      <div class="edit_title">
        <span class="title">药材库</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <div class="durg_warp">
        <div class="durg_left">
          <div class="durg_title">
            <span>常见方剂</span>
          </div>
          <div class="search scrollbar">
            <input
              type="text"
              class="text_box"
              v-model="searchDisease"
              style="border-bottom:none"
              @focus="focusName(1)"
              @blur="timerDiseaseout(1)"
            />
            <div
              class="search_down"
              :style="{
                'border-top': diseaseNameShow
                  ? '1px solid rgb(111,147,251)'
                  : 'none',
              }"
            >
              <div class="search_down_cont" v-show="diseaseNameShow">
                <div
                  class="search_item"
                  v-for="(item, index) in agentia"
                  :key="index"
                  @click="diseaseVal(item, 1)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="drug_item scrollbar">
              <ul class="scrollbar">
                <li>方剂:{{ durgData.name }}</li>
                <li v-for="(item, index) in durgData.description" :key="index">
                  方剂组成:{{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="durg_right">
          <div class="durg_title">
            <span>常见方药</span>
          </div>
          <div class="search scrollbar">
            <input
              type="text"
              class="text_box"
              v-model="search"
              style="border-bottom:none"
              @focus="focusName(2)"
              @blur="timerDiseaseout(2)"
            />
            <div
              class="search_down"
              :style="{
                'border-top': searchShow
                  ? '1px solid rgb(111,147,251)'
                  : 'none',
              }"
            >
              <div class="search_down_cont" v-show="searchShow">
                <div
                  class="search_item"
                  v-for="(item, index) in druggery"
                  :key="index"
                  @click="diseaseVal(item, 2)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="drug_item scrollbar">
              <ul class="scrollbar">
                <li>
                  <span>方剂名称:</span>
                  <p>{{ agentiaData.name }}</p>
                </li>
                <li><span>方药别名:</span> {{ agentiaData.alias }}</li>
                <li>
                  <span>方药用法:</span>
                  <p>{{ agentiaData.notice }}</p>
                </li>
                <li>
                  <span>注意事项:</span>
                  <p>{{ agentiaData.usage }}</p>
                </li>
                <li>
                  <span>方药图片:</span>
                </li>
                <li>
                  <img :src="$url + agentiaData.picUrl" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchDisease: "",
      search: "",
      durgData: "",
      agentiaData: "",
      diseaseNameShow: false,
      searchShow: false,
      agentia: "",
      druggery: "",
    };
  },
  mounted() {
    this.getAgentia();
    this.getDruggery();
  },
  methods: {
    close() {
        this.$parent.drugShow=false
    },
    getAgentia() {
      this.axios
        .get("/meta/herb/agentia", {
          params: {
            page: 1,
            size: 500,
          },
        })
        .then((res) => {
          this.durgData = res.data.rows[0];
          this.durgData.description = res.data.rows[0].description.split(",");
        });
    },
    getDruggery() {
      this.axios
        .get("/meta/herb/druggery", {
          params: {
            page: 1,
            size: 500,
          },
        })
        .then((res) => {
          this.agentiaData = res.data.rows[0];
        });
    },
    diseaseVal(item, type) {
      if (type == 1) {
        this.searchDisease = item.name;
        this.durgData.name = item.name;
        this.durgData.description = item.description.split(",");
        return;
      }
      this.search = item.name;
      this.agentiaData = item;
    },
    //获取焦点查询
    focusName(type) {
      if (type == 1) {
        this.diseaseNameShow = true;
        this.axios
          .get("/meta/herb/agentia", {
            params: {
              name: this.searchDisease,
            },
          })
          .then((res) => {
            this.agentia = res.data.rows;
          });
        return;
      }
      if (type == 2) {
        this.searchShow = true;
        this.axios
          .get("/meta/herb/druggery", {
            params: {
              name: this.search,
            },
          })
          .then((res) => {
            this.druggery = res.data.rows;
          });
      }
    },
    timerDiseaseout(type) {
      setTimeout(() => {
        if (type == 1) {
          this.diseaseNameShow = false;
        } else {
          this.searchShow = false;
        }
      }, 500);
    },
  },
  watch: {
    searchDisease: function() {
      this.focusName(1);
    },
    search: function() {
      this.focusName(2);
    },
  },
};
</script>

<style lang="scss">
.edit_drug {
  .durg_warp {
    display: flex;
    width: 100%;
    margin: 15px auto;
    .durg_left,
    .durg_right {
      .durg_title {
        color: #6f93fb;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        height: 40px;
      }
      flex: 1;
      height: 500px;
      border-right: 1px solid #6f93fb;
      .search {
        width: 90%;
        margin: 0 auto;
        .search_down {
          width: 100%;
        }
        .text_box {
          width: 100%;
        }
        .drug_item {
          height: 420px;
          overflow-y: auto;
        }
        ul {
          li {
            align-items: flex-start;
            span {
              width: 65px;
            }
            p {
              word-wrap: break-word;
              width: 130px;
            }
            img {
              max-width: 195px;
            }
          }
        }
      }
    }
  }
}
</style>
