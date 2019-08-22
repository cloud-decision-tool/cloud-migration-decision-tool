import { injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements'

const CheckoutElement = () =>
	<form>
		<CardElement hidePostalCode />
	</form>

export default injectStripe(CheckoutElement)
