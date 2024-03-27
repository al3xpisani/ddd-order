import EventInterface from '../@shared/event.interface';

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
  constructor(eventData: any) {
    this.eventData = eventData;
    this.dataTimeOccurred = new Date();
  }
}
