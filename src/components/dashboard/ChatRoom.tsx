import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LingoPulseLogo } from "../Navbar";
import {
  ArrowLeft,
  Send,
  Globe,
  Languages,
  Smile,
  MoreVertical,
  Hash,
  Users,
  Search,
  Bell,
  X,
  Menu,
} from "lucide-react";

interface Message {
  id: number;
  user: string;
  avatar: string;
  originalText: string;
  translatedText: string;
  originalLang: string;
  isMe: boolean;
  timestamp: string;
}

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Marie",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
      originalText: "Bonjour tout le monde! Comment ça va aujourd'hui?",
      translatedText: "Hello everyone! How is it going today?",
      originalLang: "French",
      isMe: false,
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      user: "Sultan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sultan",
      originalText: "I'm doing great, Marie! Excited to test this platform.",
      translatedText:
        "Je vais très bien, Marie ! Ravi de tester cette plateforme.",
      originalLang: "English",
      isMe: true,
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      user: "Yuki",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
      originalText: "こんにちは！この翻訳はすごいですね。",
      translatedText: "Hello! This translation is amazing.",
      originalLang: "Japanese",
      isMe: false,
      timestamp: "10:35 AM",
    },
  ]);

  const rooms = [
    { id: "global-1", name: "Global Pulse" },
    { id: "tech-talks", name: "Tech Discussion" },
    { id: "community-hub", name: "Community Hub" },
    { id: "hausa-circle", name: "Hausa Circle" },
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      user: user?.user_metadata?.full_name || "Me",
      avatar:
        user?.user_metadata?.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`,
      originalText: inputText,
      translatedText: `[Auto-Translated]: ${inputText}`,
      originalLang:
        i18n.language === "en"
          ? "English"
          : i18n.language === "fr"
            ? "French"
            : i18n.language === "ha"
              ? "Hausa"
              : "Other",
      isMe: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const SidebarContent = () => (
    <>
      <div className="h-[88px] p-5 border-b-4 border-black flex items-center justify-between bg-daisy-white/50 shrink-0">
        <div className="flex items-center gap-3">
          <LingoPulseLogo className="w-8 h-8 md:w-9 md:h-9" />
          <span className="font-black text-lg md:text-xl tracking-tighter">
            PULSE
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="p-2 hover:bg-black/5 rounded-xl transition-colors md:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 px-2">
            Browse Rooms
          </h3>
          <div className="space-y-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  navigate(`/dashboard/room/${room.id}`);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-black text-sm transition-all group ${roomId === room.id ? "bg-blue-violet text-white shadow-[2px_2px_0px_0px_#000] border-2 border-black" : "hover:bg-blue-violet/5 border-2 border-transparent"}`}
              >
                <Hash
                  size={16}
                  className={
                    roomId === room.id
                      ? "text-white"
                      : "text-black/30 group-hover:text-blue-violet"
                  }
                  strokeWidth={3}
                />
                {room.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 px-2">
            Live Pulsers
          </h3>
          <div className="space-y-4 px-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                    className="w-8 h-8 rounded-xl border-2 border-black bg-white"
                    alt="user"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-azure-green border-2 border-black rounded-full" />
                </div>
                <span className="font-bold text-xs text-dark-space/80">
                  User_{i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[160px] p-5 border-t-4 border-black bg-daisy-white/50 flex flex-col justify-center shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={
              user?.user_metadata?.avatar_url ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
            }
            className="w-10 h-10 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000]"
            alt="Profile"
          />
          <div className="min-w-0">
            <p className="font-black text-xs truncate uppercase tracking-tighter">
              {user?.user_metadata?.full_name || "Friend"}
            </p>
            <p className="text-[9px] font-bold opacity-40 truncate uppercase tracking-widest">
              Active Pulse
            </p>
          </div>
        </div>
        <button className="w-full py-2.5 bg-white border-2 border-black rounded-xl font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
          My Settings
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-daisy-white font-space-grotesk overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop & Mobile */}
      <motion.aside
        initial={false}
        animate={{
          x: window.innerWidth >= 768 ? 0 : isSidebarOpen ? 0 : -300,
          width: window.innerWidth >= 768 ? 280 : isSidebarOpen ? 300 : 0,
          opacity: 1,
        }}
        className={`fixed md:relative top-0 left-0 h-full bg-white border-r-4 border-black z-[110] flex flex-col overflow-hidden shrink-0 transition-all md:transition-none`}
      >
        <SidebarContent />
      </motion.aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        <header className="h-[88px] bg-white border-b-4 border-black px-4 md:px-6 flex items-center justify-between z-20 sticky top-0 shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 border-2 border-black rounded-xl hover:bg-black/5 active:translate-x-1 active:translate-y-1 transition-all"
            >
              <Menu size={18} />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 border-2 border-black rounded-xl hover:bg-black/5 active:translate-x-1 active:translate-y-1 transition-all"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="transition-all duration-300 md:ml-0">
              <div className="flex items-center gap-2">
                <Hash
                  size={20}
                  className="text-blue-violet md:w-6 md:h-6"
                  strokeWidth={4}
                />
                <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none uppercase truncate max-w-[120px] sm:max-w-none">
                  {roomId?.replace("-", " ")}
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-1 px-0.5">
                <Users size={10} className="opacity-30" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                  24 {t("chat.activePulsers")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="hidden lg:flex items-center gap-2 bg-azure-green/10 border-2 border-azure-green/30 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-azure-green rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-azure-green">
                {t("chat.translationActive")}
              </span>
            </div>
            <div className="flex gap-0.5 md:gap-1">
              <button className="p-2 md:p-2.5 hover:bg-black/5 rounded-xl transition-colors">
                <Search size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
              </button>
              <button className="p-2 md:p-2.5 hover:bg-black/5 rounded-xl transition-colors">
                <Bell size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
              </button>
              <button className="p-2 md:p-2.5 hover:bg-black/5 rounded-xl transition-colors">
                <MoreVertical
                  size={18}
                  className="md:w-5 md:h-5"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-daisy-white bg-[radial-gradient(#000_0.5px,transparent_0.5px)] md:bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] md:background-size:24px_24px] [background-position:0_0]">
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-12 pb-24">
            <div className="text-center">
              <span className="bg-white border-2 border-black px-4 md:px-6 py-1.5 md:py-2 rounded-full font-black text-[8px] md:text-[9px] uppercase tracking-[0.3em] shadow-[3px_3px_0px_0px_#000]">
                {t("chat.today")} May 24th
              </span>
            </div>

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 md:gap-4 ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className="flex-none self-start mt-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl border-2 border-black overflow-hidden bg-white shadow-[2px_2px_0px_0px_#000]">
                    <img
                      src={msg.avatar}
                      alt={msg.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Box */}
                <div
                  className={`max-w-[85%] md:max-w-[70%] space-y-1.5 ${msg.isMe ? "items-end text-right" : "items-start text-left"}`}
                >
                  <div className="flex items-center gap-2 px-2">
                    <span className="font-black text-[10px] md:text-[11px] uppercase tracking-tight">
                      {msg.user}
                    </span>
                    <span className="text-[8px] md:text-[9px] font-bold opacity-30">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`relative p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 border-black shadow-[3px_3px_0px_0px_#000] md:shadow-[4px_4px_0px_0px_#000] ${msg.isMe ? "bg-blue-violet text-white" : "bg-white text-black"}`}
                  >
                    {msg.isMe ? (
                      <p className="text-base md:text-lg font-bold leading-tight tracking-tight">
                        {msg.originalText}
                      </p>
                    ) : (
                      <div className="space-y-3 md:space-y-4">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2 opacity-30">
                            <Languages
                              className="w-2.5 h-2.5 md:w-3 md:h-3"
                              strokeWidth={3}
                            />
                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                              {msg.originalLang} ({t("chat.original")})
                            </span>
                          </div>
                          <p className="text-sm md:text-lg font-bold leading-snug tracking-tight">
                            {msg.originalText}
                          </p>
                        </div>

                        <div className="h-[2px] w-full bg-black/5" />

                        <div>
                          <div className="flex items-center gap-1.5 mb-2 text-blue-violet">
                            <Globe
                              className="w-2.5 h-2.5 md:w-3 md:h-3"
                              strokeWidth={3}
                            />
                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-none">
                              {i18n.language.toUpperCase()} (
                              {t("chat.translated")})
                            </span>
                          </div>
                          <p className="text-lg md:text-xl font-black tracking-tight leading-tight">
                            {msg.translatedText}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <footer className="h-[160px] bg-white border-t-4 border-black p-4 md:p-8 z-20 flex items-center shrink-0">
          <div className="max-w-4xl mx-auto w-full">
            <form
              onSubmit={handleSendMessage}
              className="relative group flex items-center gap-3 md:gap-4"
            >
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-black rounded-xl md:rounded-2xl translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2 group-focus-within:translate-x-1 group-focus-within:translate-y-1 transition-transform" />
                <div className="relative flex items-center bg-white border-2 border-black p-1.5 md:p-2 rounded-xl md:rounded-2xl gap-2">
                  <button
                    type="button"
                    className="p-2 md:p-3 text-black/20 hover:text-blue-violet transition-colors"
                  >
                    <Smile
                      className="w-5 h-5 md:w-6 md:h-6"
                      strokeWidth={2.5}
                    />
                  </button>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t("chat.inputPlaceholder", {
                      lang: i18n.language.toUpperCase(),
                    })}
                    className="flex-1 py-2 md:py-3 text-base md:text-lg font-bold outline-none placeholder:text-black/10 tracking-tight"
                  />
                  <div className="hidden lg:flex items-center gap-2 font-black text-[9px] opacity-40 uppercase border-r-2 border-black/10 pr-4 mr-2 tracking-widest">
                    <Globe size={14} strokeWidth={2.5} />
                    <span>{t("chat.autoDetect")}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-azure-green border-2 border-black p-4 md:p-5 rounded-xl md:rounded-2xl shadow-[3px_3px_0px_0px_#000] md:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center text-white disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
              >
                <Send
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="currentColor"
                  strokeWidth={3}
                />
              </button>
            </form>
            <div className="hidden sm:flex justify-center mt-6 gap-8">
              <div className="flex items-center gap-2 opacity-20 hover:opacity-100 transition-opacity cursor-default">
                <div className="w-1.5 h-1.5 bg-azure-green rounded-full shadow-[1px_1px_0_0_#000]" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                  PULSE SYNC ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 opacity-20 hover:opacity-100 transition-opacity cursor-default">
                <div className="w-1.5 h-1.5 bg-blue-violet rounded-full shadow-[1px_1px_0_0_#000]" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                  LINGO.DEV v2.5
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatRoom;
