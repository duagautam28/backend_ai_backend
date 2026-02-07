import fs from "fs";
import dotenv from "dotenv";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

dotenv.config();

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
});

export async function generateAudio(summaries) {
  for (let i = 0; i < summaries.length; i++) {
    try {
      const audioStream = await elevenlabs.textToSpeech.convert(
        process.env.VOICE_ID, 
        {
          text: summaries[i],
          modelId: "eleven_multilingual_v2",
          outputFormat: "mp3_44100_128"
        }
      );

      
      const chunks = [];
      for await (const chunk of audioStream) {
        chunks.push(chunk);
      }

      const audioBuffer = Buffer.concat(chunks);

      fs.writeFileSync(
        `audio/product_${i + 1}.mp3`,
        audioBuffer
      );

      console.log(`Saved: audio/product_${i + 1}.mp3`);
    } catch (err) {
      console.error("TTS failed:", err.message);
    }
  }
}
