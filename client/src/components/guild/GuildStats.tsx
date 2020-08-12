import React from "react";
import StatsContainer from "./StatsContainer";

const GuildStats = () => {
  return (
    <div className="flex flex-col w-full md:w-1/3">
      <StatsContainer
        name="Weekly AP"
        amount={100}
        currency="AP"
      ></StatsContainer>
      <StatsContainer
        name="Weekly GP"
        amount={99.109}
        currency="GP"
      ></StatsContainer>
    </div>
  );
};

export default GuildStats;
