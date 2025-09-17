import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI as GoogleGenAI, Chat } from '@google/genai';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; parts: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const studioInfo = `
    You are a friendly and energetic virtual assistant for "Attitudes Fitness, Dance & Music Studio". 
    Your goal is to answer questions and encourage potential customers to join.
    Always be positive and encouraging.
    When asked about joining, strongly recommend calling the studio at 7092717433.

    Here is the information about the studio:
    - Name: Attitudes Fitness, Dance & Music Studio.
    - Slogan: Unleash Your Attitude.
    - Contact Phone: 7092717433.
    - Operating Hours: 6am to 9:30pm.

    - Classes Offered:
      - Dance
      - Aerobics
      - Violin
      - Kid's Dance
      - Yoga
      - Mridangam
      - Body Building

    - Class Schedule:
      - Main Classes:
        - 6am to 7am: Morning Aerobics & Yoga. A great way to start the day with energy.
        - 10:30am to 11:30am: Ladies' Aerobics. A dedicated session for women.
        - 7pm to 8pm: Evening Aerobics. For ladies and kids.
        - 8pm to 9:30pm: Adults' Dance Class. Learn new moves and have fun.
      - Kid's Dance Timings:
        - Saturday: 6pm to 7pm.
        - Sunday: 5pm to 6pm.

    Keep your answers concise and directly related to the studio information. If you don't know the answer, say that you don't have that information and suggest calling 7092717433 for more details.
  `;

  const initializeChat = () => {
    if (!chatRef.current) {
      try {
        // IMPORTANT: Replace 'YOUR_API_KEY' with your actual Google AI API key.
        // In a real application, this key should be managed securely (e.g., via a backend proxy or build-time environment variables)
        // and not be exposed in the client-side code. For this demo, we use a placeholder.
        const ai = new GoogleGenAI({ apiKey: 'YOUR_API_KEY' });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: studioInfo,
          },
        });
        setMessages([{ role: 'model', parts: "Welcome to Attitudes! Are you interested in learning about our dance classes or fitness sessions today?" }]);
      } catch (error) {
        console.error("Failed to initialize AI Chat:", error);
        setMessages([{ role: 'model', parts: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
      }
    }
  };
  
  useEffect(() => {
    if(isOpen) {
        initializeChat();
    }
  }, [isOpen]);


  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage = { role: 'user' as const, parts: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseStream = await chatRef.current.sendMessageStream({ message: userMessage.parts });
      
      let newModelMessage = { role: 'model' as const, parts: '' };
      setMessages(prev => [...prev, newModelMessage]);

      for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        newModelMessage.parts += chunkText;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { ...newModelMessage };
            return newMessages;
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'model' as const, parts: "Oops! Something went wrong. Please try again." };
      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg z-50 transform transition-transform hover:scale-110 focus:outline-none"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      <div className={`fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-gray-800 rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <header className="bg-gray-900 rounded-t-2xl p-4 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">Studio Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-800/50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                   {msg.parts.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <footer className="p-4 bg-gray-900 rounded-b-2xl border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about classes..."
              className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-purple-600 text-white p-2.5 rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed transform transition-transform hover:scale-110"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Chatbot;
