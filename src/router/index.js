import Vue from 'vue'
import Router from 'vue-router'

import AppMain from '@/components/AppMain'
import TTS from '@/views/TTS'
import check from '@/views/check'
import wxerror from '@/views/error/wx-error'
import wxlogin from '@/views/login/wx-login'

import aql from '@/views/aql'
import caculate from '@/views/aql/caculate'
import reportRoute from '@/router/routers/report'
import report from '@/views/report'
import ReportDetail from '@/views/report/ReportDetail'
import ReportTask from '@/views/report/ReportTask'
import ReportCK from '@/views/report/ReportCK'
import ReportCKList from '@/views/report/ReportCKList'
import ReportDH from '@/views/report/ReportDH'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      component: AppMain
    },
    {
      path: '/',
      component: TTS
    },
    {
      name: '质检',
      path: '/TTS',
      component: TTS
    },
    {
      path: '/check',
      component: check
    },
    {
      name: 'wxerror',
      path: '/wxerror',
      component: wxerror
    },
    {
      name: 'wxlogin',
      path: '/wxlogin',
      component: wxlogin
    },
    ...reportRoute, //报告
    {
      name: '报告',
      path: 'report',
      component: report
    },
    {
      name: 'ReportDetail',
      path: 'reportDetail',
      component: ReportDetail
    },
    {
      name: 'ReportTask',
      path: 'reportTask',
      component: ReportTask
    },
    {
      name: 'ReportCK',
      path: 'reportCK',
      component: ReportCK
    },
    {
      name: 'ReportCKList',
      path: 'reportCKList',
      component: ReportCKList
    },
    {
      name: 'ReportDH',
      path: 'reportDH',
      component: ReportDH
    },
    {
      name: 'aql',
      path: '/aql',
      component: aql
    },
    {
      name: 'caculate',
      path: '/caculate',
      component: caculate
    }
  ]
})
