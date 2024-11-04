interface Flight {
    flightNumber: string;
    from: string;
    to: string;
    price: number;
}

let availableFlights: Flight[] = [
    { flightNumber: 'AI101', from: 'New York', to: 'London', price: 700 },
    { flightNumber: 'AI102', from: 'London', to: 'Paris', price: 120 },
    { flightNumber: 'AI103', from: 'Kanpur', to: 'Lucknow', price: 400 },
    { flightNumber: 'AI104', from: 'Lucknow', to: 'Delhi', price: 500 },
    { flightNumber: 'AI105', from: 'Delhi', to: 'Mumbai', price: 560 },
];

const searchFlight = (from: string, to: string): string => {
    if (!from || !to) return 'Error: Invalid departure or destination';
    const searchResult: string[] = availableFlights
        .filter((item: Flight) => item.from === from && item.to === to)
        .map((item: Flight) => item.flightNumber);

    return searchResult.length > 0 
        ? searchResult[0] 
        : `No flights available from ${from} to ${to}`;
};

const bookFlight = (flightNumber: string): string => {
    if (!flightNumber) return 'Error: Enter Flight Number';

    const flight: Flight | undefined = availableFlights.find(
        (item: Flight) => item.flightNumber === flightNumber
    );

    return flight 
        ? `Flight No. ${flightNumber} booked` 
        : 'Error: Flight not found';
};

const bookFlightIIFE = (function (flightNumber: string): string {
    if (!flightNumber) return 'Error: Enter Flight Number';

    return availableFlights.find((item: Flight) => item.flightNumber === flightNumber) 
        ? `Flight No. ${flightNumber} booked` 
        : 'Error: Flight Not Found';
})('AI105');

const searchAndBookFlight = (function (from: string, to: string): string {
    return bookFlight(searchFlight(from, to));
})('Delhi', 'Mumbai');

const addNewFlights = (flightNumber: string, from: string, to: string, price: number): string | Flight[] => {
    if (!flightNumber || !from || !to || !price) return 'Error: Incomplete Data';
    const flightExists: boolean = availableFlights.some((item: Flight) => item.flightNumber === flightNumber);
    if (flightExists) {
        return `Error: Flight with ${flightNumber} already exists`;
    }
    const newFlight: Flight = { flightNumber, from, to, price };
    availableFlights = [...availableFlights, newFlight];
    return availableFlights;
};

const removeFlight = (flightNumber: string): string | Flight[] => {
    if (!flightNumber) return 'Invalid flight number';
    const index: number = availableFlights.findIndex(
        (flight: Flight) => flight.flightNumber === flightNumber
    );
    if (index !== -1) {
        availableFlights.splice(index, 1);
        return `Flight ${flightNumber} removed!`;
    } else {
        return `Flight ${flightNumber} not found!`;
    }
};

const sortFlightsByPrice = (): Flight[] => {
    return availableFlights.sort((a: Flight, b: Flight) => a.price - b.price);
};

const filterFlightsByPrice = (maxPrice: number): Flight[] => {
    return availableFlights.filter((flight: Flight) => flight.price <= maxPrice);
};
