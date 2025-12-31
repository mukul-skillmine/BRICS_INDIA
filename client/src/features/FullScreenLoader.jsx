import { createPortal } from "react-dom";

const FullScreenLoader = ({ text = "Loading..." }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999] text-black">
      <div className="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">{text}</span>
      </div>
    </div>,
    document.body
  );
};

export default FullScreenLoader;
