import { useState } from "react";
import styles from "../../../../../styles/Home.module.css";
type ShowActionProps = {
  showAction: Boolean;
  setShowAction: (showAction: Boolean) => void;
};
const ActionSelect = (props: ShowActionProps) => {
  const { showAction, setShowAction } = props;
  const [focusStyle, setFocusStyle] = useState<string>(
    " border-2 border-[#393939]"
  );
  // ^^^初期値を背景色と同じでborderを説得しておくことで
  // focus時にborderが現れたことでUIが少しズレるのを防ぐ

  return (
    <div className={showAction ? styles.fadein : styles.fadeout}>
      <div className="bg-[#393939] rounded-t-lg text-center h-full pt-2">
        <div className="pt-5">
          <button className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md">
            check
          </button>
          <button className="px-6 py-2 mx-8 border-gold-button transition-colors duration-300 transform rounded-md">
            bet
          </button>
          <button className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md">
            fold
          </button>
        </div>

        <div>
          <div className="text-6xl py-5 sm:text-5xl lg:text-7xl flex justify-center items-center">
            <h1 className={"p-2 rounded-md" + focusStyle}>2400000</h1>
          </div>

          <div className="tracking-widest flex flex-row justify-center items-center">
            <input
              id="range"
              type="range"
              className="flex w-10/12 mr-2 accent-[#95913f]"
              onTouchMove={() => setFocusStyle(" border-2 border-[#95913f]")}
              onTouchEnd={() => setFocusStyle(" border-2 border-[#393939]")}
            />
            <input
              type="number"
              className="w-6 h-6 rounded-md outline-none bg-[#757575] text-[#757575]"
              onFocus={() => setFocusStyle(" border-2 border-[#95913f]")}
              onBlur={() => setFocusStyle(" border-2 border-[#393939]")}
            />
          </div>
        </div>

        <button
          className="mt-8 px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md"
          onClick={() => setShowAction(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ActionSelect;
