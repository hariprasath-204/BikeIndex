// R.K Bajaj Showroom Website JavaScript
// Main application logic and functionality

// Bike data from JSON
const bikes = [
    {
        image: 'images/pulsarns400z.jpg',
        title: 'Bajaj Pulsar NS400Z',
        bikeprice: '₹1,92,000',
        subtitle: 'Experience the Power of 400cc',
        desc: 'Liquid cooled engine with KTM technology. The ultimate street fighter.'
    },
    {
        image: 'images/dominar400.jpg',
        title: 'Bajaj Dominar 400',
        bikeprice: '₹2,39,000',
        subtitle: 'Touring Redefined',
        desc: '373cc engine, touring comfort, and performance for long rides.'
    },
    {
        image: 'images/chetak.webp',
        title: 'Bajaj Chetak Electric',
        bikeprice: '₹99,900',
        subtitle: 'Ride into the Future',
        desc: 'Electric mobility with style, range, and zero emissions.'
    }
];
const bikeData = {
    "commuter_bikes": [
        {"name": "Bajaj Platina 100", "price": "₹70,611", "engine": "100cc", "mileage": "70 kmpl", "image": "platina100.jpg", "features": ["Electric Start", "Self Start", "Alloy Wheels"]},
        {"name": "Bajaj Platina 110", "price": "₹74,214", "engine": "110cc", "mileage": "65 kmpl", "image": "platina110.png", "features": ["LED Headlight", "Digital Console", "Tubeless Tyres"]},
        {"name": "Bajaj CT 110", "price": "₹73,104", "engine": "110cc", "mileage": "70 kmpl", "image": "ct110.jpg", "features": ["Kick Start", "Comfortable Seating", "Strong Build"]},
        {"name": "Bajaj CT 125X", "price": "₹78,000", "engine": "125cc", "mileage": "60 kmpl", "image": "ct125x.webp", "features": ["Electric Start", "Disc Brake", "Digital Meter"]},
        {"name": "Bajaj Platina 125", "price": "₹80,000", "engine": "125cc", "mileage": "58 kmpl", "image": "platina125.jpg", "features": ["LED DRL", "Mobile Charging", "Anti-Skid Seat"]}
    ],
    "pulsar_series": [
        /*{"name": "Bajaj Pulsar 125", "price": "₹85,178", "engine": "125cc", "mileage": "51 kmpl", "image": "pulsar125.jpg", "features": ["Split Seat", "LED Tail Light", "Electric Start"]},
        {"name": "Bajaj Pulsar N125", "price": "₹99,213", "engine": "125cc", "mileage": "50 kmpl", "image": "pulsarn125.jpg", "features": ["LED Headlight", "Digital Console", "Tubeless Tyres"]},
        {"name": "Bajaj Pulsar NS125", "price": "₹99,924", "engine": "125cc", "mileage": "52 kmpl", "image": "pulsarns125.jpg", "features": ["Naked Street", "Upside Down Forks", "LED Lighting"]},
        {"name": "Bajaj Pulsar 150", "price": "₹1,17,241", "engine": "150cc", "mileage": "45 kmpl", "image": "pulsar150.jpg", "features": ["Twin Spark", "Disc Brake", "Split Grab Rail"]},
        {"name": "Bajaj Pulsar N160", "price": "₹1,23,000", "engine": "160cc", "mileage": "45 kmpl", "image": "pulsarn160.jpg", "features": ["LED Headlight", "Digital Console", "USD Forks"]},
        {"name": "Bajaj Pulsar NS160", "price": "₹1,31,671", "engine": "160cc", "mileage": "40 kmpl", "image": "pulsarns160.jpg", "features": ["Naked Street", "Monoshock", "Perimeter Frame"]},
        {"name": "Bajaj Pulsar RS200", "price": "₹1,85,000", "engine": "200cc", "mileage": "35 kmpl", "image": "pulsarrs200.jpg", "features": ["Full Fairing", "Projector Headlight", "ABS"]},
        {"name": "Bajaj Pulsar NS200", "price": "₹1,43,000", "engine": "200cc", "mileage": "40 kmpl", "image": "pulsarns200.jpg", "features": ["Liquid Cooled", "Perimeter Frame", "Nitrox Monoshock"]},
        {"name": "Bajaj Pulsar 220F", "price": "₹1,38,752", "engine": "220cc", "mileage": "38 kmpl", "image": "pulsar220f.jpg", "features": ["Oil Cooled", "Projector Headlight", "Split Seat"]},
        {"name": "Bajaj Pulsar N250", "price": "₹1,44,940", "engine": "250cc", "mileage": "35 kmpl", "image": "pulsarn250.jpg", "features": ["Oil Cooled", "USD Forks", "LED Lighting"]},*/
        {"name": "Bajaj Pulsar NS400Z", "price": "₹1,92,000", "engine": "400cc", "mileage": "30 kmpl", "image": "pulsarns400z.jpg", "features": ["Liquid Cooled", "KTM Engine", "Upside Down Forks"]}
    ],
    "dominar_series": [
        {"name": "Bajaj Dominar 250", "price": "₹1,92,275", "engine": "248cc", "mileage": "35 kmpl", "image": "dominar250.jpg", "features": ["LED Headlight", "Digital Console", "Slipper Clutch"]},
        {"name": "Bajaj Dominar 400", "price": "₹2,39,000", "engine": "373cc", "mileage": "30 kmpl", "image": "dominar400.jpg", "features": ["Liquid Cooled", "USD Forks", "Dual Channel ABS"]}
    ],
    "avenger_series": [
        {"name": "Bajaj Avenger Street 160", "price": "₹1,21,668", "engine": "160cc", "mileage": "45 kmpl", "image": "avengerstreet160.webp", "features": ["Cruiser Style", "Low Seat Height", "Chrome Finish"]},
        /*{"name": "Bajaj Avenger Street 220", "price": "₹1,43,998", "engine": "220cc", "mileage": "40 kmpl", "image": "avengerstreet220.jpg", "features": ["DTS-i Engine", "Split Seat", "Alloy Wheels"]},
        {"name": "Bajaj Avenger Cruise 220", "price": "₹1,48,911", "engine": "220cc", "mileage": "38 kmpl", "image": "avengercruise220.jpg", "features": ["Windshield", "Backrest", "Chrome Treatment"]}*/
    ],
    "electric_scooters": [
        {"name": "Bajaj Chetak", "price": "₹99,900", "engine": "Electric", "range": "155 km", "image": "chetak.webp", "features": ["Hub Motor", "IP67 Battery", "Smartphone Connectivity"]}
    ],
    /*"cng_bikes": [
        {"name": "Bajaj Freedom 125", "price": "₹93,280", "engine": "125cc CNG", "range": "330 km", "image": "freedom125.jpg", "features": ["Dual Fuel", "CNG Tank", "Environment Friendly"]}
    ]*/
};

