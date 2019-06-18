import React, { Component } from 'react'
import { Animate } from 'react-move'

class AnglePrev extends Component {
  shouldComponentUpdate (nextProps) {
    return (
      this.props.angle !== nextProps.angle ||
      this.props.hovered !== nextProps.hovered ||
      this.props.editingAngle !== nextProps.editingAngle
    )
  }

  render () {
    const { angle, color, hovered, animationDuration } = this.props

    return (
      <Animate
        duration={animationDuration}
        data={{
          activeOpacity: hovered ? 1 : 0,
          inactiveOpacity: hovered ? 0 : 1
        }}
      >
        {data =>
          <svg width='40' height='40' viewBox='0 0 20 20'>
            <path
              d='M10 20C4.47715 20 0 15.52285 0 10S4.47715 0 10 0s10 4.47715 10 10-4.47715 10-10 10zm1-18H9v7h2V2z'
              fillRule='nonzero'
              fill={color}
              fillOpacity={data.activeOpacity}
              transform={`rotate(${angle} 10 10)`}
            />
            <path
              d='M9 2.0619C5.0537 2.554 2 5.92037 2 10c0 4.41828 3.58172 8 8 8s8-3.58172 8-8c0-4.07962-3.0537-7.446-7-7.9381V9H9V2.0619zM10 20C4.47715 20 0 15.52285 0 10S4.47715 0 10 0s10 4.47715 10 10-4.47715 10-10 10z'
              fillRule='nonzero'
              fill={color}
              fillOpacity={data.inactiveOpacity}
              transform={`rotate(${angle} 10 10)`}
            />
          </svg>}
      </Animate>
    )
  }
}

export default AnglePrev
