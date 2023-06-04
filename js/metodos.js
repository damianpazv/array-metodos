// import { successAlert } from "./utils.js";

//successAlert("hola")
 
/*const paisesLatinoamerica = [
     {
       nombre: "Argentina",
      ubicacion: "Sur de Sudamérica",
      habitantes: 45000000,
      capital: "Buenos Aires",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
      continente: "America",
    },
    {
      nombre: "Bolivia",
      ubicacion: "Centro de Sudamérica",
      habitantes: 11000000,
      capital: "La Paz"
    },
    {
      nombre: "Brasil",
      ubicacion: "Este de Sudamérica",
      habitantes: 211000000,
      capital: "Brasilia"
    },
    {
      nombre: "Chile",
      ubicacion: "Sur de Sudamérica",
      habitantes: 19000000,
      capital: "Santiago"
    },
    {
      nombre: "Colombia",
      ubicacion: "Norte de Sudamérica",
      habitantes: 50340000,
      capital: "Bogotá"
    },
    {
      nombre: "Costa Rica",
      ubicacion: "Centroamérica",
      habitantes: 5100000,
      capital: "San José"
    },
    {
      nombre: "Cuba",
      ubicacion: "El Caribe",
      habitantes: 11400000,
      capital: "La Habana"
    },
    {
      nombre: "Ecuador",
      ubicacion: "Oeste de Sudamérica",
      habitantes: 17300000,
      capital: "Quito"
    },
    {
      nombre: "El Salvador",
      ubicacion: "Centroamérica",
      habitantes: 6500000,
      capital: "San Salvador"
    },
    {
      nombre: "Guatemala",
      ubicacion: "Centroamérica",
      habitantes: 18200000,
      capital: "Ciudad de Guatemala"
    },
    {
      nombre: "Honduras",
      ubicacion: "Centroamérica",
      habitantes: 10000000,
      capital: "Tegucigalpa"
    },
    {
      nombre: "México",
      ubicacion: "Norte de América Central",
      habitantes: 128900000,
      capital: "Ciudad de México"
    },
    {
      nombre: "Nicaragua",
      ubicacion: "Centroamérica",
      habitantes: 6400000,
      capital: "Managua"
     },
     {
       nombre: "Panamá",
       ubicacion: "Centroamérica",
       habitantes: 4300000,
       capital: "Ciudad de Panamá"
     },
     {
       nombre: "Paraguay",
       ubicacion: "Centro de Sudamérica",
       habitantes: 7200000,
       capital: "Asunción"
     },
   ] */




const paisesLatinoamerica= JSON.parse(localStorage.getItem("paises"))  || [];

let copiaArray=[...paisesLatinoamerica];


const tableBodyHTML = document.getElementById("tableBody");
const countriesform=document.getElementById("paises-form");
const buttonForm= document.getElementById("formButton");

let editIndex;

function renderizarTabla(arraydePaises)

{
  tableBodyHTML.innerHTML="";
  
  arraydePaises.forEach((pais, index) =>  {

    const posicion = String(index + 1).padStart(2, '0');
    
    let paisImage= pais.imagen ? pais.imagen : "/assets/images/default.jpg";
    
    tableBodyHTML.innerHTML += `<tr>
                                    <td><img class="pais-img" src="${paisImage}"></td>
                                    <th scope="row">${posicion}</th>
                                    <td>${pais.nombre}</td>
                                    <td>${pais.capital}</td>
                                    <td>${pais.habitantes}</td>
                                    <td>${pais.ubicacion}</td>
                                    <td>
                                    <button class="btn btn-warning" onclick="borrarPais(${pais.id})"><i class="fa-solid fa-trash"></i></button>
                                    <button class="btn btn-info" onclick="editarPais(${pais.id})"><i class="fa-solid fa-edit"></i></button>
                                    </td>
                                    
                                </tr>`;
})
}
//renderizarTabla(paisesLatinoamerica);
function pintarpaisesOriginales(){
  //copiaArray=[...paisesLatinoamerica];
  renderizarTabla(paisesLatinoamerica);
  
  poblacionTotal(paisesLatinoamerica);

} ;


function aplicarFiltroNombre(eventoHTML)
{
const valorfiltro=eventoHTML.target.value.toLowerCase();

const paisesFiltrados=paisesLatinoamerica.filter(function(pais)
{
  const nombrePais=pais.nombre.toLowerCase();
  if(nombrePais.includes(valorfiltro))
  return true
})
renderizarTabla(paisesFiltrados);
poblacionTotal(paisesFiltrados);
}


function borrarPais(id)
{
  
  // copiaArray.splice(indice,1);
  // renderizarTabla(copiaArray);
  // poblacionTotal(copiaArray);

  

  const idx=paisesLatinoamerica.findIndex(pais=>pais.id === id)
  paisesLatinoamerica.splice(idx,1);
  localStorage.setItem("paises",JSON.stringify());
  renderizarTabla(paisesLatinoamerica);
}


function poblacionTotal(paises)
{

  const acumulacion= paises.reduce(function(acumulador,pais)
  {
    acumulador += pais.habitantes;
    return acumulador;
  },0)
  const populationCell= document.getElementById("total");
  populationCell.innerText=acumulacion;
}
function agregarEditarPais(evt)
{

  evt.preventDefault();
  
 
  
const el= evt.target.elements;

  const nuevoPais=
  {
    nombre: el.nombre.value,
    ubicacion: el.ubicacion.value,
    habitantes: el.habitantes.valueAsNumber,
    capital: el.capital.value,
    imagen: el.imagen.value,
    continente:el.continente.value,
    active:el.active.checked,
    id: Date.now()

  }

  if(editIndex)
  {
    paisesLatinoamerica[editIndex]=nuevoPais;
    editIndex=undefined;

    localStorage.setItem("paises",JSON.stringify(paisesLatinoamerica));

  }
  else
  {
    paisesLatinoamerica.push(nuevoPais);


localStorage.setItem("paises",JSON.stringify(paisesLatinoamerica));

  }


renderizarTabla(paisesLatinoamerica);

evt.target.reset()
el.nombre.focus()





}
function editarPais(id)
{

let pais=paisesLatinoamerica.find((pais,idx)=>{
  if(pais.id === id){
  editIndex= idx;
  return true;
  }
});

let el= countriesform.elements;

el.nombre.value= pais.nombre;
el.capital.value= pais.capital;
el.ubicacion.value= pais.ubicacion;
el.habitantes.value= pais.habitantes;
el.imagen.value= pais.imagen;
el.continente.value= pais.continente;
el.active.value= pais.active;

buttonForm.innerHTML=`  <button type="submit" class="btn btn-info">editar pais</button>`;



};



countriesform.addEventListener("submit",function(evt)
{

agregarEditarPais(evt);


})




