const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

const getWeather = (address) => {
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
          return  message1.textContent = data.error
        }
        message1.textContent = 'Location: ' + data.location
        message2.textContent = 'Forecast: ' + data.forecast
    })
})
}



document.querySelector('form').addEventListener('submit' , (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2 .textContent = ''
   getWeather(e.target[0].value)
    
})