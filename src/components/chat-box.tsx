import React, { useState, useEffect, useRef } from "react";
import { FaAngleRight, FaAngleLeft, FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';


const ChatBox = props => {
  const chatboxClass = props.isOpen ? "chatbox" : "chatbox open";
  const chatContentRef = useRef(null);
  const chatboxRef = useRef(null)
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const [isTopOverflowing, setIsTopOverflowing] = useState(false);
  const [isBottomOverflowing, setIsBottomOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false)

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  useEffect(() => {
    const container = chatContentRef.current;
    const checkOverflow = () => {
      setIsTopOverflowing(container.scrollTop > 80)
      setIsBottomOverflowing(container.scrollTop + 100 <= container.scrollHeight - container.clientHeight)
    };
    inputRef.current.focus();
    container.addEventListener('scroll', checkOverflow);
    checkOverflow(); // Initial check

    return () => {
      container.removeEventListener('scroll', checkOverflow);
    };
  }, []);
  useEffect(() => {
    if (props.isOpen === true) {
      setTimeout(() => {
        setIsExpanded(true);
      }, 200);
    } else if (props.isOpen === false) {
      setIsExpanded(false)
    }
  }, [props]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleInputKeyDown = async (event) => {
    if (event.key === 'Enter' && userInput.trim() !== '') {
      setIsLoading(true);
      const userMessage = { text: userInput, isBot: false, senderName: "Guest", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), };
      const loadingMessage = { text: 'loading', isBot: true };

      setMessages([...messages, userMessage, loadingMessage]);
      setUserInput('');

      try {
        const botResponse = await getChatGptResponse(userInput);
        const botMessage = {
          text: botResponse,
          isBot: true,
          senderName: "GreenAnt",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

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
    const userMessage = {
      text: text,
      isBot: false,
      senderName: "Guest",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const loadingMessage = {
      text: 'loading',
      isBot: true,
    };
    setIsLoading(true);
    setMessages([...messages, userMessage, loadingMessage]);
    try {
      const botResponse = await getChatGptResponse(text);
      const botMessage = {
        text: botResponse,
        isBot: true,
        senderName: "GreenAnt",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

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
    inputRef.current.focus();
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
  const handleSendClick = async () => {
    if (userInput) {
      setIsLoading(true);
      const userMessage = { text: userInput, isBot: false, senderName: "Guest", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), };
      const loadingMessage = { text: 'loading', isBot: true };

      setMessages([...messages, userMessage, loadingMessage]);
      setUserInput('');
      inputRef.current.focus();
      try {
        const botResponse = await getChatGptResponse(userInput);
        const botMessage = {
          text: botResponse,
          isBot: true,
          senderName: "GreenAnt",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

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
  }


  useEffect(() => {
    setMessages([{
      text: "How can I help you?",
      isBot: true,
      senderName: "GreenAnt",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  }, []);

  return (
    <div className={chatboxClass} ref={chatboxRef}>
      <div className="chat-card">
        {isTopOverflowing && <div className="top-mask"></div>}
        <div className="chat-content" ref={chatContentRef}>

          {messages.map((message, index) => (
            <div key={index}>
              <ChatMessage
                sender={message.isBot ? 'start' : 'end'}
                content={message.text}
                senderName={message.senderName}
                time={message.time}
              />
              {index === 0 ? (
                <div className="ml-14 mr-16">
                  <h3 className="ml-2 text-gray">
                    You may select one of these topics:
                  </h3>
                  <div className={`card my-2 w-full bg-base-100 border-solid border-2 border-current cursor-pointer${isLoading ? ' opacity-50 pointer-events-none' : ''}`}
                    onClick={(e) => sendMessage("What is GreenAnt?")}>
                    <div className="card-body py-3 px-4 text-left">
                      <h4>What is GreenAnt?</h4>
                    </div>
                  </div>
                  <div className={`card my-2 w-full bg-base-100 border-solid border-2 border-current cursor-pointer${isLoading ? ' opacity-50 pointer-events-none' : ''}`}
                    onClick={(e) => sendMessage("How can I tokenize my trees?")}>
                    <div className="card-body py-3 px-4 text-left">
                      <h4>How can I tokenize my trees?</h4>
                    </div>
                  </div>
                  <div className={`card my-2 w-full bg-base-100 border-solid border-2 border-current cursor-pointer${isLoading ? ' opacity-50 pointer-events-none' : ''}`}
                    onClick={(e) => sendMessage("How do I estimate my carbon footprint?")}>
                    <div className="card-body py-3 px-4 text-left">
                      <h4>How do I estimate my carbon footprint?</h4>
                    </div>
                  </div>
                  <div className={`card my-2 w-full bg-base-100 border-solid border-2 border-current cursor-pointer${isLoading ? ' opacity-50 pointer-events-none' : ''}`}
                    onClick={(e) => sendMessage("Locate my trees")}>
                    <div className="card-body py-3 px-4 text-left">
                      <h4>Locate my trees</h4>
                    </div>
                  </div>
                  <h3 className="ml-2 my-5 text-gray">
                    or type what you want to do
                  </h3>
                </div>) : (<></>)}

            </div>
          ))}

        </div>
        <div className="chat-input text-center mr-4">
          <input type="text" placeholder="Type your command here"
            disabled={isLoading}
            onKeyDown={handleInputKeyDown}
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            ref={inputRef}
            className="input mt-3 input-bordered input-primary w-full" />
          {!isLoading ? (
            <button onClick={() => handleSendClick()}>
              <img src="/images/send.svg" alt="Send" className="send-icon"></img>
            </button>
          ) : (<></>)}

        </div>
        {isBottomOverflowing && <div className="bottom-mask"></div>}
      </div>
      <button onClick={props.toggleChatbox} className="chatbox-toggle pl-1">
        {props.isOpen ? <FaAngleLeft size="2em" /> : <FaAngleRight size="2em" />}
      </button>
    </div>
  );
};
export default ChatBox;


function ChatMessage({ sender, content, senderName, time }) {
  const avatarImage = sender === 'start' ? '/images/ant_logo.svg' : '/images/avatar.svg';
  const [isHovered, setIsHovered] = useState(false);
  const [isDownHovered, setIsDownHovered] = useState(false)
  const [isVoted, setIsVoted] = useState(false);
  const [isUnVoted, setIsUnvoted] = useState(false)
  const vote = () => {
    setIsVoted(true)
    setIsUnvoted(false)
  }
  const unVote = () => {
    setIsVoted(false)
    setIsUnvoted(true)
  }
  return (
    <div className={`chat mb-4 pr-4 chat-${sender}`}>
      <div className="chat-header ml-2 mr-2 font-bold text-slate-500">
        {senderName}{content !== "loading" ? <span className="dot">&nbsp;&nbsp;•&nbsp;&nbsp;</span> : <></>}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatarImage} alt={`Avatar of ${sender}`} />
        </div>
      </div>
      <div className={`chat-bubble mb-3  px-2 ${sender === "start" ? 'bg-white' : 'bg-slate-200'} text-slate-600 `}>
        {content === "loading" ? <span className="loading loading-dots loading-lg mt-3"></span> : content}
        {sender === 'start' && content !== 'loading' && content !== 'How can I help you?' ? (
          <div className="flex align-items-center mt-5">
            <h4 className="text-gray font-bold">Was this helpful?</h4>
            <div className="ml-5 mr-2 cursor-pointer"
              onClick={() => vote()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <FaThumbsUp color={isHovered || isVoted ? `#EA4891` : `#EE71A9`} size="1.5em" />
            </div>
            <div className="mx-2 mt-1 cursor-pointer"
              onClick={() => unVote()}
              onMouseEnter={() => setIsDownHovered(true)}
              onMouseLeave={() => setIsDownHovered(false)}>
              <FaThumbsDown color={isDownHovered || isUnVoted ? `#999895` : `#B2B1AE`} size="1.5em" />
            </div>

          </div>) : (<></>)}
        {isVoted ? (<p className="text-slate-400 mt-3">You can also let us know what you think by typing below</p>) : (<></>)}
      </div>
    </div>
  );
}
