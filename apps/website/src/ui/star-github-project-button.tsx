export const dynamic = "force-static";

import { GithubStarsButton } from "@/cuicui/common-ui/buttons/github-stars/github-stars";
import { env } from "#/src/env";

export default async function StarCuicuiGithubButton() {
  const apiGithub = "https://api.github.com/repos/damien-schneider/cuicui";

  const githubRepoData = await fetch(apiGithub).then((res) => res.json());
  const numberOfStars = githubRepoData.stargazers_count;

  return (
    <GithubStarsButton
      className="inline-flex w-full h-fit"
      href={env.NEXT_PUBLIC_CUICUI_GITHUB_URL}
      starNumber={numberOfStars ?? 0}
      title="Star Cuicui on GitHub"
    >
      Star Cuicui on GitHub
    </GithubStarsButton>
  );
}
