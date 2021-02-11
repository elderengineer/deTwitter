<template>
  <div class="container">
    <div class="navbar navbar-light bg-primary">
      <span class="navbar-brand" href="#">Options</span>
    </div>
    <div class="page">
      <form>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="enabled"
            v-model="enabled"
          />
          <label class="form-check-label" for="enabled">Enable redirect</label>
        </div>

        <h5>Server</h5>
        <div
          class="form-check"
          v-for="instance in serverOptions"
          :key="instance"
        >
          <input
            class="form-check-input"
            type="radio"
            name="instance"
            v-model="server"
            v-bind:value="instance"
          />
          <label class="form-check-label" :id="instance">{{ instance }}</label>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component'
import { Constants } from '../constants'

export default class Options extends Vue {

  public server = Constants.NWITTERS_INSTANCES[0]

  public enabled = true;

  serverOptions = Constants.NWITTERS_INSTANCES

  beforeMount () {
    const result = window.localStorage.getItem(Constants.ENABLED_KEY);
    if (result == null) {
      this.enabled = true;
    } else {
      this.enabled = JSON.parse(result)
    }

    const server = window.localStorage.getItem(Constants.SERVER_KEY);
    if (server != null) {
      this.server = server;
    } 
  }

  beforeUpdate () {
    window.localStorage.setItem(Constants.ENABLED_KEY, JSON.stringify(this.enabled))
    window.localStorage.setItem(Constants.SERVER_KEY, this.server)
  }
}
</script>
<style>
</style>
