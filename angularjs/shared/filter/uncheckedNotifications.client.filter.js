'use strict'

app.filter("uncheckedNotifications", function() {

    return function(notifications) {
        var counter = 0;
        if (notifications) {
            for (var i = 0; i < notifications.length; i++) {
                if (!notifications[i].isChecked) {
                    counter++
                }
            }
        }
        return counter;
    };
});

app.filter('startFrom', function() {
    return function(input, start) {
        console.log(input);
        console.log(start);
        start = +start;
        return input.slice(start);
    }
})