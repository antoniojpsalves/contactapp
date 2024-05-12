import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { styles } from './style'

type ButtonProps = TouchableOpacityProps & {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
