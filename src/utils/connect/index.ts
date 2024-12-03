import { Indexed } from '@/types';
import { StoreEvents } from '@/types/store';

import { isEqual } from '../isEqual';
import { Block, BlockPropsType } from '../block';
import { store } from '../store';

// eslint-disable-next-line max-len
export const connect = (mapStateToProps: (state: Indexed) => Indexed) => (Component: typeof Block) => class extends Component {
  constructor(props: BlockPropsType) {
    const state = mapStateToProps(store.getState());

    super({ ...props, ...state });

    store.on(StoreEvents.Updated, () => {
      const newState = mapStateToProps(store.getState());
      if (!isEqual(state, newState)) {
        this.setProps({ ...newState });
      }
    });
  }
};
