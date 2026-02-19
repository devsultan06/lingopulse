import { motion, AnimatePresence } from "framer-motion";
import { LingoPulseLogo } from "../Navbar";
import { useTranslation } from "react-i18next";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinModal = ({ isOpen, onClose }: JoinModalProps) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={onClose}
  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
/>

{/* Modal Container */}
<motion.div
  initial={{ scale: 0.9, opacity: 0, y: 20, rotate: -2 }}
  animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
  exit={{ scale: 0.9, opacity: 0, y: 20, rotate: 2 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
  className="relative bg-white border-4 border-black rounded-[40px] p-8 md:p-12 max-w-md w-full shadow-[6px_6px_0px_0px_#000] overflow-hidden"
>
  {/* Decorative Sparkles */}
  <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-violet/10 rounded-full blur-3xl" />
  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-tangelo-orange/10 rounded-full blur-3xl" />

  {/* Close Button */}
  <button
    onClick={onClose}
    className="absolute top-6 right-6 p-2 border-2 border-black rounded-xl hover:bg-black/5 transition-colors"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  <div className="flex flex-col items-center text-center">
    <LingoPulseLogo className="w-16 h-16 mb-6" />

    <h2 className="text-3xl md:text-4xl font-black font-space-grotesk tracking-tighter mb-4">
      {t("joinModal.title1")}{" "}
      <span className="text-blue-violet">{t("joinModal.titleHighlight")}</span>
    </h2>

    <p className="text-[#1C303C]/70 font-medium mb-10 leading-relaxed">
      {t("joinModal.subtitle")}
    </p>

    {/* Google Login Button */}
    <button
      onClick={() => {
        /* Simulate Google Login */
        window.location.href = "https://accounts.google.com";
      }}
      className="w-full relative group"
    >
      <div className="absolute inset-0 bg-black rounded-2xl translate-x-1.5 translate-y-1.5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
      <div className="relative flex items-center justify-center gap-4 bg-white border-2 border-black py-4 px-6 rounded-2xl group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform active:translate-x-0 active:translate-y-0">
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="text-lg font-black font-space-grotesk tracking-tight">
          {t("joinModal.googleButton")}
        </span>
      </div>
    </button>

    <div className="mt-8 text-xs font-bold text-[#1C303C]/40 uppercase tracking-widest">
      {t("joinModal.terms")}
    </div>
  </div>

  {/* Decorative Corner Shape */}
  <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-azure-green border-4 border-black rotate-45" />
</motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JoinModal;
