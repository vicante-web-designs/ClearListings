import type { PriceFilterKey } from '@/types/filter';

const priceMatch: Record<PriceFilterKey, (price: number) => boolean> = {
    'under-10m': (price) => price < 10000000,
    '10m-20m': (price) => 10000000 <= price && price <= 20000000,
    '20m-30m': (price) => 20000000 <= price && price <= 30000000,
    'above-30m': (price) => price > 30000000
}

export default priceMatch;