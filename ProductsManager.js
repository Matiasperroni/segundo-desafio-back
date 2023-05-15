import fs from "fs"

export default class ProductManager {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = 1
        this.path = "./products/products.js"
    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(data)
            return products
        } else {
            return []
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const products = await this.getProducts()
        const product = new ProductManager(
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        )
        product.id = this.id++

        const existingProduct = products.find(
            (prod) => prod.code === product.code
        )
        if (existingProduct) {
            console.log("Este código ya existe")
            return
        }

        if (
            product.title === undefined ||
            product.description === undefined ||
            product.price === undefined ||
            product.thumbnail === undefined ||
            product.code === undefined ||
            product.stock === undefined
        ) {
            console.log("Se deben completar todos los campos")
            return
        }

        products.push({
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            id: product.id,
        })
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
        )
        console.log("soy el array de products", products)
    }

    getProductById = async (id) => {
        const products = await this.getProducts()
        const prodFound = products.find((p) => p.id === id)
        if (prodFound === undefined) {
            console.log("no existe un producto con ese id")
        } else {
            console.log("soy el que devolvio id", prodFound)
            return prodFound
        }
    }
    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const prodIndex = products.findIndex((p) => p.id === id)
        console.log(" antes", products)
        if (prodIndex === -1) {
            console.log(
                "No se pudo borrar el producto, no existe un producto con ese id"
            )
        }
        products.splice(prodIndex, 1)
        console.log(" despues", products)
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
        )
    }

    updateProduct = async (id, campo, valor) => {
        const products = await this.getProducts()
        const prodIndex = products.findIndex((p) => p.id === id)
        console.log(" antes", products)
        if (prodIndex === -1) {
            console.log("No existe un producto con ese id")
        }

        products[prodIndex][campo] = valor

        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
        )
    }
}

const producto = new ProductManager()
// const obj = {
//     title: "bici",
//     description: "soy una bici",
//     price: 20,
//     imagen: "soy una img",
//     code: "abc",
//     stock: 10,
// };

// const env = async () => {
//     let products = await producto.getProducts()
//     console.log(products)

//     await producto.addProduct(
//         "bici",
//         "soy una bici",
//         20,
//         "soy una img",
//         "abc",
//         10
//     )
//     await producto.addProduct(
//         "moto",
//         "soy una moto",
//         20,
//         "soy una img",
//         "sdf",
//         10
//     )
//     await producto.addProduct(
//         "auto",
//         "soy un auto",
//         20,
//         "soy una img",
//         "jpk",
//         10
//     )
//     await producto.addProduct(
//         "bici",
//         "soy una bici",
//         20,
//         "soy una img",
//         "abc",
//         10
//     )
//     await producto.addProduct("bici", "soy una bici", 20, "soy una img", "iii")
//     await producto.addProduct("soy una bici", 20, "soy una img", "sss", 10)
//     await producto.addProduct(
//         "avion",
//         " soy un avion",
//         20,
//         "soy una img",
//         "ttt",
//         10
//     )
//     products = await producto.getProducts()
//     console.log(products)
// }
// env()

// const getP = async () => {
//     let data = await producto.getProducts()
//     console.log("me trajo get product", data)
// }
// getP()

// const getByid = async () => {
//     producto.getProductById(5)
// }
// getByid()

const deleteP = async () => {
    producto.deleteProduct(2)
}
deleteP()

// const updateP = async () => {
//     producto.updateProduct(1, "id", 15)
// }
// updateP()
