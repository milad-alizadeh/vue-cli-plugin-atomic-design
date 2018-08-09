import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import Button from './index.vue'

storiesOf('Atom - Button', module)
  .addDecorator(VueInfoAddon)
  .add('default', () => ({
    components: { Button },
    template: '<Button>rounded</Button>'
  }))
  .add('link', () => ({
    components: { Button },
    template: '<Button link="http://google.com">rounded</Button>'
  }))
