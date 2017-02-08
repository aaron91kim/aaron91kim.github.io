app.directive('pageReserve', ['pageService', function(pageService) {
    return {
        restrict: 'E',
        templateUrl: "/ng-app/components/shopPage/reserve/reserve.client.partial.html",
        link: function(scope, element, attrs) {

            element.bind('keyup', function(event) {
                console.log('sdf');
            })

            scope.initReserve = function() {
                scope.reserve = {
                    selectedDesigner: '',
                    selectedItems: [],
                    selectedDate: new Date()
                }
                scope.nowStep = 1;
                scope.reserveShow = false;
            }

            scope.initReserve();

            scope.$watch('nowShopData', function() {
                if (scope.nowShopData) {
                    scope.initReserve();
                    //기존데이터를 지워줌.
                    //초기값으로 현제 선택한 미용사의 스케쥴을 받아옴.
                    scope.getSchedule(scope.reserve.selectedDesigner, scope.reserve.selectedDate);
                    $("#datepicker").datepicker("refresh");
                    $("#datepicker").datepicker({

                        beforeShowDay: availableDay,
                        maxDate: "+2w",
                        minDate: "-1",
                        onSelect: function(date, obj) {

                            var selectedDate = new Date(obj.selectedYear, obj.selectedMonth, obj.selectedDay)

                            scope.getSchedule(scope.reserve.selectedDesigner, selectedDate);
                            scope.$apply(function() {
                                scope.reserve.selectedDate = selectedDate;
                                scope.reserve.selectedTime = null;
                            })
                        }
                    });
                }
            })



            scope.showReserveFrom = function() {
                fixWindow('.reserve-window');
                $('<div class="modal-backdrop in"></div>').appendTo(document.body);
                $('body').addClass('stop-scrolling');
                scope.reserveShow = true;
            }

            scope.hideReserveForm = function() {
                $('body').removeClass('stop-scrolling');
                $(".modal-backdrop").remove();
                scope.reserveShow = false;
            }

            scope.addReserve = function() {
                scope.reserve.selectedShop = scope.nowShopData.shop._id;
                pageService.addReserve(scope.reserve).then(function(data) {
                    if (data.status == 'success') {
                        showMessage('Booking complete');

                        //예약이 완료되는순간 이벤트를 발생시켜줌.
                        socket.emit('updateReserve', {
                            'room': scope.nowShopData.shop._id
                        })

                        scope.hideReserveForm()

                    }
                });
            }

            scope.getSchedule = function(designer, date) {

                // 주말인지 아닌지를 판별
                var dayType = checkDayType(date, scope.nowShopData.shop.time);

                var openTimeToMs = dayType[0];
                var closeTimeToMs = dayType[1];
                console.log(new Date(openTimeToMs));
                console.log(new Date(closeTimeToMs));
                var loopTime = openTimeToMs;
                var timeArray = [];
                var TimeObj = function(date, status) {
                    this.time = date;
                    this.available = status;
                }

                //timezone + timesave(1hour)
                var timeJone = new Date().getTimezoneOffset() * (1000 * 60) + (1000 * 60 * 60);
                //마감 30분전 예약 방지
                for (loopTime;
                    (closeTimeToMs - (30 * 60 * 1000)) > loopTime; loopTime += (30 * 60 * 1000)) {

                    var loopDate = new Date(loopTime + timeJone);
                    var now = new Date();

                    //당일일경우 시간이 지나잇으면 disable처리.
                    if (date.getDate() == now.getDate() && now.getHours() > loopDate.getHours()) {
                        timeArray.push(new TimeObj(loopDate, false));
                    } else {
                        timeArray.push(new TimeObj(loopDate, true));
                    }

                }

                scope.reserve.availableTime = timeArray;

            }


            var checkDayType = function(date, times) {
                var openTimeHour;
                var openTimeMinute;
                var closeTimeHour;
                var closeTimeMinute;

                var openTimeToMs;
                var closeTimeToMs;

                if (date.getDay() == 0 || date.getDay() == 6) {
                    openTimeHour = parseInt(times.weekend.from.hour);
                    openTimeMinute = parseInt(times.weekend.from.minute);
                    closeTimeHour = parseInt(times.weekend.to.hour);
                    closeTimeMinute = parseInt(times.weekend.to.minute);
                    openTimeToMs = (60 * 60 * 1000 * openTimeHour) + (60 * 1000 * openTimeMinute);
                    closeTimeToMs = (60 * 60 * 1000 * closeTimeHour) + (60 * 1000 * closeTimeMinute);
                } else {
                    openTimeHour = parseInt(times.weekDay.from.hour);
                    openTimeMinute = parseInt(times.weekDay.from.minute);
                    closeTimeHour = parseInt(times.weekDay.to.hour);
                    closeTimeMinute = parseInt(times.weekDay.to.minute);
                    openTimeToMs = (60 * 60 * 1000 * openTimeHour) + (60 * 1000 * openTimeMinute);
                    closeTimeToMs = (60 * 60 * 1000 * closeTimeHour) + (60 * 1000 * closeTimeMinute);
                }

                return [openTimeToMs, closeTimeToMs];
            }

            scope.selectDesignerInReserve = function(designer) {
                scope.reserve.selectedDesigner = designer;
                //뒤로가서 디자이너만 바꿀경우 예약시간이 엉키기 때문에 time을 비워줌. 
                scope.reserve.selectedTime = null;
            }


            scope.toggleSelection = function(item, idx, category) {
                console.log(item);
                if (idx) {
                    for (var i in scope.reserve.selectedItems) {
                        if (item._id == scope.reserve.selectedItems[i]._id) {
                            scope.reserve.selectedItems.splice(i, 1);
                        }
                    }
                } else {
                    //카테고리를 추가해줌.
                    item.category = category;
                    scope.reserve.selectedItems.push(item);
                }

            }

            scope.totalPrice = function() {
                var total = 0;

                for (var i in scope.reserve.selectedItems) {

                    if (scope.reserve.selectedItems[i].sale) {
                        total += scope.reserve.selectedItems[i].sale
                    } else {
                        total += scope.reserve.selectedItems[i].price
                    }
                }

                return total;
            }



            // sun, mon, tue, wed, thu, fri, sat
            function kDayToInt(arr) {
                var num = [];

                for (var i in arr) {
                    switch (arr[i]) {
                        case 'sun':
                            num.push(0);
                            break;
                        case 'mon':
                            num.push(1);
                            break;
                        case 'tue':
                            num.push(2);
                            break;
                        case 'wed':
                            num.push(3);
                            break;
                        case 'thu':
                            num.push(4);
                            break;
                        case 'fri':
                            num.push(5);
                            break;
                        case 'sat':
                            num.push(6);
                            break;
                    }
                }
                return num;
            }


            function availableDay(date) {
                var arr = kDayToInt(scope.nowShopData.shop.dayOff);

                if (beforeNow(date) && dayOff(date, arr)) {
                    return [true, "", ""]
                } else if (!beforeNow(date)) {
                    return [false, "", "date is already passed"]
                } else if (!dayOff(date, arr)) {
                    return [false, "", "This day is closed."]
                }
            }

            function dayOff(date, arr) {
                if (arr.indexOf(date.getDay()) == -1) {
                    return true
                } else {
                    return false
                }
            }

            function beforeNow(date) {
                var t = new Date();
                t.setDate(t.getDate() - 1);
                if (t < date) {
                    return true;
                } else {
                    return false;
                }
            }



        }
    }
}]);