// Category mapping for filters
const categoryMapping = {
    'all': 'all',
    'commuter': 'commuter_bikes',
    'pulsar': 'pulsar_series',
    'dominar': 'dominar_series',
    'avenger': 'avenger_series',
    'electric': 'electric_scooters',
    'cng': 'cng_bikes'
};

// Service data
const serviceData = {
    "periodic_service": [
        {"name": "Basic Service", "price": "₹499", "duration": "1 hour", "includes": ["Engine Oil Change", "Air Filter Check", "Chain Lubrication", "Basic Inspection", "Chain Check"]},
        {"name": "Standard Service", "price": "₹899", "duration": "2 hours", "includes": ["Engine Oil & Filter Change", "Brake Adjustment", "Chain & Sprocket Check", "Battery Check", "Tyre Pressure"]},
        {"name": "Premium Service", "price": "₹1,499", "duration": "3 hours", "includes": ["Complete Engine Service", "Brake System Service", "Electrical Check", "Suspension Check", "Performance Tuning"]},
        {"name": "Major Service", "price": "₹2,499", "duration": "4-5 hours", "includes": ["Complete Overhaul", "Engine Cleaning", "Carburetor Service", "Clutch Adjustment", "Complete Inspection"]}
    ],
    "repair_services": [
        {"name": "Engine Repair", "price": "₹2,000+", "duration": "1-2 days", "description": "Complete engine diagnostics and repair"},
        {"name": "Brake Service", "price": "₹500+", "duration": "2 hours", "description": "Brake pad replacement and system service"},
        {"name": "Electrical Repair", "price": "₹300+", "duration": "1-3 hours", "description": "Wiring, lights, and electrical component repair"},
        {"name": "Suspension Repair", "price": "₹800+", "duration": "3-4 hours", "description": "Fork service and shock absorber repair"}
    ]
};

// Chat responses for AI assistant
const chatResponses = {
    greetings: [
        "Hello! Welcome to R.K Bajaj. How can I assist you today?",
        "Hi there! I'm here to help you with any questions about our bikes and services.",
        "Welcome! What would you like to know about our Bajaj motorcycles?"
    ],
    bikes: [
        "We have a fantastic range of Bajaj bikes including Pulsar, Dominar, Avenger, and Commuter series. Which category interests you?",
        "Our bike collection includes everything from 100cc commuter bikes to 400cc performance machines. What's your riding preference?",
        "You can browse our complete bike collection in the Products section. Do you have a specific model in mind?"
    ],
    testDrive: [
        "You can book a test drive by visiting our Test Drive section. You'll need a valid driving license and should be above 18 years.",
        "Test drives are available for all our models. Just fill out the form with your details and preferred date/time.",
        "To book a test drive, click on 'Test Drive' in the menu and complete the booking form. Bring your driving license when you visit!"
    ],
    booking: [
        "Bike booking is a simple 4-step process: Personal Details, Address Details, Document Details, and Finance & Insurance Details.",
        "You can complete your bike booking online through our Booking section. We'll guide you through each step.",
        "For bike booking, you'll need documents like Aadhar, PAN, and Driving License. The process takes just a few minutes online."
    ],
    service: [
        "We offer Basic, Standard, Premium, and Major service packages. You can book service appointments online or visit our showroom.",
        "Our service center provides genuine Bajaj parts and expert technicians. Book your service through the Services section.",
        "Service booking is available online. Choose from our service packages based on your bike's requirements."
    ],
    contact: [
        "You can reach us at +91 9876543210 or visit our showroom at 123 Main Street, City Center.",
        "Our showroom is open Monday-Saturday 9AM-8PM and Sunday 10AM-6PM. You can also email us at info@rkbajaj.com",
        "Feel free to contact us through the Contact section or visit our showroom. We're here to help!"
    ],
    default: [
        "I'm here to help with information about bikes, test drives, bookings, and services. What specific information do you need?",
        "You can ask me about our bike models, pricing, test drives, service booking, or general inquiries. How can I assist?",
        "I can help you with bike information, booking processes, service details, and more. What would you like to know?"
    ]
};

