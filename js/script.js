const serviceData = {
  periodic_service: [
    {name: "Basic Service", price: "₹499", duration: "1 hour", includes: ["Engine Oil Change", "Air Filter Check", "Chain Lubrication", "Basic Inspection", "Chain Check"]},
    {name: "Standard Service", price: "₹899", duration: "2 hours", includes: ["Engine Oil & Filter Change", "Brake Adjustment", "Chain & Sprocket Check", "Battery Check", "Tyre Pressure"]},
    {name: "Premium Service", price: "₹1,499", duration: "3 hours", includes: ["Complete Engine Service", "Brake System Service", "Electrical Check", "Suspension Check", "Performance Tuning"]},
    {name: "Major Service", price: "₹2,499", duration: "4-5 hours", includes: ["Complete Overhaul", "Engine Cleaning", "Carburetor Service", "Clutch Adjustment", "Complete Inspection"]}
  ],
  repair_services: [
    {name: "Engine Repair", price: "₹2,000+", duration: "1-2 days", description: "Complete engine diagnostics and repair"},
    {name: "Brake Service", price: "₹500+", duration: "2 hours", description: "Brake pad replacement and system service"},
    {name: "Electrical Repair", price: "₹300+", duration: "1-3 hours", description: "Wiring, lights, and electrical component repair"},
    {name: "Suspension Repair", price: "₹800+", duration: "3-4 hours", description: "Fork service and shock absorber repair"}
  ]
};
// Mobile → max 10 digits
const mobileInput = document.querySelector('input[name="mobile"]');
mobileInput?.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); // allow only digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});
function loadPeriodicServices() {
  const container = document.getElementById('periodicServices');
  if (!container) return;
  container.innerHTML = '';
  serviceData.periodic_service.forEach(service => {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-6';
    col.innerHTML = `
      <div class="service-package-card p-3 border rounded">
        <h4>${service.name}</h4>
        <div class="service-price">${service.price}</div>
        <div class="service-duration">Duration: ${service.duration}</div>
        <h6>Includes:</h6>
        <ul class="service-includes">
          ${service.includes.map(item => `<li>${item}</li>`).join('')}
        </ul>
         <button class="btn btn-success flex-grow-1 ms-2" 
        onclick="requireLogin('servicebooking.html')" 
        data-bs-dismiss="modal">
        Book Now
    </button>
        
      </div>
    `;
    container.appendChild(col);
  });
}

function loadRepairServices() {
  const container = document.getElementById('repairServices');
  if (!container) return;
  container.innerHTML = '';
  serviceData.repair_services.forEach(service => {
    const col = document.createElement('div');
    col.className = 'col-lg-6';
    col.innerHTML = `
      <div class="service-package-card p-3 border rounded">
        <h4>${service.name}</h4>
        <div class="service-price">${service.price}</div>
        <div class="service-duration">Duration: ${service.duration}</div>
        <p>${service.description}</p>
         <button class="btn btn-success flex-grow-1 ms-2" 
        onclick="requireLogin('servicebooking.html')" 
        data-bs-dismiss="modal">
        Book Now
    </button>
      </div>
    `;
    container.appendChild(col);
  });
}

function loadServicesData() {
  loadPeriodicServices();
  loadRepairServices();
  loadMyBookings();
}
// ---------------- Require Login ----------------
function requireLogin(page) {
    const token = localStorage.getItem("token");
    if (!token) {
        if (confirm("⚠️ You must be logged in to continue.\nDo you want to go to Login page?")) {
            window.location.href = "login.html";
        }
        return;
    }
    window.location.href = page;
}
function selectService(serviceName) {
  alert("You selected: " + serviceName);
}

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadServicesData();
});



// Help Center functionality
function initializeHelpCenter() {
    const helpSearch = document.getElementById('helpSearch');
    if (helpSearch) {
        helpSearch.addEventListener('input', searchHelpContent);
    }
}

