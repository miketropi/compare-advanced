import React, { Fragment, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import useOuterClick from '../lib/useOuterClick';

const TooltipContainer = styled.div`
  position: absolute;
  z-index: 99;
  left: ${props => props.left ? `${props.left}px` : `0px`};
  top: ${props => props.top ? `${props.top}px` : `0px`};
  background: white;
  padding: 20px;
  border-radius: 16px;
  width: 200px;
  border: solid 1px #eee;
  text-align: center;
   @media (max-width: 425px){
      width: 100%;
      max-width: 100%;
      border-radius: 0;
      left:unset;
      top:unset;
      background: white;
      border:none;
      padding: 0;
      padding-bottom: 15px;
      position: relative;

   }
   >div{
      
   }
  p {
    font-size: 13px;
    line-height: 1.3em;
    margin: 0;

    font-family: var(--text-font);
    color: black;
  }

  @media(max-width: 768px) {
    padding: 10px;

    p {
      font-size: 11px;
    }
  }
  @media (max-width: 425px){
   padding: 0px 0 15px 0;
  }
`;

export default ({ content, children, eventActive, className }) => {
   const [container, setContainer] = useState(null);
   const [pos, setPos] = useState({ top: 0, left: 0 });
   const [show, setShow] = useState(false);
   let handle = useRef();
   let toolTipRef = null;

   let _eventActive = eventActive ? eventActive : 'hover';
   let eventActiveHandle = {}
   if (_eventActive == 'hover') {
      toolTipRef = useRef();

      eventActiveHandle = {
         onMouseEnter: e => setShow(true),
         onMouseLeave: e => setShow(false),
      }
   } else if (_eventActive == 'click') {
      toolTipRef = useOuterClick(ev => {
         if (!handle.current.contains(ev.target)) {
            setShow(false);
            if (window.innerWidth <= 450) {
               document.body.classList.remove('tooltip-active');
            }
         }
      });


      eventActiveHandle = {
         onClick: e => {
            setShow(!show)
            if (window.innerWidth <= 450) {
               document.body.classList.add('tooltip-active');
            }
         }
      }
   }

   const renderContainer = () => {
      const containerElem = document.createElement('DIV');
      containerElem.innerHTML = '<span class="tooltip-close">X</span>';
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
         let $wrapper = jQuery(handle.current).parent();
         let top = 0;
         let left = 0;
         if (_eventActive == 'hover') {
            top = jQuery(handle.current).offset().top - 50;
            left = jQuery(handle.current).offset().left + jQuery(handle.current).innerWidth() + 5;
         } else {
            top = jQuery(handle.current).offset().top - 100;
            left = ($wrapper.offset().left + $wrapper.innerWidth() / 2) - (242 / 2);
         }

         if (window.innerWidth <= 768) {
            left = ((window.innerWidth / 2) - (222 / 2));
         }

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
         ref={handle}
         style={{ cursor: 'pointer' }}
         {...eventActiveHandle}
         className={className}>
         {children}
      </div>
      {
         container &&
         show &&
         ReactDOM.createPortal(<TooltipContainer
            ref={toolTipRef}
            top={pos.top}
            left={pos.left}
            show={show}>
            {tooltipContent}
         </TooltipContainer>, container)
      }
   </Fragment>
}