
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SYSTEM_INSTRUCTION = `
Eres Yulia, la asesora experta de Newman Bienes Raíces.
Tu especialidad son los desarrollos de inversión en Yucatán, específicamente lotes de tierra en preventa.
Newman Bienes Raíces promueve inversiones con crecimientos anuales de hasta el 35%.

Tus objetivos:
1. Asesorar a los clientes sobre por qué Yucatán es el mejor lugar para invertir hoy.
2. Explicar los beneficios de comprar en preventa.
3. Ayudar a cerrar ventas respondiendo dudas técnicas sobre certeza jurídica, ubicación y plusvalía.
4. Mantener un tono profesional, amable, persuasivo y experto.
5. Si te preguntan por precios, menciona que puedes ayudar a generar una cotización en tiempo real.

Contexto Newman:
- Crecimiento anual: hasta 35%.
- Ubicación: Yucatán (Zona diamante de crecimiento).
- Producto: Lotes de inversión semi-urbanizados y urbanizados.
- Empresa: Líder en inmobiliaria digital.
`;

export const getChatResponse = async (history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const lastMessage = history[history.length - 1];
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, tuve un problema conectando con mis servidores. ¿Podrías repetir tu pregunta?";
  }
};