function showHelpSection(sectionId) {
    // Hide all help sections
    const helpSections = document.querySelectorAll('.help-section');
    helpSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

function searchHelpContent() {
    const searchTerm = document.getElementById('helpSearch').value.toLowerCase();
    const helpItems = document.querySelectorAll('.help-item, .step-item, .process-step');
    
    helpItems.forEach(item => {
        const content = item.textContent.toLowerCase();
        const parent = item.closest('.help-section');
        
        if (content.includes(searchTerm)) {
            item.style.display = 'block';
            if (parent) parent.classList.remove('hidden');
        } else {
            item.style.display = searchTerm ? 'none' : 'block';
        }
    });
    
    // If no search term, show all sections
    if (!searchTerm) {
        const helpSections = document.querySelectorAll('.help-section');
        helpSections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById('getting-started').classList.remove('hidden');
    }
}



function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".page-section").forEach(sec => sec.classList.add("hidden"));

  // Show the selected section
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
    target.scrollIntoView({ behavior: "smooth" });

    // Optional: load data dynamically for certain sections
    if (sectionId === "my-bike-bookings") loadMyBikeBookings();
    if (sectionId === "my-bookings") loadMyServiceBookings();
    if (sectionId === "my-services") loadMyServiceBookings();
    if (sectionId === "profile") loadProfileData();
  }
}
// ----------------------
// Load Profile
// ----------------------
async function loadUserProfile() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await fetch("/api/profile", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) return;

  const profile = await res.json();

  if (document.getElementById("profileFirstName"))
    document.getElementById("profileFirstName").value = profile.first_name;
  if (document.getElementById("profileLastName"))
    document.getElementById("profileLastName").value = profile.last_name;
  if (document.getElementById("profileEmail"))
    document.getElementById("profileEmail").value = profile.email;
  if (document.getElementById("profilePhone"))
    document.getElementById("profilePhone").value = profile.phone;
  if (document.getElementById("profileGender"))
    document.getElementById("profileGender").value = profile.gender;

  // ✅ Save user in localStorage for UI updates
  localStorage.setItem("user", JSON.stringify(profile));

  const userNameSpan = document.getElementById("userDisplayName");
  if (userNameSpan) userNameSpan.innerText = profile.first_name;

  window.originalProfile = { ...profile };
  setEditable(false);

  // update UI with fresh profile
  updateAuthUI(true, profile);
}



// ----------------------
// Auth UI
// ----------------------
function updateAuthUI(loggedIn, user = null) {
  const authButtons = document.getElementById("authButtons");
  const userArea = document.getElementById("userArea");
  const userDisplayName = document.getElementById("userDisplayName");

  if (loggedIn) {
    authButtons?.classList.add("d-none");
    userArea?.classList.remove("d-none");

    if (user && userDisplayName) {
      userDisplayName.textContent = user.first_name;
    }
  } else {
    authButtons?.classList.remove("d-none");
    userArea?.classList.add("d-none");
  }
}

// ----------------------
// Edit / Cancel / Save Profile
// ----------------------
function setEditable(editing) {
  ["profileFirstName", "profileLastName", "profilePhone"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.readOnly = !editing;
  });
  document.getElementById("editProfileBtn")?.classList.toggle("d-none", editing);
  document.getElementById("saveProfileBtn")?.classList.toggle("d-none", !editing);
  document.getElementById("cancelProfileBtn")?.classList.toggle("d-none", !editing);
}

// ---------------------- Save Profile Changes ----------------------
document.getElementById("profileForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const payload = {
    first_name: document.getElementById("profileFirstName").value,
    last_name: document.getElementById("profileLastName").value,
    phone: document.getElementById("profilePhone").value
  };

  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    alert("Profile updated successfully!");
    await loadUserProfile();
    setEditable(false);
  } else {
    const err = await res.json();
    alert(err.error || "Failed to update profile");
  }
});

// ---------------------- Change Password ----------------------
document.getElementById("passwordChangeForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmNewPassword = document.getElementById("confirmNewPassword").value;
  if (newPassword !== confirmNewPassword) return alert("Passwords do not match!");

  const res = await fetch("/api/change-password", {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ currentPassword, newPassword })
  });

  const result = await res.json();
  if (res.ok) {
    alert("Password updated successfully!");
    document.getElementById("passwordChangeForm").reset();
  } else {
    alert(result.error || "Failed to change password");
  }
});

// ---------------------- Check Auth ----------------------
function checkAuth() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    updateAuthUI(true, user);
  } else {
    updateAuthUI(false);
  }
}

// ---------------------- Logout ----------------------
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = 'index.html';

  updateAuthUI(false);
   // go back to login page
}

