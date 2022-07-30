import React, { Fragment, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const TooltipContainer = styled.div`
position: absolute;
z-index: 99;
left: ${ props => props.left ? `${props.left}px` : `0px` };
top: ${ props => props.top ? `${props.top}px` : `0px` };
background: white;
padding: 20px;
border-radius: 16px;
width: 200px;
box-shadow: 0 8px 10px 0 rgb(1 1 1 / 15%);

p {
  font-size: 15px;
  line-height: 1.3em;
  margin: 0;
}
`;

export default ({ content, children, eventActive, className }) => {
  const [container, setContainer] = useState(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [show, setShow] = useState(false);
  const handle = useRef();

  const renderContainer = () => {
    const containerElem = document.createElement('DIV');
    containerElem.className = 'ca-tooltip-component';
    return containerElem;
  }

  useEffect(() => {
    let _container = renderContainer()
    document.body.appendChild(_container);
    setContainer(_container);

    return () => {
      document.body.removeChild(_container);
    }
  }, [children])

  useEffect(() => {
    const _setPos = () => {
      const top = jQuery(handle.current).offset().top - 50;
      const left = jQuery(handle.current).offset().left + jQuery(handle.current).innerWidth() + 20;
      
      setPos({
        ...pos,
        top,
        left
      });
    }

    _setPos();
    window.addEventListener('resize', _setPos)
    handle.current.addEventListener('mouseover', _setPos)
  }, [handle])

  const tooltipContent = typeof content === 'object' ? content : <div dangerouslySetInnerHTML={{ __html: content }}></div>
  
  return <Fragment>
    <div 
      ref={ handle } 
      onMouseEnter={ e => setShow(true) } 
      onMouseLeave={ e => { setShow(false) } } 
      className={ className }>{ children }</div>
    { 
      container && 
      show &&
      ReactDOM.createPortal(<TooltipContainer top={ pos.top } left={ pos.left } show={ show }>
        {/* { typeof content } */}
        {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
        { tooltipContent }
      </TooltipContainer>, container) 
    }
  </Fragment>
}