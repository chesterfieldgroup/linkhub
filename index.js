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
        document.getElementById('addContactBtn').textContent = `Add ${person.name} to contact book`;

        // Update LinkedIn link safely
        const linkedInElement = document.getElementById('linkedin');
        linkedInElement.textContent = ''; // Clear previous content
        const linkedInLink = document.createElement('a');
        linkedInLink.href = person.linkedin;
        linkedInLink.textContent = 'LinkedIn Profile';
        linkedInLink.target = '_blank';
        linkedInElement.appendChild(linkedInLink);
    })
    .catch(error => console.error('Error fetching data: ', error));


//function addToContactBook(){
//   vCard = Json fetch
//    when addContactBtn clicked, add contact to contact book of current user
//}