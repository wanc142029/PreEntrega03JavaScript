
let productosIngresados = localStorage.getItem("Carrito");
    console.log(productosIngresados)
    productosIngresados = JSON.parse(productosIngresados);
let eliminarProducto = document.querySelectorAll(".carritoProductoEliminar");
const mensajeVacio = document.getElementById("mensajeVacio");
const tarjetaProductos = document.getElementById("tarjetaProductos");
const tarjetaAcciones = document.getElementById("tarjetaAcciones");
const valorTotal = document.querySelector("#total");
const mensajeCompras = document.getElementById("mensajeCompra");
const vaciarcarrito = document.querySelector(".vaciarcarrito");
const comprar = document.querySelector(".carritoComprar");

function cargarTarjetas(){

    if(productosIngresados && productosIngresados.length >0){

        mensajeVacio.classList.add("oculto");
        tarjetaProductos.classList.remove("oculto");
        tarjetaAcciones.classList.remove("oculto");
        mensajeCompras.classList.add("oculto");
    
    
        tarjetaProductos.innerHTML = "";
    
        productosIngresados.forEach(producto => {
    
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("carritoProducto");
            tarjeta.innerHTML = `
            <img class="imgCarProductos" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="carritoTituloProducto">
                            <small>Nombre</small>
                            <h3>${producto.titulo}</h3>
                        </div>
                        <div class="carritoCantidadProducto">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carritoPrecioProducto">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carritoSubTotalProducto">
                            <small>SubTotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <button class="carritoProductoEliminar" id="${producto.id}"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
            
            `;
    
            tarjetaProductos.append(tarjeta);
            
        });
    
    }else{
    
        mensajeVacio.classList.remove("oculto");
        tarjetaProductos.classList.add("oculto");
        tarjetaAcciones.classList.add("oculto");
        mensajeCompras.classList.add("oculto");
    
    
    
    }

    eliminarProductos();
    totalCompra();

}

cargarTarjetas();


function eliminarProductos(){
    eliminarProducto = document.querySelectorAll(".carritoProductoEliminar");

    eliminarProducto.forEach(borrar =>{
        borrar.addEventListener("click",borrarProductos);
    });
}

function borrarProductos(e){
    const btnId = e.currentTarget.id;
    const indice = productosIngresados.findIndex(producto => producto.id === btnId);
    productosIngresados.splice(indice,1);
    cargarTarjetas();

    localStorage.setItem("Carrito", JSON.stringify(productosIngresados));


}

function eliminarTodaLaCompra(){
    productosIngresados.length = 0;
    localStorage.setItem("Carrito", JSON.stringify(productosIngresados));
    cargarTarjetas();

}

vaciarcarrito.addEventListener("click",eliminarTodaLaCompra);

function totalCompra(){
    const valor = productosIngresados.reduce((cuenta,producto) => cuenta + (producto.precio * producto.cantidad),0);
    valorTotal.innerText =`$${valor}`;

}

function realizarCompra(){
    productosIngresados.length = 0;
    localStorage.setItem("Carrito", JSON.stringify(productosIngresados));
    
        mensajeVacio.classList.add("oculto");
        tarjetaProductos.classList.add("oculto");
        tarjetaAcciones.classList.add("oculto");
        mensajeCompras.classList.remove("oculto");

}

comprar.addEventListener("click",realizarCompra);