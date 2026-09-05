export const PRODUCT_IMAGE_MAP = {
    'Croissant Butter': '/images/produk/croisant butter.jpg',
    'Sourdough Loaf': '/images/produk/sourdough loaf.jpg',
    'Red Velvet Cake Slice': '/images/produk/red velvet.jpg',
    'Choco Chip Cookies (isi 6)': '/images/produk/choco chips.jpg',
    'Cinnamon Roll': '/images/produk/cinnamon rol.jpg',
    'Baguette': '/images/produk/baguette.jpg',
}

export const KEYWORD_MAP = [
    { match: /croissant/i, image: '/images/produk/croissant.svg' },
    { match: /sourdough|baguette|loaf|roti/i, image: '/images/produk/roti.svg' },
    { match: /cake|velvet|kue/i, image: '/images/produk/kue.svg' },
    { match: /cookie/i, image: '/images/produk/cookies.svg' },
    { match: /cinnamon|roll/i, image: '/images/produk/cinnamon-roll.svg' },
]

export const DEFAULT_IMAGE = '/images/produk/default.svg'

export function getProductImage(name = '') {
    if (PRODUCT_IMAGE_MAP[name]) {
        return PRODUCT_IMAGE_MAP[name]
    }

    const found = KEYWORD_MAP.find((entry) => entry.match.test(name))
    return found ? found.image : DEFAULT_IMAGE
}