// ---------------- Step Navigation ----------------
function nextBookingStep(step) {
    const currentForm = document.querySelector('.booking-form.active form');

    // Validate required inputs
    const inputs = currentForm.querySelectorAll('input[required], textarea[required]');
    let valid = true;

    inputs.forEach(input => {
    let isValid = input.value.trim() !== '';

    // Extra validation for specific fields
    if (isValid && input.name === 'mobile') isValid = /^\d{10}$/.test(input.value);
    if (isValid && input.name === 'aadharNumber') isValid = /^\d{12}$/.test(input.value);
    if (isValid && input.name === 'panNumber') isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(input.value);
    if (isValid && input.name === 'drivingLicense') isValid = /^[A-Z0-9]{16}$/.test(input.value);

    // ✅ Validate pincode: must be 6 digits
    if (isValid && (input.name === 'pincode' || input.name === 'permanentPincode')) {
        isValid = /^\d{6}$/.test(input.value);
    }

    if (!isValid) {
        valid = false;
        input.classList.add('is-invalid');
    } else {
        input.classList.remove('is-invalid');
    }
});


    if (!valid) {
        // Focus on first invalid input
        const firstInvalid = currentForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        alert("⚠️ Please fill all required fields correctly before proceeding.");
        return;
    }

    // Update progress steps
    document.querySelectorAll('.progress-step').forEach(ps => {
        ps.classList.remove('active');
        if (parseInt(ps.dataset.step) <= step) ps.classList.add('active');
    });

    // Show next form
    document.querySelectorAll('.booking-form').forEach(form => form.classList.remove('active'));
    document.getElementById('bookingForm' + step).classList.add('active');
}

function prevBookingStep(step) {
    document.querySelectorAll('.booking-form').forEach(form => form.classList.remove('active'));
    document.getElementById('bookingForm' + step).classList.add('active');

    document.querySelectorAll('.progress-step').forEach(ps => {
        ps.classList.remove('active');
        if (parseInt(ps.dataset.step) <= step) ps.classList.add('active');
    });
}

// ---------------- Parse bike info from URL ----------------
const urlParams = new URLSearchParams(window.location.search);
const bikeName = urlParams.get('bikeName');
const bikeId = urlParams.get('bikeId');
document.querySelector('input[name="bikeId"]').value = bikeId || '';
document.querySelector('input[name="bikeName"]').value = bikeName || '';

// ---------------- Auto-fill Permanent Address ----------------
document.getElementById('sameAddress')?.addEventListener('change', function() {
    const checked = this.checked;
    const currentAddress = document.querySelector('textarea[name="currentAddress"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const state = document.querySelector('input[name="state"]').value;
    const pincode = document.querySelector('input[name="pincode"]').value;

    if (checked) {
        document.querySelector('textarea[name="permanentAddress"]').value = currentAddress;
        document.querySelector('input[name="permanentCity"]').value = city;
        document.querySelector('input[name="permanentState"]').value = state;
        document.querySelector('input[name="permanentPincode"]').value = pincode;
    } else {
        document.querySelector('textarea[name="permanentAddress"]').value = '';
        document.querySelector('input[name="permanentCity"]').value = '';
        document.querySelector('input[name="permanentState"]').value = '';
        document.querySelector('input[name="permanentPincode"]').value = '';
    }
});

// ---------------- Live Input Restrictions ----------------

// Mobile → digits only, max 10
document.querySelector('input[name="mobile"]')?.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});

// Alternate Phone → digits only, max 10
document.querySelector('input[name="alternatePhone"]')?.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});

// Aadhaar → digits only, max 12
document.querySelector('input[name="aadharNumber"]')?.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 12);
});

// PAN → uppercase, alphanumeric, max 10
document.querySelector('input[name="panNumber"]')?.addEventListener("input", function () {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
});

// Driving License → uppercase, alphanumeric, max 16
document.querySelector('input[name="drivingLicense"]')?.addEventListener("input", function () {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
});

