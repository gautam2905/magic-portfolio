import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Gautam",
  lastName: "Gupta",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "ML Engineer",
  avatar: "/images/avatar.jpg",
  email: "guptagautam2905@gmail.com",
  location: "Asia/India", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally repost important AI/ML related news. And post cool stuff about my ML journey and studies.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/gautam2905",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/gautam-gupta-382720175",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/GautamG76742081",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building revolutionizing AI ML technology</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Context-Aware Code Reviewer</strong></>,
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm Gautam, a third year student at IIIT Delhi, where I am building my expertise
      <br /> in Machine learning and Artificial Intelligence. After hours, I build my own projects.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
         I’m a B.Tech student in Computer Science & Engineering at IIIT Delhi,
         driven by a passion for cutting-edge AI research and high-performance computing.
         I want to specialize in large language models and reinforcement learning, while also mastering CUDA to optimize and accelerate complex algorithms.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Undergraduate Research Assistant",
        timeframe: "October 2024 - Present",
        role: "Research Assistant",
        achievements: [
          <>
            Collaborated with PhD researchers to architect a novel LLM-driven patch-generation algorithm, mitigating
            alignment-faking and repository inconsistencies.
          </>,
          <>
            Integrated Retrieval-Augmented Generation with knowledge-graph embeddings to boost contextual accuracy of
            synthesized code patches.
          </>,
          <>
            Fine-tuned large language models to autonomously generate and rank GitHub issue patches by test-case pass rate
            and relevance.
          </>
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      // {
      //   company: "Creativ3",
      //   timeframe: "2018 - 2022",
      //   role: "Lead Designer",
      //   achievements: [
      //     <>
      //       Developed a design system that unified the brand across multiple platforms, improving
      //       design consistency by 40%.
      //     </>,
      //     <>
      //       Led a cross-functional team to launch a new product line, contributing to a 15% increase
      //       in overall company revenue.
      //     </>,
      //   ],
      //   images: [],
      // },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: " Indraprastha Institute of Information Technology, Delhi ",
        description: <>Studying Computer Science and engineering.</>,
      },
      {
        name: "DLDAV Model School",
        description: <>Completed my 12th boards.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        "title": "Programming Languages",
        "description": "Proficient in Python, Java, C, C++, CUDA, and MATLAB.",
        "images": [
          // Optional: Add relevant images here
        ]
      },
      {
        "title": "Machine Learning Frameworks",
        "description": "Experienced with TensorFlow, PyTorch, Scikit-Learn, XGBoost, Hugging Face, Keras, and NLTK.",
        "images": [
          // Optional: Add relevant images here
        ]
      },
      {
        "title": "Development Tools",
        "description": "Skilled in using Git, VS Code, Jupyter Notebook, PyCharm, Docker, Taipy, and Google Cloud Platform (GCP).",
        "images": [
          // Optional: Add relevant images here
        ]
      },
      {
        "title": "Areas of Expertise", // Manually add a more specific description here
        "description": "Strong foundation in Data Structures and Algorithms, Advanced Programming, Computer Organization, and Machine Learning. Experience in LLM-driven development, computer vision, and natural language processing.",
        "images": [
          // Optional: Add relevant images here
        ]
      }
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
