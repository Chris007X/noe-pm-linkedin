import { useState, useEffect, useRef } from "react";

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap";

// --- DATA ---
const RICE_DATA = [
  { feature: "Employer Trust Score", reach: 95, impact: 3, confidence: 85, effort: 4, rice: 60.6 },
  { feature: "Status Commitments", reach: 80, impact: 3, confidence: 75, effort: 3, rice: 60.0 },
  { feature: "Ghost Job Detection", reach: 70, impact: 2, confidence: 90, effort: 2, rice: 63.0 },
];

const STATS = [
  { value: "1.3Md", label: "membres inscrits", sub: "dans 200+ pays" },
  { value: "310M", label: "utilisateurs actifs/mois", sub: "seulement 24% des inscrits" },
  { value: "53%", label: "candidats ghostés", sub: "record 2026, +5pts vs 2025" },
  { value: "27%", label: "offres fantômes", sub: "sans intention réelle d'embaucher" },
];

const PAINPOINTS = [
  {
    emoji: "👻",
    title: "Ghost Jobs",
    desc: "27% des offres publiées n'ont aucune intention réelle d'embauche. Les entreprises les maintiennent pour paraître en croissance ou constituer un vivier.",
    source: "ResumeUp.AI, LinkedIn Data Analysis 2026",
  },
  {
    emoji: "🕳️",
    title: "Ghosting massif des candidats",
    desc: "53% des candidats n'obtiennent jamais de réponse — un record historique en 3 ans. Easy Apply a créé un effet volume toxique des deux côtés.",
    source: "Fortune, Mars 2026",
  },
  {
    emoji: "📢",
    title: "Feed devenu toxique",
    desc: "Engagement bait, posts 'Agree?', humblebragging… Le nouvel algo 360Brew tente de corriger, mais la perception de la marque est entamée (r/LinkedInLunatics).",
    source: "Botdog, LinkedIn Algorithm Changes 2026",
  },
  {
    emoji: "💸",
    title: "Premium perçu sans valeur",
    desc: "InMails avec <10% de taux de réponse, LinkedIn Learning sous-utilisé, et auto-renouvellement critiqué. Le ROI perçu est faible vs le prix.",
    source: "Reddit, Careery.pro analysis 2026",
  },
];

const SOLUTION_FEATURES = [
  {
    number: "01",
    title: "Employer Trust Score",
    subtitle: "La transparence comme levier de confiance",
    desc: "Un score visible sur chaque offre d'emploi, calculé à partir de données objectives : taux de réponse aux candidats, délai moyen de réponse, % d'offres ayant abouti à une embauche, et notes anonymes de candidats sur leur expérience.",
    impact: "Crée une pression positive : les entreprises qui recrutent bien sont récompensées par plus de visibilité. Les mauvaises pratiques sont rendues visibles.",
    metric: "Taux de réponse employeur",
    metricTarget: "Objectif : passer de 47% à 70% en 12 mois",
    color: "#4ECDC4",
  },
  {
    number: "02",
    title: "Application Status Commitments",
    subtitle: "Tuer le ghosting par le design",
    desc: "Les employeurs s'engagent contractuellement à mettre à jour le statut de chaque candidature sous 14 jours. Des nudges automatisés rappellent l'engagement. Sans mise à jour, l'offre est progressivement dépriorisée dans les résultats de recherche.",
    impact: "Transforme le candidat de 'demandeur passif' en 'client informé'. Le pipeline devient transparent : Reçue → En revue → Entretien → Décision → Retour.",
    metric: "Candidatures avec retour sous 14j",
    metricTarget: "Objectif : de ~47% à 80% en 18 mois",
    color: "#FFE66D",
  },
  {
    number: "03",
    title: "Ghost Job Detection",
    subtitle: "Assainir le marketplace algorithmiquement",
    desc: "Un algorithme détecte les offres suspectes : ouvertes >90 jours sans embauche, entreprise avec <20% de taux de réponse, repost cyclique de la même offre. Les offres vérifiées obtiennent un badge 'Actively Hiring' visible.",
    impact: "Réduit le bruit dans les résultats de recherche. Les candidats passent moins de temps sur des offres mortes. La confiance dans la plateforme remonte.",
    metric: "% d'offres actives vérifiées",
    metricTarget: "Objectif : 60% des offres badgées en 12 mois",
    color: "#FF6B6B",
  },
];

