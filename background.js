chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'deleteHistory') {
        const searchString = request.searchString.toLowerCase();
        const startTime = request.startTime || 0;  // Use 0 as default if no startTime is provided
        const endTime = request.endTime || Date.now();  // Use current time if no endTime is provided
        
        // Search browser history with a date range
        chrome.history.search({
            text: searchString,
            startTime: startTime,
            endTime: endTime
        }, function(results) {
            let deletedCount = 0;

            results.forEach(function(entry) {
                if (entry.url.toLowerCase().includes(searchString)) {
                    // Delete each matching entry
                    chrome.history.deleteUrl({ url: entry.url }, function() {
                        deletedCount++;
                    });
                }
            });

            // Return a success response after processing
            sendResponse({ success: true, deleted: deletedCount });
        });

        // Keep message channel open for async response
        return true;
    }
});
