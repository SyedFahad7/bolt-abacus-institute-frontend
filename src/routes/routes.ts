/**
 * Copyright (c) 2025 XUNOIA TECHNOLOGIES PRIVATE LIMITED
 * Licensed under XUNOIA Private License v1.0
 * All rights reserved.
 */

import { lazy } from 'react';
import type { ComponentType } from 'react';

const AdminDashboardPage = lazy(() => import('../features/dashboard/page'));
const AdminStudentsPage = lazy(() => import('../features/students/page'));
const AdminStudentActionsPage = lazy(() => import('../features/students/pages/ActionPage'));
const InstituteAttendanceList = lazy(() => import('../features/students/pages/AttendanceList'));
const InstituteAttendanceMark = lazy(() => import('../features/students/pages/AttendanceMark'));
const AdminAttendanceOverviewPage = lazy(() => import('../features/students/pages/AttendanceOverview'));
const AdminBatchAttendancePage = lazy(() => import('../features/students/pages/BatchAttendance'));
// Institutes management removed for institute-level frontend: Institutes CRUD is admin-only
const AdminTeachersPage = lazy(() => import('../features/teachers/page'));
const AdminTeacherDetailsPage = lazy(() => import('../features/teachers/pages/DetailsPage'));
const AdminBatchesPage = lazy(() => import('../features/batches/page'));
const AdminBatchDetailsPage = lazy(() => import('../features/batches/pages/DetailsPage'));
const AdminRealmsPage = lazy(() => import('../features/realms/page'));
const AdminRealmClassesPage = lazy(() => import('../features/realms/pages/RealmClasses'));
const AdminClassTopicsPage = lazy(() => import('../features/realms/pages/ClassTopics'));
const AdminQuestionsPage = lazy(() => import('../features/realms/pages/Questions'));

export interface RouteConfig {
  path: string;
  element: ComponentType;
  protected?: boolean;
  title?: string;
}

export const routes: RouteConfig[] = [
  {
    path: '/institute/dashboard',
    element: AdminDashboardPage,
    protected: true,
    title: 'Institute Name (Abacus Institute) Dashboard',
  },
  {
    path: '/institute/students',
    element: AdminStudentsPage,
    protected: true,
    title: 'Students Management',
  },
  {
    path: '/institute/students/attendance',
    element: InstituteAttendanceList,
    protected: true,
    title: 'Mark Attendance',
  },
  {
    path: '/institute/students/attendance/:batchId',
    element: InstituteAttendanceMark,
    protected: true,
    title: 'Mark Batch Attendance',
  },
  {
    path: '/institute/students/attendance',
    element: AdminAttendanceOverviewPage,
    protected: true,
    title: 'Attendance Overview',
  },
  {
    path: '/institute/students/attendance/:batchId',
    element: AdminBatchAttendancePage,
    protected: true,
    title: 'Batch Attendance',
  },
  {
    path: '/institute/students/:studentId/actions',
    element: AdminStudentActionsPage,
    protected: true,
    title: 'Student Actions',
  },
  {
    path: '/institute/teachers',
    element: AdminTeachersPage,
    protected: true,
    title: 'Teachers Management',
  },
  {
    path: '/institute/teachers/:teacherId',
    element: AdminTeacherDetailsPage,
    protected: true,
    title: 'Teacher Details',
  },
  {
    path: '/institute/batches',
    element: AdminBatchesPage,
    protected: true,
    title: 'Batches Management',
  },
  {
    path: '/institute/batches/:batchId',
    element: AdminBatchDetailsPage,
    protected: true,
    title: 'Batch Details',
  },
  {
    path: '/institute/realms',
    element: AdminRealmsPage,
    protected: true,
    title: 'Realms Management',
  },
  {
    path: '/institute/realms/:scope/:realmSlug',
    element: AdminRealmClassesPage,
    protected: true,
    title: 'Realm Classes',
  },
  {
    path: '/institute/realms/:scope/:realmSlug/:classSlug',
    element: AdminClassTopicsPage,
    protected: true,
    title: 'Class Topics',
  },
  {
    path: '/institute/realms/:scope/:realmSlug/:classSlug/:topicSlug/:quizType',
    element: AdminQuestionsPage,
    protected: true,
    title: 'Questions',
  },
  // {
  //   path: '/institute/students',
  //   element: AdminStudentsPage,
  //   protected: true,
  //   title: 'Students Management',
  // },
  // {
  //   path: '/institute/institute',
  //   element: AdminInstitutePage,
  //   protected: true,
  //   title: 'Institute Management',
  // },
  // {
  //   path: '/institute/teachers',
  //   element: AdminTeachersPage,
  //   protected: true,
  //   title: 'Teachers Management',
  // },
  // {
  //   path: '/institute/batches',
  //   element: AdminBatchesPage,
  //   protected: true,
  //   title: 'Batches Management',
  // },
  // {
  //   path: '/institute/realms',
  //   element: AdminRealmsPage,
  //   protected: true,
  //   title: 'Realms Management',
  // },
];

export const defaultRoute = '/institute/dashboard';