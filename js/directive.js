"use strict";

angular.module('locator.scrollfix', []).directive('setClassWhenAtTop', function ($window) {
    var $win = angular.element($window);
    return {
        scope: {
            breakpoint: '='
        },
        link: function (scope, element, attrs) {
            var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
                offsetTop = element.offset().top - 10; // get element's top relative to the document
            var iw = $win.innerWidth();

            // avoid event registration for scrolling if breakpoint is reached
            // this is a huge performance improvement if we are one mobile devices.
            // NOTE: this is not working if you are testing responsiveness with you browser and a initial screen size
            //       higher than scope.breakpoint
            if (iw < scope.breakpoint) {
                return;
            }
            $win.on('scroll', function (e) {
                var sct = $win.scrollTop();
                if (sct >= offsetTop) {
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                }
            });
        }
    };
});