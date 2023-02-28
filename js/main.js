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
let contenedorTotalProducto = document.querySelector(".carrito__total");

let compras = [];
let contadorProductos = 0;
let totalCarrito = 0;

//Funcionalidades

contadorProductos.addEventListener("click", function agregarProducto(e){
    e.preventDefault();

    if (e.target.classList.contains("contenedor__productos--producto-boton")) {
        const productoSeleccionado = e.target.parentElement;
        recuperarContenido(productoSeleccionado);
    }
});


contenedorCarrito.addEventListener("click", function eliminarProducto(e){
    if(e.target.classList("eliminar-producto")) {
        const idElimimar = e.target.getAtribute("data-id");

        compras.forEach(value => {
            if(value.id == idElimimar) {
                let eliminarPrecio = parseInt(value.precio) * parseInt(value.cantidad);
                totalCarrito = totalCarrito - eliminarPrecio
            }
        });

        compras = compras.filter(producto => producto.id !== idElimimar);
        contadorProductos--;
    }

    if(compras.length === 0) {
        precioTotal.innerHTML = 0;
        totalProductos.innerHTML = 0;
    }

    comprasHtml();

});

function recuperarContenido() {
    const informacionProducto = {
      imagen: producto.querySelector("div img").src,
      titulo: producto.querySelector(".contenedor__productos--producto-titulo").textContent,
      precio: producto.querySelector(".contenedor__productos--producto-precio").textContent,
      id: producto.querySelector("a").getAtribute("data-id"),
      cantidad: 1
    };

    totalCarrito = totalCarrito + parseInt(informacionProducto.precio);

    const validarId = compras.some(producto => producto.id === informacionProducto.id);

    if(validarId) {
        const nuevoCarrito = compras.map(producto => {
            if(producto.id === informacionProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        compras = [...nuevoCarrito];
    } else {
        compras = [...compras, informacionProducto];
        contadorProductos++;
    }

    comprasHtml();
}

function comprasHtml() {
    limpiarCarrito();
    compras.forEach(producto => {
        const {imagen, titulo, precio, id, cantidad} = producto;
        const productoCarrito = document.createElement("div");
        productoCarrito.classList.add("productos__contenedor");
        productoCarrito.innerHTML = `
            <img src="${imagen}" alt="Mate imperial premium cincelado">
            <div class="productos__contenedor--producto-contenido">
                <h5>${titulo}</h5>
                <h5 class="productos__contenedor--producto-contenido-precio">$${precio}</h5>
                <h6>Cantidad: ${cantidad}</h6>
            </div>
            <span><i class="fa-solid fa-trash"></i></span>`;
    });
}

function limpiarCarrito() {
    contenedorCarrito.innerHTML = "";
}
