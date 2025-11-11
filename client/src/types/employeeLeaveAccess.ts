export interface EmployeeDashboardSummary {
    success: boolean;
    statusCode: number;
    message: string;
    result: employeeLeaveItem[]

}

export interface employeeLeaveItem {
    _id: string;
    employeeId:string; 
    leaveType: string;
    fromDate: string;
    toDate: string;
    reason?: string;
    status: "Pending" | "Approved" | "Rejected" | "Cancelled";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

