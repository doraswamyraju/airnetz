import { GoogleGenAI } from "@google/genai";

const systemInstruction = `
You are 'AirBot', the friendly virtual assistant for Airnetz, a leading ISP in Tirupati, India.
Your goal is to help potential customers choose a broadband/DTH plan or help existing customers with basic troubleshooting.

Knowledge Base:
1. Broadband Plans:
   - Starter: ₹499/mo, 40 Mbps, Unlimited Data. Good for browsing, single user.
   - Streamer: ₹799/mo, 100 Mbps, Unlimited Data. Good for HD streaming, families.
   - Gamer: ₹1299/mo, 300 Mbps, Unlimited Data. Good for 4K gaming, large families. Includes Netflix & Prime Basic.

2. DTH/OTT:
   - We offer Smart Set Top Boxes.
   - Bundles available with broadband plans.

3. Troubleshooting:
   - Red light on router: Check fiber cable or restart router.
   - Slow speed: Connect via 5GHz band, not 2.4GHz.
   - Booking: Direct them to the 'Book Connection' page.

Tone: Professional, concise, warm. 
Keep answers short (under 100 words).
If asked about coverage, say we cover all major areas in Tirupati including Alipiri, Renigunta Road, KT Road, and MR Palli.
`;

let ai: GoogleGenAI | null = null;

try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.warn("API_KEY not found in environment variables. AI features may be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const getAIResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm currently offline (API Key missing). Please check the 'Book Connection' page for manual assistance.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    
    return response.text || "I didn't quite catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the server. Please try again later.";
  }
};
