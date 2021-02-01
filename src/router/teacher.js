import home from '../views/home'

export const teacher = [
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '/index',
        name: "index",
        components: {
          index: () => import('../pages/index'),
        }
      },
      {
        path: '/teachercase',
        name: 'teachercase',
        components: {
          main: () => import('../pages/teacher/teacherCase'),
        },
      },
      {
        path: '/teacherclass',
        name: 'teacherclass',
        components: {
          main: () => import('../pages/teacher/teacherClass'),
        },
      },
      {
        path: '/teacherrelease',
        name: 'teacherrelease',
        components: {
          main: () => import('../pages/teacher/teacherRelease'),
        },
      },
      {
        path: '/teacherstudy',
        name: 'teacherstudy',
        components: {
          main: () => import('../pages/usercore/userStudy'),
        },
        children: [
          {
            path: '/ask',
            name: '/ask',
            component: () => import('../pages/usercore/study/studyAsk'),
          },
          {
            path: '/watch',
            name: 'watch',
            component: () => import('../pages/usercore/study/studyWatch'),
          },
          {
            path: '/listen',
            name: 'listen',
            component: () => import('../pages/usercore/study/studyListen'),
          },
          {
            path: '/feel',
            name: 'feel',
            component: () => import('../pages/usercore/study/studyFeel'),
          },
          {
            path: '/disease',
            name: 'disease',
            component: () => import('../pages/usercore/study/studyDisease'),
          },
          {
            path: '/treat',
            name: 'treat',
            component: () => import('../pages/usercore/study/studyTreat'),
          },
          {
            path: '/correct',
            name: 'correct',
            component: () => import('../pages/usercore/study/studyCorrect'),
          },
        ]
      },
      {
        path: '/teacherexam',
        name: 'teacherexam',
        components: {
          main: () => import('../pages/teacher/teacherExam'),
        },
      },
      {
        path: '/teacherstatistics',
        name: 'teacherstatistics',
        components: {
          main: () => import('../pages/teacher/teacherStatistics'),
        },
        children: [
          {
            path: '/examanalysis',
            name: 'examanalysis',
            component: () => import('../pages/teacher/dataAnalysis/examAnalysis')
          },
          {
            path: '/trainanalysis',
            name: 'trainanalysis',
            component: () => import('../pages/teacher/dataAnalysis/trainAnalysis')
          },
        ]
      },
      {
        path: '/teacherstudent',
        name: 'teacherstudent',
        components: {
          main: () => import('../pages/teacher/teacherStudent'),
        },
      },
      {
        path: '/teacheruser',
        name: 'teacheruser',
        components: {
          main: () => import('../pages/teacher/teacherUser'),
        },
      },
      {
        path: '/messageforum',
        name: 'messageforum',
        components: {
          main: () => import('../pages/message/messageForum'),
        },
      },
      {
        path: '/messagemy',
        name: 'messagemy',
        components: {
          main: () => import('../pages/message/messageMy'),
        },
      },
      {
        path: '/messageprivate',
        name: 'messageprivate',
        components: {
          main: () => import('../pages/message/messagePrivate'),
        },
      },
    ]
  },
  {
    path: '/prose',
    name: 'prose',
    component: () => import('../components/prose'),
  },
  //案例管理
  {
    path: '/case',
    name: 'case',
    component: () => import('../pages/teacher/edit/index'),
    redirect: "editask",
    children: [
      {
        path: '/editlook',
        name: '/editlook',
        component: () => import('../pages/teacher/edit/editLook')
      },
      {
        path: '/edithear',
        name: '/edithear',
        component: () => import('../pages/teacher/edit/editHear')
      },
      {
        path: '/editask',
        name: '/editask',
        component: () => import('../pages/teacher/edit/editAsk')
      },
      {
        path: '/editcut',
        name: '/editcut',
        component: () => import('../pages/teacher/edit/editCut')
      },
      {
        path: '/editdialectical',
        name: '/editdialectical',
        component: () => import('../pages/teacher/edit/editDialectical')
      },
      {
        path: '/edittreatment',
        name: '/edittreatment',
        component: () => import('../pages/teacher/edit/editTreatment')
      },
    ]
  }
]

export default teacher