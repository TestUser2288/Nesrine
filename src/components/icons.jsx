const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const make = (paths) => (props) => (
  <svg {...base} {...props}>
    {paths}
  </svg>
);

export const ArrowUpRight = make(
  <>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </>
);

export const ArrowRight = make(
  <>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </>
);

export const ArrowUp = make(
  <>
    <path d="M12 19V5" />
    <path d="m6 11 6-6 6 6" />
  </>
);

export const ArrowDown = make(
  <>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </>
);

export const Mail = make(
  <>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </>
);

export const Phone = make(
  <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
);

export const MapPin = make(
  <>
    <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </>
);

export const Download = make(
  <>
    <path d="M12 3.5v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 19.5h15" />
  </>
);

export const Copy = make(
  <>
    <rect x="9" y="9" width="11.5" height="11.5" rx="2.5" />
    <path d="M15 6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15" />
  </>
);

export const Check = make(<path d="m4.5 12.5 5 5 10-11" />);

export const Close = make(
  <>
    <path d="m6 6 12 12" />
    <path d="M18 6 6 18" />
  </>
);

export const Search = make(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </>
);

export const Sun = make(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </>
);

export const Moon = make(<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />);

export const Command = make(
  <path d="M7.5 4.5a2.5 2.5 0 1 1 2.5 2.5v10a2.5 2.5 0 1 1-2.5-2.5h9A2.5 2.5 0 1 1 14 17V7a2.5 2.5 0 1 1 2.5 2.5h-9" />
);

export const Github = make(
  <path d="M9 19.5c-4 1.2-4-2.2-5.5-2.7m11.5 5v-3.4c0-1 .1-1.4-.5-2 2.3-.3 4.5-1.2 4.5-5a3.9 3.9 0 0 0-1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.3-3 1.1a10.3 10.3 0 0 0-5.3 0C7.4 5.4 6.5 5.7 6.5 5.7a3.6 3.6 0 0 0-.1 2.7 3.9 3.9 0 0 0-1 2.7c0 3.8 2.2 4.7 4.5 5-.5.5-.5 1-.5 1.7v4" />
);

export const Linkedin = make(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5v6M8 7.5v.01M12 16.5v-3.2a2 2 0 1 1 4 0v3.2" />
  </>
);

export const Send = make(
  <>
    <path d="M20.5 3.5 10 14" />
    <path d="M20.5 3.5 14 20.5l-4-6.5-6.5-4Z" />
  </>
);

export const Maximize = make(
  <>
    <path d="M9 4.5H4.5V9" />
    <path d="M15 4.5h4.5V9" />
    <path d="M9 19.5H4.5V15" />
    <path d="M15 19.5h4.5V15" />
  </>
);

export const Sparkle = make(
  <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9-5.7-1.8L10.2 9 12 3.5Z" />
);

export const TrendUp = make(
  <>
    <path d="M3.5 16.5 9 10.5l3.5 3.5 7-7.5" />
    <path d="M15 6.5h5v5" />
  </>
);

export const Shield = make(
  <path d="M12 3.5 19.5 6v5.5c0 4.2-3.1 7.3-7.5 9-4.4-1.7-7.5-4.8-7.5-9V6L12 3.5Z" />
);

export const Layers = make(
  <>
    <path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z" />
    <path d="m5 11 -2 1 9 4.5L21 12l-2-1" />
  </>
);

export const Home = make(
  <>
    <path d="M4.5 10.5 12 4l7.5 6.5" />
    <path d="M6.5 9.5v10h11v-10" />
  </>
);

export const User = make(
  <>
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.8 20c.9-3.3 3.7-5.2 7.2-5.2s6.3 1.9 7.2 5.2" />
  </>
);

export const Briefcase = make(
  <>
    <rect x="3" y="7.5" width="18" height="12.5" rx="2.5" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
  </>
);

export const Grid = make(
  <>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
  </>
);

export const Chart = make(
  <>
    <path d="M4 20V10" />
    <path d="M10 20V4" />
    <path d="M16 20v-7" />
    <path d="M3 20h18" />
  </>
);

export const Route = make(
  <>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8.5 6h5a4 4 0 0 1 0 8h-3a4 4 0 0 0 0 8h5" />
  </>
);

export const ICONS = { trend: TrendUp, shield: Shield, layers: Layers };

/** Touche de commande : ⌘ sur Mac, Ctrl ailleurs. */
export const isMac =
  typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.userAgent);

export function CmdKey() {
  return <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>;
}
