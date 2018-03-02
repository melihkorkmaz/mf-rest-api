
import { APIContracts, APIControllers } from 'authorizenet';
import { warn } from './dna.logger';

const message = (code) => {
  switch (code.toString()) {
    case '2':
      return 'General decline by card issuing bank or by Merchant Service Provider';
    case '3':
      return 'Referral to card issuing bank for verbal approval';
    case '4':
      return 'Card reported lost or stolen; pick up card if physically available';
    case '27':
      return 'Address Verification Service (AVS) mismatch; declined by account settings';
    case '44':
      return 'Card Code decline by payment processor';
    case '45':
      return 'AVS and Card Code mismatch; declined by account settings';
    case '65':
      return 'CCV Code is not correct';
    case '250':
      return 'Fraud Detection Suite (FDS) blocked IP address';
    case '251':
      return 'FDS filter triggered--filter set to decline';
    case '254':
      return 'FDS held for review; transaction declined after manual review';
    default:
      return 'Payment Declined. Please check your credit card.';
  }
};

const charge = order => new Promise((resolve, reject) => {
  const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
  // merchantAuthenticationType.setName("8VL357Pp5ntN");
  merchantAuthenticationType.setName('58P7zShtY');
  // merchantAuthenticationType.setTransactionKey("9536Kuf2b7G3MxMy");
  merchantAuthenticationType.setTransactionKey('3Y42u2PEM65tw6q7');

  const card = order.creditCard;

  const creditCard = new APIContracts.CreditCardType();
  creditCard.setCardNumber(card.cardNumber.replace(/\s/g, ''));
  creditCard.setExpirationDate(card.expirationMonth + card.expirationYear);
  creditCard.setCardCode(card.ccv);

  const paymentType = new APIContracts.PaymentType();
  paymentType.setCreditCard(creditCard);


  const orderDetails = new APIContracts.OrderType();
  orderDetails.setInvoiceNumber(order.orderNumber);
  orderDetails.setDescription(`New Order - ${order.orderNumber}`);

  const tax = new APIContracts.ExtendedAmountType();
  tax.setAmount(order.basket.total.tax.toFixed(2));
  tax.setName('standard tax');
  tax.setDescription('');


  const transactionRequestType = new APIContracts.TransactionRequestType();
  transactionRequestType
    .setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount((order.basket.total.grandTotal + order.tip.value).toFixed(2));
  transactionRequestType.setOrder(orderDetails);
  transactionRequestType.setTax(tax);

  const createRequest = new APIContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setTransactionRequest(transactionRequestType);

  const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

  // ctrl.setEnvironment(Constants.endpoint.production);

  ctrl.execute(() => {
    const apiResponse = ctrl.getResponse();

    const response = new APIContracts.CreateTransactionResponse(apiResponse);

    if (response != null) {
      if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
        if (response.getTransactionResponse().getMessages() != null) { resolve({ transactionId: response.getTransactionResponse().getTransId() }); } else if (response.getTransactionResponse().getErrors() != null) {
          reject({ message: message(response.getTransactionResponse().getErrors().getError()[0].getErrorCode()) });
        }
      } else if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {
        reject({ message: message(response.getTransactionResponse().getErrors().getError()[0].getErrorCode()) });
      } else {
        reject({ message: message(response.getMessages().getMessage()[0].getCode()) });
      }
    } else {
      warn('Null Response.');
    }

    resolve(response);
  });
});

export {
  charge,
};
