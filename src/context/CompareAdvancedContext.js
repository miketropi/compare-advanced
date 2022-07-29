import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompareItems } from '../lib/api';

const CompareAdvancedContext = createContext();

const CompareAdvancedProvider = ({ children, compareItems }) => {
  const [items, setItems] = useState([]);
  const [compareFields, setCompareFields] = useState([]);

  useEffect(() => {
    const _getCompareItems = async () => {
      const { success, compare_items, compare_fields } = await getCompareItems(compareItems);

      if(true == success) {
        setItems(compare_items);
        setCompareFields(compare_fields);
      }
      
    }
    _getCompareItems();
  }, [])

  const value = {
    items,
    compareFields
  };

  return <CompareAdvancedContext.Provider value={ value }>
    { children }
  </CompareAdvancedContext.Provider>
}

const useCompareAdvanced = () => {
  return useContext(CompareAdvancedContext);
}

export { CompareAdvancedProvider, useCompareAdvanced, CompareAdvancedContext }