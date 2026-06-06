import React from "react";

interface VerseLogoProps {
  className?: string; // Standard React className for sizing/placement
}

export default function VerseLogo({ className = "w-8 h-8" }: VerseLogoProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 select-none`}
    >
      <defs>
        {/* Sky Blue to Cyan to Deep-Violet to Vivid Pink gradient matching the image */}
        <linearGradient id="verseCircleGrad" x1="0.1" y1="0.1" x2="0.9" y2="0.9">
          <stop offset="0%" stopColor="#38bdf8" /> {/* Intense Sky Cyan */}
          <stop offset="25%" stopColor="#2563eb" /> {/* Medium Royal Blue */}
          <stop offset="65%" stopColor="#8b5cf6" /> {/* Indigo Violet */}
          <stop offset="100%" stopColor="#ec4899" /> {/* Vivid Magenta Pink */}
        </linearGradient>

        {/* Shadow for the overlapping 3D capsule effect */}
        <filter id="verseOverlapShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="-4"
            dy="8"
            stdDeviation="8"
            floodColor="#000000"
            floodOpacity="0.35"
          />
        </filter>
      </defs>

      {/* Main Backing Circle */}
      <circle cx="256" cy="256" r="256" fill="url(#verseCircleGrad)" />

      {/* RIGHT PILL (drawn underneath) */}
      <rect
        x="285"
        y="120"
        width="90"
        height="260"
        rx="45"
        fill="#ffffff"
        opacity="0.95"
        transform="rotate(35 330 250)"
      />

      {/* LEFT PILL (drawn on top with shadow to show overlap definition) */}
      <rect
        x="135"
        y="105"
        width="90"
        height="295"
        rx="45"
        fill="#ffffff"
        filter="url(#verseOverlapShadow)"
        transform="rotate(-34 180 252.5)"
      />
    </svg>
  );
}
