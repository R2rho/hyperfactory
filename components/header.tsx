import Link from "next/link"
import { Logo } from "./logo"
import { MobileMenu } from "./mobile-menu"

export const Header = () => {
  return (    
    <div className="fixed z-50 py-4 md:py-7 top-0 left-0 w-full backdrop-blur-sm bg-background/10">
      <header className="flex items-center justify-between container px-6 md:px-8 mx-auto max-w-7xl">
        <Link href="/" className="flex-shrink-0">
          <Logo className="w-[140px] md:w-[160px]" />
        </Link>
        {/* <nav className="flex max-lg:hidden items-center justify-center gap-x-8 xl:gap-x-10">
          {["Platform", "Features", "Contact"].map((item) => (
            <Link
              className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out text-sm"
              href={`#${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav> */}
        <Link
          className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80 text-sm flex-shrink-0"
          href="/#waitlist"
        >
          Join Waitlist
        </Link>
        <MobileMenu />
      </header>
    </div>

  )
}
