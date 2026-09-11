export const person = {
  name: "Reetesh Deshmukh",
  role: "Software Engineer",
  company: "Oracle Cloud Infrastructure",
  location: "Bengaluru, India",
  email: "reeteshdeshmukh505@gmail.com",
  phone: "+91 78287 71302",
  phoneHref: "tel:+917828771302",
  github: "https://github.com/REETESHDESHMUKH",
  linkedin: "https://www.linkedin.com/in/reetesh-deshmukh/",
  resume: "/documents/reetesh-deshmukh-resume.pdf",
};

export const experiences = [
  {
    company: "Oracle Cloud Infrastructure", role: "Software Engineer",
    dates: "May 2024 — Present", location: "Bengaluru, India", current: true,
    description: "Developing SmartNIC microservices for Bare Metal Cloud, enabling secure, high-performance OCI virtual networking.",
    impacts: [{ value: "40%", label: "lower recovery time", detail: "with an end-to-end canary" }, { value: "2×", label: "traffic growth supported", detail: "within 24 hours" }, { value: "40+", label: "engineers supported", detail: "with internal operations UIs" }],
    details: [
      "Built an end-to-end canary for a core OCI service, improving outage detection and reducing mean time to recovery by 40%.",
      "Scaled multi-region infrastructure to support 2× traffic growth within 24 hours during a major customer traffic event.",
      "Automated security patching across services, reducing manual effort by 50% and saving 40 hours per month.",
      "Built single-SmartNIC provisioning workflows, reducing operational effort by 20% and saving 60 hours per month.",
      "Redesigned asynchronous API processing with a worker-request design to eliminate timeout issues in large-scale regions.",
      "Designed internal UIs used by 40+ engineers to streamline on-call and operations workflows.",
    ],
    tags: ["Java", "React", "Cloud infrastructure", "Distributed systems"],
  },
  {
    company: "Oracle Cloud Infrastructure", role: "Software Engineer Intern",
    dates: "May — July 2023", location: "Bengaluru, India", current: false,
    description: "Built an approval-driven Service Mapper workflow and UI for tenancy accounts, supporting a rollout across 40+ internal customer teams.",
    impacts: [], details: ["Worked with the Account Admin Tool team on controlled service-mapping request, review, and approval flows.", "Improved auditability of service and SKU mapping changes.", "Increased unit test coverage for critical workflows from 66% to 71% using JUnit."],
    tags: ["Java", "JUnit", "Internal tools"],
  },
  {
    company: "SmartKnower", role: "Cloud Computing Intern",
    dates: "February — April 2022", location: "India", current: false,
    description: "Worked with Azure virtual machines, QnA Maker, optical character recognition, and databases.",
    impacts: [], details: ["Explored Azure management tools, core cloud solutions, and network security.", "Studied Azure cost management and service-level agreements."],
    tags: ["Microsoft Azure", "Cloud computing"],
  },
];

export type ProjectCategory = "All" | "Full stack" | "Web3" | "ML & algorithms";
export const projectCategories: ProjectCategory[] = ["All", "Full stack", "Web3", "ML & algorithms"];

