<template>
  <div class="g6_map">
    <div class="none_data" v-if="mapShow">
      <span>暂无数据</span>
    </div>
    <div id="mymap" v-show="!mapShow"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "my-map",
  props: ["ask", "watch", "listen", "press", "pulse"],
  data() {
    return {
      mapData: {
        nodes: [
          {
            id: "0",
            label: ["范再娟"],
          },
          {
            id: "1.0",
            label: "问",
            size: [25, 30],
          },
          {
            id: "2.0",
            label: "望",
            size: [25, 30],
          },
          {
            id: "3.0",
            label: "闻",
            size: [25, 30],
          },
          {
            id: "4.0",
            label: "切",
            size: [25, 30],
          },
        ],
        edges: [
          {
            source: "0",
            target: "1.0",
          },
          {
            source: "0",
            target: "2.0",
          },
          {
            source: "0",
            target: "3.0",
          },
          {
            source: "0",
            target: "4.0",
          },
        ],
      },
      correctmap: "",
      caseId: "",
      examNo: "",
      askData: [],
      watchData: [],
      listenData: [],
      feelData: [],
      disease: "",
      diseasename: "",
      treat: "",
      agentia: "",
      mapShow: false,
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getDisease();
    this.getdiseaseName();
    this.gettreat();
    this.getagentia();
    this.mytmap = new G6.Graph({
      container: "mymap",
      width: 1420,
      height: 700,
      modes: {
        default: ["drag-canvas", "drag-node", "zoom-canvas"],
      },
      layout: {
        type: "dagre",
        rankdir: "LR",
        nodesep: 1,
        ranksep: 35,
      },
      defaultNode: {
        size: [110, 30],
        labelCfg: {
          style: {
            fill: "#fff",
          },
        },
        style: {
          fill: "rgb(5,60,118)",
          stroke: "#097ca8 ",
          lineWidth: 1,
          radius: 5,
        },
        type: "rect",
      },
      defaultEdge: {
        size: 1,
        color: "rgb(111,147,251)",
      },
    });
  },
  methods: {
    checkAnswer() {
      //问诊
      if (
        this.disease.length == 0 &&
        this.diseasename.issueResults.length == "0"
      ) {
        this.mapShow = true;
        return;
      }
      let ask = [],
        diseaseask = [],
        watch = [],
        diseasewatch = [],
        listen = [],
        diseaselisten = [],
        feel = [],
        diseasefeel = [];
      this.disease.forEach((ele) => {
        ele.issueResults.forEach((item) => {
          if (item.stageId == "1") {
            ask.push(item.issues);
          }
          if (item.stageId == "2") {
            watch.push(item.issues);
          }
          if (item.stageId == "3") {
            listen.push(item.issues);
          }
          if (item.stageId == "4") {
            feel.push(item.issues);
          }
        });
      });

      this.diseasename.issueResults.forEach((ele) => {
        if (ele.stageId == "1") {
          diseaseask = ele.issues;
        }
        if (ele.stageId == "2") {
          diseasewatch = ele.issues;
        }
        if (ele.stageId == "3") {
          diseaselisten = ele.issues;
        }
        if (ele.stageId == "4") {
          diseasefeel = ele.issues;
        }
      });

      /*防止ID冲突 
      病名各项+0.6    病名0.4
      证型各项+0.1自增   证型名字ID+0.8 
       治则治法 0.7
       */

      //问诊
      let askindex = 0;
      try {
        ask.forEach((ele) => {
          askindex += 0.1;
          askindex.toFixed(1);
          ele.forEach((item) => {
            this.askData.forEach((k) => {
              if (item.issueId == k.id) {
                let width = k.question.length + k.answer.length;
                this.mapData.nodes.push({
                  id: (k.id + askindex).toString(),
                  label: `问:${k.question} 答:${k.answer}`,
                  size: [(width + 4) * 13, 30],
                  correct: item.correct,
                  shape: "multipleLabelsNode",
                  name: "ask",
                });
                this.mapData.edges.push({
                  source: "1.0",
                  target: (k.id + askindex).toString(),
                });
              }
            });
          });
        });
      } catch (error) {
        error;
      }
      try {
        diseaseask.forEach((item) => {
          this.askData.forEach((ele) => {
            if (item.issueId == ele.id) {
              let width = ele.question.length + ele.answer.length;
              this.mapData.nodes.push({
                id: (ele.id + 0.6).toString(),
                label: `问:${ele.question} 答:${ele.answer}`,
                size: [(width + 4) * 13, 30],
                correct: item.correct,
                shape: "multipleLabelsNode",
                name: "ask",
              });
              this.mapData.edges.push({
                source: "1.0",
                target: (ele.id + 0.6).toString(),
              });
            }
          });
        });
      } catch (error) {
        error;
      }

      //望诊
      try {
        let watchindex = 0;
        watch.forEach((ele) => {
          watchindex += 0.1;
          watchindex.toFixed(1);
          ele.forEach((item) => {
            this.watchData.forEach((k) => {
              if (item.issueId == k.id) {
                this.mapData.nodes.push({
                  id: (watchindex + k.id).toString(),
                  label: `${k.name}--${k.answer}`,
                  correct: item.correct,
                  shape: "multipleLabelsNode",
                  name: "watch",
                });
                this.mapData.edges.push({
                  source: "2.0",
                  target: (watchindex + k.id).toString(),
                });
              }
            });
          });
        });
      } catch (error) {
        error;
      }

      try {
        diseasewatch.forEach((ele) => {
          this.watchData.forEach((item) => {
            if (ele.issueId == item.id) {
              this.mapData.nodes.push({
                id: (item.id + 0.6).toString(),
                label: `${item.name}--${item.answer}`,
                correct: ele.correct,
                shape: "multipleLabelsNode",
                name: "watch",
              });
              this.mapData.edges.push({
                source: "2.0",
                target: (item.id + 0.6).toString(),
              });
            }
          });
        });
      } catch (error) {
        error;
      }

      //闻诊
      try {
        let listenindex = 0;
        listen.forEach((ele) => {
          listenindex += 0.1;
          listenindex.toFixed(1);
          ele.forEach((item) => {
            this.listenData.forEach((k) => {
              if (item.issueId == k.id) {
                this.mapData.nodes.push({
                  id: (listenindex + k.id).toString(),
                  label: `${k.name}--${k.answer}`,
                  correct: item.correct,
                  shape: "multipleLabelsNode",
                  name: "listen",
                });
                this.mapData.edges.push({
                  source: "3.0",
                  target: (listenindex + k.id).toString(),
                });
              }
            });
          });
        });
      } catch (error) {
        error;
      }
      try {
        diseaselisten.forEach((ele) => {
          this.listenData.forEach((item) => {
            if (ele.issueId == item.id) {
              this.mapData.nodes.push({
                id: (item.id + 0.6).toString(),
                label: `${item.name}--${item.answer}`,
                correct: ele.correct,
                shape: "multipleLabelsNode",
                name: "listen",
              });
              this.mapData.edges.push({
                source: "3.0",
                target: (item.id + 0.6).toString(),
              });
            }
          });
        });
      } catch (error) {
        error;
      }

      //切诊
      try {
        this.feelData = [].concat(...this.feelData);
        let feelindex = 0;
        feel.forEach((ele) => {
          feelindex += 0.1;
          feelindex.toFixed(1);
          ele.forEach((item) => {
            this.feelData.forEach((k) => {
              if (item.issueId == k.id) {
                this.mapData.nodes.push({
                  id: (feelindex + k.id).toString(),
                  label: `${k.name ? k.name : "切诊"}--${
                    k.answer ? k.answer : ""
                  }`,
                  correct: item.correct,
                  shape: "multipleLabelsNode",
                  name: "feel",
                });
                this.mapData.edges.push({
                  source: "4.0",
                  target: (feelindex + k.id).toString(),
                });
              }
            });
          });
        });
      } catch (error) {
        error;
      }
      try {
        diseasefeel.forEach((ele) => {
          this.feelData.forEach((item) => {
            if (ele.issueId == item.id) {
              this.mapData.nodes.push({
                id: (item.id + 0.6).toString(),
                label: `${item.name ? item.name : "切诊"}--${
                  item.answer ? item.answer : ""
                }`,
                correct: ele.correct,
                shape: "multipleLabelsNode",
                name: "feel",
              });
              this.mapData.edges.push({
                source: "4.0",
                target: (item.id + 0.6).toString(),
              });
            }
          });
        });
      } catch (error) {
        error;
      }

      //治疗
      let treatArr = [];
      let height = 90;
      let boxY = 32;
      let flag = true;
      try {
        this.agentia[0].druggeries.forEach((ele) => {
          if (!ele.correct) {
            return (flag = false);
          }
        }),
          this.agentia[0].druggeries.forEach((ele, index) => {
            treatArr.push(ele.druggeryName);
            if (index == this.agentia[0].druggeries.length - 1) {
              if (treatArr.length > 7) {
                treatArr[6] = treatArr[6] + "\n";
                height = 120;
                boxY = 42;
              }
              this.mapData.nodes.push({
                id: "0.7",
                label: [
                  `治则治法: ${[
                    this.treat.answer.toString().replace(/，/g, " "),
                  ]}`,
                  `遣方用药: ${[this.agentia[0].agentiaAnswer]}`,
                  `药物组成: ${[treatArr.toString().replace(/,/g, " ")]}`,
                ],
                size: [300, height],
                name: "agentia",
                shape: "multipleLabelsNode",
                treat: this.treat.correct,
                agentia: this.agentia[0].agentiaCorrect,
                aggregate: flag,
              });
            }
          });
      } catch (error) {
        error;
      }

      //病名 及 证型
      try {
        let treatindex = 0;
        this.mapData.nodes.push({
          id: "0.4",
          label: this.diseasename.answer.toString(),
          correct: this.diseasename.correct,
          shape: "multipleLabelsNode",
          name: "treat",
          size: [80, 30],
        });
        this.disease.forEach((ele) => {
          treatindex += 0.1;
          treatindex.toFixed(1);
          this.mapData.nodes.push({
            id: (ele.id + 0.8).toString(),
            label: ele.answer.toString(),
            correct: ele.correct,
            shape: "multipleLabelsNode",
            name: "treat",
            size: [80, 30],
          });
          //四诊连接证型
          ele.issueResults.forEach((item) => {
            item.issues.forEach((k) => {
              this.mapData.edges.push({
                source: (k.issueId + treatindex).toString(),
                target: (ele.id + 0.8).toString(),
              });
            });
          });
        });
      } catch (error) {
        error;
      }
      try {
        //四诊链接病名
        this.diseasename.issueResults.forEach((ele) => {
          ele.issues.forEach((item) => {
            this.mapData.edges.push({
              source: (item.issueId + 0.6).toString(),
              target: "0.4",
            });
          });
        });

        //病名 证型 连接 治疗
        this.mapData.edges.push({
          source: "0.4",
          target: "0.7",
        });

        this.disease.forEach((ele) => {
          this.mapData.edges.push({
            source: (ele.id + 0.8).toString(),
            target: "0.7",
          });
        });
      } catch (error) {
        error;
      }

      G6.registerNode(
        "multipleLabelsNode",
        {
          // 绘制节点
          draw: function draw(cfg, group) {
            var shape = this.drawShape(cfg, group);
            if (cfg.label && cfg.label.length) {
              this.drawLabel(cfg, group);
            }
            return shape;
          },
          // 绘制label
          drawLabel: function drawLabel(cfg, group) {
            let blockcolor = "rgb(111,147,251)";
            if (!cfg.correct) {
              blockcolor = " rgb(254, 98, 102)";
            }
            if (cfg.name == "ask") {
              group.addShape("rect", {
                attrs: {
                  width: 10,
                  height: 20,
                  x: -cfg.size[0] / 2 + 5,
                  y: -12,
                  fill: blockcolor,
                },
              });
              group.addShape("text", {
                attrs: {
                  text: cfg.label,
                  textAlign: "center",
                  y: 5,
                  x: 5,
                  fill: "rgb(255,255,255)",
                },
              });
            }

            if (
              cfg.name == "watch" ||
              cfg.name == "listen" ||
              cfg.name == "feel"
            ) {
              group.addShape("rect", {
                attrs: {
                  width: 10,
                  height: 20,
                  x: -45,
                  y: -10,
                  fill: blockcolor,
                },
              });
              group.addShape("text", {
                attrs: {
                  text: cfg.label,
                  textAlign: "left",
                  x: -30,
                  y: 6,
                  fill: "rgb(255,255,255)",
                },
              });
            }

            if (cfg.name == "treat") {
              group.addShape("rect", {
                attrs: {
                  width: 10,
                  height: 20,
                  x: -30,
                  y: -10,
                  fill: blockcolor,
                },
              });
              group.addShape("text", {
                attrs: {
                  text: cfg.label,
                  x: -15,
                  y: 6,
                  fill: "rgb(255,255,255)",
                },
              });
            }
            if (cfg.name == "agentia") {
              if (cfg.agentia) {
                group.addShape("rect", {
                  attrs: {
                    width: 10,
                    height: 20,
                    x: -145,
                    y: -46,
                    fill: "rgb(111,147,251)",
                  },
                });
                // 绘制第一个label
                group.addShape("text", {
                  attrs: {
                    text: cfg.label[0] || "",
                    x: -130,
                    y: -28,
                    fill: "rgb(255,255,255)",
                  },
                });
              } else {
                group.addShape("rect", {
                  attrs: {
                    width: 10,
                    height: 20,
                    x: -145,
                    y: -46,
                    fill: "rgb(254, 98, 102)",
                  },
                });
                // 绘制第一个label
                group.addShape("text", {
                  attrs: {
                    text: cfg.label[0] || "",
                    x: -130,
                    y: -28,
                    fill: "rgb(255,255,255)",
                  },
                });
              }

              if (cfg.treat) {
                group.addShape("rect", {
                  attrs: {
                    width: 10,
                    height: 20,
                    x: -145,
                    y: -16,
                    fill: "rgb(111,147,251)",
                  },
                });
                //   // 绘制第二个label
                group.addShape("text", {
                  attrs: {
                    text: cfg.label[1] || "",
                    x: -130,
                    y: 0,
                    fill: "rgb(255,255,255)",
                  },
                });
              } else {
                group.addShape("rect", {
                  attrs: {
                    width: 10,
                    height: 20,
                    x: -145,
                    y: -16,
                    fill: "rgb(254, 98, 102)",
                  },
                });
                //   // 绘制第二个label
                group.addShape("text", {
                  attrs: {
                    text: cfg.label[1] || "",
                    x: -130,
                    y: 0,
                    fill: "rgb(255,255,255)",
                  },
                });
              }

              if (cfg.aggregate) {
                group.addShape("rect", {
                  attrs: {
                    width: 10,
                    height: 20,
                    x: -145,
                    y: 14,
                    fill: "rgb(111,147,251)",
                  },
                });

                //绘制第三个label
                group.addShape("text", {
                  attrs: {
                    text: cfg.label[2] || "",
                    x: -130,
                    y: boxY,
                    fill: "rgb(255,255,255)",
                  },
                });
              } else {
                group.addShape("rect", {
                  attrs: {
                    width: 10,
                    height: 20,
                    x: -145,
                    y: 14,
                    fill: "rgb(254, 98, 102)",
                  },
                });
                //绘制第三个label
                group.addShape("text", {
                  attrs: {
                    text: cfg.label[2] || "",
                    x: -130,
                    y: boxY,
                    fill: "rgb(255,255,255)",
                  },
                });
              }
            }
          },
        },
        "rect"
      );

      this.mytmap.data(this.mapData);
      this.mytmap.render();
    },
    getDisease() {
      this.axios.get(`${this.examNo}/${this.caseId}/disease`).then((res) => {
        this.disease = res.data;
      });
    },
    getdiseaseName() {
      this.axios
        .get(`${this.examNo}/${this.caseId}/diseasename`)
        .then((res) => {
          this.diseasename = res.data;
        });
    },
    gettreat() {
      this.axios.get(`${this.examNo}/${this.caseId}/treat`).then((res) => {
        this.treat = res.data;
      });
    },
    getagentia() {
      this.axios.get(`${this.examNo}/${this.caseId}/agentia`).then((res) => {
        this.agentia = res.data;
      });
    },
  },
  watch: {
    ask: function () {
      this.askData = this.ask;
      this.checkAnswer(this.correct);
    },
    watch: function () {
      this.watchData = this.watch;
    },
    listen: function () {
      this.listenData = this.listen;
    },
    press: function () {
      this.feelData.push(this.press);
    },
    pulse: function () {
      this.feelData.push(this.pulse);
    },
  },
};
</script>