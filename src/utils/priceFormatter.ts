export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (numPrice >= 10000000) { // 1 crore or more
    return `₹${(numPrice / 10000000).toFixed(1)}Cr`;
  } else if (numPrice >= 100000) { // 1 lakh or more
    return `₹${(numPrice / 100000).toFixed(0)}L`;
  } else if (numPrice >= 1000) { // 1 thousand or more
    return `₹${(numPrice / 1000).toFixed(0)}K`;
  } else {
    return `₹${numPrice}`;
  }
};
