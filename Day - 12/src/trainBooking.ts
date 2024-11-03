"use strict";

interface Train {
    trainName: string;
    trainNumber: number;
    from: string;
    destination: string;
    classType: string;
    availableSeats: number;
    price: number;
}

// Define sort options interface
interface SortOptions {
    key: keyof Pick<Train, 'price' | 'availableSeats'>;
    direction: 'asc' | 'desc';
}

const availableTrains: Train[] = [
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

const mergeSort2 = (
    arr: Train[], 
    sortOptions: SortOptions
): Train[] => {
    if (arr.length <= 1) return arr;

    const mid: number = Math.floor(arr.length / 2);
    const left: Train[] = arr.slice(0, mid);
    const right: Train[] = arr.slice(mid);

    return merge2(
        mergeSort2(left, sortOptions),
        mergeSort2(right, sortOptions),
        sortOptions
    );
};

const merge2 = (
    left: Train[], 
    right: Train[], 
    sortOptions: SortOptions
): Train[] => {
    const result: Train[] = [];
    let leftIndex: number = 0;
    let rightIndex: number = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        const compareResult = sortOptions.direction === 'asc'
            ? left[leftIndex][sortOptions.key] <= right[rightIndex][sortOptions.key]
            : left[leftIndex][sortOptions.key] >= right[rightIndex][sortOptions.key];

        if (compareResult) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

const trainList = document.getElementById("trainList") as HTMLDivElement;
const searchForm = document.getElementById("searchtrainForm") as HTMLFormElement;
const bookForm = document.getElementById("booktrainForm") as HTMLFormElement;
const addForm = document.getElementById("addtrainForm") as HTMLFormElement;
const sortDropdown1 = document.getElementById("sortDropdown") as HTMLSelectElement;
const filterDropdown1 = document.getElementById("filterDropdown") as HTMLSelectElement;
const totalTrainsEl = document.getElementById("totaltrains") as HTMLDivElement;

const renderTrains = (trains: Train[]): void => {
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

searchForm.addEventListener("submit", (e: Event): void => {
    e.preventDefault();
    const fromCity: string = (document.getElementById("from") as HTMLInputElement).value.toLowerCase();
    const toCity: string = (document.getElementById("to") as HTMLInputElement).value.toLowerCase();

    const filteredTrains: Train[] = availableTrains.filter(
        (train) =>
            train.from.toLowerCase().includes(fromCity) &&
            train.destination.toLowerCase().includes(toCity)
    );

    renderTrains(filteredTrains);
});

bookForm.addEventListener("submit", (e: Event): void => {
    e.preventDefault();
    const trainNumber: number = parseInt(
        (document.getElementById("trainNumber") as HTMLInputElement).value,
        10
    );
    const trainToBook: Train | undefined = availableTrains.find(
        (train) => train.trainNumber === trainNumber
    );

    const bookResult = document.getElementById("bookResult") as HTMLDivElement;
    if (trainToBook && trainToBook.availableSeats > 0) {
        trainToBook.availableSeats--;
        bookResult.innerText = `Successfully booked ${trainToBook.trainName}. Remaining seats: ${trainToBook.availableSeats}`;
    } else if (trainToBook) {
        bookResult.innerText = "No available seats for this train.";
    } else {
        bookResult.innerText = "Train not found.";
    }
    renderTrains(availableTrains);
});

function generateTrainNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
}

addForm.addEventListener("submit", (e: Event): void => {
    e.preventDefault();

    const newTrain: Train = {
        trainName: (document.getElementById("newtrainName") as HTMLInputElement).value,
        trainNumber: generateTrainNumber(),
        from: (document.getElementById("fromNew") as HTMLInputElement).value,
        destination: (document.getElementById("toNew") as HTMLInputElement).value,
        classType: "General",
        availableSeats: 10,
        price: parseInt(
            (document.getElementById("price") as HTMLInputElement).value,
            10
        ),
    };

    const trainExists: boolean = availableTrains.some(
        (train) => train.trainNumber === newTrain.trainNumber
    );
    const addResult = document.getElementById("addResult") as HTMLDivElement;

    if (trainExists) {
        addResult.innerText = `Train with number ${newTrain.trainNumber} already exists!`;
    } else {
        availableTrains.push(newTrain);
        addResult.innerText = `Train ${newTrain.trainName} added successfully!`;
        renderTrains(availableTrains);
    }

    addForm.reset();
});

sortDropdown1.addEventListener("change", (e: Event): void => {
    const sortOption: string = (e.target as HTMLSelectElement).value;
    let sortedTrains: Train[] = [...availableTrains];

    const sortOptions: SortOptions = {
        key: sortOption.includes('price') ? 'price' : 'availableSeats',
        direction: sortOption.includes('Desc') ? 'desc' : 'asc'
    };

    sortedTrains = mergeSort2(sortedTrains, sortOptions);
    renderTrains(sortedTrains);
});

filterDropdown1.addEventListener("change", (e: Event): void => {
    const filterOption: string = (e.target as HTMLSelectElement).value;

    const filteredTrains: Train[] = availableTrains.filter((train) => {
        if (filterOption === "below500") return train.price < 500;
        if (filterOption === "below700") return train.price < 700;
        if (filterOption === "above700") return train.price > 700;
        return true;
    });

    renderTrains(filteredTrains);
});