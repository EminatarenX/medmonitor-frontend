import { Message } from "../../../interfaces/message.interface";
import { useHelpers } from "../../../hooks/helpers/useHelpers";

interface Props {
    message: Message;
    toMessage: string;
    
}

export const MessageInChat = ({message, toMessage}: Props) => {
    const { id, content, createdAt, senderId } = message;
    const { formatDate } = useHelpers();
  return (
    <article
    key={id}
    className={`flex flex-col rounded-full py-2 px-8 appear-up ${
      senderId === toMessage
        ? "mr-auto bg-neutral-800"
        : "ml-auto bg-neutral-950"
    }`}
  >
    <p className="text-gray-400">{content}</p>
    <p className="text-gray-400 text-xs opacity-60">
      {formatDate(createdAt)}
    </p>
  </article>
  )
}
