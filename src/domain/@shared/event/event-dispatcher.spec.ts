import SendEmailWhenProductCreatedHandler from '../../product/event/product/handler/send-email-when-product-created.handler';
import ProductCreatedEvent from '../../product/event/product/product-created.event';
import EventDispatcher from './event-dispatcher';

describe('Event Domain Unit Tests', () => {
  it('should create an event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'].length
    ).toBe(1);
  });

  it('should unRegister an event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unRegister('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers()['ProductCreatedEvent'])
      .toBeUndefined;
  });

  it('should unRegister all events', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unRegisterAll();

    expect(eventDispatcher.getEventHandlers()['ProductCreatedEvent'])
      .toBeUndefined;
  });
  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    const spyHandler = jest.spyOn(eventHandler, 'handler');

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent']
    ).toBeDefined();

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product1',
      description: 'description 1',
      price: 10.0
    });
    eventDispatcher.notify(productCreatedEvent);

    expect(spyHandler).toHaveBeenCalled();
  });
});
