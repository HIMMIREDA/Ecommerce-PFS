import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteOrder,
  fetchAllOrders,
  reset,
  updateOrder,
} from "../../features/order/orderSlice";
import { Order, OrderStatus } from "../../types/order";
import { toast } from "react-toastify";

const AdminOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isSuccess, isError, isLoading, message } = useAppSelector(
    (state) => state.order
  );

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    dispatch(updateOrder({ orderId, order: { status: newStatus } }));
  };

  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder({ orderId }));
  };

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchAllOrders(abortController));

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    dispatch(reset());
  }, [dispatch, isError, isLoading, isSuccess, message]);
  return (
    <div className="container mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Admin Orders</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order.id}>
              <td className="px-6 py-4">{order.id}</td>
              <td className="px-6 py-4">${order.total}</td>
              <td className="px-6 py-4">{new Date(order.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4">
                <select
                  className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={order.status}
                  onChange={(e) =>
                    handleUpdateStatus(order.id, e.target.value as OrderStatus)
                  }
                >
                  {Object.values(OrderStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4">
                {order.address.city}, {order.address.country}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="px-4 py-2 text-white rounded bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition duration-300 shadow-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