const JTBD_ITEMS = [
  {
    persona: "Candidat actif",
    situation: "je cherche un nouvel emploi et postule sur LinkedIn",
    motivation: "savoir rapidement si ma candidature a une chance",
    outcome: "ne pas perdre 3 semaines dans le vide sans aucun retour.",
  },
  {
    persona: "Candidat passif",
    situation: "je suis en poste mais ouvert aux opportunités",
    motivation: "évaluer le sérieux d'une offre avant de m'engager",
    outcome: "ne risquer mon poste actuel que pour des opportunités réelles.",
  },
  {
    persona: "Recruteur",
    situation: "je publie des offres et reçois 200+ candidatures",
    motivation: "trier efficacement et ne pas perdre les bons profils",
    outcome: "que les meilleurs candidats ne partent pas chez la concurrence faute de réponse.",
  },
];

// --- COMPONENTS ---

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.7rem",
      fontWeight: 500,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "#4ECDC4",
      marginBottom: "1rem",
    }}>
      {children}
    </div>
  );
}

function DiamondPhase({ phase, label, isActive, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: isActive ? color : "transparent",
        border: `1.5px solid ${isActive ? color : "rgba(255,255,255,0.15)"}`,
        color: isActive ? "#0a0a0f" : "rgba(255,255,255,0.5)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.65rem",
        fontWeight: 500,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "0.5rem 1.2rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderRadius: "2px",
      }}
    >
      <span style={{ fontSize: "0.55rem", opacity: 0.7, marginRight: "0.4rem" }}>{phase}</span>
      {label}
    </button>
  );
}

function StatCard({ value, label, sub, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "1.5rem",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.5rem",
          fontWeight: 900,
          color: "#f5f0e8",
          lineHeight: 1,
        }}>
          {value}
        </div>
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.7)",
          marginTop: "0.5rem",
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: "#4ECDC4",
          marginTop: "0.3rem",
          letterSpacing: "0.05em",
        }}>
          {sub}
        </div>
      </div>
    </FadeIn>
  );
}

function RICEBar({ feature, rice, maxRice, color, delay }) {
  const [ref, isVisible] = useInView();
  const width = (rice / maxRice) * 100;
  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        marginBottom: "0.4rem",
      }}>
        <span style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#f5f0e8",
        }}>{feature}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          color: color,
          fontWeight: 500,
        }}>{rice.toFixed(1)}</span>
      </div>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        height: "6px",
        borderRadius: "3px",
        overflow: "hidden",
      }}>
        <div style={{
          width: isVisible ? `${width}%` : "0%",
          height: "100%",
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: "3px",
          transition: `width 1s ease ${delay}s`,
        }} />
      </div>
    </div>
  );
}

