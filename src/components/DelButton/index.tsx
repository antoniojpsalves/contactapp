import { theme } from '@/theme'
import { Trash } from 'phosphor-react-native'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './style'

type DelButtonProps = TouchableOpacityProps

export function DelButton({ ...rest }: DelButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Trash size={24} color={theme.colors.danger} />
    </TouchableOpacity>
  )
}
