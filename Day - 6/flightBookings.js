let availableFlights = [
    { flightNumber: 'AI101', from: 'New York', to: 'London', price: 700 },
    { flightNumber: 'AI102', from: 'London', to: 'Paris', price: 120 },
    { flightNumber: 'AI103', from: 'Kanpur', to: 'Lucknow', price: 400 },
    { flightNumber: 'AI104', from: 'Lucknow', to: 'Delhi', price: 500 },
    { flightNumber: 'AI105', from: 'Delhi', to: 'Mumbai', price: 560 },
];

const searchFlight = (from, to) => {
    if(!from || !to) return 'Error: Invalid departure or destination';
    const searchresult = availableFlights.filter( (item) => item.from === from && item.to === to).map(item => item.flightNumber);
    return searchresult.length > 0 ? searchresult[0] : `No flights available from ${from} to ${to}`
}
// console.log(searchFlight('Kanpur', 'Lucknow'));



const bookFlight = (flightNumber) => {
    if(!flightNumber) return 'Error: Enter Flight Number';
    const flight = availableFlights.find((item) => item.flightNumber === flightNumber);
    return flight ? `Flight No. ${flightNumber} booked` : 'Error: Flight not found';
}

// console.log(availableFlights);
// console.log(bookFlight('AI105'));
// console.log(bookFlight('AI999'));



// IIFE
const bookFlightIIFE = (function(flightNumber) {
    if (!flightNumber) return 'Error: Enter Flight Number';
    return availableFlights.find((item) => item.flightNumber === flightNumber) ? `Flight No. ${flightNumber} booked`: 'Error: Flight Not Found';
})('AI105');
// console.log(bookFlightIIFE);



const searchAndBookFlight = (function(from, to) {
    return bookFlight(searchFlight(from, to));
})('Delhi', 'Mumbai');
// console.log(searchAndBookFlight);



const addNewFlights = (flightNumber, from, to, price) => {
    if(!flightNumber || !from || !to || !price) return 'Error: Incomplete Data';
    if(availableFlights.find(item => item.flightNumber === flightNumber)){
        return `Error: Flight with ${flightNumber} already exists`;
    }
    const newFlight = {
        flightNumber: flightNumber,
        from: from,
        to: to,
        price: price
    }
    availableFlights = [...availableFlights, newFlight];
    return availableFlights; 
}
// console.log(availableFlights);
// console.log(addNewFlights('AI106', 'Jaipur', 'Agra', 178));



const removeFlight = (flightNumber) => {
    if(!flightNumber) return 'Invalid flight number';
    // availableFlights = availableFlights.filter(flight => flight.flightNumber !== flightNumber);
    // console.log(`Flight ${flightNumber} removed!`);
    const index = availableFlights.findIndex(flight => flight.flightNumber === flightNumber);
    if (index !== -1) {
        availableFlights.splice(index, 1);
        console.log(`Flight ${flightNumber} removed!`);
    } else {
        console.log(`Flight ${flightNumber} not found!`);
    }
    return availableFlights;
}
// console.log(removeFlight('AI102'));




// BONUS TASKS -- 
const sortFlightsByPrice = () => {
    return availableFlights.sort((a, b) => a.price - b.price);
}
// console.log(sortFlightsByPrice());

const filterFlightsByPrice = (maxPrice) => {
    return availableFlights.filter(flight => flight.price <= maxPrice);
}
// console.log(filterFlightsByPrice());