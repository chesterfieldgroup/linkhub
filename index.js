// Fetch the data.json file and process the response to JSON
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        // Extract the 'id' query parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id').trim(); // Ensure there's no extra whitespace

        // Debug: log the search operation
        console.log(`Searching for ID: '${id}'`);

        // Find the person object whose 'id' matches the 'id' query parameter
        const person = data.find(item => item.id === id);

        // If no matching person is found, log an error and exit the function
        if (!person) {
            console.error('Person not found for ID:', id);
            return;
        }

        // Update the page with the person's details
        // Note: Ensure that your HTML has elements with these specific IDs
        document.getElementById('profile-name').textContent = person.name;
        document.getElementById('profile-role').textContent = person.role;
        document.querySelector('#mobile .text-container').textContent = person.mobile;
        document.querySelector('#email .text-container').textContent = person.email;
        document.querySelector('#address .text-container').textContent = person.address;
        document.getElementById('addContactText').textContent = `Click Here ${person.name} to Contacts`;
        
        // For mobile, create an anchor element, set its attributes, and append it
        const mobileLink = document.createElement('a');
        mobileLink.setAttribute('href', `tel:${person.mobile}`);
        mobileLink.textContent = person.mobile;
        const mobileTextContainer = document.querySelector('#mobile .text-container');
        mobileTextContainer.textContent = ''; // Clear existing text content
        mobileTextContainer.appendChild(mobileLink);
        
        // For email, create an anchor element, set its attributes, and append it
        const emailLink = document.createElement('a');
        emailLink.setAttribute('href', `mailto:${person.email}`);
        emailLink.textContent = person.email;
        const emailTextContainer = document.querySelector('#email .text-container');
        emailTextContainer.textContent = ''; // Clear existing text content
        emailTextContainer.appendChild(emailLink);
        
        // For LinkedIn, update the text container with a link
        const linkedInTextContainer = document.querySelector('#linkedin .text-container');
        linkedInTextContainer.textContent = ''; // Clear existing content
        const linkedInLink = document.createElement('a');
        linkedInLink.setAttribute('href', person.linkedin);
        linkedInLink.textContent = 'LinkedIn Profile';
        linkedInLink.setAttribute('target', '_blank');
        linkedInTextContainer.appendChild(linkedInLink);
        
        // For the address, create a map link
        const addressLink = document.createElement('a');
        addressLink.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(person.address)}`);
        addressLink.textContent = 'View on Map';
        addressLink.setAttribute('target', '_blank'); // Open in new tab
        const addressTextContainer = document.querySelector('#address .text-container');
        addressTextContainer.textContent = ''; // Clear existing text content
        addressTextContainer.appendChild(addressLink);

        // Update the profile photo
        const imgElement = document.querySelector('#profile-photo img');
        if (imgElement) {
            imgElement.src = person.photo;
            imgElement.alt = `Profile photo of ${person.name}`;
        }

        // Add click event listener for the 'addContactBtn'
        // This has been moved inside the .then() to ensure 'person' is defined
        const addContactBtn = document.getElementById('addContactBtn');
        if (addContactBtn) {
            addContactBtn.addEventListener('click', function () {
                handleAddContact(person);
            });
        }
    })
    .catch(error => {
        // Log any errors that occur during the fetch operation
        console.error('Error fetching data: ', error);
    });

// This function will create a vCard string from the person data
function createVCard(person) {
    // Define the base URL for images
    const baseURL = 'https://chesterfieldgroup.github.io/linkhub/';

    // Construct the full URL by appending the partial path from person.photo
    const fullPhotoURL = baseURL + person.photo;

    // Determine the media type from the file extension
    const mediaType = person.photo.endsWith('.png') ? 'image/png' : 'image/jpeg';

    return [
        'BEGIN:VCARD',
        'VERSION:4.0', // Using vCard version 4.0 for better URL support
        `FN:${person.name}`,
        `TEL;TYPE=work,voice:${person.mobile}`,
        `EMAIL:${person.email}`,
        `ADR;TYPE=WORK:${person.address.replace(/,/g, ';')}`, // Formatting address for vCard 4.0
        `URL:${person.linkedin}`,
        `PHOTO;MEDIATYPE=${mediaType};VALUE=URI:${fullPhotoURL}`, // Using the full URL for the photo
        'END:VCARD'
    ].join('\n');
}

// This function triggers the download of a text file
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)); // Data URI scheme with encoded vCard text
    element.setAttribute('download', filename); // Set the filename for the download

    element.style.display = 'none'; // The element is hidden
    document.body.appendChild(element); // Add the element to the document

    element.click(); // Programmatically click the element to trigger the download

    document.body.removeChild(element); // Remove the element after triggering the download
}

// This function handles adding a contact depending on the platform
function handleAddContact(person) {
    // Generate a vCard from the person's data
    const vCard = createVCard(person);
    console.log(vCard);
    // Use a regular expression to detect if the user is on an iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        // For iOS Devices, use a data URI scheme to open the vCard text, prompting to add to contacts
        window.location.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`;
    } else {
        // For non-iOS devices, use the download function to save the vCard file
        download(`${person.name}.vcf`, vCard);
    }
    
}

// Add an event listener to the document to wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Once DOM content is loaded, get the addContactBtn element by its ID
    const addContactBtn = document.getElementById('addContactBtn');
    
    // Check if addContactBtn exists to avoid null reference errors
    if (addContactBtn) {
        // Add a click event listener to the addContactBtn
        addContactBtn.addEventListener('click', function () {
            // Call handleAddContact with the person object (assuming it is in scope)
            handleAddContact(person); // You should ensure 'person' is defined and contains the contact data
        });
    }
});