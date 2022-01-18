window.onload = function () {
  showTable();
};
let _id=0;
function showTable() {
  //EJECUTAR UNA PETICIÓN GET A EL API REST
  axios
    .get("http://192.168.1.130:3000/usuarios", {
      responseType: "json",
    })
    .then(function (res) {
      if (res.status == 200) {
        var table = document.getElementById("tabla_usuarios");
        table.innerHTML=""


        //LEER LOS DATOS RECIBIDOS

        let usuarios = res.data;
        for (let i = 0; i < usuarios.length; i++) {
          let usuario = usuarios[i];

          //IMPRIMIR FILA EN LA TABLA
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = usuario.name;
          cell2.innerHTML = usuario.surname;

          cell3.innerHTML =
            '<i class="fas fa-trash-alt fa-2x" onClick="eliminarUsuario(\'' +
            usuario._id +
            "')\"></i>";
            cell4.innerHTML =
            '<i class="fas fa-edit fa-2x" data-bs-toggle="modal" data-bs-target="#modalEditar" onClick="editarUsuarioValores(\'' +
            usuario._id+
            "')\"></i>";
          
        }
      } else {
        console.log(res.status);
        //HACER VISIBLE EL DIV DE ERROR
        document.getElementById("main_error").classList.add("visible");
        document.getElementById("main_error").classList.remove("invisible");
      }
    })
    .catch(function (err) {
      //HACER VISIBLE EL DIV DE ERROR
      console.log(err);
      document.getElementById("main_error").classList.add("visible");
      document.getElementById("main_error").classList.remove("invisible");
    });
}

function editarUsuarioValores(id){
  axios
  .get("http://192.168.1.130:3000/usuarios/"+id, {
    responseType: "json",
  })
  .then(function (res) {
    if (res.status == 200) {
      _id=id;
      let data=res.data[0];
      console.log(data[0]);
      document.getElementById("txt_nombre_edit").value=data.name;
      document.getElementById("txt_apellido_edit").value=data.surname;
    } else {
      console.log(res.status);
      //HACER VISIBLE EL DIV DE ERROR
      document.getElementById("main_error").classList.add("visible");
      document.getElementById("main_error").classList.remove("invisible");
    }
  })
  .catch(function (err) {
    //HACER VISIBLE EL DIV DE ERROR
    console.log(err);
    document.getElementById("main_error").classList.add("visible");
    document.getElementById("main_error").classList.remove("invisible");
  });
}

function editarUsuario(){
  let name=document.getElementById("txt_nombre_edit").value;
  let surname=document.getElementById("txt_apellido_edit").value;
  axios
    .put("http://192.168.1.130:3000/usuarios/"+_id, {
      name: name,
      surname: surname,
    })
    .then(function (response) {
      $("#modalEditar").modal("hide");
      showTable();
    })
    .catch(function (error) {
      console.log(error);
    });

}
function eliminarUsuario(id) {
  axios
    .delete("http://192.168.1.130:3000/usuarios/" + id, {})
    .then(function (response) {
      alert("Borrado");
      showTable();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function anadirUsuario() {
  let nombre = document.getElementById("txt_nombre").value;
  let apellido = document.getElementById("txt_apellido").value;

  axios
    .post("http://192.168.1.130:3000/usuarios", {
      name: nombre,
      surname: apellido,
    })
    .then(function (response) {
      $("#modalAnadir").modal("hide");
      showTable();
    })
    .catch(function (error) {
      console.log(error);
    });
}
