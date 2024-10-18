const bookingDropdown = document.getElementById('bookingDropdown');
  bookingDropdown.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'flight') {
      console.log('Flight Booking System selected');
    } else if (selectedValue === 'train') {
      console.log('Train Booking System selected');
    }
  });