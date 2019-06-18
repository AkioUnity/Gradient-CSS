import React from 'react';
import { connect } from 'react-redux';

import { togglePrefixes, toggleFallback } from './../../store/settings/actions';

import { TextSM } from './../../components/Common/Typography';
import { Checkbox } from './../../components/Common/index';
import { ActionGroupItem, ActionGroupItemContainer } from './../../components/index';
import { GradientDisplayContainer } from './../../components/Sections/GradientDisplay';

const Container = GradientDisplayContainer.extend`
  margin: 0 auto 30px;
  padding: 0 20px;
  max-width: 1100px;
  display: flex;
  justify-content: space-between;

  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

const ActionsGroup = ({ prefixes, fallback, togglePrefixes, toggleFallback }) =>
  <Container>
    <ActionGroupItemContainer>
      <ActionGroupItem
        checked={prefixes}
        style={{
          cursor: 'pointer'
        }}
        onClick={togglePrefixes}
        itemStyle={{
          marginTop: 2
        }}
      >
        <TextSM htmlFor="prefix">Prefixes</TextSM>
        <Checkbox checked={prefixes} />
      </ActionGroupItem>

      <ActionGroupItem
        checked={fallback}
        style={{
          cursor: 'pointer'
        }}
        onClick={toggleFallback}
        itemStyle={{
          marginTop: 2
        }}
      >
        <TextSM>Fallback BGC</TextSM>
        <Checkbox checked={fallback} />
      </ActionGroupItem>
    </ActionGroupItemContainer>
  </Container>;

export default connect(
  state => ({
    prefixes: state.settings.prefixes,
    fallback: state.settings.fallback
  }),
  {
    togglePrefixes,
    toggleFallback
  }
)(ActionsGroup);
