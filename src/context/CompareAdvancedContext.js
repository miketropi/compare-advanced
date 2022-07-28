import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompareItems } from '../lib/api';

const CompareAdvancedContext = createContext();

const CompareAdvancedProvider = ({ children, compareItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const _getCompareItems = async () => {
      const result = await getCompareItems(compareItems);
      setItems(result);
    }
    _getCompareItems();
  }, [])

  const value = {
    items
  };

  return <CompareAdvancedContext.Provider value={ value }>
    { children }
  </CompareAdvancedContext.Provider>
}

const useCompareAdvanced = () => {
  return useContext(CompareAdvancedContext);
}

export { CompareAdvancedProvider, useCompareAdvanced, CompareAdvancedContext }