document.getElementById('deleteButton').addEventListener('click', function() {
    const searchString = document.getElementById('searchString').value;

    if (searchString) {
        // Send the search string to the background script for processing
        chrome.runtime.sendMessage({ action: 'deleteHistory', searchString: searchString }, function(response) {
            if (response.success) {
                alert('History entries containing "' + searchString + '" have been deleted.');
            } else {
                alert('Error occurred while deleting history.');
            }
        });
    } else {
        alert('Please enter a search string.');
    }
});
