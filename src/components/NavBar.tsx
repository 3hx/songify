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
import { Logo3 } from "./Logo3";

const NavBar = () => {
  return (
    <nav className="py-4 px-4 flex justify-between items-center">
      <Logo3 />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList className="gap-8 text-lg">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/product/original-song"
                className="font-bold hover:text-accent transition-colors"
              >
                Learn
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#pricing"
                className="font-bold hover:text-accent transition-colors"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/examples"
                className="font-bold hover:text-accent transition-colors"
              >
                Examples
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="h-6 w-[1px] bg-gray-300" />
            </NavigationMenuItem>
            <NavigationMenuItem>
              {/* TODO: Add login */}
              <NavigationMenuLink
                href="/product/original-song"
                className="hover:text-accent transition-colors"
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
                className="font-bold hover:text-accent transition-colors"
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
                className="font-bold hover:text-accent transition-colors"
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
                className="font-bold hover:text-accent transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/#pricing"
                className="font-bold hover:text-accent transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/examples"
                className="font-bold hover:text-accent transition-colors"
              >
                Examples
              </Link>
              {/* TODO: Add login */}
              <Link
                href="/product/original-song"
                className="hover:text-accent transition-colors"
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
