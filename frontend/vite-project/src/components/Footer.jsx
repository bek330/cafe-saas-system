import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-charcoal">
            Safeland Café
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Fresh coffee, delicious meals, and a cozy atmosphere crafted for
            every moment.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
            See Also
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <Link
              to="/"
              className="transition hover:text-cyan-600"
            >
              Home
            </Link>

            <Link
              to="/menu"
              className="transition hover:text-cyan-600"
            >
              Menu
            </Link>

            <Link
              to="/cart"
              className="transition hover:text-cyan-600"
            >
              Cart
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
            Contact
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <p>Awasa, Ethiopia</p>
            <p>+251 900 000 000</p>
            <p>hello@safelandcafe.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Safeland Café. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;