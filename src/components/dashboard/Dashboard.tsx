import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LogOut,
  Globe,
  ChevronDown,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "es", label: "ES" },
    { code: "ar", label: "AR" },
    { code: "ha", label: "HA" },
  ];

  const currentLangLabel =
    languages.find((l) => l.code === i18n.language)?.label || "EN";

  const availableRooms = [
    { id: "global-1", name: "Global Pulse", activeUsers: 128, type: "General" },
    {
      id: "tech-talks",
      name: "Tech Discussion",
      activeUsers: 45,
      type: "Topic",
    },
    {
      id: "community-hub",
      name: "Community Hub",
      activeUsers: 89,
      type: "Social",
    },
    {
      id: "hausa-circle",
      name: "Hausa Circle",
      activeUsers: 34,
      type: "Cultural",
    },
  ];

  const handleRoomClick = (roomId: string) => {
    navigate(`/dashboard/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-daisy-white font-space-grotesk p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Simple Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-black overflow-hidden bg-white shadow-[2px_2px_0px_0px_#000]">
              <img
                src={
                  user?.user_metadata?.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter leading-none">
                {t("dashboard.hello")}{" "}
                <span className="text-blue-violet subrayado">
                  {user?.user_metadata?.full_name?.split(" ")[0] || "Friend"}
                </span>
              </h1>
              <p className="font-bold opacity-40 text-sm">
                {t("dashboard.welcome")}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {/* Language Selection */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 font-black bg-white border-2 border-black px-5 py-3 rounded-2xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <span>🌐</span>
                <span>{currentLangLabel}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-3 bg-white border-2 border-black rounded-2xl p-2 shadow-[4px_4px_0px_0px_#000] min-w-[140px] z-[110]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 font-black rounded-xl transition-colors ${i18n.language === lang.code ? "bg-blue-violet text-white" : "hover:bg-blue-violet/10"}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => signOut()}
              className="p-3 border-2 border-black rounded-2xl hover:bg-black/5 transition-all text-tangelo-orange shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <LogOut size={24} />
            </button>
          </div>
        </header>

        {/* Hero Entry Section */}
        <section className="mb-12 md:mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.95] md:leading-[0.9]">
            {t("dashboard.heroTitle")}{" "}
            <span className="text-blue-violet">
              {t("dashboard.heroTitleHighlight")}
            </span>
            <br className="hidden sm:block" />
            {t("dashboard.heroTitle2")}{" "}
            <span className="text-azure-green">
              {t("dashboard.heroTitle2Highlight")}
            </span>
          </h2>
          <p className="text-lg md:text-xl font-bold opacity-60 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
            {t("dashboard.heroSubtitle")}
          </p>
          <button
            onClick={() => handleRoomClick("global-1")}
            className="bg-azure-green border-2 border-black px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl font-black text-xl md:text-2xl text-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-3 mx-auto"
          >
            <Sparkles fill="white" className="w-5 h-5 md:w-6 md:h-6" />
            {t("dashboard.quickJoin")}
            <ArrowRight strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </section>

        {/* Room Selection Grid */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight underline appearance-none decoration-2 decoration-tangelo-orange underline-offset-8 uppercase">
              {t("dashboard.communitiesTitle")}
            </h3>
            <button className="flex items-center gap-2 font-black text-blue-violet hover:underline text-sm md:text-base">
              <Plus strokeWidth={3} size={20} />
              {t("dashboard.newRoom")}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:grid-cols-2 md:gap-8">
            {availableRooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.01, rotate: -0.5 }}
                onClick={() => handleRoomClick(room.id)}
                className="bg-white border-2 border-black p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-[4px_4px_0px_0px_#000] md:shadow-[6px_6px_0px_0px_#000] cursor-pointer group flex flex-col justify-between min-h-[180px] md:min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-lagoon-blue/20 border-2 border-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {room.type}
                    </span>
                    <div className="flex items-center gap-1.5 translate-y-1">
                      <span className="w-2.5 h-2.5 bg-azure-green rounded-full animate-pulse shadow-[1px_1px_0_0_#000]" />
                      <span className="text-[10px] font-black opacity-40 uppercase tracking-tighter">
                        {room.activeUsers} {t("dashboard.live")}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 group-hover:text-blue-violet transition-colors">
                    {room.name}
                  </h4>
                  <p className="font-bold opacity-40 text-xs md:text-sm">
                    {t("dashboard.roomSubtitle")}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl md:rounded-2xl flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                    <ArrowRight
                      strokeWidth={3}
                      size={20}
                      className="md:w-6 md:h-6"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Meta */}
        <footer className="mt-32 text-center pb-12">
          <div className="flex items-center justify-center gap-2 font-black text-xs opacity-20 uppercase tracking-[0.5em]">
            <Globe size={14} />
            {t("dashboard.engineActive")}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
