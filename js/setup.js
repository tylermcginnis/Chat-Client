if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = newSearch;
}

// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

$.ajax('https://api.parse.com/1/classes/messages?order=-createdAt', {
  contentType: 'application/json',
  success: function(data){
    $.each(data.results, function(i, value){
      //$('#main').append('<div> Message: ' + value.text + '</div>');
    })
    console.log(data);
  },
  error: function(data) {
    console.log('Ajax request failed');
  }
});

var message = JSON.stringify({text: "tyler mcginnis"});

$.ajax('https://api.parse.com/1/classes/messages', {
    contentType: 'application/json',
    type: 'POST',
    data: message,
    success: function(result) {
        console.log('result: ',result);
    }
});