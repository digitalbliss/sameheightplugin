/*!
* sameHeight jQuery plugin v0.1
* http://digitalbliss.uk.com
*
* Copyright 2014, Christos Asteriou
* Released under the MIT license
*
* Date: 2014-05-01T17:42Z
* 
* Really simple jQuery plugin that takes as input a container element and
* sets its children elements to the same height as the tallest element in
* the same row.
*/

(function($) {

    $.fn.sameHeight = function() {

        var adjustElementsHeight, itemsInContainer, tallestItemHeight,
            currentDistanceFromTop, foundNewRow, currentRowItems, newItemInRow;

        $itemsInContainer = $(this).children();

        initVariables = function(item) {
            currentRowItems = [];
            currentRowItems.push(item);
            currentDistanceFromTop = $(item).offset().top;
            tallestItemHeight = $(item).height();
        };

        newItemInRow = function(item) {
            tallestItemHeight = $(item).height();
            currentRowItems.push(item);
        };

        foundNewRow = function() {

            $.each($itemsInContainer, function(index, item) {
                $(item).height(tallestItemHeight);
            });
        };

        adjustElementsHeight = function() {
            $itemsInContainer.height('auto');
            initVariables($itemsInContainer.first());

            $.each($itemsInContainer, function(index, item) {

                // last row
                if ($(item).is(':last-child')) {
                    newItemInRow(item);
                    foundNewRow();
                } // new row
                else if (currentDistanceFromTop !== $(item).offset().top) {
                    foundNewRow();
                    initVariables(item);
                } else {
                    newItemInRow(item);
                }
            });
        };
        adjustElementsHeight();

        return $itemsInContainer;
    }
}(jQuery));