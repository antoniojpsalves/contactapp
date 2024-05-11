import { View, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import { theme } from '@/theme'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.brandPurple} />
    </View>
  )
}
