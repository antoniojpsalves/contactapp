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
  addButtonContainer: {
    marginTop: 40,
    height: 40,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 26,
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
    marginTop: 12,
  },
  contentList: {
    gap: 12,
    padding: 24,
    paddingTop: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: theme.colors.textLight300,
    marginTop: 12,
    width: '80%',
    alignSelf: 'center',
  },
  bottomSheet: {
    backgroundColor: 'transparent',
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: theme.colors.textLight100,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingTop: 64,
    alignItems: 'center',
    padding: 32,
  },
  image: {
    marginBottom: -50,
    zIndex: 1,
    alignSelf: 'center',
  },
  contactName: {
    fontSize: 24,
    fontFamily: theme.fontFamily.bold,
  },
  phoneNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 24,
  },
  phone: {
    fontSize: 18,
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.textLight400,
  },
})
