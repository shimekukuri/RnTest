import {
  FlatList,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ReactNode} from 'react';
import {PokeHomeButton} from '../pokeHomeButton/PokeHomeButton';

export interface pokeButton {
  onPress: (
    event: GestureResponderEvent,
    navigation: NativeStackNavigationProp<RootStackParamList>,
  ) => any;
  style: StyleProp<ViewStyle>;
  element: () => ReactNode;
  uniqueName: string;
}

export function PokeHomeButtonController({
  navigation,
  homeButtons,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  homeButtons: pokeButton[];
}) {
  return (
    <>
      <FlatList
        data={homeButtons}
        keyExtractor={({uniqueName}) => uniqueName}
        numColumns={3}
        contentContainerStyle={styles.containerStyles}
        columnWrapperStyle={styles.containerWrapperStyles}
        renderItem={({item: {onPress, style, element}}) => (
          <PokeHomeButton
            onPress={onPress}
            style={style}
            navigation={navigation}>
            {element}
          </PokeHomeButton>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  containerStyles: {
    padding: 8,
    flex: 1,
    gap: 8,
  },
  containerWrapperStyles: {
    gap: 8,
  },
});
