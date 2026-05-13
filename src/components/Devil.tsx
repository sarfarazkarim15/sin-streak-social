type Props = {
  /** 0..1 — how sinister the devil should look */
  intensity: number;
  size?: number;
  /** Devil skin variant id — matches ids from shopItems SKINS */
  skin?: string;
  /** Optional flair: "halo" | "crown" | "horns" | "fire-border" */
  flair?: string | null;
};

type Palette = {
  skin: string;
  skinDark: string;
  hornColor: string;
  eyeColor: string;
  eyeGlow: string;
  auraInner: string;
  auraMid: string;
  emberColor: string;
};

function paletteFor(skinId: string, t: number): Palette {
  switch (skinId) {
    case "ice":
      return {
        skin: `hsl(${200 - t * 10}, ${70 + t * 15}%, ${65 - t * 12}%)`,
        skinDark: `hsl(${210 - t * 5}, ${75 + t * 10}%, ${40 - t * 10}%)`,
        hornColor: `hsl(220, 40%, ${20 - t * 5}%)`,
        eyeColor: `hsl(${190 - t * 10}, 100%, ${65 - t * 5}%)`,
        eyeGlow: `hsl(195, 100%, 70%)`,
        auraInner: "#4AC6E8",
        auraMid: "#0A4060",
        emberColor: "#7FD9F5",
      };
    case "clown":
      return {
        skin: `hsl(${340 - t * 10}, ${85}%, ${68 - t * 15}%)`,
        skinDark: `hsl(${320 - t * 5}, ${85}%, ${35 - t * 10}%)`,
        hornColor: `hsl(60, 90%, ${55 - t * 10}%)`, // yellow horns
        eyeColor: `hsl(${280 - t * 20}, 90%, ${65 - t * 5}%)`,
        eyeGlow: `hsl(285, 100%, 70%)`,
        auraInner: "#FF1493",
        auraMid: "#4B0082",
        emberColor: "#FFD700",
      };
    case "ceo":
      return {
        skin: `hsl(${10 - t * 4}, ${30 + t * 10}%, ${35 - t * 8}%)`,
        skinDark: `hsl(${10 - t * 4}, ${30 + t * 10}%, ${20 - t * 5}%)`,
        hornColor: "#1A1A1A",
        eyeColor: `hsl(45, 100%, ${60 - t * 5}%)`, // gold money eyes
        eyeGlow: "#FFD700",
        auraInner: "#FFD700",
        auraMid: "#4A3500",
        emberColor: "#FFD700",
      };
    case "vamp":
      return {
        skin: `hsl(${280 - t * 8}, ${50 + t * 15}%, ${30 - t * 8}%)`,
        skinDark: `hsl(${275 - t * 5}, ${60 + t * 10}%, ${15 - t * 4}%)`,
        hornColor: "#0A0010",
        eyeColor: `hsl(0, 100%, ${50 - t * 5}%)`, // blood red
        eyeGlow: "#FF0033",
        auraInner: "#8B0033",
        auraMid: "#1A001A",
        emberColor: "#FF0033",
      };
    case "gold":
      return {
        skin: `hsl(45, ${90}%, ${55 - t * 10}%)`,
        skinDark: `hsl(38, 95%, ${30 - t * 8}%)`,
        hornColor: `hsl(28, 90%, ${25 - t * 6}%)`,
        eyeColor: `hsl(20 , 100%, ${50 - t * 5}%)`,
        eyeGlow: "#FF8C00",
        auraInner: "#FFD700",
        auraMid: "#8B6500",
        emberColor: "#FFEE88",
      };
    case "default":
    default:
      return {
        skin: `hsl(${8 - t * 6}, ${75 + t * 20}%, ${52 - t * 18}%)`,
        skinDark: `hsl(${6 - t * 5}, ${80 + t * 15}%, ${32 - t * 14}%)`,
        hornColor: `hsl(${15 - t * 12}, ${40 + t * 25}%, ${14 - t * 6}%)`,
        eyeColor: `hsl(${14 - t * 14}, 100%, ${58 - t * 5}%)`,
        eyeGlow: `hsl(${10 - t * 10}, 100%, 55%)`,
        auraInner: "#FF4500",
        auraMid: "#8B0000",
        emberColor: "#FF4500",
      };
  }
}

/**
 * Pure SVG/CSS animated devil with skin variants and optional flair.
 */
