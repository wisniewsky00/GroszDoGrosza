import { useAuth } from "../../auth/useAuth";
import { UsernameSection } from "./sections/UsernameSection";
import { EmailChangeSection } from "./sections/EmailChangeSection";

import "./EditProfile.css";
import { PasswordChangeSection } from "./sections/PasswordChangeSection";
import { DeleteAccountSection } from "./sections/DeleteAccountSection";

export function EditProfile() {
  const { user, token, refreshUser } = useAuth();

  return (
    <div className="edit-wrapper">

      <div className="edit-card">
        <h1>Edytuj profil</h1>

        <UsernameSection user={user} token={token} refreshUser={refreshUser} />

        <EmailChangeSection user={user} token={token} refreshUser={refreshUser} />

        <PasswordChangeSection token={token} />

        <DeleteAccountSection token={token} />
      </div>
    </div>
  );
}