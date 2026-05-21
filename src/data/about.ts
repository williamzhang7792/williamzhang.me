// REMINDER: refresh `lately` every 1-3 months. Less time-sensitive than "currently"
// so it ages better if life gets busy. Field is named `lately` for that reason.
// REMINDER: replace /public/signature.svg with your real handwritten signature within 30 days.

export type Bullet = {
  /** Lucide icon PascalCase name (e.g. "Briefcase") | the literal "shuttlecock" */
  icon: string;
  text: string;
  /** null = plain text, no hover, no link */
  href: string | null;
};

export type About = {
  name: string;
  location: string;
  lately: string;
  positioning: string;
  doing: Bullet[];
  thinking: Bullet[];
};

export const about: About = {
  name: "William Zhang",
  location: "Waterloo, ON",
  lately: "prepping for Exam 5, building this site, thinking about AI risk",
  positioning:
    "Stats and computing at Waterloo. Seven CAS exams in, on track for FCAS. Spend my time thinking about where actuarial work meets modern technology — especially in cyber and AI risk.",
  doing: [
    { icon: "GraduationCap", text: "Seven CAS exams passed (FCAS-track)", href: null },
    {
      icon: "Briefcase",
      text: "Actuarial Analyst Intern @ Intact (Jan-Apr 2026)",
      href: "https://www.intact.ca",
    },
    {
      icon: "Briefcase",
      text: "Actuarial Analyst Intern @ Pacific Life Re (Summer 2025)",
      href: "https://www.pacificlifere.com",
    },
    {
      icon: "Code",
      text: "Google Summer of Code contributor on R Project (gfpop)",
      href: "https://github.com/vrunge/gfpop",
    },
    {
      icon: "Trophy",
      text: "Directing ASNA's national case competition (96 teams in 2026)",
      href: "https://www.asna.ca",
    },
    {
      icon: "Award",
      text: "1st @ SOA Research Challenge 2025 (68 international teams)",
      href: "https://www.soa.org/research/research-challenge/",
    },
    {
      icon: "Medal",
      text: "1st @ CPA Case Challenge 2024 (75 national teams)",
      href: "https://www.cpacanada.ca",
    },
  ],
  thinking: [
    {
      icon: "GitBranch",
      text: "The bifurcation of actuarial work — where the integrated path leads",
      href: null,
    },
    {
      icon: "Network",
      text: "AI agent liability insurance as an emerging risk category",
      href: null,
    },
    {
      icon: "Building2",
      text: "How modern MGAs change what actuarial work actually looks like",
      href: null,
    },
    {
      icon: "shuttlecock",
      text: "Badminton, probably a bit too much",
      href: "#badminton",
    },
  ],
};