// Current booking step
let currentBookingStep = 1;
let bookingData = {};

// Current section
let currentSection = 'home';

// Chat state
let chatHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load bikes data
    loadBikesData();
    
    // Load services data
    loadServicesData();
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Initialize search and filters
    initializeSearchAndFilters();
    
    // Initialize help center
    initializeHelpCenter();
    
    // Set minimum date for date inputs
    setMinimumDates();
    
    // Initialize chat
    initializeChat();
    
    // Load bike options in selects
    loadBikeOptionsInSelects();
    
    console.log('R.K Bajaj website initialized successfully');
}

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        currentSection = sectionId;
        
        // Update navbar active state
        updateNavbarActive(sectionId);
        
        // Close chat if open
        closeChatWindow();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }
}

function updateNavbarActive(sectionId) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
}

// Load bikes data and display
function loadBikesData() {
    const bikesGrid = document.getElementById('bikesGrid');
    if (!bikesGrid) return;
    
    bikesGrid.innerHTML = '';
    
    // Load all bike categories
    Object.keys(bikeData).forEach(category => {
        bikeData[category].forEach(bike => {
            const bikeCard = createBikeCard(bike, category);
            bikesGrid.appendChild(bikeCard);
        });
    });
}

function createBikeCard(bike, category) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 bike-item';
    col.setAttribute('data-category', category);
    
    const bikeId = bike.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    
    col.innerHTML = `
        <div class="product-card">
            <div class="product-image">
            
            <img src="images/${bike.image}" alt="${bike.name}" class="img-fluid">
            
            </div>
            <div class="product-info">
                <h4>${bike.name}</h4>
                <div class="product-price">${bike.price}</div>
                <div class="product-specs">
                    <span>${bike.engine}</span>
                    <span>${bike.mileage || bike.range}</span>
                </div>
                <div class="product-features">
                    ${bike.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-primary btn-sm flex-fill" onclick="showBikeDetails('${bikeId}', '${bike.name}', '${bike.price}', '${bike.engine}','${bike.image}', '${bike.mileage || bike.range}', '${bike.features.join(', ')}')" data-bs-toggle="modal" data-bs-target="#bikeDetailModal">
                        View Details
                    </button>
                    <button class="btn btn-outline-primary btn-sm" onclick="showSection('test-drive')">
                        Test Drive
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Show bike details in modal
function showBikeDetails(bikeId, name, price, engine,image , mileage, features) {
    const modalTitle = document.getElementById('bikeModalTitle');
    const modalBody = document.getElementById('bikeModalBody');
    
    modalTitle.textContent = name;
    
    modalBody.innerHTML = `
