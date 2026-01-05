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
        <nav className="flex space-x-6 border-b border-zinc-800 mb-5 px-5 h-14 items-center">
            <Link href="/" className="text-green-500"><PiBugDroidFill size={24} /></Link>
            <ul className="flex space-x-6">
                {links.map(link => 
                    <Link 
                        key={link.href} 
                        href={link.href} 
                        className={classnames({
                            'text-green-500 font-medium': link.href === currentPath,
                            'text-zinc-400': link.href !== currentPath,
                            'hover:text-green-400 transition-colors': true
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