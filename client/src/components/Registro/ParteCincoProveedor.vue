<template>
<div>
    <div class="fullscreen bg-white column justify-center items-center">
      <div class="fondo" style="width:100%;height:100%;">
    </div>
      <div class="row absolute-bottom justify-center q-py-md">
        <div class="column items-center justify-center">
          <div class="text-white text-h4 q-pb-lg">Registro Exitoso</div>
          <q-btn @click="onSubmit()" color="primary" label="Ir a mi taller" rounded no-caps style="width:70%" class="q-py-xs"/>
        </div>
      </div>

    </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['form', 'panel'],
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    onSubmit () {
      this.$q.loading.show()
      this.loguear()
    },
    loguear () {
      this.$api.post('login', this.form).then(res => {
        if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
          const client = res.TRI_SESSION_INFO.roles.find(value => value === 2)
          if (!client) {
            this.login(res)
            this.$router.push('/inicio_proveedor')
          } else {
            this.login(res)
            this.$router.push('/inicio_cliente')
          }
        } else {
          console.log('error de ususario')
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style>
.fondo {
  background-image: url('../../../public/nopublicidad.jpg');
  background-size: 100% 100%;
}
</style>
