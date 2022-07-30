import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";

const SlideImagesContainer = styled.div`

`;

export default ({ gallery }) => {
  return <SlideImagesContainer>
    { JSON.stringify(gallery) }
  </SlideImagesContainer>
}