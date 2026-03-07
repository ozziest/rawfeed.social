import type { Selectable } from "kysely";
import type { Users } from "../../types/database";
import type { TokenPayload } from "../../helpers/tokens";
import { UserCard as UserCardComponent } from "../components/users/UserCard";

type UserCardProps = {
  cardUser: Selectable<Users>;
  loggedUser?: TokenPayload;
  isFollowing: boolean;
  csrfToken: string;
};

export function UserCard({
  cardUser,
  loggedUser,
  isFollowing,
  csrfToken,
}: UserCardProps) {
  return (
    <UserCardComponent
      cardUser={cardUser}
      loggedUser={loggedUser}
      isFollowing={isFollowing}
      csrfToken={csrfToken}
    />
  );
}
