// DOM Elements
const bookingBtns = document.querySelectorAll('.book-room-btn');
const bookingModal = document.querySelector('.booking-modal');

// Check if user is logged in when trying to book
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Open Booking Modal
function openBookingModal(roomType, price) {
    if (!checkLoginStatus()) return;

    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Book ${roomType}</h2>
            <form id="bookingForm">
                <div class="form-group">
                    <label>Room Type:</label>
                    <input type="text" id="roomType" value="${roomType}" readonly>
                </div>
                <div class="form-group">
                    <label>Price per Night:</label>
                    <input type="text" value="₹${price}" readonly>
                </div>
                <div class="form-group">
                    <label>Check-in Date:</label>
                    <input type="date" id="checkIn" required min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>Check-out Date:</label>
                    <input type="date" id="checkOut" required>
                </div>
                <button type="submit" class="btn">Confirm Booking</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };

    // Handle booking submission
    const bookingForm = modal.querySelector('#bookingForm');
    bookingForm.onsubmit = (e) => handleBooking(e, roomType, price);
}

// Handle Booking Submission
function handleBooking(e, roomType, price) {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;

    // Create booking object
    const booking = {
        id: 'BK' + Date.now(),
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        roomType: roomType,
        price: price,
        checkIn: checkIn,
        checkOut: checkOut,
        status: 'Pending'
    };

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Close modal and show success message
    document.querySelector('.booking-modal').remove();
    alert('Booking submitted successfully! Please wait for admin confirmation.');
}

// Add event listeners to booking buttons
document.querySelectorAll('.book-room-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Please login to book a room.');
            window.location.href = 'login.html';
            return;
        }
        const roomType = btn.closest('.room-card').querySelector('h3').textContent;
        const price = btn.dataset.price;
        openBookingModal(roomType, price);
    });
});