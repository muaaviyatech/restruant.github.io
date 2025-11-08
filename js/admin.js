// Check if admin is logged in
if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'login.html';
}

// DOM Elements
const logoutBtn = document.getElementById('logoutBtn');
const bookingsList = document.getElementById('bookingsList');

// Logout Handler
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
});

// Function to display bookings
function displayBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookingsList.innerHTML = '';

    bookings.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.customerName}</td>
            <td>${booking.roomType}</td>
            <td>${booking.checkIn}</td>
            <td>${booking.checkOut}</td>
            <td class="status-${booking.status.toLowerCase()}">${booking.status}</td>
            <td>
                ${booking.status === 'Pending' ? `
                    <button class="action-btn confirm-btn" onclick="updateBooking('${booking.id}', 'Confirmed')">Confirm</button>
                    <button class="action-btn cancel-btn" onclick="updateBooking('${booking.id}', 'Cancelled')">Cancel</button>
                ` : ''}
            </td>
        `;
        bookingsList.appendChild(row);
    });
}

// Function to update booking status
function updateBooking(bookingId, status) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = bookings.map(booking => {
        if (booking.id === bookingId) {
            return { ...booking, status };
        }
        return booking;
    });

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    displayBookings();
}

// Initial load of bookings
displayBookings();

// Check for new bookings every 30 seconds
setInterval(displayBookings, 30000);