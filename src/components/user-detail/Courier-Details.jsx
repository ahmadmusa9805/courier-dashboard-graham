import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourierByIdQuery } from "../../redux/features/couriers/couriersApi";
import { LoadingIcon } from "../../base-components";

const CourierDetails = () => {
  const navigate = useNavigate();
  const { id: courierId } = useParams();

  // Fetch courier details using RTK Query
  const { data: response, isLoading, error } = useGetCourierByIdQuery(courierId);

  const courierDetails = response?.data;
  const courier = courierDetails?.user;
  const jobs = courierDetails?.jobs || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon
          icon="tail-spin"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          Error loading courier details: {error?.data?.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Courier Info */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Courier Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <Detail label="Name" value={`${courier?.name?.firstName || ""} ${courier?.name?.lastName || ""}`} />
          <Detail label="Email" value={courier?.email} />
          <Detail label="Phone" value={courier?.phone} />
          <Detail label="Role" value={courier?.role} color="capitalize" />
          <Detail
            label="User Type"
            value={courier?.userType === "user" ? "Normal" : "Business"}
            color={courier?.userType === "user" ? "text-green-500 font-semibold" : "text-orange-500 font-semibold"}
          />
          <Detail
            label="Status"
            value={courier?.status}
            color={`capitalize font-semibold ${courier?.status === "active" ? "text-green-600" : "text-red-600"
              }`}
          />
          <Detail
            label="Email Status"
            value={courier?.emailStatus}
            color={`capitalize font-semibold ${courier?.emailStatus === "verified" ? "text-green-600" : "text-red-600"
              }`}
          />
          <Detail
            label="Profile Verified"
            value={courier?.profileVerified || "Pending"}
            color={`capitalize font-semibold ${courier?.profileVerified === "verified" ? "text-green-600" : "text-orange-600"
              }`}
          />
          <Detail label="Average Ratings" value={`${courier?.averageRatings || 0} / 5`} />
          <Detail
            label="Created At"
            value={
              courier?.createdAt
                ? new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(courier.createdAt))
                : "N/A"
            }
          />
        </div>
      </div>

      {/* Jobs Stats */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Jobs Statistics</h3>
        <p className="text-lg font-bold">
          Total Jobs Assigned: {jobs?.length || 0}
        </p>
      </div>

      {/* Jobs List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Jobs List</h3>
        {jobs?.length > 0 ? (
          <table className="w-full text-left border border-gray-200">
            <thead className="bg-purple-200">
              <tr>
                <th className="p-3 border">From</th>
                <th className="p-3 border">To</th>
                <th className="p-3 border">Courier ID</th>
                <th className="p-3 border">Posted Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{job?.from || "N/A"}</td>
                  <td className="p-3 border">{job?.to || "N/A"}</td>
                  <td className="p-3 border">
                    {job?.courierId ? (
                      <span className="text-blue-600">{job.courierId}</span>
                    ) : (
                      <span className="text-gray-400">Not Assigned</span>
                    )}
                  </td>
                  <td className="p-3 border">
                    {job?.createdAt
                      ? new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }).format(new Date(job.createdAt))
                      : "N/A"}
                  </td>
                  <td
                    className="p-3 border font-semibold text-purple-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/job-details/${job?._id}`)}
                  >
                    View Details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No jobs assigned to this courier.</p>
        )}
      </div>
    </div>
  );
};

const Detail = ({ label, value, color = "text-gray-800" }) => (
  <div>
    <p className="font-medium">{label}:</p>
    <p className={`${color}`}>{value || "N/A"}</p>
  </div>
);

export default CourierDetails;
