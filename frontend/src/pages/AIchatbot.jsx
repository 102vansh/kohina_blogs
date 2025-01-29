




// import React, { useState } from 'react';
// import axios from 'axios';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSendMessage = async () => {
//     if (!input.trim()) {
//       alert('Please enter a topic.');
//       return;
//     }

//     // Add user message to chat
//     const userMessage = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);

//     // Call the API
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/ai/generatecontent',
//         { topic: input },
//         { withCredentials: true }
//       );
//       const botMessage = { sender: 'bot', text: response.data.content || 'No response from API.' };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const errorMessage = { sender: 'bot', text: 'Failed to generate content. Please try again.' };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//       setInput('');
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-4"
//       style={{
//         backgroundImage: `url('https://img.freepik.com/free-vector/business-strategy-icons-outline-sketch_1284-13132.jpg?t=st=1737888817~exp=1737892417~hmac=4ce8ca1d551f1ce394b5ea053835c5154056ef83fd74d7d20e84868ec073d759&w=1060')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="max-w-2xl w-full mx-auto p-4 border rounded-lg shadow-md bg-white bg-opacity-90">
//         <h1 className="text-2xl font-bold text-center mb-4">AI Content Chatbot</h1>
//         <div className="h-96 overflow-y-auto p-4 bg-white border rounded-lg">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
//             >
//               <div
//                 className={`inline-block px-4 py-2 rounded-lg ${
//                   msg.sender === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 text-gray-900'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           {loading && (
//             <div className="text-center text-gray-500">Generating content...</div>
//           )}
//         </div>
//         <div className="mt-4 flex">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Enter a topic..."
//             className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
//           />
//           <button
//             onClick={handleSendMessage}
//             disabled={loading}
//             className={`px-4 py-2 bg-black text-white rounded-r-lg hover:bg-blue-600 ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;



import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/ai/generatecontent',
        { topic: input },
        { withCredentials: true }
      );
      const botMessage = { 
        sender: 'bot', 
        text: response.data.content || 'No response from API.' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        sender: 'bot', 
        text: 'Failed to generate content. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-300 to-indigo-900 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">AI Assistant</h1>
              <p className="text-black">Ask me anything about your topics</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center 
                  ${msg.sender === 'user' 
                    ? 'bg-blue-100' 
                    : 'bg-indigo-100'
                  }`}
                >
                  {msg.sender === 'user' 
                    ? <User className="w-4 h-4 text-blue-600" />
                    : <Bot className="w-4 h-4 text-indigo-600" />
                  }
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 
                    ${msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  rows="1"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                  flex items-center gap-2"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;