$(onReady);

function onReady() {
    console.log('JQ');
    $('#addButton').on('click', addButtonClicked);
    addToDB();
    $("#toDoListContainer").on('click', '#completeButton', completed);
    $("#toDoListContainer").on('click', '#deleteButton', deleteTask);


}//end of onReady

//globals
var sendInput = {completed: 'N'};

function deleteTask() {
    console.log('inside of delete button');
    $(this).parent().css('background-color', 'orange');
    var objectToSend = {text:$(this).parent().find('p').text()};


    $.ajax({
        type:'POST',
        url: '/deleteTask',
        data:objectToSend,
        success: function(res) {
            console.log('Back from the server with', res);

        }//end success
    });//end of ajax


    console.log($(this).parent().css('background-color', 'orange'));
  var ask = confirm('Are you sure?');
 if ( ask ) {
     $(this).parent().remove();
 }
 else {
     $(this).parent().css('background-color', 'red');
 }

}//end deleteTask


function completed() {
    console.log('inside completed');
    var objectToSend = {div:$(this).siblings('p').text()};

$(this).parent().css('background', ' linear-gradient(to bottom right, rgb(65, 244, 217), rgb(64, 193, 239))');

    $.ajax({
        type:'POST',
        url: '/updateCompleted',
        data:objectToSend,
        success: function(res) {
            console.log('Back from the server with', res);

        }//end success
    });//end of ajax

    $.ajax({
        type:'GET',
        url: '/seeList',
        success: function(res) {
            console.log('Back from the server with', res);


        }//end success

    });//end of ajax


}//end completed

function getInfoFromServer() {
    console.log('inside of getInfoFromServer');

    $.ajax({
        type:'GET',
        url: '/seeList',
        success: function(res) {
            console.log('Back from the server with', res);
        }//end success
    });//end of ajax

}

function addButtonClicked() {
    console.log('inside of addButtonClicked');
    sendInput.toDo =  $('#addToListInput').val();

    $.ajax({
        type:'POST',
        url: '/postInput',
        data:sendInput,
        success: function(res) {
            console.log('back from the server with', res);

        }//end success
    });//end ajax


    addToDB();
}


function addToDB() {
    console.log('inside of addToDB');
    $.ajax({
        type:'GET',
        url: '/seeList',
        success: function(res) {
            console.log('back from the server with', res);
            $("#toDoListContainer").empty();
            for (var i = 0; i < res.length; i++) {

                var $div = $("<div class = 'taskDiv' Data-completed = '"+ res[i].completed +"'>" + "</div>");
                var $p = $("<p id = 'task'>" +  res[i].task+"</p>");
                var $completeButton = $("<button id = 'completeButton'>Completed</button>");
                var $deleteButton = $("<button id = 'deleteButton'>x</button>");
                var $span = $("<span id='hide'>"+res[i].completed +"</span>");
                $div.append($p, $completeButton, $deleteButton, $span);

                //"<div id = 'taskDiv' Data-completed = ><p id = 'task'>"+ res[i].task+"</p><button id = 'completeButton'>Completed</button><button id = 'deleteButton'>Delete</button></div>"

                $("#toDoListContainer").append($div);

            }//end for loop


        }//end success
    });//end of ajax


}
