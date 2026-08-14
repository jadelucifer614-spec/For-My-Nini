import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Gamepad2,
  Heart,
  MessageCircle,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const questions = [
  "What's something that made you smile today?",
  "What's something you've been thinking about lately?",
  "What's something you want us to do together someday?",
  "What's something you want to tell me?",
  "What's something you're looking forward to?",
];
const games = ["Roblox", "Among Us", "Scrabble"];

function Ambient() {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: `${(i * 29) % 100}%`,
        top: `${(i * 47) % 95}%`,
        delay: `${(i % 6) * 0.7}s`,
        size: i % 4 === 0 ? 5 : 3,
      })),
    [],
  );
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="nini-orb nini-orb-one" />
      <div className="nini-orb nini-orb-two" />
      {particles.map((particle, i) => (
        <span
          key={i}
          className="nini-particle"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, animationDelay: particle.delay }}
        />
      ))}
    </div>
  );
}

function Progress({ step, onBack }: { step: number; onBack?: () => void }) {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 pb-3 pt-5 sm:px-8">
      {onBack ? (
        <button onClick={onBack} aria-label="Go back" className="nini-icon-button">
          <ChevronLeft size={18} />
        </button>
      ) : (
        <div className="w-10" />
      )}
      <div className="flex items-center gap-3">
        <span className="nini-micro">a little something from Fifi</span>
        <span className="nini-step">{String(step).padStart(2, "0")} / 06</span>
      </div>
      <div className="w-10" />
    </header>
  );
}

function SecretModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="nini-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-title"
        className="nini-modal"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={onClose} className="nini-modal-close" aria-label="Close secret">
          <X size={18} />
        </button>
        <div className="nini-secret-mark"><SausageIcon /></div>
        <p className="nini-kicker">classified snack division</p>
        <h2 id="secret-title">YOU FOUND THE SECRET 👀</h2>
        <p>I knew you would find this.</p>
        <button onClick={onClose} className="nini-button nini-button-ink">Keep my secret</button>
      </motion.div>
    </motion.div>
  );
}

function SausageIcon() {
  return <span className="nini-sausage" aria-hidden="true"><span /></span>;
}

function Hearts({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="nini-heart-burst" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span key={i} initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }} animate={{ opacity: 0, scale: 1.3, x: Math.cos(i) * 110, y: -60 - Math.sin(i) * 80 }} transition={{ duration: 1.2 }}>
              <Heart size={18} fill="currentColor" />
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

