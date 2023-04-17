let productosTienda = [
    {
        nombre: "bicicleta de Ruta",
        id: 1,
        genero: "masculino",
        categoria: "bicicletas",
        precio: 1590000,
        stock: 5,
        img: "./imgs/BicicletaAdulto.png"
    },
    {
        nombre: "zapatillas ciclismo",
        id: 2,
        genero: "unisex",
        categoria: "indumentaria",
        precio: 90000,
        stock: 8,
        img: "./imgs/ZapatillasCiclismo.jpeg"
    },
    {
        nombre: "casco adulto",
        id: 3,
        genero: "masculino",
        categoria: "seguridad",
        precio: 79990,
        stock: 3,
        img: "./imgs/CascoAdulto.png"
    },
    {
        nombre: "casco niño/a",
        id: 4,
        genero: "unisex",
        categoria: "seguridad",
        precio: 39990,
        stock: 13,
        img: "./imgs/CascoNinio.png"
    },
    {
        nombre: "bicicleta mujer",
        id: 5,
        genero: "femenino",
        categoria: "bicicletas",
        precio: 100000,
        stock: 12,
        img: "./imgs/bicicletaMujer.webp"
    },
    {
        nombre: "bicicleta niño/a",
        id: 6,
        genero: "unisex",
        categoria: "bicicletas",
        precio: 530900,
        stock: 10,
        img: "./imgs/BiciNiño.jpeg"
    },
    {
        nombre: "guantes ciclismo",
        id: 7,
        genero: "unisex",
        categoria: "indumentaria",
        precio: 12000,
        stock: 20,
        img: "./imgs/Guanteciclismo.webp"
    },
    {
        nombre: "scooter eléctrico",
        id: 8,
        genero: "unisex",
        categoria: "e-move",
        precio: 149900,
        stock: 4,
        img: "./imgs/ScooterElectrico.png"
    },
    {
        nombre: "foco Led Blanco",
        id: 9,
        genero: "unisex",
        categoria: "accesorios",
        precio: 20000,
        stock: 9,
        img: "./imgs/LuzBicicleta.jpeg"
    },
    {
        nombre: "conjunto Ciclismo",
        id: 10,
        genero: "unisex",
        categoria: "indumentaria",
        precio: 11900,
        stock: 11,
        img: "./imgs/ConjuntoCiclismo.jpeg"
    }
]


let carritoDOM = document.getElementById("carrito")

renderizarCards(productosTienda)

function Comprar() {
    alert("Muchas gracias por su compra")
    localStorage.removeItem("carrito")
    carrito = []
    renderCarrito(carrito)
}
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
renderCarrito(carrito)

function renderizarCards(arrayProductos) {
    let contenedorCard = document.getElementById("contenedorCard")
    contenedorCard.innerHTML = ""
    arrayProductos.forEach(({ nombre, id, categoria, precio, stock, img }) => {
        let card = document.createElement("div")
        card.className = "card d-flex"

        card.innerHTML = `
        <h2 class=tituloCard>${nombre}</h2>
        <p>${categoria}</p>
        <div class=imagenCard style="background-image: url(${img})"></div>
        <h3>Valor: $${precio}</h3>
        <p><span id=span${id}>${stock}</span> unidades disponibles</p>
        <button class="btn btn-warning" id=${id}>AGREGAR AL CARRITO</button>
      `
        contenedorCard.append(card)

        let boton = document.getElementById(id)
        boton.addEventListener("click", agregarProdAlCarrito)
    })
}

function agregarProdAlCarrito(e) {

    let posProd = productosTienda.findIndex(producto => producto.id == e.target.id)
    let prodBuscado = productosTienda.find(producto => producto.id === Number(e.target.id))

    if (productosTienda[posProd].stock > 0) {

        let elementoSpan = document.getElementById("span" + e.target.id)
        productosTienda[posProd].stock--
        elementoSpan.innerHTML = productosTienda[posProd].stock

        if (carrito.some(({ id }) => id == prodBuscado.id)) {
            let pos = carrito.findIndex(producto => producto.id == prodBuscado.id)
            carrito[pos].unidades++
            carrito[pos].subtotal = carrito[pos].precio * carrito[pos].unidades
            
        } else {
            carrito.push({
                id: prodBuscado.id,
                nombre: prodBuscado.nombre,
                precio: prodBuscado.precio,
                unidades: 1,
                subtotal: prodBuscado.precio
            })
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderCarrito(carrito)
    } else {
        alert(`Producto ${prodBuscado.nombre} sin stock`)
    }
}
console.log(totalCarrito)

function renderCarrito(arrayDeProductos) {
    carritoDOM.innerHTML = ""
    carritoDOM.innerHTML += `<h1 class="text-secondary p-3">Carrito de compras:</h1>`
    arrayDeProductos.forEach(({ nombre, precio, unidades, subtotal}) => {
        carritoDOM.innerHTML += `<h4>Producto: ${nombre} | Valor: ${precio} | Unidades: ${unidades} | Subtotal: ${subtotal}</h4>`
    })

    carritoDOM.innerHTML += `<button class="btn btn-warning m-3" id=comprar>Comprar mi Carrito</button>`

    let botonComprar = document.getElementById("comprar")
    botonComprar.addEventListener("click", Comprar)
}

let motorBusqueda = document.getElementById("motorBusqueda")
motorBusqueda.addEventListener("input", filtrar)

function filtrar() {
    let arrayFiltrado = productosTienda.filter(producto => producto.nombre.includes(motorBusqueda.value))
    renderizarCards(arrayFiltrado)
}
let botonCarrito = document.getElementById("btnVerCarrito")
botonCarrito.addEventListener("click", mostrarCarrito)

function mostrarCarrito() {
  let contenedorProductos = document.getElementById("contenedorProductos")
  carritoDOM.classList.toggle("ocultar")
  contenedorProductos.classList.toggle("ocultar")
}

let switches = document.getElementsByClassName("form-check-input")
for (const input of switches) {
  input.addEventListener("click", filtrarPorCategoria)
}

function filtrarPorCategoria(e) {
  let filtros = []
  for (const input of switches) {
    if (input.checked) {
      filtros.push(input.id)
    }
  }
  let arrayFiltrado = productosTienda.filter(producto => filtros.includes(producto.categoria))
  renderizarCards(arrayFiltrado.length > 0 ? arrayFiltrado : productosTienda)
}