// Voter ID → uppercase, alphanumeric, max 10
document.querySelector('input[name="voterIdNumber"]')?.addEventListener("input", function () {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
});

// Passport → uppercase, alphanumeric, max 8
document.querySelector('input[name="passportNumber"]')?.addEventListener("input", function () {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
});
// Current Address Pincode → digits only, max 6
document.querySelector('input[name="pincode"]')?.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
});

// Permanent Address Pincode → digits only, max 6
document.querySelector('input[name="permanentPincode"]')?.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
});

// ---------------- Form Submission ----------------
const bookingForm = document.querySelector('#bookingForm3 form');
bookingForm?.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validation before submit
    const mobile = document.querySelector('input[name="mobile"]').value.trim();
    if (!/^\d{10}$/.test(mobile)) {
        alert("📱 Enter a valid 10-digit Mobile Number.");
        return;
    }

    const aadhar = document.querySelector('input[name="aadharNumber"]').value.trim();
    if (!/^\d{12}$/.test(aadhar)) {
        alert("🪪 Aadhaar must be 12 digits.");
        return;
    }

    const pan = document.querySelector('input[name="panNumber"]').value.trim();
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
        alert("🪪 Enter valid PAN (e.g. ABCDE1234F).");
        return;
    }
  // ✅ Add pincode validations
    const pincode = document.querySelector('input[name="pincode"]').value.trim();
    if (!/^\d{6}$/.test(pincode)) {
        alert("📮 Enter a valid 6-digit Pincode for Current Address.");
        return;
    }

    const permanentPincode = document.querySelector('input[name="permanentPincode"]').value.trim();
    if (!/^\d{6}$/.test(permanentPincode)) {
        alert("📮 Enter a valid 6-digit Pincode for Permanent Address.");
        return;
    }

    const dl = document.querySelector('input[name="drivingLicense"]').value.trim();
    if (!/^[A-Z0-9]{16}$/.test(dl)) {
        alert("🚗 Driving License must be 16 alphanumeric characters.");
        return;
    }

    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    const formData = {
        bikeId: document.querySelector('input[name="bikeId"]').value,
        bikeName: document.querySelector('input[name="bikeName"]').value,
        fullName: document.querySelector('input[name="fullName"]').value,
        fatherName: document.querySelector('input[name="fatherName"]').value,
        dateOfBirth: document.querySelector('input[name="dateOfBirth"]').value,
        mobile,
        alternatePhone: document.querySelector('input[name="alternatePhone"]').value || null,
        email: document.querySelector('input[name="email"]').value,
        occupation: document.querySelector('input[name="occupation"]').value,
        currentAddress: document.querySelector('textarea[name="currentAddress"]').value,
        city: document.querySelector('input[name="city"]').value,
        state: document.querySelector('input[name="state"]').value,
        pincode: document.querySelector('input[name="pincode"]').value.trim(),
        permanentAddress: document.querySelector('textarea[name="permanentAddress"]').value,
        permanentCity: document.querySelector('input[name="permanentCity"]').value,
        permanentState: document.querySelector('input[name="permanentState"]').value,
        permanentPincode: document.querySelector('input[name="permanentPincode"]').value.trim(),
        aadharNumber: aadhar,
        panNumber: pan,
        drivingLicense: dl,
        voterIdNumber: document.querySelector('input[name="voterIdNumber"]').value || null,
        passportNumber: document.querySelector('input[name="passportNumber"]').value || null
    };

    const token = localStorage.getItem('token');

    try {
  const res = await fetch("/api/bikebooking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });
  
  const data = await res.json();
  console.log("Server response:", data);

  if (!res.ok) throw new Error(data.message || "Booking failed");

alert("Booking successful! ID: " + data.bookingId);


} catch (err) {
  console.error("Booking error:", err);
  alert("⚠️ Error submitting booking: " + err.message);
}
finally {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }
});
