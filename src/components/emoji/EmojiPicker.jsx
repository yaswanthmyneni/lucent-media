import Picker, { SKIN_TONE_MEDIUM_LIGHT } from "emoji-picker-react";
import { useEffect, useState } from "react";

const EmojiPicker = ({ setContent }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
  };

  useEffect(() => {
    if (chosenEmoji) {
      setContent((prev) => prev + `${chosenEmoji} `);
      setChosenEmoji(null);
    }
  }, [chosenEmoji, setChosenEmoji, setContent]);

  return (
    <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_LIGHT} />
  );
};

export { EmojiPicker };