<div class="bike-modal-content">
    <!-- Bike Image Container with Background -->
    <div class="bike-detail-image-bg">
        <img src="images/${image}" class="bike-detail-image" alt="${name}">
    </div>

    <!-- Bike Details -->
    <div class="bike-details">
        <h3 class="bike-detail-price">${price}</h3>

        <div class="bike-detail-specs">
            <div class="spec-item">
                <i class="fas fa-cog"></i>
                <span>Engine: ${engine}</span>
            </div>
            <div class="spec-item">
                <i class="fas fa-gas-pump"></i>
                <span>Mileage: ${mileage}</span>
            </div>
        </div>

        <div class="bike-detail-features">
            <h5>Key Features:</h5>
            <ul>
                ${features.split(', ').map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>

        <div class="bike-actions">
            <button class="btn btn-primary" onclick="showSection('test-drive')" data-bs-dismiss="modal">
                Book Test Drive
            </button>
            <button class="btn btn-success" onclick="showSection('booking')" data-bs-dismiss="modal">
                Book Now
            </button>
        </div>
    </div>
</div>


    `;
}

// Search and filter functionality
function initializeSearchAndFilters() {
    const searchInput = document.getElementById('bikeSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterBikes);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterBikes);
    }
}

function filterByCategory(category) {
    // Update active tab
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = category;
    }
    
    filterBikes();
}

function filterBikes() {
    const searchTerm = document.getElementById('bikeSearch')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('categoryFilter')?.value || 'all';
    
    const bikeItems = document.querySelectorAll('.bike-item');
    
    bikeItems.forEach(item => {
        const bikeName = item.querySelector('h4').textContent.toLowerCase();
        const bikeCategory = item.getAttribute('data-category');
        
        const matchesSearch = bikeName.includes(searchTerm);
        
        // Map the filter category to actual data category  
        const mappedCategory = categoryMapping[selectedCategory] || selectedCategory;
        const matchesCategory = selectedCategory === 'all' || bikeCategory === mappedCategory;
        
        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Load services data
function loadServicesData() {
    loadPeriodicServices();
    loadRepairServices();
}

function loadPeriodicServices() {
    const container = document.getElementById('periodicServices');
    if (!container) return;
    
    container.innerHTML = '';
    
    serviceData.periodic_service.forEach(service => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6';
        
        col.innerHTML = `
            <div class="service-package-card">
                <h4>${service.name}</h4>
                <div class="service-price">${service.price}</div>
                <div class="service-duration">Duration: ${service.duration}</div>
                <h6>Includes:</h6>
                <ul class="service-includes">
                    ${service.includes.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <button class="btn btn-primary mt-3" onclick="selectService('${service.name}')">Select Service</button>
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
            <div class="service-package-card">
                <h4>${service.name}</h4>
                <div class="service-price">${service.price}</div>
                <div class="service-duration">Duration: ${service.duration}</div>
                <p>${service.description}</p>
                <button class="btn btn-primary mt-3" onclick="selectService('${service.name}')">Book Repair</button>
            </div>
        `;
        
        container.appendChild(col);
    });
}

function selectService(serviceName) {
    // Scroll to service booking form
    const bookingForm = document.querySelector('.service-booking-section');
    if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-select the service if possible
        const serviceSelect = document.querySelector('select[name="serviceType"]');
        if (serviceSelect) {
            const serviceValue = serviceName.toLowerCase().replace(' service', '').replace(' ', '-');
            const option = serviceSelect.querySelector(`option[value="${serviceValue}"]`);
            if (option) {
                serviceSelect.value = serviceValue;
            }
        }
    }
}

// Form handlers
function initializeFormHandlers() {
    // Test Drive Form
    const testDriveForm = document.getElementById('testDriveForm');
    if (testDriveForm) {
        testDriveForm.addEventListener('submit', handleTestDriveSubmission);
    }
    
    // Service Booking Form
    const serviceForm = document.getElementById('serviceBookingForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', handleServiceBooking);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
    
    // Final Booking Form
    const finalBookingForm = document.getElementById('finalBookingForm');
    if (finalBookingForm) {
        finalBookingForm.addEventListener('submit', handleFinalBooking);
    }
    
    // Same address checkbox
    const sameAddressCheck = document.getElementById('sameAddress');
    if (sameAddressCheck) {
        sameAddressCheck.addEventListener('change', handleSameAddressChange);
    }
}

function handleTestDriveSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateTestDriveForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showAlert('success', 'Test drive booked successfully! We will contact you shortly to confirm your appointment.');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function validateTestDriveForm(data) {
    const requiredFields = ['fullName', 'mobile', 'email', 'bikeModel', 'preferredDate', 'preferredTime', 'drivingLicense', 'experience'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showAlert('error', `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('error', 'Please enter a valid email address');
        return false;
    }
    
    // Validate mobile
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(data.mobile)) {
        showAlert('error', 'Please enter a valid 10-digit mobile number');
        return false;
    }
    
    // Validate date (should be future date)
    const selectedDate = new Date(data.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showAlert('error', 'Please select a future date for test drive');
        return false;
    }
    
    return true;
}

