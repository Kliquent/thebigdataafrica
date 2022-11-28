import React, { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import Toast from 'react-native-toast-message';
import AppStore from './src/store/Store';

// Root navigation stack
import RootStack from './src/stacks/RootStack';

export default function App() {
	return (
		<StoreProvider store={AppStore}>
			<Suspense
				fallback={
					<ActivityIndicator
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							alignItems: 'center',
							justifyContent: 'center',
						}}
						size="large"
					/>
				}
			>
				<RootStack />
				<Toast />
			</Suspense>
		</StoreProvider>
	);
}
