import React from "react";

const Pet = ({ animal, breed, breedList }) => {
  const filteredData = breedList.filter(
    (el) => el.animal === animal && el.breed === breed
  );

  return (
    <div className="pet-list">
      {filteredData.map((item) => (
        <div className="animal-card" key={item.id}>
          <img
            src={item.images?.[0] || "default-image-url.jpg"}
            alt={`${item.name} the ${item.breed}`}
          />
          <div className="content">
            <h3 className="title">{item.name}</h3>
            <p className="breed">
              {item.breed} - {item.animal}
            </p>
            <p className="location">
              Location: {item.city}, {item.state}
            </p>
            <p className="description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pet;
