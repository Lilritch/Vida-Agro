type Partner = {
  id: string;
  name: string;
  shellClassName?: string;
};

const partners: Partner[] = [
  { id: "croplife-ghana", name: "CropLife Ghana" },
  { id: "ghana-cocoa-board", name: "Ghana Cocoa Board" },
  { id: "mofa", name: "Ministry of Food & Agriculture" },
  { id: "ifa", name: "International Fertilizer Association" },
  { id: "knust", name: "KNUST" },
  { id: "sari", name: "Savanna Agricultural Research Institute" },
  { id: "chemico", name: "Chemico", shellClassName: "partnership-logo-shell-dark" },
  { id: "rainbow", name: "Rainbow" },
  { id: "agriaccess", name: "Agriaccess Ghana Limited" },
  { id: "agriimpact", name: "Agriimpact" },
];

function PartnerWordmark({ partner }: { partner: Partner }) {
  switch (partner.id) {
    case "croplife-ghana":
      return (
        <div className="space-y-1 leading-none">
          <div className="flex items-end gap-1 leading-none">
            <span className="text-[2.05rem] font-light tracking-[-0.05em] text-[#29522a]">
              Crop
            </span>
            <span className="text-[2.2rem] font-medium tracking-[-0.05em] text-[#68a63d]">
              Life
            </span>
          </div>
          <div className="pl-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#5f9b37]">
            Ghana
          </div>
        </div>
      );

    case "ghana-cocoa-board":
      return (
        <div className="flex items-center gap-3 leading-none">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#3b2413] bg-[#fff4b8] shadow-[inset_0_0_0_3px_#f9f2d7]">
            <div className="flex flex-col gap-1">
              <span className="h-3 w-2 rotate-[-18deg] rounded-full bg-[#ffdf19]" />
              <span className="h-3 w-2 rotate-[18deg] rounded-full bg-[#ffdf19]" />
            </div>
          </div>
          <div className="leading-none">
            <div className="text-[1.38rem] font-medium tracking-[-0.04em] text-[#7b2f14]">
              Ghana Cocoa Board
            </div>
            <div className="mt-0.5 text-[0.66rem] uppercase tracking-[0.08em] text-[#8a4d2d]">
              Premium quality cocoa
            </div>
          </div>
        </div>
      );

    case "mofa":
      return (
        <div className="flex items-center gap-3 leading-none">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[conic-gradient(#34a853_0_25%,#f7db2b_25_50%,#3db7ff_50_75%,#2a8d52_75_100%)] ring-[3px] ring-white/70">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1a6f3d] text-lg font-serif text-white">
              A
            </span>
          </div>
          <div className="text-[1.1rem] font-semibold tracking-[-0.03em] text-[#111111]">
            Ministry of Food &amp; Agriculture
          </div>
        </div>
      );

    case "ifa":
      return (
        <div className="space-y-1 leading-none">
          <div className="flex items-end gap-2">
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#0b5ea6]">
              <span className="h-8 w-3 rounded-full bg-[#76b72a]" />
            </span>
            <span className="text-[2.45rem] font-semibold tracking-[-0.08em] text-[#1668b4]">
              ifa
            </span>
          </div>
          <div className="text-[0.63rem] font-semibold uppercase tracking-[0.16em] text-[#1f3e61]">
            International Fertilizer Association
          </div>
          <div className="text-[0.62rem] italic text-[#78b83b]">
            Helping to feed the world sustainably
          </div>
        </div>
      );

    case "knust":
      return (
        <div className="flex items-center gap-3 leading-none">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(180deg,#f7d24c_0%,#f0a83b_100%)] text-lg font-black text-[#12315e] shadow-sm">
            K
          </div>
          <div className="leading-none">
            <div className="text-[1.72rem] font-semibold tracking-[-0.05em] text-[#1e1f24]">
              KNUST
            </div>
            <div className="mt-0.5 text-[0.62rem] uppercase tracking-[0.08em] text-[#41444f]">
              Kwame Nkrumah University of Science and Technology
            </div>
          </div>
        </div>
      );

    case "sari":
      return (
        <div className="flex items-center gap-3 leading-none">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#202020] text-[0.56rem] font-bold text-[#20457a]">
              SEND
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#d1925b] text-[0.56rem] font-bold text-[#225c8d]">
              CSIR
            </span>
          </div>
          <div className="leading-none">
            <div className="text-[1.18rem] font-medium tracking-[-0.04em] text-[#151515]">
              Savanna Agricultural
            </div>
            <div className="mt-0.5 text-[1.18rem] font-medium tracking-[-0.04em] text-[#151515]">
              Research Institute
            </div>
          </div>
        </div>
      );

    case "chemico":
      return (
        <div className="flex items-center gap-3 text-white leading-none">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#4a4a4a] ring-2 ring-white/12">
            <span className="text-[1.8rem] font-semibold tracking-[-0.08em]">C</span>
            <span className="absolute right-[0.58rem] top-[0.5rem] h-6 w-3.5 rotate-[20deg] rounded-t-full rounded-b-[80%] bg-[#91c842]" />
          </div>
          <div className="leading-none">
            <div className="text-[1.72rem] font-semibold tracking-[-0.05em]">CHEMICO</div>
            <div className="mt-0.5 text-[0.62rem] italic text-[#c9de67]">Your agro partner</div>
          </div>
        </div>
      );

    case "rainbow":
      return (
        <div className="space-y-1 leading-none">
          <div className="text-[2.35rem] font-black tracking-[-0.08em] text-[#0b7f7a]">
            Rainbow
          </div>
          <div className="text-[0.78rem] font-semibold lowercase tracking-[0.04em] text-[#56b44b]">
            all about growing
          </div>
        </div>
      );

    case "agriaccess":
      return (
        <div className="flex items-center gap-3 leading-none">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#4cb051] text-[2rem] font-bold text-white shadow-sm">
            a
          </div>
          <div className="leading-none">
            <div className="text-[1.5rem] font-semibold tracking-[-0.05em] text-[#1e1f24]">
              AGRIACCESS
            </div>
            <div className="mt-0.5 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-[#737373]">
              Ghana Limited
            </div>
          </div>
        </div>
      );

    case "agriimpact":
      return (
        <div className="flex items-end gap-1 leading-none">
          <span className="text-[2.3rem] font-black tracking-[-0.08em] text-[#62c85c]">
            agri
          </span>
          <span className="text-[2.05rem] font-black tracking-[-0.07em] text-[#7f3b11]">
            impact
          </span>
        </div>
      );

    default:
      return (
        <div className="text-xl font-semibold tracking-[-0.03em] text-[#153324]">
          {partner.name}
        </div>
      );
  }
}

function PartnershipTrack({ items }: { items: Partner[] }) {
  const loopItems = [...items, ...items];

  return (
    <div className="partnership-marquee">
      <div className="partnership-track partnership-track-inline">
        {loopItems.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="partnership-logo-item"
            aria-hidden={index >= items.length}
          >
            <div className={`partnership-logo-shell ${partner.shellClassName ?? ""}`}>
              <PartnerWordmark partner={partner} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomePartnerships() {
  return (
    <section className="relative overflow-hidden bg-[#faf6ec] py-20 lg:py-24">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute left-[-8rem] top-[-6rem] h-56 w-56 rounded-full bg-[rgba(201,162,39,0.09)] blur-3xl" />
        <div className="absolute bottom-[-7rem] right-[-5rem] h-64 w-64 rounded-full bg-[rgba(26,61,46,0.08)] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.36em] text-[#c39b2a]">
            Our Partnership
          </span>
          <h2
            className="mt-4 text-4xl font-bold tracking-tight text-forest-green sm:text-5xl"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Working With The Institutions That Shape Agriculture
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-forest-green/70 sm:text-lg">
            From research and regulation to distribution and farmer support, our network
            keeps moving with the industry every day.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 lg:mt-14">
        <div className="partnership-logo-band">
          <PartnershipTrack items={partners} />
        </div>
      </div>
    </section>
  );
}
