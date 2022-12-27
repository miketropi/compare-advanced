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
            let x_scroll_left_item = (last_item_index - _index) * data_unit;
            let new_x_item_sticky = 0;
            let x_scroll_minus = x_scroll_left_item - tableScrollLeft;

            if (last_item_index > _index && tableScrollLeft < x_scroll_left_item) {
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


   const compareAdvancedPinMultipleColumn = () => {
      const compareTable = $('.compare-advanced-table');
      let dataUnit = compareTable.data('unit');
      $(document).on("click", ".__pinneds:not(.__pinned)", function () {
         let tableScrollLeft = $('.indiana-scroll-container').scrollLeft();
         let _index = $(this).parents('.__product-info').data('td-index'),
            _index_new = $(this).parents('.__product-info').data('new-index');

         let columnNotSticky = $(this).parents('tr').find('td:not(.__is-sticky)');
         //set animation 1s
         $('tbody').find('td.__is-sticky').css('transition', 'all 1s ease');

         let arrayNewIdx = [];
         columnNotSticky.each(function (i, obj) {
            arrayNewIdx.push($(this).data('new-index'));
         });
         let minNewIdx = Math.min.apply(Math, arrayNewIdx);
         let minIdx = $(this).parents('tr').find('td[data-new-index="' + minNewIdx + '"]').data('td-index');

         //count column pinned
         let countPinned = $(this).parents('tr').find('td').find('.__pinned').length;

         //add class pinned
         $(this).addClass('__pinned');

         //remove sticky last
         $(this).parents('tbody').find('td').removeClass('__is-sticky-last');

         //set pin column
         $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').addClass('__is-sticky');
         $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').addClass('__is-sticky-last');
         $(this).parents('tbody').find('td[data-td-index="' + _index + '"] .ca-button.__pinneds').html('PINNED');

         if (countPinned == _index) return;

         //set new index         
         $(this).parents('td.__product-info').data('new-index', countPinned);
         $(this).parents('td.__product-info').attr('data-new-index', countPinned);
         $(this).parents('tbody').find('td[data-td-index="' + minIdx + '"]').data('new-index', _index_new);
         $(this).parents('tbody').find('td[data-td-index="' + minIdx + '"]').attr('data-new-index', _index_new);

         if (_index_new == countPinned) return;

         //move column to pin position
         let distanceIndexOrg = dataUnit * _index;
         let distanceCountPinned = dataUnit * countPinned;
         let distance = 0;

         if (_index_new > _index) {
            distance = distanceCountPinned - (_index * dataUnit);
         } else {
            if (distanceIndexOrg > distanceCountPinned) {
               distance = distanceCountPinned - distanceIndexOrg;
            } else {
               distance = distanceIndexOrg - distanceCountPinned;
            }
         }

         let distanceSortColumn = (_index_new - minIdx) * dataUnit;
         if (_index > 4 && tableScrollLeft > 0) {
            const stickyLast = compareTable.find('tbody').find('tr:nth-child(2)').find('td.__is-sticky-last');
            let idxNewStickyLast = stickyLast.data('new-index');
            let unitPinned = (idxNewStickyLast - 1) * dataUnit;

            let last_item_index = $('tbody tr').find('.__product-brand').length - 1;
            let x_scroll_left_item = (last_item_index - _index) * dataUnit;
            let x_scroll_minus = x_scroll_left_item - tableScrollLeft;
            if (last_item_index > _index && tableScrollLeft < x_scroll_left_item) {
               distance = (last_item_index * dataUnit - tableScrollLeft - x_scroll_minus - dataUnit - unitPinned) * -1;
            } else {
               distance = (last_item_index * dataUnit - tableScrollLeft - dataUnit - unitPinned) * -1;
            }
         }
         // console.log(distance)
         $(this).parents('tbody').find('td[data-td-index="' + minIdx + '"]').css('transform', 'translateX(' + distanceSortColumn + 'px)');
         $(this).parents('tbody').find('td[data-td-index="' + _index + '"]').css('transform', 'translateX(' + distance + 'px)');
      });
   }

   const compareAdvancedTableScrollHorizontal = () => {
      const tableContainer = $('.indiana-scroll-container');
      const compareTable = $('.compare-advanced-table');
      let dataUnit = compareTable.data('unit');

      tableContainer.scroll(function () {
         let tableScrollLeft = tableContainer.scrollLeft();
         const stickyLast = compareTable.find('tbody').find('tr:nth-child(2)').find('td.__is-sticky-last');
         let idxStickyLast = stickyLast.data('td-index');
         let idxNewStickyLast = stickyLast.data('new-index');
         let unitPinned = (idxNewStickyLast - 1) * dataUnit;
         //set animation 1s
         $('tbody').find('td.__is-sticky').css('transition', 'all 0s ease');

         const stickyColumn = compareTable.find('tbody').find('tr:nth-child(2)').find('td.__is-sticky');
         let lastItemIndex = $('tbody tr').find('.__product-brand').length - 1;
         stickyColumn.each(function (i, obj) {
            let indexCol = $(this).data('td-index');
            let indexNewCol = $(this).data('new-index');
            let transformCol = $(this).data('transform');
            let dataMinusTransform = (indexCol - 1) * dataUnit;
            let distance = 0;

            if (indexCol > 4) {

               let xScrollSticky = tableScrollLeft - transformCol;
               let x_num_index = (lastItemIndex - indexCol) * dataUnit;
               let xScrollStickys = tableScrollLeft - dataMinusTransform - x_num_index;
               if (xScrollSticky > -transformCol) {
                  if (indexCol < lastItemIndex) {
                     if (idxStickyLast != indexCol) {
                        if (xScrollStickys > -dataMinusTransform) {
                           distance = tableScrollLeft - (lastItemIndex - indexNewCol) * dataUnit;
                        } else {
                           distance = (lastItemIndex - indexNewCol - 1) * dataUnit * -1;
                        }
                     } else {
                        if (xScrollStickys > -dataMinusTransform) {
                           distance = xScrollStickys + unitPinned;
                        } else {
                           distance = unitPinned - dataMinusTransform;
                        }
                     }

                  } else {
                     if (idxStickyLast != indexCol) {
                        distance = tableScrollLeft - (lastItemIndex - indexNewCol) * dataUnit;
                     } else {
                        distance = tableScrollLeft - (transformCol - dataUnit) + unitPinned;
                     }
                  }
               } else {
                  if (indexCol < lastItemIndex) {
                     distance = (lastItemIndex - indexNewCol - 1) * dataUnit * -1;
                  }else{
                     distance = (lastItemIndex - indexNewCol) * dataUnit * -1;
                  }
               }

               $('[data-td-index="' + indexCol + '"]').css('transform', 'translateX(' + distance + 'px)');
            }
         });
      });
   }

   $(window).load(function () {
      // compareAdvancedSwapColumn();
      compareAdvancedPinMultipleColumn();
      compareAdvancedTableScrollHorizontal();
   });


   const ready = () => {
      compareAdvanced();
   }

   $(ready);
})(window, jQuery)