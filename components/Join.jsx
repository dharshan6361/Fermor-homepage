"use client";
import { useState } from "react";
import { Reveal } from "./Reveal";

export function Join() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("error");
      return;
    }
    // Front-end only for the assignment. Wire this to an API route or form service to collect emails.
    setState("done");
  }

  return (
    <section id="join" className="px-5 pb-20 sm:px-8 sm:pb-28">
      <Reveal>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-mint px-6 py-14 text-center sm:px-16 sm:py-20">
          <h2 className="display mx-auto max-w-2xl text-4xl font-semibold leading-[1.1] sm:text-5xl">
            Get a free financial health check.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink-2">Know where you stand. Join the waitlist and we&rsquo;ll let you in as soon as your spot opens.</p>
          {state === "done" ? (
            <p className="mx-auto mt-8 max-w-md rounded-2xl bg-paper px-5 py-4 font-medium text-moss-dark" role="status">
              You&rsquo;re on the list. We&rsquo;ll write to {email.trim()} when it&rsquo;s your turn.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                aria-invalid={state === "error"} aria-describedby={state === "error" ? "email-err" : undefined}
                className="min-w-0 flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3.5 outline-none placeholder:text-ink-3 focus:border-moss" />
              <button type="submit" className="rounded-full bg-moss-dark px-7 py-3.5 font-medium text-paper transition-colors hover:bg-ink">Join waitlist</button>
            </form>
          )}
          {state === "error" && <p id="email-err" role="alert" className="mt-3 text-[0.88rem] text-clay">Please enter a valid email address.</p>}
        </div>
      </Reveal>
    </section>
  );
}
