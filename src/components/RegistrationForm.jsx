import { useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isValidUsername,
} from "../utils/validationUtils";

/**
 * RegistrationForm Component - Complex form with multiple validation rules
 */
function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!isRequired(value)) return "Username is required";
        if (!hasMinLength(value, 3))
          return "Username must be at least 3 characters";
        if (!hasMaxLength(value, 20))
          return "Username must be at most 20 characters";
        if (!isValidUsername(value))
          return "Username can only contain letters, numbers, and underscores";
        return "";
      case "email":
        if (!isRequired(value)) return "Email is required";
        if (!isValidEmail(value)) return "Please enter a valid email";
        return "";
      case "password":
        if (!isRequired(value)) return "Password is required";
        if (!hasMinLength(value, 8))
          return "Password must be at least 8 characters";
        if (!isValidPassword(value, { requireSpecial: true })) {
          return "Password must contain uppercase, lowercase, number, and special character";
        }
        return "";
      case "confirmPassword":
        if (!isRequired(value)) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      case "age":
        if (!isRequired(value)) return "Age is required";
        const ageNum = parseInt(value, 10);
        if (isNaN(ageNum)) return "Age must be a number";
        if (ageNum < 13) return "You must be at least 13 years old";
        if (ageNum > 120) return "Please enter a valid age";
        return "";
      case "agreeToTerms":
        if (!value) return "You must agree to the terms and conditions";
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

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Re-validate confirmPassword when password changes
    if (
      name === "password" &&
      formData.confirmPassword &&
      touched.confirmPassword
    ) {
      const confirmError = validateField(
        "confirmPassword",
        formData.confirmPassword,
      );
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }

    setSubmitError("");
    setSubmitSuccess(false);
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, fieldValue);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(
        field,
        field === "agreeToTerms" ? formData[field] : formData[field],
      );
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

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
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        agreeToTerms: false,
      });
      setTouched({});
    } catch (error) {
      setSubmitError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasError = (field) => touched[field] && errors[field];

  return (
    <div className="registration-form">
      <h2>Create Account</h2>

      {submitSuccess && (
        <div className="success-message" data-testid="success-message">
          Registration successful! Welcome aboard!
        </div>
      )}

      {submitError && (
        <div className="error-message" data-testid="submit-error">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} data-testid="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            data-testid="username-input"
          />
          {hasError("username") && (
            <span className="field-error" data-testid="username-error">
              {errors.username}
            </span>
          )}
        </div>

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
          {hasError("email") && (
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
          {hasError("password") && (
            <span className="field-error" data-testid="password-error">
              {errors.password}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            data-testid="confirm-password-input"
          />
          {hasError("confirmPassword") && (
            <span className="field-error" data-testid="confirm-password-error">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            min="1"
            max="120"
            data-testid="age-input"
          />
          {hasError("age") && (
            <span className="field-error" data-testid="age-error">
              {errors.age}
            </span>
          )}
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              data-testid="terms-checkbox"
            />
            I agree to the Terms and Conditions
          </label>
          {hasError("agreeToTerms") && (
            <span className="field-error" data-testid="terms-error">
              {errors.agreeToTerms}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="submit-button"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
