//OTHER
var obj = {};
obj.username = prompt("What is your name?");
var friendHash = {};

var setLink = function(){
  var link = "https://api.parse.com/1/classes/";
    if(obj.roomname !== undefined){
      link += obj.roomname;
    } else {
      link += "message";
    }
    return link;
};
//AJAX STUFF
// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

var addPost = function(){
  $.ajax(setLink(), {
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(obj),
    success: function(result) {
      console.log('result: ',result);
    }
  });
};

//JQUERY STUFF


$(document).ready(function(){
  $('#container').on('click', '.name', function(){
    friendHash[this.innerHTML] = true;
    console.log(friendHash);
  });

    //create chatroom
  $('#createChatRoom').on('click', function(e){
    e.preventDefault();
    obj.roomname = prompt("Enter a chat room name.");
    $('#enterChatRoom').append('<option>'+ obj.roomname +'</option>');
  });

  //enter a chatroom
  $('#enterChatRoom').change( function(){
      obj.roomname = $(this).find('option:selected').val();
  });

  $('#submit').on('click', function(){
    obj.text = $('#inputBox').val();



    addPost();
    $('#inputBox').val('');
  }); //end #submit

  setInterval(function(){
    $.ajax(setLink(), {
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