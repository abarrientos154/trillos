<template>
  <div>
    <q-separator inset />
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center estilo-titulos">Datos de Perfil</div>
        <div v-if="datosusuario">
           <q-card class="bg-amber-1 q-pa-lg q-ma-md shadow-3">
                <div class="row justify-center items-center">
                        <div class="column">
                          <q-avatar size="180px">
                            <img  :src="baseu + 'perfil' + form._id">
                            <q-file borderless v-model="perfilFile" class="absolute-center button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1">
                              <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
                            </q-file>
                          </q-avatar>
                        </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form.full_name" label="Nombre" outlined dense
                        error-message="Ingrese su nombre"
                        :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form.last_name" label="Apellido" outlined dense
                      />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-select v-model="form.country" label="País" outlined dense :options="['Colombia', 'Chile']" error-message="Ingrese su País" />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <q-input :disable="form.country ? false : true" v-model="form.run_dni" :label="form.country === 'Chile' ? 'Ingrese RUN' : form.country === 'Colombia' ? 'Ingrese DNI' : 'Debes seleccionar un país'" outlined dense
                        />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form.direccion" label="Dirección" outlined dense
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form.phone" type="tel" label="Telefono" outlined dense />
                    </div>

                  </div>
            <div class="row justify-center q-pa-sm">
                  <q-btn color="primary" label="Guardar Cambios" @click="notifi = true, id = form._id , estatus = rol"/>
            </div>
          </q-card>
    </div>

    <div v-if="datosproveedor">
            <q-card class="bg-amber-1 q-pa-lg q-ma-md shadow-3">
                <div class="row justify-center items-center">
                        <div class="column">
                          <q-avatar size="180px">
                            <img  :src="baseu + 'perfil' + form2._id">
                            <q-file borderless v-model="perfilFile" class="absolute-center button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1">
                              <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
                            </q-file>
                          </q-avatar>
                        </div>

                    <q-card style="width: 100%" class="shadow-11 bg-amber-1 q-mt-md">
                      <div class="q-mt-sm column">
                        <q-card class="q-pa-md bg-amber-1 shadow-up-3 q-mt-sm" style="border-radius:25px">
                              <q-scroll-area
                              horizontal
                              style="height: 110px;"
                            >
                              <div class="row no-wrap" style="width: 100%">
                                <q-card v-for="(item, index) in form2.tiendaFiles" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
                                  <q-img :src="form2.tiendaFiles ? baseu2 + item : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
                                   <q-btn icon="delete" style="position:absolute;top:0px;right:0px" flat round @click="eliminarimg = true, nameImgBorrar = item , estatus = rol" />
                                </q-card>
                              </div>
                            </q-scroll-area>
                          </q-card>

                        <div class="row justify-center items-center">
                          <div class="column">
                            <div class="column shadow-3 justify-center items-center q-ma-sm q-ml-sm bg-amber-1" style="height:100px;border-radius:12px;width:140px">
                              <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Agregar Imagen</div>
                              <q-avatar size="50px">
                                <div style="z-index:1">
                                  <q-file borderless v-model="tiendaFiles" class="button-camera" @input="addImg()" accept=".jpg, image/*">
                                    <q-icon name="add" class="absolute-center" size="20px" color="white" />
                                  </q-file>
                                </div>
                              </q-avatar>
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-card>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form2.full_name" label="Nombre de la Empresa" outlined dense
                        error-message="Ingrese el nombre de la Empresa"
                        :error="$v.form2.full_name.$error" @blur="$v.form.full_name.$touch()"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-select v-model="form2.country" label="País" outlined dense :options="['Colombia', 'Chile']" />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <q-input :disable="form2.country ? false : true" v-model="form2.run_dni" :label="form2.country === 'Chile' ? 'Ingrese RUN' : form2.country === 'Colombia' ? 'Ingrese DNI' : 'Debes seleccionar un país'" outlined dense
                        />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form2.direccion" label="Dirección" outlined dense
                      />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form2.phone" type="tel" label="Telefono" outlined dense />
                    </div>

                     <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <q-toggle
                          v-model="form2.delivery"
                          label="Activar delivery"
                          icon="delivery_dining"
                        />
                     </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mt-md">
                      <q-select outlined v-model="form2.dias" :options="options_dias" label="Días laborables" multiple emit-value map-options
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
                    <div class="text-subtitle2 q-mt-sm">Horario</div>
                    <div class="q-gutter-sm row justify-between">
                      <q-input label="Hora de inicio" class="col-5" v-model="form2.hora_inicio" mask="time" :rules="['time']" >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                              <q-time v-model="form2.hora_inicio">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                      <q-input label="Hora de cierre" class="col-5" v-model="form2.hora_fin" mask="time" :rules="['time']">
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                              <q-time v-model="form2.hora_fin">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                    </div>
                </div>
              <div class="row justify-center q-pa-sm">
                  <q-btn color="primary" label="Guardar Cambios" @click="notifi = true, id = form2._id , estatus = rol"/>
              </div>
           </q-card>
    </div>
    <q-dialog v-model="notifi" >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="row justify-center text-center items-center">
            <div v-if="estatus === 3" class="text-h6">¡Atención!
              <div class="text-caption row justify-center items-center">¿Estas seguro de Actualizar los datos?</div>
            </div>
              <div v-if="estatus === 2" class="text-h6">¿Estas seguro de Actualizar los datos?</div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md row justify-center items-center">
          <q-btn v-if="estatus === 3" class="q-ma-sm" label="Actualizar" color="primary" @click="modificar_datosproveedor(), $router.go(-1)" push />
          <q-btn v-if="estatus === 2" class="q-ma-sm" label="Actualizar" color="primary" @click="modificar_datos(), $router.go(-1)" push />
          <q-btn class="q-ma-sm" label="Cerrar" color="grey" v-close-popup />
        </q-card-section>
      </q-card>
      </q-dialog>

      <q-dialog v-model="eliminarimg" >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="row justify-center text-center items-center">
            <div v-if="estatus === 3" class="text-h6">¡Atención!
              <div class="text-caption row justify-center items-center">¿Estas seguro de Borrar esta Imagen?</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md row justify-center items-center">
          <q-btn v-if="estatus === 3" class="q-ma-sm" label="Eliminar" color="primary" @click="deleteimg()" push v-close-popup />
          <q-btn class="q-ma-sm" label="Cerrar" color="grey" v-close-popup />
        </q-card-section>
      </q-card>
      </q-dialog>

    </div>
  </div>
