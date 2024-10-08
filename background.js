chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'deleteHistory') {
        const searchString = request.searchString.toLowerCase();
        const startTime = request.startTime || 0;
        const endTime = request.endTime || Date.now(); 


        chrome.history.search({
            text: searchString,
            startTime: startTime,
            endTime: endTime
        }, function(results) {
            let deletedCount = 0;

            results.forEach(function(entry) {
                if (entry.url.toLowerCase().includes(searchString) || 
                    (entry.title && entry.title.toLowerCase().includes(searchString))) {
                    chrome.history.deleteUrl({ url: entry.url }, function() {
                        deletedCount++;
                    });
                }
            });

            sendResponse({ success: true, deleted: deletedCount });
        });

        return true;
    }
});
