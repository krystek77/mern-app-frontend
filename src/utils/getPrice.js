export function getPrice(price, currency = "EUR", rate = 1) {
  const formatPrice = price.replace(",", ".");
  try {
    const price = parseFloat(formatPrice);
    if (price >=0) {
      return currency === "EUR"
        ? new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: rate === 1 ? "EUR" : "PLN",
          }).format(Math.round([price - (price * 40) / 100] * rate))
        : new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
          }).format(Math.round(price));
    } else {
      throw new Error("Podanej ceny nie da się sformatować");
    }
  } catch (error) {
    console.log(error.message);
  }
}
export default getPrice;
