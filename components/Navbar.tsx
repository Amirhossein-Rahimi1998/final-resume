"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/ResizableNavbar";
import { useState } from "react";

import { navItems } from "@/data";

export function NavbarDemo() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [show, setShow] = useState(true)

    window.addEventListener("scroll", () => {
        window.scrollY < 100 ? (setShow(true)) : (setShow(false));
    })

    return (
        <div className="relative w-full z-100">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    {show ? <NavbarLogo /> : null}
                    <NavItems items={navItems} />
                    {show ? (

                        <div className="flex items-center gap-4">
                            <NavbarButton variant="secondary">Login</NavbarButton>
                            <NavbarButton variant="primary">Book a call</NavbarButton>
                        </div>
                    ) : null}
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Login
                            </NavbarButton>
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Book a call
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {/* Navbar */}
        </div>
    );
}

