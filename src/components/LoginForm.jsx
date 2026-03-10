import { useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  getPasswordStrength,
  isRequired,
  hasMinLength,
} from "../utils/validationUtils";

/**
 * LoginForm Component - Form with validation for testing form handling
 */
function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!isRequired(value)) return "Email is required";
        if (!isValidEmail(value)) return "Please enter a valid email";
        return "";
      case "password":
        if (!isRequired(value)) return "Password is required";
        if (!hasMinLength(value, 8))
          return "Password must be at least 8 characters";
        if (!isValidPassword(value))
          return "Password must contain uppercase, lowercase, and number";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setSubmitError("");
    setSubmitSuccess(false);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      if (field !== "rememberMe") {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitSuccess(true);
      setFormData({ email: "", password: "", rememberMe: false });
      setTouched({});
    } catch (error) {
      setSubmitError(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="login-form">
      <h2>Login</h2>

      {submitSuccess && (
        <div className="success-message" data-testid="success-message">
          Login successful!
        </div>
      )}

      {submitError && (
        <div className="error-message" data-testid="submit-error">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} data-testid="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            data-testid="email-input"
          />
          {touched.email && errors.email && (
            <span className="field-error" data-testid="email-error">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            data-testid="password-input"
          />
          {formData.password && (
            <div
              className={`password-strength ${passwordStrength}`}
              data-testid="password-strength"
            >
              Password strength: {passwordStrength}
            </div>
          )}
          {touched.password && errors.password && (
            <span className="field-error" data-testid="password-error">
              {errors.password}
            </span>
          )}
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isSubmitting}
              data-testid="remember-checkbox"
            />
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="submit-button"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
