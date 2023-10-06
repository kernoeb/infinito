<script setup lang="ts">
import ThemeCircle from '~/components/ThemeCircle.vue'
import { useFuse } from '@vueuse/integrations/useFuse'
import topics from '~/utils/topics'

definePageMeta({
  colorMode: 'light'
})

const showModal = ref(false)

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
        :title="t.title"
        :icon-name="t.iconName"
        :custom-class="t.customClass"
        @click="() => openTopic(t.id)"
      />
      <UCard
        v-if="topic !== 'all'"
        class="w-80 mt-4 border-2 shadow-2xl ring-transparent"
        :class="filteredTopics[0].borderClass"
        style="max-height: 57vh; overflow-y: auto!important;"
      >
        <!-- List of websites -->
        <div class="flex flex-col">
          <div
            v-for="(w, i) in websites"
            :key="`website-${w.title}`"
            class="flex items-center justify-between"
            :class="websites.length - 1 === i ? '' : 'mb-2'"
          >
            <a
              :href="w.url"
              target="_blank"
              class="text-blue-500 hover:underline flex items-center justify-between w-full"
            >
              <div class="inline-flex items-center">
                <img
                  v-if="w.url"
                  alt="favicon"
                  :src="`https://s2.googleusercontent.com/s2/favicons?domain_url=${encodeURIComponent(w.url)}`"
                  class="w-4 h-4 rounded-full mr-2"
                >
                <div>
                  <div>
                    {{ w.title }}
                  </div>
                  <div
                    style="font-size: 12px"
                    class="text-gray-400"
                  >
                    {{ w.description }}
                  </div>
                </div>
              </div>
              <div>
                <Icon
                  name="uil:external-link-alt"
                  class="w-4 h-4 text-blue-500"
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
        <div style="background: transparent radial-gradient(at calc(var(--mouse-x, 0) * 100%) calc(var(--mouse-y, 0) * 100%), #fed7aa, #f9a8d4) no-repeat 0 0">
          <data-graph :unique-ids="websites.map((t) => t.uniqueId)" />

          <u-button
            class="fixed bottom-2 inset-x-0 max-w-max mx-auto"
            @click="showModal = false"
          >
            Fermer le graph
          </u-button>
        </div>
      </u-modal>
    </div>

    <footer class="absolute bottom-0 w-screen">
      <div class="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-center">
        <UInput
          v-model="search"
          autofocus
          :class="{'opacity-no-hover': !search}"
          style="width: max(50vw, 400px)"
          placeholder="Tu cherches quelque chose ?"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="xl"
          color="white"
          :trailing="false"
          @input="() => topic = 'all'"
        />
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
