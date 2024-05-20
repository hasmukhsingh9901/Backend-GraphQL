const validateEmail = (email) => {
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,9}$/;
  return regEx.test(email);
};

const validateRegisterInput = ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else if (!validateEmail(email)) {
    errors.email = "Email must be a valid email address";
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginInput = ({ username, password }) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateRegisterInput, validateLoginInput };
