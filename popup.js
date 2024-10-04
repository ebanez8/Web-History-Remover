document.getElementById('deleteButton').addEventListener('click', function() {
    const searchString = document.getElementById('searchString').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    let startTime = new Date(startDate).getTime();
    let endTime = new Date(endDate).getTime();


    if (!endDate) {
        endTime = Date.now();
    }


    if (searchString) {
        chrome.runtime.sendMessage({
            action: 'deleteHistory',
            searchString: searchString,
            startTime: startTime,
            endTime: endTime
        }, function(response) {
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
