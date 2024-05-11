import { StatusBar, View } from 'react-native'
import { Home } from './src/app/home'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </View>
  )
}
