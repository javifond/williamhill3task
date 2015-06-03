;(function() {
  var httpRequest;
  //Handle load window event
  window.onload = function () {
    var spinner = new Spinner().spin();
    //Show spinner while tabs are build
    document.getElementById('loaderContainer').appendChild(spinner.el);
    makeRequest('data/menu.json');
  };

  /*
   * Name: makeRequest
   * Description: Implement the httpRequest
   * Paramenters:
   * url: (string) URL address to perfom the request
   */

  function makeRequest (url) {

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {}
      }
    }

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.open('GET', url, true);
    httpRequest.onreadystatechange = processContents;
    httpRequest.send(null);
  }

  /*
   * Name: processContents
   * Description: Process request on ready state changes
   */

  function processContents() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        new tabBuilder(httpRequest.responseText);
      }
      else {
        alert('There was a problem with the request.');
      }
    }
  }
})();