const sayHello = firebase.functions().httpsCallable("sayHello");
document.getElementById("text").innerHTML = "Hola";
sayHello({ name: "Ulises" }).then((result) => {
  console.log(result.data);
  document.getElementById("text").innerHTML = result.data;
});
