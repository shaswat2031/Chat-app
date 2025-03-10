import React from "react";

// Generate a random pattern for grid styling
const getRandomPattern = (index) => {
  const patterns = [
    "bg-primary/20",
    "bg-secondary/20",
    "bg-accent/20",
    "bg-warning/20",
    "bg-info/20",
    "bg-success/20",
    "bg-error/20",
    "bg-base-300",
    "bg-base-content/10",
    "bg-neutral/20",
  ];
  return patterns[index % patterns.length];
};

// List of 10 unique taglines
const taglines = [
  "Secure your journey, one login at a time.",
  "Access made simple, security made strong.",
  "Where your identity meets innovation.",
  "Unlock possibilities with just a click.",
  "Every great experience starts with a sign-in.",
  "Your gateway to seamless connectivity.",
  "Privacy first, convenience always.",
  "A smarter way to authenticate.",
  "Effortless logins, boundless potential.",
  "Welcome back! Let’s make things happen.",
];

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* Dynamic Pattern Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${getRandomPattern(i)} ${
                i % 2 === 0 ? "animate-pulse" : "animate-bounce"
              }`}
            />
          ))}
        </div>

        {/* Title & Dynamic Tagline */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle || taglines[Math.floor(Math.random() * taglines.length)]}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
