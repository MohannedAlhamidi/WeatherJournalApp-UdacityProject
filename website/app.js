// Create a new date instance dynamically with JS
const date = new Date();
const newDate = (date.getMonth()+1) + '.' + date.getDate() + '.' + date.getFullYear();

// Personal API Key for OpenWeatherMap API
const Url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const Key = '&appid=69227720e724845f50fea84399a69ba8';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', click);

/* Function called by event listener */
function click (event) {
    // storing the zip code and the feelings values
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

/* Function to GET Web API Data*/
getInfo(Url+zip+Key)
.then(
    data => {
        return postInfo('/post', {
            temp: data.main.temp,
            location: data.name,
            date: newDate,
            content: feelings
        })
    })
        .then(function () {
                return getInfo('/get')
            }
        )
        .then(
            async () => {
                const request = await fetch('/get');
                try {
                    const newData = await request.json();
                    document.getElementById('date').innerHTML = newData.date;
                    document.getElementById('temp').innerHTML = newData.temp + '  in ' + newData.location;
                    document.getElementById('content').innerHTML = newData.content;
                } 
                catch (error) {
                    console.log('error', error)
                }
            }
        )
        .then(
            clearForm());
}

// function to clear input fields
function clearForm () {
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value = '';
}

/* Function to POST data */
const postInfo = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    try {
        return await response.json();
    } catch (error) {
        console.log('error', error)
    }
};

/* Function to GET Project Data */
const getInfo = async (url = '') => {
    const response = await fetch(url);
    try {
        return await response.json();
    } catch (error) {
        console.log('error', error)
    }
};
