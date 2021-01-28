import home from '../views/home'

export const admin =[//管理员
  {
    path: '/home',
    name: 'home',
    component:home,
    redirect: "adminmaster",
    children: [
      {
        path: '/admincontent',
        name: 'admincontent',
        components:{
          main:() => import('../pages/admin/adminContent'),
        },
        children:[
          {
            path:'/adminhear',
            name:'adminhear',
           component:()=>import('../pages/admin/adminCont/hear')
          },
          {
            path:'/adminlook',
            name:'adminlook',
           component:()=>import('../pages/admin/adminCont/look')
          },
          {
            path:'/adminname',
            name:'adminname',
           component:()=>import('../pages/admin/adminCont/name')
          },
          {
            path:'/adminprescription',
            name:'adminprescription',
           component:()=>import('../pages/admin/adminCont/prescription')
          },
          {
            path:'/adminpulse',
            name:'adminpulse',
           component:()=>import('../pages/admin/adminCont/pulse')
          },
          {
            path:'/admintreatment',
            name:'admintreatment',
           component:()=>import('../pages/admin/adminCont/treatment')
          },
          {
            path:'/adminHerb',
            name:'adminHerb',
           component:()=>import('../pages/admin/adminCont/herb')
          }
        ]
      },
      {
        path: '/adminlogo',
        name: 'adminlogo',
        components: {main:() => import('../pages/admin/adminLogo')},
      },
      {
        path: '/adminnumber',
        name: 'adminnumber',
        components: {main:() => import('../pages/admin/adminNumber')},
      },
      {
        path: '/adminorganization',
        name: 'adminorganization',
        components: {main:() => import('../pages/admin/adminOrganization')},
      },
      {
        path: '/adminstatistics',
        name: 'adminstatistics',
        components: {main:() => import('../pages/admin/adminStatistics')},
      },
      {
        path: '/adminmaster',
        name: 'adminmaster',
        components: {main:() => import('../pages/admin/adminTeacher')},
      },
    ]
  },]

  export default admin;
  