// CASO ECOMMERCE
// DENTRO DE LA CARPETA DATA, HAY UN ARCHIVO products.js QUE PODEMOS UTILIZAR PARA EL DESARROLLO DE NUESTRA PREENTREGA
// 1) Tomar dos categorías de productos que deseen incorporar en su tienda y filtrar de entre todos los productos aquellos que cumplan con la categoría.
// 2) Mediante un alert, saludar al usuario y darles la bienvenida a su ecommerce.
// 3) Mediante un alert, visualizar las categorías de productos disponibles.
// 4) Mediante un prompt, mostrar la lista de productos disponibles ordenados de manera A-Z y preguntar qué producto quiere comprar.
// 5) Con el valor obtenido del punto 4, se deberá buscar el producto deseado y mediante un confirm, mostrar el nombre, descripción y precio del producto. Se deberá preguntar al usuario si se desea completar la compra. En caso de que no se encuentre el producto, se deberá dar la chance de ingresarlo nuevamente.
// 6) Con el valor obtenido del punto 5), se deberá visualizar un alert que agradezca la compra con una supuesta fecha de entrega -usando date-, en el caso de que la acepte, si la cancela, se agradecerá la interacción.



// Defino algunas constantes para ser utilizadas luego
const categoriasDeseadas = ["men's clothing", "women's clothing"];
const MENSAJE_BIENVENIDA = "¡Bienvenido a nuestro ecommerce!";
const MENSAJE_GRACIAS = "¡Gracias por visitarnos!";

// Tomo la lista de products y las categorias elegidas para devolver una nueva lista con los productos que cumplan con dicha categoria
function filtrarProductosPorCategoria(products, categories) {
    return products.filter(product => categories.includes(product.category));
}
// Luego ordeno la lista de manera A-Z con el metodo sort. Uso la funcion localecompare, comparando el item a con el b. 
function ordenarProductosPorTitulo(products) {
    return products.sort((a, b) => a.title.localeCompare(b.title));
}
// A continuacion tomo el array de productos ordenado y retorno la lista de productos con un index+1 para que mostrar una lista que empiece desde 1 y no 0.
function mostrarProductos(productosOrdenados) {
    return productosOrdenados.map((producto, index) => `${index + 1})- ${producto.title}`).join('\n');
}

// Defino funcion para calcular que la entrega no se haga un sabado o un domingo, sino dias habiles de la semana
function calcularFechaEntrega(diasHabiles) {
    let fechaEntrega = new Date();
    while (diasHabiles > 0) {
        fechaEntrega.setDate(fechaEntrega.getDate() + 1);
        // Si el día de la semana es diferente de 0 (domingo) y 6 (sábado), se reduce el contador de días hábiles
        if (fechaEntrega.getDay() !== 0 && fechaEntrega.getDay() !== 6) {
            diasHabiles--;
        }
    }
    return fechaEntrega;
}

// Se le pide al usuario elegir un producto de la lista, si el nro no es valido le pide que iontente nuevamente hasta que ingrese uno valido o cancele.

function obtenerProductoElegido(mensajeProductos, productosOrdenados) {
    let productoEncontrado = false;
    let productoElegido = prompt(`Estos son los productos disponibles, con entrega a domicilio en 5 días hábiles:\nELIJA EL NÚMERO DEL PRODUCTO\n${mensajeProductos}`);
    let productoSeleccionado;

    while (!productoEncontrado) {
        const numeroProductoElegido = parseInt(productoElegido);
        if (numeroProductoElegido > 0 && numeroProductoElegido <= productosOrdenados.length) {
            productoSeleccionado = productosOrdenados[numeroProductoElegido - 1];
            productoEncontrado = true;
            // En caso de cancelar la compra, pregunto al usuario si esta seguro.
        } else if (productoElegido === null) {
            const respuestaUsuario = confirm("¿Estas seguro que quieres salir?");
            if (respuestaUsuario) {
                alert(MENSAJE_GRACIAS);
                break;
            } else {
                productoElegido = prompt(`Estos son los productos disponibles:\n${mensajeProductos}\n¿Qué producto desea comprar?`);
            }
        } else {
            const respuestaUsuario = confirm("El número de producto seleccionado no es válido. ¿Desea intentarlo nuevamente?");
            if (respuestaUsuario) {
                productoElegido = prompt(`Estos son los productos disponibles:\n${mensajeProductos}\n¿Qué producto desea comprar?`);
                if (productoElegido === null) {
                    alert(MENSAJE_GRACIAS);
                    break;
                }
            } else {
                alert(MENSAJE_GRACIAS);
                break;
            }
        }
    }

    return productoSeleccionado;
}
// Creo la funcion para mostrarle al usuario los detalles del producto elegido y pregunto si desea realizar la compra. En caso de cancelar le muestro el alert. Si el usuario acepta se muestra el mensaje proporcionandole una fecha estimada de entrega.
function confirmarCompra(productoSeleccionado) {
    const confirmacionCompra = confirm(`Nombre: ${productoSeleccionado.title}\nDescripción: ${productoSeleccionado.description}\nPrecio: $${productoSeleccionado.price}\n¿Desea completar la compra?`);
    if (confirmacionCompra) {
        const fechaEntrega = calcularFechaEntrega(5);
        alert(`¡Gracias por su compra! La fecha estimada de entrega es ${fechaEntrega.toLocaleDateString()}.`);
    } else {
        alert(MENSAJE_GRACIAS);
    }
}

// Uso del código 
const productosFiltrados = filtrarProductosPorCategoria(products, categoriasDeseadas);
alert(MENSAJE_BIENVENIDA);
alert(`A continuacion encontraras:\n1- Ropa de hombre\n2- Ropa de mujer`);
const productosOrdenados = ordenarProductosPorTitulo(productosFiltrados);
const mensajeProductos = mostrarProductos(productosOrdenados);
const productoSeleccionado = obtenerProductoElegido(mensajeProductos, productosOrdenados);
// Compruebo si productoseleccionado es un objeto valido, Si es asi llama a la funcion confirmarcompra
if (productoSeleccionado) {
    confirmarCompra(productoSeleccionado);
}






