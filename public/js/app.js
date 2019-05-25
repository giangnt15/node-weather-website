const weatherForm = document.querySelector('form')
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");



weatherForm.onsubmit = (event) => {
    event.preventDefault();
    const address = document.querySelector('input');
    message1.innerHTML = 'Loading...';
    message2.innerHTML = ''
    fetch(`/weather?address=${address.value}`).then(data => {
        data.json().then(data => {
            if (data.error){
                console.log(data.error)
                message1.innerHTML = '';
                message2.innerHTML = data.error
                return
            }
            message1.innerHTML =
                `<ul>
             <li>Address: ${data.address}</li>
             <li>Location: ${data.location}</li>
             <li>ForecastData: 
                <ul>
                    <li>Temperature: ${data.forecastData.temperature}</li>
                    <li>precipProbability: ${data.forecastData.precipProbability}</li>
                </ul>
             </li>
             
            </ul>`
        }).catch(error => {
            message1.innerHTML = ''
            message2.innerHTML = error
        })
    })
}