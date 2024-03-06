fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const person = data.find(item => item.id === id);

        // Check if the person object is found
        if (!person) {
            console.error('Person not found');
            // Handle the person not found case
            return;
        }

        // Update the profile photo using the 'photo' path from the JSON
        const imgElement = document.querySelector('#profile-photo img');
        if (imgElement) { // check if imgElement exists
            imgElement.src = person.photo;
            imgElement.alt = `Profile photo of ${person.name}`;
        }

        document.getElementById('profile-name').textContent = person.name;
        document.getElementById('profile-role').textContent = person.role;
        document.getElementById('mobile').textContent = person.mobile;
        document.getElementById('email').textContent = person.email;
        document.getElementById('address').textContent = person.address;
        
        // Update LinkedIn link safely
        const linkedInElement = document.getElementById('linkedin');
        linkedInElement.textContent = ''; // Clear previous content
        const linkedInLink = document.createElement('a');
        linkedInLink.href = person.linkedin;
        linkedInLink.textContent = 'LinkedIn Profile';
        linkedInLink.target = '_blank';
        linkedInElement.appendChild(linkedInLink);
        
        const addContactBtn = document.getElementById('addContactBtn');
        // Assuming you have a function to check if the person is already in the contact book
        if (isPersonInContactBook(person)) {
            addContactBtn.textContent = 'Already in contact book';
            addContactBtn.disabled = true;
        } else {
            addContactBtn.textContent = 'Add to contact book'; // or some other default text
            addContactBtn.disabled = false;
            // Add any additional event listeners here if necessary
        }
    })
    .catch(error => console.error('Error fetching data: ', error));
