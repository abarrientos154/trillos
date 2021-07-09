<template>
<div class="q-ma-md">
  <div class="column items-center justify-center">
  <div class="text-subtitle1 text-center">Informacion Representante legal</div>
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
          <q-file borderless  class="button-camera" color="white" max-files="2" @input="tienda" accept=".jpg, image/*"
            multiple append v-model="tiendaFiles" label="Subir archivo" label-color="white" :disable="tiendaFiles.length >= 2">
          </q-file>
          <div style="width: 100%" class="q-mt-sm row justify-center">
            <q-card flat v-for="(item, index) in imgTienda" :key="index" class="q-pa-sm">
              <q-img
                :src="imgTienda.length > 0 ? imgTienda[index] : 'favicon.ico'"
                style="width:110px"
              />
              <q-btn @click="deleteImg(index)" color="negative" icon="delete" style="position:absolute;top:0px;right:0px" flat round />
            </q-card>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <q-checkbox v-model="Terminos" :class="textColorBanco" @input="Terminos ? textColorBanco = 'text-black' : ''" label="Acepto términos y condiciones de uso" />
        </div>
    </div>
    <div class="row justify-center" style="width:100%">
      <q-btn @click="next()" color="primary" label="Siguiente" rounded no-caps style="width:70%" class="q-py-xs"/>
    </div>
    </div>
</div>
</template>

<script>
import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
import { AnimationVueTransition, AnimationVueTransitionType } from 'vue-animation'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition
  },
  props: ['form', 'panel'],
  data () {
    return {
      repeatPassword: '',
      isPwd: true,
      tiendaFiles: [],
      imgTienda: [],
      Terminos: false,
      textColorBanco: 'text-black',
      isPwd2: true,
      password: '',
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  validations () {
    return {
      form: {
        email: { required, email },
        name: { required },
        last_name: { required },
        fecha: { required },
        Dni: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    async next () {
      if (this.panel.panel === 'parte_dos_proveedor') {
        this.$v.form.email.$touch()
        this.$v.form.name.$touch()
        this.$v.form.last_name.$touch()
        this.$v.form.fecha.$touch()
        this.$v.form.Dni.$touch()
        this.$v.password.$touch()
        this.$v.repeatPassword.$touch()
        if (!this.Terminos) {
          this.textColorBanco = 'text-red'
        }
        if (!this.$v.form.email.$error && !this.$v.form.name.$error && !this.$v.form.last_name.$error && !this.$v.form.fecha.$error && !this.$v.form.Dni.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && this.Terminos) {
          if (this.tiendaFiles.length >= 2) {
            this.$q.loading.show()
            await this.$api.get('validate_email/' + this.form.email).then(res => {
              if (res) {
                this.form.password = this.password
                this.form.cantidadArchivosDni = this.tiendaFiles.length
                this.form.imgDni = this.tiendaFiles
                this.panel.panel = 'parte_tres_proveedor_datos'
                this.$q.loading.hide()
              }
            })
          } else {
            this.$q.dialog({
              message: 'Debes ingresar tus Fotos de identificacion.',
              persistent: true
            }).onOk(() => {
            })
          }
        }
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
    }
  }
}
</script>

<style scoped lang="scss">
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  background-color: $primary;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width:120px
}
</style>
