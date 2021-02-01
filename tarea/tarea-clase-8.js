/*# Tarea clase 8

A las 2 tareas de la clase 6, ponerles las validaciones que consideren
necesarias.

TIP: Las edades no pueden tener decimales.
*/

function validateMembersQuantity(integrantes) {
  if (integrantes === "") {
    return "Debe ingresar al menos un integrante";
  }

  if (integrantes <= 0) {
    return "Debe ingresar un numero mayor a 0";
  }

  return "";
}

function validateMembersAges(edadIntegrantes) {
  for (let i = 0; i < edadIntegrantes.length; i++) {
    if (edadIntegrantes[i].value <= 0) {
      return "Las edades deben ser valores positivos";
    }
  }
  return "";
}
//                                                                                      VALIDACIONES

function ValidateFormMembersQuantity(event) {
  const cantidadIntegrantes = $form["family-members"].value;

  const errorCantidadIntegrantes = validateMembersQuantity(cantidadIntegrantes);

  const errores = {
    "family-members": errorCantidadIntegrantes,
  };
  manejarErrores(errores);
}

function validateFormMembersAges() {
  const ages = document.querySelectorAll(".member");
  const errorEdadesIntegrantes = validateMembersAges(ages);

  const errors = {
    age: errorEdadesIntegrantes,
  };

  const exito = manejarErrores(errors) === 0;

  if (exito) {
    showResults();
  }
}

function manejarErrores(errores) {
  let cantidadErrores = 0;
  const $errores = document.querySelector("#errores");
  const keys = Object.keys(errores);
  keys.forEach(function (key) {
    const error = errores[key];
    if (key === "age" && error !== "") {
      const nodeList = $form[key];

      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.add("error");
      }
      createError(error);
      return cantidadErrores++;
    } else if (error) {
      console.log(error);
      $form[key].className = "error";
      createError(error);
      cantidadErrores++;
    } else {
      $form[key].className = "";
      const nodeList = $form[key];
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.remove("error");
      }
      $errores.className = "oculto";
    }
  });

  return cantidadErrores;
}

function createError(error) {
  resetError();
  const $errores = document.querySelector("#errores");
  const $ul = document.querySelector(".ulErrores");
  const $newLi = document.createElement("li");
  $newLi.className = "listError";
  $newLi.innerText = error;
  $ul.appendChild($newLi);
  $errores.className = "";
}

function resetError() {
  const $listError = document.querySelectorAll(".listError");
  for (let i = 0; i < $listError.length; i++) {
    $listError[i].remove();
  }
}
