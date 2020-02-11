import React from "react";
import "./Paddle.css";

export default function Paddle({ movement }) {
  return (
    <div
      className="paddle"
      style={{
        top: `${movement.y}px`,
        transform: `rotate(${movement.r}deg)`
      }}
    >
      {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1_JcNN2OftqsySENrADEt1zHo3jB97OokecmPQLRbzrkB_OCO"
          alt="wood"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWYQBmpGtCqLHz0NR8sH0n6cAHC0t7NoC9Wx8fUvHQsaDupLwb"
          alt="wood"
        /> */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJF2XAegilavKuCg_o3s8ZTbgEdNOBcu7COJtl9JSX2f_Az2EB"
        alt="wood"
      />
    </div>
  );
}
