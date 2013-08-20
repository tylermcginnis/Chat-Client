// if(!/(&|\?)username=/.test(window.location.search)){
//   var newSearch = window.location.search;
//   if(newSearch !== '' & newSearch !== '?'){
//     newSearch += '&';
//   }
//   newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
//   window.location.search = newSearch;
// }

var username = prompt("What is your name?");
var friendHash = {};


// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

$(document).ready(function(){
  $('#container').on('click', '.name', function(){
    friendHash[this.innerHTML] = true;
    console.log(friendHash);
  });

    var obj = {};
    //create chatroom
  $('#chatRoomLeft').on('click', function(e){
    e.preventDefault();
    obj.roomname = prompt("Enter a chat room name.");
    $('#chatRoomRight').append('<option>'+ obj.roomname +'</option>');
  });
  
  //enter a chatroom
  $('#chatRoomRight').change( function(){
      obj.roomname = $(this).find('option:selected').val();
  });

  $('#submit').on('click', function(){
    obj.text = $('#inputBox').val();
    obj.username = username;

    var message = JSON.stringify(obj);
    var link = "https://api.parse.com/1/classes/";
    if(obj.roomname !== undefined){
      link += obj.roomname;
    } else {
      link += "message";
    }
    $.ajax(link, {
      contentType: 'application/json',
      type: 'POST',
      data: message,
      success: function(result) {
          console.log('result: ',result);
      }
     });
    $('#inputBox').val('');
  }); //end #submit

  setInterval(function(){
    var link = "https://api.parse.com/1/classes/";
    if(obj.roomname !== undefined){
      link += obj.roomname;
    } else {
      link += "message";
    }
    $.ajax(link, {
      contentType: 'application/json',
      data: {
        order: '-createdAt',
        limit: '30',
      },
      success: function(data){
        $('#container').html("");
        var input;
        console.log(data);
        $.each(data.results, function(i, value){
          var name = $('<span>' + value.username + '</span>').text();
          name = $('<span>' + name + '</span>').addClass("name");
          var txt = $('<span>' + value.text + '</span>').text();
          txt = $('<span>: ' + txt + '</span>');
          var toAppend = $('<div></div>').append(name).append(txt);
          if (friendHash[value.username]) {
            toAppend.addClass("friend");
          }
          $('#container').append(toAppend);
        });
      },
      error: function(data) {
        console.log('Ajax request failed');
      }
    }); //end ajax
  }, 2000);
}); //end document.ready