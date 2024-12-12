import  { useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import {} from "@ant-design/icons"
const api = import.meta.env.VITE_GEMINI_API_KEY;
export default function ChatBot() {
    // useEffect(()=>{},[])
    const getResponse = async()=>{
      const genAI = new GoogleGenerativeAI(api);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });
      let result = await chat.sendMessage("I have 2 dogs in my house.");
      console.log(result.response.text());
      result = await chat.sendMessage("How many paws are in my house?");
      console.log(result.response.text());
    }

  return (
    <div>
    
    </div>
  )
}
