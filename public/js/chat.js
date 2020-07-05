const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');

socket.on('message', (message) => {
    console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');


    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, () => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = "";
        $messageFormInput.focus();
        console.log('Message delivered!');
    });
});

document.querySelector('#send-location').addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    $sendLocationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        const message = `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        socket.emit('sendLocation', message, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location Delivered!');
        });

    });
});

