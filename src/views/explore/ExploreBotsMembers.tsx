import type { BaseProps } from "../../types/views";
import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { BotUserCard } from "../components/users/BotUserCard";

type ExploreBotsMembersProps = BaseProps & {
  users: Selectable<Users>[];
  pageTitle: string;
  pageDescription: string;
};

export function ExploreBotsMembers(props: ExploreBotsMembersProps) {
  const { users, pageTitle, pageDescription } = props;

  return (
    <DefaultLayout {...props}>
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2" safe>
            {pageTitle}
          </h1>
          <p class="text-gray-600" safe>
            {pageDescription}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <BotUserCard user={user as any} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
