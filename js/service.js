
// Function to submit service booking
async function submitServiceBooking(event) {
  event.preventDefault();
  const overlay = document.getElementById("loadingOverlay");
  overlay.style.display = "flex"; // show overlay
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Please login first");
    return;
  }

  const form = event.target;
  const fullName = form.fullName.value;
  const mobile = form.mobile.value;
  const email = form.email.value;
  const bikeModel = form.bikeModel.value;
  const serviceType = form.serviceType.value;
  const serviceDate = form.serviceDate.value;
  const notes = form.notes.value;

  try {
    const res = await fetch('/api/book-service', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ fullName, mobile, email, bikeModel, serviceType, serviceDate, notes })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Booking failed');

    alert('Service booked successfully!');
    form.reset();  // clear the form
    loadServices(); // reload history
    // Redirect to index.html
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert('Failed to book service: ' + err.message);
  }finally {
    overlay.style.display = "none"; // hide overlay
  }
}

// Attach form submit event
document.addEventListener('DOMContentLoaded', () => {
  loadServices(); // load existing services on page load

  const bookingForm = document.getElementById('serviceBookingForm');
  bookingForm.addEventListener('submit', submitServiceBooking);
});