// --- MAIN APP ---
export default function LinkedInCaseStudy() {
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS_LINK;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const phases = [
    { phase: "01", label: "Discover", color: "#4ECDC4" },
    { phase: "02", label: "Define", color: "#FFE66D" },
    { phase: "03", label: "Develop", color: "#FF6B6B" },
    { phase: "04", label: "Deliver", color: "#C3A6FF" },
  ];

  const maxRice = Math.max(...RICE_DATA.map((d) => d.rice));

  return (
    <div style={{
      background: "#0a0a0f",
      color: "#f5f0e8",
      minHeight: "100vh",
      fontFamily: "'Source Sans 3', sans-serif",
      overflowX: "hidden",
    }}>
      {/* ===== HERO ===== */}
      <header style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          right: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}>
            Exercice Product Management — Formation Noé
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.3)",
          }}>
            Christophe · Mai 2026
          </div>
        </div>

        <FadeIn>
          <SectionLabel>Case Study</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            maxWidth: "750px",
          }}>
            Sur LinkedIn, que changerais-tu
            <span style={{ color: "#4ECDC4" }}> — </span>
            <em style={{ fontWeight: 400, fontStyle: "italic" }}>et pourquoi ?</em>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p style={{
            fontSize: "1.15rem",
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: "600px",
            color: "rgba(255,255,255,0.6)",
          }}>
            Une analyse Product Management de la plus grande plateforme professionnelle
            au monde — en appliquant le Double Diamond, les Jobs-to-be-Done, et le
            scoring RICE pour identifier et résoudre son problème le plus critique.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
          }}>
            {phases.map((p, i) => (
              <DiamondPhase
                key={i}
                {...p}
                isActive={activePhase === i}
                onClick={() => {
                  setActivePhase(i);
                  const target = document.getElementById(`phase-${i}`);
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.15em",
            }}>SCROLL</span>
            <div style={{
              width: "1px",
              height: "30px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            }} />
          </div>
        </FadeIn>
      </header>

      {/* ===== METHODOLOGY INTRO ===== */}
      <section style={{
        padding: "6rem 2rem",
        maxWidth: "900px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <FadeIn>
          <SectionLabel>Approche méthodologique</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}>
            Le Double Diamond
          </h2>
          <p style={{
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "650px",
            marginBottom: "2rem",
          }}>
            Développé par le British Design Council, ce modèle structure la pensée produit
            en quatre phases. On diverge pour explorer, puis on converge pour décider — deux
            fois. D'abord pour identifier le bon problème, ensuite pour construire la bonne solution.
            L'erreur classique en produit : sauter aux solutions sans avoir compris le problème.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
            marginTop: "1rem",
          }}>
            {[
              { title: "Discover", desc: "Diverger. Comprendre les utilisateurs, le marché, les données. Sans filtre.", icon: "🔍", bg: "#4ECDC4" },
              { title: "Define", desc: "Converger. Identifier LE problème qui mérite d'être résolu. Cadrer.", icon: "🎯", bg: "#FFE66D" },
              { title: "Develop", desc: "Diverger. Explorer les solutions possibles. Prototyper. Tester.", icon: "🛠️", bg: "#FF6B6B" },
              { title: "Deliver", desc: "Converger. Prioriser, mesurer, itérer. Valider le succès.", icon: "📊", bg: "#C3A6FF" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#0a0a0f",
                padding: "1.5rem",
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  color: item.bg,
                  letterSpacing: "0.1em",
                  marginBottom: "0.5rem",
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.5,
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ===== PHASE 1: DISCOVER ===== */}
      <section id="phase-0" style={{
        padding: "6rem 2rem",
        maxWidth: "900px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <FadeIn>
          <SectionLabel>Phase 01 · Discover</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}>
            LinkedIn en 2026 : état des lieux
          </h2>
          <p style={{
            fontSize: "1rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
            marginBottom: "3rem",
            maxWidth: "600px",
          }}>
            Avant de résoudre quoi que ce soit, un PM doit comprendre le terrain. Données, tendances, 
            frustrations utilisateurs — sans biais de confirmation.
          </p>
        </FadeIn>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          marginBottom: "4rem",
        }}>
          {STATS.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 0.1} />
          ))}
        </div>

        {/* Pain Points */}
        <FadeIn>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "2rem",
          }}>
            Pain points identifiés
          </h3>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {PAINPOINTS.map((pp, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: "#0a0a0f",
                padding: "1.5rem 1.5rem",
                display: "grid",
                gridTemplateColumns: "2.5rem 1fr",
                gap: "1rem",
                alignItems: "start",
              }}>
                <span style={{ fontSize: "1.5rem" }}>{pp.emoji}</span>
                <div>
                  <div style={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    marginBottom: "0.4rem",
                    color: "#f5f0e8",
                  }}>{pp.title}</div>
                  <div style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.6,
                    marginBottom: "0.5rem",
                  }}>{pp.desc}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.25)",
                  }}>{pp.source}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== PHASE 2: DEFINE ===== */}
      <section id="phase-1" style={{
        padding: "6rem 2rem",
        maxWidth: "900px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <FadeIn>
          <SectionLabel>Phase 02 · Define</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}>
            Le vrai problème : la confiance brisée
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{
            background: "rgba(78, 205, 196, 0.05)",
            border: "1px solid rgba(78, 205, 196, 0.15)",
            padding: "2rem",
            marginBottom: "3rem",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#4ECDC4",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              Problem Statement
            </div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.3rem",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "#f5f0e8",
            }}>
              LinkedIn optimise aujourd'hui le volume de candidatures (Easy Apply, 9.5M
              applications/minute) au détriment de la qualité des interactions recruteur↔candidat.
              Résultat : un cercle vicieux où les candidats postulent en masse sans retour,
              les recruteurs sont noyés et ne répondent plus, et la confiance dans la plateforme
              s'érode — menaçant directement la proposition de valeur core de LinkedIn.
            </p>
          </div>
        </FadeIn>

        {/* Why this problem */}
        <FadeIn delay={0.15}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: "1rem",
          }}>
            Pourquoi ce problème et pas un autre ?
          </h3>
          <div style={{
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            maxWidth: "650px",
          }}>
            <p style={{ marginBottom: "0.8rem" }}>
              Quatre critères de sélection, issus du framework
              <strong style={{ color: "#FFE66D" }}> Opportunity Sizing </strong>
              de Teresa Torres :
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "#f5f0e8" }}>① Alignement stratégique</strong> — C'est le cœur du business model.
              LinkedIn vend l'accès au talent (Recruiter, Job Slots, InMail).
              Si la confiance s'effondre, le produit payant perd sa raison d'être.
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "#f5f0e8" }}>② Taille du marché impacté</strong> — 9.5M candidatures/minute.
              C'est le plus grand flux d'utilisateurs actifs sur la plateforme.
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "#f5f0e8" }}>③ Données probantes</strong> — 53% de ghosting, 27% de ghost jobs.
              Ce n'est pas une intuition : les données sont publiques et alarmantes.
            </p>
            <p>
              <strong style={{ color: "#f5f0e8" }}>④ Momentum</strong> — L'Ontario (Canada) vient de voter une loi
              anti-ghosting pour les recruteurs. Le marché pousse vers la régulation.
              LinkedIn peut prendre les devants ou subir.
            </p>
          </div>
        </FadeIn>

        {/* JTBD */}
        <FadeIn delay={0.2}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}>
            Jobs-to-be-Done
          </h3>
          <p style={{
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "1.5rem",
            maxWidth: "550px",
            lineHeight: 1.5,
          }}>
            Framework de Clayton Christensen (Harvard). On ne demande pas ce que l'utilisateur veut,
            mais pour quel « job » il « embauche » le produit.
          </p>
        </FadeIn>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          marginBottom: "1rem",
        }}>
          {JTBD_ITEMS.map((item, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div style={{
                background: "#0a0a0f",
                padding: "1.5rem",
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "#FFE66D",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}>
                  {item.persona}
                </div>
                <p style={{
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                }}>
                  « Quand <strong style={{ color: "#f5f0e8" }}>{item.situation}</strong>,
                  je veux <strong style={{ color: "#f5f0e8" }}>{item.motivation}</strong>,
                  pour <strong style={{ color: "#f5f0e8" }}>{item.outcome}</strong> »
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== PHASE 3: DEVELOP ===== */}
      <section id="phase-2" style={{
        padding: "6rem 2rem",
        maxWidth: "900px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <FadeIn>
          <SectionLabel>Phase 03 · Develop</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}>
            La solution : LinkedIn Trust Loop
          </h2>
          <p style={{
            fontSize: "1rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
            marginBottom: "1rem",
            maxWidth: "600px",
          }}>
            Trois features interconnectées qui créent un cercle vertueux :
            plus de transparence → meilleur comportement des employeurs →
            plus de confiance des candidats → plus de candidatures qualifiées →
            meilleur ROI pour les employeurs.
          </p>
        </FadeIn>

        {/* Flywheel diagram */}
        <FadeIn delay={0.1}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "2rem",
            marginBottom: "3rem",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.15em",
              marginBottom: "1.5rem",
            }}>FLYWHEEL · CERCLE VERTUEUX</div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}>
              {[
                { text: "Trust Score visible", color: "#4ECDC4" },
                { text: "Employeurs répondent", color: "#FFE66D" },
                { text: "Candidats font confiance", color: "#FF6B6B" },
                { text: "Candidatures qualifiées ↑", color: "#C3A6FF" },
                { text: "ROI employeur ↑", color: "#4ECDC4" },
              ].map((step, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    color: step.color,
                    background: `${step.color}11`,
                    padding: "0.4rem 0.8rem",
                    border: `1px solid ${step.color}33`,
                    fontSize: "0.75rem",
                  }}>{step.text}</span>
                  {i < 4 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1rem" }}>→</span>}
                </span>
              ))}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              color: "rgba(255,255,255,0.2)",
              marginTop: "1rem",
            }}>↻ BOUCLE AUTO-RENFORÇANTE</div>
          </div>
        </FadeIn>

        {/* Feature Cards */}
        {SOLUTION_FEATURES.map((feat, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{
              borderLeft: `2px solid ${feat.color}`,
              paddingLeft: "1.5rem",
              marginBottom: "3rem",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "2rem",
                fontWeight: 500,
                color: `${feat.color}33`,
                lineHeight: 1,
                marginBottom: "0.25rem",
              }}>
                {feat.number}
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}>
                {feat.title}
              </h3>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: feat.color,
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}>
                {feat.subtitle}
              </div>
              <p style={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: "0.75rem",
                maxWidth: "600px",
              }}>
                {feat.desc}
              </p>
              <p style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                marginBottom: "1rem",
                maxWidth: "600px",
                fontStyle: "italic",
              }}>
                {feat.impact}
              </p>
              <div style={{
                display: "inline-block",
                background: `${feat.color}11`,
                border: `1px solid ${feat.color}22`,
                padding: "0.6rem 1rem",
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.1em",
                  marginBottom: "0.2rem",
                }}>
                  MÉTRIQUE CLÉ
                </div>
                <div style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: feat.color,
                }}>{feat.metric}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "0.15rem",
                }}>{feat.metricTarget}</div>
              </div>
            </div>
          </FadeIn>
        ))}

        {/* Anti-Solution */}
        <FadeIn>
          <div style={{
            background: "rgba(255, 107, 107, 0.04)",
            border: "1px solid rgba(255, 107, 107, 0.1)",
            padding: "1.5rem",
            marginTop: "1rem",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#FF6B6B",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}>
              ⚠ Challenge : ce que je n'ai PAS proposé (et pourquoi)
            </div>
            <p style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
            }}>
              <strong style={{ color: "#f5f0e8" }}>Supprimer Easy Apply ?</strong> Tentant, mais Easy Apply représente un
              volume critique pour la monétisation. Le problème n'est pas l'outil, c'est l'absence de feedback loop.
              <br /><br />
              <strong style={{ color: "#f5f0e8" }}>Refondre le feed ?</strong> LinkedIn le fait déjà avec 360Brew (le nouvel algo IA lancé
              fin 2025). S'y attaquer maintenant serait redondant — mieux vaut se concentrer sur un angle mort.
              <br /><br />
              <strong style={{ color: "#f5f0e8" }}>Vérification des compétences ?</strong> Important mais complexe (comment vérifier « leadership » ?).
              Le Trust Score sur les employeurs est plus actionnable à court terme et impacte plus d'utilisateurs.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ===== PHASE 4: DELIVER ===== */}
      <section id="phase-3" style={{
        padding: "6rem 2rem",
        maxWidth: "900px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <FadeIn>
          <SectionLabel>Phase 04 · Deliver</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}>
            Priorisation & Métriques de succès
          </h2>
        </FadeIn>

        {/* RICE explanation */}
        <FadeIn delay={0.1}>
          <div style={{
            background: "rgba(195, 166, 255, 0.04)",
            border: "1px solid rgba(195, 166, 255, 0.12)",
            padding: "1.5rem",
            marginBottom: "2.5rem",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#C3A6FF",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              Framework RICE (Intercom)
            </div>
            <p style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.6,
              marginBottom: "0.75rem",
            }}>
              Chaque feature est évaluée selon quatre critères quantifiés :
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "0.75rem",
            }}>
              {[
                { letter: "R", word: "Reach", desc: "Combien d'utilisateurs touchés par trimestre", unit: "% de la base" },
                { letter: "I", word: "Impact", desc: "Quel effet sur la satisfaction utilisateur", unit: "1 = faible, 3 = massif" },
                { letter: "C", word: "Confidence", desc: "Certitude dans nos estimations", unit: "0-100%" },
                { letter: "E", word: "Effort", desc: "Personnes-mois d'ingénierie nécessaires", unit: "divise le score" },
              ].map((r, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    color: "#C3A6FF",
                  }}>{r.letter}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#f5f0e8",
                    fontWeight: 600,
                  }}>{r.word}</div>
                  <div style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.35)",
                    marginTop: "0.2rem",
                    lineHeight: 1.3,
                  }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* RICE Scores */}
        <FadeIn delay={0.15}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}>
            Scores RICE comparés
          </h3>
        </FadeIn>

        <div style={{ marginBottom: "2rem" }}>
          {RICE_DATA.map((d, i) => (
            <RICEBar
              key={i}
              feature={d.feature}
              rice={d.rice}
              maxRice={maxRice + 5}
              color={SOLUTION_FEATURES[i].color}
              delay={i * 0.15}
            />
          ))}
        </div>

        {/* Detail table */}
        <FadeIn delay={0.2}>
          <div style={{
            overflowX: "auto",
            marginBottom: "3rem",
          }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
            }}>
              <thead>
                <tr>
                  {["Feature", "Reach", "Impact", "Confidence", "Effort", "RICE"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left",
                      padding: "0.6rem 0.8rem",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontSize: "0.6rem",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RICE_DATA.map((d, i) => (
                  <tr key={i}>
                    <td style={{ padding: "0.6rem 0.8rem", color: SOLUTION_FEATURES[i].color, fontWeight: 500 }}>
                      {d.feature}
                    </td>
                    <td style={{ padding: "0.6rem 0.8rem", color: "rgba(255,255,255,0.6)" }}>{d.reach}%</td>
                    <td style={{ padding: "0.6rem 0.8rem", color: "rgba(255,255,255,0.6)" }}>{d.impact}/3</td>
                    <td style={{ padding: "0.6rem 0.8rem", color: "rgba(255,255,255,0.6)" }}>{d.confidence}%</td>
                    <td style={{ padding: "0.6rem 0.8rem", color: "rgba(255,255,255,0.6)" }}>{d.effort} p/m</td>
                    <td style={{ padding: "0.6rem 0.8rem", color: "#f5f0e8", fontWeight: 700 }}>{d.rice.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* North Star */}
        <FadeIn delay={0.25}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "3rem",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.2em",
              marginBottom: "1rem",
            }}>
              NORTH STAR METRIC
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#f5f0e8",
              marginBottom: "0.5rem",
            }}>
              Quality Match Rate
            </div>
            <p style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}>
              % de candidatures qui génèrent au moins une interaction
              significative (message, entretien, feedback) entre employeur et candidat.
              Remplace la vanity metric actuelle (nombre total de candidatures).
            </p>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "1.5rem",
              flexWrap: "wrap",
            }}>
              {[
                { label: "Baseline estimé", value: "~12%", color: "rgba(255,255,255,0.3)" },
                { label: "Objectif M+6", value: "25%", color: "#FFE66D" },
                { label: "Objectif M+12", value: "40%", color: "#4ECDC4" },
              ].map((m, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    color: m.color,
                  }}>{m.value}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.1em",
                  }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Roadmap */}
        <FadeIn delay={0.3}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}>
            Roadmap d'implémentation
          </h3>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
          }}>
            {[
              {
                phase: "Sprint 0-2",
                title: "Quick Win · Ghost Job Detection",
                items: "Algorithme de détection basé sur l'ancienneté des offres, le taux de réponse, et les signalements communautaires. Badge 'Actively Hiring'. Pas de changement UI majeur — backend only.",
                tag: "EFFORT: FAIBLE",
                color: "#FF6B6B",
              },
              {
                phase: "Sprint 3-6",
                title: "MVP · Employer Trust Score",
                items: "Score calculé (non affiché) pendant 3 mois pour calibrer. A/B test de l'affichage sur 5% des offres. Mesure du taux de candidature et satisfaction candidat (NPS post-application). Itération sur le modèle de scoring.",
                tag: "EFFORT: MOYEN",
                color: "#4ECDC4",
              },
              {
                phase: "Sprint 7-12",
                title: "Scale · Status Commitments",
                items: "Roll-out du Trust Score à 100%. Ajout des nudges automatiques aux employeurs. Pipeline de statut visible pour le candidat. Incentive : les entreprises avec Trust Score > 80 obtiennent un boost de visibilité gratuit dans les résultats.",
                tag: "EFFORT: ÉLEVÉ",
                color: "#FFE66D",
              },
            ].map((r, i) => (
              <div key={i} style={{
                background: "#0a0a0f",
                padding: "1.5rem",
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "1rem",
                alignItems: "start",
              }}>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    color: r.color,
                  }}>{r.phase}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "rgba(255,255,255,0.25)",
                    marginTop: "0.3rem",
                  }}>{r.tag}</div>
                </div>
                <div>
                  <div style={{
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    color: "#f5f0e8",
                    fontSize: "0.95rem",
                  }}>{r.title}</div>
                  <div style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                  }}>{r.items}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Risks */}
        <FadeIn delay={0.35}>
          <div style={{
            marginTop: "3rem",
            padding: "1.5rem",
            background: "rgba(255, 230, 109, 0.04)",
            border: "1px solid rgba(255, 230, 109, 0.1)",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#FFE66D",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              Risques identifiés & mitigations
            </div>
            <div style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
            }}>
              <p style={{ marginBottom: "0.6rem" }}>
                <strong style={{ color: "#f5f0e8" }}>Résistance des employeurs</strong> — Un Trust Score bas pourrait pousser les
                entreprises à quitter la plateforme. Mitigation : commencer par un score privé (visible uniquement par l'employeur)
                pendant 6 mois, avec des recommandations d'amélioration. Gamifier le progrès.
              </p>
              <p style={{ marginBottom: "0.6rem" }}>
                <strong style={{ color: "#f5f0e8" }}>Gaming du score</strong> — Réponses automatiques vides pour gonfler le taux.
                Mitigation : le score intègre la qualité du feedback (détection de templates
                génériques par NLP) et les notes candidats post-process.
              </p>
              <p>
                <strong style={{ color: "#f5f0e8" }}>Impact sur le revenu court terme</strong> — Moins d'offres publiées = moins de
                revenus Job Slots. Mitigation : les données montrent que les marketplaces à haute confiance
                (Airbnb Superhost, Uber rating) ont toujours surperformé sur le long terme. Le Trust Score
                devient lui-même un produit Premium (analytics avancés pour les employeurs).
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ===== TRANSPARENCE : GEMINI vs CLAUDE ===== */}
      <section style={{
        padding: "6rem 2rem",
        maxWidth: "900px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <FadeIn>
          <SectionLabel>Transparence méthodologique</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}>
            Deux IA, deux réponses, un choix assumé
          </h2>
          <p style={{
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "650px",
            marginBottom: "2.5rem",
          }}>
            Je ne suis pas encore formé en Product Management. Ce cas pratique a été réalisé en pilotant
            deux IA — Gemini (Google) et Claude (Anthropic) — sur le même prompt, puis en confrontant
            leurs réponses pour choisir la plus solide. C'est cette compétence de pilotage, de challenge
            et de mise en œuvre que je revendique. Voici les deux approches, et pourquoi j'ai retenu celle
            que vous venez de lire.
          </p>
        </FadeIn>

        {/* Gemini's proposal */}
        <FadeIn delay={0.1}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "2rem",
            marginBottom: "1.5rem",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#8AB4F8",
                textTransform: "uppercase",
                fontWeight: 500,
              }}>
                Proposition Gemini — « LinkedIn Signal & Artifacts »
              </div>
            </div>
            <div style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
            }}>
              <p style={{ marginBottom: "0.8rem" }}>
                <strong style={{ color: "#f5f0e8" }}>Diagnostic :</strong> Le feed LinkedIn est dégradé par
                l'hyper-optimisation pour l'engagement (slop, rage-bait, storytelling artificiel).
                La charge cognitive explose, les vrais experts sont noyés.
              </p>
              <p style={{ marginBottom: "0.8rem" }}>
                <strong style={{ color: "#f5f0e8" }}>Solution 1 — LinkedIn Artifacts :</strong> Remplacer les simples liens
                d'un profil par un espace d'hébergement natif de livrables réels (code, études de cas,
                analyses financières), validés par un système de « Peer Review » entre collègues.
              </p>
              <p style={{ marginBottom: "0.8rem" }}>
                <strong style={{ color: "#f5f0e8" }}>Solution 2 — Signal Slider :</strong> Un curseur dans le feed
                permettant de régler l'intensité entre « Réseau & Culture » (le feed actuel) et
                « Expertise & Artifacts » (livrables techniques uniquement).
              </p>
              <p>
                <strong style={{ color: "#f5f0e8" }}>Trade-off assumé :</strong> Accepter une baisse estimée de 5%
                des revenus publicitaires pour protéger la valeur des abonnements Premium B2B.
                Framework utilisé : CIRCLES (Lewis Lin).
              </p>
            </div>
          </div>
        </FadeIn>

        {/* My diagnostic */}
        <FadeIn delay={0.15}>
          <div style={{
            background: "rgba(78, 205, 196, 0.04)",
            border: "1px solid rgba(78, 205, 196, 0.12)",
            padding: "2rem",
            marginBottom: "1.5rem",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#4ECDC4",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: "1.25rem",
            }}>
              Pourquoi j'ai retenu l'approche Claude — Mon diagnostic comparatif
            </div>
            <div style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
            }}>
              <p style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "#4ECDC4" }}>① Le problème n'est plus un angle mort.</strong>{" "}
                Gemini identifie la dégradation du feed comme problème central. Or LinkedIn a déjà
                déployé 360Brew (son nouvel algo IA) fin 2025, puis l'Authenticity Update de mars 2026,
                précisément pour ça. Proposer de résoudre un problème que l'entreprise traite activement,
                c'est risqué — ça peut donner l'impression de ne pas avoir fait sa recherche terrain.
                Le Trust Loop cible un angle mort que LinkedIn ne traite pas encore.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "#4ECDC4" }}>② Les Artifacts avec Peer Review posent un problème d'incentive.</strong>{" "}
                Qui va faire la peer review ? Des collègues actuels vont-ils valider publiquement un livrable
                d'un ex-collègue ? L'incentive est quasi nul. LinkedIn a déjà les Skills Endorsements
                et les Recommendations — massivement ignorés ou gamifiés. L'idée est séduisante
                conceptuellement, mais sans réponse à « pourquoi les gens l'utiliseraient-ils vraiment ? ».
              </p>
              <p style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "#4ECDC4" }}>③ Pas de données sourcées.</strong>{" "}
                « Une forte dégradation », « la charge cognitive explose » — ce sont des affirmations
                qualitatives. En PM, une intuition sans data est une opinion. Le Trust Loop
                s'appuie sur des données datées : 53% de ghosting (Fortune, mars 2026),
                27% de ghost jobs (ResumeUp.AI), loi anti-ghosting en Ontario (2026).
              </p>
              <p>
                <strong style={{ color: "#4ECDC4" }}>④ Pas de métriques ni de roadmap.</strong>{" "}
                Comment mesurer si les Artifacts marchent ? Quel North Star ? Le « -5% de revenus pub »
                est posé sans justification. L'approche Trust Loop inclut un RICE scoring, une North Star
                Metric (Quality Match Rate), et une roadmap en trois sprints.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* What Gemini does better */}
        <FadeIn delay={0.2}>
          <div style={{
            background: "rgba(138, 180, 248, 0.04)",
            border: "1px solid rgba(138, 180, 248, 0.1)",
            padding: "1.5rem",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              color: "#8AB4F8",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              Ce que Gemini fait mieux — honnêteté intellectuelle
            </div>
            <div style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
            }}>
              <p style={{ marginBottom: "0.5rem" }}>
                Le concept de « Signal Slider » est une idée UX plus élégante et intuitive que tout ce que
                propose le Trust Loop côté interface. La tension « économie de l'attention vs économie
                de la preuve » est un cadrage intellectuellement puissant. Et le trade-off business
                est posé avec plus d'audace — assumer une perte de revenu à court terme montre une
                maturité stratégique réelle.
              </p>
              <p>
                La réponse idéale combinerait probablement les deux :
                le Trust Loop sur la recherche d'emploi (le moteur économique),
                et le Signal Slider sur le feed (l'expérience quotidienne).
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        padding: "4rem 2rem",
        maxWidth: "900px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        textAlign: "center",
      }}>
        <FadeIn>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "#f5f0e8",
          }}>
            Merci de votre lecture.
          </div>
          <p style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.6,
            maxWidth: "450px",
            margin: "0 auto 2rem",
          }}>
            Ce case study a été réalisé en confrontant deux IA (Gemini et Claude) sur le même exercice,
            puis en sélectionnant et assemblant les réponses les plus solides. Les méthodologies PM —
            Double Diamond, JTBD, RICE, North Star — ont été appliquées à un problème réel, sourcé avec des données 2026.
          </p>
          <div style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
            {[
              { label: "Méthodologie", value: "Double Diamond" },
              { label: "Cadrage", value: "Jobs-to-be-Done" },
              { label: "Priorisation", value: "RICE (Intercom)" },
              { label: "Mesure", value: "North Star Metric" },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>
                  {m.label}
                </div>
                <div style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "0.2rem",
                }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: "3rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.15em",
          }}>
            CHRISTOPHE · CANDIDATURE NOÉ PM · MAI 2026
          </div>
          <div style={{
            marginTop: "1.5rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.5rem",
            color: "rgba(255,255,255,0.1)",
            letterSpacing: "0.1em",
          }}>
            Design inspiré par Linear.app · Stripe Press · Pitch.com
          </div>
        </FadeIn>
      </footer>
    </div>
  );
}
