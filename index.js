// Fetch data from the JSON database
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Get the unique identifier from the URL parameter (assuming the URL is like example.com?id=001)
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        // Find the person in the data based on the id
        const person = data.find(item => item.id === id);

        // Update the HTML with person's details
        document.getElementById('profile-photo').textContent = person.name; // Assuming photo is text
        document.getElementById('profile-name').textContent = person.name;
        document.getElementById('profile-role').textContent = person.role;
        document.getElementById('mobile').textContent = person.mobile;
        document.getElementById('email').textContent = person.email;
        document.getElementById('address').textContent = person.address;
        document.getElementById('linkedin').innerHTML = `<a href="${person.linkedin}" target="_blank">LinkedIn Profile</a>`;
        
        // Change button text based on whether the person is already in contact book
        const addContactBtn = document.getElementById('addContactBtn');
        // Assuming you have a function to check if the person is already in the contact book
        if (isPersonInContactBook(person)) {
            addContactBtn.textContent = 'Already in contact book';
            addContactBtn.disabled = true; // Optionally disable the button
        }
    })
    .catch(error => console.error('Error fetching data: ', error));
