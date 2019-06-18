import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`transform: rotate(-45deg);`;

const AnglePrev = props =>
  <Svg {...props} width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M.6295 15.40916l14.84925-4.94974-9.8995-9.8995" fill="#FFF" fillRule="evenodd" />
  </Svg>;

export default AnglePrev;
