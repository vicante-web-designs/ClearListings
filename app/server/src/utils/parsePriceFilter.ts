const parsePrice = (value: string) => {
    const amount = parseFloat(value);

    if(value.endsWith('B')) return amount * 1_000_000_000;
    if(value.endsWith('M')) return amount * 1_000_000;
    if(value.endsWith('K')) return amount * 1_000;
}

export default parsePrice;