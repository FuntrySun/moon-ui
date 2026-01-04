<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, markRaw, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let chart: any = null
const currentTab = ref('week')

// 模拟不同时间维度的数据
const chartDataMap: Record<string, { xAxis: string[], data: number[] }> = {
  week: {
    xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    data: [120, 132, 101, 134, 90, 230, 210]
  },
  month: {
    xAxis: ['1-5日', '6-10日', '11-15日', '16-20日', '21-25日', '26-30日'],
    data: [820, 932, 901, 934, 1290, 1330]
  },
  year: {
    xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    data: [2500, 3200, 2800, 4500, 3800, 5200, 4800, 6100, 5900, 7200, 6800, 8500]
  }
}

const getOptions = (isDark: boolean) => {
  const { xAxis, data } = chartDataMap[currentTab.value]
  
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? '#262626' : 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: isDark ? '#e5e7eb' : '#1f2937'
      },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px;'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxis,
      axisLine: {
        lineStyle: {
          color: isDark ? '#4b5563' : '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#9ca3af'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: isDark ? '#374151' : '#f3f4f6'
        }
      },
      axisLabel: {
        color: '#9ca3af'
      }
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        showSymbol: false, 
        symbolSize: 6,
        data: data,
        itemStyle: {
          color: '#0052D9'
        },
        lineStyle: {
          width: 3,
          color: '#0052D9'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 82, 217, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(0, 82, 217, 0)'
              }
            ]
          }
        }
      }
    ]
  }
}

const initChart = async () => {
  if (!chartRef.value) return
  await nextTick()
  
  if (chart) {
    chart.dispose()
  }
  
  const isDark = document.documentElement.classList.contains('dark')
  chart = markRaw(echarts.init(chartRef.value, isDark ? 'dark' : undefined))
  chart.setOption(getOptions(isDark))
}

const updateChart = () => {
  if (!chart) return
  const isDark = document.documentElement.classList.contains('dark')
  chart.setOption(getOptions(isDark))
}

// 监听 Tab 切换
watch(currentTab, () => {
  updateChart()
})

const handleResize = () => {
  chart?.resize()
}

// 监听暗色模式变化
const observer = new MutationObserver(() => {
  initChart()
})

onMounted(() => {
  requestAnimationFrame(() => {
    initChart()
  })
  window.addEventListener('resize', handleResize)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  observer.disconnect()
  chart?.dispose()
})
</script>

<template>
  <n-card title="访问趋势概览" :bordered="false" class="h-full shadow-sm !rd-16px">
    <template #header-extra>
      <n-tabs 
        v-model:value="currentTab" 
        type="segment" 
        size="small" 
        class="w-64"
      >
        <n-tab name="week">近一周</n-tab>
        <n-tab name="month">近一月</n-tab>
        <n-tab name="year">年度</n-tab>
      </n-tabs>
    </template>
    <div ref="chartRef" class="h-300px w-full" />
  </n-card>
</template>
