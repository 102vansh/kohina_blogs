



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
//       const response = await axios.post('http://localhost:3000/api/v1/ai/generatecontent', { topic: input },{
//         withCredentials: true,
//       });
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
//     <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow-md bg-gray-50">
//       <h1 className="text-2xl font-bold text-center mb-4">AI Content Chatbot</h1>
//       <div className="h-96 overflow-y-auto p-4 bg-white border rounded-lg">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
//           >
//             <div
//               className={`inline-block px-4 py-2 rounded-lg ${
//                 msg.sender === 'user'
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 text-gray-900'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {loading && (
//           <div className="text-center text-gray-500">Generating content...</div>
//         )}
//       </div>
//       <div className="mt-4 flex">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter a topic..."
//           className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
//         />
//         <button
//           onClick={handleSendMessage}
//           disabled={loading}
//           className={`px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 ${
//             loading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) {
      alert('Please enter a topic.');
      return;
    }

    // Add user message to chat
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Call the API
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/ai/generatecontent',
        { topic: input },
        { withCredentials: true }
      );
      const botMessage = { sender: 'bot', text: response.data.content || 'No response from API.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Failed to generate content. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/business-strategy-icons-outline-sketch_1284-13132.jpg?t=st=1737888817~exp=1737892417~hmac=4ce8ca1d551f1ce394b5ea053835c5154056ef83fd74d7d20e84868ec073d759&w=1060')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-2xl w-full mx-auto p-4 border rounded-lg shadow-md bg-white bg-opacity-90">
        <h1 className="text-2xl font-bold text-center mb-4">AI Content Chatbot</h1>
        <div className="h-96 overflow-y-auto p-4 bg-white border rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-500">Generating content...</div>
          )}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a topic..."
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className={`px-4 py-2 bg-black text-white rounded-r-lg hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;