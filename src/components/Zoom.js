import React, { useState } from "react";


const Zoom = ({ content }) => {
    const [zoomLevel, setZoomLevel] = useState(1); // مستوى التكبير الافتراضي
  
    // زيادة التكبير
    const increaseZoom = () => {
      setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3)); // الحد الأقصى للتكبير 3
    };
  
    // تقليص التكبير
    const decreaseZoom = () => {
      setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1)); // الحد الأدنى للتكبير 1
    };
  
    return (
      <div>
        {/* أزرار التكبير والتصغير */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={increaseZoom}>
            +
          </button>
          <button onClick={decreaseZoom}>
            -
          </button>
        </div>
  
        {/* النص المتأثر بالتكبير */}
        <div
          className="zoom-text"
          style={{
            fontSize: `${zoomLevel * 16}px`, // تغيير حجم الخط بناءً على مستوى التكبير
            transition: "font-size 0.3s ease", // تأثير سلس عند تغيير الحجم
            whiteSpace: "pre-wrap", // لضمان عرض النص بشكل مناسب
          }}
        >
          {content}
        </div>
      </div>
    );
  };

  export default Zoom;