interface BookingInterface {
    trainName: string;
    destination: string;
    classType: string;
    availableSeats: number;
}

const bookings1: BookingInterface[] = [
    { trainName: "Rajdhani Express", destination: "Delhi", classType: "AC", availableSeats: 5 },
    { trainName: "Shatabdi Express", destination: "Mumbai", classType: "Sleeper", availableSeats: 0 },
    { trainName: "Duronto Express", destination: "Kolkata", classType: "AC", availableSeats: 10 },
    { trainName: "Garib Rath", destination: "Delhi", classType: "Sleeper", availableSeats: 15 },
];

const filterbookings1 = (bookings1: BookingInterface[], filterCriteria: (BookingInterface: BookingInterface) => boolean): BookingInterface[] => {
    return bookings1.filter(filterCriteria);
};

const filterCriteriaUsingDestination1 = (BookingInterface: BookingInterface): boolean => {
    return BookingInterface.destination === 'Kolkata';
};

const filterCriteriaUsingClassType1 = (BookingInterface: BookingInterface): boolean => {
    return BookingInterface.classType === 'AC';
};

const filterCriteriaUsingAvailableSeats1 = (BookingInterface: BookingInterface): boolean => {
    return BookingInterface.availableSeats > 0;
};

const getAllTheTrainNames1 = (bookings1: BookingInterface[]): string[] => {
    return bookings1.map((BookingInterface: BookingInterface) => BookingInterface.trainName);
};

const totalAvailableSeats1 = (bookings1: BookingInterface[]): number => {
    return bookings1.reduce((acc: number, BookingInterface: BookingInterface) => acc + BookingInterface.availableSeats, 0);
};

const getTuplesBasedOnAvailableSeats1 = (bookings1: BookingInterface[]): [string, number][] => {
    return bookings1
        .map((BookingInterface: BookingInterface): [string, number] => [BookingInterface.trainName, BookingInterface.availableSeats])
        .filter((tuple: [string, number]) => tuple[1] >= 10);
};

const filteredTupleBasedOnAvailableTuples1 = (
    getTuplesBasedOnAvailableSeats: (bookings1: BookingInterface[]) => [string, number][],
    bookings1: BookingInterface[]
): BookingInterface[] => {
    const input: [string, number][] = getTuplesBasedOnAvailableSeats(bookings1);
    const result: BookingInterface[] = [];
    input.forEach((each: [string, number]) =>
        bookings1.forEach((item: BookingInterface) => {
            if (item.availableSeats === each[1]) result.push(item);
        })
    );
    return result;
};

console.log(filteredTupleBasedOnAvailableTuples1(getTuplesBasedOnAvailableSeats1, bookings1));
