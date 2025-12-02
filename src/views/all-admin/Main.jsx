import {
    Lucide,
    Modal,
    ModalBody,
} from "@/base-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoadingIcon } from "../../base-components";
import { useGetAllAdminsQuery, useDeleteAdminMutation } from "../../redux/features/admin/adminApi";

function AllAdmin() {
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 10;

    // API Query Parameters
    const queryParams = {
        page: currentPage,
        limit: itemsPerPage,
        ...(searchQuery && { search: searchQuery }),
        role: "admin" // Explicitly requesting admins
    };

    // Fetch Admins
    const { data: adminsResponse, isLoading, isError, error } = useGetAllAdminsQuery(queryParams);
    const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

    const adminsData = adminsResponse?.data || [];
    const meta = adminsResponse?.meta || {};
    const totalPages = meta.totalPage || 1;

    // Reset page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (id) => {
        try {
            await deleteAdmin(id).unwrap();
            toast.success("Admin deleted successfully");
            setDeleteConfirmationModal(false);
        } catch (err) {
            console.error("Failed to delete admin:", err);
            toast.error(err?.data?.message || "Failed to delete admin");
        }
    };

    // Calculate stats from the fetched data (or meta if available)
    // Note: Since we are paginating, we might only have data for the current page.
    // For accurate total stats, the API should ideally return them. 
    // Based on the provided response, 'meta' has 'total'.
    // We can't calculate 'blocked' count for *all* users from just one page of data unless the API provides it.
    // For now, I will use the 'meta.total' for Total Admins.
    // For other stats, I'll display what's visible or 0 if not available, 
    // OR if the user wants accurate global stats, we'd need a separate stats endpoint.
    // Given the constraints, I'll use the current data for breakdown or just show Total.
    // The user's static data had breakdown. I'll try to approximate or simplify.

    // Actually, usually dashboard/stats APIs are separate. 
    // I'll use the current page data for breakdown but Total from meta.

    const totalAdmins = meta.total || 0;
    // These will only reflect the current page, which is a limitation without a specific stats API.
    const superAdmins = adminsData.filter((u) => u.role === "superAdmin").length;
    const regularAdmins = adminsData.filter((u) => u.role === "admin").length;
    const blockedAdmins = adminsData.filter((u) => u.status !== "active").length;

    const PricingReport = [
        {
            icon: "Shield",
            iconColor: "text-primary",
            value: totalAdmins,
            label: "Total Admins",
        },
        {
            icon: "ShieldCheck",
            iconColor: "text-green-500",
            value: superAdmins, // Note: This might be inaccurate with pagination
            label: "Super Admins",
        },
        {
            icon: "UserCheck",
            iconColor: "text-orange-500",
            value: regularAdmins, // Note: This might be inaccurate with pagination
            label: "Regular Admins",
        },
        {
            icon: "UserX",
            iconColor: "text-red-500",
            value: blockedAdmins, // Note: This might be inaccurate with pagination
            label: "Blocked Admins",
        },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingIcon icon="tail-spin" className="w-10 h-10" />
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
                                className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y"
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
                        <p className="text-xl font-bold uppercase">Manage All Admins</p>
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Search admins"
                                className="rounded-md border border-slate-200/60 px-4 py-2"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div>
                            <Link to={"/add-users"} state={{ roleRestriction: "admin" }}>
                                <button className="btn btn-primary shadow-md mr-2">
                                    Add Admin
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {adminsData?.length > 0 ? (
                    <div className="intro-y col-span-12 overflow-auto">
                        <table className="table table-report -mt-2">
                            <thead className="bg-purple-200">
                                <tr>
                                    <th className="text-left whitespace-nowrap">Name</th>
                                    <th className="text-left whitespace-nowrap">Email</th>
                                    <th className="text-left whitespace-nowrap">Role</th>
                                    <th className="text-left whitespace-nowrap">Email Verified</th>
                                    <th className="text-left whitespace-nowrap">Created Date</th>
                                    <th className="text-left whitespace-nowrap">Status</th>
                                    <th className="text-center whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminsData?.map((user, index) => (
                                    <tr key={index} className="intro-x">
                                        <td className="text-left whitespace-nowrap">
                                            {user.name?.firstName} {user.name?.lastName}
                                        </td>
                                        <td className="text-left whitespace-nowrap">{user.email}</td>
                                        <td
                                            className={`text-left text-[12px] font-semibold ${user.role === "superAdmin" ? "text-purple-600" : "text-blue-600"
                                                }`}
                                        >
                                            {user.role === "superAdmin" ? "Super Admin" : "Admin"}
                                        </td>
                                        <td
                                            className={`text-left font-bold ${user.emailStatus === "verified" ? "text-green-500" : "text-red-500"
                                                }`}
                                        >
                                            {user.emailStatus === "verified" ? "Verified" : "Not Verified"}
                                        </td>
                                        <td className="text-left">
                                            {user.createdAt
                                                ? new Intl.DateTimeFormat("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                }).format(new Date(user.createdAt))
                                                : "-"}
                                        </td>
                                        <td
                                            className={`text-left ${user.status === "active" ? "text-green-500" : "text-red-500"
                                                }`}
                                        >
                                            {user.status === "active" ? "Active" : "Blocked"}
                                        </td>
                                        <td className="w-64">
                                            <div className="flex justify-center items-center gap-2">
                                                <div
                                                    onClick={() => navigate("/add-users", { state: { data: user, roleRestriction: "admin" } })}
                                                    className="flex items-center cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Lucide icon="Edit" className="w-4 h-4 mr-1" />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setDeleteConfirmationModal(true);
                                                        setSelectedUser(user);
                                                    }}
                                                    className="flex items-center text-red-500 cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Lucide icon="Trash2" className="w-4 h-4 mr-1" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {meta.total > itemsPerPage && (
                            <div className="flex justify-between items-center mt-4 px-4">
                                <div className="text-sm text-slate-500">
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                    {Math.min(currentPage * itemsPerPage, meta.total)} of{" "}
                                    {meta.total} entries
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
                                    {[...Array(totalPages)].map((_, index) => (
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
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 rounded ${currentPage === totalPages
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
                        No admin users found.
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
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
                            Do you really want to delete {selectedUser?.name?.firstName}{" "}
                            {selectedUser?.name?.lastName}? This process cannot be undone.
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
                            onClick={() => handleDelete(selectedUser._id)}
                            className="btn btn-danger w-24"
                            disabled={isDeleting}
                        >
                            {isDeleting ? <LoadingIcon icon="oval" className="w-4 h-4" /> : "Delete"}
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default AllAdmin;
