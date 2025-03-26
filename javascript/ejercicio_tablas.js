const datos = [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      correo: "juan.perez@example.com",
      telefono: "123-456-7890",
      comentario: "Comentario de ejemplo"
    },
    {
      id: 2,
      nombre: "María",
      apellido: "García",
      correo: "maria.garcia@example.com",
      telefono: "987-654-3210",
      comentario: "Otro comentario de ejemplo"
    },
    {
      id: 3,
      nombre: "Carlos",
      apellido: "López",
      correo: "carlos.lopez@example.com",
      telefono: "456-789-1234",
      comentario: "Comentario adicional"
    },
    {
      id: 4,
      nombre: "Ana",
      apellido: "Martínez",
      correo: "ana.martinez@example.com",
      telefono: "654-321-9876",
      comentario: "Comentario interesante"
    },
    {
      id: 5,
      nombre: "Luis",
      apellido: "Ramírez",
      correo: "luis.ramirez@example.com",
      telefono: "789-123-4567",
      comentario: "Un comentario más"
    },
    {
      id: 6,
      nombre: "Sofía",
      apellido: "Hernández",
      correo: "sofia.hernandez@example.com",
      telefono: "321-987-6543",
      comentario: "Comentario breve"
    },
    {
      id: 7,
      nombre: "Miguel",
      apellido: "González",
      correo: "miguel.gonzalez@example.com",
      telefono: "147-258-3690",
      comentario: "Comentario largo"
    },
    {
      id: 8,
      nombre: "Laura",
      apellido: "Torres",
      correo: "laura.torres@example.com",
      telefono: "369-258-1470",
      comentario: "Comentario interesante"
    },
    {
      id: 9,
      nombre: "Daniel",
      apellido: "Sánchez",
      correo: "daniel.sanchez@example.com",
      telefono: "852-963-7410",
      comentario: "Comentario sobre algo"
    },
    {
      id: 10,
      nombre: "Valeria",
      apellido: "Flores",
      correo: "valeria.flores@example.com",
      telefono: "741-852-9630",
      comentario: "Último comentario"
    }
  ];

  tabla=document.querySelector("#tabla");

  function crearTabla(){
    var cadena="<table><thead>";
    cadena=cadena+"<tr><th>ID</th>";
    cadena=cadena+"<th>Nombre</th>";
    cadena=cadena+"<th>Apellido</th>";
    cadena=cadena+"<th>Correo</th>";
    cadena=cadena+"<th>Teléfono</th>";
    cadena=cadena+"<th>Comentario</th></tr></thead>";
    cadena=cadena+"<tbody>";

    for(const dato of datos){
        cadena=cadena+"<tr>";
        cadena=cadena+"<td>"+dato.id+"</td>";
        cadena=cadena+"<td>"+dato.nombre+"</td>";
        cadena=cadena+"<td>"+dato.apellido+"</td>";
        cadena=cadena+"<td>"+dato.correo+"</td>";
        cadena=cadena+"<td>"+dato.telefono+"</td>";
        cadena=cadena+"<td>"+dato.comentario+"</td>";
        cadena=cadena+"</tr>";
    }
    cadena=cadena+"</tbody>";
    cadena=cadena+"</table>";
    tabla.innerHTML=cadena;
  }
  
function agregarFila(){
    const id=document.getElementById("id").value;
    const nombre=document.getElementById("nombre").value;
    const apellido=document.getElementById("apellido").value;
    const correo=document.getElementById("correo").value;
    const telefono=document.getElementById("telefono").value;
    const comentario=document.getElementById("comentario").value;
    
    if(id && nombre && apellido && correo && telefono && comentario){
        let contenedor=document.querySelector('#tabla').getElementsByTagName('tbody')[0];
        const nuevaFila=contenedor.insertRow();

        nuevaFila.innerHTML=`
        <td>${id}</td>
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${correo}</td>
        <td>${telefono}</td>
        <td>${comentario}</td>
        `;
        document.getElementById("formulario").reset();
    }else{
        alert("Los datos no están completos");
    }

}
  crearTabla();