"use strict";
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
const mergeSort = (arr, sortOptions) => {
    if (arr.length <= 1)
        return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left, sortOptions), mergeSort(right, sortOptions), sortOptions);
};
const merge = (left, right, sortOptions) => {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        const compareResult = sortOptions.direction === 'asc'
            ? left[leftIndex][sortOptions.key] <= right[rightIndex][sortOptions.key]
            : left[leftIndex][sortOptions.key] >= right[rightIndex][sortOptions.key];
        if (compareResult) {
            result.push(left[leftIndex]);
            leftIndex++;
        }
        else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};
const renderFlights = (sortOption = '', filterOption = '') => {
    const flightList = document.getElementById("flightList");
    const totalFlightsElement = document.getElementById("totalFlights");
    if (!flightList || !totalFlightsElement)
        return;
    flightList.innerHTML = "";
    let flightsToRender = [...availableFlights];
    if (sortOption) {
        const sortOptions = {
            key: sortOption.includes('price') ? 'price' : 'availableSeats',
            direction: sortOption.includes('Desc') ? 'desc' : 'asc'
        };
        flightsToRender = mergeSort(flightsToRender, sortOptions);
    }
    flightsToRender = flightsToRender.filter(flight => {
        switch (filterOption) {
            case 'below500':
                return flight.price < 500;
            case 'below700':
                return flight.price < 700;
            case 'above700':
                return flight.price > 700;
            default:
                return true;
        }
    });
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
const searchFlightForm = document.getElementById("searchFlightForm");
searchFlightForm === null || searchFlightForm === void 0 ? void 0 : searchFlightForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const fromElement = document.getElementById("from");
    const toElement = document.getElementById("to");
    const resultElement = document.getElementById("searchResult");
    if (fromElement && toElement && resultElement) {
        const result = searchFlight(fromElement.value, toElement.value);
        resultElement.innerText = result;
    }
});
const searchFlight = (from, to) => {
    if (!from || !to)
        return "Error: Invalid departure or destination";
    document.querySelectorAll(".flight-card").forEach((card) => {
        if (card instanceof HTMLElement) {
            card.classList.remove("bg-green-200");
            card.classList.add("bg-gray-200");
        }
    });
    const flight = availableFlights.find((item) => item.from === from && item.to === to);
    if (flight) {
        const flightCard = document.getElementById(`flight-${flight.flightNumber}`);
        if (flightCard) {
            flightCard.classList.remove("bg-gray-200");
            flightCard.classList.add("bg-green-200");
        }
        return `Flight Found: ${flight.flightNumber}`;
    }
    return `No flights available from ${from} to ${to}`;
};
const bookFlightForm = document.getElementById("bookFlightForm");
bookFlightForm === null || bookFlightForm === void 0 ? void 0 : bookFlightForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const flightNumberElement = document.getElementById("flightNumber");
    const resultElement = document.getElementById("bookResult");
    if (flightNumberElement && resultElement) {
        const result = bookFlight(flightNumberElement.value);
        resultElement.innerText = result;
    }
});
const bookFlight = (flightNumber) => {
    const flight = availableFlights.find((item) => item.flightNumber === flightNumber);
    document.querySelectorAll(".flight-card").forEach((card) => {
        if (card instanceof HTMLElement) {
            card.classList.remove("bg-blue-200");
            card.classList.add("bg-gray-200");
        }
    });
    if (flight) {
        const flightCard = document.getElementById(`flight-${flight.flightNumber}`);
        if (flightCard) {
            flightCard.classList.remove("bg-gray-200");
            flightCard.classList.add("bg-blue-200");
        }
        return `Flight No. ${flightNumber} booked successfully!`;
    }
    return "Error: Flight not found";
};
const addFlightForm = document.getElementById("addFlightForm");
addFlightForm === null || addFlightForm === void 0 ? void 0 : addFlightForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const flightNumberElement = document.getElementById("newFlightNumber");
    const fromElement = document.getElementById("fromNew");
    const toElement = document.getElementById("toNew");
    const priceElement = document.getElementById("price");
    const resultElement = document.getElementById("addResult");
    if (flightNumberElement && fromElement && toElement && priceElement && resultElement) {
        const result = addNewFlights(flightNumberElement.value, fromElement.value, toElement.value, priceElement.value);
        resultElement.innerText = result;
    }
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
const sortDropdown = document.getElementById("sortDropdown");
sortDropdown === null || sortDropdown === void 0 ? void 0 : sortDropdown.addEventListener("change", (e) => {
    const target = e.target;
    const filterDropdown = document.getElementById("filterDropdown");
    if (filterDropdown) {
        renderFlights(target.value, filterDropdown.value);
    }
});
const filterDropdown = document.getElementById("filterDropdown");
filterDropdown === null || filterDropdown === void 0 ? void 0 : filterDropdown.addEventListener("change", (e) => {
    const target = e.target;
    const sortDropdown = document.getElementById("sortDropdown");
    if (sortDropdown) {
        renderFlights(sortDropdown.value, target.value);
    }
});
