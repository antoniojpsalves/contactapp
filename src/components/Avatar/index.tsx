import { View, Image, ImageProps, Text } from 'react-native'
import { styles } from './styles'

const variants = {
  size: {
    medium: {
      width: 54,
      height: 54,
      borderRadius: 18,
    },
    large: {
      width: 100,
      height: 100,
      borderRadius: 32,
    },
  },
  text: {
    medium: {
      fontSize: 24,
    },
    large: {
      fontSize: 52,
    },
  },
}

type AvatarProps = {
  name: string
  image?: ImageProps | null
  variant?: 'medium' | 'large'
}

export function Avatar({ name, image, variant = 'medium' }: AvatarProps) {
  return (
    <View>
      {image ? (
        <Image
          source={image}
          style={variants.size[variant]}
          alt="profile pic"
        />
      ) : (
        <View style={[styles.letter, variants.size[variant]]}>
          <Text style={(styles.text, [variants.text[variant]])}>
            {name[0].toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  )
}
