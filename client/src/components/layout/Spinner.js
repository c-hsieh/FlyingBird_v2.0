import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div>
      <h4 className="mt-1 justify-content-center mx-auto">
        <span style={{ fontSize: "0.8em", color: "#777777" }}>
          因為此網站查詢資料是同步與學校資料庫要資料，如果校方資料庫使用人數爆滿，導致無法查詢，請耐心等候...稍後再試
        </span>
      </h4>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "200px", margin: " 40px auto", display: "block" }}
      />
    </div>
  );
};
