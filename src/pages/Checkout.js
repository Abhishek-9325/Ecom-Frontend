import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  cartItems,
  deleteCartAsync,
  updateCartAsync,
} from "../features/cart/CartSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  createOrderAsync,
  currentOrderData,
} from "../features/order/OrderSlice";
import { updateUserAsync, userInfo } from "../features/user/UserSlice";
import { discountedPrice } from "../app/constants";
import Modal from "../features/utility/modal";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectPaymentMode, setSelectPaymentMode] = useState("cash");
  const currentOrder = useSelector(currentOrderData);
  const [openModal, setOpenModal] = useState(null);

  const cart_items = useSelector(cartItems);
  const dispatch = useDispatch();
  const totalCartAmount = cart_items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = cart_items.reduce(
    (total, item) => item.quantity + total,
    0
  );
  const user = useSelector(userInfo);
  const handeQuantityChange = (e, item) => {
    dispatch(
      updateCartAsync({
        id: item.id,
        quantity: +e.target.value,
      })
    );
  };

  const handleRemoveFromCart = (e, item) => {
    console.log(item);
    dispatch(deleteCartAsync(item.id));
  };

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePaymentMode = (e) => {
    setSelectPaymentMode(e.target.value);
  };

  const handleOrder = () => {
    const order = {
      user: user.id,
      items: cart_items,
      selectedAddress: selectedAddress,
      paymentMode: selectPaymentMode,
      totalAmount: totalCartAmount,
      totalItems: totalItems,
      orderStatus: "pending",
    };
    if (selectedAddress) {
      dispatch(createOrderAsync(order));
      console.log(order);
    } else {
      alert("Address is required");
    }
  };

  return (
    <>
      {!cart_items.length && <Navigate to={"/"} replace={true} />}
      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mt-10 text-2xl text-center font-semibold leading-7 text-gray-900">
          Checkout
        </h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="border border-gray-200 px-4 py-6 sm:px-6 mt-8"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(user);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
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
                </div>

                <div className="mt-6 flex items-center justify-center gap-x-6">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-t border-gray-900/10 pt-12 pb-6">
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {user?.addresses?.length > 0
                      ? "Choose from existing addresses"
                      : "No existing addresses"}
                  </p>

                  <ul role="list" className="divide-y divide-gray-100">
                    {user?.addresses?.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4 items-center">
                          <input
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                            type="radio"
                            name="address"
                            onChange={handleAddress}
                            value={index}
                            id={index}
                          />
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
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10 border-t border-gray-900/10 pt-10">
                    <fieldset>
                      <legend className="text-base font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash-method"
                            name="payment-method"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onClick={handlePaymentMode}
                            checked={selectPaymentMode === "cash"}
                            value="cash"
                          />
                          <label
                            htmlFor="cash-method"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card-method"
                            name="payment-method"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            checked={selectPaymentMode === "card"}
                            onClick={handlePaymentMode}
                            value="card"
                          />
                          <label
                            htmlFor="card-method"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mt-8">
              <div className="border border-gray-200 px-4 py-6 sm:px-6">
                <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-5">
                  Total {totalItems === 1 ? " Item " : " Items"} in Cart{" "}
                  {totalItems > 0 && <span>({totalItems})</span>}
                </h2>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart_items.map((product) => (
                      <li key={product.product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.product.thumbnail}
                            alt={product.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={product.product.href}>
                                  {product.product.title}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                Rs.{discountedPrice(product.product)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              Qty
                              <select
                                onChange={(e) =>
                                  handeQuantityChange(e, product)
                                }
                                className="appearance-none ml-5 pl-3 pr-10 py-1 rounded-xl"
                              >
                                {[...Array(10)].map((_, i) => (
                                  <option
                                    selected={product.quantity === i + 1}
                                    key={i}
                                    value={i + 1}
                                  >
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <Modal
                              title={`Delete ${product.product.title} from Cart`}
                              message="Are you sure you want to delete this cart item?"
                              dangerOption="Delete"
                              cancelOption="Cancel"
                              dangerAction={(e) =>
                                handleRemoveFromCart(e, product)
                              }
                              showModal={openModal === product.id}
                              setOpenModal={setOpenModal}
                            />
                            <div className="flex">
                              <button
                                onClick={(e) => setOpenModal(product.id)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-5">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>Rs.{totalCartAmount}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order Now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link
                        to={"/"}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
