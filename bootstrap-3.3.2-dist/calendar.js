var events = [];
//var createEvent = function(
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

//initialize calendar
var gDate = new Date();
var gMonth = gDate.getMonth();
var gYear = gDate.getFullYear();
fillCalendar(gMonth,gYear);

//toggle calendar and event-list view
$('#state-change').click(function(){
       $(".calendar").toggle();
       fillEventList();
       $(".event-list").toggle();
});
$('#previous-month').click(function(){
        fillCalendar(gMonth-1,gYear);
});
$('#next-month').click(function(){
        fillCalendar(gMonth+1,gYear);
});

//add event for calendar
$('.calendar div').click(function(){
        $(this).after('<input type="text">');
        $("input").focus();
});
//add event when input is clicked out of
$(document).on("focusout","input",function(){
    //hide box
    $(this).hide();
    //if updating text dont add a new event
    if ( $(this).attr('day') ){
            var y = $(this).attr('year');
            var m = $(this).attr('month');
            var d = $(this).attr('day');
            var pt = $(this).attr('prevtext');
            var t = $(this).val();
            events.forEach(function(ele) {
                if ( d == ele.day && m == ele.month && y == ele.year && pt == ele.text){
                        ele['text'] = t;
                        if ( t == "" ){
                                events.pop(ele);
                        }
                }
            });
    }
    //if it is a new event
    else if ( $(this).val() != "" ){
        //add event
        addEvent(gMonth,gYear, $(this).siblings('div.day').text() , $(this).val() );
        //update calander
    }
    fillCalendar(gMonth,gYear);
    emptyEventList();
    fillEventList();

});

//edit event for event-list

function fillCalendar(month,year){
    var start = new Date(year,month,1);
    //update global values
    gMonth = start.getMonth();
    gYear  = start.getFullYear();
    var firstday = start.getDay();
    //Update the month text
    $('#month h1').html(months[ start.getMonth() ]);
    $('#month h1').append(' '+ start.getFullYear() );
    //clear calendar's values
    //$('.calendar td div, .calendar td span').empty();
    //$('.calendar').remove('.event');
    //fill cells with dates and events
    var date = 1;
    for (var i = 0; i< 42 ; i++){
            $('.calendar td:eq('+i+') span').text("");
            var day = new Date(year,month,date);
            var d = day.getDate();
            var m = day.getMonth();
            var y = day.getFullYear();
            var dayIndex = firstday+date-1;
            if ( i < firstday || m >month) {
                    $('.calendar td:eq('+i+') div').text("");
            }
            else {
                    $('.calendar td:eq('+dayIndex+') div').text(date);
                    //check for events
                    events.forEach(function(ele) {
                        if ( d == ele.day && m == ele.month && y == ele.year){
                            //print text
                            $('.calendar td:eq('+dayIndex+')').append('<span class="event">'+ele.text+'</span>');
                            //create handler for text
                            $('.calendar td:eq('+dayIndex+') span:last()').click(function(){
                                $(this).hide();
                                var tmpText = $(this).text();
                                $(this).after('<input type="text" value="'+tmpText+'" day="'+ele.day+'" month="'+ele.month+'" year="'+ele.year+'" prevtext="'+ele.text+'">');
                                $("input").focus();
                            });
                        }
                    });
                    date++;
            }
    }
}
function emptyEventList(){
    $('.event-list thead').remove();
    $('.event-list th').remove();
    $('.event-list tr').remove();
}
function fillEventList(){
    emptyEventList();
    var max = 3;
    var count = 0;
    var date = new Date();
    var m = date.getMonth();
    var y = date.getFullYear();
    var d = date.getDate();
    var day = date.getDay();
    events.forEach(function(ele) {
        if (count >= max){
        }
        if ( d <= ele.day && m <= ele.month && y == ele.year && count < max){
        //if ( true){
        // ele.text != "" && count >= max
            //max of 5
            //create handler for event-list
            var tmp = new Date(ele.year,ele.month,ele.day);
            var day = tmp.getDay()
            var html = '<thead><th>'+days[day]+', '+months[ele.month]+' '+ele.day+'.</th></thead>';
            html += '<tr><td><span class="event">'+ele.text+'</span></td></tr>';
            $('.event-list').append(html);
            //set up listener
            $('.event-list tr td:eq('+count+')').click(function(){
            //$('.event-list tr td:eq(').click(function(){
                $(this).hide();
                var tmpText = $(this).text();
                $(this).after('<input type="text" value="'+tmpText+'" day="'+ele.day+'" month="'+ele.month+'" year="'+ele.year+'" prevtext="'+ele.text+'">');
                $("input").focus();

            });
            count++;
        }
        else {
        }
    });
}
function addEvent(month,year,day,text) {
    var tmpEvent = {"year":year,"month":month,"day":day,"text":text};
    events.push(tmpEvent);
}
