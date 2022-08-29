import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompareItems } from '../lib/api';
import find from 'lodash/find';

const CompareAdvancedContext = createContext();

const CompareAdvancedProvider = ({ 
  children, 
  compareItems, 
  limitCompareFields, 
  rowColorFirst, 
  rowColorSecond,
  buttonColorIde,
  buttonColorTextIde,
  buttonColorHover,
  buttonColorTextHover }) => {
  const [items, setItems] = useState([]);
  const [cellWidth, setCellWidth] = useState(200);
  const [compareFields, setCompareFields] = useState([]);

  const _setCellWidthHandle = () => {
    if(window.innerWidth <= 450) {
      setCellWidth(window.innerWidth / 3)
    } else if(window.innerWidth <= 768) {
      setCellWidth(150)
    } else {
      setCellWidth(200) 
    }
  }

  useEffect(() => {
    const _getCompareItems = async () => {
      const { success, compare_items, compare_fields } = await getCompareItems(compareItems, limitCompareFields);

      if(true == success) {
        setItems(compare_items);
        setCompareFields(compare_fields);
      }
      
    }
    _getCompareItems();
    
    window.addEventListener('resize', _setCellWidthHandle);
    _setCellWidthHandle();
  }, [])

  const updatePinFunc = (pin, key) => {
    let _items = [...items];  
    let item = find(_items, o => o.__config._key == key);
    item.__config.pin = pin;
    setItems(_items);
  }

  const removeCompareItem = (index) => {
    let _items = [...items];  
    _items.splice(index, 1);
    setItems(_items);
  }

  const value = {
    /**
     * Colors
     */
    rowColorFirst, 
    rowColorSecond,
    buttonColorIde,
    buttonColorTextIde,
    buttonColorHover,
    buttonColorTextHover,

    items,
    compareFields,
    cellWidth,
    updatePinFunc,
    removeCompareItem
  };

  return <CompareAdvancedContext.Provider value={ value }>
    { children }
  </CompareAdvancedContext.Provider>
}

const useCompareAdvanced = () => {
  return useContext(CompareAdvancedContext);
}

export { CompareAdvancedProvider, useCompareAdvanced, CompareAdvancedContext }