import { ProvidedAccessTokenStrategy, SpotifyApi, emptyAccessToken, type AccessToken } from '@spotify/web-api-ts-sdk';

const storageKey = 'spotify_access_token';

export async function useSpotify() {
  const { clientId, clientSecret } = useRuntimeConfig().spotify;

  console.log(process.env);

  const storage = useStorage();
  const accessToken = await getCachedAccessToken();

  const refresh = async (clientId: string, accessToken: AccessToken) => {
    const response = await $fetch<AccessToken>('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: accessToken.refresh_token,
      }),
    });
    response.expires = Date.now() + (response.expires_in * 1000);
    await storage.setItem(storageKey, response);

    return response;
  };

  const strategy = new ProvidedAccessTokenStrategy(clientId, accessToken, refresh);

  return new SpotifyApi(strategy, {});
}

export async function getCachedAccessToken() {
  const { refreshToken } = useRuntimeConfig().spotify;
  const value = await useStorage().getItem<AccessToken>(storageKey);
  return value ?? { ...emptyAccessToken, refresh_token: refreshToken };
}
