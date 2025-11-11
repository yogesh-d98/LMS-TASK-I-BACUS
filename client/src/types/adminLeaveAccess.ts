export interface LeaveResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: LeaveItem[];
}

export interface LeaveItem {
  _id: string;
  employeeId: {
    _id: string;
    name: string;
    email: string;
    role?: string;
  };
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason?: string;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface DashboardSummary {
    success: boolean;
    statusCode: number;
    message: string;
    result: {
        totalEmployees: number;
        totalLeaves: number;
        pendingLeaves: number;
        approvedLeaves: number;
        rejectedLeaves: number;
    };
}

