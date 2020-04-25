console.log('Client side javascript file is loaded')

var weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//messageOne.textContent = 'java no, node yes'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location =  search.value

    
    messageOne.textContent = "Loading"
    messageTwo.textContent = ""

    fetch('http://localhost/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.locationData
            }
        })
    })

})