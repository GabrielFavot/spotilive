<template>
  <div>
    <HistoryGrid :history-items="historyItems" @load-more="loadMoreHistory" />
    {{ historyItems.length }}
  </div>
</template>

<script lang="ts" setup>
const { data: playHistory } = await useLazyFetch(`/api/me/history`);

const cursor = ref(playHistory.value?.cursors.before);

const historyItems = computed(() => {
  return playHistory.value?.items ?? [];
});

const loadMoreHistory = async () => {
  console.log('initial cursor', cursor.value);
  const { data: nextPlayHistory } = await useLazyFetch(`/api/me/history/${cursor.value}`);
  const nextItems = nextPlayHistory.value?.items ?? [];

  if (playHistory.value && nextPlayHistory.value) {
    playHistory.value.items = [...playHistory.value.items, ...nextItems];
    playHistory.value.cursors = nextPlayHistory.value.cursors;
  }

  cursor.value = nextPlayHistory.value?.cursors.before;
  console.log('next cursor', cursor.value);
};
</script>
