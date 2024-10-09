// 1
const availableFlights = [
    { flightNumber: 'AI101', from: 'New York', to: 'London', price: 700, availableSeats: 15 },
    { flightNumber: 'AI102', from: 'London', to: 'Paris', price: 120, availableSeats: 18 },
    { flightNumber: 'AI103', from: 'Kanpur', to: 'Lucknow', price: 400, availableSeats: 10 },
    { flightNumber: 'AI104', from: 'Lucknow', to: 'Delhi', price: 500, availableSeats: 20 },
    { flightNumber: 'AI105', from: 'Delhi', to: 'Mumbai', price: 560, availableSeats: 19 },
];


// 2
const filterFlights = (availableFlights, predicateFuntion) => availableFlights.filter(predicateFuntion);
// console.log(filterFlights(availableFlights, flight => flight.availableSeats > 15));
// console.log(filterFlights(availableFlights, flight => flight.to === 'London'));


// 3
const sortFlights = (availableFlights, comparator) => availableFlights.sort(comparator);
const comparator = (a, b) => a.price - b.price;
sortFlights(availableFlights, comparator);
// console.log(flightsSortedByPrice);



// 4
const calculateTotalRevenue = (availableFlights) => {
    return availableFlights.reduce((acc, item) => acc + (item.price * item.availableSeats), 0);
}
// console.log(calculateTotalRevenue(availableFlights));


// 5
const findFlightById = (availableFlights, flightNumber) => availableFlights.find(item => item.flightNumber === flightNumber);
console.log(findFlightById(availableFlights, 'AI103'));






