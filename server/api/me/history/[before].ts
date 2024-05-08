export default defineEventHandler(async (event) => {
  const before = getRouterParam(event, 'before');
  const spotify = await useSpotify();

  console.log('before', before, Number(before));
  console.log('before as a date', new Date(Number(before)));

  const result = await spotify.player.getRecentlyPlayedTracks(50, { timestamp: Number(before), type: 'before' });

  console.log('result', result);

  return spotify.player.getRecentlyPlayedTracks(50, { timestamp: Number(before), type: 'before' });
});