export function Devil({ intensity, size = 220, skin = "default", flair = null }: Props) {
  const raw = Math.min(Math.max(intensity, 0), 1);
  const t = 0.55 + raw * 0.45;

  const p = paletteFor(skin, t);
  const wingOpacity = 0.55 + t * 0.4;
  const mouthCurve = -6 - t * 14;
  const pupilNarrow = 1 - t * 0.85;
  const bobDur = 3.4 - t * 1.4;
  const tailDur = 2.2 - t * 1;
  const pulseDur = 1.6 - t * 1;

  const showHalo = flair === "halo";
  const showCrown = flair === "crown";
  const showExtraHorns = flair === "horns";
  const showFireBorder = flair === "fire-border";

  return (
    <div
      className="devil-wrap relative mx-auto"
      style={{ width: size, height: size, ["--bob" as never]: `${bobDur}s` }}
    >
      <div className="devil-float absolute inset-0">
        <svg viewBox="0 0 220 240" width={size} height={size}>
          <defs>
            <radialGradient id={`bodyGrad-${skin}`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor={p.skin} />
              <stop offset="100%" stopColor={p.skinDark} />
            </radialGradient>
            <radialGradient id={`auraGrad-${skin}`} cx="50%" cy="55%" r="55%">
              <stop offset="0%" stopColor={p.auraInner} stopOpacity={0.45 + t * 0.4} />
              <stop offset="70%" stopColor={p.auraMid} stopOpacity={0.25 + t * 0.3} />
              <stop offset="100%" stopColor="#0D0A0A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`eyeGrad-${skin}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={p.eyeGlow} />
              <stop offset="60%" stopColor={p.eyeColor} />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <filter id={`soft-${skin}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* aura */}
          <ellipse cx="110" cy="125" rx="105" ry="105" fill={`url(#auraGrad-${skin})`} />

          {/* fire border ring */}
          {showFireBorder && (
            <>
              <circle cx="110" cy="110" r="105" fill="none" stroke="#FF4500"
                strokeWidth="3" opacity="0.6" strokeDasharray="6 6"
                style={{ animation: "spin 8s linear infinite", transformOrigin: "110px 110px" }} />
              <circle cx="110" cy="110" r="98" fill="none" stroke="#FFAA00"
                strokeWidth="1.5" opacity="0.7" strokeDasharray="3 9"
                style={{ animation: "spin 12s linear infinite reverse", transformOrigin: "110px 110px" }} />
            </>
          )}

          {/* wings */}
          <g className="devil-wing devil-wing-l"
            style={{ opacity: wingOpacity, transformOrigin: "85px 120px" }}>
            <path d="M85,120 C30,80 10,105 8,150 C35,140 55,155 78,168 C70,148 80,135 85,120 Z"
              fill={p.hornColor} opacity="0.92" />
          </g>
          <g className="devil-wing devil-wing-r"
            style={{ opacity: wingOpacity, transformOrigin: "135px 120px" }}>
            <path d="M135,120 C190,80 210,105 212,150 C185,140 165,155 142,168 C150,148 140,135 135,120 Z"
              fill={p.hornColor} opacity="0.92" />
          </g>

          {/* tail */}
          <g className="devil-tail"
            style={{ transformOrigin: "110px 175px", ["--tailDur" as never]: `${tailDur}s` }}>
            <path d="M110,170 Q145,205 152,222 Q162,232 172,224"
              stroke={p.skinDark} strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M162,222 l16,-2 l-7,12 z" fill={p.skinDark} />
          </g>

          {/* body */}
          <ellipse cx="110" cy="155" rx="55" ry="40" fill={p.skinDark} />

          {/* CEO tie accessory */}
          {skin === "ceo" && (
            <>
              <path d="M104,150 L116,150 L114,180 L110,190 L106,180 Z" fill="#8B0000" />
              <rect x="106" y="148" width="8" height="3" fill="#3a0808" />
            </>
          )}

          {/* clown ruffle */}
          {skin === "clown" && (
            <g>
              <circle cx="85" cy="148" r="6" fill="#FFD700" />
              <circle cx="135" cy="148" r="6" fill="#00CED1" />
              <circle cx="110" cy="155" r="7" fill="#FF1493" />
            </g>
          )}

          {/* vamp collar */}
          {skin === "vamp" && (
            <path d="M70,140 L110,170 L150,140 L155,160 L110,180 L65,160 Z"
              fill="#1A0008" stroke="#4A0020" strokeWidth="1.5" />
          )}

          {/* head */}
          <circle cx="110" cy="105" r="55" fill={`url(#bodyGrad-${skin})`} />

          {/* horns */}
          <g className="devil-horn devil-horn-l" style={{ transformOrigin: "82px 65px" }}>
            <path d="M80,72 Q66,42 76,18 Q92,46 94,70 Z" fill={p.hornColor} />
            <path d="M82,55 Q80,45 84,38" stroke="#000" strokeWidth="1.2" fill="none" opacity="0.4" />
          </g>
          <g className="devil-horn devil-horn-r" style={{ transformOrigin: "138px 65px" }}>
            <path d="M140,72 Q154,42 144,18 Q128,46 126,70 Z" fill={p.hornColor} />
            <path d="M138,55 Q140,45 136,38" stroke="#000" strokeWidth="1.2" fill="none" opacity="0.4" />
          </g>

          {/* extra horns flair — second set above */}
          {showExtraHorns && (
            <g opacity="0.85">
              <path d="M65,55 Q55,32 64,10 Q76,32 76,53 Z" fill="#FF4500" />
              <path d="M155,55 Q165,32 156,10 Q144,32 144,53 Z" fill="#FF4500" />
            </g>
          )}

          {/* Halo flair */}
          {showHalo && (
            <g style={{ transformOrigin: "110px 30px", animation: "haloSpin 4s linear infinite" }}>
              <ellipse cx="110" cy="22" rx="38" ry="9" fill="none" stroke="#FFD700"
                strokeWidth="3" opacity="0.85" />
              <ellipse cx="110" cy="22" rx="38" ry="9" fill="none" stroke="#FFAA00"
                strokeWidth="1" opacity="0.6" strokeDasharray="2 4" />
            </g>
          )}

          {/* Crown flair */}
          {showCrown && (
            <g>
              <path d="M82,-5 L82,28 L92,15 L100,28 L110,8 L120,28 L128,15 L138,28 L138,-5 Z"
                fill="#FFD700" stroke="#8B6500" strokeWidth="1.5"
                transform="translate(0, 12)" />
              <circle cx="110" cy="22" r="3" fill="#FF0033" />
              <circle cx="92" cy="22" r="2" fill="#0088FF" />
              <circle cx="128" cy="22" r="2" fill="#00FF44" />
            </g>
          )}

          {/* eyes */}
          <g className="devil-eye-pulse" style={{ ["--pulseDur" as never]: `${pulseDur}s` }}>
            <circle cx="92" cy="105" r="11" fill="#0D0A0A" />
            <circle cx="128" cy="105" r="11" fill="#0D0A0A" />
            <circle cx="92" cy="105" r="9" fill={`url(#eyeGrad-${skin})`} />
            <circle cx="128" cy="105" r="9" fill={`url(#eyeGrad-${skin})`} />
            {/* CEO gets dollar sign pupils */}
            {skin === "ceo" ? (
              <>
                <text x="92" y="110" textAnchor="middle" fontSize="11"
                  fontWeight="900" fill="#000">$</text>
                <text x="128" y="110" textAnchor="middle" fontSize="11"
                  fontWeight="900" fill="#000">$</text>
              </>
            ) : (
              <>
                <ellipse cx="92" cy="105" rx={1.2 + pupilNarrow * 1.5}
                  ry={5 + (1 - pupilNarrow) * 2} fill="#000" />
                <ellipse cx="128" cy="105" rx={1.2 + pupilNarrow * 1.5}
                  ry={5 + (1 - pupilNarrow) * 2} fill="#000" />
              </>
            )}
          </g>

          {/* angry eyebrows */}
          <g stroke={p.hornColor} strokeWidth="4" strokeLinecap="round" fill="none">
            <line x1={76} y1={92 + t * 2} x2={106} y2={82 - t * 4} />
            <line x1={114} y1={82 - t * 4} x2={144} y2={92 + t * 2} />
          </g>

          {/* mouth */}
          {skin === "clown" ? (
            // Big red clown smile (still creepy)
            <>
              <path d={`M82,128 Q110,${152 + mouthCurve / 2} 138,128`}
                stroke="#FF0033" strokeWidth="5" strokeLinecap="round" fill="#1a0008" />
              <circle cx="110" cy="118" r="6" fill="#FF1493" opacity="0.85" />
            </>
          ) : (
            <>
              <path d={`M88,130 Q110,${130 + mouthCurve} 132,130`}
                stroke="#0D0A0A" strokeWidth="3" strokeLinecap="round" fill="#0D0A0A" />
              <g fill="white">
                <path d="M97,128 l3,10 l3,-10 z" />
                <path d="M117,128 l3,10 l3,-10 z" />
              </g>
              <path d={`M104,${134 - mouthCurve / 2} q6,4 12,0`}
                stroke="#8B0000" strokeWidth="2" fill="none" opacity="0.7" />
            </>
          )}

          {/* pitchfork */}
          <g className="devil-fork"
            style={{ transformOrigin: "180px 180px", opacity: 0.8 + t * 0.2 }}>
            <line x1="180" y1="170" x2="180" y2="228"
              stroke={p.hornColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M168,165 L180,148 L192,165 M180,148 L180,170 M174,158 L174,170 M186,158 L186,170"
              stroke={p.hornColor} strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>

          {/* halo of fire */}
          <circle cx="110" cy="105" r="60" fill="none" stroke={p.auraInner}
            strokeWidth="1.5" opacity={0.3 + t * 0.4} filter={`url(#soft-${skin})`} />
        </svg>
      </div>

      {/* embers under devil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 + Math.round(t * 14) }).map((_, i) => {
          const left = 20 + Math.random() * 60;
          const dur = 2.5 + Math.random() * 4;
          const delay = -Math.random() * dur;
          const sz = 2 + Math.random() * 3;
          return (
            <span
              key={i}
              className="ember"
              style={{
                left: `${left}%`,
                width: sz,
                height: sz,
                background: p.emberColor,
                boxShadow: `0 0 8px ${p.emberColor}`,
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
                // @ts-expect-error custom prop
                "--drift": `${(Math.random() - 0.5) * 40}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
