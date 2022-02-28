import {createClient, User} from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY);

export async function authenticatedVote(userId: number, repoName: string) {
  const { error } = await supabase
    .from('votes')
    .upsert([
      {
        github_user_id: userId,
        repo_name: repoName,
        code: `${userId}-${repoName}`,
      }], {
      onConflict: 'code',
    });

  if (error && error.code === '23505') {
    await supabase
      .from('votes')
      .delete()
      .eq('vote_code', `${userId}-${repoName}`);

    return -1;
  }

  return 1;
}

export async function updateVotesByRepo(repoName: string, votes: number, user?: User) {
  const githubId = user?.user_metadata.sub;

  const voteTally = await authenticatedVote(githubId, repoName);

  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .update({ votes: votes + voteTally })
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations ? recommendations[0].votes : 0;
}
