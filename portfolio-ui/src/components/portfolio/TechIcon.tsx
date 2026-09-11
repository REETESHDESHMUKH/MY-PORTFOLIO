import Image from "next/image";
import { Braces, BrainCircuit, Cloud, GitBranch, Network, Server, ShieldCheck, Waypoints } from "lucide-react";

const assets: Record<string, string> = {
  Java: "java", Python: "python", "C++": "cplusplus", C: "c",
  JavaScript: "javascript", TypeScript: "typescript", Go: "go", Terraform: "terraform",
  Solidity: "solidity", React: "react", "Next.js": "nextjs", "Tailwind CSS": "tailwindcss",
  "HTML & CSS": "html5", Bootstrap: "bootstrap", "Spring Boot": "spring", Django: "django",
  "Node.js": "nodejs", Express: "express", Hibernate: "hibernate", "Ruby on Rails": "rails",
  GraphQL: "graphql", Kafka: "apachekafka", Redis: "redis", Git: "git", Prometheus: "prometheus",
  PostgreSQL: "postgresql", MySQL: "mysql", MongoDB: "mongodb", Azure: "azure",
  "Microsoft Azure": "azure", Docker: "docker", Kubernetes: "kubernetes",
  TensorFlow: "tensorflow", Hardhat: "hardhat", JUnit: "junit",
};

export function OracleMark({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className="oracle-mark"><rect x="2.5" y="7.5" width="27" height="17" rx="8.5" stroke="currentColor" strokeWidth="3.4" /></svg>;
}

export default function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const asset = assets[name];
  if (asset) return <Image className="tech-icon" src={`/icons/tech/${asset}.svg`} alt="" width={size} height={size} unoptimized />;
  if (name === "Oracle Cloud") return <OracleMark size={size} />;
  const Icon = /cloud/i.test(name) ? Cloud
    : /system|network|LTE/.test(name) ? Network
    : /CNN|learning/.test(name) ? BrainCircuit
    : /tree|algorithm|CI\/CD/i.test(name) ? GitBranch
    : /JWT/.test(name) ? ShieldCheck
    : /API|tool/.test(name) ? Server
    : /Web3|Chainlink|Alchemy|Thirdweb/.test(name) ? Waypoints : Braces;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
