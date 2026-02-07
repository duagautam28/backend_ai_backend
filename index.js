import fs from "fs";
import { scrapeProducts } from "./scraper.js";
import { saveProducts, readProducts } from "./storage.js";
import { summarizeProducts } from "./summarizer.js";
import { generateAudio } from "./tts.js";

async function scrape() {
  if (!fs.existsSync("data")) fs.mkdirSync("data");
  if (!fs.existsSync("audio")) fs.mkdirSync("audio");

  console.log("scraping products");
  const products = await scrapeProducts();

  console.log("saving data");
  saveProducts(products);

  console.log("generating summaries");
  const storedProducts = readProducts();
  const summaries = await summarizeProducts(storedProducts);

  console.log("generating audio files");
  await generateAudio(summaries);

  console.log("completed");
}

scrape();
