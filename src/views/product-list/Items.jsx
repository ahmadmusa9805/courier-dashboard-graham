import {
  Lucide,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  GET_USERS,
  DELETE_USERS,
  SET_BANNED_STATUS,
  SET_FREE_ACCESS,
  DOWNLOAD_USERS_REPORT,
} from "../../constants";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/userSlice";
import httpRequest from "../../axios";
import useUnauthenticate from "../../hooks/handle-unauthenticated";
import { LoadingIcon } from "../../base-components";
import { ChevronDown, ChevronUp } from "lucide-react";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import useDelete from "../../hooks/useDelete";
import { calculateAge } from "../../utils/helper";
import { useDeleteItemMutation, useGetAllItemsQuery } from "../../redux/features/item/itemApi";

// Toggle Switch Component
function ToggleSwitch({ isOn, handleToggle }) {
  return (
    <div onClick={handleToggle} className="toggle-switch">
      <input
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
        className="toggle-switch-checkbox"
      />
      <label className="toggle-switch-label">
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
}

function Items() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [id, setId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();
  const unauthenticate = useUnauthenticate();

  const { data: itemsData, isLoading } = useGetAllItemsQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchQuery,
  });

  const [deleteItem] = useDeleteItemMutation();

  const handleDelete = async (id) => {
    try {
      await deleteItem(id).unwrap();
      toast.success("Item deleted successfully");
      setDeleteConfirmationModal(false);
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const PricingReport = [
    {
      icon: "Trello",
      iconColor: "text-primary",
      value: itemsData?.allItemsWithStats?.allPendingJobs || 0,
      label: "Total Items",
    },
    {
      icon: "Trello",
      iconColor: "text-green-500",
      value: itemsData?.allItemsWithStats?.allAcceptedJobs || 0,
      label: "Active Items",
    },
    {
      icon: "Trello",
      iconColor: "text-orange-500",
      value: itemsData?.allItemsWithStats?.allCompletedJobs || 0,
      label: "Inactive Items",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon
          icon="tail-spin"
          className=""
          style={{ width: "100px", height: "100px" }} // Adjust the size as needed
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
            <p className="text-xl font-bold uppercase">Manage Items</p>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                type="text"
                placeholder="Search Items..."
                className="rounded-md border border-slate-200/60 px-4 py-2"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Link to={"/add-items"}>
                <button className="btn btn-primary shadow-md mr-2">
                  Add Items
                </button>
              </Link>
            </div>
          </div>
        </div>

        {itemsData?.data?.length > 0 ? (
          <div className="intro-y col-span-12 overflow-auto ">
            <table className="table table-report -mt-2">
              <thead className="bg-purple-200">
                <tr>
                  <th className="text-center whitespace-nowrap">Image</th>
                  <th className="text-center whitespace-nowrap">Name</th>
                  <th className="text-center whitespace-nowrap">Dimensions (LxWxH)</th>
                  <th className="text-center whitespace-nowrap">Price</th>
                  <th className="text-center whitespace-nowrap">Quantity</th>
                  <th className="text-center whitespace-nowrap">Status</th>
                  <th className="text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {itemsData?.data?.map((item, index) => (
                  <tr key={index} className="intro-x">
                    <td className="text-center w-20">
                      <div className="flex justify-center">
                        {item.img ? (
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                            No Img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {item.description?.substring(0, 30)}
                        {item.description?.length > 30 ? "..." : ""}
                      </div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      {item.length} x {item.width} x {item.height}
                    </td>
                    <td className="text-center whitespace-nowrap">
                      ${item.price}
                    </td>
                    <td className="text-center whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <div
                        className={`flex items-center justify-center ${item.status === "active" ? "text-success" : "text-danger"
                          }`}
                      >
                        <Lucide icon={item.status === "active" ? "CheckSquare" : "XSquare"} className="w-4 h-4 mr-2" />
                        {item.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="w-56">
                      <div className="flex justify-center items-center">
                        <div
                          onClick={() =>
                            navigate("/add-items", { state: { data: item } })
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
            {/* Pagination */}
            {itemsData?.data?.length > 0 && (
              <div className="flex justify-between items-center mt-4 px-4">
                <div className="text-sm text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, itemsData?.meta?.total || 0)} of{" "}
                  {itemsData?.meta?.total || 0} entries
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
                  {[...Array(itemsData?.meta?.totalPage || 1)].map((_, index) => (
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
                    disabled={currentPage === itemsData?.meta?.totalPage}
                    className={`px-3 py-1 rounded ${currentPage === itemsData?.meta?.totalPage
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

export default Items;