// ==========================================================================
// Clean & Professional User Registration Form - Vanilla JavaScript
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM Elements Selection
  const form = document.getElementById("registrationForm");
  const successBanner = document.getElementById("successBanner");

  // Inputs
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const dobInput = document.getElementById("dob");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const stateSelect = document.getElementById("state");
  const pincodeInput = document.getElementById("pincode");
  const termsCheckbox = document.getElementById("terms");

  // Password visibility toggles
  const togglePasswordBtn = document.getElementById("togglePassword");
  const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");

  // 2. Set Max Date for Date of Birth (No future dates allowed)
  const today = new Date().toISOString().split("T")[0];
  dobInput.setAttribute("max", today);

  // SVG Icons for Password Visibility
  const eyeIconSvg = `
    <svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;

  const eyeOffIconSvg = `
    <svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  `;

  // Helper: Setup Password Toggle Functionality
  function setupPasswordToggle(button, inputField) {
    button.addEventListener("click", () => {
      const isPassword = inputField.getAttribute("type") === "password";
      if (isPassword) {
        inputField.setAttribute("type", "text");
        button.innerHTML = eyeOffIconSvg;
        button.setAttribute("aria-label", "Hide password");
      } else {
        inputField.setAttribute("type", "password");
        button.innerHTML = eyeIconSvg;
        button.setAttribute("aria-label", "Show password");
      }
    });
  }

  setupPasswordToggle(togglePasswordBtn, passwordInput);
  setupPasswordToggle(toggleConfirmPasswordBtn, confirmPasswordInput);

  // 3. UI Helper Functions (Show Error / Show Success)
  function setError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);
    if (group) {
      group.classList.add("has-error");
      group.classList.remove("is-valid");
    }
    if (errorEl) {
      errorEl.textContent = message;
    }
    return false;
  }

  function setValid(groupId, errorId) {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);
    if (group) {
      group.classList.remove("has-error");
      group.classList.add("is-valid");
    }
    if (errorEl) {
      errorEl.textContent = "";
    }
    return true;
  }

  function clearState(groupId, errorId) {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);
    if (group) {
      group.classList.remove("has-error", "is-valid");
    }
    if (errorEl) {
      errorEl.textContent = "";
    }
  }

  // 4. Individual Field Validation Functions

  // Rule 1: Full Name (Required, min 3 chars, letters and spaces only)
  function validateFullName() {
    const value = fullnameInput.value.trim();
    if (value === "") {
      return setError("group-fullname", "error-fullname", "Full name is required.");
    }
    if (value.length < 3) {
      return setError("group-fullname", "error-fullname", "Full name must be at least 3 characters.");
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(value)) {
      return setError("group-fullname", "error-fullname", "Full name can only contain letters and spaces.");
    }
    return setValid("group-fullname", "error-fullname");
  }

  // Rule 2: Email Address (Required, valid email format regex)
  function validateEmail() {
    const value = emailInput.value.trim();
    if (value === "") {
      return setError("group-email", "error-email", "Email address is required.");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return setError("group-email", "error-email", "Please enter a valid email address (e.g. name@example.com).");
    }
    return setValid("group-email", "error-email");
  }

  // Rule 3: Phone Number (Required, exactly 10 digits, starts with 6, 7, 8, or 9)
  function validatePhone() {
    const value = phoneInput.value.trim();
    if (value === "") {
      return setError("group-phone", "error-phone", "Phone number is required.");
    }
    if (!/^\d+$/.test(value)) {
      return setError("group-phone", "error-phone", "Phone number must contain only numbers.");
    }
    if (value.length !== 10) {
      return setError("group-phone", "error-phone", "Phone number must be exactly 10 digits.");
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
      return setError("group-phone", "error-phone", "Phone number must start with 6, 7, 8, or 9.");
    }
    return setValid("group-phone", "error-phone");
  }

  // Rule 4: Date of Birth (Required, not in the future)
  function validateDob() {
    const value = dobInput.value;
    if (!value) {
      return setError("group-dob", "error-dob", "Date of birth is required.");
    }
    const selectedDate = new Date(value);
    const currentDate = new Date();
    // Normalize time to end of day
    currentDate.setHours(23, 59, 59, 999);
    if (selectedDate > currentDate) {
      return setError("group-dob", "error-dob", "Date of birth cannot be in the future.");
    }
    return setValid("group-dob", "error-dob");
  }

  // Rule 5: Password (Required, min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char)
  function validatePassword() {
    const value = passwordInput.value;
    if (value === "") {
      return setError("group-password", "error-password", "Password is required.");
    }
    if (value.length < 8) {
      return setError("group-password", "error-password", "Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(value)) {
      return setError("group-password", "error-password", "Password must contain at least one uppercase letter (A-Z).");
    }
    if (!/[a-z]/.test(value)) {
      return setError("group-password", "error-password", "Password must contain at least one lowercase letter (a-z).");
    }
    if (!/\d/.test(value)) {
      return setError("group-password", "error-password", "Password must contain at least one number (0-9).");
    }
    if (!/[!@#$%^&*(),.?":{}|<>\-_=+]/.test(value)) {
      return setError("group-password", "error-password", "Password must contain at least one special character (!@#$%^&*).");
    }
    
    // Also re-validate confirmPassword if already typed
    if (confirmPasswordInput.value.length > 0) {
      validateConfirmPassword();
    }

    return setValid("group-password", "error-password");
  }

  // Rule 6: Confirm Password (Required, must match password)
  function validateConfirmPassword() {
    const value = confirmPasswordInput.value;
    if (value === "") {
      return setError("group-confirmPassword", "error-confirmPassword", "Please confirm your password.");
    }
    if (value !== passwordInput.value) {
      return setError("group-confirmPassword", "error-confirmPassword", "Passwords do not match.");
    }
    return setValid("group-confirmPassword", "error-confirmPassword");
  }

  // Rule 7: Gender (Required, one option must be selected)
  function validateGender() {
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    if (!selectedGender) {
      return setError("group-gender", "error-gender", "Please select your gender.");
    }
    return setValid("group-gender", "error-gender");
  }

  // Rule 8: Residential Address (Required, cannot be empty)
  function validateAddress() {
    const value = addressInput.value.trim();
    if (value === "") {
      return setError("group-address", "error-address", "Residential address is required.");
    }
    return setValid("group-address", "error-address");
  }

  // Rule 9: City (Required, cannot be empty)
  function validateCity() {
    const value = cityInput.value.trim();
    if (value === "") {
      return setError("group-city", "error-city", "City is required.");
    }
    return setValid("group-city", "error-city");
  }

  // Rule 10: State (Required, user must select a state)
  function validateState() {
    const value = stateSelect.value;
    if (value === "") {
      return setError("group-state", "error-state", "Please select a state.");
    }
    return setValid("group-state", "error-state");
  }

  // Rule 11: PIN Code (Required, exactly 6 digits)
  function validatePincode() {
    const value = pincodeInput.value.trim();
    if (value === "") {
      return setError("group-pincode", "error-pincode", "PIN code is required.");
    }
    const pinRegex = /^\d{6}$/;
    if (!pinRegex.test(value)) {
      return setError("group-pincode", "error-pincode", "PIN code must be exactly 6 numeric digits.");
    }
    return setValid("group-pincode", "error-pincode");
  }

  // Rule 12: Terms and Conditions (Must be checked)
  function validateTerms() {
    if (!termsCheckbox.checked) {
      return setError("group-terms", "error-terms", "You must agree to the Terms and Conditions.");
    }
    return setValid("group-terms", "error-terms");
  }

  // 5. Real-Time Event Listeners (blur, input, change)

  // Full Name
  fullnameInput.addEventListener("blur", validateFullName);
  fullnameInput.addEventListener("input", () => {
    if (document.getElementById("group-fullname").classList.contains("has-error")) {
      validateFullName();
    }
  });

  // Email
  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", () => {
    if (document.getElementById("group-email").classList.contains("has-error")) {
      validateEmail();
    }
  });

  // Phone
  phoneInput.addEventListener("blur", validatePhone);
  phoneInput.addEventListener("input", () => {
    // Restrict input to digits only
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
    if (document.getElementById("group-phone").classList.contains("has-error")) {
      validatePhone();
    }
  });

  // Date of Birth
  dobInput.addEventListener("blur", validateDob);
  dobInput.addEventListener("change", validateDob);

  // Password
  passwordInput.addEventListener("blur", validatePassword);
  passwordInput.addEventListener("input", () => {
    if (document.getElementById("group-password").classList.contains("has-error")) {
      validatePassword();
    }
  });

  // Confirm Password
  confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
  confirmPasswordInput.addEventListener("input", () => {
    if (document.getElementById("group-confirmPassword").classList.contains("has-error")) {
      validateConfirmPassword();
    }
  });

  // Gender radios
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  genderRadios.forEach(radio => {
    radio.addEventListener("change", validateGender);
  });

  // Address
  addressInput.addEventListener("blur", validateAddress);
  addressInput.addEventListener("input", () => {
    if (document.getElementById("group-address").classList.contains("has-error")) {
      validateAddress();
    }
  });

  // City
  cityInput.addEventListener("blur", validateCity);
  cityInput.addEventListener("input", () => {
    if (document.getElementById("group-city").classList.contains("has-error")) {
      validateCity();
    }
  });

  // State
  stateSelect.addEventListener("change", validateState);
  stateSelect.addEventListener("blur", validateState);

  // PIN Code
  pincodeInput.addEventListener("blur", validatePincode);
  pincodeInput.addEventListener("input", () => {
    pincodeInput.value = pincodeInput.value.replace(/\D/g, "");
    if (document.getElementById("group-pincode").classList.contains("has-error")) {
      validatePincode();
    }
  });

  // Terms Checkbox
  termsCheckbox.addEventListener("change", validateTerms);

  // 6. Form Submission Event
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent standard page refresh

    // Run all validations
    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isDobValid = validateDob();
    const isPassValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isGenderValid = validateGender();
    const isAddressValid = validateAddress();
    const isCityValid = validateCity();
    const isStateValid = validateState();
    const isPinValid = validatePincode();
    const isTermsValid = validateTerms();

    const isFormValid = (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isDobValid &&
      isPassValid &&
      isConfirmValid &&
      isGenderValid &&
      isAddressValid &&
      isCityValid &&
      isStateValid &&
      isPinValid &&
      isTermsValid
    );

    if (!isFormValid) {
      // Hide success message if visible
      successBanner.style.display = "none";

      // Focus and scroll to the first invalid field
      const firstErrorGroup = document.querySelector(".form-group.has-error");
      if (firstErrorGroup) {
        firstErrorGroup.scrollIntoView({ behavior: "smooth", block: "center" });
        const focusable = firstErrorGroup.querySelector("input, select, textarea");
        if (focusable) {
          focusable.focus();
        }
      }
      return;
    }

    // Validation succeeded!
    // Display clear success message: "Registration successful!"
    successBanner.style.display = "flex";
    successBanner.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // 7. Form Reset Event
  form.addEventListener("reset", () => {
    // Clear all validation states and error messages
    const groups = [
      ["group-fullname", "error-fullname"],
      ["group-email", "error-email"],
      ["group-phone", "error-phone"],
      ["group-dob", "error-dob"],
      ["group-password", "error-password"],
      ["group-confirmPassword", "error-confirmPassword"],
      ["group-gender", "error-gender"],
      ["group-address", "error-address"],
      ["group-city", "error-city"],
      ["group-state", "error-state"],
      ["group-pincode", "error-pincode"],
      ["group-terms", "error-terms"]
    ];

    groups.forEach(([groupId, errorId]) => {
      clearState(groupId, errorId);
    });

    // Hide success banner
    successBanner.style.display = "none";

    // Reset password inputs visibility to hidden
    passwordInput.setAttribute("type", "password");
    confirmPasswordInput.setAttribute("type", "password");
    togglePasswordBtn.innerHTML = eyeIconSvg;
    toggleConfirmPasswordBtn.innerHTML = eyeIconSvg;
  });
});