function handleServiceBooking(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.fullName || !data.mobile || !data.bikeModel || !data.serviceType || !data.serviceDate) {
        showAlert('error', 'Please fill in all required fields');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showAlert('success', 'Service appointment booked successfully! We will contact you to confirm the details.');
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.phone || !data.email || !data.message) {
        showAlert('error', 'Please fill in all required fields');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showAlert('success', 'Message sent successfully! We will get back to you soon.');
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Booking process handlers
function nextBookingStep(step) {
    // Validate current step
    const currentForm = document.getElementById(`bookingForm${currentBookingStep}`);
    if (!validateBookingStep(currentForm)) {
        return;
    }
    
    // Save current step data
    saveBookingStepData(currentBookingStep);
    
    // Hide current step
    document.getElementById(`bookingForm${currentBookingStep}`).classList.remove('active');
    document.querySelector(`[data-step="${currentBookingStep}"]`).classList.remove('active');
    
    // Show next step
    currentBookingStep = step;
    document.getElementById(`bookingForm${currentBookingStep}`).classList.add('active');
    document.querySelector(`[data-step="${currentBookingStep}"]`).classList.add('active');
    
    // Scroll to top of booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function prevBookingStep(step) {
    // Hide current step
    document.getElementById(`bookingForm${currentBookingStep}`).classList.remove('active');
    document.querySelector(`[data-step="${currentBookingStep}"]`).classList.remove('active');
    
    // Show previous step
    currentBookingStep = step;
    document.getElementById(`bookingForm${currentBookingStep}`).classList.add('active');
    document.querySelector(`[data-step="${currentBookingStep}"]`).classList.add('active');
    
    // Scroll to top of booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function validateBookingStep(form) {
    const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    for (let input of requiredInputs) {
        if (!input.value.trim()) {
            input.focus();
            showAlert('error', `Please fill in the ${input.previousElementSibling.textContent.replace(' *', '')}`);
            return false;
        }
    }
    
    return true;
}

function saveBookingStepData(step) {
    const form = document.getElementById(`bookingForm${step}`);
    const formData = new FormData(form.querySelector('form'));
    const data = Object.fromEntries(formData);
    
    bookingData[`step${step}`] = data;
}

function handleFinalBooking(e) {
    e.preventDefault();
    
    // Save final step data
    saveBookingStepData(4);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showAlert('success', 'Bike booking completed successfully! We will contact you within 24 hours for document verification and further process.');
        
        // Reset booking process
        resetBookingProcess();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show home section after a delay
        setTimeout(() => {
            showSection('home');
        }, 3000);
    }, 2000);
}

function resetBookingProcess() {
    currentBookingStep = 1;
    bookingData = {};
    
    // Reset all forms
    for (let i = 1; i <= 4; i++) {
        const form = document.getElementById(`bookingForm${i}`);
        if (form) {
            form.classList.remove('active');
            form.querySelector('form').reset();
        }
        
        const progressStep = document.querySelector(`[data-step="${i}"]`);
        if (progressStep) {
            progressStep.classList.remove('active');
        }
    }
    
    // Show first step
    document.getElementById('bookingForm1').classList.add('active');
    document.querySelector('[data-step="1"]').classList.add('active');
}

function handleSameAddressChange(e) {
    const permanentFields = ['permanentAddress', 'permanentCity', 'permanentState', 'permanentPincode'];
    const currentFields = ['currentAddress', 'city', 'state', 'pincode'];
    
    if (e.target.checked) {
        permanentFields.forEach((field, index) => {
            const permanentField = document.querySelector(`input[name="${field}"], textarea[name="${field}"]`);
            const currentField = document.querySelector(`input[name="${currentFields[index]}"], textarea[name="${currentFields[index]}"]`);
            
            if (permanentField && currentField) {
                permanentField.value = currentField.value;
            }
        });
    }
}

function toggleLoanFields(select) {
    const loanFields = document.querySelectorAll('.loan-field');
    
    if (select.value === 'loan') {
        loanFields.forEach(field => {
            field.style.display = 'block';
        });
    } else {
        loanFields.forEach(field => {
            field.style.display = 'none';
        });
    }
}

// Load bike options in select elements
function loadBikeOptionsInSelects() {
    const selects = document.querySelectorAll('select[name="bikeModel"]');
    
    selects.forEach(select => {
        // Clear existing options except first
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }
        
        // Add bike options
        Object.keys(bikeData).forEach(category => {
            bikeData[category].forEach(bike => {
                const option = document.createElement('option');
                option.value = bike.name.toLowerCase().replace(/\s+/g, '-');
                option.textContent = `${bike.name} - ${bike.price}`;
                select.appendChild(option);
            });
        });
    });
}

// Set minimum dates for date inputs
function setMinimumDates() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
}


// Chat functionality
function initializeChat() {
    // Initialize with welcome message already in HTML
    chatHistory = [{
        type: 'bot',
        message: "Hello! I'm your AI assistant. How can I help you today?",
        time: new Date()
    }];
}

function toggleChat() {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.classList.toggle('hidden');
    
    if (!chatWindow.classList.contains('hidden')) {
        // Focus on input when opened
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.focus();
        }
    }
}

function closeChatWindow() {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.classList.add('hidden');
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage('user', message);
    
    // Clear input
    chatInput.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addChatMessage('bot', botResponse);
    }, 500);
}

function addChatMessage(type, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <div class="message-time">${timeString}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store in history
    chatHistory.push({
        type: type,
        message: message,
        time: now
    });
}

function generateBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Greeting responses
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return getRandomResponse(chatResponses.greetings);
    }
    
    // Bike-related queries
    if (msg.includes('bike') || msg.includes('pulsar') || msg.includes('dominar') || msg.includes('avenger') || msg.includes('motorcycle')) {
        return getRandomResponse(chatResponses.bikes);
    }
    
    // Test drive queries
    if (msg.includes('test drive') || msg.includes('test ride')) {
        return getRandomResponse(chatResponses.testDrive);
    }
    
    // Booking queries
    if (msg.includes('book') || msg.includes('buy') || msg.includes('purchase')) {
        return getRandomResponse(chatResponses.booking);
    }
    
    // Service queries
    if (msg.includes('service') || msg.includes('repair') || msg.includes('maintenance')) {
        return getRandomResponse(chatResponses.service);
    }
    
    // Contact queries
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('address') || msg.includes('location')) {
        return getRandomResponse(chatResponses.contact);
    }
    
    // Price queries
    if (msg.includes('price') || msg.includes('cost') || msg.includes('expensive')) {
        return "Our bikes range from ₹70,611 for Platina 100 to ₹2,39,000 for Dominar 400. You can check specific prices in our Products section or ask about any particular model.";
    }
    
    // EMI queries
    if (msg.includes('emi') || msg.includes('loan') || msg.includes('finance')) {
        return "We offer flexible financing options with EMI starting from as low as ₹2,500 per month. You can choose loan tenure from 12 to 48 months during the booking process.";
    }
    
    // Default response
    return getRandomResponse(chatResponses.default);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Utility functions
function showAlert(type, message) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to current section
    const currentSectionElement = document.getElementById(currentSection);
    if (currentSectionElement) {
        const container = currentSectionElement.querySelector('.container');
        if (container) {
            container.insertBefore(alert, container.firstChild);
        }
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
    
    // Scroll to alert
    alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add some dynamic styles for bike detail modal
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .bike-detail-image {
        height: 200px;
        background: linear-gradient(135deg, var(--bajaj-red), var(--color-teal-500));
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        color: white;
        margin-bottom: 1rem;
    }
    
    .bike-detail-price {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--bajaj-red);
        margin-bottom: 1rem;
    }
    
    .spec-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        color: var(--bajaj-gray);
    }
    
    .spec-item i {
        margin-right: 0.5rem;
        color: var(--bajaj-red);
        width: 20px;
    }
    
    .bike-detail-features {
        margin-top: 1.5rem;
    }
    
    .bike-detail-features h5 {
        color: var(--bajaj-gray);
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .bike-detail-features ul {
        list-style: none;
        padding: 0;
    }
    
    .bike-detail-features li {
        padding: 0.25rem 0;
        position: relative;
        padding-left: 1.5rem;
        color: var(--color-slate-500);
    }
    
    .bike-detail-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-teal-500);
        font-weight: 600;
    }
`;
document.head.appendChild(modalStyles);

// Initialize Bootstrap components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap carousel
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            ride: 'carousel'
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button[type="submit"]')) {
        const btn = e.target;
        const form = btn.closest('form');
        
        if (form && form.checkValidity()) {
            // Add loading state will be handled by individual form handlers
        }
    }
});
// =============== USER AUTH & DASHBOARD ===============
const LS_USERS_KEY    = 'rk_bajaj_users';
const LS_LOGGEDIN_KEY = 'rk_bajaj_loggedInUser';

// LocalStorage helpers
function getUsers()        { return JSON.parse(localStorage.getItem(LS_USERS_KEY)) || []; }
function saveUsers(users)  { localStorage.setItem(LS_USERS_KEY, JSON.stringify(users)); }
function getCurrentUser()  { return JSON.parse(localStorage.getItem(LS_LOGGEDIN_KEY)); }
function setCurrentUser(u) { u ? localStorage.setItem(LS_LOGGEDIN_KEY, JSON.stringify(u)) : localStorage.removeItem(LS_LOGGEDIN_KEY); }

// Password toggle
function togglePassword(id) {
  const input = document.getElementById(id);
  if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

// Page section show/hide
function showSection(id) {
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.toggle('hidden', sec.id !== id);
  });
}

// Edit/save/cancel profile
let editingProfile = false;
function populateProfile(u) {
  document.getElementById('profileFirstName').value = u.firstName || '';
  document.getElementById('profileLastName').value  = u.lastName || '';
  document.getElementById('profileEmail').value     = u.email || '';
  document.getElementById('profilePhone').value     = u.phone || '';
}
function toggleEditProfile() {
  editingProfile = !editingProfile;
  ['profileFirstName','profileLastName','profilePhone'].forEach(id => {
    document.getElementById(id).readOnly = !editingProfile;
  });
  document.getElementById('editProfileBtn').classList.toggle('d-none', editingProfile);
  document.getElementById('saveProfileBtn').classList.toggle('d-none', !editingProfile);
  document.getElementById('cancelProfileBtn').classList.toggle('d-none', !editingProfile);
}
function cancelEditProfile() {
  populateProfile(getCurrentUser());
  toggleEditProfile();
}

// Bookings/Services render
function renderBookings() {
  const container = document.getElementById('bookingsContainer');
  const user = getCurrentUser();
  if (!user || !user.bookings || !user.bookings.length) {
    container.innerHTML = `<div class="text-center text-muted py-5">
    <i class="fas fa-calendar-alt fa-3x mb-3"></i><p>No bookings yet.</p></div>`;
    return;
  }
  container.innerHTML = '';
  user.bookings.forEach(b => {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `<div class="card-body">
      <h5>${b.type || 'Booking'}</h5>
      <p>${b.details ? b.details + '<br>' : ''}${b.date || ''}</p>
    </div>`;
    container.append(card);
  });
}
function renderServices() {
  const container = document.getElementById('servicesContainer');
  const user = getCurrentUser();
  if (!user || !user.services || !user.services.length) {
    container.innerHTML = `<div class="text-center text-muted py-5">
    <i class="fas fa-wrench fa-3x mb-3"></i><p>No service records.</p></div>`;
    return;
  }
  container.innerHTML = '';
  user.services.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `<div class="card-body">
      <h5>${s.package || s.type || 'Service'}</h5>
      <p>${s.details ? s.details + '<br>' : ''}${s.date || ''}</p>
    </div>`;
    container.append(card);
  });
}

// Settings: download data
function downloadUserData() {
  const user = getCurrentUser();
  if (!user) return alert('No user logged in!');
  const exportData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    bookings: user.bookings,
    services: user.services,
    memberSince: user.memberSince
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rk_bajaj_data_${user.firstName||'user'}.json`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}



