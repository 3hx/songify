import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-base font-bold mb-4">CONTACT</h3>
            <p>Email: hello@songify.com</p>
            <p>Phone: +44 7497 555 555</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/product/original-song"
                  className="hover:text-gray-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-gray-300">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-bold mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-gray-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-base font-bold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">
                <Twitter />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Facebook />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Instagram />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex gap-4 text-center items-center">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Songify Logo" width={32} height={32} />
            <span className="font-bold text-lg">Songify</span>
          </div>
          <p>© 2024 Songify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
