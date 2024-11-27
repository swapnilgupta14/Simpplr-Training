import React from "react";

class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    console.log("observer created")
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach((observer) => observer.update());
  }
}

class Observer {
  update() {
    console.log("Observer notified!");
  }
}

const subject = new Subject();

const observer1 = new Observer();
const observer2 = new Observer();

const ObserverDemo = () => {
  return (
    <div>
      Observer Pattern
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => subject.addObserver(observer1)}
      >
        Add first ObsObserver
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => subject.addObserver(observer2)}
      >
        Add Second Observer
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => subject.notify()}
      >
        Notify
      </button>
    </div>
  );
};

export default ObserverDemo;
