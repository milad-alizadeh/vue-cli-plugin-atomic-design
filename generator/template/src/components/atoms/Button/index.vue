<template>
  <component
    class="a-button"
    :is="type"
    :to="to"
    @click="$emit('click')"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    to: Object,
    href: String
  },
  computed: {
    type () {
      if (this.to) {
        return 'router-link'
      }

      if (this.href) {
        return 'a'
      }

      return 'button'
    }
  }
}
</script>

<style lang="scss">
  .a-button {
    background: grey
  }
</style>
