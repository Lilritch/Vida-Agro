"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bug,
  ChevronDown,
  Droplets,
  Leaf,
  RotateCcw,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Crop = "Maize" | "Cocoa" | "Rice" | "Tomatoes" | "Cassava" | "Vegetables";
type Problem = "Weeds" | "Insects/Pests" | "Disease/Fungus" | "Poor Growth";

type Recommendation = {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge: string;
  note: string;
};

const crops: Crop[] = [
  "Maize",
  "Cocoa",
  "Rice",
  "Tomatoes",
  "Cassava",
  "Vegetables",
];

const problems: Array<{
  id: Problem;
  title: string;
  description: string;
  icon: typeof Leaf;
}> = [
  {
    id: "Weeds",
    title: "Weeds",
    description: "Competition is choking out early crop growth.",
    icon: Leaf,
  },
  {
    id: "Insects/Pests",
    title: "Insects / Pests",
    description: "Leaves, stems, or fruits show feeding pressure.",
    icon: Bug,
  },
  {
    id: "Disease/Fungus",
    title: "Disease / Fungus",
    description: "Leaf spots, blight, rot, or fungal stress is visible.",
    icon: Droplets,
  },
  {
    id: "Poor Growth",
    title: "Poor Growth",
    description: "Plants look pale, stunted, or slow to recover.",
    icon: Sprout,
  },
];

