import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import * as Yup from "yup";
import Select from "react-select";
import { useFormik } from "formik";
import Cropper from "react-cropper";
import type { ReactCropperElement } from "react-cropper";
import { useMutation } from "react-query";
import "cropperjs/dist/cropper.css";
import api from "../../shared/api";
import logo from "../../assets/images/logo-white-font.png";
import welcomeBanner from "../../assets/images/mahuva-utsav-temp.jpeg";
import { toast } from "react-toastify";

// Define the validation schema for Formik
const validationSchema = Yup.object().shape({
  text: Yup.string().required("Text is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
});

const GenerateAchievement = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const cropperRef = useRef<ReactCropperElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageName, setImageName] = useState("");

  // OTP state
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);

  const { mutateAsync } = useMutation(async (values: any) => {
    const formData = new FormData();
    formData.append("text", values.text);
    formData.append("gender", values.gender);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("age", values.age);

    if (croppedImage) {
      formData.append("image", croppedImage);
    } else {
      console.error("No cropped image found");
    }

    try {
      const response = await api.post("/api/images/generate-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "image/png" });
      const imageObjectURL = URL.createObjectURL(blob);
      setImageBlob(blob);
      setImageUrl(imageObjectURL);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  });

  const formik = useFormik({
    initialValues: {
      text: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      age: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await mutateAsync(values);
        setImageName(values.text);
        resetForm();
        setUploadedImage(null);
        setCroppedImageUrl(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    api
      .get("/getImage")
      .then((res) => {
        if (res.data) {
          const formattedImages = res.data.map((item: any) => ({
            value: item.image,
            label: item.image,
            image: `http://localhost:3000/Image/${item.image}`,
          }));
          setImages(formattedImages);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Mutation for sending OTP
  const sendOtpMutation = useMutation(
    async () => await api.post("/api/send-otp", { number: phone }),
    {
      onSuccess: () => {
        setIsOtpSent(true);
      },
      onError: (error: any) => {
        console.error("Error sending OTP:", error);
        toast.error(error.response.data);
      },
    }
  );

  // Mutation for resending OTP
  const resendOtpMutation = useMutation(
    async () => await api.post("/api/resend-otp", { number: phone }),
    {
      onError: (error: any) => {
        console.error("Error resending OTP:", error);
        toast.error(error.response.data);
      },
    }
  );

  // Mutation for verifying OTP
  const verifyOtpMutation = useMutation(
    async () => await api.post("/api/verify-otp", { number: phone, otp }),
    {
      onSuccess: () => {
        setIsOtpVerified(true);
      },
      onError: (error: any) => {
        console.error("Error verifying OTP:", error);
        toast.error(error.response.data);
      },
    }
  );

  const customSingleValue = ({ data }: any) => (
    <div className="flex items-center">
      <img
        src={data.image}
        alt={data.label}
        className="w-8 h-8 mr-2 rounded-full"
      />
      <span>{data.label}</span>
    </div>
  );

  const customOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="flex items-center p-2">
        <img
          src={data.image}
          alt={data.label}
          className="w-8 h-8 mr-2 rounded-full"
        />
        <span>{data.label}</span>
      </div>
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
      setCroppedImageUrl(null);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
        if (blob) {
          setCroppedImage(blob);
          const croppedImageURL = URL.createObjectURL(blob);
          setCroppedImageUrl(croppedImageURL);
        }
      });
    }
  };

  const handleEdit = () => {
    setCroppedImageUrl(null);
  };

  const downloadImage = () => {
    if (imageBlob) {
      const url = window.URL.createObjectURL(imageBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${imageName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  
  return (
    <div className="px-4 py-8 max-w-[25rem] mx-auto flex flex-col h-screen justify-center">
      {/* OTP and Phone Input Logic */}
      {!isOtpVerified ? (
        <div className="flex flex-col gap-4 my-5 border border-oldBurgundy p-6 rounded-lg shadow-lg">
          <div className="flex h-20 items-center justify-center bg-oldBurgundy rounded-lg">
            <img src={logo} alt="logo-img" className="w-44" />
          </div>
          <div className="my-3">
            <img
              src={welcomeBanner}
              alt="logo-img"
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Phone number
            </label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="form-input text-sm py-2 px-4 rounded w-full border border-oldBurgundy"
            />
          </div>
          {isOtpSent ? (
            <>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="form-input text-sm py-2 px-4 border rounded w-full mt-4  border-oldBurgundy"
              />
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => verifyOtpMutation.mutate()}
                  className="py-2 px-4 bg-oldBurgundy text-white rounded"
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => resendOtpMutation.mutate()}
                  className="py-2 px-4 bg-gray-500 text-white rounded"
                >
                  Resend OTP
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => sendOtpMutation.mutate()}
              className="py-2 px-4 bg-oldBurgundy hover:opacity-[0.8] text-white rounded mt-2"
            >
              Send OTP
            </button>
          )}
        </div>
      ) : (
        <>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 my-6 border border-oldBurgundy p-6 rounded-lg shadow-lg"
          >
            <div className="flex h-20 items-center justify-center bg-oldBurgundy rounded-lg">
              <img src={logo} alt="logo-img" className="w-44" />
            </div>
            <div className="max-h-[calc(100vh-166px)] overflow-y-auto pr-1">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  placeholder="Enter your name"
                  className={clsx(
                    "form-input text-sm py-2 px-4 rounded w-full outline-none border border-oldBurgundy",
                    { "border-red-500": formik.errors.text }
                  )}
                />
                {formik.errors.text && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.text}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  className={clsx(
                    "border border-oldBurgundy form-input text-sm py-2 px-4 rounded w-full outline-none focus:outline-none focus:!border-[#aaa] focus:border-[1px] focus:shadow-none",
                    { "border-red-500": formik.errors.gender }
                  )}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.errors.gender && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.gender}
                  </div>
                )}
              </div>
              <div className="mb-4">
                {/* Dropdown for selecting images */}
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Select image
                </label>
                {images.length > 0 ? (
                  <Select
                    options={images}
                    components={{
                      SingleValue: customSingleValue,
                      Option: customOption,
                    }}
                    placeholder="Select an achievement image..."
                    classNamePrefix={"achievement_dropdown"}
                    className="w-full border border-oldBurgundy rounded focus:outline-none"
                    isClearable
                  />
                ) : (
                  <p>Loading images...</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Enter your email"
                  className={clsx(
                    "form-input text-sm py-2 px-4 rounded w-full outline-none border border-oldBurgundy",
                    { "border-red-500": formik.errors.email }
                  )}
                />
                {formik.errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              {/* <div>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder="Enter phone"
                className={clsx(
                  "form-input text-sm py-2 px-4 rounded w-full outline-none border border-oldBurgundy",
                  { "border-red-500": formik.errors.phone }
                )}
              />
              {formik.errors.phone && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.phone}
                </div>
              )}
            </div> */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  placeholder="Enter your address"
                  className={clsx(
                    "form-input text-sm py-2 px-4 rounded w-full outline-none border border-oldBurgundy",
                    { "border-red-500": formik.errors.address }
                  )}
                />
                {formik.errors.address && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  placeholder="Enter your age"
                  min={0}
                  max={100}
                  className={clsx(
                    "form-input text-sm py-2 px-4 rounded w-full outline-none border border-oldBurgundy",
                    { "border-red-500": formik.errors.age }
                  )}
                />
                {formik.errors.age && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.age}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-[10rem] border-2 border-oldBurgundy border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-oldBurgundy dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-oldBurgundy dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-oldBurgundy dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Conditionally render the cropper or the cropped image */}
              {uploadedImage && !croppedImageUrl && (
                <div className="mb-4">
                  <Cropper
                    src={URL.createObjectURL(uploadedImage)}
                    style={{ height: 300, width: "100%" }}
                    initialAspectRatio={4 / 3}
                    guides={true}
                    viewMode={1}
                    dragMode="move"
                    cropBoxMovable={true}
                    cropBoxResizable={true}
                    autoCropArea={1}
                    minCropBoxHeight={100}
                    minCropBoxWidth={100}
                    responsive={true}
                    ref={cropperRef}
                  />
                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      onClick={handleCrop}
                      className="btn btn-secondary py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Crop Image
                    </button>
                  </div>
                </div>
              )}

              {/* Show the cropped image if available */}
              {croppedImageUrl && (
                <div className="flex flex-col items-center mb-4 relative">
                  <img
                    src={croppedImageUrl}
                    alt="Cropped Image"
                    className="w-full h-auto"
                  />
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="btn btn-secondary py-1 px-1 bg-gray-500 text-white hover:bg-gray-600 absolute top-[-6px] right-[-1px] rounded-full m-0 h-6 w-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16px"
                      height="16px"
                    >
                      <path
                        fill="white"
                        d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="py-2 px-4 bg-oldBurgundy text-white rounded hover:opacity-[0.8] transition-all w-full"
              >
                {formik.isSubmitting ? "Generating..." : "Generate Image"}
              </button>
            </div>
          </form>
        </>
      )}

      {/* Render generated image */}
      {imageUrl && (
        <div className="mt-8 border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Generated Image:</h3>
          <img src={imageUrl} alt="Generated Achievement" />
          <button
            onClick={downloadImage}
            className="py-2 px-4 bg-green-500 text-white rounded mt-4"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateAchievement;
