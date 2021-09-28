<template>
  <div>
    <q-carousel style="height:100%" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn @click="$router.go(-1)" color="grey-7" round flat icon="arrow_back"/>
          <div class="column items-center justify-center q-px-md q-pb-md">
            <div class="text-h5 text-center q-my-sm">Información del usuario</div>
            <div class="column items-center q-my-sm">
            <q-avatar size="200px" class="bg-grey row justify-center">
                <q-img :src="baseu + 'perfil' + form._id" style="height: 100%">
                <q-file borderless v-model="perfilFile" @input="perfil_img()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px">
                    <q-icon name="photo_camera" class="absolute-center" size="50px" color="white" />
                </q-file>
                </q-img>
            </q-avatar>
            <div class="q-my-sm">Foto de perfil</div>
            </div>
            <div class="row q-pa-sm">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div>Nombre Completo</div>
                <q-input filled v-model="form.full_name" placeholder="Nombre" outlined dense
                error-message="Ingrese su nombre"
                :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
                />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div>Apellidos</div>
                <q-input filled v-model="form.last_name" placeholder="Apellido" outlined dense
                error-message="Ingrese su apellido"
                :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"
                />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
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
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div>Número de contacto</div>
                <q-input filled v-model.number="form.phone" type="number" placeholder="Teléfono" outlined dense
                error-message="Ingrese un número de contacto"
                :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"
                />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div>Selecciona tu pais</div>
                <q-select filled v-model="form.country" placeholder="País" outlined dense :options="countries" option-value="_id" option-label="name" emit-value map-options @input="getCitiesByCountry(form.country)" error-message="Ingrese su País" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
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
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div>Ingresa una dirección</div>
                <q-input filled v-model="form.direccion" placeholder="Dirección" outlined dense
                error-message="Ingrese una dirección"
                :error="$v.form.direccion.$error" @blur="$v.form.direccion.$touch()"
                />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div>Tu correo electrónico</div>
                <q-input
                filled
                v-model="form.email"
                type="email"
                placeholder="Email"
                outlined
                dense
                readonly
                />
            </div>
            </div>
            <div class="row justify-center q-pt-md" style="width:100%">
            <q-btn @click="finalizar()" color="primary" label="Guardar" rounded no-caps style="width:70%" class="q-py-xs"/>
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import env from '../../env'
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
      baseu: '',
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
      country: { required },
      direccion: { required }
    },
    city: { required }
  },
  mounted () {
    this.baseu = env.apiUrl + '/perfil_img/'
    this.getCountries()
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.form = v
          this.city = this.form.city
          this.$api.get('cityByCountry/' + this.form.country).then(res => {
            if (res) {
              this.cities = res
            }
          })
        }
      })
    },
    async finalizar () {
      this.$v.form.$touch()
      this.$v.city.$touch()
      if (!this.$v.form.$error && !this.$v.city.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        this.form.city = this.city
        this.$api.put('editar_perfil/' + this.form._id, this.form).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.$q.notify({
              message: 'Datos Modificados con éxito',
              color: 'positive'
            })
            this.$router.go(-1)
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
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
    async perfil_img () {
      if (this.perfilFile) {
        var formData = new FormData()
        var files = []
        files[0] = this.perfilFile
        formData.append('files', files[0])
        await this.$api.post('perfil_imagen', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          location.reload()
        })
      }
    }
  }
}
</script>
