/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useId, useRef } from 'react'

import { View, TouchableOpacity, Alert, SectionList, Text } from 'react-native'

import { theme } from '@/theme'
import { styles } from './styles'

import { DeviceMobile, MagnifyingGlass, X, User } from 'phosphor-react-native'

import { Input } from '@/components/Input'
import { Contact, ContactProps } from '@/components/contact'

import * as Contacts from 'expo-contacts'

import BottomSheet from '@gorhom/bottom-sheet'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { AddButton } from '@/components/AddButton'
import { DefaultAvatar } from '@/components/DefaultAvatar'
import { DelButton } from '@/components/DelButton'

type SectionListDataProps = {
  title: string
  data: ContactProps[]
}

export function Home() {
  const [contacts, setContacts] = useState<SectionListDataProps[]>([])
  const [name, setName] = useState<string>('')

  const [contact, setContact] = useState<Contacts.Contact>()
  const [contactEditing, setContactEditing] = useState<Contacts.Contact>()

  const bottomSheetRef = useRef<BottomSheet>(null)
  const bottomSheetActionRef = useRef<BottomSheet>(null)
  const bottomSheetEditRef = useRef<BottomSheet>(null)

  const handleBottomSheetOpen = () => bottomSheetRef?.current?.expand()
  const handleBottomSheetClose = () => bottomSheetRef?.current?.snapToIndex(0)

  const [handleName, setHandleName] = useState<string>('')
  const [handleCel, setHandleCel] = useState<string>('')
  const [inAction, setInAction] = useState<boolean>(false)

  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string | undefined>('')

  // eslint-disable-next-line prettier/prettier
  const handleBottomSheetActionOpen = () => bottomSheetActionRef?.current?.expand()
  // eslint-disable-next-line prettier/prettier
  const handleBottomSheetActionClose = () => bottomSheetActionRef?.current?.snapToIndex(0)

  // eslint-disable-next-line prettier/prettier
  const handleBottomSheetEditRefOpen = () => bottomSheetEditRef?.current?.expand()
  // eslint-disable-next-line prettier/prettier
  const handleBottomSheetEditRefClose = () => bottomSheetEditRef?.current?.snapToIndex(0)

  async function handleOpenAction() {
    setInAction(true)
    handleBottomSheetActionOpen()
  }

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
        setContactEditing(data[0])
      }
    } catch (err) {
      Alert.alert('Contatos', 'Não foi possível carregar os contatos.')
      console.error(err)
    }
  }

  // Create - Função que cria um novo contato
  async function addContact(name: string, cel: string) {
    if (name.length < 1 || cel.length < 1) {
      Alert.alert('Atenção', 'Preencha corretamente os campos!')
      return
    }

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

    // resetando os campos
    setName('')
    setInAction(false)
    setHandleName('')
    setHandleCel('')
    handleBottomSheetActionClose()
    handleBottomSheetEditRefClose()
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

    // resetando os campos
    setName('')
    setInAction(false)
    setHandleName('')
    setHandleCel('')
    handleBottomSheetActionClose()
    handleBottomSheetEditRefClose()
  }

  function handleDeleteContact(id: string) {
    Alert.alert(
      'Atenção',
      `Tem certeza de que deseja deletar o contato ?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => deleteContact(id),
        },
      ],
      { cancelable: false },
    )
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
    // resetando os campos
    setName('')
    setInAction(false)
    setHandleName('')
    setHandleCel('')
    handleBottomSheetActionClose()
    handleBottomSheetEditRefClose()
  }

  useEffect(() => {
    fetchContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input style={styles.input}>
          <MagnifyingGlass size={16} color={theme.colors.brandPurple} />
          <Input.Field
            placeholder="Pesquisar pelo nome..."
            value={name}
            onChangeText={setName}
          />
          {name.length > 0 && (
            <TouchableOpacity onPress={() => setName('')}>
              <X size={16} color={theme.colors.brandPurple} />
            </TouchableOpacity>
          )}
        </Input>
      </View>

      <View style={styles.addButtonContainer}>
        <AddButton onPress={handleOpenAction} />
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

            <Button
              title="Editar"
              onPress={() => {
                handleBottomSheetClose()
                setContactEditing(contact)
                handleBottomSheetEditRefOpen()

                setNewName(contact.name)
                setNewNumber(contact.phoneNumbers![0].number)
              }}
            />
          </View>
        </BottomSheet>
      )}

      {inAction && (
        <BottomSheet
          ref={bottomSheetActionRef}
          snapPoints={[0.01, 384]}
          handleComponent={() => null}
          backgroundStyle={styles.bottomSheet}
        >
          <DefaultAvatar />
          <View style={[styles.bottomSheetContent, { gap: 16 }]}>
            <Text style={styles.contactName}>Novo contato</Text>

            <View style={styles.phoneNumber}>
              <Input style={styles.input}>
                <User size={18} color={theme.colors.brandPurple} />
                <Input.Field
                  placeholder="Informe o nome"
                  value={handleName}
                  onChangeText={setHandleName}
                  keyboardType="default"
                  returnKeyType="next"
                />
                {handleCel.length > 0 && (
                  <TouchableOpacity onPress={() => setHandleCel('')}>
                    <X size={16} color={theme.colors.brandPurple} />
                  </TouchableOpacity>
                )}
              </Input>
            </View>
            <View style={styles.phoneNumber}>
              <Input style={styles.input}>
                <DeviceMobile size={18} color={theme.colors.brandPurple} />
                <Input.Field
                  placeholder="Informe o número do celular"
                  value={handleCel}
                  onChangeText={setHandleCel}
                  keyboardType="number-pad"
                />
                {handleCel.length > 0 && (
                  <TouchableOpacity onPress={() => setHandleCel('')}>
                    <X size={16} color={theme.colors.brandPurple} />
                  </TouchableOpacity>
                )}
              </Input>
            </View>

            <Button
              title="Salvar"
              onPress={() => addContact(handleName, handleCel)}
            />
          </View>
        </BottomSheet>
      )}

      {contactEditing && (
        <BottomSheet
          ref={bottomSheetEditRef}
          snapPoints={[0.01, 384]}
          handleComponent={() => null}
          backgroundStyle={styles.bottomSheet}
        >
          <Avatar
            name={contactEditing.name}
            image={contactEditing.image}
            variant="large"
            containerStyle={styles.image}
          />
          <View style={[styles.bottomSheetContent, { gap: 16 }]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
              }}
            >
              <Text style={styles.contactName}>Editar contato</Text>
              <DelButton
                onPress={() => handleDeleteContact(contactEditing.id!)}
              />
            </View>

            <View style={styles.phoneNumber}>
              <Input style={styles.input}>
                <User size={18} color={theme.colors.brandPurple} />
                <Input.Field
                  placeholder="Informe o nome"
                  value={newName}
                  onChangeText={setNewName}
                  keyboardType="default"
                  returnKeyType="next"
                />
                {handleCel.length > 0 && (
                  <TouchableOpacity onPress={() => setHandleCel('')}>
                    <X size={16} color={theme.colors.brandPurple} />
                  </TouchableOpacity>
                )}
              </Input>
            </View>
            <View style={styles.phoneNumber}>
              <Input style={styles.input}>
                <DeviceMobile size={18} color={theme.colors.brandPurple} />
                <Input.Field
                  placeholder="Informe o número do celular"
                  value={newNumber}
                  onChangeText={setNewNumber}
                  keyboardType="number-pad"
                />
                {handleCel.length > 0 && (
                  <TouchableOpacity onPress={() => setHandleCel('')}>
                    <X size={16} color={theme.colors.brandPurple} />
                  </TouchableOpacity>
                )}
              </Input>
            </View>

            <Button
              title="Salvar"
              onPress={() =>
                updateContact(contactEditing.id!, handleName, handleCel)
              }
            />
          </View>
        </BottomSheet>
      )}
    </View>
  )
}
