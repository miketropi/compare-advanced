import React from 'react';
import { useCompareAdvanced } from '../context/CompareAdvancedContext';
import styled from 'styled-components';
import CompareTable from './CompareTable';

const CompareAdvancedContainer = styled.div``;

export default () => {
  const { items, compareFields } = useCompareAdvanced();

  return <div className="compare-advanced-element">
    <CompareAdvancedContainer>
      <CompareTable compareFields={ compareFields } compareItems={ items } />
    </CompareAdvancedContainer>
  </div>
}