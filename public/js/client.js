document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.resultMsg').innerHTML = ''
    const location = document.querySelector('form input').value;

    fetch(`/weather?address=${location}`)
        .then((result) => {
            return result.json();
        })
        .then((result) => {
            if (result.error) {
                document.querySelector('.resultMsg').innerHTML = result.error;
                return;
            }
            document.querySelector('.resultMsg').innerHTML =
                `<h3>Weather update of ${result.address}</h3>`;
            document.querySelector('.resultMsg').innerHTML +=
                `<p>Temperature in ${result.address} is ${result.temp}°C, pressure is ${result.pressure}hpa and humidity is ${result.humidity}%.</p>`;
        })
        .catch((err) => {
            document.querySelector('.resultMsg').innerHTML = err.message;
        });
});