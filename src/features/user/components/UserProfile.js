import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync, userInfo } from "../UserSlice";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const user = useSelector(userInfo);
  const dispatch = useDispatch();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  console.log(user);

  const handleEdit = (e, index) => {
    // const newUser = { ...user, addresses: [...user.addresses] };
    // newUser.addresses.splice(index, 1);
    // dispatch(updateUserAsync(newUser));
    setShowNewAddressForm(false);
    setSelectedAddressIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street_address", address.street_address);
    setValue("city", address.city);
    setValue("region", address.region);
    setValue("postal_code", address.postal_code);

    // newUser.addresses[index] = data;
    // dispatch(updateUserAsync(newUser));
    // reset();
  };
  const handleEditFormSubmission = (updatedAddress, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, updatedAddress);
    dispatch(updateUserAsync(newUser));
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleNewAddress = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowNewAddressForm(false);
  };

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-semibold pt-10">My Profile</h1>
        <div className="mx-auto mt-12 bg-slate-50 max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md">
          <div className="px-4 py-5 sm:px-6">
            {user?.addresses?.length > 0 && user?.addresses[0]?.name && (
              <h2 className="text-2xl my-5 font-bold text-gray-900">
                Name:{" "}
                {user?.addresses[0]?.name
                  ? user?.addresses[0]?.name
                  : "Guest User"}
              </h2>
            )}
            <h3 className="text-lg mb-5 font-semibold text-red-800">
              Email: {user?.email ? user?.email : "Not Available"}
            </h3>
            {user?.role && (
              <h3 className="text-xl my-5 font-bold text-gray-600">
                Role: Admin
              </h3>
            )}
            <div className="add-address-container">
              {!showNewAddressForm && (
                <button
                  onClick={(e) => {
                    reset();
                    setShowNewAddressForm(true);
                    setSelectedAddressIndex(-1);
                  }}
                  type="submit"
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Add New Address
                </button>
              )}
              <div className="add-address-form-container">
                {showNewAddressForm === true && (
                  <form
                    className="px-4 py-6 sm:px-6 mt-8"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleNewAddress(data);
                    })}
                  >
                    <div className="space-y-12">
                      <div className=" pb-12">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "Full Name is required",
                                  pattern: {
                                    value: /^[a-zA-Z\s]*$/g,
                                    message: "Name is not valid",
                                  },
                                })}
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors?.name && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: "Email is not valid",
                                  },
                                })}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors?.email && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Contact Number
                            </label>
                            <div className="mt-2">
                              <input
                                type="tel"
                                id="phone"
                                {...register("phone", {
                                  required: "Enter your contact number",
                                  pattern: {
                                    value: /^[0-9]{10}$/g,
                                    message: "Phone number is not valid",
                                  },
                                })}
                                autoComplete="phone"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors?.phone && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.phone.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="col-span-full sm:col-span-3">
                            <label
                              htmlFor="street_address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="street_address"
                                {...register("street_address", {
                                  required: "Enter your street address",
                                })}
                                autoComplete="street_address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors?.street_address && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.street_address.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "Enter your city name",
                                })}
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors?.city && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.city.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("region", {
                                  required: "Enter your state/province name",
                                })}
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors?.region && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.region.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="postal_code"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("postal_code", {
                                  required: "Enter your postal code",
                                  pattern: {
                                    value: /^[0-9]{6}$/g,
                                    message: "Postal code is not valid",
                                  },
                                })}
                                id="postal_code"
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors?.postal_code && (
                                <p className="text-red-500 text-sm mt-2">
                                  {errors.postal_code.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-x-6">
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Add New Address
                          </button>
                          <button
                            onClick={(e) => setShowNewAddressForm(false)}
                            type="submit"
                            className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className="border-t border-gray-200 py-6 mt-10">
              {user?.addresses?.map((address, index) => (
                <div className="py-5 px-5 border">
                  <div className="form-container">
                    {selectedAddressIndex === index && (
                      <form
                        className="px-4 py-6 sm:px-6 mt-8"
                        noValidate
                        onSubmit={handleSubmit((data) => {
                          handleEditFormSubmission(data, index);
                        })}
                      >
                        <div className="space-y-12">
                          <div className=" pb-12">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Full Name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("name", {
                                      required: "Full Name is required",
                                      pattern: {
                                        value: /^[a-zA-Z\s]*$/g,
                                        message: "Name is not valid",
                                      },
                                    })}
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors?.name && (
                                    <p className="text-red-500 text-sm mt-2">
                                      {errors.name.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Email address
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="email"
                                    {...register("email", {
                                      required: "Email is required",
                                      pattern: {
                                        value:
                                          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message: "Email is not valid",
                                      },
                                    })}
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors?.email && (
                                    <p className="text-red-500 text-sm mt-2">
                                      {errors.email.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="phone"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Contact Number
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="tel"
                                    id="phone"
                                    {...register("phone", {
                                      required: "Enter your contact number",
                                      pattern: {
                                        value: /^[0-9]{10}$/g,
                                        message: "Phone number is not valid",
                                      },
                                    })}
                                    autoComplete="phone"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors?.phone && (
                                    <p className="text-red-500 text-sm mt-2">
                                      {errors.phone.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="col-span-full sm:col-span-3">
                                <label
                                  htmlFor="street_address"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Street address
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    id="street_address"
                                    {...register("street_address", {
                                      required: "Enter your street address",
                                    })}
                                    autoComplete="street_address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors?.street_address && (
                                    <p className="text-red-500 text-sm mt-2">
                                      {errors.street_address.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("city", {
                                      required: "Enter your city name",
                                    })}
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors?.city && (
                                    <p className="text-red-500 text-sm mt-2">
                                      {errors.city.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="region"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  State / Province
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("region", {
                                      required:
                                        "Enter your state/province name",
                                    })}
                                    id="region"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors?.region && (
                                    <p className="text-red-500 text-sm mt-2">
                                      {errors.region.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="postal_code"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("postal_code", {
                                      required: "Enter your postal code",
                                      pattern: {
                                        value: /^[0-9]{6}$/g,
                                        message: "Postal code is not valid",
                                      },
                                    })}
                                    id="postal_code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors?.postal_code && (
                                    <p className="text-red-500 text-sm mt-2">
                                      {errors.postal_code.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-x-6">
                              <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Add Address
                              </button>
                              <button
                                onClick={(e) => setSelectedAddressIndex(-1)}
                                type="submit"
                                className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="flex justify-between gap-x-6">
                    <div className="flex min-w-0 gap-x-4 items-center">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.street_address}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {address.postal_code}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-5">
                    <button
                      onClick={(e) => handleEdit(e, index)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleRemove(e, index)}
                      className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
