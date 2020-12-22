let fs = require('fs'); // Requiero el módulo File System

let moduloProductos = { // Declaro el módulo productos como un objeto literal que contiene muchos métodos.

    leerJSON: function(){ // El primer método del módulo se encargará de:

        let listaDeProductos = fs.readFileSync('./productos.json', 'utf-8'); // Usar el método readFileSync para leer el archivo .json 
        
        let productos = JSON.parse(listaDeProductos); // parsear el json y guardarlo en una variable
        return productos // el método retorna un Array de objetos literales

    },

    escribirJSON: (nombreProducto, precio)=>{ // Método que se encargará de agregar un nuevo producto al .json y recibe dos parámetros

        let listaDeProductos = moduloProductos.leerJSON(); // declaro una variable que tendrá como valor lo que me retorna el método leerJson
        let lastId = 1 // declaro una variable que almacenará el valor del id del último producto en nuestra lista de productos
        
        listaDeProductos.map(function(producto){ // recorro con el método .map nuestro array de objetos.
            if(producto.id > lastId){ // éste condicional se encargará de preguntar sí, el id del elemento que está iterando es mayor al valor que tiene asignado la variable lastId...
                lastId = producto.id // se le asignará como valor el id de ese producto. Al finalizar de recorrer el array esa variable contendrá como valor el id del último producto. 
            }
        });
        
        let Producto = function(id, name, price){  // declaro una función constructora para el nuevo producto
            this.id = id,
            this.name = name,
            this.price = price
        };
        
        let nuevoProducto = new Producto(lastId + 1, nombreProducto, precio); // declaro la variable donde se creará el nuevo producto, al cual se le pasarán sus valores.
        listaDeProductos.push(nuevoProducto); // usando el método .push agrego al nuestra lista el nuevo producto.

        let productosActualizados = JSON.stringify(listaDeProductos); // con el método stringify convierto la lista a una cadena de texto tipo json 
        fs.writeFileSync('./productos.json', productosActualizados, 'utf-8') // con el método writeFileSync, escribo el json original con la lista actualizada.
    },
    filtrarJSON: (precioMinimo, precioMaximo )=>{ // Método que filtra la lista de productos según dos parámetros

        let listaDeProductos =  moduloProductos.leerJSON();

        let listaFiltrada = listaDeProductos.filter((producto)=>{ // declaro una variable que almacenará lo que retorna el método .filter (todos los productos que cumplen con los parámetros solicitados).
           return producto.price >= precioMinimo && producto.price <= precioMaximo
        })
         return listaFiltrada

    },
    cambiarPrecio: (id, nuevoPrecio)=>{ // Método para cambiar el precio de el producto con id igual al pasado por parámetro.

        let listaDeProductos = moduloProductos.leerJSON();

        let productoAModificar = listaDeProductos.filter((producto)=>{ // aplico el método .filter a la lista de productos.
            if(producto.id == id){ // Si el id del producto es igual al id pasado por parámetro
            producto.price = nuevoPrecio // el precio de ese producto recibe como valor el nuevo precio pasado como argumento
            }; 
            return listaDeProductos // retorna la lista de productos ya modificada.
        })

        let productoModificado = JSON.stringify(productoAModificar); 
        fs.writeFileSync('./productos.json', productoModificado, 'utf-8') // Escribo en el json la lista modificada
    },
    eliminar : (id)=>{ // Método que elimina el producto cuyo id coincida con el parámetro enviado.

        let listaDeProductos = moduloProductos.leerJSON(); 
        let quitarProducto = listaDeProductos.filter(producto =>{ 
            return producto.id !== id // filtra los productos que no correspondan con el id del parámetro
        })
        
        let nuevaLista = JSON.stringify(quitarProducto);
        fs.writeFileSync('./productos.json', nuevaLista, 'utf-8') // Escribo en el json la lista modificada.
    },
    buscar : (busqueda)=>{ // Método que busca los productos cuyo nombre coincidan con el argumento dado.
        let listaDeProductos = moduloProductos.leerJSON();

        let productoBuscado = listaDeProductos.filter(producto => {
            return producto.name.toLowerCase().includes(busqueda.toLowerCase()) // retorna todos los productos que cumplan incluyan el nombre pasado como argumento.
        })
        return productoBuscado
    }
}



module.exports = moduloProductos