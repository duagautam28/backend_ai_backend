##_**Overview**_

Scrapes book products from **BooksToScrape** (first 5 books only)

Generates short 1–2 sentence summaries using **OpenAI GPT-4o-mini**

Converts summaries into **MP3 audio files** using **ElevenLabs Text-to-Speech**

---

##_**How to Run**_

1. Clone the repository

git clone <your-repo-url>
cd assessment_backend


2. Install dependencies

npm install axios
npm install cheerio
npm install dotenv
npm install openai
npm install @elevenlabs/elevenlabs-js

3. Add API keys (create `.env` file in project root)

4. Run the script


---

> ##Design Choices

        1. Scraping:
                Used axios + cheerio for fast and lightweight scraping
                Targeted `.product_pod` for book titles
                Used demo website (BooksToScrape) for legal scraping
                Limited to first 5 books as per assessment requirement

        2. Summarization:
                Used OpenAI GPT-4o-mini model
                Generated short, human-readable 1–2 sentence summaries
                Avoided passing raw HTML to the model

        3. Audio Generation:
                Used ElevenLabs Text-to-Speech API
                Each summary is saved as a separate MP3 file
                Audio files stored locally

---

Workflow:
> Scraper → JSON Storage → OpenAI Summarizer → ElevenLabs TTS → Audio Output
