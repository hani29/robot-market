// format price to THB
export const formatOfPrice = (price) => {
  if (!price) {
    return "No Payment";
  }
  const realPrice = parseInt(price);
  return realPrice.toLocaleString("th-TH", {
    style: "currency",
    currency: "THB",
  });
};

// format date to DD-MM-YY
export const formatOfDate = (createdDate) => {
  const date = new Date(createdDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return formattedDate;
};

// Count totals number of robots added into cart
export const TotalNumberOfRobots = (cart) => {
  const TotalRobots = cart.reduce((robotTotal, robot) => {
    return robot.stock + robotTotal;
  }, 0); 
  return TotalRobots;
}

// calculate total price for robots that are in cart
export const TotalPrice = (cart) => {
  const totalPrice = cart.reduce((robotTotal, robot) => {
    return parseInt(robot.price) * robot.stock + robotTotal;
  }, 0); 
  const formattedPrice = formatOfPrice(totalPrice)
  return formattedPrice;
}
