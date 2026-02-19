import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  LogOut,
  MessageSquare,
  Globe,
  Users,
  Settings,
  Bell,
  Search,
} from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  // Mock data for the dashboard
  const stats = [
    { label: "Messages Translated", value: "1,284", color: "bg-blue-violet" },
    { label: "Active Communities", value: "12", color: "bg-azure-green" },
    { label: "Languages Learned", value: "3", color: "bg-tangelo-orange" },
  ];

  const recentChats = [
    {
      name: "Global Pulse",
      lastMsg: "Bonjour à tous!",
      time: "2m ago",
      img: "🌍",
    },
    { name: "Spanish Room", lastMsg: "¡Qué guay!", time: "15m ago", img: "💃" },
    {
      name: "Hausa Circle",
      lastMsg: "Sannu de zuwa",
      time: "1h ago",
      img: "🇳🇬",
    },
  ];

  return (
    <div className="min-h-screen bg-daisy-white font-satoshi p-4 md:p-8">
      {/* Sidebar - Desktop */}
      <div className="max-w-7xl mx-auto flex gap-8">
        <aside className="hidden lg:flex flex-col w-64 gap-4">
          <div className="bg-white border-4 border-black rounded-[32px] p-6 shadow-[6px_6px_0px_0px_#000]">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-black rounded-3xl translate-x-1 translate-y-1 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform" />
                <div className="relative w-20 h-20 rounded-3xl border-4 border-black overflow-hidden bg-lagoon-blue">
                  <img
                    src={
                      user?.user_metadata?.avatar_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-black text-xl tracking-tight leading-none mb-1">
                  {user?.user_metadata?.full_name || "Lingo User"}
                </h3>
                <p className="text-sm font-bold text-dark-space/40">
                  @{user?.email?.split("@")[0]}
                </p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <NavItem icon={<Globe />} label="Explore" active />
              <NavItem icon={<MessageSquare />} label="Messages" />
              <NavItem icon={<Users />} label="Communities" />
              <NavItem icon={<Bell />} label="Notifications" />
              <NavItem icon={<Settings />} label="Settings" />
            </nav>

            <button
              onClick={() => signOut()}
              className="mt-8 w-full flex items-center gap-3 p-4 font-black border-2 border-transparent text-tangelo-orange hover:bg-tangelo-orange/10 rounded-2xl transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          <div className="bg-lagoon-blue border-4 border-black rounded-[32px] p-6 shadow-[6px_6px_0px_0px_#000]">
            <h4 className="font-black mb-2 tracking-tight">Pro Plan</h4>
            <p className="text-xs font-bold mb-4 opacity-70">
              Unlock unlimited real-time translations.
            </p>
            <button className="w-full bg-white border-2 border-black py-2 rounded-xl font-black text-sm shadow-[3px_3px_0px_0px_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all">
              Upgrade
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8">
          {/* Header */}
          <header className="flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-space/40" />
              <input
                type="text"
                placeholder="Search rooms or languages..."
                className="w-full bg-white border-4 border-black rounded-2xl py-4 pl-12 pr-4 font-bold shadow-[4px_4px_0px_0px_#000] focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all outline-none"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-blue-violet border-4 border-black rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_0px_0px_#000] cursor-pointer">
                <Bell />
              </div>
            </div>
          </header>

          {/* Greeting */}
          <section>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 italic">
              Welcome back,{" "}
              <span className="text-blue-violet subrayado">
                {user?.user_metadata?.full_name?.split(" ")[0] || "Friend"}!
              </span>
            </h1>
            <p className="text-lg font-bold text-dark-space/60">
              Ready for some global conversations today?
            </p>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, rotate: i % 2 === 0 ? 1 : -1 }}
                className={`${stat.color} border-4 border-black p-6 rounded-[32px] shadow-[6px_6px_0px_0px_#000] text-white`}
              >
                <div className="text-4xl font-black mb-1">{stat.value}</div>
                <div className="font-bold opacity-80 uppercase text-xs tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Live Rooms */}
            <div className="bg-white border-4 border-black rounded-[40px] p-8 shadow-[8px_8px_0px_0px_#000]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black tracking-tight">
                  Active Pulse Rooms
                </h3>
                <button className="text-blue-violet font-black underline">
                  View All
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {recentChats.map((chat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 border-4 border-black rounded-3xl hover:bg-soft-blue/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-14 h-14 bg-daisy-white border-2 border-black rounded-2xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_#000] group-hover:scale-110 transition-transform">
                      {chat.img}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-black text-lg leading-none">
                          {chat.name}
                        </h4>
                        <span className="text-xs font-bold text-dark-space/40">
                          {chat.time}
                        </span>
                      </div>
                      <p className="font-bold text-dark-space/60 text-sm truncate">
                        {chat.lastMsg}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Featured */}
            <div className="bg-azure-green/20 border-4 border-black rounded-[40px] p-8 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
              <div className="absolute top-4 right-4 animate-spin-slow">
                <Globe
                  className="w-24 h-24 text-azure-green opacity-20"
                  strokeWidth={3}
                />
              </div>
              <h3 className="text-2xl font-black mb-4 relative z-10">
                Language Spotlight
              </h3>
              <p className="font-bold text-lg mb-8 opacity-80 relative z-10">
                Did you know that "E kaabo" in Yoruba means "Welcome"? Try
                joining the Yoruba room today!
              </p>
              <button className="bg-azure-green border-4 border-black px-8 py-4 rounded-2xl font-black text-white text-xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all relative z-10">
                Explore Yoruba
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <button
    className={`flex items-center gap-4 p-4 rounded-2xl font-black text-lg transition-all border-2 ${active ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_#blue-violet]" : "hover:bg-black/5 border-transparent"}`}
  >
    {icon}
    {label}
  </button>
);

export default Dashboard;
