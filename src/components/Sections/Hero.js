import React from "react"
import styled from "styled-components"
import { Logo } from "./../Common/index"

const GradientDisplayContainer = styled.section`
  max-width: 1100px;
  margin: 5px auto;
  padding: 0 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 620px) {
    flex-direction: column;
  }
`

const LogoContainer = styled.h1`
  @media (max-width: 550px) {
    margin-bottom: 10px;
  }
`

const Hero = () => (
  <GradientDisplayContainer>
    <LogoContainer>
      <Logo />
    </LogoContainer>
  </GradientDisplayContainer>
)

export default Hero
