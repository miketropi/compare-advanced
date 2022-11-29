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
      const compareTable = $('.compare-advanced-table');
      let data_unit = 0;
      $(document).on("click", ".__pinneds:not(.__pinned)", function () {
         if ($(window).width() >= 425)
            data_unit = compareTable.data('unit-dk');
         else
            data_unit = compareTable.data('unit-mb');
         //set animation 1s
         $('tbody').find('td.__is-sticky').css('transition', 'all 1s ease');
         
         //get index item
         let _index = $(this).parents('.__product-info').data('td-index'),
            _index_sticky = $(this).parents('tbody').find('td.__is-sticky').data('td-index'),
            _index_new = $(this).parents('.__product-info').data('new-index');

         //set new index
         $(this).parents('td.__product-info').data('new-index', 1);
         $(this).parents('td.__product-info').attr('data-new-index', 1);
         $(this).parents('tbody').find('td.__product-info.__is-sticky').data('new-index', _index_new);
         $(this).parents('tbody').find('td.__product-info.__is-sticky').attr('data-new-index', _index_new);
         let tableScrollLeft = $('.indiana-scroll-container').scrollLeft();
         //declare translate
         let translateX_Index = 0,
            translateX_Sticky = 0;

         let x_item_swap = (_index_new - _index_sticky) * data_unit;
         let x_item_sticky = _index * data_unit;
         if (_index > 4 && tableScrollLeft > 0) {
            let last_item_index = $('tbody tr').find('.__product-brand').length - 1;
            let x_scrol_left_item = (last_item_index - _index) * data_unit;
            let new_x_item_sticky = 0;
            let x_scroll_minus = x_scrol_left_item - tableScrollLeft;

            if (last_item_index > _index && tableScrollLeft < x_scrol_left_item) {
               new_x_item_sticky = last_item_index * data_unit - tableScrollLeft - x_scroll_minus;
            } else {
               new_x_item_sticky = last_item_index * data_unit - tableScrollLeft;
            }

            if (_index == _index_new && _index_sticky == 0) {
               translateX_Sticky = x_item_sticky;
            } else {
               translateX_Sticky = x_item_swap;
            }
            translateX_Index = -new_x_item_sticky;

         } else {
            if (_index == _index_new && _index_sticky == 0) {
               translateX_Sticky = x_item_sticky;
            } else {
               translateX_Sticky = x_item_swap;
            }
            translateX_Index = -x_item_sticky;
         }

         $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').css('transform', 'translateX(' + translateX_Index + 'px)');
         $(this).parents('tbody').find('td.__is-sticky').css('transform', 'translateX(' + translateX_Sticky + 'px)');


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
   });

   const ready = () => {
      compareAdvanced();

   }

   $(ready);
})(window, jQuery)