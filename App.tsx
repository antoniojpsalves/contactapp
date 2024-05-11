/* eslint-disable camelcase */
import { StatusBar, View } from 'react-native'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { Home } from '@/app/home'

import { Loading } from '@/components/Loading'
import { theme } from '@/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  })
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundDark,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded ? <Loading /> : <Home />}
    </View>
  )
}
