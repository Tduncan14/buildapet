import fetchJsonp from 'fetch-jsonp';


const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimals);

// Fetch Animals From API
function fetchAnimals(e) {
  e.preventDefault();

  // Get User Input
  const animal = document.querySelector('#animal').value;
 const zip = document.querySelector('#zip').value;

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
      const div = document.createElement('div');
      // To add a class to the div
      div.classList.add('card','card-body','mb-3');
      div.innerHTML =` <div class ="row">
                        <div class="col-sm-6">
                        <h4>${pet.name.$t}(${pet.age.$t})</h4>

                        </div>

                        <div class="col-sm-6">
                        </div>
                       </div>`;

      results.appendChild(div);
  })
}