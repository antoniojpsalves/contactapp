import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    backgroundColor: theme.colors.brandPurple,
    borderWidth: 1,
    borderColor: theme.colors.textLight100,
  },
})
