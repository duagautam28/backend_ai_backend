import fs from "fs";

export function saveProducts(products) {
  fs.writeFileSync("data/products.json", JSON.stringify(products, null, 2));
}

export function readProducts() {
  return JSON.parse(fs.readFileSync("data/products.json"));
}
