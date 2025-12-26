import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NewsData, QuoteData, ImageData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using Flash for fast text responses
const TEXT_MODEL = "gemini-3-flash-preview";
// Using Flash Image for fast image generation
const IMAGE_MODEL = "gemini-2.5-flash-image";

export const fetchGoodNews = async (): Promise<NewsData> => {
  const prompt = "Find a specific, real, recent positive news story from around the world regarding science, nature, or humanity. Return the response in JSON format with a 'headline', a 2-sentence 'summary' in Turkish, and the 'location' of the event.";
  
  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          summary: { type: Type.STRING },
          location: { type: Type.STRING },
        },
        required: ["headline", "summary"],
      } as Schema,
    },
  });

  const text = response.text;
  if (!text) throw new Error("No data received from Gemini");
  return JSON.parse(text) as NewsData;
};

export const fetchDailyQuote = async (): Promise<QuoteData> => {
  // Updated prompt to explicitly ensure international variety
  const prompt = "Find a famous, inspiring quote regarding hope, resilience, or happiness. Select randomly from famous International figures (e.g., Einstein, Seneca, Tolstoy, Rumi, Lao Tzu, Victor Hugo) OR Turkish figures. Ensure a balanced mix of cultures. Return JSON with 'text' (the quote translated to Turkish) and 'author'.";

  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          author: { type: Type.STRING },
        },
        required: ["text", "author"],
      } as Schema,
    },
  });

  const text = response.text;
  if (!text) throw new Error("No data received from Gemini");
  return JSON.parse(text) as QuoteData;
};

export const generateCuteFriendImage = async (): Promise<ImageData> => {
  // Updated animal list and prompt for more natural/wildlife style
  const animals = [
    "golden retriever puppy running on green grass", 
    "fluffy kitten playing in autumn leaves", 
    "baby panda climbing a tree branch", 
    "baby otter floating in a river", 
    "bunny sitting in a flower field", 
    "red squirrel eating a nut in a forest",
    "hedgehog walking in a garden",
    "baby duckling swimming in a pond"
  ];
  const selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
  
  // Focused on wildlife photography style
  const prompt = `A professional, award-winning wildlife photograph of a ${selectedAnimal}. Taken in a natural outdoor environment with natural sunlight. Authentic, candid, highly detailed texture, photorealistic 4k, no studio lighting.`;

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: prompt,
    // Note: responseMimeType is not supported for gemini-2.5-flash-image
  });

  // Extract image
  let base64Image = null;
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      base64Image = part.inlineData.data;
      break;
    }
  }

  if (!base64Image) throw new Error("Could not generate image");

  return {
    url: `data:image/jpeg;base64,${base64Image}`,
    description: `Doğal ortamında bir dost` // Generic description since we randomized the prompt details
  };
};

export const generateSerenitySceneImage = async (): Promise<ImageData> => {
  const scenes = [
    "empty park bench under a cherry blossom tree",
    "calm lake reflection at sunrise with minimalist nature",
    "minimalist modern architecture with plants and soft sunlight",
    "cozy reading nook by a window with rain outside",
    "peaceful forest path in autumn"
  ];
  const selectedScene = scenes[Math.floor(Math.random() * scenes.length)];
  const prompt = `A high-quality, aesthetic, minimalist photo of ${selectedScene}. Calming pastel color palette, peaceful atmosphere, cinematic composition.`;

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: prompt,
    // Note: responseMimeType is not supported for gemini-2.5-flash-image
  });

   // Extract image
   let base64Image = null;
   for (const part of response.candidates?.[0]?.content?.parts || []) {
     if (part.inlineData) {
       base64Image = part.inlineData.data;
       break;
     }
   }
 
   if (!base64Image) throw new Error("Could not generate image");

  return {
    url: `data:image/jpeg;base64,${base64Image}`,
    description: "Huzurlu bir an"
  };
};