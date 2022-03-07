// Detele all events. Only use if you want to delete all events for the calendar.
function deleteEvents() {
  var startDate = new Date("1/1/2022");
  var endDate = new Date ("1/1/2023");
  let annualCalendar = CalendarApp.getCalendarById("ssk50ffkqlj00feiob2vqn2hes@group.calendar.google.com");

  var events = annualCalendar.getEvents(startDate, endDate);
  for(var i=0; i < events.length; i++) {
    var ev = events[i];
    console.log(ev.getTitle()); // Know the name of the deleted event
    ev.deleteEvent();
  }
}