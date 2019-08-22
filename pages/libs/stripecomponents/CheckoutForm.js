import { StripeProvider, Elements } from 'react-stripe-elements'

import CheckoutElement from './CheckoutElement'

export default () =>
	<StripeProvider apiKey="pk_test_CxirylwEmIxObJVBNBKrQylD">
		<Elements>
			<CheckoutElement />
		</Elements>
	</StripeProvider>
