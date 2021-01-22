import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [ albums, setalbums ] = useState(data);
  const [ index, setIndex ] = useState(0);

  //to display last item if negative
  //to reset index to 0 if last item
  useEffect(() => {
    const lastIndex = albums.length - 1;
      if(index < 0) {
        setIndex(lastIndex)
      }
      if(index > lastIndex){
        setIndex(0);
      }
    }, [index, albums]);

  useEffect(() => {
    //we do this so that we can celar the interval
    let slider = setInterval(() => {
      setIndex(index + 1)
    },3000);
    return () => clearInterval(slider)
  }, [index]);

  return (
    <section className="section">
        <div className="title">
          <h2>Album Reviews</h2>
        </div>
        <div className="section-center">
          {albums.map((album, albumIndex) => {
            const {id,image,date,title,description} = album;
            let position = "nextSlide";
            if(albumIndex === index) {
              position = "activeSlide";
            }
            //lastSlide is the last active slide 
            //or the last slide if the current slide is the first one
            if(albumIndex === index - 1 || ( index === 0 && albumIndex === albums.length - 1)) {
              position = "lastSlide"
            }
            return (
              <article key={id} className={position}>
                <img src={image} alt={title} className="album-img" />
                <h4>{title}</h4>
                <p className="date">{date}</p>
                <p className="text">{description}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}
          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </div>
      </section>
  );
}

export default App;
