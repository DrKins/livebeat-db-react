import Button from "@/components/Button";
import Container from "@/components/Container";
import FormLabel from "@/components/FormLabel";
import FormRow from "@/components/FormRow";
import InputText from "@/components/InputText";
import Layout from "@/components/Layout";
import { logIn } from "@/lib/auth";
import { useState } from "react";

function LogIn() {
  const [sent, setSent] = useState(false);
  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    try {
      await logIn(target.email.value);
      setSent(true);
    } catch (error) {
      console.error("login failed, try again later.");
      setSent(false);
    }
  }
  return (
    <Layout>
      <Container>
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
        {!sent && (
          <form
            className="max-w-xs border border-slate-200 dark:border-slate-500 rounded p-6 mx-auto"
            onSubmit={handleOnSubmit}
          >
            <FormRow className="mb-5">
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputText id="email" name="email" type="email" />
            </FormRow>

            <Button>Submit</Button>
          </form>
        )}
        {sent && <p className="text-center">Check your email for magic link</p>}
      </Container>
    </Layout>
  );
}

export default LogIn;
