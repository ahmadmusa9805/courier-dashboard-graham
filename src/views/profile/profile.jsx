import React, { useState, useRef, useEffect } from 'react';
import { Lucide, LoadingIcon } from "@/base-components";
import toast from "react-hot-toast";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../redux/features/profile/profileApi";

export default function Profile() {
  const fileInputRef = useRef(null);

  const { data: profileResponse, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const profileApiData = profileResponse?.data;

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    bio: "",
    role: "",
    status: "",
    emailStatus: "",
    profileVerified: "",
    joinDate: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  );
  const [imageFile, setImageFile] = useState(null);

  // Update profile data when API data loads
  useEffect(() => {
    if (profileApiData) {
      const fullName = `${profileApiData.name?.firstName || ""} ${profileApiData.name?.lastName || ""}`.trim();
      const joinDate = profileApiData.createdAt
        ? new Date(profileApiData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : "";

      setProfileData({
        name: fullName || "N/A",
        email: profileApiData.email || "",
        phone: profileApiData.phone || "",
        address: profileApiData.address || "",
        city: profileApiData.city || "",
        state: profileApiData.state || "",
        zipCode: profileApiData.zipCode || "",
        country: profileApiData.country || "",
        bio: profileApiData.bio || "",
        role: profileApiData.role || "",
        status: profileApiData.status || "",
        emailStatus: profileApiData.emailStatus || "",
        profileVerified: profileApiData.profileVerified || "",
        joinDate: joinDate,
      });

      // Set profile image if available from API (field is 'profileImg')
      if (profileApiData.profileImg) {
        setProfileImage(profileApiData.profileImg);
      }
    }
  }, [profileApiData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return toast.error("Invalid file type");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be under 5MB");

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      toast.success("Profile picture updated! Click 'Save Changes' to upload.");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!profileApiData?._id) {
      toast.error("User ID not found");
      return;
    }

    try {
      const [firstName, ...lastNameParts] = profileData.name.split(' ');
      const lastName = lastNameParts.join(' ');

      const formData = new FormData();

      // Add profile data as JSON string under 'data' key
      const profilePayload = {
        name: {
          firstName: firstName || "",
          lastName: lastName || "",
        },
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address || "",
        city: profileData.city || "",
        state: profileData.state || "",
        zipCode: profileData.zipCode || "",
        country: profileData.country || "",
        bio: profileData.bio || "",
      };

      formData.append("data", JSON.stringify(profilePayload));

      // Add image file if selected (as 'img' not 'file')
      if (imageFile) {
        formData.append("img", imageFile);
      }
      console.log(formData);
      await updateProfile({ id: profileApiData._id, data: formData }).unwrap();
      toast.success("Profile updated successfully!");
      setImageFile(null); // Clear the file after successful upload
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon icon="tail-spin" className="w-16 h-16" />
      </div>
    );
  }

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Profile</h2>
      </div>

      <div className="intro-y box px-5 pt-5 mt-5">
        <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">

          {/* Left card: Image + Name */}
          <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-none image-fit relative">
              <img
                className="rounded-full object-cover w-full h-full border-4 border-slate-200 dark:border-darkmode-400"
                src={profileImage}
                alt="Profile"
              />

              <div
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer"
              >
                <Lucide icon="Camera" className="text-white w-4 h-4" />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="ml-5">
              <div className="font-medium text-xl">{profileData.name}</div>
              <div className="text-slate-500 mt-1">
                Member since {profileData.joinDate}
              </div>
              <div className="text-slate-500 text-sm mt-1 capitalize">
                {profileData.role}
              </div>
            </div>
          </div>

          {/* Middle card: Contact Info */}
          <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r">
            <div className="font-medium text-center lg:text-left lg:mt-3 text-base">Contact Details</div>

            <div className="flex flex-col mt-4 space-y-3">
              <div className="flex items-center">
                <Lucide icon="Mail" className="w-4 h-4 mr-3 text-slate-500" />
                <span className="truncate">{profileData.email}</span>
              </div>

              <div className="flex items-center">
                <Lucide icon="Phone" className="w-4 h-4 mr-3 text-slate-500" />
                <span>{profileData.phone || "Not provided"}</span>
              </div>

              <div className="flex items-center">
                <Lucide icon="MapPin" className="w-4 h-4 mr-3 text-slate-500" />
                <span className="truncate">
                  {profileData.city && profileData.state
                    ? `${profileData.city}, ${profileData.state}`
                    : profileData.city || profileData.state || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Right card: Status */}
          <div className="mt-6 lg:mt-0 flex-1 px-5">
            <div className="font-medium text-center lg:text-left lg:mt-3 text-base">Account Status</div>

            <div className="flex flex-col mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status:</span>
                <span className={`px-2 py-1 rounded text-xs capitalize ${profileData.status === 'active' ? 'bg-success text-white' : 'bg-danger text-white'
                  }`}>
                  {profileData.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Email:</span>
                <span className={`capitalize ${profileData.emailStatus === 'verified' ? 'text-success' : 'text-warning'
                  }`}>
                  {profileData.emailStatus}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Profile:</span>
                <span className={`capitalize ${profileData.profileVerified === 'verified' ? 'text-success' : 'text-warning'
                  }`}>
                  {profileData.profileVerified}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editable Profile Details */}
        <div className="py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="name"
                className="form-control"
                value={profileData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                className="form-control"
                value={profileData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                className="form-control"
                value={profileData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                name="country"
                className="form-control"
                value={profileData.country}
                onChange={handleChange}
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                name="state"
                className="form-control"
                value={profileData.state}
                onChange={handleChange}
              />
            </div>

            {/* Zip */}
            <div>
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                name="zipCode"
                className="form-control"
                value={profileData.zipCode}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                name="address"
                className="form-control"
                value={profileData.address}
                onChange={handleChange}
              />
            </div>

            {/* City */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                name="city"
                className="form-control"
                value={profileData.city}
                onChange={handleChange}
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                className="form-control h-24"
                value={profileData.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6 pt-5 border-t">
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <LoadingIcon icon="tail-spin" color="white" className="w-4 h-4 mr-2" />
              ) : (
                <Lucide icon="Save" className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
