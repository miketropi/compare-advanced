import React, { Fragment, useRef, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';
import SlideImages from './SlideImages';
import orderBy from 'lodash/orderBy';
import { useCompareAdvanced } from '../context/CompareAdvancedContext';
import iconPlus from '../../images/plus.svg';
import ScrollContainer from 'react-indiana-drag-scroll';

const CompareTableContainer = styled.div`
display: block;
width: 100%;
overflow: auto;
margin-bottom: 3em;
--row-color-first: ${props => props.rowColorFirst};
--row-color-second: ${props => props.rowColorSecond};
--button-color-ide: ${props => props.buttonColorIde};
--button-color-text-ide: ${props => props.buttonColorTextIde};
--button-color-hover: ${props => props.buttonColorHover};
--button-color-text-hover: ${props => props.buttonColorTextHover};

.compare-advanced-table {
  max-width: initial;
  margin-bottom: 0;
  overflow-x: initial !important;

  .__image-label {
    width: 70%;
    margin: 1em auto 5px auto;
    display: block;
  }

  tr {
    &:nth-child(2) {
        td{
            z-index: 2;
            &.__is-sticky {
                z-index: 4;
            }
        }
    }
    td, th{
        z-index: 1;
    }
    td.__is-sticky {
      position: sticky;
      left: var(--left-space);
      z-index: 3;

      &.__product-brand {
        z-index: 5;
      }
    }

    td.__product-brand {
        z-index: 3;
      .__entry-cell {
        min-height: auto;
        line-height: 0;
        padding-bottom: 0;
      }
    }

    th.__col-heading {
      position: sticky;
      left: 0;
      z-index: 99999;
    }
  }
}
`

export const CompareItems = ({ tableRootElem, items, field }) => {
    const {
        cellWidth,
        updatePinFunc,
        removeCompareItem } = useCompareAdvanced();

    const [thWidth, setThWidth] = useState(0);
    const [thHeight, setThHeight] = useState(0);

    useEffect(() => {
        let _w = tableRootElem.current.querySelector('.__col-heading ').clientWidth;
        let _h = tableRootElem.current.querySelector('.__col-heading ').clientHeight;
        setThWidth(_w);
        setThHeight(_h);
    });

    return <Fragment>
        {
            items.map((item, _itemIndex) => {
                const { _key, ID, pin } = item['__config'];
                const fieldData = item[field.field_map];
                const type = fieldData.extra_params?.type;
                let contentInner = '';
                const _index = _itemIndex + 1;
                if (type == 'gallery') {
                    const gallery = fieldData.extra_params?.value;
                    contentInner = <Tooltip
                        className="tooltip-contain-gallery"
                        eventActive={'click'}
                        content={<SlideImages gallery={gallery} />}>
                        <div dangerouslySetInnerHTML={{ __html: fieldData._html }}></div>
                        {
                            type == 'gallery' &&
                            <span className="__icon-extra-gallery">
                                <img src={iconPlus} alt="#" />
                            </span>
                        }
                    </Tooltip>;
                } else {
                    contentInner = <div dangerouslySetInnerHTML={{ __html: fieldData._html }}></div>;
                }

                const __removeItem = (index) => {
                    const r = confirm('Are you sure remove this item?')
                    r ? removeCompareItem(index) : '';
                }

                return <td
                    className={[fieldData?.extra_class, pin ? '__is-sticky' : ''].join(' ')}
                    data-td-index={_itemIndex}
                    data-transform={_itemIndex * 200}
                    data-new-index={_itemIndex}
                    key={fieldData._key}
                    style={{ '--left-space': `${(_itemIndex + 1) * 200}px` }}
                    width={`${cellWidth}px`}
                >
                    <div className="__entry-cell">
                        {
                            fieldData._name == 'infomation' &&
                            <div className="actions">
                                {/* <button className={ ['ca-button', pin ? '__pinned' : ''].join(' ') } onClick={ e => updatePinFunc((pin ? false : true), _key) }>{ pin ? 'PINNED' : 'PIN' }</button> */}
                                <button className={['ca-button', '__pinneds'].join(' ')} >{pin ? 'PINNED' : 'PIN'}</button>
                                <button className="ca-button __remove" onClick={e => __removeItem(_itemIndex)}>REMOVE</button>
                            </div>
                        }
                        {contentInner}
                    </div>
                </td>
            })
        }
    </Fragment>
}

export default ({ compareFields, compareItems }) => {
    const {
        cellWidth,
        rowColorFirst,
        rowColorSecond,
        buttonColorIde,
        buttonColorTextIde,
        buttonColorHover,
        buttonColorTextHover } = useCompareAdvanced();

    const scrollContainerRef = useRef();
    const tableRef = useRef();

    const _onScrollHorizontal = () => {
        // console.log(scrollContainerRef.current.getElement().scrollLeft)
        let scrollX = scrollContainerRef.current.getElement().scrollLeft;
        let tdSticky = tableRef.current.querySelectorAll('td.__is-sticky');
        let tdStickyIndex = tableRef.current.querySelector('td.__product-info.__is-sticky').dataset.tdIndex;
        let dataTransformSticky = tableRef.current.querySelector('td.__product-brand.__is-sticky').dataset.transform;
        let lastItemIndex = tableRef.current.querySelectorAll('td.__product-brand').length - 1;
        let translateX_Value = 0;

        [...tdSticky].forEach(el => {
            el.style.transition = `all 0s ease`;
        });

        if (tdStickyIndex > 4) {
            let xScrollSticky = scrollX - dataTransformSticky;
            if (xScrollSticky > -dataTransformSticky) {
                if (tdStickyIndex < lastItemIndex) {
                    let x_num_index = (lastItemIndex - tdStickyIndex) * 200;
                    let xScrollStickys = scrollX - dataTransformSticky - x_num_index;
                    if (xScrollStickys > -dataTransformSticky) {
                        translateX_Value = xScrollStickys;
                    } else {
                        translateX_Value = -dataTransformSticky;
                    }
                } else {
                    translateX_Value = xScrollSticky;
                }
            } else {
                translateX_Value = -dataTransformSticky;
            }

            [...tdSticky].forEach(el => {
                el.style.transform = `translateX(${translateX_Value}px)`;
            });

        }
    }

    const _scrollHandleVertical = (e) => {
        let brandElems = tableRef.current.querySelectorAll('td.__product-brand .__entry-cell');
        let actionsElems = tableRef.current.querySelectorAll('.actions');
        const { top } = tableRef.current.getBoundingClientRect();
        const Header = document.querySelector('#main-head .navigation.sticky-bar');
        let spaceHeader = Header ? (Header.clientHeight + Header.offsetTop) : 0;
        if ((top - spaceHeader) > 0) {
            [...brandElems].forEach(el => {
                el.style.zIndex = ``;
                el.style.transform = `translateY(0)`;
            });

            [...actionsElems].forEach(el => {
                el.style.zIndex = ``;
                el.style.transform = `translateY(0)`;
                el.classList.remove('is-top-sticky');
            });
            return;
        }

        [...brandElems].forEach(el => {
            // el.style.zIndex = `9999999`;
            el.style.transform = `translateY(${(top * -1) + spaceHeader}px)`;
        });

        [...actionsElems].forEach(el => {
            // el.style.zIndex = `9999999`;
            el.style.transform = `translateY(${(top * -1) + spaceHeader}px)`;
            el.classList.add('is-top-sticky');
        });
    }

    window.addEventListener('scroll', _scrollHandleVertical);

    return <CompareTableContainer
        rowColorFirst={rowColorFirst}
        rowColorSecond={rowColorSecond}
        buttonColorIde={buttonColorIde}
        buttonColorTextIde={buttonColorTextIde}
        buttonColorHover={buttonColorHover}
        buttonColorTextHover={buttonColorTextHover}>
        <ScrollContainer
            ref={scrollContainerRef}
            vertical={false}
            onScroll={_onScrollHorizontal}>
            <table
                ref={tableRef}
                className="compare-advanced-table"
                style={{ width: `${(compareItems.length + 1) * cellWidth}px` }}>
                <tbody>
                    {
                        compareFields &&
                        compareFields.map(field => {
                            if (field.visible == false) return false;

                            return <tr key={field._key}>
                                <th className={['__col-heading', field?.extra_class].join(' ')} width={`${cellWidth}px`}>
                                    {
                                        field.image_label?.url &&
                                        <img className="__image-label" src={field.image_label?.url} alt="#" />
                                    }
                                    {field?.label}

                                    {
                                        field.help_text != '' &&
                                        field.enable_help_text == true &&
                                        <Tooltip className="__icon-tooltip" content={field.help_text}>
                                            <span className="__icon">
                                                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24" /><g><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 16h-2v-2h2v2zm0-4.14V15h-2v-2c0-.552.448-1 1-1 1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.862-1.278 3.413-3 3.86z" /></g></svg>
                                            </span>
                                        </Tooltip>
                                    }
                                </th> 
                                {
                                    (compareItems.length > 0) &&
                                    <CompareItems tableRootElem={tableRef} items={orderBy(compareItems, [o => o.__config.pin], 'desc')} field={field} />
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </ScrollContainer>
    </CompareTableContainer>
}