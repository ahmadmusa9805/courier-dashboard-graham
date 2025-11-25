import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoadingIcon, Lucide } from "../../base-components";
import { useCreateTestimonialMutation, useUpdateTestimonialMutation } from "../../redux/features/testimonial/testimonialApi";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdStarOutline } from "react-icons/md";

const AddTestimonial = () => {
  const location = useLocation();
  const userData = location.state?.data;
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const [rating, setRating] = useState(userData?.rating || 4);

  const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();

  useEffect(() => {
    if (userData) setIsEdit(true);
  }, [userData]);

  const initialValues = {
    name: userData?.name || "",
    subTitle: userData?.subTitle || "",
    description: userData?.description || "",
    status: userData?.status || "active",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().max(50).matches(/^[A-Za-z\s'-]+$/, "Only letters, spaces, hyphens allowed").required("Name is required"),
    subTitle: Yup.string().required("Sub Title is required"),
    description: Yup.string().required("Testimonial is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      name: values.name,
      subTitle: values.subTitle,
      rating: rating,
      description: values.description,
      status: values.status,
      createdDate: new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' }),
    };

    try {
      if (isEdit) {
        await updateTestimonial({ id: userData._id, data: payload }).unwrap();
        toast.success("Testimonial updated successfully");
      } else {
        await createTestimonial(payload).unwrap();
        toast.success("Testimonial created successfully");
      }

      navigate("/testimonials");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 flex-1 rounded-lg overflow-hidden">
      <div className="intro-y flex flex-col sm:flex-row mt-2 mb-4 justify-between items-center">
        <p className="text-xl font-bold uppercase">{isEdit ? "Edit Testimonial" : "Add New Testimonial"}</p>
        <button className="text-gray-700 flex items-center gap-2" onClick={() => window.history.back()}>
          <Lucide icon="ArrowLeft" /> Back
        </button>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="border-0 border-gray-200 bg-white dark:bg-transparent shadow-md rounded-lg p-6">
              <div className="flex gap-4">
                <div className="w-full">
                  <p>Name</p>
                  <Field type="text" name="name" placeholder="Name" className="w-full p-2 mt-2 border rounded-md" />
                  <ErrorMessage name="name" component="div" className="text-red-600" />
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <div className="w-full">
                  <p>Sub Title</p>
                  <Field type="text" name="subTitle" placeholder="Sub Title" className="w-full p-2 mt-2 border rounded-md" />
                  <ErrorMessage name="subTitle" component="div" className="text-red-600" />
                </div>

                <div className="w-full">
                  <p>Status</p>
                  <Field as="select" name="status" className="w-full p-2 mt-2 border rounded-md">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-600" />
                </div>
              </div>

              <div className="w-full mt-4">
                <p>Rating</p>
                <div className="star-rating mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`star ${star <= rating ? "filled" : ""}`} onClick={() => setRating(star)}>
                      <MdStarOutline />
                    </span>
                  ))}
                  <span className="text-[12px] font-semibold">{rating} / 5</span>
                </div>
              </div>

              <div className="w-full mt-4">
                <p>Testimonial</p>
                <Field as="textarea" name="description" placeholder="Enter Testimonial" className="p-2 mt-1 border rounded-md w-full" />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button type="submit" className="custom_black_button" disabled={isSubmitting || isCreating || isUpdating}>
                {(isSubmitting || isCreating || isUpdating) ? (
                  <LoadingIcon icon="tail-spin" color="white" className="w-8 h-6 ml-2" />
                ) : (
                  <>{isEdit ? "Update Testimonial" : "Save Testimonial"}</>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTestimonial;
