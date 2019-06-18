import React, { Component } from 'react';

import { INITIAL_STATE } from './../../store/stops/reducer';
import logo from './../../assets/logo.png';

const { values } = INITIAL_STATE;
const newValues = [
  ...Object.values(values),
  {
    '0': '#00E8F3',
    '100': '#96EA00'
  }
];

const getRandomColor = length =>
  Array.from({ length }).map(() => {
    const colorSet = Object.values(newValues[Math.floor(Math.random() * newValues.length)]);
    return colorSet[Math.floor(Math.random() * colorSet.length)];
  });

class Logo extends Component {
  state = {
    colors: {
      '0': getRandomColor(1)[0],
      '100': getRandomColor(1)[0]
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.updateColor, 1500);
  }

  componentWillUnmount() {
    delete this.interval;
  }

  updateColor = () => {
    const [color1, color2] = getRandomColor(2);

    const newColors = {
      '0': color1,
      '100': color2
    };
    this.setState({
      colors: newColors
    });
  };

  render() {
    // const myDivText = "Gradient CSS";
    // const divStyle = {
    //   fontSize: '30px',
    // };
    return (
    <div>
      <img src={logo} width={250} alt="logo" />
      </div>
    );
  }
}

export default Logo;
