import { initializeApp } from "@firebase/app";
import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
const logo = require("../public/assets/images/orbit.png");

export const QrCodeModal = ({
  open,
  onClose,
  url = "https://skullfriends.vercel.app",
}) => {
  const ref = useRef(null);
  const [fileExt, setFileExt] = useState("png");
  const [move, setMove] = useState(null);

  const generate = async () => {
    if (typeof window !== "undefined") {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      const qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        data: url,
        margin: 0,
        qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 0 },
        dotsOptions: {
          type: "square",
          color: "#000000",
        },
        backgroundOptions: { color: "#ffffff00" },
        dotsOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#6a1a4c",
            color2: "#6a1a4c",
            rotation: "0",
          },
        },
        cornersSquareOptions: { type: "square", color: "#000000" },
        cornersSquareOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#000000",
            color2: "#000000",
            rotation: "0",
          },
        },
        cornersDotOptions: { type: "square", color: "#000000" },
        cornersDotOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#000000",
            color2: "#000000",
            rotation: "0",
          },
        },
        backgroundOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#ffffff",
            color2: "#ffffff",
            rotation: "0",
          },
        },
      });

      qrCode.append(ref.current);
      setMove("100px");
    }
  };

  useEffect(() => {
    // Dynamically import qr-code-styling only client-side
    generate();
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.position = "fixed";
      document.body.style.top = `0`;
      document.body.style.left = `0`;
      document.body.style.right = `0`;
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
    }
  }, [open]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-70 z-30"
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 right-0 bottom-0 center flex-col z-40 pointer-events-none">
        <div
          className="center bg-gradient-to-br from-pink-500 to-orange-300 rounded-full w-[300px] h-[300px] shadow-2xl"
          style={{
            boxShadow:
              "12px 12px 16px 0 rgba(255, 255, 255, 0.3) inset, -6px -6px 10px 0 rgba(0, 0, 0, .25) inset",
          }}
        >
          <div ref={ref} className="" />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.position = "fixed";
      document.body.style.top = `0`;
      document.body.style.left = `0`;
      document.body.style.right = `0`;
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
    }
  }, [open]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 opacity-70 z-30"
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 right-0 bottom-0 center flex-col z-40 pointer-events-none">
        <div className="flex flex-col items-center w-[90vw] sm:w-[500px] md:w-[600px] xl:w-[700px] max-h-screen overflow-y-auto scrollbar-thin mx-6 bg-white dark:bg-slate-900 dark:text-slate-300 shadow-lg rounded-lg pointer-events-auto">
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
