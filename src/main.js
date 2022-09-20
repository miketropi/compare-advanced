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
         let x = $(this).parents('.__product-info').offset().left - $(this).parents('tr').offset().left;

         let x_sticky = $(this).parents('tbody').find('td.__product-info.__is-sticky').data('td-transform');
         let x_index = $(this).parents('td.__product-info').data('td-transform');

         let _index = $(this).parents('.__product-info').data('td-index');
         let _index_sticky = $(this).parents('tbody').find('td.__is-sticky').data('td-index');

         let x_index_transform = x_index - (_index * 200);

         $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').css('transform', '(-' + x_index_transform + 'px)');

         // $(this).parents('tbody').find('td.__is-sticky').css('transform', 'translateX(' + x_sticky + 'px)');


         if (_index > _index_sticky) {
            console.log(11)
            let xx_index = x_index - 200
            x_sticky = x_index - x_sticky
            $(this).parents('tbody').find('td.__is-sticky').css('transform', 'translateX(' + x_sticky + 'px)');
            $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').css('transform', 'translateX(-' + xx_index + 'px)');
         } else {
            console.log(22)
            let xx_index = x_index - 200
            x_sticky = x_sticky - x_index - 200
            $(this).parents('tbody').find('td.__is-sticky').css('transform', 'translateX(-' + x_sticky + 'px)');
            $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').css('transform', 'translateX(-' + xx_index + 'px)');
         }


         //add remove class pinned
         $('.__pinneds').removeClass('__pinned');
         $(this).addClass('__pinned');
         $(this).parents('tbody').find('td').removeClass('__is-sticky');
         $(this).parents('tbody').find('.ca-button.__pinneds').html('PIN');
         $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').addClass('__is-sticky');
         $(this).parents('tbody').find('td[data-td-index="' + _index + '"] .ca-button.__pinneds').html('PINNED');

         //update data click
         $(this).parents('.compare-advanced-table').data('click', 1);
         $(this).parents('.compare-advanced-table').attr('data-click', 1);
      });
   }

   $(window).load(function () {
      compareAdvancedSwapColumn();
   });

   const ready = () => {
      compareAdvanced();

   }

   $(ready);
})(window, jQuery)