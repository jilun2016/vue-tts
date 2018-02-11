import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'
import Home from '@/views/home'
import Category from '@/views/category'
import Content from '@/views/category/Content'
import Me from '@/views/me'
import TTS from '@/views/TTS'
import check from '@/views/check'

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
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          name: 'Home',
          path: 'home',
          component: Home
        },
        {
          name: '质检',
          path: 'TTS',
          component: TTS
        },
        {
          name: '打卡',
          path: 'check',
          component: check
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
          path: 'aql',
          component: aql
        },
        {
          name: 'caculate',
          path: 'caculate',
          component: caculate
        },
        {
          name: 'Category',
          path: 'category',
          component: Category,
          children: [
            {
              name: 'Content',
              path: 'content',
              component: Content
            }
          ]
        },
        {
          name: 'Me',
          path: 'me',
          component: Me
        }
      ]
    },
  ]
})
