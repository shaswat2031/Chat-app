import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 relative overflow-hidden">
      {/* 🔵 Floating Message Squares */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`absolute message-square`}
            style={{
              top: `${Math.random() * 80}vh`,
              left: `${Math.random() * 80}vw`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <MessageSquare className="w-6 h-6 text-primary opacity-50" />
          </div>
        ))}
      </div>

      <div className="max-w-md text-center space-y-6 relative z-10">
        {/* 💬 Animated Message Icon */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
              justify-center animate-pulse shadow-lg"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* ✨ Welcoming Message */}
        <h2 className="text-3xl font-bold">Personalize Chats 🚀</h2>
        <p className="text-base-content/60 text-lg">
          Start an exciting conversation today! 💬  
          Select a chat from the sidebar and connect instantly.  
        </p>

        {/* 🎉 Encouraging Text */}
        <p className="text-zinc-500">Make new friends, share ideas, and enjoy chatting! 😊</p>
      </div>

      {/* 🌟 Floating Message Squares Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
            100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          }

          .message-square {
            position: absolute;
            animation: float 3s infinite alternate ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default NoChatSelected;
