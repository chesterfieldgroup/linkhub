// Fetch data from the JSON database
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const person = data.find(item => item.id === id);

        // Update the profile photo using the 'photo' path from the JSON
        const imgElement = document.querySelector('#profile-photo img');
        imgElement.src = person.photo;
        imgElement.alt = `Profile photo of ${person.name}`;

        document.getElementById('profile-name').textContent = person.name;
        document.getElementById('profile-role').textContent = person.role;
        document.getElementById('mobile').textContent = person.mobile;
        document.getElementById('email').textContent = person.email;
        document.getElementById('address').textContent = person.address;
        document.getElementById('linkedin').innerHTML = `<a href="${person.linkedin}" target="_blank">LinkedIn Profile</a>`;
        
        const addContactBtn = document.getElementById('addContactBtn');
        // Assuming you have a function to check if the person is already in the contact book
        if (isPersonInContactBook(person)) {
            addContactBtn.textContent = 'Already in contact book';
            addContactBtn.disabled = true;
        }
    })
    .catch(error => console.error('Error fetching data: ', error));
