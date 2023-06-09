// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

    const currentDay = $('#currentDay');
    currentDay.text(dayjs().format('dddd, MMMM D'));

    const current_hour = dayjs().hour();

    for (let i = 9; i <= 17; i++) {

        let time_tense = 'future';
        if (i < current_hour) {
            time_tense = 'past';

        } else if (i === current_hour) {
            time_tense = 'present';
        }

        let am_pm = "AM";
        let hour_12 = i;
        if (i >= 12) {
            am_pm = "PM";

            if (i > 12) {
                hour_12 = i % 12;
            }
        }

        let outer_div = $('<div>').attr('id', `hour-${i}`).attr('class', `row time-block ${time_tense}`);
        let hour_div = $('<div>').attr('class', 'col-2 col-md-1 hour text-center py-3').text(`${hour_12}${am_pm}`);
        let textArea = $('<textArea>').attr('class', 'col-8 col-md-10 description').attr('rows', '3').text(localStorage.getItem(`hour-${i}-text`));
        let saveBtn = $('<button>').attr('class', 'btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
        let faSave = $('<i>').attr('class', 'fas fa-save').attr('aria-hidden', 'true');

        saveBtn.append(faSave);
        outer_div.append(hour_div).append(textArea).append(saveBtn);
        $('#container_div').append(outer_div);
    }

    $('.saveBtn').click((event) => {
        const hour_id = $(event.currentTarget).parent().attr('id');
        const hour_text = $(event.currentTarget).parent().find('textarea').val();

        localStorage.setItem(`${hour_id}-text`, hour_text);
        console.log(`${hour_id}-text`);
    }
    );


    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
});
