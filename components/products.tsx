"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  Leaf,
  Bug,
  Droplets,
  Sprout,
  Shield,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

const folderRevealTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

const categories = [
  { id: "all", label: "All", icon: Package },
  { id: "herbicides", label: "Herbicides", icon: Leaf },
  { id: "pesticides", label: "Pesticides", icon: Bug },
  { id: "fungicides", label: "Fungicides", icon: Droplets },
  { id: "fertilizers", label: "Fertilizers", icon: Sprout },
  { id: "vector", label: "Vector Control", icon: Shield },
];

const products = [
  {
    id: 1,
    name: "Kaba Plus",
    category: "herbicides",
    description:
      "Selective broad-spectrum herbicide formulated for dependable weed control in rice production.",
    badge: "Rice Herbicide",
    imageSrc: "/site-media/products/kabaplus.jpg",
    imageAlt: "Kaba Plus herbicide product bottle",
  },
  {
    id: 2,
    name: "Kabatex 400 EC",
    category: "pesticides",
    description:
      "Systemic insecticide for controlling a wide range of pests on fruits, vegetables, citrus, and ornamental crops.",
    badge: "Systemic Insecticide",
    imageSrc: "/site-media/products/kabatex-400-ec.jpg",
    imageAlt: "Kabatex 400 EC product bottle",
  },
  {
    id: 3,
    name: "Kabazeb",
    category: "fungicides",
    description:
      "Mancozeb-based agricultural fungicide used to protect fruits, vegetables, and field crops against common fungal diseases.",
    badge: "Fungicide",
    imageSrc: "/site-media/products/kabazeb.jpg",
    imageAlt: "Kabazeb fungicide packs",
  },
  {
    id: 4,
    name: "Bapyrifos",
    category: "vector",
    description:
      "Long-lasting contact insecticide for crop pests, household insects, and public health protection.",
    badge: "Public Health & Farm Use",
    imageSrc: "/site-media/products/bapyrifos.jpg",
    imageAlt: "Bapyrifos insecticide bottles",
  },
  {
    id: 5,
    name: "Wuxal",
    category: "fertilizers",
    description:
      "Foliar fertilizer with balanced nutrients and micronutrients for vigorous plant growth and recovery.",
    badge: "Foliar Nutrition",
    imageSrc: "/site-media/products/wuxal.jpg",
    imageAlt: "Wuxal foliar fertilizer bottle",
  },
  {
    id: 6,
    name: "Confiba Super",
    category: "pesticides",
    description:
      "Imidacloprid-based systemic insecticide that works through contact and stomach action for reliable pest control.",
    badge: "Systemic Protection",
    imageSrc: "/site-media/products/confiba.jpg",
    imageAlt: "Confiba Super insecticide bottle and pack",
  },
];

const mediaHubItems = [
  {
    title: "Field Activity",
    tag: "On-site support",
    src: "/site-media/hero/hero-pexels-4975354.jpeg",
    alt: "Field activity preview",
    baseClassName:
      "z-30 -rotate-[3deg] translate-x-0 translate-y-8 md:-rotate-[5deg] md:translate-y-10 group-hover:-translate-x-2 group-hover:translate-y-1 group-hover:-rotate-[5deg] md:group-hover:-translate-x-10 md:group-hover:translate-y-0 md:group-hover:-rotate-[10deg]",
  },
  {
    title: "Product Shelf",
    tag: "Ready inventory",
    src: "/site-media/products/kabaplus.jpg",
    alt: "Product inventory preview",
    baseClassName:
      "z-20 rotate-[1deg] translate-x-1 translate-y-3 md:translate-x-4 md:translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-4 group-hover:rotate-[2deg] md:group-hover:translate-x-2 md:group-hover:-translate-y-10",
  },
  {
    title: "Crop Care",
    tag: "Trusted inputs",
    src: "/site-media/products/wuxal.jpg",
    alt: "Crop care product preview",
    baseClassName:
      "z-10 rotate-[3deg] translate-x-2 translate-y-0 md:rotate-[7deg] md:translate-x-8 group-hover:translate-x-3 group-hover:translate-y-6 group-hover:rotate-[5deg] md:group-hover:translate-x-14 md:group-hover:translate-y-12 md:group-hover:rotate-[11deg]",
  },
] as const;

interface ProductsProps {
  collapsible?: boolean;
}

