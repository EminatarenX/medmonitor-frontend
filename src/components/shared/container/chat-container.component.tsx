import { Fragment, useEffect, useRef, useState } from "react";
import { Chat } from "../../../interfaces/chat.interface";
import { Message } from "../../../interfaces/message.interface";
import { MessageInChat } from "../app/message";
import { ChatHeader } from "../app/chat-header";

interface Props {
  create?: () => Promise<void>;
  sendMessage(chatId: string, to: string, message: string): Promise<void>;
  chat?: Chat;
  loading: boolean;
  messages?: Record<string, Message>;
  user: string;
}

export const ChatContainer = ({
  create,
  sendMessage,
  chat,
  messages = {},
  loading,
  user,
}: Props) => {
  const toMessage = user === chat?.doctorId ? chat?.patientId : chat?.doctorId;
  const [content, setContent] = useState<string>("");
  const chatBoxRef = useRef<HTMLDivElement>(null);
  console.log({from: toMessage, to: user})

  const handleSendMessage = async () => {
    if (content.trim() === "") return;
    await sendMessage(chat?.id!, toMessage!, content);
    setContent("");
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <Fragment>
      <ChatHeader to={toMessage!}  from={user} />
      {!chat ? (
        <section className="flex flex-col justify-center items-center h-96">
          <p className="text-xl text-gray-400 mb-4">No hay mensajes</p>
          <button
            onClick={create}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Iniciar chat
          </button>
        </section>
      ) : !chat && loading ? (
        <section className="flex flex-col justify-center items-center h-96">
          <p className="text-xl text-gray-400 mb-4">Cargando...</p>
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <article className="flex flex-col gap-4">
            <section
              ref={chatBoxRef}
              className="flex flex-col gap-4 overflow-y-auto scrollbar-hide max-h-[420px]"
            >
              {Object.values(messages).length === 0 ? (
                <p className="text-gray-400">No hay mensajes</p>
              ) : (
                Object.values(messages).map((message) => (
                  <MessageInChat
                    key={message.id}
                    message={message}
                    toMessage={toMessage!}
                  />
                ))
              )}
            </section>
          </article>
          <div className="flex flex-col gap-4">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="p-4 bg-gray-800 text-gray-300 rounded-md"
              placeholder="Escribe un mensaje..."
            ></textarea>
            <button
              onClick={handleSendMessage}
              type="button"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              Enviar
            </button>
          </div>
        </section>
      )}
    </Fragment>
  );
};
