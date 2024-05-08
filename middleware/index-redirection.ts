import type { PlaybackState } from '@spotify/web-api-ts-sdk';

export default defineNuxtRouteMiddleware(async () => {
  const { data: playbackState } = await useLazyFetch<PlaybackState>(
    `/api/me/currently-playing-tracking-track`,
  );

  if (playbackState.value?.is_playing) {
    return navigateTo(`/currently-playing`);
  }

  return navigateTo('/history');
});
