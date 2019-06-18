import React, { Component } from 'react';
import styled from 'styled-components';
import { mix, transparentize } from 'polished';

import { Popover } from './../index';
import { ColorPicker } from './../../containers/index';

// rem
const SLIDER_ITEM_SIZE = 3;

const Item = styled.div`
  height: ${SLIDER_ITEM_SIZE}rem;
  width: ${SLIDER_ITEM_SIZE}rem;
  border-radius: 30%;
  cursor: grab;
  position: absolute;
  right: 0;
  z-index: ${({ active }) => (active ? 999 : 'auto')};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  height: ${SLIDER_ITEM_SIZE}rem;
  width: ${SLIDER_ITEM_SIZE}rem;
  bottom: 10px;
`;

class SwatchItem extends Component {
  state = {
    hovered: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.color !== nextProps.color ||
      this.props.left !== nextProps.left ||
      this.props.style !== nextProps.style ||
      this.props.isUpdating !== nextProps.isUpdating ||
      this.props.pickingColorStop !== nextProps.pickingColorStop ||
      this.props.editing !== nextProps.editing ||
      this.props.stop !== nextProps.stop ||
      this.props.active !== nextProps.active ||
      this.props.sorting !== nextProps.sorting ||
      this.state.hovered !== nextState.hovered
    );
  }

  handleMouseEnter = () => {
    this.setState({
      hovered: true
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hovered: false
    });
  };

  render() {
    const {
      color,
      left,
      style,
      isUpdating,
      pickingColorStop,
      editing,
      editingColor,
      stop,
      id,
      active,
      sorting,
      ...props
    } = this.props;
    const { hovered } = this.state;
    const isPickingColor = pickingColorStop === stop;
    const shouldRenderColorPicker = isPickingColor && editingColor === id;
    const popover = !shouldRenderColorPicker && !sorting;
    const shouldRenderPopoverColor = popover && !editing;
    const shouldRenderPopoverStop = popover && editing;
    const mixed = mix(0.5, color, '#AFAFAF');
    const popoverShadow = transparentize(0.4, mix(0.2, color, '#AFAFAF'));
    const mixedTransparentized = transparentize(0.2, mix(0.5, color, '#AFAFAF'));
    const right = `calc(${100 - left}% - ${SLIDER_ITEM_SIZE / 2}rem)`;

    return (
      <Container
        style={{
          right
        }}
      >
        {shouldRenderColorPicker && <ColorPicker color={color} stop={stop} id={id} left={left} />}
        {shouldRenderPopoverStop && <Popover value={`${stop}%`} shadow={popoverShadow} hovered={hovered} />}
        {shouldRenderPopoverColor &&
          <Popover value={color} isPickingColor={isPickingColor} shadow={popoverShadow} hovered={hovered} />}
        <Item
          title="Edit stop"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          mixedTransparentized={mixedTransparentized}
          value={color}
          style={{
            ...style,
            border: `2px solid ${mixed}`,
            backgroundColor: color
          }}
          active={active === stop && editing}
          {...props}
        />
      </Container>
    );
  }
}

export default SwatchItem;
