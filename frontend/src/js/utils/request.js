function http_get(url, callback_success) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback_success(JSON.parse(xhttp.responseText));
      }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function http_post_form(form_id, url, callback_success, callback_error = () => {}){
  let form = document.getElementById(form_id)
  let form_data = new FormData(form);
  let form_object = {};
  form_data.forEach((value, key) => form_object[key] = value);
  http_post_json(form_object, url, callback_success, callback_error)
}

function http_post_json(object, url, callback_success, callback_error) {
  const XHR = new XMLHttpRequest()
  // // Define what happens on successful data submission
  // XHR.addEventListener( 'load', callback_success);

  // // Define what happens in case of error
  // XHR.addEventListener(' error', callback_error);
  
  XHR.onreadystatechange = function() {
      if (XHR.readyState == XMLHttpRequest.DONE) {
          if(XHR.status == 200){
              callback_success(JSON.parse(XHR.responseText))
          }else{
              callback_error(JSON.parse(XHR.statusText))
          }
      }
  }
  // Set up our request
  XHR.open( 'POST', url );
  XHR.setRequestHeader( 'Content-Type', 'application/json' );
  
  XHR.send(JSON.stringify(object));
}

export { http_post_form, http_post_json, http_get }