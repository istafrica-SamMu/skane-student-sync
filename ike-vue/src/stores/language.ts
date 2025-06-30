import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

type Language = 'en' | 'sv'

export const useLanguageStore = defineStore('language', () => {
  const { locale } = useI18n()
  const currentLanguage = ref<Language>('en')

  const toggleLanguage = () => {
    const newLang = currentLanguage.value === 'en' ? 'sv' : 'en'
    currentLanguage.value = newLang
    locale.value = newLang
  }

  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
    locale.value = lang
  }

  const t = (key: string): string => {
    // This will be handled by vue-i18n
    return key
  }

  return {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    t
  }
}) 