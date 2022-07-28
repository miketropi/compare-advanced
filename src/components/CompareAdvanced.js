import React from 'react';
import { useCompareAdvanced } from '../context/CompareAdvancedContext';
import styled from 'styled-components';

const CompareAdvancedContainer = styled.div``;

export default () => {
  const { items } = useCompareAdvanced();

  return <div className="compare-advanced-element">
    <CompareAdvancedContainer>
      { JSON.stringify(items) }
    </CompareAdvancedContainer>
  </div>
}