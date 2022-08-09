import React from 'react';
import { createRoot } from 'react-dom/client';
import { CompareAdvancedProvider } from './context/CompareAdvancedContext';
import CompareAdvanced from './components/CompareAdvanced';

/**
 * Script 
 */

;((w, $) => {
  'use strict';

  const compareAdvanced = () => {
    let elems = document.querySelectorAll('.compare-advanced-container');
    if(!elems) return;

    [...elems].forEach(el => {
      const root = createRoot(el);
      const { 
        compareItems, 
        limitCompareFields, 
        rowColorFirst, 
        rowColorSecond,
        buttonColorIde,
        buttonColorTextIde,
        buttonColorHover,
        buttonColorTextHover } = el.dataset;
      
      /**
       * atts => 
        compareItems, 
        limitCompareFields, 
        rowColorFirst, 
        rowColorSecond,
        buttonColorIde,
        buttonColorTextIde,
        buttonColorHover,
        buttonColorTextHover
       */
      const atts = el.dataset;
      root.render(<CompareAdvancedProvider { ...atts } >
        <CompareAdvanced />
      </CompareAdvancedProvider>);
    })
  }

  const ready = () => {
    compareAdvanced();
  }

  $(ready);
})(window, jQuery)