// ---------------- Init ----------------
let bikeData = {};

document.addEventListener("DOMContentLoaded", () => {
    fetchBikes();
    initializeSearchAndFilters();
});

// ---------------- Fetch Bikes from Server ----------------
function fetchBikes() {
    fetch("/api/bikes")
        .then(res => res.json())
        .then(data => {
            bikeData = {};

            // Map data into categories
            data.forEach(bike => {
                if (!bikeData[bike.category]) bikeData[bike.category] = [];
                bikeData[bike.category].push({
                    id: bike.id,
                    name: bike.name,
                    price: bike.price,
                    engine: bike.engine,
                    mileage: bike.mileage,
                    thumbnail: bike.thumbnail
                });
            });

            loadBikesData();
        })
        .catch(err => {
            console.error("Error fetching bikes:", err);
            const bikesGrid = document.getElementById('bikesGrid');
            if (bikesGrid) bikesGrid.innerHTML = "<p class='text-danger'>Failed to load bikes. Please try again later.</p>";
        });
}

// ---------------- Load Bikes into Grid ----------------
function loadBikesData() {
    const bikesGrid = document.getElementById('bikesGrid');
    if (!bikesGrid) return;

    bikesGrid.innerHTML = '';

    Object.keys(bikeData).forEach(category => {
        bikeData[category].forEach(bike => {
            const bikeCard = createBikeCard(bike, category);
            bikesGrid.appendChild(bikeCard);
        });
    });
}

// ---------------- Create Bike Card ----------------
function createBikeCard(bike, category) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 bike-item';
    col.setAttribute('data-category', category);

    col.innerHTML = `
        <div class="product-card">
            <div class="product-image">
                <img src="${bike.thumbnail}" alt="${bike.name}" class="img-fluid">
            </div>
            <div class="product-info">
                <h4>${bike.name}</h4>
                <div class="product-price">${bike.price}</div>
                <div class="product-specs">
                    <span>${bike.engine}</span>
                    <span>${bike.mileage}</span>
                </div>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-primary btn-sm flex-fill" onclick="showBikeDetails(${bike.id})" data-bs-toggle="modal" data-bs-target="#bikeDetailModal">
                        View Details
                    </button>
                    <button class="btn btn-outline-primary btn-sm" onclick="requireLogin(\`testdrive.html?bikename=${bike.name}\`)">
                        Test Drive
                    </button>
                </div>
            </div>
        </div>
    `;

    return col;
}

function showBikeDetails(bikeId) {
    const modalBody = document.getElementById('bikeModalBody');
    const modalTitle = document.getElementById('bikeModalTitle');

    modalTitle.textContent = "Loading...";
    modalBody.innerHTML = `<div class="text-center p-3"><div class="spinner-border text-primary" role="status"></div></div>`;

    fetch(`/api/bikes/${bikeId}`)
        .then(res => res.json())
        .then(bike => {
            modalTitle.textContent = bike.name;

            // Only show first image
            const firstImage = bike.images[0] || bike.thumbnail;

            modalBody.innerHTML = `
<div class="bike-modal-content d-flex flex-column align-items-center">
    <div class="bike-image-container">
        <img src="${firstImage}" class="img-fluid bike-detail-image mb-2" alt="${bike.name}">
    </div>
    <a href="bikeimage.html?bikeId=${bike.id}" class="view-more-link mb-2">Click here to view more images</a>
    <h2 class="bike-detail-price mb-2">${bike.price}</h2>
    <div class="bike-detail-specs mb-2">
        <div class="spec-item"><i class="fas fa-cog"></i><span>Engine: ${bike.engine}</span></div>
        <div class="spec-item"><i class="fas fa-gas-pump"></i><span>Mileage: ${bike.mileage}</span></div>
    </div>
    <div class="bike-detail-features mb-2">
        <h5>Key Features:</h5>
        <ul>${bike.features.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
    <div class="bike-actions d-flex w-100">
    <button class="btn btn-primary flex-grow-1 me-2" 
        onclick="requireLogin(\`testdrive.html?bikename=${bike.name}\`)" 
        data-bs-dismiss="modal">
        Book Test Drive
    </button>
   <button class="btn btn-success flex-grow-1 ms-2" 
            onclick="requireLogin(\`booking.html?bikeId=${bike.id}&bikeName=${encodeURIComponent(bike.name)}\`)" 
            data-bs-dismiss="modal">
            Book Now
        </button>
</div>

</div>`;
        })
        .catch(err => {
            console.error("Error loading bike details:", err);
            modalTitle.textContent = "Error";
            modalBody.innerHTML = "<p class='text-danger'>Failed to load bike details.</p>";
        });
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

// ---------------- Search & Filter ----------------
const categoryMapping = {
    'all': 'all',
    'commuter': 'commuter_bikes',
    'pulsar': 'pulsar_series',
    'dominar': 'dominar_series',
    'avenger': 'avenger_series',
    'electric': 'electric_scooters',
    'cng': 'cng_bikes'
};

function initializeSearchAndFilters() {
    const searchInput = document.getElementById('bikeSearch');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) searchInput.addEventListener('input', filterBikes);
    if (categoryFilter) categoryFilter.addEventListener('change', filterBikes);
}

function filterBikes() {
    const searchTerm = document.getElementById('bikeSearch')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('categoryFilter')?.value || 'all';

    const bikeItems = document.querySelectorAll('.bike-item');
    bikeItems.forEach(item => {
        const bikeName = item.querySelector('h4').textContent.toLowerCase();
        const bikeCategory = item.getAttribute('data-category');

        const matchesSearch = bikeName.includes(searchTerm);
        const mappedCategory = categoryMapping[selectedCategory] || selectedCategory;
        const matchesCategory = selectedCategory === 'all' || bikeCategory === mappedCategory;

        item.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
}
