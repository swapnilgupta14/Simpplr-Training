import React from "react";

const data = [
  {
    id: 1,
    title: "Efficient Layout with Tailwind CSS 11",
    description:
      "This layout ensures a consistent and reusable structure for displaying content across different components.",
  },
  {
    id: 2,
    title: "Efficient Layout with Tailwind CSS 33",
    description:
      "This layout ensures a consistent and reusable structure for displaying content across different components.",
  },
  {
    id: 3,
    title: "Reusable Container Component",
    description:
      "This layout ensures a consistent and reusable structure for displaying content across different components.",
  },
];

const Container = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-fit m-4 bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-md border">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="h-[100vh] w-full">
      <Container>
        {data.map((item) => (
          <Container key={item.id}>
            <h1 className="text-3xl font-semibold text-center text-gray-800">
              {item.title}
            </h1>
            <p className="text-lg text-gray-600 mt-4 text-center">
              {item.description}
            </p>
          </Container>
        ))}
      </Container>
    </div>
  );
};

export default App;
