import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const LinksListContainer = ({ title, links, internal }) => {
  const router = useRouter();
  const { communityId } = router.query;
  return (
    <div className="flex flex-col px-3 py-4 rounded-lg bg-white dark:bg-slate-800 overflow-hidden relative max-w-[500px] divide-y divide-slate-400 dark:divide-slate-500 shadow-sm dark:shadow-lg">
      <h2 className="font-semibold mb-2 text-[1.2em] dark:text-slate-300">
        {title}
      </h2>
      <div className="flex flex-col divide-y divide-slate-300 dark:divide-slate-500">
        {internal
          ? links.map(({ label, href }) => {
              return (
                <span
                  className="font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:dark:text-slate-300 py-2 px-3"
                  key={label}
                >
                  <Link href={`/${communityId}/${href}`}>{label}</Link>
                </span>
              );
            })
          : links.map(({ label, href }) => {
              return (
                <span
                  className="font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:dark:text-slate-300 py-2 px-3"
                  key={label}
                >
                  <Link href={href} passHref>
                    <a target="_blank" rel="noreferrer">
                      {label}
                    </a>
                  </Link>
                </span>
              );
            })}
      </div>
    </div>
  );
};

export default LinksListContainer;
