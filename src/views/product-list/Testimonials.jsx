import {
  Lucide,
  Modal,
  ModalBody,
} from "@/base-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/userSlice";
import { LoadingIcon } from "../../base-components";
import { useDeleteTestimonialMutation, useGetAllTestimonialsQuery } from "../../redux/features/testimonial/testimonialApi";

function Testimonials() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [id, setId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();

  const { data: testimonialsData, isLoading } = useGetAllTestimonialsQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchQuery,
  });

  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id).unwrap();
      toast.success("Testimonial deleted successfully");
      setDeleteConfirmationModal(false);
      setId(null);
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      toast.error("Failed to delete testimonial");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const PricingReport = [
    {
      icon: "Trello",
      iconColor: "text-primary",
      value: testimonialsData?.meta?.total || 0,
      label: "Total Testimonials",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon
          icon="tail-spin"
          className=""
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 mt-2">
          <div className="grid grid-cols-12 gap-6 mt-0">
            {PricingReport.map((item, index) => (
              <div
                key={index}
                className="col-span-12 sm:col-span-6 xl:col-span-4 intro-y"
              >
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div
                      className={`text-3xl font-medium leading-8 mt-6 ${item.iconColor}`}
                    >
                      {item.value}
                    </div>
                    <div className="text-[12px] font-semibold uppercase text-slate-500 mt-1">
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2 justify-between">
          <div>
            <p className="text-xl font-bold uppercase">Manage Testimonials</p>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                type="text"
                placeholder="Search Testimonials..."
                className="rounded-md border border-slate-200/60 px-4 py-2"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Link to={"/add-testimonial"}>
                <button className="btn btn-primary shadow-md mr-2">
                  Add Testimonial
                </button>
              </Link>
            </div>
          </div>
        </div>

        {testimonialsData?.data?.length > 0 ? (
          <div className="intro-y col-span-12 overflow-auto ">
            <table className="table table-report -mt-2">
              <thead className="bg-purple-200">
                <tr>
                  <th className="text-center whitespace-nowrap">Name</th>
                  <th className="text-center whitespace-nowrap">Sub Title</th>
                  <th className="text-center whitespace-nowrap">Rating</th>
                  <th className="text-center whitespace-nowrap">Description</th>
                  <th className="text-center whitespace-nowrap">Created Date</th>
                  <th className="text-center whitespace-nowrap">Status</th>
                  <th className="text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {testimonialsData?.data?.map((item, index) => (
                  <tr key={index} className="intro-x">
                    <td className="text-center whitespace-nowrap">
                      <div className="font-medium">{item.name}</div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <div className="text-slate-500">{item.subTitle || "-"}</div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color: i < item.rating ? "#FFD700" : "#e5e7eb",
                              fontSize: "20px",
                            }}
                          >
                            {i < item.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <div className="text-slate-500 text-xs mt-0.5">
                        {item.description?.substring(0, 50)}
                        {item.description?.length > 50 ? "..." : ""}
                      </div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <div className="text-slate-500">{item.createdDate || "-"}</div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <div
                        className={`flex items-center justify-center ${item.status === "active" ? "text-success" : "text-danger"
                          }`}
                      >
                        <Lucide
                          icon={item.status === "active" ? "CheckSquare" : "XSquare"}
                          className="w-4 h-4 mr-2"
                        />
                        {item.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="w-56">
                      <div className="flex justify-center items-center">
                        <div
                          onClick={() =>
                            navigate("/add-testimonial", { state: { data: item } })
                          }
                          className="flex items-center mr-3 cursor-pointer"
                        >
                          <Lucide icon="Edit" className="w-4 h-4 mr-1" />
                        </div>
                        <a
                          className="flex items-center text-danger"
                          href="#"
                          onClick={() => {
                            setDeleteConfirmationModal(true);
                            setId(item._id);
                          }}
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {testimonialsData?.data?.length > 0 && (
              <div className="flex justify-between items-center mt-4 px-4">
                <div className="text-sm text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    testimonialsData?.meta?.total || 0
                  )}{" "}
                  of {testimonialsData?.meta?.total || 0} entries
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
                  {[...Array(testimonialsData?.meta?.totalPage || 1)].map(
                    (_, index) => (
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
                    )
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={
                      currentPage === testimonialsData?.meta?.totalPage
                    }
                    className={`px-3 py-1 rounded ${currentPage === testimonialsData?.meta?.totalPage
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
        ) : (
          <div className="intro-y col-span-12 flex justify-center items-center">
            No data found.
          </div>
        )}
      </div>

      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete this record? This process cannot be
              undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDelete(id)}
              className="btn btn-danger w-24"
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Testimonials;