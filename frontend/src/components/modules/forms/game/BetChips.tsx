import type { ActionInfoProps } from "../../../../types/game/type";
import { useGameInfo } from "../../../hooks/game/useGameInfo";

// eslint-disable-next-line react/display-name
const BetChips = ({ actionInfo, setActionInfo }: ActionInfoProps) => {
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const toCall = gameInfo.roomData.toCall;
  const bettingTips = gameInfo.users["Uasdfas"].bettingTips; // useIDに自分のを入れるように今後する
  const stack = gameInfo.users["Uasdfas"].stack; // useIDに自分のを入れるように今後する
  const pot = gameInfo.roomData.pot;

  // 条件分岐が複雑なためswitchを用いてわかりやすくする。
  const changeBetValue = (betValue: number) => {
    switch (true) {
      case betValue < toCall - bettingTips:
        setActionInfo({
          ...actionInfo,
          willBet: Math.min(toCall - bettingTips, stack),
        });
        break;
      case betValue > stack:
        setActionInfo({ ...actionInfo, willBet: stack });
        break;
      default:
        setActionInfo({ ...actionInfo, willBet: betValue });
    }
  };

  return (
    <div>
      <div className="pt-5 flex justify-center items-center">
        <input
          type="number"
          autoComplete="off"
          value={actionInfo.willBet}
          onChange={(e) =>
            setActionInfo({ ...actionInfo, willBet: Number(e.target.value) })
          }
          onBlur={() => changeBetValue(actionInfo.willBet)}
          className="text-center text-5xl p-2 h-16 w-9/12 sm:w-5/12 md:w-3/12 bg-[#4f4e4e] text-[#95913f] rounded-md outline-none"
        />
      </div>
      <div className="pt-3">
        {[0.5, 2, 3, 4].map((value, key) => {
          return (
            <button
              key={key}
              className="px-2 py-2 mr-3 border-gold-button transition-colors duration-300 transform rounded-md"
              onClick={() => changeBetValue(pot * value)}
              // ^^^もしstage変わるまでpotが変わらないパターンのときは(pot + toCall) * value
            >
              ×{value}
            </button>
          );
        })}

        <button
          className="px-2 py-2 ml-3 border-gold-button transition-colors duration-300 transform rounded-md"
          onClick={() => changeBetValue(stack)}
        >
          all in
        </button>
      </div>
    </div>
  );
};

export default BetChips;
