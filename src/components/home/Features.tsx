import { motion } from "framer-motion";
import { MessageSquareText, Languages, Zap, Repeat, Users } from "lucide-react";

const features = [
  {
    title: "Speak Freely",
    description:
      "Post messages in your native language without worrying about barriers.",
    icon: MessageSquareText,
    color: "#60AEFE",
  },
  {
    title: "Instant Translation",
    description:
      "Messages are automatically translated by Lingo.dev for every user in real-time.",
    icon: Languages,
    color: "#FFA352",
  },
  {
    title: "Real-Time Interaction",
    description:
      "Conversations update live as they happen. No refreshing needed.",
    icon: Zap,
    color: "#dcf7e7",
  },
  {
    title: "Translated Replies",
    description: "Every reply comes back in your language automatically.",
    icon: Repeat,
    color: "#FFBDFF",
  },
  {
    title: "Inclusive Community",
    description:
      "Everyone participates equally, no matter where they are from.",
    icon: Users,
    color: "#FF611E",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-40 bg-[#6E48FF]  min-h-screen flex flex-col items-center justify-center"
    >
      {/* Top-Left Blue Spike */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 z-20 pointer-events-none">
        <img
          src="/images/blue_spike.svg"
          alt="Decoration"
          className="w-[150px] h-[150px] md:w-[279px] md:h-[279px]"
        />
      </div>

      {/* Bottom-Right Red Spike */}
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 z-20 pointer-events-none">
        <img
          src="/images/red_spike.svg"
          alt="Decoration"
          className="w-[150px] h-[150px] md:w-[279px] md:h-[279px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <h2 className="text-5xl md:text-7xl font-black font-space-grotesk text-white text-center mb-32 tracking-tighter">
          What Makes It Powerful?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border-4 border-black rounded-[32px] p-8 pt-12 shadow-[4px_4px_0px_0px_#000] hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Icon Badge */}
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 w-20 h-20 rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000] z-20"
                style={{ backgroundColor: feature.color }}
              >
                <feature.icon className="w-8 h-8 text-white stroke-[2.5px]" />
              </div>

              <h3 className="text-2xl font-black font-space-grotesk mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-lg font-medium text-[#1C303C] leading-relaxed font-satoshi">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Badge/Pill - Overlapping Section Boundary */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 w-max">
        <div className="bg-[#E2F7ED] border-4 border-black rounded-full px-6 py-3 md:px-12 md:py-6 flex items-center gap-3 md:gap-4 shadow-[4px_4px_0px_0px_#000] md:shadow-[6px_6px_0px_0px_#000] rotate-[-2deg] hover:rotate-0 transition-transform duration-300 cursor-pointer">
          <span className="text-xl md:text-3xl font-black font-space-grotesk tracking-tighter">
            Built for{" "}
            <span className="text-tangelo-orange italic underline">
              Connection
            </span>
          </span>
          <div className="w-8 h-8 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center text-white text-base md:text-2xl">
            ✨
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
