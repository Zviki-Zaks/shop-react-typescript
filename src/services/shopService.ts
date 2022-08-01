import { Product } from '../models/product.model'

export const shopService = {
    query,
    getById,
    remove,
    post,
    put
}

const KEY: string = 'SHOP_DB'

async function query(filterBy?: { name?: string, category?: string }): Promise<Product[]> {
    return new Promise((resolve, reject) => {
        let products = _load() || _createProducts()
        if (filterBy) {
            products = _filter(products, filterBy)
        }
        resolve(products)
    })
}

async function getById(productId: string): Promise<Product> {
    const products = _load()

    return new Promise(async (resolve, reject) => {
        const product = products?.find(product => product.id === productId)
        product ? resolve(product) : reject()
    })
}

async function remove(productId: string) {
    const products = _load()
    return new Promise<string>((resolve, reject) => {
        if (products) {
            const idx = products.findIndex(product => product.id === productId)
            if (idx > -1) {
                products.splice(idx, 1)
                _save(products)
                return resolve(productId)
            }
        } else reject()
    })
}

async function post(newProduct: Product) {
    newProduct.id = _makeId()
    const products = _load()
    return new Promise<Product>((resolve, reject) => {
        if (products) {
            products.push(newProduct)
            _save(products)
            return resolve(newProduct)
        } else reject()
    })
}

async function put(newProduct: Product) {
    const products = _load()
    return new Promise<Product>((resolve, reject) => {
        if (products) {
            const idx = products.findIndex(product => product.id === newProduct.id)
            if (idx > -1) {
                products.splice(idx, 1, newProduct)
                _save(products)
                return resolve(newProduct)
            }
        } else reject()
    })
}

function _filter(items: Product[], { name, category }: { name?: string, category?: string }): Product[] {

    return items.filter(item => {
        if (!name && !category) return item
        if (name) {
            if (item.name.toLowerCase().includes(name.toLowerCase())) { return item }
        }
        if (category) {
            if (item.category.toLowerCase().includes(category.toLowerCase())) { return item }
        }
    })
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