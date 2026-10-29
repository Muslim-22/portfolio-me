"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="page-loader">
        <div className="page-loader__spinner" />
      </div>

      <style jsx>{`
        .page-loader {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #07070a;
        }

        .page-loader__spinner {
          width: 55px;
          height: 55px;
          border: 3px solid rgba(139, 92, 246, 0.2);
          border-top-color: #8b5cf6;
          border-right-color: #38bdf8;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.25);
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}