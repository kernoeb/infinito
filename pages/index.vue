<script lang="ts" setup>
import { onKeyStroke, useMagicKeys } from '@vueuse/core'
import ThemeCircle from '~/components/ThemeCircle.vue'
import { useFuse } from '@vueuse/integrations/useFuse'

import topics from '~/utils/topics'

const { metaSymbol } = useShortcuts()

definePageMeta({
  colorMode: 'light'
})

const showModal = ref(false)
const showAllLinks = ref(false)

const keys = useMagicKeys()
const metaK = keys['Meta+K']

watch(metaK, () => {
  if (metaK.value) {
    const input = document.querySelector('input')
    if (input) input.focus()
  }
})

onKeyStroke('Escape', () => {
  if (!showModal.value) topic.value = 'all'
})

onMounted(() => {
  const root = document.documentElement

  document.addEventListener('mousemove', evt => {
    root.style.setProperty('--mouse-x', evt.clientX / innerWidth)
    root.style.setProperty('--mouse-y', evt.clientY / innerHeight)
  })
})

const search = ref('')
const { results: filteredSearchTopics } = useFuse(search, topics, {
  fuseOptions: {
    keys: [
      {
        name: 'websites.title',
        weight: 2
      },
      {
        name: 'websites.keywords',
        weight: 1.5,
        getFn: (obj) => {
          return obj.websites.map((w) => w.keywords.join(' ').trim())
        }
      },
      {
        name: 'title',
        weight: 1,
        getFn: (obj) => {
          return obj.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ')
        }
      },
      {
        name: 'websites.url',
        weight: 0.5
      }
    ],
    threshold: 0.3,
    includeMatches: true
  }
})

const topic = ref('all')

const openTopic = (id: string) => {
  if (id === topic.value) topic.value = 'all'
  else topic.value = id
}

const filteredTopics = computed(() => {
  if (topic.value !== 'all') return [topics.find((t) => t.id === topic.value) as typeof topics[0]]
  else {
    if (search.value) return filteredSearchTopics.value.map((t) => t.item)
    else return topics
  }
})

const websites = computed(() => {
  if (search.value) {
    const results = []
    for (const goodValue of filteredSearchTopics.value.filter((t) => topic.value === 'all' ? true : t.item.id === topic.value)) {
      const goodMatches = goodValue?.matches?.filter((m) => m.refIndex != null && m.key && ['websites.title', 'websites.keywords'].includes(m.key))

      if (goodValue && goodMatches?.length) {
        const filteredGoodMatches = goodMatches.map((m) => m.refIndex != null && goodValue.item.websites[m.refIndex])
        for (const goodMatch of filteredGoodMatches) {
          if (goodMatch) results.push(goodMatch)
        }
      } else {
        results.push(...goodValue?.item?.websites ?? [])
      }
    }
    return results.filter((w, i, a) => w && a.findIndex((w2) => w2 && (w2.url === w.url)) === i)
  } else {
    return topics.find((t) => t.id === topic.value)?.websites ?? []
  }
})

watch(filteredTopics, () => {
  // if only one topic, open it
  if (filteredTopics.value.length === 1) {
    topic.value = filteredTopics.value[0].id
  }
})
</script>

<template>
  <div>
    <div class="flex justify-center items-center h-screen flex-col">
      <div
        v-if="filteredTopics.length === 0"
        class="text-center"
      >
        <h1 class="text-4xl font-bold">
          Aucun résultat
        </h1>
        <p class="text-lg">
          Y a rien ici, désolé
        </p>
      </div>
      <ThemeCircle
        v-for="(t, i) in filteredTopics"
        :key="`topic-${t.id}`"
        :class="filteredTopics.length - 1 === i ? '' : 'mb-2'"
        :custom-class="t.customClass"
        :icon-name="t.iconName"
        :title="t.title"
        role="button"
        tabindex="0"
        @click="() => openTopic(t.id)"
        @keyup.enter="() => openTopic(t.id)"
      />
      <UCard
        v-if="topic !== 'all'"
        :class="filteredTopics[0].borderClass"
        class="w-80 mt-4 border-2 shadow-2xl ring-transparent"
        style="max-height: 57vh; overflow-y: auto!important;"
      >
        <!-- List of websites -->
        <div class="flex flex-col">
          <div
            v-for="(w, i) in websites"
            :key="`website-${w.title}`"
            :class="websites.length - 1 === i ? '' : 'mb-2'"
            class="flex items-center justify-between"
          >
            <a
              :href="w.url"
              class="text-blue-500 hover:underline flex items-center justify-between w-full"
              target="_blank"
            >
              <div class="inline-flex items-center">
                <img
                  v-if="w.url"
                  :src="`/favicons/${w.uniqueId}.png`"
                  alt="favicon"
                  class="w-4 h-4 rounded-full mr-2"
                >
                <div>
                  <div>
                    {{ w.title }}
                  </div>
                  <div
                    class="text-gray-400"
                    style="font-size: 12px"
                  >
                    {{ w.description }}
                  </div>
                </div>
              </div>
              <div>
                <Icon
                  class="w-4 h-4 text-blue-500"
                  name="uil:external-link-alt"
                />
              </div>
            </a>
          </div>
        </div>
      </UCard>

      <u-button
        v-if="!search || websites.length > 1"
        class="mt-4"
        @click="showModal = true"
      >
        Voir le graphe
      </u-button>

      <u-modal
        v-model="showModal"
        fullscreen
      >
        <div
          style="background: transparent radial-gradient(at calc(var(--mouse-x, 0) * 100%) calc(var(--mouse-y, 0) * 100%), #fed7aa, #f9a8d4) no-repeat 0 0"
        >
          <data-graph
            :unique-ids="websites.map((t) => t.uniqueId)"
            :show-all-links="showAllLinks"
          />

          <u-button
            class="fixed bottom-2 inset-x-0 max-w-max mx-auto"
            @click="showModal = false"
          >
            Fermer le graph
          </u-button>
          <span class="fixed bottom-2 right-2 flex items-center text-gray-600">
            <u-toggle
              v-model="showAllLinks"
              class="mr-2"
            /><span
              class="text-sm cursor-pointer"
              @click="showAllLinks = !showAllLinks"
            >Afficher toutes les connexions</span>
          </span>
        </div>
      </u-modal>
    </div>

    <footer class="absolute bottom-0 w-screen">
      <div class="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-center">
        <UInput
          v-model="search"
          :class="{'opacity-no-hover': !search}"
          autofocus
          color="white"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Tu cherches quelque chose ?"
          size="xl"
          style="width: max(50vw, 400px)"
          @input="() => topic = 'all'"
        >
          <template #trailing>
            <UKbd>{{ metaSymbol }}</UKbd>
            <UKbd>K</UKbd>
          </template>
        </UInput>
      </div>
    </footer>
  </div>
</template>

<style lang="postcss">
body {
  background: transparent radial-gradient(at calc(var(--mouse-x, 0) * 100%) calc(var(--mouse-y, 0) * 100%), #fed7aa, #f9a8d4) no-repeat 0 0
}

.opacity-no-hover {
  opacity: 0.4;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
}
</style>
