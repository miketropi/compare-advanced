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
      root.render(<CompareAdvancedProvider 
        compareItems={ el.dataset.compareItems }
        limitCompareFields={ el.dataset.limitCompareFields } >
        <CompareAdvanced />
      </CompareAdvancedProvider>);
    })
  }

  const ready = () => {
    compareAdvanced();
  }

  $(ready);
})(window, jQuery)