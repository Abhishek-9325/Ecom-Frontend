import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/CartSlice";
import { currentOrderData, resetOrder } from "../features/order/OrderSlice";
import { userInfo } from "../features/user/UserSlice";

const OrderSuccessPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(userInfo);
  const currentOrder = useSelector(currentOrderData);
  const [orderData, setOrderData] = useState(null);
  const taxCharge = 5;
  console.log(orderData);
  const shippingCharge = orderData?.totalAmount > 500 ? 0 : 100;

  useEffect(() => {
    dispatch(resetCartAsync(user.id));
    dispatch(resetOrder());
  }, [dispatch, user]);

  useEffect(() => {
    setOrderData(currentOrder);
  }, []);
  return (
    <>
      <section>
        <div className="pt-12 pb-24 bg-white overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="relative pb-4 text-center">
              <h2 className="text-4xl xl:text-10xl leading-normal font-heading font-medium text-center">
                Thanks for order
              </h2>
              <h3 className="text-2xl xl:text-2xl leading-normal font-heading font-medium text-center">
                Your Order Number is #{params.id}
              </h3>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-screen border-b border-black border-opacity-5"></div>
            </div>
            <div className="sm:flex sm:justify-center sm:items-center p-8 xl:p-10 mb-8 xl:mb-32 border-b border-black border-opacity-10">
              <img
                className="mb-6 sm:mb-0 mx-auto sm:ml-0 sm:mr-0"
                src="uinel-assets/elements/ecommerce-order/accept.svg"
                alt=""
              />
              <h3 className="sm:ml-10 text-lg md:text-xl text-green-600 font-heading font-medium text-center md:text-left">
                Payment completed successfully!
              </h3>
            </div>
            <div className="md:flex md:flex-wrap">
              <div className="w-full md:w-6/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12 md:pr-7 xl:pr-24 xl:pl-32 mb-14 md:mb-0">
                <div className="bg-white rounded-3xl">
                  <p className="sm:pl-7 mb-11 text-gray-400 font-medium">
                    What you ordered:
                  </p>
                  {orderData?.items?.map((item, index) => (
                    <div className="sm:flex sm:items-center pb-7 mb-7 border-b border-black border-opacity-5">
                      <img
                        className="h-16 sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 object-cover"
                        src={item.product.thumbnail}
                        alt={item.product.title}
                      />
                      <div>
                        <p className="inline-block mb-1 text-lg font-heading font-medium">
                          {item.product.title}
                        </p>
                        <div className="flex flex-wrap">
                          <p className="text-sm font-medium">
                            <span>Qty:</span>
                            <span className="ml-2 text-gray-400">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <p className="sm:pl-7 leading-loose text-gray-400 font-medium">
                    Payment method: Mastercard
                  </p>
                  <p className="sm:pl-7 leading-loose text-gray-400 font-medium">
                    N.B Products marked (+) are non-returnable
                  </p>
                </div>
              </div>
              <div className="md:pl-7 w-full md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12">
                <div className="pt-11 pb-11 bg-purple-500 rounded-3xl">
                  <div className="border-b border-opacity-20">
                    <div className="px-10 pb-7">
                      <h3 className="mb-5 text-3xl text-white font-heading font-medium">
                        Totals
                      </h3>
                      <p className="flex items-center justify-between leading-8 font-heading font-medium">
                        <span className="text-white text-opacity-70">
                          Subtotal
                        </span>
                        <span className="flex items-center text-xl text-white">
                          <span className="mr-3 text-base">Rs.</span>
                          <span>{orderData?.totalAmount}</span>
                        </span>
                      </p>
                      <p className="flex items-center justify-between leading-8 font-heading font-medium">
                        <span className="text-white text-opacity-70">
                          Shipping
                        </span>
                        <span className="flex items-center text-xl text-white">
                          <span className="mr-3 text-base">
                            {orderData?.totalAmount > 500
                              ? "Free Shipping"
                              : `Rs.${shippingCharge}`}
                          </span>
                          <span></span>
                        </span>
                      </p>
                      <p className="flex items-center justify-between leading-8 font-heading font-medium">
                        <span className="text-white text-opacity-70">
                          Taxes
                        </span>
                        <span className="flex items-center text-xl text-white">
                          <span className="mr-3 text-base">Rs.{taxCharge}</span>
                          <span></span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="px-10 pt-5 mb-7">
                    <div className="pb-5 border-b border-opacity-30">
                      <p className="flex items-center justify-between leading-8 font-heading font-medium">
                        <span className="text-white">Total</span>
                        <span className="flex items-center text-xl text-white">
                          <span className="mr-3 text-base">Rs.</span>
                          <span>
                            {orderData?.totalAmount +
                              shippingCharge +
                              taxCharge}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* <div className="px-10">
                    <a
                      className="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                      href="#"
                    >
                      Download invoice
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccessPage;
