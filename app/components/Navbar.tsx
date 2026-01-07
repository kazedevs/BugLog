"use client";

import { Button, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugDroidFill } from "react-icons/pi";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="border-b border-zinc-800 mb-5 px-5 h-14">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center gap-x-5">
          <Link href="/" className="text-green-500">
            <PiBugDroidFill size={24} />
          </Link>
          <ul className="flex space-x-6 list-none p-0 m-0">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classnames({
                    "text-green-500 font-medium": link.href === currentPath,
                    "text-zinc-400": link.href !== currentPath,
                    "hover:text-green-400 transition-colors": true,
                    "text-sm": true,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-x-4">
          {status === "authenticated" && (
            <>
              <Text size="2" color="gray" weight="medium">
                {(session.user as any).username || session.user!.email}
              </Text>
              <Button
                variant="ghost"
                color="gray"
                size="2"
                onClick={() => signOut()}
                className="cursor-pointer hover:text-red-400"
                style={{ padding: 0 }}
              >
                Log out
              </Button>
            </>
          )}
          {status === "unauthenticated" && (
            <Link
              href="/auth/login"
              className="text-zinc-400 hover:text-green-400 transition-colors text-sm font-medium cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;