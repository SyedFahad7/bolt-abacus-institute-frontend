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
const AdminInstitutesPage = lazy(() => import('../features/institutes/page'));
const AdminInstituteDetailsPage = lazy(() => import('../features/institutes/pages/DetailsPage'));
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
    path: '/admin/dashboard',
    element: AdminDashboardPage,
    protected: true,
    title: 'Admin Dashboard',
  },
  {
    path: '/admin/students',
    element: AdminStudentsPage,
    protected: true,
    title: 'Students Management',
  },
  {
    path: '/admin/students/:studentId/actions',
    element: AdminStudentActionsPage,
    protected: true,
    title: 'Student Actions',
  },
  {
    path: '/admin/institutes',
    element: AdminInstitutesPage,
    protected: true,
    title: 'Institutes Management',
  },
  {
    path: '/admin/institutes/:instituteId',
    element: AdminInstituteDetailsPage,
    protected: true,
    title: 'Institute Details',
  },
  {
    path: '/admin/teachers',
    element: AdminTeachersPage,
    protected: true,
    title: 'Teachers Management',
  },
  {
    path: '/admin/teachers/:teacherId',
    element: AdminTeacherDetailsPage,
    protected: true,
    title: 'Teacher Details',
  },
  {
    path: '/admin/batches',
    element: AdminBatchesPage,
    protected: true,
    title: 'Batches Management',
  },
  {
    path: '/admin/batches/:batchId',
    element: AdminBatchDetailsPage,
    protected: true,
    title: 'Batch Details',
  },
  {
    path: '/admin/realms',
    element: AdminRealmsPage,
    protected: true,
    title: 'Realms Management',
  },
  {
    path: '/admin/realms/:scope/:realmSlug',
    element: AdminRealmClassesPage,
    protected: true,
    title: 'Realm Classes',
  },
  {
    path: '/admin/realms/:scope/:realmSlug/:classSlug',
    element: AdminClassTopicsPage,
    protected: true,
    title: 'Class Topics',
  },
  {
    path: '/admin/realms/:scope/:realmSlug/:classSlug/:topicSlug/:quizType',
    element: AdminQuestionsPage,
    protected: true,
    title: 'Questions',
  },
  // {
  //   path: '/admin/students',
  //   element: AdminStudentsPage,
  //   protected: true,
  //   title: 'Students Management',
  // },
  // {
  //   path: '/admin/institute',
  //   element: AdminInstitutePage,
  //   protected: true,
  //   title: 'Institute Management',
  // },
  // {
  //   path: '/admin/teachers',
  //   element: AdminTeachersPage,
  //   protected: true,
  //   title: 'Teachers Management',
  // },
  // {
  //   path: '/admin/batches',
  //   element: AdminBatchesPage,
  //   protected: true,
  //   title: 'Batches Management',
  // },
  // {
  //   path: '/admin/realms',
  //   element: AdminRealmsPage,
  //   protected: true,
  //   title: 'Realms Management',
  // },
];

export const defaultRoute = '/admin/dashboard';