"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  const handleSignIn = async () => {
    return await authClient.signIn.social({ provider: "google" });
  };
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={32}
            height={32}
          />
          <h1>RecDesk</h1>
        </Link>
        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="star"
                  key={index}
                  width={20}
                  height={20}
                />
              ))}
            </figure>
            <p>
              RecDesk makes screen recording easy. From quick walkthroughs to
              full presentations, it&aposs fast, smooth, and shareable in
              seconds
            </p>
            <article>
              <Image
                src="/assets/images/jason.png"
                alt="jason"
                className="rounded-full aspect-square"
                width={64}
                height={64}
              />
              <div>
                <h2>Pranith Kumar</h2>
                <p>Frontend Engineer, ArchGeo</p>
              </div>
            </article>
          </section>
        </div>
        <p> ©️ RecDesk {new Date().getFullYear()}</p>
      </aside>

      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={40}
              height={40}
            />
            <h1>RecDesk</h1>
          </Link>
          <p>
            Create and share your first <span>RecDesk video</span> in no
            time!!..
          </p>
          <button onClick={handleSignIn}>
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              height={22}
              width={22}
            />
            <span>Sign in With Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay" />
    </main>
  );
};

export default Page;
