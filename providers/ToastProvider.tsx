"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
       toastOptions={{
          style: {
            background: "#333",
            color: "#FFF"
          }
       }}
    />
  )
}

export default ToastProvider
