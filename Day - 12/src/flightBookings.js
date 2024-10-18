"use-strict"

let availableFlights = [
  {
    flightNumber: "AI101",
    from: "New York",
    to: "London",
    price: 700,
    availableSeats: 15,
  },
  {
    flightNumber: "AI102",
    from: "London",
    to: "Paris",
    price: 120,
    availableSeats: 18,
  },
  {
    flightNumber: "AI103",
    from: "Kanpur",
    to: "Lucknow",
    price: 400,
    availableSeats: 10,
  },
  {
    flightNumber: "AI104",
    from: "Lucknow",
    to: "Delhi",
    price: 500,
    availableSeats: 20,
  },
  {
    flightNumber: "AI105",
    from: "Delhi",
    to: "Mumbai",
    price: 560,
    availableSeats: 19,
  },
];

const renderFlights = (sortOption = '', filterOption = '') => {
    const flightList = document.getElementById("flightList");
    const totalFlightsElement = document.getElementById("totalFlights");
    flightList.innerHTML = "";
  
    let flightsToRender = [...availableFlights];
  
    if (sortOption === "priceAsc") {
      flightsToRender.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      flightsToRender.sort((a, b) => b.price - a.price);
    } else if (sortOption === "seatsAsc") {
      flightsToRender.sort((a, b) => a.availableSeats - b.availableSeats);
    } else if (sortOption === "seatsDesc") {
      flightsToRender.sort((a, b) => b.availableSeats - a.availableSeats);
    }
  
    if (filterOption === "below500") {
      flightsToRender = flightsToRender.filter(flight => flight.price < 500);
    } else if (filterOption === "below700") {
      flightsToRender = flightsToRender.filter(flight => flight.price < 700);
    } else if (filterOption === "above700") {
      flightsToRender = flightsToRender.filter(flight => flight.price > 700);
    }
  
    totalFlightsElement.innerText = `Total Flights: ${flightsToRender.length}`;
  
    flightsToRender.forEach((flight) => {
      const flightCard = `
          <div id="flight-${flight.flightNumber}" class="flight-card p-4 bg-gray-200 shadow-md rounded-lg">
              <h3 class="text-lg font-bold mb-2">${flight.flightNumber}</h3>
              <p>From: ${flight.from} To: ${flight.to}</p>
              <p>Price: Rs${flight.price}</p>
              <p>Available Seats: ${flight.availableSeats}</p>
          </div>
      `;
      flightList.innerHTML += flightCard;
    });
  };

renderFlights();

document
  .getElementById("searchFlightForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const result = searchFlight(from, to);
    document.getElementById("searchResult").innerText = result;
  });

const searchFlight = (from, to) => {
  if (!from || !to) return "Error: Invalid departure or destination";
  document.querySelectorAll(".flight-card").forEach((card) => {
    card.classList.remove("bg-green-200");
    card.classList.add("bg-gray-200");
  });

  const flight = availableFlights.find(
    (item) => item.from === from && item.to === to
  );

  if (flight) {
    const flightCard = document.getElementById(`flight-${flight.flightNumber}`);
    if (flightCard) {
      flightCard.classList.remove("bg-gray-200");
      flightCard.classList.add("bg-green-200");
    }
    return `Flight Found: ${flight.flightNumber}`;
  } else {
    return `No flights available from ${from} to ${to}`;
  }
};

document
  .getElementById("bookFlightForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const flightNumber = document.getElementById("flightNumber").value;
    const result = bookFlight(flightNumber);
    document.getElementById("bookResult").innerText = result;
  });

const bookFlight = (flightNumber) => {
  const flight = availableFlights.find(
    (item) => item.flightNumber === flightNumber
  );

  document.querySelectorAll(".flight-card").forEach((card) => {
    card.classList.remove("bg-blue-200");
    card.classList.add("bg-gray-200");
  });

  if (flight) {
    const flightCard = document.getElementById(`flight-${flight.flightNumber}`);
    if (flightCard) {
      flightCard.classList.remove("bg-gray-200");
      flightCard.classList.add("bg-blue-200");
    }
    return `Flight No. ${flightNumber} booked successfully!`;
  } else {
    return "Error: Flight not found";
  }
};

document
  .getElementById("addFlightForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const flightNumber = document.getElementById("newFlightNumber").value;
    const from = document.getElementById("fromNew").value;
    const to = document.getElementById("toNew").value;
    const price = document.getElementById("price").value;
    const result = addNewFlights(flightNumber, from, to, price);
    document.getElementById("addResult").innerText = result;
  });

const addNewFlights = (flightNumber, from, to, price) => {
  if (!flightNumber || !from || !to || !price)
    return "Error: All fields are required";

  if (availableFlights.find((item) => item.flightNumber === flightNumber)) {
    return "Flight is already there";
  }

  availableFlights.push({
    flightNumber,
    from,
    to,
    price: parseFloat(price),
    availableSeats: 20,
  });
  renderFlights();
  return `New flight ${flightNumber} added successfully!`;
};

document.getElementById("sortDropdown").addEventListener("change", (e) => {
  const sortOption = e.target.value;
  const filterOption = document.getElementById("filterDropdown").value;
  renderFlights(sortOption, filterOption);
});

document.getElementById("filterDropdown").addEventListener("change", (e) => {
  const filterOption = e.target.value;
  const sortOption = document.getElementById("sortDropdown").value;
  renderFlights(sortOption, filterOption);
});
