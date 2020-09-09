import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher";
import axios from "./axios";

function App() {
  const [mesages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/message/sync").then((response) => {
         setMessages(response.data);
    });
  }, [input]);

  useEffect(() => {
    const pusher = new Pusher("e819827525f94bc5fe2d", {
      cluster: "ap1",
    });

    const channel = pusher.subscriber("messages");
    channel.bind("inserted", (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]);

  console.log(messages)

  return (
    <div className="App">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
