<template>
   <div class="column">
    <div class="row justify-center q-my-sm">
      <q-avatar size="200px" class="bg-grey row justify-center">
        <q-img :src="perfilFile ? imgPerfil : ''" style="height: 100%">
          <q-file borderless v-model="perfilFile" @input="test()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px">
            <q-icon name="photo_camera" class="absolute-center" size="50px" color="white" />
          </q-file>
        </q-img>
      </q-avatar>
    </div>
    <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold">Pon tu nombre(s)</div>
        <q-input filled v-model="form.full_name" label="Nombre" outlined dense
          error-message="Ingrese su nombre"
          :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold">Apellido paterno y materno</div>
        <q-input filled v-model="form.last_name" label="Apellido" outlined dense
          error-message="Ingrese su nombre"
          :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input filled readonly dense v-model="form.birthdate" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
        error-message="Este campo es requerido" :error="$v.form.birthdate.$error" @blur="$v.form.birthdate.$touch()">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="form.birthdate" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Cerrar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold">Selecciona tu pais</div>
        <q-select filled v-model="form.country" label="País" outlined dense :options="['Argentina', 'Chile']" error-message="Ingrese su País" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold">Selecciona tu ciudad</div>
        <q-select filled v-model="form.city" label="Ciudad" outlined dense :options="['ciudad1', 'ciudad2']" error-message="Ingrese su ciudad" :error="$v.form.city.$error" @blur="$v.form.city.$touch()" />
      </div>
      <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input
          filled
          v-model="form.email"
          type="email"
          label="Email"
          outlined
          dense
          error-message="Ingrese un email válido"
          :error="$v.form.email.$error"
          @blur="$v.form.email.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input
          filled
          :type="isPwd ? 'password' : 'text'"
          v-model="password"
          label="Contraseña"
          outlined
          dense
          error-message="Ingrese una contraseña válida, mínimo 6 caracteres"
          :error="$v.password.$error"
          @blur="$v.password.$touch()">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input
          filled
          :type="isPwd2 ? 'password' : 'text'"
          v-model="repeatPassword"
          label="Repita su Contraseña"
          outlined
          dense
          error-message="Las contraseñas deben ser iguales"
          :error="$v.repeatPassword.$error"
          @blur="$v.repeatPassword.$touch()" >
          <template v-slot:append>
            <q-icon :name="isPwd2 ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwd2 = !isPwd2" />
          </template>
          </q-input>
      </div>
    </div>
      <!-- <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.direccion" label="Dirección" outlined dense
          error-message="Ingrese su Dirección"
          :error="$v.form.direccion.$error" @blur="$v.form.direccion.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input :disable="form.country ? false : true" v-model="form.run_dni" :label="form.country === 'Chile' ? 'Ingrese RUN' : form.country === 'Argentina' ? 'Ingrese DNI' : 'Debes seleccionar un país'" outlined dense
          error-message="Ingrese RUN O DNI"
          :error="$v.form.run_dni.$error" @blur="$v.form.run_dni.$touch()"
        />
      </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <q-input v-model="form.phone" type="tel" label="Telefono" outlined dense
            error-message="Ingrese el número de su Teléfono"
            :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()" />
        </div> -->
        <!-- <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <q-file bottom-slots accept=".jpg, image/*" v-model="perfilFile" hint="Foto de Perfil" outlined label="" @input="test"
              error-message="Debes subir una foto de perfil"
              :error="$v.perfilFile.$error" @blur="$v.perfilFile.$touch()">
              <template v-slot:prepend>
                <q-avatar>
                  <img  :src="imgPerfil ? imgPerfil : 'favicon.ico'">
                </q-avatar>
              </template>
              <template v-slot:append>
                <q-icon name="close" color="negative" @click.stop="perfilFile = null" class="cursor-pointer" />
              </template>
            </q-file>
          </div> -->
    </div>
    <div class="column items-center justify-center q-mb-md" style="padding-top: 20px">
      <q-checkbox v-model="terms" size="xs" label="">
        <div class="text-caption">Acepto Terminos y condiciones de uso</div>
      </q-checkbox>
      <div class="text-negative text-h7" v-if="!terms && appear"> Debe Aceptar los terminos </div>
    </div>
    <div class="row justify-center">
      <!-- <q-btn @click="panel.panel = 'parte_dos'" color="primary" push label="Atras" flat/>
      <q-space /> -->
      <q-btn @click="next()" style="border-radius:25px; width: 70%" :loading="loading"  color="primary" push label="Guardar" class="q-px-xl q-py-sm"/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      perfilFile: null,
      imgPerfil: '',
      loading: false,
      baseu: '',
      terms: false,
      appear: false,
      isPwd: true,
      password: '',
      repeatPassword: ''
    }
  },
  validations () {
    return {
      form: {
        full_name: { required, maxLength: maxLength(40) },
        last_name: { required },
        country: { required },
        city: { required },
        birthdate: { required },
        email: { required, email }
        /* direccion: { required },
        run_dni: { required },
        phone: { required } */
      },
      perfilFile: { required },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  mounted () {
    this.baseu = env.apiUrl
  },
  methods: {
    ...mapMutations('generals', ['login']),
    test () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    },
    async next () {
      this.$v.form.$touch()
      this.$v.repeatPassword.$touch()
      this.$v.password.$touch()
      this.$v.perfilFile.$touch()
      if (!this.terms) {
        this.appear = true
      }
      if (!this.$v.form.$error && !this.$v.perfilFile.$error && this.terms && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.loading = true
        this.$q.loading.show({
          message: 'Cargando...'
        })
        this.form.password = this.password
        this.form.enable = true
        var formData = new FormData()
        formData.append('perfilFile', this.perfilFile)
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.loading = false
            this.$q.loading.hide()
            this.$q.notify({
              message: 'Ya formas parte de Triyus, Bienvenido',
              color: 'positive'
            })
            this.loguear()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debes ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
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
          // this.loading = false
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style>

</style>>
