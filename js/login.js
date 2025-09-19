// Toggle password visibility
function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  input.type = input.type === "password" ? "text" : "password";
}



// --------------------
// REGISTER (Connected to Server)
// --------------------
document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // --- Get form data ---
  const first_name = document.getElementById("registerFirstName").value.trim();
  const last_name = document.getElementById("registerLastName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const phone = document.getElementById("registerPhone").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirmPassword").value;
  const gender = document.getElementById("registerGender").value;
  const agree = document.getElementById("agreeTerms").checked;
  const errorDiv = document.getElementById("registerError");

  // --- Basic validation ---
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

  // --- Send data to the server ---
  try {
    const response = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        password,
        gender
      })
    });

    const result = await response.json();

    if (!response.ok) {
      // If server returns an error (like "Email already exists")
      throw new Error(result.error || 'Registration failed');
    }

    // --- Handle success ---
    alert("✅ Registration successful! Please login.");
    this.reset();
    showLoginModal(); // Helper function to switch modals

  } catch (error) {
    // --- Handle errors ---
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("d-none");
  }
});

// Helper function to switch from Register to Login modal
function showLoginModal() {
  const registerModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
  registerModal.hide();
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
}
// --------------------
// LOGIN
// --------------------
// --------------------
// LOGIN (Connected to Server)
// --------------------
document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorDiv = document.getElementById("loginError");
  errorDiv.classList.add("d-none");

  try {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (!response.ok) {
      // If server returns an error (like "Invalid credentials")
      throw new Error(result.error || 'Login failed');
    }

    // --- Handle success ---
    // IMPORTANT: Save the token from the server
    localStorage.setItem("token", result.token);

    alert("🎉 Login successful! Welcome back.");

    // Redirect to the main page
    window.location.href = "index.html";

  } catch (error) {
    // --- Handle errors ---
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("d-none");
  }
});
