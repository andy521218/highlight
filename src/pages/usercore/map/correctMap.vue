<template>
  <div id="correct" ref="correct"></div>
</template>

 <script>
import G6 from "@antv/g6";
export default {
  name: "correct-map",
  props: [
    "ask",
    "watch",
    "listen",
    "press",
    "pulse",
    "correct",
    "width",
    "height",
  ],
  data() {
    return {
      mapData: {
        nodes: [
          {
            id: "0",
            label: [""],
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
      caseName: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.caseName = localStorage.getItem("caseName");
    this.mapData.nodes[0].label[0] = this.caseName;
  },
  methods: {
    repaint() {
      let node = this.$refs.correct.children[0];
      if (!node) return;
      this.$refs.correct.removeChild(node);
      this.getcorrect(this.correct);
      this.correctmap.data(this.mapData);
      this.correctmap.render();
    },
    init() {
      this.correctmap = new G6.Graph({
        container: "correct",
        width: this.width,
        height: this.height,
        fitView: "fitView",
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
              fill: "rgb(111,147,251)",
            },
          },
          style: {
            fill: "rgb(240,246,255)",
            stroke: "rgb(111,147,251)",
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
    getcorrect(res) {
      let name = res.data.diseaseName;
      let nameId = res.data.diseaseNameId;
      let diseaseNameIssues = res.data.diseaseNameIssues;
      let diseases = res.data.diseases;
      let ask, watch, listen, feel;
      diseaseNameIssues.forEach((ele) => {
        if (ele.stageId == "1") {
          ask = ele;
        }
        if (ele.stageId == "2") {
          watch = ele;
        }
        if (ele.stageId == "3") {
          listen = ele;
        }
        if (ele.stageId == "4") {
          feel = ele;
        }
      });
      this.checkAsk(name, nameId + 0.5, ask, diseases);
      this.checkWatch(nameId + 0.5, watch, diseases);
      this.checkListen(nameId + 0.5, listen, diseases);
      this.checkFeel(nameId + 0.5, feel, diseases);
      this.checkEdges(name, nameId + 0.5, diseaseNameIssues, diseases);
      this.gettreat(nameId + 0.5, diseases);
      this.init();
    },
    gettreat(nameId, diseases) {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/treat/correct`)
        .then((res) => {
          let agentias = res.data.agentias;
          let id = res.data.agentias[0].id + 0.5;
          let treat = ["药物组成: "];
          let height = 90;
          let boxY = 32;
          agentias[0].druggeries.forEach((ele, index) => {
            treat.push(ele.name);
            if (index == agentias[0].druggeries.length - 1) {
              if (treat.length > 7) {
                treat[7] = treat[7] + "\n";
                height = 120;
                boxY = 42;
              }
              this.mapData.nodes.push({
                id: id.toString(),
                label: [
                  `治则治法: ${res.data.treatName
                    .toString()
                    .replace(/，/g, " ")}`,
                  `遣方用药: ${agentias[0].name}`,
                  treat.toString().replace(/,/g, " "),
                ],
                size: [300, height],
                name: "treat",
                shape: "multipleLabelsNode",
              });

              diseases.forEach((ele) => {
                this.mapData.edges.push({
                  source: (ele.id + 0.5).toString(),
                  target: id.toString(),
                });
              });
              this.mapData.edges.push({
                source: nameId.toString(),
                target: id.toString(),
              });
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
                    var label = cfg.label;
                    let block = -76;
                    if (cfg.name == "treat") {
                      for (let i = 0; i < 3; i++) {
                        block += 30;
                        group.addShape("rect", {
                          attrs: {
                            width: 10,
                            height: 20,
                            x: -145,
                            y: block,
                            fill: "rgb(111,147,251)",
                          },
                        });
                      }
                      // 绘制第一个label
                      group.addShape("text", {
                        attrs: {
                          text: label[0] || "",
                          x: -130,
                          y: -28,
                          fill: "rgb(111,147,251)",
                        },
                      });
                      if (label.length > 1) {
                        // 绘制第二个label
                        group.addShape("text", {
                          attrs: {
                            text: label[1] || "",
                            x: -130,
                            y: 0,
                            fill: "rgb(111,147,251)",
                          },
                        });
                      }
                      //绘制第三个label
                      group.addShape("text", {
                        attrs: {
                          text: label[2] || "",
                          x: -130,
                          y: boxY,
                          fill: "rgb(111,147,251)",
                        },
                      });
                    }

                    if (cfg.name == "ask") {
                      group.addShape("rect", {
                        attrs: {
                          width: 10,
                          height: 20,
                          x: -cfg.size[0] / 2 + 5,
                          y: -12,
                          fill: "rgb(111,147,251)",
                        },
                      });
                      group.addShape("text", {
                        attrs: {
                          text: label[0],
                          textAlign: "center",
                          y: 5,
                          x: 5,
                          fill: "rgb(111,147,251)",
                        },
                      });
                    }

                    if (cfg.name == "standard") {
                      group.addShape("rect", {
                        attrs: {
                          width: 10,
                          height: 20,
                          x: -45,
                          y: -10,
                          fill: "rgb(111,147,251)",
                        },
                      });
                      group.addShape("text", {
                        attrs: {
                          text: cfg.label,
                          textAlign: "left",
                          x: -30,
                          y: 6,
                          fill: "rgb(111,147,251)",
                        },
                      });
                    }

                    if (cfg.name == "edges") {
                      group.addShape("rect", {
                        attrs: {
                          width: 10,
                          height: 20,
                          x: -30,
                          y: -10,
                          fill: "rgb(111,147,251)",
                        },
                      });
                      group.addShape("text", {
                        attrs: {
                          text: cfg.label,
                          x: -15,
                          y: 6,
                          fill: "rgb(111,147,251)",
                        },
                      });
                    }
                  },
                },
                "rect"
              );
            }
          });
          this.correctmap.data(this.mapData);
          this.correctmap.render();
        });
    },
    checkAsk(name, nameId, namelist, diseaselist) {
      let asklist = [namelist.issueIds];
      if (diseaselist.length >= 1) {
        diseaselist.forEach((ele) => {
          ele.issues.forEach((item) => {
            if (item.stageId == "1") {
              asklist.push(item.issueIds);
            }
          });
        });
      }
      asklist = [].concat(...asklist);
      asklist = new Set(asklist);
      // 获取 病名 各项病症 问诊
      let blockArr = [];
      this.askData.forEach((ele) => {
        asklist.forEach((item) => {
          if (item == ele.id) {
            let width = ele.question.length + ele.answer.length;
            blockArr.push(width);
            let nodes = {
              id: item.toString(),
              label: [`问:${ele.question} 答:${ele.answer}`],
              size: [(width + 4) * 13, 30],
              shape: "multipleLabelsNode",
              name: "ask",
            };
            let edges = {
              source: "1.0",
              target: item.toString(),
            };
            this.mapData.nodes.push(nodes);
            this.mapData.edges.push(edges);
          }
        });
      });
    },
    checkWatch(nameId, watch, disease) {
      //获取望诊各项
      try {
        let watchList = JSON.parse(JSON.stringify(watch.issueIds));
        disease.forEach((ele) => {
          ele.issues.forEach((item) => {
            if (item.stageId == "2") {
              watchList.push(item.issueIds);
            }
          });
        });
        watchList = [].concat(...watchList);
        watchList = new Set(watchList);
        watchList.forEach((ele) => {
          this.watchData.forEach((item) => {
            if (ele == item.id) {
              //望诊>=望诊各项
              let nodes = {
                id: `${ele}`,
                label: `${item.name}--${item.correctAnswer}`,
                shape: "multipleLabelsNode",
                name: "standard",
              };
              let edges = {
                source: "2.0",
                target: ele.toString(),
              };
              this.mapData.nodes.push(nodes);
              this.mapData.edges.push(edges);
            }
          });
        });
      } catch (error) {
        error;
      }
    },
    checkListen(nameId, listen, disease) {
      try {
        let listenList = JSON.parse(JSON.stringify(listen.issueIds));
        disease.forEach((ele) => {
          ele.issues.forEach((item) => {
            if (item.stageId == "3") {
              item.issueIds.forEach((e) => {
                listenList.push(e);
              });
            }
          });
        });
        listenList = new Set(listenList);
        listenList.forEach((ele) => {
          this.listenData.forEach((item) => {
            if (item.id == ele) {
              let nodes = {
                id: `${ele}`,
                label: `${item.name}--${item.correctAnswer}`,
                shape: "multipleLabelsNode",
                name: "standard",
              };
              let edges = {
                source: "3.0",
                target: ele.toString(),
              };
              this.mapData.nodes.push(nodes);
              this.mapData.edges.push(edges);
            }
          });
        });
      } catch (error) {
        error;
      }
    },
    checkFeel(nameId, feel, disease) {
      try {
        let feelList = JSON.parse(JSON.stringify(feel.issueIds));
        disease.forEach((ele) => {
          ele.issues.forEach((item) => {
            if (item.stageId == "4") {
              item.issueIds.forEach((e) => {
                feelList.push(e);
              });
            }
          });
        });
        feelList = new Set(feelList);
        this.feelData = [].concat(...this.feelData);
        feelList.forEach((ele) => {
          this.feelData.forEach((item) => {
            if (ele == item.id) {
              let nodes = {
                id: ele.toString(),
                label: `${item.name ? item.name : "切诊"}--${
                  item.correctAnswer
                }`,
                shape: "multipleLabelsNode",
                name: "standard",
              };
              let edges = {
                source: "4.0",
                target: ele.toString(),
              };
              this.mapData.edges.push(edges);
              this.mapData.nodes.push(nodes);
            }
          });
        });
      } catch (error) {
        error;
      }
    },
    checkEdges(name, nameId, diseaseNameIssues, diseases) {
      //添加病名
      this.mapData.nodes.push({
        id: nameId.toString(),
        label: name.toString(),
        shape: "multipleLabelsNode",
        name: "edges",
        size: [80, 30],
      });
      //添加病症
      diseases.forEach((ele) => {
        this.mapData.nodes.push({
          id: (ele.id + 0.5).toString(),
          label: ele.name.toString(),
          shape: "multipleLabelsNode",
          name: "edges",
          size: [80, 30],
        });
        ele.issues.forEach((item) => {
          item.issueIds.forEach((e) => {
            this.mapData.edges.push({
              source: e.toString(),
              target: (ele.id + 0.5).toString(),
            });
          });
        });
      });
      //四诊=>病名
      diseaseNameIssues.forEach((ele) => {
        ele.issueIds.forEach((item) => {
          this.mapData.edges.push({
            source: item.toString(),
            target: nameId.toString(),
          });
        });
      });
    },
  },
  watch: {
    width: function () {
      this.repaint();
    },
    ask: function () {
      this.askData = this.ask;
      this.getcorrect(this.correct);
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