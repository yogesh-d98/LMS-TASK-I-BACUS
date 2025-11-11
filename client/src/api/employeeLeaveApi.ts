import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQuery'; // same as in your authApi
// import type { LeaveResponse, DashboardSummary } from '../types';
import type { EmployeeDashboardSummary } from '../types/employeeLeaveAccess';
export const employeeLeaveApi = createApi({
  reducerPath: 'employeeLeaveApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['EmployeeLeaves'],
  endpoints: (builder) => ({
   

    getEmployeeDashboardSummary: builder.query<EmployeeDashboardSummary, void>({
      query: () => ({ url: '/leave/view', method: 'GET' }),
      providesTags: ['EmployeeLeaves'],
    }),
  }),
});

export const {
useGetEmployeeDashboardSummaryQuery
} = employeeLeaveApi;
