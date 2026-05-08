// Owner data — sourced from Gautam Gupta's resume.
// To update content, edit fields below. // TODO markers render visibly amber.

export type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  stack: string[];
  url?: string;
  repo?: string;
  image?: string;
  period?: string;
  featured?: boolean;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  mentor?: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  location?: string;
  detail?: string;
};

export type Publication = {
  title: string;
  venue: string;
  desc: string;
  url?: string;
};

export type StatChip = { label: string; value: string };

export const profile = {
  name: "Gautam Gupta",
  handle: "gautam2905",
  role: "AI Researcher · CS @ IIIT-Delhi",
  location: "Delhi, India",
  email: "guptagautam2905@gmail.com",
  phone: "+91 98737 74763",
  tagline:
    "Building constitutional classifiers, Gaussian splats, and other things that learn from rules.",

  bio: [
    "I'm a B.Tech CS student at IIIT-Delhi (class of 2027) doing AI research at the intersection of LLMs, privacy, and interpretability. Right now I'm working on constitutional classifiers — models that learn auditable natural-language rules instead of needing to be fine-tuned.",
    "Before that I was hacking on 3D Gaussian Splatting on drones, building RL agents from scratch (Othello via AlphaZero), and shipping image super-resolution and AI-for-architecture web apps.",
    "I like research that becomes a real demo, code that runs on a Jetson, and papers I can read in one sitting. Currently mentored by Dr. Nils Lukas (MBZUAI) and Rushil Thareja.",
  ].join("\n\n"),

  stats: [
    { label: "based in", value: "Delhi, IN" },
    { label: "stack", value: "Python · PyTorch · CUDA" },
    { label: "currently", value: "AI research @ MBZUAI (remote)" },
    { label: "open to", value: "research collabs · internships" },
  ] as StatChip[],

  skills: {
    languages: ["Python", "C++", "C", "Java", "CUDA", "MATLAB"],
    ml: ["PyTorch", "TensorFlow", "Hugging Face", "Scikit-Learn", "XGBoost"],
    tools: ["Git", "VS Code", "Jupyter", "Claude-Code"],
    interests: [
      "LLMs",
      "Differential Privacy",
      "Reinforcement Learning",
      "3D Reconstruction",
      "RAG",
    ],
  },

  experience: [
    {
      role: "AI Researcher",
      company: "MBZUAI (with Dr. Nils Lukas, Rushil Thareja)",
      period: "Aug 2025 – Nov 2025",
      location: "Remote",
      bullets: [
        "Developed a 'constitutional classifier' that learns auditable natural-language privacy rules, achieving SOTA on Legal, Healthcare, and Finance documents without fine-tuning.",
        "Engineered the Constitutional Tagger API service and shipped it to production.",
      ],
    },
    {
      role: "AI Researcher",
      company: "MBZUAI (with Rushil Thareja)",
      period: "Jun 2025 – Aug 2025",
      bullets: [
        "Built a demonstration for the DP-Fusion paper and deployed it.",
        "Built Alpine Chat — a locally deployed, privacy-first chat interface with PII removal.",
      ],
    },
    {
      role: "Undergraduate Researcher",
      company: "IIIT Delhi (with Dr. Rajiv Ratan)",
      period: "Oct 2024 – Apr 2025",
      bullets: [
        "Architected a novel LLM-driven patch-generation algorithm to mitigate alignment-faking.",
        "Integrated RAG with knowledge-graph embeddings to boost code-patch accuracy.",
      ],
    },
  ] as Experience[],

  publications: [
    // Re-enable once accepted at a venue (currently a submission):
    // {
    //   title: "MAC: Multi-Agent Constitution Learning",
    //   venue: "ICML 2026 (submission)",
    //   desc: "Multi-agent constitutional learning that automates rule discovery, outperforming recent prompt-optimization methods by 50%+ without parameter updates.",
    //   url: "https://arxiv.org/abs/2604.13275",
    // },
    {
      title: "Better and Worse with Scale: How Contextual Entrainment Diverges with Model Size",
      venue: "ACL 2026 Findings",
      desc: "Formalized scaling laws for contextual entrainment — bigger models resist misinformation but copy mechanically more.",
      url: "https://arxiv.org/abs/2603.15968",
    },
    {
      title: "Sanitizing Medical Documents with Differential Privacy using LLMs",
      venue: "GenAI4Health @ NeurIPS",
      desc: "Constitutional classifiers tag private data via auditable natural-language rules — no costly fine-tuning required.",
      url: "https://neurips.cc/virtual/2025/loc/san-diego/124873",
    },
  ] as Publication[],

  education: [
    {
      school: "Indraprastha Institute of Information Technology, Delhi",
      degree: "B.Tech, Computer Science & Engineering",
      period: "Aug 2023 – Jul 2027 (expected)",
      location: "New Delhi, India",
      detail:
        "Coursework: Reinforcement Learning, Statistical & Bayesian ML, DSA, Computer Organization, Linear Algebra, Probability & Statistics, Multivariate Calculus, Quantum Computing.",
    },
  ] as Education[],

  projects: [
    {
      id: "001",
      slug: "aerial-mapping-drone",
      name: "Aerial Mapping Drone",
      tagline: "3D Gaussian Splatting on a Jetson, in real time.",
      desc: "Unified pipeline + CUDA-accelerated VR renderer that turns drone video into a navigable 3D reconstruction.",
      stack: ["Python", "PyTorch", "CUDA", "3DGS"],
      repo: "https://github.com/gautam2905",
      image: "/projects/aerial-mapping-drone.png",
      period: "Apr 2024 – Sep 2024",
      featured: true,
    },
    {
      id: "002",
      slug: "ai-for-architects",
      name: "AI for Architects",
      tagline: "On-brief sample images for client presentations.",
      desc: "Web platform that lets architecture firms generate concept renders matching their brief, fast.",
      stack: ["React", "Python", "Backend"],
      repo: "https://github.com/gautam2905",
      image: "/projects/ai-for-architects.png",
      period: "May 2025 – Jul 2025",
      featured: true,
    },
    {
      id: "003",
      slug: "alphaoth-zero",
      name: "AlphaOth Zero",
      tagline: "AlphaGo Zero, but for Othello, from scratch.",
      desc: "Self-play RL + Monte Carlo Tree Search implementation. Trained an Othello agent end-to-end.",
      stack: ["Python", "PyTorch", "RL", "MCTS"],
      repo: "https://github.com/gautam2905",
      image: "/projects/alphaoth-zero.png",
      period: "May 2025 – Jun 2025",
      featured: true,
    },
    {
      id: "004",
      slug: "super-resolution-webapp",
      name: "Super-Resolution Web-App",
      tagline: "SRGAN-based image upscaling, in the browser.",
      desc: "Deployed web app that lets users upscale and enhance low-resolution images in real time.",
      stack: ["Python", "PyTorch", "SRGAN"],
      repo: "https://github.com/gautam2905",
      image: "/projects/super-resolution-webapp.png",
      period: "Aug 2024 – Sep 2024",
    },
  ] as Project[],

  socials: {
    github: "https://github.com/gautam2905",
    linkedin: "https://www.linkedin.com/in/gautam-gupta-382720175",
    twitter: "https://x.com/GautamG76742081",
    email: "guptagautam2905@gmail.com",
  },

  resumeUrl: "/resume.pdf",
  photoUrl: "/me.jpg",
  asciiPortraitUrl: "/me-ascii.txt",
} as const;

export type Profile = typeof profile;
