import type { RecentlyPlayedTracksPage } from '@spotify/web-api-ts-sdk';

export default defineTask({
  meta: {
    name: 'history:load',
    description: 'Loads history of played songs',
  },
  async run() {
    const spotify = await useSpotify();

    const storedTracks = await useStorage('history').getItem<RecentlyPlayedTracksPage['items']>('tracks');
    const queryRange = computeCursor(storedTracks ?? []);

    const latestTracks = await spotify.player.getRecentlyPlayedTracks(50, queryRange);

    console.log('Fetched', latestTracks.items.length, 'new songs');

    const history = storedTracks ? latestTracks.items.concat(...storedTracks) : latestTracks.items;
    await useStorage('history').setItem('tracks', history);

    return {
      result: {
        size: history.length,
        latestTracks: latestTracks.items,
      },
    };
  },
});

function computeCursor(history: RecentlyPlayedTracksPage['items']): { timestamp: number; type: 'before' | 'after' } {
  const lastSong = history[0];

  if (!lastSong) {
    return { timestamp: Date.now(), type: 'before' };
  }

  return { timestamp: new Date(lastSong.played_at).getTime(), type: 'after' };
}