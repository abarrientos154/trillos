<template>
   <div class="q-ma-md q-pa-md column items-center justify-center">
     <div class="text-h6">¡Da a conocer tu taller!</div>
        <div class="text-h8 q-mt-xl">Sube una foto de perfil de tu taller</div>
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
      <q-btn @click="next()" :loading="loading" color="primary" label="Finalizar" rounded no-caps style="width:70%" class="q-py-xs"/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  props: ['form', 'panel'],
  data () {
    return {
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
      perfilFile: null,
      dias: [],
      categorias: [],
      loading: false,
      tiendaFiles: [],
      pagina: '',
      observaciones: '',
      imgPerfil: '',
      imgTienda: [],
      baseu: '',
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
  validations () {
    return {
      form: {
        full_name: { required, maxLength: maxLength(40) },
        hora_inicio: { required },
        hora_fin: { required },
        observaciones: { required }
      },
      dias: { required },
      categorias: { required },
      perfilFile: { required }
    }
  },
  mounted () {
    this.obtenerDatos()
    this.baseu = env.apiUrl
  },
  methods: {
    ...mapMutations('generals', ['login']),
    deleteImg (ind) {
      this.tiendaFiles.splice(ind, 1)
      this.imgTienda.splice(ind, 1)
    },

    categoriasFN (id) {
      const buscar = this.ejemplo.find(v => v._id === id)
      return buscar.name
    },
    diasFN (value) {
      const buscar = this.options_dias.find(v => v.value === value)
      return buscar.label
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
    test () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    },
    async next () {
      this.form.dias = this.dias
      this.form.categorias = this.categorias
      this.$v.form.$touch()
      this.$v.dias.$touch()
      this.$v.categorias.$touch()
      this.$v.perfilFile.$touch()
      if (!this.$v.form.$error && !this.$v.dias.$error && !this.$v.perfilFile.$error && !this.$v.categorias.$error && !this.$v.form.observaciones.$error) {
        this.loading = true
        this.$q.loading.show({
          message: 'Cargando...'
        })
        if (this.tiendaFiles.length > 0) {
          var formData = new FormData()
          formData.append('perfilFile', this.perfilFile)
          this.form.cantidadArchivos = this.tiendaFiles.length
          this.form.status = 0
          this.form.enable = true
          for (let i = 0; i < this.tiendaFiles.length; i++) {
            formData.append('tiendaFiles_' + i, this.tiendaFiles[i])
          }

          for (let i = 0; i < this.form.imgDni.length; i++) {
            formData.append('dniFiles_' + i, this.form.imgDni[i])
          }
          delete this.form.imgDni
          formData.append('dat', JSON.stringify(this.form))
          this.loading = false
          await this.$api.post('register', formData, {
            headers: {
              'Content-Type': undefined
            }
          }).then(res => {
            if (res) {
              this.loading = false
              this.$q.loading.hide()
              this.panel.panel = 'parte_cinco_proveedor_datos'
            }
          })
        } else {
          this.loading = false
          this.$q.loading.hide()
          this.$q.dialog({
            message: 'Debes subir fotos de la tienda.',
            persistent: true
          }).onOk(() => {
          })
        }
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
    },
    obtenerDatos () {
      this.$api.get('categoria').then(res => {
        if (res) {
          this.ejemplo = res
          console.log(this.ejemplo, 'categorias')
        }
      })
    }
  }
}
</script>

<style>

</style>>
