import { ChatBubbleIcon } from "../icons/ChatBubbleIcon";
import { ArrowsRightLeftIcon } from "../icons/ArrowsRightLeftIcon";

export function PostStats() {
  return (
    <>
      <button class="flex items-center gap-2 text-gray-600 hover:text-black transition-colors opacity-50">
        <ChatBubbleIcon class="w-5 h-5" />
        <span>0 response</span>
      </button>
      <button class="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors opacity-50">
        <ArrowsRightLeftIcon class="w-5 h-5" />
        <span>0 reshare</span>
      </button>
    </>
  );
}
