import { View } from 'react-native'
import { UserCircle } from 'phosphor-react-native'
import { theme } from '@/theme'
import { styles } from './styles'

export function DefaultAvatar() {
  return (
    <View style={styles.container}>
      <UserCircle size={96} color={theme.colors.black} />
    </View>
  )
}
