// if(!/(&|\?)username=/.test(window.location.search)){
//   var newSearch = window.location.search;
//   if(newSearch !== '' & newSearch !== '?'){
//     newSearch += '&';
//   }
//   newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
//   window.location.search = newSearch;
// }

var username = prompt("What is your name?");

// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

$(document).ready(function(){
  $('#submit').on('click', function(){
    var obj = {};
    obj.text = $('#inputBox').val();
    obj.username = username;

    var message = JSON.stringify(obj);
    $.ajax('https://api.parse.com/1/classes/messages', {
      contentType: 'application/json',
      type: 'POST',
      data: message,
      success: function(result) {
          console.log('result: ',result);
      }
     });
  }); //end #submit

  setInterval(function(){
    $.ajax('https://api.parse.com/1/classes/messages?order=-createdAt', {
      contentType: 'application/json',
      success: function(data){
        $('#container').html("");
        var input;
        console.log(data);
        $.each(data.results, function(i, value){
          input = $('<div> ' + value.username + ' : ' + value.text + '</div>').text();
          var toAppend = $('<div></div>').append(input);
          $('#container').append(toAppend);
        });
      },
      error: function(data) {
        console.log('Ajax request failed');
      }
    }); //end ajax
  }, 1000);
}); //end document.ready