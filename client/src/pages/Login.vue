<template>
  <div style="height:100%;width:100%">
    <div class="absolute-center" style="width:80%; height:85%">
      <div class="absolute-center full-width">
          <div class="row justify-center">
            <q-img :src="url" spinner-color="white" style="width: 100%"/>
          </div>

          <div class="row justify-center">
            <div class="col-12">Ingresa tu correo</div>
            <q-input
              style="width: 100%"
              autofocus
              filled
              v-model="form.email"
              :error="$v.form.email.$error"
              error-message="Este campo es requerido"
              @blur="$v.form.email.$touch()"
              type="email"
              placeholder="Ingresa tu correo" />
          </div>
          <div class="row justify-center">
            <div class="col-12">Ingresa tu contraseña</div>
            <q-input
              style="width: 100%"
              autofocus
              filled
              v-model="form.password"
              :error="$v.form.password.$error"
              error-message="Este campo es requerido"
              @blur="$v.form.password.$touch()"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Ingresa tu contraseña">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
                </template>
            </q-input>
            <div class="col-12 text-center">Olvide mi contraseña</div>
          </div>

          <div class="q-mt-md row justify-center">
              <q-btn rounded no-caps class="q-py-xs" color="primary" text-color="white" label="Iniciar Sesión" :loading="loading" style="width:80%"
              @click="loguear()"/>
          </div>

          <div class="q-mt-xl row justify-center items-center">
            <div class="col-12 text-center">Soy nuevo en Triyus</div>
            <div>Quiero</div>
            <q-btn flat no-caps dense color="black" label="Registrarme" @click="$router.push('/registro')"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      loading: false,
      form: {
      },
      isPwd: true,
      url: 'logo-400x400.png'
    }
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    loguear () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.loading = true
        this.$q.loading.show({
          message: 'Iniciando sesión'
        })
        this.$api.post('login', this.form).then(res => {
          if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
            // const client = res.TRI_SESSION_INFO.roles.find(value => value === 2)
            if (res.TRI_SESSION_INFO.enable === false) {
              this.loading = false
              this.$q.dialog({
                title: 'Alerta',
                message: 'Este usuario ha sido bloqueado por el administrador. Debe ponerse en contracto con nosotros para más información.',
                cancel: false,
                persistent: true
              }).onOk(() => {
                // ok
              }).onCancel(() => {
                // cancel
              })
            } else if (res.TRI_SESSION_INFO.roles[0] === 3) {
              this.login(res)
              this.$router.push('/inicio_proveedor')
            } else if (res.TRI_SESSION_INFO.roles[0] === 2) {
              this.login(res)
              this.$router.push('/inicio_cliente')
            } else if (res.TRI_SESSION_INFO.roles[0] === 1) {
              this.login(res)
              this.$router.push('/inicio_administrador')
            }
          } else {
            console.log('error de ususario')
            this.loading = false
            this.$q.loading.hide()
          }
          this.$q.loading.hide()
        })
      }
    }
  }

}
</script>

<style>

</style>
