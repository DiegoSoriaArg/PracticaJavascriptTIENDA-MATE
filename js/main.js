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
let contenedorProductos = document.querySelector(".contenedor__productos");
let contenedorCarrito = document.querySelector(".productos__contenedor");
let precioTotal = document.querySelector(".productos__contenedor--ptotal");
let totalProductos = document.querySelector(".carrito__total");

//creamos un array donde almacenaremos los productos en el carrito
let compras = [];
//contador de cantidad de productos para aumentar o reducir de acuerdo a lo que sea necesario
let contadorProductos = 0;
//contador de total de costo por los productos
let totalCarrito = 0;

//Funcionalidades

//accedemos al evento click de lo que captemos en el selector ".contenedor__producto"
contenedorProductos.addEventListener("click", function agregarProducto(e) {

  //con este metodo limpiamos lo que venga por defecto
  e.preventDefault();

  //aqui validamos si el selector esta activo y obtenemos el contenido (id)
  if (e.target.classList.contains("contenedor__productos--producto-boton")) {
    const productoSeleccionado = e.target.parentElement;
    recuperarContenido(productoSeleccionado);
  }
});

//accedemos al evento click de lo que captemos en el selector ".productos__contenedor"
contenedorCarrito.addEventListener("click", function eliminarProducto(e){

    //aqui validamos si el selector esta activo 
    if(e.target.classList.contains("eliminar-producto")) {
        //obtenemos el atributo "data-id" del elemento activo
        const idElimimar = e.target.getAttribute("data-id");

        //aqui recorremos el array de "compras" buscando coincidir algun id con el id captado anteriormente
        compras.forEach(value => {
            if(value.id == idElimimar) {
                //si en el paso anterior coinciden los IDs, captamos (transformados) los valores de precio y los multiplicamos por el valor de cantidad y almacenamos
                let eliminarPrecio = parseInt(value.precio) * parseInt(value.cantidad);
                //aqui restamos esos valores al total del carrito
                totalCarrito = totalCarrito - eliminarPrecio;
            }
        });

        //re-creamos el arreglo de compras filtrando al producto eliminado
        compras = compras.filter(producto => producto.id !== idElimimar);
        //restamos el producto a la cantidad acumulada
        contadorProductos--;
    }

    //si no hay roductos en el arreglo, volvemos los valores de precio y cantidad a 0
    if(compras.length === 0) {
        precioTotal.innerHTML = 0;
        totalProductos.innerHTML = 0;
    }

    //llamamos a la funcion de compras, la que creara el cuerpo del contenido en el HTML (div)
    comprasHtml();

});

function recuperarContenido(producto) {
    const informacionProducto = {
      imagen: producto.querySelector("div img").src,
      titulo: producto.querySelector(".contenedor__productos--producto-titulo").textContent,
      precio: producto.querySelector(".contenedor__productos--producto-precio-numero").textContent,
      id: producto.querySelector("a").getAttribute("data-id"),
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
        productoCarrito.classList.add("productos__contenedor--producto");
        productoCarrito.innerHTML = `
            <img src="${imagen}" alt="Mate imperial premium cincelado">
            <div class="productos__contenedor--producto-contenido">
                <h5>${titulo}</h5>
                <h5 class="productos__contenedor--producto-contenido-precio">${precio}</h5>
                <h6>Cantidad: ${cantidad}</h6>
            </div>
            <span data-id="${id}" class="eliminar-producto"><i class="fa-solid fa-trash eliminar-producto" data-id="${id}"></i></span>
            `;

        contenedorCarrito.appendChild(productoCarrito);
        precioTotal.innerHTML = totalCarrito;
        totalProductos.innerHTML = contadorProductos;
    });
}

function limpiarCarrito() {
    contenedorCarrito.innerHTML = "";
}