export function NiniDateInvitation() {
  const reduceMotion = useReducedMotion();
  const [screen, setScreen] = useState(1);
  const [game, setGame] = useState("Roblox");
  const [question, setQuestion] = useState(0);
  const [movie, setMovie] = useState(0);
  const [maybeMode, setMaybeMode] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [talkOpen, setTalkOpen] = useState(false);
  const [movieConfirmed, setMovieConfirmed] = useState(false);
  const [burst, setBurst] = useState(false);
  const [secret, setSecret] = useState(false);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    if (screen !== 5) return;
    setReveal(0);
    const timers = [550, 1200, 1850, 2500, 3150, 3800, 4450, 5100].map((delay, i) => window.setTimeout(() => setReveal(i + 1), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [screen]);

  const next = () => setScreen((value) => Math.min(6, value + 1));
  const back = () => setScreen((value) => Math.max(1, value - 1));
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <main className="nini-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap');
        .nini-shell{min-height:100dvh;overflow-x:hidden;color:#172a4d;background:linear-gradient(145deg,#dceeff 0%,#f8fbff 48%,#ffe6ed 100%);font-family:'DM Mono',monospace;position:relative}
        .nini-shell:after{content:'';position:fixed;inset:0;pointer-events:none;opacity:.22;background-image:radial-gradient(#7891b4 0.6px,transparent .6px);background-size:15px 15px}
        .nini-orb{position:fixed;border-radius:999px;filter:blur(3px);opacity:.52;pointer-events:none}.nini-orb-one{width:260px;height:260px;top:-110px;right:-80px;background:#a9d8ff}.nini-orb-two{width:220px;height:220px;bottom:-90px;left:-80px;background:#ffc0d0}
        .nini-particle{position:absolute;border-radius:50%;background:#fff;box-shadow:0 0 12px #fff;animation:nini-float 5s ease-in-out infinite}.nini-micro{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#6e82a1}.nini-step{font-size:11px;letter-spacing:.12em;color:#59718f}
        .nini-icon-button{display:grid;place-items:center;width:40px;height:40px;border:1px solid #bfd2e8;border-radius:50%;background:#ffffff66;color:#59718f;transition:transform .2s,background .2s}.nini-icon-button:hover{transform:translateX(-2px);background:#fff}
        .nini-stage{position:relative;z-index:1;display:flex;min-height:calc(100dvh - 72px);align-items:center;justify-content:center;padding:22px 20px 64px}.nini-content{width:100%;max-width:690px;text-align:center}.nini-kicker{color:#7b90ad;font-size:10px;letter-spacing:.18em;text-transform:uppercase}.nini-title{font-family:'Playfair Display',serif;font-size:clamp(43px,11vw,88px);line-height:.98;letter-spacing:-.055em;margin:17px auto;color:#172a4d}.nini-title em{color:#d66d87;font-weight:500}.nini-copy{max-width:500px;margin:0 auto;color:#647794;font-size:13px;line-height:1.9}.nini-script{font-family:'Playfair Display',serif;font-style:italic}
        .nini-button{min-height:54px;border:0;border-radius:18px;padding:0 27px;font:500 12px 'DM Mono',monospace;letter-spacing:.05em;cursor:pointer;transition:transform .2s,box-shadow .2s,background .2s}.nini-button:hover{transform:translateY(-3px)}.nini-button-rose{background:#d86683;color:#fff;box-shadow:0 14px 28px #d8668340}.nini-button-ink{background:#172a4d;color:#fff;box-shadow:0 14px 28px #172a4d25}.nini-button-soft{background:#fff8;color:#6b7890;border:1px solid #c4d5e8}.nini-button:focus-visible,.nini-icon-button:focus-visible,.nini-choice:focus-visible,.nini-modal-close:focus-visible{outline:3px solid #d66d87;outline-offset:3px}
        .nini-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:34px}.nini-note{font-size:10px;color:#8999af;margin-top:18px}.nini-glass{border:1px solid #ffffffb8;background:#ffffff68;backdrop-filter:blur(18px);box-shadow:0 22px 70px #718bb326;border-radius:30px;padding:25px}.nini-card-grid{display:grid;gap:12px;margin-top:24px}.nini-choice{text-align:left;border:1px solid #c5d6e9;background:#ffffff70;border-radius:18px;padding:16px;cursor:pointer;color:#304969;transition:transform .2s,border .2s,background .2s}.nini-choice:hover{transform:translateY(-2px);border-color:#d66d87}.nini-choice.selected{background:#fff;border-color:#d66d87;box-shadow:0 7px 20px #d66d8720}.nini-choice strong{display:block;font:500 15px 'Playfair Display',serif}.nini-choice small{display:block;color:#8192a9;font-size:10px;margin-top:6px}.nini-choice-row{display:flex;gap:9px;flex-wrap:wrap;justify-content:center;margin:18px 0}.nini-pill{border:1px solid #bed0e5;border-radius:100px;background:#ffffff70;padding:12px 16px;color:#627997;font:11px 'DM Mono',monospace;cursor:pointer}.nini-pill.selected{background:#172a4d;color:#fff;border-color:#172a4d}.nini-section-label{text-align:left;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#8194ad;margin-top:25px}.nini-question{font-family:'Playfair Display',serif;font-size:clamp(25px,6vw,42px);line-height:1.16;margin:10px 0 22px}.nini-arrow{border:0;background:#fff9;color:#6d81a0;width:38px;height:38px;border-radius:50%;cursor:pointer}.nini-timeline{position:relative;margin:28px auto;text-align:left;max-width:540px}.nini-timeline:before{content:'';position:absolute;left:10px;top:12px;bottom:12px;width:1px;background:#b3c7df}.nini-event{position:relative;padding:0 0 28px 40px}.nini-event:before{content:'';position:absolute;left:5px;top:4px;width:11px;height:11px;border-radius:50%;background:#d86683;box-shadow:0 0 0 5px #fce5ec}.nini-event span{font-size:10px;color:#d86683;letter-spacing:.1em}.nini-event h3{font:500 22px 'Playfair Display',serif;margin:6px 0}.nini-event p{font-size:11px;color:#7386a0;line-height:1.7;margin:0}.nini-reveal{font-family:'Playfair Display',serif;font-size:clamp(29px,7vw,52px);line-height:1.14;margin:13px auto;max-width:590px}.nini-final-card{margin:28px auto 0;max-width:540px}.nini-secret-button{position:fixed;right:12px;bottom:12px;border:0;background:transparent;color:#8295ad;opacity:.55;cursor:pointer;padding:11px}.nini-secret-button:hover{opacity:1}.nini-modal-backdrop{position:fixed;z-index:10;inset:0;display:grid;place-items:center;padding:22px;background:#172a4d66;backdrop-filter:blur(7px)}.nini-modal{position:relative;width:min(100%,400px);padding:38px 28px 29px;text-align:center;border:1px solid #fff;background:#f7fbff;border-radius:30px;box-shadow:0 25px 80px #172a4d38}.nini-modal h2{font:600 27px 'Playfair Display',serif;margin:11px 0}.nini-modal p{font-size:11px;color:#7789a2;line-height:1.7}.nini-modal-close{position:absolute;top:15px;right:15px;border:0;background:transparent;color:#8193aa;cursor:pointer}.nini-secret-mark{display:grid;place-items:center;width:60px;height:60px;border-radius:50%;margin:auto;background:#ffe5eb}.nini-sausage{display:block;width:34px;height:16px;border-radius:30px;background:#d97870;transform:rotate(-18deg);position:relative}.nini-sausage:before,.nini-sausage:after{content:'';position:absolute;width:7px;height:7px;border-radius:50%;background:#f8a397;top:4px}.nini-sausage:before{left:8px}.nini-sausage:after{right:8px}.nini-sausage span{position:absolute;right:-4px;top:4px;width:7px;height:7px;border-radius:50%;background:#b65c60}.nini-heart-burst{position:absolute;left:50%;top:48%;z-index:3}.nini-heart-burst span{position:absolute;color:#d86683}.nini-underline{display:inline-block;border-bottom:2px solid #e798aa}.nini-badge{display:inline-flex;align-items:center;gap:7px;border-radius:100px;background:#fff8;padding:9px 13px;color:#6c819e;font-size:10px;border:1px solid #d0ddeb}.nini-confirm{display:grid;place-items:center;width:72px;height:72px;border-radius:50%;margin:0 auto 20px;background:#d86683;color:#fff;box-shadow:0 18px 35px #d8668340}@keyframes nini-float{0%,100%{transform:translateY(0);opacity:.35}50%{transform:translateY(-13px);opacity:.9}}@media(min-width:640px){.nini-card-grid{grid-template-columns:repeat(3,1fr)}.nini-shell{font-size:15px}}
        @media(prefers-reduced-motion:reduce){.nini-particle{animation:none}.nini-button,.nini-icon-button,.nini-choice{transition:none}}
      `}</style>
      <Ambient />
      <Progress step={screen} onBack={screen > 1 && screen < 6 ? back : undefined} />
      <AnimatePresence mode="wait">
        <motion.section key={screen} className="nini-stage" initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }} transition={transition}>
          {screen === 1 && <div className="nini-content"><p className="nini-kicker">open when you have a minute</p><h1 className="nini-title">Hi Nini <em>♡</em></h1><p className="nini-copy">I have a very important question to ask you...</p><div className="nini-actions"><button className="nini-button nini-button-rose" onClick={next}>I'M LISTENING <ArrowRight size={15} style={{ verticalAlign: "middle", marginLeft: 8 }} /></button></div><p className="nini-note">from Fifi</p></div>}
          {screen === 2 && <div className="nini-content nini-glass"><span className="nini-badge"><Heart size={13} fill="#d86683" color="#d86683" /> a very official invitation</span><h2 className="nini-title" style={{ fontSize: "clamp(34px,8vw,66px)" }}>Teddy would like to take Nini on a date.</h2><p className="nini-copy">Unfortunately, we're still stuck behind our screens...</p><p className="nini-copy" style={{ marginTop: 10 }}>So I made our own little online date instead.</p><h3 className="nini-question" style={{ marginTop: 25 }}>Will you join me?</h3><Hearts active={burst} /><div className="nini-actions"><button className="nini-button nini-button-rose" onClick={() => { setBurst(true); window.setTimeout(next, 800); }}>{maybeMode ? "YES ♡" : "YES, OBVIOUSLY ♡"}</button><button className="nini-button nini-button-soft" onClick={() => { if (maybeMode) { setBurst(true); window.setTimeout(next, 800); } else setMaybeMode(true); }}>{maybeMode ? "YES ♡" : "maybe..."}</button></div>{maybeMode && <p className="nini-note" style={{ color: "#d86683" }}>Nini. 😐</p>}</div>}
          {screen === 3 && <div className="nini-content"><p className="nini-kicker">a date made for us</p><h2 className="nini-title" style={{ fontSize: "clamp(38px,8vw,65px)" }}>OUR DATE NIGHT</h2><p className="nini-copy" style={{ marginTop: -8 }}>Just you + me.</p><div className="nini-card-grid" style={{ textAlign: "left" }}><div className="nini-glass"><p className="nini-section-label" style={{ marginTop: 0 }}>GAME TIME</p><h3 className="nini-question" style={{ fontSize: 28 }}>You choose.</h3><p className="nini-copy" style={{ textAlign: "left", margin: "12px 0" }}>Roblox? Among Us? Scrabble? Something completely different?</p><p className="nini-copy" style={{ textAlign: "left", margin: "12px 0 18px" }}>Tonight, you get to choose what we play.</p><button className="nini-button nini-button-soft" onClick={() => setGameOpen(!gameOpen)}>LET NINI CHOOSE <ArrowRight size={14} style={{ verticalAlign: "middle", marginLeft: 6 }} /></button>{gameOpen && <div className="nini-choice-row" style={{ justifyContent: "flex-start" }}>{[...games, "something else"].map((item) => <button key={item} className={`nini-pill ${game === item ? "selected" : ""}`} onClick={() => setGame(item)}>{item}</button>)}</div>}</div><div className="nini-glass"><p className="nini-section-label" style={{ marginTop: 0 }}>TALKING</p><div className="nini-copy" style={{ textAlign: "left", marginTop: 12, lineHeight: 1.9 }}>Okay, no games for a minute.<br />Tell me everything.<br />How was your day?<br />What made you happy?<br />What annoyed you?<br />What have you been thinking about?</div><button className="nini-button nini-button-soft" style={{ marginTop: 16 }} onClick={() => setTalkOpen(true)}>START TALKING ♡</button>{talkOpen && <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 15 }}><button className="nini-arrow" onClick={() => setQuestion((question + questions.length - 1) % questions.length)} aria-label="Previous question"><ChevronLeft size={16} /></button><p className="nini-copy" style={{ textAlign: "left" }}>{questions[question]}</p><button className="nini-arrow" onClick={() => setQuestion((question + 1) % questions.length)} aria-label="Next question"><ChevronRight size={16} /></button></div>}{talkOpen && <button className="nini-pill" style={{ marginTop: 10 }} onClick={() => setQuestion((question + 1) % questions.length)}>NEXT QUESTION</button>}</div><div className="nini-glass"><p className="nini-section-label" style={{ marginTop: 0 }}>MOVIE TIME</p><div className="nini-card-grid">{["Toy Story", "Spider-Man", "Something else"].map((item, i) => <button key={item} onClick={() => { setMovie(i); setMovieConfirmed(true); }} className={`nini-choice ${movie === i ? "selected" : ""}`}><Clapperboard size={16} color={movie === i ? "#d86683" : "#8ba0b9"} /><strong>{item}</strong><small>tap to choose</small></button>)}</div>{movieConfirmed && <p className="nini-note" style={{ color: "#d86683", textAlign: "left" }}>Excellent choice, Nini. 🍿<br />Movie night officially added to the date.</p>}</div><div className="nini-glass"><p className="nini-section-label" style={{ marginTop: 0 }}>US</p><div className="nini-copy" style={{ textAlign: "left", marginTop: 12, lineHeight: 1.9 }}>Do you remember how we met?<br />Somehow, two people playing BedWars on Roblox ended up here.<br />From random games...<br />to talking about our days...<br />to staying up talking about absolutely everything...<br />I'm really glad I met you.</div><button className="nini-button nini-button-ink" style={{ marginTop: 18 }} onClick={next}>KEEP GOING <ArrowRight size={14} style={{ verticalAlign: "middle", marginLeft: 6 }} /></button></div></div></div>}
          {screen === 4 && <div className="nini-content"><p className="nini-kicker">our origin story</p><h2 className="nini-title" style={{ fontSize: "clamp(39px,9vw,70px)" }}>From <em>BedWars</em><br />to us.</h2><div className="nini-timeline">{["Random BedWars game", "Started talking", "Played more games", "Started talking about our days", "Somehow became us"].map((label, i) => <motion.div key={label} className="nini-event" initial={{ opacity: 0, x: reduceMotion ? 0 : -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : i * .14 }}><span>{String(i + 1).padStart(2, "0")}</span><h3>{label}</h3></motion.div>)}</div><div className="nini-glass nini-final-card"><p className="nini-copy" style={{ lineHeight: 1.9 }}>And honestly...<br />Out of all the random things that could have happened that day...<br />I'm really glad I met you.</p><button className="nini-button nini-button-rose" style={{ marginTop: 20 }} onClick={next}>ONE LAST QUESTION <ArrowRight size={14} style={{ verticalAlign: "middle", marginLeft: 7 }} /></button></div></div>}
          {screen === 5 && <div className="nini-content"><p className="nini-kicker">the important question</p><div className="nini-final-card nini-glass">{[["So...", 1], ["We have our games.", 2], ["We have our conversations.", 3], ["We have our movie.", 4], ["But most importantly...", 5], ["We have us.", 6], ["I have one last question.", 7], ["Will you be my date tonight? ♡", 8]].map(([line, index]) => reveal >= (index as number) && <motion.p key={line as string} className="nini-reveal" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={index === 8 ? { fontSize: "clamp(34px,8vw,58px)", color: "#d86683" } : undefined}>{line as string}</motion.p>)}<div className="nini-actions"><button className="nini-button nini-button-rose" onClick={next}>YES, TEDDY ♡</button></div></div></div>}
          {screen === 6 && <div className="nini-content"><div className="nini-confirm"><Check size={32} strokeWidth={2.5} /></div><p className="nini-kicker">DATE CONFIRMED 💌</p><h2 className="nini-title" style={{ fontSize: "clamp(42px,10vw,82px)" }}>Nini <em>♡</em> Teddy</h2><div className="nini-glass" style={{ margin: "28px auto", maxWidth: 400, textAlign: "left" }}><p className="nini-section-label" style={{ marginTop: 0 }}>OUR DATE NIGHT</p><p style={{ fontSize: 13, lineHeight: 2, color: "#536b89" }}><Star size={14} color="#d86683" style={{ verticalAlign: "middle", marginRight: 8 }} /><strong>Games</strong><br /><span style={{ paddingLeft: 24 }}>Your choice</span><br /><MessageCircle size={14} color="#d86683" style={{ verticalAlign: "middle", marginRight: 8 }} /><strong>Talking</strong><br /><span style={{ paddingLeft: 24 }}>Tell me everything</span><br /><Clapperboard size={14} color="#d86683" style={{ verticalAlign: "middle", marginRight: 8 }} /><strong>Movie</strong><br /><span style={{ paddingLeft: 24 }}>Toy Story, Spider-Man, or whatever you choose</span><br /><Heart size={14} color="#d86683" style={{ verticalAlign: "middle", marginRight: 8 }} fill="#d86683" /><strong>Us</strong><br /><span style={{ paddingLeft: 24 }}>That's the important part</span></p></div><p className="nini-copy">I can't wait.<br />Now go pick what we're playing.</p><p className="nini-script" style={{ color: "#d86683", fontSize: 19, marginTop: 18 }}>See you tonight, Nini ♡</p></div>}
        </motion.section>
      </AnimatePresence>
      <button className="nini-secret-button" onClick={() => setSecret(true)} aria-label="A tiny secret"><SausageIcon /></button>
      <AnimatePresence>{secret && <SecretModal onClose={() => setSecret(false)} />}</AnimatePresence>
    </main>
  );
}