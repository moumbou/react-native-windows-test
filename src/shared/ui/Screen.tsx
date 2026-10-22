import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '../lib/tw';

type Edge = 'top' | 'bottom' | 'left' | 'right';

type ScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
};

const ALL_EDGES: Edge[] = ['top', 'bottom', 'left', 'right'];

export function Screen({ children, edges = ALL_EDGES }: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 bg-surface dark:bg-surface-dark`,
        {
          paddingTop: edges?.includes('top') ? insets.top : 0,
          paddingBottom: edges?.includes('bottom') ? insets.bottom : 0,
          paddingLeft: edges?.includes('left') ? insets.left : 0,
          paddingRight: edges?.includes('right') ? insets.right : 0,
        },
      ]}
    >
      {children}
    </View>
  );
}
