import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  fetchProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/ProductSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../utility/modal";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProductData = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);
  // console.log(selectedProductData);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
  }, [params.id]);

  useEffect(() => {
    if (selectedProductData && params.id == selectedProductData.id) {
      setValue("title", selectedProductData.title);
      setValue("description", selectedProductData.description);
      setValue("price", selectedProductData.price);
      setValue("discountPercentage", selectedProductData.discountPercentage);
      setValue("stock", selectedProductData.stock);
      setValue("brand", selectedProductData.brand);
      setValue("category", selectedProductData.category);
      setValue("thumbnail", selectedProductData.thumbnail);
      setValue("image_1", selectedProductData.images[0]);
      if (selectedProductData.images[1]) {
        setValue("image_2", selectedProductData.images[1]);
      }
      if (selectedProductData.images[2]) {
        setValue("image_3", selectedProductData.images[2]);
      }
    }
    console.log(selectedProductData);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // selectedProductData?.delete === true
    //   ? setShowRestore(false)
    //   : setShowRestore(true);
  }, [selectedProductData, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProductData };
    product.delete = true;
    dispatch(updateProductAsync(product));
    // setShowRestore(true);
  };

  const handleRestore = () => {
    const product = { ...selectedProductData };
    product.delete = false;
    dispatch(updateProductAsync(product));
    // setShowRestore(false);
  };

  return (
    <>
      <form
        className="px-12 py-8 max-w-7xl mx-auto"
        noValidate
        onSubmit={handleSubmit(async (data) => {
          // dispatch(getUserAsync(data));
          const product = { ...data };
          if (product.image_2 && product.image_3) {
            product.images = [
              product.image_1,
              product.image_2,
              product.image_3,
            ];
          } else if (product.image_2) {
            product.images = [product.image_1, product.image_2];
          } else {
            product.images = [product.image_1];
          }

          product.rating = 5;
          delete product.image_1;
          delete product.image_2;
          delete product.image_3;
          product.price = +product.price;
          product.discountPercentage = +product.discountPercentage;
          product.stock = +product.stock;
          // console.log(data);
          // console.log(product);
          if (params.id) {
            product.id = params.id;
            product.rating = selectedProductData.rating || 5;
            dispatch(updateProductAsync(product));
            reset();
          } else {
            dispatch(addProductAsync(product));
            reset();
          }
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl text-center sm:text-2xl font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            {selectedProductData?.delete && (
              <h3 className="mt-2 text-md text-center sm:text-lg font-semibold leading-7 text-red-900 ">
                This product has been deleted from store
              </h3>
            )}

            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 px-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      {...register("title", {
                        required: "Product Title is required",
                      })}
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Add Product Title"
                    />
                  </div>
                  {errors?.title && (
                    <p className="text-red-500  mt-2">{errors.title.message}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    {...register("description", {
                      required: "Product Description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Add Product Description"
                  />
                </div>
                {errors?.description && (
                  <p className="text-red-500  mt-2">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 px-2">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      {...register("price", {
                        required: "Product Price is required",
                        pattern: {
                          value: /^[0-9]*$/g,
                          message: "Product price only accepts number",
                        },
                        max: {
                          value: 1000000,
                          message: "Product price must be less than Rs.10000",
                        },
                        min: {
                          value: 1,
                          message: "Product price must be greater than Rs.0",
                        },
                      })}
                      autoComplete="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product price"
                    />
                  </div>
                  {errors?.price && (
                    <p className="text-red-500  mt-2">{errors.price.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount {"(in %)"}
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 px-2">
                    <input
                      type="text"
                      name="discountPercentage"
                      id="discountPercentage"
                      {...register("discountPercentage", {
                        required: "Product Discount is required",
                        pattern: {
                          value: /^[0-9]*$/g,
                          message: "Product Discount only accepts number",
                        },
                        max: {
                          value: 100,
                          message:
                            "Product discount must be less than or equal to 100",
                        },
                        min: {
                          value: 1,
                          message: "Product discount must be greater than 0",
                        },
                      })}
                      autoComplete="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product Discount"
                    />
                  </div>
                  {errors?.discountPercentage && (
                    <p className="text-red-500  mt-2">
                      {errors.discountPercentage.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 px-2">
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      {...register("stock", {
                        required: "Product Stock is required",
                        pattern: {
                          value: /^[0-9]*$/g,
                          message: "Product Stock only accepts number",
                        },
                        min: {
                          value: 1,
                          message: "Product stock must be greater than 0",
                        },
                      })}
                      autoComplete="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product in Stock"
                    />
                  </div>
                  {errors?.stock && (
                    <p className="text-red-500  mt-2">{errors.stock.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 px-2">
                    <input
                      type="text"
                      name="thumbnail"
                      id="thumbnail"
                      {...register("thumbnail", {
                        required: "Product Thumbnail is required",
                      })}
                      autoComplete="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product in thumbnail"
                    />
                  </div>
                  {errors?.thumbnail && (
                    <p className="text-red-500  mt-2">
                      {errors.thumbnail.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image_1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 px-2">
                    <input
                      type="text"
                      name="image_1"
                      id="image_1"
                      {...register("image_1", {
                        required: "Product Images are required",
                      })}
                      autoComplete="image_1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product Image 1"
                    />
                  </div>
                  {errors?.image_1 && (
                    <p className="text-red-500  mt-2">
                      {errors.image_1.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image_2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 px-2">
                    <input
                      type="text"
                      name="image_2"
                      id="image_2"
                      {...register("image_2")}
                      autoComplete="image_2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product Image 2"
                    />
                  </div>
                  {errors?.image_2 && (
                    <p className="text-red-500  mt-2">
                      {errors.image_2.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image_3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 px-2">
                    <input
                      type="text"
                      name="image_3"
                      id="image_3"
                      {...register("image_3")}
                      autoComplete="image_3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product Image 3"
                    />
                  </div>
                  {errors?.image_3 && (
                    <p className="text-red-500  mt-2">
                      {errors.image_3.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    id="brand"
                    {...register("brand", {
                      required: "Select One Option",
                    })}
                    className="text-gray-900 appearance-none rounded-xl w-full sm:text-sm"
                  >
                    <option value="">-- Choose Brand --</option>
                    {brands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.brand && (
                  <p className="text-red-500  mt-2">{errors.brand.message}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    {...register("category", {
                      required: "Select One Option",
                    })}
                    className="text-gray-900 appearance-none rounded-xl w-full sm:text-sm"
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.category && (
                  <p className="text-red-500  mt-2">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
            </div>
          </div>

          {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
        </div>

        {selectedProductData?.delete === true ? (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRestore();
              }}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Restore Product
            </button>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {params.id ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(true);
                }}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete Product
              </button>
            ) : (
              <button
                onClick={(e) => reset()}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {params.id ? "Update Product" : "Add Product"}
            </button>
          </div>
        )}
      </form>
      <Modal
        title={`Delete ${selectedProductData.title}`}
        message="Are you sure you want to delete this product?"
        dangerOption="Delete"
        cancelOption="Cancel"
        dangerAction={handleDelete}
        showModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
