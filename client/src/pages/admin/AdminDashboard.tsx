import React from "react";
import {
  useGetDashboardSummaryQuery,
  useFilterLeavesQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
} from "../../api/adminLeaveApi";
import Header from "../../components/Header";

const AdminDashboard = () => {
  const { data: summary, isLoading: summaryLoading } = useGetDashboardSummaryQuery();
  const { data: leaves, isLoading: leavesLoading } = useFilterLeavesQuery({});
   const [approveLeave, { isLoading: isApproving }] = useApproveLeaveMutation();
  const [rejectLeave, { isLoading: isRejecting }] = useRejectLeaveMutation();

  if (summaryLoading || leavesLoading) return <p className="p-4">Loading...</p>;
    // function for approving leave
  const handleApprove = async (id: string) => {
    if (window.confirm("Are you sure you want to approve this leave?")) {
      try {
        await approveLeave(id).unwrap();
        alert("Leave approved successfully!");
      } catch (err) {
        console.error("Approval failed:", err);
        alert("Failed to approve leave");
      }
    }
  };

  // function for rejecting the leave
  const handleReject = async (id: string) => {
    if (window.confirm("Are you sure you want to reject this leave?")) {
      try {
        await rejectLeave(id).unwrap();
        alert("Leave rejected successfully!");
      } catch (err) {
        console.error("Rejection failed:", err);
        alert("Failed to reject leave");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-6">
        {/* Dashboard Summary */}
        <h2 className="text-xl font-semibold mb-4">Dashboard Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white border rounded">
            Total Employees: {summary?.result.totalEmployees ?? 0}
          </div>
          <div className="p-4 bg-white border rounded">
            Total Leaves: {summary?.result.totalLeaves ?? 0}
          </div>
          <div className="p-4 bg-white border rounded">
            Pending: {summary?.result.pendingLeaves ?? 0}
          </div>
          <div className="p-4 bg-white border rounded">
            Approved: {summary?.result.approvedLeaves ?? 0}
          </div>
          <div className="p-4 bg-white border rounded">
            Rejected: {summary?.result.rejectedLeaves ?? 0}
          </div>
        </div>

        {/* listing leave records */}
        <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
        <div className="bg-white border rounded">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-3 py-2">Employee</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">From</th>
                <th className="px-3 py-2">To</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Admin Approval</th>
              </tr>
            </thead>
            <tbody>
              {leaves?.result?.length ? (
                leaves.result.map((leave:any) => (
                  <tr key={leave._id} className="border-t">
                    <td className="px-3 py-2">{leave.employeeId?.name || "N/A"}</td>
                    <td className="px-3 py-2">{leave.leaveType}</td>
                    <td className="px-3 py-2">
                      {new Date(leave.fromDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(leave.toDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2">{leave.status}</td>
                    
                    <td className="px-3 py-2">
                      {leave.status === "Pending" &&
                      <>
                       <button  
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                        onClick={() => handleApprove(leave._id)}
                          disabled={isApproving}
                       >Approve</button>
                     <button   
                     className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                     onClick={()=>handleReject(leave._id)}
                     disabled={isRejecting}
                     >Reject</button>
                      </>}
                     </td>
                   
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-3 text-gray-500">
                    No leave records found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
