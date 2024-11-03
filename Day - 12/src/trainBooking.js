"use strict";
const availableTrains = [
    {
        trainName: "Rajdhani Express",
        trainNumber: 12345,
        from: "Lucknow",
        destination: "Delhi",
        classType: "AC",
        availableSeats: 5,
        price: 1200,
    },
    {
        trainName: "Shatabdi Express",
        trainNumber: 23456,
        from: "Delhi",
        destination: "Mumbai",
        classType: "Sleeper",
        availableSeats: 10,
        price: 800,
    },
    {
        trainName: "Duronto Express",
        trainNumber: 34567,
        from: "Kolkata",
        destination: "Mumbai",
        classType: "AC",
        availableSeats: 10,
        price: 1500,
    },
    {
        trainName: "Garib Rath",
        trainNumber: 45678,
        from: "Jaipur",
        destination: "Delhi",
        classType: "Sleeper",
        availableSeats: 15,
        price: 400,
    },
];
const mergeSort2 = (arr, sortOptions) => {
    if (arr.length <= 1)
        return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge2(mergeSort2(left, sortOptions), mergeSort2(right, sortOptions), sortOptions);
};
const merge2 = (left, right, sortOptions) => {
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
const trainList = document.getElementById("trainList");
const searchForm = document.getElementById("searchtrainForm");
const bookForm = document.getElementById("booktrainForm");
const addForm = document.getElementById("addtrainForm");
const sortDropdown1 = document.getElementById("sortDropdown");
const filterDropdown1 = document.getElementById("filterDropdown");
const totalTrainsEl = document.getElementById("totaltrains");
const renderTrains = (trains) => {
    trainList.innerHTML = "";
    totalTrainsEl.innerText = `Total trains: ${trains.length}`;
    trains.forEach((train) => {
        const trainCard = document.createElement("div");
        trainCard.className = "p-4 bg-gray-100 rounded-lg shadow";
        trainCard.innerHTML = `
            <h3 class="text-lg font-semibold">${train.trainName} (${train.trainNumber})</h3>
            <p class="text-gray-700">From: ${train.from} - To: ${train.destination}</p>
            <p class="text-gray-700">Class: ${train.classType}, Seats: ${train.availableSeats}</p>
            <p class="text-gray-700">Price: ₹${train.price}</p>
        `;
        trainList.appendChild(trainCard);
    });
};
renderTrains(availableTrains);
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fromCity = document.getElementById("from").value.toLowerCase();
    const toCity = document.getElementById("to").value.toLowerCase();
    const filteredTrains = availableTrains.filter((train) => train.from.toLowerCase().includes(fromCity) &&
        train.destination.toLowerCase().includes(toCity));
    renderTrains(filteredTrains);
});
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trainNumber = parseInt(document.getElementById("trainNumber").value, 10);
    const trainToBook = availableTrains.find((train) => train.trainNumber === trainNumber);
    const bookResult = document.getElementById("bookResult");
    if (trainToBook && trainToBook.availableSeats > 0) {
        trainToBook.availableSeats--;
        bookResult.innerText = `Successfully booked ${trainToBook.trainName}. Remaining seats: ${trainToBook.availableSeats}`;
    }
    else if (trainToBook) {
        bookResult.innerText = "No available seats for this train.";
    }
    else {
        bookResult.innerText = "Train not found.";
    }
    renderTrains(availableTrains);
});
function generateTrainNumber() {
    return Math.floor(10000 + Math.random() * 90000);
}
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTrain = {
        trainName: document.getElementById("newtrainName").value,
        trainNumber: generateTrainNumber(),
        from: document.getElementById("fromNew").value,
        destination: document.getElementById("toNew").value,
        classType: "General",
        availableSeats: 10,
        price: parseInt(document.getElementById("price").value, 10),
    };
    const trainExists = availableTrains.some((train) => train.trainNumber === newTrain.trainNumber);
    const addResult = document.getElementById("addResult");
    if (trainExists) {
        addResult.innerText = `Train with number ${newTrain.trainNumber} already exists!`;
    }
    else {
        availableTrains.push(newTrain);
        addResult.innerText = `Train ${newTrain.trainName} added successfully!`;
        renderTrains(availableTrains);
    }
    addForm.reset();
});
sortDropdown1.addEventListener("change", (e) => {
    const sortOption = e.target.value;
    let sortedTrains = [...availableTrains];
    const sortOptions = {
        key: sortOption.includes('price') ? 'price' : 'availableSeats',
        direction: sortOption.includes('Desc') ? 'desc' : 'asc'
    };
    sortedTrains = mergeSort2(sortedTrains, sortOptions);
    renderTrains(sortedTrains);
});
filterDropdown1.addEventListener("change", (e) => {
    const filterOption = e.target.value;
    const filteredTrains = availableTrains.filter((train) => {
        if (filterOption === "below500")
            return train.price < 500;
        if (filterOption === "below700")
            return train.price < 700;
        if (filterOption === "above700")
            return train.price > 700;
        return true;
    });
    renderTrains(filteredTrains);
});
