import Image from "next/image";

import logo from "@/assets/images/logo.png";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/** Whoopsie's own round logo, from their Instagram profile picture. */
export function Logo({ className = "", priority = false }: LogoProps) {
  return <Image src={logo} alt="Whoopsie's" className={`h-auto ${className}`} sizes="12rem" priority={priority} />;
}
