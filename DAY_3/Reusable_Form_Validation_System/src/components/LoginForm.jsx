import { useState } from "react";

import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../utils/validation";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateRequired(
        formData.name,
        "Name"
      ),
      email: validateEmail(formData.email),
      password: validatePassword(
        formData.password
      ),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(
      newErrors
    ).some((error) => error !== "");

    if (!hasErrors) {
      alert("Form Submitted Successfully");
      console.log(formData);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login Form</h2>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p className="error">
              {errors.password}
            </p>
          )}
        </div>

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}