const getProfileUrl = (username: string | null) =>
  `https://github.com/${username || ''}`;

export default getProfileUrl;
