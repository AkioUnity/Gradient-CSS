/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AdSense from 'react-adsense';
import ReactGA from 'react-ga';

import {
  editStop,
  updateDraggedStopPos,
  updateUpdatingStop,
  updateActiveColorPicker,
  updateActiveStop,
  deleteActiveStop,
  editStopColor
} from "./store/stops/actions";
import { toggleEditing, updatePage } from "./store/gradients/actions";
import { toggleTrashIcon } from "./store/icons/actions";
import { getGradients } from "./store/gradients/selectors";

import {
  GradientDisplay,
  GradientList,
  Hero
} from "./components/index";
// import { Pagination } from "./containers/index";
import { DashedBar } from "./components/Common/index";
// import AdComponent from './components/Sections/AdComponent'

const Overlay = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const Dashed = DashedBar.extend`
  margin: 0 auto;
  max-width: 1060px;
`;

function handleNoop(e) {
  e.stopPropagation();
  e.preventDefault();
}

class App extends Component {
  state = {
    items: 9
  };

  componentDidMount() {
    document.addEventListener("keydown", this._handleCancelEdits);
    document.addEventListener("mousemove", this._handleDocumentMouseMove);
    document.addEventListener("mouseup", this._handleDocumentMouseUp);

    this.setState({
      items: window.outerWidth <= 970 ? 6 : 9
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleCancelEdits);
    document.removeEventListener("mousemove", this._handleDocumentMouseMove);
    document.removeEventListener("mouseup", this._handleDocumentMouseUp);
  }

  _handleCancelEdits = e => {
    const {
      updateActiveColorPicker,
      toggleEditing,
      editStop,
      updateActiveStop,
      deleteActiveStop,
      pickingColorStop,
      editStopColor,
      gradients,
      updatePage,
      currPage
    } = this.props;
    if (e.type === "click") {
      handleNoop(e);
      updateActiveStop(null);
      editStopColor(null);
      if (pickingColorStop) {
        updateActiveColorPicker(null);
      } else {
        toggleEditing(null);
        editStop(null);
      }
    }
    if (e.type === "keydown") {
      const total = Math.ceil(Object.keys(gradients).length / this.state.items);
      if (e.which === 39) {
        handleNoop(e);
        const newPage = currPage + 1;
        if (newPage <= total) {
          updateActiveStop(null);
          editStopColor(null);
          updateActiveColorPicker(null);
          toggleEditing(null);
          editStop(null);
          updatePage(newPage);
        }
      }

      if (e.which === 37) {
        handleNoop(e);
        const newPage = currPage - 1;
        if (newPage >= 1) {
          updateActiveStop(null);
          editStopColor(null);
          updateActiveColorPicker(null);
          toggleEditing(null);
          editStop(null);
          updatePage(newPage);
        }
      }

      if (e.which === 27) {
        handleNoop(e);
        updateActiveStop(null);
        editStopColor(null);
        if (pickingColorStop) {
          updateActiveColorPicker(null);
        } else {
          toggleEditing(null);
          editStop(null);
        }
      }
      if ((e.which === 46 && e.metaKey) || (e.which === 8 && e.metaKey)) {
        handleNoop(e);
        deleteActiveStop();
      }
    }
  };

  _handleDocumentMouseMove = e => {
    if (this.props.editingStop) {
      if (this.props.editingStop && this.props.updating) {
        const { x } = e;
        this.props.updateDraggedStopPos(x);
      }
    }
  };

  _handleDocumentMouseUp = () => {
    if (this.props.editingStop) {
      if (this.props.editingStop && this.props.updating) {
        this.props.updateUpdatingStop(null);
        this.props.updateDraggedStopPos(null);
      }
      if (this.props.passThreshold && this.props.renderDelete !== null) {
        this.props.toggleTrashIcon(null);
      }
    }
  };

  render() {
    const {
      editingAngle,
      editingStop,
      pickingColorStop,
      gradients: allGradients,
      currPage
    } = this.props;
    const { items } = this.state;
    const editing = editingAngle || editingStop || pickingColorStop;
    const start = (currPage - 1) * items;
    const end = start + items;
    const currGradients = Object.values(allGradients).slice(start, end);
    ReactGA.initialize('UA-128080917-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    return (
        <center>
      <div>
        <Hero />
        <div style={{alignItems: 'center'}}>
          <AdSense.Google
            client='ca-pub-7318699538797156'
            slot='9653487421'
          />
        </div>
        <Dashed />
        <GradientDisplay>
          <GradientList gradients={currGradients} />
          {editing && <Overlay onClick={this._handleCancelEdits} />}
        </GradientDisplay>
        <Dashed />
        {/*<AdSense.Google*/}
          {/*client='ca-pub-7318699538797156'*/}
          {/*slot='9653487421'*/}
          {/*style={{ width: 500, height: 300, float: 'left' }}*/}
          {/*format=''*/}
        {/*/>*/}

        {/*<AdComponent/>*/}
        {/*<Pagination perPage={items} bottom />*/}
      </div>
        </center>
    );
  }
}

export default connect(
  state => ({
    editingAngle: state.gradients.editingAngle.id !== null,
    editingStop: state.stops.editing !== null,
    updating: state.stops.updating.stop !== null,
    pickingColorStop: state.stops.updating.pickingColorStop !== null,
    gradients: getGradients(state),
    renderDelete: state.icons.deleteStop,
    passThreshold: state.stops.updating.passThreshold,
    currPage: state.gradients.page
  }),
  {
    updatePage,
    toggleEditing,
    editStop,
    updateDraggedStopPos,
    updateUpdatingStop,
    updateActiveColorPicker,
    updateActiveStop,
    deleteActiveStop,
    toggleTrashIcon,
    editStopColor
  }
)(App);
