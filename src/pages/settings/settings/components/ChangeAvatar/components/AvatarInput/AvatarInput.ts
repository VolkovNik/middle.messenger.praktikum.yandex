import { Block, BlockPropsType } from '@/utils/block';

import './AvatarInput.scss';

import { template } from './template';

type AvatarInputProps = {
  onChange: (file: File) => void;
}

export class AvatarInput extends Block {
  constructor(props: BlockPropsType & AvatarInputProps) {
    super({
      ...props,
      events: {
        change: (event) => {
          const input = event.target as HTMLInputElement;
          const file = input.files?.[0];
          if (file) {
            props.onChange(file);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, {});
  }
}