</template>
<script>
import { maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      nameImgBorrar: '',
      datosusuario: false,
      datosproveedor: false,
      form: {},
      form2: {},
      notifi: false,
      eliminarimg: false,
      perfilFile: null,
      imgPerfil: '',
      baseu: '',
      baseu2: '',
      usuario: {},
      rol: null,
      dias: [],
      tiendaFiles: [],
      imgTienda: [],
      estatus: 8,
      var: false,
      id: '',
      id2: this.$route.params.id,
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
  mounted () {
    this.getUser()
    this.baseu = env.apiUrl + '/perfil_img/'
    this.baseu2 = env.apiUrl + '/tienda_img/'
  },
  validations () {
    return {
      form: {
        full_name: { maxLength: maxLength(40) }
      },
      form2: {
        full_name: { maxLength: maxLength(40) }
      }
    }
  },
  methods: {
    getUser () {
      this.$api.get('user_by_id/' + this.id2).then(v => {
        if (v) {
          this.rol = v.roles[0]
        }
        if (this.rol === 3) {
          this.datosproveedor = true
          this.form2 = v
          this.espejo = v
        }
        if (this.rol === 2) {
          this.form = v
          this.datosusuario = true
        }
      })
    },
    modificar_datos () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$api.put('datosnew/' + this.id, this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Datos Modificados con exito',
              color: 'positive'
            })
          }
        })
      } else {
        this.$q.notify({
          message: 'Error',
          color: 'negative'
        })
      }
    },

    modificar_datosproveedor () {
      this.$v.form2.$touch()
      if (!this.$v.form2.$error) {
        this.$api.put('datosnew/' + this.id, this.form2).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Datos Modificados con exito',
              color: 'positive'
            })
          }
        })
      } else {
        this.$q.notify({
          message: 'Verifica los datos',
          color: 'negative'
        })
      }
    },

    async addImg () {
      if (this.form2.tiendaFiles.length >= 5) {
        this.$q.notify({
          message: 'no se pueden agregar mas imagenes',
          color: 'negative'
        })
      } else {
        if (this.tiendaFiles) {
          var formData = new FormData()
          var files = []
          files[0] = this.tiendaFiles
          formData.append('files', files[0])
          await this.$api.post('subir_archivo_proveedor/' + this.id2, formData, {
            headers: {
              'Content-Type': undefined
            }
          }).then((res) => {
            this.form2.tiendaFiles = res.tiendaFiles
          })
        }
      }
    },

    async deleteimg () {
      this.$api.get('eliminar_imagen_tienda/' + this.nameImgBorrar + '/' + this.id2).then(res => {
        this.form2.tiendaFiles = res.tiendaFiles
      })
    },
    async perfil_img () {
      if (this.perfilFile) {
        var formData = new FormData()
        var files = []
        files[0] = this.perfilFile
        formData.append('files', files[0])
        await this.$api.post('perfil_imagen/' + this.id2, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.form2 = res
        })
        location.reload()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
}
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
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
  width:40px
}
</style>
