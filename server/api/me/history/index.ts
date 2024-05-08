export default defineEventHandler(async (_event) => {
  const spotify = await useSpotify();

  return spotify.player.getRecentlyPlayedTracks(50);
});
