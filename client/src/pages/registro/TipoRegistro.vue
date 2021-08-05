<template>
  <div>
    <div class="column window-height items-center justify-center">
      <div>
        <q-img src="logo-400x400.png" spinner-color="white" style="width: 300px" />
      </div>
      <div class="text-center text-h6 text-grey-8 q-pa-md">¿Qué quieres ser?</div>
      <div class="row justify-center q-py-md">
        <q-btn style="width: 200px" color="primary" no-caps label="Cliente" @click="$router.push('/registro/cliente')" />
      </div>
      <div class="row justify-center q-pb-md">
        <q-btn style="width: 200px" color="primary" no-caps label="Proveedor" @click="$router.push('/registro/taller')" />
      </div>
      <div class="row justify-center">
        <q-btn style="width: 200px" color="primary" no-caps flat label="Volver" @click="$router.push('/login')" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: left
  padding-top: 30px
  padding-bottom: 30px
  padding-left: 10px
  color: white
  background-color: rgba(0, 0, 0, .3)
  margin-bottom: 40%
</style>
