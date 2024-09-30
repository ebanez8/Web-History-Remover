chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'deleteHistory') {
        const searchString = request.searchString.toLowerCase();
        
        // Search browser history
        chrome.history.search({ text: searchString }, function(results) {
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
