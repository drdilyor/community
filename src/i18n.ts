import {createI18n} from 'vue-i18n'
import messages from './messages'

export default createI18n({
  locale: 'uz',
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
})

