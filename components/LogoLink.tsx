"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const LogoLink = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    localStorage.removeItem("accessKey");
    router.push("/");
  };

  return (
    <Image
      src="/assets/icons/logo-full.svg"
      height={32}
      width={162}
      alt="logo"
      onClick={handleLogoClick}
      className="cursor-pointer h-8 w-fit"
      style={{ width: "auto", height: "auto" }}
    />
  );
};

export default LogoLink;