// ----------------------
// Prefill Bike Name
// ----------------------
const params = new URLSearchParams(window.location.search);
const bikeName = params.get("bikename");
const bikeModelInput = document.querySelector("[name='bikeModel']");
if (bikeModelInput && bikeName) {
  bikeModelInput.value = bikeName;
}

// ----------------------
// Live Input Restrictions
// ----------------------

// Driving License → only alphanumeric, max 16
const dlInput = document.querySelector('input[name="drivingLicense"]');
if (dlInput) {
  dlInput.addEventListener("input", function () {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // only A-Z, 0-9
    if (this.value.length > 16) {
      this.value = this.value.slice(0, 16);
    }
  });
}

// ----------------------
// Set Date & Time Limits Dynamically
// ----------------------
const dateInputElem = document.querySelector('input[name="preferredDate"]');
const timeInputElem = document.querySelector('input[name="preferredTime"]');

if (dateInputElem) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  dateInputElem.min = today.toISOString().split("T")[0];
  dateInputElem.max = maxDate.toISOString().split("T")[0];

  dateInputElem.addEventListener("change", () => {
    const selectedDate = new Date(dateInputElem.value);
    const day = selectedDate.getDay();

    if (timeInputElem) {
      if (day === 0) { // Sunday
        timeInputElem.min = "10:00 AM";
        timeInputElem.max = "8:00 PM";
      } else { // Mon-Sat
        timeInputElem.min = "09:00 AM";
        timeInputElem.max = "6:00 PM";
      }
    }
  });
}

// ----------------------
// Form Submission with Validation
// ----------------------
document.getElementById("testDriveForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const mobile = formData.get("mobile")?.trim();
  const drivingLicense = formData.get("drivingLicense")?.trim().toUpperCase();
  const preferredDate = formData.get("preferredDate");
  const preferredTime = formData.get("preferredTime");

  // ----------------------
  // Mobile & Driving License Validation
  // ----------------------
  if (!/^\d{10}$/.test(mobile)) {
    alert("📱 Please enter a valid 10-digit mobile number.");
    return;
  }
  if (!/^[A-Z0-9]{16}$/.test(drivingLicense)) {
    alert("🪪 Driving License must be exactly 16 characters (A–Z, 0–9).");
    return;
  }

  // ----------------------
  // Date & Time Validation
  // ----------------------
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const selectedDate = new Date(preferredDate);
  const selectedDay = selectedDate.getDay();

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  if (selectedDate < today) {
    alert("❌ Date cannot be in the past.");
    return;
  }
  if (selectedDate > maxDate) {
    alert("❌ You can only book within the next 7 days.");
    return;
  }

  const [hour, minute] = preferredTime.split(":").map(Number);
  const selectedMinutes = hour * 60 + minute;

  let startMinutes, endMinutes;
  if (selectedDay === 0) { // Sunday
    startMinutes = 10 * 60;
    endMinutes = 18 * 60;
  } else { // Mon-Sat
    startMinutes = 9 * 60;
    endMinutes = 20 * 60;
  }

  if (selectedMinutes < startMinutes || selectedMinutes > endMinutes) {
    alert("❌ Selected time is outside working hours.");
    return;
  }

  // ----------------------
  // Passed validation → API call
  // ----------------------
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) overlay.style.display = "flex";

  const payload = {
    full_name: formData.get("fullName"),
    mobile,
    email: formData.get("email"),
    bike_model: formData.get("bikeModel"),
    preferred_date: preferredDate,
    preferred_time: preferredTime,
    driving_license: drivingLicense,
    experience: formData.get("experience"),
    agreed_terms: document.getElementById("termsCheck")?.checked ? 1 : 0
  };

  try {
    const res = await fetch("/api/testdrive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Test Drive booked successfully!");
      e.target.reset();
      window.location.href = "index.html";
    } else {
      alert("❌ " + (result.error || "Failed to book test drive"));
    }
  } catch (err) {
    console.error("Booking error:", err);
    alert("⚠️ Something went wrong. Please try again later.");
  } finally {
    if (overlay) overlay.style.display = "none";
  }
});
