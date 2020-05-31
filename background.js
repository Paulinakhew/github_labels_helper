chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: 'github.com',
          pathSuffix: '/labels',
          schemes: ['https']
        },
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onPageChanged.addListener(function() {
  console.log("asdf");
})