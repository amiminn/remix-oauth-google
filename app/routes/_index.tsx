import { generateAuthUrl } from "@/lib/google";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import GoogleIcon from "@/icon/google.svg";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Oauth Google" },
    {
      name: "description",
      content: "This is a Google OAuth implementation using Remix by @amiminn.",
    },
  ];
};

export async function loader() {
  return json({ googleAuthUrl: generateAuthUrl("sign-in") });
}

export default function Index() {
  const { googleAuthUrl } = useLoaderData<typeof loader>();

  return (
    <div className="h-screen flex w-full justify-center items-center p-2">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Google OAuth - Remix</h1>
        <a
          href={googleAuthUrl}
          className="py-2 px-6 bg-slate-800 flex gap-3 justify-center items-center text-white rounded-lg"
        >
          <img src={GoogleIcon} alt="" className="w-8" />
          Sign-In Google
        </a>
      </div>
    </div>
  );
}
