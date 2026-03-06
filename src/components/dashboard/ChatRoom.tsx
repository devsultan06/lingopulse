import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LingoPulseLogo } from "../Navbar";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  ArrowLeft,
  Send,
  Globe,
  Smile,
  MoreVertical,
  Hash,
  Users,
  Search,
  Bell,
  X,
  Menu,
  Mic,
  Square,
  Trash2,
  Check,
  CheckCheck,
  Crown,
  Settings,
} from "lucide-react";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { translateText } from "../../lib/translation";

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const [messages, setMessages] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const typingTimeoutRef = useRef<any>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<any>(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEmojiClick = (emojiData: { emoji: string }) => {
    setInputText((prev) => prev + emojiData.emoji);
    // Trigger typing update when emoji is added
    if (user && roomId) {
      setDoc(doc(db, "rooms", roomId, "typing", user.uid), {
        userName: user.displayName || "User",
        userAvatar:
          user.photoURL ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        timestamp: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    // Fetch all rooms for sidebar
    const unsubscribeRooms = onSnapshot(collection(db, "rooms"), (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData);
    });

    // Fetch online users
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOnlineUsers(usersData);
    });

    return () => {
      unsubscribeRooms();
      unsubscribeUsers();
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;

    // Fetch current room details
    const unsubscribeRoom = onSnapshot(doc(db, "rooms", roomId), (docSnap) => {
      if (docSnap.exists()) {
        setCurrentRoom({ id: docSnap.id, ...docSnap.data() });
      } else {
        setCurrentRoom(null);
      }
    });

    // Fetch messages for current room
    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("createdAt", "asc"),
    );

    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    // Fetch typing users
    const unsubscribeTyping = onSnapshot(
      collection(db, "rooms", roomId, "typing"),
      (snapshot) => {
        const typingData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((u) => u.id !== user?.uid); // Don't show myself
        setTypingUsers(typingData);
      },
    );

    return () => {
      unsubscribeRoom();
      unsubscribeMessages();
      unsubscribeTyping();
    };
  }, [roomId, user?.uid]);

  // Translation Effect
  useEffect(() => {
    const handleTranslations = async () => {
      if (!roomId || !user) return;
      const targetLang = i18n.language;

      for (const msg of messages) {
        // If not sent by me and not in my language
        if (msg.senderId !== user.uid && msg.language !== targetLang) {
          // If translation doesn't exist for this language
          if (!msg.translations || !msg.translations[targetLang]) {
            try {
              const translated = await translateText(
                msg.text,
                targetLang,
                msg.language,
              );

              // Only update if we actually got a translation
              if (translated && translated !== msg.text) {
                await updateDoc(doc(db, "rooms", roomId, "messages", msg.id), {
                  [`translations.${targetLang}`]: translated,
                });
              }
            } catch (err) {
              console.error("Translation error for message:", msg.id, err);
            }
          }
        }
      }
    };

    handleTranslations();
  }, [messages, i18n.language, roomId, user]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRecording) {
      stopRecording();
    }
    if (!inputText.trim() || !roomId || !user) return;

    const messageText = inputText;
    setInputText("");

    try {
      // Clear typing status when message is sent
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      await deleteDoc(doc(db, "rooms", roomId, "typing", user.uid));

      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: messageText,
        senderId: user.uid,
        senderName: user.displayName || "User",
        senderAvatar:
          user.photoURL ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        createdAt: serverTimestamp(),
        language: i18n.language,
        status: "sent",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);

    if (!user || !roomId) return;

    // Set typing status in Firestore
    try {
      if (value.trim().length > 0) {
        await setDoc(doc(db, "rooms", roomId, "typing", user.uid), {
          userName: user.displayName || "User",
          userAvatar:
            user.photoURL ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
          timestamp: serverTimestamp(),
        });

        // Clear previous timeout
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        // Set new timeout to clear typing status after 3 seconds of inactivity
        typingTimeoutRef.current = setTimeout(async () => {
          await deleteDoc(doc(db, "rooms", roomId, "typing", user.uid));
        }, 3000);
      } else {
        // If text is cleared, remove typing status immediately
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        await deleteDoc(doc(db, "rooms", roomId, "typing", user.uid));
      }
    } catch (error) {
      console.error("Error updating typing status:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      // Set up Speech Recognition for transcription
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang =
          i18n.language === "ar"
            ? "ar-SA"
            : i18n.language === "fr"
              ? "fr-FR"
              : "en-US";

        recognition.onresult = (event: any) => {
          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              setInputText((prev) => prev + event.results[i][0].transcript);
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
        setIsRecording(true);
        setRecordingTime(0);
        recordingTimerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } else {
        alert("Speech recognition not supported in this browser.");
      }
    } catch (err) {
      console.error("Error starting speech recognition:", err);
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  useEffect(() => {
    // Mark messages as read when they appear
    if (!roomId || !user || !messages.length) return;

    const markAsRead = async () => {
      const unreadMessages = messages.filter(
        (msg) =>
          msg.senderId !== user.uid &&
          (!msg.readBy || !msg.readBy.includes(user.uid)),
      );

      for (const msg of unreadMessages) {
        try {
          const currentReadBy = msg.readBy || [];
          await updateDoc(doc(db, "rooms", roomId, "messages", msg.id), {
            readBy: [...currentReadBy, user.uid],
            status: "read", // Simple flag for UI
          });
        } catch (err) {
          console.error("Error marking message as read:", err);
        }
      }
    };

    markAsRead();
  }, [messages, roomId, user]);

  const isAdmin = currentRoom?.createdBy === user?.uid;

  const handleDeleteMessage = async (messageId: string) => {
    if (!isAdmin || !roomId) return;
    if (window.confirm("Delete this message?")) {
      try {
        await deleteDoc(doc(db, "rooms", roomId, "messages", messageId));
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    }
  };

  const handleRenameRoom = async () => {
    if (!isAdmin || !roomId) return;
    const newName = window.prompt("Enter new room name:", currentRoom.name);
    if (newName && newName !== currentRoom.name) {
      try {
        await updateDoc(doc(db, "rooms", roomId), { name: newName });
      } catch (err) {
        console.error("Error renaming room:", err);
      }
    }
  };

  const handleReaction = async (messageId: string, emoji: string) => {
    if (!roomId || !user) return;
    const messageRef = doc(db, "rooms", roomId, "messages", messageId);
    const msg = messages.find((m) => m.id === messageId);
    if (!msg) return;

    const currentReactions = msg.reactions || {};
    const userReactions = currentReactions[emoji] || [];

    let newUserReactions;
    if (userReactions.includes(user.uid)) {
      newUserReactions = userReactions.filter(
        (uid: string) => uid !== user.uid,
      );
    } else {
      newUserReactions = [...userReactions, user.uid];
    }

    try {
      await updateDoc(messageRef, {
        [`reactions.${emoji}`]: newUserReactions,
      });
    } catch (err) {
      console.error("Error adding reaction:", err);
    }
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
            {onlineUsers
              .filter((u) => u.uid !== user?.uid) // Only show other users
              .reduce((acc: any[], current: any) => {
                const x = acc.find((item) => item.uid === current.uid);
                if (!x) return acc.concat([current]);
                else return acc;
              }, [])
              .map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={
                        u.photoURL ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`
                      }
                      className="w-8 h-8 rounded-xl border-2 border-black bg-white"
                      alt={u.displayName}
                    />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${u.isOnline ? "bg-azure-green" : "bg-gray-400"} border-2 border-black rounded-full`}
                    />
                  </div>
                  <span className="font-bold text-xs text-dark-space/80">
                    {u.displayName || "Anonymous"}
                  </span>
                </div>
              ))}
            {onlineUsers.filter((u) => u.uid !== user?.uid).length === 0 && (
              <p className="text-[10px] font-bold opacity-30 uppercase px-2">
                No one else active
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="h-[160px] p-5 border-t-4 border-black bg-daisy-white/50 flex flex-col justify-center shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={
              user?.photoURL ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
            }
            className="w-10 h-10 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000]"
            alt="Profile"
          />
          <div className="min-w-0">
            <p className="font-black text-xs truncate uppercase tracking-tighter">
              {user?.displayName || "Friend"}
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
                  {currentRoom?.name || roomId?.replace("-", " ")}
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-1 px-0.5">
                <Users size={10} className="opacity-30" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                  {onlineUsers.filter((u) => u.isOnline).length}{" "}
                  {t("chat.activePulsers")}
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
              {isAdmin && (
                <button
                  onClick={handleRenameRoom}
                  className="p-2 md:p-2.5 hover:bg-black/5 rounded-xl transition-colors text-blue-violet"
                >
                  <Settings
                    size={18}
                    className="md:w-5 md:h-5"
                    strokeWidth={2.5}
                  />
                </button>
              )}
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

            {messages.map((msg) => {
              const isMe = msg.senderId === user?.uid;
              const timestamp =
                msg.createdAt?.toDate()?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }) || "";

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 md:gap-4 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className="flex-none self-start mt-1">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl border-2 border-black overflow-hidden bg-white shadow-[2px_2px_0px_0px_#000]">
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Box */}
                  <div
                    className={`max-w-[85%] md:max-w-[70%] space-y-1.5 ${isMe ? "items-end text-right" : "items-start text-left"}`}
                  >
                    <div className="flex items-center gap-2 px-2">
                      <span className="font-black text-[10px] md:text-[11px] uppercase tracking-tight flex items-center gap-1">
                        {msg.senderName}
                        {msg.senderId === currentRoom?.createdBy && (
                          <Crown
                            size={10}
                            className="text-yellow-500 fill-yellow-500"
                          />
                        )}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-bold opacity-30">
                        {timestamp}
                      </span>
                    </div>

                    <div className="relative group/msg">
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className={`absolute top-0 ${isMe ? "-left-8" : "-right-8"} p-1.5 opacity-0 group-hover/msg:opacity-100 transition-opacity text-black/20 hover:text-red-500`}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}

                      <div
                        className={`relative p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 border-black shadow-[3px_3px_0px_0px_#000] md:shadow-[4px_4px_0px_0px_#000] ${isMe ? "bg-blue-violet text-white" : "bg-white text-black"}`}
                      >
                        <p className="text-base md:text-lg font-bold leading-tight tracking-tight">
                          {msg.text}
                        </p>

                        {isMe && (
                          <div className="absolute bottom-2 right-3 md:bottom-3 md:right-4 flex items-center">
                            {msg.status === "read" ? (
                              <CheckCheck
                                size={14}
                                className="text-azure-green"
                                strokeWidth={3}
                              />
                            ) : (
                              <Check
                                size={14}
                                className="text-white/40"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Reactions Display */}
                      {msg.reactions &&
                        Object.keys(msg.reactions).some(
                          (emoji) => msg.reactions[emoji].length > 0,
                        ) && (
                          <div
                            className={`flex flex-wrap gap-1.5 mt-2 ${isMe ? "justify-end" : "justify-start"}`}
                          >
                            {Object.entries(msg.reactions).map(
                              ([emoji, uids]: [string, any]) =>
                                uids.length > 0 && (
                                  <button
                                    key={emoji}
                                    onClick={() =>
                                      handleReaction(msg.id, emoji)
                                    }
                                    className={`flex items-center gap-1 px-2 py-1 rounded-full border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] ${uids.includes(user?.uid) ? "bg-blue-violet text-white" : "bg-white text-black"}`}
                                  >
                                    <span>{emoji}</span>
                                    <span>{uids.length}</span>
                                  </button>
                                ),
                            )}
                          </div>
                        )}

                      {/* Reaction Picker on Hover */}
                      <div
                        className={`absolute -top-10 ${isMe ? "right-0" : "left-0"} opacity-0 group-hover/msg:opacity-100 transition-opacity flex items-center gap-1 bg-white border-2 border-black p-1.5 rounded-full shadow-[3px_3px_0px_0px_#000] z-50`}
                      >
                        {["👍", "❤️", "😂", "😮", "😢", "🔥"].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(msg.id, emoji)}
                            className="p-1 hover:scale-125 transition-transform"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>

                      {!isMe && msg.translations?.[i18n.language] && (
                        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t-2 border-black/5">
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
                          <p className="text-lg md:text-xl font-black tracking-tight leading-tight text-blue-violet">
                            {msg.translations[i18n.language]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <footer className="h-[160px] bg-white border-t-4 border-black p-4 md:p-8 z-20 flex items-center shrink-0">
          <div className="max-w-4xl mx-auto w-full">
            {/* Typing Indicator */}
            <div className="h-6 mb-1">
              <AnimatePresence>
                {typingUsers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex -space-x-2 mr-1">
                      {typingUsers.slice(0, 3).map((u) => (
                        <img
                          key={u.id}
                          src={u.userAvatar}
                          className="w-5 h-5 rounded-full border border-white bg-white shadow-sm"
                          alt={u.userName}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1 mr-1">
                      <span className="w-1 h-1 bg-azure-green rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1 h-1 bg-azure-green rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1 h-1 bg-azure-green rounded-full animate-bounce" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-azure-green/60 italic">
                      {typingUsers.length === 1
                        ? `${typingUsers[0].userName} is typing...`
                        : `${typingUsers.length} people are typing...`}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form
              onSubmit={handleSendMessage}
              className="relative group flex items-center gap-3 md:gap-4"
            >
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-black rounded-xl md:rounded-2xl translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2 group-focus-within:translate-x-1 group-focus-within:translate-y-1 transition-transform" />
                <div className="relative flex items-center bg-white border-2 border-black p-1.5 md:p-2 rounded-xl md:rounded-2xl gap-2 flex-1">
                  {isRecording ? (
                    <div className="flex-1 flex items-center px-4 gap-4 bg-red-50/50 rounded-lg py-2">
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-3 h-3 bg-red-500 rounded-full"
                      />
                      <span className="font-black text-red-500 tabular-nums">
                        {formatTime(recordingTime)}
                      </span>
                      <div className="flex-1 text-red-500/50 font-bold truncate">
                        {inputText || "Listening..."}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRecording(false);
                          if (recordingTimerRef.current)
                            clearInterval(recordingTimerRef.current);
                          if (recognitionRef.current)
                            recognitionRef.current.stop();
                          setInputText("");
                        }}
                        className="p-2 hover:bg-black/5 rounded-full text-black/40"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div ref={emojiPickerRef} className="relative">
                        <button
                          type="button"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className={`p-2 md:p-3 transition-colors ${showEmojiPicker ? "text-blue-violet" : "text-black/20 hover:text-blue-violet"}`}
                        >
                          <Smile
                            className="w-5 h-5 md:w-6 md:h-6"
                            strokeWidth={2.5}
                          />
                        </button>
                        <AnimatePresence>
                          {showEmojiPicker && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 10 }}
                              className="absolute bottom-full left-0 mb-4 z-50 shadow-[8px_8px_0px_0px_#000] border-4 border-black rounded-2xl overflow-hidden"
                            >
                              <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                theme={Theme.LIGHT}
                                width={320}
                                height={400}
                                skinTonesDisabled
                                searchDisabled
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder={t("chat.inputPlaceholder", {
                          lang: i18n.language.toUpperCase(),
                        })}
                        className="flex-1 py-2 md:py-3 text-base md:text-lg font-bold outline-none placeholder:text-black/10 tracking-tight"
                      />
                      <button
                        type="button"
                        onClick={startRecording}
                        className="p-2 md:p-3 text-black/20 hover:text-blue-violet transition-colors mr-2"
                      >
                        <Mic
                          className="w-5 h-5 md:w-6 md:h-6"
                          strokeWidth={2.5}
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  if (isRecording) {
                    e.preventDefault();
                    stopRecording();
                  }
                }}
                disabled={!inputText.trim() && !isRecording}
                className={`${isRecording ? "bg-red-500" : "bg-azure-green"} border-2 border-black p-4 md:p-5 rounded-xl md:rounded-2xl shadow-[3px_3px_0px_0px_#000] md:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center text-white disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed`}
              >
                {isRecording ? (
                  <Square
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    strokeWidth={3}
                  />
                ) : (
                  <Send
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    strokeWidth={3}
                  />
                )}
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
