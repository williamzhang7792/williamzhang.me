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
      parts: ["Passed seven actuarial exams in a year"],
    },
    {
      icon: "Briefcase",
      parts: [
        "Actuarial Intern · ",
        { label: "Intact", href: "https://careers.intactfc.com/" },
        " (Jan-Apr 2026)",
      ],
    },
    {
      icon: "Briefcase",
      parts: [
        "Actuarial Intern · ",
        { label: "Pacific Life Re", href: "https://www.pacificlifere.com/" },
        " (Summer 2025)",
      ],
    },
    {
      icon: "Code",
      parts: [
        "Software Developer @ Google Summer of Code (",
        { label: "gfpop", href: "https://arxiv.org/abs/2002.03646" },
        ")",
      ],
    },
    {
      icon: "Trophy",
      parts: [
        "Directing ",
        { label: "ASNA", href: "https://anea-asna.ca/home/" },
        "'s national case competition (scaled from 37 to 96 teams in 2026)",
      ],
    },
    {
      icon: "Award",
      parts: [
        "1st · ",
        {
          label: "SOA Research Challenge",
          href: "https://www.soa.org/research/opportunities/2025-student-research-case-study-challenge/",
        },
        " (2025, 68 international teams)",
      ],
    },
  ],
  thinking: [
    {
      icon: "Network",
      parts: [
        { label: "AI agent risk", href: "/notes/a-score-is-not-a-rate/" },
        " — what I'm noticing and hoping for",
      ],
    },
    {
      icon: "GitBranch",
      parts: [
        { label: "The actuarial bifurcation", href: "/notes/actuarial-bifurcation/" },
        " — what the integrated path means",
      ],
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
