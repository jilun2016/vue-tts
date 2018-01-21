// 营销活动
const Home = () => import('@/views/report/Home')
const List = () => import('@/views/report/modules/list')
const Detail = () => import('@/views/report/modules/detail')

const CkList = () => import('@/views/report/modules/cklist')
const Ck = () => import('@/views/report/modules/ck')
const Task = () => import('@/views/report/modules/task')
const Summary = () => import('@/views/report/modules/summary')

const routes = [{
  path: '/rp',
  component: Home,
  redirect: '/rp/list',
  children: [
    {
      name: 'rp-list',
      path: 'list',
      component: List,
      meta: {title: '报告列表'}
    },
    {
      name: 'rp-detail',
      path: 'detail/:reportId/:reportName',
      component: Detail,
      meta: {title: '报告详情'}
    },
    {
      name: 'rp-ck-list', // 图文类 编辑 列表
      path: 'ck/:reportId/list/:reportType',
      component: CkList,
      meta: {title: '厂矿类编辑'}
    },
    {
      name: 'rp-ck-add', // 详情中各项编辑 2: 图文类 编辑
      path: 'ck/:reportId/detail/:reportType',
      component: Ck,
      meta: {title: '图文详情新增'}
    },
    {
      name: 'rp-ck-edit', // 详情中各项编辑 2: 图文类 编辑
      path: 'ck/:reportId/detail/:reportType/:reportDetailId',
      component: Ck,
      meta: {title: '图文详情编辑'}
    },
    {
      name: 'rp-task', // 详情中各项编辑 1: 任务要求 类
      path: 'task/:reportId/:reportType',
      component: Task,
      meta: {title: '任务要求编辑'}
    },
    {
      name: 'rp-summary', // 详情中各项编辑 1: 任务要求 类
      path: 'summary/:reportId/:reportType',
      component: Summary,
      meta: {title: '综述编辑'}
    }
  ]
}]

export default routes
