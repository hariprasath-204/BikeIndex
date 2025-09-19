// Toggle password visibility
function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  input.type = input.type === "password" ? "text" : "password";
}

// Show register modal programmatically
function showRegisterModal() {
  const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
  loginModal.hide();
  const registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
  registerModal.show();
}

// --------------------
// REGISTER
// --------------------
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const firstName = document.getElementById("registerFirstName").value.trim();
  const lastName = document.getElementById("registerLastName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const phone = document.getElementById("registerPhone").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirmPassword").value;
  const gender = document.getElementById("registerGender").value;
  const agree = document.getElementById("agreeTerms").checked;

  const errorDiv = document.getElementById("registerError");
  errorDiv.classList.add("d-none");

  if (password !== confirmPassword) {
    errorDiv.textContent = "Passwords do not match!";
    errorDiv.classList.remove("d-none");
    return;
  }

  if (!agree) {
    errorDiv.textContent = "You must agree to the Terms & Conditions.";
    errorDiv.classList.remove("d-none");
    return;
  }


  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === email)) {
    errorDiv.textContent = "Email already registered!";
    errorDiv.classList.remove("d-none");
    return;
  }

  users.push({ firstName, lastName, email, phone, password, gender });
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Registration successful! Please login.");
  this.reset();

  // Switch to login modal
  const registerModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
  registerModal.hide();
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
});

// --------------------
// LOGIN
// --------------------
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorDiv = document.getElementById("loginError");
  errorDiv.classList.add("d-none");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    errorDiv.textContent = "Invalid email or password!";
    errorDiv.classList.remove("d-none");
    return;
  }

  // Save logged-in user session
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("🎉 Login successful! Welcome " + user.firstName);

  // Close modal
  const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
  loginModal.hide();

  // Goto index.html
  window.location.href = "index.html"; 
  loadUserProfile();
});
