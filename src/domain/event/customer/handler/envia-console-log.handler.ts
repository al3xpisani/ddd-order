import EventHandlerInterface from '../../@shared/event-handler.interface';
import EventInterface from '../../@shared/event.interface';

export default class EnviaConsoleLogHandler implements EventHandlerInterface {
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
