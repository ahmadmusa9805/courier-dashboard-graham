import { Lucide } from "@/base-components";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LoadingIcon } from "../../base-components";
import {
    useGetAllDistancePricesQuery,
    useCreateDistancePriceMutation,
} from "../../redux/features/distancePrice/distancePriceApi";

function DistancePrices() {
    const [priceAmount, setPriceAmount] = useState("");
    const [priceId, setPriceId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // API Hooks - Only GET and CREATE (which handles update too)
    const { data: distancePricesData, isLoading: isFetching } = useGetAllDistancePricesQuery();
    const [createDistancePrice, { isLoading: isUpdating }] = useCreateDistancePriceMutation();

    // Load existing price on component mount
    useEffect(() => {
        if (distancePricesData?.data && distancePricesData.data.length > 0) {
            const firstPrice = distancePricesData.data[0];
            setPriceId(firstPrice._id);
            setPriceAmount(firstPrice.distancePrice?.toString() || "");
        }
    }, [distancePricesData]);

    const handleInputChange = (e) => {
        setPriceAmount(e.target.value);
    };

    const handleUpdate = async () => {
        // Validation
        if (!priceAmount || priceAmount.trim() === "") {
            toast.error("Please enter a price amount");
            return;
        }

        if (parseFloat(priceAmount) <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        try {
            // The create endpoint handles both create and update
            const result = await createDistancePrice({
                distancePrice: parseFloat(priceAmount),
            }).unwrap();

            // Update local state with new value from response
            // Adjust based on actual response structure: result.data.distancePrice OR result.data?.data?.distancePrice
            const newPrice = result.data?.distancePrice || result.data?.data?.distancePrice || result.distancePrice;

            if (newPrice) {
                setPriceAmount(newPrice.toString());
            }

            setIsEditing(false);
            toast.success("Distance price updated successfully");
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error?.data?.message || "Failed to update distance price");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        // Reset to original value from API
        if (distancePricesData?.data && distancePricesData.data.length > 0) {
            setPriceAmount(distancePricesData.data[0].distancePrice?.toString() || "");
        }
        setIsEditing(false);
    };

    if (isFetching) {
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

    const currentPrice = distancePricesData?.data?.[0];

    return (
        <>
            <div className="grid grid-cols-12 gap-6 mt-5">
                {/* Header */}
                <div className="col-span-12">
                    <div className="intro-y flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Distance Price Configuration</h2>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="col-span-12 lg:col-span-8 xl:col-span-6">
                    <div className="intro-y box p-8">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Distance Price per Kilometer
                            </h3>
                            <p className="text-slate-500 text-sm">
                                View and update the base price for distance calculation
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Price Display/Input */}
                            <div>
                                <label className="form-label text-base font-medium">
                                    Price Amount (€)
                                </label>
                                <div className="relative mt-2">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-slate-500 text-lg">€</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={priceAmount}
                                        onChange={handleInputChange}
                                        className="form-control pl-8 text-lg"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        disabled={!isEditing || isUpdating}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    {isEditing
                                        ? "Enter the new price per kilometer"
                                        : "Current price per kilometer for distance calculation"}
                                </p>
                            </div>

                            {/* Last Updated Info */}
                            {currentPrice && !isEditing && (currentPrice.updatedAt || currentPrice.createdAt) && (
                                <div className="bg-slate-50 dark:bg-darkmode-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Lucide icon="Clock" className="w-4 h-4" />
                                        <span>
                                            Last updated: {new Intl.DateTimeFormat("en-US", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            }).format(new Date(currentPrice.updatedAt || currentPrice.createdAt))}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                                        disabled={isUpdating}
                                    >
                                        <Lucide icon="Edit" className="w-4 h-4" />
                                        Edit Price
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            disabled={isUpdating}
                                            className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                                        >
                                            {isUpdating ? (
                                                <>
                                                    <LoadingIcon icon="tail-spin" color="white" className="w-4 h-4" />
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <Lucide icon="Save" className="w-4 h-4" />
                                                    Update Price
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            disabled={isUpdating}
                                            className="btn btn-outline-secondary flex-1"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="col-span-12 lg:col-span-4 xl:col-span-6">
                    <div className="intro-y box p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Lucide icon="Info" className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold">How It Works</h3>
                        </div>
                        <div className="space-y-3 text-sm text-slate-600">
                            <div className="flex gap-2">
                                <Lucide icon="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                <p>View the current distance price per kilometer</p>
                            </div>
                            <div className="flex gap-2">
                                <Lucide icon="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                <p>Click "Edit Price" to modify the value</p>
                            </div>
                            <div className="flex gap-2">
                                <Lucide icon="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                <p>Enter new price and click "Update Price"</p>
                            </div>
                            <div className="flex gap-2">
                                <Lucide icon="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                <p>Changes are saved immediately to the database</p>
                            </div>
                        </div>

                        {/* Current Value Display */}
                        {currentPrice && (
                            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                                <p className="text-xs text-slate-500 mb-1">Current Value</p>
                                <p className="text-2xl font-bold text-primary">
                                    €{parseFloat(priceAmount || 0).toFixed(2)}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">per kilometer</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DistancePrices;
