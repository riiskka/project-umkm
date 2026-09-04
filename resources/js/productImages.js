export const PRODUCT_IMAGE_MAP = {
    'NAMA PRODUK PERSIS SEPERTI DI DATABASE': '/images/produk/NAMA-FILE-FOTO-KAMU.jpg',
}

export const KEYWORD_MAP = [
    { match: /croissant/i, image: '/images/produk/croisant butter.jpg' },
    { match: /sourdough|baguette|loaf|roti/i, image: '/images/produk/sourdough loaf.jpg' },
    { match: /cake|velvet|kue/i, image: '/images/produk/red velvet.jpg' },
    { match: /cookie/i, image: '/images/produk/choco chips.jpg' },
    { match: /cinnamon|roll/i, image: '/images/produk/cinnamon rol.jpg' },
]

export const DEFAULT_IMAGE = '/images/produk/default.svg'

export function getProductImage(name = '') {
    if (PRODUCT_IMAGE_MAP[name]) {
        return PRODUCT_IMAGE_MAP[name]
    }

    const found = KEYWORD_MAP.find((entry) => entry.match.test(name))
    return found ? found.image : DEFAULT_IMAGE
}