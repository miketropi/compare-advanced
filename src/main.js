import React from 'react';
import { createRoot } from 'react-dom/client';
import { CompareAdvancedProvider } from './context/CompareAdvancedContext';
import CompareAdvanced from './components/CompareAdvanced';

/**
 * Script 
 */

; ((w, $) => {
   'use strict';

   const compareAdvanced = () => {
      let elems = document.querySelectorAll('.compare-advanced-container');
      if (!elems) return;

      [...elems].forEach(el => {
         const root = createRoot(el);

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
         root.render(<CompareAdvancedProvider {...atts} >
            <CompareAdvanced />
         </CompareAdvancedProvider>);
      })
   }

   const compareAdvancedSwapColumn = () => {
      $(document).on("click", ".__pinneds", function () {
         //get index item
         let _index = $(this).parents('.__product-info').data('td-index');
         let _index_sticky = $(this).parents('tbody').find('td.__is-sticky').data('td-index');
         let _index_new = $(this).parents('.__product-info').data('new-index');

         //set new index
         $(this).parents('td.__product-info').data('new-index', 1);
         $(this).parents('td.__product-info').attr('data-new-index', 1);
         $(this).parents('tbody').find('td.__product-info.__is-sticky').data('new-index', _index_new);
         $(this).parents('tbody').find('td.__product-info.__is-sticky').attr('data-new-index', _index_new);

         let x_item_swap = (_index_new - _index_sticky) * 200;
         let x_item_sticky = _index * 200;
         if (_index == _index_new) {
            if (_index_sticky == 0) {
               $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').css('transform', 'translateX(-' + x_item_sticky + 'px)');
               $(this).parents('tbody').find('td.__is-sticky').css('transform', 'translateX(' + x_item_sticky + 'px)');
            } else {
               $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').css('transform', 'translateX(-' + x_item_sticky + 'px)');
               $(this).parents('tbody').find('td.__is-sticky').css('transform', 'translateX(' + x_item_swap + 'px)');
            }
         } else {
            $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').css('transform', 'translateX(-' + x_item_sticky + 'px)');
            $(this).parents('tbody').find('td.__is-sticky').css('transform', 'translateX(' + x_item_swap + 'px)');
         }

         //add remove class pinned
         $('.__pinneds').removeClass('__pinned');
         $(this).addClass('__pinned');
         $(this).parents('tbody').find('td').removeClass('__is-sticky');
         $(this).parents('tbody').find('.ca-button.__pinneds').html('PIN');
         $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').addClass('__is-sticky');
         $(this).parents('tbody').find('td[data-td-index="' + _index + '"] .ca-button.__pinneds').html('PINNED');
        
      });
   }

   $(window).load(function () {
      compareAdvancedSwapColumn();
      $( ".indiana-scroll-container" ).scroll(function(){
         let x_sticky = $('td.__product-info.__is-sticky').offset().left - $('.compare-advanced-table').offset().left;
         console.log(x_sticky)
      });
   });

   const ready = () => {
      compareAdvanced();

   }

   $(ready);
})(window, jQuery)