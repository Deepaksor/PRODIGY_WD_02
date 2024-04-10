let startTime;
    let running = false;
    let interval;
    let records = [];

    function startStop() {
        if (running) {
            running = false;
            clearInterval(interval);
            document.getElementById('startStopButton').innerText = 'Start';
        } else {
            running = true;
            startTime = new Date() - (interval ? interval : 0);
            interval = setInterval(updateStopwatch, 10);
            document.getElementById('startStopButton').innerText = 'Stop';
        }
    }

    function reset() {
        running = false;
        clearInterval(interval);
        document.querySelector('.stopwatch').innerText = '00:00:00.000';
        document.getElementById('startStopButton').innerText = 'Start';
        records = [];
        updateRecordsList();
    }

    function recordTime() {
        if (running) {
            const elapsedTime = new Date() - startTime;
            records.push(formatTime(elapsedTime));
            updateRecordsList();
        }
    }

    function updateStopwatch() {
        const elapsedTime = new Date() - startTime;
        document.querySelector('.stopwatch').innerText = formatTime(elapsedTime);
    }

    function formatTime(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time % 3600000) / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        let milliseconds = Math.floor(time % 1000);

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        if (milliseconds < 10) milliseconds = '00' + milliseconds;
        else if (milliseconds < 100) milliseconds = '0' + milliseconds;

        return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
    }

    function updateRecordsList() {
        const recordsList = document.getElementById('recordsList');
        recordsList.innerHTML = '';
        records.forEach(function(record) {
            const li = document.createElement('li');
            li.textContent = record;
            recordsList.appendChild(li);
        });
    }