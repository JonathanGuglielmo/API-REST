const express = require('express');
const { Router } = express;
const port = 8080;
const app = express();
const productos = Router()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let listaProductos = []

app.get('/', (req, res) => {
    res.send('<h1 style=text-align:center>Desafio 04</h1>')
})

productos.get('/', (req, res) => {
    //devuelve todos los productos.
    res.send(listaProductos)
});

productos.get('/:id', (req, res) => {
    //devuelve un producto según su id.
    let indiceDelProducto = req.params.id - 1;

    if (indiceDelProducto >= listaProductos.length || indiceDelProducto < 0) {
        res.send({ error : 'producto no encontrado' })
    } else {
        res.send(listaProductos[indiceDelProducto])
    }
});

productos.post('/' , (req, res) => {
    //recibe y agrega un producto, y lo devuelve con su id asignado.
    let ultimoId;
    let ultimoProducto = listaProductos[listaProductos.length - 1];

    if (listaProductos.length == 0) {
        ultimoId = 0
    } else {
        ultimoId = ultimoProducto.id 
    }

    let title = req.body.title;
    let price = req.body.price;
    let thumbnail = req.body.thumbnail;
    let producto = {
        title:title,
        price:price,
        thumbnail:thumbnail,
        id:ultimoId + 1
    };
    listaProductos.push(producto);
    res.send(listaProductos);
});

productos.put('/:id', (req, res) => {
    //recibe y actualiza un producto según su id.
    let id = req.params.id - 1
    listaProductos[id]["title"] = req.body.title
    listaProductos[id]["price"] = req.body.price
    listaProductos[id]["thumbnail"] = req.body.thumbnail

    res.send(listaProductos)

});
productos.delete('/:id', (req, res) => {
    //elimina un producto según su id.
    let id = req.params.id - 1
    listaProductos.splice(id, 1)
    res.send(listaProductos)
});

app.use('/api/productos', productos)
app.use('/static', express.static('public'));

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});