export const projects = [
  {
    id: "bus-prix", title: "BUS PRIX", subtitle: "Bus ticket booking, made simple.", category: "Full stack",
    kind: "bus", tone: "sage", description: "A full-stack bus ticket booking platform with route search, seat selection, user login, booking history, and cancellations, built with React and Django REST APIs.",
    tags: ["Python", "Django", "React", "PostgreSQL", "Redis", "REST APIs"],
    github: "https://github.com/REETESHDESHMUKH/BUS-TICKET-BOOKING-SYSTEM", githubLabel: "Earlier version", demo: null,
    details: [
      "Developed Django REST APIs for bus routes, trip schedules, seat availability, bookings, and cancellations.",
      "Designed PostgreSQL schemas with transaction-safe seat locking to prevent duplicate ticket reservations.",
      "Cached frequent route and schedule searches using Redis to reduce database load and improve response time.",
      "This card features the version described in my résumé. The GitHub link points to the earlier Django/MySQL implementation.",
    ],
  },
  {
    id: "charity", title: "Transparent Charity", subtitle: "Giving with a clearer trail.", category: "Web3",
    kind: "charity", tone: "clay", description: "A blockchain-based charitable-giving application designed for transparent, secure, and accountable donations.",
    tags: ["React", "Solidity", "Thirdweb", "Tailwind CSS"],
    github: "https://github.com/REETESHDESHMUKH/Transparent-and-Genuine-Charity-web3.0-application", demo: null,
    details: ["Provides visibility into charitable giving and the intended recipients of donations.", "Combines a React interface with Solidity contracts and Thirdweb tooling."],
  },
  {
    id: "bloggin", title: "BLOGGin", subtitle: "A home for stories and conversations.", category: "Full stack",
    kind: "blog", tone: "sand", description: "A full-stack publishing app with categorized posts, authenticated editing, comments, and threaded replies.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/REETESHDESHMUKH/BLOG-WEBAPP", demo: null,
    details: ["Authorized users can create, read, update, and delete posts in different categories.", "Readers can comment and reply, with JWT-based authentication for protected operations."],
  },
  {
    id: "farm-assists", title: "Farm Assists", subtitle: "Technology rooted in community.", category: "Web3",
    kind: "farm", tone: "sage", description: "A collaborative blockchain project supporting local farmers through a community-backed Participatory Guarantee System.",
    tags: ["Next.js", "Solidity", "Web3.js", "Hardhat"],
    github: "https://github.com/yashnirmal/major-project", demo: null,
    details: ["Uses blockchain within a Participatory Guarantee System (PGS) architecture.", "Introduces a community support system to attract backing for local farmers and improve transparency."],
  },
  {
    id: "leaf-detection", title: "Leaf Disease Detection", subtitle: "Learning from the little details.", category: "ML & algorithms",
    kind: "leaf", tone: "sage", description: "A CNN-based plant disease classifier exploring data augmentation, transfer learning, and fine-tuning across potato and tomato leaves.",
    tags: ["Python", "TensorFlow", "CNN", "Transfer learning"],
    github: "https://github.com/REETESHDESHMUKH/Leaf-Disease-Detection-with-Transfer-Learning-and-Fine-Tuning", demo: null,
    details: ["Reported experiment accuracy: 98.84% on potato leaves and 94.12% on tomato leaves.", "Used preprocessing and augmentation, then adapted the model through transfer learning and fine-tuning."],
  },
  {
    id: "rb-allocation", title: "Resource Block Allocation", subtitle: "An algorithm for a connected world.", category: "ML & algorithms",
    kind: "network", tone: "sand", description: "An AVL-tree-based algorithm for allocating LTE resource blocks to user equipment according to application demand.",
    tags: ["C", "AVL trees", "LTE networks", "Algorithms"],
    github: "https://github.com/REETESHDESHMUKH/RB-ALLOCATION-ALGORITHM", demo: null,
    details: ["Derives a resource allocation algorithm using balanced AVL trees.", "Distributes LTE resource blocks based on the application requirements of user-equipment pairs."],
  },
  {
    id: "wager-wheels", title: "Wager Wheels", subtitle: "Verifiable randomness, on-chain.", category: "Web3",
    kind: "wheel", tone: "clay", description: "A decentralized gaming project using blockchain and Chainlink VRF to explore verifiable, transparent game outcomes.",
    tags: ["Next.js", "Solidity", "Chainlink", "Alchemy"],
    github: "https://github.com/REETESHDESHMUKH/Chainlink-Hack", demo: "https://wagerwheel.netlify.app/",
    details: ["Uses Chainlink’s Verifiable Random Function for on-chain game outcomes.", "Built with React, Next.js, Web3.js, Solidity, and Alchemy."],
  },
] as const;

export const skills = [
  { title: "Languages", kind: "code", items: ["Java", "Python", "C++", "C", "JavaScript", "TypeScript", "Go", "Terraform", "Solidity"] },
  { title: "Frontend", kind: "layout", items: ["React", "Next.js", "Tailwind CSS", "HTML & CSS", "Bootstrap"] },
  { title: "Backend & tooling", kind: "server", items: ["Spring Boot", "Django", "Node.js", "Express", "Hibernate", "Ruby on Rails", "REST APIs", "GraphQL", "Kafka", "Redis", "Git", "CI/CD", "Prometheus"] },
  { title: "Data & cloud", kind: "database", items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle Cloud", "Azure", "Docker", "Kubernetes"] },
];

export const community = [
  { title: "Web Enthusiasts’ Club, NITK", role: "Executive Member · Algorithms SIG", dates: "November 2022 — April 2024", description: "Helped set problems for programming contests and contributed to club activities.", link: "https://www.linkedin.com/school/web-enthusiasts-club-nitk/" },
  { title: "IET, NITK", role: "Executive Member · Cipher SIG", dates: "August 2022 — April 2024", description: "Mentored a group of students as they developed a project.", link: "https://www.linkedin.com/company/ietnitk/" },
];

export type BlogPost = { title: string; description: string; url: string; date: string; readingMinutes: number };
// Add real published articles here. BLOGGin above is a project, not a published article.
export const blogPosts: BlogPost[] = [];
