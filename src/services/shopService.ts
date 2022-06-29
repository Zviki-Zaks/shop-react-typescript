import { Product } from '../models/product.model'

export const shopService = {
    query,
    getById,
    remove,
    post,
    put
}

const KEY: string = 'SHOP_DB'

async function query(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
        const products = _load() || _createProducts()
        resolve(products)
    })
}

async function getById(productId: string): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        const products = await query()
        const product = products.find(product => product.id === productId)
        product ? resolve(product) : reject()
    })
}

async function remove() {

}

async function post() {

}

async function put() {

}

function _createProducts(): Product[] {
    const products: Product[] = _load() || [
        {
            id: _makeId(),
            name: 'Tomato',
            category: 'vegetables',
            inStock: 200,
            price: 5.9
        },
        {
            id: _makeId(),
            name: 'Potato',
            category: 'vegetables',
            inStock: 200,
            price: 2.9
        },
        {
            id: _makeId(),
            name: 'Bread',
            category: 'pastry',
            inStock: 50,
            price: 7.9
        },
    ]
    _save(products)
    return products
}

function _save(products: Product[]): void {
    localStorage.setItem(KEY, JSON.stringify(products))
}
function _load(): Product[] | null {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
}


function _makeId(length: number = 5): string {
    var txt = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}