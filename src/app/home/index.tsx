/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useId, useRef } from 'react'

import { View, TouchableOpacity, Alert, SectionList, Text } from 'react-native'

import { theme } from '@/theme'
import { styles } from './styles'

import { DeviceMobile, MagnifyingGlass, X } from 'phosphor-react-native'

import { Input } from '@/components/Input'
import { Contact, ContactProps } from '@/components/contact'

import * as Contacts from 'expo-contacts'

import BottomSheet from '@gorhom/bottom-sheet'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { AddButton } from '@/components/AddButton'

type SectionListDataProps = {
  title: string
  data: ContactProps[]
}

export function Home() {
  const [contacts, setContacts] = useState<SectionListDataProps[]>([])
  const [name, setName] = useState<string>('')

  const [contact, setContact] = useState<Contacts.Contact>()

  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleBottomSheetOpen = () => bottomSheetRef?.current?.expand()
  const handleBottomSheetClose = () => bottomSheetRef?.current?.snapToIndex(0)

  async function handleOpenDetails(id: string) {
    // console.warn(id)
    const response = await Contacts.getContactByIdAsync(id)
    // console.log(response)
    setContact(response)
    handleBottomSheetOpen()
  }

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
        setContact(data[0])
      }
    } catch (err) {
      Alert.alert('Contatos', 'Não foi possível carregar os contatos.')
      console.error(err)
    }
  }

  // Create - Função que cria um novo contato
  async function addContact(name: string, cel: string) {
    const contato = {
      [Contacts.Fields.FirstName]: name,
      [Contacts.Fields.PhoneNumbers]: [
        {
          label: 'mobile',
          number: cel,
        },
      ],
    } as Contacts.Contact
    try {
      await Contacts.addContactAsync(contato)
      Alert.alert('Boa', 'novo contato adicionado!')
    } catch (err) {
      console.error(err)
      Alert.alert('Opa', 'Ocorreu um erro ao adicionar o contato.')
    }
  }

  // Update - Função que atualiza um novo contato
  async function updateContact(id: string, name: string, cel: string) {
    const contato = {
      id,
      [Contacts.Fields.FirstName]: name,
      [Contacts.Fields.PhoneNumbers]: [
        {
          label: 'mobile',
          number: cel,
        },
      ],
    } as Contacts.Contact
    try {
      await Contacts.updateContactAsync(contato)
      Alert.alert('Boa', 'novo contato atualizado!')
    } catch (err) {
      console.error(err)
      Alert.alert('Opa', 'Ocorreu um erro ao atualizar o contato.')
    }
  }

  // Delete - Função que deleta um contato
  async function deleteContact(id: string) {
    try {
      await Contacts.removeContactAsync(id)
      Alert.alert('Feito', 'contato removido!')
    } catch (err) {
      console.error(err)
      Alert.alert('Opa', 'Ocorreu um erro ao apagar o contato.')
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

      <View style={styles.addButtonContainer}>
        <AddButton />
      </View>

      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Contact contact={item} onPress={() => handleOpenDetails(item.id)} />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.section}>{section.title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
      />

      {contact && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[0.01, 284]}
          handleComponent={() => null}
          backgroundStyle={styles.bottomSheet}
        >
          <Avatar
            name={contact.name}
            image={contact.image}
            variant="large"
            containerStyle={styles.image}
          />
          <View style={styles.bottomSheetContent}>
            <Text style={styles.contactName}>{contact.name}</Text>

            {contact.phoneNumbers && (
              <View style={styles.phoneNumber}>
                <DeviceMobile size={18} color={theme.colors.brandPurple} />
                <Text style={styles.phone}>
                  {contact.phoneNumbers[0].number}
                </Text>
              </View>
            )}

            <Button title="Fechar" onPress={handleBottomSheetClose} />
          </View>
        </BottomSheet>
      )}
    </View>
  )
}
