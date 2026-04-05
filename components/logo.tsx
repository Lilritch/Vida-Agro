import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
  variant?: "dark" | "light"
}

export function Logo({ className, size = "md", showText = true, variant = "dark" }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-xl" },
    lg: { icon: 56, text: "text-2xl" },
  }

  const { icon, text } = sizes[size]
  
  const textColor = variant === "dark" ? "text-forest-green" : "text-cream"
  const mutedColor = variant === "dark" ? "rgba(26, 61, 46, 0.7)" : "rgba(245, 240, 225, 0.7)"

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Shield Logo with Wheat Stalk and Ghana Star */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Shield */}
        <path
          d="M32 4L8 14V30C8 45.464 18.536 58.536 32 62C45.464 58.536 56 45.464 56 30V14L32 4Z"
          fill="#1a3d2e"
          stroke="#c9a227"
          strokeWidth="2"
        />
        
        {/* Wheat Stalk */}
        <path
          d="M32 48V24"
          stroke="#c9a227"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32 26C28 22 28 18 32 16C36 18 36 22 32 26Z"
          fill="#c9a227"
        />
        <path
          d="M32 32C28 28 28 24 32 22C36 24 36 28 32 32Z"
          fill="#c9a227"
        />
        <path
          d="M32 38C28 34 28 30 32 28C36 30 36 34 32 38Z"
          fill="#c9a227"
        />
        
        {/* Small wheat leaves on sides */}
        <path
          d="M28 30C24 28 22 24 24 22C26 22 30 24 28 30Z"
          fill="#c9a227"
          opacity="0.8"
        />
        <path
          d="M36 30C40 28 42 24 40 22C38 22 34 24 36 30Z"
          fill="#c9a227"
          opacity="0.8"
        />
        
        {/* Ghana Star */}
        <path
          d="M32 10L33.5 13.5L37 14L34.5 16.5L35 20L32 18.5L29 20L29.5 16.5L27 14L30.5 13.5L32 10Z"
          fill="#c9a227"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-serif font-bold", text, textColor)}>
            Vida Asamoah
          </span>
          <span 
            className="text-xs font-medium tracking-wider uppercase"
            style={{ color: mutedColor }}
          >
            Agrochemicals
          </span>
        </div>
      )}
    </div>
  )
}
