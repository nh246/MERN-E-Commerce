import { useParams } from "react-router";
import { useGetOrdersByIdQuery } from "../../../../redux/features/orders/orderApi";
import Loading from "../../../../components/Loading";
import TimeLineStep from "../../../../components/TimeLineStep";

const steps = [
  {
    status: "pending",
    label: "Pending",
    description: "Your order has been created and is awaiting processing.",
    icon: {
      iconName: "edit-2-line",
      bgColor: "red-500",
      textColor: "gray-800",
    },
  },
  {
    status: "processing",
    label: "Processing",
    description: "Your order is currently being processed.",
    icon: {
      iconName: "loader-line",
      bgColor: "yellow-500",
      textColor: "yellow-800",
    },
  },
  {
    status: "shipped",
    label: "Shipped",
    description: "Your order has been shipped.",
    icon: {
      iconName: "truck-line",
      bgColor: "blue-800",
      textColor: "blue-100",
    },
  },
  {
    status: "completed",
    label: "Completed",
    description: "Your order has been successfully completed.",
    icon: {
      iconName: "check-line",
      bgColor: "green-800",
      textColor: "white",
    },
  },
];

function OrderDetail() {
  const { orderId } = useParams();
  const { data, isLoading, error } = useGetOrdersByIdQuery(orderId);

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to fetch data</div>;
  const order = data?.data || {};

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;
  return (
    <div className="section__container rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment {order?.status}</h2>
      <p className="mb-4">Order Id: {order?.orderId}</p>
      <p className="mb-4">Status: {order?.status}</p>

      <ol className="sm:flex items-center relative">
        {steps.map((step, index) => (
          <TimeLineStep
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            icon={step.icon}
            description={step.description}
          />
        ))}
      </ol>
    </div>
  );
}

export default OrderDetail;
