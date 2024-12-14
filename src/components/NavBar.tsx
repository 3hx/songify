import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { CTA } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="py-4 px-4 flex justify-between items-center">
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Bill Logo" width={32} height={32} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList className="gap-8 text-lg">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                Learn
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                Artists
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/contact"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                Examples
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="h-6 w-[1px] bg-gray-300" />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/login"
                className="hover:text-orange-600 transition-colors"
              >
                Login
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="h-6 w-[1px] bg-gray-300" />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/cart"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                <div className="relative">
                  <div className="bg-white transition-colors shadow-sm p-3 rounded-full">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  {0 > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                      0
                    </div>
                  )}
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="h-6 w-[1px] bg-gray-300" />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {0 === 0 && <CTA />}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/cart"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                <div className="relative">
                  <div className="bg-white transition-colors shadow-sm p-3 rounded-full">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  {0 > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                      0
                    </div>
                  )}
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                Artists
              </Link>
              <Link
                href="/about"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="font-bold hover:text-orange-600 transition-colors"
              >
                Examples
              </Link>
              <Link
                href="/login"
                className="hover:text-orange-600 transition-colors"
              >
                Login
              </Link>
              {0 === 0 && <CTA />}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
