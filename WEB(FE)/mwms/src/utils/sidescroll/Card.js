import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import React from 'react';

function Card({ itemId, selected, onClick, title }) {
  const visibility = useContext(VisibilityContext);
  const visible = visibility.isItemVisible(itemId);

  return (
    <div
      onClick={() => onClick()}
      role="button"
      style={{
        border: "1px solid",
        display: "inline-block",
        margin: "0 10px",
        width: "160px",
        userSelect: "none"
      }}
      tabIndex={0}
      className="card"
    >
      <div>
        <div>{title}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          backgroundColor: selected ? "green" : "bisque",
          height: "200px"
        }}
      />
    </div>
  );
}

export default Card