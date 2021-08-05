<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn @click="$router.go(-1)" color="grey-7" round flat icon="arrow_back"/>
          <div class="column items-center justify-center q-px-md q-pb-md">
            <div class="text-h5 text-center q-my-sm">Información del usuario</div>
            <div class="column items-center q-my-sm">
            <q-avatar size="200px" class="bg-grey row justify-center">
                <q-img :src="perfilFile ? imgPerfil : ''" style="height: 100%">
                <q-file borderless v-model="perfilFile" @input="test()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px" @blur="$v.perfilFile.$touch()">
                    <q-icon name="photo_camera" class="absolute-center" size="50px" color="white" />
                </q-file>
                </q-img>
            </q-avatar>
            <div :class="$v.perfilFile.$error ? 'text-negative' : ''" class="q-my-sm">Sube tu foto de perfil</div>
            </div>
            <div class="row q-pa-sm">
            <div class="col-12">
                <div>Pon tu nombre(s)</div>
                <q-input filled v-model="form.full_name" placeholder="Nombre" outlined dense
                error-message="Ingrese su nombre"
                :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
                />
            </div>
            <div class="col-12">
                <div>Apellido</div>
                <q-input filled v-model="form.last_name" placeholder="Apellido" outlined dense
                error-message="Ingrese su apellido"
                :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"
                />
            </div>
            <div class="col-12">
                <div>Fecha de nacimiento</div>
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
            <div class="col-12">
                <div>Número de contacto</div>
                <q-input filled v-model.number="form.phone" type="number" placeholder="Teléfono" outlined dense
                error-message="Ingrese un número de contacto"
                :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"
                />
            </div>
            <div class="col-12">
                <div>Selecciona tu pais</div>
                <q-select filled v-model="form.country" placeholder="País" outlined dense :options="countries" option-value="_id" option-label="name" emit-value map-options @input="getCitiesByCountry(form.country)" error-message="Ingrese su País" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" />
            </div>
            <div class="col-12">
                <div>Selecciona tu ciudad</div>
                <q-select filled v-model="city" placeholder="Ciudad" outlined dense :options="cities" option-value="_id" option-label="name" emit-value map-options error-message="Ingrese su ciudad" :error="$v.city.$error" @input="form.city = city" @blur="$v.city.$touch()" >
                <template v-slot:no-option>
                    <q-item>
                    <q-item-section class="text-italic text-grey">
                        Selecciona un pais
                    </q-item-section>
                    </q-item>
                </template>
                </q-select>
            </div>
            <div class="col-12">
                <div>Ingresa una dirección</div>
                <q-input filled v-model="form.direccion" placeholder="Dirección" outlined dense
                error-message="Ingrese una dirección"
                :error="$v.form.direccion.$error" @blur="$v.form.direccion.$touch()"
                />
            </div>
            <div class="col-12">
                <div>Introduce tu correo</div>
                <q-input
                filled
                v-model="form.email"
                type="email"
                placeholder="Email"
                outlined
                dense
                error-message="Ingrese un email válido"
                :error="$v.form.email.$error"
                @blur="$v.form.email.$touch()"
                />
            </div>
            <div class="col-12">
                <div>Introduce tu contraseña</div>
                <q-input
                filled
                :type="isPwd ? 'password' : 'text'"
                v-model="password"
                placeholder="Contraseña"
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
            <div class="col-12">
                <div>Repite tu contraseña</div>
                <q-input
                filled
                :type="isPwd2 ? 'password' : 'text'"
                v-model="repeatPassword"
                placeholder="Repita su Contraseña"
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
            <div class="column items-center justify-center q-mb-md" style="padding-top: 20px">
            <q-checkbox v-model="terms" size="xs" label="">
                <div class="text-caption">Acepto Terminos y condiciones de uso</div>
            </q-checkbox>
            <div class="text-negative text-h7" v-if="!terms && appear"> Debe Aceptar los terminos </div>
            </div>
            <div class="row justify-center" style="width:100%">
            <q-btn @click="finalizar()" color="primary" label="Guardar" rounded no-caps style="width:70%" class="q-py-xs"/>
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      perfilFile: null,
      city: null,
      isPwd: true,
      isPwd2: true,
      terms: false,
      appear: false,
      slide: 1,
      imgPerfil: '',
      password: '',
      repeatPassword: '',
      form: {},
      countries: [],
      cities: []
    }
  },
  validations: {
    form: {
      full_name: { required },
      last_name: { required },
      birthdate: { required },
      phone: { required },
      email: { required, email },
      country: { required },
      direccion: { required }
    },
    city: { required },
    perfilFile: { required },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') }
  },
  mounted () {
    this.getCountries()
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async finalizar () {
      this.$v.form.$touch()
      this.$v.city.$touch()
      this.$v.perfilFile.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      if (!this.terms) {
        this.appear = true
      }
      if (!this.$v.form.$error && !this.$v.city.$error && !this.$v.perfilFile.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && this.terms) {
        this.$q.loading.show({
          message: 'Registrando...'
        })
        this.form.password = this.password
        this.form.enable = true
        this.form.roles = 2
        var formData = new FormData()
        formData.append('perfilFile', this.perfilFile)
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
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
          message: 'Debe ingresar todos los datos requeridos',
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
            this.$router.push('/inicio_taller')
          } else {
            this.login(res)
            this.$router.push('/inicio_cliente')
          }
        } else {
          console.log('error de ususario')
        }
        this.$q.loading.hide()
      })
    },
    async getCountries () {
      await this.$api.get('countries').then(res => {
        if (res) {
          this.countries = res
        }
      })
    },
    async getCitiesByCountry (id) {
      this.city = null
      this.$v.city.$reset()
      await this.$api.get('cityByCountry/' + id).then(res => {
        if (res) {
          this.cities = res
        }
      })
    },
    test () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    }
  }
}
</script>
