function catchRateToPrice(catchRate) {
 const priceMap = [
    50000, 49000, 47500, 45000, 42500, 40000, 37500, 35000, 30000, 27500,
    25000, 22500, 20000, 17500, 15000, 12500, 10000, 7500, 5500, 5000,
    4000, 3500, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 750,
    600, 550, 500, 450, 400, 350, 300, 250, 225, 200,
    175, 150, 110, 85, 65, 45, 35, 25, 20, 15, 10
  ];

const catchRateBracket = Math.ceil(catchRate / 5);
const catchRateIndex = catchRateBracket-1;

return priceMap[catchRateIndex];
}

export default catchRateToPrice;