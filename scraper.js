import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeProducts() {
  const baseUrl = "https://books.toscrape.com/";
  const { data } = await axios.get(baseUrl);

  const d = cheerio.load(data);
  const products = [];

  for (let i = 0; i < 5; i++) {
    const el = d(".product_pod")[i];
    const name = d(el).find("h3 a").attr("title");
    const link = d(el).find("h3 a").attr("href");

    const bookPage = await axios.get(baseUrl + link);
    const dd = cheerio.load(bookPage.data);

    const fullDesc =
      dd("#product_description").next("p").text().trim();

    const description = fullDesc ? fullDesc.split(". ")[0] + ".": "no description available";

    products.push({ name, description });
  }

  //console.log(products);
  return products;
}
