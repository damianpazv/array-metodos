const paisesLatinoamerica = [
    {
      nombre: "Argentina",
      ubicacion: "Sur de Sudamérica",
      habitantes: 45000000,
      capital: "Buenos Aires"
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
  ]

let copiaArray=[...paisesLatinoamerica];


const tableBodyHTML = document.getElementById("tableBody");

function renderizarTabla(arraydePaises)

{
  tableBodyHTML.innerHTML="";
  
  arraydePaises.forEach((pais, index) =>  {

    const posicion = String(index + 1).padStart(2, '0');
    
    tableBodyHTML.innerHTML += `<tr>
                                    <th scope="row">${posicion}</th>
                                    <td>${pais.nombre}</td>
                                    <td>${pais.capital}</td>
                                    <td>${pais.habitantes}</td>
                                    <td>${pais.ubicacion}</td>
                                    <td>
                                    <button class="btn btn-warning" onclick="borrarPais(${index})"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                    
                                </tr>`;
})
}

function pintarpaisesOriginales(){
  copiaArray=[...paisesLatinoamerica];
  renderizarTabla(paisesLatinoamerica);
  
  poblacionTotal(paisesLatinoamerica);

} 


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


function borrarPais(indice)
{
  
  copiaArray.splice(indice,1);
  renderizarTabla(copiaArray);
  poblacionTotal(copiaArray);
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

