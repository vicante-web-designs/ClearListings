export function formatPrice( price: number ){
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(price)
} //This function converts digits to the Naira currency format. i.e formatPrice(2500000) => ₦2,500,000