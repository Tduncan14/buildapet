//Validate a ZipCode

export function isValidZip(zip){
    return /^\d{5}(-\d{4})?$/.test(zip);
}

// Display alert message

export function showAlert(message,className){
    // create a div

    const div = document.createElement('div');

    // Add a class

    div.className = `alert alert-${className}`;
    // Add text

    div.appendChild(document.createTextNode(message));

    //Get container
    
    const container = document.querySelector('.container');

    //Gets the form

    const form = document.querySelector('#pet-form');
    // Insert Alert

    container.insertBefore(div,form);


    setTimeout(()=> document.querySelector(`.alert`).remove(),3000);

}