import Link from "next/link";
import { IconBrandInstagram, IconBrandWhatsapp, IconChevronRight, IconShoppingBag } from "@tabler/icons-react";
import { site } from "@/lib/site-config";

const FollowCard = () => {
  return (
    <div className="w-full max-w-xs mx-auto mb-10 rounded-md  ">
      {/* Header */}
      
        {/* <div className="w-14 h-14 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center mb-3">
          <IconShoppingBag size={22} className="text-white dark:text-neutral-900" />
        </div>
        <p className="text-[15px] font-semibold text-neutral-900 dark:text-white">Mag.shoppy</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">Follow us for updates</p>*/}
 

      <div className="border-t border-neutral-100 dark:border-neutral-800 mb-4" />

      {/* Instagram */}
      <Link
        href={`https://instagram.com/${site.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border  transition-colors mb-2 group"
      >
        <div className="w-9 h-9 rounded-lg bg-pink-50 dark:bg-pink-950 flex items-center justify-center flex-shrink-0">
          <IconBrandInstagram size={18} className="text-pink-600 dark:text-pink-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-neutral-900 dark:text-white">Instagram</p>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">@{site.instagram}</p>
        </div>
        <IconChevronRight size={16} className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
      </Link>

      {/* WhatsApp */}
      <Link
        href={`https://wa.me/${site.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 rounded-xl border bg-white  transition-colors group"
      >
        <div className="w-9 h-9 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
          <IconBrandWhatsapp size={18} className="text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-neutral-900 dark:text-white">WhatsApp</p>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Chat with us</p>
        </div>
        <IconChevronRight size={16} className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
      </Link>
    </div>
  );
};

export default FollowCard;