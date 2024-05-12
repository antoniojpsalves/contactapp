import { View, ViewProps, TextInput, TextInputProps } from 'react-native'
import { styles } from './style'
import { theme } from '@/theme'

function Input({ children, style }: ViewProps) {
  return <View style={[styles.container, style]}>{children}</View>
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={theme.colors.textLight300}
      style={styles.input}
      {...rest}
    />
  )
}

Input.Field = Field

export { Input }
