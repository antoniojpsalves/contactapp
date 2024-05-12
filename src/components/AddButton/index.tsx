import { theme } from '@/theme'
import { UserPlus } from 'phosphor-react-native'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './style'

type AddButtonProps = TouchableOpacityProps

export function AddButton({ ...rest }: AddButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <UserPlus size={24} color={theme.colors.white} />
    </TouchableOpacity>
  )
}
