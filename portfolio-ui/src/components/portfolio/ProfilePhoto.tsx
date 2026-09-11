import Image from "next/image";

export default function ProfilePhoto({ decorative = false }: { decorative?: boolean }) {
  return <span className="profile-photo">
    <Image
      src="/images/reetesh-deshmukh-enhanced.png"
      alt={decorative ? "" : "Reetesh Deshmukh"}
      width={1086}
      height={1448}
      sizes="240px"
      priority
      className="profile-photo-image"
    />
  </span>;
}
