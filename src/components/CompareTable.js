import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';
import SlideImages from './SlideImages';

const CompareTableContainer = styled.div`
display: block;
width: 100%;
overflow: auto;
margin-bottom: 3em;

.compare-advanced-table {
  max-width: initial;
  margin-bottom: 0;
  overflow-x: initial !important;

  tr {

    th.__col-heading {
      position: sticky;
      left: 0;
      z-index: 9;
    }
  }
}
`

export default ({ compareFields, compareItems }) => {
  return <CompareTableContainer>
    <table className="compare-advanced-table" style={{ width: `${ (compareItems.length + 1) * 200 }px` }}>
      <tbody>
        {
          compareFields && 
          compareFields.map(field => {
            return <tr key={ field._key }>
              <th className={ ['__col-heading', field?.extra_class].join(' ') } width="200px">
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
                  if(item._pin == true) return false; 
                  
                  let fieldData = item[field.field_map];
                  const type = fieldData.extra_params?.type;
                  let contentInner = '';

                  if(type == 'gallery') {
                    // const Test = <div>Hello this is component...!</div>
                    const gallery = fieldData.extra_params?.value;
                    contentInner = <Tooltip 
                      eventActive={ 'click' } 
                      content={ <SlideImages gallery={ gallery } /> }>
                      <div dangerouslySetInnerHTML={{__html: fieldData._html}}></div>
                    </Tooltip>;
                  } else {
                    contentInner = <div dangerouslySetInnerHTML={{__html: fieldData._html}}></div>;
                  }

                  return <td className={ fieldData?.extra_class } key={ fieldData._key } width="200px">
                    <div className="__entry-cell">
                      {
                        fieldData._name == 'infomation' &&
                        <div className="actions">
                          <button className="ca-button">PIN</button>
                          <button className="ca-button">REMOVE</button>
                        </div>
                      }
                      { contentInner }
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