<script setup lang="ts">
import ThemeCircle from '~/components/ThemeCircle.vue'
import { useFuse } from '@vueuse/integrations/useFuse'

definePageMeta({
  colorMode: 'light'
})

onMounted(() => {
  const root = document.documentElement

  document.addEventListener('mousemove', evt => {
    root.style.setProperty('--mouse-x', evt.clientX / innerWidth)
    root.style.setProperty('--mouse-y', evt.clientY / innerHeight)
  })
})

const topics = [
  {
    id: 'music',
    title: 'Musique',
    iconName: 'uil:music',
    customClass: {
      'bg-pink-300': true
    },
    websites: [
      {
        title: 'WhoSampled',
        url: 'https://www.whosampled.com/'
      },
      {
        title: 'Song Finder',
        url: 'https://aha-music.com/'
      }
    ]
  },
  {
    id: 'ia-ml',
    title: 'IA & ML',
    iconName: 'uil:robot',
    customClass: {
      'bg-blue-300': true
    },
    websites: [
      {
        title: 'Perplexity',
        url: 'https://perplexity.ai/'
      },
      {
        title: 'Poe.com',
        url: 'https://poe.com/'
      },
      {
        title: 'ChatbotUI',
        url: 'https://chatbotui.com/'
      }
    ]
  },
  {
    id: 'dev',
    title: 'Développement',
    iconName: 'uil:code',
    customClass: {
      'bg-indigo-300': true
    },
    websites: []
  },
  {
    id: 'cybersecurity',
    title: 'Cybersécurité',
    iconName: 'uil:shield',
    customClass: {
      'bg-green-300': true
    },
    websites: [
      {
        title: 'GTFOBins',
        url: 'https://gtfobins.github.io/'
      },
      {
        title: 'AperiSolve',
        url: 'https://aperisolve.com/'
      },
      {
        title: 'FotoForensics',
        url: 'https://fotoforensics.com/'
      },
      {
        title: 'Decompiler Explorer (DogBolt)',
        url: 'https://dogbolt.org/'
      },
      {
        title: 'CyberChef',
        url: 'https://gchq.github.io/CyberChef/'
      },
      {
        title: 'HackTricks',
        url: 'https://book.hacktricks.xyz/'
      }
    ]
  },
  {
    id: 'languages',
    title: 'Langues',
    iconName: 'uil:language',
    customClass: {
      'bg-yellow-300': true
    },
    websites: [
      {
        title: 'YouGlish',
        url: 'https://youglish.com/'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Confidentialité',
    iconName: 'uil:lock',
    customClass: {
      'bg-purple-300': true
    },
    websites: []
  },
  {
    id: 'ui-ux',
    title: 'UI & UX',
    iconName: 'uil:web-grid',
    customClass: {
      'bg-orange-300': true
    },
    websites: []
  }
]

const search = ref('')
const { results: filteredSearchTopics } = useFuse(search, topics, {
  fuseOptions: {
    keys: ['websites.title', 'websites.url', 'websites.description', 'title'],
    includeMatches: true,
    threshold: 0.3
  }
})

const topic = ref('all')

const openTopic = (id: string) => {
  if (id === topic.value) {
    topic.value = 'all'
  } else {
    topic.value = id
  }
}

const filteredTopics = computed(() => {
  if (topic.value !== 'all') return topics.filter((t) => t.id === topic.value)
  else {
    if (search.value) return filteredSearchTopics.value.map((t) => t.item)
    else return topics
  }
})

const websites = computed(() => {
  if (topic.value === 'all') return []
  else if (!search.value) {
    return topics.find((t) => t.id === topic.value)?.websites ?? []
  } else {
    const matches = filteredSearchTopics.value?.[0]?.matches?.filter((m) => m.key === 'websites.title')
    if (!matches || matches.length === 0) return topics.find((t) => t.id === topic.value)?.websites ?? []

    const refIndexes = matches.map((m) => m.refIndex)
    return topics.find((t) => t.id === topic.value)?.websites.filter((w, i) => refIndexes.includes(i)) ?? []
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
        class="w-64 mt-4"
      >
        <!-- List of websites -->
        <div class="flex flex-col">
          <div
            v-for="w in websites"
            :key="`website-${w.title}`"
            class="flex items-center justify-between"
          >
            <img
              v-if="w.url"
              alt="favicon"
              :src="`https://s2.googleusercontent.com/s2/favicons?domain_url=${encodeURIComponent(w.url)}`"
              class="w-4 h-4 rounded-full"
            >
            <a
              :href="w.url"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              {{ w.title }}
            </a>
            <Icon
              name="uil:external-link-alt"
              class="w-4 h-4 text-blue-500"
            />
          </div>
        </div>
      </UCard>
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
