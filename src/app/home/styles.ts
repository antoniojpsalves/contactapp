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
    zIndex: 1,
  },
  input: {
    marginBottom: -27,
  },
  section: {
    fontSize: 18,
    fontFamily: theme.fontFamily.bold,
    backgroundColor: theme.colors.brandPurple,
    width: 34,
    height: 34,
    color: theme.colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 12,
    marginTop: 32,
  },
  contentList: {
    gap: 12,
    padding: 24,
    paddingTop: 64,
  },
})
