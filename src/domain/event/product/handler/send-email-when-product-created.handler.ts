import EventHandlerInterface from '../../@shared/event-handler.interface';
import EventInterface from '../../@shared/event.interface';
import ProductCreatedEvent from '../product-created.event';

export default class SendEmailWhenProductCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handler(event: EventInterface): void {
    console.log(`Sending email to ${event.eventData.email}`);
  }
}
