
import React from 'react';
import styled from 'styled-components';
import { Animate } from 'react-move';

import { Button } from './../Common/index';
import { Copy } from './../Icons/index';

import { generateLinearGradient } from './../../utils/gradient';

const COPY_RESET_ANIMATION_DURATION = 100;

const Container = styled.div`
  position: relative;
  height: 150px;
  width: 100%;
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
`;

const CssContainerDiv = styled.div`
  position: relative;  
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 10px;
  background:linear-gradient(356deg, rgba(11,71,111,1) 0%, rgba(4,23,36,1) 100%);
`;

const GradientButton = Button.extend`
  z-index: 30;
  position: absolute;
  padding: 3px;
  border-radius: 3px;
  display: flex;
`;

const ButtonText = styled.span`
  color: white;
  font-size: 1.9rem;
  ${({ left }) => (left ? 'padding-left: 5px;' : 'padding-right: 5px;')} text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);  
  padding-top: 6px;
`;

const CssText = styled.div`
  color: #ffffff;
  font-size: 1.9rem;
  text-shadow: 0 4px 5px rgba(30, 10, 0, 0.3);  
  padding-top: 55px;
  text-align: center;
`;

const ButtonTextContainer = ({ left = false, text }) =>
  <Animate
    duration={COPY_RESET_ANIMATION_DURATION}
  >
    {data =>
      <ButtonText
        left={left}
        style={{
          opacity: data.opacity
        }}
      >
        {text}
      </ButtonText>}
  </Animate>;

const CssContainer = ({
  id,
  actualAngle,
  onMouseEnter,
  onMouseLeave,
  stopData,
  copiedId,
  onCopyCSS,
  copyHovered
}) => {
  const css_text = generateLinearGradient(actualAngle, stopData);
  const copy_text = copiedId === id ? 'copied' : 'copy css';
  return (
    <Container>
      <div
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <CssContainerDiv>
          <GradientButton
            style={{
              top: 15,
              left: 15
            }}
            title="Copy CSS"
            onClick={() => {
              onCopyCSS(actualAngle, stopData, id);
            }}
            onMouseEnter={e => onMouseEnter(e, ['main', 'copy'])}
            onMouseLeave={e => onMouseLeave(e, ['main', 'copy'])}
          >
            <Copy color={'white'} hovered={copyHovered} animationDuration={COPY_RESET_ANIMATION_DURATION} />
            <ButtonTextContainer text={ copy_text } />
          </GradientButton>
          <CssText>
            { css_text }
          </CssText>
        </CssContainerDiv>
      </div>
    </Container>
  );
};

export default CssContainer;
