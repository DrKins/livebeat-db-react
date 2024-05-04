import { Link } from "wouter";

import Container from "@/components/Container";
import { deleteCurrentSession, getCurrentSession } from "@/lib/auth";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

const Nav = () => {
  const [session, setSession] = useState<Models.Session>();
  useEffect(() => {
    (async function run() {
      const data = await getCurrentSession();
      setSession(data.session);
    })();
  }, []);

  async function handleLogOut() {
    await deleteCurrentSession();
    setSession(undefined);
  }
  return (
    <nav>
      <Container className="py-16">
        <p className="text-center mb-2">
          <Link href="/">
            <span className="text-4xl font-bold text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-gray-100 drop-shadow-[0_2px_0px_rgba(255,255,255,1)] dark:drop-shadow-[0_2px_0px_rgba(0,0,0,1)]">
              LiveBeat
            </span>
          </Link>
        </p>
        <p className="flex justify-center gap-4">
          {session && (
            <button
              className="font-medium hover:text-[#535bf2] cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          )}{" "}
          {!session && (
            <Link href="/login">
              <span className="font-medium text-inherit">Log In</span>
            </Link>
          )}
        </p>
      </Container>
    </nav>
  );
};

export default Nav;
