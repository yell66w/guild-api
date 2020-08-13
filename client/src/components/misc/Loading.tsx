import React from "react";
import { css } from "@emotion/core";
import Loader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #38b2ac;
`;
const Loading = () => {
  return (
    <div className="sweet-loading flex items-center mt-56 ">
      <Loader css={override} size={20} color={"#38b2ac"} loading={true} />
    </div>
  );
};

export default Loading;
