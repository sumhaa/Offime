import { useState } from "react";

function Sse() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("CL_access_token");

  const onClick = () => {
    const eventSource = new EventSource("http://localhost:8080/subscribe", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    eventSource.addEventListener("message", (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    });

    eventSource.onerror = () => {
      eventSource.close(); //연결 끊기
    };
  };

  return (
    <>
      <button onClick={onClick}>click</button>
      <div className="App">
        <h1>Server-Sent Events</h1>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Sse;
