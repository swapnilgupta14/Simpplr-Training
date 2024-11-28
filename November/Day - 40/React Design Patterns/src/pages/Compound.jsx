import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext();

function Popup({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <PopupContext.Provider value={{ onClose }}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded p-4 max-w-sm w-full">{children}</div>
      </div>
    </PopupContext.Provider>
  );
}

Popup.Header = function PopupHeader({ children }) {
  return <div className="text-lg font-bold mb-2">{children}</div>;
};

Popup.Body = function PopupBody({ children }) {
  return <div className="mb-4">{children}</div>;
};

Popup.Footer = function PopupFooter({ children }) {
  const { onClose } = useContext(PopupContext);

  return (
    <div className="flex justify-end space-x-2">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Close
      </button>
      {children}
    </div>
  );
};

export default function Compound() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Compound Pattern Demo</h2>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Popup
      </button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Popup.Header>Popup Title</Popup.Header>
        <Popup.Body>
          <p>This is the body of the Popup.</p>
        </Popup.Body>
        <Popup.Footer>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Confirm
          </button>
        </Popup.Footer>
      </Popup>
    </div>
  );
}
