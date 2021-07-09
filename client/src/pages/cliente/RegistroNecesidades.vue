<template>
 <div>
   <div class="row justify-center q-my-xl">
     <div style="height: 200px; width: 70%;">
        <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 25px">
        <div class="absolute-full column items-center column justify-end">
          <q-icon name="collections" class="text-grey" size="80px"></q-icon>
          <div class="text-bold text-grey">¿QUE NECESITAS?</div>
        </div>
        </q-img>
      </div>
   </div>
    <div>
      <diz class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold q-ml-md">Nombre de la solicitud</div>
        <q-input class="q-mx-md" filled outlined v-model="form.name" label="Introduce el nombre de solicitud" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
      </diz>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold q-ml-md">Selecciona tu servicio</div>
        <q-select class="q-mx-md q-mb-md" color="grey" filled v-model="form.categoria_id" :options="categorias" label="Servicios" dense :error="$v.form.categoria_id.$error" option-value="_id" option-label="name" emit-value map-options error-message="Este campo es requerido" @blur="$v.form.categoria_id.$touch()"/>
      </div>
      <!-- <div class="row justify-around">
      <q-scroll-area
          horizontal
          style="height: 130px; width: 100%;"
          class="rounded-borders"
        >
          <div class="row no-wrap">
            <q-btn flat v-for="(item, index) in categorias" push :color="item.select === false ? 'white' : 'primary'" :text-color="item.select === false ? 'black' : 'primary'" class="q-mt-sm q-mr-sm q-ml-sm" :key="index" @click="seleccionarcategoria(item)">
            <div class="column items-center justify-center">
              <q-avatar square size="40px">
                <img :src="item.icons">
              </q-avatar>
              <div class="text-caption">{{item.name}}</div>
              </div>
            </q-btn>
          </div>
        </q-scroll-area>
      </div> -->
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold q-ml-md">Ingrese su dirección</div>
        <q-input class="q-mx-md q-mt-md" outlined autogrow filled v-model="form.direccion" label="Ingrese Dirección" dense :error="$v.form.direccion.$error" error-message="Este campo es requerido" @blur="$v.form.direccion.$touch()" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold q-ml-md">Tiempo de la urgencia</div>
        <q-select class="q-mx-md q-mb-md" color="grey" filled v-model="form.necesidad" :options="options" label="Tiempo del servicio" dense :error="$v.form.necesidad.$error" error-message="Este campo es requerido" @blur="$v.form.necesidad.$touch()"/>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-bold q-ml-md">Descripción del servicio</div>
        <q-input filled v-model="form.descripcion" type="textarea" />
      </div>
      <div class="text-bold q-ml-md">Sube hasta 5 fotos de tu solicitud</div>
      <div class="row q-ml-lg q-my-sm">
      <q-avatar square size="50px" style="border-radius: 15px" class="bg-grey row justify-center">
        <q-file borderless @input="filesSolicitud" v-model="solicitudFiles" max-files="5" multiple accept=".jpg, image/*" append style="width: 100%; height: 100%; font-size: 0px">
          <q-icon name="file_upload" class="absolute-center" size="50px" color="white" />
        </q-file>
      </q-avatar>
      <div v-if="imgSolicitud.length" class="row">
        <q-avatar v-ripple v-for="(item, index) in imgSolicitud" :key="index" square size="50px" style="border-radius: 15px" class=" q-ml-sm bg-grey row justify-center">
          <div>
            <q-img
              :src="imgSolicitud.length > 0 ? imgSolicitud[index] : 'favicon.ico'"
              style="width:120px"
            />
          </div>
        </q-avatar>
      </div>
    </div>
      <!-- <q-card class="shadow-13 q-ma-md bg-yellow-2" style="border-radius:25px">
            <q-card-section>
              <div>Fotos referentes a tu solicitud (Obligatorio)</div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 row justify-between">
              <div class="col-10">
                  <q-file max-files="5" style="width: 100%" @input="filesSolicitud" accept=".jpg, image/*" multiple append v-model="solicitudFiles" hint="Pueden ser hasta 5 fotos" outlined label="CLICK AQUÍ" :error="$v.solicitudFiles.$error" error-message="Este campo es requerido" @blur="$v.solicitudFiles.$touch()">
                    <template v-slot:prepend>
                      <q-icon name="file_upload" />
                    </template>
                  </q-file>
              </div>
              <div class="col-2 row justify-center">
                <q-icon size="md" name="close" color="negative" @click="solicitudFiles = [], imgSolicitud = [], edit ? imgsTraidas() : ''" class="cursor-pointer" />
              </div>
            </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="row justify-around">
              <div v-if="!imgSolicitud.length" class="text-subtitle2 text-grey text-center">No hay fotos de la solicitud</div>
              <div v-else v-ripple v-for="(item, index) in imgSolicitud" :key="index" class="col-5 q-pa-sm">
                <q-img
                  :src="imgSolicitud.length > 0 ? imgSolicitud[index] : 'favicon.ico'"
                  style="width:120px"
                />
              </div>
            </q-card-section>
      </q-card> -->
      <div class="row justify-center q-pa-sm">
        <q-btn color="primary" :label="edit ? 'Actualizar Solicitud' : 'Enviar Solicitud'" @click="!edit ? agregar() : actualizarSolicitud()"/>
      </div>
    </div>
 </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      form: {},
      solicitudFiles: [],
      imgSolicitud: [],
      id: '',
      file: null,
      edit: false,
      editImg: false,
      categoria_id: '',
      options: [
        'Urgente (1 a 3 Horas)', 'Medio (5 a 24 Horas)', 'Programado (2 días en adelante)'
      ],
      categorias: [
      ]
    }
  },
  validations: {
    form: {
      name: { required },
      direccion: { required },
      necesidad: { required },
      descripcion: { required },
      categoria_id: { required }
    },
    solicitudFiles: { required }
  },
  mounted () {
    this.obtenerDatos()
    this.baseu = env.apiUrl + '/necesidad_img'
    if (this.$route.params.id) {
      this.edit = true
      this.editImg = true
      this.id = this.$route.params.id
      this.$api.get('necesidad/' + this.id).then(res => {
        if (res) {
          this.form = res
          this.categoria_id = this.form.categoria_id
          this.imgsTraidas()
          for (let i = 0; i < this.categorias.length; i++) {
            if (this.categorias[i]._id === this.form.categoria_id) {
              this.categorias[i].select = true
            } else {
              this.categorias[i].select = false
            }
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    imgsTraidas () {
      for (let i = 0; i < this.form.images.length; i++) {
        var cc = ''
        cc = this.baseu + '/' + this.form.images[i]
        this.imgSolicitud.push(cc)
      }
      this.editImg = true
    },
    filesSolicitud () {
      var img = ''
      var cc = {}
      if (this.editImg && this.solicitudFiles.length > 0) {
        this.imgSolicitud = []
        this.editImg = false
      }
      if (this.solicitudFiles.length > 0) {
        cc = this.solicitudFiles[this.solicitudFiles.length - 1]
        img = URL.createObjectURL(cc)
        this.imgSolicitud.push(img)
      }
    },
    agregar () {
      this.$v.$touch()
      /* if (!this.$v.form.$error && !this.$v.solicitudFiles.$error) {
        this.$q.dialog({
          message: 'Debes seleccionar una categoria',
          persistent: true
        }).onOk(() => {
        })
      } */
      if (!this.$v.form.$error && !this.$v.solicitudFiles.$error) {
        this.form.status = 'Nuevo'
        this.$q.loading.show({
          message: 'Subiendo Solicitud, Por Favor Espere...'
        })
        var formData = new FormData()
        this.form.cantidadArchivos = this.solicitudFiles.length
        for (let i = 0; i < this.solicitudFiles.length; i++) {
          formData.append('solicitudFiles_' + i, this.solicitudFiles[i])
        }
        formData.append('dat', JSON.stringify(this.form))
        this.$api.post('necesidad', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          this.$q.loading.hide()
          this.$router.push('/inicio_cliente')
        })
      }
    },
    async actualizarSolicitud () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Actualizando Solicitud, Por Favor Espere...'
        })
        var formData = new FormData()
        if (this.solicitudFiles) {
          this.form.cantidadArchivos = this.solicitudFiles.length
          for (let i = 0; i < this.solicitudFiles.length; i++) {
            formData.append('solicitudFiles_' + i, this.solicitudFiles[i])
          }
        } else {
          this.form.cantidadArchivos = 0
        }
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('necesidad/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.loading.hide()
          this.$router.push('/solicitudes')
        })
      }
    },
    obtenerDatos () {
      this.$api.get('categoria').then(res => {
        if (res) {
          var categoria = res
          this.categorias = categoria.map(v => {
            return {
              _id: v._id,
              icons: v.icons,
              select: false,
              name: v.name
            }
          })
          console.log('this.categorias :>> ', this.categorias)
        }
      })
    }
    /* seleccionarcategoria (item) {
      this.categoria_id = item._id
      for (let i = 0; i < this.categorias.length; i++) {
        if (this.categorias[i]._id === this.categoria_id) {
          this.categorias[i].select = true
        } else {
          this.categorias[i].select = false
        }
      }
    } */
  }
}
</script>

<style>
.color-select {
  background-color: #fff599
}
</style>
