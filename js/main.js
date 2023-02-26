//Mostrar el carrito de compras al hacer click en el icono
iconoCarrito = document.getElementById("icono-carrito");
productosEnCarrito = document.getElementById("productos-en-carrito");

iconoCarrito.addEventListener("click", function mostrarCarrito(){
    productosEnCarrito.style.display = "block";
});

//Ocultar el carrito de compras al hacer click en la "X"
cerrar = document.getElementById("cerrar");

cerrar.addEventListener("click", function botonCerrar(){
    productosEnCarrito.style.display = "none";
});


//Varables que vamos a utilizar para darle funcionalidad a la pagina

let contenedorProductos = document.querySelector(".productos__contenedor");
let contenedorCarrito = document.querySelector(".contenedor__productos--producto");
let contenedorTotal = document.querySelector(".productos__contenedor--ptotal");