// Auth UI update
function updateAuthUI() {
  const user = getCurrentUser();
  document.getElementById('authButtons').classList.toggle('d-none', !!user);
  document.getElementById('userArea').classList.toggle('d-none', !user);
  if (user) {
    document.getElementById('userDisplayName').textContent = user.firstName;
    populateProfile(user);
    renderBookings();
    renderServices();
  }
}

// Logout & delete
function logout() {
  setCurrentUser(null);
  updateAuthUI();
  showSection('home');
}
function confirmDeleteAccount() {
  if (!confirm('Really delete your account?')) return;
  const user = getCurrentUser();
  saveUsers(getUsers().filter(x => x.id !== user.id));
  logout();
}

// Clear session-only users at refresh
window.addEventListener('load', () => {
  const u = getCurrentUser();
  if (u && u.sessionOnly) logout();
});
// Handler for Test Drive form
document.getElementById('testDriveForm').addEventListener('submit', e => {
  e.preventDefault();
  const user = getCurrentUser();
  const form = e.target;
  const booking = {
    type: 'Test Drive: ' + form.bikeModel.value,
    date: form.preferredDate.value + ' ' + form.preferredTime.value,
    id: Date.now()
  };
  user.bookings.push(booking);
  // persist
  const users = getUsers().map(u => u.id === user.id ? user : u);
  saveUsers(users);
  setCurrentUser(user);
  // UI
  renderBookings();
  
  form.reset();
});

// Handler for Service Booking form
document.getElementById('serviceBookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const user = getCurrentUser();
  const form = e.target;
  const service = {
    package: form.serviceType.options[form.serviceType.selectedIndex].text,
    date: form.serviceDate.value,
    id: Date.now()
  };
  user.services.push(service);
  // persist
  const users = getUsers().map(u => u.id === user.id ? user : u);
  saveUsers(users);
  setCurrentUser(user);
  // UI
  renderServices();
  
  form.reset();
});
document.addEventListener('DOMContentLoaded', () => {
  // … existing init code …

  // Final bike booking form handler
  const finalBookingForm = document.getElementById('finalBookingForm');
  if (finalBookingForm) {
    finalBookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const user = getCurrentUser();
      const form = e.target;
      // Construct a summary of the booking:
      const booking = {
        type: 'Bike Purchase: ' + form.bikeModel.value,
        details: `Color: ${form.bikeColor.value}, Payment: ${form.paymentMode.value}, Insurance: ${form.insuranceType.value}`,
        date: new Date().toLocaleDateString(),
        id: Date.now()
      };
      // Save into user.bookings
      user.bookings.push(booking);
      const users = getUsers().map(u => u.id === user.id ? user : u);
      saveUsers(users);
      setCurrentUser(user);
      // Refresh UI
      renderBookings();
      
      // Reset wizard
      document.querySelectorAll('.booking-form').forEach(f => f.classList.add('hidden'));
      document.getElementById('bookingForm1').classList.remove('hidden');
      document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active'));
      document.querySelector('.progress-step[data-step="1"]').classList.add('active');
      form.reset();
    });
  }
});
// Inside DOMContentLoaded or after updateAuthUI definition
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.querySelector('.btn-outline-warning');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const user = getCurrentUser();
      if (!user) return alert('No user logged in');
      // Exclude sensitive info if desired
      const exportData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        bookings: user.bookings,
        services: user.services,
        memberSince: user.memberSince
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rk_bajaj_data_${user.firstName}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
});

// Logout
function logout() {
  setCurrentUser(null);
  updateAuthUI();
  showSection('home');
}

// On load
window.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  showSection('home');
});




let currentIndex = 0;
const hero = document.getElementById("hero");
const bikeTitle = document.getElementById("bikeTitle");
const bikeprice = document.getElementById("bikeprice");
const bikeSubtitle = document.getElementById("bikeSubtitle");
const bikeDesc = document.getElementById("bikeDesc");

