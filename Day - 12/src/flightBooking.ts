"use strict";

interface Flight {
    flightNumber: string;
    from: string;
    to: string;
    price: number;
    availableSeats: number;
}

interface SortOptions {
    key: keyof Pick<Flight, 'price' | 'availableSeats'>;
    direction: 'asc' | 'desc';
}

type FilterOption = 'below500' | 'below700' | 'above700' | '';

let availableFlights: Flight[] = [
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

const mergeSort = (
    arr: Flight[], 
    sortOptions: SortOptions
): Flight[] => {
    if (arr.length <= 1) return arr;

    const mid: number = Math.floor(arr.length / 2);
    const left: Flight[] = arr.slice(0, mid);
    const right: Flight[] = arr.slice(mid);

    return merge(
        mergeSort(left, sortOptions),
        mergeSort(right, sortOptions),
        sortOptions
    );
};

const merge = (
    left: Flight[], 
    right: Flight[], 
    sortOptions: SortOptions
): Flight[] => {
    const result: Flight[] = [];
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

const renderFlights = (sortOption: string = '', filterOption: FilterOption = ''): void => {
    const flightList: HTMLElement | null = document.getElementById("flightList");
    const totalFlightsElement: HTMLElement | null = document.getElementById("totalFlights");
    
    if (!flightList || !totalFlightsElement) return;
    
    flightList.innerHTML = "";

    let flightsToRender: Flight[] = [...availableFlights];

    if (sortOption) {
        const sortOptions: SortOptions = {
            key: sortOption.includes('price') ? 'price' : 'availableSeats',
            direction: sortOption.includes('Desc') ? 'desc' : 'asc'
        };
        flightsToRender = mergeSort(flightsToRender, sortOptions);
    }

    flightsToRender = flightsToRender.filter(flight => {
        switch(filterOption) {
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

    flightsToRender.forEach((flight: Flight) => {
        const flightCard: string = `
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

const searchFlightForm: HTMLElement | null = document.getElementById("searchFlightForm");
searchFlightForm?.addEventListener("submit", function (e: Event) {
    e.preventDefault();
    const fromElement = document.getElementById("from") as HTMLInputElement;
    const toElement = document.getElementById("to") as HTMLInputElement;
    const resultElement = document.getElementById("searchResult");
    
    if (fromElement && toElement && resultElement) {
        const result: string = searchFlight(fromElement.value, toElement.value);
        resultElement.innerText = result;
    }
});

const searchFlight = (from: string, to: string): string => {
    if (!from || !to) return "Error: Invalid departure or destination";

    document.querySelectorAll(".flight-card").forEach((card: Element) => {
        if (card instanceof HTMLElement) {
            card.classList.remove("bg-green-200");
            card.classList.add("bg-gray-200");
        }
    });

    const flight: Flight | undefined = availableFlights.find(
        (item: Flight) => item.from === from && item.to === to
    );

    if (flight) {
        const flightCard: HTMLElement | null = document.getElementById(`flight-${flight.flightNumber}`);
        if (flightCard) {
            flightCard.classList.remove("bg-gray-200");
            flightCard.classList.add("bg-green-200");
        }
        return `Flight Found: ${flight.flightNumber}`;
    }
    return `No flights available from ${from} to ${to}`;
};

const bookFlightForm: HTMLElement | null = document.getElementById("bookFlightForm");
bookFlightForm?.addEventListener("submit", function (e: Event) {
    e.preventDefault();
    const flightNumberElement = document.getElementById("flightNumber") as HTMLInputElement;
    const resultElement = document.getElementById("bookResult");
    
    if (flightNumberElement && resultElement) {
        const result: string = bookFlight(flightNumberElement.value);
        resultElement.innerText = result;
    }
});

const bookFlight = (flightNumber: string): string => {
    const flight: Flight | undefined = availableFlights.find(
        (item: Flight) => item.flightNumber === flightNumber
    );

    document.querySelectorAll(".flight-card").forEach((card: Element) => {
        if (card instanceof HTMLElement) {
            card.classList.remove("bg-blue-200");
            card.classList.add("bg-gray-200");
        }
    });

    if (flight) {
        const flightCard: HTMLElement | null = document.getElementById(`flight-${flight.flightNumber}`);
        if (flightCard) {
            flightCard.classList.remove("bg-gray-200");
            flightCard.classList.add("bg-blue-200");
        }
        return `Flight No. ${flightNumber} booked successfully!`;
    }
    return "Error: Flight not found";
};

const addFlightForm: HTMLElement | null = document.getElementById("addFlightForm");
addFlightForm?.addEventListener("submit", function (e: Event) {
    e.preventDefault();
    const flightNumberElement = document.getElementById("newFlightNumber") as HTMLInputElement;
    const fromElement = document.getElementById("fromNew") as HTMLInputElement;
    const toElement = document.getElementById("toNew") as HTMLInputElement;
    const priceElement = document.getElementById("price") as HTMLInputElement;
    const resultElement = document.getElementById("addResult");
    
    if (flightNumberElement && fromElement && toElement && priceElement && resultElement) {
        const result: string = addNewFlights(
            flightNumberElement.value,
            fromElement.value,
            toElement.value,
            priceElement.value
        );
        resultElement.innerText = result;
    }
});

const addNewFlights = (
    flightNumber: string,
    from: string,
    to: string,
    price: string
): string => {
    if (!flightNumber || !from || !to || !price)
        return "Error: All fields are required";

    if (availableFlights.find((item: Flight) => item.flightNumber === flightNumber)) {
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

const sortDropdown: HTMLElement | null = document.getElementById("sortDropdown");
sortDropdown?.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const filterDropdown = document.getElementById("filterDropdown") as HTMLSelectElement;
    
    if (filterDropdown) {
        renderFlights(target.value, filterDropdown.value as FilterOption);
    }
});

const filterDropdown: HTMLElement | null = document.getElementById("filterDropdown");
filterDropdown?.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const sortDropdown = document.getElementById("sortDropdown") as HTMLSelectElement;
    
    if (sortDropdown) {
        renderFlights(sortDropdown.value, target.value as FilterOption);
    }
});