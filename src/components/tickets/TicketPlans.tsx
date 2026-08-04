import type { TicketTier } from "@/data/tickets";
import { TicketCard } from "./TicketCard";

interface TicketPlansProps {
  meetingId: string;
  tiers: TicketTier[];
}

export function TicketPlans({ meetingId, tiers }: TicketPlansProps) {
  return (
    <section className="bg-[#F5F8FC] py-[80px]">
      <div className="container-content flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch md:gap-6 xl:gap-8">
        {tiers.map((tier) => (
          <TicketCard
            key={tier.id}
            tier={tier}
            registerHref={`/meetings/${meetingId}/register?plan=${tier.id}`}
          />
        ))}
      </div>
    </section>
  );
}
