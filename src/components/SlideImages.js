import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";

const SlideImagesContainer = styled.div`

  .slick-slide {
    
    img {

    }
  }

  .__slide-item {
    display: flex !important;
    justify-content: center;
    align-items: center;

    img {
      border-radius: 2px;
    }
  }

  .slick-dots {
    display: flex !important;
    justify-content: center;
    align-items: center;
    margin-top: 1em;

    > li {
      margin: 4px; 
      line-height: 0;

      button {
        font-size: 0;
        padding: 0;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background: #D9D9D9;
      }

      &.slick-active {

        button {
          background: #201E1F;
        }
      }
    }
  }
`;

export default ({ gallery, settings }) => {
  let _settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...settings
  };

  return <SlideImagesContainer>
    <Slider {..._settings}>
      {
        gallery.length > 0 && 
        gallery.map(item => {
          return <div key={ item.ID } className="__slide-item">
            <img src={ item.url } alt={ item.alt } />
          </div>
        })
      }
    </Slider>
  </SlideImagesContainer>
}