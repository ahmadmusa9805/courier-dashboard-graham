import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../redux/features/user/userApi";
import { LoadingIcon } from "../../base-components";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();

  // Fetch user details using RTK Query
  const { data: response, isLoading, error } = useGetUserByIdQuery(userId);

  const userDetails = response?.data;
  const user = userDetails?.user;
  const jobs = userDetails?.jobs || [];

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
          Error loading user details: {error?.data?.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* User Info */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Name:</p>
            <p>
              {user?.name?.firstName} {user?.name?.lastName}
            </p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p>{user?.phone || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium">Role:</p>
            <p className="capitalize">{user?.role}</p>
          </div>
          <div>
            <p className="font-medium">User Type:</p>
            <p className={`capitalize font-semibold ${user?.userType === "user" ? "text-green-500" : "text-orange-500"
              }`}>
              {user?.userType === "user" ? "Normal" : "Business"}
            </p>
          </div>
          <div>
            <p className="font-medium">Status:</p>
            <p
              className={`capitalize font-semibold ${user?.status === "active" ? "text-green-600" : "text-red-600"
                }`}
            >
              {user?.status}
            </p>
          </div>
          <div>
            <p className="font-medium">Email Status:</p>
            <p className={`capitalize font-semibold ${user?.emailStatus === "verified" ? "text-green-600" : "text-red-600"
              }`}>
              {user?.emailStatus}
            </p>
          </div>
          <div>
            <p className="font-medium">Profile Verified:</p>
            <p className={`capitalize font-semibold ${user?.profileVerified === "verified" ? "text-green-600" : "text-orange-600"
              }`}>
              {user?.profileVerified || "Pending"}
            </p>
          </div>
          <div>
            <p className="font-medium">Average Ratings:</p>
            <p>{user?.averageRatings || 0} / 5</p>
          </div>
          <div>
            <p className="font-medium">Created At:</p>
            <p>
              {user?.createdAt
                ? new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(user.createdAt))
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Jobs Stats */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Jobs Statistics</h3>
        <p className="text-lg font-bold">
          Total Jobs Posted: {jobs?.length || 0}
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
          <p className="text-gray-500">No jobs posted by this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
