import fetchJsonp from 'fetch-jsonp';
import{isValidZip} from './validate';
import{showAlert} from './validate';


const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimals);

// Fetch Animals From API
function fetchAnimals(e) {
  e.preventDefault();

  // Get User Input
  const animal = document.querySelector('#animal').value;
 const zip = document.querySelector('#zip').value;

 // validate the zip

 if(!isValidZip(zip)){
     showAlert('please enter a valid zipcode','danger');
     return
 }


 console.log(animal);
 console.log(zip);

 //Fetch Pets
 
 fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=cb86975c4b73c8fad7b22c23e73baf82&animal=${animal}&location=${zip}&callback=callback`,{
     jsonpCallbackFunction:'callback'
 })
 .then(res => res.json())
 .then(data =>showAnimals(data.petfinder.pets.pet))
 .catch(err => console.log(err));
}



// Shows the listing of animals

function showAnimals(pets){
    const results = document.querySelector('#results');

    // clear the previous submit to do another api call

    results.innerHTML =('');
// Loop through the pets
  pets.forEach((pet) =>{
     console.log(pet);
      const div = document.createElement('div');
      // To add a class to the div
      div.classList.add('card','card-body','mb-3');
      div.innerHTML =` <div class ="row">
                        <div class="col-sm-6">
                        <h4>${pet.name.$t}(${pet.age.$t})</h4>
                         ${pet.breeds.breed.$t ? `<p class="text-secondary"> ${pet.breeds.breed.$t} </p>` :`Unknown Breed`}
                         <p> ${pet.contact.city.$t} || ${pet.contact.state.$t} || ${pet.contact.zip.$t} </p>
                         
                         <ul class="list-group">
                          ${
                              pet.contact.phone.$t ?`<li class="list-group-item">Phone: ${pet.contact.phone.$t} </li>`:``
                          }
                         <li class="list-group-item"> Shelter Id: ${pet.shelterId.$t} </li>
                         </ul>

                         <p class="mt-2">${pet.description.$t} </p>
                        </div>

                        <div class="col-sm-6 text-center">
                           <img class="img-fluid rounded-circle mt-2" src ="${pet.media.photos.photo[3].$t}">
                        </div>
                       </div>`;

      results.appendChild(div);
  })
}