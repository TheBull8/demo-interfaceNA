import React, { useState, useEffect, useRef } from "react";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
const ChatBox = props => {
  const chatboxClass = props.isOpen ? "chatbox" : "chatbox open";
  const chatContentRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleInputKeyDown = async (event) => {
    if (event.key === 'Enter' && userInput.trim() !== '') {
      setIsLoading(true);
      const userMessage = { text: userInput, isBot: false };
      const loadingMessage = { text: 'loading', isBot: true };

      setMessages([...messages, userMessage, loadingMessage]);
      setUserInput('');

      try {
        const botResponse = await getChatGptResponse(userInput);
        const botMessage = { text: botResponse, isBot: true };

        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // Remove loading message
          botMessage // Add bot response
        ]);

      } catch (error) {
        console.error("Error fetching bot response:", error);
      } finally {
        setIsLoading(false); // Stop loading, whether the request succeeded or failed
      }
    }
  };

  const sendMessage = async (text: string) => {
    const userMessage = { text: text, isBot: false };
    const loadingMessage = { text: 'loading', isBot: true };
    setIsLoading(true);
    setMessages([...messages, userMessage, loadingMessage]);
    try {
      const botResponse = await getChatGptResponse(text);
      const botMessage = { text: botResponse, isBot: true };

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove loading message
        botMessage // Add bot response
      ]);

    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
    finally {
      setIsLoading(false); // Stop loading, whether the request succeeded or failed
    }
    scrollToBottom();
  }

  const getChatGptResponse = async (question: string): Promise<string | null> => {
    const url = 'https://bot-j3so72lbva-uc.a.run.app/ask-whitepaper/';

    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const data = {
      question,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result.answer;
      } else {
        console.error(`Request failed with status code ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Request error:', error);
      return null;
    }
  };



  useEffect(() => {
    setMessages([{ text: "How can I help you?", isBot: true }]);
  }, []);
  return (
    <div className={chatboxClass}>
      <div className="chat-card">
        <div className="chat-content" ref={chatContentRef}>
          {messages.map((message, index) => (
            <div key={index}>
              <ChatMessage
                sender={message.isBot ? 'start' : 'end'}
                content={message.text}
              />
              {index === 0 ? (
                <div className="ml-5 text-center">
                  <label>
                    You may select one of these topics:
                  </label>
                  <button disabled={isLoading} onClick={(e) => sendMessage("What is GreenAnt?")} className="btn btn-wide mt-3"><h4>What is GreenAnt?</h4></button>
                  <button disabled={isLoading} onClick={(e) => sendMessage("How can I tokenize my trees?")} className="btn btn-wide mt-3">How can I tokenize my trees?</button>
                  <button disabled={isLoading} onClick={(e) => sendMessage("How do I estimate my carbon footprint?")} className="btn btn-wide mt-3">How do I estimate my carbon footprint?</button>
                  <button disabled={isLoading} onClick={(e) => sendMessage("Locate my trees")} className="btn btn-wide mt-3">Locate my trees</button>
                  <h6 className="my-5">
                    or type what you want to do
                  </h6>
                </div>) : (<></>)}

            </div>
          ))}
        </div>
        <div className="chat-input text-center">
          <input type="text" placeholder="Type in your question "
            disabled={isLoading}
            onKeyDown={handleInputKeyDown}
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            className="input input-bordered input-primary w-full max-w-xs" />
        </div>
      </div>
      <button onClick={props.toggleChatbox} className="chatbox-toggle pl-1">
        {props.isOpen ? <FaAngleLeft size="2em" /> : <FaAngleRight size="2em" />}
      </button>
    </div>
  );
};
export default ChatBox;


function ChatMessage({ sender, content }) {
  const avatarImage = sender === 'start' ? '/images/ant_logo.svg' : '/images/avatar.svg';

  return (
    <div className={`chat mb-4 mr-4 chat-${sender}`}>
      <div className="chat-image avatar">
        <div className="w-16 rounded-full">
          <img src={avatarImage} alt={`Avatar of ${sender}`} />
        </div>
      </div>
      <div className={`chat-bubble mb-8 mr-3 ml-3 bg-slate-200 text-slate-600 text-left`}>
        {content === "loading" ? <span className="loading loading-dots loading-md"></span> : content}
      </div>
    </div>
  );
}
