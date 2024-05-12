import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    height: 132,
    backgroundColor: theme.colors.brandPurple,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  input: {
    marginBottom: -27,
  },
})
