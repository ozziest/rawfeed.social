import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import type { DailyReportItem } from "../../types/shared";
import { SidebarSection } from "../components/sidebar/SidebarSection";
import { SidebarTrending } from "../components/sidebar/SidebarTrending";
import { SidebarUserList } from "../components/sidebar/SidebarUserList";
import { SidebarLinks } from "../components/sidebar/SidebarLinks";
import { TrendingUpIcon } from "../components/icons/TrendingUpIcon";
import { UserPlusIcon } from "../components/icons/UserPlusIcon";
import { RssWaveIcon } from "../components/icons/RssWaveIcon";

type SidebarProps = {
  report?: DailyReportItem[];
  lastMembers?: Selectable<Users>[];
  bots?: Selectable<Users>[];
};

export function Sidebar({ report, lastMembers, bots }: SidebarProps) {
  return (
    <div class="sticky top-16 space-y-4">
      {report && report.length > 0 && (
        <SidebarSection
          title="Trending"
          icon={<TrendingUpIcon class="w-5 h-5 text-orange-500" />}
        >
          <SidebarTrending report={report} />
        </SidebarSection>
      )}

      {lastMembers && lastMembers.length > 0 && (
        <SidebarSection
          title="New Members"
          icon={<UserPlusIcon class="w-5 h-5 text-black" />}
        >
          <SidebarUserList users={lastMembers} viewAllHref="/explore/members" />
        </SidebarSection>
      )}

      {bots && bots.length > 0 && (
        <SidebarSection
          title="RSS Bots"
          icon={<RssWaveIcon class="w-5 h-5 text-green-500" />}
        >
          <SidebarUserList users={bots} viewAllHref="/explore/bots" />
        </SidebarSection>
      )}

      <SidebarLinks />
    </div>
  );
}
