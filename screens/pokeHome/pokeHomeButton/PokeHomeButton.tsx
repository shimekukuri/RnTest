import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ReactNode} from 'react';
import {
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {RootStackParamList} from '../../../App';

export function PokeHomeButton({
  onPress,
  style,
  children,
  navigation,
}: {
  onPress: (
    event: GestureResponderEvent,
    navigation: NativeStackNavigationProp<RootStackParamList>,
  ) => any;
  style: StyleProp<ViewStyle>;
  children: () => ReactNode;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  return (
    <Pressable
      onPress={e => onPress(e, navigation)}
      style={[style, styles.base]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    aspectRatio: 1,
    flex: 1,
    borderRadius: 8,
  },
});
