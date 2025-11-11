import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQuery'; // same as in your authApi
import type { LeaveResponse, DashboardSummary } from '../types';

export const adminLeaveApi = createApi({
  reducerPath: 'adminLeaveApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Leaves', 'Dashboard'],
  endpoints: (builder) => ({
    // 1️⃣ Filter leaves (by employeeName, leaveType, or status)
    // filterLeaves: builder.query<LeaveResponse[], { employeeName?: string; leaveType?: string; status?: string }>({
    filterLeaves: builder.query<LeaveResponse, { employeeName?: string; leaveType?: string; status?: string }>({

      query: ({ employeeName, leaveType, status }) => {
        const params = new URLSearchParams();
        if (employeeName) params.append('employeeName', employeeName);
        if (leaveType) params.append('leaveType', leaveType);
        if (status) params.append('status', status);
        return { url: `/admin-leave/filter?${params.toString()}`, method: 'GET' };
      },
      providesTags: ['Leaves'],
    }),

    // 2️⃣ Approve leave
    approveLeave: builder.mutation<LeaveResponse, string>({
      query: (leaveId) => ({
        url: `/admin-leave/${leaveId}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: ['Leaves', 'Dashboard'],
    }),

    // 3️⃣ Reject leave
    rejectLeave: builder.mutation<LeaveResponse, string>({
      query: (leaveId) => ({
        url: `/admin-leave/${leaveId}/reject`,
        method: 'PUT',
      }),
      invalidatesTags: ['Leaves', 'Dashboard'],
    }),

    // 4️⃣ Dashboard summary
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => ({ url: '/admin-leave/dashboard/summary', method: 'GET' }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useFilterLeavesQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
  useGetDashboardSummaryQuery,
} = adminLeaveApi;
