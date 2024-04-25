import React, { useEffect, useState } from "react";
import { PRODUCTS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  ordersData,
  selectTotalOrdersCount,
  updateOrderAsync,
} from "../../order/OrderSlice";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import Paginate from "../../product/components/Paginate";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const totalOrdersData = useSelector(ordersData);
  const totalOrdersCount = useSelector(selectTotalOrdersCount);
  const [editableOrderID, setEditableOrderID] = useState(-1);
  const [sort, setSort] = useState({});
  //   console.log(typeof totalOrdersCount);

  const handleShow = () => {};
  const handleEdit = (order) => {
    setEditableOrderID(order.id);
  };
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, orderStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderID(-1);
  };

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

  const handlePagination = (page) => {
    setPage(page);
    const pagination = { _page: page, _limit: PRODUCTS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  };

  const handleSort = (e, option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: PRODUCTS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);
  return (
    <>
      <div className="overflow-x-auto">
        <div className="pt-5 bg-gray-100 flex items-center justify-cente font-sans overflow-hidden">
          <div className="mx-auto w-[calc(100%-40px)] xl:w-5/6">
            <div className="bg-white shadow-md rounded my-6 overflow-x-scroll">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-center cursor-pointer flex gap-2 items-center"
                      onClick={(e) =>
                        handleSort(e, {
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order No.{" "}
                      {sort?._sort === "id" &&
                        (sort?._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Items</th>
                    <th className="py-3 px-6 text-center">Addresses</th>
                    <th
                      className="py-3 px-6 text-center cursor-pointer flex gap-2 items-center"
                      onClick={(e) =>
                        handleSort(e, {
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Amount{" "}
                      {sort?._sort === "totalAmount" &&
                        (sort?._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {totalOrdersData.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">#{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left flex flex-col gap-3">
                        {order?.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                              />
                            </div>
                            <span>
                              {item.product.title} | Qt - {item.quantity} | Rs.{" "}
                              {discountedPrice(item.product)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          {order?.selectedAddress ? (
                            <>
                              <strong>{order?.selectedAddress?.name}</strong>
                              <p>{order?.selectedAddress?.email}</p>
                              <p>{order?.selectedAddress?.phone}</p>
                              <p>{order?.selectedAddress?.street_address}</p>
                              <p>{order?.selectedAddress?.city}</p>
                              <p>{order?.selectedAddress?.region}</p>
                              <p>{order?.selectedAddress?.postal_code}</p>
                            </>
                          ) : (
                            <strong>-</strong>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          Rs. {order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderID ? (
                          <select
                            className="text-xs appearance-none rounded-full"
                            onChange={(e) => handleUpdate(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.orderStatus
                            )} py-2 px-3 rounded-full text-xs uppercase`}
                          >
                            {order.orderStatus}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon onClick={(e) => handleShow(order)} />
                          </div>
                          <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon onClick={(e) => handleEdit(order)} />
                          </div>
                          {/* <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* pagination */}
        <Paginate
          page={page}
          setPage={setPage}
          handlePagination={handlePagination}
          totalItems={totalOrdersCount}
        />
      </div>
    </>
  );
};

export default AdminOrders;
