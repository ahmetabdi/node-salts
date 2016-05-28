var page = require('webpage').create();

var url = 'http://www.filepup.net/files/wFhKlUT1464085261';

page.settings.userAgent = 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25';
page.customHeaders = {'Referer': 'localhost'};

page.onResourceRequested = function (request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function(item) {
      console.log('  ', item.file, ':', item.line);
  });
};
page.onResourceReceived = function(response) {
  if (response.stage !== "end") return;
  console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + response.url);
};
page.onUrlChanged = function(targetUrl) {
  console.log('New URL: ' + targetUrl);
};
page.onLoadFinished = function(status) {
  console.log('Load Finished: ' + status);
};
page.onLoadStarted = function() {
  console.log('Load Started');
};
page.onNavigationRequested = function(url, type, willNavigate, main) {
  console.log('Trying to navigate to: ' + url);
};
page.onConsoleMessage = function(msg) {
  console.log(msg);
}

page.open(url, function (status) {
  console.log("--------------------------START----------------------------");
  console.log("Opening " + url);
  console.log("Status: " + status);
  console.log("-------------------------END------------------------------");
  console.log(document);

  setTimeout(function(){
    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
      page.evaluate(function() {
        debugger;
        console.log('iframe')
        console.log($('iframe').html());
        console.log($('iframe').contents().html());
        console.log($('iframe').contents().find('body > script').html());
        console.log($('iframe').contents().find('body > script:nth-child(6)').html());
        console.log($('iframe').contents().find('body > script:nth-child(6)').html().match(/https?:\/\/[\S]+/g)[1]);
      });
      phantom.exit()
    });
  }, 5000);

  // setTimeout(function(){
  //   console.log("Screenshotting")
  //   if (status == 'success') {
  //     page.evaluate(function() {
  //       console.log("Filling in form...")
  //       // document.querySelector("#elInput_auth").value = "strixxd";
  //       // document.querySelector("#elInput_password").value = "xxx";
  //       // document.querySelector(".ipsButton.ipsButton_primary").click();
  //
  //       document.querySelector("iframe").click()
  //     });
  //   }
  //   page.render('example.png');
  //   phantom.exitz();
  // }, 5000);
});
