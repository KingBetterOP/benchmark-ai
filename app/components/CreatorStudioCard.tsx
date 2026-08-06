"use client";

import { CreatorKit } from "../lib/types";

type Props = {
  creatorKit: CreatorKit | null;
};

export default function CreatorStudioCard({
  creatorKit,
}: Props) {

  if (!creatorKit) return null;

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="rounded-3xl border border-cyan-500 bg-white/5 backdrop-blur-xl p-6">

      <h2 className="text-3xl font-bold">
        🎬 AI Creator Studio
      </h2>

      <p className="mt-2 text-zinc-400">
        Everything you need to publish your next video.
      </p>
            <div className="mt-8 space-y-6">

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              🎣 Hook
            </h3>

            <button
              onClick={() => copy(creatorKit.hook)}
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.hook}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              📝 Full Script
            </h3>

            <button
              onClick={() => copy(creatorKit.script)}
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>
                    <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.script}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              📄 Description
            </h3>

            <button
              onClick={() => copy(creatorKit.description)}
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.description}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              🏷 Hashtags
            </h3>

            <button
              onClick={() =>
                copy(creatorKit.hashtags.join(" "))
              }
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>
                    <div className="mt-4 flex flex-wrap gap-2">

            {creatorKit.hashtags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300"
              >
                {tag}
              </span>
            ))}

          </div>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              🖼 Thumbnail Prompt
            </h3>

            <button
              onClick={() =>
                copy(creatorKit.thumbnailPrompt)
              }
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.thumbnailPrompt}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              📢 Call To Action
            </h3>
                        <button
              onClick={() =>
                copy(creatorKit.callToAction)
              }
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.callToAction}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              💬 Community Post
            </h3>

            <button
              onClick={() =>
                copy(creatorKit.communityPost)
              }
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.communityPost}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              📱 Shorts Script
            </h3>
                        <button
              onClick={() =>
                copy(creatorKit.shortsScript)
              }
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.shortsScript}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              📸 Instagram Caption
            </h3>

            <button
              onClick={() =>
                copy(creatorKit.instagramCaption)
              }
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.instagramCaption}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-bold">
              🐦 X (Twitter) Post
            </h3>

            <button
              onClick={() =>
                copy(creatorKit.twitterPost)
              }
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              📋 Copy
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {creatorKit.twitterPost}
          </p>

        </div>

      </div>

    </div>
  );
}