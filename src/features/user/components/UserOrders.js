import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderByUserIdAsync,
  loggedInUserOrders,
  userInfo,
} from "../UserSlice";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);
  const userOrders = useSelector(loggedInUserOrders);

  const chooseColor = (orderStatus) => {
    switch (orderStatus) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    dispatch(fetchOrderByUserIdAsync(user.id));
  }, [dispatch, user]);
  return (
    <>
      <div>
        {userOrders.length === 0 ? (
          <>
            <h1 className="text-center text-3xl font-semibold pt-10">
              No Orders Found
            </h1>
            <div className="mt-6">
              <Link
                to={"/ "}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-fit mx-auto"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center text-3xl font-semibold pt-10">
              My Orders
            </h1>
            {userOrders?.map((order, index) => (
              <div
                key={order.id}
                className="mx-auto mt-12 bg-slate-50 max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md"
              >
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-2xl my-5 font-bold text-gray-900">
                    Order #{order.id}
                  </h2>
                  <h3
                    className={`${chooseColor(
                      order.orderStatus
                    )} text-lg mb-5 font-semibold px-3 py-2 w-fit`}
                  >
                    Order Status :{" "}
                    <span className="capitalize">{order.orderStatus}</span>
                  </h3>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.items.map((product) => (
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
                                  ${discountedPrice(product.product)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                Qty :{" "}
                                <span className="font-medium text-gray-900">
                                  {product.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-gray-200 py-6 mt-10">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>${order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 mt-3">
                      <p>Total Items in Cart</p>
                      <p>
                        {order.totalItems}{" "}
                        {order.totalItems === 1 ? "Item" : "Items"}
                      </p>
                    </div>
                    {order?.selectedAddress ? (
                      <>
                        <p className="my-5 border-t pt-5 text-base text-gray-900 font-medium">
                          Shipping Address :{" "}
                        </p>
                        <div className="flex justify-between gap-x-6 py-5 px-5 border">
                          <div className="flex min-w-0 gap-x-4 items-center">
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {order?.selectedAddress?.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {order?.selectedAddress?.street_address}
                              </p>
                              <p className="text-sm leading-6 text-gray-500">
                                {order?.selectedAddress?.postal_code}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {order?.selectedAddress?.phone}
                            </p>
                            <p className="text-sm leading-6 text-gray-500">
                              {order?.selectedAddress?.city}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default UserOrders;
