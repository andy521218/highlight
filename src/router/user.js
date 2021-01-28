import home from '../views/home'

export const user = [
  {
    path: '/userstudy',
    name: 'userstudy',
    component: () => import('../pages/usercore/case/userStudy'),
  },
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
        path: '/usercenter',
        name: 'usercenter',
        components: {
          main: () => import('../pages/usercore/userCenter'),
        }
      },
      {
        path: '/userpassword',
        name: 'userpassword',
        components: {
          main: () => import('../pages/usercore/userPassword'),
        }
      },

      {
        path: '/userrecord',
        name: 'userrecord',
        components: {
          main: () => import('../pages/usercore/userRecord'),
        }
      },
      {
        path: '/userstatistics',
        name: 'userstatistics',
        components: {
          main: () => import('../pages/usercore/userStatistics'),
        }
      },
      {
        path: '/usermap',
        name: '/usermap',
        components: {
          main: () => import('../pages/usercore/map/userMap')
        }
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
      {
        path: '/messagePublish',
        name: 'messagepublish',
        components: {
          main: () => import('../pages/message/messagePublish'),
        },
      },
    ]
  },
  {
    path: '/prose',
    name: 'prose',
    component: () => import('../components/prose'),
  },
  {
    path: '/examindex',
    name: 'examindex',
    component: () => import('../pages/usercore/exam/index'),
  },
  {
    path: '/examcase',
    name: 'examcase',
    component: () => import('../pages/usercore/exam/caseIndex'),
  },
  {
    path: '/casehome',
    name: 'casehome',
    component: () => import('../pages/usercore/case/caseHome'),
  },
  {
    path: 'case',
    name: 'case',
    redirect: "userask",
    component: () => import('../pages/teacher/edit/index'),
    children: [
      {
        path: '/userlook',
        name: 'userlook',
        component: () => import('../pages/usercore/case/userLook'),
      },
      {
        path: '/userask',
        name: 'userlookuserlookuserlookuserlook',
        component: () => import('../pages/usercore/case/userAsk'),
      },
      {
        path: '/userHear',
        name: 'userHear',
        component: () => import('../pages/usercore/case/userHear'),
      },
      {
        path: '/usercut',
        name: 'usercut',
        component: () => import('../pages/usercore/case/userCut'),
      },
      {
        path: '/userdialectical',
        name: 'userdialectical',
        component: () => import('../pages/usercore/case/userDialectical'),
      },
      {
        path: '/usertreatment',
        name: 'usertreatment',
        component: () => import('../pages/usercore/case/userTreatment'),
      },
    ]
  },
]

export default user