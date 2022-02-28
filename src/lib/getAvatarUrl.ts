const getAvatarUrl = (username: string | null) =>
  `https://github.com/${username || 'github'}.png?size=460`;

export default getAvatarUrl;
