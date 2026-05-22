// REMINDER: replace /public/signature.svg with your real handwritten signature within 30 days.

/**
 * A bullet's text is an array of parts. Plain strings render as text; objects
 * with { label, href } render as a link with the L→R underline-grow primitive.
 *
 * Why parts instead of one string + href: only the relevant entity (e.g.
 * "Intact", "ASNA", "SOA Research Challenge") should be clickable, not the
 * full bullet. Parts make this explicit and type-safe.
 */
export type TextPart = string | { label: string; href: string };

export type Bullet = {
  /** Lucide icon PascalCase name (e.g. "Briefcase") | the literal "shuttlecock" */
  icon: string;
  parts: TextPart[];
};

export type About = {
  name: string;
  location: string;
  positioning: string;
  doing: Bullet[];
  thinking: Bullet[];
};

export const about: About = {
  name: "William Zhang",
  location: "Waterloo, ON",
  positioning:
    "Stats and computing at Waterloo. Seven CAS exams in, on track for FCAS. Spend my time thinking about where actuarial work meets modern technology — especially in cyber and AI risk.",
  doing: [
    {
      icon: "GraduationCap",
      parts: ["Seven CAS exams passed (FCAS-track)"],
    },
    {
      icon: "Briefcase",
      parts: [
        "Actuarial Analyst Intern · ",
        { label: "Intact", href: "https://www.intact.ca" },
        " (Jan-Apr 2026)",
      ],
    },
    {
      icon: "Briefcase",
      parts: [
        "Actuarial Analyst Intern · ",
        { label: "Pacific Life Re", href: "https://www.pacificlifere.com" },
        " (Summer 2025)",
      ],
    },
    {
      icon: "Code",
      parts: [
        "Google Summer of Code contributor on R Project (",
        { label: "gfpop", href: "https://github.com/vrunge/gfpop" },
        ")",
      ],
    },
    {
      icon: "Trophy",
      parts: [
        "Directing ",
        { label: "ASNA", href: "https://www.asna.ca" },
        "'s national case competition (96 teams in 2026)",
      ],
    },
    {
      icon: "Award",
      parts: [
        "1st · ",
        { label: "SOA Research Challenge", href: "https://www.soa.org/research/research-challenge/" },
        " (2025, 68 international teams)",
      ],
    },
    {
      icon: "Medal",
      parts: [
        "1st · ",
        { label: "CPA Case Challenge", href: "https://www.cpacanada.ca" },
        " (2024, 75 national teams)",
      ],
    },
  ],
  thinking: [
    {
      icon: "GitBranch",
      parts: ["The bifurcation of actuarial work — where the integrated path leads"],
    },
    {
      icon: "Network",
      parts: ["AI agent liability insurance as an emerging risk category"],
    },
    {
      icon: "Building2",
      parts: ["How modern MGAs change what actuarial work actually looks like"],
    },
    {
      icon: "shuttlecock",
      parts: [
        { label: "Badminton", href: "#badminton" },
        ", probably a bit too much",
      ],
    },
  ],
};
