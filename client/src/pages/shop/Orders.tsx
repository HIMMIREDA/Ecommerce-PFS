import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchAuthOrders, reset } from "../../features/order/orderSlice";
import { toast } from "react-toastify";
import { Order, OrderStatus } from "../../types/order";

const Orders = () => {
  const statusStyles = {
    [OrderStatus.CANCELED]: "badge badge-error",
    [OrderStatus.DELIVERED]: "badge badge-success",
    [OrderStatus.PAID]: "badge badge-info",
    [OrderStatus.PAYMENT_FAILED]: "badge badge-error",
    [OrderStatus.SHIPPED]: "badge badge-warning",
    [OrderStatus.PROCESSING]: "badge badge-primary",
  };

  const { isLoading, isSuccess, isError, message, orders } = useAppSelector(
    (state) => state.order
  );
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchAuthOrders(abortController));
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        toastId: "cartErrorToast",
      });
    }
    if (isSuccess && message) {
      toast.success(message, {
        toastId: "createUpdateDeleteCartToast",
      });
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, isLoading]);
  return (
    <div className="min-h-screen">
      <div className=" mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Orders</h1>

        <div className="flex justify-center">
          <div className="w-full max-h-[700px] overflow-y-auto">
            <table className="w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left">Order ID</th>
                  <th className="py-3 px-6 text-left">Shipping Info</th>
                  <th className="py-3 px-6 text-left">Order Status</th>
                  <th className="py-3 px-6 text-left">Order Items</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order: Order) => (
                  <tr key={order.id}>
                    <td className="py-4 px-6">{order.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-700">
                          <span className="font-bold text-primary">Email:</span>{" "}
                          {user?.email}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-bold text-primary">Address:</span>{" "}
                          {order.address.addressLine +
                            " / " +
                            order.address.city +
                            " / " +
                            order.address.country +
                            " / " +
                            order.address.postalCode}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-bold text-primary">Amount:</span>{" "}
                          {order.total} $
                        </p>
                      </div>
                    </td>
                    <td
                      className={`py-4 px-6 mt-4 ${
                        statusStyles[order.status as keyof typeof statusStyles]
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="py-4 px-6">
                      <ul className="list-disc list-inside">
                        {order.orderItems.map((item) => (
                          <li key={item.id} className="text-gray-700">
                            {item.product.name} - {item.quantity} Piece(s)
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Link
            to="/profile"
            className="btn btn-primary py-3 px-6 text-lg font-medium hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
