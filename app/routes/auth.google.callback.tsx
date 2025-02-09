import { getTokenFromCode } from "@/lib/google";
import { MetaFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Callback Oauth Google" },
    {
      name: "description",
      content: "This is a Google OAuth implementation using Remix by @amiminn.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const code = searchParams.get("code") as string;
    //   const state = searchParams.get("state");

    //   console.log("code", code);
    //   console.log("state", state);

    return await getTokenFromCode(code);
  } catch (error) {
    return redirect("/");
  }
}

export default function CallbackGoogle() {
  const loaderdata = useLoaderData<typeof loader>();
  return (
    <div className="h-screen md:flex w-full md:justify-center md:items-center">
      <div className="p-7 md:rounded-lg grid gap-3 items-center text-center bg-gray-950 md:bg-slate-800">
        <div className="flex justify-center">
          <img
            src={loaderdata.picture}
            alt="avatar"
            loading="lazy"
            className="rounded-full w-24 bg-slate-700"
          />
        </div>
        <h1 className="text-2xl font-semibold">{loaderdata.name}</h1>
        <h2>{loaderdata.email}</h2>
        <div className="bg-blue-50 max-w-[600px] break-words overflow-hidden text-left text-black p-2 rounded-lg">
          {JSON.stringify(loaderdata)}
        </div>
        <div className="flex justify-center">
          <Link to={"/"} className="bg-slate-700 rounded-lg py-2 px-6">
            kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
