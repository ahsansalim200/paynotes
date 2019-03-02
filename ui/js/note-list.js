$(document).ready(function () {

    var noteList = function() {

        var $notepad          = $(' .notepad' ),
            $noteList         = $(' .notepad__list' ),
            $noteListItem     = $( '.notepad__list-item' ),
            $noteForm         = $( '.notepad__form' ),
            $noteFormInput    = $( '.notepad__form-input' ),
            $clearList        = $( '.notepad__clear' ),
            clearListDisplay  = 'notepad__clear--display',
            noteCount         = 0;

        var noteSchema = {
            user: $('#loggedInUser'),
            note: []
        };

        function displayNotes() {
            $.ajax({
                url: '/getnotes',
                data: {user: noteSchema.user},
                type: 'POST',
                success: function (response) {
                    for (noteCount = 0; noteCount < response[0].note.length; noteCount++) {
                        var noteID        = 'task-' + noteCount;
                        noteSchema.note.push(response[0].note[noteCount]);
                        // Build note list
                        $noteList.append("<li class='notepad__list-item' id='" + noteID + "'>" + response[0].note[noteCount] + "</li>");

                        // Show reset button
                        $clearList.addClass(clearListDisplay);
                    }
                }
            });

        }

        function storeNote() {
            if ($noteFormInput.val() !== '') {
                var noteID      = 'task-' + noteCount,
                    task        = $( '#' + noteID ),
                    taskMessage = $noteFormInput.val();
                noteSchema.note[noteCount] = taskMessage;
                /*sessionStorage.setItem(noteID, taskMessage);*/

                // Add to note list
                $noteList.append("<li class='notepad__list-item' id='" + noteID + "'>" + taskMessage + "</li>");

                // Display reset button
                if (!$clearList.hasClass(clearListDisplay)) {
                    $clearList.addClass(clearListDisplay);
                }

                // Reset
                $noteFormInput.val('');
                noteCount++;
                updateNotes();
            }
        }
        function updateNotes() {
            $.ajax({
                url: '/savenotes',
                data: noteSchema,
                type: 'POST',
                success: function (response) {
                    console.log(response);
                }
            });
        }

        function clearNotes() {

            // Update DOM
            $noteList.empty();
            $clearList.removeClass(clearListDisplay);

            // Clear storage
            //sessionStorage.clear();
            noteSchema.note = [];
            noteCount = 0;
            updateNotes();
        }

        function bindEvents() {

            // Show any existing notes from sessionStorage
            displayNotes();

            // Create new note
            $noteForm.on('submit', function () {
                storeNote();
                return false;
            });

            // Reset notes
            $clearList.on('click', function () {
                clearNotes();
            });
        }

        bindEvents();
    };

    noteList();
});
