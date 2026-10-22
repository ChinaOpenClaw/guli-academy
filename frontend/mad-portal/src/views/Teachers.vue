<template>
  <div class="container mt20">
    <SectionTitle title="名师团队" subtitle="一线大厂与资深教研，带你少走弯路" />
    <div class="i-teacher-list mt20">
      <ul>
        <TeacherCard v-for="t in teachers" :key="t.id" :teacher="t" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
import TeacherCard from '@/components/TeacherCard.vue'
import { teachers } from '@/data/teachers'
</script>
