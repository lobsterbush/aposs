import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
<Link href="/contact" className="text-[#00376c] hover:text-[#17152b] font-medium transition-colors no-underline hover:underline">
            Contact
          </Link>
<Link href="/privacy" className="text-[#00376c] hover:text-[#17152b] font-medium transition-colors no-underline hover:underline">
            Privacy
          </Link>
<Link href="/terms" className="text-[#00376c] hover:text-[#17152b] font-medium transition-colors no-underline hover:underline">
            Terms
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
<p className="text-center text-sm leading-5 text-[#17152b] font-medium">
            &copy; 2020 Asian Politics Online Seminar Series (APOSS). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
