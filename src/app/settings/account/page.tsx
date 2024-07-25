import { DeleteAccount } from "./delete-account";

export default async function AccountPage() {
  return (
    <div>
      <div>Email</div>
      <div>Auth connections</div>
      <DeleteAccount />
    </div>
  );
}
