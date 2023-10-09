<script lang="ts" setup>
import { NodeEvent, VNetworkGraph, VEdgeLabel, defineConfigs, Nodes, Edges } from 'v-network-graph'
import { ForceLayout, ForceNodeDatum, ForceEdgeDatum } from 'v-network-graph/lib/force-layout'
import 'v-network-graph/lib/style.css'

import topics from '~/utils/topics'

interface Props {
  uniqueIds: string[],
  showAllLinks: boolean
}

const props = defineProps<Props>()

const nodes = ref<Nodes>({})
const edges = ref<Edges>({})

const refresh = () => {
  const allWebsites = topics.flatMap(t =>
    t.websites.map(w => ({
      ...w,
      keywords: props.showAllLinks ? [...w.keywords, t.title] : w.keywords,
      uniqueId: `${t.id}-${w.title}`,
      topicId: t.id,
      topicColor: t.color
    }))
  ).filter(w => props.uniqueIds.length ? props.uniqueIds.includes(w.uniqueId) : true)

  const tmpNodes = {} as Nodes
  allWebsites.forEach((w) => {
    tmpNodes[w.title] = {
      name: w.title,
      color: w.topicColor
    }
  })

  nodes.value = tmpNodes

  const tmpEdges = {} as Edges
  // Link websites with the same keywords
  allWebsites.forEach((w) => {
    const keywords = w.keywords
    const relatedWebsites = allWebsites.filter(w2 => w2.title !== w.title && w2.keywords.some(k => keywords.includes(k)))
    relatedWebsites.forEach(w2 => {
      if (!tmpEdges[`${w2.title}-${w.title}`]) {
        tmpEdges[`${w.title}-${w2.title}`] = {
          source: w.title,
          target: w2.title,
          label: keywords.filter(k => w2.keywords.includes(k)).join(', ')
        }
      }
    })
  })

  edges.value = tmpEdges
}

refresh()

watch(() => props.showAllLinks, () => {
  refresh()
})

const configs = defineConfigs({
  view: {
    layoutHandler: new ForceLayout({
      positionFixedByDrag: false,
      positionFixedByClickWithAltKey: true,
      createSimulation: (d3, nodes, edges) => {
        // d3-force parameters
        const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
        return d3
          .forceSimulation(nodes)
          .force('edge', forceLink.distance(400).strength(0.5))
          .force('charge', d3.forceManyBody().strength(-800))
          .force('center', d3.forceCenter().strength(0.05))
          .alphaMin(0.001)
      }
    })
  },
  edge: {
    normal: {
      color: '#494949',
      width: 0.5
    },
    label: {
      color: '#494949',
      fontSize: 7
    }
  },
  node: {
    label: {
      direction: 'north',
      color: (v) => v.color,
      fontSize: 15,
      directionAutoAdjustment: true
    },
    normal: {
      color: (v) => v.color,
      radius: 4
    }
  }
})

const onNodeClick = (e: NodeEvent<MouseEvent>) => {
  const { node } = e
  if (node) {
    const website = allWebsites.find(w => w.title === node)
    if (website) window.open(website.url, '_blank')
  }
}
</script>

<template>
  <v-network-graph
    :configs="configs"
    :edges="edges"
    :nodes="nodes"
    :zoom-level="0.5"
    style="height: 100vh"
    :event-handlers="{
      'node:click': onNodeClick
    }"
  >
    <template #override-node-label="{ scale, text, x, y, config, textAnchor, dominantBaseline }">
      <text
        :dominant-baseline="dominantBaseline"
        :fill="config.color"
        :font-size="config.fontSize * scale"
        :text-anchor="textAnchor"
        :transform="`translate(${x} ${y})`"
        class="text-node-label"
        font-weight="bold"
        x="0"
        y="0"
      >
        {{ text }}
      </text>
    </template>
    <template #edge-label="{ edge, ...slotProps }">
      <v-edge-label
        :text="edge.label"
        align="center"
        v-bind="slotProps"
        vertical-align="above"
      />
    </template>
  </v-network-graph>
</template>
