// src/pages/Payments.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Tabs } from "./Tabs";
import logoImg from "../../assets/logo.svg";
import { Button } from "./Button";
import { Lucide, Modal, ModalBody } from "../../base-components";
import {
  useGetAllCourierJobsPaymentsQuery,
  useGetAllCourierJobsPaymentsWeeklyQuery,
} from "../../redux/features/payment/paymentApi";
import { useRef } from "react";
// import html2pdf from "html2pdf.js";
const Payments = () => {
  const invoiceRef = useRef();
  const invoiceHistoryRef = useRef(null);
  // const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showConfirmationHistoryModal, setShowConfirmationHistoryModal] = useState(false);
  const [activeTab, setActiveTab] = useState("current");
  const [pendingPayments, setPendingPayments] = useState([
    {
      courier: {
        _id: "1",
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
      },
      jobCount: 15,
      totalEarning: 450.0,
      commissionPercentage: 10,
      commissionAmount: 45.0,
      finalPayout: 405.0,
      dateRange: {
        from: new Date(2025, 9, 1),
        to: new Date(2025, 9, 7),
      },
    },
    {
      courier: {
        _id: "2",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.j@example.com",
      },
      jobCount: 22,
      totalEarning: 660.0,
      commissionPercentage: 10,
      commissionAmount: 66.0,
      finalPayout: 594.0,
      dateRange: {
        from: new Date(2025, 9, 1),
        to: new Date(2025, 9, 7),
      },
    },
    {
      courier: {
        _id: "3",
        firstName: "Michael",
        lastName: "Brown",
        email: "m.brown@example.com",
      },
      jobCount: 18,
      totalEarning: 540.0,
      commissionPercentage: 10,
      commissionAmount: 54.0,
      finalPayout: 486.0,
      dateRange: {
        from: new Date(2025, 9, 1),
        to: new Date(2025, 9, 7),
      },
    },
    {
      courier: {
        _id: "4",
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@example.com",
      },
      jobCount: 12,
      totalEarning: 360.0,
      commissionPercentage: 10,
      commissionAmount: 36.0,
      finalPayout: 324.0,
      dateRange: {
        from: new Date(2025, 9, 1),
        to: new Date(2025, 9, 7),
      },
    },
    {
      courier: {
        _id: "5",
        firstName: "Daniel",
        lastName: "Moore",
        email: "daniel.m@example.com",
      },
      jobCount: 20,
      totalEarning: 600.0,
      commissionPercentage: 10,
      commissionAmount: 60.0,
      finalPayout: 540.0,
      dateRange: {
        from: new Date(2025, 9, 1),
        to: new Date(2025, 9, 7),
      },
    },
    {
      courier: {
        _id: "6",
        firstName: "Jessica",
        lastName: "Lee",
        email: "jessica.lee@example.com",
      },
      jobCount: 16,
      totalEarning: 480.0,
      commissionPercentage: 10,
      commissionAmount: 48.0,
      finalPayout: 432.0,
      dateRange: {
        from: new Date(2025, 9, 1),
        to: new Date(2025, 9, 7),
      },
    },
    {
      courier: {
        _id: "7",
        firstName: "Christopher",
        lastName: "White",
        email: "chris.w@example.com",
      },
      jobCount: 14,
      totalEarning: 420.0,
      commissionPercentage: 10,
      commissionAmount: 42.0,
      finalPayout: 378.0,
      dateRange: {
        from: new Date(2025, 9, 1),
        to: new Date(2025, 9, 7),
      },
    },
    {
      courier: {
        _id: "8",
        firstName: "Amanda",
        lastName: "Harris",
        email: "amanda.h@example.com",
      },
      jobCount: 25,
      totalEarning: 750.0,
      commissionPercentage: 10,
      commissionAmount: 75.0,
      finalPayout: 675.0,
      dateRange: {
        from: new Date(2025, 9, 1),
        to: new Date(2025, 9, 7),
      },
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: paymentWeeklyData,
    isLoading,
    isError,
  } = useGetAllCourierJobsPaymentsWeeklyQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchQuery,
  });

  const { data: paymentAllJobsData, isLoading: isLoadings } =
    useGetAllCourierJobsPaymentsQuery({
      page: currentPage,
      limit: itemsPerPage,
      searchTerm: searchQuery,
    });

  console.log("Weekly Payments:", paymentWeeklyData?.data);
  console.log("All Jobs Payments:", paymentAllJobsData?.data);

  const [history, setHistory] = useState([
    {
      _id: "h1",
      courier: {
        firstName: "David",
        lastName: "Wilson",
        email: "david.w@example.com",
      },
      jobsPaid: [
        "job1",
        "job2",
        "job3",
        "job4",
        "job5",
        "job6",
        "job7",
        "job8",
        "job9",
        "job10",
      ],
      totalEarning: 300.0,
      commissionPercentage: 10,
      commissionAmount: 30.0,
      finalPayout: 270.0,
      paidOn: new Date(2025, 8, 30),
      dateRange: {
        from: new Date(2025, 8, 24),
        to: new Date(2025, 8, 30),
      },
    },
    {
      _id: "h2",
      courier: {
        firstName: "Lisa",
        lastName: "Anderson",
        email: "lisa.a@example.com",
      },
      jobsPaid: [
        "job11",
        "job12",
        "job13",
        "job14",
        "job15",
        "job16",
        "job17",
        "job18",
        "job19",
        "job20",
        "job21",
        "job22",
        "job23",
        "job24",
        "job25",
      ],
      totalEarning: 750.0,
      commissionPercentage: 10,
      commissionAmount: 75.0,
      finalPayout: 675.0,
      paidOn: new Date(2025, 8, 30),
      dateRange: {
        from: new Date(2025, 8, 24),
        to: new Date(2025, 8, 30),
      },
    },
    {
      _id: "h3",
      courier: {
        firstName: "Robert",
        lastName: "Martinez",
        email: "r.martinez@example.com",
      },
      jobsPaid: [
        "job26",
        "job27",
        "job28",
        "job29",
        "job30",
        "job31",
        "job32",
        "job33",
        "job34",
        "job35",
        "job36",
        "job37",
      ],
      totalEarning: 480.0,
      commissionPercentage: 10,
      commissionAmount: 48.0,
      finalPayout: 432.0,
      paidOn: new Date(2025, 8, 23),
      dateRange: {
        from: new Date(2025, 8, 17),
        to: new Date(2025, 8, 23),
      },
    },
    {
      _id: "h4",
      courier: {
        firstName: "Jennifer",
        lastName: "Taylor",
        email: "jen.taylor@example.com",
      },
      jobsPaid: [
        "job38",
        "job39",
        "job40",
        "job41",
        "job42",
        "job43",
        "job44",
        "job45",
      ],
      totalEarning: 320.0,
      commissionPercentage: 10,
      commissionAmount: 32.0,
      finalPayout: 288.0,
      paidOn: new Date(2025, 8, 23),
      dateRange: {
        from: new Date(2025, 8, 17),
        to: new Date(2025, 8, 23),
      },
    },
    {
      _id: "h5",
      courier: {
        firstName: "James",
        lastName: "Garcia",
        email: "james.g@example.com",
      },
      jobsPaid: [
        "job46",
        "job47",
        "job48",
        "job49",
        "job50",
        "job51",
        "job52",
        "job53",
        "job54",
        "job55",
        "job56",
        "job57",
        "job58",
        "job59",
        "job60",
        "job61",
        "job62",
        "job63",
        "job64",
        "job65",
      ],
      totalEarning: 900.0,
      commissionPercentage: 10,
      commissionAmount: 90.0,
      finalPayout: 810.0,
      paidOn: new Date(2025, 8, 16),
      dateRange: {
        from: new Date(2025, 8, 10),
        to: new Date(2025, 8, 16),
      },
    },
    {
      _id: "h6",
      courier: {
        firstName: "Patricia",
        lastName: "Rodriguez",
        email: "patricia.r@example.com",
      },
      jobsPaid: [
        "job66",
        "job67",
        "job68",
        "job69",
        "job70",
        "job71",
        "job72",
        "job73",
        "job74",
        "job75",
        "job76",
        "job77",
        "job78",
      ],
      totalEarning: 520.0,
      commissionPercentage: 10,
      commissionAmount: 52.0,
      finalPayout: 468.0,
      paidOn: new Date(2025, 8, 9),
      dateRange: {
        from: new Date(2025, 8, 3),
        to: new Date(2025, 8, 9),
      },
    },
    {
      _id: "h7",
      courier: {
        firstName: "Thomas",
        lastName: "Lewis",
        email: "thomas.l@example.com",
      },
      jobsPaid: [
        "job79",
        "job80",
        "job81",
        "job82",
        "job83",
        "job84",
        "job85",
        "job86",
        "job87",
        "job88",
      ],
      totalEarning: 400.0,
      commissionPercentage: 10,
      commissionAmount: 40.0,
      finalPayout: 360.0,
      paidOn: new Date(2025, 8, 9),
      dateRange: {
        from: new Date(2025, 8, 3),
        to: new Date(2025, 8, 9),
      },
    },
    {
      _id: "h8",
      courier: {
        firstName: "Nancy",
        lastName: "Walker",
        email: "nancy.w@example.com",
      },
      jobsPaid: [
        "job89",
        "job90",
        "job91",
        "job92",
        "job93",
        "job94",
        "job95",
        "job96",
        "job97",
        "job98",
        "job99",
        "job100",
        "job101",
        "job102",
        "job103",
        "job104",
      ],
      totalEarning: 640.0,
      commissionPercentage: 10,
      commissionAmount: 64.0,
      finalPayout: 576.0,
      paidOn: new Date(2025, 8, 2),
      dateRange: {
        from: new Date(2025, 7, 27),
        to: new Date(2025, 8, 2),
      },
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState({});
  // const [currentPage, setCurrentPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  // const itemsPerPage = 10;

  const handlePdfGenerate = async (selectedCourier) => {
      const { default: html2pdf } = await import("html2pdf.js");

    if (!invoiceRef.current) return;

    // ✅ wait for full render
    await new Promise((resolve) => setTimeout(resolve, 800));

    //    const opt = {
    //   margin:       10,
    //   filename:     `invoice_${selectedCourier?.courier?._id}.pdf`,
    //   image:        { type: 'jpeg', quality: 0.98 },
    //   html2canvas:  { scale: 2 },
    //   jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    // };
    const opt = {
      margin: 0,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true, // optional debug
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    await html2pdf().set(opt).from(invoiceRef.current).save();

    // 👉 your existing logic
    toast.success("Invoice downloaded & payment processed");

    setShowConfirmation(false);
  };

  const openConfirmation = (courier) => {
    setSelectedCourier(courier);
    setShowConfirmation(true);
  };
  const openConfirmationHistory = (courierData) => {
    // setSelectedCourier(courier);
    // setShowConfirmation(true);


    setShowConfirmationHistoryModal(true);
    setSelectedCourier(courierData);

    // setDeleteConfirmationModal(true);
    // setSelectedCourier(courierData);
  };


  const handlePdfGenerateHistory = async (courierData) => {
    const { default: html2pdf } = await import("html2pdf.js");
   if (!invoiceHistoryRef.current) return;

    // ✅ wait for full render
    await new Promise((resolve) => setTimeout(resolve, 800));
    const opt = {
      margin: 0,
      filename: "invoice_history.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true, // optional debug
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    await html2pdf().set(opt).from(invoiceHistoryRef.current).save();

    // 👉 your existing logic
    toast.success("Invoice downloaded processed");

    setShowConfirmationHistoryModal(false);
  };
  // const handlePdfGenerateHistory = (id) => {
  //   // Dummy implementation - remove from history
  //   setHistory((prev) => prev.filter((payment) => payment._id !== id));
  //   toast.success("Payment entry deleted");
  //   setShowConfirmationHistoryModal(false);
  //   // setDeleteConfirmationModal(false);
  //   setSelectedCourier(null);
  // };

  // Pagination calculations
  const indexOfLastPending = currentPage * itemsPerPage;
  const indexOfFirstPending = indexOfLastPending - itemsPerPage;
  const currentPendingPayments = pendingPayments.slice(
    indexOfFirstPending,
    indexOfLastPending,
  );
  const totalPendingPages = Math.ceil(pendingPayments.length / itemsPerPage);

  const indexOfLastHistory = historyPage * itemsPerPage;
  const indexOfFirstHistory = indexOfLastHistory - itemsPerPage;
  const currentHistoryPayments = history.slice(
    indexOfFirstHistory,
    indexOfLastHistory,
  );
  const totalHistoryPages = Math.ceil(history.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleHistoryPageChange = (page) => {
    setHistoryPage(page);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const todayNL = new Date();
  const formattedDate = todayNL
    .toLocaleDateString("en-GB", {
      timeZone: "Europe/Amsterdam",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Tabs
        // className="px-4 py-2 rounded bg-red-500 text-white"
        active={activeTab}
        onTabChange={setActiveTab}
        tabs={["current", "history"]}
        activeClass="bg-red-500 text-white"
        inactiveClass="bg-gray-200 text-black"
      />

      {loading && <p className="mt-4 text-center">Loading...</p>}

      {activeTab === "current" && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Pending Payments</h2>
          <div className="overflow-auto rounded-xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                  <th className="p-3">Courier</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Job Count</th>
                  <th className="p-3">Total-BTW EXCL</th>
                  <th className="p-3">BTW</th>
                  <th className="p-3">Final INCL</th>
                  <th className="p-3">From - To</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentWeeklyData?.data?.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      {item.courier?.name?.firstName}{" "}
                      {item.courier?.name?.lastName}
                    </td>
                    <td className="p-3">{item.courier?.email}</td>
                    <td className="p-3">{item.jobCount}</td>
                    <td className="p-3">
                      €{item?.summary?.totalExcl?.toFixed(2) || ""}
                    </td>
                    <td className="p-3">
                      21% (€{item.summary?.btw?.toFixed(2) || 0})
                    </td>
                    {/* <td className="p-3">{item.commissionPercentage || 0}% (€{item.commissionAmount?.toFixed(2) || 0})</td> */}
                    <td className="p-3">
                      €{item?.summary?.totalIncl?.toFixed(2)}
                    </td>
                    <td className="p-3">{item.invoicePeriod}</td>
                    {/* <td className="p-3">{new Date(item.invoicePeriod.from).toLocaleDateString()} - {new Date(item.dateRange.to).toLocaleDateString()}</td> */}
                    <td className="p-3">
                      <Button
                      className="bg-lime-600 rounded border hover:bg-lime-500"
                        onClick={() => openConfirmation(item)}
                        // onClick={() => openConfirmation(item.courier._id)}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination for Pending Payments */}
          {totalPendingPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              {Array.from({ length: totalPendingPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPendingPages}
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
          <div className="overflow-auto rounded-xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                  <th className="p-3">Courier</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Jobs</th>
                  <th className="p-3">Earnings- BTW EXCL</th>
                  <th className="p-3">BTW</th>
                  <th className="p-3">Final INCL</th>
                  {/* <th className="p-3">Paid On</th> */}
                  <th className="p-3">Paid From - To</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentAllJobsData?.data?.map((payment, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3">
                      {payment.courier?.name?.firstName}{" "}
                      {payment.courier?.name?.lastName}
                    </td>
                    <td className="p-3">{payment.courier?.email}</td>
                    <td className="p-3">{payment.jobCount}</td>
                    <td className="p-3">
                      €{payment?.summary?.totalExcl.toFixed(2)}
                    </td>
                    <td className="p-3">
                      21% (€{payment?.summary?.btw.toFixed(2)})
                    </td>
                    {/* <td className="p-3">{payment.commissionPercentage}% (${payment.commissionAmount.toFixed(2)})</td> */}
                    <td className="p-3">
                      €{payment?.summary?.totalIncl.toFixed(2)}
                    </td>
                    {/* <td className="p-3">{new Date(payment.paidOn).toLocaleDateString()}</td> */}
                    <td className="p-3">{payment.invoicePeriod}</td>
                    <td className="p-3">
                      <Button
                        variant=""
                          className="bg-lime-600 rounded border hover:bg-lime-500"
                      onClick={() => openConfirmationHistory(payment)}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination for History */}
          {totalHistoryPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => handleHistoryPageChange(historyPage - 1)}
                disabled={historyPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              {Array.from({ length: totalHistoryPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handleHistoryPageChange(page)}
                    className={`px-3 py-1 rounded border ${
                      historyPage === page
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handleHistoryPageChange(historyPage + 1)}
                disabled={historyPage === totalHistoryPages}
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}


      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 flex-col">
          <div
            ref={invoiceRef}
            style={{
              width: "190mm",
              // padding: "10mm",
              background: "#fff",
              margin: "auto",
              marginBottom: "0",
              marginTop: "0",
            }}
          >
            <div className="bg-white rounded-lg ">
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  padding: "20px",
                  maxWidth: "800px",
                  margin: "auto",
                }}
              >
                {/* <!-- Header with centered logo --> */}
                <div className="flex justify-center mb-4">
                  <img
                    src={logoImg}
                    // src="https://courier-bucket-graham.s3.eu-central-1.amazonaws.com/logo.svg"
                    width="120"
                    alt="Koerierplatform Logo"
                  />
                </div>

                {/* <!-- Top Row: User Info + Invoice Dates (Left) | Company Info (Right) --> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    marginBottom: "40px",
                  }}
                >
                  {/* <!-- LEFT: User Info + Invoice Dates --> */}
                  <div style={{ flex: 1, marginRight: "10px" }}>
                    <p style={{ margin: 0 }}>
                      <strong>Factuur aan:</strong>
                      <br />
                      {selectedCourier?.courier?.companyName ||
                        `${selectedCourier?.courier?.name?.firstName} ${selectedCourier?.courier?.name?.lastName}` ||
                        "N/A"}
                      <br />
                      {selectedCourier?.courier?.companyLocation}
                      <br />
                      {selectedCourier?.courier?.country || "NL"}
                      <br />
                      {selectedCourier?.courier?.kvkNumber ? (
                        <>
                          KvK nr: {selectedCourier.courier.kvkNumber}
                          <br />
                        </>
                      ) : (
                        <>
                          Not Added
                          <br />
                        </>
                      )}
                      {selectedCourier?.courier?.kvkNumber ? (
                        <>
                          BTW nr: {selectedCourier.courier.btwNumber}
                          <br />
                        </>
                      ) : (
                        <>
                          Not Added
                          <br />
                        </>
                      )}
                    </p>
                    <p style={{ marginTop: "10px" }}>
                      <strong>Factuurdatum:</strong> {formattedDate}
                      <br />
                      <strong>Factuurperiode:</strong>
                      {selectedCourier.invoicePeriod}
                    </p>
                  </div>

                  {/* <!-- RIGHT: Company Info --> */}
                  <div
                    style={{ flex: 1, textAlign: "right", marginLeft: "20px" }}
                  >
                    <p style={{ margin: 0 }}>
                      <strong>Koerierplatform</strong>
                      <br />
                      Telefoonstraat 5<br />
                      4702PH Roosendaal
                      <br />
                      NL
                      <br />
                      KvK nr: 92037798
                      <br />
                      IBAN: NL73 INGB 0106 5552 43
                      <br />
                      BIC: INGBNL2A
                      <br />
                      BTW nr: NL0049.32.489.B13
                    </p>
                  </div>
                </div>

                {/* <!-- Invoice Table --> */}
                <table
                  width="100%"
                  // border="1"
                  cellSpacing="0"
                  cellPadding="0"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr style={{ pageBreakInside: "avoid" }}>
                      <th
                        style={{ padding: "10px", border: "2px solid #ddd" }}
                        className="p-2"
                      >
                        ID
                      </th>
                      <th
                        style={{ padding: "10px", border: "2px solid #ddd" }}
                        className="p-2"
                      >
                        Beschrijving
                      </th>
                      <th
                        style={{ padding: "10px", border: "2px solid #ddd" }}
                        className="p-2"
                      >
                        Excl. BTW
                      </th>
                      <th
                        style={{ padding: "10px", border: "2px solid #ddd" }}
                        className="p-2"
                      >
                        Incl. BTW
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-5">
                    {selectedCourier?.jobs?.map((job, index) => (
                      <tr style={{ pageBreakInside: "avoid" }} key={job._id}>
                        <td
                          style={{ padding: "8px", border: "1px solid #eee" }}
                        >
                          {job.jobId}
                        </td>
                        <td
                          style={{ padding: "8px", border: "1px solid #eee" }}
                        >
                          {job.deliveryAddress?.streetAddress ||
                            job.deliveryDateInfo?.timeSlot ||
                            "-"}
                        </td>
                        <td
                          style={{ padding: "8px", border: "1px solid #eee" }}
                        >
                          € {job.btwExcld?.toFixed(2)}
                        </td>
                        <td
                          style={{ padding: "8px", border: "1px solid #eee" }}
                        >
                          € {job.courierPrice?.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* <!-- Totals Right-Aligned with margin below --> */}
                <div
                  style={{
                    textAlign: "right",
                    marginTop: "50px",
                    marginBottom: "15px",
                  }}
                >
                  <p style={{ margin: "2px 0" }}>
                    <strong className="mr-8">BTW (21%):</strong> €
                    {selectedCourier?.summary?.btw?.toFixed(2)}
                  </p>
                  <p style={{ margin: "2px 0" }}>
                    <strong className="mr-8">Totaal Excl. BTW:</strong> €
                    {selectedCourier?.summary?.totalExcl?.toFixed(2)}
                  </p>
                  <p style={{ margin: "2px 0" }}>
                    <strong className="mr-8">Totaal Incl. BTW:</strong> €
                    {selectedCourier?.summary?.totalIncl?.toFixed(2)}
                  </p>
                </div>

                <hr />

                {/* <!-- Footer Note --> */}
                <p
                  style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}
                >
                  Deze factuur bevat een overzicht van alle uitgevoerde
                  leveringen binnen de opgegeven periode. Bedankt voor uw inzet.
                </p>
              </div>
            </div>
          </div>



          <div style={{
              width: "190mm",
              // padding: "10mm",
              background: "#fff",
              // margin: "auto",
            }} >
            <div  className="flex justify-center items-center space-x-3 p-2 mb-2  ">
            <Button
              className="flex items-center justify-center h-10 px-4"
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex items-center justify-center h-10 px-4 bg-lime-500 text-white rounded" 
              onClick={() => handlePdfGenerate(selectedCourier)}
            >
              Confirm
            </Button>
           </div>
          </div>
        </div>
      )}

      {/* delete modal */}
      <Modal
        show={showConfirmationHistoryModal}
        onHidden={() => {
          setShowConfirmationHistoryModal(false);
        }}
      >
        <ModalBody className="p-0">
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 flex-col">
           <div
            ref={invoiceHistoryRef}
            style={{
              width: "190mm",
              // padding: "10mm",
              background: "#fff",
              margin: "auto",
              marginBottom: "0",
              marginTop: "0",
            }}
          >
            <div className="bg-white rounded-lg ">
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  padding: "20px",
                  maxWidth: "800px",
                  margin: "auto",
                }}
              >
                {/* <!-- Header with centered logo --> */}
                <div className="flex justify-center mb-4">
                  <img
                    src={logoImg}
                    // src="https://courier-bucket-graham.s3.eu-central-1.amazonaws.com/logo.svg"
                    width="120"
                    alt="Koerierplatform Logo"
                  />
                </div>

                {/* <!-- Top Row: User Info + Invoice Dates (Left) | Company Info (Right) --> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    marginBottom: "40px",
                  }}
                >
                  {/* <!-- LEFT: User Info + Invoice Dates --> */}
                  <div style={{ flex: 1, marginRight: "10px" }}>
                    <p style={{ margin: 0 }}>
                      <strong>Factuur aan:</strong>
                      <br />
                      {selectedCourier?.courier?.companyName ||
                        `${selectedCourier?.courier?.name?.firstName} ${selectedCourier?.courier?.name?.lastName}` ||
                        "N/A"}
                      <br />
                      {selectedCourier?.courier?.companyLocation}
                      <br />
                      {selectedCourier?.courier?.country || "NL"}
                      <br />
                      {selectedCourier?.courier?.kvkNumber ? (
                        <>
                          KvK nr: {selectedCourier.courier.kvkNumber}
                          <br />
                        </>
                      ) : (
                        <>
                          Not Added
                          <br />
                        </>
                      )}
                      {selectedCourier?.courier?.kvkNumber ? (
                        <>
                          BTW nr: {selectedCourier.courier.btwNumber}
                          <br />
                        </>
                      ) : (
                        <>
                          Not Added
                          <br />
                        </>
                      )}
                    </p>
                    <p style={{ marginTop: "10px" }}>
                      <strong>Factuurdatum:</strong> {formattedDate}
                      <br />
                      <strong>Factuurperiode:</strong>
                      {selectedCourier.invoicePeriod}
                    </p>
                  </div>

                  {/* <!-- RIGHT: Company Info --> */}
                  <div
                    style={{ flex: 1, textAlign: "right", marginLeft: "20px" }}
                  >
                    <p style={{ margin: 0 }}>
                      <strong>Koerierplatform</strong>
                      <br />
                      Telefoonstraat 5<br />
                      4702PH Roosendaal
                      <br />
                      NL
                      <br />
                      KvK nr: 92037798
                      <br />
                      IBAN: NL73 INGB 0106 5552 43
                      <br />
                      BIC: INGBNL2A
                      <br />
                      BTW nr: NL0049.32.489.B13
                    </p>
                  </div>
                </div>

                {/* <!-- Invoice Table --> */}
                <table
                  width="100%"
                  // border="1"
                  cellSpacing="0"
                  cellPadding="0"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr style={{ pageBreakInside: "avoid" }}>
                      <th
                        style={{ padding: "10px", border: "2px solid #ddd" }}
                        className="p-2"
                      >
                        ID
                      </th>
                      <th
                        style={{ padding: "10px", border: "2px solid #ddd" }}
                        className="p-2"
                      >
                        Beschrijving
                      </th>
                      <th
                        style={{ padding: "10px", border: "2px solid #ddd" }}
                        className="p-2"
                      >
                        Excl. BTW
                      </th>
                      <th
                        style={{ padding: "10px", border: "2px solid #ddd" }}
                        className="p-2"
                      >
                        Incl. BTW
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-5">
                    {selectedCourier?.jobs?.map((job, index) => (
                      <tr style={{ pageBreakInside: "avoid" }} key={job._id}>
                        <td
                          style={{ padding: "8px", border: "1px solid #eee" }}
                        >
                          {job.jobId}
                        </td>
                        <td
                          style={{ padding: "8px", border: "1px solid #eee" }}
                        >
                          {job.deliveryAddress?.streetAddress ||
                            job.deliveryDateInfo?.timeSlot ||
                            "-"}
                        </td>
                        <td
                          style={{ padding: "8px", border: "1px solid #eee" }}
                        >
                          € {job.btwExcld?.toFixed(2)}
                        </td>
                        <td
                          style={{ padding: "8px", border: "1px solid #eee" }}
                        >
                          € {job.courierPrice?.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* <!-- Totals Right-Aligned with margin below --> */}
                <div
                  style={{
                    textAlign: "right",
                    marginTop: "50px",
                    marginBottom: "15px",
                  }}
                >
                  <p style={{ margin: "2px 0" }}>
                    <strong className="mr-8">BTW (21%):</strong> €
                    {selectedCourier?.summary?.btw?.toFixed(2)}
                  </p>
                  <p style={{ margin: "2px 0" }}>
                    <strong className="mr-8">Totaal Excl. BTW:</strong> €
                    {selectedCourier?.summary?.totalExcl?.toFixed(2)}
                  </p>
                  <p style={{ margin: "2px 0" }}>
                    <strong className="mr-8">Totaal Incl. BTW:</strong> €
                    {selectedCourier?.summary?.totalIncl?.toFixed(2)}
                  </p>
                </div>

                <hr />

                {/* <!-- Footer Note --> */}
                <p
                  style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}
                >
                  Deze factuur bevat een overzicht van alle uitgevoerde
                  leveringen binnen de opgegeven periode. Bedankt voor uw inzet.
                </p>
              </div>
            </div>
          </div>



           <div style={{
              width: "190mm",
              // padding: "10mm",
              background: "#fff",
              // margin: "auto",
            }}>
           <div className="flex justify-center items-center space-x-3 p-2 mb-2 ">
             <button
              // type="button"
              variant="outline" 
              onClick={() => {
                setShowConfirmationHistoryModal(false);
                // setDeleteConfirmationModal(false);
              }}
              className="flex items-center justify-center h-10 px-4 font-bold"
            >
              Cancel
            </button>
            <button
              // type="button"
              variant="outline" 
              onClick={() => handlePdfGenerateHistory(selectedCourier)}
              className="flex items-center justify-center h-10 px-4 bg-lime-500 text-white rounded font-bold"
            >
              Confirm
            </button>
           </div>
          </div>
         </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Payments;
///////////////////////////////////
// src/pages/Payments.jsx
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { Tabs } from "./Tabs";
// import { Button } from "./Button";
// import { Lucide, Modal, ModalBody } from "../../base-components";

// const Payments = () => {
//   const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

//   const [activeTab, setActiveTab] = useState("current");
//   const [pendingPayments, setPendingPayments] = useState([
//     {
//       courier: {
//         _id: "1",
//         firstName: "John",
//         lastName: "Smith",
//         email: "john.smith@example.com"
//       },
//       jobCount: 15,
//       totalEarning: 450.00,
//       commissionPercentage: 10,
//       commissionAmount: 45.00,
//       finalPayout: 405.00,
//       dateRange: {
//         from: new Date(2025, 9, 1),
//         to: new Date(2025, 9, 7)
//       }
//     },
//     {
//       courier: {
//         _id: "2",
//         firstName: "Sarah",
//         lastName: "Johnson",
//         email: "sarah.j@example.com"
//       },
//       jobCount: 22,
//       totalEarning: 660.00,
//       commissionPercentage: 10,
//       commissionAmount: 66.00,
//       finalPayout: 594.00,
//       dateRange: {
//         from: new Date(2025, 9, 1),
//         to: new Date(2025, 9, 7)
//       }
//     },
//     {
//       courier: {
//         _id: "3",
//         firstName: "Michael",
//         lastName: "Brown",
//         email: "m.brown@example.com"
//       },
//       jobCount: 18,
//       totalEarning: 540.00,
//       commissionPercentage: 10,
//       commissionAmount: 54.00,
//       finalPayout: 486.00,
//       dateRange: {
//         from: new Date(2025, 9, 1),
//         to: new Date(2025, 9, 7)
//       }
//     },
//     {
//       courier: {
//         _id: "4",
//         firstName: "Emily",
//         lastName: "Davis",
//         email: "emily.davis@example.com"
//       },
//       jobCount: 12,
//       totalEarning: 360.00,
//       commissionPercentage: 10,
//       commissionAmount: 36.00,
//       finalPayout: 324.00,
//       dateRange: {
//         from: new Date(2025, 9, 1),
//         to: new Date(2025, 9, 7)
//       }
//     },
//     {
//       courier: {
//         _id: "5",
//         firstName: "Daniel",
//         lastName: "Moore",
//         email: "daniel.m@example.com"
//       },
//       jobCount: 20,
//       totalEarning: 600.00,
//       commissionPercentage: 10,
//       commissionAmount: 60.00,
//       finalPayout: 540.00,
//       dateRange: {
//         from: new Date(2025, 9, 1),
//         to: new Date(2025, 9, 7)
//       }
//     },
//     {
//       courier: {
//         _id: "6",
//         firstName: "Jessica",
//         lastName: "Lee",
//         email: "jessica.lee@example.com"
//       },
//       jobCount: 16,
//       totalEarning: 480.00,
//       commissionPercentage: 10,
//       commissionAmount: 48.00,
//       finalPayout: 432.00,
//       dateRange: {
//         from: new Date(2025, 9, 1),
//         to: new Date(2025, 9, 7)
//       }
//     },
//     {
//       courier: {
//         _id: "7",
//         firstName: "Christopher",
//         lastName: "White",
//         email: "chris.w@example.com"
//       },
//       jobCount: 14,
//       totalEarning: 420.00,
//       commissionPercentage: 10,
//       commissionAmount: 42.00,
//       finalPayout: 378.00,
//       dateRange: {
//         from: new Date(2025, 9, 1),
//         to: new Date(2025, 9, 7)
//       }
//     },
//     {
//       courier: {
//         _id: "8",
//         firstName: "Amanda",
//         lastName: "Harris",
//         email: "amanda.h@example.com"
//       },
//       jobCount: 25,
//       totalEarning: 750.00,
//       commissionPercentage: 10,
//       commissionAmount: 75.00,
//       finalPayout: 675.00,
//       dateRange: {
//         from: new Date(2025, 9, 1),
//         to: new Date(2025, 9, 7)
//       }
//     }
//   ]);
//   const [history, setHistory] = useState([
//     {
//       _id: "h1",
//       courier: {
//         firstName: "David",
//         lastName: "Wilson",
//         email: "david.w@example.com"
//       },
//       jobsPaid: ["job1", "job2", "job3", "job4", "job5", "job6", "job7", "job8", "job9", "job10"],
//       totalEarning: 300.00,
//       commissionPercentage: 10,
//       commissionAmount: 30.00,
//       finalPayout: 270.00,
//       paidOn: new Date(2025, 8, 30),
//       dateRange: {
//         from: new Date(2025, 8, 24),
//         to: new Date(2025, 8, 30)
//       }
//     },
//     {
//       _id: "h2",
//       courier: {
//         firstName: "Lisa",
//         lastName: "Anderson",
//         email: "lisa.a@example.com"
//       },
//       jobsPaid: ["job11", "job12", "job13", "job14", "job15", "job16", "job17", "job18", "job19", "job20", "job21", "job22", "job23", "job24", "job25"],
//       totalEarning: 750.00,
//       commissionPercentage: 10,
//       commissionAmount: 75.00,
//       finalPayout: 675.00,
//       paidOn: new Date(2025, 8, 30),
//       dateRange: {
//         from: new Date(2025, 8, 24),
//         to: new Date(2025, 8, 30)
//       }
//     },
//     {
//       _id: "h3",
//       courier: {
//         firstName: "Robert",
//         lastName: "Martinez",
//         email: "r.martinez@example.com"
//       },
//       jobsPaid: ["job26", "job27", "job28", "job29", "job30", "job31", "job32", "job33", "job34", "job35", "job36", "job37"],
//       totalEarning: 480.00,
//       commissionPercentage: 10,
//       commissionAmount: 48.00,
//       finalPayout: 432.00,
//       paidOn: new Date(2025, 8, 23),
//       dateRange: {
//         from: new Date(2025, 8, 17),
//         to: new Date(2025, 8, 23)
//       }
//     },
//     {
//       _id: "h4",
//       courier: {
//         firstName: "Jennifer",
//         lastName: "Taylor",
//         email: "jen.taylor@example.com"
//       },
//       jobsPaid: ["job38", "job39", "job40", "job41", "job42", "job43", "job44", "job45"],
//       totalEarning: 320.00,
//       commissionPercentage: 10,
//       commissionAmount: 32.00,
//       finalPayout: 288.00,
//       paidOn: new Date(2025, 8, 23),
//       dateRange: {
//         from: new Date(2025, 8, 17),
//         to: new Date(2025, 8, 23)
//       }
//     },
//     {
//       _id: "h5",
//       courier: {
//         firstName: "James",
//         lastName: "Garcia",
//         email: "james.g@example.com"
//       },
//       jobsPaid: ["job46", "job47", "job48", "job49", "job50", "job51", "job52", "job53", "job54", "job55", "job56", "job57", "job58", "job59", "job60", "job61", "job62", "job63", "job64", "job65"],
//       totalEarning: 900.00,
//       commissionPercentage: 10,
//       commissionAmount: 90.00,
//       finalPayout: 810.00,
//       paidOn: new Date(2025, 8, 16),
//       dateRange: {
//         from: new Date(2025, 8, 10),
//         to: new Date(2025, 8, 16)
//       }
//     },
//     {
//       _id: "h6",
//       courier: {
//         firstName: "Patricia",
//         lastName: "Rodriguez",
//         email: "patricia.r@example.com"
//       },
//       jobsPaid: ["job66", "job67", "job68", "job69", "job70", "job71", "job72", "job73", "job74", "job75", "job76", "job77", "job78"],
//       totalEarning: 520.00,
//       commissionPercentage: 10,
//       commissionAmount: 52.00,
//       finalPayout: 468.00,
//       paidOn: new Date(2025, 8, 9),
//       dateRange: {
//         from: new Date(2025, 8, 3),
//         to: new Date(2025, 8, 9)
//       }
//     },
//     {
//       _id: "h7",
//       courier: {
//         firstName: "Thomas",
//         lastName: "Lewis",
//         email: "thomas.l@example.com"
//       },
//       jobsPaid: ["job79", "job80", "job81", "job82", "job83", "job84", "job85", "job86", "job87", "job88"],
//       totalEarning: 400.00,
//       commissionPercentage: 10,
//       commissionAmount: 40.00,
//       finalPayout: 360.00,
//       paidOn: new Date(2025, 8, 9),
//       dateRange: {
//         from: new Date(2025, 8, 3),
//         to: new Date(2025, 8, 9)
//       }
//     },
//     {
//       _id: "h8",
//       courier: {
//         firstName: "Nancy",
//         lastName: "Walker",
//         email: "nancy.w@example.com"
//       },
//       jobsPaid: ["job89", "job90", "job91", "job92", "job93", "job94", "job95", "job96", "job97", "job98", "job99", "job100", "job101", "job102", "job103", "job104"],
//       totalEarning: 640.00,
//       commissionPercentage: 10,
//       commissionAmount: 64.00,
//       finalPayout: 576.00,
//       paidOn: new Date(2025, 8, 2),
//       dateRange: {
//         from: new Date(2025, 7, 27),
//         to: new Date(2025, 8, 2)
//       }
//     }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedCourier, setSelectedCourier] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [historyPage, setHistoryPage] = useState(1);
//   const itemsPerPage = 5;

//   const handleSendPayment = (courierId) => {
//     // Dummy implementation - move payment from pending to history
//     const paymentToSend = pendingPayments.find(p => p.courier._id === courierId);
//     if (paymentToSend) {
//       // Remove from pending
//       setPendingPayments(prev => prev.filter(p => p.courier._id !== courierId));

//       // Add to history
//       const newHistoryEntry = {
//         _id: `h${Date.now()}`,
//         courier: paymentToSend.courier,
//         jobsPaid: Array.from({ length: paymentToSend.jobCount }, (_, i) => `job${Date.now()}_${i}`),
//         totalEarning: paymentToSend.totalEarning,
//         commissionPercentage: paymentToSend.commissionPercentage,
//         commissionAmount: paymentToSend.commissionAmount,
//         finalPayout: paymentToSend.finalPayout,
//         paidOn: new Date(),
//         dateRange: paymentToSend.dateRange
//       };
//       setHistory(prev => [newHistoryEntry, ...prev]);

//       toast.success("Payment sent successfully");
//       setSelectedCourier(null);
//     }
//     setShowConfirmation(false);
//   };

//   const openConfirmation = (courierId) => {
//     setSelectedCourier(courierId);
//     setShowConfirmation(true);
//   };

//   const handleDelete = (id) => {
//     // Dummy implementation - remove from history
//     setHistory(prev => prev.filter(payment => payment._id !== id));
//     toast.success("Payment entry deleted");
//     setDeleteConfirmationModal(false);
//     setSelectedCourier(null);
//   };

//   // Pagination calculations
//   const indexOfLastPending = currentPage * itemsPerPage;
//   const indexOfFirstPending = indexOfLastPending - itemsPerPage;
//   const currentPendingPayments = pendingPayments.slice(indexOfFirstPending, indexOfLastPending);
//   const totalPendingPages = Math.ceil(pendingPayments.length / itemsPerPage);

//   const indexOfLastHistory = historyPage * itemsPerPage;
//   const indexOfFirstHistory = indexOfLastHistory - itemsPerPage;
//   const currentHistoryPayments = history.slice(indexOfFirstHistory, indexOfLastHistory);
//   const totalHistoryPages = Math.ceil(history.length / itemsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleHistoryPageChange = (page) => {
//     setHistoryPage(page);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <Tabs active={activeTab} onTabChange={setActiveTab} tabs={["current", "history"]} />

//       {loading && <p className="mt-4 text-center">Loading...</p>}

//       {activeTab === "current" && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-semibold mb-4">Pending Payments</h2>
//           <div className="overflow-auto rounded-xl shadow">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 text-xs uppercase">
//                 <tr>
//                   <th className="p-3">Courier</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Job Count</th>
//                   <th className="p-3">Total-BTW EXCL</th>
//                   <th className="p-3">BTW</th>
//                   <th className="p-3">Final INCL</th>
//                   <th className="p-3">From - To</th>
//                   <th className="p-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentPendingPayments?.map((item, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="p-3">{item.courier?.firstName} {item.courier?.lastName}</td>
//                     <td className="p-3">{item.courier?.email}</td>
//                     <td className="p-3">{item.jobCount}</td>
//                     <td className="p-3">€{item.totalEarning?.toFixed(2) || ''}</td>
//                     <td className="p-3">21% (€{item.commissionAmount?.toFixed(2) || 0})</td>
//                     {/* <td className="p-3">{item.commissionPercentage || 0}% (€{item.commissionAmount?.toFixed(2) || 0})</td> */}
//                     <td className="p-3">€{item.finalPayout?.toFixed(2)}</td>
//                     <td className="p-3">{new Date(item.dateRange.from).toLocaleDateString()} - {new Date(item.dateRange.to).toLocaleDateString()}</td>
//                     <td className="p-3">
//                        <Button onClick={() => openConfirmation(item.courier._id)}>Send Payment</Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination for Pending Payments */}
//           {totalPendingPages > 1 && (
//             <div className="flex justify-center items-center gap-2 mt-4">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: totalPendingPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-3 py-1 rounded border ${
//                     currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPendingPages}
//                 className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === "history" && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
//           <div className="overflow-auto rounded-xl shadow">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 text-xs uppercase">
//                 <tr>
//                   <th className="p-3">Courier</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Jobs</th>
//                   <th className="p-3">Earnings- BTW EXCL</th>
//                   <th className="p-3">BTW</th>
//                   <th className="p-3">Final INCL</th>
//                   {/* <th className="p-3">Paid On</th> */}
//                   <th className="p-3">Paid From - To</th>
//                   <th className="p-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentHistoryPayments.map((payment, idx) => (
//                   <tr key={idx} className="border-b">
//                     <td className="p-3">{payment.courier?.firstName} {payment.courier?.lastName}</td>
//                     <td className="p-3">{payment.courier?.email}</td>
//                     <td className="p-3">{payment.jobsPaid?.length}</td>
//                     <td className="p-3">€{payment.totalEarning.toFixed(2)}</td>
//                     <td className="p-3">21% (€{payment.commissionAmount.toFixed(2)})</td>
//                     {/* <td className="p-3">{payment.commissionPercentage}% (${payment.commissionAmount.toFixed(2)})</td> */}
//                     <td className="p-3">€{payment.finalPayout.toFixed(2)}</td>
//                     {/* <td className="p-3">{new Date(payment.paidOn).toLocaleDateString()}</td> */}
//                     <td className="p-3">{new Date(payment.dateRange.from).toLocaleDateString()} - {new Date(payment.dateRange.to).toLocaleDateString()}</td>
//                     <td className="p-3">
//                       <Button variant="destructive" onClick={() => {
//                             setDeleteConfirmationModal(true);
//                             setSelectedCourier(payment._id);
//                           }}>Delete</Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination for History */}
//           {totalHistoryPages > 1 && (
//             <div className="flex justify-center items-center gap-2 mt-4">
//               <button
//                 onClick={() => handleHistoryPageChange(historyPage - 1)}
//                 disabled={historyPage === 1}
//                 className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: totalHistoryPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => handleHistoryPageChange(page)}
//                   className={`px-3 py-1 rounded border ${
//                     historyPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button
//                 onClick={() => handleHistoryPageChange(historyPage + 1)}
//                 disabled={historyPage === totalHistoryPages}
//                 className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {showConfirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-md w-full">
//             <h3 className="text-xl font-semibold mb-4">Confirm Payment</h3>
//             <p className="mb-5">
//               Are you sure you want to send this payment? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowConfirmation(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={() => handleSendPayment(selectedCourier)}
//               >
//                 Confirm Payment
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* delete modal */}

//         <Modal
//               show={deleteConfirmationModal}
//               onHidden={() => {
//                 setDeleteConfirmationModal(false);
//               }}
//             >
//               <ModalBody className="p-0">
//                 <div className="p-5 text-center">
//                   <Lucide
//                     icon="XCircle"
//                     className="w-16 h-16 text-danger mx-auto mt-3"
//                   />
//                   <div className="text-3xl mt-5">Are you sure?</div>
//                   <div className="text-slate-500 mt-2">
//                     Do you really want to delete this record? This process cannot be
//                     undone.
//                   </div>
//                 </div>
//                 <div className="px-5 pb-8 text-center">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setDeleteConfirmationModal(false);
//                     }}
//                     className="btn btn-outline-secondary w-24 mr-1"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleDelete(selectedCourier)}
//                     className="btn btn-danger w-24"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </ModalBody>
//             </Modal>

//     </div>
//   );
// };

// export default Payments;