const recommendations: Record<Crop, Record<Problem, Recommendation>> = {
  Maize: {
    Weeds: {
      name: "Amine 720",
      description:
        "A dependable herbicide option for broadleaf weed pressure in maize blocks where early suppression matters most.",
      imageSrc: "/site-media/products/amine-720.svg",
      imageAlt: "Amine 720 herbicide packaging",
      badge: "Maize weed control",
      note: "Best used when weed pressure is identified early and spray timing can still protect stand vigor.",
    },
    "Insects/Pests": {
      name: "Kabatex 400 EC",
      description:
        "Systemic insect control support for chewing and sucking pests that can quickly slow maize establishment.",
      imageSrc: "/site-media/products/kabatex-400-ec.jpg",
      imageAlt: "Kabatex 400 EC product bottle",
      badge: "Pest pressure response",
      note: "A good first recommendation when scouting shows active feeding and the field still has strong recovery potential.",
    },
    "Disease/Fungus": {
      name: "Kabazeb",
      description:
        "A protective fungicide choice for leaf blights and other moisture-driven disease pressure in maize fields.",
      imageSrc: "/site-media/products/kabazeb.jpg",
      imageAlt: "Kabazeb fungicide packs",
      badge: "Disease cover",
      note: "Pairs well with quick field review so timing, interval, and crop stage are confirmed before spraying.",
    },
    "Poor Growth": {
      name: "Wuxal",
      description:
        "Foliar nutrition support that helps maize recover faster when plants appear pale, stressed, or uneven.",
      imageSrc: "/site-media/products/wuxal.jpg",
      imageAlt: "Wuxal foliar fertilizer bottle",
      badge: "Growth booster",
      note: "Useful when the issue looks nutritional or stress-related and you want a faster visual green-up.",
    },
  },
  Cocoa: {
    Weeds: {
      name: "Roundup Herbicide",
      description:
        "An effective clean-up option for spot or strip weed management around cocoa rows before competition gets out of hand.",
      imageSrc: "/site-media/products/roundup-herbicide.svg",
      imageAlt: "Roundup herbicide product packaging",
      badge: "Cocoa floor management",
      note: "Ideal for careful directed application where you want to reduce weed pressure without disrupting the cocoa stand.",
    },
    "Insects/Pests": {
      name: "Confiba Super",
      description:
        "A systemic insecticide recommendation when cocoa blocks show sap-sucking or canopy pest activity.",
      imageSrc: "/site-media/products/confiba.jpg",
      imageAlt: "Confiba Super insecticide bottle and pack",
      badge: "Systemic protection",
      note: "A strong first look when the crop still has good leaf area and pest activity is actively spreading.",
    },
    "Disease/Fungus": {
      name: "Kabazeb",
      description:
        "Protective disease support for black pod pressure and fungal stress in humid cocoa conditions.",
      imageSrc: "/site-media/products/kabazeb.jpg",
      imageAlt: "Kabazeb fungicide packs",
      badge: "Cocoa disease support",
      note: "Useful when wet weather increases fungal pressure and you need fast, practical intervention advice.",
    },
    "Poor Growth": {
      name: "NPK Fertilizer",
      description:
        "Balanced nutrition support for stressed cocoa stands that need a stronger feeding program.",
      imageSrc: "/site-media/products/npk-fertilizer.svg",
      imageAlt: "NPK fertilizer packaging",
      badge: "Nutrition plan",
      note: "Best when poor vigor appears nutrition-related and the block needs a steadier recovery program.",
    },
  },
  Rice: {
    Weeds: {
      name: "Kaba Plus",
      description:
        "A selective weed-control recommendation built for dependable suppression in rice production.",
      imageSrc: "/site-media/products/kabaplus.jpg",
      imageAlt: "Kaba Plus herbicide product bottle",
      badge: "Rice herbicide",
      note: "A natural first choice for rice plots where weed competition is already cutting into uniform growth.",
    },
    "Insects/Pests": {
      name: "Kabatex 400 EC",
      description:
        "Systemic insect support for rice fields dealing with active pest feeding and crop stress.",
      imageSrc: "/site-media/products/kabatex-400-ec.jpg",
      imageAlt: "Kabatex 400 EC product bottle",
      badge: "Rice pest support",
      note: "Useful when a quick intervention can still protect tillering and stand uniformity.",
    },
    "Disease/Fungus": {
      name: "Kabazeb",
      description:
        "A broad protective fungicide option when rice disease pressure starts building after wet conditions.",
      imageSrc: "/site-media/products/kabazeb.jpg",
      imageAlt: "Kabazeb fungicide packs",
      badge: "Rice disease cover",
      note: "Helps when the disease signs are early and the goal is to keep spread from accelerating.",
    },
    "Poor Growth": {
      name: "Wuxal",
      description:
        "Foliar nutrition support for rice that looks weak, pale, or slow to recover after stress.",
      imageSrc: "/site-media/products/wuxal.jpg",
      imageAlt: "Wuxal foliar fertilizer bottle",
      badge: "Rice recovery support",
      note: "A good fit when recovery speed matters and the crop needs a nutrient lift.",
    },
  },
  Tomatoes: {
    Weeds: {
      name: "Roundup Herbicide",
      description:
        "Useful for pre-plant or carefully managed row-side weed control before competition takes over tomato beds.",
      imageSrc: "/site-media/products/roundup-herbicide.svg",
      imageAlt: "Roundup herbicide product packaging",
      badge: "Bed preparation",
      note: "Most helpful when the weed issue is around the crop zone and directed application can be managed safely.",
    },
    "Insects/Pests": {
      name: "Karate Insecticide",
      description:
        "A fast-response insecticide recommendation for visible pest feeding on tomato leaves, stems, or fruit.",
      imageSrc: "/site-media/products/karate-insecticide.svg",
      imageAlt: "Karate insecticide packaging",
      badge: "Fast pest knockdown",
      note: "Best when you are seeing active pest movement and want a quick first product direction.",
    },
    "Disease/Fungus": {
      name: "Kabazeb",
      description:
        "A practical fungicide option for blight-prone tomato conditions when leaves begin spotting or collapsing.",
      imageSrc: "/site-media/products/kabazeb.jpg",
      imageAlt: "Kabazeb fungicide packs",
      badge: "Tomato disease support",
      note: "A strong first recommendation when disease pressure is spreading quickly through foliage.",
    },
    "Poor Growth": {
      name: "Wuxal",
      description:
        "Foliar feeding support for tomato plants that need better vigor, color, and recovery after stress.",
      imageSrc: "/site-media/products/wuxal.jpg",
      imageAlt: "Wuxal foliar fertilizer bottle",
      badge: "Vegetative boost",
      note: "Helpful when plants still have recovery potential and the issue looks linked to stress or low nutrition.",
    },
  },
  Cassava: {
    Weeds: {
      name: "Amine 720",
      description:
        "A weed-management option for cassava fields where broadleaf pressure is stealing space and moisture from the crop.",
      imageSrc: "/site-media/products/amine-720.svg",
      imageAlt: "Amine 720 herbicide packaging",
      badge: "Cassava weed control",
      note: "Useful when early weed suppression can still protect canopy development and row cleanliness.",
    },
    "Insects/Pests": {
      name: "Confiba Super",
      description:
        "Systemic pest support for cassava blocks showing sap-sucking or foliage-damaging insect activity.",
      imageSrc: "/site-media/products/confiba.jpg",
      imageAlt: "Confiba Super insecticide bottle and pack",
      badge: "Cassava pest response",
      note: "A good fit when scouting suggests an insect issue is building and the crop still has strong recovery potential.",
    },
    "Disease/Fungus": {
      name: "Kabazeb",
      description:
        "A protective fungicide recommendation when cassava disease symptoms are emerging across the canopy.",
      imageSrc: "/site-media/products/kabazeb.jpg",
      imageAlt: "Kabazeb fungicide packs",
      badge: "Cassava disease support",
      note: "Works best alongside field confirmation so timing and disease pressure can be matched properly.",
    },
    "Poor Growth": {
      name: "NPK Fertilizer",
      description:
        "A balanced nutrition recommendation for cassava fields with poor canopy development or slow root-building progress.",
      imageSrc: "/site-media/products/npk-fertilizer.svg",
      imageAlt: "NPK fertilizer packaging",
      badge: "Cassava feeding plan",
      note: "A strong option when overall plant vigor suggests the main issue is nutrient support rather than disease or pests.",
    },
  },
  Vegetables: {
    Weeds: {
      name: "Roundup Herbicide",
      description:
        "A row-edge and pre-plant weed-management option that helps vegetable plots start cleaner and more evenly.",
      imageSrc: "/site-media/products/roundup-herbicide.svg",
      imageAlt: "Roundup herbicide product packaging",
      badge: "Vegetable bed cleanup",
      note: "Best suited to controlled use around the production area before weed pressure gets ahead of labor.",
    },
    "Insects/Pests": {
      name: "Karate Insecticide",
      description:
        "A quick-response insecticide recommendation when vegetables show obvious chewing or sucking pest damage.",
      imageSrc: "/site-media/products/karate-insecticide.svg",
      imageAlt: "Karate insecticide packaging",
      badge: "Vegetable pest response",
      note: "Useful when pest activity is visible and the goal is to protect marketable quality fast.",
    },
    "Disease/Fungus": {
      name: "Kabazeb",
      description:
        "Protective fungicide support for high-humidity vegetable production when leaf diseases begin to spread.",
      imageSrc: "/site-media/products/kabazeb.jpg",
      imageAlt: "Kabazeb fungicide packs",
      badge: "Vegetable disease support",
      note: "A practical first recommendation when you need disease cover before foliage quality declines further.",
    },
    "Poor Growth": {
      name: "Wuxal",
      description:
        "Foliar nutrition support to help vegetable crops regain color, pace, and consistency after stress.",
      imageSrc: "/site-media/products/wuxal.jpg",
      imageAlt: "Wuxal foliar fertilizer bottle",
      badge: "Vegetable recovery support",
      note: "A strong first look when plants are slow, pale, or uneven and could benefit from faster nutrient uptake.",
    },
  },
};

