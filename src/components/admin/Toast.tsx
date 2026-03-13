"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-6 right-6 z-[100] flex items-center gap-3 rounded-xl border px-5 py-3 shadow-lg backdrop-blur-xl"
      style={{
        background:
          type === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
        borderColor:
          type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
      }}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5 text-green-400" />
      ) : (
        <XCircle className="h-5 w-5 text-red-400" />
      )}
      <span
        className={`text-sm font-medium ${type === "success" ? "text-green-300" : "text-red-300"}`}
      >
        {message}
      </span>
      <button onClick={onClose} className="ml-2 text-white/50 hover:text-white">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
