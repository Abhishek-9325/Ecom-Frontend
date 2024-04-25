import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";
import { cartItems } from "../cart/CartSlice";
import { loggedInUserData } from "../auth/authSlice";
import Footer from "../footer/footer";

const navigation = {
  pages: [{ name: "Home", href: "/" }],
};

const adminNavigation = {
  pages: [
    { name: "Edit Products", href: "/admin" },
    { name: "Admin Orders", href: "/admin/admin-orders" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ openCart, setOpenCart }) {
  const [open, setOpen] = useState(false);
  const cart_items = useSelector(cartItems);
  const user = useSelector(loggedInUserData);

  const totalItems = cart_items.reduce(
    (total, item) => item.quantity + total,
    0
  );

  return (
    <>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {user.role === "admin"
                      ? adminNavigation.pages.map((page) => (
                          <div key={page.name} className="flow-root">
                            <Link
                              to={page.href}
                              className="-m-2 block p-2 font-medium text-gray-900"
                            >
                              {page.name}
                            </Link>
                          </div>
                        ))
                      : navigation.pages.map((page) => (
                          <div key={page.name} className="flow-root">
                            <Link
                              to={page.href}
                              className="-m-2 block p-2 font-medium text-gray-900"
                            >
                              {page.name}
                            </Link>
                          </div>
                        ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white z-10">
          <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Get free delivery on orders over Rs.500
          </p>

          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link to={"/"}>
                    <span className="sr-only">Your Company</span>
                    <img className="h-8 w-auto" src="/store-logo.svg" alt="" />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {user.role === "admin"
                      ? adminNavigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            to={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </Link>
                        ))
                      : navigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            tp={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </Link>
                        ))}
                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  {/* Search */}
                  {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div> */}

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <div className="group -m-2 flex items-center p-2 cursor-pointer">
                      <ShoppingBagIcon
                        onClick={() => setOpenCart(true)}
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      {totalItems > 0 && (
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {totalItems}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Profile dropdown */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/user-profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                My Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/user-orders"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                My Orders
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={"/logout"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <Outlet />
      <Footer />
    </>
  );
}
