import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';

import { Block } from '.';
import { EventBus } from '../eventBus';

describe('Block', () => {
  let sandbox: SinonSandbox;
  const template = '<div>{{{text}}}</div>';

  class TestBlock extends Block {
    render() {
      return this.compile(template, {});
    }
  }

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should contain text props', () => {
    const blockInstance = new TestBlock({ text: 'text' });

    expect(blockInstance.props.text).to.equal('text');
  });

  it('should call initEvenBus when init', () => {
    const eventBusSpy = sandbox.spy(EventBus.prototype, 'emit');

    new TestBlock({ text: 'text' });

    expect(eventBusSpy.calledWith(Block.EVENTS.INIT)).to.be.true;
  });

  it('should register event init when init', () => {
    const eventBusSpy = sandbox.spy(EventBus.prototype, 'on');

    new TestBlock({ text: 'text' });

    expect(eventBusSpy.calledWith(Block.EVENTS.INIT)).to.be.true;
  });

  it('should register event cdu when init', () => {
    const eventBusSpy = sandbox.spy(EventBus.prototype, 'on');

    new TestBlock({ text: 'text' });

    expect(eventBusSpy.calledWith(Block.EVENTS.FLOW_CDU)).to.be.true;
  });

  it('should register event cdm when init', () => {
    const eventBusSpy = sandbox.spy(EventBus.prototype, 'on');

    new TestBlock({ text: 'text' });

    expect(eventBusSpy.calledWith(Block.EVENTS.FLOW_CDM)).to.be.true;
  });

  it('should register event render when init', () => {
    const eventBusSpy = sandbox.spy(EventBus.prototype, 'on');

    new TestBlock({ text: 'text' });

    expect(eventBusSpy.calledWith(Block.EVENTS.FLOW_RENDER)).to.be.true;
  });

  it('should call render when init', () => {
    const renderSpy = sandbox.spy(TestBlock.prototype, 'render');

    new TestBlock({ text: 'text' });

    expect(renderSpy.calledOnce).to.be.true;
  });

  it('should return right content after render', () => {
    const blockInstance = new TestBlock({ text: 'text' });

    const elementHTML = blockInstance.render().firstElementChild?.outerHTML;

    expect(elementHTML).to.equal('<div>text</div>');
  });

  it('should call compile with template when render', () => {
    const compileSpy = sandbox.spy(Block.prototype, 'compile');
    const blockInstance = new TestBlock({ text: 'text' });

    blockInstance.render();

    expect(compileSpy.calledWith(template)).to.be.true;
  });

  it('should call componentDidMount when dispatching component did mount', () => {
    const cdmSpy = sandbox.spy(Block.prototype, 'componentDidMount');
    const blockInstance = new TestBlock({ text: 'text' });

    blockInstance.componentDidMount();

    expect(cdmSpy.calledOnce).to.be.true;
  });

  it('should call component did update when call set props', () => {
    const cduSpy = sandbox.spy(Block.prototype, 'componentDidUpdate');
    const blockInstance = new TestBlock({ text: 'text' });

    blockInstance.setProps({ text: 'newText' });

    expect(cduSpy.calledOnce).to.be.true;
  });

  it('should call render when call set props with new value', () => {
    const renderSpy = sandbox.spy(TestBlock.prototype, 'render');

    const blockInstance = new TestBlock({ text: 'text' });
    blockInstance.setProps({ text: 'newText' });

    expect(renderSpy.calledTwice).to.be.true;
  });

  it('should not call render when call set props with new value', () => {
    const renderSpy = sandbox.spy(TestBlock.prototype, 'render');

    const blockInstance = new TestBlock({ text: 'text' });
    blockInstance.setProps({ text: 'text' });

    expect(renderSpy.calledOnce).to.be.true;
  });

  it('should call event when event registered', () => {
    const clickSpy = sandbox.spy();

    const blockInstance = new TestBlock({ text: 'text', events: { click: clickSpy } });
    blockInstance._element?.click();

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should have display none after hide', () => {
    const blockInstance = new TestBlock({ text: 'text' });
    blockInstance.hide();

    expect(blockInstance.element?.style.display).to.equal('none');
  });

  it('should have display block after show', () => {
    const blockInstance = new TestBlock({ text: 'text' });

    blockInstance.hide();
    blockInstance.show();

    expect(blockInstance.element?.style.display).to.equal('block');
  });
});
