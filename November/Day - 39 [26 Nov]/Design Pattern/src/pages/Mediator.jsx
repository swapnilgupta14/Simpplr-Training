import React, { useState } from "react";

class Mediator {
  constructor() {
    this.participants = [];
  }

  register(participant) {
    this.participants.push(participant);
  }

  send(message, sender) {
    this.participants.forEach((participant) => {
      if (participant !== sender) {
        participant.receive(message);
      }
    });
  }
}

class Participant {
  constructor(name, mediator, setMessages) {
    this.name = name;
    this.mediator = mediator;
    this.setMessages = setMessages;
    this.mediator.register(this);
  }

  send(message) {
    this.setMessages((prevMessages) => [
      ...prevMessages,
      `${this.name} sends message: ${message}`,
    ]);
    this.mediator.send(message, this);
  }

  receive(message) {
    this.setMessages((prevMessages) => [
      ...prevMessages,
      `${this.name} received message: ${message}`,
    ]);
  }
}

const MediatorDemo = () => {
  const [messages, setMessages] = useState([]);

  const mediator = new Mediator();

  const A = new Participant("A", mediator, setMessages);
  const B = new Participant("B", mediator, setMessages);
  const C = new Participant("C", mediator, setMessages);

  const handleSendMessage = (sender, message) => {
    sender.send(message);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mediator Pattern</h1>

      <div className="space-y-2 flex gap-4">
        <button
          onClick={() => handleSendMessage(A, "Hello, I am A!")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          A sends message
        </button>
        <button
          onClick={() => handleSendMessage(B, "Hi, I am B!")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          B sends message
        </button>
        <button
          onClick={() => handleSendMessage(C, "Hey, I am C!")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          C sends message
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold">Messages:</h2>
        <div className="space-y-1">
          {messages.map((msg, index) => (
            <p key={index} className="text-sm text-gray-600">
              {msg}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediatorDemo;
