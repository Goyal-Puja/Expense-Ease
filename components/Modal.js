export default function Modal({ show, onClose, children }) {
  return (
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
      }}
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500"
    >
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 mt-6">
        <button
          className="w-10 h-10 mb-4 ml-4 font-bold bg-slate-600 rounded-full"
          onClick={() => {
            onClose(false);
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
