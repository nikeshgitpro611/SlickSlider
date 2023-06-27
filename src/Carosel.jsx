import React, { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/Fa";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/Fi";

const Carosel = () => {
  const [people, setPeople] = useState(list);
  const [currentPerson, setCurrentperson] = useState(0);

  const prevSlider = () => {
    setCurrentperson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length;
      console.log("result :", result);
      return result;
    });
  };
  const nextSlider = () => {
    setCurrentperson((oldPerson) => {
      const result = (oldPerson + 1) % people.length;
      console.log("result :", result);
      return result;
    });
  };

  useEffect(() => {
    const sliderId = setInterval(() => {
      nextSlider();
    }, 2000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);
  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        // console.log('pel : ', pepl);
        const { id, title, quote, image, name } = person;
        return (
          <article
            className="slider"
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? "visible" : "hidden",
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <div className="prev" type="button" onClick={prevSlider}>
        <FiChevronsLeft />
      </div>
      <div className="next" type="button" onClick={nextSlider}>
        <FiChevronsRight />
      </div>
    </section>
  );
};

export default Carosel;
