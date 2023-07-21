// alert('BIENVENIDOS A LA COMPRA ONLINE Exclusiva de Resortes y Amortiguadores')
// const comprarProductos = () => {
//     let producto = ''
//     let cantidad = 0
//     let precio = 0
//     let subtotal = 0
//     let seguirComprando = true

//     // Nan --> not a number

//     do {
//         producto = prompt('¿Queres comprar amortiguadores, resortes o ambos?')
//         cantidad = parseInt(prompt('Ingresa la cantidad deseada.'))

//         let cantidadValidada = validarCantidad(cantidad)

//         // Coerción de tipos 
//         // if (2 == '2') {
//         // console.log('Dentro del if');
//         // }
//         // == Operador de igualdad
//         // === Operador de igualdad estricta
//         // No solamente compara los valores sino también compara los tipos de datos
//         // if (2 === '2') {
//         //   console.log('Dentro del if');
//         // }


        
//         switch (producto) {
//             case 'amortiguadores':
//                 precio = 4000
//                 break;
//             case 'resortes':
//                 precio = 3300
//                 break;
//             case 'ambos':
//                 precio = 7300
//                 break;
//             default:
//                 alert('los datos ingresados no son correctos')
//                 precio = 0
//                 cantidadValidada = 0
//                 break;
//         }
//         subtotal += precio * cantidadValidada 

//         seguirComprando = confirm('¿Desea seguir comprando?') //con este metodo confirm logro q el usuario me setee true o false esta variable
//     } while (seguirComprando);
//     return subtotal
 
//  }; //convencion para usar arrow function

//  const validarCantidad = (cantidad) => {
//     while (Number.isNaN(cantidad) || cantidad === 0 ||cantidad < 0) { // operador de igualdad estricta. no solo compara el dato sino el Tipo de dato∫
//         alert('Debe ingresar una cantidad valida')
//         cantidad = parseInt(prompt('Vuelve a ingresar la cantidad deseada.'))
//     }
//     return cantidad
//  };

//  //comprarProductos debe estar al final pq sino  la funcion validadCantidad nunca es leida
// let resultado = comprarProductos();

// //Calcular descuentos
// //Calcular cuotas
// //Calcular envios


// let resultado2 = calcularEnvios()

// total = resultado - resultado1 + resultado2

// alert('El total de su compra es $'+ total);

// alert('El costo del envio es: $' + resultado2);
alert('BIENVENIDOS A LA COMPRA ONLINE de Articulos de Suspensión para su Vehículo')
//creamos un array vacio para el carrito de compras
const carrito = [];
//ordenar productos de menor a mayor precio
const ordenarMenorMayor = () => {
    productos.sort((a,b)=> a.precio - b.precio)
    //console.log(productos);
    mostrarListaOrdenada();
}
// Ordenar productos de mayor a menor precios
const ordenarMayorMenor = () => {
    productos.sort((a,b)=> b.precio - a.precio)
    mostrarListaOrdenada();
}

const mostrarListaOrdenada= () => {
    const listaOrdenada = productos.map(productos =>{
        return '- '+productos.nombre +' $'+productos.precio
    });
    alert('Lista de Precios:'+'\n\n'+listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)
}
const agregarAlCarrito = (producto, productoCantidad) =>{
    const productoId = producto.id
    const productoRepetido = carrito.find(producto => producto.id == productoId)
    if (!productoRepetido){          // utilizo ! ya que prefiero definir primero el push, siendo un resultado undefined se lo considera falsy.
        //agrego al carrito
        producto.cantidad += productoCantidad
        producto.stock -=productoCantidad
        carrito.push(producto)
    } else {      
        //aumento la cantidad
       productoRepetido.cantidad += productoCantidad
       producto.stock -=productoCantidad
    }
}

const comprarProductos = (listaOrdenada) => {
    let otroProducto = false
    let productoNombre = ''
    let productoCantidad = ''

    do {
        productoNombre = prompt('¿Cuál/cuáles es/son los productos que desea adquirir'+'\n\n'+listaOrdenada.join('\n'))
        productoCantidad = parseInt(prompt('¿cuántos desea adquirir?'))
        const estaProducto = productos.some(producto => producto.nombre.toLowerCase() == productoNombre.toLowerCase())
        //console.log(estaProducto);
        if (estaProducto){
            //debo agregarlo al carrito de compras
            const producto = productos.find(producto => producto.nombre.toLowerCase() == productoNombre.toLowerCase())
            agregarAlCarrito(producto, productoCantidad)
        }
        else{
            alert('el producto no esta disponible')
        }
        otroProducto = confirm('¿desea continuar agregando productos al carrito de compras?');
    } while (otroProducto);
    const totalCantidad = carrito.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
    }, 0);
    const list = carrito.map((producto)=>{
        return `\n- ${producto.nombre}: $ ${producto.precio} cantidad ${producto.cantidad} .` 
    });
    const calcularDescuentos = () => {
        let descuentos = 0
        let formaPago = ''
        let cuotas = totalCantidad/3
        let sindescuento = true
        do {
            formaPago = prompt('Ingrese si abono en Efectivo (20% descuento) o Tarjeta (tiene 3 cuotas sin interes)')
            
            switch (formaPago.toLowerCase()) {
                case 'efectivo':
                    descuentos = 20
                    break;
                case 'tarjeta':
                    descuentos = 0
                    alert('Sus cuotas son de '+ cuotas)
                    break
                default:
                    alert('No ingreso una forma de pago valida.')
                    descuentos = 0
                    break;
            }
    
            subdesc = (descuentos * totalCantidad)/100
            sindescuento = confirm('Su descuento es de $' + subdesc + ' .Eligio la forma de pago ' + formaPago.toUpperCase() + ' ¿es correcto?')
        } while(formaPago = '')
        return descuentos
    };
    let descTotal = calcularDescuentos();
    let resultado = totalCantidad - subdesc;
    alert('Su carrito contiene: '+list+'\n'+'El valor total de su compra es $'+ resultado);
}

ordenarMenorMayor();


const calcularEnvios = () => {
    let zona = ''
    let envio = 0
    zona = prompt('Tenemos envìos para CABA y AMBA. Sino sera derivado a un servicio expreso')
    switch (zona) {
        case 'CABA':
            envio = 2000
            break;
        case 'AMBA':
            envio = 3000
            break;
        default:
            alert('Ud sera derivado al servicio Expreso del correo argentino')
            break;
    }
    return envio
};
let envioFinal = calcularEnvios();





// console.log(carrito);
// console.log(productos);


alert('costo de envio es: $'+envioFinal);


// const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
// // const totalPrecio = carrito.reduce()
// console.log(totalCantidad);
// console.log(carrito);
// console.log(productos);
// ordenarMenorMayor();