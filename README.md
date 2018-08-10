# vue-cli-plugin-atomic-design

Vue Atomic Design is an opinionated plugin that follows Atomic Design methodology. Please refer to this [fantastic article written](http://bradfrost.com/blog/post/atomic-web-design/) by Brad Frost for more information.

## Storybook
Vue Atomic Design uses [Storybook](https://storybook.js.org/) as its design system tool. Originally created for React, Storybook is tool for creating UI Components in isolation. The advantage of using Storybook is that we can create our style guide and our project at the very same time without maintaining both which is great for both small and large scale applications.
Once you install the plugin the storybook will be configured and you can use it by running:

```yarn run serve:storybook```

or generate a static style guide:

```yarn run build:storybook```

## Structure
Atomic design has a very clean approach in grouping components through composition which is a a great combination with Vue.js

The summary of Atomic Design structure is as Follows.

### Atoms
An atom is a native html tag. A Vue components that renders only one tag such as  `div`, `p` or any other.

```
// atoms/Button.vue

<template>
  <button class="a-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

```

```
// atoms/Input.vue

<template>
  <input class="a-input" type="text" v-model="value" @input="$emit('input') />
</template>

```

### Molecule

A molecule is a combination of two or several atoms.

```
// molecules/SearchForm.vue

<template>
  <form class="m-search-form">
  	<Input @input="handleInput"/>
  	<Button @click="handleSearch">Search</Button>
  </form>
</template>
```

### Organisms

An organism is a combination of atoms, molecules and other organisms

```
// organsims/Header.vue

<template>
  <header class="o-header">
  	<Logo />
  	<Navigation />
  	<SearchForm />
  </header>
</template>
```

### Templates
A combination of organisms, molecules and atoms to form a complete page. Templates only have dummy placeholder content.

```
// templates/PageTemplate.vue

<template>
  <div class="o-page-template">
    <Hero />
    <Posts />
    <Comments />
  </div>
</template>

```

### Pages

Pages are essentially instances of templates with real representative content. This is generally the point where Vuex connect to the rest of the project. The benefit of this approach is the separation of data and UI and it enables you to create your UI regardless of where your data actually comes from. This also makes the testing much easier.

```
// pages/PostPage.vue

<template>
  <PageTemplate
  	:posts="posts"
  	:hero="hero"
  	:comments="comments"
  />
</template>

<script>
import components from 'components'
import { mapState } from 'vuex'

let { PageTemplate } = components;

export default {
  computed: {
  	mapState({
  	  posts: state => state.posts.postList,
  	  hero: state => state.home.hero,
  	  comments: state => state.comments.commentList,
  	})
  },
  components: {
    PageTemplate
  }
}
</script>

```

Importing each components individually into your project can be very tedious and verbose. Take the following example

```
// organsims/Header.vue

<template>
  <header class="o-header">
  	<Logo />
  	<Navigation />
  	<SearchForm />
  </header>
</template>

<script>
import Logo from '../atoms/Logo/index.vue'
import SearchForm from '../molecules/SearchForm/index.vue'
import Navigation from '../molecules/Navigation/index.vue'
...
```

Using the Webpack method `require.context` Vue Atomic Design automatically grabs every file in component folder and it as a property on the export object from `components/index.js`. So an alternative to the code above would be


```
// organsims/Header.vue

<template>
  <header class="o-header">
  	<Logo />
  	<Navigation />
  	<SearchForm />
  </header>
</template>

<script>
// 'components' is a Webpack alias for './src/components' which is setup on plugin invocation
import components from 'components'

let { Logo, SearchForm, Navigation } = components;
...

```

### Folder Structure

In order to make organisation simpler, each component has a folder with its name which has 3 files in it. `index.vue`, `index.stories.js` and `index.test.js`. With this structure all the tests, stories and the component will be in the same place without clutter. For example:

```
-- components
   -- atoms
      -- Button
         -- index.vue
         -- index.stories.js
         -- index.test.js
      -- Input
         -- index.vue
         -- index.stories.js
         -- index.test.js
   -- molecules
      -- SearchInput
         -- index.vue
         -- index.stories.js
         -- index.test.js
```

With following this structure all of the stories will be created on runtime.


#### Vuex

This plugin takes a [modular](https://vuex.vuejs.org/guide/modules.html) approach to organising Vuex store. Each feature of your app is seperated into a module which include its own state, mutations, actions and getters. For example:

```
-- storeModules
   -- Posts
     -- index.js
   -- Users
     -- index.js
   -- Users
     -- index.js
```

For example storeModules/users/index.js will contain the following:

```
const state = {
  userList: [],
  currentUser: null
}

const mutations = {
  setUsers (state, payload) {
    state.userList = payload
  },

  setCurrentUsers (state, payload) {
    state.currentUser = payload
  }
}

const actions = {
  async getUsers ({ commit }, username) {
    let response = await fetch(`//api.github.com/users`)
    let users = await response.json()
    commit('setUsers', users)
  }
}

export default {
  state,
  mutations,
  actions
}

```

you can then reference this module in your app like:

```
<template>
  <div>
    {{ $store.state.users.userList }}
  </div>
</template>

<script>
  created() {
     $store.dispatch('users/getUsers');
  }
<script>
```

You only need to create the folders under `storeModule` folder and the folder name will be used as namespaced. You do not need to import these modules into your store manually as it's done automatically with Webpack.
