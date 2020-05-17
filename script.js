let readyToLaunch= true;
let launchStatus;
let pilot,copilot,mass,fuel;
let faultyItems;
let missionTarget;
let index;
window.addEventListener("load",function(){
let button = document.getElementById("formSubmit");
launchStatus  = document.getElementById("launchStatus");
faultyItems = document.getElementById("faultyItems");
let forms = document.forms[0];
missionTarget = document.getElementById("missionTarget");

button.addEventListener("click",function(event){

let nullError = false;
let numberError = false;
    for (let i =0; i < forms.elements.length;i++)
    {

      if(forms.elements[i].type === "text")
      {

         if (forms.elements[i].value === "")
         {
            nullError = true;
            forms.elements[i].style.borderColor = "red";

         }
         else
         {
            forms.elements[i].style.borderColor = "green";
            if (forms.elements[i].name == "fuelLevel" || forms.elements[i].name == "cargoMass" )
            {
               if (isNaN(forms.elements[i].value))
               {
                numberError =true;
                  forms.elements[i].style.borderColor = "red";
                  //event.preventDefault();
               }
            }
            else
            {
               if (!isNaN(forms.elements[i].value))
               {
                  numberError = true;
                  forms.elements[i].style.borderColor = "red";
               }
            }
         }

      }
    }
if (nullError){alert("All fields are required")}
if (numberError){alert("Make sure to enter valid information for each field")}

if (!nullError && !numberError)
{
   launchMission();

}
event.preventDefault();
});
});

function launchMission()
{
   pilot = document.getElementById("pilotName").value;
   copilot = document.getElementById("copilotName").value;
   fuel = document.getElementById("fuelLevel").value;
   mass = document.getElementById("cargoMass").value;
   readyToLaunch = true
   if (fuel < 10000)
   {
      fuel = "There is not enough fuel for the journey";
      readyToLaunch = false;
   }
   else
   {
      fuel = "Fuel level high enough for launch";
   }

   if (mass > 10000)
   {
      mass = "There is too much mass for the shuttle to take off"
      readyToLaunch = false;
   }
   else
   {
      mass = "Cargo mass low enough for launch";
   }

   if (!readyToLaunch)
   {
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   }
   else
   {
      launchStatus.innerHTML = "Shuttle is ready for launch";
      launchStatus.style.color = "green";
      fetchPlanet();
   }


faultyItems.innerHTML =  `<ol>
    <li id="pilotStatus">Pilot ${pilot} is ready for launch</li>
    <li id="copilotStatus">Co-pilot ${copilot} is ready for launch</li>
    <li id="fuelStatus">${fuel}</li>
    <li id="cargoStatus">${mass}</li>
</ol>`

faultyItems.style.visibility = "visible";
}

function fetchPlanet()
{
   debugger;
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(promiseFetch){

   promiseFetch.json().then(function(promiseJSON){
   console.log(promiseJSON);

   index = Math.floor(Math.random() * promiseJSON.length);

   missionTarget.innerHTML = `<h2>Mission Destination</h2>
   <ol>
      <li>Name: ${promiseJSON[index].name}</li>
      <li>Diameter: ${promiseJSON[index].diameter}</li>
      <li>Star: ${promiseJSON[index].star}</li>
      <li>Distance from Earth: ${promiseJSON[index].distance}</li>
      <li>Number of Moons: ${promiseJSON[index].moons}</li>
   </ol>
   <img src="${promiseJSON[index].image}">`
   })
   })

}





