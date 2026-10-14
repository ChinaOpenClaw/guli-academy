<template>
  <div class="container mt20">
    <SectionTitle title="全部课程" :subtitle="`共 ${filtered.length} 门课程`" />

    <!-- 筛选 -->
    <div class="c-sort-box mt15">
      <div class="c-s-dl">
        <dl>
          <dt>分类</dt>
          <dd>
            <ul>
              <li v-for="cat in categories" :key="cat"
                  :class="{ active: activeCat === cat }" @click="setCat(cat)">{{ cat }}</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>难度</dt>
          <dd>
            <ul>
              <li v-for="lv in levels" :key="lv"
                  :class="{ active: activeLevel === lv }" @click="setLevel(lv)">{{ lv }}</li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="js-tap mt15">
        <a :class="{ active: sort === 'hot' }" @click="sort = 'hot'">最热</a>
        <a :class="{ active: sort === 'new' }" @click="sort = 'new'">最新</a>
      </div>
    </div>

    <!-- 列表 -->
    <div class="comm-course-list mt20" v-if="pageCourses.length">
      <ul>
        <CourseCard v-for="c in pageCourses" :key="c.id" :course="c" />
      </ul>
    </div>
    <div class="empty" v-else>没有符合条件的课程，换个筛选条件试试～</div>

    <Pagination :current="page" :total-pages="totalPages" @change="onPage" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionTitle from '@/components/SectionTitle.vue'
import CourseCard from '@/components/CourseCard.vue'
import Pagination from '@/components/Pagination.vue'
import { courses, categories, levels } from '@/data/courses'

const route = useRoute()
const router = useRouter()

const activeCat = ref('全部')
const activeLevel = ref('全部')
const sort = ref('hot')
const page = ref(1)
const pageSize = 8

// 读取 URL ?kw= 关键词
const kw = ref(route.query.kw || '')
watch(() => route.query.kw, (v) => { kw.value = v || ''; page.value = 1 })

function setCat(c) { activeCat.value = c; page.value = 1 }
function setLevel(l) { activeLevel.value = l; page.value = 1 }
function onPage(p) { page.value = p; window.scrollTo({ top: 0, behavior: 'smooth' }) }

const filtered = computed(() => {
  let list = courses
  if (activeCat.value !== '全部') list = list.filter((c) => c.category === activeCat.value)
  if (activeLevel.value !== '全部') list = list.filter((c) => c.level === activeLevel.value)
  if (kw.value) {
    const k = String(kw.value).toLowerCase()
    list = list.filter((c) => c.title.toLowerCase().includes(k) || c.intro.toLowerCase().includes(k))
  }
  if (sort.value === 'hot') list = [...list].sort((a, b) => b.studyCount - a.studyCount)
  else list = [...list].sort((a, b) => b.id - a.id)
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const pageCourses = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))

// 过滤后页数变化，重置越界页码
watch(totalPages, (t) => { if (page.value > t) page.value = t })
</script>
