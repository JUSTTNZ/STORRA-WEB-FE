export const currencyFormatter = (amount) => {
  const fm = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });
  return fm.format(amount);
};

export const saleDateFormatter = (dateString) => {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

