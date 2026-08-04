import type { CookieRow } from "@/data/cookie-policy";

interface CookieTableProps {
  rows: CookieRow[];
}

export function CookieTable({ rows }: CookieTableProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-[12px] border border-border-soft">
      <table className="w-full border-collapse text-left text-[14px] leading-6">
        <thead className="bg-[#F3F4F6] text-foreground">
          <tr>
            <th className="px-4 py-3 font-semibold sm:px-5">Cookie Name</th>
            <th className="px-4 py-3 font-semibold sm:px-5">Purpose</th>
            <th className="px-4 py-3 font-semibold sm:w-[140px] sm:px-5">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.name}
              className={index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}
            >
              <td className="border-t border-border-soft px-4 py-3 font-medium text-foreground sm:px-5">
                {row.name}
              </td>
              <td className="border-t border-border-soft px-4 py-3 text-text-body sm:px-5">
                {row.purpose}
              </td>
              <td className="border-t border-border-soft px-4 py-3 text-text-body sm:px-5">
                {row.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
