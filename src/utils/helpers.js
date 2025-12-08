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

export const validate = (values) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (values.fullName === "" || !values.fullName) {
    errors.fullName = "Full name is required";
  }
  if (!values.email) {
    errors.email = "email is required";
  } else if (values.email === "" || !emailRegex.test(values.email)) {
    errors.email = "Use a valid email";
  }
  if (values.password === "" || !values.password) {
    errors.password = "password is required";
  }
  if (values.phoneNumber === "" || !values.phoneNumber) {
    errors.phoneNumber = "phone number is required";
  }
  if (values.confirmPassword === "" || !values.confirmPassword) {
    errors.confirmPassword = "confirm password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password does not match";
  }
  return errors;
};
