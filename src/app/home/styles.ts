import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    backgroundColor: theme.colors.brandPurple,
    height: 132,
  },
  heading: {
    color: theme.colors.textLight0,
  },
})
