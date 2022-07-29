import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';

const CompareTableContainer = styled.div`
display: block;
width: 100%;
`

export default ({ compareFields, compareItems }) => {
  return <CompareTableContainer>
    <table className="compare-advanced-table">
      <tbody>
        {
          compareFields && 
          compareFields.map(field => {
            return <tr key={ field._key }>
              <th className={ field?.extra_class }>
                { field?.label }

                {
                  field.help_text != '' &&
                  field.enable_help_text == true &&
                  <Tooltip className="__icon-tooltip" content={ field.help_text }>
                    <span className="__icon">
                      <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24"/><g><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 16h-2v-2h2v2zm0-4.14V15h-2v-2c0-.552.448-1 1-1 1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.862-1.278 3.413-3 3.86z"/></g></svg>
                    </span>
                  </Tooltip>
                }
              </th>
              {
                (compareItems.length > 0) && 
                compareItems.map((item, _itemIndex) => {
                  let fieldData = item[field.field_map];
                  return <td className={ fieldData?.extra_class } key={ fieldData._key }>
                    <div className="__entry-cell">
                      <div dangerouslySetInnerHTML={{__html: fieldData._html}}></div>
                    </div>  
                  </td>
                })
              }
            </tr>
          })
        }
      </tbody>
    </table>
  </CompareTableContainer>
}