export function Products({ collapsible = false }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(!collapsible);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section
      id="products"
      data-aos="fade-up"
      className="bg-white py-20 lg:py-32"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          layout
          className={cn(collapsible ? "mx-auto max-w-6xl overflow-hidden" : "")}
        >
          {collapsible ? (
            <div className="relative p-5 sm:p-7" data-aos="fade-up">
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl pt-3">
                  <span className="inline-block text-gold font-semibold tracking-wider uppercase text-sm">
                    Our Products
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-bold text-forest-green sm:text-3xl">
                    Quality Products for Every Need
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded((current) => !current)}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-forest-green px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-forest-green-dark hover:shadow-[0_16px_36px_rgba(13,31,20,0.16)]"
                  aria-expanded={isExpanded}
                  aria-controls="home-product-folder"
                >
                  <span>{isExpanded ? "Hide Products" : "Open Products"}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-500",
                      isExpanded ? "rotate-180" : "rotate-0",
                    )}
                  />
                </button>
              </div>
            </div>
          ) : null}

          {!collapsible ? (
            <div className="mb-14">
              <div className="mb-10 flex justify-center lg:mb-12">
                <div className="group w-full max-w-[28rem] rounded-[2rem] border border-forest-green/10 bg-[linear-gradient(180deg,#f7f3e7_0%,#ffffff_100%)] p-4 shadow-[0_28px_60px_rgba(13,31,20,0.12)] sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold/90">
                        Media Hub
                      </p>
                      <p className="mt-2 text-sm leading-6 text-forest-green/65">
                        A quick look at the people, products, and field moments behind the brand.
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-forest-green/10 bg-forest-green">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#00ff88] shadow-[0_0_18px_rgba(0,255,136,0.7)]" />
                    </div>
                  </div>

                  <div className="relative mt-6 h-[20rem] overflow-hidden sm:h-[22rem]">
                    {mediaHubItems.map((item) => (
                      <article
                        key={item.title}
                        className={`absolute inset-x-0 top-0 overflow-hidden rounded-[1.6rem] border border-forest-green/8 bg-[#0b1a11] shadow-[0_20px_40px_rgba(0,0,0,0.16)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-40 hover:-translate-y-2 hover:scale-[1.01] ${item.baseClassName}`}
                      >
                        <div className="relative h-44">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 100vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,6,0.05)_0%,rgba(4,10,6,0.2)_44%,rgba(4,10,6,0.82)_100%)]" />
                        </div>
                        <div className="p-4">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#00ff88]/82">
                            {item.tag}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-cream">
                            {item.title}
                          </h3>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-2xl">
                <span className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                  Our Products
                </span>
                <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-forest-green sm:text-4xl">
                  Practical inputs, field-ready support, and a product mix built for modern agriculture.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-forest-green/70">
                  Explore trusted solutions across crop protection, plant nutrition, and public health, backed by a company
                  that pairs dependable supply with hands-on guidance.
                </p>
              </div>
            </div>
          ) : null}

          <AnimatePresence initial={false}>
            {isExpanded ? (
              <motion.div
                key="products-content"
                id="home-product-folder"
                initial={collapsible ? { height: 0, opacity: 0 } : false}
                animate={{ height: "auto", opacity: 1 }}
                exit={collapsible ? { height: 0, opacity: 0 } : undefined}
                transition={folderRevealTransition}
                className="overflow-hidden"
              >
                <motion.div
                  initial={collapsible ? { y: 18, opacity: 0 } : false}
                  animate={{ y: 0, opacity: 1 }}
                  exit={collapsible ? { y: -10, opacity: 0 } : undefined}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={cn(collapsible ? "px-5 pb-6 sm:px-7 sm:pb-7" : "")}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex flex-wrap justify-start gap-3"
                  >
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all duration-300 ${
                          activeCategory === category.id
                            ? "bg-forest-green text-cream shadow-lg"
                            : "bg-white text-forest-green hover:bg-forest-green hover:text-cream"
                        }`}
                      >
                        <category.icon className="h-4 w-4" />
                        {category.label}
                      </button>
                    ))}
                  </motion.div>

                  <motion.div
                    layout
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="cursor-pointer group mx-auto flex h-full w-full max-w-[21.5rem] flex-col overflow-hidden rounded-[24px] border border-forest-green/8 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(13,31,20,0.1)]"
                        >
                          <div className="relative h-56 overflow-hidden bg-[#faf8f1]">
                            <Image
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              fill
                              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                            />
                          </div>

                          <div className="flex flex-1 flex-col p-5">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <span className="inline-flex rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-green">
                                {product.badge}
                              </span>
                              {(() => {
                                const Icon = categories.find(
                                  (category) =>
                                    category.id === product.category,
                                )?.icon;

                                return Icon ? (
                                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-forest-green text-gold">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                ) : null;
                              })()}
                            </div>

                            <h3 className="mb-2 font-serif text-lg font-bold text-forest-green">
                              {product.name}
                            </h3>
                            <p className="mb-4 text-sm leading-6 text-forest-green/68">
                              {product.description}
                            </p>
                            <a
                              href={`https://wa.me/233245407874?text=Hello%20Vida%20Asamoah%20Agrochemicals%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto inline-flex items-center gap-2 font-semibold text-forest-green opacity-0 transition-all duration-300 group-hover:opacity-100 hover:text-gold"
                            >
                              <MessageCircle className="h-4 w-4" />
                              Enquire Now
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 text-center"
                  >
                    
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
