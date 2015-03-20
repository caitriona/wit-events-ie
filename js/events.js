var app = angular.module('eventsApp',[]);

app.controller('eventsCtrl',function($scope, $http, $filter) {
	$http.get('data/events.json').success(function(data) {
		$scope.event_items = data.filter($filter('prepData'));
	});
});

app.filter('prepData', function () {
    return function (item) {
		var event_date = new Date(item.startdate);

		// set up month-year data
		var _month = (event_date.getMonth() < 9) ? '0'+(event_date.getMonth()+1) : event_date.getMonth()+1;
		item.monthyear = event_date.getFullYear()+'-'+_month+'-01';
		
		// only return events with future dates
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		return event_date >= yesterday;
    };
});

app.filter('groupBy', function () {
	return function (collection, key) {
		if (collection === null || angular.isUndefined(collection)){
			return;
		}
		return uniqueItems(collection, key);
	};
});

var uniqueItems = function (data, key) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var value = data[i][key];
        if (result.indexOf(value) == -1) {
			result.push(value);
        }
    }
    return result;
};


