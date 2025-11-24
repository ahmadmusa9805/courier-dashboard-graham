import { Lucide, Modal, ModalBody } from "@/base-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoadingIcon } from "@/base-components";
import { useGetAllRatingsQuery, useDeleteRatingMutation } from "../../redux/features/ratings/ratingsApi";

function Reviews() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const { data: ratingsData, isLoading } = useGetAllRatingsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [deleteRating] = useDeleteRatingMutation();

  const handleDelete = async () => {
    try {
      await deleteRating(selectedReviewId).unwrap();
      toast.success("Review deleted successfully");
      setDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon icon="tail-spin" className="w-24 h-24" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-xl font-bold">Manage Reviews ({ratingsData?.meta?.total || 0})</h2>
        {/* <input
          type="text"
          className="border px-4 py-2 rounded-md"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="table table-auto w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">User</th>
              <th className="text-left p-3">Courier</th>
              <th className="text-left p-3">Job</th>
              <th className="text-left p-3">Ratings</th>
              <th className="text-left p-3">Comment</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ratingsData?.data?.map((review, index) => (
              <tr key={review._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-3">
                  User ID: {review.userId}
                </td>
                <td className="p-3">
                  Courier ID: {review.courierId}
                </td>
                <td className="p-3">Job ID: {review.jobId}</td>
                <td className="p-3">
                  {["professionalism", "communication", "friendliness"].map(
                    (field) => (
                      <div key={field}>
                        <span className="capitalize">{field}:</span>{" "}
                        {review[field]}/5
                      </div>
                    )
                  )}
                  <div className="mt-1 font-semibold">
                    Average: {review.averageRatings}/5
                  </div>
                </td>
                <td className="p-3">{review.comment || "-"}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${review.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                    {review.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedReviewId(review._id);
                      }}
                      className="text-red-500"
                    >
                      <Lucide icon="Trash2" className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {ratingsData?.data?.length > 0 && (
          <div className="flex justify-between items-center mt-4 px-4">
            <div className="text-sm text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, ratingsData?.meta?.total || 0)} of{" "}
              {ratingsData?.meta?.total || 0} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark"
                  }`}
              >
                Previous
              </button>
              {[...Array(ratingsData?.meta?.totalPage || 1)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === ratingsData?.meta?.totalPage}
                className={`px-3 py-1 rounded ${currentPage === ratingsData?.meta?.totalPage
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal show={deleteModal} onHidden={() => setDeleteModal(false)}>
        <ModalBody className="text-center">
          <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Confirm Deletion</h2>
          <p className="text-slate-500 mt-2 mb-4">
            Are you sure you want to delete this review?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Reviews;