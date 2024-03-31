'use client'

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Nav = ({children}) => {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center px-4">{children}</nav>
  )
}

export default Nav

export function NavLink(props){
    const pathname = usePathname()
    return <Link {...props} className={cn('p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground', pathname === props.href && 'bg-background text-foreground')} />
}