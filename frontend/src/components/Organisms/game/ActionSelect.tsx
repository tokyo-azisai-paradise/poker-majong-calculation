import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../pages/_app";
import styles from "../../../../styles/Home.module.css";
import { ActionInfoType, ShowActionProps } from "../../../types/game/type";
import { useGameInfo } from "../../hooks/game/useGameInfo";
import BetChips from "../../modules/forms/game/BetChips";
import ActionButtons from "../../modules/select/game/ActionButtons";

const ActionSelect = ({ showAction, setShowAction }: ShowActionProps) => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const toCall = gameInfo.roomData.toCall;
  const bettingTips = gameInfo.users[userInfo.userID!].bettingTips;
  const stack = gameInfo.users[userInfo.userID!].stack;

  const [actionInfo, setActionInfo] = useState<ActionInfoType>({
    canActions: ["call", "raise", "fold"],
    selectedAction: 0,
    willBet: toCall - bettingTips < stack ? toCall - bettingTips : stack,
  });

  useEffect(() => {
    if (toCall - bettingTips == 0) {
      setActionInfo({ ...actionInfo, canActions: ["check", "bet", "fold"] });
    }
  }, []);

  return (
    <div className={showAction ? styles.fadein : styles.fadeout}>
      <div className="bg-[#393939] rounded-t-lg text-center h-full pt-2">
        <ActionButtons {...{ actionInfo, setActionInfo }} />

        <BetChips {...{ actionInfo, setActionInfo }} />

        <div className="mt-10">
          <button
            className="px-6 py-2 mx-5 border-gold-button transition-colors duration-300 transform rounded-md"
            onClick={() => setShowAction(false)}
          >
            Cancel
          </button>
          <button className="px-6 py-2 mx-5 bg-gold-button transition-colors duration-300 transform rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionSelect;
