import { useState, useEffect, useId } from 'react'

import { View, TouchableOpacity, Alert, SectionList, Text } from 'react-native'

import { theme } from '@/theme'
import { styles } from './styles'

import { MagnifyingGlass, X } from 'phosphor-react-native'

import { Input } from '@/components/Input'
import { Contact, ContactProps } from '@/components/contact'

import * as Contacts from 'expo-contacts'

type SectionListDataProps = {
  title: string
  data: ContactProps[]
}

export function Home() {
  const [contacts, setContacts] = useState<SectionListDataProps[]>([])
  const [name, setName] = useState<string>('')

  async function fetchContacts() {
    try {
      const { status } = await Contacts.requestPermissionsAsync()

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          name,
          sort: 'firstName',
        })
        const list = data
          .map((contact) => ({
            // eslint-disable-next-line react-hooks/rules-of-hooks
            id: contact.id ?? useId(),
            name: contact.name,
            image: contact.image,
          }))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .reduce<SectionListDataProps[]>((acc: any, item) => {
            const firstLetter = item.name.charAt(0).toUpperCase()

            const existingEntry = acc.find(
              (entry: SectionListDataProps) => entry.title === firstLetter,
            )

            if (existingEntry) {
              existingEntry.data.push(item)
            } else {
              acc.push({ title: firstLetter, data: [item] })
            }

            return acc
          }, [])

        setContacts(list)
      }
    } catch (err) {
      Alert.alert('Contatos', 'Não foi possível carregar os contatos.')
      console.error(err)
    }
  }

  useEffect(() => {
    fetchContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

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

      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Contact contact={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.section}>{section.title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
