import { useState } from 'react'

import { styles } from './styles'

import { View, TouchableOpacity } from 'react-native'

import { MagnifyingGlass, X } from 'phosphor-react-native'

import { Input } from '@/components/Input'
import { theme } from '@/theme'

export function Home() {
  const [name, setName] = useState<string>('')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input style={styles.input}>
          <MagnifyingGlass size={16} color={theme.colors.textLight300} />
          <Input.Field
            placeholder="Pesquisar pelo nome..."
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity onPress={() => setName('')}>
            <X size={16} color={theme.colors.textLight300} />
          </TouchableOpacity>
        </Input>
      </View>
    </View>
  )
}