function updateBike() {
    const bike = bikes[currentIndex];
    hero.style.background = `white url('${bike.image}') no-repeat right center`;
    hero.style.backgroundSize = "50%";
    bikeTitle.textContent = bike.title;
    bikeprice.textContent = bike.bikeprice;
    bikeSubtitle.textContent = bike.subtitle;
    bikeDesc.textContent = bike.desc;
}

function prevBike() {
    currentIndex = (currentIndex - 1 + bikes.length) % bikes.length;
    updateBike();
}

function nextBike() {
    currentIndex = (currentIndex + 1) % bikes.length;
    updateBike();
}

// Load first bike when page starts
updateBike();
function updateBike(direction) {
    const bike = bikes[currentIndex];
    
    // Add sliding animation based on direction
    hero.classList.remove('slide-left', 'slide-right');
    void hero.offsetWidth; // Trigger reflow so animation restarts
    hero.classList.add(direction === 'left' ? 'slide-left' : 'slide-right');

    // Update content after a short delay so it syncs with animation
    setTimeout(() => {
        hero.style.background = `white url('${bike.image}') no-repeat right center`;
        hero.style.backgroundSize = '50%';
        bikeTitle.textContent = bike.title;
        bikeprice.textContent = bike.bikeprice;
        bikeSubtitle.textContent = bike.subtitle;
        bikeDesc.textContent = bike.desc;
    }, 100);
}

function nextBike() {
    currentIndex = (currentIndex + 1) % bikes.length;
    updateBike('left');
}

function prevBike() {
    currentIndex = (currentIndex - 1 + bikes.length) % bikes.length;
    updateBike('right');
}



document.addEventListener("DOMContentLoaded", () => {

  // ----------------------
  // Bootstrap modals
  // ----------------------
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  const registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
  window.showLoginModal = () => loginModal.show();
  window.showRegisterModal = () => registerModal.show();

  // ----------------------
  // Register
  // ----------------------
  document.getElementById("registerForm").addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      first_name: document.getElementById("registerFirstName").value,
      last_name: document.getElementById("registerLastName").value,
      email: document.getElementById("registerEmail").value,
      phone: document.getElementById("registerPhone").value,
      password: document.getElementById("registerPassword").value,
      gender: document.getElementById("registerGender").value
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      alert("Registration successful!");
      registerModal.hide();
      document.getElementById("registerForm").reset();
    } else {
      alert(result.error);
    }
  });

  // ----------------------
  // Login
  // ----------------------
  document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      localStorage.setItem("token", result.token);
      loginModal.hide();
      await loadUserProfile();
      updateAuthUI(true);
    } else {
      alert(result.error);
    }
  });

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

    // Fill profile form if it exists
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

    // ✅ Display user name
    const userNameSpan = document.getElementById("userDisplayName");
    if (userNameSpan) userNameSpan.innerText = profile.first_name;

    window.originalProfile = { ...profile };
    setEditable(false);
  }

  // ----------------------
  // Auth UI
  // ----------------------
  function updateAuthUI(loggedIn) {
    document.getElementById("authButtons").classList.toggle("d-none", loggedIn);
    document.getElementById("userArea").classList.toggle("d-none", !loggedIn);
  }

  // ----------------------
  // Edit / Cancel / Save Profile
  // ----------------------
  function setEditable(editing) {
    ["profileFirstName", "profileLastName", "profilePhone"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.readOnly = !editing;
    });
    if (document.getElementById("editProfileBtn"))
      document.getElementById("editProfileBtn").classList.toggle("d-none", editing);
    if (document.getElementById("saveProfileBtn"))
      document.getElementById("saveProfileBtn").classList.toggle("d-none", !editing);
    if (document.getElementById("cancelProfileBtn"))
      document.getElementById("cancelProfileBtn").classList.toggle("d-none", !editing);
  }
// Save Profile Changes
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const payload = {
    first_name: document.getElementById("profileFirstName").value,
    last_name: document.getElementById("profileLastName").value,
    phone: document.getElementById("profilePhone").value
  };

  try {
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

      // Reload profile data
      await loadUserProfile();

      // Hide save/cancel, show edit button
      setEditable(false);
    } else {
      const err = await res.json();
      alert(err.error || "Failed to update profile");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Try again later.");
  }
});
// ---------------------- Change Password ----------------------
  document.getElementById("passwordChangeForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;
    if(newPassword !== confirmNewPassword) return alert("Passwords do not match!");
    const res = await fetch("/api/change-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const result = await res.json();
    if(res.ok){
      alert("Password updated successfully!");
      document.getElementById("passwordChangeForm").reset();
    } else {
      alert(result.error || "Failed to change password");
    }
  });
  // ----------------------
  // Logout
  // ----------------------
  if (document.getElementById("logoutBtn")) {
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("token");
      updateAuthUI(false);
      alert("Logged out successfully");
    });
  }

  // ----------------------
  // Auto login if token exists
  // ----------------------
  if (localStorage.getItem("token")) {
    loadUserProfile().then(() => updateAuthUI(true));
  }

});

console.log('R.K Bajaj Showroom - All systems operational! 🏍️');
