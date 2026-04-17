"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import {
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconShoppingBag,
  IconX,
} from "@tabler/icons-react";
import { site } from "@/lib/site-config";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
  <header className="flex justify-center  py-5">
  <h2 className="font-bold text-2xl tracking-tight">Mag.Shoppy</h2>
  </header>

    </>
  );
};

export default Header;