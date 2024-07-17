import { login } from "./actions";

export default async function LoginPage() {
  return (
    <>
      <h1>Sign in</h1>
      <form action={login}>
        <label htmlFor="email">email</label>
        <input name="email" id="email" type="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}
