import { motion } from "framer-motion";

const CommunityRules = () => {
  return (
    <section className="py-32 bg-[#F0F4F2] relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left Side Content */}
          <div className="lg:w-1/2 lg:sticky lg:top-48 self-start pt-4">
            <h2 className="text-4xl md:text-5xl font-black font-space-grotesk mb-8 tracking-tighter">
              The rules are simple!
            </h2>
            <p className="text-lg md:text-xl font-medium text-[#1C303C]/80 mb-12 leading-relaxed font-satoshi max-w-lg">
              To help maintain a safe and welcoming environment, we ask that all
              community members adhere to a few guidelines that are listed
              below.
            </p>

            <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000] max-w-md">
              <h4 className="text-lg font-black font-space-grotesk mb-2 uppercase tracking-tight">
                Note:
              </h4>
              <p className="text-base font-medium text-[#1C303C]/70 font-satoshi">
                Info shared by members cannot be considered as legal advice.
                Members are not responsible for the same.
              </p>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="lg:w-1/2 flex flex-col gap-10 w-full">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-[#DAC3FF] border-2 border-black rounded-[24px] p-8 shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                <h3 className="text-2xl font-black font-space-grotesk mb-3 tracking-tight">
                  Bring only good vibes!
                </h3>
                <p className="text-lg font-medium text-[#1C303C]/70 font-satoshi leading-relaxed">
                  The pulse of our community depends on your genuine intent to
                  collaborate and help, so bring in that dose of positivity,
                  please!
                </p>
              </div>
   
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="bg-[#E2F7ED] border-2 border-black rounded-[24px] p-8 shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                <h3 className="text-2xl font-black font-space-grotesk mb-3 tracking-tight">
                  Please refrain from Spamming or selling!
                </h3>
                <p className="text-lg font-medium text-[#1C303C]/70 font-satoshi leading-relaxed">
                  Let's keep our community focused, clean and free from
                  promotions! Nobody wants that!
                </p>
              </div>
   
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group lg:ml-8"
            >
              <div className="bg-[#FFA352] border-2 border-black rounded-[24px] p-8 shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                <h3 className="text-2xl font-black font-space-grotesk mb-3 tracking-tight">
                  Speak your mind!
                </h3>
                <p className="text-lg font-medium text-[#1C303C]/70 font-satoshi leading-relaxed">
                  This is a safe space that's free of bias, conflict and
                  criticism.
                </p>
              </div>
       
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityRules;
