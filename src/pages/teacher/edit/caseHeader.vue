<template>
  <header class="case_header">
    <div
      class="case_header_logo"
      :style="{ 'background-image': 'url(' + $url + caseData.picUrl + ')' }"
    ></div>

    <ul>
      <li>
        <span>姓名:</span>
        <span>{{ caseData.name }}</span>
      </li>
      <li>
        <span>病系:</span>
        <span>{{ caseData.diseaseTypeName }}</span>
      </li>
      <li>
        <span>性别:</span>
        <span>{{ caseData.gender ? "男" : "女" }}</span>
      </li>
      <li>
        <span>年龄:</span>
        <span>{{ caseData.age }}</span>
      </li>
      <!-- <li>
        <span>工作:</span>
        <span>退休人员</span>
      </li> -->
    </ul>
  </header>
</template>

<script>
export default {
  name: "case-header",
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
      caseData: {},
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");

    this.getcaseData();
  },
  methods: {
    getcaseData() {
      this.axios.get(`/case/${this.caseId}`).then((res) => {
        localStorage.setItem("sex", res.data.gender);
        localStorage.setItem("name", res.data.name);
        this.caseData = res.data;
        this.$store.state.sex = res.data.gender;
        this.caseData.diseaseTypeName = this.list[
          res.data.diseaseType - 1
        ].name;
      });
    },
  },
};
</script>

<style lang="scss">
.case_header {
  display: flex;
  width: 100%;
  height: 15%;
  align-items: center;
  font-size: 1.2em;
  .case_header_logo {
    width: 70px;
    height: 70px;
    margin: 0 2em;
    display: flex;
    border-radius: 50%;
    background: no-repeat center;
    background-size: cover;
  }

  ul {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    li {
      width: 25%;
      height: 45px;
      span {
        display: inline-block;
        height: 45px;
        line-height: 45px;
      }
    }
  }
}
</style>