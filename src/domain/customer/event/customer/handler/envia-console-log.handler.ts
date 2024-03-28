import EventHandlerInterface from '../../../../@shared/event/event-handler.interface';
import EventInterface from '../../../../@shared/event/event.interface';
import CustomerAddressUpdateEvent from '../customer-address-updated.event';

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressUpdateEvent>
{
  handler(event: EventInterface): void {
    const {
      eventData: {
        customerId,
        customerName,
        address: { _street: street }
      }
    } = event;
    console.log(
      `Endereço do cliente: ${customerId}, ${customerName} alterado para: ${street}`
    );
  }
}
