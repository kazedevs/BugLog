"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { PiBugDroidFill } from "react-icons/pi";
import classnames from "classnames";

const Navbar = () => {

    const currentPath = usePathname();

    const links = [
        {
            label: 'Dashboard', href: '/'
        },
        {
            label: 'Issues', href: '/issues'
        }
    ]
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><PiBugDroidFill size={24} /></Link>
            <ul className="flex space-x-6">
                {links.map(link => 
                    <Link 
                        key={link.href} 
                        href={link.href} 
                        className={classnames({
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-600': link.href !== currentPath,
                            'hover:text-zinc-900 transition-colors': true
                        })}
                    >
                        {link.label}
                    </Link>
                )}
            </ul>
        </nav>
    )
}

export default Navbar