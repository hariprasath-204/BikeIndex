document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const overlay = document.getElementById("loadingOverlay");
    overlay.style.display = "flex"; // show overlay
    
    const formData = {
        name: this.elements['name'].value.trim(),
        phone: this.elements['phone'].value.trim(),
        email: this.elements['email'].value.trim(),
        subject: this.elements['subject'].value || 'general',
        message: this.elements['message'].value.trim()
    };

    // Required fields check
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
        alert('Please fill all required fields.');
        overlay.style.display = "none"; // hide overlay if validation fails
        return;
    }

    // Phone validation: only 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid 10-digit phone number.');
        overlay.style.display = "none"; // hide overlay if validation fails
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
            alert('Message submitted successfully! Emails processed. Check server logs for status.');
            this.reset();
        } else {
            alert(data.error || 'Something went wrong. Please try again!');
        }
    } catch (err) {
        console.error('Front-end fetch error:', err);
        alert('Server error. Please try again later.');
    } finally {
        overlay.style.display = "none"; // hide overlay
    }
});
