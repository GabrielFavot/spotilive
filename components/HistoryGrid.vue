<template>
  <ul
    role="list"
    class="w-fit mx-auto grid grid-cols-2 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 justify-items-center gap-4 bg-black pb-3"
  >
    <li
      v-for="item in historyItems ?? []"
      :key="item.track.id"
    >
      <TrackElement :track="item.track" />
    </li>
    <div class="flex justify-center items-center text-white border-spotify-gray w-full border-dashed border-2 group hover:cursor-pointer duration-500 hover:scale-105">
      <Icon class="text-spotify-gray group-hover:text-spotify-lightgray text-[40px]" name="ep:more" @click="$emit('load-more')" />
    </div>
  </ul>
</template>

<script lang="ts" setup>
import type { PlayHistory } from '@spotify/web-api-ts-sdk';

const { historyItems } = defineProps<{
  historyItems: PlayHistory[];
}>();
</script>
