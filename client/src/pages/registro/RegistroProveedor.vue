<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn @click="$router.go(-1)" color="grey-7" round flat icon="arrow_back"/>
          <div class="column items-center justify-center q-px-md q-pb-md">
            <div class="text-subtitle1 text-center">Información Representante legal</div>
                <div class="row q-pa-sm q-mt-lg">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="text-caption">Introduce tu nombre(s)</div>
                    <q-input
                        v-model="form.name"
                        placeholder="Pedro Ignacio"
                        outlined
                        filled
                        dense
                        error-message="Ingrese su nombre"
                        :error="$v.form.name.$error"
                        @blur="$v.form.name.$touch()"
                    />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="text-caption">Apellido paterno y materno</div>
                    <q-input
                        v-model="form.last_name"
                        placeholder="Martinez Vuelta"
                        outlined
                        filled
                        dense
                        error-message="Ingrese sus Apellidos"
                        :error="$v.form.last_name.$error"
                        @blur="$v.form.last_name.$touch()"
                    />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="text-caption">Fecha de nacimiento</div>
                    <q-input filled readonly dense v-model="form.fecha" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
                        error-message="Este campo es requerido" :error="$v.form.fecha.$error" @blur="$v.form.fecha.$touch()">
                        <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="form.fecha" mask="DD/MM/YYYY">
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
                    <div class="text-caption">Introduce tu correo</div>
                    <q-input
                        v-model="form.email"
                        type="email"
                        label="Email"
                        outlined
                        filled
                        dense
                        error-message="Ingrese un email válido"
                        :error="$v.form.email.$error"
                        @blur="$v.form.email.$touch()"
                    />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="text-caption">Introduce tu contraseña</div>
                    <q-input
                        :type="isPwd ? 'password' : 'text'"
                        v-model="password"
                        label="Contraseña"
                        outlined
                        filled
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
                    <div class="text-caption">Repite tu contraseña</div>
                    <q-input
                        :type="isPwd2 ? 'password' : 'text'"
                        v-model="repeatPassword"
                        label="Repita su contraseña"
                        outlined
                        filled
                        dense
                        error-message="Las contraseñas deben ser iguales"
                        :error="$v.repeatPassword.$error"
                        @blur="$v.repeatPassword.$touch()" >
                        <template v-slot:append>
                        <q-icon :name="isPwd2 ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwd2 = !isPwd2" />
                        </template>
                    </q-input>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="text-caption">Numero de Identificacion</div>
                    <q-input
                        v-model="form.Dni"
                        placeholder="177.065.123-4"
                        outlined
                        filled
                        dense
                        error-message="Ingrese su Numero de Identificacion"
                        :error="$v.form.Dni.$error"
                        @blur="$v.form.Dni.$touch()"
                    />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="text-subtitle2">Documento de Identificacion</div>
                    <div class="text-caption text-grey-8 q-mb-xs">Sube una foto por cada lado de tu identificacion</div>
                    <div class="row q-gutter-sm q-mb-sm">
                    <div class="col-7">
                        <div class="text-caption">Carga la parte frontal de tu documento de identidad</div>
                        <q-avatar rounded style="height: 50px; width: 100%;" class="bg-primary">
                        <q-file  borderless v-model="ident1" @input="imgIdentificacion(1)" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%; font-size: 0px;">
                            <div class="absolute-center text-center text-white full-width text-subtitle1">Cargar imagen</div>
                        </q-file>
                        </q-avatar>
                        <q-avatar class="bg-grey q-mt-sm" rounded style="height: 50px; width: 100%">
                        <q-img style="height: 100%;" :src="imgIdent1 ? imgIdent1 : ''"/>
                        <div class="absolute-center text-center text-negative full-width text-subtitle1" v-if="$v.ident1.$error">Imagen requerida</div>
                        </q-avatar>
                    </div>
                    <div class="col-7">
                        <div class="text-caption">Carga la parte trasera de tu documento de identidad</div>
                        <q-avatar rounded style="height: 50px; width: 100%;" class="bg-primary">
                        <q-file  borderless v-model="ident2" @input="imgIdentificacion(2)" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%; font-size: 0px;">
                            <div class="absolute-center text-center text-white full-width text-subtitle1">Cargar imagen</div>
                        </q-file>
                        </q-avatar>
                        <q-avatar class="bg-grey q-mt-sm" rounded style="height: 50px; width: 100%">
                        <q-img style="height: 100%;" :src="imgIdent2 ? imgIdent2 : ''"/>
                        <div class="absolute-center text-center text-negative full-width text-subtitle1" v-if="$v.ident2.$error">Imagen requerida</div>
                        </q-avatar>
                    </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <q-checkbox v-model="Terminos" :class="textColorBanco" @input="Terminos ? textColorBanco = 'text-black' : ''" label="Acepto términos y condiciones de uso" />
                </div>
            </div>
            <div class="row justify-center" style="width:100%">
                <q-btn @click="siguiente1()" color="primary" label="Siguiente" rounded no-caps style="width:70%" class="q-py-xs"/>
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat round color="grey-7" icon="arrow_back" @click="slide = 1"/>
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
            <q-btn @click="siguiente2()" color="primary" label="Siguiente" rounded no-caps style="width:70%" class="q-py-xs"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
            <q-btn flat round color="grey-7" icon="arrow_back" @click="slide = 2"/>
            <div class="text-h6 text-center">¡Da a conocer tu taller!</div>
            <div class="text-h8 q-mt-lg text-center">Sube una foto de perfil de tu taller</div>
            <div class="column q-mt-sm items-center justify-center">
                <q-avatar size="170px">
                    <img  :src="imgPerfil ? imgPerfil : 'noimg.png'">
                    <q-file borderless v-model="perfilFile" class="absolute-center button-camera" @input="test" accept=".jpg, image/*"
                        style="z-index:1;font-size:0px; width: 100%; height: 100%;" @blur="$v.perfilFile.$touch()">
                        <q-icon name="photo_camera" class="absolute-center" size="25px" color="white" />
                    </q-file>
                </q-avatar>
                <p v-if="$v.perfilFile.$error" class="text-subtitle1 text-red" > Ingresa tu foto de perfil </p>
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
                        <q-file max-files="5" style="width:100%;height:100%; font-size: 0px" @input="tienda" accept=".jpg, image/*" multiple append v-model="tiendaFiles" borderless>
                            <div class="absolute-center column items-center">
                            <q-icon name="file_upload" size="40px" color="grey" />
                            </div>
                        </q-file>
                        </q-card>
                        <q-card style="width:60px;height:60px" v-for="(item, index) in imgTienda" class="shadow-3" :key="index">
                        <q-btn @click="deleteImg(index)" color="negative" icon="close" style="position:absolute;top:0px;right:0px;z-index:1" flat round dense size="xs" />
                        <div v-ripple style="width:60px;height:60px">
                            <q-img
                            :src="imgTienda.length > 0 ? imgTienda[index] : 'favicon.ico'"
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

      <q-carousel-slide :name="4" class="q-pa-none">
        <div class="column window-height items-center justify-center">
            <div>
                <q-img src="logo-400x400.png" spinner-color="white" style="width: 300px" />
            </div>
            <div class="text-center text-h6 text-grey-8 q-pa-md">Registro Exitoso</div>
            <div class="row justify-center q-py-md">
                <q-btn style="width: 200px" color="primary" no-caps label="Ir a mi taller" @click="loguear()" />
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
      ident1: null,
      ident2: null,
      perfilFile: null,
      city: null,
      isPwd: true,
      isPwd2: true,
      Terminos: false,
      slide: 1,
      textColorBanco: 'text-black',
      imgIdent1: '',
      imgIdent2: '',
      imgPerfil: '',
      password: '',
      repeatPassword: '',
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
      identFiles: [],
      tiendaFiles: [],
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
      name: { required },
      last_name: { required },
      fecha: { required },
      email: { required, email },
      Dni: { required },
      country: { required },
      direccion: { required },
      full_name: { required, maxLength: maxLength(40) },
      hora_inicio: { required },
      hora_fin: { required },
      observaciones: { required }
    },
    ident1: { required },
    ident2: { required },
    city: { required },
    dias: { required },
    categorias: { required },
    perfilFile: { required },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') }
  },
  mounted () {
    this.getCountries()
    this.obtenerDatos()
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async siguiente1 () {
      this.$v.form.email.$touch()
      this.$v.form.name.$touch()
      this.$v.form.last_name.$touch()
      this.$v.form.fecha.$touch()
      this.$v.form.Dni.$touch()
      this.$v.ident1.$touch()
      this.$v.ident2.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      if (!this.Terminos) {
        this.textColorBanco = 'text-red'
      }
      if (!this.$v.ident1.$error && !this.$v.ident2.$error && !this.$v.form.email.$error && !this.$v.form.name.$error && !this.$v.form.last_name.$error && !this.$v.form.fecha.$error && !this.$v.form.Dni.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && this.Terminos) {
        this.identFiles[0] = this.ident1
        this.identFiles[1] = this.ident2
        await this.$api.get('validate_email/' + this.form.email).then(res => {
          if (res) {
            this.form.password = this.password
            this.form.cantidadArchivosDni = this.identFiles.length
            this.form.imgDni = this.identFiles
            this.slide = 2
          }
        })
      }
    },
    siguiente2 () {
      this.$v.form.country.$touch()
      this.$v.form.direccion.$touch()
      this.$v.city.$touch()
      if (!this.$v.form.country.$error && !this.$v.form.direccion.$error && !this.$v.city.$error) {
        this.form.city = this.city
        this.slide = 3
      }
    },
    async finalizar () {
      this.$v.form.full_name.$touch()
      this.$v.form.hora_inicio.$touch()
      this.$v.form.hora_fin.$touch()
      this.$v.form.observaciones.$touch()
      this.$v.dias.$touch()
      this.$v.categorias.$touch()
      this.$v.perfilFile.$touch()
      if (!this.$v.dias.$error && !this.$v.categorias.$error && !this.$v.perfilFile.$error && !this.$v.form.full_name.$error && !this.$v.form.hora_inicio.$error && !this.$v.form.hora_fin.$error && !this.$v.form.observaciones.$error) {
        if (this.tiendaFiles.length > 0) {
          this.$q.loading.show({
            message: 'Registrando...'
          })
          var formData = new FormData()
          formData.append('perfilFile', this.perfilFile)
          this.form.cantidadArchivos = this.tiendaFiles.length
          this.form.status = 0
          this.form.enable = true
          this.form.roles = 3
          this.form.dias = this.dias
          this.form.categorias = this.categorias
          for (let i = 0; i < this.tiendaFiles.length; i++) {
            formData.append('tiendaFiles_' + i, this.tiendaFiles[i])
          }

          for (let i = 0; i < this.form.imgDni.length; i++) {
            formData.append('dniFiles_' + i, this.form.imgDni[i])
          }
          delete this.form.imgDni
          formData.append('dat', JSON.stringify(this.form))
          await this.$api.post('register', formData, {
            headers: {
              'Content-Type': undefined
            }
          }).then(res => {
            if (res) {
              this.$q.loading.hide()
              this.slide = 4
            }
          })
        } else {
          this.$q.loading.hide()
          this.$q.dialog({
            message: 'Debes subir fotos de la tienda.',
            persistent: true
          }).onOk(() => {
          })
        }
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
    imgIdentificacion (val) {
      var img = ''
      var cc = {}
      if (val === 1) {
        cc = this.ident1
        img = URL.createObjectURL(cc)
        this.imgIdent1 = img
      } else {
        cc = this.ident2
        img = URL.createObjectURL(cc)
        this.imgIdent2 = img
      }
    },
    tienda () {
      var img = ''
      var cc = {}
      if (this.tiendaFiles.length > 0) {
        cc = this.tiendaFiles[this.tiendaFiles.length - 1]
        img = URL.createObjectURL(cc)
        this.imgTienda.push(img)
      }
    },
    deleteImg (ind) {
      this.tiendaFiles.splice(ind, 1)
      this.imgTienda.splice(ind, 1)
    },
    test () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    }
  }
}
</script>