// ---------------------- Auto login if token exists ----------------------
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    loadUserProfile();
  } else {
    checkAuth();
  }
});
// Load Test Drive Bookings
async function loadTestDrives() {
  const container = document.getElementById("bookingsContainer");
  container.innerHTML = ''; // clear previous content

  const token = localStorage.getItem("token");
  if (!token) {
    container.innerHTML = "<p class='text-center text-danger py-5'>Please login to see your test drives.</p>";
    return;
  }

  try {
    const res = await fetch("/api/my-bookings", {
      headers: { "Authorization": "Bearer " + token }
    });
    if (!res.ok) throw new Error("Failed to fetch test drive bookings");

    const bookings = await res.json();
    if (!bookings || bookings.length === 0) {
      container.innerHTML = `<div class="text-center text-muted py-5">
        <i class="fas fa-calendar-alt fa-3x mb-3"></i>
        <p>No test drive bookings yet.</p>
      </div>`;
      return;
    }

    let html = `<div class="table-responsive">
      <h4>Test Drive Bookings</h4>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Bike Model</th>
            <th>Date</th>
            <th>Time</th>
            <th>Experience</th>
            <th>Booked On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>`;

    bookings.forEach((b, i) => {
      const date = new Date(b.preferred_date);
      const formattedDate = `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
      html += `<tr>
        <td>${i+1}</td>
        <td>${b.bike_model}</td>
        <td>${formattedDate}</td>
        <td>${b.preferred_time}</td>
        <td>${b.experience}</td>
        <td>${new Date(b.created_at).toLocaleString()}</td>
          <td>${b.status || '-'}</td>
      </tr>`;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;

  } catch (err) {
    console.error("Load test drives error:", err);
    container.innerHTML = "<p class='text-center text-danger py-5'>Failed to load test drive bookings.</p>";
  }
}

// Load Service Bookings
async function loadServices() {
  const container = document.getElementById("servicesContainer");
  container.innerHTML = ''; // clear previous content

  const token = localStorage.getItem("token");
  if (!token) {
    container.innerHTML = "<p class='text-center text-danger py-5'>Please login to view your service bookings.</p>";
    return;
  }

  try {
    const res = await fetch("/api/my-services", {
      headers: { "Authorization": "Bearer " + token }
    });
    if (!res.ok) throw new Error("Failed to fetch service bookings");

    const services = await res.json();
    if (!services || services.length === 0) {
      container.innerHTML = `<div class="text-center text-muted py-5">
        <i class="fas fa-wrench fa-3x mb-3"></i>
        <p>No service bookings yet.</p>
      </div>`;
      return;
    }

    // Build table
    let html = `<div class="table-responsive">
      <h4>Service Bookings</h4>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Bike Model</th>
            <th>Date</th>
            
            <th>Notes</th>
            <th>Booked On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>`;

    services.forEach((s, i) => {
      const date = new Date(s.preferred_date);
      const formattedDate = `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
      html += `<tr>
        <td>${i+1}</td>
        <td>${s.bike_model}</td>
        <td>${formattedDate}</td>
        
        <td>${s.notes || '-'}</td>
        <td>${new Date(s.created_at).toLocaleString()}</td>
        <td>${s.status || '-'}</td>
      </tr>`;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;

  } catch (err) {
    console.error("Load services error:", err);
    container.innerHTML = "<p class='text-center text-danger py-5'>Failed to load service bookings.</p>";
  }
}


// ---------------- Reusable Table Renderer ----------------
function renderBookings(containerId, title, bookings, columns) {
  const container = document.getElementById(containerId);

  if (!bookings || bookings.length === 0) {
    container.innerHTML = `<div class="text-center text-muted py-5">
      <i class="fas fa-calendar-alt fa-3x mb-3"></i>
      <p>No ${title.toLowerCase()} yet.</p>
    </div>`;
    return;
  }

  let html = `<div class="table-responsive">
    <h4>${title}</h4>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>${columns.map(c => `<th>${c}</th>`).join('')}</tr>
      </thead>
      <tbody>`;

  bookings.forEach((b, i) => {
    html += `<tr>${columns.map(c => {
      if(c === '#') return `<td>${i+1}</td>`;
      if(c === 'Booked On') return `<td>${new Date(b.created_at).toLocaleString('en-GB', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'})}</td>`;
      return `<td>${b[c.toLowerCase().replace(/\s+/g,'_')] || '-'}</td>`;
    }).join('')}</tr>`;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;

  
}

// ---------------- Load Bike Bookings ----------------
async function loadMyBikeBookings() {
  const container = document.getElementById("bikeBookingsContainer");
  container.innerHTML = '<p class="text-center py-5">Loading your bike bookings...</p>';

  const token = localStorage.getItem("token");
  if (!token) {
    container.innerHTML = "<p class='text-center text-danger py-5'>Please login to view your bike bookings.</p>";
    return;
  }

  try {
    const res = await fetch("/api/my-bikebookings", {
      headers: { "Authorization": "Bearer " + token }
    });

    if (!res.ok) {
      let errorMsg = `Failed to fetch bike bookings (Status: ${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData?.error) errorMsg += `: ${errorData.error}`;
      } catch {}
      throw new Error(errorMsg);
    }

    const bookings = await res.json();
    renderBookings('bikeBookingsContainer', 'My Bike Bookings', bookings, ['#', 'Bike Name', 'Booked On', 'Status']);
  } catch (err) {
    console.error("Load bike bookings error:", err);
    container.innerHTML = `<p class='text-center text-danger py-5'>${err.message}</p>`;
  }
}

// ---------------- Initialize ----------------
document.addEventListener('DOMContentLoaded', () => {
  loadMyBikeBookings();
});






// Load both on page load
document.addEventListener("DOMContentLoaded", () => {
  loadTestDrives();
  loadMyBikeBookings();
  loadServices();
});

