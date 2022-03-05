function createCalendarEvents() {
    let annualCalendar = CalendarApp.getCalendarById("<CALENDAR ID>"); //calendar ID
    let nonSchoolDays = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("No lectivos"); // get "no lectivos" spreadsheet
    let activities = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Actividades"); // get "actividades" spreadsheet
    let tasks = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Recordatorios"); // get "recordatorios" spreadsheet
    let birthdays = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Zorionak"); // get "cumpleaños" spreadsheet
  
    // Add "No lectivos" to the calendar
    let nonSchoolDaysCal = nonSchoolDays.getDataRange().getValues();
    nonSchoolDaysCal.splice(0,1);
  
    nonSchoolDaysCal.forEach(function(entry) {
      annualCalendar.createAllDayEvent(entry[1], entry[0]);
    });
  
    // Add "actividades" to the calendar
    let activitiesCal = activities.getDataRange().getValues();
    activitiesCal.splice(0,1);
  
    activitiesCal.forEach(function(entry) {
      annualCalendar.createAllDayEvent(entry[1], entry[0]);
    });
  
    // Add "recordatorios" to the calendar
    let tasksCal = tasks.getDataRange().getValues();
    tasksCal.splice(0,1);
  
  
    tasksCal.forEach(function(entry) {
      var recurrence = entry[2].split(", ");
      var recurrenceDays = recurrence.map((item) => CalendarApp.Weekday[item]);
      var weekdays = CalendarApp.newRecurrence().addWeeklyRule().onlyOnWeekdays(recurrenceDays).until(new Date('June 21, 2022'));
      console.log(weekdays);
      annualCalendar.createAllDayEventSeries(
        entry[1], 
        entry[0],
        weekdays);
    }); 
  
    // Add "birthdays" to the calendar
    let birthdaysCal = birthdays.getDataRange().getValues();
    birthdaysCal.splice(0,1);
  
    birthdaysCal.forEach(function(entry) {
      annualCalendar.createAllDayEvent(entry[1], entry[0]);
    });
  }
  
  // Detele all events. Only use if you want to delete all events for the calendar.
  function deleteEvents() {
    var startDate = new Date("1/1/2022"); // first date
    var endDate = new Date ("1/1/2023"); // last date 
    let annualCalendar = CalendarApp.getCalendarById("ssk50ffkqlj00feiob2vqn2hes@group.calendar.google.com");
  
    var events = annualCalendar.getEvents(startDate, endDate);
    for(var i=0; i < events.length; i++) {
      var ev = events[i];
      console.log(ev.getTitle()); // Know the name of the deleted event
      ev.deleteEvent();
    }
  }