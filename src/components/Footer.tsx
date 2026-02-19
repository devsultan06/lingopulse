import { Link } from "react-router-dom";
import { LingoPulseLogo } from "./Navbar";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark-space text-white py-16 px-4 md:px-10 border-t-4 border-black font-satoshi relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Logo & Headline */}
        <Link to="/" className="flex items-center gap-4 mb-8 group">
          <LingoPulseLogo className="w-14 h-14" />
          <span className="text-3xl font-bold font-space-grotesk tracking-tighter">
            lingopulse
          </span>
        </Link>

        {/* Hackathon Description */}
        <div className="max-w-2xl mb-12">
          <h4 className="text-xl md:text-2xl font-black font-space-grotesk mb-4 uppercase tracking-tight text-blue-violet">
            {t("footer.headline")}
          </h4>
          <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed">
            {t("footer.description")}
          </p>
        </div>

        {/* Minimal Links */}
        <div className="flex gap-8 mb-12">
          <a
            href="#"
            className="text-white/60 hover:text-white transition-colors font-bold flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-blue-violet rounded-full"></span>
            {t("footer.twitter")}
          </a>
          <a
            href="mailto:hello@lingopulse.com"
            className="text-white/60 hover:text-white transition-colors font-bold flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-tangelo-orange rounded-full"></span>
            {t("footer.contact")}
          </a>
        </div>

        {/* Branding Footer */}
        <div className="border-t border-white/10 pt-10 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 font-bold">
          <p className="text-base text-center md:text-left">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-4 items-center">
            <span className="text-blue-violet font-black font-space-grotesk tracking-tight">
              {t("footer.hackathon")}
            </span>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs">
              🚀
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
