export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/why-us", label: "Why Us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const

export const heroMedia = {
  // Paste a direct MP4/WebM link here, or use a local file like /site-media/hero/hero-video.mp4.
  videoSrc: "https://www.pexels.com/download/video/10816528/",
  posterSrc: "",
  imageSrc: "",
  alt: "Agricultural equipment and support vehicles moving through a working farm site",
  label: "Crop Protection Expertise",
  caption:
    "Modern crop protection, field guidance, and dependable input supply for growers who want stronger results season after season.",
}

export const servicesGallery = [
  // Add image objects here after uploading files into /public/uploads/services.
  // Example:
  // {
  //   src: "/uploads/services/field-visit.jpg",
  //   alt: "Field advisory visit with farmers",
  //   title: "Field Visits",
  //   description: "Use this slot for your best farm or community photo.",
  // },
] as Array<{
  src: string
  alt: string
  title: string
  description: string
}>
