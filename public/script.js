// const form = document.getElementById('form');
// const submitBtn = document.getElementById('submitBtn');

// submitBtn.addEventListener('click', (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData.entries());

//     const url = '/test-result';

//     fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: data
//     })
//         .then(response => response.json())
//         .catch(error => {
//             console.error('Error sending data:', error); // Log errors
//         });
// });

function submitForm(event) {
    const form = document.getElementById('detailsForm');
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const url = '/test-result';

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error sending data:', error);
        });
}
