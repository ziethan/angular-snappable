var angular = {};

angular.module('snap', [])

.directive('snappable', function() {
    "use strict";
    return {
        restrict: 'E'
      , scope: {
            disable: '@'
        }
      , controller: function($scope, $q) {
            $scope.defer = $q.defer();
            return $scope.defer.promise;
        }
      , link : function(scope, elem, attrs, ctrl) {
            var snappable = new window.Snap({
                element: elem.find('.snap-content')[0]
            });
            scope.defer.resolve(snappable);
        }
    };
})

.directive('snapDrawer', function() {
    "use strict";
    return {
        restrict: 'E'
      , scope: {}
      , transclude: true
      , replace: true
      , template: '<div class="snap-drawers"><div class="snap-drawer snap-drawer-left" ng-transclude></div></div>'
      , require: '^snappable'
      , link : function(scope, elem, attrs, ctrl) {}
    };
})

.directive('snapContent', function() {
    "use strict";
    return {
        restrict: 'E'
      , scope: {}
      , transclude: true
      , replace: true
      , template: '<div class="snap-content" ng-transclude></div>'
      , require: '^snappable'
      , link : function(scope, elem, attrs, ctrl) {}
    };
})

.directive('snapToggle', function() {
    "use strict";
    return {
        restrict: 'A'
      , scope: {}
      , require: '^snappable'
      , transclude: true
      , replace: true
      , link : function(scope, elem, attrs, ctrl) {
            ctrl.then(function(snappable) {
                elem.bind('click', function() {
                    var snapState = snappable.state('left').state;
                    
                    if(snapState === 'closed') {
                        snappable.open('left');
                    } else {
                        snappable.close('left');
                    }

                });
            });
        }
    };
});