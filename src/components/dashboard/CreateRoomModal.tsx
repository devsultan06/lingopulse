import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Hash, MessageSquare } from "lucide-react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal = ({ isOpen, onClose }: CreateRoomModalProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "rooms"), {
        name: name.trim(),
        description: description.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Error creating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-daisy-white border-4 border-black rounded-[40px] shadow-[8px_8px_0px_0px_#000] overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                  {t("dashboard.newRoom")}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 rounded-2xl transition-colors"
                >
                  <X strokeWidth={3} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/30 px-1">
                    Room Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-black rounded-2xl translate-x-1 translate-y-1 group-focus-within:translate-x-0.5 group-focus-within:translate-y-0.5 transition-transform" />
                    <div className="relative flex items-center bg-white border-2 border-black p-4 rounded-2xl gap-3">
                      <Hash
                        className="text-blue-violet"
                        size={20}
                        strokeWidth={3}
                      />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Arabic Learners"
                        className="flex-1 bg-transparent outline-none font-bold text-lg placeholder:text-black/10"
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/30 px-1">
                    Description
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-black rounded-2xl translate-x-1 translate-y-1 group-focus-within:translate-x-0.5 group-focus-within:translate-y-0.5 transition-transform" />
                    <div className="relative flex items-center bg-white border-2 border-black p-4 rounded-2xl gap-3">
                      <MessageSquare
                        className="text-azure-green"
                        size={20}
                        strokeWidth={3}
                      />
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What's this room about?"
                        className="flex-1 bg-transparent outline-none font-bold text-lg placeholder:text-black/10"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="w-full bg-blue-violet border-2 border-black py-5 rounded-3xl font-black text-xl text-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 disabled:grayscale mt-4"
                >
                  {loading ? "CREATING..." : "CREATE ROOM"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateRoomModal;
