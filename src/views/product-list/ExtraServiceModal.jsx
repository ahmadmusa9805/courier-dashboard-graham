import React, { useState, useEffect } from "react";
import useCreateOrEdit from "../../hooks/useCreateOrEdit";
import toast from "react-hot-toast";

const ExtraServiceModal = ({ isOpen, onClose, jobId, index = null, initialValues = {}, onSuccess, getJobDetails, onSave }) => {
  const [serviceType, setServiceType] = useState("service"); // "service" or "floor"
  const [options, setOptions] = useState("");
  const [price, setPrice] = useState("");
  const { submitData } = useCreateOrEdit();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues.options || initialValues.price) {
      setOptions(initialValues.options || "");
      setPrice(initialValues.price || "");
      setServiceType(initialValues.type || "service");
    } else {
      setOptions("");
      setPrice("");
      setServiceType("service");
    }
  }, [initialValues]);

  const handleSubmit = () => {
    if (!options) {
      toast.error("Options field is required.");
      return;
    }

    if (!price) {
      toast.error("Price is required.");
      return;
    }

    // Build the structure - both service and floor have options and price
    const newServiceData = {
      type: serviceType,
      data: {
        options,
        price: parseFloat(price)
      }
    };

    onSave(newServiceData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 className="font-bold uppercase mb-5">{index !== null ? "Edit Extra Service" : "Add Extra Service"}</h3>

        <label className="font-medium mb-1">Service Type:</label>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          style={styles.input}
          className="mb-3"
        >
          <option value="service">Service</option>
          <option value="floor">Floor</option>
        </select>

        <label className="font-medium mb-1">Options:</label>
        <input
          type="text"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          style={styles.input}
          placeholder="Enter service options"
          className="mb-3"
        />

        <label className="font-medium mb-1">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
          placeholder="Enter price"
          className="mb-3"
        />

        <div style={styles.actions} className="w-full">
          <button onClick={onClose} style={styles.button}>
            Cancel
          </button>
          <button disabled={loading} onClick={handleSubmit} className="custom_black_button_small">
            {index !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtraServiceModal;

// --- Styles ---
const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 999,
  },
  modal: {
    background: "#fff", padding: 20, borderRadius: 8, width: 500,
    display: "flex", flexDirection: "column", gap: 10,
  },
  input: {
    padding: 8, fontSize: 16,
  },
  actions: {
    display: "flex", justifyContent: "space-between", gap: 10, marginTop: 10,
  },
  button: {
    padding: "6px 12px", background: "#fff", border: "1px solid #ccc", borderRadius: 100,
  },
  buttonPrimary: {
    padding: "6px 12px", background: "#007bff", color: "#fff",
    border: "none", borderRadius: 4,
  },
};
