<template>
  <div>
    <q-carousel style="height:100%" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat round color="grey-7" icon="arrow_back" @click="$router.go(-1)"/>
          <div class="text-h6 text-center">¿Dónde estará mi taller?</div>
          <div class="row justify-center q-mt-md">
            <img src="nopublicidad.jpg" style="width: 80%;height:200px; border-radius: 15px">
          </div>

          <div class="row q-pa-sm">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="text-caption">País</div>
                <q-select filled v-model="form.country" label="País" outlined dense :options="countries" option-value="_id" option-label="name" emit-value map-options @input="getCitiesByCountry(form.country)" error-message="Ingrese un País" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="text-caption">Ciudad</div>
                <q-select filled v-model="city" label="Ciudad" outlined dense :options="cities" option-value="_id" option-label="name" emit-value map-options error-message="Ingrese su ciudad" :error="$v.city.$error" @blur="$v.city.$touch()" >
                <template v-slot:no-option>
                    <q-item>
                    <q-item-section class="text-italic text-grey">
                        Selecciona un país
                    </q-item-section>
                    </q-item>
                </template>
                </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="text-caption">Dirección física del taller</div>
                <q-input
                    v-model="form.direccion"
                    placeholder="Mi direccion #1234"
                    outlined
                    filled
                    dense
                    error-message="Ingrese su Direccion"
                    :error="$v.form.direccion.$error"
                    @blur="$v.form.direccion.$touch()"
                />
            </div>
          </div>
          <div class="row justify-center" style="width:100%">
            <q-btn @click="siguiente()" color="primary" label="Siguiente" rounded no-caps style="width:70%" class="q-py-xs"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
            <q-btn flat round color="grey-7" icon="arrow_back" @click="slide = 1"/>
            <div class="text-h6 text-center">¡Da a conocer tu taller!</div>
            <div class="text-h8 q-mt-lg text-center">Sube una foto de perfil de tu taller</div>
            <div class="column q-mt-sm items-center justify-center">
                <q-avatar size="170px">
                    <img  :src="baseu + 'perfil' + form._id">
                    <q-file borderless v-model="perfilFile" class="absolute-center button-camera" @input="perfil_img()" accept=".jpg, image/*"
                        style="z-index:1;font-size:0px; width: 100%; height: 100%;">
                        <q-icon name="photo_camera" class="absolute-center" size="25px" color="white" />
                    </q-file>
                </q-avatar>
            </div>
            <div class="row q-pa-sm">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="text-caption">¿Cual es el nombre de tu taller</div>
                    <q-input
                    v-model="form.full_name"
                    placeholder="Mi taller Triyus"
                    outlined
                    filled
                    dense
                    error-message="Ingrese el nombre de su taller"
                    :error="$v.form.full_name.$error"
                    @blur="$v.form.full_name.$touch()"
                    />
                </div>

                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="text-caption">¿Cual es la descripción te su taller?</div>
                <q-input
                    v-model="form.observaciones"
                    placeholder="Mi taller tiene 4 años..."
                    filled
                    type="textarea"
                    error-message="Ingrese una descripción"
                    :error="$v.form.observaciones.$error"
                    @blur="$v.form.observaciones.$touch()"
                />
                </div>

                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="text-caption">Servicios que quiero realizar </div>
                    <q-select
                    outlined
                    v-model="categorias"
                    :options="ejemplo"
                    label="Selecciona las categorias"
                    multiple
                    filled
                    emit-value
                    option-value="_id"
                    option-label="name"
                    map-options
                    error-message="Ingrese las categorias de la empresa"
                    :error="$v.categorias.$error" @blur="$v.categorias.$touch()"
                >
                    <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item
                        v-bind="itemProps"
                        v-on="itemEvents"
                    >
                        <q-item-section>
                        <q-item-label v-html="opt.name" ></q-item-label>
                        </q-item-section>
                        <q-item-section side>
                        <q-checkbox :value="selected" @input="toggleOption(opt)" />
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>
                </div>
                <q-scroll-area
                    v-if="categorias.length"
                    class="col-12"
                    horizontal
                    style="height: 100px"
                    :thumb-style="thumbStyle"
                    :bar-style="barStyle"
                >
                    <div class="row no-wrap q-py-md q-px-md q-gutter-md">
                    <div v-for="(btn, index) in categorias" :key="index" >
                        <q-btn  no-caps class="q-px-md" :label="categoriasFN(btn)" :color="'blue-grey-11'" text-color="blue-grey-9"
                        style="width:180px" />
                    </div>
                    </div>
                </q-scroll-area>

                <div class="column" style="width:100%">
                    <div class="q-mb-xs">Sube hasta 5 fotos de tu taller</div>
                    <q-scroll-area horizontal style="height: 70px;width:100%" :thumb-style="thumbStyle" :bar-style="barStyle">
                    <div class="row items-center no-wrap q-px-md q-gutter-md">
                        <q-card style="width:60px;height:60px" class="bg-grey-4">
                        <q-file style="width:100%;height:100%; font-size: 0px" @input="addImg()" accept=".jpg, image/*" v-model="tiendaFiles" borderless :disable="form.tiendaFiles && form.tiendaFiles.length > 4 ? true : false">
                            <div class="absolute-center column items-center">
                            <q-icon name="file_upload" size="40px" color="grey" />
                            </div>
                        </q-file>
                        </q-card>
                        <q-card style="width:60px;height:60px" v-for="(item, index) in form.tiendaFiles" class="shadow-3" :key="index">
                        <q-btn @click="deleteimg(item)" color="negative" icon="close" style="position:absolute;top:0px;right:0px;z-index:1" flat round dense size="xs" />
                        <div v-ripple style="width:60px;height:60px">
                            <q-img
                            :src="form.tiendaFiles ? baseu2 + item : 'noimgpro.png'"
                            style="width:60px;height:60px"
                            />
                        </div>
                        </q-card>
                    </div>
                    </q-scroll-area>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mt-md">
                    <div class="text-caption">Selecciona tus días de atención</div>
                    <q-select
                    filled
                    v-model="dias"
                    :options="options_dias"
                    label="Días laborables"
                    multiple
                    emit-value
                    map-options
                    error-message="Ingrese los días laborables de la empresa"
                    :error="$v.dias.$error" @blur="$v.dias.$touch()"
                >
                    <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item
                        v-bind="itemProps"
                        v-on="itemEvents"
                    >
                        <q-item-section>
                        <q-item-label v-html="opt.label" ></q-item-label>
                        </q-item-section>
                        <q-item-section side>
                        <q-checkbox :value="selected" @input="toggleOption(opt)" />
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>
                </div>
                <q-scroll-area
                    v-if="dias.length"
                    class="col-12"
                    horizontal
                    style="height: 70px"
                    :thumb-style="thumbStyle"
                    :bar-style="barStyle"
                >
                    <div class="row no-wrap q-py-md q-px-md q-gutter-md">
                    <div v-for="(btn, index) in dias" :key="index" >
                        <q-btn  no-caps class="q-px-md" :label="diasFN(btn)" :color="'blue-grey-11'" text-color="blue-grey-9"
                        style="width:100px" />
                    </div>
                    </div>
                </q-scroll-area>

                <div class="text-caption">Seleccione los horarios de apertura y cierre</div>
                <div class="q-gutter-sm row justify-between">
                    <q-input label="Apertura" filled readonly v-model="form.hora_inicio" placeholder="--:--" @click="$refs.qTimeProxy1.show()"
                    error-message="Ingrese la hora de inicio laboral"
                    :error="$v.form.hora_inicio.$error" @blur="$v.form.hora_inicio.$touch()" style="width:125px">
                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy ref="qTimeProxy1" transition-show="scale" transition-hide="scale">
                            <q-time v-model="form.hora_inicio">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Cerrar" color="primary" flat />
                            </div>
                            </q-time>
                        </q-popup-proxy>
                        </q-icon>
                    </template>
                    </q-input>

                    <q-input label="Cierre" readonly filled v-model="form.hora_fin" placeholder="--:--" @click="$refs.qTimeProxy2.show()"
                    error-message="Ingrese la hora de cierre laboral"
                    :error="$v.form.hora_fin.$error" @blur="$v.form.hora_fin.$touch()" style="width:115px">
                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy ref="qTimeProxy2" transition-show="scale" transition-hide="scale">
                            <q-time v-model="form.hora_fin">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Cerrar" color="primary" flat />
                            </div>
                            </q-time>
                        </q-popup-proxy>
                        </q-icon>
                    </template>
                    </q-input>
                </div>
            </div>
            <div class="row justify-center" style="width:100%">
                <q-btn @click="finalizar()" color="primary" label="Finalizar" rounded no-caps style="width:70%" class="q-py-xs"/>
            </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      perfilFile: null,
      tiendaFiles: [],
      city: null,
      slide: 1,
      baseu: '',
      baseu2: '',
      form: {},
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0
      },
      imgTienda: [],
      countries: [],
      cities: [],
      dias: [],
      categorias: [],
      ejemplo: [],
      options: [
        {
          label: 'Taller Pintura o carrocería',
          value: 1
        },
        {
          label: 'Repuestos o Autopartes',
          value: 2
        },
        {
          label: 'Gomería o Neumáticos',
          value: 3
        },
        {
          label: 'Taller Mecánica',
          value: 4
        },
        {
          label: 'Taller Electricidad',
          value: 5
        }
      ],
      options_dias: [
        {
          label: 'Lunes',
          value: 1
        },
        {
          label: 'Martes',
          value: 2
        },
        {
          label: 'Miércoles',
          value: 3
        },
        {
          label: 'Jueves',
          value: 4
        },
        {
          label: 'Viernes',
          value: 5
        },
        {
          label: 'Sábado',
          value: 6
        },
        {
          label: 'Domingo',
          value: 0
        }
      ]
    }
  },
  validations: {
    form: {
      country: { required },
      direccion: { required },
      full_name: { required, maxLength: maxLength(40) },
      hora_inicio: { required },
      hora_fin: { required },
      observaciones: { required }
    },
    city: { required },
    dias: { required },
    categorias: { required }
  },
  mounted () {
    this.baseu = env.apiUrl + '/perfil_img/'
    this.baseu2 = env.apiUrl + '/tienda_img/'
    this.getCountries()
    this.obtenerDatos()
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.form = v
          this.city = this.form.city
          this.dias = this.form.dias
          this.categorias = this.form.categorias
          this.$api.get('cityByCountry/' + this.form.country).then(res => {
            if (res) {
              this.cities = res
            }
          })
          console.log('data', this.form)
        }
      })
    },
    siguiente () {
      this.$v.form.country.$touch()
      this.$v.form.direccion.$touch()
      this.$v.city.$touch()
      if (!this.$v.form.country.$error && !this.$v.form.direccion.$error && !this.$v.city.$error) {
        this.form.city = this.city
        this.slide = 2
      }
    },
    async finalizar () {
      this.$v.form.full_name.$touch()
      this.$v.form.hora_inicio.$touch()
      this.$v.form.hora_fin.$touch()
      this.$v.form.observaciones.$touch()
      this.$v.dias.$touch()
      this.$v.categorias.$touch()
      if (!this.$v.dias.$error && !this.$v.categorias.$error && !this.$v.form.full_name.$error && !this.$v.form.hora_inicio.$error && !this.$v.form.hora_fin.$error && !this.$v.form.observaciones.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        this.form.dias = this.dias
        this.form.categorias = this.categorias
        this.$api.put('editar_perfil/' + this.form._id, this.form).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.$q.notify({
              message: 'Datos Modificados con exito',
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
    obtenerDatos () {
      this.$api.get('categoria').then(res => {
        if (res) {
          this.ejemplo = res
        }
      })
    },
    categoriasFN (id) {
      const buscar = this.ejemplo.find(v => v._id === id)
      return buscar.name
    },
    diasFN (value) {
      const buscar = this.options_dias.find(v => v.value === value)
      return buscar.label
    },
    async addImg () {
      if (this.tiendaFiles) {
        var formData = new FormData()
        var files = []
        files[0] = this.tiendaFiles
        formData.append('files', files[0])
        await this.$api.post('subir_archivo_proveedor', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.form.tiendaFiles = res.tiendaFiles
        })
      }
    },
    async deleteimg (item) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar esta imagen?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.get('eliminar_imagen_tienda/' + item).then(res => {
          this.$q.notify({
            color: 'positive',
            message: 'Eliminado Correctamente'
          })
          this.form.tiendaFiles = res.tiendaFiles
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
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