const panelTransition = {
  duration: 0.35,
  ease: "easeOut",
} as const;

export function CropDiagnosticTool() {
  const [selectedCrop, setSelectedCrop] = useState<Crop | "">("");
  const [selectedProblem, setSelectedProblem] = useState<Problem | "">("");

  const currentStep = selectedProblem ? 3 : selectedCrop ? 2 : 1;
  const recommendation =
    selectedCrop && selectedProblem
      ? recommendations[selectedCrop][selectedProblem]
      : null;

  const resetTool = () => {
    setSelectedCrop("");
    setSelectedProblem("");
  };

  return (
    <div className="rounded-[32px] border border-forest-green/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-forest-green/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-forest-green">
            Crop Diagnostic Tool
          </span>
          <h3 className="mt-5 font-serif text-3xl font-bold text-forest-green sm:text-4xl">
            Narrow the issue, then match the field to a product
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-forest-green/72">
            Choose the crop, flag the problem, and we will point you to a practical
            first recommendation from the Vida Asamoah product range.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors duration-300",
                currentStep >= step
                  ? "bg-forest-green text-cream"
                  : "bg-cream text-forest-green/55",
              )}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[28px] bg-cream p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <motion.div
              key="diagnostic-step-1"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={panelTransition}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-forest-green/55">
                Step 1
              </div>
              <h4 className="mt-3 text-2xl font-bold text-forest-green">
                Which crop needs attention?
              </h4>
              <p className="mt-2 max-w-xl text-sm leading-7 text-forest-green/68">
                Start with the crop so the recommendation can better match how the
                problem usually shows up in the field.
              </p>

              <div className="relative mt-8 max-w-xl">
                <label htmlFor="crop-select" className="sr-only">
                  Select a crop
                </label>
                <select
                  id="crop-select"
                  value={selectedCrop}
                  onChange={(event) => {
                    setSelectedCrop(event.target.value as Crop | "");
                    setSelectedProblem("");
                  }}
                  className="w-full appearance-none rounded-[22px] border border-forest-green/10 bg-white px-5 py-4 pr-14 text-base font-medium text-forest-green outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/25"
                >
                  <option value="">Choose a crop</option>
                  {crops.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-forest-green/50" />
              </div>
            </motion.div>
          ) : null}

          {currentStep === 2 ? (
            <motion.div
              key="diagnostic-step-2"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={panelTransition}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-forest-green/55">
                    Step 2
                  </div>
                  <h4 className="mt-3 text-2xl font-bold text-forest-green">
                    What issue are you seeing on {selectedCrop}?
                  </h4>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-forest-green/68">
                    Pick the closest field problem to reveal the most relevant product
                    card.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCrop("");
                    setSelectedProblem("");
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest-green transition-colors hover:text-gold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change crop
                </button>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {problems.map((problem) => (
                  <button
                    key={problem.id}
                    type="button"
                    onClick={() => setSelectedProblem(problem.id)}
                    className="group rounded-[24px] border border-forest-green/10 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-forest-green/20 hover:shadow-[0_18px_36px_rgba(13,31,20,0.08)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-forest-green text-gold transition-colors duration-300 group-hover:bg-forest-green-light">
                        <problem.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-forest-green">
                          {problem.title}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-forest-green/65">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}

          {currentStep === 3 && recommendation ? (
            <motion.div
              key="diagnostic-step-3"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={panelTransition}
              className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]"
            >
              <div className="relative overflow-hidden rounded-[26px] bg-white shadow-sm">
                <div className="relative aspect-square">
                  <Image
                    src={recommendation.imageSrc}
                    alt={recommendation.imageAlt}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="rounded-[26px] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-forest-green/55">
                      Step 3
                    </div>
                    <h4 className="mt-3 text-2xl font-bold text-forest-green">
                      Recommended product: {recommendation.name}
                    </h4>
                  </div>

                  <span className="inline-flex rounded-full bg-gold/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest-green">
                    {recommendation.badge}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest-green">
                    Crop: {selectedCrop}
                  </span>
                  <span className="rounded-full bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest-green">
                    Problem: {selectedProblem}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-forest-green/72">
                  {recommendation.description}
                </p>

                <div className="mt-5 rounded-[22px] bg-cream px-5 py-4 text-sm leading-7 text-forest-green/72">
                  {recommendation.note}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-green px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:bg-forest-green-dark"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={resetTool}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-green/12 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-forest-green transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <p className="mt-4 text-sm leading-7 text-forest-green/62">
        This diagnostic is a quick first guide. Our team can confirm rates, crop
        stage, tank-mix compatibility, and application timing before you spray.
      </p>
    </div>
  );
}
