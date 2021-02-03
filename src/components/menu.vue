<template>
  <div class="user_menu">
    <div
      class="admin_menu_item"
      v-for="(item, index) in menuData"
      :key="index"
      v-show="item.title != '修改密码' && item.title != '个人信息'"
    >
      <p :class="{ active: menuId == index }" @click="oneRouting(index)">
        {{ item.title }}
      </p>
      <ul :class="{ show: menuId == index }">
        <li v-for="(item, i) in item.item" :key="i">
          <div class="menu_two_item" :class="{ color: i == colorIndex }">
            <i></i>
            <span @click="twoRouting(index, i)">{{ item }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "user-home",
  data() {
    return {
      colorIndex: "0",
      menuData: [],
      authority: "",
    };
  },
  computed: {
    ...mapState([
      "adminMenu",
      "teacherMenu",
      "stuedntMenu",
      "menuId",
      "messageMenu",
    ]),
  },
  mounted() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      if (this.$store.state.menuId == "-1") {
        this.$store.state.menuId = localStorage.getItem("bgindex");
      }
      this.axios.get("/users/current").then((res) => {
        if (res.code == "000000") {
          localStorage.setItem("authority", res.data.authority);
          this.authority = res.data.authority;
          if (res.data.authority == "ADMIN") {
            this.menuData = this.adminMenu;
            return;
          }
          if (res.data.authority == "TEACHER") {
            this.menuData = [];
            if (/message/.test(window.location)) {
              this.menuData.push(this.messageMenu[0]);
              this.menuData.push(this.messageMenu[3]);
              return;
            }
            if (
              /teacher/.test(window.location) ||
              /examanalysis/.test(window.location) ||
              /trainanalysis/.test(window.location) ||
              /ask/.test(window.location) ||
              /watch/.test(window.location) ||
              /listen/.test(window.location) ||
              /feel/.test(window.location) ||
              /disease/.test(window.location) ||
              /treat/.test(window.location)
            ) {
              this.menuData = this.teacherMenu;
              return;
            }
          }
          if (res.data.authority == "STUDENT") {
            if (/message/.test(window.location)) {
              return (this.menuData = this.messageMenu);
            }
            this.menuData = this.stuedntMenu;
            return;
          }
        }
      });
    },
    oneRouting(index) {
      this.colorIndex = "0";
      this.$store.state.menuId = index;
      localStorage.setItem("bgindex", index);
      this.menuData[index].show = !this.menuData[index].show;
      this.$router.push(this.menuData[index].router);
    },
    twoRouting(index, i) {
      this.colorIndex = i;
      this.$router.push(this.menuData[index].itemRouter[i]);
    },
  },
  watch: {
    $route() {
      this.getMenu();
    },
  },
};
</script>

<style lang="scss">
.admin_menu_item {
  width: 81.5%;
  height: 7%;
  margin-bottom: 15%;
  p {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgb(111, 147, 251);
    border-left: none;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    cursor: pointer;
    font-size: 1.3em;
    color: rgb(111, 147, 251);
  }
  p:hover {
    background: rgb(111, 147, 251);
    color: rgb(255, 255, 255);
  }
  .active {
    background: rgb(111, 147, 251);
    color: rgb(255, 255, 255);
  }
  ul {
    width: 100%;
    display: none;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: flex-end;
      .menu_two_item {
        width: 75%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2%;
        padding: 5% 0;
        i {
          width: 0.8em;
          height: 0.8em;
          background: rgb(111, 147, 251);
          border-radius: 50%;
          margin-right: 5%;
        }
        span {
          font-size: 1.3em;
          color: rgb(111, 147, 251);
        }
      }
      &:hover {
        .menu_two_item {
          width: 75%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(111, 147, 251);
          border-radius: 20px;

          i {
            background-color: rgb(255, 255, 255) !important;
          }
          span {
            color: rgb(255, 255, 255) !important;
          }
        }
      }
    }
    .color {
      background-color: rgb(111, 147, 251);
      border-radius: 20px;
      i {
        background-color: rgb(255, 255, 255) !important;
      }
      span {
        color: rgb(255, 255, 255) !important;
      }
    }
  }
  .show {
    display: block;
  }
}
</style>