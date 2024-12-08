import { renderDOM } from '@/utils/renderDOM';
import { Block, BlockPropsType } from '@/utils/block';

export class Route {
  private _pathname: string;

  private readonly _blockClass: typeof Block | null = null;

  private _block: Block | null = null;

  private readonly _props: BlockPropsType = {};

  constructor(pathname: string, view: typeof Block, props: BlockPropsType) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (this._blockClass) {
      this._block = new this._blockClass(this._props);
      renderDOM(this._props.rootQuery as string, this._block);
    }
  }
}
