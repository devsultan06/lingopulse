import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What are we building?",
    answer:
      "Lingopulse is a community-driven platform powered by Lingo.dev's AI localization engine. We leverage Lingo.dev to automate and perfect real-time, context-aware translations, allowing global communities to connect seamlessly without language barriers.",
  },
  {
    question: "Who is it meant for?",
    answer:
      "It's for anyone passionate about languages—from beginners taking their first steps to polyglots looking to maintain their fluency in a social environment.",
  },
  {
    question: "Is this community moderated? If yes, why?",
    answer:
      "Yes, we prioritize a safe and welcoming environment. Our moderators ensure that conversations remain respectful and follow our community guidelines.",
  },
  {
    question: "I have already applied. How long before I hear back?",
    answer:
      "We review applications daily! You should typically hear back from us within 24-48 hours via the email you provided.",
  },
  {
    question:
      "Can I promote my services or products in any of the channels here?",
    answer:
      "To maintain a focused and clean experience, we generally discourage self-promotion. However, we have specific channels for sharing useful resources!",
  },
  {
    question:
      "If I want to add my friends or colleagues to this community, how do I do it?",
    answer:
      "Once you're a member, you can find an invite link in your dashboard to share with your network. We'd love to have them!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#F0F4F2] relative">
      <div className="max-w-4xl mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-black font-space-grotesk text-center mb-12 tracking-tight text-[#1C303C]">
          FAQ's
        </h2>

        {/* Orange Spike Decoration Behind */}
        <div className="absolute top-[50px] -right-4 md:-right-16 z-0 block">
          <img
            src="/images/faq_orange_spike.png"
            alt=""
            className="w-[100px] md:w-[180px] h-auto pointer-events-none"
          />
        </div>
        <div className="absolute -bottom-10 -left-1 md:-bottom-12 md:-left-[80px] z-20 block">
          <img
            src="/images/flower_cta.svg"
            alt=""
            className="w-10 h-10 md:w-[60px] md:h-[60px]"
          />
        </div>

        {/* FAQ Container */}
        <div className="relative z-10 bg-white border-2 border-black rounded-[24px] overflow-hidden shadow-[2px_2px_0px_0px_#000]">
          {/* Flower Decoration on FAQ */}

          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-black/10 ${index !== faqs.length - 1 ? "border-b" : ""}`}
            >
              <button
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg md:text-xl font-bold font-satoshi tracking-tight text-[#1C303C]">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-[#1C303C]/40" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-8">
                      <p className="text-base md:text-lg font-medium text-[#1C303C]/60 font-satoshi leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
