document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu-button');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Carousel Functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('opacity-0', i !== index);
            slide.classList.toggle('opacity-100', i === index);
            dots[i].classList.toggle('opacity-100', i === index);
            dots[i].classList.toggle('opacity-50', i !== index);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 5000);

    // Carousel Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.carousel-container')?.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.carousel-container')?.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            currentSlide = (currentSlide + 1) % slides.length;
        } else if (touchEndX - touchStartX > 50) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        }
        showSlide(currentSlide);
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Car Details and Booking Modals
    const carCards = document.querySelectorAll('.car-card');
    const carDetailsModal = document.getElementById('car-details-modal');
    const closeCarDetailsBtn = document.getElementById('close-car-details');
    const bookingModal = document.getElementById('booking-modal');
    const closeBookingBtn = document.getElementById('close-booking');
    const bookFromDetailsBtn = document.getElementById('book-from-details');
    const bookNowBtns = document.querySelectorAll('.book-now-btn');
    const bookingForm = document.getElementById('booking-form');
    
    // Car Details Modal variables for filling data
    const carDetailsImage = document.getElementById('car-details-image');
    const carDetailsName = document.getElementById('car-details-name');
    const carDetailsCategory = document.getElementById('car-details-category');
    const carDetailsDescription = document.getElementById('car-details-description');
    const carDetailsSeats = document.getElementById('car-details-seats');
    const carDetailsBags = document.getElementById('car-details-bags');
    const carDetailsTransmission = document.getElementById('car-details-transmission');
    const carDetailsPrice = document.getElementById('car-details-price');
    
    // Booking form variable
    const carNameInput = document.getElementById('car-name');
    
    // Variable to store current car data
    let currentCarData = null;
    
    // Helper function to open a modal with animation
    function openModal(modal) {
        modal.classList.remove('hidden');
        modal.style.opacity = '0';
        void modal.offsetWidth;
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';
    }
    
    // Helper function to close a modal with animation
    function closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Set current date as minimum for the date picker
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('pickup-date').min = today;
    
    // Function to display car details with multiple photos
    function displayCarDetails(car) {
        currentCarData = car;
        document.querySelector('#car-details-modal > div').style.opacity = '0';
        
        setTimeout(() => {
            carDetailsName.textContent = car.name;
            carDetailsCategory.textContent = car.category;
            carDetailsDescription.textContent = car.description;
            carDetailsSeats.textContent = car.seats + ' Seats';
            carDetailsBags.textContent = car.bags + ' Bags';
            carDetailsTransmission.textContent = car.transmission;
            carDetailsPrice.innerHTML = `₹ ${car.price}<span class="text-sm text-indigo-200">/KM</span>`;
            carDetailsImage.src = car.photos[0];
            carDetailsImage.alt = car.name;
            
            // Clear and populate the photo gallery thumbnails
            const galleryContainer = document.getElementById('car-photos-gallery');
            galleryContainer.innerHTML = '';
            
            car.photos.forEach((photo, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = photo;
                thumbnail.alt = `${car.name} - Photo ${index + 1}`;
                thumbnail.classList.add('h-16', 'w-24', 'object-cover', 'inline-block', 'mr-2', 'rounded', 'cursor-pointer', 'transition-all', 'duration-300');
                
                if (index === 0) {
                    thumbnail.classList.add('ring-2', 'ring-white');
                }
                
                thumbnail.addEventListener('click', () => {
                    carDetailsImage.src = photo;
                    document.querySelectorAll('#car-photos-gallery img').forEach(img => {
                        img.classList.remove('ring-2', 'ring-white');
                    });
                    thumbnail.classList.add('ring-2', 'ring-white');
                });
                
                galleryContainer.appendChild(thumbnail);
            });
            
            document.querySelector('#car-details-modal > div').style.opacity = '1';
        }, 300);
    }
    
    // Navigation buttons functionality
    document.getElementById('prev-photo')?.addEventListener('click', () => {
        const thumbnails = document.querySelectorAll('#car-photos-gallery img');
        let activeIndex = -1;
        
        thumbnails.forEach((thumb, index) => {
            if (thumb.classList.contains('ring-2')) {
                activeIndex = index;
            }
        });
        
        if (activeIndex > 0) {
            thumbnails[activeIndex - 1].click();
        } else {
            thumbnails[thumbnails.length - 1].click();
        }
    });

    document.getElementById('next-photo')?.addEventListener('click', () => {
        const thumbnails = document.querySelectorAll('#car-photos-gallery img');
        let activeIndex = -1;
        
        thumbnails.forEach((thumb, index) => {
            if (thumb.classList.contains('ring-2')) {
                activeIndex = index;
            }
        });
        
        if (activeIndex < thumbnails.length - 1) {
            thumbnails[activeIndex + 1].click();
        } else {
            thumbnails[0].click();
        }
    });

    // Prevent scroll events from propagating outside the content section
    document.querySelector('.car-details-content')?.addEventListener('wheel', (event) => {
        event.stopPropagation();
    });
    
    // Open car details modal when a car card is clicked
    carCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('book-now-btn') || 
                e.target.closest('.book-now-btn')) {
                return;
            }
            const carData = JSON.parse(this.dataset.car);
            // Convert single image to photos array if necessary
            carData.photos = carData.photos || [carData.image];
            displayCarDetails(carData);
            openModal(carDetailsModal);
        });
    });
    
    // Close car details modal
    closeCarDetailsBtn.addEventListener('click', function() {
        closeModal(carDetailsModal);
    });
    
    // Open booking modal when "Book Now" is clicked from the car card
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const carData = JSON.parse(this.dataset.car);
            currentCarData = carData;
            carNameInput.value = carData.name;
            closeModal(carDetailsModal);
            setTimeout(() => {
                openModal(bookingModal);
            }, 300);
        });
    });
    
    // Open booking modal when "Book Now" is clicked from the car details
    bookFromDetailsBtn.addEventListener('click', function() {
        if (currentCarData) {
            carNameInput.value = currentCarData.name;
            closeModal(carDetailsModal);
            setTimeout(() => {
                openModal(bookingModal);
            }, 300);
        }
    });
    
    // Close booking modal
    closeBookingBtn.addEventListener('click', function() {
        closeModal(bookingModal);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === carDetailsModal) {
            closeModal(carDetailsModal);
        }
        if (e.target === bookingModal) {
            closeModal(bookingModal);
        }
    });
    
    // Form submission handler with validation
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const pickupLocation = document.getElementById('pickup-location').value;
        const dropoffLocation = document.getElementById('dropoff-location').value;
        const pickupDate = document.getElementById('pickup-date').value;
        const pickupTime = document.getElementById('pickup-time').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        if (!pickupLocation || !dropoffLocation || !pickupDate || !pickupTime || !termsAccepted) {
            alert('Please fill in all required fields and accept the terms and conditions.');
            return;
        }
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Booking Confirmed!';
            submitButton.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
            submitButton.classList.add('bg-green-600');
            
            setTimeout(() => {
                closeModal(bookingModal);
                showToast('Booking confirmed! We will contact you shortly with details.');
                this.reset();
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('bg-green-600');
                    submitButton.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
                }, 500);
            }, 1500);
        }, 1500);
    });
    
    // Toast notification function
    function showToast(message) {
        if (!document.getElementById('toast-notification')) {
            const toast = document.createElement('div');
            toast.id = 'toast-notification';
            toast.className = 'fixed bottom-6 right-6 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 z-50 flex items-center';
            toast.innerHTML = `
                <i class="fas fa-check-circle mr-2"></i>
                <span id="toast-message"></span>
            `;
            document.body.appendChild(toast);
        }
        
        const toast = document.getElementById('toast-notification');
        document.getElementById('toast-message').textContent = message;
        toast.style.opacity = '1';
        setTimeout(() => {
            toast.style.opacity = '0';
        }, 4000);
    }
});