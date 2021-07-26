import React from 'react';
import { Carousel } from 'react-bootstrap';

import image1 from '../../../assets/images/1.jpg';
import image2 from '../../../assets/images/2.jpg';



const HeroSection = () => {
  return (
      <div className='hero-container'>
      <Carousel fade={true} pause={false}>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={image2}
            alt="First slide"
          />
  
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={image1}
            alt="Third slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default HeroSection;