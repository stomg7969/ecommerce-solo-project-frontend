import React, { Fragment } from "react";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import picture1 from "../Assets/moonya landing picture 1.jpg";
import picture2 from "../Assets/moonya landing picture 2.jpg";
import picture3 from "../Assets/moonya landing picture 3.jpg";
import picture4 from "../Assets/moonya landing picture 4.jpg";
// import logo from "../Assets/moonya crown.png";

const LandingFrontImg = props => {
  return (
    <Fragment>
      <CarouselProvider
        naturalSlideWidth={50}
        naturalSlideHeight={35}
        isPlaying={true}
        totalSlides={4}
      >
        <Slider>
          <Slide index={0}>
            <Image src={picture1} alt="moonya1" />
          </Slide>
          <Slide index={1}>
            <Image src={picture2} alt="moonya2" />
          </Slide>
          <Slide index={2}>
            <Image src={picture3} alt="moonya3" />
          </Slide>
          <Slide index={3}>
            <Image src={picture4} alt="moonya4" />
          </Slide>
        </Slider>
      </CarouselProvider>
    </Fragment>
  );
}

export default LandingFrontImg;
// <img src={landingPicture} alt="moonya" />
